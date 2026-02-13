#!/bin/bash

# Migration script to rename requirement files to new naming standard
# Format: [Service].[ID].md -> [Service].SEC.[ID].md
# Heading: # [Service].[ID]: Title -> # [Service].SEC.[ID].[RequirementName]: Title

set -e

# Function to migrate a single file
migrate_file() {
    local old_file="$1"
    local service="$2"
    local old_id="$3"
    local suggested_name="$4"

    if [[ ! -f "$old_file" ]]; then
        echo "  ❌ File not found: $old_file"
        return 1
    fi

    # Extract the heading from the first line
    local heading=$(head -n 1 "$old_file")

    # Extract title by removing the heading prefix (everything before and including ": ")
    # This uses bash parameter expansion to be more reliable
    local title="${heading#\# }"        # Remove "# "
    title="${title#*: }"                 # Remove everything up to and including ": "

    # Use suggested RequirementName
    local requirement_name="$suggested_name"

    # Create new filename
    local dir=$(dirname "$old_file")
    local new_file="$dir/${service}.SEC.${old_id}.md"

    # Create new heading
    local new_heading="# ${service}.SEC.${old_id}.${requirement_name}: ${title}"

    echo "  📝 $old_file"
    echo "     → $new_file"
    echo "     Old heading: $heading"
    echo "     New heading: $new_heading"

    # Create a temporary file with the new heading
    echo "$new_heading" > "$new_file.tmp"
    tail -n +2 "$old_file" >> "$new_file.tmp"

    # Move to final location
    mv "$new_file.tmp" "$new_file"

    # Remove old file
    rm -f "$old_file"

    echo "  ✅ Migrated successfully"
    echo ""
}

# Function to migrate all files in a service
migrate_service() {
    local service="$1"
    local path="$2"
    shift 2
    local files=("$@")

    echo ""
    echo "═══════════════════════════════════════════════════════"
    echo "🔄 Migrating $service (${#files[@]} files)"
    echo "═══════════════════════════════════════════════════════"

    for file_info in "${files[@]}"; do
        IFS='|' read -r old_id suggested_name <<< "$file_info"
        local old_file="$path/${service}.${old_id}.md"
        migrate_file "$old_file" "$service" "$old_id" "$suggested_name"
    done

    echo "✅ $service migration complete"
}

# Main migration execution
echo "╔═══════════════════════════════════════════════════════╗"
echo "║   Requirement Files Migration Script v2              ║"
echo "║   Old format: [Service].[ID].md                      ║"
echo "║   New format: [Service].SEC.[ID].md                  ║"
echo "╚═══════════════════════════════════════════════════════╝"

# Ask for confirmation
read -p "Start migration? (yes/no): " -r
if [[ ! $REPLY =~ ^[Yy]es$ ]]; then
    echo "Migration cancelled."
    exit 0
fi

# EC2 Requirements (11 files)
migrate_service "EC2" "AWS/EC2/Requirements" \
    "1|EBS-Snapshots-Public" \
    "2|Default-SG-Traffic" \
    "3|EBS-Encryption" \
    "6|VPC-Flow-Logging" \
    "7|EBS-Default-Encryption" \
    "8|IMDSv2" \
    "9|No-Public-IPv4" \
    "13|No-SSH-From-Internet" \
    "14|No-RDP-From-Internet" \
    "18|Authorized-Ports-Only" \
    "19|No-High-Risk-Ports"

# IAM Requirements (10 files)
migrate_service "IAM" "AWS/IAM/Requirements" \
    "1|No-Admin-Wildcard" \
    "2|No-User-Policies" \
    "3|Rotate-Access-Keys" \
    "4|No-Root-Access-Keys" \
    "5|User-MFA" \
    "6|Root-Hardware-MFA" \
    "7|Strong-Password-Policy" \
    "8|Remove-Unused-Credentials" \
    "9|Root-MFA" \
    "19|All-Users-MFA"

# S3 Requirements (5 files)
migrate_service "S3" "AWS/S3/Requirements" \
    "1|Server-Side-Encryption" \
    "2|No-Public-Read" \
    "3|No-Public-Write" \
    "5|Require-SSL" \
    "8|Block-Public-Access"

# Lambda Requirements (4 files)
migrate_service "Lambda" "AWS/Lambda/Requirements" \
    "1|No-Public-Access" \
    "2|Supported-Runtimes" \
    "3|VPC-Config" \
    "5|Multi-AZ"

# RDS Requirements (7 files)
migrate_service "RDS" "AWS/RDS/Requirements" \
    "1|Private-Snapshots" \
    "2|No-Public-Access" \
    "3|Encryption-At-Rest" \
    "5|Multi-AZ" \
    "6|Enhanced-Monitoring" \
    "7|Deletion-Protection" \
    "10|IAM-Authentication"

# CloudWatch Requirements (3 files)
migrate_service "CloudWatch" "AWS/CloudWatch/Requirements" \
    "15|Alarm-Actions-Configured" \
    "16|Log-Retention-1-Year" \
    "17|Alarm-Actions-Enabled"

# KMS Requirements (5 files)
migrate_service "KMS" "AWS/KMS/Requirements" \
    "1|No-Decrypt-All-Keys" \
    "2|No-Inline-Decrypt-All" \
    "3|Prevent-Deletion" \
    "4|Key-Rotation" \
    "5|No-Public-Keys"

# EKS Requirements (6 files)
migrate_service "EKS" "AWS/EKS/Requirements" \
    "1|Private-Endpoints" \
    "2|Supported-K8s-Version" \
    "3|Encrypted-Secrets" \
    "6|Cluster-Tags" \
    "7|IDP-Tags" \
    "8|Audit-Logging"

# Handle misnamed VPC file (currently EC2.21.md, should be VPC.SEC.21.md)
echo ""
echo "═══════════════════════════════════════════════════════"
echo "🔄 Fixing misnamed VPC requirement"
echo "═══════════════════════════════════════════════════════"

VPC_DIR="AWS/VPC/Requirements"
if [[ -f "$VPC_DIR/EC2.21.md" ]]; then
    echo "  📝 Moving EC2.21.md to VPC.SEC.21.md"

    # Read heading and extract title
    heading=$(head -n 1 "$VPC_DIR/EC2.21.md")
    title="${heading#\# }"
    title="${title#*: }"

    # Create new heading for VPC
    new_heading="# VPC.SEC.21.NACL-No-SSH-RDP-Internet: ${title}"

    echo "     Old heading: $heading"
    echo "     New heading: $new_heading"

    # Create new file with new heading
    echo "$new_heading" > "$VPC_DIR/VPC.SEC.21.md"
    tail -n +2 "$VPC_DIR/EC2.21.md" >> "$VPC_DIR/VPC.SEC.21.md"

    # Remove old file
    rm -f "$VPC_DIR/EC2.21.md"

    echo "  ✅ Fixed VPC requirement"
else
    echo "  ℹ️  VPC/EC2.21.md not found (may already be migrated)"
fi

echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║   ✅ Migration Complete!                             ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
echo "Next steps:"
echo "1. Review the changes: git status"
echo "2. Check a few migrated files to verify format"
echo "3. Test the webapp to ensure requirements display correctly"
echo "4. Commit the changes if everything looks good"
