# EC2 Compliant CDK Template (Python)

This AWS CDK Python application deploys an EC2 instance compliant with all AWS Security Hub EC2 controls.

## Compliance Controls Implemented

| Control | Title | Implementation |
|---------|-------|----------------|
| EC2.1 | EBS snapshots should not be publicly restorable | Snapshots are private by default |
| EC2.2 | VPC default security groups should not allow inbound or outbound traffic | Custom SG used, default avoided |
| EC2.3 | Attached EBS volumes should be encrypted at-rest | `encrypted=True` with KMS key |
| EC2.6 | VPC flow logging should be enabled in all VPCs | `FlowLog` construct configured |
| EC2.7 | EBS default encryption should be enabled | KMS key for all volumes |
| EC2.8 | EC2 instances should use IMDSv2 | `require_imdsv2=True` |
| EC2.9 | EC2 instances should not have a public IPv4 address | Private isolated subnet |
| EC2.13 | Security groups should not allow ingress from 0.0.0.0/0 to port 22 | SSH restricted to specific CIDR |
| EC2.14 | Security groups should not allow ingress from 0.0.0.0/0 to port 3389 | RDP not configured |
| EC2.18 | Security groups should only allow unrestricted incoming traffic for authorized ports | Only port 443 allowed |
| EC2.19 | Security groups should not allow unrestricted access to high risk ports | No high-risk ports configured |

## High-Risk Ports Blocked (EC2.19)

The following ports are explicitly NOT configured in the security group:
- Port 20 (FTP Data), 21 (FTP), 23 (Telnet), 25 (SMTP)
- Port 110 (POP3), 135 (RPC), 143 (IMAP), 445 (SMB)
- Port 1433/1434 (MSSQL), 3000/5000 (Development)
- Port 3306 (MySQL), 3389 (RDP), 5432 (PostgreSQL)
- Port 5500 (VNC), 5601 (Kibana)
- Port 8080/8088/8888 (HTTP Alternatives)
- Port 9200/9300 (Elasticsearch)

## Prerequisites

- Python 3.8+
- AWS CDK CLI (`npm install -g aws-cdk`)
- AWS CLI configured with appropriate credentials

## Setup

1. Create and activate a virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # Linux/macOS
   # or
   .venv\Scripts\activate     # Windows
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Bootstrap CDK (first time only):
   ```bash
   cdk bootstrap
   ```

## Deployment

1. Synthesize CloudFormation template:
   ```bash
   cdk synth
   ```

2. Deploy the stack:
   ```bash
   cdk deploy
   ```

## Configuration

Update `cdk.json` context values to customize:

```json
{
  "context": {
    "name_prefix": "my-compliant-ec2",
    "region": "us-west-2",
    "allowed_ssh_cidr": "192.168.1.0/24",
    "allowed_https_cidr": "192.168.1.0/24",
    "flow_log_retention_days": 90
  }
}
```

Or pass context at deploy time:
```bash
cdk deploy --context allowed_ssh_cidr=192.168.1.0/24
```

## Important Notes

1. **SSH Access (EC2.13)**: The `allowed_ssh_cidr` has validation that prevents `0.0.0.0/0`. Update to your trusted network CIDR.

2. **Private Subnet**: Instance is in a private isolated subnet without internet access. Add NAT Gateway or VPC endpoints if outbound connectivity is required.

3. **Flow Logs**: VPC flow logs are sent to CloudWatch Logs with configurable retention.

## Outputs

After deployment:
- `InstanceId` - EC2 instance ID
- `InstancePrivateIp` - Private IP address
- `SecurityGroupId` - Security group ID
- `VpcId` - VPC ID
- `KmsKeyArn` - KMS key ARN for EBS encryption
- `ComplianceSummary` - Summary of all compliance controls

## Cleanup

```bash
cdk destroy
```

## File Structure

```
cdk/
├── app.py                  # CDK app entry point
├── ec2_compliant_stack.py  # Main stack with EC2 resources
├── cdk.json                # CDK configuration
├── requirements.txt        # Python dependencies
└── README.md               # This file
```
