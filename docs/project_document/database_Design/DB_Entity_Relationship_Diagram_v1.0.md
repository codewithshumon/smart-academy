# Smart Academy - Entity Relationship Diagram Documentation

**Document ID:** DB_Entity_Relationship_Diagram_v1.0
**Version:** 1.0
**Last Updated:** 2026-01-10
**Status:** Draft
**Author:** Development Team

---

## Table of Contents

1. [Document Overview](#1-document-overview)
2. [Conceptual Data Model](#2-conceptual-data-model)
3. [Logical Data Model](#3-logical-data-model)
4. [Physical Data Model](#4-physical-data-model)
5. [Entity Descriptions](#5-entity-descriptions)

---

## 1. Document Overview

### 1.1 Purpose

This document provides comprehensive Entity-Relationship Diagrams (ERDs) for the Smart Academy Digital Portal database architecture. It covers conceptual, logical, and physical data models across all system modules.

### 1.2 Scope

This specification covers entities for:
- Users and Authentication
- Students and Enrollment
- Academic Records
- Attendance
- Grades and Assessments
- Islamic Education Tracking
- Financial Transactions
- Communication
- Content Management

### 1.3 Database Systems Covered

| Database | Platform | Purpose |
|----------|----------|---------|
| PostgreSQL 17+ | Custom Modules | Islamic Education, Payments, Analytics, CMS |
| MySQL 8.0+ | Gibbon SMS | Student Management, Attendance, Grades |
| MySQL 8.0+ | Moodle LMS | Learning Management, Courses, Assignments |
| Redis 7+ | Cache | Sessions, API Cache, Job Queues |

### 1.4 ERD Notation

This document uses **Crow's Foot Notation** for relationships:

```
Cardinality Symbols:
├──────────  One (mandatory)
├──○─────── Zero or One (optional)
├──<─────── Many (one or more)
├──○<────── Zero or Many

Relationship Example:
┌─────────┐           ┌─────────┐
│ Student │───────<───│  Grade  │
└─────────┘           └─────────┘
  (One)                 (Many)

"One student has many grades"
```

---

## 2. Conceptual Data Model

### 2.1 High-Level Entity Overview

The conceptual model represents the major entities and their relationships at a business level without implementation details.

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                        SMART ACADEMY CONCEPTUAL DATA MODEL                                │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│                              ┌───────────────┐                                          │
│                              │     USER      │                                          │
│                              │  (Base Entity)│                                          │
│                              └───────┬───────┘                                          │
│                    ┌─────────────────┼─────────────────┐                                │
│                    │                 │                 │                                │
│              ┌─────▼─────┐     ┌─────▼─────┐     ┌─────▼─────┐                         │
│              │  STUDENT  │     │  TEACHER  │     │  PARENT   │                         │
│              └─────┬─────┘     └─────┬─────┘     └─────┬─────┘                         │
│                    │                 │                 │                                │
│        ┌───────────┼───────────┐     │                 │                                │
│        │           │           │     │                 │                                │
│  ┌─────▼─────┐ ┌───▼────┐ ┌────▼───┐ │                 │                                │
│  │ATTENDANCE │ │ GRADE  │ │ISLAMIC │ │                 │                                │
│  │  RECORD   │ │RECORD  │ │PROGRESS│ │                 │                                │
│  └───────────┘ └────────┘ └────────┘ │                 │                                │
│                                      │                 │                                │
│  ┌───────────────────────────────────┘                 │                                │
│  │                                                     │                                │
│  │  ┌─────────────┐     ┌─────────────┐     ┌─────────▼───────┐                        │
│  │  │   CLASS     │─────│   COURSE    │     │    PAYMENT      │                        │
│  │  │  SECTION    │     │  (Subject)  │     │  TRANSACTION    │                        │
│  │  └─────────────┘     └─────────────┘     └─────────────────┘                        │
│  │                                                                                      │
│  │  ┌─────────────┐     ┌─────────────┐     ┌─────────────────┐                        │
│  └──│ TIMETABLE   │     │ANNOUNCEMENT │     │  NOTIFICATION   │                        │
│     │  SCHEDULE   │     │   /NEWS     │     │    MESSAGE      │                        │
│     └─────────────┘     └─────────────┘     └─────────────────┘                        │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Core Business Entities

| Entity | Description | Primary Relationships |
|--------|-------------|----------------------|
| **User** | Base entity for all system users | Parent of Student, Teacher, Parent, Admin |
| **Student** | Enrolled students from PlayGroup to Class 9 | Belongs to Class, Has Grades, Has Attendance |
| **Teacher** | Teaching and administrative staff | Teaches Classes, Marks Attendance, Grades |
| **Parent** | Parents/guardians of students | Has Students (children), Makes Payments |
| **Class Section** | Academic class divisions (Class 1-A, etc.) | Has Students, Has Timetable |
| **Course/Subject** | Academic subjects taught | Belongs to Class, Has Assessments |
| **Academic Year** | School academic year periods | Contains Terms, Semesters |
| **Fee** | Fee structure and invoices | For Students, Collected via Payments |
| **Islamic Progress** | Quran memorization and Islamic studies | For Students, Assessed by Teachers |

### 2.3 Entity Category Groupings

```
┌─────────────────────────────────────────────────────────────────┐
│                    ENTITY CATEGORIES                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ IDENTITY & ACCESS                                            ││
│  │ • User, Role, Permission, Session, ApiKey                   ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ ACADEMIC ADMINISTRATION                                      ││
│  │ • Student, Teacher, Staff, Parent, Guardian                 ││
│  │ • AcademicYear, Term, ClassSection, Subject                 ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ ACADEMIC RECORDS                                             ││
│  │ • Enrollment, Attendance, Grade, Assessment                 ││
│  │ • ReportCard, Certificate, Transcript                       ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ ISLAMIC EDUCATION                                            ││
│  │ • QuranProgress, HafizProgress, TajweedAssessment           ││
│  │ • HadithProgress, PrayerAttendance, IslamicEvent            ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ FINANCIAL                                                    ││
│  │ • FeeStructure, FeeInvoice, Payment, Receipt                ││
│  │ • Scholarship, Discount, Refund                             ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ COMMUNICATION                                                ││
│  │ • Notification, Message, Announcement, Event                ││
│  │ • SMSLog, EmailLog, PushNotification                        ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ CONTENT MANAGEMENT                                           ││
│  │ • Page, Post, Media, Document, Gallery                      ││
│  │ • Menu, Category, Tag                                        ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Logical Data Model

### 3.1 Users and Authentication Domain

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                         USERS AND AUTHENTICATION ERD                                      │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  ┌────────────────────────┐         ┌────────────────────────┐                          │
│  │         user           │         │         role           │                          │
│  ├────────────────────────┤         ├────────────────────────┤                          │
│  │ PK  id                 │         │ PK  id                 │                          │
│  │     email              │         │     name               │                          │
│  │     username           │         │     description        │                          │
│  │     password_hash      │         │     is_system          │                          │
│  │     first_name         │         │     created_at         │                          │
│  │     last_name          │         └───────────┬────────────┘                          │
│  │     name_bengali       │                     │                                        │
│  │     phone              │                     │ 1                                      │
│  │     avatar_url         │                     │                                        │
│  │     status             │                     ▼ n                                      │
│  │     email_verified_at  │         ┌────────────────────────┐                          │
│  │     last_login_at      │         │     user_role          │                          │
│  │     created_at         │         ├────────────────────────┤                          │
│  │     updated_at         │ 1     n │ PK  id                 │                          │
│  └───────────┬────────────┘◄────────│ FK  user_id            │                          │
│              │                      │ FK  role_id            │                          │
│              │                      │     assigned_at        │                          │
│              │                      │     assigned_by        │                          │
│              │                      └────────────────────────┘                          │
│              │                                                                           │
│              │ 1                                                                         │
│              │                      ┌────────────────────────┐                          │
│              ▼ n                    │      permission        │                          │
│  ┌────────────────────────┐         ├────────────────────────┤                          │
│  │       session          │         │ PK  id                 │                          │
│  ├────────────────────────┤         │     name               │                          │
│  │ PK  id                 │         │     resource           │                          │
│  │ FK  user_id            │         │     action             │                          │
│  │     token              │         │     description        │                          │
│  │     ip_address         │         └───────────┬────────────┘                          │
│  │     user_agent         │                     │                                        │
│  │     expires_at         │                     │ 1                                      │
│  │     created_at         │                     │                                        │
│  └────────────────────────┘                     ▼ n                                      │
│                                     ┌────────────────────────┐                          │
│              │ 1                    │   role_permission      │                          │
│              │                      ├────────────────────────┤                          │
│              ▼ n                    │ PK  id                 │                          │
│  ┌────────────────────────┐         │ FK  role_id            │                          │
│  │      refresh_token     │         │ FK  permission_id      │                          │
│  ├────────────────────────┤         └────────────────────────┘                          │
│  │ PK  id                 │                                                              │
│  │ FK  user_id            │                                                              │
│  │     token              │         ┌────────────────────────┐                          │
│  │     expires_at         │         │      audit_log         │                          │
│  │     revoked_at         │         ├────────────────────────┤                          │
│  │     created_at         │         │ PK  id                 │                          │
│  └────────────────────────┘         │ FK  user_id            │                          │
│                                     │     table_name         │                          │
│                                     │     record_id          │                          │
│                                     │     action             │                          │
│                                     │     old_values         │                          │
│                                     │     new_values         │                          │
│                                     │     ip_address         │                          │
│                                     │     created_at         │                          │
│                                     └────────────────────────┘                          │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Students and Enrollment Domain

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                         STUDENTS AND ENROLLMENT ERD                                       │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  ┌────────────────────────┐                     ┌────────────────────────┐              │
│  │       student          │                     │     academic_year      │              │
│  ├────────────────────────┤                     ├────────────────────────┤              │
│  │ PK  id                 │                     │ PK  id                 │              │
│  │ FK  user_id            │                     │     name               │              │
│  │ FK  gibbon_person_id   │                     │     start_date         │              │
│  │     admission_number   │                     │     end_date           │              │
│  │     roll_number        │                     │     is_current         │              │
│  │     birth_date         │                     │     status             │              │
│  │     birth_cert_number  │                     │     created_at         │              │
│  │     blood_group        │                     └───────────┬────────────┘              │
│  │     religion           │                                 │                            │
│  │     nationality        │                                 │ 1                          │
│  │     address_present    │                                 │                            │
│  │     address_permanent  │                                 ▼ n                          │
│  │     photo_url          │                     ┌────────────────────────┐              │
│  │     medical_info       │                     │     academic_term      │              │
│  │     transport_route_id │                     ├────────────────────────┤              │
│  │     scholarship_type   │                     │ PK  id                 │              │
│  │     enrollment_status  │                     │ FK  academic_year_id   │              │
│  │     enrollment_date    │                     │     name               │              │
│  │     created_at         │                     │     term_number        │              │
│  └───────────┬────────────┘                     │     start_date         │              │
│              │                                  │     end_date           │              │
│              │                                  │     is_current         │              │
│              │ 1                                └────────────────────────┘              │
│              │                                                                           │
│              ▼ n                                                                         │
│  ┌────────────────────────┐         ┌────────────────────────┐                          │
│  │     enrollment         │ n     1 │     class_section      │                          │
│  ├────────────────────────┤◄────────├────────────────────────┤                          │
│  │ PK  id                 │         │ PK  id                 │                          │
│  │ FK  student_id         │         │ FK  academic_year_id   │                          │
│  │ FK  class_section_id   │         │     class_name         │                          │
│  │ FK  academic_year_id   │         │     section            │                          │
│  │     roll_number        │         │     display_name       │                          │
│  │     enrollment_date    │         │     capacity           │                          │
│  │     status             │         │     class_teacher_id   │                          │
│  │     created_at         │         │     room_number        │                          │
│  └────────────────────────┘         │     created_at         │                          │
│                                     └───────────┬────────────┘                          │
│                                                 │                                        │
│  ┌────────────────────────┐                     │ n                                      │
│  │       parent           │                     │                                        │
│  ├────────────────────────┤                     ▼ 1                                      │
│  │ PK  id                 │         ┌────────────────────────┐                          │
│  │ FK  user_id            │         │ class_section_subject  │                          │
│  │     occupation         │         ├────────────────────────┤                          │
│  │     workplace          │         │ PK  id                 │                          │
│  │     nid_number         │         │ FK  class_section_id   │                          │
│  │     created_at         │         │ FK  subject_id         │                          │
│  └───────────┬────────────┘         │ FK  teacher_id         │                          │
│              │                      │     periods_per_week   │                          │
│              │ 1                    └────────────────────────┘                          │
│              │                                                                           │
│              ▼ n                    ┌────────────────────────┐                          │
│  ┌────────────────────────┐         │       subject          │                          │
│  │   student_parent       │         ├────────────────────────┤                          │
│  ├────────────────────────┤         │ PK  id                 │                          │
│  │ PK  id                 │         │     name               │                          │
│  │ FK  student_id         │         │     name_bengali       │                          │
│  │ FK  parent_id          │         │     code               │                          │
│  │     relationship       │         │     description        │                          │
│  │     is_primary         │         │     is_optional        │                          │
│  │     can_pickup         │         │     credit_hours       │                          │
│  │     emergency_contact  │         │     pass_marks         │                          │
│  └────────────────────────┘         │     full_marks         │                          │
│                                     │     created_at         │                          │
│                                     └────────────────────────┘                          │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Academic Records Domain

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                            ACADEMIC RECORDS ERD                                           │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  ┌────────────────────────┐                     ┌────────────────────────┐              │
│  │       student          │                     │     class_section      │              │
│  └───────────┬────────────┘                     └───────────┬────────────┘              │
│              │ 1                                            │ 1                          │
│              │                                              │                            │
│              ▼ n                                            ▼ n                          │
│  ┌────────────────────────┐                     ┌────────────────────────┐              │
│  │      attendance        │                     │      timetable         │              │
│  ├────────────────────────┤                     ├────────────────────────┤              │
│  │ PK  id                 │                     │ PK  id                 │              │
│  │ FK  student_id         │                     │ FK  class_section_id   │              │
│  │ FK  class_section_id   │                     │ FK  subject_id         │              │
│  │ FK  marked_by          │                     │ FK  teacher_id         │              │
│  │     attendance_date    │                     │     day_of_week        │              │
│  │     status             │                     │     period_number      │              │
│  │     check_in_time      │                     │     start_time         │              │
│  │     check_out_time     │                     │     end_time           │              │
│  │     remarks            │                     │     room_number        │              │
│  │     created_at         │                     │     is_active          │              │
│  └────────────────────────┘                     │     created_at         │              │
│                                                 └────────────────────────┘              │
│                                                                                          │
│  ┌────────────────────────┐         ┌────────────────────────┐                          │
│  │      assessment        │         │        grade           │                          │
│  ├────────────────────────┤         ├────────────────────────┤                          │
│  │ PK  id                 │ 1     n │ PK  id                 │                          │
│  │ FK  class_section_id   │◄────────│ FK  assessment_id      │                          │
│  │ FK  subject_id         │         │ FK  student_id         │                          │
│  │ FK  academic_term_id   │         │     marks_obtained     │                          │
│  │     name               │         │     grade_letter       │                          │
│  │     assessment_type    │         │     grade_point        │                          │
│  │     max_marks          │         │     remarks            │                          │
│  │     weightage          │         │ FK  graded_by          │                          │
│  │     date               │         │     graded_at          │                          │
│  │     created_at         │         │     created_at         │                          │
│  └────────────────────────┘         └────────────────────────┘                          │
│                                                                                          │
│                                     ┌────────────────────────┐                          │
│  ┌────────────────────────┐         │     grade_scale        │                          │
│  │     report_card        │         ├────────────────────────┤                          │
│  ├────────────────────────┤         │ PK  id                 │                          │
│  │ PK  id                 │         │     name               │                          │
│  │ FK  student_id         │         │     min_percentage     │                          │
│  │ FK  academic_term_id   │         │     max_percentage     │                          │
│  │     total_marks        │         │     grade_letter       │                          │
│  │     percentage         │         │     grade_point        │                          │
│  │     grade              │         │     description        │                          │
│  │     rank               │         │     is_passing         │                          │
│  │     attendance_pct     │         │     created_at         │                          │
│  │     teacher_remarks    │         └────────────────────────┘                          │
│  │     principal_remarks  │                                                              │
│  │     generated_at       │         ┌────────────────────────┐                          │
│  │     pdf_url            │         │     exam_schedule      │                          │
│  │     created_at         │         ├────────────────────────┤                          │
│  └────────────────────────┘         │ PK  id                 │                          │
│                                     │ FK  class_section_id   │                          │
│                                     │ FK  subject_id         │                          │
│                                     │ FK  academic_term_id   │                          │
│                                     │     exam_name          │                          │
│                                     │     exam_date          │                          │
│                                     │     start_time         │                          │
│                                     │     duration_minutes   │                          │
│                                     │     venue              │                          │
│                                     │     created_at         │                          │
│                                     └────────────────────────┘                          │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.4 Islamic Education Domain

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                           ISLAMIC EDUCATION ERD                                           │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  ┌────────────────────────┐                                                              │
│  │       student          │                                                              │
│  └───────────┬────────────┘                                                              │
│              │ 1                                                                         │
│              │                                                                           │
│   ┌──────────┼──────────┬──────────────────┬──────────────────┐                         │
│   │          │          │                  │                  │                         │
│   ▼ n        ▼ n        ▼ n                ▼ n                ▼ n                       │
│  ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐│
│  │  quran_progress   │ │  hafiz_progress   │ │tajweed_assessment │ │  hadith_progress  ││
│  ├───────────────────┤ ├───────────────────┤ ├───────────────────┤ ├───────────────────┤│
│  │ PK id             │ │ PK id             │ │ PK id             │ │ PK id             ││
│  │ FK student_id     │ │ FK student_id     │ │ FK student_id     │ │ FK student_id     ││
│  │ FK gibbon_person  │ │ FK gibbon_person  │ │ FK gibbon_person  │ │ FK gibbon_person  ││
│  │    surah_number   │ │    enrollment_date│ │    assessment_date│ │    collection_name││
│  │    surah_name_ar  │ │    target_date    │ │    assessment_type│ │    book_number    ││
│  │    surah_name_en  │ │    current_juz    │ │    makhraj_score  │ │    hadith_number  ││
│  │    juz_number     │ │    surahs_done    │ │    sifat_score    │ │    hadith_text_ar ││
│  │    verse_start    │ │    verses_done    │ │    rules_score    │ │    hadith_text_tr ││
│  │    verse_end      │ │    progress_pct   │ │    fluency_score  │ │    study_status   ││
│  │    memorize_status│ │    hafiz_status   │ │    overall_score  │ │    memorized      ││
│  │    revision_count │ │    graduation_date│ │    level_achieved │ │    understood     ││
│  │    last_revision  │ │    certificate_no │ │ FK assessor_id    │ │    quiz_score     ││
│  │    assess_score   │ │    created_at     │ │    comments       │ │    study_date     ││
│  │    teacher_comment│ │    updated_at     │ │    audio_url      │ │    created_at     ││
│  │ FK assessed_by    │ └───────────────────┘ │    created_at     │ │    updated_at     ││
│  │    assessed_at    │                       └───────────────────┘ └───────────────────┘│
│  │    created_at     │                                                                  │
│  │    updated_at     │                       ┌───────────────────┐                      │
│  └───────────────────┘                       │ prayer_attendance │                      │
│                                              ├───────────────────┤                      │
│                                              │ PK id             │                      │
│  ┌───────────────────┐                       │ FK student_id     │                      │
│  │    surah_info     │                       │    prayer_date    │                      │
│  │   (Reference)     │                       │    fajr_attended  │                      │
│  ├───────────────────┤                       │    dhuhr_attended │                      │
│  │ PK surah_number   │                       │    asr_attended   │                      │
│  │    name_arabic    │                       │    maghrib_attend │                      │
│  │    name_english   │                       │    isha_attended  │                      │
│  │    name_bengali   │                       │    fajr_time      │                      │
│  │    total_verses   │                       │    dhuhr_time     │                      │
│  │    revelation_type│                       │    asr_time       │                      │
│  │    juz_start      │                       │    maghrib_time   │                      │
│  │    juz_end        │                       │    isha_time      │                      │
│  │    page_start     │                       │    location       │                      │
│  └───────────────────┘                       │ FK recorded_by    │                      │
│                                              │    created_at     │                      │
│                                              └───────────────────┘                      │
│                                                                                          │
│  ┌───────────────────┐                       ┌───────────────────┐                      │
│  │  islamic_event    │                       │  islamic_cert     │                      │
│  ├───────────────────┤                       ├───────────────────┤                      │
│  │ PK id             │                       │ PK id             │                      │
│  │    name_arabic    │                       │ FK student_id     │                      │
│  │    name_english   │                       │    cert_type      │                      │
│  │    name_bengali   │                       │    cert_number    │                      │
│  │    hijri_month    │                       │    title          │                      │
│  │    hijri_day      │                       │    issued_date    │                      │
│  │    event_type     │                       │    issued_by      │                      │
│  │    description    │                       │    pdf_url        │                      │
│  │    is_holiday     │                       │    metadata       │                      │
│  │    is_recurring   │                       │    created_at     │                      │
│  │    created_at     │                       └───────────────────┘                      │
│  └───────────────────┘                                                                  │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.5 Financial Transactions Domain

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                          FINANCIAL TRANSACTIONS ERD                                       │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  ┌────────────────────────┐                     ┌────────────────────────┐              │
│  │     fee_structure      │                     │       student          │              │
│  ├────────────────────────┤                     └───────────┬────────────┘              │
│  │ PK  id                 │                                 │ 1                          │
│  │ FK  academic_year_id   │                                 │                            │
│  │     name               │                                 ▼ n                          │
│  │     fee_type           │                     ┌────────────────────────┐              │
│  │     amount             │ 1                 n │     fee_invoice        │              │
│  │     frequency          │◄────────────────────├────────────────────────┤              │
│  │     class_applicable   │                     │ PK  id                 │              │
│  │     due_day_of_month   │                     │ FK  student_id         │              │
│  │     late_fee_amount    │                     │ FK  fee_structure_id   │              │
│  │     late_fee_days      │                     │ FK  academic_year_id   │              │
│  │     is_optional        │                     │     invoice_number     │              │
│  │     description        │                     │     amount             │              │
│  │     created_at         │                     │     discount_amount    │              │
│  └────────────────────────┘                     │     late_fee           │              │
│                                                 │     total_amount       │              │
│                                                 │     paid_amount        │              │
│                                                 │     balance            │              │
│                                                 │     due_date           │              │
│                                                 │     status             │              │
│                                                 │     notes              │              │
│                                                 │     created_at         │              │
│                                                 └───────────┬────────────┘              │
│                                                             │ 1                          │
│                                                             │                            │
│  ┌────────────────────────┐                                 ▼ n                          │
│  │      scholarship       │                     ┌────────────────────────┐              │
│  ├────────────────────────┤                     │  payment_transaction   │              │
│  │ PK  id                 │                     ├────────────────────────┤              │
│  │ FK  student_id         │                     │ PK  id                 │              │
│  │     scholarship_type   │                     │ FK  fee_invoice_id     │              │
│  │     percentage         │                     │ FK  student_id         │              │
│  │     amount             │                     │ FK  paid_by (user)     │              │
│  │     start_date         │                     │     transaction_id     │              │
│  │     end_date           │                     │     gateway            │              │
│  │     criteria           │                     │     gateway_txn_id     │              │
│  │     approved_by        │                     │     amount             │              │
│  │     status             │                     │     currency           │              │
│  │     created_at         │                     │     status             │              │
│  └────────────────────────┘                     │     gateway_response   │              │
│                                                 │     initiated_at       │              │
│                                                 │     completed_at       │              │
│  ┌────────────────────────┐                     │     created_at         │              │
│  │     fee_discount       │                     └───────────┬────────────┘              │
│  ├────────────────────────┤                                 │ 1                          │
│  │ PK  id                 │                                 │                            │
│  │ FK  student_id         │                                 ▼ n                          │
│  │ FK  fee_structure_id   │                     ┌────────────────────────┐              │
│  │     discount_type      │                     │    payment_receipt     │              │
│  │     percentage         │                     ├────────────────────────┤              │
│  │     amount             │                     │ PK  id                 │              │
│  │     reason             │                     │ FK  payment_id         │              │
│  │     approved_by        │                     │     receipt_number     │              │
│  │     start_date         │                     │     issued_date        │              │
│  │     end_date           │                     │     pdf_url            │              │
│  │     is_active          │                     │     sent_via           │              │
│  │     created_at         │                     │     sent_at            │              │
│  └────────────────────────┘                     │     created_at         │              │
│                                                 └────────────────────────┘              │
│                                                                                          │
│  ┌────────────────────────┐                                                              │
│  │       refund           │                                                              │
│  ├────────────────────────┤                                                              │
│  │ PK  id                 │                                                              │
│  │ FK  payment_id         │                                                              │
│  │     amount             │                                                              │
│  │     reason             │                                                              │
│  │     status             │                                                              │
│  │     approved_by        │                                                              │
│  │     processed_at       │                                                              │
│  │     gateway_refund_id  │                                                              │
│  │     created_at         │                                                              │
│  └────────────────────────┘                                                              │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.6 Communication Domain

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                             COMMUNICATION ERD                                             │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  ┌────────────────────────┐         ┌────────────────────────┐                          │
│  │         user           │         │     announcement       │                          │
│  └───────────┬────────────┘         ├────────────────────────┤                          │
│              │ 1                    │ PK  id                 │                          │
│              │                      │ FK  created_by         │                          │
│   ┌──────────┼──────────┐           │     title              │                          │
│   │          │          │           │     content            │                          │
│   ▼ n        ▼ n        ▼ n         │     type               │                          │
│  ┌────────────────────┐             │     priority           │                          │
│  │    notification    │             │     target_audience    │                          │
│  ├────────────────────┤             │     target_classes     │                          │
│  │ PK  id             │             │     publish_date       │                          │
│  │ FK  user_id        │             │     expiry_date        │                          │
│  │     title          │             │     is_published       │                          │
│  │     message        │             │     attachment_urls    │                          │
│  │     type           │             │     created_at         │                          │
│  │     reference_type │             └────────────────────────┘                          │
│  │     reference_id   │                                                                  │
│  │     is_read        │             ┌────────────────────────┐                          │
│  │     read_at        │             │       event            │                          │
│  │     action_url     │             ├────────────────────────┤                          │
│  │     created_at     │             │ PK  id                 │                          │
│  └────────────────────┘             │ FK  created_by         │                          │
│                                     │     title              │                          │
│                                     │     description        │                          │
│  ┌────────────────────┐             │     event_type         │                          │
│  │  message_thread    │             │     start_datetime     │                          │
│  ├────────────────────┤             │     end_datetime       │                          │
│  │ PK  id             │             │     location           │                          │
│  │     subject        │             │     is_all_day         │                          │
│  │ FK  created_by     │             │     target_audience    │                          │
│  │     participants   │             │     is_published       │                          │
│  │     created_at     │             │     created_at         │                          │
│  │     updated_at     │             └────────────────────────┘                          │
│  └───────────┬────────┘                                                                  │
│              │ 1                    ┌────────────────────────┐                          │
│              │                      │     event_rsvp         │                          │
│              ▼ n                    ├────────────────────────┤                          │
│  ┌────────────────────┐             │ PK  id                 │                          │
│  │      message       │             │ FK  event_id           │                          │
│  ├────────────────────┤             │ FK  user_id            │                          │
│  │ PK  id             │             │     response           │                          │
│  │ FK  thread_id      │             │     num_guests         │                          │
│  │ FK  sender_id      │             │     notes              │                          │
│  │     content        │             │     responded_at       │                          │
│  │     attachments    │             └────────────────────────┘                          │
│  │     is_read        │                                                                  │
│  │     read_at        │                                                                  │
│  │     created_at     │                                                                  │
│  └────────────────────┘                                                                  │
│                                                                                          │
│  ┌────────────────────┐             ┌────────────────────────┐                          │
│  │      sms_log       │             │      email_log         │                          │
│  ├────────────────────┤             ├────────────────────────┤                          │
│  │ PK  id             │             │ PK  id                 │                          │
│  │ FK  user_id        │             │ FK  user_id            │                          │
│  │     phone_number   │             │     email_address      │                          │
│  │     message        │             │     subject            │                          │
│  │     template       │             │     body               │                          │
│  │     provider       │             │     template           │                          │
│  │     provider_id    │             │     provider           │                          │
│  │     status         │             │     provider_id        │                          │
│  │     cost           │             │     status             │                          │
│  │     sent_at        │             │     opened_at          │                          │
│  │     delivered_at   │             │     clicked_at         │                          │
│  │     failed_reason  │             │     sent_at            │                          │
│  │     created_at     │             │     failed_reason      │                          │
│  └────────────────────┘             │     created_at         │                          │
│                                     └────────────────────────┘                          │
│                                                                                          │
│  ┌────────────────────┐                                                                  │
│  │ push_notification  │                                                                  │
│  ├────────────────────┤                                                                  │
│  │ PK  id             │                                                                  │
│  │ FK  user_id        │                                                                  │
│  │     device_token   │                                                                  │
│  │     title          │                                                                  │
│  │     body           │                                                                  │
│  │     data           │                                                                  │
│  │     platform       │                                                                  │
│  │     status         │                                                                  │
│  │     sent_at        │                                                                  │
│  │     opened_at      │                                                                  │
│  │     created_at     │                                                                  │
│  └────────────────────┘                                                                  │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.7 Content Management Domain

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                          CONTENT MANAGEMENT ERD                                           │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  ┌────────────────────────┐         ┌────────────────────────┐                          │
│  │         page           │         │         post           │                          │
│  ├────────────────────────┤         ├────────────────────────┤                          │
│  │ PK  id                 │         │ PK  id                 │                          │
│  │     title              │         │     title              │                          │
│  │     title_bengali      │         │     title_bengali      │                          │
│  │     slug               │         │     slug               │                          │
│  │     content            │         │     excerpt            │                          │
│  │     content_bengali    │         │     content            │                          │
│  │     template           │         │     content_bengali    │                          │
│  │     meta_title         │         │ FK  category_id        │                          │
│  │     meta_description   │         │ FK  author_id          │                          │
│  │     featured_image     │         │     featured_image     │                          │
│  │     is_published       │         │     is_featured        │                          │
│  │     published_at       │         │     is_published       │                          │
│  │ FK  created_by         │         │     published_at       │                          │
│  │     created_at         │         │     views_count        │                          │
│  │     updated_at         │         │     created_at         │                          │
│  └────────────────────────┘         │     updated_at         │                          │
│                                     └───────────┬────────────┘                          │
│                                                 │ n                                      │
│  ┌────────────────────────┐                     │                                        │
│  │       category         │                     ▼ n                                      │
│  ├────────────────────────┤         ┌────────────────────────┐                          │
│  │ PK  id                 │         │       post_tag         │                          │
│  │     name               │         ├────────────────────────┤                          │
│  │     name_bengali       │         │ PK  id                 │                          │
│  │     slug               │         │ FK  post_id            │                          │
│  │     description        │         │ FK  tag_id             │                          │
│  │ FK  parent_id          │         └────────────────────────┘                          │
│  │     sort_order         │                     ▲ n                                      │
│  │     created_at         │                     │                                        │
│  └────────────────────────┘                     │ 1                                      │
│                                     ┌───────────┴────────────┐                          │
│                                     │         tag            │                          │
│  ┌────────────────────────┐         ├────────────────────────┤                          │
│  │        media           │         │ PK  id                 │                          │
│  ├────────────────────────┤         │     name               │                          │
│  │ PK  id                 │         │     slug               │                          │
│  │     filename           │         │     created_at         │                          │
│  │     original_name      │         └────────────────────────┘                          │
│  │     mime_type          │                                                              │
│  │     size               │         ┌────────────────────────┐                          │
│  │     path               │         │       gallery          │                          │
│  │     url                │         ├────────────────────────┤                          │
│  │     alt_text           │         │ PK  id                 │                          │
│  │     title              │         │     name               │                          │
│  │     description        │         │     description        │                          │
│  │     folder             │         │     slug               │                          │
│  │ FK  uploaded_by        │         │     cover_image        │                          │
│  │     created_at         │         │     is_published       │                          │
│  └────────────────────────┘         │     created_at         │                          │
│                                     └───────────┬────────────┘                          │
│                                                 │ 1                                      │
│  ┌────────────────────────┐                     │                                        │
│  │        menu            │                     ▼ n                                      │
│  ├────────────────────────┤         ┌────────────────────────┐                          │
│  │ PK  id                 │         │    gallery_image       │                          │
│  │     name               │         ├────────────────────────┤                          │
│  │     location           │         │ PK  id                 │                          │
│  │     is_active          │         │ FK  gallery_id         │                          │
│  │     created_at         │         │ FK  media_id           │                          │
│  └───────────┬────────────┘         │     caption            │                          │
│              │ 1                    │     sort_order         │                          │
│              │                      │     created_at         │                          │
│              ▼ n                    └────────────────────────┘                          │
│  ┌────────────────────────┐                                                              │
│  │      menu_item         │                                                              │
│  ├────────────────────────┤                                                              │
│  │ PK  id                 │                                                              │
│  │ FK  menu_id            │                                                              │
│  │ FK  parent_id          │                                                              │
│  │     label              │                                                              │
│  │     url                │                                                              │
│  │     target             │                                                              │
│  │     icon               │                                                              │
│  │     sort_order         │                                                              │
│  │     is_active          │                                                              │
│  │     created_at         │                                                              │
│  └────────────────────────┘                                                              │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Physical Data Model

### 4.1 PostgreSQL Schema (Custom Modules)

```sql
-- ============================================================
-- SMART ACADEMY - POSTGRESQL PHYSICAL SCHEMA
-- Database: smart_academy_custom
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create schemas for logical grouping
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS academic;
CREATE SCHEMA IF NOT EXISTS islamic;
CREATE SCHEMA IF NOT EXISTS financial;
CREATE SCHEMA IF NOT EXISTS communication;
CREATE SCHEMA IF NOT EXISTS content;
CREATE SCHEMA IF NOT EXISTS analytics;
CREATE SCHEMA IF NOT EXISTS audit;

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended', 'pending');
CREATE TYPE enrollment_status AS ENUM ('enrolled', 'graduated', 'withdrawn', 'transferred', 'suspended');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'excused', 'half_day');
CREATE TYPE memorization_status AS ENUM ('not_started', 'in_progress', 'memorized', 'mastered');
CREATE TYPE hafiz_status AS ENUM ('enrolled', 'active', 'paused', 'completed', 'graduated');
CREATE TYPE tajweed_level AS ENUM ('beginner', 'elementary', 'intermediate', 'advanced', 'expert');
CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled');
CREATE TYPE payment_gateway AS ENUM ('bkash', 'nagad', 'sslcommerz', 'bank_transfer', 'cash');
CREATE TYPE invoice_status AS ENUM ('draft', 'pending', 'partial', 'paid', 'overdue', 'cancelled');
CREATE TYPE notification_type AS ENUM ('info', 'success', 'warning', 'error', 'reminder');

-- ============================================================
-- AUTH SCHEMA
-- ============================================================

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

CREATE TABLE auth.role (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    display_name VARCHAR(100),
    description TEXT,
    is_system BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE auth.permission (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    resource VARCHAR(100) NOT NULL,
    action VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE auth.user_role (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.user(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES auth.role(id) ON DELETE CASCADE,
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    assigned_by UUID REFERENCES auth.user(id),
    UNIQUE(user_id, role_id)
);

CREATE TABLE auth.role_permission (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id UUID NOT NULL REFERENCES auth.role(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES auth.permission(id) ON DELETE CASCADE,
    UNIQUE(role_id, permission_id)
);

CREATE TABLE auth.session (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.user(id) ON DELETE CASCADE,
    token VARCHAR(500) NOT NULL UNIQUE,
    ip_address INET,
    user_agent TEXT,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE auth.refresh_token (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.user(id) ON DELETE CASCADE,
    token VARCHAR(500) NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    revoked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ACADEMIC SCHEMA
-- ============================================================

CREATE TABLE academic.academic_year (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE academic.academic_term (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    academic_year_id UUID NOT NULL REFERENCES academic.academic_year(id),
    name VARCHAR(50) NOT NULL,
    term_number INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE academic.class_section (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    academic_year_id UUID NOT NULL REFERENCES academic.academic_year(id),
    class_name VARCHAR(50) NOT NULL,
    section VARCHAR(10),
    display_name VARCHAR(100) NOT NULL,
    capacity INT DEFAULT 40,
    class_teacher_id UUID,
    room_number VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(academic_year_id, class_name, section)
);

CREATE TABLE academic.subject (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    name_bengali VARCHAR(100),
    code VARCHAR(20) UNIQUE,
    description TEXT,
    is_optional BOOLEAN DEFAULT FALSE,
    credit_hours DECIMAL(3,1),
    pass_marks DECIMAL(5,2) DEFAULT 33,
    full_marks DECIMAL(5,2) DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

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

CREATE TABLE academic.parent (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.user(id),
    gibbon_person_id INT,
    occupation VARCHAR(100),
    workplace VARCHAR(200),
    nid_number VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE academic.student_parent (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES academic.student(id) ON DELETE CASCADE,
    parent_id UUID NOT NULL REFERENCES academic.parent(id) ON DELETE CASCADE,
    relationship VARCHAR(20) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    can_pickup BOOLEAN DEFAULT TRUE,
    emergency_contact BOOLEAN DEFAULT FALSE,
    UNIQUE(student_id, parent_id)
);

CREATE TABLE academic.enrollment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES academic.student(id),
    class_section_id UUID NOT NULL REFERENCES academic.class_section(id),
    academic_year_id UUID NOT NULL REFERENCES academic.academic_year(id),
    roll_number VARCHAR(20),
    enrollment_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, class_section_id, academic_year_id)
);

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

CREATE TABLE academic.assessment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_section_id UUID NOT NULL REFERENCES academic.class_section(id),
    subject_id UUID NOT NULL REFERENCES academic.subject(id),
    academic_term_id UUID NOT NULL REFERENCES academic.academic_term(id),
    name VARCHAR(100) NOT NULL,
    assessment_type VARCHAR(50) NOT NULL,
    max_marks DECIMAL(5,2) NOT NULL,
    weightage DECIMAL(5,2) DEFAULT 100,
    date DATE,
    created_by UUID REFERENCES auth.user(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE academic.grade (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL REFERENCES academic.assessment(id),
    student_id UUID NOT NULL REFERENCES academic.student(id),
    marks_obtained DECIMAL(5,2),
    grade_letter VARCHAR(5),
    grade_point DECIMAL(3,2),
    remarks TEXT,
    graded_by UUID REFERENCES auth.user(id),
    graded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(assessment_id, student_id)
);

-- ============================================================
-- ISLAMIC SCHEMA
-- ============================================================

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

CREATE TABLE islamic.hafiz_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES academic.student(id) UNIQUE,
    gibbon_person_id INT,
    enrollment_date DATE NOT NULL,
    target_completion_date DATE,
    current_juz SMALLINT DEFAULT 1 CHECK (current_juz BETWEEN 1 AND 30),
    total_surahs_completed INT DEFAULT 0,
    total_verses_memorized INT DEFAULT 0,
    overall_progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    hafiz_status hafiz_status DEFAULT 'enrolled',
    graduation_date DATE,
    certificate_number VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE islamic.tajweed_assessment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES academic.student(id),
    gibbon_person_id INT,
    assessment_date DATE NOT NULL,
    assessment_type VARCHAR(30) NOT NULL,
    makhraj_score DECIMAL(5,2),
    sifat_score DECIMAL(5,2),
    rules_application_score DECIMAL(5,2),
    fluency_score DECIMAL(5,2),
    overall_score DECIMAL(5,2),
    level_achieved tajweed_level,
    assessor_id UUID REFERENCES auth.user(id),
    assessor_comments TEXT,
    audio_recording_url VARCHAR(500),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE islamic.hadith_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES academic.student(id),
    gibbon_person_id INT,
    collection_name VARCHAR(100) NOT NULL,
    book_number INT,
    hadith_number INT NOT NULL,
    hadith_text_arabic TEXT,
    hadith_text_translation TEXT,
    study_status VARCHAR(20) DEFAULT 'not_started',
    memorized BOOLEAN DEFAULT FALSE,
    understood BOOLEAN DEFAULT FALSE,
    quiz_score DECIMAL(5,2),
    study_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE islamic.prayer_attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES academic.student(id),
    gibbon_person_id INT,
    prayer_date DATE NOT NULL,
    fajr_attended BOOLEAN DEFAULT FALSE,
    dhuhr_attended BOOLEAN DEFAULT FALSE,
    asr_attended BOOLEAN DEFAULT FALSE,
    maghrib_attended BOOLEAN DEFAULT FALSE,
    isha_attended BOOLEAN DEFAULT FALSE,
    fajr_time TIME,
    dhuhr_time TIME,
    asr_time TIME,
    maghrib_time TIME,
    isha_time TIME,
    location VARCHAR(100),
    recorded_by UUID REFERENCES auth.user(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, prayer_date)
);

CREATE TABLE islamic.islamic_event (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_name_arabic VARCHAR(200) NOT NULL,
    event_name_english VARCHAR(200) NOT NULL,
    event_name_bengali VARCHAR(200),
    hijri_month SMALLINT NOT NULL CHECK (hijri_month BETWEEN 1 AND 12),
    hijri_day SMALLINT NOT NULL CHECK (hijri_day BETWEEN 1 AND 30),
    event_type VARCHAR(50) NOT NULL,
    description TEXT,
    is_holiday BOOLEAN DEFAULT FALSE,
    is_recurring BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- FINANCIAL SCHEMA
-- ============================================================

CREATE TABLE financial.fee_structure (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    academic_year_id UUID NOT NULL REFERENCES academic.academic_year(id),
    name VARCHAR(100) NOT NULL,
    fee_type VARCHAR(50) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    frequency VARCHAR(20) NOT NULL,
    class_applicable TEXT[],
    due_day_of_month INT,
    late_fee_amount DECIMAL(12,2) DEFAULT 0,
    late_fee_after_days INT DEFAULT 15,
    is_optional BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE financial.fee_invoice (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES academic.student(id),
    fee_structure_id UUID NOT NULL REFERENCES financial.fee_structure(id),
    academic_year_id UUID NOT NULL REFERENCES academic.academic_year(id),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    late_fee DECIMAL(12,2) DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL,
    paid_amount DECIMAL(12,2) DEFAULT 0,
    balance DECIMAL(12,2) NOT NULL,
    due_date DATE NOT NULL,
    status invoice_status DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

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

CREATE TABLE financial.payment_receipt (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID NOT NULL REFERENCES financial.payment_transaction(id),
    receipt_number VARCHAR(50) UNIQUE NOT NULL,
    issued_date DATE NOT NULL,
    pdf_url VARCHAR(500),
    sent_via VARCHAR(20),
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- COMMUNICATION SCHEMA
-- ============================================================

CREATE TABLE communication.notification (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.user(id),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type notification_type DEFAULT 'info',
    reference_type VARCHAR(50),
    reference_id UUID,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    action_url VARCHAR(500),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE communication.announcement (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    title_bengali VARCHAR(255),
    content TEXT NOT NULL,
    content_bengali TEXT,
    type VARCHAR(50),
    priority VARCHAR(20) DEFAULT 'normal',
    target_audience TEXT[],
    target_classes UUID[],
    publish_date TIMESTAMPTZ,
    expiry_date TIMESTAMPTZ,
    is_published BOOLEAN DEFAULT FALSE,
    attachment_urls TEXT[],
    created_by UUID REFERENCES auth.user(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE communication.sms_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.user(id),
    phone_number VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    template VARCHAR(100),
    provider VARCHAR(50) NOT NULL,
    provider_message_id VARCHAR(100),
    status VARCHAR(20) NOT NULL,
    cost DECIMAL(10,4),
    sent_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    failed_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE communication.email_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.user(id),
    email_address VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    template VARCHAR(100),
    provider VARCHAR(50) NOT NULL,
    provider_message_id VARCHAR(100),
    status VARCHAR(20) NOT NULL,
    opened_at TIMESTAMPTZ,
    clicked_at TIMESTAMPTZ,
    sent_at TIMESTAMPTZ,
    failed_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CONTENT SCHEMA
-- ============================================================

CREATE TABLE content.page (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    title_bengali VARCHAR(255),
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT,
    content_bengali TEXT,
    template VARCHAR(100),
    meta_title VARCHAR(255),
    meta_description TEXT,
    featured_image VARCHAR(500),
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    created_by UUID REFERENCES auth.user(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE content.category (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    name_bengali VARCHAR(100),
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES content.category(id),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE content.post (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    title_bengali VARCHAR(255),
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    content_bengali TEXT,
    category_id UUID REFERENCES content.category(id),
    author_id UUID REFERENCES auth.user(id),
    featured_image VARCHAR(500),
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    views_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE content.media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255),
    mime_type VARCHAR(100),
    size BIGINT,
    path VARCHAR(500) NOT NULL,
    url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    title VARCHAR(255),
    description TEXT,
    folder VARCHAR(100),
    uploaded_by UUID REFERENCES auth.user(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- AUDIT SCHEMA
-- ============================================================

CREATE TABLE audit.audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    table_name VARCHAR(100) NOT NULL,
    record_id UUID NOT NULL,
    action VARCHAR(20) NOT NULL,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create partitions for audit_log by month
CREATE TABLE audit.audit_log_2026_01 PARTITION OF audit.audit_log
    FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');
```

### 4.2 Index Creation (PostgreSQL)

```sql
-- ============================================================
-- INDEXES FOR POSTGRESQL SCHEMA
-- ============================================================

-- Auth Schema Indexes
CREATE INDEX idx_user_email ON auth.user(email);
CREATE INDEX idx_user_status ON auth.user(status);
CREATE INDEX idx_session_user ON auth.session(user_id);
CREATE INDEX idx_session_expires ON auth.session(expires_at);
CREATE INDEX idx_user_role_user ON auth.user_role(user_id);
CREATE INDEX idx_user_role_role ON auth.user_role(role_id);

-- Academic Schema Indexes
CREATE INDEX idx_student_admission ON academic.student(admission_number);
CREATE INDEX idx_student_enrollment_status ON academic.student(enrollment_status);
CREATE INDEX idx_student_gibbon ON academic.student(gibbon_person_id);
CREATE INDEX idx_enrollment_student ON academic.enrollment(student_id);
CREATE INDEX idx_enrollment_class ON academic.enrollment(class_section_id);
CREATE INDEX idx_attendance_student ON academic.attendance(student_id);
CREATE INDEX idx_attendance_date ON academic.attendance(attendance_date);
CREATE INDEX idx_attendance_student_date ON academic.attendance(student_id, attendance_date);
CREATE INDEX idx_grade_student ON academic.grade(student_id);
CREATE INDEX idx_grade_assessment ON academic.grade(assessment_id);

-- Islamic Schema Indexes
CREATE INDEX idx_quran_student ON islamic.quran_progress(student_id);
CREATE INDEX idx_quran_surah ON islamic.quran_progress(surah_number);
CREATE INDEX idx_quran_student_surah ON islamic.quran_progress(student_id, surah_number);
CREATE INDEX idx_quran_status ON islamic.quran_progress(memorization_status);
CREATE INDEX idx_hafiz_student ON islamic.hafiz_progress(student_id);
CREATE INDEX idx_hafiz_status ON islamic.hafiz_progress(hafiz_status);
CREATE INDEX idx_tajweed_student ON islamic.tajweed_assessment(student_id);
CREATE INDEX idx_tajweed_date ON islamic.tajweed_assessment(assessment_date DESC);
CREATE INDEX idx_prayer_student ON islamic.prayer_attendance(student_id);
CREATE INDEX idx_prayer_date ON islamic.prayer_attendance(prayer_date);

-- Financial Schema Indexes
CREATE INDEX idx_invoice_student ON financial.fee_invoice(student_id);
CREATE INDEX idx_invoice_status ON financial.fee_invoice(status);
CREATE INDEX idx_invoice_due_date ON financial.fee_invoice(due_date);
CREATE INDEX idx_payment_student ON financial.payment_transaction(student_id);
CREATE INDEX idx_payment_status ON financial.payment_transaction(status);
CREATE INDEX idx_payment_gateway ON financial.payment_transaction(gateway);
CREATE INDEX idx_payment_txn_id ON financial.payment_transaction(gateway_transaction_id);

-- Communication Schema Indexes
CREATE INDEX idx_notification_user ON communication.notification(user_id);
CREATE INDEX idx_notification_unread ON communication.notification(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX idx_notification_created ON communication.notification(created_at DESC);
CREATE INDEX idx_announcement_published ON communication.announcement(is_published, publish_date);
CREATE INDEX idx_sms_log_user ON communication.sms_log(user_id);
CREATE INDEX idx_sms_log_status ON communication.sms_log(status);

-- Content Schema Indexes
CREATE INDEX idx_page_slug ON content.page(slug);
CREATE INDEX idx_page_published ON content.page(is_published);
CREATE INDEX idx_post_slug ON content.post(slug);
CREATE INDEX idx_post_category ON content.post(category_id);
CREATE INDEX idx_post_published ON content.post(is_published, published_at DESC);
CREATE INDEX idx_media_folder ON content.media(folder);

-- Audit Schema Indexes
CREATE INDEX idx_audit_table ON audit.audit_log(table_name);
CREATE INDEX idx_audit_user ON audit.audit_log(user_id);
CREATE INDEX idx_audit_record ON audit.audit_log(record_id);
CREATE INDEX idx_audit_created ON audit.audit_log(created_at DESC);
```

---

## 5. Entity Descriptions

### 5.1 Users and Authentication Entities

| Entity | Description | Key Attributes |
|--------|-------------|----------------|
| **User** | Base entity for all system users including students, teachers, parents, and admins | id, email, username, password_hash, status, last_login_at |
| **Role** | Defines user roles (admin, teacher, parent, student, staff) | id, name, is_system |
| **Permission** | Granular permissions for RBAC | id, name, resource, action |
| **User_Role** | Many-to-many relationship between users and roles | id, user_id, role_id, assigned_at |
| **Role_Permission** | Many-to-many relationship between roles and permissions | id, role_id, permission_id |
| **Session** | Active user sessions for authentication | id, user_id, token, expires_at |
| **Refresh_Token** | JWT refresh tokens for token renewal | id, user_id, token, expires_at |
| **Audit_Log** | System-wide audit trail for all data changes | id, table_name, record_id, action, old_values, new_values |

### 5.2 Students and Enrollment Entities

| Entity | Description | Key Attributes |
|--------|-------------|----------------|
| **Student** | Core student profile with personal and academic details | id, user_id, admission_number, birth_date, enrollment_status |
| **Parent** | Parent/guardian profile linked to students | id, user_id, occupation, nid_number |
| **Student_Parent** | Links students to their parents with relationship type | id, student_id, parent_id, relationship, is_primary |
| **Academic_Year** | Academic year periods (2026, 2027, etc.) | id, name, start_date, end_date, is_current |
| **Academic_Term** | Terms within academic year (1st Term, 2nd Term, Final) | id, academic_year_id, name, term_number |
| **Class_Section** | Class divisions (Class 1-A, Class 5-B, etc.) | id, class_name, section, capacity, class_teacher_id |
| **Subject** | Academic subjects taught | id, name, code, pass_marks, full_marks |
| **Enrollment** | Student enrollment in specific class for academic year | id, student_id, class_section_id, roll_number |

### 5.3 Academic Records Entities

| Entity | Description | Key Attributes |
|--------|-------------|----------------|
| **Attendance** | Daily attendance records per student | id, student_id, attendance_date, status, marked_by |
| **Timetable** | Class schedule with periods and subjects | id, class_section_id, subject_id, day_of_week, period_number |
| **Assessment** | Exams and assignments for evaluation | id, class_section_id, subject_id, name, assessment_type, max_marks |
| **Grade** | Student grades for assessments | id, assessment_id, student_id, marks_obtained, grade_letter |
| **Report_Card** | Term-wise consolidated student report | id, student_id, academic_term_id, percentage, grade, rank |
| **Exam_Schedule** | Examination dates and venues | id, class_section_id, subject_id, exam_date, venue |
| **Grade_Scale** | Grading scale configuration (A+, A, B, etc.) | id, min_percentage, max_percentage, grade_letter, grade_point |

### 5.4 Islamic Education Entities

| Entity | Description | Key Attributes |
|--------|-------------|----------------|
| **Quran_Progress** | Tracks Quran memorization by Surah and verses | id, student_id, surah_number, verse_start, verse_end, memorization_status |
| **Hafiz_Progress** | Hafiz program enrollment and progress | id, student_id, current_juz, overall_progress_percentage, hafiz_status |
| **Tajweed_Assessment** | Tajweed proficiency evaluations | id, student_id, makhraj_score, sifat_score, overall_score, level_achieved |
| **Hadith_Progress** | Hadith study tracking | id, student_id, collection_name, hadith_number, memorized, understood |
| **Prayer_Attendance** | Daily prayer attendance records | id, student_id, prayer_date, fajr_attended, dhuhr_attended, ... |
| **Islamic_Event** | Islamic calendar events and holidays | id, event_name_arabic, hijri_month, hijri_day, is_holiday |
| **Islamic_Certificate** | Certificates for Islamic achievements (Hafiz, etc.) | id, student_id, cert_type, certificate_number, issued_date |

### 5.5 Financial Entities

| Entity | Description | Key Attributes |
|--------|-------------|----------------|
| **Fee_Structure** | Fee types and amounts per class | id, name, fee_type, amount, frequency, class_applicable |
| **Fee_Invoice** | Student fee invoices | id, student_id, invoice_number, total_amount, balance, due_date, status |
| **Payment_Transaction** | Payment records with gateway details | id, fee_invoice_id, gateway, amount, status, gateway_transaction_id |
| **Payment_Receipt** | Receipts generated for payments | id, payment_id, receipt_number, pdf_url |
| **Scholarship** | Student scholarship records | id, student_id, scholarship_type, percentage, amount |
| **Fee_Discount** | Discounts applied to student fees | id, student_id, discount_type, percentage, reason |
| **Refund** | Refund records for payments | id, payment_id, amount, reason, status |

### 5.6 Communication Entities

| Entity | Description | Key Attributes |
|--------|-------------|----------------|
| **Notification** | In-app notifications for users | id, user_id, title, message, type, is_read |
| **Announcement** | School-wide announcements | id, title, content, target_audience, is_published |
| **Event** | School events with RSVP | id, title, start_datetime, location, target_audience |
| **Event_RSVP** | User responses to events | id, event_id, user_id, response |
| **Message_Thread** | Conversation threads between users | id, subject, participants |
| **Message** | Individual messages in threads | id, thread_id, sender_id, content |
| **SMS_Log** | SMS notification logs | id, phone_number, message, status, provider_message_id |
| **Email_Log** | Email notification logs | id, email_address, subject, status |
| **Push_Notification** | Mobile push notification logs | id, user_id, device_token, title, status |

### 5.7 Content Management Entities

| Entity | Description | Key Attributes |
|--------|-------------|----------------|
| **Page** | Static website pages | id, title, slug, content, is_published |
| **Post** | Blog posts and news articles | id, title, slug, content, category_id, is_published |
| **Category** | Categories for posts | id, name, slug, parent_id |
| **Tag** | Tags for content | id, name, slug |
| **Post_Tag** | Many-to-many between posts and tags | id, post_id, tag_id |
| **Media** | Uploaded files and images | id, filename, mime_type, url, uploaded_by |
| **Gallery** | Photo galleries | id, name, slug, cover_image |
| **Gallery_Image** | Images in galleries | id, gallery_id, media_id, caption |
| **Menu** | Navigation menus | id, name, location |
| **Menu_Item** | Menu items with hierarchy | id, menu_id, parent_id, label, url |

---

## Document Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-10 | Development Team | Initial document |

---

*This document is part of the Smart Academy Database Documentation series.*
