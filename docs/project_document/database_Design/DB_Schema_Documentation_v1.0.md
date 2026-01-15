# Smart Academy - Database Schema Documentation

**Document ID:** DB_Schema_Documentation_v1.0
**Version:** 1.0
**Last Updated:** 2026-01-10
**Status:** Draft
**Author:** Development Team

---

## Table of Contents

1. [Document Overview](#1-document-overview)
2. [Table Definitions](#2-table-definitions)
3. [Column Specifications](#3-column-specifications)
4. [Primary and Foreign Keys](#4-primary-and-foreign-keys)
5. [Indexes](#5-indexes)
6. [Constraints](#6-constraints)
7. [Triggers and Stored Procedures](#7-triggers-and-stored-procedures)
8. [Views](#8-views)

---

## 1. Document Overview

### 1.1 Purpose

This document provides detailed schema documentation for the Smart Academy Digital Portal databases. It includes complete table definitions, column specifications, keys, indexes, constraints, triggers, and views.

### 1.2 Scope

| Database | Technology | Schema Count | Table Count |
|----------|------------|--------------|-------------|
| smart_academy_custom | PostgreSQL 17+ | 8 | 45+ |
| smart_academy_gibbon | MySQL 8.0+ | 1 (default) | 200+ (Gibbon core + extensions) |
| smart_academy_moodle | MySQL 8.0+ | 1 (default) | 400+ (Moodle core) |

### 1.3 Reference Documents

- DB_Database_Design_v1.0.md
- DB_Entity_Relationship_Diagram_v1.0.md
- DB_Data_Dictionary_v1.0.md

---

## 2. Table Definitions

### 2.1 PostgreSQL Tables by Schema

#### 2.1.1 Schema: auth

| Table Name | Description | Row Estimate | Growth Rate |
|------------|-------------|--------------|-------------|
| user | All system users | 5,000+ | 500/year |
| role | User roles (admin, teacher, etc.) | 10-20 | Static |
| permission | Granular permissions | 100-200 | Low |
| user_role | User-role assignments | 5,000+ | 500/year |
| role_permission | Role-permission mappings | 500+ | Low |
| session | Active sessions | 1,000+ (concurrent) | High churn |
| refresh_token | JWT refresh tokens | 5,000+ | High churn |

#### 2.1.2 Schema: academic

| Table Name | Description | Row Estimate | Growth Rate |
|------------|-------------|--------------|-------------|
| academic_year | Academic year definitions | 10+ | 1/year |
| academic_term | Terms within academic years | 30+ | 3/year |
| class_section | Class divisions | 50+ | 5/year |
| subject | Academic subjects | 30-50 | Low |
| student | Student profiles | 2,000+ | 200/year |
| parent | Parent profiles | 1,500+ | 150/year |
| student_parent | Student-parent links | 3,000+ | 300/year |
| enrollment | Class enrollments | 2,000+/year | 2,000/year |
| attendance | Daily attendance records | 400,000+/year | High |
| assessment | Exams and tests | 1,000+/year | Medium |
| grade | Student grades | 50,000+/year | High |

#### 2.1.3 Schema: islamic

| Table Name | Description | Row Estimate | Growth Rate |
|------------|-------------|--------------|-------------|
| quran_progress | Surah memorization tracking | 20,000+ | High |
| hafiz_progress | Hafiz program enrollment | 500+ | Low |
| tajweed_assessment | Tajweed evaluations | 5,000+/year | Medium |
| hadith_progress | Hadith study tracking | 10,000+ | Medium |
| prayer_attendance | Prayer attendance | 300,000+/year | High |
| islamic_event | Islamic calendar events | 50+ | Static |

#### 2.1.4 Schema: financial

| Table Name | Description | Row Estimate | Growth Rate |
|------------|-------------|--------------|-------------|
| fee_structure | Fee definitions | 50+ | Low |
| fee_invoice | Student invoices | 20,000+/year | High |
| payment_transaction | Payment records | 15,000+/year | High |
| payment_receipt | Payment receipts | 15,000+/year | High |

#### 2.1.5 Schema: communication

| Table Name | Description | Row Estimate | Growth Rate |
|------------|-------------|--------------|-------------|
| notification | In-app notifications | 100,000+/year | Very High |
| announcement | School announcements | 500+/year | Medium |
| sms_log | SMS message logs | 50,000+/year | High |
| email_log | Email message logs | 30,000+/year | High |

#### 2.1.6 Schema: content

| Table Name | Description | Row Estimate | Growth Rate |
|------------|-------------|--------------|-------------|
| page | Static pages | 50+ | Low |
| category | Content categories | 20+ | Low |
| post | News/blog posts | 500+ | Medium |
| media | Uploaded files | 5,000+ | High |
| menu | Navigation menus | 5-10 | Static |
| menu_item | Menu items | 50-100 | Low |

### 2.2 MySQL Tables (Gibbon Extensions)

| Table Name | Description | Purpose |
|------------|-------------|---------|
| gibbonIslamicProgress | Islamic education tracking | Custom extension |
| gibbonFeePaymentExtended | Extended payment tracking | Payment gateway integration |
| gibbonTransportRoute | Transport route definitions | Transportation management |
| gibbonTransportStop | Transport stop locations | Transportation management |
| gibbonTransportAssignment | Student-route assignments | Transportation management |
| gibbonMoodleCourseMap | Gibbon-Moodle course mapping | LMS integration |

---

## 3. Column Specifications

### 3.1 Core Tables - PostgreSQL

#### 3.1.1 auth.user

```sql
CREATE TABLE auth.user (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(50) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    name_bengali VARCHAR(200),
    phone VARCHAR(20),
    avatar_url VARCHAR(500),
    status user_status DEFAULT 'pending',
    email_verified_at TIMESTAMPTZ,
    phone_verified_at TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    last_login_ip INET,
    failed_login_attempts INT DEFAULT 0,
    locked_until TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| email | VARCHAR(255) | NO | - | Unique email address |
| username | VARCHAR(50) | YES | - | Optional username |
| password_hash | VARCHAR(255) | NO | - | Bcrypt hashed password |
| first_name | VARCHAR(100) | NO | - | First name (English) |
| last_name | VARCHAR(100) | NO | - | Last name (English) |
| name_bengali | VARCHAR(200) | YES | - | Full name in Bengali |
| phone | VARCHAR(20) | YES | - | Mobile phone number |
| avatar_url | VARCHAR(500) | YES | - | Profile photo URL |
| status | user_status | NO | 'pending' | Account status |
| email_verified_at | TIMESTAMPTZ | YES | - | Email verification timestamp |
| phone_verified_at | TIMESTAMPTZ | YES | - | Phone verification timestamp |
| last_login_at | TIMESTAMPTZ | YES | - | Last successful login |
| last_login_ip | INET | YES | - | IP address of last login |
| failed_login_attempts | INT | NO | 0 | Failed login counter |
| locked_until | TIMESTAMPTZ | YES | - | Account lock expiry |
| metadata | JSONB | NO | '{}' | Additional user data |
| created_at | TIMESTAMPTZ | NO | NOW() | Record creation time |
| updated_at | TIMESTAMPTZ | NO | NOW() | Last update time |

#### 3.1.2 academic.student

```sql
CREATE TABLE academic.student (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.user(id),
    gibbon_person_id INT,
    admission_number VARCHAR(50) UNIQUE NOT NULL,
    roll_number VARCHAR(20),
    birth_date DATE NOT NULL,
    birth_cert_number VARCHAR(50),
    blood_group VARCHAR(5),
    religion VARCHAR(50),
    nationality VARCHAR(50) DEFAULT 'Bangladeshi',
    address_present TEXT,
    address_permanent TEXT,
    photo_url VARCHAR(500),
    medical_info JSONB DEFAULT '{}',
    transport_route_id UUID,
    scholarship_type VARCHAR(50),
    enrollment_status enrollment_status DEFAULT 'enrolled',
    enrollment_date DATE NOT NULL,
    graduation_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| user_id | UUID | YES | - | Link to auth.user |
| gibbon_person_id | INT | YES | - | Gibbon integration ID |
| admission_number | VARCHAR(50) | NO | - | Unique admission number |
| roll_number | VARCHAR(20) | YES | - | Class roll number |
| birth_date | DATE | NO | - | Date of birth |
| birth_cert_number | VARCHAR(50) | YES | - | Birth certificate number |
| blood_group | VARCHAR(5) | YES | - | Blood group (A+, B-, etc.) |
| religion | VARCHAR(50) | YES | - | Religion |
| nationality | VARCHAR(50) | NO | 'Bangladeshi' | Nationality |
| address_present | TEXT | YES | - | Present address |
| address_permanent | TEXT | YES | - | Permanent address |
| photo_url | VARCHAR(500) | YES | - | Student photo URL |
| medical_info | JSONB | NO | '{}' | Medical conditions, allergies |
| transport_route_id | UUID | YES | - | Assigned transport route |
| scholarship_type | VARCHAR(50) | YES | - | Scholarship category |
| enrollment_status | enrollment_status | NO | 'enrolled' | Current status |
| enrollment_date | DATE | NO | - | Enrollment date |
| graduation_date | DATE | YES | - | Graduation date |
| created_at | TIMESTAMPTZ | NO | NOW() | Record creation time |
| updated_at | TIMESTAMPTZ | NO | NOW() | Last update time |

#### 3.1.3 islamic.quran_progress

```sql
CREATE TABLE islamic.quran_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES academic.student(id),
    gibbon_person_id INT,
    surah_number SMALLINT NOT NULL CHECK (surah_number BETWEEN 1 AND 114),
    surah_name_arabic VARCHAR(50) NOT NULL,
    surah_name_english VARCHAR(50) NOT NULL,
    juz_number SMALLINT CHECK (juz_number BETWEEN 1 AND 30),
    verse_start INT NOT NULL,
    verse_end INT NOT NULL,
    memorization_status memorization_status DEFAULT 'not_started',
    revision_count INT DEFAULT 0,
    last_revision_date DATE,
    teacher_assessment_score DECIMAL(5,2),
    teacher_comments TEXT,
    assessed_by UUID REFERENCES auth.user(id),
    assessed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| student_id | UUID | NO | - | Reference to student |
| gibbon_person_id | INT | YES | - | Gibbon integration ID |
| surah_number | SMALLINT | NO | - | Surah number (1-114) |
| surah_name_arabic | VARCHAR(50) | NO | - | Surah name in Arabic |
| surah_name_english | VARCHAR(50) | NO | - | Surah name in English |
| juz_number | SMALLINT | YES | - | Juz number (1-30) |
| verse_start | INT | NO | - | Starting verse number |
| verse_end | INT | NO | - | Ending verse number |
| memorization_status | memorization_status | NO | 'not_started' | Current status |
| revision_count | INT | NO | 0 | Number of revisions |
| last_revision_date | DATE | YES | - | Last revision date |
| teacher_assessment_score | DECIMAL(5,2) | YES | - | Teacher's score (0-100) |
| teacher_comments | TEXT | YES | - | Teacher's feedback |
| assessed_by | UUID | YES | - | Assessing teacher ID |
| assessed_at | TIMESTAMPTZ | YES | - | Assessment timestamp |
| created_at | TIMESTAMPTZ | NO | NOW() | Record creation time |
| updated_at | TIMESTAMPTZ | NO | NOW() | Last update time |

#### 3.1.4 financial.payment_transaction

```sql
CREATE TABLE financial.payment_transaction (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fee_invoice_id UUID NOT NULL REFERENCES financial.fee_invoice(id),
    student_id UUID NOT NULL REFERENCES academic.student(id),
    paid_by UUID REFERENCES auth.user(id),
    transaction_id VARCHAR(100) UNIQUE NOT NULL,
    gateway payment_gateway NOT NULL,
    gateway_transaction_id VARCHAR(100),
    amount DECIMAL(12,2) NOT NULL,
    currency CHAR(3) DEFAULT 'BDT',
    status payment_status DEFAULT 'pending',
    gateway_response JSONB,
    initiated_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| fee_invoice_id | UUID | NO | - | Reference to invoice |
| student_id | UUID | NO | - | Reference to student |
| paid_by | UUID | YES | - | User who made payment |
| transaction_id | VARCHAR(100) | NO | - | Internal transaction ID |
| gateway | payment_gateway | NO | - | Payment gateway used |
| gateway_transaction_id | VARCHAR(100) | YES | - | Gateway's transaction ID |
| amount | DECIMAL(12,2) | NO | - | Payment amount |
| currency | CHAR(3) | NO | 'BDT' | Currency code |
| status | payment_status | NO | 'pending' | Payment status |
| gateway_response | JSONB | YES | - | Full gateway response |
| initiated_at | TIMESTAMPTZ | NO | NOW() | Payment initiation time |
| completed_at | TIMESTAMPTZ | YES | - | Payment completion time |
| created_at | TIMESTAMPTZ | NO | NOW() | Record creation time |

#### 3.1.5 academic.attendance

```sql
CREATE TABLE academic.attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES academic.student(id),
    class_section_id UUID NOT NULL REFERENCES academic.class_section(id),
    attendance_date DATE NOT NULL,
    status attendance_status NOT NULL,
    check_in_time TIME,
    check_out_time TIME,
    remarks TEXT,
    marked_by UUID REFERENCES auth.user(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, class_section_id, attendance_date)
);
```

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| student_id | UUID | NO | - | Reference to student |
| class_section_id | UUID | NO | - | Reference to class |
| attendance_date | DATE | NO | - | Attendance date |
| status | attendance_status | NO | - | Present/Absent/Late/Excused |
| check_in_time | TIME | YES | - | Check-in time |
| check_out_time | TIME | YES | - | Check-out time |
| remarks | TEXT | YES | - | Additional notes |
| marked_by | UUID | YES | - | Teacher who marked |
| created_at | TIMESTAMPTZ | NO | NOW() | Record creation time |

### 3.2 Gibbon Extension Tables - MySQL

#### 3.2.1 gibbonIslamicProgress

```sql
CREATE TABLE gibbonIslamicProgress (
    gibbonIslamicProgressID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    gibbonPersonID INT UNSIGNED NOT NULL,
    progressType ENUM('quran', 'hadith', 'tajweed', 'prayer') NOT NULL,
    surahNumber INT,
    juzNumber INT,
    verseFrom INT,
    verseTo INT,
    completionDate DATE,
    assessmentScore DECIMAL(5,2),
    teacherComment TEXT,
    gibbonPersonIDAssessor INT UNSIGNED,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_person (gibbonPersonID),
    INDEX idx_type (progressType),
    FOREIGN KEY (gibbonPersonID) REFERENCES gibbonPerson(gibbonPersonID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| gibbonIslamicProgressID | INT UNSIGNED | NO | AUTO_INCREMENT | Primary key |
| gibbonPersonID | INT UNSIGNED | NO | - | Reference to Gibbon person |
| progressType | ENUM | NO | - | Type of Islamic progress |
| surahNumber | INT | YES | - | Surah number for Quran |
| juzNumber | INT | YES | - | Juz number for Quran |
| verseFrom | INT | YES | - | Starting verse |
| verseTo | INT | YES | - | Ending verse |
| completionDate | DATE | YES | - | Completion date |
| assessmentScore | DECIMAL(5,2) | YES | - | Assessment score |
| teacherComment | TEXT | YES | - | Teacher's comment |
| gibbonPersonIDAssessor | INT UNSIGNED | YES | - | Assessing teacher |
| timestamp | TIMESTAMP | NO | CURRENT_TIMESTAMP | Creation timestamp |

#### 3.2.2 gibbonFeePaymentExtended

```sql
CREATE TABLE gibbonFeePaymentExtended (
    paymentID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    gibbonFinanceInvoiceID INT UNSIGNED NOT NULL,
    paymentGateway ENUM('bkash', 'nagad', 'sslcommerz', 'bank', 'cash') NOT NULL,
    transactionID VARCHAR(100),
    gatewayTransactionID VARCHAR(100),
    gatewayResponse JSON,
    paymentStatus ENUM('pending', 'completed', 'failed', 'refunded') NOT NULL,
    paidAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_invoice (gibbonFinanceInvoiceID),
    INDEX idx_txn (transactionID),
    FOREIGN KEY (gibbonFinanceInvoiceID)
        REFERENCES gibbonFinanceInvoice(gibbonFinanceInvoiceID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 4. Primary and Foreign Keys

### 4.1 Primary Key Definitions

#### 4.1.1 PostgreSQL Primary Keys

| Schema | Table | Primary Key | Type | Generation |
|--------|-------|-------------|------|------------|
| auth | user | id | UUID | gen_random_uuid() |
| auth | role | id | UUID | gen_random_uuid() |
| auth | permission | id | UUID | gen_random_uuid() |
| auth | user_role | id | UUID | gen_random_uuid() |
| auth | session | id | UUID | gen_random_uuid() |
| academic | student | id | UUID | gen_random_uuid() |
| academic | parent | id | UUID | gen_random_uuid() |
| academic | class_section | id | UUID | gen_random_uuid() |
| academic | attendance | id | UUID | gen_random_uuid() |
| academic | grade | id | UUID | gen_random_uuid() |
| islamic | quran_progress | id | UUID | gen_random_uuid() |
| islamic | hafiz_progress | id | UUID | gen_random_uuid() |
| islamic | tajweed_assessment | id | UUID | gen_random_uuid() |
| financial | fee_invoice | id | UUID | gen_random_uuid() |
| financial | payment_transaction | id | UUID | gen_random_uuid() |
| communication | notification | id | UUID | gen_random_uuid() |
| content | page | id | UUID | gen_random_uuid() |
| content | post | id | UUID | gen_random_uuid() |

#### 4.1.2 MySQL Primary Keys (Gibbon Extensions)

| Table | Primary Key | Type | Generation |
|-------|-------------|------|------------|
| gibbonIslamicProgress | gibbonIslamicProgressID | INT UNSIGNED | AUTO_INCREMENT |
| gibbonFeePaymentExtended | paymentID | INT UNSIGNED | AUTO_INCREMENT |
| gibbonTransportRoute | routeID | INT UNSIGNED | AUTO_INCREMENT |
| gibbonTransportStop | stopID | INT UNSIGNED | AUTO_INCREMENT |

### 4.2 Foreign Key Definitions

#### 4.2.1 PostgreSQL Foreign Keys

```sql
-- Schema: auth
ALTER TABLE auth.user_role
    ADD CONSTRAINT fk_user_role_user
    FOREIGN KEY (user_id) REFERENCES auth.user(id) ON DELETE CASCADE;

ALTER TABLE auth.user_role
    ADD CONSTRAINT fk_user_role_role
    FOREIGN KEY (role_id) REFERENCES auth.role(id) ON DELETE CASCADE;

ALTER TABLE auth.role_permission
    ADD CONSTRAINT fk_role_permission_role
    FOREIGN KEY (role_id) REFERENCES auth.role(id) ON DELETE CASCADE;

ALTER TABLE auth.role_permission
    ADD CONSTRAINT fk_role_permission_permission
    FOREIGN KEY (permission_id) REFERENCES auth.permission(id) ON DELETE CASCADE;

ALTER TABLE auth.session
    ADD CONSTRAINT fk_session_user
    FOREIGN KEY (user_id) REFERENCES auth.user(id) ON DELETE CASCADE;

-- Schema: academic
ALTER TABLE academic.student
    ADD CONSTRAINT fk_student_user
    FOREIGN KEY (user_id) REFERENCES auth.user(id) ON DELETE SET NULL;

ALTER TABLE academic.parent
    ADD CONSTRAINT fk_parent_user
    FOREIGN KEY (user_id) REFERENCES auth.user(id) ON DELETE SET NULL;

ALTER TABLE academic.student_parent
    ADD CONSTRAINT fk_student_parent_student
    FOREIGN KEY (student_id) REFERENCES academic.student(id) ON DELETE CASCADE;

ALTER TABLE academic.student_parent
    ADD CONSTRAINT fk_student_parent_parent
    FOREIGN KEY (parent_id) REFERENCES academic.parent(id) ON DELETE CASCADE;

ALTER TABLE academic.enrollment
    ADD CONSTRAINT fk_enrollment_student
    FOREIGN KEY (student_id) REFERENCES academic.student(id) ON DELETE CASCADE;

ALTER TABLE academic.enrollment
    ADD CONSTRAINT fk_enrollment_class
    FOREIGN KEY (class_section_id) REFERENCES academic.class_section(id);

ALTER TABLE academic.attendance
    ADD CONSTRAINT fk_attendance_student
    FOREIGN KEY (student_id) REFERENCES academic.student(id) ON DELETE CASCADE;

ALTER TABLE academic.attendance
    ADD CONSTRAINT fk_attendance_class
    FOREIGN KEY (class_section_id) REFERENCES academic.class_section(id);

ALTER TABLE academic.grade
    ADD CONSTRAINT fk_grade_assessment
    FOREIGN KEY (assessment_id) REFERENCES academic.assessment(id) ON DELETE CASCADE;

ALTER TABLE academic.grade
    ADD CONSTRAINT fk_grade_student
    FOREIGN KEY (student_id) REFERENCES academic.student(id) ON DELETE CASCADE;

-- Schema: islamic
ALTER TABLE islamic.quran_progress
    ADD CONSTRAINT fk_quran_student
    FOREIGN KEY (student_id) REFERENCES academic.student(id) ON DELETE CASCADE;

ALTER TABLE islamic.hafiz_progress
    ADD CONSTRAINT fk_hafiz_student
    FOREIGN KEY (student_id) REFERENCES academic.student(id) ON DELETE CASCADE;

ALTER TABLE islamic.tajweed_assessment
    ADD CONSTRAINT fk_tajweed_student
    FOREIGN KEY (student_id) REFERENCES academic.student(id) ON DELETE CASCADE;

-- Schema: financial
ALTER TABLE financial.fee_invoice
    ADD CONSTRAINT fk_invoice_student
    FOREIGN KEY (student_id) REFERENCES academic.student(id) ON DELETE CASCADE;

ALTER TABLE financial.payment_transaction
    ADD CONSTRAINT fk_payment_invoice
    FOREIGN KEY (fee_invoice_id) REFERENCES financial.fee_invoice(id);

ALTER TABLE financial.payment_transaction
    ADD CONSTRAINT fk_payment_student
    FOREIGN KEY (student_id) REFERENCES academic.student(id);

-- Schema: communication
ALTER TABLE communication.notification
    ADD CONSTRAINT fk_notification_user
    FOREIGN KEY (user_id) REFERENCES auth.user(id) ON DELETE CASCADE;
```

### 4.3 Foreign Key Cascade Rules

| Relationship | ON DELETE | ON UPDATE | Rationale |
|--------------|-----------|-----------|-----------|
| user_role → user | CASCADE | CASCADE | Delete roles when user deleted |
| session → user | CASCADE | CASCADE | Delete sessions when user deleted |
| student → user | SET NULL | CASCADE | Preserve student history |
| attendance → student | CASCADE | CASCADE | Delete attendance with student |
| grade → student | CASCADE | CASCADE | Delete grades with student |
| payment → invoice | RESTRICT | CASCADE | Protect payment records |
| notification → user | CASCADE | CASCADE | Delete notifications with user |

---

## 5. Indexes

### 5.1 PostgreSQL Indexes

#### 5.1.1 Primary Key Indexes (Automatic)

All primary keys automatically create unique B-tree indexes.

#### 5.1.2 Unique Indexes

```sql
-- auth schema
CREATE UNIQUE INDEX idx_user_email ON auth.user(email);
CREATE UNIQUE INDEX idx_user_username ON auth.user(username) WHERE username IS NOT NULL;
CREATE UNIQUE INDEX idx_role_name ON auth.role(name);
CREATE UNIQUE INDEX idx_permission_name ON auth.permission(name);

-- academic schema
CREATE UNIQUE INDEX idx_student_admission ON academic.student(admission_number);
CREATE UNIQUE INDEX idx_subject_code ON academic.subject(code) WHERE code IS NOT NULL;
CREATE UNIQUE INDEX idx_enrollment_unique ON academic.enrollment(student_id, class_section_id, academic_year_id);
CREATE UNIQUE INDEX idx_attendance_unique ON academic.attendance(student_id, class_section_id, attendance_date);

-- islamic schema
CREATE UNIQUE INDEX idx_hafiz_student ON islamic.hafiz_progress(student_id);
CREATE UNIQUE INDEX idx_prayer_unique ON islamic.prayer_attendance(student_id, prayer_date);

-- financial schema
CREATE UNIQUE INDEX idx_invoice_number ON financial.fee_invoice(invoice_number);
CREATE UNIQUE INDEX idx_payment_txn ON financial.payment_transaction(transaction_id);
CREATE UNIQUE INDEX idx_receipt_number ON financial.payment_receipt(receipt_number);

-- content schema
CREATE UNIQUE INDEX idx_page_slug ON content.page(slug);
CREATE UNIQUE INDEX idx_post_slug ON content.post(slug);
CREATE UNIQUE INDEX idx_category_slug ON content.category(slug);
```

#### 5.1.3 Performance Indexes

```sql
-- auth schema indexes
CREATE INDEX idx_user_status ON auth.user(status);
CREATE INDEX idx_user_created ON auth.user(created_at DESC);
CREATE INDEX idx_session_user ON auth.session(user_id);
CREATE INDEX idx_session_expires ON auth.session(expires_at);
CREATE INDEX idx_session_token ON auth.session(token);
CREATE INDEX idx_refresh_token_user ON auth.refresh_token(user_id);
CREATE INDEX idx_user_role_user ON auth.user_role(user_id);
CREATE INDEX idx_user_role_role ON auth.user_role(role_id);

-- academic schema indexes
CREATE INDEX idx_student_user ON academic.student(user_id);
CREATE INDEX idx_student_gibbon ON academic.student(gibbon_person_id);
CREATE INDEX idx_student_status ON academic.student(enrollment_status);
CREATE INDEX idx_enrollment_student ON academic.enrollment(student_id);
CREATE INDEX idx_enrollment_class ON academic.enrollment(class_section_id);
CREATE INDEX idx_enrollment_year ON academic.enrollment(academic_year_id);
CREATE INDEX idx_attendance_student ON academic.attendance(student_id);
CREATE INDEX idx_attendance_date ON academic.attendance(attendance_date);
CREATE INDEX idx_attendance_student_date ON academic.attendance(student_id, attendance_date DESC);
CREATE INDEX idx_attendance_class_date ON academic.attendance(class_section_id, attendance_date);
CREATE INDEX idx_grade_student ON academic.grade(student_id);
CREATE INDEX idx_grade_assessment ON academic.grade(assessment_id);

-- islamic schema indexes
CREATE INDEX idx_quran_student ON islamic.quran_progress(student_id);
CREATE INDEX idx_quran_surah ON islamic.quran_progress(surah_number);
CREATE INDEX idx_quran_student_surah ON islamic.quran_progress(student_id, surah_number);
CREATE INDEX idx_quran_status ON islamic.quran_progress(memorization_status);
CREATE INDEX idx_quran_assessed ON islamic.quran_progress(assessed_at DESC);
CREATE INDEX idx_hafiz_status ON islamic.hafiz_progress(hafiz_status);
CREATE INDEX idx_tajweed_student ON islamic.tajweed_assessment(student_id);
CREATE INDEX idx_tajweed_date ON islamic.tajweed_assessment(assessment_date DESC);
CREATE INDEX idx_prayer_student ON islamic.prayer_attendance(student_id);
CREATE INDEX idx_prayer_date ON islamic.prayer_attendance(prayer_date);

-- financial schema indexes
CREATE INDEX idx_invoice_student ON financial.fee_invoice(student_id);
CREATE INDEX idx_invoice_status ON financial.fee_invoice(status);
CREATE INDEX idx_invoice_due ON financial.fee_invoice(due_date);
CREATE INDEX idx_invoice_overdue ON financial.fee_invoice(due_date, status)
    WHERE status = 'pending' OR status = 'partial';
CREATE INDEX idx_payment_student ON financial.payment_transaction(student_id);
CREATE INDEX idx_payment_status ON financial.payment_transaction(status);
CREATE INDEX idx_payment_gateway ON financial.payment_transaction(gateway);
CREATE INDEX idx_payment_gateway_txn ON financial.payment_transaction(gateway_transaction_id);
CREATE INDEX idx_payment_created ON financial.payment_transaction(created_at DESC);

-- communication schema indexes
CREATE INDEX idx_notification_user ON communication.notification(user_id);
CREATE INDEX idx_notification_unread ON communication.notification(user_id, is_read)
    WHERE is_read = FALSE;
CREATE INDEX idx_notification_created ON communication.notification(created_at DESC);
CREATE INDEX idx_announcement_published ON communication.announcement(is_published, publish_date);
CREATE INDEX idx_sms_status ON communication.sms_log(status);
CREATE INDEX idx_sms_created ON communication.sms_log(created_at DESC);
CREATE INDEX idx_email_status ON communication.email_log(status);

-- content schema indexes
CREATE INDEX idx_page_published ON content.page(is_published, published_at DESC);
CREATE INDEX idx_post_published ON content.post(is_published, published_at DESC);
CREATE INDEX idx_post_category ON content.post(category_id);
CREATE INDEX idx_post_featured ON content.post(is_featured, is_published);
CREATE INDEX idx_media_folder ON content.media(folder);
CREATE INDEX idx_media_type ON content.media(mime_type);

-- audit schema indexes
CREATE INDEX idx_audit_table ON audit.audit_log(table_name);
CREATE INDEX idx_audit_user ON audit.audit_log(user_id);
CREATE INDEX idx_audit_record ON audit.audit_log(record_id);
CREATE INDEX idx_audit_action ON audit.audit_log(action);
CREATE INDEX idx_audit_created ON audit.audit_log(created_at DESC);
```

#### 5.1.4 GIN Indexes for JSONB

```sql
-- JSONB indexes for flexible queries
CREATE INDEX idx_user_metadata ON auth.user USING GIN (metadata);
CREATE INDEX idx_student_medical ON academic.student USING GIN (medical_info);
CREATE INDEX idx_payment_response ON financial.payment_transaction USING GIN (gateway_response);
```

#### 5.1.5 Partial Indexes

```sql
-- Partial indexes for filtered queries
CREATE INDEX idx_user_active ON auth.user(email) WHERE status = 'active';
CREATE INDEX idx_student_enrolled ON academic.student(admission_number)
    WHERE enrollment_status = 'enrolled';
CREATE INDEX idx_invoice_pending ON financial.fee_invoice(student_id, due_date)
    WHERE status IN ('pending', 'partial');
CREATE INDEX idx_notification_unread ON communication.notification(user_id, created_at)
    WHERE is_read = FALSE;
```

### 5.2 MySQL Indexes (Gibbon Extensions)

```sql
-- gibbonIslamicProgress indexes
CREATE INDEX idx_islamic_person ON gibbonIslamicProgress(gibbonPersonID);
CREATE INDEX idx_islamic_type ON gibbonIslamicProgress(progressType);
CREATE INDEX idx_islamic_surah ON gibbonIslamicProgress(surahNumber);
CREATE INDEX idx_islamic_person_type ON gibbonIslamicProgress(gibbonPersonID, progressType);

-- gibbonFeePaymentExtended indexes
CREATE INDEX idx_payment_invoice ON gibbonFeePaymentExtended(gibbonFinanceInvoiceID);
CREATE INDEX idx_payment_gateway ON gibbonFeePaymentExtended(paymentGateway);
CREATE INDEX idx_payment_status ON gibbonFeePaymentExtended(paymentStatus);
CREATE INDEX idx_payment_txn ON gibbonFeePaymentExtended(transactionID);

-- gibbonTransportRoute indexes
CREATE INDEX idx_route_active ON gibbonTransportRoute(isActive);

-- gibbonTransportStop indexes
CREATE INDEX idx_stop_route ON gibbonTransportStop(routeID);
```

---

## 6. Constraints

### 6.1 Check Constraints

```sql
-- academic schema
ALTER TABLE academic.class_section
    ADD CONSTRAINT chk_class_capacity CHECK (capacity > 0 AND capacity <= 50);

ALTER TABLE academic.subject
    ADD CONSTRAINT chk_subject_marks CHECK (pass_marks >= 0 AND pass_marks <= full_marks);

-- islamic schema
ALTER TABLE islamic.quran_progress
    ADD CONSTRAINT chk_surah_range CHECK (surah_number BETWEEN 1 AND 114);

ALTER TABLE islamic.quran_progress
    ADD CONSTRAINT chk_juz_range CHECK (juz_number IS NULL OR juz_number BETWEEN 1 AND 30);

ALTER TABLE islamic.quran_progress
    ADD CONSTRAINT chk_verse_order CHECK (verse_start <= verse_end);

ALTER TABLE islamic.hafiz_progress
    ADD CONSTRAINT chk_juz_current CHECK (current_juz BETWEEN 1 AND 30);

ALTER TABLE islamic.hafiz_progress
    ADD CONSTRAINT chk_progress_pct CHECK (overall_progress_percentage BETWEEN 0 AND 100);

ALTER TABLE islamic.tajweed_assessment
    ADD CONSTRAINT chk_makhraj_score CHECK (makhraj_score IS NULL OR makhraj_score BETWEEN 0 AND 100);

ALTER TABLE islamic.tajweed_assessment
    ADD CONSTRAINT chk_overall_score CHECK (overall_score IS NULL OR overall_score BETWEEN 0 AND 100);

ALTER TABLE islamic.prayer_attendance
    ADD CONSTRAINT chk_prayer_hijri CHECK (hijri_month IS NULL OR hijri_month BETWEEN 1 AND 12);

ALTER TABLE islamic.islamic_event
    ADD CONSTRAINT chk_hijri_month CHECK (hijri_month BETWEEN 1 AND 12);

ALTER TABLE islamic.islamic_event
    ADD CONSTRAINT chk_hijri_day CHECK (hijri_day BETWEEN 1 AND 30);

-- financial schema
ALTER TABLE financial.fee_structure
    ADD CONSTRAINT chk_fee_amount CHECK (amount > 0);

ALTER TABLE financial.fee_structure
    ADD CONSTRAINT chk_late_fee CHECK (late_fee_amount >= 0);

ALTER TABLE financial.fee_invoice
    ADD CONSTRAINT chk_invoice_amounts CHECK (
        amount > 0 AND
        discount_amount >= 0 AND
        late_fee >= 0 AND
        total_amount > 0 AND
        paid_amount >= 0 AND
        balance >= 0
    );

ALTER TABLE financial.payment_transaction
    ADD CONSTRAINT chk_payment_amount CHECK (amount > 0);
```

### 6.2 Not Null Constraints

All NOT NULL constraints are defined in the CREATE TABLE statements (Section 3).

### 6.3 Unique Constraints

```sql
-- Composite unique constraints
ALTER TABLE academic.enrollment
    ADD CONSTRAINT unq_enrollment_student_class_year
    UNIQUE (student_id, class_section_id, academic_year_id);

ALTER TABLE academic.attendance
    ADD CONSTRAINT unq_attendance_student_class_date
    UNIQUE (student_id, class_section_id, attendance_date);

ALTER TABLE academic.grade
    ADD CONSTRAINT unq_grade_assessment_student
    UNIQUE (assessment_id, student_id);

ALTER TABLE academic.student_parent
    ADD CONSTRAINT unq_student_parent
    UNIQUE (student_id, parent_id);

ALTER TABLE auth.user_role
    ADD CONSTRAINT unq_user_role
    UNIQUE (user_id, role_id);

ALTER TABLE auth.role_permission
    ADD CONSTRAINT unq_role_permission
    UNIQUE (role_id, permission_id);
```

### 6.4 Default Constraints

All DEFAULT constraints are defined in the CREATE TABLE statements (Section 3).

---

## 7. Triggers and Stored Procedures

### 7.1 PostgreSQL Triggers

#### 7.1.1 Audit Trigger

```sql
-- Audit trigger function
CREATE OR REPLACE FUNCTION audit.trigger_audit_log()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit.audit_log (
            user_id, table_name, record_id, action, new_values, created_at
        ) VALUES (
            current_setting('app.current_user_id', TRUE)::UUID,
            TG_TABLE_SCHEMA || '.' || TG_TABLE_NAME,
            NEW.id,
            'INSERT',
            to_jsonb(NEW),
            NOW()
        );
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit.audit_log (
            user_id, table_name, record_id, action, old_values, new_values, created_at
        ) VALUES (
            current_setting('app.current_user_id', TRUE)::UUID,
            TG_TABLE_SCHEMA || '.' || TG_TABLE_NAME,
            NEW.id,
            'UPDATE',
            to_jsonb(OLD),
            to_jsonb(NEW),
            NOW()
        );
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit.audit_log (
            user_id, table_name, record_id, action, old_values, created_at
        ) VALUES (
            current_setting('app.current_user_id', TRUE)::UUID,
            TG_TABLE_SCHEMA || '.' || TG_TABLE_NAME,
            OLD.id,
            'DELETE',
            to_jsonb(OLD),
            NOW()
        );
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Apply audit trigger to critical tables
CREATE TRIGGER trg_student_audit
    AFTER INSERT OR UPDATE OR DELETE ON academic.student
    FOR EACH ROW EXECUTE FUNCTION audit.trigger_audit_log();

CREATE TRIGGER trg_payment_audit
    AFTER INSERT OR UPDATE OR DELETE ON financial.payment_transaction
    FOR EACH ROW EXECUTE FUNCTION audit.trigger_audit_log();

CREATE TRIGGER trg_grade_audit
    AFTER INSERT OR UPDATE OR DELETE ON academic.grade
    FOR EACH ROW EXECUTE FUNCTION audit.trigger_audit_log();

CREATE TRIGGER trg_attendance_audit
    AFTER INSERT OR UPDATE OR DELETE ON academic.attendance
    FOR EACH ROW EXECUTE FUNCTION audit.trigger_audit_log();
```

#### 7.1.2 Updated_at Trigger

```sql
-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables with updated_at column
CREATE TRIGGER trg_user_updated
    BEFORE UPDATE ON auth.user
    FOR EACH ROW EXECUTE FUNCTION public.trigger_set_updated_at();

CREATE TRIGGER trg_student_updated
    BEFORE UPDATE ON academic.student
    FOR EACH ROW EXECUTE FUNCTION public.trigger_set_updated_at();

CREATE TRIGGER trg_quran_updated
    BEFORE UPDATE ON islamic.quran_progress
    FOR EACH ROW EXECUTE FUNCTION public.trigger_set_updated_at();

CREATE TRIGGER trg_invoice_updated
    BEFORE UPDATE ON financial.fee_invoice
    FOR EACH ROW EXECUTE FUNCTION public.trigger_set_updated_at();
```

#### 7.1.3 Invoice Balance Trigger

```sql
-- Auto-calculate invoice balance after payment
CREATE OR REPLACE FUNCTION financial.trigger_update_invoice_balance()
RETURNS TRIGGER AS $$
DECLARE
    total_paid DECIMAL(12,2);
    invoice_total DECIMAL(12,2);
    new_balance DECIMAL(12,2);
    new_status invoice_status;
BEGIN
    IF NEW.status = 'completed' THEN
        -- Calculate total paid for this invoice
        SELECT COALESCE(SUM(amount), 0) INTO total_paid
        FROM financial.payment_transaction
        WHERE fee_invoice_id = NEW.fee_invoice_id AND status = 'completed';

        -- Get invoice total
        SELECT total_amount INTO invoice_total
        FROM financial.fee_invoice
        WHERE id = NEW.fee_invoice_id;

        -- Calculate balance
        new_balance := invoice_total - total_paid;

        -- Determine status
        IF new_balance <= 0 THEN
            new_status := 'paid';
            new_balance := 0;
        ELSIF total_paid > 0 THEN
            new_status := 'partial';
        ELSE
            new_status := 'pending';
        END IF;

        -- Update invoice
        UPDATE financial.fee_invoice
        SET
            paid_amount = total_paid,
            balance = new_balance,
            status = new_status,
            updated_at = NOW()
        WHERE id = NEW.fee_invoice_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_payment_completed
    AFTER UPDATE ON financial.payment_transaction
    FOR EACH ROW
    WHEN (NEW.status = 'completed' AND OLD.status != 'completed')
    EXECUTE FUNCTION financial.trigger_update_invoice_balance();
```

#### 7.1.4 Hafiz Progress Update Trigger

```sql
-- Update Hafiz progress when Quran progress changes
CREATE OR REPLACE FUNCTION islamic.trigger_update_hafiz_progress()
RETURNS TRIGGER AS $$
DECLARE
    total_surahs INT;
    total_verses INT;
    progress_pct DECIMAL(5,2);
BEGIN
    -- Only if status changed to memorized or mastered
    IF NEW.memorization_status IN ('memorized', 'mastered') THEN
        -- Count completed surahs for this student
        SELECT
            COUNT(DISTINCT surah_number),
            SUM(verse_end - verse_start + 1)
        INTO total_surahs, total_verses
        FROM islamic.quran_progress
        WHERE student_id = NEW.student_id
        AND memorization_status IN ('memorized', 'mastered');

        -- Calculate progress (6236 total verses in Quran)
        progress_pct := (total_verses::DECIMAL / 6236.0) * 100;

        -- Update or insert Hafiz progress
        INSERT INTO islamic.hafiz_progress (
            student_id,
            gibbon_person_id,
            enrollment_date,
            total_surahs_completed,
            total_verses_memorized,
            overall_progress_percentage,
            current_juz,
            updated_at
        ) VALUES (
            NEW.student_id,
            NEW.gibbon_person_id,
            CURRENT_DATE,
            total_surahs,
            total_verses,
            progress_pct,
            COALESCE(NEW.juz_number, 1),
            NOW()
        )
        ON CONFLICT (student_id) DO UPDATE SET
            total_surahs_completed = total_surahs,
            total_verses_memorized = total_verses,
            overall_progress_percentage = progress_pct,
            current_juz = GREATEST(islamic.hafiz_progress.current_juz, COALESCE(NEW.juz_number, 1)),
            hafiz_status = CASE
                WHEN progress_pct >= 100 THEN 'completed'
                ELSE 'active'
            END,
            updated_at = NOW();
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_quran_progress_hafiz
    AFTER INSERT OR UPDATE ON islamic.quran_progress
    FOR EACH ROW
    EXECUTE FUNCTION islamic.trigger_update_hafiz_progress();
```

### 7.2 Stored Procedures

#### 7.2.1 Mark Class Attendance

```sql
CREATE OR REPLACE PROCEDURE academic.sp_mark_class_attendance(
    p_class_section_id UUID,
    p_date DATE,
    p_marked_by UUID,
    p_attendance_data JSONB
)
LANGUAGE plpgsql
AS $$
DECLARE
    student_record JSONB;
BEGIN
    -- Validate class exists
    IF NOT EXISTS (SELECT 1 FROM academic.class_section WHERE id = p_class_section_id) THEN
        RAISE EXCEPTION 'Class section not found: %', p_class_section_id;
    END IF;

    -- Process each student's attendance
    FOR student_record IN SELECT * FROM jsonb_array_elements(p_attendance_data)
    LOOP
        INSERT INTO academic.attendance (
            student_id,
            class_section_id,
            attendance_date,
            status,
            check_in_time,
            remarks,
            marked_by
        ) VALUES (
            (student_record->>'student_id')::UUID,
            p_class_section_id,
            p_date,
            (student_record->>'status')::attendance_status,
            (student_record->>'check_in_time')::TIME,
            student_record->>'remarks',
            p_marked_by
        )
        ON CONFLICT (student_id, class_section_id, attendance_date)
        DO UPDATE SET
            status = EXCLUDED.status,
            check_in_time = EXCLUDED.check_in_time,
            remarks = EXCLUDED.remarks,
            marked_by = EXCLUDED.marked_by;
    END LOOP;

    COMMIT;
END;
$$;
```

#### 7.2.2 Generate Fee Invoices

```sql
CREATE OR REPLACE PROCEDURE financial.sp_generate_monthly_invoices(
    p_academic_year_id UUID,
    p_month INT,
    p_year INT
)
LANGUAGE plpgsql
AS $$
DECLARE
    fee_record RECORD;
    student_record RECORD;
    invoice_number VARCHAR(50);
    due_date DATE;
BEGIN
    -- Get all monthly fee structures for the academic year
    FOR fee_record IN
        SELECT * FROM financial.fee_structure
        WHERE academic_year_id = p_academic_year_id
        AND frequency = 'monthly'
    LOOP
        -- Calculate due date
        due_date := make_date(p_year, p_month, COALESCE(fee_record.due_day_of_month, 10));

        -- Generate invoice for each enrolled student
        FOR student_record IN
            SELECT s.* FROM academic.student s
            JOIN academic.enrollment e ON s.id = e.student_id
            WHERE e.academic_year_id = p_academic_year_id
            AND s.enrollment_status = 'enrolled'
            AND (fee_record.class_applicable IS NULL
                 OR e.class_section_id::TEXT = ANY(fee_record.class_applicable))
        LOOP
            -- Generate unique invoice number
            invoice_number := 'INV-' || p_year || '-' ||
                              LPAD(p_month::TEXT, 2, '0') || '-' ||
                              LPAD(nextval('financial.invoice_seq')::TEXT, 6, '0');

            -- Check if invoice already exists
            IF NOT EXISTS (
                SELECT 1 FROM financial.fee_invoice
                WHERE student_id = student_record.id
                AND fee_structure_id = fee_record.id
                AND EXTRACT(MONTH FROM due_date) = p_month
                AND EXTRACT(YEAR FROM due_date) = p_year
            ) THEN
                INSERT INTO financial.fee_invoice (
                    student_id,
                    fee_structure_id,
                    academic_year_id,
                    invoice_number,
                    amount,
                    total_amount,
                    balance,
                    due_date,
                    status
                ) VALUES (
                    student_record.id,
                    fee_record.id,
                    p_academic_year_id,
                    invoice_number,
                    fee_record.amount,
                    fee_record.amount,
                    fee_record.amount,
                    due_date,
                    'pending'
                );
            END IF;
        END LOOP;
    END LOOP;

    COMMIT;
END;
$$;
```

### 7.3 MySQL Triggers (Gibbon)

```sql
-- Sync Islamic progress to custom PostgreSQL database
DELIMITER //

CREATE TRIGGER trg_islamic_progress_sync
AFTER INSERT ON gibbonIslamicProgress
FOR EACH ROW
BEGIN
    -- Log for external sync service to pick up
    INSERT INTO gibbonSyncQueue (
        tableName,
        recordID,
        action,
        data,
        createdAt
    ) VALUES (
        'gibbonIslamicProgress',
        NEW.gibbonIslamicProgressID,
        'INSERT',
        JSON_OBJECT(
            'personID', NEW.gibbonPersonID,
            'type', NEW.progressType,
            'surah', NEW.surahNumber,
            'juz', NEW.juzNumber
        ),
        NOW()
    );
END //

DELIMITER ;
```

---

## 8. Views

### 8.1 PostgreSQL Views

#### 8.1.1 Student Dashboard View

```sql
CREATE OR REPLACE VIEW academic.vw_student_dashboard AS
SELECT
    s.id AS student_id,
    s.admission_number,
    u.first_name,
    u.last_name,
    u.name_bengali,
    u.email,
    cs.display_name AS current_class,
    s.enrollment_status,

    -- Attendance summary
    (
        SELECT COUNT(*) FILTER (WHERE status = 'present')::DECIMAL /
               NULLIF(COUNT(*), 0) * 100
        FROM academic.attendance a
        WHERE a.student_id = s.id
        AND a.attendance_date >= DATE_TRUNC('month', CURRENT_DATE)
    ) AS attendance_percentage,

    -- Latest grade
    (
        SELECT jsonb_build_object(
            'subject', sub.name,
            'marks', g.marks_obtained,
            'grade', g.grade_letter
        )
        FROM academic.grade g
        JOIN academic.assessment asmt ON g.assessment_id = asmt.id
        JOIN academic.subject sub ON asmt.subject_id = sub.id
        WHERE g.student_id = s.id
        ORDER BY g.created_at DESC
        LIMIT 1
    ) AS latest_grade,

    -- Fee balance
    (
        SELECT COALESCE(SUM(balance), 0)
        FROM financial.fee_invoice fi
        WHERE fi.student_id = s.id
        AND fi.status IN ('pending', 'partial')
    ) AS pending_fee_balance,

    -- Quran progress
    (
        SELECT jsonb_build_object(
            'surahs_memorized', COUNT(*) FILTER (WHERE memorization_status IN ('memorized', 'mastered')),
            'current_surah', MAX(surah_number) FILTER (WHERE memorization_status = 'in_progress')
        )
        FROM islamic.quran_progress qp
        WHERE qp.student_id = s.id
    ) AS quran_summary

FROM academic.student s
JOIN auth.user u ON s.user_id = u.id
LEFT JOIN academic.enrollment e ON s.id = e.student_id
    AND e.academic_year_id = (
        SELECT id FROM academic.academic_year WHERE is_current = TRUE LIMIT 1
    )
LEFT JOIN academic.class_section cs ON e.class_section_id = cs.id
WHERE s.enrollment_status = 'enrolled';
```

#### 8.1.2 Class Attendance Report View

```sql
CREATE OR REPLACE VIEW academic.vw_class_attendance_report AS
SELECT
    cs.id AS class_section_id,
    cs.display_name AS class_name,
    a.attendance_date,
    COUNT(*) AS total_students,
    COUNT(*) FILTER (WHERE a.status = 'present') AS present_count,
    COUNT(*) FILTER (WHERE a.status = 'absent') AS absent_count,
    COUNT(*) FILTER (WHERE a.status = 'late') AS late_count,
    COUNT(*) FILTER (WHERE a.status = 'excused') AS excused_count,
    ROUND(
        COUNT(*) FILTER (WHERE a.status = 'present')::DECIMAL /
        NULLIF(COUNT(*), 0) * 100, 2
    ) AS attendance_percentage
FROM academic.class_section cs
JOIN academic.attendance a ON cs.id = a.class_section_id
GROUP BY cs.id, cs.display_name, a.attendance_date
ORDER BY a.attendance_date DESC, cs.display_name;
```

#### 8.1.3 Quran Progress Summary View

```sql
CREATE OR REPLACE VIEW islamic.vw_quran_progress_summary AS
SELECT
    s.id AS student_id,
    s.admission_number,
    u.first_name || ' ' || u.last_name AS student_name,
    u.name_bengali,
    cs.display_name AS class_name,

    -- Progress counts
    COUNT(*) FILTER (WHERE qp.memorization_status = 'not_started') AS not_started,
    COUNT(*) FILTER (WHERE qp.memorization_status = 'in_progress') AS in_progress,
    COUNT(*) FILTER (WHERE qp.memorization_status = 'memorized') AS memorized,
    COUNT(*) FILTER (WHERE qp.memorization_status = 'mastered') AS mastered,

    -- Total verses memorized
    COALESCE(SUM(
        CASE WHEN qp.memorization_status IN ('memorized', 'mastered')
        THEN qp.verse_end - qp.verse_start + 1
        ELSE 0 END
    ), 0) AS total_verses_memorized,

    -- Progress percentage
    ROUND(
        COALESCE(SUM(
            CASE WHEN qp.memorization_status IN ('memorized', 'mastered')
            THEN qp.verse_end - qp.verse_start + 1
            ELSE 0 END
        ), 0)::DECIMAL / 6236 * 100, 2
    ) AS progress_percentage,

    -- Last assessment
    MAX(qp.assessed_at) AS last_assessed_at,

    -- Average score
    ROUND(AVG(qp.teacher_assessment_score), 2) AS avg_assessment_score

FROM academic.student s
JOIN auth.user u ON s.user_id = u.id
LEFT JOIN academic.enrollment e ON s.id = e.student_id
LEFT JOIN academic.class_section cs ON e.class_section_id = cs.id
LEFT JOIN islamic.quran_progress qp ON s.id = qp.student_id
WHERE s.enrollment_status = 'enrolled'
GROUP BY s.id, s.admission_number, u.first_name, u.last_name, u.name_bengali, cs.display_name;
```

#### 8.1.4 Fee Collection Summary View

```sql
CREATE OR REPLACE VIEW financial.vw_fee_collection_summary AS
SELECT
    DATE_TRUNC('month', pt.created_at) AS month,
    pt.gateway,
    COUNT(*) AS transaction_count,
    SUM(CASE WHEN pt.status = 'completed' THEN pt.amount ELSE 0 END) AS collected_amount,
    SUM(CASE WHEN pt.status = 'failed' THEN pt.amount ELSE 0 END) AS failed_amount,
    SUM(CASE WHEN pt.status = 'refunded' THEN pt.amount ELSE 0 END) AS refunded_amount,
    COUNT(*) FILTER (WHERE pt.status = 'completed') AS success_count,
    COUNT(*) FILTER (WHERE pt.status = 'failed') AS failed_count,
    ROUND(
        COUNT(*) FILTER (WHERE pt.status = 'completed')::DECIMAL /
        NULLIF(COUNT(*), 0) * 100, 2
    ) AS success_rate
FROM financial.payment_transaction pt
GROUP BY DATE_TRUNC('month', pt.created_at), pt.gateway
ORDER BY month DESC, gateway;
```

#### 8.1.5 Teacher Class Summary View

```sql
CREATE OR REPLACE VIEW academic.vw_teacher_classes AS
SELECT
    t.id AS teacher_id,
    t.user_id,
    tu.first_name || ' ' || tu.last_name AS teacher_name,
    cs.id AS class_section_id,
    cs.display_name AS class_name,
    sub.name AS subject_name,
    css.periods_per_week,
    ay.name AS academic_year,
    (
        SELECT COUNT(*)
        FROM academic.enrollment e
        WHERE e.class_section_id = cs.id AND e.status = 'active'
    ) AS student_count
FROM academic.teacher t
JOIN auth.user tu ON t.user_id = tu.id
JOIN academic.class_section_subject css ON t.id = css.teacher_id
JOIN academic.class_section cs ON css.class_section_id = cs.id
JOIN academic.subject sub ON css.subject_id = sub.id
JOIN academic.academic_year ay ON cs.academic_year_id = ay.id
WHERE ay.is_current = TRUE
ORDER BY teacher_name, class_name;
```

### 8.2 Materialized Views

```sql
-- Materialized view for dashboard analytics (refresh hourly)
CREATE MATERIALIZED VIEW analytics.mv_dashboard_stats AS
SELECT
    -- Student stats
    (SELECT COUNT(*) FROM academic.student WHERE enrollment_status = 'enrolled') AS total_students,
    (SELECT COUNT(*) FROM academic.teacher WHERE status = 'active') AS total_teachers,
    (SELECT COUNT(*) FROM academic.parent) AS total_parents,

    -- Today's attendance
    (
        SELECT ROUND(
            COUNT(*) FILTER (WHERE status = 'present')::DECIMAL /
            NULLIF(COUNT(*), 0) * 100, 2
        )
        FROM academic.attendance
        WHERE attendance_date = CURRENT_DATE
    ) AS today_attendance_pct,

    -- Fee collection this month
    (
        SELECT COALESCE(SUM(amount), 0)
        FROM financial.payment_transaction
        WHERE status = 'completed'
        AND DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)
    ) AS month_collection,

    -- Pending fees
    (
        SELECT COALESCE(SUM(balance), 0)
        FROM financial.fee_invoice
        WHERE status IN ('pending', 'partial', 'overdue')
    ) AS pending_fees,

    -- Quran progress (students with any memorization)
    (
        SELECT COUNT(DISTINCT student_id)
        FROM islamic.quran_progress
        WHERE memorization_status IN ('memorized', 'mastered')
    ) AS students_with_quran_progress,

    NOW() AS refreshed_at;

-- Create index on materialized view
CREATE UNIQUE INDEX ON analytics.mv_dashboard_stats (refreshed_at);

-- Refresh command (run via cron or scheduled job)
-- REFRESH MATERIALIZED VIEW CONCURRENTLY analytics.mv_dashboard_stats;
```

---

## Document Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-10 | Development Team | Initial document |

---

*This document is part of the Smart Academy Database Documentation series.*
