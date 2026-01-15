# Smart Academy - Database Design Document

**Document ID:** DB_Database_Design_v1.0
**Version:** 1.0
**Last Updated:** 2026-01-10
**Status:** Draft
**Author:** Development Team

---

## Table of Contents

1. [Document Overview](#1-document-overview)
2. [Database Selection Justification](#2-database-selection-justification)
3. [Naming Conventions](#3-naming-conventions)
4. [Data Types Standards](#4-data-types-standards)
5. [Indexing Strategy](#5-indexing-strategy)
6. [Partitioning Strategy](#6-partitioning-strategy)
7. [Performance Considerations](#7-performance-considerations)
8. [High Availability and Backup](#8-high-availability-and-backup)
9. [Security Considerations](#9-security-considerations)

---

## 1. Document Overview

### 1.1 Purpose

This document defines the comprehensive database design strategy for the Smart Academy Digital Portal. It establishes standards for database selection, naming conventions, data types, indexing strategies, and performance optimization to ensure a scalable, maintainable, and high-performance database architecture.

### 1.2 Scope

This specification covers:
- PostgreSQL 17+ for custom modules (Islamic Education, Analytics, Payments)
- MySQL 8.0+ for Gibbon SMS and Moodle LMS
- Redis 7+ for caching, sessions, and queues
- Database design patterns and best practices for 2025-2026

### 1.3 Reference Documents

| Document | Version | Description |
|----------|---------|-------------|
| Smart Academy SRS | 1.0 | Software Requirements Specification |
| TECH_Backend_Specification | 1.0 | Backend Technical Specification |
| ARCH_System_Architecture | 1.0 | System Architecture Document |
| REQ_Functional_Requirements | 1.0 | Functional Requirements |
| REQ_Non_Functional_Requirements | 1.0 | Non-Functional Requirements |

### 1.4 Target Audience

- Solo Full-Stack Developer
- Database Administrators
- System Architects
- QA Engineers

---

## 2. Database Selection Justification

### 2.1 Multi-Database Architecture Overview

Smart Academy employs a polyglot persistence strategy, using different database technologies optimized for specific use cases:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SMART ACADEMY DATABASE ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────┐ │
│   │  PostgreSQL 17  │  │    MySQL 8.0    │  │         Redis 7+            │ │
│   │                 │  │                 │  │                             │ │
│   │ Custom Modules: │  │ Platform Data:  │  │ Ephemeral Data:             │ │
│   │ • Islamic Ed    │  │ • Gibbon SMS    │  │ • Session Storage           │ │
│   │ • Payments      │  │ • Moodle LMS    │  │ • API Cache                 │ │
│   │ • Analytics     │  │ • User Auth     │  │ • Job Queues (BullMQ)       │ │
│   │ • CMS Content   │  │ • Enrollments   │  │ • Rate Limiting             │ │
│   │ • Notifications │  │ • Grades        │  │ • Real-time Notifications   │ │
│   │                 │  │ • Attendance    │  │ • Pub/Sub Messaging         │ │
│   └─────────────────┘  └─────────────────┘  └─────────────────────────────┘ │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 PostgreSQL 17+ Selection Justification

#### 2.2.1 Why PostgreSQL for Custom Modules

| Criterion | PostgreSQL 17 Capability | Project Benefit |
|-----------|--------------------------|-----------------|
| **Data Integrity** | ACID compliance, strong constraints | Critical for payment transactions and student records |
| **JSON Support** | Native JSONB with indexing | Flexible schema for Islamic education tracking |
| **Full-Text Search** | Built-in tsvector/tsquery | Efficient content search across Bengali/Arabic/English |
| **Performance** | Incremental VACUUM, parallel queries | Sub-2-second API response requirement |
| **Advanced Types** | UUID, Array, Range, Enum | Complex data modeling for analytics |
| **Extensions** | PostGIS, pg_trgm, uuid-ossp | Future geolocation and fuzzy search |
| **Prisma ORM Support** | First-class support | Type-safe queries, migrations |

#### 2.2.2 PostgreSQL 17 Performance Improvements

Based on 2025-2026 benchmarks, PostgreSQL 17 offers:

- **Incremental VACUUM**: 94% reduction in query times for large tables
- **Bi-directional Indexes**: Improved range query performance
- **Parallel Execution**: Better utilization of multi-core CPUs
- **Query Optimizer**: Better CTE plans and partition pruning

#### 2.2.3 PostgreSQL Configuration Recommendations

```ini
# postgresql.conf optimizations for Smart Academy

# Memory Settings (for 16GB RAM server)
shared_buffers = 4GB                    # 25% of RAM
effective_cache_size = 12GB             # 75% of RAM
work_mem = 64MB                         # Per-operation memory
maintenance_work_mem = 1GB              # For VACUUM, CREATE INDEX

# Connection Settings
max_connections = 200                    # Supports 2000 concurrent users via pooling
superuser_reserved_connections = 3

# WAL Settings
wal_buffers = 64MB
checkpoint_completion_target = 0.9
max_wal_size = 4GB
min_wal_size = 1GB

# Query Planner
random_page_cost = 1.1                  # SSD storage
effective_io_concurrency = 200          # SSD storage
default_statistics_target = 100

# Parallel Query
max_parallel_workers_per_gather = 4
max_parallel_workers = 8
parallel_leader_participation = on

# Logging
log_min_duration_statement = 1000       # Log queries > 1 second
log_checkpoints = on
log_lock_waits = on
```

### 2.3 MySQL 8.0+ Selection Justification

#### 2.3.1 Why MySQL for Gibbon and Moodle

| Criterion | MySQL 8.0 Capability | Project Benefit |
|-----------|----------------------|-----------------|
| **Platform Requirement** | Gibbon/Moodle native support | Required by open-source platforms |
| **Mature Ecosystem** | 25+ years of development | Stable, well-documented |
| **Replication** | Built-in master-slave | High availability for critical data |
| **Character Sets** | Full UTF8MB4 support | Bengali Unicode support |
| **JSON Functions** | Native JSON data type | Flexible configuration storage |
| **Window Functions** | SQL:2003 compliance | Complex reporting queries |

#### 2.3.2 MySQL Configuration Recommendations

```ini
# my.cnf optimizations for Smart Academy

[mysqld]
# InnoDB Settings
innodb_buffer_pool_size = 4G            # 25-50% of RAM
innodb_log_file_size = 512M
innodb_flush_log_at_trx_commit = 1      # ACID compliance
innodb_flush_method = O_DIRECT

# Connection Settings
max_connections = 200
thread_cache_size = 50
table_open_cache = 4000

# Character Set (Bengali/Arabic support)
character_set_server = utf8mb4
collation_server = utf8mb4_unicode_ci

# Query Cache (disabled in MySQL 8.0+, use Redis instead)
# query_cache_type = 0

# Binary Logging (for replication)
log_bin = mysql-bin
binlog_format = ROW
expire_logs_days = 7

# Performance Schema
performance_schema = ON

# Slow Query Log
slow_query_log = ON
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2
```

### 2.4 Redis 7+ Selection Justification

#### 2.4.1 Why Redis for Caching and Sessions

| Criterion | Redis 7 Capability | Project Benefit |
|-----------|-------------------|-----------------|
| **Speed** | In-memory, O(1) operations | Sub-millisecond response times |
| **Data Structures** | Strings, Hashes, Lists, Sets, Sorted Sets | Versatile caching patterns |
| **Persistence** | RDB snapshots, AOF logging | Data durability options |
| **Pub/Sub** | Built-in messaging | Real-time notifications |
| **Lua Scripting** | Atomic operations | Complex cache invalidation |
| **Cluster Mode** | Horizontal scaling | Future scalability |

#### 2.4.2 Redis Database Allocation

```plaintext
Redis Database Allocation for Smart Academy:

DB 0:  Default / General Cache
DB 1:  API Response Cache (TTL: 5-60 minutes)
DB 2:  User Sessions (TTL: 24 hours)
DB 3:  BullMQ Job Queues
DB 4:  Rate Limiting Counters
DB 5:  Real-time Notification Queue
DB 6:  Prayer Times Cache (TTL: 24 hours)
DB 7:  Feature Flags Cache
DB 8:  Reserved for future use
DB 9-15: Reserved for development/testing
```

#### 2.4.3 Redis Configuration

```conf
# redis.conf for Smart Academy

# Memory
maxmemory 2gb
maxmemory-policy allkeys-lru

# Persistence
save 900 1                              # Save if 1 key changed in 15 min
save 300 10                             # Save if 10 keys changed in 5 min
save 60 10000                           # Save if 10000 keys changed in 1 min

appendonly yes
appendfsync everysec

# Security
requirepass <strong-password>
rename-command FLUSHDB ""
rename-command FLUSHALL ""
rename-command CONFIG ""

# Network
bind 127.0.0.1
port 6379
timeout 300
tcp-keepalive 300

# Clients
maxclients 10000
```

### 2.5 Database Comparison Summary

| Feature | PostgreSQL 17 | MySQL 8.0 | Redis 7 |
|---------|---------------|-----------|---------|
| **Primary Use** | Custom modules | Gibbon/Moodle | Caching |
| **Data Model** | Relational | Relational | Key-Value |
| **ACID Compliance** | Full | Full | Partial |
| **Scalability** | Vertical + Read replicas | Vertical + Replication | Horizontal (Cluster) |
| **Query Language** | SQL | SQL | Commands |
| **ORM** | Prisma 6.x | Native PHP | ioredis |
| **Backup** | pg_dump, pg_basebackup | mysqldump, xtrabackup | RDB, AOF |
| **Estimated Records** | 1-5 million | 10-50 million | N/A (ephemeral) |

---

## 3. Naming Conventions

### 3.1 General Principles

1. **Consistency**: Use the same naming pattern throughout all databases
2. **Clarity**: Names should be self-documenting
3. **Case**: Use lowercase with underscores (snake_case)
4. **Language**: Use English for all identifiers
5. **Abbreviations**: Avoid unless universally understood

### 3.2 Database Naming

```plaintext
Pattern: [project]_[environment]_[purpose]

Examples:
- smart_academy_prod_custom      # Production PostgreSQL
- smart_academy_dev_custom       # Development PostgreSQL
- smart_academy_prod_gibbon      # Production Gibbon MySQL
- smart_academy_prod_moodle      # Production Moodle MySQL
- smart_academy_test_custom      # Test PostgreSQL
```

### 3.3 Schema Naming (PostgreSQL)

```plaintext
Pattern: [domain]

Schemas for Smart Academy PostgreSQL:
- public                         # Default schema
- auth                           # Authentication and authorization
- academic                       # Academic records (custom)
- islamic                        # Islamic education module
- financial                      # Payments and fees
- communication                  # Notifications, messages
- content                        # CMS content
- analytics                      # Reports and dashboards
- audit                          # Audit logs
```

### 3.4 Table Naming

#### 3.4.1 Standard Tables

```plaintext
Pattern: [singular_noun]

Examples:
- user                           # Not "users"
- student
- teacher
- parent
- course
- class_section                  # Use underscore for multi-word
- quran_progress
- fee_invoice
- payment_transaction
```

#### 3.4.2 Junction/Bridge Tables

```plaintext
Pattern: [table1]_[table2]

Examples:
- student_class                  # Student-to-Class relationship
- teacher_subject                # Teacher-to-Subject relationship
- course_enrollment              # Course enrollment records
- user_role                      # User-to-Role mapping
```

#### 3.4.3 Gibbon Table Naming (Existing Convention)

Gibbon uses CamelCase prefixed with "gibbon". Maintain this convention for compatibility:

```plaintext
Gibbon Tables:
- gibbonPerson
- gibbonStudent
- gibbonStaff
- gibbonCourse
- gibbonCourseClass
- gibbonAttendanceLogPerson
- gibbonMarkbookEntry
```

#### 3.4.4 Moodle Table Naming (Existing Convention)

Moodle uses lowercase with "mdl_" prefix. Maintain this convention:

```plaintext
Moodle Tables:
- mdl_user
- mdl_course
- mdl_course_modules
- mdl_quiz
- mdl_assign
- mdl_grade_grades
```

### 3.5 Column Naming

#### 3.5.1 Primary Keys

```plaintext
Pattern: id (for PostgreSQL custom tables)
         [tablename]ID (for Gibbon compatibility)
         id (for Moodle compatibility)

Examples:
PostgreSQL:
- id                             # UUID or BIGINT

Gibbon:
- gibbonPersonID
- gibbonStudentID
- gibbonCourseID

Moodle:
- id                             # AUTO_INCREMENT
```

#### 3.5.2 Foreign Keys

```plaintext
Pattern: [referenced_table]_id

Examples:
- student_id                     # References student.id
- teacher_id                     # References teacher.id
- course_id                      # References course.id
- gibbon_person_id               # References gibbonPerson.gibbonPersonID
- moodle_user_id                 # References mdl_user.id
```

#### 3.5.3 Common Column Names

```plaintext
Timestamps:
- created_at                     # Record creation timestamp
- updated_at                     # Last update timestamp
- deleted_at                     # Soft delete timestamp (nullable)

Status:
- status                         # General status field
- is_active                      # Boolean active flag
- is_deleted                     # Soft delete flag

Audit:
- created_by                     # User who created record
- updated_by                     # User who last updated
- deleted_by                     # User who deleted

Ordering:
- sort_order                     # Display order
- sequence_number                # Sequence within group

Metadata:
- metadata                       # JSONB for flexible attributes
- settings                       # JSONB for configuration
- notes                          # Text notes field
```

#### 3.5.4 Boolean Columns

```plaintext
Pattern: is_[adjective] or has_[noun]

Examples:
- is_active
- is_verified
- is_published
- has_paid
- has_scholarship
- can_login
```

#### 3.5.5 Date/Time Columns

```plaintext
Pattern: [event]_at (for timestamps)
         [event]_date (for dates only)

Examples:
- enrolled_at
- graduated_at
- last_login_at
- birth_date
- enrollment_date
- graduation_date
```

### 3.6 Index Naming

```plaintext
Pattern: idx_[table]_[column(s)]

Examples:
- idx_student_email
- idx_student_class_id
- idx_quran_progress_student_surah
- idx_payment_status_created
```

### 3.7 Constraint Naming

```plaintext
Primary Key:    pk_[table]
Foreign Key:    fk_[table]_[referenced_table]_[column]
Unique:         unq_[table]_[column(s)]
Check:          chk_[table]_[description]
Default:        df_[table]_[column]

Examples:
- pk_student
- fk_quran_progress_student_student_id
- unq_user_email
- chk_student_age_positive
- df_student_is_active
```

### 3.8 View Naming

```plaintext
Pattern: vw_[purpose]

Examples:
- vw_student_dashboard
- vw_teacher_classes
- vw_fee_summary
- vw_attendance_report
- vw_quran_progress_summary
```

### 3.9 Stored Procedure/Function Naming

```plaintext
Pattern: fn_[action]_[entity] (functions)
         sp_[action]_[entity] (procedures)

Examples:
- fn_calculate_fee_balance
- fn_get_prayer_times
- sp_process_payment
- sp_generate_report_card
```

### 3.10 Trigger Naming

```plaintext
Pattern: trg_[table]_[timing]_[event]

Examples:
- trg_student_before_insert
- trg_payment_after_update
- trg_quran_progress_after_insert
```

---

## 4. Data Types Standards

### 4.1 PostgreSQL Data Types

#### 4.1.1 Primary Keys

```sql
-- Preferred: UUID for distributed systems and security
id UUID PRIMARY KEY DEFAULT gen_random_uuid()

-- Alternative: BIGINT for simpler sequential IDs
id BIGSERIAL PRIMARY KEY

-- For Gibbon integration references
gibbon_person_id INTEGER NOT NULL
```

#### 4.1.2 String Types

| Use Case | Data Type | Notes |
|----------|-----------|-------|
| Short text (< 255) | VARCHAR(n) | Specify exact length |
| Medium text (255-65535) | TEXT | No length limit in PostgreSQL |
| Long text | TEXT | Unlimited in PostgreSQL |
| Fixed-length codes | CHAR(n) | ISO codes, status codes |
| Bengali/Arabic text | TEXT | UTF-8 supported natively |

```sql
-- Examples
username VARCHAR(50) NOT NULL
email VARCHAR(255) NOT NULL
name_bengali TEXT                        -- Bengali names can be long
bio TEXT
country_code CHAR(2)
phone VARCHAR(20)
```

#### 4.1.3 Numeric Types

| Use Case | Data Type | Notes |
|----------|-----------|-------|
| Integer IDs | INTEGER or BIGINT | Use BIGINT for large tables |
| Small integers | SMALLINT | Surah numbers (1-114) |
| Currency | DECIMAL(12,2) | Exact decimal for money |
| Percentage | DECIMAL(5,2) | Scores, progress |
| Floating point | DOUBLE PRECISION | Scientific calculations |
| Boolean | BOOLEAN | TRUE/FALSE/NULL |

```sql
-- Examples
amount DECIMAL(12, 2) NOT NULL           -- Currency in BDT
score DECIMAL(5, 2)                      -- 0.00 to 100.00
surah_number SMALLINT CHECK (surah_number BETWEEN 1 AND 114)
verse_count INTEGER
is_active BOOLEAN DEFAULT TRUE
```

#### 4.1.4 Date/Time Types

| Use Case | Data Type | Notes |
|----------|-----------|-------|
| Timestamps | TIMESTAMPTZ | Always use timezone-aware |
| Dates only | DATE | Birth dates, enrollment dates |
| Times only | TIME | Prayer times, class schedules |
| Intervals | INTERVAL | Duration calculations |

```sql
-- Examples
created_at TIMESTAMPTZ DEFAULT NOW()
birth_date DATE NOT NULL
prayer_fajr_time TIME
class_duration INTERVAL DEFAULT '45 minutes'
```

#### 4.1.5 JSON Types

```sql
-- JSONB for indexable JSON (preferred)
metadata JSONB DEFAULT '{}'::jsonb
settings JSONB
gateway_response JSONB

-- Indexing JSONB
CREATE INDEX idx_student_metadata ON student USING GIN (metadata);
```

#### 4.1.6 Enum Types

```sql
-- Define enum types for constrained values
CREATE TYPE memorization_status AS ENUM (
    'not_started',
    'in_progress',
    'memorized',
    'mastered'
);

CREATE TYPE payment_status AS ENUM (
    'pending',
    'processing',
    'completed',
    'failed',
    'refunded',
    'cancelled'
);

CREATE TYPE payment_gateway AS ENUM (
    'bkash',
    'nagad',
    'sslcommerz',
    'bank_transfer',
    'cash'
);

CREATE TYPE user_role AS ENUM (
    'admin',
    'principal',
    'teacher',
    'parent',
    'student',
    'staff',
    'accountant'
);

CREATE TYPE tajweed_level AS ENUM (
    'beginner',
    'elementary',
    'intermediate',
    'advanced',
    'expert'
);
```

#### 4.1.7 Array Types

```sql
-- Use arrays for multi-value attributes
phone_numbers VARCHAR(20)[]
tags TEXT[]
permissions TEXT[]

-- Example usage
INSERT INTO teacher (name, phone_numbers)
VALUES ('Ahmad', ARRAY['+8801712345678', '+8801812345678']);
```

### 4.2 MySQL Data Types

#### 4.2.1 String Types

| Use Case | Data Type | Notes |
|----------|-----------|-------|
| Short text | VARCHAR(n) | Max 65,535 bytes |
| Medium text | TEXT | Up to 65,535 characters |
| Long text | MEDIUMTEXT | Up to 16MB |
| Very long text | LONGTEXT | Up to 4GB |
| Fixed-length | CHAR(n) | Faster for fixed data |

#### 4.2.2 Character Set for Bengali

```sql
-- Table-level character set
CREATE TABLE student (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name_bengali VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.2.3 Numeric Types

| Use Case | Data Type | Notes |
|----------|-----------|-------|
| Auto-increment IDs | INT UNSIGNED AUTO_INCREMENT | Gibbon standard |
| Currency | DECIMAL(12,2) | Exact decimal |
| Boolean | TINYINT(1) | 0 or 1 |
| Small integers | TINYINT, SMALLINT | Memory efficient |

### 4.3 Redis Data Types

| Use Case | Redis Type | Example |
|----------|------------|---------|
| Session data | Hash | `HSET session:abc user_id 123` |
| API cache | String | `SET cache:student:123 "{...}"` |
| Rate limiting | String + TTL | `SETEX ratelimit:ip:1.2.3.4 60 1` |
| Job queues | List | `LPUSH queue:email "{...}"` |
| Real-time presence | Set | `SADD online:users user123` |
| Leaderboards | Sorted Set | `ZADD leaderboard 95 student123` |

---

## 5. Indexing Strategy

### 5.1 Indexing Principles

1. **Index columns used in WHERE clauses**
2. **Index columns used in JOIN conditions**
3. **Index columns used in ORDER BY**
4. **Consider composite indexes for multi-column queries**
5. **Balance read performance vs. write overhead**

### 5.2 Primary Index Types

#### 5.2.1 B-Tree Indexes (Default)

Best for: Equality and range queries, ORDER BY operations

```sql
-- Single column index
CREATE INDEX idx_student_email ON student(email);

-- Composite index (order matters!)
CREATE INDEX idx_attendance_student_date ON attendance(student_id, attendance_date);

-- Partial index (for filtered queries)
CREATE INDEX idx_student_active ON student(email) WHERE is_active = TRUE;
```

#### 5.2.2 Hash Indexes

Best for: Equality comparisons only

```sql
-- PostgreSQL
CREATE INDEX idx_user_api_key ON api_key USING HASH (key_value);
```

#### 5.2.3 GIN Indexes (Generalized Inverted Index)

Best for: JSONB, arrays, full-text search

```sql
-- JSONB indexing
CREATE INDEX idx_student_metadata ON student USING GIN (metadata);

-- Array indexing
CREATE INDEX idx_teacher_subjects ON teacher USING GIN (subjects);

-- Full-text search
CREATE INDEX idx_content_search ON content USING GIN (to_tsvector('english', title || ' ' || body));
```

#### 5.2.4 GiST Indexes (Generalized Search Tree)

Best for: Geometric data, range types, full-text search

```sql
-- Range queries
CREATE INDEX idx_event_date_range ON event USING GIST (daterange(start_date, end_date));
```

### 5.3 Recommended Indexes by Module

#### 5.3.1 User/Authentication Indexes

```sql
-- User lookup indexes
CREATE UNIQUE INDEX idx_user_email ON "user"(email);
CREATE UNIQUE INDEX idx_user_username ON "user"(username);
CREATE INDEX idx_user_role ON "user"(role);
CREATE INDEX idx_user_is_active ON "user"(is_active) WHERE is_active = TRUE;

-- Session indexes
CREATE INDEX idx_session_user ON session(user_id);
CREATE INDEX idx_session_expires ON session(expires_at);
```

#### 5.3.2 Student Management Indexes

```sql
-- Student lookup
CREATE INDEX idx_student_admission_no ON student(admission_number);
CREATE INDEX idx_student_class ON student(current_class_id);
CREATE INDEX idx_student_status ON student(enrollment_status);
CREATE INDEX idx_student_parent ON student(parent_id);

-- Attendance indexes
CREATE INDEX idx_attendance_student ON attendance(student_id);
CREATE INDEX idx_attendance_date ON attendance(attendance_date);
CREATE INDEX idx_attendance_class_date ON attendance(class_id, attendance_date);

-- Grades indexes
CREATE INDEX idx_grade_student ON grade(student_id);
CREATE INDEX idx_grade_subject_term ON grade(subject_id, academic_term_id);
```

#### 5.3.3 Islamic Education Indexes

```sql
-- Quran progress indexes
CREATE INDEX idx_quran_student ON quran_progress(student_id);
CREATE INDEX idx_quran_surah ON quran_progress(surah_number);
CREATE INDEX idx_quran_student_surah ON quran_progress(student_id, surah_number);
CREATE INDEX idx_quran_status ON quran_progress(memorization_status);

-- Hafiz progress indexes
CREATE INDEX idx_hafiz_student ON hafiz_progress(student_id);
CREATE INDEX idx_hafiz_status ON hafiz_progress(hafiz_status);
CREATE INDEX idx_hafiz_current_juz ON hafiz_progress(current_juz);

-- Tajweed assessment indexes
CREATE INDEX idx_tajweed_student ON tajweed_assessment(student_id);
CREATE INDEX idx_tajweed_date ON tajweed_assessment(assessment_date);
CREATE INDEX idx_tajweed_student_date ON tajweed_assessment(student_id, assessment_date DESC);
```

#### 5.3.4 Payment Indexes

```sql
-- Payment transaction indexes
CREATE INDEX idx_payment_student ON payment_transaction(student_id);
CREATE INDEX idx_payment_status ON payment_transaction(status);
CREATE INDEX idx_payment_gateway ON payment_transaction(gateway);
CREATE INDEX idx_payment_date ON payment_transaction(created_at);
CREATE INDEX idx_payment_transaction_id ON payment_transaction(gateway_transaction_id);

-- Fee invoice indexes
CREATE INDEX idx_invoice_student ON fee_invoice(student_id);
CREATE INDEX idx_invoice_status ON fee_invoice(payment_status);
CREATE INDEX idx_invoice_due_date ON fee_invoice(due_date);
```

#### 5.3.5 Communication Indexes

```sql
-- Notification indexes
CREATE INDEX idx_notification_user ON notification(user_id);
CREATE INDEX idx_notification_read ON notification(user_id, is_read);
CREATE INDEX idx_notification_created ON notification(created_at DESC);

-- Message indexes
CREATE INDEX idx_message_sender ON message(sender_id);
CREATE INDEX idx_message_recipient ON message(recipient_id);
CREATE INDEX idx_message_thread ON message(thread_id);
```

### 5.4 Index Maintenance

```sql
-- PostgreSQL: Analyze tables to update statistics
ANALYZE student;
ANALYZE quran_progress;
ANALYZE payment_transaction;

-- PostgreSQL: Reindex to rebuild fragmented indexes
REINDEX INDEX idx_quran_student;
REINDEX TABLE student;

-- PostgreSQL: Check index usage
SELECT
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan ASC;

-- MySQL: Analyze and optimize tables
ANALYZE TABLE gibbonStudent;
OPTIMIZE TABLE gibbonAttendanceLogPerson;
```

### 5.5 Composite Index Column Order

```plaintext
Rule: Order columns by selectivity (most selective first) and query patterns

Example Query:
SELECT * FROM quran_progress
WHERE student_id = ? AND surah_number = ? AND memorization_status = 'memorized';

Best Index Order:
CREATE INDEX idx_quran_student_surah_status
ON quran_progress(student_id, surah_number, memorization_status);

Reasoning:
1. student_id - Most selective (filters to one student)
2. surah_number - Second most selective (1-114 values)
3. memorization_status - Least selective (4 possible values)
```

---

## 6. Partitioning Strategy

### 6.1 When to Use Partitioning

Partitioning is recommended for Smart Academy when:
- Tables exceed 10 million rows
- Query performance degrades on large time-series data
- Archival of old data is required

### 6.2 Partitioning Candidates

| Table | Estimated Rows (5 years) | Partition Strategy |
|-------|--------------------------|-------------------|
| attendance | 3.6M+ (2000 students x 200 days x 9 years) | Range by academic_year |
| grade | 1M+ | Range by academic_year |
| notification | 5M+ | Range by created_at (monthly) |
| audit_log | 10M+ | Range by created_at (monthly) |
| payment_transaction | 500K+ | Range by created_at (yearly) |

### 6.3 PostgreSQL Partitioning Examples

#### 6.3.1 Range Partitioning by Date

```sql
-- Create partitioned attendance table
CREATE TABLE attendance (
    id UUID DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL,
    class_id UUID NOT NULL,
    attendance_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    marked_by UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (id, attendance_date)
) PARTITION BY RANGE (attendance_date);

-- Create partitions for each academic year
CREATE TABLE attendance_2024 PARTITION OF attendance
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

CREATE TABLE attendance_2025 PARTITION OF attendance
    FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

CREATE TABLE attendance_2026 PARTITION OF attendance
    FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

-- Default partition for future data
CREATE TABLE attendance_default PARTITION OF attendance DEFAULT;
```

#### 6.3.2 List Partitioning by Status

```sql
-- Partition notifications by read status for performance
CREATE TABLE notification (
    id UUID DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (id, is_read)
) PARTITION BY LIST (is_read);

CREATE TABLE notification_unread PARTITION OF notification
    FOR VALUES IN (FALSE);

CREATE TABLE notification_read PARTITION OF notification
    FOR VALUES IN (TRUE);
```

#### 6.3.3 Automatic Partition Management

```sql
-- Function to create monthly partitions automatically
CREATE OR REPLACE FUNCTION create_monthly_partition(
    table_name TEXT,
    partition_date DATE
) RETURNS VOID AS $$
DECLARE
    partition_name TEXT;
    start_date DATE;
    end_date DATE;
BEGIN
    start_date := date_trunc('month', partition_date);
    end_date := start_date + INTERVAL '1 month';
    partition_name := table_name || '_' || to_char(start_date, 'YYYY_MM');

    EXECUTE format(
        'CREATE TABLE IF NOT EXISTS %I PARTITION OF %I
         FOR VALUES FROM (%L) TO (%L)',
        partition_name, table_name, start_date, end_date
    );
END;
$$ LANGUAGE plpgsql;

-- Schedule via pg_cron or application job
SELECT create_monthly_partition('audit_log', '2026-02-01');
```

### 6.4 MySQL Partitioning (for Gibbon Extensions)

```sql
-- Partition custom Gibbon extension table by year
CREATE TABLE gibbonIslamicProgress (
    gibbonIslamicProgressID INT UNSIGNED AUTO_INCREMENT,
    gibbonPersonID INT UNSIGNED NOT NULL,
    progressType ENUM('quran', 'hadith', 'tajweed', 'prayer'),
    assessmentDate DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (gibbonIslamicProgressID, assessmentDate)
) PARTITION BY RANGE (YEAR(assessmentDate)) (
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p2025 VALUES LESS THAN (2026),
    PARTITION p2026 VALUES LESS THAN (2027),
    PARTITION pmax VALUES LESS THAN MAXVALUE
);
```

---

## 7. Performance Considerations

### 7.1 Query Optimization Guidelines

#### 7.1.1 Use EXPLAIN ANALYZE

```sql
-- Always analyze query plans for slow queries
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT s.*, qp.memorization_status
FROM student s
JOIN quran_progress qp ON s.id = qp.student_id
WHERE s.current_class_id = 'class-uuid'
AND qp.surah_number = 1;
```

#### 7.1.2 Avoid N+1 Queries

```typescript
// BAD: N+1 queries
const students = await prisma.student.findMany();
for (const student of students) {
    const grades = await prisma.grade.findMany({
        where: { studentId: student.id }
    });
}

// GOOD: Single query with include
const students = await prisma.student.findMany({
    include: {
        grades: true,
        quranProgress: true,
    }
});
```

#### 7.1.3 Use Pagination

```sql
-- Cursor-based pagination (preferred for large datasets)
SELECT * FROM student
WHERE created_at < '2026-01-01'
ORDER BY created_at DESC
LIMIT 20;

-- Offset-based pagination (acceptable for small datasets)
SELECT * FROM student
ORDER BY created_at DESC
LIMIT 20 OFFSET 40;
```

### 7.2 Connection Pooling

#### 7.2.1 PostgreSQL with Prisma

```typescript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Connection pool settings
  // Default: connection_limit = num_cpus * 2 + 1
}

// For serverless environments
// DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=5&pool_timeout=10"
```

#### 7.2.2 PgBouncer for High Concurrency

```ini
# pgbouncer.ini
[databases]
smart_academy = host=localhost port=5432 dbname=smart_academy_prod

[pgbouncer]
listen_addr = 127.0.0.1
listen_port = 6432
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 20
min_pool_size = 5
reserve_pool_size = 5
```

### 7.3 Caching Strategy

#### 7.3.1 Cache Layers

```plaintext
Layer 1: Application-level (in-memory)
├── Frequently accessed config
├── Static lookup data
└── Session data (local cache)

Layer 2: Redis Cache
├── API response cache
├── Database query results
├── Computed aggregations
└── Session storage

Layer 3: Database Query Cache
├── PostgreSQL shared_buffers
└── MySQL InnoDB buffer pool
```

#### 7.3.2 Cache Patterns

```typescript
// Cache-aside pattern implementation
async function getStudentWithCache(studentId: string) {
    const cacheKey = `student:${studentId}`;

    // Try cache first
    const cached = await redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }

    // Cache miss - query database
    const student = await prisma.student.findUnique({
        where: { id: studentId },
        include: { quranProgress: true }
    });

    // Store in cache with TTL
    await redis.setex(cacheKey, 3600, JSON.stringify(student));

    return student;
}

// Cache invalidation on update
async function updateStudent(studentId: string, data: StudentUpdateData) {
    const student = await prisma.student.update({
        where: { id: studentId },
        data
    });

    // Invalidate cache
    await redis.del(`student:${studentId}`);
    await redis.del(`class:${student.classId}:students`);

    return student;
}
```

#### 7.3.3 Cache TTL Guidelines

| Data Type | TTL | Rationale |
|-----------|-----|-----------|
| Static config | 24 hours | Rarely changes |
| Prayer times | 24 hours | Daily calculation |
| Student profile | 1 hour | Moderate update frequency |
| Grade summaries | 15 minutes | Frequent during grading |
| Attendance status | 5 minutes | Real-time updates |
| Dashboard stats | 10 minutes | Near real-time |
| Session data | 24 hours | Session duration |

### 7.4 Database Maintenance

#### 7.4.1 PostgreSQL Maintenance

```sql
-- Regular VACUUM ANALYZE
VACUUM ANALYZE student;
VACUUM ANALYZE quran_progress;
VACUUM ANALYZE payment_transaction;

-- Full VACUUM for major cleanup (during maintenance window)
VACUUM FULL ANALYZE;

-- Reindex tables with high write activity
REINDEX TABLE attendance;
REINDEX TABLE notification;

-- Update statistics for query planner
ANALYZE;
```

#### 7.4.2 MySQL Maintenance

```sql
-- Optimize tables
OPTIMIZE TABLE gibbonPerson;
OPTIMIZE TABLE gibbonAttendanceLogPerson;

-- Analyze tables
ANALYZE TABLE gibbonStudent;
ANALYZE TABLE gibbonCourse;

-- Check table integrity
CHECK TABLE gibbonMarkbookEntry;
```

#### 7.4.3 Scheduled Maintenance Jobs

```yaml
# Maintenance schedule (cron format)
maintenance_jobs:
  - name: PostgreSQL VACUUM ANALYZE
    schedule: "0 3 * * *"  # Daily at 3 AM
    command: "vacuumdb --analyze --all"

  - name: PostgreSQL Statistics Update
    schedule: "0 */6 * * *"  # Every 6 hours
    command: "psql -c 'ANALYZE'"

  - name: MySQL Optimize
    schedule: "0 4 * * 0"  # Weekly Sunday at 4 AM
    command: "mysqlcheck --optimize --all-databases"

  - name: Redis Memory Cleanup
    schedule: "0 */12 * * *"  # Every 12 hours
    command: "redis-cli MEMORY PURGE"

  - name: Old Partition Archival
    schedule: "0 5 1 * *"  # Monthly on 1st at 5 AM
    command: "archive_old_partitions.sh"
```

### 7.5 Performance Monitoring

#### 7.5.1 PostgreSQL Monitoring Queries

```sql
-- Identify slow queries
SELECT
    query,
    calls,
    mean_exec_time,
    total_exec_time,
    rows
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Check table bloat
SELECT
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname || '.' || tablename)) AS size,
    n_dead_tup AS dead_tuples,
    n_live_tup AS live_tuples,
    round(n_dead_tup::numeric / NULLIF(n_live_tup, 0) * 100, 2) AS dead_ratio
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000
ORDER BY n_dead_tup DESC;

-- Check index usage
SELECT
    schemaname || '.' || tablename AS table,
    indexname,
    idx_scan AS scans,
    pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes
ORDER BY idx_scan;
```

#### 7.5.2 Performance Metrics to Monitor

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Query response time (p95) | < 100ms | > 500ms |
| Connection pool utilization | < 70% | > 85% |
| Cache hit ratio | > 95% | < 90% |
| Disk I/O wait | < 10% | > 30% |
| Replication lag | < 1 second | > 5 seconds |
| Dead tuples ratio | < 10% | > 20% |
| Index scan ratio | > 90% | < 80% |

---

## 8. High Availability and Backup

### 8.1 Backup Strategy

#### 8.1.1 Backup Schedule

| Backup Type | Frequency | Retention | Storage |
|-------------|-----------|-----------|---------|
| Full database | Daily (3 AM) | 30 days | Local + S3 |
| Incremental/WAL | Continuous | 7 days | Local + S3 |
| Transaction logs | Real-time | 24 hours | Local |
| Redis RDB | Every 15 min | 7 days | Local + S3 |
| Configuration | On change | 90 days | Git + S3 |

#### 8.1.2 PostgreSQL Backup Commands

```bash
#!/bin/bash
# backup_postgresql.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/postgresql"
S3_BUCKET="s3://smart-academy-backups/postgresql"

# Full backup with compression
pg_dump -Fc -Z9 smart_academy_prod > "$BACKUP_DIR/full_${DATE}.dump"

# Upload to S3
aws s3 cp "$BACKUP_DIR/full_${DATE}.dump" "$S3_BUCKET/full_${DATE}.dump"

# WAL archiving (configured in postgresql.conf)
# archive_mode = on
# archive_command = 'aws s3 cp %p s3://smart-academy-backups/wal/%f'

# Cleanup old local backups (keep 7 days)
find "$BACKUP_DIR" -name "*.dump" -mtime +7 -delete
```

#### 8.1.3 MySQL Backup Commands

```bash
#!/bin/bash
# backup_mysql.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/mysql"
S3_BUCKET="s3://smart-academy-backups/mysql"

# Gibbon database backup
mysqldump --single-transaction --routines --triggers \
    smart_academy_gibbon > "$BACKUP_DIR/gibbon_${DATE}.sql"

# Moodle database backup
mysqldump --single-transaction --routines --triggers \
    smart_academy_moodle > "$BACKUP_DIR/moodle_${DATE}.sql"

# Compress and upload
gzip "$BACKUP_DIR/gibbon_${DATE}.sql"
gzip "$BACKUP_DIR/moodle_${DATE}.sql"

aws s3 cp "$BACKUP_DIR/gibbon_${DATE}.sql.gz" "$S3_BUCKET/"
aws s3 cp "$BACKUP_DIR/moodle_${DATE}.sql.gz" "$S3_BUCKET/"
```

### 8.2 Disaster Recovery

#### 8.2.1 Recovery Point Objective (RPO)

| System | RPO Target | Method |
|--------|------------|--------|
| PostgreSQL | < 1 hour | WAL archiving + hourly snapshots |
| MySQL (Gibbon) | < 6 hours | Binary log + 6-hour backups |
| MySQL (Moodle) | < 6 hours | Binary log + 6-hour backups |
| Redis | < 1 hour | RDB snapshots + AOF |

#### 8.2.2 Recovery Time Objective (RTO)

| Scenario | RTO Target | Recovery Method |
|----------|------------|-----------------|
| Single table corruption | < 30 minutes | Point-in-time recovery |
| Database failure | < 2 hours | Restore from backup |
| Server failure | < 4 hours | Standby promotion + restore |
| Complete disaster | < 24 hours | Full rebuild from S3 |

#### 8.2.3 Recovery Procedures

```bash
# PostgreSQL point-in-time recovery
pg_restore -d smart_academy_prod /backups/full_20260110.dump

# Restore to specific point in time
recovery.conf:
restore_command = 'aws s3 cp s3://smart-academy-backups/wal/%f %p'
recovery_target_time = '2026-01-10 14:30:00'

# MySQL restore
mysql smart_academy_gibbon < /backups/gibbon_20260110.sql

# Redis restore
redis-cli SHUTDOWN NOSAVE
cp /backups/redis/dump.rdb /var/lib/redis/dump.rdb
systemctl start redis
```

### 8.3 Replication Setup (Future Scaling)

#### 8.3.1 PostgreSQL Streaming Replication

```ini
# Primary server postgresql.conf
wal_level = replica
max_wal_senders = 3
wal_keep_size = 1GB
hot_standby = on

# Standby server recovery.conf
standby_mode = 'on'
primary_conninfo = 'host=primary.db port=5432 user=replicator password=xxx'
trigger_file = '/tmp/promote_to_primary'
```

#### 8.3.2 MySQL Replication

```ini
# Primary server my.cnf
[mysqld]
server-id = 1
log_bin = mysql-bin
binlog_format = ROW

# Replica server my.cnf
[mysqld]
server-id = 2
relay_log = mysql-relay
read_only = ON
```

---

## 9. Security Considerations

### 9.1 Access Control

#### 9.1.1 Database User Roles

```sql
-- PostgreSQL: Create application-specific roles
CREATE ROLE smart_academy_app WITH LOGIN PASSWORD 'secure-password';
CREATE ROLE smart_academy_readonly WITH LOGIN PASSWORD 'secure-password';
CREATE ROLE smart_academy_admin WITH LOGIN PASSWORD 'secure-password';

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO smart_academy_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO smart_academy_app;

GRANT SELECT ON ALL TABLES IN SCHEMA public TO smart_academy_readonly;

GRANT ALL PRIVILEGES ON DATABASE smart_academy_prod TO smart_academy_admin;
```

#### 9.1.2 Row-Level Security (RLS)

```sql
-- Enable RLS on sensitive tables
ALTER TABLE student ENABLE ROW LEVEL SECURITY;

-- Teachers can only see students in their classes
CREATE POLICY teacher_student_policy ON student
    FOR SELECT
    USING (
        current_class_id IN (
            SELECT class_id FROM teacher_class
            WHERE teacher_id = current_setting('app.current_user_id')::uuid
        )
    );

-- Parents can only see their own children
CREATE POLICY parent_student_policy ON student
    FOR SELECT
    USING (
        parent_id = current_setting('app.current_user_id')::uuid
    );
```

### 9.2 Data Encryption

#### 9.2.1 Encryption at Rest

```sql
-- PostgreSQL: Use pgcrypto for sensitive columns
CREATE EXTENSION pgcrypto;

-- Encrypt sensitive data
UPDATE student SET
    national_id = pgp_sym_encrypt(national_id, 'encryption-key')
WHERE national_id IS NOT NULL;

-- Decrypt when reading
SELECT
    id,
    pgp_sym_decrypt(national_id::bytea, 'encryption-key') as national_id
FROM student
WHERE id = 'student-uuid';
```

#### 9.2.2 TLS/SSL Connections

```ini
# PostgreSQL SSL configuration
ssl = on
ssl_cert_file = '/etc/ssl/certs/server.crt'
ssl_key_file = '/etc/ssl/private/server.key'
ssl_ca_file = '/etc/ssl/certs/ca.crt'

# Connection string with SSL
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

### 9.3 Audit Logging

```sql
-- Create audit log table
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name VARCHAR(100) NOT NULL,
    record_id UUID NOT NULL,
    action VARCHAR(20) NOT NULL,
    old_values JSONB,
    new_values JSONB,
    user_id UUID,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_func()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_log (table_name, record_id, action, new_values, user_id)
        VALUES (TG_TABLE_NAME, NEW.id, 'INSERT', to_jsonb(NEW), current_setting('app.current_user_id', true)::uuid);
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (table_name, record_id, action, old_values, new_values, user_id)
        VALUES (TG_TABLE_NAME, NEW.id, 'UPDATE', to_jsonb(OLD), to_jsonb(NEW), current_setting('app.current_user_id', true)::uuid);
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_log (table_name, record_id, action, old_values, user_id)
        VALUES (TG_TABLE_NAME, OLD.id, 'DELETE', to_jsonb(OLD), current_setting('app.current_user_id', true)::uuid);
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Apply audit trigger to sensitive tables
CREATE TRIGGER audit_student
    AFTER INSERT OR UPDATE OR DELETE ON student
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

CREATE TRIGGER audit_payment
    AFTER INSERT OR UPDATE OR DELETE ON payment_transaction
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();
```

### 9.4 Data Masking

```sql
-- Create view with masked sensitive data for reporting
CREATE VIEW vw_student_masked AS
SELECT
    id,
    first_name,
    CONCAT(LEFT(last_name, 1), '***') as last_name,
    CONCAT('***-', RIGHT(phone, 4)) as phone,
    CONCAT(LEFT(email, 2), '***@', SPLIT_PART(email, '@', 2)) as email,
    current_class_id,
    enrollment_status
FROM student;

-- Grant reporting users access to masked view only
GRANT SELECT ON vw_student_masked TO smart_academy_reporting;
```

---

## Appendix A: Database Checklist

### Pre-Production Checklist

- [ ] All tables have appropriate primary keys
- [ ] Foreign key constraints defined and indexed
- [ ] Appropriate indexes created for common queries
- [ ] Character encoding set to UTF8 for Bengali support
- [ ] Connection pooling configured
- [ ] Backup automation in place
- [ ] Monitoring and alerting configured
- [ ] Row-level security policies applied
- [ ] Audit logging enabled for sensitive tables
- [ ] SSL/TLS enabled for all connections
- [ ] Performance baseline established
- [ ] Disaster recovery procedures documented and tested

---

## Document Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-10 | Development Team | Initial document |

---

*This document is part of the Smart Academy Database Documentation series.*
