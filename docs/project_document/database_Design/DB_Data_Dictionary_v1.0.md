# Smart Academy Digital Portal - Data Dictionary

**Document Version:** 1.0
**Last Updated:** January 2026
**Document Status:** Draft
**Author:** Smart Academy Development Team

---

## Table of Contents

1. [Document Overview](#1-document-overview)
2. [Entity Definitions](#2-entity-definitions)
3. [Attribute Definitions by Domain](#3-attribute-definitions-by-domain)
4. [Data Types Reference](#4-data-types-reference)
5. [Enumeration Types](#5-enumeration-types)
6. [Business Rules](#6-business-rules)
7. [Data Validation Rules](#7-data-validation-rules)
8. [Data Relationships](#8-data-relationships)
9. [Glossary](#9-glossary)

---

## 1. Document Overview

### 1.1 Purpose

This Data Dictionary provides a comprehensive reference for all data elements within the Smart Academy Digital Portal database system. It serves as the authoritative source for:

- Understanding what each data element represents
- Knowing valid values and constraints
- Understanding business rules governing data
- Ensuring consistent data entry and validation

### 1.2 Scope

This dictionary covers:
- **PostgreSQL Database**: Custom modules (Auth, Academic, Islamic Education, Financial, Communication, Content, Analytics, Audit)
- **MySQL Extensions**: Gibbon SMS and Moodle LMS custom fields
- **Redis Data Structures**: Cache keys, session data, queue payloads

### 1.3 Conventions

| Symbol | Meaning |
|--------|---------|
| PK | Primary Key |
| FK | Foreign Key |
| UK | Unique Key |
| NN | Not Null |
| AI | Auto Increment |
| D | Default Value |
| C | Check Constraint |
| I | Indexed |

---

## 2. Entity Definitions

### 2.1 Authentication & Authorization Domain

#### 2.1.1 Entity: users

| Property | Value |
|----------|-------|
| **Entity Name** | users |
| **Schema** | auth |
| **Physical Name** | auth.users |
| **Description** | Master user account table storing authentication credentials and profile information for all system users |
| **Business Owner** | System Administration |
| **Data Steward** | IT Security Team |
| **Record Volume** | 5,000 - 50,000 records |
| **Growth Rate** | ~500 records/year |
| **Retention Period** | Active + 7 years after deactivation |
| **Archive Strategy** | Soft delete with annual archive to cold storage |
| **Audit Requirements** | Full audit trail on all changes |
| **Security Classification** | Confidential - Contains PII |

#### 2.1.2 Entity: roles

| Property | Value |
|----------|-------|
| **Entity Name** | roles |
| **Schema** | auth |
| **Physical Name** | auth.roles |
| **Description** | System role definitions for role-based access control (RBAC) |
| **Business Owner** | System Administration |
| **Data Steward** | IT Security Team |
| **Record Volume** | 10-50 records (static) |
| **Growth Rate** | Minimal |
| **Retention Period** | Permanent |
| **Archive Strategy** | None - permanent reference data |
| **Audit Requirements** | Full audit trail on all changes |
| **Security Classification** | Internal |

#### 2.1.3 Entity: permissions

| Property | Value |
|----------|-------|
| **Entity Name** | permissions |
| **Schema** | auth |
| **Physical Name** | auth.permissions |
| **Description** | Granular permission definitions for fine-grained access control |
| **Business Owner** | System Administration |
| **Data Steward** | IT Security Team |
| **Record Volume** | 100-500 records (static) |
| **Growth Rate** | Minimal |
| **Retention Period** | Permanent |
| **Archive Strategy** | None - permanent reference data |
| **Audit Requirements** | Full audit trail on all changes |
| **Security Classification** | Internal |

#### 2.1.4 Entity: user_roles

| Property | Value |
|----------|-------|
| **Entity Name** | user_roles |
| **Schema** | auth |
| **Physical Name** | auth.user_roles |
| **Description** | Junction table mapping users to their assigned roles |
| **Business Owner** | System Administration |
| **Data Steward** | IT Security Team |
| **Record Volume** | 10,000 - 100,000 records |
| **Growth Rate** | Proportional to user growth |
| **Retention Period** | Linked to user record lifecycle |
| **Archive Strategy** | Archive with parent user record |
| **Audit Requirements** | Full audit trail |
| **Security Classification** | Internal |

#### 2.1.5 Entity: role_permissions

| Property | Value |
|----------|-------|
| **Entity Name** | role_permissions |
| **Schema** | auth |
| **Physical Name** | auth.role_permissions |
| **Description** | Junction table mapping roles to their assigned permissions |
| **Business Owner** | System Administration |
| **Data Steward** | IT Security Team |
| **Record Volume** | 500-2,000 records |
| **Growth Rate** | Minimal |
| **Retention Period** | Permanent |
| **Archive Strategy** | None |
| **Audit Requirements** | Full audit trail |
| **Security Classification** | Internal |

#### 2.1.6 Entity: sessions

| Property | Value |
|----------|-------|
| **Entity Name** | sessions |
| **Schema** | auth |
| **Physical Name** | auth.sessions |
| **Description** | Active user session tracking for authentication state management |
| **Business Owner** | System Administration |
| **Data Steward** | IT Security Team |
| **Record Volume** | 1,000 - 10,000 records (transient) |
| **Growth Rate** | Highly variable |
| **Retention Period** | 24 hours after expiry |
| **Archive Strategy** | Auto-purge expired sessions |
| **Audit Requirements** | Login/logout events only |
| **Security Classification** | Confidential |

#### 2.1.7 Entity: refresh_tokens

| Property | Value |
|----------|-------|
| **Entity Name** | refresh_tokens |
| **Schema** | auth |
| **Physical Name** | auth.refresh_tokens |
| **Description** | JWT refresh token storage for session renewal |
| **Business Owner** | System Administration |
| **Data Steward** | IT Security Team |
| **Record Volume** | 5,000 - 50,000 records |
| **Growth Rate** | Proportional to active users |
| **Retention Period** | 30 days after last use |
| **Archive Strategy** | Auto-purge expired tokens |
| **Audit Requirements** | Token creation and revocation |
| **Security Classification** | Highly Confidential |

### 2.2 Academic Domain

#### 2.2.1 Entity: students

| Property | Value |
|----------|-------|
| **Entity Name** | students |
| **Schema** | academic |
| **Physical Name** | academic.students |
| **Description** | Core student information extending user profiles with academic-specific data |
| **Business Owner** | Academic Affairs |
| **Data Steward** | Registrar Office |
| **Record Volume** | 1,000 - 10,000 records |
| **Growth Rate** | ~200-500 records/year |
| **Retention Period** | Active + 10 years after graduation/withdrawal |
| **Archive Strategy** | Archive to cold storage after retention period |
| **Audit Requirements** | Full audit trail |
| **Security Classification** | Confidential - Contains PII |

#### 2.2.2 Entity: guardians

| Property | Value |
|----------|-------|
| **Entity Name** | guardians |
| **Schema** | academic |
| **Physical Name** | academic.guardians |
| **Description** | Parent/guardian information for student contacts |
| **Business Owner** | Academic Affairs |
| **Data Steward** | Registrar Office |
| **Record Volume** | 2,000 - 20,000 records |
| **Growth Rate** | Proportional to student enrollment |
| **Retention Period** | Linked to student record lifecycle |
| **Archive Strategy** | Archive with related student records |
| **Audit Requirements** | Full audit trail |
| **Security Classification** | Confidential - Contains PII |

#### 2.2.3 Entity: teachers

| Property | Value |
|----------|-------|
| **Entity Name** | teachers |
| **Schema** | academic |
| **Physical Name** | academic.teachers |
| **Description** | Teacher/instructor profiles with academic credentials |
| **Business Owner** | Academic Affairs |
| **Data Steward** | HR Department |
| **Record Volume** | 50 - 500 records |
| **Growth Rate** | ~10-20 records/year |
| **Retention Period** | Active + 7 years after termination |
| **Archive Strategy** | Archive to cold storage |
| **Audit Requirements** | Full audit trail |
| **Security Classification** | Confidential |

#### 2.2.4 Entity: classes

| Property | Value |
|----------|-------|
| **Entity Name** | classes |
| **Schema** | academic |
| **Physical Name** | academic.classes |
| **Description** | Class/section definitions for academic organization |
| **Business Owner** | Academic Affairs |
| **Data Steward** | Registrar Office |
| **Record Volume** | 50 - 200 records |
| **Growth Rate** | ~5-10 records/year |
| **Retention Period** | Permanent |
| **Archive Strategy** | Mark inactive, retain for historical reference |
| **Audit Requirements** | Full audit trail |
| **Security Classification** | Internal |

#### 2.2.5 Entity: enrollments

| Property | Value |
|----------|-------|
| **Entity Name** | enrollments |
| **Schema** | academic |
| **Physical Name** | academic.enrollments |
| **Description** | Student enrollment records linking students to classes and academic years |
| **Business Owner** | Academic Affairs |
| **Data Steward** | Registrar Office |
| **Record Volume** | 5,000 - 50,000 records |
| **Growth Rate** | ~1,000-2,000 records/year |
| **Retention Period** | Permanent |
| **Archive Strategy** | Partition by academic year, archive old partitions |
| **Audit Requirements** | Full audit trail |
| **Security Classification** | Internal |

#### 2.2.6 Entity: attendance

| Property | Value |
|----------|-------|
| **Entity Name** | attendance |
| **Schema** | academic |
| **Physical Name** | academic.attendance |
| **Description** | Daily attendance records for students |
| **Business Owner** | Academic Affairs |
| **Data Steward** | Class Teachers |
| **Record Volume** | 100,000 - 1,000,000+ records |
| **Growth Rate** | ~200 records/day (during school days) |
| **Retention Period** | Current year + 5 years |
| **Archive Strategy** | Partition by month, archive partitions older than 5 years |
| **Audit Requirements** | Modification audit only |
| **Security Classification** | Internal |

#### 2.2.7 Entity: academic_years

| Property | Value |
|----------|-------|
| **Entity Name** | academic_years |
| **Schema** | academic |
| **Physical Name** | academic.academic_years |
| **Description** | Academic year definitions with start/end dates |
| **Business Owner** | Academic Affairs |
| **Data Steward** | Registrar Office |
| **Record Volume** | 10-30 records |
| **Growth Rate** | 1 record/year |
| **Retention Period** | Permanent |
| **Archive Strategy** | None - permanent reference data |
| **Audit Requirements** | Full audit trail |
| **Security Classification** | Public |

### 2.3 Islamic Education Domain

#### 2.3.1 Entity: quran_programs

| Property | Value |
|----------|-------|
| **Entity Name** | quran_programs |
| **Schema** | islamic |
| **Physical Name** | islamic.quran_programs |
| **Description** | Quran memorization and study program definitions |
| **Business Owner** | Islamic Studies Department |
| **Data Steward** | Quran Studies Coordinator |
| **Record Volume** | 5-20 records |
| **Growth Rate** | Minimal |
| **Retention Period** | Permanent |
| **Archive Strategy** | None - permanent reference data |
| **Audit Requirements** | Full audit trail |
| **Security Classification** | Internal |

#### 2.3.2 Entity: quran_enrollments

| Property | Value |
|----------|-------|
| **Entity Name** | quran_enrollments |
| **Schema** | islamic |
| **Physical Name** | islamic.quran_enrollments |
| **Description** | Student enrollment in Quran programs |
| **Business Owner** | Islamic Studies Department |
| **Data Steward** | Quran Studies Coordinator |
| **Record Volume** | 500 - 5,000 records |
| **Growth Rate** | ~100-300 records/year |
| **Retention Period** | Permanent |
| **Archive Strategy** | None |
| **Audit Requirements** | Full audit trail |
| **Security Classification** | Internal |

#### 2.3.3 Entity: hafiz_progress

| Property | Value |
|----------|-------|
| **Entity Name** | hafiz_progress |
| **Schema** | islamic |
| **Physical Name** | islamic.hafiz_progress |
| **Description** | Detailed Quran memorization progress tracking by Surah and Juz |
| **Business Owner** | Islamic Studies Department |
| **Data Steward** | Quran Teachers |
| **Record Volume** | 10,000 - 100,000 records |
| **Growth Rate** | ~500-1,000 records/month |
| **Retention Period** | Permanent |
| **Archive Strategy** | None - essential academic record |
| **Audit Requirements** | Full audit trail |
| **Security Classification** | Internal |

#### 2.3.4 Entity: murajaah_sessions

| Property | Value |
|----------|-------|
| **Entity Name** | murajaah_sessions |
| **Schema** | islamic |
| **Physical Name** | islamic.murajaah_sessions |
| **Description** | Quran revision (Murajaah) session records |
| **Business Owner** | Islamic Studies Department |
| **Data Steward** | Quran Teachers |
| **Record Volume** | 50,000 - 500,000 records |
| **Growth Rate** | ~100-200 records/day |
| **Retention Period** | Current year + 3 years |
| **Archive Strategy** | Archive sessions older than 3 years |
| **Audit Requirements** | Modification audit only |
| **Security Classification** | Internal |

#### 2.3.5 Entity: tajweed_assessments

| Property | Value |
|----------|-------|
| **Entity Name** | tajweed_assessments |
| **Schema** | islamic |
| **Physical Name** | islamic.tajweed_assessments |
| **Description** | Tajweed (Quran recitation rules) assessment records |
| **Business Owner** | Islamic Studies Department |
| **Data Steward** | Quran Teachers |
| **Record Volume** | 5,000 - 50,000 records |
| **Growth Rate** | ~50-100 records/week |
| **Retention Period** | Permanent |
| **Archive Strategy** | None - essential academic record |
| **Audit Requirements** | Full audit trail |
| **Security Classification** | Internal |

#### 2.3.6 Entity: islamic_studies_grades

| Property | Value |
|----------|-------|
| **Entity Name** | islamic_studies_grades |
| **Schema** | islamic |
| **Physical Name** | islamic.islamic_studies_grades |
| **Description** | Grades for Islamic studies subjects |
| **Business Owner** | Islamic Studies Department |
| **Data Steward** | Islamic Studies Teachers |
| **Record Volume** | 10,000 - 100,000 records |
| **Growth Rate** | ~500-1,000 records/term |
| **Retention Period** | Permanent |
| **Archive Strategy** | None - essential academic record |
| **Audit Requirements** | Full audit trail |
| **Security Classification** | Internal |

### 2.4 Financial Domain

#### 2.4.1 Entity: fee_structures

| Property | Value |
|----------|-------|
| **Entity Name** | fee_structures |
| **Schema** | financial |
| **Physical Name** | financial.fee_structures |
| **Description** | Fee structure definitions by program and academic year |
| **Business Owner** | Finance Department |
| **Data Steward** | Finance Manager |
| **Record Volume** | 20-100 records |
| **Growth Rate** | ~5-10 records/year |
| **Retention Period** | Permanent |
| **Archive Strategy** | None - permanent reference data |
| **Audit Requirements** | Full audit trail |
| **Security Classification** | Internal |

#### 2.4.2 Entity: invoices

| Property | Value |
|----------|-------|
| **Entity Name** | invoices |
| **Schema** | financial |
| **Physical Name** | financial.invoices |
| **Description** | Student fee invoices with line items |
| **Business Owner** | Finance Department |
| **Data Steward** | Accounts Receivable |
| **Record Volume** | 5,000 - 50,000 records |
| **Growth Rate** | ~1,000-3,000 records/year |
| **Retention Period** | 7 years from creation |
| **Archive Strategy** | Archive invoices older than 7 years |
| **Audit Requirements** | Full audit trail (regulatory requirement) |
| **Security Classification** | Confidential |

#### 2.4.3 Entity: invoice_items

| Property | Value |
|----------|-------|
| **Entity Name** | invoice_items |
| **Schema** | financial |
| **Physical Name** | financial.invoice_items |
| **Description** | Individual line items on invoices |
| **Business Owner** | Finance Department |
| **Data Steward** | Accounts Receivable |
| **Record Volume** | 10,000 - 150,000 records |
| **Growth Rate** | Proportional to invoices |
| **Retention Period** | Linked to invoice lifecycle |
| **Archive Strategy** | Archive with parent invoice |
| **Audit Requirements** | Full audit trail |
| **Security Classification** | Confidential |

#### 2.4.4 Entity: payments

| Property | Value |
|----------|-------|
| **Entity Name** | payments |
| **Schema** | financial |
| **Physical Name** | financial.payments |
| **Description** | Payment transactions received from students/guardians |
| **Business Owner** | Finance Department |
| **Data Steward** | Accounts Receivable |
| **Record Volume** | 10,000 - 100,000 records |
| **Growth Rate** | ~2,000-5,000 records/year |
| **Retention Period** | 7 years from transaction date |
| **Archive Strategy** | Archive payments older than 7 years |
| **Audit Requirements** | Full audit trail (regulatory requirement) |
| **Security Classification** | Confidential |

#### 2.4.5 Entity: payment_allocations

| Property | Value |
|----------|-------|
| **Entity Name** | payment_allocations |
| **Schema** | financial |
| **Physical Name** | financial.payment_allocations |
| **Description** | Allocation of payments to invoice items |
| **Business Owner** | Finance Department |
| **Data Steward** | Accounts Receivable |
| **Record Volume** | 15,000 - 150,000 records |
| **Growth Rate** | Proportional to payments |
| **Retention Period** | Linked to payment lifecycle |
| **Archive Strategy** | Archive with parent payment |
| **Audit Requirements** | Full audit trail |
| **Security Classification** | Confidential |

#### 2.4.6 Entity: scholarships

| Property | Value |
|----------|-------|
| **Entity Name** | scholarships |
| **Schema** | financial |
| **Physical Name** | financial.scholarships |
| **Description** | Scholarship and financial aid definitions |
| **Business Owner** | Finance Department |
| **Data Steward** | Financial Aid Office |
| **Record Volume** | 10-50 records |
| **Growth Rate** | Minimal |
| **Retention Period** | Permanent |
| **Archive Strategy** | None |
| **Audit Requirements** | Full audit trail |
| **Security Classification** | Internal |

#### 2.4.7 Entity: student_scholarships

| Property | Value |
|----------|-------|
| **Entity Name** | student_scholarships |
| **Schema** | financial |
| **Physical Name** | financial.student_scholarships |
| **Description** | Scholarship awards to individual students |
| **Business Owner** | Finance Department |
| **Data Steward** | Financial Aid Office |
| **Record Volume** | 200 - 2,000 records |
| **Growth Rate** | ~50-100 records/year |
| **Retention Period** | Permanent |
| **Archive Strategy** | None |
| **Audit Requirements** | Full audit trail |
| **Security Classification** | Confidential |

### 2.5 Communication Domain

#### 2.5.1 Entity: notifications

| Property | Value |
|----------|-------|
| **Entity Name** | notifications |
| **Schema** | communication |
| **Physical Name** | communication.notifications |
| **Description** | System notifications and alerts for users |
| **Business Owner** | System Administration |
| **Data Steward** | IT Operations |
| **Record Volume** | 100,000 - 1,000,000+ records |
| **Growth Rate** | ~500-1,000 records/day |
| **Retention Period** | 90 days |
| **Archive Strategy** | Auto-purge records older than 90 days |
| **Audit Requirements** | None |
| **Security Classification** | Internal |

#### 2.5.2 Entity: messages

| Property | Value |
|----------|-------|
| **Entity Name** | messages |
| **Schema** | communication |
| **Physical Name** | communication.messages |
| **Description** | Internal messaging between users |
| **Business Owner** | System Administration |
| **Data Steward** | IT Operations |
| **Record Volume** | 10,000 - 100,000 records |
| **Growth Rate** | ~100-500 records/day |
| **Retention Period** | 1 year |
| **Archive Strategy** | Archive messages older than 1 year |
| **Audit Requirements** | None |
| **Security Classification** | Confidential |

#### 2.5.3 Entity: announcements

| Property | Value |
|----------|-------|
| **Entity Name** | announcements |
| **Schema** | communication |
| **Physical Name** | communication.announcements |
| **Description** | School-wide or targeted announcements |
| **Business Owner** | Administration |
| **Data Steward** | Communications Office |
| **Record Volume** | 500 - 5,000 records |
| **Growth Rate** | ~100-200 records/year |
| **Retention Period** | 2 years |
| **Archive Strategy** | Archive announcements older than 2 years |
| **Audit Requirements** | Full audit trail |
| **Security Classification** | Internal/Public |

### 2.6 Content Management Domain

#### 2.6.1 Entity: pages

| Property | Value |
|----------|-------|
| **Entity Name** | pages |
| **Schema** | content |
| **Physical Name** | content.pages |
| **Description** | CMS pages for website content |
| **Business Owner** | Communications |
| **Data Steward** | Content Team |
| **Record Volume** | 50 - 500 records |
| **Growth Rate** | ~20-50 records/year |
| **Retention Period** | Permanent |
| **Archive Strategy** | Soft delete, retain history |
| **Audit Requirements** | Full audit trail |
| **Security Classification** | Public/Internal |

#### 2.6.2 Entity: media

| Property | Value |
|----------|-------|
| **Entity Name** | media |
| **Schema** | content |
| **Physical Name** | content.media |
| **Description** | Media file metadata (images, documents, videos) |
| **Business Owner** | Communications |
| **Data Steward** | Content Team |
| **Record Volume** | 1,000 - 10,000 records |
| **Growth Rate** | ~200-500 records/year |
| **Retention Period** | Permanent or until unused |
| **Archive Strategy** | Periodic cleanup of orphaned files |
| **Audit Requirements** | Upload/delete audit |
| **Security Classification** | Mixed |

### 2.7 Analytics Domain

#### 2.7.1 Entity: dashboard_metrics

| Property | Value |
|----------|-------|
| **Entity Name** | dashboard_metrics |
| **Schema** | analytics |
| **Physical Name** | analytics.dashboard_metrics |
| **Description** | Pre-computed dashboard metrics for performance |
| **Business Owner** | Administration |
| **Data Steward** | IT Operations |
| **Record Volume** | 1,000 - 10,000 records |
| **Growth Rate** | Variable |
| **Retention Period** | 1 year |
| **Archive Strategy** | Auto-purge old metrics |
| **Audit Requirements** | None |
| **Security Classification** | Internal |

#### 2.7.2 Entity: report_cache

| Property | Value |
|----------|-------|
| **Entity Name** | report_cache |
| **Schema** | analytics |
| **Physical Name** | analytics.report_cache |
| **Description** | Cached report results for performance optimization |
| **Business Owner** | IT Operations |
| **Data Steward** | IT Operations |
| **Record Volume** | 100 - 1,000 records |
| **Growth Rate** | Variable |
| **Retention Period** | 24 hours |
| **Archive Strategy** | Auto-purge expired cache |
| **Audit Requirements** | None |
| **Security Classification** | Internal |

### 2.8 Audit Domain

#### 2.8.1 Entity: audit_log

| Property | Value |
|----------|-------|
| **Entity Name** | audit_log |
| **Schema** | audit |
| **Physical Name** | audit.audit_log |
| **Description** | Comprehensive audit trail of all data changes |
| **Business Owner** | Compliance |
| **Data Steward** | IT Security |
| **Record Volume** | 1,000,000+ records |
| **Growth Rate** | ~5,000-10,000 records/day |
| **Retention Period** | 7 years |
| **Archive Strategy** | Partition by month, archive partitions older than 1 year |
| **Audit Requirements** | Self-documenting |
| **Security Classification** | Highly Confidential |

---

## 3. Attribute Definitions by Domain

### 3.1 Authentication Domain Attributes

#### 3.1.1 auth.users Table

| Attribute | Physical Name | Data Type | Size | Nullable | Default | Constraints | Description |
|-----------|---------------|-----------|------|----------|---------|-------------|-------------|
| User ID | id | UUID | 36 | No | gen_random_uuid() | PK | Unique identifier for user record |
| Email Address | email | VARCHAR | 255 | No | - | UK, C:email_format | Primary email used for authentication |
| Password Hash | password_hash | VARCHAR | 255 | No | - | - | Argon2id hashed password |
| First Name | first_name | VARCHAR | 100 | No | - | C:not_empty | User's given name |
| Last Name | last_name | VARCHAR | 100 | No | - | C:not_empty | User's family name |
| Phone Number | phone | VARCHAR | 20 | Yes | NULL | C:phone_format | Primary contact phone number |
| Avatar URL | avatar_url | TEXT | - | Yes | NULL | - | URL to user profile image |
| Account Status | status | user_status | - | No | 'pending' | - | Current account status |
| Email Verified | email_verified | BOOLEAN | - | No | FALSE | - | Whether email has been verified |
| Email Verified At | email_verified_at | TIMESTAMPTZ | - | Yes | NULL | - | Timestamp of email verification |
| Last Login | last_login_at | TIMESTAMPTZ | - | Yes | NULL | - | Timestamp of most recent login |
| Failed Attempts | failed_login_attempts | INTEGER | - | No | 0 | C:>= 0 | Count of failed login attempts |
| Locked Until | locked_until | TIMESTAMPTZ | - | Yes | NULL | - | Account lock expiration time |
| Password Changed | password_changed_at | TIMESTAMPTZ | - | Yes | NULL | - | Last password change timestamp |
| Preferences | preferences | JSONB | - | Yes | '{}' | - | User preferences (locale, theme, etc.) |
| Created At | created_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Record creation timestamp |
| Updated At | updated_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Last modification timestamp |
| Deleted At | deleted_at | TIMESTAMPTZ | - | Yes | NULL | I | Soft delete timestamp |

#### 3.1.2 auth.roles Table

| Attribute | Physical Name | Data Type | Size | Nullable | Default | Constraints | Description |
|-----------|---------------|-----------|------|----------|---------|-------------|-------------|
| Role ID | id | UUID | 36 | No | gen_random_uuid() | PK | Unique identifier for role |
| Role Code | code | VARCHAR | 50 | No | - | UK | Machine-readable role identifier |
| Role Name | name | VARCHAR | 100 | No | - | - | Human-readable role name |
| Description | description | TEXT | - | Yes | NULL | - | Detailed role description |
| Is System Role | is_system | BOOLEAN | - | No | FALSE | - | Whether role is system-defined (non-deletable) |
| Priority | priority | INTEGER | - | No | 0 | - | Role priority for permission resolution |
| Created At | created_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Record creation timestamp |
| Updated At | updated_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Last modification timestamp |

#### 3.1.3 auth.permissions Table

| Attribute | Physical Name | Data Type | Size | Nullable | Default | Constraints | Description |
|-----------|---------------|-----------|------|----------|---------|-------------|-------------|
| Permission ID | id | UUID | 36 | No | gen_random_uuid() | PK | Unique identifier for permission |
| Resource | resource | VARCHAR | 100 | No | - | - | Resource being protected |
| Action | action | VARCHAR | 50 | No | - | - | Action type (create, read, update, delete) |
| Permission Code | code | VARCHAR | 150 | No | - | UK | Full permission code (resource:action) |
| Description | description | TEXT | - | Yes | NULL | - | Permission description |
| Created At | created_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Record creation timestamp |

#### 3.1.4 auth.sessions Table

| Attribute | Physical Name | Data Type | Size | Nullable | Default | Constraints | Description |
|-----------|---------------|-----------|------|----------|---------|-------------|-------------|
| Session ID | id | UUID | 36 | No | gen_random_uuid() | PK | Unique session identifier |
| User ID | user_id | UUID | 36 | No | - | FK:users.id | Reference to authenticated user |
| Token Hash | token_hash | VARCHAR | 64 | No | - | UK | SHA-256 hash of session token |
| IP Address | ip_address | INET | - | Yes | NULL | - | Client IP address |
| User Agent | user_agent | TEXT | - | Yes | NULL | - | Browser/client identifier |
| Expires At | expires_at | TIMESTAMPTZ | - | No | - | I | Session expiration time |
| Created At | created_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Session creation timestamp |
| Last Activity | last_activity_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Last activity timestamp |

### 3.2 Academic Domain Attributes

#### 3.2.1 academic.students Table

| Attribute | Physical Name | Data Type | Size | Nullable | Default | Constraints | Description |
|-----------|---------------|-----------|------|----------|---------|-------------|-------------|
| Student ID | id | UUID | 36 | No | gen_random_uuid() | PK | Unique student identifier |
| User ID | user_id | UUID | 36 | No | - | FK:auth.users.id, UK | Link to user account |
| Student Number | student_number | VARCHAR | 20 | No | - | UK | Official student registration number |
| Date of Birth | date_of_birth | DATE | - | No | - | C:past_date | Student's date of birth |
| Gender | gender | gender_type | - | No | - | - | Student's gender |
| Nationality | nationality | VARCHAR | 100 | Yes | NULL | - | Country of citizenship |
| National ID | national_id | VARCHAR | 50 | Yes | NULL | UK | National identification number |
| Blood Type | blood_type | blood_type | - | Yes | NULL | - | Blood group |
| Medical Notes | medical_notes | TEXT | - | Yes | NULL | - | Important medical information |
| Admission Date | admission_date | DATE | - | No | CURRENT_DATE | - | Date of admission to school |
| Student Status | status | student_status | - | No | 'active' | - | Current enrollment status |
| Primary Guardian | primary_guardian_id | UUID | 36 | Yes | NULL | FK:guardians.id | Primary contact guardian |
| Emergency Contact | emergency_contact | JSONB | - | Yes | NULL | - | Emergency contact details |
| Previous School | previous_school | VARCHAR | 255 | Yes | NULL | - | Name of previous school |
| Address | address | JSONB | - | Yes | NULL | - | Residential address |
| Created At | created_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Record creation timestamp |
| Updated At | updated_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Last modification timestamp |

#### 3.2.2 academic.guardians Table

| Attribute | Physical Name | Data Type | Size | Nullable | Default | Constraints | Description |
|-----------|---------------|-----------|------|----------|---------|-------------|-------------|
| Guardian ID | id | UUID | 36 | No | gen_random_uuid() | PK | Unique guardian identifier |
| User ID | user_id | UUID | 36 | Yes | NULL | FK:auth.users.id | Optional link to user account |
| First Name | first_name | VARCHAR | 100 | No | - | - | Guardian's given name |
| Last Name | last_name | VARCHAR | 100 | No | - | - | Guardian's family name |
| Relationship | relationship | relationship_type | - | No | - | - | Relationship to student |
| Email | email | VARCHAR | 255 | Yes | NULL | C:email_format | Contact email address |
| Phone Primary | phone_primary | VARCHAR | 20 | No | - | - | Primary phone number |
| Phone Secondary | phone_secondary | VARCHAR | 20 | Yes | NULL | - | Secondary phone number |
| Occupation | occupation | VARCHAR | 100 | Yes | NULL | - | Guardian's occupation |
| Employer | employer | VARCHAR | 255 | Yes | NULL | - | Employer name |
| Address | address | JSONB | - | Yes | NULL | - | Residential address |
| Is Emergency Contact | is_emergency_contact | BOOLEAN | - | No | TRUE | - | Can be contacted in emergency |
| Authorized Pickup | authorized_pickup | BOOLEAN | - | No | FALSE | - | Authorized to pick up student |
| Created At | created_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Record creation timestamp |
| Updated At | updated_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Last modification timestamp |

#### 3.2.3 academic.teachers Table

| Attribute | Physical Name | Data Type | Size | Nullable | Default | Constraints | Description |
|-----------|---------------|-----------|------|----------|---------|-------------|-------------|
| Teacher ID | id | UUID | 36 | No | gen_random_uuid() | PK | Unique teacher identifier |
| User ID | user_id | UUID | 36 | No | - | FK:auth.users.id, UK | Link to user account |
| Employee Number | employee_number | VARCHAR | 20 | No | - | UK | Official employee ID |
| Hire Date | hire_date | DATE | - | No | - | - | Employment start date |
| Department | department | VARCHAR | 100 | Yes | NULL | - | Primary department |
| Specializations | specializations | TEXT[] | - | Yes | NULL | - | Teaching specializations |
| Qualifications | qualifications | JSONB | - | Yes | NULL | - | Academic qualifications |
| Teacher Status | status | employment_status | - | No | 'active' | - | Employment status |
| Is Quran Teacher | is_quran_teacher | BOOLEAN | - | No | FALSE | - | Certified Quran teacher |
| Ijazah Details | ijazah_details | JSONB | - | Yes | NULL | - | Quran teaching certification |
| Created At | created_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Record creation timestamp |
| Updated At | updated_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Last modification timestamp |

#### 3.2.4 academic.classes Table

| Attribute | Physical Name | Data Type | Size | Nullable | Default | Constraints | Description |
|-----------|---------------|-----------|------|----------|---------|-------------|-------------|
| Class ID | id | UUID | 36 | No | gen_random_uuid() | PK | Unique class identifier |
| Class Name | name | VARCHAR | 100 | No | - | - | Class name (e.g., "Grade 5-A") |
| Class Code | code | VARCHAR | 20 | No | - | UK per year | Short class code |
| Grade Level | grade_level | INTEGER | - | No | - | C:1-12 | Academic grade level |
| Section | section | VARCHAR | 10 | Yes | NULL | - | Class section letter/number |
| Academic Year | academic_year_id | UUID | 36 | No | - | FK:academic_years.id | Reference to academic year |
| Class Teacher | class_teacher_id | UUID | 36 | Yes | NULL | FK:teachers.id | Assigned class teacher |
| Room Number | room_number | VARCHAR | 20 | Yes | NULL | - | Assigned classroom |
| Capacity | capacity | INTEGER | - | Yes | 30 | C:> 0 | Maximum student capacity |
| Class Status | status | class_status | - | No | 'active' | - | Current class status |
| Created At | created_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Record creation timestamp |
| Updated At | updated_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Last modification timestamp |

#### 3.2.5 academic.enrollments Table

| Attribute | Physical Name | Data Type | Size | Nullable | Default | Constraints | Description |
|-----------|---------------|-----------|------|----------|---------|-------------|-------------|
| Enrollment ID | id | UUID | 36 | No | gen_random_uuid() | PK | Unique enrollment identifier |
| Student ID | student_id | UUID | 36 | No | - | FK:students.id | Reference to student |
| Class ID | class_id | UUID | 36 | No | - | FK:classes.id | Reference to class |
| Academic Year | academic_year_id | UUID | 36 | No | - | FK:academic_years.id | Reference to academic year |
| Enrollment Date | enrollment_date | DATE | - | No | CURRENT_DATE | - | Date of enrollment |
| Enrollment Status | status | enrollment_status | - | No | 'active' | - | Current enrollment status |
| Withdrawal Date | withdrawal_date | DATE | - | Yes | NULL | - | Date of withdrawal (if applicable) |
| Withdrawal Reason | withdrawal_reason | TEXT | - | Yes | NULL | - | Reason for withdrawal |
| Roll Number | roll_number | INTEGER | - | Yes | NULL | - | Class roll number |
| Created At | created_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Record creation timestamp |
| Updated At | updated_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Last modification timestamp |

**Unique Constraint**: (student_id, class_id, academic_year_id)

#### 3.2.6 academic.attendance Table

| Attribute | Physical Name | Data Type | Size | Nullable | Default | Constraints | Description |
|-----------|---------------|-----------|------|----------|---------|-------------|-------------|
| Attendance ID | id | UUID | 36 | No | gen_random_uuid() | PK | Unique attendance record ID |
| Student ID | student_id | UUID | 36 | No | - | FK:students.id | Reference to student |
| Class ID | class_id | UUID | 36 | No | - | FK:classes.id | Reference to class |
| Attendance Date | attendance_date | DATE | - | No | - | I | Date of attendance |
| Attendance Status | status | attendance_status | - | No | - | - | Attendance status |
| Check-in Time | check_in_time | TIME | - | Yes | NULL | - | Actual arrival time |
| Check-out Time | check_out_time | TIME | - | Yes | NULL | - | Departure time |
| Notes | notes | TEXT | - | Yes | NULL | - | Additional notes |
| Recorded By | recorded_by | UUID | 36 | No | - | FK:auth.users.id | Staff who recorded |
| Created At | created_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Record creation timestamp |
| Updated At | updated_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Last modification timestamp |

**Unique Constraint**: (student_id, class_id, attendance_date)
**Partitioning**: Range partition by attendance_date (monthly)

### 3.3 Islamic Education Domain Attributes

#### 3.3.1 islamic.quran_programs Table

| Attribute | Physical Name | Data Type | Size | Nullable | Default | Constraints | Description |
|-----------|---------------|-----------|------|----------|---------|-------------|-------------|
| Program ID | id | UUID | 36 | No | gen_random_uuid() | PK | Unique program identifier |
| Program Name | name | VARCHAR | 100 | No | - | UK | Program name |
| Program Code | code | VARCHAR | 20 | No | - | UK | Short program code |
| Program Type | program_type | quran_program_type | - | No | - | - | Type of Quran program |
| Description | description | TEXT | - | Yes | NULL | - | Program description |
| Target Surahs | target_surahs | INTEGER[] | - | Yes | NULL | - | List of Surah numbers to memorize |
| Target Juz | target_juz | INTEGER[] | - | Yes | NULL | - | List of Juz numbers to memorize |
| Duration Months | duration_months | INTEGER | - | Yes | NULL | C:> 0 | Expected program duration |
| Prerequisites | prerequisites | TEXT | - | Yes | NULL | - | Prerequisites for enrollment |
| Is Active | is_active | BOOLEAN | - | No | TRUE | - | Program availability status |
| Created At | created_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Record creation timestamp |
| Updated At | updated_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Last modification timestamp |

#### 3.3.2 islamic.hafiz_progress Table

| Attribute | Physical Name | Data Type | Size | Nullable | Default | Constraints | Description |
|-----------|---------------|-----------|------|----------|---------|-------------|-------------|
| Progress ID | id | UUID | 36 | No | gen_random_uuid() | PK | Unique progress record ID |
| Enrollment ID | enrollment_id | UUID | 36 | No | - | FK:quran_enrollments.id | Reference to program enrollment |
| Surah Number | surah_number | INTEGER | - | No | - | C:1-114 | Surah number (1=Al-Fatiha to 114=An-Nas) |
| Juz Number | juz_number | INTEGER | - | No | - | C:1-30 | Juz number (1-30) |
| Progress Status | status | memorization_status | - | No | 'not_started' | - | Memorization status |
| Start Date | start_date | DATE | - | Yes | NULL | - | Date memorization started |
| Completion Date | completion_date | DATE | - | Yes | NULL | - | Date memorization completed |
| Verses Memorized | verses_memorized | INTEGER | - | No | 0 | C:>= 0 | Number of verses memorized |
| Total Verses | total_verses | INTEGER | - | No | - | C:> 0 | Total verses in Surah |
| Last Reviewed | last_reviewed_at | DATE | - | Yes | NULL | - | Date of last review |
| Review Count | review_count | INTEGER | - | No | 0 | C:>= 0 | Number of review sessions |
| Quality Score | quality_score | DECIMAL | 5,2 | Yes | NULL | C:0-100 | Overall quality score (percentage) |
| Teacher Notes | teacher_notes | TEXT | - | Yes | NULL | - | Teacher's observations |
| Created At | created_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Record creation timestamp |
| Updated At | updated_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Last modification timestamp |

**Unique Constraint**: (enrollment_id, surah_number)

#### 3.3.3 islamic.murajaah_sessions Table

| Attribute | Physical Name | Data Type | Size | Nullable | Default | Constraints | Description |
|-----------|---------------|-----------|------|----------|---------|-------------|-------------|
| Session ID | id | UUID | 36 | No | gen_random_uuid() | PK | Unique session identifier |
| Enrollment ID | enrollment_id | UUID | 36 | No | - | FK:quran_enrollments.id | Reference to enrollment |
| Session Date | session_date | DATE | - | No | - | I | Date of review session |
| Teacher ID | teacher_id | UUID | 36 | No | - | FK:academic.teachers.id | Reviewing teacher |
| Surah Start | surah_start | INTEGER | - | No | - | C:1-114 | Starting Surah number |
| Ayah Start | ayah_start | INTEGER | - | No | 1 | C:>= 1 | Starting Ayah number |
| Surah End | surah_end | INTEGER | - | No | - | C:1-114 | Ending Surah number |
| Ayah End | ayah_end | INTEGER | - | No | - | C:>= 1 | Ending Ayah number |
| Recitation Quality | recitation_quality | quality_rating | - | No | - | - | Quality of recitation |
| Tajweed Score | tajweed_score | DECIMAL | 5,2 | Yes | NULL | C:0-100 | Tajweed accuracy percentage |
| Fluency Score | fluency_score | DECIMAL | 5,2 | Yes | NULL | C:0-100 | Fluency percentage |
| Mistakes Count | mistakes_count | INTEGER | - | No | 0 | C:>= 0 | Number of mistakes made |
| Mistake Details | mistake_details | JSONB | - | Yes | NULL | - | Detailed mistake analysis |
| Duration Minutes | duration_minutes | INTEGER | - | Yes | NULL | C:> 0 | Session duration in minutes |
| Teacher Notes | notes | TEXT | - | Yes | NULL | - | Teacher's notes |
| Created At | created_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Record creation timestamp |

#### 3.3.4 islamic.tajweed_assessments Table

| Attribute | Physical Name | Data Type | Size | Nullable | Default | Constraints | Description |
|-----------|---------------|-----------|------|----------|---------|-------------|-------------|
| Assessment ID | id | UUID | 36 | No | gen_random_uuid() | PK | Unique assessment identifier |
| Enrollment ID | enrollment_id | UUID | 36 | No | - | FK:quran_enrollments.id | Reference to enrollment |
| Assessment Date | assessment_date | DATE | - | No | - | - | Date of assessment |
| Teacher ID | teacher_id | UUID | 36 | No | - | FK:academic.teachers.id | Assessing teacher |
| Assessment Type | assessment_type | tajweed_assessment_type | - | No | - | - | Type of assessment |
| Surah Assessed | surah_number | INTEGER | - | No | - | C:1-114 | Surah that was assessed |
| Makharij Score | makharij_score | DECIMAL | 5,2 | Yes | NULL | C:0-100 | Articulation points score |
| Sifaat Score | sifaat_score | DECIMAL | 5,2 | Yes | NULL | C:0-100 | Letter characteristics score |
| Noon Rules Score | noon_rules_score | DECIMAL | 5,2 | Yes | NULL | C:0-100 | Noon Sakinah/Tanween rules |
| Meem Rules Score | meem_rules_score | DECIMAL | 5,2 | Yes | NULL | C:0-100 | Meem Sakinah rules |
| Madd Score | madd_score | DECIMAL | 5,2 | Yes | NULL | C:0-100 | Elongation rules |
| Waqf Score | waqf_score | DECIMAL | 5,2 | Yes | NULL | C:0-100 | Stopping rules |
| Overall Score | overall_score | DECIMAL | 5,2 | No | - | C:0-100 | Combined assessment score |
| Grade | grade | tajweed_grade | - | No | - | - | Assessment grade |
| Strengths | strengths | TEXT | - | Yes | NULL | - | Areas of strength |
| Improvements | improvements_needed | TEXT | - | Yes | NULL | - | Areas needing improvement |
| Teacher Notes | notes | TEXT | - | Yes | NULL | - | Additional notes |
| Created At | created_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Record creation timestamp |

### 3.4 Financial Domain Attributes

#### 3.4.1 financial.fee_structures Table

| Attribute | Physical Name | Data Type | Size | Nullable | Default | Constraints | Description |
|-----------|---------------|-----------|------|----------|---------|-------------|-------------|
| Fee Structure ID | id | UUID | 36 | No | gen_random_uuid() | PK | Unique identifier |
| Academic Year | academic_year_id | UUID | 36 | No | - | FK:academic.academic_years.id | Applicable academic year |
| Fee Name | name | VARCHAR | 100 | No | - | - | Fee type name |
| Fee Code | code | VARCHAR | 20 | No | - | - | Short fee code |
| Fee Category | category | fee_category | - | No | - | - | Fee category |
| Amount | amount | DECIMAL | 12,2 | No | - | C:>= 0 | Fee amount |
| Currency | currency | CHAR | 3 | No | 'MYR' | - | Currency code (ISO 4217) |
| Frequency | frequency | fee_frequency | - | No | - | - | Payment frequency |
| Grade Levels | grade_levels | INTEGER[] | - | Yes | NULL | - | Applicable grade levels |
| Description | description | TEXT | - | Yes | NULL | - | Fee description |
| Is Mandatory | is_mandatory | BOOLEAN | - | No | TRUE | - | Whether fee is mandatory |
| Is Active | is_active | BOOLEAN | - | No | TRUE | - | Whether fee is active |
| Created At | created_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Record creation timestamp |
| Updated At | updated_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Last modification timestamp |

**Unique Constraint**: (academic_year_id, code)

#### 3.4.2 financial.invoices Table

| Attribute | Physical Name | Data Type | Size | Nullable | Default | Constraints | Description |
|-----------|---------------|-----------|------|----------|---------|-------------|-------------|
| Invoice ID | id | UUID | 36 | No | gen_random_uuid() | PK | Unique invoice identifier |
| Invoice Number | invoice_number | VARCHAR | 30 | No | - | UK | Human-readable invoice number |
| Student ID | student_id | UUID | 36 | No | - | FK:academic.students.id | Billed student |
| Academic Year | academic_year_id | UUID | 36 | No | - | FK:academic.academic_years.id | Billing academic year |
| Invoice Date | invoice_date | DATE | - | No | CURRENT_DATE | - | Date invoice was issued |
| Due Date | due_date | DATE | - | No | - | C:>= invoice_date | Payment due date |
| Subtotal | subtotal | DECIMAL | 12,2 | No | 0.00 | C:>= 0 | Sum of line items before adjustments |
| Discount Amount | discount_amount | DECIMAL | 12,2 | No | 0.00 | C:>= 0 | Total discount applied |
| Tax Amount | tax_amount | DECIMAL | 12,2 | No | 0.00 | C:>= 0 | Tax amount (if applicable) |
| Total Amount | total_amount | DECIMAL | 12,2 | No | 0.00 | C:>= 0 | Final invoice total |
| Paid Amount | paid_amount | DECIMAL | 12,2 | No | 0.00 | C:>= 0 | Amount paid to date |
| Balance Due | balance_due | DECIMAL | 12,2 | No | 0.00 | - | Remaining balance (computed) |
| Currency | currency | CHAR | 3 | No | 'MYR' | - | Currency code |
| Invoice Status | status | invoice_status | - | No | 'draft' | - | Current invoice status |
| Notes | notes | TEXT | - | Yes | NULL | - | Invoice notes |
| Created By | created_by | UUID | 36 | No | - | FK:auth.users.id | Staff who created invoice |
| Sent At | sent_at | TIMESTAMPTZ | - | Yes | NULL | - | When invoice was sent |
| Created At | created_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Record creation timestamp |
| Updated At | updated_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Last modification timestamp |

#### 3.4.3 financial.payments Table

| Attribute | Physical Name | Data Type | Size | Nullable | Default | Constraints | Description |
|-----------|---------------|-----------|------|----------|---------|-------------|-------------|
| Payment ID | id | UUID | 36 | No | gen_random_uuid() | PK | Unique payment identifier |
| Payment Number | payment_number | VARCHAR | 30 | No | - | UK | Human-readable payment reference |
| Student ID | student_id | UUID | 36 | No | - | FK:academic.students.id | Paying student |
| Payment Date | payment_date | DATE | - | No | CURRENT_DATE | - | Date payment was received |
| Amount | amount | DECIMAL | 12,2 | No | - | C:> 0 | Payment amount |
| Currency | currency | CHAR | 3 | No | 'MYR' | - | Currency code |
| Payment Method | payment_method | payment_method | - | No | - | - | Method of payment |
| Reference Number | reference_number | VARCHAR | 100 | Yes | NULL | - | External payment reference |
| Payment Status | status | payment_status | - | No | 'pending' | - | Current payment status |
| Paid By | paid_by | VARCHAR | 255 | Yes | NULL | - | Name of person who paid |
| Receipt URL | receipt_url | TEXT | - | Yes | NULL | - | URL to payment receipt |
| Notes | notes | TEXT | - | Yes | NULL | - | Payment notes |
| Received By | received_by | UUID | 36 | No | - | FK:auth.users.id | Staff who received payment |
| Verified At | verified_at | TIMESTAMPTZ | - | Yes | NULL | - | Verification timestamp |
| Verified By | verified_by | UUID | 36 | Yes | NULL | FK:auth.users.id | Staff who verified |
| Created At | created_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Record creation timestamp |
| Updated At | updated_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Last modification timestamp |

### 3.5 Communication Domain Attributes

#### 3.5.1 communication.notifications Table

| Attribute | Physical Name | Data Type | Size | Nullable | Default | Constraints | Description |
|-----------|---------------|-----------|------|----------|---------|-------------|-------------|
| Notification ID | id | UUID | 36 | No | gen_random_uuid() | PK | Unique notification identifier |
| User ID | user_id | UUID | 36 | No | - | FK:auth.users.id, I | Recipient user |
| Notification Type | type | notification_type | - | No | - | - | Type of notification |
| Title | title | VARCHAR | 200 | No | - | - | Notification title |
| Message | message | TEXT | No | - | - | - | Notification content |
| Data | data | JSONB | - | Yes | NULL | - | Additional structured data |
| Priority | priority | notification_priority | - | No | 'normal' | - | Priority level |
| Is Read | is_read | BOOLEAN | - | No | FALSE | I | Read status |
| Read At | read_at | TIMESTAMPTZ | - | Yes | NULL | - | When notification was read |
| Expires At | expires_at | TIMESTAMPTZ | - | Yes | NULL | I | Notification expiration |
| Created At | created_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Record creation timestamp |

#### 3.5.2 communication.announcements Table

| Attribute | Physical Name | Data Type | Size | Nullable | Default | Constraints | Description |
|-----------|---------------|-----------|------|----------|---------|-------------|-------------|
| Announcement ID | id | UUID | 36 | No | gen_random_uuid() | PK | Unique announcement identifier |
| Title | title | VARCHAR | 200 | No | - | - | Announcement title |
| Content | content | TEXT | - | No | - | - | Announcement body |
| Author ID | author_id | UUID | 36 | No | - | FK:auth.users.id | Staff who created |
| Target Audience | target_audience | audience_type | - | No | 'all' | - | Who should see this |
| Target Roles | target_roles | UUID[] | - | Yes | NULL | - | Specific roles to target |
| Target Classes | target_classes | UUID[] | - | Yes | NULL | - | Specific classes to target |
| Priority | priority | announcement_priority | - | No | 'normal' | - | Priority level |
| Is Pinned | is_pinned | BOOLEAN | - | No | FALSE | - | Whether to pin at top |
| Publish At | publish_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | When to publish |
| Expires At | expires_at | TIMESTAMPTZ | - | Yes | NULL | - | When to hide |
| Attachment URLs | attachments | TEXT[] | - | Yes | NULL | - | Attached file URLs |
| Status | status | announcement_status | - | No | 'draft' | - | Publication status |
| Created At | created_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Record creation timestamp |
| Updated At | updated_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | - | Last modification timestamp |

### 3.6 Audit Domain Attributes

#### 3.6.1 audit.audit_log Table

| Attribute | Physical Name | Data Type | Size | Nullable | Default | Constraints | Description |
|-----------|---------------|-----------|------|----------|---------|-------------|-------------|
| Log ID | id | UUID | 36 | No | gen_random_uuid() | PK | Unique log entry identifier |
| Table Schema | table_schema | VARCHAR | 63 | No | - | I | Schema of affected table |
| Table Name | table_name | VARCHAR | 63 | No | - | I | Name of affected table |
| Record ID | record_id | UUID | 36 | No | - | I | ID of affected record |
| Operation | operation | audit_operation | - | No | - | I | Type of operation (INSERT/UPDATE/DELETE) |
| Old Values | old_values | JSONB | - | Yes | NULL | - | Previous values (UPDATE/DELETE) |
| New Values | new_values | JSONB | - | Yes | NULL | - | New values (INSERT/UPDATE) |
| Changed Fields | changed_fields | TEXT[] | - | Yes | NULL | - | List of changed column names |
| User ID | user_id | UUID | 36 | Yes | NULL | FK:auth.users.id, I | User who made change |
| IP Address | ip_address | INET | - | Yes | NULL | - | Client IP address |
| User Agent | user_agent | TEXT | - | Yes | NULL | - | Client browser/app info |
| Session ID | session_id | UUID | 36 | Yes | NULL | - | Session identifier |
| Created At | created_at | TIMESTAMPTZ | - | No | CURRENT_TIMESTAMP | I | When change occurred |

**Partitioning**: Range partition by created_at (monthly)

---

## 4. Data Types Reference

### 4.1 PostgreSQL Base Data Types

| Type | PostgreSQL Type | Description | Example Values |
|------|-----------------|-------------|----------------|
| **Identifiers** | | | |
| UUID | UUID | 128-bit universally unique identifier | '550e8400-e29b-41d4-a716-446655440000' |
| **Text Types** | | | |
| Short String | VARCHAR(n) | Variable-length string up to n chars | 'John Doe' |
| Long String | TEXT | Unlimited length text | 'Long description...' |
| Fixed String | CHAR(n) | Fixed-length string, padded with spaces | 'MYR' |
| **Numeric Types** | | | |
| Integer | INTEGER | 32-bit signed integer (-2.1B to 2.1B) | 42, -100 |
| Small Integer | SMALLINT | 16-bit signed integer (-32K to 32K) | 1, 255 |
| Big Integer | BIGINT | 64-bit signed integer | 9223372036854775807 |
| Decimal | DECIMAL(p,s) | Exact numeric with precision p, scale s | 1234.56 |
| **Boolean** | | | |
| Boolean | BOOLEAN | True/False value | TRUE, FALSE |
| **Date/Time Types** | | | |
| Date | DATE | Date without time | '2026-01-15' |
| Time | TIME | Time without date | '14:30:00' |
| Timestamp | TIMESTAMPTZ | Date and time with timezone | '2026-01-15T14:30:00+08:00' |
| Interval | INTERVAL | Time duration | '3 days', '2 hours' |
| **Binary Types** | | | |
| Binary | BYTEA | Variable-length binary string | '\x48656c6c6f' |
| **Network Types** | | | |
| IP Address | INET | IPv4 or IPv6 address | '192.168.1.1', '::1' |
| **JSON Types** | | | |
| JSON | JSONB | Binary JSON with indexing | '{"key": "value"}' |
| **Array Types** | | | |
| Text Array | TEXT[] | Array of text values | '{tag1,tag2,tag3}' |
| Integer Array | INTEGER[] | Array of integers | '{1,2,3,4,5}' |
| UUID Array | UUID[] | Array of UUIDs | '{uuid1,uuid2}' |

### 4.2 Custom Domain Types

| Domain Name | Base Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| email_address | VARCHAR(255) | Valid email format | Email address with validation |
| phone_number | VARCHAR(20) | Digits, +, -, spaces | Phone number format |
| percentage | DECIMAL(5,2) | 0.00 to 100.00 | Percentage value |
| positive_int | INTEGER | > 0 | Positive integer only |
| non_negative_decimal | DECIMAL(12,2) | >= 0 | Non-negative currency amount |

---

## 5. Enumeration Types

### 5.1 User & Authentication Enums

#### user_status
| Value | Display Name | Description |
|-------|--------------|-------------|
| pending | Pending | Account created but not activated |
| active | Active | Account is active and usable |
| inactive | Inactive | Account temporarily disabled |
| suspended | Suspended | Account suspended for policy violation |
| archived | Archived | Account archived (former user) |

#### auth_provider
| Value | Display Name | Description |
|-------|--------------|-------------|
| local | Local | Email/password authentication |
| google | Google | Google OAuth2 |
| microsoft | Microsoft | Microsoft/Azure AD OAuth2 |

### 5.2 Academic Enums

#### gender_type
| Value | Display Name | Description |
|-------|--------------|-------------|
| male | Male | Male gender |
| female | Female | Female gender |

#### blood_type
| Value | Display Name | Description |
|-------|--------------|-------------|
| A+ | A Positive | Blood type A+ |
| A- | A Negative | Blood type A- |
| B+ | B Positive | Blood type B+ |
| B- | B Negative | Blood type B- |
| AB+ | AB Positive | Blood type AB+ |
| AB- | AB Negative | Blood type AB- |
| O+ | O Positive | Blood type O+ |
| O- | O Negative | Blood type O- |

#### relationship_type
| Value | Display Name | Description |
|-------|--------------|-------------|
| father | Father | Biological or adoptive father |
| mother | Mother | Biological or adoptive mother |
| guardian | Legal Guardian | Legal guardian |
| grandfather | Grandfather | Paternal or maternal grandfather |
| grandmother | Grandmother | Paternal or maternal grandmother |
| uncle | Uncle | Uncle |
| aunt | Aunt | Aunt |
| sibling | Sibling | Brother or sister |
| other | Other | Other relationship |

#### student_status
| Value | Display Name | Description |
|-------|--------------|-------------|
| active | Active | Currently enrolled student |
| graduated | Graduated | Successfully completed program |
| withdrawn | Withdrawn | Voluntarily withdrawn |
| expelled | Expelled | Dismissed from school |
| transferred | Transferred | Transferred to another school |
| on_leave | On Leave | Temporary leave of absence |

#### enrollment_status
| Value | Display Name | Description |
|-------|--------------|-------------|
| active | Active | Currently enrolled in class |
| completed | Completed | Successfully completed |
| withdrawn | Withdrawn | Withdrawn from class |
| transferred | Transferred | Transferred to another class |

#### attendance_status
| Value | Display Name | Description |
|-------|--------------|-------------|
| present | Present | Student was present |
| absent | Absent | Student was absent (unexcused) |
| late | Late | Student arrived late |
| excused | Excused | Absent with valid excuse |
| sick | Sick | Absent due to illness |
| holiday | Holiday | School holiday |

#### employment_status
| Value | Display Name | Description |
|-------|--------------|-------------|
| active | Active | Currently employed |
| on_leave | On Leave | Temporary leave |
| resigned | Resigned | Voluntarily left |
| terminated | Terminated | Employment terminated |
| retired | Retired | Retired from service |

#### class_status
| Value | Display Name | Description |
|-------|--------------|-------------|
| active | Active | Class is currently active |
| inactive | Inactive | Class is not active |
| archived | Archived | Class archived (historical) |

### 5.3 Islamic Education Enums

#### quran_program_type
| Value | Display Name | Description |
|-------|--------------|-------------|
| hifz_full | Full Hifz | Complete Quran memorization (30 Juz) |
| hifz_partial | Partial Hifz | Partial memorization program |
| tilawah | Tilawah | Quran recitation program |
| tajweed | Tajweed | Tajweed (recitation rules) focus |
| tafsir | Tafsir | Quran interpretation study |

#### memorization_status
| Value | Display Name | Description |
|-------|--------------|-------------|
| not_started | Not Started | Memorization not yet begun |
| in_progress | In Progress | Currently memorizing |
| completed | Completed | Initial memorization complete |
| under_review | Under Review | In review/consolidation phase |
| certified | Certified | Formally certified/examined |

#### quality_rating
| Value | Display Name | Description |
|-------|--------------|-------------|
| excellent | Excellent | Outstanding quality (A) |
| very_good | Very Good | Above average quality (B+) |
| good | Good | Satisfactory quality (B) |
| satisfactory | Satisfactory | Acceptable quality (C) |
| needs_improvement | Needs Improvement | Below expectations (D) |
| poor | Poor | Unsatisfactory quality (F) |

#### tajweed_assessment_type
| Value | Display Name | Description |
|-------|--------------|-------------|
| initial | Initial Assessment | First assessment |
| progress | Progress Check | Regular progress assessment |
| quarterly | Quarterly Exam | Quarterly examination |
| semester | Semester Exam | Semester examination |
| final | Final Exam | Final certification exam |
| certification | Certification | Ijazah certification |

#### tajweed_grade
| Value | Display Name | Description |
|-------|--------------|-------------|
| mumtaz | Mumtaz | Excellent (90-100%) |
| jayyid_jiddan | Jayyid Jiddan | Very Good (80-89%) |
| jayyid | Jayyid | Good (70-79%) |
| maqbul | Maqbul | Acceptable (60-69%) |
| rasib | Rasib | Fail (below 60%) |

### 5.4 Financial Enums

#### fee_category
| Value | Display Name | Description |
|-------|--------------|-------------|
| tuition | Tuition | Regular tuition fees |
| registration | Registration | One-time registration fee |
| examination | Examination | Exam fees |
| transport | Transport | Transportation fees |
| meals | Meals | Meal plan fees |
| uniform | Uniform | Uniform costs |
| books | Books | Textbook fees |
| activities | Activities | Extracurricular activities |
| facilities | Facilities | Facility usage fees |
| other | Other | Other fees |

#### fee_frequency
| Value | Display Name | Description |
|-------|--------------|-------------|
| one_time | One-Time | Single payment |
| monthly | Monthly | Monthly recurring |
| quarterly | Quarterly | Every 3 months |
| semester | Semester | Per semester |
| annual | Annual | Once per year |

#### invoice_status
| Value | Display Name | Description |
|-------|--------------|-------------|
| draft | Draft | Invoice being prepared |
| sent | Sent | Invoice sent to parent/guardian |
| partially_paid | Partially Paid | Some payment received |
| paid | Paid | Fully paid |
| overdue | Overdue | Past due date |
| cancelled | Cancelled | Invoice cancelled |
| refunded | Refunded | Payment refunded |

#### payment_method
| Value | Display Name | Description |
|-------|--------------|-------------|
| cash | Cash | Cash payment |
| bank_transfer | Bank Transfer | Direct bank transfer |
| cheque | Cheque | Cheque payment |
| credit_card | Credit Card | Credit card payment |
| debit_card | Debit Card | Debit card payment |
| online | Online Payment | Online payment gateway |
| fpx | FPX | FPX online banking (Malaysia) |
| ewallet | E-Wallet | Digital wallet payment |

#### payment_status
| Value | Display Name | Description |
|-------|--------------|-------------|
| pending | Pending | Payment being processed |
| completed | Completed | Payment successful |
| failed | Failed | Payment failed |
| cancelled | Cancelled | Payment cancelled |
| refunded | Refunded | Payment refunded |

### 5.5 Communication Enums

#### notification_type
| Value | Display Name | Description |
|-------|--------------|-------------|
| info | Information | General information |
| alert | Alert | Important alert |
| reminder | Reminder | Reminder notification |
| announcement | Announcement | School announcement |
| academic | Academic | Academic-related notification |
| financial | Financial | Payment/fee notification |
| attendance | Attendance | Attendance notification |
| message | Message | New message received |

#### notification_priority
| Value | Display Name | Description |
|-------|--------------|-------------|
| low | Low | Low priority |
| normal | Normal | Normal priority |
| high | High | High priority |
| urgent | Urgent | Urgent - immediate attention |

#### audience_type
| Value | Display Name | Description |
|-------|--------------|-------------|
| all | All Users | Everyone in the system |
| students | Students | All students |
| parents | Parents | All parents/guardians |
| teachers | Teachers | All teachers |
| staff | Staff | All staff members |
| specific | Specific | Specific users/groups |

#### announcement_status
| Value | Display Name | Description |
|-------|--------------|-------------|
| draft | Draft | Not yet published |
| scheduled | Scheduled | Scheduled for future |
| published | Published | Currently visible |
| archived | Archived | No longer active |

### 5.6 Audit Enums

#### audit_operation
| Value | Display Name | Description |
|-------|--------------|-------------|
| INSERT | Insert | New record created |
| UPDATE | Update | Record modified |
| DELETE | Delete | Record deleted |

---

## 6. Business Rules

### 6.1 User Management Rules

#### BR-USR-001: Email Uniqueness
- **Rule**: Each user must have a unique email address across all accounts
- **Enforcement**: Database unique constraint on auth.users.email
- **Exception**: Deleted users (deleted_at IS NOT NULL) are excluded from uniqueness check

#### BR-USR-002: Password Requirements
- **Rule**: Passwords must meet complexity requirements
- **Requirements**:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character
- **Enforcement**: Application-level validation before hashing

#### BR-USR-003: Account Lockout
- **Rule**: Lock account after 5 consecutive failed login attempts
- **Duration**: 15 minutes
- **Enforcement**: Application logic + locked_until column
- **Reset**: Manual unlock by admin or automatic after duration

#### BR-USR-004: Session Expiration
- **Rule**: User sessions expire after 24 hours of inactivity
- **Enforcement**: expires_at column checked on each request
- **Refresh**: Active sessions are extended on activity

### 6.2 Student Enrollment Rules

#### BR-ENR-001: Single Active Enrollment
- **Rule**: A student can have only one active enrollment per academic year
- **Enforcement**: Unique constraint on (student_id, academic_year_id) where status = 'active'
- **Exception**: Transfer between classes within same year

#### BR-ENR-002: Enrollment Age Validation
- **Rule**: Student age must be appropriate for grade level at enrollment
- **Enforcement**: Application-level validation
- **Age Guidelines**:
  - Grade 1: 6-7 years
  - Grade 2: 7-8 years
  - ... (grade + 5 years typical)

#### BR-ENR-003: Class Capacity
- **Rule**: Enrollment cannot exceed class capacity
- **Enforcement**: Application-level check before enrollment
- **Override**: Admin can override with justification

#### BR-ENR-004: Enrollment Prerequisites
- **Rule**: Students must meet prerequisites for enrollment
- **Enforcement**: Application-level validation
- **Requirements**: Previous grade completion or assessment

### 6.3 Attendance Rules

#### BR-ATT-001: Daily Attendance
- **Rule**: Attendance must be recorded once per student per class per day
- **Enforcement**: Unique constraint on (student_id, class_id, attendance_date)
- **Exception**: Makeup classes may have additional records

#### BR-ATT-002: Future Attendance
- **Rule**: Attendance cannot be recorded for future dates
- **Enforcement**: Check constraint: attendance_date <= CURRENT_DATE

#### BR-ATT-003: Attendance Modification
- **Rule**: Attendance can only be modified within 7 days of the attendance date
- **Enforcement**: Application-level validation
- **Override**: Admin can override with justification (logged)

### 6.4 Islamic Education Rules

#### BR-ISL-001: Surah Sequence (Hifz)
- **Rule**: For full Hifz program, Surahs should typically be memorized in order (114 to 1) or as per teacher guidance
- **Enforcement**: Advisory (tracked but not enforced)
- **Traditional Order**: Short Surahs first (Juz 30), then proceed

#### BR-ISL-002: Memorization Prerequisites
- **Rule**: Cannot mark Surah as 'certified' unless all verses are memorized
- **Enforcement**: verses_memorized must equal total_verses
- **Additional**: Must have passed quality assessment

#### BR-ISL-003: Review Cycle
- **Rule**: Completed Surahs must be reviewed at least once every 30 days
- **Enforcement**: Advisory notification system
- **Tracking**: last_reviewed_at column

#### BR-ISL-004: Tajweed Certification
- **Rule**: Ijazah certification requires minimum 'jayyid_jiddan' grade
- **Enforcement**: Application-level validation
- **Requirements**: All assessment components above 80%

### 6.5 Financial Rules

#### BR-FIN-001: Invoice Balance Calculation
- **Rule**: balance_due = total_amount - paid_amount
- **Enforcement**: Database trigger on payment allocation
- **Integrity**: balance_due must never be negative

#### BR-FIN-002: Payment Allocation
- **Rule**: Payments must be allocated to invoice items
- **Enforcement**: Sum of allocations cannot exceed payment amount
- **Tracking**: payment_allocations table

#### BR-FIN-003: Invoice Status Transitions
- **Rule**: Invoice status follows defined transitions
- **Valid Transitions**:
  - draft → sent
  - sent → partially_paid → paid
  - sent → overdue
  - overdue → partially_paid → paid
  - any → cancelled (with reason)
- **Enforcement**: Application-level state machine

#### BR-FIN-004: Refund Limitations
- **Rule**: Refunds cannot exceed original payment amount
- **Enforcement**: Application-level validation
- **Audit**: All refunds logged with reason

#### BR-FIN-005: Scholarship Stacking
- **Rule**: Total scholarship amount cannot exceed fee amount
- **Enforcement**: Application-level validation
- **Calculation**: Check before awarding additional scholarships

#### BR-FIN-006: Fee Due Date
- **Rule**: Due date must be at least 7 days after invoice date
- **Enforcement**: Check constraint: due_date >= invoice_date + 7 days
- **Exception**: Manual override by finance manager

### 6.6 Communication Rules

#### BR-COM-001: Notification Expiration
- **Rule**: Notifications expire after 90 days
- **Enforcement**: expires_at default or cleanup job
- **Display**: Expired notifications not shown in UI

#### BR-COM-002: Announcement Targeting
- **Rule**: Announcements must have at least one target audience
- **Enforcement**: Application-level validation
- **Options**: All, specific roles, or specific classes

#### BR-COM-003: Message Retention
- **Rule**: Messages are retained for 1 year
- **Enforcement**: Scheduled cleanup job
- **Archive**: Messages archived before deletion

### 6.7 Audit Rules

#### BR-AUD-001: Immutability
- **Rule**: Audit log records cannot be modified or deleted
- **Enforcement**: No UPDATE/DELETE permissions on audit table
- **Exception**: Scheduled archival after retention period

#### BR-AUD-002: Sensitive Data Exclusion
- **Rule**: Password hashes and tokens are never logged in audit
- **Enforcement**: Trigger excludes sensitive columns
- **Columns Excluded**: password_hash, token_hash, refresh_token

#### BR-AUD-003: Retention Period
- **Rule**: Audit logs retained for 7 years
- **Enforcement**: Partition management
- **Compliance**: Meets regulatory requirements

---

## 7. Data Validation Rules

### 7.1 Format Validation Rules

#### VR-FMT-001: Email Format
```
Pattern: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
Example Valid: user@example.com, john.doe@school.edu.my
Example Invalid: user@, @example.com, user@.com
Applied To: auth.users.email, academic.guardians.email
```

#### VR-FMT-002: Phone Number Format
```
Pattern: ^\+?[0-9\s\-\(\)]{8,20}$
Example Valid: +60123456789, 03-1234 5678, (03) 1234-5678
Example Invalid: abc123, +60, 123
Applied To: auth.users.phone, academic.guardians.phone_primary
```

#### VR-FMT-003: Malaysian IC Number
```
Pattern: ^[0-9]{6}-[0-9]{2}-[0-9]{4}$
Example Valid: 900101-14-5678
Example Invalid: 9001011456781, 900101145678
Applied To: academic.students.national_id (for Malaysian students)
```

#### VR-FMT-004: Student Number Format
```
Pattern: ^STU[0-9]{4}[A-Z]{2}[0-9]{4}$
Example Valid: STU2026AB0001
Example Invalid: 20260001, STU-2026-0001
Applied To: academic.students.student_number
```

#### VR-FMT-005: Invoice Number Format
```
Pattern: ^INV-[0-9]{4}-[0-9]{6}$
Example Valid: INV-2026-000001
Example Invalid: INV20260001, 2026-000001
Applied To: financial.invoices.invoice_number
```

### 7.2 Range Validation Rules

#### VR-RNG-001: Percentage Range
```
Rule: Value must be between 0.00 and 100.00
Applied To:
  - islamic.hafiz_progress.quality_score
  - islamic.murajaah_sessions.tajweed_score
  - islamic.murajaah_sessions.fluency_score
  - islamic.tajweed_assessments.* (all score columns)
```

#### VR-RNG-002: Surah Number Range
```
Rule: Value must be between 1 and 114
Applied To:
  - islamic.hafiz_progress.surah_number
  - islamic.murajaah_sessions.surah_start
  - islamic.murajaah_sessions.surah_end
  - islamic.tajweed_assessments.surah_number
```

#### VR-RNG-003: Juz Number Range
```
Rule: Value must be between 1 and 30
Applied To:
  - islamic.hafiz_progress.juz_number
  - islamic.quran_programs.target_juz[]
```

#### VR-RNG-004: Grade Level Range
```
Rule: Value must be between 1 and 12
Applied To:
  - academic.classes.grade_level
  - financial.fee_structures.grade_levels[]
```

#### VR-RNG-005: Non-Negative Amount
```
Rule: Value must be >= 0
Applied To:
  - financial.invoices.subtotal
  - financial.invoices.discount_amount
  - financial.invoices.tax_amount
  - financial.invoices.total_amount
  - financial.invoices.paid_amount
  - financial.fee_structures.amount
```

#### VR-RNG-006: Positive Amount
```
Rule: Value must be > 0
Applied To:
  - financial.payments.amount
  - academic.classes.capacity
```

### 7.3 Date Validation Rules

#### VR-DTE-001: Birth Date
```
Rule: Date must be in the past and within reasonable range (5-100 years ago)
Applied To: academic.students.date_of_birth
Validation: date_of_birth < CURRENT_DATE AND date_of_birth > CURRENT_DATE - INTERVAL '100 years'
```

#### VR-DTE-002: Academic Year Range
```
Rule: End date must be after start date
Applied To: academic.academic_years (start_date, end_date)
Validation: end_date > start_date
```

#### VR-DTE-003: Enrollment Date
```
Rule: Enrollment date cannot be in the future
Applied To: academic.enrollments.enrollment_date
Validation: enrollment_date <= CURRENT_DATE
```

#### VR-DTE-004: Invoice Due Date
```
Rule: Due date must be on or after invoice date
Applied To: financial.invoices (invoice_date, due_date)
Validation: due_date >= invoice_date
```

#### VR-DTE-005: Session Expiration
```
Rule: Expiration time must be in the future at creation
Applied To: auth.sessions.expires_at
Validation: expires_at > CURRENT_TIMESTAMP (at creation time)
```

### 7.4 Referential Validation Rules

#### VR-REF-001: Active User Reference
```
Rule: Foreign key references to users should point to active users
Enforcement: Application-level check (allow reference to inactive for history)
Applied To: All FK references to auth.users
```

#### VR-REF-002: Same Academic Year
```
Rule: Related records should belong to same academic year
Applied To:
  - Enrollment class and student must be in same academic year
  - Invoice academic year must match student's active enrollment
```

#### VR-REF-003: Enrollment-Progress Consistency
```
Rule: Progress records must reference valid enrollment
Applied To:
  - islamic.hafiz_progress.enrollment_id
  - islamic.murajaah_sessions.enrollment_id
  - islamic.tajweed_assessments.enrollment_id
```

### 7.5 Conditional Validation Rules

#### VR-CND-001: Withdrawal Reason Required
```
Rule: If enrollment status is 'withdrawn', withdrawal_reason must be provided
Applied To: academic.enrollments
Validation: IF status = 'withdrawn' THEN withdrawal_reason IS NOT NULL
```

#### VR-CND-002: Completion Date Required
```
Rule: If memorization status is 'completed' or 'certified', completion_date must be set
Applied To: islamic.hafiz_progress
Validation: IF status IN ('completed', 'certified') THEN completion_date IS NOT NULL
```

#### VR-CND-003: Verification Fields
```
Rule: If payment status is 'completed', verified_at and verified_by must be set
Applied To: financial.payments
Validation: IF status = 'completed' THEN verified_at IS NOT NULL AND verified_by IS NOT NULL
```

#### VR-CND-004: Quran Teacher Certification
```
Rule: If teacher is_quran_teacher is TRUE, ijazah_details must be provided
Applied To: academic.teachers
Validation: IF is_quran_teacher = TRUE THEN ijazah_details IS NOT NULL
```

### 7.6 Cross-Field Validation Rules

#### VR-CRS-001: Surah Range Validity
```
Rule: surah_start/ayah_start must come before surah_end/ayah_end
Applied To: islamic.murajaah_sessions
Validation:
  (surah_start < surah_end) OR
  (surah_start = surah_end AND ayah_start <= ayah_end)
```

#### VR-CRS-002: Verses Count Consistency
```
Rule: verses_memorized cannot exceed total_verses
Applied To: islamic.hafiz_progress
Validation: verses_memorized <= total_verses
```

#### VR-CRS-003: Invoice Amount Consistency
```
Rule: total_amount = subtotal - discount_amount + tax_amount
Applied To: financial.invoices
Enforcement: Application-level calculation
```

#### VR-CRS-004: Balance Consistency
```
Rule: balance_due = total_amount - paid_amount
Applied To: financial.invoices
Enforcement: Database trigger
```

---

## 8. Data Relationships

### 8.1 Relationship Matrix

| Parent Entity | Child Entity | Relationship | Cardinality | On Delete |
|--------------|--------------|--------------|-------------|-----------|
| auth.users | auth.user_roles | has | 1:M | CASCADE |
| auth.roles | auth.user_roles | assigned_to | 1:M | CASCADE |
| auth.roles | auth.role_permissions | has | 1:M | CASCADE |
| auth.permissions | auth.role_permissions | granted_by | 1:M | CASCADE |
| auth.users | auth.sessions | has | 1:M | CASCADE |
| auth.users | auth.refresh_tokens | has | 1:M | CASCADE |
| auth.users | academic.students | is_a | 1:1 | RESTRICT |
| auth.users | academic.teachers | is_a | 1:1 | RESTRICT |
| auth.users | academic.guardians | is_a | 1:1 | SET NULL |
| academic.students | academic.guardians | has | M:M | - |
| academic.students | academic.enrollments | has | 1:M | RESTRICT |
| academic.classes | academic.enrollments | contains | 1:M | RESTRICT |
| academic.teachers | academic.classes | teaches | 1:M | SET NULL |
| academic.academic_years | academic.classes | belongs_to | 1:M | RESTRICT |
| academic.academic_years | academic.enrollments | belongs_to | 1:M | RESTRICT |
| academic.enrollments | academic.attendance | tracks | 1:M | CASCADE |
| islamic.quran_programs | islamic.quran_enrollments | offers | 1:M | RESTRICT |
| academic.students | islamic.quran_enrollments | enrolls | 1:M | RESTRICT |
| islamic.quran_enrollments | islamic.hafiz_progress | tracks | 1:M | CASCADE |
| islamic.quran_enrollments | islamic.murajaah_sessions | records | 1:M | CASCADE |
| islamic.quran_enrollments | islamic.tajweed_assessments | evaluates | 1:M | CASCADE |
| academic.students | financial.invoices | billed_to | 1:M | RESTRICT |
| financial.invoices | financial.invoice_items | contains | 1:M | CASCADE |
| financial.fee_structures | financial.invoice_items | based_on | 1:M | RESTRICT |
| academic.students | financial.payments | pays | 1:M | RESTRICT |
| financial.payments | financial.payment_allocations | allocated_by | 1:M | CASCADE |
| financial.invoice_items | financial.payment_allocations | paid_by | 1:M | CASCADE |
| financial.scholarships | financial.student_scholarships | awards | 1:M | RESTRICT |
| academic.students | financial.student_scholarships | receives | 1:M | CASCADE |
| auth.users | communication.notifications | receives | 1:M | CASCADE |
| auth.users | communication.messages | sends/receives | 1:M | SET NULL |
| auth.users | communication.announcements | creates | 1:M | RESTRICT |
| auth.users | content.pages | manages | 1:M | SET NULL |
| auth.users | content.media | uploads | 1:M | SET NULL |
| auth.users | audit.audit_log | performs | 1:M | SET NULL |

### 8.2 Entity Relationship Diagram Reference

For visual representation of these relationships, refer to:
- [DB_Entity_Relationship_Diagram_v1.0.md](./DB_Entity_Relationship_Diagram_v1.0.md)

---

## 9. Glossary

### 9.1 Domain Terms

| Term | Definition |
|------|------------|
| **Academic Year** | A period of academic instruction, typically running from one calendar year to the next (e.g., 2026-2027) |
| **Enrollment** | The formal registration of a student in a class for a specific academic year |
| **Guardian** | A parent or legal guardian responsible for a student |
| **Hifz** | The memorization of the entire Quran (all 30 Juz/114 Surahs) |
| **Ijazah** | A certificate authorizing its holder to transmit Quranic recitation |
| **Invoice** | A billing document itemizing fees owed by a student/guardian |
| **Juz** | One of 30 equal parts of the Quran (plural: Ajzaa) |
| **Makharij** | Articulation points for Arabic letters in Quranic recitation |
| **Murajaah** | Review and revision of previously memorized Quran portions |
| **Surah** | A chapter of the Quran (114 total) |
| **Tajweed** | The set of rules for proper Quranic recitation |
| **Tilawah** | The recitation of the Quran |

### 9.2 Technical Terms

| Term | Definition |
|------|------------|
| **Argon2id** | A memory-hard password hashing algorithm, winner of the Password Hashing Competition |
| **Cascade Delete** | When a parent record is deleted, all related child records are automatically deleted |
| **Check Constraint** | A database rule that limits values in a column |
| **ENUM** | A data type consisting of a set of named constant values |
| **Foreign Key (FK)** | A column that references the primary key of another table |
| **GIN Index** | Generalized Inverted Index, used for indexing JSONB and array data |
| **JSONB** | Binary JSON storage format in PostgreSQL with indexing support |
| **Partition** | Division of a large table into smaller, manageable pieces |
| **Primary Key (PK)** | A unique identifier for each record in a table |
| **Soft Delete** | Marking a record as deleted without physically removing it |
| **Timestamptz** | Timestamp with timezone, stores date/time in UTC |
| **Trigger** | A database function automatically executed in response to data changes |
| **Unique Constraint** | Ensures all values in a column are distinct |
| **UUID** | Universally Unique Identifier, a 128-bit identifier |

### 9.3 Abbreviations

| Abbreviation | Full Form |
|--------------|-----------|
| API | Application Programming Interface |
| CRUD | Create, Read, Update, Delete |
| FK | Foreign Key |
| GIN | Generalized Inverted Index |
| ISO | International Organization for Standardization |
| JSONB | Binary JSON |
| LMS | Learning Management System |
| MYR | Malaysian Ringgit (currency) |
| ORM | Object-Relational Mapping |
| PII | Personally Identifiable Information |
| PK | Primary Key |
| RBAC | Role-Based Access Control |
| SMS | School Management System |
| UK | Unique Key |
| UTC | Coordinated Universal Time |
| UUID | Universally Unique Identifier |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | January 2026 | Development Team | Initial document creation |

---

## Appendices

### Appendix A: Surah Reference Table

| Surah # | Name (Arabic) | Name (English) | Total Verses | Juz |
|---------|---------------|----------------|--------------|-----|
| 1 | Al-Fatiha | The Opening | 7 | 1 |
| 2 | Al-Baqarah | The Cow | 286 | 1-3 |
| 3 | Ali 'Imran | Family of Imran | 200 | 3-4 |
| ... | ... | ... | ... | ... |
| 112 | Al-Ikhlas | Sincerity | 4 | 30 |
| 113 | Al-Falaq | The Daybreak | 5 | 30 |
| 114 | An-Nas | Mankind | 6 | 30 |

*Note: Complete reference table available in Islamic Studies module documentation*

### Appendix B: Currency Codes (ISO 4217)

| Code | Currency | Country |
|------|----------|---------|
| MYR | Malaysian Ringgit | Malaysia |
| USD | US Dollar | United States |
| SGD | Singapore Dollar | Singapore |
| GBP | British Pound | United Kingdom |
| AED | UAE Dirham | UAE |
| SAR | Saudi Riyal | Saudi Arabia |

### Appendix C: Related Documents

- [DB_Database_Design_v1.0.md](./DB_Database_Design_v1.0.md) - Database design decisions and architecture
- [DB_Entity_Relationship_Diagram_v1.0.md](./DB_Entity_Relationship_Diagram_v1.0.md) - Visual entity relationship diagrams
- [DB_Schema_Documentation_v1.0.md](./DB_Schema_Documentation_v1.0.md) - Technical schema specifications
- [DB_Data_Migration_Plan_v1.0.md](./DB_Data_Migration_Plan_v1.0.md) - Data migration procedures

---

*End of Document*
