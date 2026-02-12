# EC2 Compliant Terraform Template

This Terraform template deploys an EC2 instance that is compliant with all AWS Security Hub EC2 controls.

## Compliance Controls Implemented

| Control | Title | Implementation |
|---------|-------|----------------|
| EC2.1 | EBS snapshots should not be publicly restorable | Snapshots are private by default |
| EC2.2 | VPC default security groups should not allow inbound or outbound traffic | Default SG has no rules |
| EC2.3 | Attached EBS volumes should be encrypted at-rest | `encrypted = true` with KMS key |
| EC2.6 | VPC flow logging should be enabled in all VPCs | `aws_flow_log` resource configured |
| EC2.7 | EBS default encryption should be enabled | `aws_ebs_encryption_by_default` enabled |
| EC2.8 | EC2 instances should use IMDSv2 | `http_tokens = "required"` |
| EC2.9 | EC2 instances should not have a public IPv4 address | `associate_public_ip_address = false` |
| EC2.13 | Security groups should not allow ingress from 0.0.0.0/0 to port 22 | SSH restricted to specific CIDR |
| EC2.14 | Security groups should not allow ingress from 0.0.0.0/0 to port 3389 | RDP not configured |
| EC2.18 | Security groups should only allow unrestricted incoming traffic for authorized ports | Only port 443 allowed |
| EC2.19 | Security groups should not allow unrestricted access to high risk ports | No high-risk ports configured |

## High-Risk Ports Blocked (EC2.19)

The following ports are explicitly NOT configured in the security group:
- Port 20 (FTP Data)
- Port 21 (FTP)
- Port 23 (Telnet)
- Port 25 (SMTP)
- Port 110 (POP3)
- Port 135 (RPC)
- Port 143 (IMAP)
- Port 445 (SMB)
- Port 1433/1434 (MSSQL)
- Port 3000/5000 (Development)
- Port 3306 (MySQL)
- Port 3389 (RDP)
- Port 5432 (PostgreSQL)
- Port 5500 (VNC)
- Port 5601 (Kibana)
- Port 8080/8088/8888 (HTTP Alternatives)
- Port 9200/9300 (Elasticsearch)

## Usage

### Prerequisites

- Terraform >= 1.0.0
- AWS CLI configured with appropriate credentials
- Permissions to create VPC, EC2, KMS, IAM, and CloudWatch resources

### Deployment

1. Initialize Terraform:
   ```bash
   terraform init
   ```

2. Review the plan:
   ```bash
   terraform plan
   ```

3. Apply the configuration:
   ```bash
   terraform apply
   ```

### Customization

Update `terraform.tfvars` or pass variables via command line:

```hcl
# terraform.tfvars
aws_region       = "us-west-2"
name_prefix      = "my-compliant-ec2"
allowed_ssh_cidr = "192.168.1.0/24"  # Your trusted network
ami_id           = "ami-xxxxxxxxx"    # Your AMI
instance_type    = "t3.small"
```

### Important Notes

1. **SSH Access (EC2.13)**: The `allowed_ssh_cidr` variable has a validation rule that prevents setting it to `0.0.0.0/0`. Update this to your trusted network CIDR.

2. **AMI ID**: Update `ami_id` to a valid AMI for your region.

3. **Private Subnet**: The instance is deployed in a private subnet without internet access. Configure NAT Gateway or VPC endpoints if outbound connectivity is required.

4. **Flow Logs**: VPC flow logs are sent to CloudWatch Logs with a configurable retention period.

## Outputs

After deployment, the following outputs are available:

- `instance_id` - EC2 instance ID
- `instance_private_ip` - Private IP address
- `security_group_id` - Security group ID
- `vpc_id` - VPC ID
- `flow_log_id` - VPC flow log ID
- `kms_key_arn` - KMS key ARN for EBS encryption
- `snapshot_id` - EBS snapshot ID
- `compliance_summary` - Summary of all compliance controls

## Verification

Run `terraform output compliance_summary` to see a summary of implemented controls.

## Cleanup

```bash
terraform destroy
```
