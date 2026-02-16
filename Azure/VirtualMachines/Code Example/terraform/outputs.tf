output "vm_id" {
  description = "ID of the virtual machine"
  value       = azurerm_linux_virtual_machine.main.id
}

output "vm_private_ip" {
  description = "Private IP address of the virtual machine"
  value       = azurerm_network_interface.main.private_ip_address
}

output "vm_identity_principal_id" {
  description = "Principal ID of the VM's system-assigned managed identity"
  value       = azurerm_linux_virtual_machine.main.identity[0].principal_id
}

output "recovery_vault_id" {
  description = "ID of the Recovery Services vault"
  value       = azurerm_recovery_services_vault.main.id
}
