# Azure Virtual Machines Compliant Terraform Template

This Terraform template deploys an Azure Linux Virtual Machine that is compliant with all security and operational requirements.

## Compliance Controls Implemented

| Control | Title | Implementation |
|---------|-------|----------------|
| VM.SEC.1 | Network Security Group | NSG with restrictive inbound rules, associated to subnet |
| VM.SEC.2 | Encryption at Host | `encryption_at_host_enabled = true` |
| VM.SEC.3 | Customer-Managed Key Disk Encryption | Key Vault + Disk Encryption Set for OS disk |
| VM.SEC.4 | Azure AD Authentication | `AADSSHLoginForLinux` VM extension |
| VM.SEC.5 | System-Assigned Managed Identity | `identity { type = "SystemAssigned" }` |
| VM.SEC.6 | Trusted Launch | Secure Boot + vTPM enabled |
| VM.SEC.7 | Microsoft Defender for Endpoint | `MDE.Linux` VM extension |
| VM.SEC.8 | Vulnerability Assessment | Defender for Cloud Standard tier (P2) for VMs |
| VM.SEC.9 | Disable Password Authentication | `disable_password_authentication = true` (SSH only) |
| VM.SEC.10 | Anti-Malware Solution | Covered by MDE.Linux extension (VM.SEC.7) |
| VM.OPS.1 | Automatic Guest Patching | `patch_mode = "AutomaticByPlatform"` |
| VM.OPS.2 | Azure Backup | Recovery Services Vault with daily backup policy |
| VM.OPS.3 | Azure Monitor Agent | `AzureMonitorLinuxAgent` VM extension with auto-upgrade |
| VM.OPS.4 | Adaptive Application Controls | Enabled via Defender for Cloud Standard tier (VM.SEC.8) |

## Usage

### Prerequisites

- Terraform >= 1.0.0
- Azure CLI configured with appropriate credentials
- Permissions to create VMs, VNets, Key Vaults, Recovery Services, and Security Center resources
- The subscription must support Encryption at Host (register `Microsoft.Compute/EncryptionAtHost` feature)

### Deployment

1. Initialize Terraform:
   ```bash
   terraform init
   ```

2. Review the plan:
   ```bash
   terraform plan -var="ssh_public_key=$(cat ~/.ssh/id_rsa.pub)" -var="allowed_ssh_cidr=10.0.0.0/8"
   ```

3. Apply the configuration:
   ```bash
   terraform apply -var="ssh_public_key=$(cat ~/.ssh/id_rsa.pub)" -var="allowed_ssh_cidr=10.0.0.0/8"
   ```

### Customization

Update `terraform.tfvars` or pass variables via command line:

```hcl
# terraform.tfvars
resource_group_name = "rg-compliant-vm"
location            = "eastus2"
vm_name             = "my-compliant-vm"
vm_size             = "Standard_D2s_v5"
admin_username      = "azureadmin"
ssh_public_key      = "ssh-rsa AAAA..."
allowed_ssh_cidr    = "10.0.0.0/8"
```

### Important Notes

1. **SSH Access (VM.SEC.1)**: Update `allowed_ssh_cidr` to your trusted network CIDR. Do not use `0.0.0.0/0`.

2. **Encryption at Host (VM.SEC.2)**: Requires the `Microsoft.Compute/EncryptionAtHost` feature to be registered on the subscription.

3. **Trusted Launch (VM.SEC.6)**: Requires a Gen2 VM image (the template uses Ubuntu 22.04 LTS Gen2).

4. **Defender for Cloud (VM.SEC.8, VM.OPS.4)**: The `azurerm_security_center_subscription_pricing` resource enables Defender at the subscription level. This is a subscription-wide setting.

## Outputs

After deployment:

- `vm_id` - Virtual machine resource ID
- `vm_private_ip` - Private IP address
- `vm_identity_principal_id` - Principal ID of the system-assigned managed identity
- `recovery_vault_id` - Recovery Services vault ID

## Cleanup

```bash
terraform destroy
```
