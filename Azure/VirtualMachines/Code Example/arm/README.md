# Azure Virtual Machines Compliant ARM Template

This ARM template deploys an Azure Linux Virtual Machine that is compliant with all security and operational requirements.

## Compliance Controls Implemented

| Control | Title | Implementation |
|---------|-------|----------------|
| VM.SEC.1 | Network Security Group | NSG with restrictive inbound rules, associated to subnet |
| VM.SEC.2 | Encryption at Host | `encryptionAtHost: true` in securityProfile |
| VM.SEC.3 | Customer-Managed Key Disk Encryption | Requires pre-existing Key Vault + Disk Encryption Set (not included) |
| VM.SEC.4 | Azure AD Authentication | `AADSSHLoginForLinux` VM extension |
| VM.SEC.5 | System-Assigned Managed Identity | `identity.type: SystemAssigned` |
| VM.SEC.6 | Trusted Launch | Secure Boot + vTPM enabled in securityProfile |
| VM.SEC.7 | Microsoft Defender for Endpoint | `MDE.Linux` VM extension |
| VM.SEC.9 | Disable Password Authentication | `disablePasswordAuthentication: true` (SSH only) |
| VM.SEC.10 | Anti-Malware Solution | Covered by MDE.Linux extension (VM.SEC.7) |
| VM.OPS.1 | Automatic Guest Patching | `patchMode: AutomaticByPlatform` |
| VM.OPS.2 | Azure Backup | Recovery Services Vault with daily backup policy |
| VM.OPS.3 | Azure Monitor Agent | `AzureMonitorLinuxAgent` VM extension with auto-upgrade |

### Subscription-Level Controls (not in template)

| Control | Title | Notes |
|---------|-------|-------|
| VM.SEC.8 | Vulnerability Assessment | Enable Microsoft Defender for Cloud Standard tier for VMs |
| VM.OPS.4 | Adaptive Application Controls | Enabled via Defender for Cloud Standard tier |

## Usage

### Prerequisites

- Azure CLI or PowerShell configured with appropriate credentials
- Permissions to create VMs, VNets, Recovery Services, and VM extensions
- The subscription must support Encryption at Host

### Deployment

#### Azure CLI

```bash
az group create --name rg-compliant-vm --location eastus2

az deployment group create \
  --resource-group rg-compliant-vm \
  --template-file azuredeploy.json \
  --parameters \
    vmName=compliant-vm \
    sshPublicKey="$(cat ~/.ssh/id_rsa.pub)" \
    allowedSshCidr="10.0.0.0/8"
```

#### PowerShell

```powershell
New-AzResourceGroup -Name rg-compliant-vm -Location eastus2

New-AzResourceGroupDeployment `
  -ResourceGroupName rg-compliant-vm `
  -TemplateFile azuredeploy.json `
  -vmName "compliant-vm" `
  -sshPublicKey (Get-Content ~/.ssh/id_rsa.pub) `
  -allowedSshCidr "10.0.0.0/8"
```

### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `vmName` | `compliant-vm` | Name of the virtual machine |
| `location` | Resource group location | Azure region |
| `vmSize` | `Standard_D2s_v5` | Size of the virtual machine |
| `adminUsername` | `azureadmin` | Admin username |
| `sshPublicKey` | *(required)* | SSH public key for VM access |
| `allowedSshCidr` | *(required)* | CIDR block allowed for SSH access |
| `keyVaultName` | `{vmName}-kv` | Name of the Key Vault for disk encryption |

### Important Notes

1. **SSH Access (VM.SEC.1)**: Set `allowedSshCidr` to your trusted network CIDR. Do not use `0.0.0.0/0`.

2. **Encryption at Host (VM.SEC.2)**: Requires the `Microsoft.Compute/EncryptionAtHost` feature to be registered.

3. **Disk Encryption (VM.SEC.3)**: For customer-managed key encryption, create a Key Vault and Disk Encryption Set separately and reference it in the OS disk configuration.

4. **Trusted Launch (VM.SEC.6)**: Requires a Gen2 VM image.

## Outputs

- `vmId` - Virtual machine resource ID
- `vmPrivateIp` - Private IP address
- `vmPrincipalId` - Principal ID of the system-assigned managed identity

## Cleanup

```bash
az group delete --name rg-compliant-vm --yes
```
