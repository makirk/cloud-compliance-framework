variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "rg-compliant-vm"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "eastus2"
}

variable "vm_name" {
  description = "Name of the virtual machine"
  type        = string
  default     = "compliant-vm"
}

variable "vm_size" {
  description = "Size of the virtual machine"
  type        = string
  default     = "Standard_D2s_v5"
}

variable "admin_username" {
  description = "Admin username for the VM"
  type        = string
  default     = "azureadmin"
}

variable "ssh_public_key" {
  description = "SSH public key for VM access"
  type        = string
}

variable "allowed_ssh_cidr" {
  description = "CIDR block allowed for SSH access"
  type        = string
}
