# Smart Academy Digital Portal - Data Protection & Privacy Document

**Document Title:** Data Protection & Privacy Document
**Document ID:** SEC_Data_Protection_v1.0
**Version:** 1.0
**Date:** January 10, 2026
**Project Name:** Smart Academy Digital Web Portal Development
**Prepared By:** Solo Full-Stack Developer

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | January 10, 2026 | Development Team | Initial Data Protection & Privacy Document |

**Reference Documents:**
- Smart Academy Security Architecture v1.0
- Smart Academy Non-Functional Requirements v1.0
- COPPA (Children's Online Privacy Protection Rule)
- Bangladesh ICT Act 2006 (Amended 2013)
- FTC COPPA Guidelines 2025

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Data Encryption at Rest](#2-data-encryption-at-rest)
3. [Data Encryption in Transit](#3-data-encryption-in-transit)
4. [PII Handling Procedures](#4-pii-handling-procedures)
5. [Child Data Protection (COPPA Compliance)](#5-child-data-protection-coppa-compliance)
6. [Data Retention Policies](#6-data-retention-policies)
7. [Data Deletion Procedures](#7-data-deletion-procedures)
8. [Privacy Policy Technical Implementation](#8-privacy-policy-technical-implementation)
9. [Data Subject Rights](#9-data-subject-rights)
10. [Compliance Monitoring](#10-compliance-monitoring)

---

## 1. Introduction

### 1.1 Purpose

This Data Protection & Privacy Document establishes the technical and procedural controls for protecting personal data within the Smart Academy Digital Portal. It ensures compliance with applicable privacy regulations and defines the mechanisms for data protection throughout the data lifecycle.

### 1.2 Scope

This document covers:
- Personal data of students, parents, teachers, and staff
- Academic records and educational data
- Financial transaction data
- Communication data
- System-generated data (logs, analytics)

### 1.3 Regulatory Framework

| Regulation | Applicability | Key Requirements |
|------------|---------------|------------------|
| COPPA (USA Principles) | Children under 13 | Parental consent, data minimization |
| Bangladesh ICT Act 2006 | All personal data | Data protection, security measures |
| Bangladesh Right to Information Act | Public institutions | Transparency, access rights |
| GDPR (Principles) | Best practices | Rights, consent, security |
| PCI-DSS | Payment data | Payment card security |

### 1.4 Data Protection Principles

| Principle | Description | Implementation |
|-----------|-------------|----------------|
| **Lawfulness** | Data collection must be lawful | Consent management, legitimate purposes |
| **Purpose Limitation** | Collect for specified purposes only | Purpose documented for each data type |
| **Data Minimization** | Collect only necessary data | Required field analysis |
| **Accuracy** | Keep data accurate and updated | Validation, user correction features |
| **Storage Limitation** | Retain only as long as needed | Retention schedules, auto-deletion |
| **Integrity** | Protect against unauthorized processing | Encryption, access controls |
| **Confidentiality** | Protect against unauthorized access | RBAC, encryption |
| **Accountability** | Demonstrate compliance | Audit logs, documentation |

---

## 2. Data Encryption at Rest

### 2.1 Encryption Requirements by Data Type

| Data Category | Encryption Requirement | Algorithm | Key Size | Implementation |
|---------------|----------------------|-----------|----------|----------------|
| Passwords | Required | bcrypt | Cost 12 | Hash + pepper |
| PII Fields | Required | AES-256-GCM | 256-bit | Field-level encryption |
| Financial Records | Required | AES-256-GCM | 256-bit | Column encryption |
| Session Data | Required | AES-256-GCM | 256-bit | Redis encryption |
| Backup Data | Required | AES-256-GCM | 256-bit | Encrypted before storage |
| Uploaded Documents | Required | AES-256-GCM | 256-bit | File encryption |
| Audit Logs | Required | AES-256-GCM | 256-bit | Write-once storage |
| API Keys/Secrets | Required | AES-256-GCM | 256-bit | Secrets manager |

### 2.2 Database Encryption

#### 2.2.1 PostgreSQL Transparent Data Encryption (TDE)

```yaml
# PostgreSQL Configuration
# postgresql.conf

# Enable SSL
ssl = on
ssl_cert_file = '/path/to/server.crt'
ssl_key_file = '/path/to/server.key'
ssl_ca_file = '/path/to/ca.crt'

# Connection encryption
ssl_min_protocol_version = 'TLSv1.3'
ssl_ciphers = 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384'
```

#### 2.2.2 Field-Level Encryption Implementation

```typescript
// Field-Level Encryption for PII
import crypto from 'crypto';

const ENCRYPTION_CONFIG = {
  algorithm: 'aes-256-gcm',
  keyLength: 32,
  ivLength: 16,
  tagLength: 16,
};

// Encryption key management
const DATA_ENCRYPTION_KEY = Buffer.from(process.env.DATA_ENCRYPTION_KEY!, 'base64');

interface EncryptedData {
  encrypted: string;
  iv: string;
  tag: string;
}

function encryptPII(plaintext: string): EncryptedData {
  const iv = crypto.randomBytes(ENCRYPTION_CONFIG.ivLength);
  const cipher = crypto.createCipheriv(
    ENCRYPTION_CONFIG.algorithm,
    DATA_ENCRYPTION_KEY,
    iv
  );

  let encrypted = cipher.update(plaintext, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  const tag = cipher.getAuthTag();

  return {
    encrypted,
    iv: iv.toString('base64'),
    tag: tag.toString('base64'),
  };
}

function decryptPII(encryptedData: EncryptedData): string {
  const decipher = crypto.createDecipheriv(
    ENCRYPTION_CONFIG.algorithm,
    DATA_ENCRYPTION_KEY,
    Buffer.from(encryptedData.iv, 'base64')
  );

  decipher.setAuthTag(Buffer.from(encryptedData.tag, 'base64'));

  let decrypted = decipher.update(encryptedData.encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
```

#### 2.2.3 PII Fields Requiring Encryption

| Entity | Field | Encryption | Notes |
|--------|-------|------------|-------|
| Student | email | Required | Contact PII |
| Student | phone | Required | Contact PII |
| Student | address | Required | Location PII |
| Student | date_of_birth | Required | Identity PII |
| Student | photo_url | Required | Biometric data |
| Parent | email | Required | Contact PII |
| Parent | phone | Required | Contact PII |
| Parent | address | Required | Location PII |
| Parent | national_id | Required | Government ID |
| Payment | transaction_id | Required | Financial |
| Payment | payment_reference | Required | Financial |

### 2.3 File Storage Encryption

```typescript
// Encrypted File Storage
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
});

async function uploadEncryptedFile(
  fileBuffer: Buffer,
  filename: string,
  bucket: string
): Promise<string> {
  // File is encrypted client-side before upload
  const encryptedData = encryptPII(fileBuffer.toString('base64'));

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: filename,
    Body: JSON.stringify(encryptedData),
    ContentType: 'application/octet-stream',
    // Also use server-side encryption
    ServerSideEncryption: 'aws:kms',
    SSEKMSKeyId: process.env.KMS_KEY_ID,
  });

  await s3Client.send(command);

  return filename;
}
```

### 2.4 Key Management

```
┌─────────────────────────────────────────────────────────────────┐
│                    KEY MANAGEMENT LIFECYCLE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   1. KEY GENERATION                                              │
│      │                                                           │
│      │  • Use cryptographically secure random generator         │
│      │  • Generate 256-bit keys for AES-256                     │
│      │  • Generate 4096-bit keys for RSA                        │
│      ▼                                                           │
│   2. KEY STORAGE                                                 │
│      │                                                           │
│      │  • Store in environment variables (minimum)              │
│      │  • Use secrets manager for production (recommended)      │
│      │  • Never commit keys to source control                   │
│      ▼                                                           │
│   3. KEY DISTRIBUTION                                            │
│      │                                                           │
│      │  • Encrypt keys during transmission                      │
│      │  • Use secure channels only                              │
│      │  • Limit access to authorized personnel                  │
│      ▼                                                           │
│   4. KEY ROTATION                                                │
│      │                                                           │
│      │  • Rotate encryption keys quarterly                      │
│      │  • Rotate JWT signing keys quarterly                     │
│      │  • Re-encrypt data with new keys                         │
│      │  • Keep previous keys for decryption (limited time)      │
│      ▼                                                           │
│   5. KEY DESTRUCTION                                             │
│      │                                                           │
│      │  • Securely delete old keys                              │
│      │  • Verify data re-encrypted before destruction           │
│      │  • Document key destruction                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Data Encryption in Transit

### 3.1 TLS Configuration

| Property | Requirement | Value |
|----------|-------------|-------|
| Protocol Version | Minimum | TLS 1.3 |
| Cipher Suites | Required | ECDHE-ECDSA-AES256-GCM-SHA384 |
| Certificate | Required | Valid, trusted CA |
| Key Exchange | Required | ECDHE |
| HSTS | Required | max-age=31536000; includeSubDomains; preload |

### 3.2 HTTPS Enforcement

```typescript
// Force HTTPS Redirect
// middleware.ts (Next.js)

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Force HTTPS in production
  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('x-forwarded-proto') !== 'https'
  ) {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}`,
      301
    );
  }

  return NextResponse.next();
}
```

### 3.3 API Communication Security

```typescript
// Secure API Client Configuration
import axios from 'axios';
import https from 'https';

const secureApiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  httpsAgent: new https.Agent({
    minVersion: 'TLSv1.3',
    rejectUnauthorized: true,  // Verify SSL certificates
  }),
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 3.4 Database Connection Encryption

```typescript
// Prisma Database URL with SSL
// .env

DATABASE_URL="postgresql://user:password@host:5432/db?sslmode=require&sslcert=/path/to/client-cert.pem&sslkey=/path/to/client-key.pem&sslrootcert=/path/to/ca.pem"

// Prisma Client SSL Configuration
// prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // SSL is enforced via connection string
}
```

### 3.5 Internal Service Communication

```typescript
// Internal Service Authentication
const INTERNAL_API_CONFIG = {
  // mTLS for internal services
  mtls: {
    enabled: true,
    clientCert: process.env.CLIENT_CERT_PATH,
    clientKey: process.env.CLIENT_KEY_PATH,
    caCert: process.env.CA_CERT_PATH,
  },

  // Alternative: API key for internal calls
  apiKey: {
    header: 'X-Internal-API-Key',
    key: process.env.INTERNAL_API_KEY,
  },
};
```

---

## 4. PII Handling Procedures

### 4.1 PII Inventory

| Data Element | PII Category | Sensitivity | Collection Purpose | Legal Basis |
|--------------|--------------|-------------|-------------------|-------------|
| Student Name | Direct | High | Identification | Contract |
| Student DOB | Direct | High | Age verification | Legal obligation |
| Student Photo | Biometric | Critical | Identification | Consent |
| Parent Name | Direct | Medium | Contact | Contract |
| Parent Email | Contact | Medium | Communication | Contract |
| Parent Phone | Contact | Medium | Emergency contact | Contract |
| Home Address | Location | High | Records | Contract |
| National ID | Government | Critical | Enrollment | Legal obligation |
| IP Address | Technical | Low | Security | Legitimate interest |
| Device Info | Technical | Low | Analytics | Consent |

### 4.2 PII Access Controls

```typescript
// PII Access Logging Middleware
interface PIIAccessLog {
  timestamp: Date;
  userId: string;
  userRole: string;
  action: 'read' | 'create' | 'update' | 'delete';
  dataType: string;
  dataSubjectId: string;
  fields: string[];
  purpose: string;
  ipAddress: string;
}

async function logPIIAccess(log: PIIAccessLog): Promise<void> {
  await prisma.piiAccessLog.create({
    data: {
      ...log,
      timestamp: new Date(),
    },
  });

  // Alert on suspicious access patterns
  await checkAccessPatterns(log.userId, log.dataType);
}

// Example: Logging student data access
async function getStudentWithPII(
  requesterId: string,
  studentId: string
): Promise<Student> {
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    select: {
      id: true,
      name: true,
      email: true,  // PII
      phone: true,  // PII
      dateOfBirth: true,  // PII
    },
  });

  // Log PII access
  await logPIIAccess({
    timestamp: new Date(),
    userId: requesterId,
    userRole: await getUserRole(requesterId),
    action: 'read',
    dataType: 'student',
    dataSubjectId: studentId,
    fields: ['name', 'email', 'phone', 'dateOfBirth'],
    purpose: 'Student profile view',
    ipAddress: getRequestIP(),
  });

  return student;
}
```

### 4.3 PII Minimization

```typescript
// PII Minimization - Return only necessary fields
interface StudentPublicView {
  id: string;
  name: string;
  classId: string;
  enrollmentNumber: string;
}

interface StudentParentView extends StudentPublicView {
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
}

interface StudentAdminView extends StudentParentView {
  nationalId: string;
  createdAt: Date;
  updatedAt: Date;
}

function getStudentView(
  student: StudentAdminView,
  viewerRole: string
): StudentPublicView | StudentParentView | StudentAdminView {
  switch (viewerRole) {
    case 'admin':
      return student;  // Full access
    case 'parent':
      const { nationalId, createdAt, updatedAt, ...parentView } = student;
      return parentView;
    default:
      const { email, phone, dateOfBirth, address, nationalId: _, createdAt: __, updatedAt: ___, ...publicView } = student;
      return publicView;
  }
}
```

### 4.4 PII Masking

```typescript
// PII Masking for Logs and Displays
const PII_PATTERNS = {
  email: {
    pattern: /^(.)(.*)@(.*)$/,
    mask: (match: RegExpMatchArray) => `${match[1]}***@${match[3]}`,
  },
  phone: {
    pattern: /^(\+?\d{2,3})(\d*)(\d{4})$/,
    mask: (match: RegExpMatchArray) => `${match[1]}****${match[3]}`,
  },
  nationalId: {
    pattern: /^(\d{2})(\d*)(\d{2})$/,
    mask: (match: RegExpMatchArray) => `${match[1]}****${match[3]}`,
  },
};

function maskPII(data: Record<string, unknown>): Record<string, unknown> {
  const masked = { ...data };

  for (const [field, config] of Object.entries(PII_PATTERNS)) {
    if (field in masked && typeof masked[field] === 'string') {
      const match = (masked[field] as string).match(config.pattern);
      if (match) {
        masked[field] = config.mask(match);
      }
    }
  }

  return masked;
}

// Example output:
// { email: 'j***@example.com', phone: '+880****5678' }
```

---

## 5. Child Data Protection (COPPA Compliance)

### 5.1 COPPA Requirements for Smart Academy

Smart Academy handles data of children aged 5-15, requiring special protections:

| Requirement | Implementation | Status |
|-------------|----------------|--------|
| Verifiable Parental Consent | Parent account verification | [ ] |
| Direct Notice to Parents | Email notification system | [ ] |
| Limited Collection | Collect only necessary data | [ ] |
| No Behavioral Advertising | No third-party ad tracking | [ ] |
| Data Security | Encryption, access controls | [ ] |
| Retention Limits | Delete when no longer needed | [ ] |
| Parental Access | View/delete child data | [ ] |
| Confidentiality | Protect from unauthorized access | [ ] |

### 5.2 Parental Consent Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                 PARENTAL CONSENT WORKFLOW                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   1. SCHOOL ENROLLMENT                                           │
│      │                                                           │
│      │  • Parent provides contact information                   │
│      │  • Parent signs physical enrollment form                 │
│      │  • School verifies parent identity                       │
│      ▼                                                           │
│   2. ACCOUNT CREATION                                            │
│      │                                                           │
│      │  • School admin creates parent account                   │
│      │  • System sends welcome email to verified parent email  │
│      │  • Email contains secure activation link                 │
│      ▼                                                           │
│   3. CONSENT COLLECTION                                          │
│      │                                                           │
│      │  • Parent activates account                              │
│      │  • System displays privacy policy                        │
│      │  • Parent reviews data collection practices              │
│      │  • Parent explicitly consents (checkbox + signature)    │
│      ▼                                                           │
│   4. CONSENT RECORD                                              │
│      │                                                           │
│      │  • System records consent timestamp                      │
│      │  • Stores consent version accepted                       │
│      │  • Stores IP address and method                          │
│      │  • Links consent to parent and child accounts           │
│      ▼                                                           │
│   5. ONGOING VERIFICATION                                        │
│      │                                                           │
│      │  • Re-consent required for policy changes               │
│      │  • Annual consent renewal reminder                       │
│      │  • Parent can withdraw consent anytime                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 Consent Management Implementation

```typescript
// Consent Record Schema
interface ParentalConsent {
  id: string;
  parentId: string;
  childId: string;
  consentType: 'initial' | 'renewal' | 'update';
  consentVersion: string;  // Version of privacy policy
  consentedAt: Date;
  ipAddress: string;
  userAgent: string;
  method: 'electronic' | 'physical';
  physicalFormId?: string;  // For scanned physical forms
  withdrawnAt?: Date;
  withdrawalReason?: string;
}

// Prisma Schema
model ParentalConsent {
  id              String    @id @default(uuid())
  parentId        String
  parent          Parent    @relation(fields: [parentId], references: [id])
  childId         String
  child           Student   @relation(fields: [childId], references: [id])
  consentType     String
  consentVersion  String
  consentedAt     DateTime  @default(now())
  ipAddress       String
  userAgent       String
  method          String
  physicalFormId  String?
  withdrawnAt     DateTime?
  withdrawalReason String?

  @@index([parentId])
  @@index([childId])
}

// Check consent before data access
async function checkParentalConsent(childId: string): Promise<boolean> {
  const activeConsent = await prisma.parentalConsent.findFirst({
    where: {
      childId,
      withdrawnAt: null,
      consentVersion: CURRENT_PRIVACY_POLICY_VERSION,
    },
  });

  return !!activeConsent;
}
```

### 5.4 Age-Appropriate Privacy Controls

```typescript
// Age-Based Data Restrictions
const AGE_RESTRICTIONS = {
  // Under 13: Maximum restrictions
  under13: {
    collectableFields: ['name', 'enrollmentNumber', 'classId', 'academicRecords'],
    prohibitedFields: ['email', 'phone', 'socialMedia', 'photo'],
    requiresParentalConsent: true,
    canContactDirectly: false,
  },

  // 13-15: Moderate restrictions
  teen: {
    collectableFields: ['name', 'enrollmentNumber', 'classId', 'academicRecords', 'email'],
    prohibitedFields: ['socialMedia'],
    requiresParentalConsent: true,
    canContactDirectly: true,  // With parent notification
  },

  // 16+: Standard restrictions
  older: {
    collectableFields: ['all'],
    prohibitedFields: [],
    requiresParentalConsent: false,
    canContactDirectly: true,
  },
};

function getDataRestrictions(dateOfBirth: Date): typeof AGE_RESTRICTIONS.under13 {
  const age = calculateAge(dateOfBirth);

  if (age < 13) return AGE_RESTRICTIONS.under13;
  if (age < 16) return AGE_RESTRICTIONS.teen;
  return AGE_RESTRICTIONS.older;
}
```

### 5.5 Child Data Collection Limitations

| Data Type | Under 13 | 13-15 | 16+ | Purpose |
|-----------|----------|-------|-----|---------|
| Name | ✓ | ✓ | ✓ | Identification |
| Date of Birth | ✓ | ✓ | ✓ | Age verification |
| Enrollment Number | ✓ | ✓ | ✓ | Record keeping |
| Academic Records | ✓ | ✓ | ✓ | Education |
| Attendance | ✓ | ✓ | ✓ | Education |
| Quran Progress | ✓ | ✓ | ✓ | Education |
| Email | - | ✓* | ✓ | Communication |
| Phone | - | - | ✓ | Emergency |
| Photo | ✓** | ✓** | ✓ | Identification |
| Location | - | - | - | Never collected |
| Social Media | - | - | - | Never collected |

**Legend:**
- ✓ = Collected
- ✓* = With parent notification
- ✓** = With explicit consent
- \- = Not collected

---

## 6. Data Retention Policies

### 6.1 Retention Schedule

| Data Category | Retention Period | Legal Basis | Auto-Delete |
|---------------|-----------------|-------------|-------------|
| Student Academic Records | Permanent | Education Act | No |
| Student Personal Info | Enrollment + 5 years | Legitimate interest | Yes |
| Student Photos | Enrollment + 1 year | Consent | Yes |
| Attendance Records | 5 years | Audit requirements | Yes |
| Grade Records | Permanent | Education Act | No |
| Fee Records | 7 years | Tax/Financial law | Yes |
| Payment Transactions | 7 years | Tax/Financial law | Yes |
| Parent Contact Info | Enrollment + 1 year | Contract | Yes |
| User Account Data | Account + 2 years | Legitimate interest | Yes |
| Login/Access Logs | 2 years | Security | Yes |
| System Audit Logs | 7 years | Compliance | Yes |
| Application Error Logs | 30 days | Operations | Yes |
| Session Data | 24 hours | Functionality | Yes |
| Temporary Files | 24 hours | Operations | Yes |

### 6.2 Retention Implementation

```typescript
// Automated Data Retention Enforcement
interface RetentionPolicy {
  table: string;
  retentionField: string;
  retentionPeriod: number;  // Days
  action: 'delete' | 'anonymize' | 'archive';
  conditions?: Record<string, unknown>;
}

const RETENTION_POLICIES: RetentionPolicy[] = [
  {
    table: 'students',
    retentionField: 'enrollmentEndDate',
    retentionPeriod: 5 * 365,  // 5 years
    action: 'anonymize',
    conditions: { status: 'graduated' },
  },
  {
    table: 'studentPhotos',
    retentionField: 'uploadedAt',
    retentionPeriod: 365 + 365,  // Enrollment + 1 year
    action: 'delete',
  },
  {
    table: 'accessLogs',
    retentionField: 'createdAt',
    retentionPeriod: 2 * 365,  // 2 years
    action: 'delete',
  },
  {
    table: 'sessionData',
    retentionField: 'createdAt',
    retentionPeriod: 1,  // 24 hours
    action: 'delete',
  },
];

// Scheduled job to enforce retention
async function enforceRetentionPolicies(): Promise<void> {
  for (const policy of RETENTION_POLICIES) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - policy.retentionPeriod);

    if (policy.action === 'delete') {
      await prisma[policy.table].deleteMany({
        where: {
          [policy.retentionField]: { lt: cutoffDate },
          ...policy.conditions,
        },
      });
    } else if (policy.action === 'anonymize') {
      await anonymizeRecords(policy.table, cutoffDate, policy.conditions);
    }

    logger.info('Retention policy enforced', {
      table: policy.table,
      action: policy.action,
      cutoffDate,
    });
  }
}

// Run daily
cron.schedule('0 2 * * *', enforceRetentionPolicies);
```

### 6.3 Data Archival Process

```
┌─────────────────────────────────────────────────────────────────┐
│                     DATA ARCHIVAL PROCESS                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ACTIVE DATA                     ARCHIVED DATA                  │
│   ───────────                     ─────────────                  │
│                                                                  │
│   ┌───────────────┐              ┌───────────────┐              │
│   │  PostgreSQL   │              │  Archive DB   │              │
│   │   (Primary)   │  ─────────>  │  (Cold Store) │              │
│   │               │   Archive    │               │              │
│   │ • Active data │   Process    │ • Read-only   │              │
│   │ • Fast access │              │ • Encrypted   │              │
│   │ • Full CRUD   │              │ • Compressed  │              │
│   └───────────────┘              └───────────────┘              │
│                                                                  │
│   Archive Criteria:                                              │
│   • Graduated students (after 5 years)                          │
│   • Completed academic years (after 7 years)                    │
│   • Financial records (after 7 years)                           │
│                                                                  │
│   Archive Process:                                               │
│   1. Identify eligible records                                  │
│   2. Export to encrypted archive format                         │
│   3. Verify archive integrity                                   │
│   4. Delete from primary database                               │
│   5. Log archive operation                                      │
│                                                                  │
│   Archive Access:                                                │
│   • Admin only                                                   │
│   • Audit logged                                                 │
│   • Read-only access                                             │
│   • Decrypt on access                                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. Data Deletion Procedures

### 7.1 Deletion Types

| Type | Description | Use Case | Reversible |
|------|-------------|----------|------------|
| Soft Delete | Mark as deleted, hide from queries | Normal deletion | Yes (30 days) |
| Hard Delete | Permanently remove from database | After soft delete period | No |
| Anonymization | Replace PII with anonymous values | Retain for analytics | No |
| Secure Wipe | Overwrite storage multiple times | Sensitive data | No |

### 7.2 Soft Delete Implementation

```typescript
// Prisma Soft Delete Schema
model Student {
  id          String    @id @default(uuid())
  name        String
  email       String
  // ... other fields

  // Soft delete fields
  deletedAt   DateTime?
  deletedBy   String?

  @@index([deletedAt])
}

// Prisma middleware for automatic soft delete filtering
prisma.$use(async (params, next) => {
  // Filter out soft-deleted records by default
  if (params.model === 'Student') {
    if (params.action === 'findMany' || params.action === 'findFirst') {
      params.args.where = {
        ...params.args.where,
        deletedAt: null,
      };
    }
  }
  return next(params);
});

// Soft delete function
async function softDeleteStudent(
  studentId: string,
  deletedBy: string
): Promise<void> {
  await prisma.student.update({
    where: { id: studentId },
    data: {
      deletedAt: new Date(),
      deletedBy,
    },
  });

  // Log deletion
  await logDataDeletion({
    entityType: 'student',
    entityId: studentId,
    deletedBy,
    deletionType: 'soft',
    reason: 'User request',
  });
}
```

### 7.3 Hard Delete Process

```typescript
// Hard Delete After Retention Period
async function hardDeleteExpiredRecords(): Promise<void> {
  const softDeleteRetention = 30; // Days before hard delete
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - softDeleteRetention);

  // Find records past soft delete retention
  const recordsToDelete = await prisma.student.findMany({
    where: {
      deletedAt: { lt: cutoffDate },
    },
    select: { id: true },
  });

  for (const record of recordsToDelete) {
    // Hard delete with cascade
    await prisma.$transaction([
      // Delete related records first
      prisma.attendance.deleteMany({ where: { studentId: record.id } }),
      prisma.grade.deleteMany({ where: { studentId: record.id } }),
      prisma.quranProgress.deleteMany({ where: { studentId: record.id } }),
      prisma.feePayment.deleteMany({ where: { studentId: record.id } }),
      // Delete student record
      prisma.student.delete({ where: { id: record.id } }),
    ]);

    // Log hard deletion
    await logDataDeletion({
      entityType: 'student',
      entityId: record.id,
      deletedBy: 'system',
      deletionType: 'hard',
      reason: 'Soft delete retention expired',
    });
  }
}
```

### 7.4 Anonymization Procedure

```typescript
// Data Anonymization for Analytics Retention
async function anonymizeStudentRecord(studentId: string): Promise<void> {
  const anonymousId = crypto.randomUUID();

  await prisma.student.update({
    where: { id: studentId },
    data: {
      // Replace PII with anonymous values
      name: `Anonymous Student ${anonymousId.slice(0, 8)}`,
      email: `anon_${anonymousId}@deleted.local`,
      phone: null,
      address: null,
      dateOfBirth: null,
      photoUrl: null,
      nationalId: null,

      // Set anonymized flag
      isAnonymized: true,
      anonymizedAt: new Date(),
    },
  });

  // Delete associated files
  await deleteStudentFiles(studentId);

  logger.info('Student record anonymized', { studentId });
}
```

### 7.5 User-Requested Deletion

```
┌─────────────────────────────────────────────────────────────────┐
│              USER DATA DELETION REQUEST FLOW                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   1. REQUEST SUBMISSION                                          │
│      │                                                           │
│      │  • User submits deletion request via portal              │
│      │  • Request logged with timestamp                         │
│      │  • Confirmation email sent                               │
│      ▼                                                           │
│   2. VERIFICATION                                                │
│      │                                                           │
│      │  • Verify user identity                                  │
│      │  • For child data: verify parent authority               │
│      │  • Check for legal holds                                 │
│      ▼                                                           │
│   3. IMPACT ASSESSMENT                                           │
│      │                                                           │
│      │  • Identify all data linked to user                      │
│      │  • Check retention requirements                          │
│      │  • Identify data that cannot be deleted                  │
│      ▼                                                           │
│   4. EXECUTION                                                   │
│      │                                                           │
│      │  • Soft delete user account                              │
│      │  • Delete/anonymize linked data                          │
│      │  • Delete uploaded files                                 │
│      │  • Revoke all sessions                                   │
│      ▼                                                           │
│   5. CONFIRMATION                                                │
│      │                                                           │
│      │  • Generate deletion certificate                         │
│      │  • Send confirmation to user                             │
│      │  • Log completion                                        │
│      ▼                                                           │
│   6. HARD DELETE (After 30 days)                                │
│                                                                  │
│      • Permanently remove all data                              │
│      • Verify complete removal                                   │
│                                                                  │
│   TIMELINE: 30 days from request to completion                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. Privacy Policy Technical Implementation

### 8.1 Privacy Policy Features

| Feature | Description | Implementation |
|---------|-------------|----------------|
| Version Control | Track policy versions | Database versioning |
| Consent Tracking | Record user consents | Consent table |
| Change Notification | Notify users of changes | Email + in-app |
| Accessibility | Available in multiple formats | PDF, HTML, Audio |
| Language Support | English and Bengali | i18n system |

### 8.2 Privacy Policy API

```typescript
// Privacy Policy Management
interface PrivacyPolicy {
  id: string;
  version: string;
  effectiveDate: Date;
  content: {
    en: string;
    bn: string;
  };
  changesSummary: string;
  previousVersion?: string;
  status: 'draft' | 'active' | 'archived';
}

// Get current policy
async function getCurrentPrivacyPolicy(): Promise<PrivacyPolicy> {
  return prisma.privacyPolicy.findFirst({
    where: {
      status: 'active',
      effectiveDate: { lte: new Date() },
    },
    orderBy: { effectiveDate: 'desc' },
  });
}

// Check if user needs to accept new policy
async function needsPolicyAcceptance(userId: string): Promise<boolean> {
  const currentPolicy = await getCurrentPrivacyPolicy();
  const userConsent = await prisma.policyConsent.findFirst({
    where: {
      userId,
      policyVersion: currentPolicy.version,
    },
  });

  return !userConsent;
}

// Record policy acceptance
async function recordPolicyAcceptance(
  userId: string,
  policyVersion: string,
  metadata: {
    ipAddress: string;
    userAgent: string;
  }
): Promise<void> {
  await prisma.policyConsent.create({
    data: {
      userId,
      policyVersion,
      acceptedAt: new Date(),
      ipAddress: metadata.ipAddress,
      userAgent: metadata.userAgent,
    },
  });
}
```

### 8.3 Cookie Consent Implementation

```typescript
// Cookie Consent Management
interface CookiePreferences {
  necessary: boolean;  // Always true
  functional: boolean;
  analytics: boolean;
  marketing: boolean;  // Always false for children
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  functional: true,
  analytics: false,
  marketing: false,
};

// Set cookie preferences
function setCookiePreferences(preferences: CookiePreferences): void {
  // Store in HttpOnly cookie
  const cookieValue = Buffer.from(JSON.stringify(preferences)).toString('base64');

  document.cookie = `cookie_consent=${cookieValue}; ` +
    `path=/; ` +
    `max-age=${365 * 24 * 60 * 60}; ` +
    `SameSite=Strict; ` +
    `Secure`;
}

// React Cookie Banner Component
function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

  useEffect(() => {
    const consent = getCookiePreferences();
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: false,  // Never for educational site
    };
    setCookiePreferences(allAccepted);
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    setCookiePreferences(DEFAULT_PREFERENCES);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <h3>Cookie Preferences</h3>
      <p>We use cookies to enhance your experience...</p>
      <button onClick={handleAcceptAll}>Accept All</button>
      <button onClick={handleAcceptNecessary}>Necessary Only</button>
      <button onClick={() => setShowCustomize(true)}>Customize</button>
    </div>
  );
}
```

---

## 9. Data Subject Rights

### 9.1 Rights Implementation

| Right | Description | Implementation | Response Time |
|-------|-------------|----------------|---------------|
| Right to Access | View personal data | Data export feature | 30 days |
| Right to Rectification | Correct inaccurate data | Edit profile feature | 30 days |
| Right to Erasure | Delete personal data | Deletion request | 30 days |
| Right to Portability | Export data in standard format | JSON/CSV export | 30 days |
| Right to Object | Opt-out of processing | Preference settings | Immediate |
| Right to Restrict | Limit processing | Admin request | 30 days |

### 9.2 Data Export Feature

```typescript
// Data Export Implementation
interface DataExportRequest {
  id: string;
  userId: string;
  requestedAt: Date;
  format: 'json' | 'csv';
  status: 'pending' | 'processing' | 'ready' | 'expired';
  downloadUrl?: string;
  expiresAt?: Date;
}

async function generateDataExport(userId: string, format: 'json' | 'csv'): Promise<string> {
  // Collect all user data
  const userData = await collectUserData(userId);

  // Generate export file
  const exportContent = format === 'json'
    ? JSON.stringify(userData, null, 2)
    : convertToCSV(userData);

  // Encrypt export file
  const encryptedExport = encryptPII(exportContent);

  // Store temporarily
  const exportId = crypto.randomUUID();
  await storeExport(exportId, encryptedExport, userId);

  // Generate secure download link
  const downloadToken = generateSecureToken(exportId, userId);

  return `/api/data-export/download?token=${downloadToken}`;
}

async function collectUserData(userId: string): Promise<Record<string, unknown>> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      student: {
        include: {
          attendance: true,
          grades: true,
          quranProgress: true,
        },
      },
      parent: {
        include: {
          children: true,
          payments: true,
        },
      },
      consents: true,
      loginHistory: {
        take: 100,
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  return {
    personalInformation: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt,
    },
    academicRecords: user.student ? {
      attendance: user.student.attendance,
      grades: user.student.grades,
      quranProgress: user.student.quranProgress,
    } : null,
    financialRecords: user.parent ? {
      payments: user.parent.payments,
    } : null,
    consents: user.consents,
    loginHistory: user.loginHistory,
    exportDate: new Date().toISOString(),
  };
}
```

### 9.3 Rights Request Portal

```typescript
// Data Subject Rights Request API
const rightsRequestSchema = z.object({
  type: z.enum(['access', 'rectification', 'erasure', 'portability', 'object', 'restrict']),
  details: z.string().optional(),
  targetData: z.array(z.string()).optional(),
});

// POST /api/privacy/request
async function handleRightsRequest(
  request: FastifyRequest<{ Body: z.infer<typeof rightsRequestSchema> }>,
  reply: FastifyReply
): Promise<void> {
  const { type, details, targetData } = request.body;
  const userId = request.user.id;

  // Create request record
  const rightsRequest = await prisma.rightsRequest.create({
    data: {
      userId,
      type,
      details,
      targetData,
      status: 'pending',
      requestedAt: new Date(),
      dueDate: addDays(new Date(), 30),
    },
  });

  // Send confirmation email
  await sendEmail({
    to: request.user.email,
    template: 'rights-request-confirmation',
    data: {
      requestId: rightsRequest.id,
      type,
      dueDate: rightsRequest.dueDate,
    },
  });

  // Notify admin
  await notifyAdmin({
    type: 'rights-request',
    requestId: rightsRequest.id,
    userId,
    requestType: type,
  });

  reply.send({
    success: true,
    requestId: rightsRequest.id,
    message: 'Your request has been submitted and will be processed within 30 days.',
  });
}
```

---

## 10. Compliance Monitoring

### 10.1 Compliance Dashboard Metrics

| Metric | Description | Target | Alert Threshold |
|--------|-------------|--------|-----------------|
| Consent Coverage | % users with valid consent | 100% | < 95% |
| Retention Compliance | Records past retention deleted | 100% | > 0 overdue |
| Encryption Coverage | % PII fields encrypted | 100% | < 100% |
| Access Log Coverage | % PII access logged | 100% | < 100% |
| Rights Request SLA | Requests processed in time | 100% | < 95% |
| Policy Acceptance | Users on current policy | 100% | < 90% |

### 10.2 Compliance Audit Log

```typescript
// Compliance Event Logging
interface ComplianceEvent {
  id: string;
  timestamp: Date;
  eventType: string;
  category: 'consent' | 'retention' | 'access' | 'rights' | 'breach';
  userId?: string;
  description: string;
  details: Record<string, unknown>;
  outcome: 'success' | 'failure' | 'pending';
}

async function logComplianceEvent(event: Omit<ComplianceEvent, 'id' | 'timestamp'>): Promise<void> {
  await prisma.complianceLog.create({
    data: {
      ...event,
      timestamp: new Date(),
    },
  });
}

// Example events
await logComplianceEvent({
  eventType: 'consent_obtained',
  category: 'consent',
  userId: 'parent-123',
  description: 'Parental consent obtained for child data collection',
  details: {
    childId: 'student-456',
    policyVersion: '2.0',
    method: 'electronic',
  },
  outcome: 'success',
});

await logComplianceEvent({
  eventType: 'retention_enforcement',
  category: 'retention',
  description: 'Automated retention policy enforcement completed',
  details: {
    recordsDeleted: 150,
    recordsAnonymized: 30,
    tables: ['students', 'accessLogs'],
  },
  outcome: 'success',
});
```

### 10.3 Periodic Compliance Review

```
┌─────────────────────────────────────────────────────────────────┐
│                COMPLIANCE REVIEW SCHEDULE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   DAILY                                                          │
│   • Automated retention enforcement                             │
│   • Access log review (automated alerts)                        │
│   • Consent status check                                        │
│                                                                  │
│   WEEKLY                                                         │
│   • Rights request status review                                │
│   • Failed encryption alerts review                             │
│   • Unusual access pattern review                               │
│                                                                  │
│   MONTHLY                                                        │
│   • Full compliance metrics report                              │
│   • Policy acceptance rate review                               │
│   • Consent expiration review                                   │
│   • Data minimization review                                    │
│                                                                  │
│   QUARTERLY                                                      │
│   • Complete data inventory review                              │
│   • Third-party data sharing audit                              │
│   • Key rotation verification                                   │
│   • Training compliance check                                   │
│                                                                  │
│   ANNUALLY                                                       │
│   • Full compliance audit                                       │
│   • Privacy policy review and update                            │
│   • Risk assessment update                                      │
│   • External audit (if required)                                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 10.4 Breach Response Procedure

```
┌─────────────────────────────────────────────────────────────────┐
│                  DATA BREACH RESPONSE PLAN                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   PHASE 1: DETECTION (0-1 hour)                                 │
│   ─────────────────────────────                                 │
│   • Identify breach scope                                       │
│   • Contain the breach                                          │
│   • Preserve evidence                                           │
│   • Activate incident response team                             │
│                                                                  │
│   PHASE 2: ASSESSMENT (1-24 hours)                              │
│   ────────────────────────────────                              │
│   • Determine affected data types                               │
│   • Identify affected individuals                               │
│   • Assess risk level (child data increases severity)          │
│   • Document timeline                                           │
│                                                                  │
│   PHASE 3: NOTIFICATION (24-72 hours)                           │
│   ───────────────────────────────────                           │
│   • Notify school management                                    │
│   • Notify regulatory authorities (if required)                │
│   • Prepare affected individual notifications                   │
│   • For child data: prioritize parent notification             │
│                                                                  │
│   PHASE 4: REMEDIATION (72+ hours)                              │
│   ────────────────────────────────                              │
│   • Implement security fixes                                    │
│   • Monitor for further compromise                              │
│   • Provide support to affected individuals                     │
│   • Document lessons learned                                    │
│                                                                  │
│   PHASE 5: POST-INCIDENT (30 days)                              │
│   ───────────────────────────────                               │
│   • Complete incident report                                    │
│   • Update security controls                                    │
│   • Conduct training if needed                                  │
│   • Review and update procedures                                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Developer | | _________________ | ________ |
| Data Protection Officer | | _________________ | ________ |
| Principal | | _________________ | ________ |

---

**Document Version:** 1.0
**Last Updated:** January 10, 2026
**Status:** Pending Approval
**Next Review Date:** July 10, 2026

---

*This Data Protection & Privacy Document establishes the technical and procedural controls for protecting personal data in the Smart Academy Digital Portal. All data handling must comply with these requirements to ensure privacy protection and regulatory compliance.*

---

## References

- [FTC COPPA Rule 2025](https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa)
- [COPPA Compliance Guide 2025](https://blog.promise.legal/startup-central/coppa-compliance-in-2025-a-practical-guide-for-tech-edtech-and-kids-apps/)
- [Bangladesh ICT Act 2006](http://www.btrc.gov.bd/site/page/0e9a0e35-decd-4c8a-a3e9-d3e4e20e41c9)
- [NIST Privacy Framework](https://www.nist.gov/privacy-framework)
- [OWASP Data Protection Guidelines](https://owasp.org/)
