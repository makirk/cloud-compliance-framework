#############################################
# Outputs for EC2 Compliant Terraform Template
#############################################

output "instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.main.id
}

output "instance_private_ip" {
  description = "Private IP address of the EC2 instance"
  value       = aws_instance.main.private_ip
}

output "security_group_id" {
  description = "ID of the EC2 security group"
  value       = aws_security_group.ec2.id
}

output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "flow_log_id" {
  description = "ID of the VPC flow log"
  value       = aws_flow_log.main.id
}

output "kms_key_arn" {
  description = "ARN of the KMS key used for EBS encryption"
  value       = aws_kms_key.ebs.arn
}

output "snapshot_id" {
  description = "ID of the EBS snapshot"
  value       = aws_ebs_snapshot.main.id
}

output "ebs_encryption_enabled" {
  description = "Whether EBS encryption by default is enabled"
  value       = aws_ebs_encryption_by_default.enabled.enabled
}

#############################################
# Compliance Summary Output
#############################################
output "compliance_summary" {
  description = "Summary of compliance controls implemented"
  value = {
    "EC2.1"  = "EBS snapshots are private (not publicly restorable)"
    "EC2.2"  = "Default security group restricts all traffic"
    "EC2.3"  = "EBS volumes encrypted at-rest with KMS"
    "EC2.6"  = "VPC flow logging enabled to CloudWatch Logs"
    "EC2.7"  = "EBS default encryption enabled"
    "EC2.8"  = "IMDSv2 required (http_tokens = required)"
    "EC2.9"  = "No public IPv4 address assigned"
    "EC2.13" = "SSH restricted to specific CIDR (not 0.0.0.0/0)"
    "EC2.14" = "RDP not configured (port 3389 blocked)"
    "EC2.18" = "Only authorized ports (443) allowed"
    "EC2.19" = "No high-risk ports open"
  }
}
