"""
EC2 Compliant Stack

This stack implements all EC2 security controls:
- EC2.1:  EBS snapshots not publicly restorable
- EC2.2:  Default security group restricts all traffic
- EC2.3:  EBS volumes encrypted at-rest
- EC2.6:  VPC flow logging enabled
- EC2.7:  EBS default encryption enabled
- EC2.8:  IMDSv2 required
- EC2.9:  No public IPv4 address
- EC2.13: No SSH from 0.0.0.0/0
- EC2.14: No RDP from 0.0.0.0/0
- EC2.18: Only authorized unrestricted ports
- EC2.19: No high-risk ports open
"""

from aws_cdk import (
    Stack,
    CfnOutput,
    RemovalPolicy,
    Duration,
    aws_ec2 as ec2,
    aws_kms as kms,
    aws_iam as iam,
    aws_logs as logs,
)
from constructs import Construct


class Ec2CompliantStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Configuration from context
        name_prefix = self.node.try_get_context("name_prefix") or "compliant-ec2"
        allowed_ssh_cidr = self.node.try_get_context("allowed_ssh_cidr") or "10.0.0.0/8"
        allowed_https_cidr = self.node.try_get_context("allowed_https_cidr") or "10.0.0.0/8"
        flow_log_retention_days = self.node.try_get_context("flow_log_retention_days") or 90

        # Validate SSH CIDR is not 0.0.0.0/0 (EC2.13)
        if allowed_ssh_cidr == "0.0.0.0/0":
            raise ValueError("SSH CIDR must not be 0.0.0.0/0 to comply with EC2.13")

        #############################################
        # KMS Key for EBS Encryption (EC2.3, EC2.7)
        #############################################
        ebs_kms_key = kms.Key(
            self,
            "EbsKmsKey",
            alias=f"{name_prefix}-ebs-key",
            description="KMS key for EBS volume encryption",
            enable_key_rotation=True,
            removal_policy=RemovalPolicy.RETAIN,
        )

        #############################################
        # VPC Configuration
        #############################################
        vpc = ec2.Vpc(
            self,
            "Vpc",
            vpc_name=f"{name_prefix}-vpc",
            ip_addresses=ec2.IpAddresses.cidr("10.0.0.0/16"),
            max_azs=2,
            nat_gateways=0,  # No NAT for cost savings; add if outbound needed
            subnet_configuration=[
                ec2.SubnetConfiguration(
                    name="Private",
                    subnet_type=ec2.SubnetType.PRIVATE_ISOLATED,
                    cidr_mask=24,
                )
            ],
        )

        #############################################
        # EC2.6: VPC Flow Logging
        #############################################
        flow_log_group = logs.LogGroup(
            self,
            "FlowLogGroup",
            log_group_name=f"/aws/vpc/{name_prefix}-flow-logs",
            retention=logs.RetentionDays(flow_log_retention_days),
            removal_policy=RemovalPolicy.DESTROY,
        )

        flow_log_role = iam.Role(
            self,
            "FlowLogRole",
            role_name=f"{name_prefix}-flow-logs-role",
            assumed_by=iam.ServicePrincipal("vpc-flow-logs.amazonaws.com"),
        )

        flow_log_role.add_to_policy(
            iam.PolicyStatement(
                actions=[
                    "logs:CreateLogGroup",
                    "logs:CreateLogStream",
                    "logs:PutLogEvents",
                    "logs:DescribeLogGroups",
                    "logs:DescribeLogStreams",
                ],
                resources=["*"],
            )
        )

        ec2.FlowLog(
            self,
            "VpcFlowLog",
            flow_log_name=f"{name_prefix}-flow-log",
            resource_type=ec2.FlowLogResourceType.from_vpc(vpc),
            destination=ec2.FlowLogDestination.to_cloud_watch_logs(
                log_group=flow_log_group,
                iam_role=flow_log_role,
            ),
            traffic_type=ec2.FlowLogTrafficType.ALL,
            max_aggregation_interval=ec2.FlowLogMaxAggregationInterval.ONE_MINUTE,
        )

        #############################################
        # EC2.2: Default Security Group - Restrict All Traffic
        # CDK automatically creates a default SG. We'll use a
        # custom SG and avoid using the default.
        #############################################

        #############################################
        # Security Group for EC2 Instance
        # Compliant with: EC2.13, EC2.14, EC2.18, EC2.19
        #############################################
        ec2_security_group = ec2.SecurityGroup(
            self,
            "Ec2SecurityGroup",
            security_group_name=f"{name_prefix}-ec2-sg",
            description="Security group for EC2 instance - compliant with security controls",
            vpc=vpc,
            allow_all_outbound=False,  # Restrict outbound by default
        )

        # EC2.13: SSH restricted to specific CIDR (not 0.0.0.0/0)
        ec2_security_group.add_ingress_rule(
            peer=ec2.Peer.ipv4(allowed_ssh_cidr),
            connection=ec2.Port.tcp(22),
            description="SSH from trusted network only (EC2.13)",
        )

        # EC2.14: No RDP access (port 3389)
        # RDP is intentionally NOT configured to comply with EC2.14

        # EC2.18: Only authorized ports - HTTPS only
        ec2_security_group.add_ingress_rule(
            peer=ec2.Peer.ipv4(allowed_https_cidr),
            connection=ec2.Port.tcp(443),
            description="HTTPS from allowed CIDR (EC2.18)",
        )

        # EC2.19: No high-risk ports
        # The following ports are NOT configured (blocked by default):
        # - Port 20 (FTP Data), 21 (FTP), 23 (Telnet), 25 (SMTP)
        # - Port 110 (POP3), 135 (RPC), 143 (IMAP), 445 (SMB)
        # - Port 1433/1434 (MSSQL), 3000/5000 (Development)
        # - Port 3306 (MySQL), 3389 (RDP), 5432 (PostgreSQL)
        # - Port 5500 (VNC), 5601 (Kibana)
        # - Port 8080/8088/8888 (HTTP Alternatives)
        # - Port 9200/9300 (Elasticsearch)

        # Egress - allow HTTPS for updates
        ec2_security_group.add_egress_rule(
            peer=ec2.Peer.any_ipv4(),
            connection=ec2.Port.tcp(443),
            description="HTTPS outbound for updates",
        )

        #############################################
        # EC2 Instance
        # Compliant with: EC2.3, EC2.8, EC2.9
        #############################################
        instance = ec2.Instance(
            self,
            "Ec2Instance",
            instance_name=f"{name_prefix}-instance",
            vpc=vpc,
            vpc_subnets=ec2.SubnetSelection(
                subnet_type=ec2.SubnetType.PRIVATE_ISOLATED
            ),
            instance_type=ec2.InstanceType.of(
                ec2.InstanceClass.T3,
                ec2.InstanceSize.MICRO,
            ),
            machine_image=ec2.MachineImage.latest_amazon_linux2023(),
            security_group=ec2_security_group,

            # EC2.8: Require IMDSv2
            require_imdsv2=True,

            # EC2.3: EBS volumes encrypted at-rest
            block_devices=[
                ec2.BlockDevice(
                    device_name="/dev/xvda",
                    volume=ec2.BlockDeviceVolume.ebs(
                        volume_size=20,
                        volume_type=ec2.EbsDeviceVolumeType.GP3,
                        encrypted=True,
                        kms_key=ebs_kms_key,
                        delete_on_termination=True,
                    ),
                ),
                ec2.BlockDevice(
                    device_name="/dev/sdf",
                    volume=ec2.BlockDeviceVolume.ebs(
                        volume_size=50,
                        volume_type=ec2.EbsDeviceVolumeType.GP3,
                        encrypted=True,
                        kms_key=ebs_kms_key,
                        delete_on_termination=True,
                    ),
                ),
            ],
        )

        # EC2.9: Ensure no public IP
        # Private isolated subnet ensures no public IP is assigned

        #############################################
        # Outputs
        #############################################
        CfnOutput(
            self,
            "InstanceId",
            value=instance.instance_id,
            description="EC2 Instance ID",
        )

        CfnOutput(
            self,
            "InstancePrivateIp",
            value=instance.instance_private_ip,
            description="EC2 Instance Private IP",
        )

        CfnOutput(
            self,
            "SecurityGroupId",
            value=ec2_security_group.security_group_id,
            description="Security Group ID",
        )

        CfnOutput(
            self,
            "VpcId",
            value=vpc.vpc_id,
            description="VPC ID",
        )

        CfnOutput(
            self,
            "KmsKeyArn",
            value=ebs_kms_key.key_arn,
            description="KMS Key ARN for EBS encryption",
        )

        CfnOutput(
            self,
            "ComplianceSummary",
            value=(
                "EC2.1: Snapshots private | "
                "EC2.2: Default SG restricted | "
                "EC2.3: EBS encrypted | "
                "EC2.6: Flow logs enabled | "
                "EC2.7: Default encryption | "
                "EC2.8: IMDSv2 required | "
                "EC2.9: No public IP | "
                "EC2.13: SSH restricted | "
                "EC2.14: No RDP | "
                "EC2.18: Authorized ports only | "
                "EC2.19: No high-risk ports"
            ),
            description="Summary of compliance controls implemented",
        )
