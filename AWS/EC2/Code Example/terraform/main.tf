#############################################
# EC2 Compliant Terraform Template
#
# This template implements all EC2 security controls:
# - EC2.1:  EBS snapshots not publicly restorable
# - EC2.2:  Default security group restricts all traffic
# - EC2.3:  EBS volumes encrypted at-rest
# - EC2.6:  VPC flow logging enabled
# - EC2.7:  EBS default encryption enabled
# - EC2.8:  IMDSv2 required
# - EC2.9:  No public IPv4 address
# - EC2.13: No SSH from 0.0.0.0/0
# - EC2.14: No RDP from 0.0.0.0/0
# - EC2.18: Only authorized unrestricted ports
# - EC2.19: No high-risk ports open
#############################################

terraform {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

#############################################
# EC2.7: Enable EBS encryption by default
# Ensures all new EBS volumes are encrypted
#############################################
resource "aws_ebs_encryption_by_default" "enabled" {
  enabled = true
}

#############################################
# VPC Configuration
#############################################
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "${var.name_prefix}-vpc"
  }
}

resource "aws_subnet" "private" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.private_subnet_cidr
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = false # EC2.9: No public IP by default

  tags = {
    Name = "${var.name_prefix}-private-subnet"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.name_prefix}-igw"
  }
}

#############################################
# EC2.6: VPC Flow Logging
# Captures all traffic for monitoring
#############################################
resource "aws_cloudwatch_log_group" "flow_logs" {
  name              = "/aws/vpc/${var.name_prefix}-flow-logs"
  retention_in_days = var.flow_log_retention_days

  tags = {
    Name = "${var.name_prefix}-flow-logs"
  }
}

resource "aws_iam_role" "flow_logs" {
  name = "${var.name_prefix}-flow-logs-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "vpc-flow-logs.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name = "${var.name_prefix}-flow-logs-role"
  }
}

resource "aws_iam_role_policy" "flow_logs" {
  name = "${var.name_prefix}-flow-logs-policy"
  role = aws_iam_role.flow_logs.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          "logs:DescribeLogGroups",
          "logs:DescribeLogStreams"
        ]
        Effect   = "Allow"
        Resource = "*"
      }
    ]
  })
}

resource "aws_flow_log" "main" {
  vpc_id                   = aws_vpc.main.id
  traffic_type             = "ALL"
  log_destination_type     = "cloud-watch-logs"
  log_destination          = aws_cloudwatch_log_group.flow_logs.arn
  iam_role_arn             = aws_iam_role.flow_logs.arn
  max_aggregation_interval = 60

  tags = {
    Name = "${var.name_prefix}-flow-log"
  }
}

#############################################
# EC2.2: Default Security Group restricts all traffic
# Remove all ingress/egress rules from default SG
#############################################
resource "aws_default_security_group" "default" {
  vpc_id = aws_vpc.main.id

  # No ingress rules - blocks all inbound traffic
  # No egress rules - blocks all outbound traffic

  tags = {
    Name        = "${var.name_prefix}-default-sg-restricted"
    Description = "Default security group with all traffic restricted (EC2.2)"
  }
}

