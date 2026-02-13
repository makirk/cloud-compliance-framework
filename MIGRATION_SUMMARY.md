# Requirement Files Migration Summary

**Date:** 2026-02-13
**Migration Script:** `migrate-requirements-v2.sh`

## Overview

Successfully migrated **52 security requirement files** from the old naming format to the new standardized format per CLAUDE.md specifications.

## Naming Convention Changes

### Filename Format
- **Old:** `[Service].[ID].md` (e.g., `EC2.1.md`)
- **New:** `[Service].SEC.[ID].md` (e.g., `EC2.SEC.1.md`)

### Heading Format
- **Old:** `# [Service].[ID]: Title`
- **New:** `# [Service].SEC.[ID].[RequirementName]: Title`

Where:
- **Service:** Service abbreviation (EC2, S3, Lambda, etc.)
- **SEC:** Security type designation
- **ID:** Unique numeric identifier
- **RequirementName:** Descriptive kebab-case name

## Files Migrated by Service

| Service | Files Migrated | New Format |
|---------|----------------|------------|
| EC2 | 11 | EC2.SEC.1 - EC2.SEC.19 |
| IAM | 10 | IAM.SEC.1 - IAM.SEC.19 |
| S3 | 5 | S3.SEC.1 - S3.SEC.8 |
| Lambda | 4 | Lambda.SEC.1 - Lambda.SEC.5 |
| RDS | 7 | RDS.SEC.1 - RDS.SEC.10 |
| CloudWatch | 3 | CloudWatch.SEC.15 - CloudWatch.SEC.17 |
| KMS | 5 | KMS.SEC.1 - KMS.SEC.5 |
| EKS | 6 | EKS.SEC.1 - EKS.SEC.8 |
| VPC | 1 | VPC.SEC.21 (fixed from EC2.21) |
| **Total** | **52** | |

## Special Cases

### VPC Requirement
- **Old:** `AWS/VPC/Requirements/EC2.21.md` (misnamed)
- **New:** `AWS/VPC/Requirements/VPC.SEC.21.md`
- **Reason:** This was a VPC Network ACL requirement incorrectly named as EC2

## Example Migrations

### EC2.1 → EC2.SEC.1
```markdown
# Old
# EC2.1: EBS snapshots should not be publicly restorable

# New
# EC2.SEC.1.EBS-Snapshots-Public: EBS snapshots should not be publicly restorable
```

### Lambda.3 → Lambda.SEC.3
```markdown
# Old
# Lambda.3: Lambda functions should be in a VPC

# New
# Lambda.SEC.3.VPC-Config: Lambda functions should be in a VPC
```

### KMS.4 → KMS.SEC.4
```markdown
# Old
# KMS.4: AWS KMS key rotation should be enabled

# New
# KMS.SEC.4.Key-Rotation: AWS KMS key rotation should be enabled
```

## Files Not Migrated (Already in New Format)

The following operational requirement files were already in the new format:
- `AWS/EC2/Requirements/EC2.OPS.1.md`
- `AWS/Lambda/Requirements/Lambda.OPS.1.md`
- `AWS/S3/Requirements/S3.OPS.1.md`

## Technical Details

### Migration Process
1. Read original heading from each file
2. Extract title by removing prefix
3. Generate RequirementName in kebab-case
4. Create new heading with full format
5. Write new file with updated heading
6. Remove old file

### RequirementName Generation
RequirementNames were manually curated for each file to be:
- Concise (2-4 words)
- Descriptive
- Kebab-case formatted
- Focused on the key requirement aspect

### Examples of RequirementName Patterns
- Public access controls: `No-Public-Access`, `No-Public-Read`, `No-Public-IPv4`
- Encryption: `EBS-Encryption`, `Encryption-At-Rest`, `Encrypted-Secrets`
- Authentication: `IAM-Authentication`, `User-MFA`, `Root-MFA`
- Monitoring: `Enhanced-Monitoring`, `Audit-Logging`, `VPC-Flow-Logging`
- Configuration: `VPC-Config`, `Multi-AZ`, `Supported-Runtimes`

## Verification Steps Completed

✅ All 52 files renamed successfully
✅ All headings updated with RequirementName
✅ VPC/EC2.21.md corrected to VPC.SEC.21.md
✅ No files remain in old format (verified with grep)
✅ All new files use consistent format
✅ File contents preserved except heading

## Compatibility

### Parser Support
The requirement parser (`webapp/src/lib/parsers/requirement.ts`) already supports both formats:
- New format: Extracts `type`, `id`, and `name` from `[Service].[TYPE].[ID]` pattern
- Old format: Falls back to treating files without type as "Security" requirements

### UI Support
The UI components already handle the new format:
- Type badges display correctly (blue for Security, green for Operational)
- IDs display in full format (e.g., `EC2.SEC.1`)
- RequirementNames are available for enhanced display

## Git Status

After migration:
- **Deleted (D):** 52 old-format files
- **Untracked (??):** 52 new-format SEC files
- **Untracked (??):** 3 new-format OPS files (already existed)

Net result: 52 files migrated, 0 files lost, all content preserved

## Next Steps

1. ✅ Migration complete
2. ⏭️ Review changes in git
3. ⏭️ Test webapp to verify parsing
4. ⏭️ Commit changes with migration script
5. ⏭️ Update any external documentation

## Rollback Instructions

If rollback is needed:
```bash
# Restore old files from git history
git checkout HEAD~1 -- AWS/*/Requirements/*.md

# Or use the migration script in reverse (would need modification)
```

## Migration Script

The migration script `migrate-requirements-v2.sh` is preserved in the repository for:
- Documentation purposes
- Potential future migrations
- Reference for similar batch operations

Script features:
- Automated title extraction
- Batch processing by service
- Progress feedback
- Error handling
- Confirmation prompts
