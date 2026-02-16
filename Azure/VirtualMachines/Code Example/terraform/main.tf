terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
}

# VM.SEC.1 - Network Security Group
resource "azurerm_network_security_group" "vm" {
  name                = "${var.vm_name}-nsg"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  security_rule {
    name                       = "AllowSSH"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = var.allowed_ssh_cidr
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "DenyAllInbound"
    priority                   = 4096
    direction                  = "Inbound"
    access                     = "Deny"
    protocol                   = "*"
    source_port_range          = "*"
    destination_port_range     = "*"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

resource "azurerm_virtual_network" "main" {
  name                = "${var.vm_name}-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
}

resource "azurerm_subnet" "main" {
  name                 = "${var.vm_name}-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.1.0/24"]
}

# VM.SEC.1 - Associate NSG with subnet
resource "azurerm_subnet_network_security_group_association" "main" {
  subnet_id                 = azurerm_subnet.main.id
  network_security_group_id = azurerm_network_security_group.vm.id
}

resource "azurerm_network_interface" "main" {
  name                = "${var.vm_name}-nic"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.main.id
    private_ip_address_allocation = "Dynamic"
  }
}

# VM.SEC.3 - Customer-managed key for disk encryption
resource "azurerm_key_vault" "main" {
  name                        = "${var.vm_name}-kv"
  location                    = azurerm_resource_group.main.location
  resource_group_name         = azurerm_resource_group.main.name
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  sku_name                    = "standard"
  enabled_for_disk_encryption = true
  purge_protection_enabled    = true
  soft_delete_retention_days  = 7
}

data "azurerm_client_config" "current" {}

resource "azurerm_key_vault_key" "disk_encryption" {
  name         = "${var.vm_name}-disk-key"
  key_vault_id = azurerm_key_vault.main.id
  key_type     = "RSA"
  key_size     = 2048
  key_opts     = ["decrypt", "encrypt", "sign", "unwrapKey", "verify", "wrapKey"]
}

resource "azurerm_disk_encryption_set" "main" {
  name                = "${var.vm_name}-des"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  key_vault_key_id    = azurerm_key_vault_key.disk_encryption.id

  identity {
    type = "SystemAssigned"
  }
}

# VM.SEC.2, VM.SEC.5, VM.SEC.6 - Compliant VM with encryption, managed identity, trusted launch
resource "azurerm_linux_virtual_machine" "main" {
  name                = var.vm_name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  size                = var.vm_size
  admin_username      = var.admin_username

  network_interface_ids = [azurerm_network_interface.main.id]

  admin_ssh_key {
    username   = var.admin_username
    public_key = var.ssh_public_key
  }

  os_disk {
    caching                = "ReadWrite"
    storage_account_type   = "Premium_LRS"
    disk_encryption_set_id = azurerm_disk_encryption_set.main.id # VM.SEC.3
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts-gen2"
    version   = "latest"
  }

  # VM.SEC.5 - System-assigned managed identity
  identity {
    type = "SystemAssigned"
  }

  # VM.SEC.6 - Trusted Launch
  secure_boot_enabled = true
  vtpm_enabled        = true

  # VM.OPS.1 - Automatic guest patching
  patch_mode                                             = "AutomaticByPlatform"
  provision_vm_agent                                     = true
  bypass_platform_safety_checks_on_user_schedule_enabled = false

  # VM.SEC.9 - Disable password auth (SSH only)
  disable_password_authentication = true

  # VM.SEC.2 - Encryption at host
  encryption_at_host_enabled = true
}

# VM.SEC.4 - Azure AD Authentication extension
resource "azurerm_virtual_machine_extension" "aad_login" {
  name                 = "AADSSHLoginForLinux"
  virtual_machine_id   = azurerm_linux_virtual_machine.main.id
  publisher            = "Microsoft.Azure.ActiveDirectory"
  type                 = "AADSSHLoginForLinux"
  type_handler_version = "1.0"
}

# VM.SEC.7 - Microsoft Defender for Endpoint
resource "azurerm_virtual_machine_extension" "defender" {
  name                 = "MDE.Linux"
  virtual_machine_id   = azurerm_linux_virtual_machine.main.id
  publisher            = "Microsoft.Azure.AzureDefenderForServers"
  type                 = "MDE.Linux"
  type_handler_version = "1.0"

  depends_on = [azurerm_virtual_machine_extension.aad_login]
}

# VM.OPS.3 - Azure Monitor Agent
resource "azurerm_virtual_machine_extension" "monitor_agent" {
  name                       = "AzureMonitorLinuxAgent"
  virtual_machine_id         = azurerm_linux_virtual_machine.main.id
  publisher                  = "Microsoft.Azure.Monitor"
  type                       = "AzureMonitorLinuxAgent"
  type_handler_version       = "1.0"
  automatic_upgrade_enabled  = true
  auto_upgrade_minor_version = true

  depends_on = [azurerm_virtual_machine_extension.defender]
}

# VM.OPS.2 - Azure Backup
resource "azurerm_recovery_services_vault" "main" {
  name                = "${var.vm_name}-rsv"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku                 = "Standard"
  soft_delete_enabled = true
}

resource "azurerm_backup_policy_vm" "main" {
  name                = "${var.vm_name}-backup-policy"
  resource_group_name = azurerm_resource_group.main.name
  recovery_vault_name = azurerm_recovery_services_vault.main.name

  backup {
    frequency = "Daily"
    time      = "02:00"
  }

  retention_daily {
    count = 30
  }

  retention_weekly {
    count    = 12
    weekdays = ["Sunday"]
  }
}

resource "azurerm_backup_protected_vm" "main" {
  resource_group_name = azurerm_resource_group.main.name
  recovery_vault_name = azurerm_recovery_services_vault.main.name
  source_vm_id        = azurerm_linux_virtual_machine.main.id
  backup_policy_id    = azurerm_backup_policy_vm.main.id
}