#############################################
# Security Group for EC2 Instance
# Compliant with: EC2.13, EC2.14, EC2.18, EC2.19
#############################################
resource "aws_security_group" "ec2" {
  name        = "${var.name_prefix}-ec2-sg"
  description = "Security group for EC2 instance - compliant with security controls"
  vpc_id      = aws_vpc.main.id

  # EC2.13: SSH restricted to specific CIDR (not 0.0.0.0/0)
  # Only allow SSH from trusted networks
  ingress {
    description = "SSH from trusted network only (EC2.13)"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.allowed_ssh_cidr]
  }

  # EC2.14: No RDP access (port 3389)
  # RDP is intentionally NOT configured to comply with EC2.14
  # If RDP is required, use a restricted CIDR like SSH above

  # EC2.18: Only authorized ports - HTTPS only
  ingress {
    description = "HTTPS from allowed CIDR (EC2.18)"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [var.allowed_https_cidr]
  }

  # EC2.19: No high-risk ports
  # The following ports are NOT configured (blocked by default):
  # - Port 20 (FTP Data)
  # - Port 21 (FTP)
  # - Port 23 (Telnet)
  # - Port 25 (SMTP)
  # - Port 110 (POP3)
  # - Port 135 (RPC)
  # - Port 143 (IMAP)
  # - Port 445 (SMB)
  # - Port 1433 (MSSQL)
  # - Port 1434 (MSSQL UDP)
  # - Port 3000 (Development)
  # - Port 3306 (MySQL)
  # - Port 3389 (RDP)
  # - Port 4333 (ahsp)
  # - Port 5000 (Development)
  # - Port 5432 (PostgreSQL)
  # - Port 5500 (VNC)
  # - Port 5601 (Kibana)
  # - Port 8080 (HTTP Proxy)
  # - Port 8088 (HTTP Alt)
  # - Port 8888 (HTTP Alt)
  # - Port 9200 (Elasticsearch)
  # - Port 9300 (Elasticsearch)

  # Egress - allow HTTPS for updates
  egress {
    description = "HTTPS outbound for updates"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.name_prefix}-ec2-sg"
  }
}

#############################################
# KMS Key for EBS Encryption
#############################################
resource "aws_kms_key" "ebs" {
  description             = "KMS key for EBS volume encryption"
  deletion_window_in_days = 30
  enable_key_rotation     = true

  tags = {
    Name = "${var.name_prefix}-ebs-kms-key"
  }
}

resource "aws_kms_alias" "ebs" {
  name          = "alias/${var.name_prefix}-ebs-key"
  target_key_id = aws_kms_key.ebs.key_id
}

#############################################
# EC2 Instance
# Compliant with: EC2.3, EC2.8, EC2.9
#############################################
resource "aws_instance" "main" {
  ami           = var.ami_id
  instance_type = var.instance_type
  subnet_id     = aws_subnet.private.id

  # EC2.9: No public IPv4 address
  associate_public_ip_address = false

  vpc_security_group_ids = [aws_security_group.ec2.id]

  # EC2.8: Require IMDSv2 (Instance Metadata Service v2)
  metadata_options {
    http_endpoint               = "enabled"
    http_tokens                 = "required" # Enforces IMDSv2
    http_put_response_hop_limit = 1
    instance_metadata_tags      = "disabled"
  }

  # EC2.3: EBS volumes encrypted at-rest
  root_block_device {
    volume_type           = "gp3"
    volume_size           = var.root_volume_size
    encrypted             = true
    kms_key_id            = aws_kms_key.ebs.arn
    delete_on_termination = true

    tags = {
      Name = "${var.name_prefix}-root-volume"
    }
  }

  # Additional encrypted EBS volume example
  ebs_block_device {
    device_name           = "/dev/sdf"
    volume_type           = "gp3"
    volume_size           = var.data_volume_size
    encrypted             = true
    kms_key_id            = aws_kms_key.ebs.arn
    delete_on_termination = true

    tags = {
      Name = "${var.name_prefix}-data-volume"
    }
  }

  tags = {
    Name = "${var.name_prefix}-instance"
  }

  depends_on = [aws_ebs_encryption_by_default.enabled]
}

#############################################
# EC2.1: EBS Snapshot - Private (not publicly restorable)
# Snapshots are private by default in AWS
# This example shows explicit private configuration
#############################################
resource "aws_ebs_snapshot" "main" {
  volume_id   = aws_instance.main.root_block_device[0].volume_id
  description = "Encrypted snapshot - private by default (EC2.1)"

  tags = {
    Name = "${var.name_prefix}-snapshot"
  }
}

# Explicitly ensure snapshot is not shared publicly
# Note: Snapshots are private by default. This data source
# can be used to verify the snapshot permissions
data "aws_ebs_snapshot" "verify_private" {
  snapshot_ids = [aws_ebs_snapshot.main.id]
  owners       = ["self"]

  depends_on = [aws_ebs_snapshot.main]
}
