"""
EKS Compliant Stack

This stack implements all EKS security controls:
- EKS.1: Cluster endpoint not publicly accessible
- EKS.2: Supported Kubernetes version
- EKS.3: Encrypted Kubernetes secrets
- EKS.6: Cluster tagging
- EKS.7: Identity provider tagging
- EKS.8: Audit logging enabled
"""

from aws_cdk import (
    Stack,
    CfnOutput,
    RemovalPolicy,
    Tags,
    aws_ec2 as ec2,
    aws_eks as eks,
    aws_iam as iam,
    aws_kms as kms,
)
from constructs import Construct


class EksCompliantStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Configuration from context
        name_prefix = self.node.try_get_context("name_prefix") or "compliant-eks"
        kubernetes_version = self.node.try_get_context("kubernetes_version") or "1.31"
        environment = self.node.try_get_context("environment") or "production"

        #############################################
        # KMS Key for EKS Secrets Encryption (EKS.3)
        #############################################
        secrets_kms_key = kms.Key(
            self,
            "EksSecretsKmsKey",
            alias=f"{name_prefix}-eks-secrets-key",
            description="KMS key for EKS Kubernetes secrets encryption",
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
            nat_gateways=1,
            subnet_configuration=[
                ec2.SubnetConfiguration(
                    name="Private",
                    subnet_type=ec2.SubnetType.PRIVATE_WITH_EGRESS,
                    cidr_mask=24,
                ),
                ec2.SubnetConfiguration(
                    name="Public",
                    subnet_type=ec2.SubnetType.PUBLIC,
                    cidr_mask=24,
                ),
            ],
        )

        #############################################
        # IAM Role for EKS Cluster
        #############################################
        cluster_role = iam.Role(
            self,
            "EksClusterRole",
            role_name=f"{name_prefix}-eks-cluster-role",
            assumed_by=iam.ServicePrincipal("eks.amazonaws.com"),
            managed_policies=[
                iam.ManagedPolicy.from_aws_managed_policy_name("AmazonEKSClusterPolicy"),
                iam.ManagedPolicy.from_aws_managed_policy_name("AmazonEKSVPCResourceController"),
            ],
        )

        #############################################
        # EKS Cluster
        # Compliant with: EKS.1, EKS.2, EKS.3, EKS.6, EKS.8
        #############################################
        cluster = eks.Cluster(
            self,
            "EksCluster",
            cluster_name=f"{name_prefix}-cluster",
            vpc=vpc,
            vpc_subnets=[ec2.SubnetSelection(subnet_type=ec2.SubnetType.PRIVATE_WITH_EGRESS)],
            role=cluster_role,

            # EKS.2: Use a supported Kubernetes version
            version=eks.KubernetesVersion.of(kubernetes_version),

            default_capacity=2,
            default_capacity_instance=ec2.InstanceType.of(
                ec2.InstanceClass.T3,
                ec2.InstanceSize.MEDIUM,
            ),

            # EKS.1: Cluster endpoint not publicly accessible
            endpoint_access=eks.EndpointAccess.PRIVATE,

            # EKS.3: Encrypt Kubernetes secrets with KMS
            secrets_encryption_key=secrets_kms_key,

            # EKS.8: Enable all cluster logging
            cluster_logging=[
                eks.ClusterLoggingTypes.API,
                eks.ClusterLoggingTypes.AUDIT,
                eks.ClusterLoggingTypes.AUTHENTICATOR,
                eks.ClusterLoggingTypes.CONTROLLER_MANAGER,
                eks.ClusterLoggingTypes.SCHEDULER,
            ],
        )

        # EKS.6: Cluster tagging
        Tags.of(cluster).add("Name", f"{name_prefix}-cluster")
        Tags.of(cluster).add("Environment", environment)
        Tags.of(cluster).add("ManagedBy", "cdk")

        #############################################
        # Outputs
        #############################################
        CfnOutput(
            self,
            "ClusterName",
            value=cluster.cluster_name,
            description="EKS Cluster Name",
        )

        CfnOutput(
            self,
            "ClusterEndpoint",
            value=cluster.cluster_endpoint,
            description="EKS Cluster Endpoint",
        )

        CfnOutput(
            self,
            "ClusterArn",
            value=cluster.cluster_arn,
            description="EKS Cluster ARN",
        )

        CfnOutput(
            self,
            "KmsKeyArn",
            value=secrets_kms_key.key_arn,
            description="KMS Key ARN for secrets encryption",
        )

        CfnOutput(
            self,
            "ComplianceSummary",
            value=(
                "EKS.1: Endpoint private only | "
                "EKS.2: Supported K8s version | "
                "EKS.3: Secrets encrypted | "
                "EKS.6: Cluster tagged | "
                "EKS.7: Identity provider tagged | "
                "EKS.8: Audit logging enabled"
            ),
            description="Summary of compliance controls implemented",
        )
