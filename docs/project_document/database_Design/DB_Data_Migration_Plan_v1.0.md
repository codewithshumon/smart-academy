# Smart Academy Digital Portal - Data Migration Plan

**Document Version:** 1.0
**Last Updated:** January 2026
**Document Status:** Draft
**Author:** Smart Academy Development Team

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Migration Overview](#2-migration-overview)
3. [Source Data Analysis](#3-source-data-analysis)
4. [Target System Architecture](#4-target-system-architecture)
5. [Data Mapping Specifications](#5-data-mapping-specifications)
6. [Migration Scripts](#6-migration-scripts)
7. [Data Validation Procedures](#7-data-validation-procedures)
8. [Rollback Procedures](#8-rollback-procedures)
9. [Migration Schedule](#9-migration-schedule)
10. [Risk Management](#10-risk-management)
11. [Post-Migration Activities](#11-post-migration-activities)

---

## 1. Executive Summary

### 1.1 Purpose

This document provides a comprehensive plan for migrating data to the Smart Academy Digital Portal. It covers migration from legacy systems, initial data seeding, and integration with Gibbon SMS and Moodle LMS platforms.

### 1.2 Scope

The migration plan addresses:
- **New Installation**: Initial setup with seed data for fresh deployments
- **Legacy Migration**: Migration from existing school management systems
- **Platform Integration**: Data synchronization with Gibbon SMS and Moodle LMS
- **Incremental Updates**: Ongoing data synchronization procedures

### 1.3 Migration Strategy

The Smart Academy Digital Portal uses a **phased migration approach**:

| Phase | Description | Duration |
|-------|-------------|----------|
| Phase 1 | Infrastructure Setup & Schema Creation | 1-2 days |
| Phase 2 | Reference Data & Configuration | 1 day |
| Phase 3 | User & Authentication Data | 1-2 days |
| Phase 4 | Academic Core Data | 2-3 days |
| Phase 5 | Islamic Education Data | 1-2 days |
| Phase 6 | Financial Data | 1-2 days |
| Phase 7 | Historical & Archive Data | 2-3 days |
| Phase 8 | Validation & Go-Live | 1-2 days |

### 1.4 Key Success Metrics

| Metric | Target |
|--------|--------|
| Data Accuracy | 99.9% |
| Zero Data Loss | 100% |
| Downtime | < 4 hours |
| Rollback Capability | Full within 2 hours |
| Validation Pass Rate | 100% critical, 95% non-critical |

---

## 2. Migration Overview

### 2.1 Migration Types

#### 2.1.1 Fresh Installation (New School)

For schools without existing digital systems:
- Deploy database schemas
- Load reference data (roles, permissions, fee structures)
- Create initial admin accounts
- Configure system settings

#### 2.1.2 Legacy System Migration

For schools migrating from existing systems:
- Extract data from legacy database
- Transform to new schema format
- Load into Smart Academy database
- Validate data integrity

#### 2.1.3 Platform Integration

For Gibbon SMS and Moodle LMS integration:
- Extend Gibbon database with custom tables
- Configure Moodle database connections
- Set up synchronization procedures
- Establish data flow pipelines

### 2.2 Database Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Smart Academy Platform                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   PostgreSQL    │  │     MySQL       │  │    Redis     │ │
│  │   (Primary)     │  │   (Gibbon/      │  │   (Cache)    │ │
│  │                 │  │    Moodle)      │  │              │ │
│  │  - auth         │  │  - gibbonPerson │  │  - sessions  │ │
│  │  - academic     │  │  - gibbonStudent│  │  - cache     │ │
│  │  - islamic      │  │  - mdl_user     │  │  - queues    │ │
│  │  - financial    │  │  - mdl_course   │  │              │ │
│  │  - communication│  │                 │  │              │ │
│  │  - content      │  │                 │  │              │ │
│  │  - analytics    │  │                 │  │              │ │
│  │  - audit        │  │                 │  │              │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 Migration Tools

| Tool | Purpose | Version |
|------|---------|---------|
| Prisma Migrate | Schema migrations | 6.x |
| pg_dump/pg_restore | PostgreSQL backup/restore | 17+ |
| mysqldump | MySQL backup/restore | 8.0+ |
| Node.js Scripts | Custom ETL operations | 22 LTS |
| Redis CLI | Cache management | 7+ |

---

## 3. Source Data Analysis

### 3.1 Potential Source Systems

#### 3.1.1 Common Legacy Systems

| System Type | Examples | Data Format |
|-------------|----------|-------------|
| Spreadsheets | Excel, Google Sheets | CSV, XLSX |
| Access Database | MS Access | MDB, ACCDB |
| Simple Database | SQLite | DB file |
| Web Applications | Custom PHP/MySQL | MySQL dump |
| Paper Records | Physical files | Manual entry |

#### 3.1.2 Gibbon SMS (Existing Installation)

If migrating from existing Gibbon installation:

```sql
-- Key Gibbon Tables
gibbonPerson           -- User accounts
gibbonStudent          -- Student records
gibbonFamily           -- Family/guardian data
gibbonFamilyChild      -- Student-family relationships
gibbonSchoolYear       -- Academic years
gibbonYearGroup        -- Grade levels
gibbonFormGroup        -- Classes/sections
gibbonStudentEnrolment -- Enrollment records
gibbonAttendanceLogPerson -- Attendance records
gibbonFinanceInvoice   -- Invoices
gibbonFinanceInvoiceFee -- Invoice items
gibbonPayment          -- Payments
```

#### 3.1.3 Moodle LMS (Existing Installation)

If migrating from existing Moodle installation:

```sql
-- Key Moodle Tables
mdl_user              -- User accounts
mdl_course            -- Courses
mdl_course_categories -- Course categories
mdl_enrol             -- Enrollment methods
mdl_user_enrolments   -- User enrollments
mdl_grade_items       -- Grade items
mdl_grade_grades      -- Student grades
```

### 3.2 Data Profiling Template

For each source system, complete the following analysis:

#### 3.2.1 Data Inventory

| Source Entity | Record Count | Date Range | Key Fields | Quality Issues |
|---------------|--------------|------------|------------|----------------|
| Students | | | | |
| Guardians | | | | |
| Teachers | | | | |
| Classes | | | | |
| Enrollments | | | | |
| Attendance | | | | |
| Grades | | | | |
| Invoices | | | | |
| Payments | | | | |

#### 3.2.2 Data Quality Assessment

```sql
-- Sample data quality queries for source analysis

-- Check for duplicate emails
SELECT email, COUNT(*) as count
FROM source_users
GROUP BY email
HAVING COUNT(*) > 1;

-- Check for null required fields
SELECT COUNT(*) as null_count, 'email' as field
FROM source_users WHERE email IS NULL
UNION ALL
SELECT COUNT(*), 'first_name'
FROM source_users WHERE first_name IS NULL;

-- Check date ranges
SELECT MIN(enrollment_date), MAX(enrollment_date)
FROM source_enrollments;

-- Check referential integrity
SELECT s.id, s.student_number
FROM source_students s
LEFT JOIN source_users u ON s.user_id = u.id
WHERE u.id IS NULL;
```

#### 3.2.3 Data Volume Estimation

| Entity | Current Records | Growth Rate | 5-Year Projection |
|--------|-----------------|-------------|-------------------|
| Users | | /year | |
| Students | | /year | |
| Attendance | | /day | |
| Invoices | | /year | |
| Payments | | /year | |
| Audit Logs | | /day | |

### 3.3 Data Cleansing Requirements

#### 3.3.1 Common Data Issues

| Issue Type | Description | Resolution Strategy |
|------------|-------------|---------------------|
| Duplicate Records | Same entity entered multiple times | Merge with master record selection |
| Missing Required Data | NULL values in required fields | Default values or manual correction |
| Invalid Formats | Incorrect email, phone formats | Regex-based correction or flagging |
| Orphaned Records | Child records without parents | Delete or create placeholder parents |
| Inconsistent Naming | Variations in names/codes | Standardization mapping |
| Date Format Issues | Mixed date formats | Parse and normalize to ISO 8601 |
| Encoding Issues | Character encoding problems | Convert to UTF-8 |

#### 3.3.2 Data Cleansing Scripts

```javascript
// data-cleansing/cleanEmail.js
const cleanEmail = (email) => {
  if (!email) return null;

  // Trim whitespace
  let cleaned = email.trim().toLowerCase();

  // Remove multiple @ symbols (keep first)
  const atCount = (cleaned.match(/@/g) || []).length;
  if (atCount > 1) {
    const firstAt = cleaned.indexOf('@');
    cleaned = cleaned.substring(0, firstAt + 1) +
              cleaned.substring(firstAt + 1).replace(/@/g, '');
  }

  // Validate format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(cleaned)) {
    return { valid: false, original: email, cleaned: null };
  }

  return { valid: true, original: email, cleaned };
};

// data-cleansing/cleanPhone.js
const cleanPhone = (phone) => {
  if (!phone) return null;

  // Remove all non-numeric characters except +
  let cleaned = phone.replace(/[^\d+]/g, '');

  // Ensure + is only at the beginning
  if (cleaned.includes('+') && cleaned.indexOf('+') !== 0) {
    cleaned = cleaned.replace(/\+/g, '');
  }

  // Add Malaysian country code if missing
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    cleaned = '+60' + cleaned.substring(1);
  }

  return cleaned;
};

// data-cleansing/cleanName.js
const cleanName = (name) => {
  if (!name) return null;

  // Trim and normalize whitespace
  let cleaned = name.trim().replace(/\s+/g, ' ');

  // Title case
  cleaned = cleaned.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  // Handle special cases (Mc, O', etc.)
  cleaned = cleaned
    .replace(/\bMc([a-z])/g, (_, letter) => 'Mc' + letter.toUpperCase())
    .replace(/\bO'([a-z])/g, (_, letter) => "O'" + letter.toUpperCase());

  return cleaned;
};
```

---

## 4. Target System Architecture

### 4.1 PostgreSQL Schema Structure

```
smart_academy_db
├── auth (Authentication & Authorization)
│   ├── users
│   ├── roles
│   ├── permissions
│   ├── user_roles
│   ├── role_permissions
│   ├── sessions
│   └── refresh_tokens
├── academic (Academic Management)
│   ├── academic_years
│   ├── students
│   ├── guardians
│   ├── student_guardians
│   ├── teachers
│   ├── classes
│   ├── enrollments
│   └── attendance
├── islamic (Islamic Education)
│   ├── quran_programs
│   ├── quran_enrollments
│   ├── hafiz_progress
│   ├── murajaah_sessions
│   ├── tajweed_assessments
│   └── islamic_studies_grades
├── financial (Financial Management)
│   ├── fee_structures
│   ├── invoices
│   ├── invoice_items
│   ├── payments
│   ├── payment_allocations
│   ├── scholarships
│   └── student_scholarships
├── communication (Messaging & Notifications)
│   ├── notifications
│   ├── messages
│   └── announcements
├── content (CMS)
│   ├── pages
│   └── media
├── analytics (Reporting)
│   ├── dashboard_metrics
│   └── report_cache
└── audit (Audit Trail)
    └── audit_log
```

### 4.2 Gibbon MySQL Extensions

```sql
-- Custom tables added to Gibbon database

-- Islamic Education Extensions
CREATE TABLE gibbonQuranProgram (
    gibbonQuranProgramID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    programType ENUM('hifz_full', 'hifz_partial', 'tilawah', 'tajweed') NOT NULL,
    description TEXT,
    isActive TINYINT(1) DEFAULT 1
);

CREATE TABLE gibbonQuranEnrollment (
    gibbonQuranEnrollmentID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    gibbonPersonID INT UNSIGNED NOT NULL,
    gibbonQuranProgramID INT UNSIGNED NOT NULL,
    gibbonSchoolYearID INT UNSIGNED NOT NULL,
    enrollmentDate DATE NOT NULL,
    status ENUM('active', 'completed', 'withdrawn') DEFAULT 'active',
    FOREIGN KEY (gibbonPersonID) REFERENCES gibbonPerson(gibbonPersonID),
    FOREIGN KEY (gibbonQuranProgramID) REFERENCES gibbonQuranProgram(gibbonQuranProgramID),
    FOREIGN KEY (gibbonSchoolYearID) REFERENCES gibbonSchoolYear(gibbonSchoolYearID)
);

CREATE TABLE gibbonHafizProgress (
    gibbonHafizProgressID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    gibbonQuranEnrollmentID INT UNSIGNED NOT NULL,
    surahNumber TINYINT UNSIGNED NOT NULL,
    juzNumber TINYINT UNSIGNED NOT NULL,
    status ENUM('not_started', 'in_progress', 'completed', 'certified') DEFAULT 'not_started',
    versesMemorized INT UNSIGNED DEFAULT 0,
    totalVerses INT UNSIGNED NOT NULL,
    qualityScore DECIMAL(5,2),
    startDate DATE,
    completionDate DATE,
    lastReviewedAt DATE,
    FOREIGN KEY (gibbonQuranEnrollmentID) REFERENCES gibbonQuranEnrollment(gibbonQuranEnrollmentID)
);
```

### 4.3 Redis Data Structures

```javascript
// Redis key patterns and data structures

// Session storage
// Key: session:{sessionId}
// Type: Hash
{
  userId: "uuid",
  email: "user@example.com",
  roles: ["admin", "teacher"],
  createdAt: "2026-01-10T10:00:00Z",
  expiresAt: "2026-01-11T10:00:00Z"
}

// User cache
// Key: user:{userId}
// Type: Hash
// TTL: 3600 seconds

// Rate limiting
// Key: ratelimit:{userId}:{endpoint}
// Type: String (counter)
// TTL: 60 seconds

// Job queues
// Key: queue:email
// Type: List (FIFO)

// Real-time notifications
// Key: notifications:{userId}
// Type: Sorted Set (score = timestamp)
```

---

## 5. Data Mapping Specifications

### 5.1 User Data Mapping

#### 5.1.1 Legacy System to PostgreSQL

| Source Field | Target Field | Transformation | Notes |
|-------------|--------------|----------------|-------|
| user_id | auth.users.id | Generate UUID | New UUID for each user |
| email | auth.users.email | Lowercase, trim | Validate format |
| password | auth.users.password_hash | Argon2id hash | Rehash required |
| first_name | auth.users.first_name | Title case | Clean whitespace |
| last_name | auth.users.last_name | Title case | Clean whitespace |
| phone | auth.users.phone | Format standardization | Add country code |
| status | auth.users.status | Map to enum | See mapping table |
| created_date | auth.users.created_at | ISO 8601 | Convert timezone |
| modified_date | auth.users.updated_at | ISO 8601 | Convert timezone |

**Status Mapping:**

| Legacy Value | Target Value |
|--------------|--------------|
| 'A', 'active', '1', 'yes' | 'active' |
| 'I', 'inactive', '0', 'no' | 'inactive' |
| 'P', 'pending', 'new' | 'pending' |
| 'S', 'suspended', 'blocked' | 'suspended' |
| 'D', 'deleted', 'archived' | 'archived' |

#### 5.1.2 Gibbon to PostgreSQL Sync

| Gibbon Field | PostgreSQL Field | Sync Direction | Conflict Resolution |
|--------------|------------------|----------------|---------------------|
| gibbonPerson.email | auth.users.email | Bidirectional | Gibbon wins |
| gibbonPerson.preferredName | auth.users.first_name | Gibbon → PG | - |
| gibbonPerson.surname | auth.users.last_name | Gibbon → PG | - |
| gibbonPerson.phone1 | auth.users.phone | Bidirectional | Latest wins |
| gibbonPerson.status | auth.users.status | Bidirectional | Map values |
| gibbonPerson.image_240 | auth.users.avatar_url | Gibbon → PG | - |

### 5.2 Student Data Mapping

#### 5.2.1 Legacy to PostgreSQL

| Source Field | Target Field | Transformation | Notes |
|-------------|--------------|----------------|-------|
| student_id | academic.students.id | Generate UUID | New identifier |
| user_id | academic.students.user_id | FK lookup | Match by email |
| student_number | academic.students.student_number | Format: STU{YEAR}{CODE}{SEQ} | Generate if missing |
| dob | academic.students.date_of_birth | Parse date | Multiple formats |
| gender | academic.students.gender | Map to enum | 'M'→'male', 'F'→'female' |
| nationality | academic.students.nationality | Standardize | ISO country names |
| ic_number | academic.students.national_id | Format validation | Malaysian IC format |
| blood_group | academic.students.blood_type | Map to enum | Standardize format |
| medical_info | academic.students.medical_notes | Text | Concatenate fields |
| admission_date | academic.students.admission_date | Parse date | Default to current |
| status | academic.students.status | Map to enum | See mapping |
| address_* | academic.students.address | JSON object | Combine address fields |

#### 5.2.2 Gibbon to PostgreSQL Student Sync

```javascript
// Gibbon to PostgreSQL student mapping
const mapGibbonStudent = (gibbonStudent, gibbonPerson) => ({
  id: generateUUID(),
  user_id: lookupUserByGibbonPersonId(gibbonPerson.gibbonPersonID),
  student_number: gibbonStudent.studentID || generateStudentNumber(),
  date_of_birth: parseDate(gibbonPerson.dob),
  gender: mapGender(gibbonPerson.gender),
  nationality: gibbonPerson.countryOfBirth,
  national_id: gibbonPerson.nationalIDCardNumber,
  blood_type: mapBloodType(gibbonPerson.bloodType),
  medical_notes: gibbonPerson.medicalConditions,
  admission_date: parseDate(gibbonStudent.dateStart),
  status: mapStudentStatus(gibbonPerson.status),
  address: {
    line1: gibbonPerson.address1,
    line2: gibbonPerson.address2,
    city: gibbonPerson.city,
    state: gibbonPerson.stateProvince,
    postal_code: gibbonPerson.postcode,
    country: gibbonPerson.country
  }
});
```

### 5.3 Islamic Education Data Mapping

#### 5.3.1 Quran Progress Mapping

| Source Field | Target Field | Transformation | Notes |
|-------------|--------------|----------------|-------|
| student_id | islamic.hafiz_progress.enrollment_id | FK lookup | Via student→enrollment |
| surah_no | islamic.hafiz_progress.surah_number | Integer 1-114 | Validate range |
| juz_no | islamic.hafiz_progress.juz_number | Calculate or map | Based on Surah |
| status | islamic.hafiz_progress.status | Map to enum | See mapping |
| verses_done | islamic.hafiz_progress.verses_memorized | Integer | Non-negative |
| total_verses | islamic.hafiz_progress.total_verses | Lookup | Standard Surah verses |
| quality_pct | islamic.hafiz_progress.quality_score | Decimal | 0-100 range |
| start_date | islamic.hafiz_progress.start_date | Parse date | |
| complete_date | islamic.hafiz_progress.completion_date | Parse date | NULL if not complete |

**Memorization Status Mapping:**

| Legacy Value | Target Value |
|--------------|--------------|
| 'N', 'not_started', '0' | 'not_started' |
| 'P', 'in_progress', 'ongoing' | 'in_progress' |
| 'C', 'completed', 'done' | 'completed' |
| 'R', 'reviewing', 'review' | 'under_review' |
| 'V', 'verified', 'certified' | 'certified' |

### 5.4 Financial Data Mapping

#### 5.4.1 Invoice Mapping

| Source Field | Target Field | Transformation | Notes |
|-------------|--------------|----------------|-------|
| invoice_id | financial.invoices.id | Generate UUID | |
| invoice_no | financial.invoices.invoice_number | Format: INV-{YEAR}-{SEQ} | |
| student_id | financial.invoices.student_id | FK lookup | By student number |
| academic_year | financial.invoices.academic_year_id | FK lookup | By year name |
| invoice_date | financial.invoices.invoice_date | Parse date | |
| due_date | financial.invoices.due_date | Parse date | Default +30 days |
| subtotal | financial.invoices.subtotal | Decimal | Recalculate |
| discount | financial.invoices.discount_amount | Decimal | Default 0 |
| tax | financial.invoices.tax_amount | Decimal | Default 0 |
| total | financial.invoices.total_amount | Decimal | Recalculate |
| paid | financial.invoices.paid_amount | Decimal | Sum of payments |
| balance | financial.invoices.balance_due | Calculate | total - paid |
| status | financial.invoices.status | Map to enum | Based on balance |

#### 5.4.2 Gibbon Finance Sync

```javascript
// Gibbon invoice to PostgreSQL mapping
const mapGibbonInvoice = (gibbonInvoice) => ({
  id: generateUUID(),
  invoice_number: `INV-${gibbonInvoice.gibbonSchoolYearID}-${String(gibbonInvoice.invoiceNumber).padStart(6, '0')}`,
  student_id: lookupStudentByGibbonPersonId(gibbonInvoice.gibbonPersonID),
  academic_year_id: lookupAcademicYearByGibbonId(gibbonInvoice.gibbonSchoolYearID),
  invoice_date: parseDate(gibbonInvoice.invoiceIssueDate),
  due_date: parseDate(gibbonInvoice.invoiceDueDate),
  subtotal: parseFloat(gibbonInvoice.totalValue) || 0,
  discount_amount: 0, // Gibbon handles differently
  tax_amount: 0,
  total_amount: parseFloat(gibbonInvoice.totalValue) || 0,
  paid_amount: parseFloat(gibbonInvoice.paidAmount) || 0,
  balance_due: parseFloat(gibbonInvoice.totalValue) - parseFloat(gibbonInvoice.paidAmount) || 0,
  status: mapInvoiceStatus(gibbonInvoice.status, gibbonInvoice.totalValue, gibbonInvoice.paidAmount),
  currency: 'MYR'
});
```

---

## 6. Migration Scripts

### 6.1 Schema Migration Scripts

#### 6.1.1 Prisma Schema Migrations

```bash
# Initialize Prisma migrations
npx prisma migrate dev --name init_schema

# Generate migration for specific changes
npx prisma migrate dev --name add_islamic_education

# Apply migrations to production
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

#### 6.1.2 PostgreSQL Direct Schema Creation

```sql
-- scripts/001_create_schemas.sql
-- Create database schemas

CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS academic;
CREATE SCHEMA IF NOT EXISTS islamic;
CREATE SCHEMA IF NOT EXISTS financial;
CREATE SCHEMA IF NOT EXISTS communication;
CREATE SCHEMA IF NOT EXISTS content;
CREATE SCHEMA IF NOT EXISTS analytics;
CREATE SCHEMA IF NOT EXISTS audit;

-- Grant schema permissions
GRANT USAGE ON SCHEMA auth TO smart_academy_app;
GRANT USAGE ON SCHEMA academic TO smart_academy_app;
GRANT USAGE ON SCHEMA islamic TO smart_academy_app;
GRANT USAGE ON SCHEMA financial TO smart_academy_app;
GRANT USAGE ON SCHEMA communication TO smart_academy_app;
GRANT USAGE ON SCHEMA content TO smart_academy_app;
GRANT USAGE ON SCHEMA analytics TO smart_academy_app;
GRANT USAGE ON SCHEMA audit TO smart_academy_app;
```

```sql
-- scripts/002_create_enums.sql
-- Create custom enumeration types

CREATE TYPE auth.user_status AS ENUM (
    'pending', 'active', 'inactive', 'suspended', 'archived'
);

CREATE TYPE academic.gender_type AS ENUM ('male', 'female');

CREATE TYPE academic.student_status AS ENUM (
    'active', 'graduated', 'withdrawn', 'expelled', 'transferred', 'on_leave'
);

CREATE TYPE academic.attendance_status AS ENUM (
    'present', 'absent', 'late', 'excused', 'sick', 'holiday'
);

CREATE TYPE islamic.memorization_status AS ENUM (
    'not_started', 'in_progress', 'completed', 'under_review', 'certified'
);

CREATE TYPE islamic.quality_rating AS ENUM (
    'excellent', 'very_good', 'good', 'satisfactory', 'needs_improvement', 'poor'
);

CREATE TYPE financial.invoice_status AS ENUM (
    'draft', 'sent', 'partially_paid', 'paid', 'overdue', 'cancelled', 'refunded'
);

CREATE TYPE financial.payment_status AS ENUM (
    'pending', 'completed', 'failed', 'cancelled', 'refunded'
);

CREATE TYPE audit.audit_operation AS ENUM ('INSERT', 'UPDATE', 'DELETE');
```

### 6.2 Data Migration Scripts

#### 6.2.1 Migration Runner

```javascript
// scripts/migrate.js
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const migrations = [
  '001_seed_roles_permissions',
  '002_migrate_users',
  '003_migrate_students',
  '004_migrate_guardians',
  '005_migrate_teachers',
  '006_migrate_classes',
  '007_migrate_enrollments',
  '008_migrate_quran_programs',
  '009_migrate_hafiz_progress',
  '010_migrate_fee_structures',
  '011_migrate_invoices',
  '012_migrate_payments',
  '013_create_audit_triggers'
];

async function runMigrations() {
  console.log('Starting data migration...\n');

  for (const migration of migrations) {
    console.log(`Running: ${migration}`);

    try {
      const migrationModule = require(`./migrations/${migration}`);

      const startTime = Date.now();
      const result = await migrationModule.run(prisma);
      const duration = Date.now() - startTime;

      console.log(`  ✓ Completed in ${duration}ms`);
      console.log(`  Records processed: ${result.processed}`);
      console.log(`  Records migrated: ${result.migrated}`);
      console.log(`  Errors: ${result.errors}\n`);

      // Log to migration history
      await logMigration(migration, result, duration);

    } catch (error) {
      console.error(`  ✗ Failed: ${error.message}`);
      throw error;
    }
  }

  console.log('Migration completed successfully!');
}

async function logMigration(name, result, duration) {
  await prisma.$executeRaw`
    INSERT INTO migration_history (name, processed, migrated, errors, duration_ms, completed_at)
    VALUES (${name}, ${result.processed}, ${result.migrated}, ${result.errors}, ${duration}, NOW())
  `;
}

runMigrations()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

#### 6.2.2 User Migration Script

```javascript
// scripts/migrations/002_migrate_users.js
const argon2 = require('argon2');
const { v4: uuidv4 } = require('uuid');

const statusMapping = {
  'A': 'active', 'active': 'active', '1': 'active',
  'I': 'inactive', 'inactive': 'inactive', '0': 'inactive',
  'P': 'pending', 'pending': 'pending',
  'S': 'suspended', 'suspended': 'suspended',
  'D': 'archived', 'deleted': 'archived', 'archived': 'archived'
};

async function run(prisma) {
  const stats = { processed: 0, migrated: 0, errors: 0 };

  // Fetch source data
  const sourceUsers = await fetchSourceUsers();

  for (const sourceUser of sourceUsers) {
    stats.processed++;

    try {
      // Check if user already exists
      const existing = await prisma.user.findUnique({
        where: { email: sourceUser.email.toLowerCase().trim() }
      });

      if (existing) {
        console.log(`  Skipping duplicate: ${sourceUser.email}`);
        continue;
      }

      // Transform and insert
      const newUser = await prisma.user.create({
        data: {
          id: uuidv4(),
          email: sourceUser.email.toLowerCase().trim(),
          passwordHash: await rehashPassword(sourceUser.password),
          firstName: cleanName(sourceUser.first_name),
          lastName: cleanName(sourceUser.last_name),
          phone: cleanPhone(sourceUser.phone),
          status: mapStatus(sourceUser.status),
          emailVerified: sourceUser.email_verified === 1,
          createdAt: parseDate(sourceUser.created_date) || new Date(),
          updatedAt: new Date()
        }
      });

      // Store mapping for FK resolution
      await storeIdMapping('users', sourceUser.id, newUser.id);

      stats.migrated++;

    } catch (error) {
      console.error(`  Error migrating user ${sourceUser.id}: ${error.message}`);
      stats.errors++;

      // Log error for review
      await logMigrationError('users', sourceUser.id, error.message);
    }
  }

  return stats;
}

async function rehashPassword(legacyHash) {
  // For security, require password reset
  // Generate a random password that will force reset
  const tempPassword = uuidv4();
  return await argon2.hash(tempPassword, {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4
  });
}

function mapStatus(sourceStatus) {
  const normalized = String(sourceStatus).toLowerCase().trim();
  return statusMapping[normalized] || 'pending';
}

function cleanName(name) {
  if (!name) return '';
  return name.trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function cleanPhone(phone) {
  if (!phone) return null;
  let cleaned = phone.replace(/[^\d+]/g, '');
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    cleaned = '+60' + cleaned.substring(1);
  }
  return cleaned;
}

function parseDate(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
}

module.exports = { run };
```

#### 6.2.3 Student Migration Script

```javascript
// scripts/migrations/003_migrate_students.js
const { v4: uuidv4 } = require('uuid');

const genderMapping = {
  'M': 'male', 'male': 'male', 'm': 'male', '1': 'male',
  'F': 'female', 'female': 'female', 'f': 'female', '2': 'female'
};

const studentStatusMapping = {
  'A': 'active', 'active': 'active',
  'G': 'graduated', 'graduated': 'graduated',
  'W': 'withdrawn', 'withdrawn': 'withdrawn',
  'E': 'expelled', 'expelled': 'expelled',
  'T': 'transferred', 'transferred': 'transferred',
  'L': 'on_leave', 'leave': 'on_leave'
};

async function run(prisma) {
  const stats = { processed: 0, migrated: 0, errors: 0 };

  const sourceStudents = await fetchSourceStudents();

  for (const source of sourceStudents) {
    stats.processed++;

    try {
      // Get mapped user ID
      const userId = await getIdMapping('users', source.user_id);

      if (!userId) {
        console.log(`  Skipping student ${source.id}: No user mapping found`);
        stats.errors++;
        continue;
      }

      // Generate student number if missing
      const studentNumber = source.student_number ||
        await generateStudentNumber(source.admission_date);

      const student = await prisma.student.create({
        data: {
          id: uuidv4(),
          userId: userId,
          studentNumber: studentNumber,
          dateOfBirth: parseDate(source.dob),
          gender: mapGender(source.gender),
          nationality: source.nationality || 'Malaysian',
          nationalId: cleanNationalId(source.ic_number),
          bloodType: mapBloodType(source.blood_type),
          medicalNotes: source.medical_info,
          admissionDate: parseDate(source.admission_date) || new Date(),
          status: mapStudentStatus(source.status),
          address: buildAddressJson(source),
          createdAt: parseDate(source.created_date) || new Date(),
          updatedAt: new Date()
        }
      });

      await storeIdMapping('students', source.id, student.id);
      stats.migrated++;

    } catch (error) {
      console.error(`  Error migrating student ${source.id}: ${error.message}`);
      stats.errors++;
      await logMigrationError('students', source.id, error.message);
    }
  }

  return stats;
}

async function generateStudentNumber(admissionDate) {
  const year = admissionDate ?
    new Date(admissionDate).getFullYear() :
    new Date().getFullYear();

  // Get next sequence number
  const result = await prisma.$queryRaw`
    SELECT COALESCE(MAX(CAST(SUBSTRING(student_number, 10) AS INTEGER)), 0) + 1 as next_seq
    FROM academic.students
    WHERE student_number LIKE ${'STU' + year + '%'}
  `;

  const seq = String(result[0].next_seq).padStart(4, '0');
  return `STU${year}MY${seq}`;
}

function mapGender(source) {
  const normalized = String(source).toLowerCase().trim();
  return genderMapping[normalized] || 'male';
}

function mapStudentStatus(source) {
  const normalized = String(source).toLowerCase().trim();
  return studentStatusMapping[normalized] || 'active';
}

function cleanNationalId(ic) {
  if (!ic) return null;
  // Malaysian IC format: YYMMDD-SS-NNNN
  const cleaned = ic.replace(/[^\d]/g, '');
  if (cleaned.length === 12) {
    return `${cleaned.slice(0,6)}-${cleaned.slice(6,8)}-${cleaned.slice(8)}`;
  }
  return ic;
}

function buildAddressJson(source) {
  return {
    line1: source.address1 || '',
    line2: source.address2 || '',
    city: source.city || '',
    state: source.state || '',
    postalCode: source.postal_code || '',
    country: source.country || 'Malaysia'
  };
}

module.exports = { run };
```

#### 6.2.4 Hafiz Progress Migration

```javascript
// scripts/migrations/009_migrate_hafiz_progress.js
const { v4: uuidv4 } = require('uuid');

// Surah verse counts (1-114)
const SURAH_VERSES = [
  7, 286, 200, 176, 120, 165, 206, 75, 129, 109, // 1-10
  123, 111, 43, 52, 99, 128, 111, 110, 98, 135,  // 11-20
  112, 78, 118, 64, 77, 227, 93, 88, 69, 60,     // 21-30
  34, 30, 73, 54, 45, 83, 182, 88, 75, 85,       // 31-40
  54, 53, 89, 59, 37, 35, 38, 29, 18, 45,        // 41-50
  60, 49, 62, 55, 78, 96, 29, 22, 24, 13,        // 51-60
  14, 11, 11, 18, 12, 12, 30, 52, 52, 44,        // 61-70
  28, 28, 20, 56, 40, 31, 50, 40, 46, 42,        // 71-80
  29, 19, 36, 25, 22, 17, 19, 26, 30, 20,        // 81-90
  15, 21, 11, 8, 8, 19, 5, 8, 8, 11,             // 91-100
  11, 8, 3, 9, 5, 4, 7, 3, 6, 3,                 // 101-110
  5, 4, 5, 6                                      // 111-114
];

// Surah to Juz mapping
const getSurahJuz = (surahNumber) => {
  // Simplified mapping - in production, use complete mapping
  if (surahNumber <= 2) return surahNumber;
  if (surahNumber >= 78) return 30;
  // ... complete mapping logic
  return Math.ceil(surahNumber / 4);
};

async function run(prisma) {
  const stats = { processed: 0, migrated: 0, errors: 0 };

  const sourceProgress = await fetchSourceHafizProgress();

  for (const source of sourceProgress) {
    stats.processed++;

    try {
      // Get enrollment ID from mapping
      const enrollmentId = await getIdMapping('quran_enrollments', source.enrollment_id);

      if (!enrollmentId) {
        console.log(`  Skipping progress ${source.id}: No enrollment mapping`);
        stats.errors++;
        continue;
      }

      const surahNumber = parseInt(source.surah_no);
      const totalVerses = SURAH_VERSES[surahNumber - 1];

      await prisma.hafizProgress.create({
        data: {
          id: uuidv4(),
          enrollmentId: enrollmentId,
          surahNumber: surahNumber,
          juzNumber: source.juz_no || getSurahJuz(surahNumber),
          status: mapMemorizationStatus(source.status),
          versesMemorized: Math.min(parseInt(source.verses_done) || 0, totalVerses),
          totalVerses: totalVerses,
          qualityScore: parseFloat(source.quality_pct) || null,
          startDate: parseDate(source.start_date),
          completionDate: parseDate(source.complete_date),
          lastReviewedAt: parseDate(source.last_review_date),
          reviewCount: parseInt(source.review_count) || 0,
          teacherNotes: source.notes,
          createdAt: parseDate(source.created_date) || new Date(),
          updatedAt: new Date()
        }
      });

      stats.migrated++;

    } catch (error) {
      console.error(`  Error migrating hafiz progress ${source.id}: ${error.message}`);
      stats.errors++;
      await logMigrationError('hafiz_progress', source.id, error.message);
    }
  }

  return stats;
}

const statusMapping = {
  'N': 'not_started', 'not_started': 'not_started', '0': 'not_started',
  'P': 'in_progress', 'in_progress': 'in_progress', 'ongoing': 'in_progress',
  'C': 'completed', 'completed': 'completed', 'done': 'completed',
  'R': 'under_review', 'reviewing': 'under_review', 'review': 'under_review',
  'V': 'certified', 'verified': 'certified', 'certified': 'certified'
};

function mapMemorizationStatus(source) {
  const normalized = String(source).toLowerCase().trim();
  return statusMapping[normalized] || 'not_started';
}

module.exports = { run };
```

### 6.3 Seed Data Scripts

#### 6.3.1 Roles and Permissions Seed

```javascript
// scripts/seeds/001_roles_permissions.js
const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

const roles = [
  { code: 'super_admin', name: 'Super Administrator', isSystem: true, priority: 100 },
  { code: 'admin', name: 'Administrator', isSystem: true, priority: 90 },
  { code: 'principal', name: 'Principal', isSystem: true, priority: 80 },
  { code: 'teacher', name: 'Teacher', isSystem: true, priority: 50 },
  { code: 'quran_teacher', name: 'Quran Teacher', isSystem: true, priority: 50 },
  { code: 'accountant', name: 'Accountant', isSystem: true, priority: 40 },
  { code: 'parent', name: 'Parent/Guardian', isSystem: true, priority: 20 },
  { code: 'student', name: 'Student', isSystem: true, priority: 10 }
];

const resources = [
  'users', 'roles', 'students', 'guardians', 'teachers',
  'classes', 'enrollments', 'attendance', 'quran_programs',
  'hafiz_progress', 'invoices', 'payments', 'reports', 'settings'
];

const actions = ['create', 'read', 'update', 'delete', 'export'];

async function seed() {
  console.log('Seeding roles and permissions...\n');

  // Create permissions
  const permissions = [];
  for (const resource of resources) {
    for (const action of actions) {
      permissions.push({
        id: uuidv4(),
        resource: resource,
        action: action,
        code: `${resource}:${action}`,
        description: `Can ${action} ${resource}`
      });
    }
  }

  await prisma.permission.createMany({
    data: permissions,
    skipDuplicates: true
  });
  console.log(`Created ${permissions.length} permissions`);

  // Create roles
  for (const role of roles) {
    await prisma.role.upsert({
      where: { code: role.code },
      update: {},
      create: {
        id: uuidv4(),
        ...role
      }
    });
  }
  console.log(`Created ${roles.length} roles`);

  // Assign permissions to roles
  const rolePermissions = {
    'super_admin': permissions.map(p => p.code), // All permissions
    'admin': permissions.filter(p => !p.code.includes('settings:delete')).map(p => p.code),
    'teacher': [
      'students:read', 'classes:read', 'attendance:create', 'attendance:read',
      'attendance:update', 'hafiz_progress:create', 'hafiz_progress:read',
      'hafiz_progress:update'
    ],
    'quran_teacher': [
      'students:read', 'quran_programs:read', 'hafiz_progress:create',
      'hafiz_progress:read', 'hafiz_progress:update'
    ],
    'parent': ['students:read', 'attendance:read', 'invoices:read', 'payments:read'],
    'student': ['attendance:read', 'hafiz_progress:read']
  };

  for (const [roleCode, permCodes] of Object.entries(rolePermissions)) {
    const role = await prisma.role.findUnique({ where: { code: roleCode } });
    if (!role) continue;

    for (const permCode of permCodes) {
      const permission = await prisma.permission.findUnique({ where: { code: permCode } });
      if (!permission) continue;

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: { roleId: role.id, permissionId: permission.id }
        },
        update: {},
        create: {
          roleId: role.id,
          permissionId: permission.id
        }
      });
    }
  }

  console.log('Role permissions assigned');
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

#### 6.3.2 Academic Year Seed

```javascript
// scripts/seeds/002_academic_years.js
const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

async function seed() {
  const currentYear = new Date().getFullYear();

  const academicYears = [];

  // Create past, current, and next academic years
  for (let i = -2; i <= 1; i++) {
    const startYear = currentYear + i;
    const endYear = startYear + 1;

    academicYears.push({
      id: uuidv4(),
      name: `${startYear}/${endYear}`,
      code: `AY${startYear}`,
      startDate: new Date(`${startYear}-01-01`),
      endDate: new Date(`${endYear}-12-31`),
      isCurrent: i === 0,
      isEnrollmentOpen: i >= 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  await prisma.academicYear.createMany({
    data: academicYears,
    skipDuplicates: true
  });

  console.log(`Created ${academicYears.length} academic years`);
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

#### 6.3.3 Quran Programs Seed

```javascript
// scripts/seeds/003_quran_programs.js
const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

const programs = [
  {
    name: 'Full Hifz Program',
    code: 'HIFZ-FULL',
    programType: 'hifz_full',
    description: 'Complete Quran memorization program (30 Juz)',
    targetJuz: Array.from({ length: 30 }, (_, i) => i + 1),
    durationMonths: 36,
    isActive: true
  },
  {
    name: 'Juz Amma Program',
    code: 'HIFZ-JA',
    programType: 'hifz_partial',
    description: 'Memorization of Juz 30 (Juz Amma)',
    targetJuz: [30],
    targetSurahs: Array.from({ length: 37 }, (_, i) => 78 + i), // Surah 78-114
    durationMonths: 12,
    isActive: true
  },
  {
    name: 'Tilawah & Tajweed',
    code: 'TIL-TAJ',
    programType: 'tilawah',
    description: 'Quran recitation with proper Tajweed rules',
    durationMonths: 24,
    isActive: true
  },
  {
    name: 'Tajweed Certification',
    code: 'TAJ-CERT',
    programType: 'tajweed',
    description: 'Advanced Tajweed course with certification',
    durationMonths: 12,
    prerequisites: 'Basic Quran reading ability',
    isActive: true
  }
];

async function seed() {
  for (const program of programs) {
    await prisma.quranProgram.upsert({
      where: { code: program.code },
      update: {},
      create: {
        id: uuidv4(),
        ...program,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  }

  console.log(`Created ${programs.length} Quran programs`);
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

---

## 7. Data Validation Procedures

### 7.1 Pre-Migration Validation

#### 7.1.1 Source Data Validation Script

```javascript
// scripts/validation/pre-migration.js
const fs = require('fs');

async function validateSourceData(sourceConnection) {
  const results = {
    timestamp: new Date().toISOString(),
    passed: true,
    checks: []
  };

  // Check 1: Required tables exist
  const requiredTables = ['users', 'students', 'guardians', 'classes'];
  for (const table of requiredTables) {
    const exists = await checkTableExists(sourceConnection, table);
    results.checks.push({
      check: `Table ${table} exists`,
      passed: exists,
      severity: 'critical'
    });
    if (!exists) results.passed = false;
  }

  // Check 2: No duplicate emails
  const duplicateEmails = await sourceConnection.query(`
    SELECT email, COUNT(*) as count
    FROM users
    WHERE email IS NOT NULL
    GROUP BY email
    HAVING COUNT(*) > 1
  `);
  results.checks.push({
    check: 'No duplicate emails',
    passed: duplicateEmails.length === 0,
    count: duplicateEmails.length,
    severity: 'critical',
    details: duplicateEmails.slice(0, 10)
  });
  if (duplicateEmails.length > 0) results.passed = false;

  // Check 3: Valid date ranges
  const invalidDates = await sourceConnection.query(`
    SELECT id, dob FROM students
    WHERE dob > CURRENT_DATE OR dob < '1900-01-01'
  `);
  results.checks.push({
    check: 'Valid birth dates',
    passed: invalidDates.length === 0,
    count: invalidDates.length,
    severity: 'warning',
    details: invalidDates.slice(0, 10)
  });

  // Check 4: Referential integrity
  const orphanedStudents = await sourceConnection.query(`
    SELECT s.id FROM students s
    LEFT JOIN users u ON s.user_id = u.id
    WHERE u.id IS NULL
  `);
  results.checks.push({
    check: 'Student-User referential integrity',
    passed: orphanedStudents.length === 0,
    count: orphanedStudents.length,
    severity: 'critical'
  });
  if (orphanedStudents.length > 0) results.passed = false;

  // Check 5: Data completeness
  const incompleteUsers = await sourceConnection.query(`
    SELECT COUNT(*) as count FROM users
    WHERE email IS NULL OR first_name IS NULL OR last_name IS NULL
  `);
  results.checks.push({
    check: 'User data completeness',
    passed: incompleteUsers[0].count === 0,
    count: incompleteUsers[0].count,
    severity: 'warning'
  });

  // Generate report
  const reportPath = `./reports/pre-migration-${Date.now()}.json`;
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`Validation report saved to: ${reportPath}`);

  return results;
}

module.exports = { validateSourceData };
```

### 7.2 Post-Migration Validation

#### 7.2.1 Record Count Validation

```javascript
// scripts/validation/post-migration-counts.js
async function validateRecordCounts(sourceConn, targetPrisma) {
  const results = {
    timestamp: new Date().toISOString(),
    checks: []
  };

  const tables = [
    { source: 'users', target: 'auth.users' },
    { source: 'students', target: 'academic.students' },
    { source: 'guardians', target: 'academic.guardians' },
    { source: 'teachers', target: 'academic.teachers' },
    { source: 'classes', target: 'academic.classes' },
    { source: 'enrollments', target: 'academic.enrollments' }
  ];

  for (const { source, target } of tables) {
    const sourceCount = await getSourceCount(sourceConn, source);
    const targetCount = await getTargetCount(targetPrisma, target);

    const difference = Math.abs(sourceCount - targetCount);
    const tolerance = Math.ceil(sourceCount * 0.001); // 0.1% tolerance

    results.checks.push({
      table: target,
      sourceCount,
      targetCount,
      difference,
      passed: difference <= tolerance,
      message: difference <= tolerance ?
        'Counts match within tolerance' :
        `Mismatch: ${difference} records`
    });
  }

  return results;
}

async function getSourceCount(conn, table) {
  const result = await conn.query(`SELECT COUNT(*) as count FROM ${table}`);
  return parseInt(result[0].count);
}

async function getTargetCount(prisma, table) {
  const [schema, tableName] = table.split('.');
  const result = await prisma.$queryRawUnsafe(
    `SELECT COUNT(*) as count FROM ${schema}.${tableName}`
  );
  return parseInt(result[0].count);
}

module.exports = { validateRecordCounts };
```

#### 7.2.2 Data Integrity Validation

```javascript
// scripts/validation/post-migration-integrity.js
async function validateDataIntegrity(prisma) {
  const results = {
    timestamp: new Date().toISOString(),
    checks: []
  };

  // Check 1: All students have valid user references
  const orphanedStudents = await prisma.$queryRaw`
    SELECT s.id, s.student_number
    FROM academic.students s
    LEFT JOIN auth.users u ON s.user_id = u.id
    WHERE u.id IS NULL
  `;
  results.checks.push({
    check: 'Student-User integrity',
    passed: orphanedStudents.length === 0,
    count: orphanedStudents.length,
    severity: 'critical'
  });

  // Check 2: All enrollments reference valid students and classes
  const invalidEnrollments = await prisma.$queryRaw`
    SELECT e.id
    FROM academic.enrollments e
    LEFT JOIN academic.students s ON e.student_id = s.id
    LEFT JOIN academic.classes c ON e.class_id = c.id
    WHERE s.id IS NULL OR c.id IS NULL
  `;
  results.checks.push({
    check: 'Enrollment referential integrity',
    passed: invalidEnrollments.length === 0,
    count: invalidEnrollments.length,
    severity: 'critical'
  });

  // Check 3: Invoice balances are correct
  const incorrectBalances = await prisma.$queryRaw`
    SELECT i.id, i.invoice_number,
           i.total_amount, i.paid_amount, i.balance_due,
           (i.total_amount - i.paid_amount) as calculated_balance
    FROM financial.invoices i
    WHERE ABS(i.balance_due - (i.total_amount - i.paid_amount)) > 0.01
  `;
  results.checks.push({
    check: 'Invoice balance integrity',
    passed: incorrectBalances.length === 0,
    count: incorrectBalances.length,
    severity: 'warning'
  });

  // Check 4: Hafiz progress verses don't exceed totals
  const invalidProgress = await prisma.$queryRaw`
    SELECT id, surah_number, verses_memorized, total_verses
    FROM islamic.hafiz_progress
    WHERE verses_memorized > total_verses
  `;
  results.checks.push({
    check: 'Hafiz progress data integrity',
    passed: invalidProgress.length === 0,
    count: invalidProgress.length,
    severity: 'warning'
  });

  // Check 5: No future attendance dates
  const futureAttendance = await prisma.$queryRaw`
    SELECT COUNT(*) as count
    FROM academic.attendance
    WHERE attendance_date > CURRENT_DATE
  `;
  results.checks.push({
    check: 'No future attendance records',
    passed: futureAttendance[0].count === 0,
    count: futureAttendance[0].count,
    severity: 'warning'
  });

  return results;
}

module.exports = { validateDataIntegrity };
```

#### 7.2.3 Sample Data Comparison

```javascript
// scripts/validation/post-migration-samples.js
async function validateSampleData(sourceConn, targetPrisma) {
  const results = {
    timestamp: new Date().toISOString(),
    samples: []
  };

  // Sample 10 random users and compare
  const sampleUsers = await sourceConn.query(`
    SELECT * FROM users ORDER BY RANDOM() LIMIT 10
  `);

  for (const sourceUser of sampleUsers) {
    const targetUser = await targetPrisma.user.findUnique({
      where: { email: sourceUser.email.toLowerCase().trim() }
    });

    const comparison = {
      sourceId: sourceUser.id,
      targetId: targetUser?.id,
      email: sourceUser.email,
      matches: {
        found: !!targetUser,
        firstName: targetUser?.firstName === cleanName(sourceUser.first_name),
        lastName: targetUser?.lastName === cleanName(sourceUser.last_name),
        phone: comparePhones(sourceUser.phone, targetUser?.phone)
      }
    };

    comparison.passed = Object.values(comparison.matches).every(v => v);
    results.samples.push(comparison);
  }

  return results;
}

function cleanName(name) {
  if (!name) return '';
  return name.trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function comparePhones(source, target) {
  if (!source && !target) return true;
  if (!source || !target) return false;

  const cleanSource = source.replace(/[^\d]/g, '');
  const cleanTarget = target.replace(/[^\d]/g, '');

  return cleanSource.endsWith(cleanTarget.slice(-9)) ||
         cleanTarget.endsWith(cleanSource.slice(-9));
}

module.exports = { validateSampleData };
```

### 7.3 Validation Report Generator

```javascript
// scripts/validation/generate-report.js
const fs = require('fs');
const path = require('path');

async function generateValidationReport(allResults) {
  const report = {
    generatedAt: new Date().toISOString(),
    summary: {
      totalChecks: 0,
      passed: 0,
      failed: 0,
      warnings: 0
    },
    sections: []
  };

  for (const [section, results] of Object.entries(allResults)) {
    const sectionSummary = {
      name: section,
      checks: results.checks || [],
      passed: true
    };

    for (const check of sectionSummary.checks) {
      report.summary.totalChecks++;

      if (check.passed) {
        report.summary.passed++;
      } else if (check.severity === 'critical') {
        report.summary.failed++;
        sectionSummary.passed = false;
      } else {
        report.summary.warnings++;
      }
    }

    report.sections.push(sectionSummary);
  }

  report.overallPassed = report.summary.failed === 0;

  // Generate HTML report
  const htmlReport = generateHtmlReport(report);
  const reportPath = path.join(__dirname, '../../reports', `validation-${Date.now()}.html`);
  fs.writeFileSync(reportPath, htmlReport);

  // Generate JSON report
  const jsonPath = path.join(__dirname, '../../reports', `validation-${Date.now()}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));

  console.log(`\nValidation Report Summary:`);
  console.log(`  Total Checks: ${report.summary.totalChecks}`);
  console.log(`  Passed: ${report.summary.passed}`);
  console.log(`  Failed: ${report.summary.failed}`);
  console.log(`  Warnings: ${report.summary.warnings}`);
  console.log(`\n  Overall: ${report.overallPassed ? 'PASSED' : 'FAILED'}`);
  console.log(`\n  Reports saved to:`);
  console.log(`    HTML: ${reportPath}`);
  console.log(`    JSON: ${jsonPath}`);

  return report;
}

function generateHtmlReport(report) {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>Migration Validation Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    .passed { color: green; }
    .failed { color: red; }
    .warning { color: orange; }
    table { border-collapse: collapse; width: 100%; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #4CAF50; color: white; }
    .summary { background-color: #f0f0f0; padding: 20px; margin: 20px 0; }
  </style>
</head>
<body>
  <h1>Migration Validation Report</h1>
  <p>Generated: ${report.generatedAt}</p>

  <div class="summary">
    <h2>Summary</h2>
    <p>Total Checks: ${report.summary.totalChecks}</p>
    <p class="passed">Passed: ${report.summary.passed}</p>
    <p class="failed">Failed: ${report.summary.failed}</p>
    <p class="warning">Warnings: ${report.summary.warnings}</p>
    <h3 class="${report.overallPassed ? 'passed' : 'failed'}">
      Overall: ${report.overallPassed ? 'PASSED' : 'FAILED'}
    </h3>
  </div>

  ${report.sections.map(section => `
    <h2>${section.name}</h2>
    <table>
      <tr>
        <th>Check</th>
        <th>Status</th>
        <th>Details</th>
      </tr>
      ${section.checks.map(check => `
        <tr>
          <td>${check.check}</td>
          <td class="${check.passed ? 'passed' : (check.severity === 'critical' ? 'failed' : 'warning')}">
            ${check.passed ? 'PASSED' : (check.severity === 'critical' ? 'FAILED' : 'WARNING')}
          </td>
          <td>${check.count !== undefined ? `Count: ${check.count}` : ''} ${check.message || ''}</td>
        </tr>
      `).join('')}
    </table>
  `).join('')}
</body>
</html>
  `;
}

module.exports = { generateValidationReport };
```

---

## 8. Rollback Procedures

### 8.1 Rollback Strategy

#### 8.1.1 Rollback Decision Matrix

| Scenario | Severity | Rollback Action |
|----------|----------|-----------------|
| < 5% data errors | Low | Fix in place |
| 5-10% data errors | Medium | Partial rollback + fix |
| > 10% data errors | High | Full rollback |
| Schema corruption | Critical | Full rollback |
| Application failure | Critical | Full rollback |
| Performance degradation | Medium | Investigate, may rollback |

#### 8.1.2 Rollback Triggers

Automatic rollback should be triggered if:
- More than 5% of records fail validation
- Any critical data integrity check fails
- Application cannot start after migration
- Database performance degrades by more than 50%

### 8.2 Pre-Migration Backup

#### 8.2.1 PostgreSQL Backup Script

```bash
#!/bin/bash
# scripts/backup/backup-postgresql.sh

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/smart_academy"
DB_NAME="smart_academy_db"
DB_USER="smart_academy_admin"

# Create backup directory
mkdir -p "$BACKUP_DIR"

echo "Starting PostgreSQL backup at $TIMESTAMP..."

# Full database dump with custom format (for selective restore)
pg_dump -U "$DB_USER" -Fc -f "$BACKUP_DIR/full_${TIMESTAMP}.dump" "$DB_NAME"

# Schema-only dump (for quick schema recovery)
pg_dump -U "$DB_USER" --schema-only -f "$BACKUP_DIR/schema_${TIMESTAMP}.sql" "$DB_NAME"

# Individual schema backups
for SCHEMA in auth academic islamic financial communication content analytics audit; do
  pg_dump -U "$DB_USER" -Fc -n "$SCHEMA" -f "$BACKUP_DIR/${SCHEMA}_${TIMESTAMP}.dump" "$DB_NAME"
done

# Compress backups
gzip "$BACKUP_DIR/schema_${TIMESTAMP}.sql"

# Calculate checksums
for file in "$BACKUP_DIR"/*_${TIMESTAMP}.*; do
  sha256sum "$file" >> "$BACKUP_DIR/checksums_${TIMESTAMP}.txt"
done

echo "Backup completed. Files saved to $BACKUP_DIR"
echo "Backup manifest:"
ls -la "$BACKUP_DIR"/*_${TIMESTAMP}.*

# Cleanup old backups (keep last 7 days)
find "$BACKUP_DIR" -name "*.dump" -mtime +7 -delete
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +7 -delete
find "$BACKUP_DIR" -name "checksums_*.txt" -mtime +7 -delete
```

#### 8.2.2 MySQL Backup Script (Gibbon)

```bash
#!/bin/bash
# scripts/backup/backup-mysql.sh

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/gibbon"
DB_NAME="gibbon"
DB_USER="gibbon_admin"

mkdir -p "$BACKUP_DIR"

echo "Starting MySQL backup at $TIMESTAMP..."

# Full database dump
mysqldump -u "$DB_USER" -p --single-transaction --routines --triggers \
  "$DB_NAME" > "$BACKUP_DIR/full_${TIMESTAMP}.sql"

# Compress
gzip "$BACKUP_DIR/full_${TIMESTAMP}.sql"

# Checksum
sha256sum "$BACKUP_DIR/full_${TIMESTAMP}.sql.gz" >> "$BACKUP_DIR/checksums_${TIMESTAMP}.txt"

echo "Backup completed: $BACKUP_DIR/full_${TIMESTAMP}.sql.gz"
```

### 8.3 Rollback Scripts

#### 8.3.1 Full PostgreSQL Rollback

```bash
#!/bin/bash
# scripts/rollback/rollback-postgresql.sh

set -e

BACKUP_FILE=$1
DB_NAME="smart_academy_db"
DB_USER="smart_academy_admin"

if [ -z "$BACKUP_FILE" ]; then
  echo "Usage: $0 <backup_file.dump>"
  exit 1
fi

echo "WARNING: This will completely restore the database from backup."
echo "All data since the backup will be LOST."
read -p "Are you sure? (type 'yes' to confirm): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
  echo "Rollback cancelled."
  exit 0
fi

echo "Starting rollback..."

# Terminate active connections
psql -U "$DB_USER" -d postgres -c "
  SELECT pg_terminate_backend(pid)
  FROM pg_stat_activity
  WHERE datname = '$DB_NAME' AND pid <> pg_backend_pid();
"

# Drop and recreate database
psql -U "$DB_USER" -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;"
psql -U "$DB_USER" -d postgres -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"

# Restore from backup
pg_restore -U "$DB_USER" -d "$DB_NAME" -v "$BACKUP_FILE"

echo "Rollback completed successfully."
echo "Please verify the database and restart the application."
```

#### 8.3.2 Partial Schema Rollback

```bash
#!/bin/bash
# scripts/rollback/rollback-schema.sh

set -e

SCHEMA=$1
BACKUP_FILE=$2
DB_NAME="smart_academy_db"
DB_USER="smart_academy_admin"

if [ -z "$SCHEMA" ] || [ -z "$BACKUP_FILE" ]; then
  echo "Usage: $0 <schema_name> <backup_file.dump>"
  exit 1
fi

echo "Rolling back schema: $SCHEMA"

# Drop existing schema
psql -U "$DB_USER" -d "$DB_NAME" -c "DROP SCHEMA IF EXISTS $SCHEMA CASCADE;"

# Restore schema from backup
pg_restore -U "$DB_USER" -d "$DB_NAME" -n "$SCHEMA" -v "$BACKUP_FILE"

echo "Schema $SCHEMA rolled back successfully."
```

#### 8.3.3 Data-Only Rollback

```javascript
// scripts/rollback/rollback-table.js
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function rollbackTable(tableName, backupFile) {
  console.log(`Rolling back table: ${tableName}`);

  // Read backup data
  const backupData = JSON.parse(fs.readFileSync(backupFile, 'utf8'));

  // Begin transaction
  await prisma.$transaction(async (tx) => {
    // Delete current data
    await tx.$executeRawUnsafe(`DELETE FROM ${tableName}`);

    // Disable triggers temporarily
    await tx.$executeRawUnsafe(`ALTER TABLE ${tableName} DISABLE TRIGGER ALL`);

    // Insert backup data
    for (const record of backupData) {
      const columns = Object.keys(record).join(', ');
      const placeholders = Object.keys(record).map((_, i) => `$${i + 1}`).join(', ');
      const values = Object.values(record);

      await tx.$executeRawUnsafe(
        `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`,
        ...values
      );
    }

    // Re-enable triggers
    await tx.$executeRawUnsafe(`ALTER TABLE ${tableName} ENABLE TRIGGER ALL`);
  });

  console.log(`Rollback completed. Restored ${backupData.length} records.`);
}

// Usage
const [,, tableName, backupFile] = process.argv;
rollbackTable(tableName, backupFile)
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

### 8.4 Recovery Verification

```javascript
// scripts/rollback/verify-recovery.js
async function verifyRecovery(prisma) {
  const checks = [];

  // Check 1: All schemas exist
  const schemas = await prisma.$queryRaw`
    SELECT schema_name FROM information_schema.schemata
    WHERE schema_name IN ('auth', 'academic', 'islamic', 'financial',
                          'communication', 'content', 'analytics', 'audit')
  `;
  checks.push({
    check: 'All schemas exist',
    passed: schemas.length === 8,
    found: schemas.length
  });

  // Check 2: Key tables have data
  const tables = [
    { name: 'auth.users', minCount: 1 },
    { name: 'auth.roles', minCount: 5 },
    { name: 'auth.permissions', minCount: 10 }
  ];

  for (const { name, minCount } of tables) {
    const result = await prisma.$queryRawUnsafe(
      `SELECT COUNT(*) as count FROM ${name}`
    );
    checks.push({
      check: `${name} has minimum records`,
      passed: result[0].count >= minCount,
      count: result[0].count,
      required: minCount
    });
  }

  // Check 3: Application can query data
  try {
    await prisma.user.findFirst();
    checks.push({ check: 'Prisma can query users', passed: true });
  } catch (error) {
    checks.push({ check: 'Prisma can query users', passed: false, error: error.message });
  }

  const allPassed = checks.every(c => c.passed);

  console.log('\nRecovery Verification Results:');
  for (const check of checks) {
    console.log(`  ${check.passed ? '✓' : '✗'} ${check.check}`);
    if (!check.passed && check.error) {
      console.log(`    Error: ${check.error}`);
    }
  }
  console.log(`\nOverall: ${allPassed ? 'PASSED' : 'FAILED'}`);

  return { passed: allPassed, checks };
}

module.exports = { verifyRecovery };
```

---

## 9. Migration Schedule

### 9.1 Pre-Migration Phase (T-7 to T-1 Days)

| Day | Task | Owner | Duration | Status |
|-----|------|-------|----------|--------|
| T-7 | Source data analysis complete | DBA | 4 hours | [ ] |
| T-7 | Data quality report generated | Dev | 2 hours | [ ] |
| T-6 | Data cleansing scripts ready | Dev | 8 hours | [ ] |
| T-6 | Migration scripts tested (dev) | Dev | 4 hours | [ ] |
| T-5 | Validation scripts ready | QA | 4 hours | [ ] |
| T-5 | Rollback procedures tested | DBA | 2 hours | [ ] |
| T-4 | Staging environment migration | Dev | 8 hours | [ ] |
| T-3 | Staging validation complete | QA | 8 hours | [ ] |
| T-2 | User acceptance testing | Users | 8 hours | [ ] |
| T-1 | Final backup verification | DBA | 2 hours | [ ] |
| T-1 | Go/No-Go decision | Team | 1 hour | [ ] |

### 9.2 Migration Day (T-Day)

| Time | Task | Owner | Duration | Checkpoint |
|------|------|-------|----------|------------|
| 00:00 | Begin maintenance window | Ops | - | [ ] |
| 00:15 | Application shutdown | Ops | 15 min | [ ] |
| 00:30 | Create production backups | DBA | 30 min | [ ] |
| 01:00 | Verify backups | DBA | 15 min | [ ] |
| 01:15 | **Phase 1**: Schema creation | DBA | 30 min | [ ] |
| 01:45 | **Phase 2**: Reference data | Dev | 15 min | [ ] |
| 02:00 | **Phase 3**: User migration | Dev | 45 min | [ ] |
| 02:45 | Checkpoint validation | QA | 15 min | [ ] |
| 03:00 | **Phase 4**: Academic data | Dev | 60 min | [ ] |
| 04:00 | **Phase 5**: Islamic education | Dev | 30 min | [ ] |
| 04:30 | **Phase 6**: Financial data | Dev | 45 min | [ ] |
| 05:15 | Checkpoint validation | QA | 15 min | [ ] |
| 05:30 | **Phase 7**: Historical data | Dev | 60 min | [ ] |
| 06:30 | **Phase 8**: Final validation | QA | 45 min | [ ] |
| 07:15 | Application startup | Ops | 15 min | [ ] |
| 07:30 | Smoke testing | QA | 30 min | [ ] |
| 08:00 | End maintenance window | Ops | - | [ ] |

### 9.3 Post-Migration Phase (T+1 to T+7 Days)

| Day | Task | Owner | Status |
|-----|------|-------|--------|
| T+1 | Monitor error logs | Ops | [ ] |
| T+1 | User feedback collection | Support | [ ] |
| T+2 | Performance monitoring | DBA | [ ] |
| T+2 | Address critical issues | Dev | [ ] |
| T+3 | Data reconciliation report | QA | [ ] |
| T+3 | Secondary backup verification | DBA | [ ] |
| T+5 | Comprehensive validation | QA | [ ] |
| T+7 | Migration signoff | Stakeholders | [ ] |
| T+7 | Archive source system | DBA | [ ] |

### 9.4 Migration Timeline Visualization

```
Day:     T-7   T-6   T-5   T-4   T-3   T-2   T-1   T    T+1  T+2  T+3  T+7
         │     │     │     │     │     │     │     │     │    │    │    │
         ▼     ▼     ▼     ▼     ▼     ▼     ▼     ▼     ▼    ▼    ▼    ▼
       ┌────────────────────────────────┐
       │      PRE-MIGRATION PHASE       │
       │  Analysis, Testing, Staging    │
       └────────────────────────────────┘
                                              ┌─────┐
                                              │ GO  │
                                              │LIVE │
                                              └─────┘
                                                    ┌──────────────────────┐
                                                    │  POST-MIGRATION      │
                                                    │  Monitoring & Fixes  │
                                                    └──────────────────────┘
```

---

## 10. Risk Management

### 10.1 Risk Register

| ID | Risk | Probability | Impact | Mitigation | Contingency |
|----|------|-------------|--------|------------|-------------|
| R1 | Data corruption during migration | Low | Critical | Checksums, validation | Full rollback |
| R2 | Extended downtime | Medium | High | Parallel processing, rehearsals | Extend window |
| R3 | Password reset failures | Medium | Medium | Pre-generate reset tokens | Manual reset support |
| R4 | Missing data mappings | Low | High | Comprehensive analysis | Pause and map |
| R5 | Performance degradation | Medium | Medium | Index optimization | Scaling, query tuning |
| R6 | Integration failures | Low | High | API testing | Fallback to manual sync |
| R7 | Insufficient disk space | Low | Critical | Pre-calculate requirements | Add storage |
| R8 | Staff unavailability | Low | Medium | Backup personnel | Postpone |

### 10.2 Risk Mitigation Strategies

#### R1: Data Corruption Prevention
- Calculate checksums before and after migration
- Run validation after each phase
- Maintain hot backup during migration
- Use database transactions

#### R2: Downtime Reduction
- Rehearse migration in staging
- Use parallel data loading
- Pre-stage reference data
- Have rollback ready

#### R3: Password Management
- All users require password reset
- Pre-generate secure reset tokens
- Prepare email notification system
- Set up support queue

### 10.3 Escalation Matrix

| Level | Criteria | Escalate To | Response Time |
|-------|----------|-------------|---------------|
| L1 | Minor data issues (<1%) | Migration Lead | 15 min |
| L2 | Moderate issues (1-5%) | Technical Lead | 30 min |
| L3 | Major issues (>5%) | Project Manager | 45 min |
| L4 | Critical failure | Stakeholders | Immediate |

---

## 11. Post-Migration Activities

### 11.1 Immediate Post-Migration (T to T+1)

#### 11.1.1 Application Verification

```bash
# Health check script
#!/bin/bash

echo "Running post-migration health checks..."

# Check API endpoints
curl -f http://localhost:3000/api/health || echo "API health check failed"

# Check database connectivity
node -e "
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  prisma.\$queryRaw\`SELECT 1\`
    .then(() => console.log('Database connected'))
    .catch(e => console.error('Database connection failed:', e))
    .finally(() => prisma.\$disconnect());
"

# Check Redis connectivity
redis-cli ping || echo "Redis ping failed"

echo "Health checks complete"
```

#### 11.1.2 Monitoring Setup

```javascript
// monitoring/post-migration-metrics.js
const prometheus = require('prom-client');

// Migration success metrics
const migrationGauge = new prometheus.Gauge({
  name: 'migration_records_total',
  help: 'Total records after migration',
  labelNames: ['table']
});

const migrationErrors = new prometheus.Counter({
  name: 'migration_errors_total',
  help: 'Migration related errors',
  labelNames: ['type']
});

// Query performance metrics
const queryDuration = new prometheus.Histogram({
  name: 'query_duration_seconds',
  help: 'Database query duration',
  labelNames: ['query_type'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5]
});
```

### 11.2 Short-Term Follow-Up (T+1 to T+7)

#### 11.2.1 Data Reconciliation Report

```javascript
// reports/reconciliation.js
async function generateReconciliationReport(sourceConn, targetPrisma) {
  const report = {
    generatedAt: new Date().toISOString(),
    entities: []
  };

  const entities = [
    { name: 'Users', source: 'users', target: 'auth.users' },
    { name: 'Students', source: 'students', target: 'academic.students' },
    { name: 'Enrollments', source: 'enrollments', target: 'academic.enrollments' },
    { name: 'Invoices', source: 'invoices', target: 'financial.invoices' }
  ];

  for (const entity of entities) {
    const sourceCount = await getCount(sourceConn, entity.source);
    const targetCount = await getCount(targetPrisma, entity.target);

    report.entities.push({
      name: entity.name,
      sourceCount,
      targetCount,
      difference: sourceCount - targetCount,
      percentMigrated: ((targetCount / sourceCount) * 100).toFixed(2) + '%'
    });
  }

  return report;
}
```

### 11.3 Long-Term Activities (T+7 to T+30)

#### 11.3.1 Source System Decommissioning

| Step | Task | Timeline | Owner |
|------|------|----------|-------|
| 1 | Set source to read-only | T+7 | DBA |
| 2 | Export final archive | T+14 | DBA |
| 3 | Verify archive integrity | T+14 | QA |
| 4 | Backup to cold storage | T+21 | Ops |
| 5 | Decommission source | T+30 | Ops |

#### 11.3.2 Documentation Update

- Update system architecture diagrams
- Document new data flows
- Update API documentation
- Create migration lessons learned

### 11.4 Sync Procedures (Gibbon/Moodle)

#### 11.4.1 Scheduled Sync Jobs

```javascript
// jobs/sync-gibbon.js
const cron = require('node-cron');

// Sync student data every 15 minutes
cron.schedule('*/15 * * * *', async () => {
  console.log('Starting Gibbon sync...');

  try {
    // Sync new students
    await syncNewStudents();

    // Sync updated attendance
    await syncAttendance();

    // Sync grades
    await syncGrades();

    console.log('Gibbon sync completed');
  } catch (error) {
    console.error('Gibbon sync failed:', error);
    // Alert operations team
    await sendAlert('Gibbon sync failed', error);
  }
});

// Full reconciliation daily at 2 AM
cron.schedule('0 2 * * *', async () => {
  console.log('Starting full Gibbon reconciliation...');
  await fullReconciliation();
});
```

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | January 2026 | Development Team | Initial document creation |

---

## Appendices

### Appendix A: Migration Checklist

#### Pre-Migration
- [ ] Source data analysis complete
- [ ] Data quality issues documented
- [ ] Data cleansing scripts tested
- [ ] Migration scripts tested in staging
- [ ] Validation scripts ready
- [ ] Rollback procedures tested
- [ ] Backup procedures verified
- [ ] Team briefed on procedures
- [ ] Communication plan ready
- [ ] Go/No-Go decision made

#### Migration Day
- [ ] Maintenance notification sent
- [ ] Application shutdown confirmed
- [ ] Production backup created
- [ ] Backup verified
- [ ] Schema migration complete
- [ ] Reference data loaded
- [ ] User data migrated
- [ ] Academic data migrated
- [ ] Islamic education data migrated
- [ ] Financial data migrated
- [ ] Historical data migrated
- [ ] All validations passed
- [ ] Application restarted
- [ ] Smoke tests passed
- [ ] Maintenance end notification sent

#### Post-Migration
- [ ] Error logs reviewed
- [ ] Performance baseline established
- [ ] User feedback collected
- [ ] Issues documented and prioritized
- [ ] Reconciliation report generated
- [ ] Stakeholder signoff obtained
- [ ] Source system archived
- [ ] Lessons learned documented

### Appendix B: Emergency Contacts

| Role | Name | Phone | Email |
|------|------|-------|-------|
| Migration Lead | TBD | TBD | TBD |
| DBA Lead | TBD | TBD | TBD |
| Application Lead | TBD | TBD | TBD |
| Operations Lead | TBD | TBD | TBD |
| Project Manager | TBD | TBD | TBD |

### Appendix C: Related Documents

- [DB_Database_Design_v1.0.md](./DB_Database_Design_v1.0.md) - Database design and architecture
- [DB_Entity_Relationship_Diagram_v1.0.md](./DB_Entity_Relationship_Diagram_v1.0.md) - Entity relationships
- [DB_Schema_Documentation_v1.0.md](./DB_Schema_Documentation_v1.0.md) - Schema specifications
- [DB_Data_Dictionary_v1.0.md](./DB_Data_Dictionary_v1.0.md) - Data definitions and rules

---

*End of Document*
