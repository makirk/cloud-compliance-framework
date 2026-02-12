#############################################
# EKS Compliant Terraform Template
#
# This template implements all EKS security controls:
# - EKS.1: Cluster endpoint not publicly accessible
# - EKS.2: Supported Kubernetes version
# - EKS.3: Encrypted Kubernetes secrets
# - EKS.6: Cluster tagging
# - EKS.7: Identity provider tagging
# - EKS.8: Audit logging enabled
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
# KMS Key for EKS Secrets Encryption (EKS.3)
#############################################
resource "aws_kms_key" "eks_secrets" {
  description             = "KMS key for EKS Kubernetes secrets encryption"
  deletion_window_in_days = 30
  enable_key_rotation     = true

  tags = {
    Name        = "${var.name_prefix}-eks-secrets-key"
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

resource "aws_kms_alias" "eks_secrets" {
  name          = "alias/${var.name_prefix}-eks-secrets-key"
  target_key_id = aws_kms_key.eks_secrets.key_id
}

#############################################
# VPC Configuration
#############################################
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "${var.name_prefix}-vpc"
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

resource "aws_subnet" "private" {
  count                   = length(var.availability_zones)
  vpc_id                  = aws_vpc.main.id
  cidr_block              = cidrsubnet(var.vpc_cidr, 8, count.index)
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = false

  tags = {
    Name                              = "${var.name_prefix}-private-${var.availability_zones[count.index]}"
    "kubernetes.io/role/internal-elb"  = "1"
    Environment                       = var.environment
    ManagedBy                         = "terraform"
  }
}

#############################################
# IAM Role for EKS Cluster
#############################################
resource "aws_iam_role" "eks_cluster" {
  name = "${var.name_prefix}-eks-cluster-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "eks.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "${var.name_prefix}-eks-cluster-role"
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

resource "aws_iam_role_policy_attachment" "eks_cluster_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.eks_cluster.name
}

resource "aws_iam_role_policy_attachment" "eks_vpc_resource_controller" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSVPCResourceController"
  role       = aws_iam_role.eks_cluster.name
}

#############################################
# IAM Role for EKS Node Group
#############################################
resource "aws_iam_role" "eks_nodes" {
  name = "${var.name_prefix}-eks-node-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "${var.name_prefix}-eks-node-role"
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

resource "aws_iam_role_policy_attachment" "eks_worker_node_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.eks_nodes.name
}

resource "aws_iam_role_policy_attachment" "eks_cni_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.eks_nodes.name
}

resource "aws_iam_role_policy_attachment" "eks_container_registry" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.eks_nodes.name
}

#############################################
# Security Group for EKS Cluster
#############################################
resource "aws_security_group" "eks_cluster" {
  name        = "${var.name_prefix}-eks-cluster-sg"
  description = "Security group for EKS cluster"
  vpc_id      = aws_vpc.main.id

  egress {
    description = "Allow all outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.name_prefix}-eks-cluster-sg"
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

#############################################
# EKS Cluster
# Compliant with: EKS.1, EKS.2, EKS.3, EKS.6, EKS.8
#############################################
resource "aws_eks_cluster" "main" {
  name     = "${var.name_prefix}-cluster"
  role_arn = aws_iam_role.eks_cluster.arn

  # EKS.2: Use a supported Kubernetes version
  version = var.kubernetes_version

  vpc_config {
    subnet_ids         = aws_subnet.private[*].id
    security_group_ids = [aws_security_group.eks_cluster.id]

    # EKS.1: Cluster endpoint not publicly accessible
    endpoint_private_access = true
    endpoint_public_access  = false
  }

  # EKS.3: Encrypt Kubernetes secrets with KMS
  encryption_config {
    provider {
      key_arn = aws_kms_key.eks_secrets.arn
    }
    resources = ["secrets"]
  }

  # EKS.8: Enable all audit logging
  enabled_cluster_log_types = [
    "api",
    "audit",
    "authenticator",
    "controllerManager",
    "scheduler",
  ]

  # EKS.6: Cluster tagging
  tags = {
    Name        = "${var.name_prefix}-cluster"
    Environment = var.environment
    ManagedBy   = "terraform"
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_cluster_policy,
    aws_iam_role_policy_attachment.eks_vpc_resource_controller,
  ]
}

#############################################
# EKS Node Group
#############################################
resource "aws_eks_node_group" "main" {
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = "${var.name_prefix}-node-group"
  node_role_arn   = aws_iam_role.eks_nodes.arn
  subnet_ids      = aws_subnet.private[*].id

  scaling_config {
    desired_size = var.node_desired_size
    max_size     = var.node_max_size
    min_size     = var.node_min_size
  }

  instance_types = [var.node_instance_type]

  tags = {
    Name        = "${var.name_prefix}-node-group"
    Environment = var.environment
    ManagedBy   = "terraform"
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_worker_node_policy,
    aws_iam_role_policy_attachment.eks_cni_policy,
    aws_iam_role_policy_attachment.eks_container_registry,
  ]
}

#############################################
# EKS Identity Provider (EKS.7: Tagged)
#############################################
resource "aws_eks_identity_provider_config" "oidc" {
  count = var.oidc_provider_url != "" ? 1 : 0

  cluster_name = aws_eks_cluster.main.name

  oidc {
    client_id                     = var.oidc_client_id
    identity_provider_config_name = "${var.name_prefix}-oidc"
    issuer_url                    = var.oidc_provider_url
  }

  # EKS.7: Identity provider tagging
  tags = {
    Name        = "${var.name_prefix}-oidc-provider"
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}
