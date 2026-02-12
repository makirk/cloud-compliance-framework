# S3 Compliant Terraform Template
# This configuration implements AWS Security Hub controls for S3

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# S3 Bucket with security best practices
resource "aws_s3_bucket" "compliant_bucket" {
  bucket = var.bucket_name

  tags = {
    Name        = var.bucket_name
    Environment = var.environment
    Compliance  = "FedRAMP-SOC"
  }
}

# S3.1: Enable server-side encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "bucket_encryption" {
  bucket = aws_s3_bucket.compliant_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = var.kms_key_id
    }
    bucket_key_enabled = true
  }
}

# S3.8: Block public access at bucket level
# S3.2 & S3.3: Prohibit public read and write access
resource "aws_s3_bucket_public_access_block" "bucket_public_access_block" {
  bucket = aws_s3_bucket.compliant_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# S3.5: Require SSL/TLS for all requests
resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.compliant_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "DenyInsecureTransport"
        Effect    = "Deny"
        Principal = "*"
        Action    = "s3:*"
        Resource = [
          aws_s3_bucket.compliant_bucket.arn,
          "${aws_s3_bucket.compliant_bucket.arn}/*"
        ]
        Condition = {
          Bool = {
            "aws:SecureTransport" = "false"
          }
        }
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.bucket_public_access_block]
}

# Enable versioning for data protection
resource "aws_s3_bucket_versioning" "bucket_versioning" {
  bucket = aws_s3_bucket.compliant_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

# Enable logging for audit trail
resource "aws_s3_bucket_logging" "bucket_logging" {
  bucket = aws_s3_bucket.compliant_bucket.id

  target_bucket = var.logging_bucket_id
  target_prefix = "s3-logs/${var.bucket_name}/"
}

# Lifecycle configuration for cost optimization
resource "aws_s3_bucket_lifecycle_configuration" "bucket_lifecycle" {
  bucket = aws_s3_bucket.compliant_bucket.id

  rule {
    id     = "transition-old-versions"
    status = "Enabled"

    noncurrent_version_transition {
      noncurrent_days = 30
      storage_class   = "STANDARD_IA"
    }

    noncurrent_version_transition {
      noncurrent_days = 90
      storage_class   = "GLACIER"
    }

    noncurrent_version_expiration {
      noncurrent_days = 365
    }
  }
}
