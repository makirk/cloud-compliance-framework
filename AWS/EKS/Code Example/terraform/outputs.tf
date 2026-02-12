output "cluster_name" {
  description = "EKS cluster name"
  value       = aws_eks_cluster.main.name
}

output "cluster_endpoint" {
  description = "EKS cluster endpoint"
  value       = aws_eks_cluster.main.endpoint
}

output "cluster_security_group_id" {
  description = "Security group ID attached to the EKS cluster"
  value       = aws_security_group.eks_cluster.id
}

output "cluster_arn" {
  description = "EKS cluster ARN"
  value       = aws_eks_cluster.main.arn
}

output "kms_key_arn" {
  description = "KMS key ARN used for secrets encryption"
  value       = aws_kms_key.eks_secrets.arn
}

output "node_group_arn" {
  description = "EKS node group ARN"
  value       = aws_eks_node_group.main.arn
}

output "compliance_summary" {
  description = "Summary of compliance controls implemented"
  value       = <<-EOT
    EKS.1: Endpoint private only
    EKS.2: Kubernetes ${var.kubernetes_version}
    EKS.3: Secrets encrypted with KMS
    EKS.6: Cluster tagged
    EKS.7: Identity provider tagged
    EKS.8: Audit logging enabled
  EOT
}
