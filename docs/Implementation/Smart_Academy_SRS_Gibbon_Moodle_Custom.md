# Smart Academy Web Portal - Software Requirements Specification (SRS)
# Implementation: Gibbon + Moodle + Custom Modules

**Document Version:** 1.0
**Date:** January 10, 2026
**Project Name:** Smart Academy Digital Portal
**Implementation Approach:** Hybrid Open Source + Custom Development
**Document Status:** Approved for Development

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | January 10, 2026 | Technical Team | Initial SRS document |

**Reviewers:**
- Project Manager
- Technical Lead
- Smart Academy Administration

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [System Overview](#2-system-overview)
3. [Architecture Design](#3-architecture-design)
4. [Platform Components](#4-platform-components)
5. [Gibbon SMS Configuration](#5-gibbon-sms-configuration)
6. [Moodle LMS Configuration](#6-moodle-lms-configuration)
7. [Custom Module Specifications](#7-custom-module-specifications)
8. [Integration Layer](#8-integration-layer)
9. [Database Design](#9-database-design)
10. [API Specifications](#10-api-specifications)
11. [User Interface Specifications](#11-user-interface-specifications)
12. [Mobile Application Specifications](#12-mobile-application-specifications)
13. [Security Specifications](#13-security-specifications)
14. [Performance Requirements](#14-performance-requirements)
15. [Testing Requirements](#15-testing-requirements)
16. [Deployment Specifications](#16-deployment-specifications)
17. [Implementation Phases](#17-implementation-phases)
18. [Appendices](#18-appendices)

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) document provides comprehensive technical specifications for implementing the Smart Academy Digital Portal using the approved hybrid approach: **Gibbon + Moodle + Custom Modules**.

This document serves as the primary reference for:
- Development team implementation guidance
- Quality assurance testing criteria
- Project stakeholder communication
- System integration specifications
- Deployment and maintenance procedures

### 1.2 Scope

The Smart Academy Digital Portal will be a comprehensive educational management system comprising:

| Component | Platform | Purpose |
|-----------|----------|---------|
| Student Management System (SMS) | Gibbon | Student records, attendance, grades, timetables |
| Learning Management System (LMS) | Moodle | Online learning, assignments, virtual classrooms |
| Public Website | Custom (Next.js) | School information, admissions, content |
| Islamic Education Module | Custom | Quran tracking, Hadith, prayer times |
| Admin Dashboard | Custom (React) | Analytics, reporting, CMS |
| Mobile Application | Custom (React Native) | Parent/student mobile access |
| Payment Integration | Custom | bKash, Nagad, SSLCommerz |
| Communication Hub | Custom + Gibbon | SMS, email, push notifications |

### 1.3 Definitions and Acronyms

| Term | Definition |
|------|------------|
| Gibbon | Open-source school management platform (https://gibbonedu.org) |
| Moodle | Open-source learning management system (https://moodle.org) |
| SMS | Student Management System (not Short Message Service in this context) |
| LMS | Learning Management System |
| SSO | Single Sign-On |
| API | Application Programming Interface |
| JWT | JSON Web Token |
| RBAC | Role-Based Access Control |
| URD | User Requirements Document |
| SRS | Software Requirements Specification |
| PWA | Progressive Web Application |
| RTL | Right-to-Left (for Arabic text) |

### 1.4 References

| Document | Version | Date |
|----------|---------|------|
| Smart Academy URD | 1.0 | January 8, 2026 |
| Implementation Options Analysis | 1.0 | January 10, 2026 |
| Content Documents List | 1.0 | January 8, 2026 |
| Gibbon Documentation | v27.0 | 2025 |
| Moodle Documentation | v4.3 | 2025 |

### 1.5 Document Organization

This SRS is organized to provide:
1. **Sections 1-4**: Overview and architecture
2. **Sections 5-6**: Open source platform configurations
3. **Section 7**: Custom module detailed specifications
4. **Sections 8-10**: Integration, database, and API details
5. **Sections 11-14**: UI, mobile, security, and performance
6. **Sections 15-17**: Testing, deployment, and implementation phases
7. **Section 18**: Appendices and reference materials

---

## 2. System Overview

### 2.1 System Context

Smart Academy is an Islamic educational institution located in Norimpur, Ramganj, Lakshmipur, Bangladesh, serving students from PlayGroup through Class 9. The digital portal will replace the existing basic website (mysmart.academy) with a comprehensive educational management platform.

**Target Users:**
- 500+ students (growing to 2,000+)
- 400+ parents/guardians
- 40+ teachers and staff
- 10+ administrative users
- Prospective students and parents (public)
- Alumni community

### 2.2 System Objectives

| ID | Objective | Success Metric |
|----|-----------|----------------|
| OBJ-01 | Digitize student management | 100% student records digitized |
| OBJ-02 | Enable online learning | 80% teachers using LMS |
| OBJ-03 | Improve parent communication | 90% parents using portal |
| OBJ-04 | Track Islamic education | 100% Quran progress tracked |
| OBJ-05 | Automate fee collection | 70% online payments |
| OBJ-06 | Provide mobile access | 70% mobile app adoption |
| OBJ-07 | Generate actionable insights | Weekly analytics reports |

### 2.3 System Constraints

#### 2.3.1 Technical Constraints
- Must run on VPS with 4 cores, 16GB RAM initially
- Must support 2,000 concurrent users
- Must work on 3G mobile networks (5-second load time)
- Must support Bengali Unicode throughout
- Must integrate with Bangladesh payment gateways

#### 2.3.2 Business Constraints
- Budget: $65,000 - $95,000 total
- Timeline: 44 weeks (11 months) to production
- Team: 8-9 developers maximum
- Must launch before December 2026 academic year

#### 2.3.3 Regulatory Constraints
- Bangladesh data protection compliance
- Child data protection (parental consent required)
- Financial transaction logging requirements
- Educational institution regulations

### 2.4 Assumptions and Dependencies

#### 2.4.1 Assumptions
- Smart Academy has stable internet connectivity
- Users have basic smartphone access
- School administration commits to change management
- Existing student data is available for migration

#### 2.4.2 Dependencies
- Gibbon v27.0+ stable release
- Moodle v4.3+ stable release
- bKash/Nagad API availability
- Bangladesh SMS gateway availability
- Apple App Store and Google Play Store approval

---

## 3. Architecture Design

### 3.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SMART ACADEMY DIGITAL PORTAL                          │
│                     Hybrid Architecture (Gibbon + Moodle + Custom)           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                         CLIENT LAYER                                    │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │ │
│  │  │  Public  │  │  Gibbon  │  │  Moodle  │  │  Admin   │  │  Mobile  │ │ │
│  │  │ Website  │  │   SMS    │  │   LMS    │  │Dashboard │  │   Apps   │ │ │
│  │  │ (Next.js)│  │  (PHP)   │  │  (PHP)   │  │ (React)  │  │(RN/Expo) │ │ │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘ │ │
│  └───────┼─────────────┼─────────────┼─────────────┼─────────────┼───────┘ │
│          │             │             │             │             │          │
│  ┌───────┴─────────────┴─────────────┴─────────────┴─────────────┴───────┐ │
│  │                         API GATEWAY LAYER                              │ │
│  │            (Kong Gateway / Nginx Reverse Proxy + JWT Auth)             │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐ │ │
│  │  │  SSO Service (Keycloak/Custom) - Unified Authentication          │ │ │
│  │  └──────────────────────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────┬───────────────────────────────────────┘ │
│                                  │                                          │
│  ┌───────────────────────────────┴───────────────────────────────────────┐ │
│  │                       APPLICATION LAYER                                │ │
│  │                                                                        │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐│ │
│  │  │   GIBBON SMS    │  │   MOODLE LMS    │  │    CUSTOM SERVICES      ││ │
│  │  │                 │  │                 │  │                         ││ │
│  │  │ • Students      │  │ • Courses       │  │ • Islamic Module        ││ │
│  │  │ • Teachers      │  │ • Assignments   │  │ • Payment Service       ││ │
│  │  │ • Attendance    │  │ • Quizzes       │  │ • Notification Service  ││ │
│  │  │ • Grades        │  │ • Resources     │  │ • Analytics Service     ││ │
│  │  │ • Timetables    │  │ • Virtual Class │  │ • CMS Service           ││ │
│  │  │ • Fees (basic)  │  │ • Forums        │  │ • File Service          ││ │
│  │  │ • Reports       │  │ • Gradebook     │  │ • API Gateway Service   ││ │
│  │  │                 │  │                 │  │                         ││ │
│  │  │ PHP 8.2+        │  │ PHP 8.2+        │  │ Node.js 20 LTS          ││ │
│  │  └────────┬────────┘  └────────┬────────┘  └────────────┬────────────┘│ │
│  └───────────┼────────────────────┼────────────────────────┼─────────────┘ │
│              │                    │                        │                │
│  ┌───────────┴────────────────────┴────────────────────────┴─────────────┐ │
│  │                         DATA LAYER                                     │ │
│  │                                                                        │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │ │
│  │  │   MySQL 8+   │  │ PostgreSQL   │  │    Redis     │  │   MinIO/   │ │ │
│  │  │              │  │    15+       │  │     7+       │  │    S3      │ │ │
│  │  │ Gibbon DB    │  │ Custom DB    │  │   Cache      │  │   Files    │ │ │
│  │  │ Moodle DB    │  │ Analytics DB │  │   Sessions   │  │   Media    │ │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └────────────┘ │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                      EXTERNAL INTEGRATIONS                              │ │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────────┐│ │
│  │  │ bKash  │ │ Nagad  │ │SSLComm │ │  SMS   │ │ Email  │ │  Zoom/Meet ││ │
│  │  │  API   │ │  API   │ │  erz   │ │Gateway │ │SendGrid│ │    API     ││ │
│  │  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────────┘│ │
│  └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Gibbon SMS Configuration

### 5.1 Gibbon Overview

Gibbon is an open-source school management platform that will serve as the core Student Management System (SMS) for Smart Academy. It provides comprehensive features for managing students, teachers, attendance, grades, and timetables.

**Gibbon Version:** 27.0.00 or later
**License:** GNU General Public License v3
**Website:** https://gibbonedu.org
**GitHub:** https://github.com/GibbonEdu/core

### 5.2 Gibbon Module Configuration

#### 5.2.1 Core Modules to Enable

| Module | Status | URD Coverage | Customization Level |
|--------|--------|--------------|---------------------|
| User Admin | Enabled | UR-201-205, UR-401-404 | Low |
| Students | Enabled | FR-201-208 | Medium |
| Staff | Enabled | FR-628-635 | Low |
| Timetable | Enabled | FR-235-242 | Medium |
| Attendance | Enabled | FR-209-216 | Medium |
| Markbook | Enabled | FR-217-226 | Medium |
| Planner | Enabled | FR-422-427 | Low |
| Activities | Enabled | FR-137-143 | Low |
| Finance | Enabled | FR-515-522 (Basic) | High |
| Messenger | Enabled | FR-428-433, FR-530-536 | Medium |
| Reports | Enabled | FR-538-543 | High |

#### 5.2.2 Modules to Disable/Hide

| Module | Reason |
|--------|--------|
| Library | Using Moodle's digital library |
| Formal Assessment | Using Moodle for assessments |
| Free Learning | Using Moodle LMS |

### 5.3 Gibbon Customization Requirements

#### 5.3.1 Theme Customization

```php
// Custom theme configuration for Smart Academy
// Location: /themes/SmartAcademy/

$themeConfig = [
    'name' => 'Smart Academy Theme',
    'colors' => [
        'primary' => '#0F9D58',      // Islamic green
        'secondary' => '#1976D2',    // Academic blue
        'accent' => '#FFB300',       // Gold
        'text' => '#424242',         // Dark gray
        'background' => '#FFFFFF',   // White
    ],
    'logo' => '/assets/images/smart-academy-logo.png',
    'favicon' => '/assets/images/favicon.ico',
    'fonts' => [
        'primary' => 'Inter, Roboto, sans-serif',
        'bengali' => 'Kalpurush, SolaimanLipi, sans-serif',
    ],
];
```

#### 5.3.2 Language Customization

| Language | Code | Status | Notes |
|----------|------|--------|-------|
| English | en_GB | Primary | Default interface |
| Bengali | bn_BD | Required | Custom translation needed |
| Arabic | ar_SA | Optional | For Islamic content only |

**Bengali Translation Requirements:**
- All UI labels and messages
- Report templates
- Email/SMS templates
- Help documentation

#### 5.3.3 Custom Fields for Students

| Field Name | Type | Required | Purpose |
|------------|------|----------|---------|
| student_blood_group | Select | No | Medical records |
| student_birth_cert_no | Text | Yes | Government ID |
| student_nid_father | Text | No | Parent identification |
| student_nid_mother | Text | No | Parent identification |
| student_quran_level | Select | Yes | Islamic education tracking |
| student_hafiz_status | Select | Yes | Quran memorization status |
| student_transport_route | FK | No | Transportation assignment |
| student_scholarship_type | Select | No | Fee concession tracking |

#### 5.3.4 Custom Fields for Staff

| Field Name | Type | Required | Purpose |
|------------|------|----------|---------|
| staff_nid | Text | Yes | National ID |
| staff_tin | Text | No | Tax identification |
| staff_quran_qualification | Text | No | Islamic qualification |
| staff_specialization | Text | No | Teaching specialization |

### 5.4 Gibbon Integration Points

#### 5.4.1 SSO Integration

```php
// SSO Configuration for Gibbon
// File: /config.php additions

$ssoConfig = [
    'enabled' => true,
    'provider' => 'custom',
    'jwt_secret' => env('JWT_SECRET'),
    'auth_endpoint' => env('SSO_AUTH_ENDPOINT'),
    'token_endpoint' => env('SSO_TOKEN_ENDPOINT'),
    'userinfo_endpoint' => env('SSO_USERINFO_ENDPOINT'),
    'logout_endpoint' => env('SSO_LOGOUT_ENDPOINT'),
    'client_id' => env('SSO_CLIENT_ID'),
    'client_secret' => env('SSO_CLIENT_SECRET'),
];
```

#### 5.4.2 API Endpoints to Expose

| Endpoint | Method | Purpose | Used By |
|----------|--------|---------|---------|
| /api/students | GET | List students | Mobile App, Dashboard |
| /api/students/{id} | GET | Student details | Mobile App |
| /api/attendance | GET/POST | Attendance records | Mobile App |
| /api/grades | GET | Grade records | Mobile App, Dashboard |
| /api/timetable | GET | Class timetables | Mobile App |
| /api/fees | GET | Fee information | Mobile App, Payment Service |
| /api/announcements | GET | School announcements | Mobile App |

#### 5.4.3 Webhook Configuration

```php
// Gibbon webhook configuration for event notifications
$webhooks = [
    'student_created' => env('WEBHOOK_STUDENT_CREATED'),
    'student_updated' => env('WEBHOOK_STUDENT_UPDATED'),
    'attendance_marked' => env('WEBHOOK_ATTENDANCE_MARKED'),
    'grade_entered' => env('WEBHOOK_GRADE_ENTERED'),
    'fee_paid' => env('WEBHOOK_FEE_PAID'),
    'announcement_posted' => env('WEBHOOK_ANNOUNCEMENT'),
];
```

### 5.5 Gibbon Database Extensions

#### 5.5.1 Custom Tables

```sql
-- Islamic Education Tracking (extends Gibbon)
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
    FOREIGN KEY (gibbonPersonID) REFERENCES gibbonPerson(gibbonPersonID),
    FOREIGN KEY (gibbonPersonIDAssessor) REFERENCES gibbonPerson(gibbonPersonID)
);

-- Extended Fee Management
CREATE TABLE gibbonFeePaymentExtended (
    paymentID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    gibbonFinanceInvoiceID INT UNSIGNED NOT NULL,
    paymentGateway ENUM('bkash', 'nagad', 'sslcommerz', 'bank', 'cash') NOT NULL,
    transactionID VARCHAR(100),
    gatewayResponse JSON,
    paymentStatus ENUM('pending', 'completed', 'failed', 'refunded') NOT NULL,
    paidAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (gibbonFinanceInvoiceID) REFERENCES gibbonFinanceInvoice(gibbonFinanceInvoiceID)
);

-- Transportation Management
CREATE TABLE gibbonTransportRoute (
    routeID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    routeName VARCHAR(100) NOT NULL,
    routeDescription TEXT,
    driverName VARCHAR(100),
    driverPhone VARCHAR(20),
    vehicleNumber VARCHAR(20),
    vehicleCapacity INT,
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gibbonTransportStop (
    stopID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    routeID INT UNSIGNED NOT NULL,
    stopName VARCHAR(100) NOT NULL,
    stopOrder INT NOT NULL,
    pickupTime TIME,
    dropTime TIME,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    FOREIGN KEY (routeID) REFERENCES gibbonTransportRoute(routeID)
);
```

---

## 6. Moodle LMS Configuration

### 6.1 Moodle Overview

Moodle is an open-source Learning Management System that will handle online learning, assignments, quizzes, virtual classrooms, and digital resources for Smart Academy.

**Moodle Version:** 4.3 or later
**License:** GNU General Public License v3
**Website:** https://moodle.org
**GitHub:** https://github.com/moodle/moodle

### 6.2 Moodle Plugin Configuration

#### 6.2.1 Required Plugins

| Plugin | Type | Purpose | Source |
|--------|------|---------|--------|
| BigBlueButton | Activity | Virtual classroom | Moodle Plugins |
| H5P | Activity | Interactive content | Moodle Core |
| SCORM | Activity | Standardized content | Moodle Core |
| Attendance | Activity | Class attendance (LMS) | Moodle Plugins |
| Turnitin | Plagiarism | Plagiarism detection | Commercial |
| Custom Certificate | Activity | Certificate generation | Moodle Plugins |
| Level Up! | Block | Gamification | Moodle Plugins |
| Completion Progress | Block | Progress tracking | Moodle Plugins |

#### 6.2.2 Theme Configuration

| Setting | Value | Notes |
|---------|-------|-------|
| Theme | Boost (customized) | Custom child theme |
| Primary Color | #0F9D58 | Islamic green |
| Secondary Color | #1976D2 | Academic blue |
| Logo | Smart Academy logo | 200x50px |
| Compact Logo | Smart Academy icon | 50x50px |
| Login Background | Campus image | 1920x1080px |

### 6.3 Moodle Course Structure

#### 6.3.1 Course Categories

```
Smart Academy LMS
├── Early Childhood (PlayGroup - KG)
│   ├── PlayGroup Courses
│   ├── Nursery Courses
│   └── Kindergarten Courses
├── Primary Education (Class 1-5)
│   ├── Class 1
│   │   ├── English
│   │   ├── Bengali
│   │   ├── Mathematics
│   │   ├── Science
│   │   └── Islamic Studies
│   ├── Class 2
│   │   └── [Same structure]
│   └── ... (Class 3-5)
├── Secondary Education (Class 6-9)
│   ├── Class 6
│   │   ├── English
│   │   ├── Bengali
│   │   ├── Mathematics
│   │   ├── Science (General)
│   │   ├── Bangladesh & Global Studies
│   │   ├── ICT
│   │   └── Islamic Studies
│   └── ... (Class 7-9 with subject variations)
├── Islamic Education
│   ├── Quran Studies
│   ├── Hadith Studies
│   ├── Tajweed
│   ├── Seerah
│   └── Islamic Character
├── STEAM Programs
│   ├── Robotics Club
│   ├── Coding Academy
│   └── Science Club
└── Teacher Resources
    ├── Professional Development
    └── Teaching Materials
```

#### 6.3.2 Course Template Structure

```
Course Template
├── Section 0: Course Information
│   ├── Course Overview (Page)
│   ├── Syllabus (File)
│   ├── Learning Outcomes (Page)
│   └── Teacher Introduction (Page)
├── Section 1-12: Weekly/Topic Sections
│   ├── Topic Overview (Label)
│   ├── Video Lecture (URL/File)
│   ├── Reading Materials (File/Book)
│   ├── Interactive Activity (H5P)
│   ├── Practice Quiz (Quiz)
│   ├── Assignment (Assignment)
│   └── Discussion Forum (Forum)
├── Section 13: Assessment
│   ├── Mid-term Exam (Quiz)
│   ├── Final Exam (Quiz)
│   └── Project Submission (Assignment)
└── Section 14: Resources
    ├── Additional Reading (Folder)
    ├── Video Library (Folder)
    └── External Links (Page)
```

### 6.4 Moodle Integration Points

#### 6.4.1 SSO Integration with Gibbon

```php
// Moodle auth plugin configuration
// File: /auth/smartacademy/config.php

$authConfig = [
    'idp_url' => env('SSO_IDP_URL'),
    'client_id' => env('MOODLE_CLIENT_ID'),
    'client_secret' => env('MOODLE_CLIENT_SECRET'),
    'user_mapping' => [
        'username' => 'gibbon_username',
        'email' => 'email',
        'firstname' => 'preferredName',
        'lastname' => 'surname',
        'idnumber' => 'gibbonPersonID',
    ],
    'role_mapping' => [
        'student' => 'student',
        'teacher' => 'editingteacher',
        'parent' => 'parent',
        'admin' => 'manager',
    ],
];
```

#### 6.4.2 Grade Synchronization

```php
// Grade sync configuration
// Moodle grades -> Gibbon markbook

$gradeSyncConfig = [
    'enabled' => true,
    'sync_frequency' => 'hourly',
    'gibbon_api_endpoint' => env('GIBBON_API_URL') . '/grades/sync',
    'grade_items_to_sync' => [
        'assignment',
        'quiz',
        'forum',
    ],
    'aggregation_method' => 'weighted_mean',
];
```

#### 6.4.3 Enrollment Synchronization

```php
// Auto-enrollment based on Gibbon class assignments
$enrollmentSyncConfig = [
    'enabled' => true,
    'sync_frequency' => 'daily',
    'enrollment_method' => 'database',
    'role_assignments' => [
        'gibbon_student' => 'moodle_student',
        'gibbon_teacher' => 'moodle_editingteacher',
    ],
    'course_mapping_table' => 'gibbonMoodleCourseMap',
];
```

### 6.5 Moodle API Endpoints

| Endpoint | Function | Purpose |
|----------|----------|---------|
| core_user_get_users | Get users | User synchronization |
| core_course_get_courses | Get courses | Course listing |
| mod_assign_get_assignments | Get assignments | Assignment listing |
| mod_assign_get_submissions | Get submissions | Submission tracking |
| core_grades_get_grades | Get grades | Grade reporting |
| core_enrol_get_enrolled_users | Get enrollments | Enrollment tracking |
| core_calendar_get_calendar_events | Get events | Calendar sync |

---

## 7. Custom Module Specifications

### 7.1 Islamic Education Module

#### 7.1.1 Module Overview

The Islamic Education Module is a custom-built component that tracks and manages Islamic education progress, including Quran memorization, Hadith studies, Tajweed proficiency, and prayer tracking.

**Technology Stack:**
- Backend: Node.js 20 LTS with Fastify
- Database: PostgreSQL 15+
- Cache: Redis 7+
- API: RESTful with OpenAPI 3.0

#### 7.1.2 Functional Requirements

| ID | Requirement | Priority | URD Reference |
|----|-------------|----------|---------------|
| ISL-001 | Track Quran memorization progress (Surah by Surah) | Critical | FR-227 |
| ISL-002 | Monitor Hafiz progress with Juz completion | Critical | FR-228 |
| ISL-003 | Assess Tajweed proficiency levels | High | FR-229 |
| ISL-004 | Track Hadith study completion | High | FR-230 |
| ISL-005 | Manage Islamic Studies grades | Critical | FR-231 |
| ISL-006 | Track prayer attendance | Medium | FR-232 |
| ISL-007 | Generate Islamic education certificates | Medium | FR-233 |
| ISL-008 | Track Quranic completion milestones | High | FR-234 |
| ISL-009 | Calculate prayer times based on location | High | FR-901 |
| ISL-010 | Send prayer time notifications | Medium | FR-902 |
| ISL-011 | Display Qibla direction | Low | FR-903 |
| ISL-012 | Integrate Hijri calendar | High | FR-905 |
| ISL-013 | Display Islamic holidays | High | FR-906 |
| ISL-014 | Show Ramadan features (Iftar/Suhoor times) | Medium | FR-908 |
| ISL-015 | Provide digital Quran with translation | High | FR-909 |
| ISL-016 | Access Hadith collections | High | FR-910 |
| ISL-017 | Play audio recitations | Medium | FR-911 |
| ISL-018 | Display daily Quran verse | Low | FR-913 |
| ISL-019 | Display daily Hadith | Low | FR-914 |

#### 7.1.3 Database Schema

```sql
-- Islamic Education Module Database Schema
-- Database: PostgreSQL 15+

-- Quran Progress Table
CREATE TABLE quran_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id VARCHAR(50) NOT NULL,
    gibbon_person_id INT NOT NULL,
    surah_number INT NOT NULL CHECK (surah_number BETWEEN 1 AND 114),
    surah_name_arabic VARCHAR(50) NOT NULL,
    surah_name_english VARCHAR(50) NOT NULL,
    juz_number INT CHECK (juz_number BETWEEN 1 AND 30),
    verse_start INT NOT NULL,
    verse_end INT NOT NULL,
    memorization_status VARCHAR(20) DEFAULT 'not_started',
    revision_count INT DEFAULT 0,
    last_revision_date DATE,
    teacher_assessment_score DECIMAL(5,2),
    teacher_comments TEXT,
    assessed_by VARCHAR(50),
    assessed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_status CHECK (memorization_status IN ('not_started', 'in_progress', 'memorized', 'mastered'))
);

-- Hafiz Progress Table
CREATE TABLE hafiz_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id VARCHAR(50) NOT NULL,
    gibbon_person_id INT NOT NULL,
    enrollment_date DATE NOT NULL,
    target_completion_date DATE,
    current_juz INT DEFAULT 1,
    total_surahs_completed INT DEFAULT 0,
    total_verses_memorized INT DEFAULT 0,
    overall_progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    hafiz_status VARCHAR(20) DEFAULT 'enrolled',
    graduation_date DATE,
    certificate_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_hafiz_status CHECK (hafiz_status IN ('enrolled', 'active', 'paused', 'completed', 'graduated'))
);

-- Tajweed Assessment Table
CREATE TABLE tajweed_assessment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id VARCHAR(50) NOT NULL,
    gibbon_person_id INT NOT NULL,
    assessment_date DATE NOT NULL,
    assessment_type VARCHAR(30) NOT NULL,
    makhraj_score DECIMAL(5,2),
    sifat_score DECIMAL(5,2),
    rules_application_score DECIMAL(5,2),
    fluency_score DECIMAL(5,2),
    overall_score DECIMAL(5,2),
    level_achieved VARCHAR(20),
    assessor_id VARCHAR(50),
    assessor_comments TEXT,
    audio_recording_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_tajweed_level CHECK (level_achieved IN ('beginner', 'elementary', 'intermediate', 'advanced', 'expert'))
);

-- Hadith Study Progress Table
CREATE TABLE hadith_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id VARCHAR(50) NOT NULL,
    gibbon_person_id INT NOT NULL,
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_hadith_status CHECK (study_status IN ('not_started', 'reading', 'studying', 'memorizing', 'completed'))
);

-- Prayer Attendance Table
CREATE TABLE prayer_attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id VARCHAR(50) NOT NULL,
    gibbon_person_id INT NOT NULL,
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
    recorded_by VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (student_id, prayer_date)
);

-- Islamic Calendar Events Table
CREATE TABLE islamic_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_name_arabic VARCHAR(200) NOT NULL,
    event_name_english VARCHAR(200) NOT NULL,
    event_name_bengali VARCHAR(200),
    hijri_month INT NOT NULL CHECK (hijri_month BETWEEN 1 AND 12),
    hijri_day INT NOT NULL CHECK (hijri_day BETWEEN 1 AND 30),
    event_type VARCHAR(50) NOT NULL,
    description TEXT,
    is_holiday BOOLEAN DEFAULT FALSE,
    is_recurring BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_event_type CHECK (event_type IN ('eid', 'fasting', 'historical', 'commemoration', 'school_event'))
);

-- Indexes for performance
CREATE INDEX idx_quran_progress_student ON quran_progress(student_id);
CREATE INDEX idx_quran_progress_surah ON quran_progress(surah_number);
CREATE INDEX idx_hafiz_progress_student ON hafiz_progress(student_id);
CREATE INDEX idx_tajweed_student_date ON tajweed_assessment(student_id, assessment_date);
CREATE INDEX idx_hadith_student ON hadith_progress(student_id);
CREATE INDEX idx_prayer_student_date ON prayer_attendance(student_id, prayer_date);
```

#### 7.1.4 API Endpoints

```yaml
# Islamic Education Module API Specification
# OpenAPI 3.0

openapi: 3.0.3
info:
  title: Smart Academy Islamic Education API
  version: 1.0.0
  description: API for Islamic Education tracking and management

paths:
  # Quran Progress
  /api/v1/islamic/quran/progress:
    get:
      summary: Get student's Quran progress
      parameters:
        - name: studentId
          in: query
          required: true
          schema:
            type: string
      responses:
        200:
          description: Quran progress data
    post:
      summary: Record new Quran progress
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/QuranProgressInput'
      responses:
        201:
          description: Progress recorded

  /api/v1/islamic/quran/progress/{id}:
    put:
      summary: Update Quran progress entry
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        200:
          description: Progress updated

  # Hafiz Program
  /api/v1/islamic/hafiz/enrollment:
    post:
      summary: Enroll student in Hafiz program
      responses:
        201:
          description: Enrollment successful

  /api/v1/islamic/hafiz/progress/{studentId}:
    get:
      summary: Get Hafiz progress
      responses:
        200:
          description: Hafiz progress data

  # Tajweed Assessment
  /api/v1/islamic/tajweed/assessment:
    post:
      summary: Record Tajweed assessment
      responses:
        201:
          description: Assessment recorded

  /api/v1/islamic/tajweed/history/{studentId}:
    get:
      summary: Get assessment history
      responses:
        200:
          description: Assessment history

  # Hadith Studies
  /api/v1/islamic/hadith/progress:
    get:
      summary: Get Hadith study progress
      responses:
        200:
          description: Hadith progress
    post:
      summary: Record Hadith study
      responses:
        201:
          description: Progress recorded

  # Prayer Times
  /api/v1/islamic/prayer/times:
    get:
      summary: Get prayer times for location
      parameters:
        - name: latitude
          in: query
          schema:
            type: number
        - name: longitude
          in: query
          schema:
            type: number
        - name: date
          in: query
          schema:
            type: string
            format: date
      responses:
        200:
          description: Prayer times

  /api/v1/islamic/prayer/attendance:
    post:
      summary: Record prayer attendance
      responses:
        201:
          description: Attendance recorded

  # Islamic Calendar
  /api/v1/islamic/calendar/events:
    get:
      summary: Get Islamic calendar events
      parameters:
        - name: year
          in: query
          schema:
            type: integer
        - name: month
          in: query
          schema:
            type: integer
      responses:
        200:
          description: Calendar events

  /api/v1/islamic/calendar/hijri:
    get:
      summary: Convert Gregorian to Hijri date
      parameters:
        - name: date
          in: query
          schema:
            type: string
            format: date
      responses:
        200:
          description: Hijri date

  # Daily Content
  /api/v1/islamic/daily/verse:
    get:
      summary: Get daily Quran verse
      responses:
        200:
          description: Daily verse

  /api/v1/islamic/daily/hadith:
    get:
      summary: Get daily Hadith
      responses:
        200:
          description: Daily Hadith

components:
  schemas:
    QuranProgressInput:
      type: object
      required:
        - studentId
        - surahNumber
        - verseStart
        - verseEnd
      properties:
        studentId:
          type: string
        surahNumber:
          type: integer
          minimum: 1
          maximum: 114
        verseStart:
          type: integer
        verseEnd:
          type: integer
        memorizationStatus:
          type: string
          enum: [not_started, in_progress, memorized, mastered]
        teacherComments:
          type: string
```

### 3.2 Component Architecture

#### 3.2.1 Component Responsibility Matrix

| Component | Technology | Responsibility | URD Coverage |
|-----------|------------|----------------|--------------|
| Gibbon SMS | PHP 8.2, MySQL | Student records, attendance, grades, timetables, basic fees | FR-201 to FR-242, FR-501 to FR-542 |
| Moodle LMS | PHP 8.2, MySQL | Courses, assignments, quizzes, virtual classroom, digital library | FR-301 to FR-342 |
| Public Website | Next.js 14, React | School information, admissions, news, events | FR-101 to FR-167 |
| Islamic Module | Node.js, PostgreSQL | Quran tracking, Hadith, prayer times, Islamic calendar | FR-227 to FR-234, FR-901 to FR-914 |
| Admin Dashboard | React 18, Node.js | Analytics, reports, CMS, system management | FR-601 to FR-652 |
| Payment Service | Node.js, PostgreSQL | bKash, Nagad, SSLCommerz integration | FR-416 to FR-423, FR-617 to FR-627 |
| Communication Hub | Node.js, Redis | SMS, email, push notifications | FR-701 to FR-732 |
| Mobile App | React Native, Expo | Parent/student mobile access | FR-401 to FR-439 |
| SSO Service | Keycloak/Custom | Unified authentication across all platforms | NFR-301 to NFR-307 |

### 3.3 Technology Stack Specification

#### 3.3.1 Open Source Platforms

| Platform | Version | License | Purpose |
|----------|---------|---------|---------|
| Gibbon | 27.0.00+ | GPL v3 | Student Management System |
| Moodle | 4.3+ | GPL v3 | Learning Management System |

#### 3.3.2 Custom Development Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Frontend** |
| Framework | Next.js | 14.x | Public website, SSR |
| UI Library | React | 18.x | Component-based UI |
| Styling | Tailwind CSS | 3.x | Utility-first CSS |
| Components | Shadcn/ui | Latest | Pre-built components |
| State | Zustand | 4.x | State management |
| Forms | React Hook Form | 7.x | Form handling |
| Charts | Recharts | 2.x | Data visualization |
| **Backend** |
| Runtime | Node.js | 20 LTS | Server runtime |
| Framework | Fastify | 4.x | API framework |
| ORM | Prisma | 5.x | Database ORM |
| Validation | Zod | 3.x | Schema validation |
| Auth | JWT + Passport | - | Authentication |
| **Mobile** |
| Framework | React Native | 0.73+ | Cross-platform mobile |
| Toolchain | Expo | 50+ | Development toolchain |
| Navigation | React Navigation | 6.x | Screen navigation |
| **Database** |
| Primary (PHP) | MySQL | 8.0+ | Gibbon/Moodle data |
| Primary (Node) | PostgreSQL | 15+ | Custom module data |
| Cache | Redis | 7+ | Session, cache |
| Search | Meilisearch | 1.x | Full-text search |
| **Infrastructure** |
| Web Server | Nginx | 1.24+ | Reverse proxy |
| Process Manager | PM2 | 5.x | Node.js process |
| Container | Docker | 24+ | Containerization |
| CI/CD | GitHub Actions | - | Automation |

### 3.4 Network Architecture

```
                                    ┌─────────────────┐
                                    │   Cloudflare    │
                                    │   (CDN + WAF)   │
                                    └────────┬────────┘
                                             │
                                    ┌────────┴────────┐
                                    │   Load Balancer │
                                    │    (Optional)   │
                                    └────────┬────────┘
                                             │
                    ┌────────────────────────┼────────────────────────┐
                    │                        │                        │
           ┌────────┴────────┐     ┌────────┴────────┐     ┌────────┴────────┐
           │  Web Server 1   │     │  Web Server 2   │     │   API Server    │
           │    (Nginx)      │     │    (Nginx)      │     │   (Node.js)     │
           │                 │     │                 │     │                 │
           │ • Public Site   │     │ • Gibbon        │     │ • Custom APIs   │
           │ • Admin UI      │     │ • Moodle        │     │ • Mobile APIs   │
           └────────┬────────┘     └────────┬────────┘     └────────┬────────┘
                    │                        │                        │
                    └────────────────────────┼────────────────────────┘
                                             │
                    ┌────────────────────────┼────────────────────────┐
                    │                        │                        │
           ┌────────┴────────┐     ┌────────┴────────┐     ┌────────┴────────┐
           │   MySQL Server  │     │ PostgreSQL      │     │  Redis Server   │
           │                 │     │    Server       │     │                 │
           │ • Gibbon DB     │     │ • Custom DB     │     │ • Cache         │
           │ • Moodle DB     │     │ • Analytics     │     │ • Sessions      │
           └─────────────────┘     └─────────────────┘     └─────────────────┘
```

### 3.5 Security Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        SECURITY LAYERS                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Layer 1: Edge Security                                                  │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ • Cloudflare WAF (Web Application Firewall)                        │ │
│  │ • DDoS Protection                                                   │ │
│  │ • SSL/TLS Termination                                              │ │
│  │ • Bot Protection                                                    │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  Layer 2: Application Security                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ • JWT Authentication with Refresh Tokens                           │ │
│  │ • Role-Based Access Control (RBAC)                                 │ │
│  │ • Rate Limiting (1000 req/hour/user)                               │ │
│  │ • Input Validation (Zod schemas)                                   │ │
│  │ • CORS Configuration                                               │ │
│  │ • CSRF Protection                                                  │ │
│  │ • XSS Prevention (Content Security Policy)                         │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  Layer 3: Data Security                                                  │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ • Encryption at Rest (AES-256)                                     │ │
│  │ • Encryption in Transit (TLS 1.3)                                  │ │
│  │ • Password Hashing (bcrypt, cost 12)                               │ │
│  │ • Sensitive Data Masking in Logs                                   │ │
│  │ • Database Connection Encryption                                   │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  Layer 4: Infrastructure Security                                        │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ • VPC with Private Subnets                                         │ │
│  │ • Security Groups / Firewall Rules                                 │ │
│  │ • SSH Key-Based Access Only                                        │ │
│  │ • Regular Security Patches                                         │ │
│  │ • Intrusion Detection System                                       │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  Layer 5: Monitoring & Audit                                             │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ • Comprehensive Audit Logging                                      │ │
│  │ • Real-time Security Monitoring                                    │ │
│  │ • Anomaly Detection                                                │ │
│  │ • Incident Response Procedures                                     │ │
│  └────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Platform Components

### 4.1 Component Overview

The Smart Academy Digital Portal consists of three main component categories:

#### 4.1.1 Open Source Components (68% of requirements)

| Component | Coverage | Key Modules |
|-----------|----------|-------------|
| **Gibbon SMS** | ~45% | Students, Teachers, Attendance, Grades, Timetables, Basic Reports |
| **Moodle LMS** | ~23% | Courses, Assignments, Quizzes, Forums, Resources, Virtual Classroom |

#### 4.1.2 Custom Components (32% of requirements)

| Component | Coverage | Key Features |
|-----------|----------|--------------|
| **Public Website** | ~8% | Homepage, About, Admissions, News, Events |
| **Islamic Module** | ~7% | Quran tracking, Hadith, Prayer times, Hijri calendar |
| **Admin Dashboard** | ~6% | Analytics, Reports, CMS, System management |
| **Payment Service** | ~4% | bKash, Nagad, SSLCommerz, Fee management |
| **Mobile Application** | ~5% | Parent app, Student app, Push notifications |
| **Communication Hub** | ~2% | SMS gateway, Email templates, Notifications |

### 4.2 URD to Component Mapping

#### 4.2.1 Functional Requirements Mapping

| URD Section | FR Range | Primary Component | Secondary Component |
|-------------|----------|-------------------|---------------------|
| Public Website | FR-101 to FR-167 | Custom (Next.js) | - |
| Student Management | FR-201 to FR-242 | Gibbon | Custom (Islamic) |
| Learning Management | FR-301 to FR-342 | Moodle | - |
| Parent Portal | FR-401 to FR-439 | Custom (Mobile) | Gibbon API |
| Teacher Portal | FR-501 to FR-542 | Gibbon | Moodle |
| Admin Dashboard | FR-601 to FR-652 | Custom (React) | Gibbon + Moodle |
| Communication Hub | FR-701 to FR-732 | Custom (Node.js) | Gibbon |
| Calendar & Events | FR-801 to FR-816 | Gibbon | Custom |
| Islamic Features | FR-901 to FR-914 | Custom (Node.js) | - |
| Transportation | FR-1001 to FR-1009 | Gibbon | Custom |
| Alumni | FR-1101 to FR-1109 | Custom | - |

### 4.3 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         DATA FLOW DIAGRAM                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────┐         ┌──────────┐         ┌──────────┐                 │
│  │  Parent  │────────▶│  Mobile  │────────▶│   API    │                 │
│  │          │         │   App    │         │ Gateway  │                 │
│  └──────────┘         └──────────┘         └────┬─────┘                 │
│                                                  │                       │
│  ┌──────────┐         ┌──────────┐              │                       │
│  │ Student  │────────▶│  Mobile  │──────────────┤                       │
│  │          │         │   App    │              │                       │
│  └──────────┘         └──────────┘              │                       │
│                                                  │                       │
│  ┌──────────┐         ┌──────────┐              │                       │
│  │ Teacher  │────────▶│  Gibbon  │──────────────┤                       │
│  │          │         │   Web    │              │                       │
│  └──────────┘         └──────────┘              │                       │
│                                                  │                       │
│  ┌──────────┐         ┌──────────┐              │                       │
│  │  Admin   │────────▶│ Dashboard│──────────────┤                       │
│  │          │         │   Web    │              │                       │
│  └──────────┘         └──────────┘              │                       │
│                                                  │                       │
│                                                  ▼                       │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                      SERVICE LAYER                                │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐│  │
│  │  │ Gibbon  │  │ Moodle  │  │ Islamic │  │ Payment │  │Notifica-││  │
│  │  │ Service │  │ Service │  │ Service │  │ Service │  │  tion   ││  │
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘│  │
│  └───────┼───────────┼───────────┼───────────┼───────────┼─────────┘  │
│          │           │           │           │           │            │
│          ▼           ▼           ▼           ▼           ▼            │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                      DATA LAYER                                   │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐│  │
│  │  │    MySQL     │  │  PostgreSQL  │  │         Redis            ││  │
│  │  │  (Gibbon +   │  │   (Custom    │  │   (Cache + Sessions +    ││  │
│  │  │   Moodle)    │  │    Data)     │  │      Message Queue)      ││  │
│  │  └──────────────┘  └──────────────┘  └──────────────────────────┘│  │
│  └──────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Payment Service Module

#### 7.2.1 Module Overview

The Payment Service handles all financial transactions including fee collection through Bangladesh payment gateways (bKash, Nagad, SSLCommerz).

**Technology Stack:**
- Backend: Node.js 20 LTS with Fastify
- Database: PostgreSQL 15+
- Queue: Redis + BullMQ for transaction processing

#### 7.2.2 Functional Requirements

| ID | Requirement | Priority | URD Reference |
|----|-------------|----------|---------------|
| PAY-001 | Display fee structure by class | Critical | FR-416 |
| PAY-002 | Show outstanding balance | Critical | FR-417 |
| PAY-003 | Display payment history | Critical | FR-418 |
| PAY-004 | Process bKash payments | Critical | FR-419 |
| PAY-005 | Process Nagad payments | Critical | FR-419 |
| PAY-006 | Process SSLCommerz payments | Critical | FR-419 |
| PAY-007 | Generate payment receipts | Critical | FR-420 |
| PAY-008 | Setup automatic payments | Medium | FR-421 |
| PAY-009 | Send payment reminders | High | FR-422 |
| PAY-010 | Manage installment plans | Medium | FR-423 |
| PAY-011 | Process refunds | Medium | FR-522 |
| PAY-012 | Generate financial reports | High | FR-624 |

#### 7.2.3 Payment Gateway Integration

**bKash Integration:**
```javascript
// bKash Payment Configuration
const bkashConfig = {
  baseURL: process.env.BKASH_BASE_URL,
  appKey: process.env.BKASH_APP_KEY,
  appSecret: process.env.BKASH_APP_SECRET,
  username: process.env.BKASH_USERNAME,
  password: process.env.BKASH_PASSWORD,
  callbackURL: `${process.env.APP_URL}/api/v1/payments/bkash/callback`,
};

// Payment Flow
// 1. Create Payment -> Get paymentID
// 2. Execute Payment -> Confirm transaction
// 3. Query Payment -> Verify status
// 4. Webhook -> Handle IPN callback
```

**Nagad Integration:**
```javascript
// Nagad Payment Configuration
const nagadConfig = {
  baseURL: process.env.NAGAD_BASE_URL,
  merchantID: process.env.NAGAD_MERCHANT_ID,
  merchantPrivateKey: process.env.NAGAD_PRIVATE_KEY,
  pgPublicKey: process.env.NAGAD_PG_PUBLIC_KEY,
  callbackURL: `${process.env.APP_URL}/api/v1/payments/nagad/callback`,
};
```

**SSLCommerz Integration:**
```javascript
// SSLCommerz Configuration
const sslConfig = {
  storeID: process.env.SSL_STORE_ID,
  storePassword: process.env.SSL_STORE_PASSWORD,
  isSandbox: process.env.NODE_ENV !== 'production',
  successURL: `${process.env.APP_URL}/api/v1/payments/ssl/success`,
  failURL: `${process.env.APP_URL}/api/v1/payments/ssl/fail`,
  cancelURL: `${process.env.APP_URL}/api/v1/payments/ssl/cancel`,
  ipnURL: `${process.env.APP_URL}/api/v1/payments/ssl/ipn`,
};
```

#### 7.2.4 Database Schema

```sql
-- Payment Service Database Schema

-- Fee Structures
CREATE TABLE fee_structures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    academic_year VARCHAR(20) NOT NULL,
    class_level VARCHAR(20) NOT NULL,
    fee_type VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    frequency VARCHAR(20) NOT NULL,
    due_day INT,
    late_fee_amount DECIMAL(10,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_frequency CHECK (frequency IN ('monthly', 'quarterly', 'yearly', 'one_time'))
);

-- Student Fee Accounts
CREATE TABLE student_fee_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id VARCHAR(50) NOT NULL,
    gibbon_person_id INT NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    total_due DECIMAL(10,2) DEFAULT 0,
    total_paid DECIMAL(10,2) DEFAULT 0,
    balance DECIMAL(10,2) DEFAULT 0,
    last_payment_date DATE,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payment Transactions
CREATE TABLE payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id VARCHAR(50) NOT NULL,
    account_id UUID REFERENCES student_fee_accounts(id),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'BDT',
    payment_gateway VARCHAR(20) NOT NULL,
    gateway_transaction_id VARCHAR(100),
    gateway_response JSONB,
    status VARCHAR(20) DEFAULT 'pending',
    fee_type VARCHAR(50),
    payment_month VARCHAR(20),
    initiated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    refunded_at TIMESTAMP,
    refund_amount DECIMAL(10,2),
    receipt_number VARCHAR(50),
    notes TEXT,
    CONSTRAINT valid_gateway CHECK (payment_gateway IN ('bkash', 'nagad', 'sslcommerz', 'bank', 'cash')),
    CONSTRAINT valid_status CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'))
);

-- Payment Receipts
CREATE TABLE payment_receipts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID REFERENCES payment_transactions(id),
    receipt_number VARCHAR(50) UNIQUE NOT NULL,
    student_name VARCHAR(200),
    student_class VARCHAR(50),
    amount DECIMAL(10,2) NOT NULL,
    amount_in_words VARCHAR(500),
    payment_method VARCHAR(50),
    payment_date DATE NOT NULL,
    fee_details JSONB,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pdf_url VARCHAR(500)
);

-- Indexes
CREATE INDEX idx_transactions_student ON payment_transactions(student_id);
CREATE INDEX idx_transactions_status ON payment_transactions(status);
CREATE INDEX idx_transactions_date ON payment_transactions(initiated_at);
CREATE INDEX idx_accounts_student ON student_fee_accounts(student_id);
```

### 7.3 Admin Dashboard Module

#### 7.3.1 Module Overview

The Admin Dashboard provides comprehensive analytics, reporting, content management, and system administration capabilities.

**Technology Stack:**
- Frontend: React 18 with Vite
- Backend: Node.js with Fastify
- Charts: Recharts
- Tables: TanStack Table
- State: Zustand

#### 7.3.2 Dashboard Features

| Feature | Description | URD Reference |
|---------|-------------|---------------|
| KPI Dashboard | Real-time metrics display | FR-601 |
| Student Analytics | Enrollment, attendance trends | FR-603, FR-606 |
| Academic Analytics | Grade distributions, performance | FR-604 |
| Financial Dashboard | Revenue, payments, dues | FR-605 |
| Report Generator | Custom report builder | FR-637 |
| CMS | Content management for website | FR-644-652 |
| User Management | Roles, permissions | FR-644-646 |
| System Settings | Configuration management | FR-647 |

#### 7.3.3 Dashboard Widgets

```typescript
// Dashboard Widget Configuration
interface DashboardWidget {
  id: string;
  title: string;
  type: 'stat' | 'chart' | 'table' | 'list';
  size: 'small' | 'medium' | 'large';
  dataSource: string;
  refreshInterval: number; // in seconds
}

const defaultWidgets: DashboardWidget[] = [
  { id: 'total-students', title: 'Total Students', type: 'stat', size: 'small', dataSource: '/api/stats/students', refreshInterval: 300 },
  { id: 'attendance-today', title: "Today's Attendance", type: 'stat', size: 'small', dataSource: '/api/stats/attendance/today', refreshInterval: 60 },
  { id: 'fee-collection', title: 'Fee Collection (Month)', type: 'stat', size: 'small', dataSource: '/api/stats/fees/month', refreshInterval: 300 },
  { id: 'enrollment-trend', title: 'Enrollment Trend', type: 'chart', size: 'medium', dataSource: '/api/analytics/enrollment', refreshInterval: 3600 },
  { id: 'grade-distribution', title: 'Grade Distribution', type: 'chart', size: 'medium', dataSource: '/api/analytics/grades', refreshInterval: 3600 },
  { id: 'recent-payments', title: 'Recent Payments', type: 'table', size: 'large', dataSource: '/api/payments/recent', refreshInterval: 120 },
  { id: 'upcoming-events', title: 'Upcoming Events', type: 'list', size: 'small', dataSource: '/api/events/upcoming', refreshInterval: 600 },
];
```

### 7.4 Mobile Application Module

#### 7.4.1 Module Overview

The Mobile Application provides parent and student access to the portal via native iOS and Android apps.

**Technology Stack:**
- Framework: React Native 0.73+
- Toolchain: Expo SDK 50+
- Navigation: React Navigation 6
- State: Zustand
- API: React Query (TanStack Query)

#### 7.4.2 App Features

| Feature | Parent App | Student App | URD Reference |
|---------|------------|-------------|---------------|
| Dashboard | ✅ | ✅ | FR-401-407 |
| Attendance View | ✅ | ✅ | FR-412 |
| Grades & Results | ✅ | ✅ | FR-408-411 |
| Fee Payment | ✅ | ❌ | FR-416-423 |
| Timetable | ✅ | ✅ | FR-413 |
| Announcements | ✅ | ✅ | FR-425 |
| Messages | ✅ | ✅ | FR-424 |
| Islamic Progress | ✅ | ✅ | FR-314-317 |
| Push Notifications | ✅ | ✅ | FR-431 |
| Offline Mode | ✅ | ✅ | FR-434 |
| Biometric Login | ✅ | ✅ | FR-433 |

#### 7.4.3 App Navigation Structure

```
Smart Academy App
├── Auth Stack
│   ├── Login Screen
│   ├── Forgot Password
│   └── OTP Verification
├── Main Tab Navigator
│   ├── Home Tab
│   │   ├── Dashboard
│   │   ├── Announcements
│   │   └── Quick Actions
│   ├── Academic Tab
│   │   ├── Attendance
│   │   ├── Grades
│   │   ├── Timetable
│   │   └── Assignments
│   ├── Islamic Tab
│   │   ├── Quran Progress
│   │   ├── Prayer Times
│   │   └── Islamic Calendar
│   ├── Fees Tab (Parent Only)
│   │   ├── Fee Summary
│   │   ├── Pay Now
│   │   └── Payment History
│   └── More Tab
│       ├── Profile
│       ├── Messages
│       ├── Settings
│       └── Help
└── Modal Screens
    ├── Payment Gateway
    ├── Document Viewer
    └── Contact Teacher
```

---

## 8. Implementation Phases

### 8.1 Phase Overview

| Phase | Duration | Focus | Deliverables |
|-------|----------|-------|--------------|
| Phase 1 | Weeks 1-8 | Foundation | Gibbon + Moodle setup, SSO |
| Phase 2 | Weeks 9-18 | Islamic Module | Complete Islamic education tracking |
| Phase 3 | Weeks 15-22 | Bangladesh Integrations | Payment gateways, SMS |
| Phase 4 | Weeks 19-26 | Admin Dashboard | Analytics, CMS |
| Phase 5 | Weeks 23-34 | Mobile Application | iOS and Android apps |
| Phase 6 | Weeks 35-44 | Testing & Deployment | UAT, launch |

### 8.2 Phase 1: Foundation (Weeks 1-8)

**Objectives:**
- Setup Gibbon SMS with customizations
- Setup Moodle LMS with plugins
- Implement SSO between systems
- Basic branding and UI customization
- Multi-language support (English, Bengali)

**Deliverables:**
- Gibbon operational with student/teacher data
- Moodle operational with course structure
- SSO working between platforms
- Custom Smart Academy theme applied
- Bengali language interface

**Team:**
- 2 PHP Developers
- 1 DevOps Engineer

### 8.3 Phase 2: Islamic Module (Weeks 9-18)

**Objectives:**
- Develop Quran memorization tracking
- Implement Hadith study management
- Create Tajweed assessment system
- Build prayer time and Hijri calendar
- Integrate with Gibbon database

**Deliverables:**
- Complete Quran progress tracking
- Hadith study module
- Tajweed assessment tools
- Prayer times widget
- Islamic calendar integration

**Team:**
- 2 Node.js Developers
- 1 Frontend Developer

### 8.4 Phase 3: Bangladesh Integrations (Weeks 15-22)

**Objectives:**
- Integrate bKash payment gateway
- Integrate Nagad payment gateway
- Integrate SSLCommerz for cards
- Setup Bengali SMS gateway
- Configure email notifications

**Deliverables:**
- All payment gateways working
- SMS notifications functional
- Email system configured
- Payment receipt generation
- Transaction reporting

**Team:**
- 2 Backend Developers

### 8.5 Phase 4: Admin Dashboard (Weeks 19-26)

**Objectives:**
- Develop custom analytics dashboard
- Create comprehensive reporting
- Build CMS features
- Implement data visualization
- Create role-based access

**Deliverables:**
- Executive dashboard
- Report generator
- Content management system
- User management interface
- System configuration panel

**Team:**
- 2 Full-stack Developers
- 1 UI/UX Designer

### 8.6 Phase 5: Mobile Application (Weeks 23-34)

**Objectives:**
- Develop React Native parent app
- Implement student app features
- Integrate with APIs
- Implement push notifications
- Add offline support

**Deliverables:**
- iOS app (App Store ready)
- Android app (Play Store ready)
- Push notification system
- Offline data sync
- Biometric authentication

**Team:**
- 2 Mobile Developers

### 8.7 Phase 6: Testing & Deployment (Weeks 35-44)

**Objectives:**
- Comprehensive UAT
- Performance optimization
- Security audit
- Data migration
- User training
- Production deployment

**Deliverables:**
- Test reports
- Security audit report
- Migration scripts
- Training materials
- Production environment
- Go-live

**Team:**
- 2 QA Engineers
- 1 DevOps Engineer
- Full team for support

---

## 9. Testing Requirements

### 9.1 Testing Strategy

| Test Type | Coverage | Tools |
|-----------|----------|-------|
| Unit Testing | 80% code coverage | Jest, PHPUnit |
| Integration Testing | All API endpoints | Supertest, Postman |
| E2E Testing | Critical user flows | Playwright |
| Performance Testing | Load testing | k6, Artillery |
| Security Testing | OWASP Top 10 | OWASP ZAP |
| Mobile Testing | All app features | Detox, Appium |
| UAT | All user stories | Manual testing |

### 9.2 Acceptance Criteria

| Requirement | Criteria |
|-------------|----------|
| Page Load Time | < 3 seconds (broadband), < 5 seconds (3G) |
| API Response Time | < 2 seconds for 95th percentile |
| Concurrent Users | Support 2,000 simultaneous users |
| Uptime | 99.5% availability |
| Mobile App Size | < 50MB download |
| Accessibility | WCAG 2.1 AA compliance |

---

## 10. Deployment Specifications

### 10.1 Infrastructure Requirements

| Component | Specification |
|-----------|---------------|
| Web Server | 4 vCPU, 16GB RAM, 100GB SSD |
| Database Server | 4 vCPU, 16GB RAM, 200GB SSD |
| Redis Server | 2 vCPU, 4GB RAM |
| File Storage | 500GB object storage |
| CDN | Cloudflare (free tier initially) |
| SSL | Let's Encrypt certificates |

### 10.2 Deployment Architecture

```
Production Environment
├── Load Balancer (Nginx)
├── Web Servers (2x)
│   ├── Gibbon (PHP-FPM)
│   ├── Moodle (PHP-FPM)
│   └── Next.js (PM2)
├── API Server
│   └── Node.js Services (PM2)
├── Database Cluster
│   ├── MySQL Primary + Replica
│   └── PostgreSQL Primary + Replica
├── Cache Layer
│   └── Redis Cluster
└── Storage
    └── MinIO / S3 Compatible
```

### 10.3 CI/CD Pipeline

```yaml
# GitHub Actions Workflow
name: Deploy Smart Academy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Tests
        run: npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Build Docker Images
        run: docker compose build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Production
        run: |
          ssh deploy@server "cd /app && docker compose pull && docker compose up -d"
```

---

## 11. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| System Uptime | 99.5% | Monitoring (Uptime Robot) |
| Page Load Time | < 3s | Google PageSpeed |
| Teacher Adoption | 90% daily usage | Analytics |
| Parent App Downloads | 70% of parents | App Store analytics |
| Online Fee Payment | 70% of transactions | Payment reports |
| Student Satisfaction | 80% positive | Surveys |
| Parent Satisfaction | 80% positive | Surveys |

---

## 12. Appendices

### 12.1 Glossary

| Term | Definition |
|------|------------|
| Gibbon | Open-source school management platform |
| Moodle | Open-source learning management system |
| SSO | Single Sign-On - unified authentication |
| bKash | Mobile financial service in Bangladesh |
| Nagad | Digital financial service in Bangladesh |
| Hafiz | Person who has memorized the entire Quran |
| Tajweed | Rules governing pronunciation during Quran recitation |
| Hijri | Islamic lunar calendar |

### 12.2 Reference Documents

1. Smart Academy URD v1.0 (January 8, 2026)
2. Implementation Options Analysis v1.0 (January 10, 2026)
3. Gibbon Documentation v27.0
4. Moodle Documentation v4.3
5. bKash API Documentation
6. Nagad API Documentation
7. SSLCommerz Integration Guide

### 12.3 Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Technical Lead | | _________________ | ________ |
| Project Manager | | _________________ | ________ |
| School Admin | | _________________ | ________ |

---

**Document Version:** 1.0
**Last Updated:** January 10, 2026
**Status:** Ready for Development

*This document is confidential and intended for Smart Academy project team only.*

