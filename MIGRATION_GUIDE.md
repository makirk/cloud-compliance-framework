# Requirements Migration Guide

## Overview

This guide documents the migration from the old requirements naming convention to the new format that supports both Security (SEC) and Operational (OPS) requirement types.

## New Naming Convention

### Old Format
```
[SERVICE].[NUMBER].md
```
**Examples:**
- `EC2.1.md`
- `S3.3.md`
- `Lambda.1.md`
- `CloudWatch.15.md`

### New Format

**Filename:**
```
[ServiceShortname].[TYPE].[ID].md
```

**Heading inside file:**
```
# [ServiceShortname].[TYPE].[ID].[RequirementName]: [Title]
```

**Components:**
- **ServiceShortname**: Short name for the service (EC2, S3, Lambda, RDS, etc.)
- **TYPE**: Requirement type
  - `SEC` for security requirements
  - `OPS` for operational requirements
- **ID**: Unique numeric identifier (unique per service, starting from 1)
- **RequirementName**: Descriptive name in kebab-case (only in file heading, not filename)

**Filename Examples:**
- `EC2.SEC.1.md`
- `Lambda.SEC.3.md`
- `S3.SEC.8.md`
- `CloudWatch.OPS.1.md`
- `EC2.OPS.1.md`

**Heading Examples (inside the files):**
- `# EC2.SEC.1.EBS-Snapshots-Public: EBS snapshots should not be public`
- `# Lambda.SEC.3.VPC-Config: Lambda functions should be in a VPC`
- `# S3.SEC.8.Bucket-Encryption: S3 buckets should have encryption enabled`

## Migration Strategy

The application now supports **both** old and new naming conventions:
- **Old format files** are automatically treated as Security (SEC) requirements
- **New format files** are parsed to extract the type from the filename
- Both formats can coexist in the same service

This backward compatibility means migration can be done **gradually** without breaking existing functionality.

## Migration Steps

### For Existing Files (Old Format → New Format)

1. **Identify the service short name**
   - Usually already in the filename (EC2, S3, Lambda, etc.)

2. **Choose the requirement type**
   - `SEC` for existing security requirements (most common)
   - `OPS` for operational requirements (if applicable)

3. **Assign a unique ID**
   - Start from 1 for each service
   - Increment for each new requirement
   - IDs are unique per service, not globally

4. **Add a descriptive kebab-case name**
   - Extract from the requirement title
   - Use kebab-case (lowercase with hyphens)
   - Keep it concise but descriptive

5. **Rename the file**
   - Follow the pattern: `[Service].[TYPE].[ID].md`
   - Add the RequirementName to the heading inside the file

### Example Migrations

```bash
# Filename changes
EC2.1.md → EC2.SEC.1.md
EC2.2.md → EC2.SEC.2.md
Lambda.1.md → Lambda.SEC.1.md
Lambda.3.md → Lambda.SEC.3.md
S3.8.md → S3.SEC.8.md
CloudWatch.15.md → CloudWatch.SEC.15.md
```

**Note:** The RequirementName should be added to the heading inside the file:
```markdown
# EC2.SEC.1.EBS-Snapshots-Public: EBS snapshots should not be public
```

### Creating New Operational Requirements

When adding new operational requirements:

1. Use the new naming format for the filename: `[Service].OPS.[ID].md`
2. Include the RequirementName in the heading inside the file
3. Choose the next available ID for that service
4. Add appropriate metadata in the file

**Example file:** `AWS/EC2/Requirements/EC2.OPS.1.md`

```markdown
# EC2.OPS.1.Detailed-Monitoring: EC2 instances should have detailed monitoring enabled

**Severity:** Medium
**Service:** Amazon EC2
**Applicable Standards:** AWS Operational Best Practices

## Description
This operational control checks whether EC2 instances have detailed CloudWatch monitoring enabled. Detailed monitoring provides metrics at 1-minute intervals instead of 5-minute intervals, enabling faster response to operational issues.

Source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-cloudwatch.html
```

## ID Numbering System

### Per-Service Numbering
Each service maintains its own numbering sequence:

```
EC2.SEC.1, EC2.SEC.2, EC2.SEC.3, EC2.OPS.1, EC2.OPS.2
Lambda.SEC.1, Lambda.SEC.2, Lambda.OPS.1
S3.SEC.1, S3.SEC.2, S3.SEC.3
```

### Next Available IDs
Track the next available ID for each service and type:

| Service | Next SEC ID | Next OPS ID |
|---------|-------------|-------------|
| EC2     | 15          | 1           |
| Lambda  | 8           | 1           |
| S3      | 20          | 1           |
| RDS     | 10          | 1           |

## File Content Format

The file content format remains unchanged. All requirement files should include:

```markdown
# [ID]: [Title]

**Severity:** [Critical|High|Medium|Low]
**Service:** [Service Name]
**Applicable Standards:** [Standard1], [Standard2], ...

## Description
[Detailed description of the requirement]

Source: [URL to documentation]
```

## Application Features

### Type Filtering
The web application now supports filtering requirements by type:
- **All** - Show all requirements
- **Security** - Show only SEC requirements
- **Operational** - Show only OPS requirements

### Type Badges
Requirements display colored badges indicating their type:
- **Security (SEC)** - Blue badge
- **Operational (OPS)** - Purple badge

### Export Functions
CSV and PDF exports now include the requirement type:
- CSV exports have a "Type" column
- PDF exports show type badges next to severity

### Sorting
Requirements are sorted:
1. By type (Security first, then Operational)
2. By numeric ID within each type

## Best Practices

### When to Create Security Requirements
- Compliance and regulatory controls
- Access control and permissions
- Encryption and data protection
- Audit and logging for security
- Vulnerability management
- Identity and authentication

### When to Create Operational Requirements
- Monitoring and alerting
- Performance optimization
- Resource management
- Backup and recovery
- High availability and redundancy
- Operational best practices
- Cost optimization

### Naming Guidelines

**For filenames:**
- Simple format: `[Service].[TYPE].[ID].md`
- No descriptive names in filenames

**For RequirementName in headings:**
- Keep names concise (3-5 words max)
- Use kebab-case (lowercase with hyphens)
- Make names descriptive enough to understand the requirement
- Avoid redundant words (e.g., don't include service name in the description)

**Good examples (headings):**
- `# EC2.SEC.1.EBS-Encryption: EBS volumes should be encrypted`
- `# Lambda.OPS.2.Auto-Scaling: Lambda functions should use auto-scaling`
- `# S3.SEC.5.Bucket-Versioning: S3 buckets should have versioning enabled`

**Avoid:**
- `# EC2.SEC.1.EC2-Has-EBS-Volume-Encryption: ...` (redundant service name)
- `# Lambda.OPS.2.AutoScalingConfiguration: ...` (not kebab-case)
- `# S3.SEC.5.s3_bucket_versioning: ...` (snake_case instead of kebab-case)

## Rollback Plan

If issues arise, the application fully supports old format files:
1. Keep original files as backup
2. Old format files continue to work as SEC requirements
3. No database migration or breaking changes

## Questions?

For questions about the migration process or naming conventions, refer to the `CLAUDE.md` file in the repository root.
