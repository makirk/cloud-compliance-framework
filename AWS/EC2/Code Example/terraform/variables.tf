#############################################
# Variables for EC2 Compliant Terraform Template
#############################################

variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "name_prefix" {
  description = "Prefix for resource names"
  type        = string
  default     = "compliant-ec2"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "private_subnet_cidr" {
  description = "CIDR block for private subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "ami_id" {
  description = "AMI ID for EC2 instance"
  type        = string
  # Amazon Linux 2023 AMI (update for your region)
  default = "ami-0c55b159cbfafe1f0"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "root_volume_size" {
  description = "Size of root EBS volume in GB"
  type        = number
  default     = 20
}

variable "data_volume_size" {
  description = "Size of data EBS volume in GB"
  type        = number
  default     = 50
}

#############################################
# Security Group Variables
# EC2.13: SSH restricted to specific CIDR
#############################################
variable "allowed_ssh_cidr" {
  description = "CIDR block allowed for SSH access (EC2.13 compliance - must not be 0.0.0.0/0)"
  type        = string
  default     = "10.0.0.0/8" # Example: Internal network only

  validation {
    condition     = var.allowed_ssh_cidr != "0.0.0.0/0"
    error_message = "SSH CIDR must not be 0.0.0.0/0 to comply with EC2.13."
  }
}

variable "allowed_https_cidr" {
  description = "CIDR block allowed for HTTPS access"
  type        = string
  default     = "10.0.0.0/8" # Example: Internal network only
}

#############################################
# Flow Log Configuration
# EC2.6: VPC flow logging
#############################################
variable "flow_log_retention_days" {
  description = "Number of days to retain VPC flow logs"
  type        = number
  default     = 90
}
