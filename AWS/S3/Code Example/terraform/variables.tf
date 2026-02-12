variable "bucket_name" {
  description = "Name of the S3 bucket"
  type        = string
}

variable "environment" {
  description = "Environment name (e.g., production, staging, development)"
  type        = string
  default     = "production"
}

variable "kms_key_id" {
  description = "KMS key ID for bucket encryption"
  type        = string
}

variable "logging_bucket_id" {
  description = "S3 bucket ID for storing access logs"
  type        = string
}
