# Software Design Document (SDD)
## Smart Academy Digital Portal
### Version 1.0

---

## Document Control

| Field | Value |
|-------|-------|
| Document ID | SA-ARCH-SDD-001 |
| Version | 1.0 |
| Status | Draft |
| Created Date | 2026-01-10 |
| Last Updated | 2026-01-10 |
| Author | Development Team |
| Approved By | Project Stakeholders |

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [System Context Diagram](#2-system-context-diagram)
3. [Container Diagram](#3-container-diagram)
4. [Component Diagrams](#4-component-diagrams)
5. [Class Diagrams](#5-class-diagrams)
6. [Sequence Diagrams](#6-sequence-diagrams)
7. [State Diagrams](#7-state-diagrams)
8. [Design Patterns Used](#8-design-patterns-used)
9. [SOLID Principles Application](#9-solid-principles-application)

---

## 1. Introduction

### 1.1 Purpose

This Software Design Document (SDD) provides a comprehensive technical blueprint for the Smart Academy Digital Portal. It describes the system's architecture, components, interfaces, and design decisions using industry-standard diagrams and patterns.

### 1.2 Scope

This document covers:
- C4 model diagrams (Context, Container, Component)
- Class and object structures
- Dynamic behavior through sequence and state diagrams
- Design patterns implementation
- SOLID principles application

### 1.3 Design Methodology

The design follows:
- **C4 Model**: For architectural visualization
- **Domain-Driven Design (DDD)**: For business logic organization
- **Clean Architecture**: For separation of concerns
- **SOLID Principles**: For maintainable code

---

## 2. System Context Diagram

### 2.1 Level 0 - System Context

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              EXTERNAL ACTORS                                         │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│   │   Student    │  │   Teacher    │  │   Parent     │  │    Admin     │            │
│   │   [Person]   │  │   [Person]   │  │   [Person]   │  │   [Person]   │            │
│   └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘            │
│          │                 │                 │                 │                     │
│          │  Accesses       │  Manages        │  Monitors       │  Administers        │
│          │  courses,       │  classes,       │  child's        │  entire             │
│          │  assignments    │  grades         │  progress       │  system             │
│          │                 │                 │                 │                     │
│          └────────────────┬┴─────────────────┴─────────────────┘                     │
│                           │                                                          │
│                           ▼                                                          │
│          ┌────────────────────────────────────┐                                      │
│          │                                    │                                      │
│          │    SMART ACADEMY DIGITAL PORTAL    │                                      │
│          │         [Software System]          │                                      │
│          │                                    │                                      │
│          │  Provides educational management,  │                                      │
│          │  learning platform, and school     │                                      │
│          │  administration capabilities       │                                      │
│          │                                    │                                      │
│          └────────────────┬───────────────────┘                                      │
│                           │                                                          │
│          ┌────────────────┼────────────────────────────────────┐                     │
│          │                │                │                   │                     │
│          ▼                ▼                ▼                   ▼                     │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐            │
│   │   Payment   │  │    SMS      │  │   Email     │  │  BD Education   │            │
│   │  Gateways   │  │  Provider   │  │   Service   │  │    Board API    │            │
│   │ [External]  │  │ [External]  │  │ [External]  │  │   [External]    │            │
│   │             │  │             │  │             │  │                 │            │
│   │ bKash,Nagad │  │ BulkSMSBD   │  │  SendGrid   │  │ Result Verify   │            │
│   │ SSLCommerz  │  │             │  │             │  │                 │            │
│   └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────┘            │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Actor Descriptions

| Actor | Type | Description | Key Interactions |
|-------|------|-------------|------------------|
| Student | Primary | Learners enrolled in the academy | Access courses, submit assignments, view grades, attend classes |
| Teacher | Primary | Educators and instructors | Manage classes, grade work, create content, track attendance |
| Parent | Primary | Guardians of students | Monitor progress, view reports, make payments, communicate |
| Admin | Primary | System administrators | Configure system, manage users, generate reports |
| Payment Gateway | External | Financial transaction processors | Process fees, handle refunds, generate receipts |
| SMS Provider | External | Mobile notification service | Send OTPs, alerts, notifications |
| Email Service | External | Email delivery platform | Send reports, notifications, newsletters |
| BD Education Board | External | Government education API | Verify results, validate registrations |

---

## 3. Container Diagram

### 3.1 Level 1 - Container View

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                           SMART ACADEMY DIGITAL PORTAL                                       │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐    │
│  │                              PRESENTATION LAYER                                      │    │
│  ├─────────────────────────────────────────────────────────────────────────────────────┤    │
│  │                                                                                      │    │
│  │  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐       │    │
│  │  │    Web Application   │  │   Mobile App (iOS)   │  │  Mobile App (Android)│       │    │
│  │  │    [Container]       │  │    [Container]       │  │    [Container]       │       │    │
│  │  │                      │  │                      │  │                      │       │    │
│  │  │  Next.js 15 + React  │  │  React Native +      │  │  React Native +      │       │    │
│  │  │  TypeScript          │  │  Expo 52+            │  │  Expo 52+            │       │    │
│  │  │  Tailwind CSS 4.x    │  │  TypeScript          │  │  TypeScript          │       │    │
│  │  └──────────┬───────────┘  └──────────┬───────────┘  └──────────┬───────────┘       │    │
│  │             │                         │                         │                   │    │
│  └─────────────┼─────────────────────────┼─────────────────────────┼───────────────────┘    │
│                │                         │                         │                        │
│                └─────────────────────────┼─────────────────────────┘                        │
│                                          │ HTTPS/REST/GraphQL                               │
│                                          ▼                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐    │
│  │                              API GATEWAY LAYER                                       │    │
│  ├─────────────────────────────────────────────────────────────────────────────────────┤    │
│  │                                                                                      │    │
│  │  ┌──────────────────────────────────────────────────────────────────────────────┐   │    │
│  │  │                        API Gateway [Container]                                │   │    │
│  │  │                                                                               │   │    │
│  │  │  Fastify 5.x + Node.js 22 LTS                                                │   │    │
│  │  │  Rate Limiting | JWT Auth | Request Routing | API Versioning                 │   │    │
│  │  └───────────────────────────────────┬──────────────────────────────────────────┘   │    │
│  │                                      │                                               │    │
│  └──────────────────────────────────────┼───────────────────────────────────────────────┘    │
│                                         │                                                    │
│                ┌────────────────────────┼────────────────────────┐                          │
│                │                        │                        │                          │
│                ▼                        ▼                        ▼                          │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐    │
│  │                            BUSINESS LOGIC LAYER                                      │    │
│  ├─────────────────────────────────────────────────────────────────────────────────────┤    │
│  │                                                                                      │    │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐     │    │
│  │  │  Custom API    │  │  Gibbon SMS    │  │  Moodle LMS    │  │  Background    │     │    │
│  │  │  Services      │  │  Integration   │  │  Integration   │  │  Workers       │     │    │
│  │  │  [Container]   │  │  [Container]   │  │  [Container]   │  │  [Container]   │     │    │
│  │  │                │  │                │  │                │  │                │     │    │
│  │  │ Fastify 5.x    │  │ PHP 8.3+       │  │ PHP 8.3+       │  │ BullMQ +       │     │    │
│  │  │ Prisma 6.x     │  │ MySQL 8.0      │  │ MySQL 8.0      │  │ Node.js        │     │    │
│  │  └───────┬────────┘  └───────┬────────┘  └───────┬────────┘  └───────┬────────┘     │    │
│  │          │                   │                   │                   │              │    │
│  └──────────┼───────────────────┼───────────────────┼───────────────────┼──────────────┘    │
│             │                   │                   │                   │                   │
│             └───────────────────┴───────────────────┴───────────────────┘                   │
│                                         │                                                    │
│                                         ▼                                                    │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐    │
│  │                              DATA ACCESS LAYER                                       │    │
│  ├─────────────────────────────────────────────────────────────────────────────────────┤    │
│  │                                                                                      │    │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐     │    │
│  │  │  PostgreSQL    │  │  MySQL 8.0     │  │  Redis 7+      │  │  MinIO/S3      │     │    │
│  │  │  16+           │  │  (Gibbon/      │  │  Cache &       │  │  Object        │     │    │
│  │  │  [Database]    │  │   Moodle)      │  │  Sessions      │  │  Storage       │     │    │
│  │  │                │  │  [Database]    │  │  [Cache]       │  │  [Storage]     │     │    │
│  │  │ Custom Data    │  │                │  │                │  │                │     │    │
│  │  └────────────────┘  └────────────────┘  └────────────────┘  └────────────────┘     │    │
│  │                                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────────────────────┘    │
│                                                                                              │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Container Descriptions

| Container | Technology | Purpose | Data Storage |
|-----------|------------|---------|--------------|
| Web Application | Next.js 15, React 19, TypeScript | Browser-based UI for all users | Browser storage, cookies |
| Mobile App | React Native, Expo 52+ | Native mobile experience | AsyncStorage, SecureStore |
| API Gateway | Fastify 5.x, Node.js 22 | Request routing, auth, rate limiting | Redis sessions |
| Custom API Services | Fastify, Prisma 6.x | Business logic for custom modules | PostgreSQL 16+ |
| Gibbon Integration | PHP 8.3+, REST API | School management functions | MySQL 8.0 |
| Moodle Integration | PHP 8.3+, REST API | Learning management functions | MySQL 8.0 |
| Background Workers | BullMQ, Node.js | Async job processing | Redis queues |
| PostgreSQL | v16+ | Custom module data | Persistent |
| MySQL | v8.0 | Gibbon & Moodle data | Persistent |
| Redis | v7+ | Caching, sessions, queues | In-memory |
| MinIO/S3 | S3-compatible | File and media storage | Object storage |

---

## 4. Component Diagrams

### 4.1 Authentication Module Components

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                         AUTHENTICATION MODULE                                        │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────────────┐    │
│  │                          AUTH CONTROLLER                                     │    │
│  │  [Component]                                                                 │    │
│  │                                                                              │    │
│  │  Responsibilities:                                                           │    │
│  │  - Handle login/logout requests                                              │    │
│  │  - Process registration                                                      │    │
│  │  - Manage password reset                                                     │    │
│  │  - Handle OAuth callbacks                                                    │    │
│  └──────────────────────────────────┬──────────────────────────────────────────┘    │
│                                     │                                               │
│                ┌────────────────────┼────────────────────┐                         │
│                ▼                    ▼                    ▼                         │
│  ┌──────────────────────┐  ┌──────────────────┐  ┌──────────────────┐             │
│  │   AUTH SERVICE       │  │   SSO SERVICE    │  │   TOKEN SERVICE  │             │
│  │   [Component]        │  │   [Component]    │  │   [Component]    │             │
│  │                      │  │                  │  │                  │             │
│  │ - validateCredentials│  │ - initSSO        │  │ - generateJWT    │             │
│  │ - hashPassword       │  │ - validateSAML   │  │ - validateToken  │             │
│  │ - verifyPassword     │  │ - mapUserRoles   │  │ - refreshToken   │             │
│  │ - checkAccountStatus │  │ - syncSession    │  │ - revokeToken    │             │
│  └──────────┬───────────┘  └────────┬─────────┘  └────────┬─────────┘             │
│             │                       │                      │                       │
│             └───────────────────────┼──────────────────────┘                       │
│                                     ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                          AUTH REPOSITORY                                     │   │
│  │  [Component]                                                                 │   │
│  │                                                                              │   │
│  │  - findUserByEmail()     - createSession()      - updateLastLogin()         │   │
│  │  - findUserByPhone()     - invalidateSession()  - storeRefreshToken()       │   │
│  │  - createUser()          - logAuthEvent()       - getActiveDevices()        │   │
│  └──────────────────────────────────┬──────────────────────────────────────────┘   │
│                                     │                                              │
│                                     ▼                                              │
│                        ┌─────────────────────────┐                                 │
│                        │     PostgreSQL DB       │                                 │
│                        │     + Redis Cache       │                                 │
│                        └─────────────────────────┘                                 │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Student Management Module Components

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                       STUDENT MANAGEMENT MODULE                                      │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  ┌────────────────────────────────────────────────────────────────────────────┐     │
│  │                      STUDENT CONTROLLER                                     │     │
│  │  Routes: /api/v1/students/*                                                 │     │
│  └─────────────────────────────────┬──────────────────────────────────────────┘     │
│                                    │                                                │
│          ┌─────────────────────────┼─────────────────────────┐                     │
│          ▼                         ▼                         ▼                     │
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐              │
│  │ ENROLLMENT        │  │ PROFILE           │  │ ACADEMIC          │              │
│  │ SERVICE           │  │ SERVICE           │  │ SERVICE           │              │
│  │                   │  │                   │  │                   │              │
│  │ - processAdmission│  │ - getProfile      │  │ - getTranscript   │              │
│  │ - generateRoll    │  │ - updateProfile   │  │ - getAttendance   │              │
│  │ - assignSection   │  │ - uploadPhoto     │  │ - getGrades       │              │
│  │ - enrollCourses   │  │ - updateGuardian  │  │ - getSchedule     │              │
│  └─────────┬─────────┘  └─────────┬─────────┘  └─────────┬─────────┘              │
│            │                      │                      │                         │
│            └──────────────────────┼──────────────────────┘                         │
│                                   ▼                                                │
│  ┌────────────────────────────────────────────────────────────────────────────┐    │
│  │                      STUDENT REPOSITORY                                     │    │
│  │                                                                             │    │
│  │  Interfaces with: PostgreSQL (custom) + Gibbon MySQL (sync)                │    │
│  └─────────────────────────────────────────────────────────────────────────────┘    │
│                                                                                      │
│  ┌────────────────────────────────────────────────────────────────────────────┐     │
│  │                      RELATED SERVICES                                       │     │
│  │                                                                             │     │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │     │
│  │  │ Notification│  │ Document    │  │ Payment     │  │ Report      │        │     │
│  │  │ Service     │  │ Service     │  │ Service     │  │ Generator   │        │     │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │     │
│  │                                                                             │     │
│  └─────────────────────────────────────────────────────────────────────────────┘     │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Learning Management Module Components

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                       LEARNING MANAGEMENT MODULE                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  ┌───────────────────────────────────────────────────────────────────────────┐      │
│  │                        LMS CONTROLLER                                      │      │
│  │  Routes: /api/v1/lms/* | Integrates with Moodle                           │      │
│  └────────────────────────────────┬──────────────────────────────────────────┘      │
│                                   │                                                 │
│       ┌───────────────────────────┼───────────────────────────┐                    │
│       ▼                           ▼                           ▼                    │
│  ┌─────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐            │
│  │ COURSE SERVICE  │  │ CONTENT SERVICE     │  │ ASSESSMENT SERVICE  │            │
│  │                 │  │                     │  │                     │            │
│  │ - createCourse  │  │ - uploadContent     │  │ - createQuiz        │            │
│  │ - enrollStudent │  │ - organizeModules   │  │ - submitAssignment  │            │
│  │ - getCatalog    │  │ - streamVideo       │  │ - gradeSubmission   │            │
│  │ - trackProgress │  │ - serveDocument     │  │ - generateReport    │            │
│  └────────┬────────┘  └──────────┬──────────┘  └──────────┬──────────┘            │
│           │                      │                        │                        │
│           │                      ▼                        │                        │
│           │     ┌────────────────────────────────┐       │                        │
│           │     │    MOODLE ADAPTER              │       │                        │
│           │     │    [Component]                 │       │                        │
│           │     │                                │       │                        │
│           │     │ - syncCourses()                │       │                        │
│           │     │ - syncEnrollments()            │       │                        │
│           │     │ - syncGrades()                 │       │                        │
│           │     │ - mapMoodleToLocal()           │       │                        │
│           │     └────────────────────────────────┘       │                        │
│           │                      │                        │                        │
│           └──────────────────────┼────────────────────────┘                        │
│                                  ▼                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐     │
│  │                      LMS REPOSITORY                                        │     │
│  │                                                                            │     │
│  │  PostgreSQL (progress tracking) ←→ Moodle MySQL (course data)             │     │
│  └───────────────────────────────────────────────────────────────────────────┘     │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Islamic Education Module Components

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                       ISLAMIC EDUCATION MODULE                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  ┌───────────────────────────────────────────────────────────────────────────┐      │
│  │                    ISLAMIC EDUCATION CONTROLLER                            │      │
│  │  Routes: /api/v1/islamic/*                                                 │      │
│  └────────────────────────────────┬──────────────────────────────────────────┘      │
│                                   │                                                 │
│    ┌──────────────────────────────┼──────────────────────────────┐                 │
│    ▼                              ▼                              ▼                 │
│  ┌──────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐         │
│  │ QURAN SERVICE    │  │ PRAYER SERVICE       │  │ ISLAMIC CALENDAR     │         │
│  │                  │  │                      │  │ SERVICE              │         │
│  │ - getVerses      │  │ - getPrayerTimes     │  │                      │         │
│  │ - playRecitation │  │ - setLocationPrefs   │  │ - getHijriDate       │         │
│  │ - trackHifz      │  │ - sendReminders      │  │ - getIslamicEvents   │         │
│  │ - assessTajweed  │  │ - logPrayers         │  │ - scheduleReminders  │         │
│  └────────┬─────────┘  └──────────┬───────────┘  └──────────┬───────────┘         │
│           │                       │                         │                      │
│           ▼                       ▼                         ▼                      │
│  ┌──────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐         │
│  │ QURAN API        │  │ ALADHAN API          │  │ HIJRI CALENDAR       │         │
│  │ ADAPTER          │  │ ADAPTER              │  │ ADAPTER              │         │
│  │                  │  │                      │  │                      │         │
│  │ quran.com API    │  │ aladhan.com/api      │  │ Local calculation    │         │
│  └──────────────────┘  └──────────────────────┘  └──────────────────────┘         │
│                                                                                     │
│  ┌───────────────────────────────────────────────────────────────────────────┐     │
│  │                    SPECIALIZED COMPONENTS                                  │     │
│  │                                                                            │     │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐            │     │
│  │  │ Tajweed         │  │ Memorization    │  │ Progress        │            │     │
│  │  │ Analyzer        │  │ Tracker         │  │ Gamification    │            │     │
│  │  │                 │  │                 │  │                 │            │     │
│  │  │ Rules engine    │  │ Surah/Ayah      │  │ Badges, Points  │            │     │
│  │  │ for recitation  │  │ progress        │  │ Leaderboards    │            │     │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘            │     │
│  └───────────────────────────────────────────────────────────────────────────┘     │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.5 Payment Module Components

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                          PAYMENT MODULE                                              │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  ┌───────────────────────────────────────────────────────────────────────────┐      │
│  │                     PAYMENT CONTROLLER                                     │      │
│  │  Routes: /api/v1/payments/*                                                │      │
│  └────────────────────────────────┬──────────────────────────────────────────┘      │
│                                   │                                                 │
│    ┌──────────────────────────────┼──────────────────────────────────────────┐     │
│    ▼                              ▼                                          ▼     │
│  ┌─────────────────┐  ┌──────────────────────┐  ┌───────────────────────┐         │
│  │ INVOICE SERVICE │  │ PAYMENT SERVICE      │  │ REFUND SERVICE        │         │
│  │                 │  │                      │  │                       │         │
│  │ - generateInvoice│ │ - initiatePayment    │  │ - processRefund       │         │
│  │ - applyDiscount │  │ - verifyPayment      │  │ - calculateRefund     │         │
│  │ - sendReminder  │  │ - handleCallback     │  │ - approveRefund       │         │
│  │ - markOverdue   │  │ - updateStatus       │  │ - notifyRefund        │         │
│  └────────┬────────┘  └──────────┬───────────┘  └───────────┬───────────┘         │
│           │                      │                          │                      │
│           │                      ▼                          │                      │
│           │     ┌────────────────────────────────────────┐ │                      │
│           │     │       PAYMENT GATEWAY FACTORY          │ │                      │
│           │     │       [Component]                      │ │                      │
│           │     │                                        │ │                      │
│           │     │  Creates appropriate gateway adapter   │ │                      │
│           │     │  based on payment method selected      │ │                      │
│           │     └──────────────────┬─────────────────────┘ │                      │
│           │                        │                       │                      │
│           │     ┌──────────────────┼─────────────────────┐ │                      │
│           │     ▼                  ▼                     ▼ │                      │
│           │  ┌──────────┐  ┌──────────────┐  ┌───────────┐ │                      │
│           │  │ bKash    │  │ Nagad        │  │SSLCommerz │ │                      │
│           │  │ Adapter  │  │ Adapter      │  │Adapter    │ │                      │
│           │  └──────────┘  └──────────────┘  └───────────┘ │                      │
│           │                                                │                      │
│           └────────────────────────┬───────────────────────┘                      │
│                                    ▼                                              │
│  ┌───────────────────────────────────────────────────────────────────────────┐    │
│  │                     PAYMENT REPOSITORY                                     │    │
│  │                                                                            │    │
│  │  - transactions      - invoices        - refunds        - payment_logs    │    │
│  └───────────────────────────────────────────────────────────────────────────┘    │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Class Diagrams

### 5.1 User Domain Classes

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              USER DOMAIN                                             │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│                           ┌─────────────────────────────┐                           │
│                           │      <<abstract>>           │                           │
│                           │         User                │                           │
│                           ├─────────────────────────────┤                           │
│                           │ # id: string                │                           │
│                           │ # email: string             │                           │
│                           │ # phone: string             │                           │
│                           │ # passwordHash: string      │                           │
│                           │ # firstName: string         │                           │
│                           │ # lastName: string          │                           │
│                           │ # status: UserStatus        │                           │
│                           │ # createdAt: DateTime       │                           │
│                           │ # updatedAt: DateTime       │                           │
│                           ├─────────────────────────────┤                           │
│                           │ + authenticate(): boolean   │                           │
│                           │ + updateProfile(): void     │                           │
│                           │ + changePassword(): void    │                           │
│                           │ + getPermissions(): string[]│                           │
│                           └──────────────┬──────────────┘                           │
│                                          │                                          │
│          ┌───────────────────────────────┼───────────────────────────────┐          │
│          │                               │                               │          │
│          ▼                               ▼                               ▼          │
│  ┌───────────────────┐        ┌───────────────────┐        ┌───────────────────┐   │
│  │     Student       │        │     Teacher       │        │      Admin        │   │
│  ├───────────────────┤        ├───────────────────┤        ├───────────────────┤   │
│  │ + rollNumber      │        │ + employeeId      │        │ + department      │   │
│  │ + classId         │        │ + subjects[]      │        │ + accessLevel     │   │
│  │ + sectionId       │        │ + qualifications[]│        │ + permissions[]   │   │
│  │ + guardianId      │        │ + experience      │        ├───────────────────┤   │
│  │ + bloodGroup      │        ├───────────────────┤        │ + manageUsers()   │   │
│  ├───────────────────┤        │ + assignClass()   │        │ + configSystem()  │   │
│  │ + enroll()        │        │ + gradeStudent()  │        │ + viewReports()   │   │
│  │ + getTranscript() │        │ + createContent() │        │ + manageRoles()   │   │
│  │ + viewGrades()    │        │ + takeAttendance()│        └───────────────────┘   │
│  │ + submitWork()    │        │ + viewProgress()  │                                │
│  └───────────────────┘        └───────────────────┘                                │
│                                                                                     │
│  ┌───────────────────┐        ┌───────────────────┐                                │
│  │     Guardian      │        │    <<enum>>       │                                │
│  ├───────────────────┤        │   UserStatus      │                                │
│  │ + relationship    │        ├───────────────────┤                                │
│  │ + occupation      │        │ ACTIVE            │                                │
│  │ + students[]      │        │ INACTIVE          │                                │
│  ├───────────────────┤        │ SUSPENDED         │                                │
│  │ + viewProgress()  │        │ PENDING           │                                │
│  │ + makePayment()   │        │ GRADUATED         │                                │
│  │ + communicate()   │        └───────────────────┘                                │
│  └───────────────────┘                                                             │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Academic Domain Classes

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                            ACADEMIC DOMAIN                                           │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  ┌────────────────────┐     ┌────────────────────┐     ┌────────────────────┐       │
│  │    AcademicYear    │     │      Class         │     │     Section        │       │
│  ├────────────────────┤     ├────────────────────┤     ├────────────────────┤       │
│  │ + id: string       │     │ + id: string       │     │ + id: string       │       │
│  │ + name: string     │◆────│ + name: string     │◆────│ + name: string     │       │
│  │ + startDate: Date  │  1:N│ + gradeLevel: int  │  1:N│ + capacity: int    │       │
│  │ + endDate: Date    │     │ + academicYearId   │     │ + classId: string  │       │
│  │ + isCurrent: bool  │     │ + teacherId        │     │ + teacherId        │       │
│  └────────────────────┘     └────────────────────┘     └────────────────────┘       │
│                                                                                      │
│  ┌────────────────────┐     ┌────────────────────┐     ┌────────────────────┐       │
│  │     Subject        │     │    Enrollment      │     │   Attendance       │       │
│  ├────────────────────┤     ├────────────────────┤     ├────────────────────┤       │
│  │ + id: string       │     │ + id: string       │     │ + id: string       │       │
│  │ + name: string     │     │ + studentId        │     │ + studentId        │       │
│  │ + code: string     │     │ + sectionId        │     │ + date: Date       │       │
│  │ + credits: int     │     │ + academicYearId   │     │ + status: enum     │       │
│  │ + type: enum       │     │ + enrollDate       │     │ + markedById       │       │
│  │ + isCompulsory     │     │ + status: enum     │     │ + notes: string    │       │
│  └────────────────────┘     └────────────────────┘     └────────────────────┘       │
│                                                                                      │
│  ┌────────────────────┐     ┌────────────────────┐     ┌────────────────────┐       │
│  │    Examination     │     │      Grade         │     │   ReportCard       │       │
│  ├────────────────────┤     ├────────────────────┤     ├────────────────────┤       │
│  │ + id: string       │     │ + id: string       │     │ + id: string       │       │
│  │ + name: string     │◆────│ + examinationId    │◆────│ + studentId        │       │
│  │ + type: enum       │  1:N│ + studentId        │  1:N│ + termId           │       │
│  │ + totalMarks: int  │     │ + subjectId        │     │ + grades[]         │       │
│  │ + passingMarks     │     │ + marksObtained    │     │ + attendance       │       │
│  │ + date: Date       │     │ + grade: string    │     │ + remarks          │       │
│  │ + subjectId        │     │ + remarks          │     │ + rank: int        │       │
│  └────────────────────┘     └────────────────────┘     └────────────────────┘       │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Payment Domain Classes

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                            PAYMENT DOMAIN                                            │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  ┌────────────────────┐        ┌────────────────────────────────────┐               │
│  │    FeeStructure    │        │            Invoice                 │               │
│  ├────────────────────┤        ├────────────────────────────────────┤               │
│  │ + id: string       │        │ + id: string                       │               │
│  │ + name: string     │◆───────│ + invoiceNumber: string            │               │
│  │ + academicYearId   │   1:N  │ + studentId: string                │               │
│  │ + classId: string  │        │ + feeStructureId: string           │               │
│  │ + amount: Money    │        │ + amount: Money                    │               │
│  │ + dueDate: Date    │        │ + discount: Money                  │               │
│  │ + isRecurring      │        │ + finalAmount: Money               │               │
│  │ + frequency        │        │ + dueDate: Date                    │               │
│  └────────────────────┘        │ + status: InvoiceStatus            │               │
│                                │ + createdAt: DateTime              │               │
│                                ├────────────────────────────────────┤               │
│                                │ + generatePDF(): Buffer            │               │
│                                │ + sendReminder(): void             │               │
│                                │ + applyDiscount(d: Discount): void │               │
│                                │ + markAsPaid(): void               │               │
│                                └────────────────┬───────────────────┘               │
│                                                 │                                   │
│                                                 │ 1:N                               │
│                                                 ▼                                   │
│  ┌────────────────────────────────────────────────────────────────────────┐        │
│  │                           Transaction                                   │        │
│  ├─────────────────────────────────────────────────────────────────────────┤        │
│  │ + id: string                                                            │        │
│  │ + invoiceId: string                                                     │        │
│  │ + transactionRef: string                                                │        │
│  │ + paymentMethod: PaymentMethod                                          │        │
│  │ + gatewayRef: string                                                    │        │
│  │ + amount: Money                                                         │        │
│  │ + status: TransactionStatus                                             │        │
│  │ + initiatedAt: DateTime                                                 │        │
│  │ + completedAt: DateTime                                                 │        │
│  │ + metadata: JSON                                                        │        │
│  ├─────────────────────────────────────────────────────────────────────────┤        │
│  │ + initiate(): TransactionResult                                         │        │
│  │ + verify(): boolean                                                     │        │
│  │ + refund(reason: string): RefundResult                                  │        │
│  │ + generateReceipt(): Buffer                                             │        │
│  └─────────────────────────────────────────────────────────────────────────┘        │
│                                                                                      │
│  ┌─────────────────────────┐  ┌─────────────────────────┐                          │
│  │  <<interface>>          │  │  <<interface>>          │                          │
│  │  PaymentGateway         │  │  PaymentMethod          │                          │
│  ├─────────────────────────┤  ├─────────────────────────┤                          │
│  │ + initiate(): Promise   │  │  BKASH                  │                          │
│  │ + verify(): Promise     │  │  NAGAD                  │                          │
│  │ + refund(): Promise     │  │  SSLCOMMERZ_CARD        │                          │
│  │ + getStatus(): Promise  │  │  SSLCOMMERZ_BANK        │                          │
│  └─────────────────────────┘  │  CASH                   │                          │
│           △                   │  BANK_TRANSFER          │                          │
│           │                   └─────────────────────────┘                          │
│  ┌────────┼────────┬────────────────┐                                              │
│  │        │        │                │                                              │
│  ▼        ▼        ▼                ▼                                              │
│ bKash   Nagad  SSLCommerz     CashPayment                                          │
│ Gateway Gateway Gateway       Handler                                               │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 5.4 LMS Domain Classes

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                            LMS DOMAIN                                                │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  ┌────────────────────┐     ┌────────────────────┐     ┌────────────────────┐       │
│  │      Course        │     │     Module         │     │    Content         │       │
│  ├────────────────────┤     ├────────────────────┤     ├────────────────────┤       │
│  │ + id: string       │◆────│ + id: string       │◆────│ + id: string       │       │
│  │ + title: string    │  1:N│ + title: string    │  1:N│ + type: ContentType│       │
│  │ + description      │     │ + courseId: string │     │ + moduleId: string │       │
│  │ + code: string     │     │ + order: int       │     │ + title: string    │       │
│  │ + instructorId     │     │ + isLocked: bool   │     │ + filePath: string │       │
│  │ + category         │     │ + unlockDate       │     │ + duration: int    │       │
│  │ + thumbnail        │     │ + completionReq    │     │ + isRequired: bool │       │
│  │ + isPublished      │     └────────────────────┘     │ + order: int       │       │
│  │ + enrollmentLimit  │                                └────────────────────┘       │
│  ├────────────────────┤                                                             │
│  │ + publish(): void  │                                                             │
│  │ + enroll(s): void  │     ┌────────────────────┐                                  │
│  │ + getProgress()    │     │  <<enum>>          │                                  │
│  └────────────────────┘     │  ContentType       │                                  │
│                             ├────────────────────┤                                  │
│                             │ VIDEO              │                                  │
│  ┌────────────────────┐     │ DOCUMENT           │     ┌────────────────────┐       │
│  │   Assignment       │     │ QUIZ               │     │   Submission       │       │
│  ├────────────────────┤     │ INTERACTIVE        │     ├────────────────────┤       │
│  │ + id: string       │     │ AUDIO              │     │ + id: string       │       │
│  │ + courseId: string │     │ SCORM              │     │ + assignmentId     │       │
│  │ + title: string    │     │ EXTERNAL_LINK      │     │ + studentId        │       │
│  │ + description      │     └────────────────────┘     │ + content: string  │       │
│  │ + dueDate: Date    │◆────────────────────────────────│ + attachments[]   │       │
│  │ + maxPoints: int   │                           1:N  │ + submittedAt      │       │
│  │ + allowLate: bool  │                                │ + grade: number    │       │
│  │ + rubric: JSON     │                                │ + feedback         │       │
│  ├────────────────────┤                                │ + status: enum     │       │
│  │ + grade(s): void   │                                ├────────────────────┤       │
│  │ + extend(): void   │                                │ + submit(): void   │       │
│  └────────────────────┘                                │ + resubmit(): void │       │
│                                                        └────────────────────┘       │
│                                                                                      │
│  ┌────────────────────┐     ┌────────────────────┐                                  │
│  │ CourseEnrollment   │     │  Progress          │                                  │
│  ├────────────────────┤     ├────────────────────┤                                  │
│  │ + id: string       │◆────│ + id: string       │                                  │
│  │ + courseId: string │  1:N│ + enrollmentId     │                                  │
│  │ + studentId        │     │ + contentId        │                                  │
│  │ + enrolledAt       │     │ + status: enum     │                                  │
│  │ + completedAt      │     │ + completedAt      │                                  │
│  │ + grade: string    │     │ + timeSpent: int   │                                  │
│  │ + certificate      │     │ + attempts: int    │                                  │
│  └────────────────────┘     └────────────────────┘                                  │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Sequence Diagrams

### 6.1 User Authentication Flow

```
┌──────┐     ┌──────────┐     ┌───────────┐     ┌─────────────┐     ┌─────────┐     ┌───────┐
│Client│     │API Gateway│    │Auth Service│    │Token Service│     │User Repo│     │ Redis │
└──┬───┘     └────┬─────┘     └─────┬─────┘     └──────┬──────┘     └────┬────┘     └───┬───┘
   │              │                 │                  │                 │              │
   │ POST /login  │                 │                  │                 │              │
   │─────────────>│                 │                  │                 │              │
   │              │                 │                  │                 │              │
   │              │ validate request│                  │                 │              │
   │              │────────────────>│                  │                 │              │
   │              │                 │                  │                 │              │
   │              │                 │ findByEmail()    │                 │              │
   │              │                 │─────────────────────────────────────>              │
   │              │                 │                  │                 │              │
   │              │                 │<─────────────────────────────────── user data     │
   │              │                 │                  │                 │              │
   │              │                 │ verifyPassword() │                 │              │
   │              │                 │──────────────────│                 │              │
   │              │                 │                  │                 │              │
   │              │                 │ generateTokens() │                 │              │
   │              │                 │─────────────────>│                 │              │
   │              │                 │                  │                 │              │
   │              │                 │                  │ storeSession()  │              │
   │              │                 │                  │─────────────────────────────────>
   │              │                 │                  │                 │              │
   │              │                 │<───────────────── access + refresh tokens        │
   │              │                 │                  │                 │              │
   │              │<──────────────── tokens + user info│                 │              │
   │              │                 │                  │                 │              │
   │<───────────── 200 OK + tokens  │                  │                 │              │
   │              │                 │                  │                 │              │
```

### 6.2 Student Enrollment Flow

```
┌──────┐     ┌──────────┐     ┌───────────────┐     ┌────────────┐     ┌─────────┐     ┌─────────┐
│Admin │     │ Frontend │     │ Enrollment API│     │Student Svc │     │Gibbon   │     │PostgreSQL│
└──┬───┘     └────┬─────┘     └───────┬───────┘     └──────┬─────┘     └────┬────┘     └────┬────┘
   │              │                   │                    │                │               │
   │ Fill form    │                   │                    │                │               │
   │─────────────>│                   │                    │                │               │
   │              │                   │                    │                │               │
   │              │ POST /enroll      │                    │                │               │
   │              │──────────────────>│                    │                │               │
   │              │                   │                    │                │               │
   │              │                   │ validateData()     │                │               │
   │              │                   │───────────────────>│                │               │
   │              │                   │                    │                │               │
   │              │                   │                    │ checkCapacity()│               │
   │              │                   │                    │───────────────>│               │
   │              │                   │                    │<───────────────│               │
   │              │                   │                    │                │               │
   │              │                   │                    │ createStudent()│               │
   │              │                   │                    │───────────────────────────────>│
   │              │                   │                    │<──────────────────────────────│
   │              │                   │                    │                │               │
   │              │                   │                    │ syncToGibbon() │               │
   │              │                   │                    │───────────────>│               │
   │              │                   │                    │<───────────────│ gibbon_id    │
   │              │                   │                    │                │               │
   │              │                   │                    │ generateRoll() │               │
   │              │                   │                    │────────────────│               │
   │              │                   │                    │                │               │
   │              │                   │<─────────────────── enrollment result              │
   │              │                   │                    │                │               │
   │              │<───────────────────enrollment confirmed│                │               │
   │              │                   │                    │                │               │
   │<───────────── Display success    │                    │                │               │
   │              │                   │                    │                │               │
```

### 6.3 Payment Processing Flow

```
┌──────┐     ┌──────────┐     ┌───────────┐     ┌────────────┐     ┌─────────┐     ┌─────────┐
│Parent│     │ Frontend │     │Payment API│     │Gateway Svc │     │  bKash  │     │   DB    │
└──┬───┘     └────┬─────┘     └─────┬─────┘     └──────┬─────┘     └────┬────┘     └────┬────┘
   │              │                 │                  │                │               │
   │ Pay Invoice  │                 │                  │                │               │
   │─────────────>│                 │                  │                │               │
   │              │                 │                  │                │               │
   │              │ initiate payment│                  │                │               │
   │              │────────────────>│                  │                │               │
   │              │                 │                  │                │               │
   │              │                 │ createTransaction│                │               │
   │              │                 │─────────────────────────────────────────────────>│
   │              │                 │<─────────────────────────────────────────────────│
   │              │                 │                  │                │               │
   │              │                 │ initiatePayment()│                │               │
   │              │                 │─────────────────>│                │               │
   │              │                 │                  │                │               │
   │              │                 │                  │ createPayment()│               │
   │              │                 │                  │───────────────>│               │
   │              │                 │                  │<───────────────│               │
   │              │                 │                  │  paymentURL    │               │
   │              │                 │<─────────────────│                │               │
   │              │<────────────────│ redirect URL     │                │               │
   │              │                 │                  │                │               │
   │<───────────── Redirect to bKash│                  │                │               │
   │              │                 │                  │                │               │
   │ Complete pay │                 │                  │                │               │
   │──────────────────────────────────────────────────────────────────>│               │
   │              │                 │                  │                │               │
   │              │                 │                  │<───────────────│ callback      │
   │              │                 │                  │                │               │
   │              │                 │<─────────────────│ payment result │               │
   │              │                 │                  │                │               │
   │              │                 │ updateStatus()   │                │               │
   │              │                 │─────────────────────────────────────────────────>│
   │              │                 │                  │                │               │
   │              │<────────────────│ payment confirmed│                │               │
   │<───────────── Receipt          │                  │                │               │
```

### 6.4 Course Content Access Flow

```
┌───────┐     ┌──────────┐     ┌─────────┐     ┌───────────┐     ┌───────────┐     ┌──────┐
│Student│     │ Frontend │     │ LMS API │     │Course Svc │     │ Progress  │     │Moodle│
└───┬───┘     └────┬─────┘     └────┬────┘     └─────┬─────┘     └─────┬─────┘     └──┬───┘
    │              │                │                │                 │              │
    │ Open course  │                │                │                 │              │
    │─────────────>│                │                │                 │              │
    │              │                │                │                 │              │
    │              │ GET /course/:id│                │                 │              │
    │              │───────────────>│                │                 │              │
    │              │                │                │                 │              │
    │              │                │ checkEnrollment│                 │              │
    │              │                │───────────────>│                 │              │
    │              │                │<───────────────│ enrolled        │              │
    │              │                │                │                 │              │
    │              │                │ getProgress()  │                 │              │
    │              │                │────────────────────────────────>│              │
    │              │                │<────────────────────────────────│              │
    │              │                │                │                 │              │
    │              │                │ fetchContent() │                 │              │
    │              │                │───────────────────────────────────────────────>│
    │              │                │<──────────────────────────────────────────────│
    │              │                │                │                 │              │
    │              │<───────────────│ course + progress               │              │
    │              │                │                │                 │              │
    │<───────────── Display content │                │                 │              │
    │              │                │                │                 │              │
    │ Watch video  │                │                │                 │              │
    │─────────────>│                │                │                 │              │
    │              │                │                │                 │              │
    │              │ track progress │                │                 │              │
    │              │───────────────>│                │                 │              │
    │              │                │ updateProgress()                 │              │
    │              │                │────────────────────────────────>│              │
    │              │                │<────────────────────────────────│              │
    │              │                │                │                 │              │
    │              │                │ syncToMoodle() │                 │              │
    │              │                │───────────────────────────────────────────────>│
    │              │                │                │                 │              │
    │              │<───────────────│ progress updated                │              │
    │<───────────── Progress saved  │                │                 │              │
```

### 6.5 SSO Authentication Flow

```
┌──────┐     ┌──────────┐     ┌───────────┐     ┌───────────┐     ┌────────┐     ┌────────┐
│ User │     │Smart Acad│     │ SSO Server│     │  Gibbon   │     │ Moodle │     │  Redis │
└──┬───┘     └────┬─────┘     └─────┬─────┘     └─────┬─────┘     └───┬────┘     └───┬────┘
   │              │                 │                 │               │              │
   │ Login request│                 │                 │               │              │
   │─────────────>│                 │                 │               │              │
   │              │                 │                 │               │              │
   │              │ Auth request    │                 │               │              │
   │              │────────────────>│                 │               │              │
   │              │                 │                 │               │              │
   │              │                 │ validate user   │               │              │
   │              │                 │─────────────────│               │              │
   │              │                 │                 │               │              │
   │              │                 │ generate tokens │               │              │
   │              │                 │─────────────────│               │              │
   │              │                 │                 │               │              │
   │              │                 │ storeSession()  │               │              │
   │              │                 │──────────────────────────────────────────────>│
   │              │                 │                 │               │              │
   │              │<────────────────│ SSO token       │               │              │
   │              │                 │                 │               │              │
   │              │ Create Gibbon session             │               │              │
   │              │───────────────────────────────────>               │              │
   │              │<─────────────────────────────────── session ID    │              │
   │              │                 │                 │               │              │
   │              │ Create Moodle session             │               │              │
   │              │────────────────────────────────────────────────────>             │
   │              │<──────────────────────────────────────────────────│ session ID   │
   │              │                 │                 │               │              │
   │<───────────── Logged in + session cookies        │               │              │
   │              │                 │                 │               │              │
```

---

## 7. State Diagrams

### 7.1 Student Enrollment State

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                        STUDENT ENROLLMENT STATE DIAGRAM                              │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│                              ┌─────────┐                                            │
│                              │  START  │                                            │
│                              └────┬────┘                                            │
│                                   │                                                 │
│                                   │ submit application                              │
│                                   ▼                                                 │
│                          ┌────────────────┐                                         │
│                          │   SUBMITTED    │                                         │
│                          │                │                                         │
│                          │ Awaiting review│                                         │
│                          └───────┬────────┘                                         │
│                                  │                                                  │
│               ┌──────────────────┼──────────────────┐                              │
│               │                  │                  │                              │
│               ▼                  ▼                  ▼                              │
│    ┌─────────────────┐  ┌───────────────┐  ┌────────────────┐                      │
│    │    REJECTED     │  │ PENDING_DOCS  │  │   APPROVED     │                      │
│    │                 │  │               │  │                │                      │
│    │ Does not meet   │  │ Missing docs  │  │ Meets criteria │                      │
│    │ criteria        │  │ required      │  │                │                      │
│    └────────┬────────┘  └───────┬───────┘  └───────┬────────┘                      │
│             │                   │                  │                               │
│             │                   │ docs submitted   │ payment required              │
│             │                   ▼                  ▼                               │
│             │           ┌───────────────┐  ┌────────────────┐                      │
│             │           │   SUBMITTED   │  │PENDING_PAYMENT │                      │
│             │           │   (re-review) │  │                │                      │
│             │           └───────────────┘  │ Awaiting fee   │                      │
│             │                              │ payment        │                      │
│             │                              └───────┬────────┘                      │
│             │                                      │                               │
│             │                    ┌─────────────────┼─────────────────┐             │
│             │                    │                 │                 │             │
│             │                    ▼                 ▼                 ▼             │
│             │         ┌─────────────────┐  ┌──────────────┐  ┌──────────────┐      │
│             │         │ PAYMENT_FAILED  │  │   ENROLLED   │  │  WAITLISTED  │      │
│             │         │                 │  │              │  │              │      │
│             │         │ Retry or cancel │  │ Fully active │  │ No capacity  │      │
│             │         └────────┬────────┘  └──────┬───────┘  └──────┬───────┘      │
│             │                  │                  │                 │              │
│             │                  │ retry            │                 │ spot opens   │
│             │                  └──────────────────│─────────────────┘              │
│             │                                     │                                │
│             │                                     │ withdrawal / graduation        │
│             │                                     ▼                                │
│             │                            ┌────────────────┐                        │
│             │                            │   WITHDRAWN    │                        │
│             │                            │   or           │                        │
│             └────────────────────────────│   GRADUATED    │                        │
│                                          │   or           │                        │
│                                          │   TRANSFERRED  │                        │
│                                          └───────┬────────┘                        │
│                                                  │                                 │
│                                                  ▼                                 │
│                                            ┌──────────┐                            │
│                                            │   END    │                            │
│                                            └──────────┘                            │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Payment Transaction State

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                        PAYMENT TRANSACTION STATE DIAGRAM                             │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│                              ┌─────────┐                                            │
│                              │  START  │                                            │
│                              └────┬────┘                                            │
│                                   │                                                 │
│                                   │ create transaction                              │
│                                   ▼                                                 │
│                          ┌────────────────┐                                         │
│                          │   INITIATED    │                                         │
│                          │                │                                         │
│                          │ Transaction    │                                         │
│                          │ created        │                                         │
│                          └───────┬────────┘                                         │
│                                  │                                                  │
│                                  │ send to gateway                                  │
│                                  ▼                                                  │
│                          ┌────────────────┐                                         │
│                          │   PENDING      │──────────────────┐                     │
│                          │                │                  │                     │
│                          │ Awaiting user  │    timeout       │                     │
│                          │ action         │    (15 min)      │                     │
│                          └───────┬────────┘                  │                     │
│                                  │                           │                     │
│               ┌──────────────────┼──────────────┐            │                     │
│               │                  │              │            │                     │
│               ▼                  ▼              ▼            ▼                     │
│    ┌─────────────────┐  ┌───────────────┐  ┌─────────────────────┐                 │
│    │   PROCESSING    │  │   CANCELLED   │  │     EXPIRED         │                 │
│    │                 │  │               │  │                     │                 │
│    │ Gateway is      │  │ User cancelled│  │ Timed out           │                 │
│    │ processing      │  │               │  │                     │                 │
│    └───────┬─────────┘  └───────────────┘  └─────────────────────┘                 │
│            │                                                                        │
│            │ gateway response                                                       │
│            │                                                                        │
│     ┌──────┴───────┐                                                               │
│     │              │                                                               │
│     ▼              ▼                                                               │
│  ┌──────────┐  ┌──────────────┐                                                    │
│  │COMPLETED │  │   FAILED     │                                                    │
│  │          │  │              │                                                    │
│  │ Payment  │  │ Gateway      │                                                    │
│  │ successful│ │ declined     │                                                    │
│  └────┬─────┘  └──────────────┘                                                    │
│       │                                                                            │
│       │ refund requested                                                           │
│       ▼                                                                            │
│  ┌────────────────┐                                                                │
│  │REFUND_INITIATED│                                                                │
│  │                │                                                                │
│  │ Processing     │                                                                │
│  │ refund         │                                                                │
│  └───────┬────────┘                                                                │
│          │                                                                         │
│   ┌──────┴───────┐                                                                 │
│   │              │                                                                 │
│   ▼              ▼                                                                 │
│┌───────────┐ ┌───────────────┐                                                     │
││ REFUNDED  │ │ REFUND_FAILED │                                                     │
││           │ │               │                                                     │
││ Money     │ │ Manual        │                                                     │
││ returned  │ │ intervention  │                                                     │
│└───────────┘ │ required      │                                                     │
│              └───────────────┘                                                     │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 7.3 Assignment Submission State

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                       ASSIGNMENT SUBMISSION STATE DIAGRAM                            │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│                              ┌─────────┐                                            │
│                              │  START  │                                            │
│                              └────┬────┘                                            │
│                                   │                                                 │
│                                   │ assignment assigned                             │
│                                   ▼                                                 │
│                          ┌────────────────┐                                         │
│                          │  NOT_STARTED   │                                         │
│                          │                │                                         │
│                          │ Student has    │                                         │
│                          │ not begun      │                                         │
│                          └───────┬────────┘                                         │
│                                  │                                                  │
│                                  │ student views / starts                           │
│                                  ▼                                                  │
│                          ┌────────────────┐                                         │
│                          │  IN_PROGRESS   │<─────────────────┐                     │
│                          │                │                  │                     │
│                          │ Working on     │    resubmit     │                     │
│                          │ assignment     │    allowed       │                     │
│                          └───────┬────────┘                  │                     │
│                                  │                           │                     │
│                                  │ submit                    │                     │
│                                  ▼                           │                     │
│                          ┌────────────────┐                  │                     │
│                          │   SUBMITTED    │──────────────────┤                     │
│                          │                │                  │                     │
│                          │ Awaiting       │                  │                     │
│                          │ grading        │                  │                     │
│                          └───────┬────────┘                  │                     │
│                                  │                           │                     │
│                                  │ teacher reviews           │                     │
│                                  ▼                           │                     │
│               ┌──────────────────┴──────────────────┐       │                     │
│               │                                     │       │                     │
│               ▼                                     ▼       │                     │
│    ┌─────────────────┐                    ┌───────────────┐ │                     │
│    │     GRADED      │                    │   RETURNED    │─┘                     │
│    │                 │                    │               │                       │
│    │ Final grade     │                    │ Needs         │                       │
│    │ assigned        │                    │ revision      │                       │
│    └───────┬─────────┘                    └───────────────┘                       │
│            │                                                                       │
│            │ past due date                                                         │
│            │ (if submitted late)                                                   │
│            ▼                                                                       │
│    ┌─────────────────┐                                                            │
│    │  LATE_PENALTY   │                                                            │
│    │  APPLIED        │                                                            │
│    │                 │                                                            │
│    │ Grade reduced   │                                                            │
│    └─────────────────┘                                                            │
│                                                                                     │
│    ┌─────────────────┐                                                            │
│    │    MISSING      │                                                            │
│    │                 │                                                            │
│    │ Due date passed │                                                            │
│    │ No submission   │                                                            │
│    └─────────────────┘                                                            │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Design Patterns Used

### 8.1 Creational Patterns

#### 8.1.1 Factory Pattern - Payment Gateway

```typescript
// PaymentGatewayFactory.ts

interface PaymentGateway {
  initiate(amount: Money, metadata: PaymentMetadata): Promise<PaymentResult>;
  verify(transactionId: string): Promise<VerificationResult>;
  refund(transactionId: string, amount: Money): Promise<RefundResult>;
}

class PaymentGatewayFactory {
  static create(method: PaymentMethod): PaymentGateway {
    switch (method) {
      case PaymentMethod.BKASH:
        return new BkashGateway(config.bkash);
      case PaymentMethod.NAGAD:
        return new NagadGateway(config.nagad);
      case PaymentMethod.SSLCOMMERZ:
        return new SSLCommerzGateway(config.sslcommerz);
      default:
        throw new UnsupportedPaymentMethodError(method);
    }
  }
}

// Usage
const gateway = PaymentGatewayFactory.create(PaymentMethod.BKASH);
const result = await gateway.initiate(amount, metadata);
```

#### 8.1.2 Builder Pattern - Report Generation

```typescript
// ReportBuilder.ts

class ReportBuilder {
  private report: Report;

  constructor() {
    this.report = new Report();
  }

  setTitle(title: string): this {
    this.report.title = title;
    return this;
  }

  setDateRange(start: Date, end: Date): this {
    this.report.dateRange = { start, end };
    return this;
  }

  addSection(section: ReportSection): this {
    this.report.sections.push(section);
    return this;
  }

  addChart(chart: ChartConfig): this {
    this.report.charts.push(chart);
    return this;
  }

  setFormat(format: ReportFormat): this {
    this.report.format = format;
    return this;
  }

  build(): Report {
    this.validate();
    return this.report;
  }
}

// Usage
const report = new ReportBuilder()
  .setTitle('Student Progress Report')
  .setDateRange(startDate, endDate)
  .addSection(attendanceSection)
  .addSection(gradesSection)
  .addChart(progressChart)
  .setFormat(ReportFormat.PDF)
  .build();
```

#### 8.1.3 Singleton Pattern - Configuration Manager

```typescript
// ConfigManager.ts

class ConfigManager {
  private static instance: ConfigManager;
  private config: AppConfig;

  private constructor() {
    this.config = this.loadConfig();
  }

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  get<T>(key: string): T {
    return this.config[key] as T;
  }

  private loadConfig(): AppConfig {
    // Load from environment variables and config files
  }
}

// Usage
const config = ConfigManager.getInstance();
const dbUrl = config.get<string>('DATABASE_URL');
```

### 8.2 Structural Patterns

#### 8.2.1 Adapter Pattern - Moodle Integration

```typescript
// MoodleAdapter.ts

interface LMSCourse {
  id: string;
  title: string;
  description: string;
  modules: LMSModule[];
}

// Moodle API returns different structure
interface MoodleCourse {
  courseid: number;
  fullname: string;
  summary: string;
  sections: MoodleSection[];
}

class MoodleAdapter implements LMSProvider {
  private moodleClient: MoodleClient;

  constructor(moodleClient: MoodleClient) {
    this.moodleClient = moodleClient;
  }

  async getCourse(id: string): Promise<LMSCourse> {
    const moodleCourse = await this.moodleClient.getCourse(Number(id));
    return this.mapToCourse(moodleCourse);
  }

  private mapToCourse(moodle: MoodleCourse): LMSCourse {
    return {
      id: String(moodle.courseid),
      title: moodle.fullname,
      description: moodle.summary,
      modules: moodle.sections.map(this.mapToModule),
    };
  }
}
```

#### 8.2.2 Facade Pattern - Notification Service

```typescript
// NotificationFacade.ts

class NotificationFacade {
  private emailService: EmailService;
  private smsService: SMSService;
  private pushService: PushNotificationService;
  private preferenceService: NotificationPreferenceService;

  constructor(
    emailService: EmailService,
    smsService: SMSService,
    pushService: PushNotificationService,
    preferenceService: NotificationPreferenceService
  ) {
    this.emailService = emailService;
    this.smsService = smsService;
    this.pushService = pushService;
    this.preferenceService = preferenceService;
  }

  async notify(userId: string, notification: Notification): Promise<void> {
    const preferences = await this.preferenceService.get(userId);
    const promises: Promise<void>[] = [];

    if (preferences.email && notification.channels.includes('email')) {
      promises.push(this.emailService.send(userId, notification));
    }
    if (preferences.sms && notification.channels.includes('sms')) {
      promises.push(this.smsService.send(userId, notification));
    }
    if (preferences.push && notification.channels.includes('push')) {
      promises.push(this.pushService.send(userId, notification));
    }

    await Promise.allSettled(promises);
  }
}
```

#### 8.2.3 Decorator Pattern - Caching Layer

```typescript
// CachingDecorator.ts

interface StudentRepository {
  findById(id: string): Promise<Student>;
  findByClass(classId: string): Promise<Student[]>;
}

class CachingStudentRepository implements StudentRepository {
  private repository: StudentRepository;
  private cache: CacheService;
  private ttl: number;

  constructor(repository: StudentRepository, cache: CacheService, ttl = 3600) {
    this.repository = repository;
    this.cache = cache;
    this.ttl = ttl;
  }

  async findById(id: string): Promise<Student> {
    const cacheKey = `student:${id}`;

    const cached = await this.cache.get<Student>(cacheKey);
    if (cached) return cached;

    const student = await this.repository.findById(id);
    await this.cache.set(cacheKey, student, this.ttl);
    return student;
  }

  async findByClass(classId: string): Promise<Student[]> {
    const cacheKey = `students:class:${classId}`;

    const cached = await this.cache.get<Student[]>(cacheKey);
    if (cached) return cached;

    const students = await this.repository.findByClass(classId);
    await this.cache.set(cacheKey, students, this.ttl);
    return students;
  }
}
```

### 8.3 Behavioral Patterns

#### 8.3.1 Strategy Pattern - Grading Calculator

```typescript
// GradingStrategy.ts

interface GradingStrategy {
  calculate(scores: Score[]): Grade;
}

class PercentageGrading implements GradingStrategy {
  calculate(scores: Score[]): Grade {
    const total = scores.reduce((sum, s) => sum + s.obtained, 0);
    const max = scores.reduce((sum, s) => sum + s.maximum, 0);
    const percentage = (total / max) * 100;
    return this.percentageToGrade(percentage);
  }
}

class GPAGrading implements GradingStrategy {
  calculate(scores: Score[]): Grade {
    const weightedSum = scores.reduce(
      (sum, s) => sum + (s.obtained / s.maximum) * s.credits,
      0
    );
    const totalCredits = scores.reduce((sum, s) => sum + s.credits, 0);
    const gpa = (weightedSum / totalCredits) * 4;
    return this.gpaToGrade(gpa);
  }
}

class GradeCalculator {
  private strategy: GradingStrategy;

  setStrategy(strategy: GradingStrategy): void {
    this.strategy = strategy;
  }

  calculate(scores: Score[]): Grade {
    return this.strategy.calculate(scores);
  }
}
```

#### 8.3.2 Observer Pattern - Event System

```typescript
// EventEmitter.ts

interface EventHandler<T> {
  (event: T): void | Promise<void>;
}

class EventEmitter<Events extends Record<string, unknown>> {
  private handlers: Map<keyof Events, Set<EventHandler<any>>> = new Map();

  on<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler);
  }

  off<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): void {
    this.handlers.get(event)?.delete(handler);
  }

  async emit<K extends keyof Events>(event: K, data: Events[K]): Promise<void> {
    const handlers = this.handlers.get(event);
    if (handlers) {
      await Promise.all([...handlers].map(h => h(data)));
    }
  }
}

// Usage
interface AppEvents {
  'student.enrolled': { studentId: string; classId: string };
  'payment.completed': { transactionId: string; amount: Money };
  'grade.updated': { studentId: string; subjectId: string; grade: Grade };
}

const events = new EventEmitter<AppEvents>();

events.on('payment.completed', async (data) => {
  await sendReceipt(data.transactionId);
  await updateStudentStatus(data);
});
```

#### 8.3.3 Command Pattern - Action System

```typescript
// Command.ts

interface Command {
  execute(): Promise<void>;
  undo(): Promise<void>;
}

class EnrollStudentCommand implements Command {
  constructor(
    private studentId: string,
    private classId: string,
    private enrollmentService: EnrollmentService
  ) {}

  async execute(): Promise<void> {
    await this.enrollmentService.enroll(this.studentId, this.classId);
  }

  async undo(): Promise<void> {
    await this.enrollmentService.unenroll(this.studentId, this.classId);
  }
}

class CommandInvoker {
  private history: Command[] = [];

  async execute(command: Command): Promise<void> {
    await command.execute();
    this.history.push(command);
  }

  async undo(): Promise<void> {
    const command = this.history.pop();
    if (command) {
      await command.undo();
    }
  }
}
```

#### 8.3.4 Chain of Responsibility - Validation

```typescript
// ValidationChain.ts

abstract class Validator<T> {
  protected next: Validator<T> | null = null;

  setNext(validator: Validator<T>): Validator<T> {
    this.next = validator;
    return validator;
  }

  async validate(data: T): Promise<ValidationResult> {
    const result = await this.doValidate(data);
    if (!result.isValid) {
      return result;
    }
    if (this.next) {
      return this.next.validate(data);
    }
    return { isValid: true };
  }

  protected abstract doValidate(data: T): Promise<ValidationResult>;
}

class RequiredFieldsValidator extends Validator<StudentData> {
  protected async doValidate(data: StudentData): Promise<ValidationResult> {
    if (!data.firstName || !data.lastName || !data.email) {
      return { isValid: false, error: 'Required fields missing' };
    }
    return { isValid: true };
  }
}

class EmailFormatValidator extends Validator<StudentData> {
  protected async doValidate(data: StudentData): Promise<ValidationResult> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { isValid: false, error: 'Invalid email format' };
    }
    return { isValid: true };
  }
}

// Usage
const validationChain = new RequiredFieldsValidator();
validationChain
  .setNext(new EmailFormatValidator())
  .setNext(new UniqueEmailValidator(userRepository));

const result = await validationChain.validate(studentData);
```

---

## 9. SOLID Principles Application

### 9.1 Single Responsibility Principle (SRP)

Each class has one reason to change:

```typescript
// BAD: Multiple responsibilities
class StudentManager {
  saveStudent(student: Student): void { /* ... */ }
  sendWelcomeEmail(student: Student): void { /* ... */ }
  generateReport(student: Student): Report { /* ... */ }
  calculateGPA(student: Student): number { /* ... */ }
}

// GOOD: Separated responsibilities
class StudentRepository {
  save(student: Student): Promise<void> { /* ... */ }
  findById(id: string): Promise<Student> { /* ... */ }
}

class StudentNotificationService {
  sendWelcomeEmail(student: Student): Promise<void> { /* ... */ }
  sendProgressReport(student: Student): Promise<void> { /* ... */ }
}

class StudentReportGenerator {
  generateProgressReport(student: Student): Report { /* ... */ }
  generateTranscript(student: Student): Transcript { /* ... */ }
}

class GPACalculator {
  calculate(grades: Grade[]): number { /* ... */ }
}
```

### 9.2 Open/Closed Principle (OCP)

Open for extension, closed for modification:

```typescript
// Payment gateway extensibility
interface PaymentGateway {
  processPayment(payment: PaymentRequest): Promise<PaymentResult>;
}

class BkashGateway implements PaymentGateway {
  async processPayment(payment: PaymentRequest): Promise<PaymentResult> {
    // bKash-specific implementation
  }
}

class NagadGateway implements PaymentGateway {
  async processPayment(payment: PaymentRequest): Promise<PaymentResult> {
    // Nagad-specific implementation
  }
}

// NEW: Adding new gateway without modifying existing code
class RocketGateway implements PaymentGateway {
  async processPayment(payment: PaymentRequest): Promise<PaymentResult> {
    // Rocket-specific implementation
  }
}

// PaymentService doesn't need modification for new gateways
class PaymentService {
  constructor(private gateway: PaymentGateway) {}

  async process(payment: PaymentRequest): Promise<PaymentResult> {
    return this.gateway.processPayment(payment);
  }
}
```

### 9.3 Liskov Substitution Principle (LSP)

Subtypes must be substitutable for their base types:

```typescript
// Base class contract
abstract class User {
  abstract getPermissions(): Permission[];
  abstract canAccessResource(resource: Resource): boolean;
}

class Student extends User {
  getPermissions(): Permission[] {
    return [Permission.VIEW_GRADES, Permission.SUBMIT_ASSIGNMENTS];
  }

  canAccessResource(resource: Resource): boolean {
    return resource.type === 'course' &&
           this.enrolledCourses.includes(resource.id);
  }
}

class Teacher extends User {
  getPermissions(): Permission[] {
    return [
      Permission.VIEW_GRADES,
      Permission.EDIT_GRADES,
      Permission.CREATE_ASSIGNMENTS,
    ];
  }

  canAccessResource(resource: Resource): boolean {
    return resource.type === 'course' &&
           this.assignedCourses.includes(resource.id);
  }
}

// Works with any User subtype
function checkAccess(user: User, resource: Resource): boolean {
  return user.canAccessResource(resource);
}
```

### 9.4 Interface Segregation Principle (ISP)

Clients shouldn't depend on interfaces they don't use:

```typescript
// BAD: Fat interface
interface UserOperations {
  createUser(data: UserData): Promise<User>;
  updateUser(id: string, data: UserData): Promise<User>;
  deleteUser(id: string): Promise<void>;
  login(credentials: Credentials): Promise<Session>;
  logout(sessionId: string): Promise<void>;
  resetPassword(email: string): Promise<void>;
  sendNotification(userId: string, msg: string): Promise<void>;
}

// GOOD: Segregated interfaces
interface UserRepository {
  create(data: UserData): Promise<User>;
  update(id: string, data: UserData): Promise<User>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<User | null>;
}

interface AuthService {
  login(credentials: Credentials): Promise<Session>;
  logout(sessionId: string): Promise<void>;
  validateSession(sessionId: string): Promise<boolean>;
}

interface PasswordService {
  reset(email: string): Promise<void>;
  change(userId: string, newPassword: string): Promise<void>;
  validate(password: string): ValidationResult;
}

interface NotificationService {
  send(userId: string, notification: Notification): Promise<void>;
}
```

### 9.5 Dependency Inversion Principle (DIP)

Depend on abstractions, not concretions:

```typescript
// BAD: Direct dependency on concrete implementation
class StudentService {
  private repository = new MySQLStudentRepository();
  private emailSender = new SendGridEmailSender();

  async enrollStudent(data: StudentData): Promise<Student> {
    const student = await this.repository.save(data);
    await this.emailSender.sendWelcome(student.email);
    return student;
  }
}

// GOOD: Depend on abstractions
interface StudentRepository {
  save(data: StudentData): Promise<Student>;
  findById(id: string): Promise<Student | null>;
}

interface EmailSender {
  send(to: string, template: EmailTemplate): Promise<void>;
}

class StudentService {
  constructor(
    private repository: StudentRepository,
    private emailSender: EmailSender
  ) {}

  async enrollStudent(data: StudentData): Promise<Student> {
    const student = await this.repository.save(data);
    await this.emailSender.send(student.email, EmailTemplate.WELCOME);
    return student;
  }
}

// Dependency injection setup
const studentService = new StudentService(
  new PostgreSQLStudentRepository(db),
  new SendGridEmailSender(apiKey)
);
```

---

## 10. Design Summary

### 10.1 Architecture Overview

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| Architecture Style | Modular Monolith with Microservices-ready | Solo developer efficiency with future scalability |
| API Style | RESTful with GraphQL option | Standard REST for simplicity, GraphQL for complex queries |
| Data Architecture | Polyglot persistence | Right database for each use case |
| Integration Pattern | Adapter/Facade | Clean separation from external systems |
| Event Handling | Event-driven async | Decoupled components, improved responsiveness |

### 10.2 Key Design Decisions

1. **Hybrid System Integration**: Use adapters to integrate Gibbon and Moodle while maintaining clean domain boundaries

2. **Domain-Driven Design**: Organize code by business domains (Student, Academic, Payment, LMS) rather than technical layers

3. **Repository Pattern**: Abstract data access to allow flexible persistence strategies

4. **Factory Pattern for Gateways**: Support multiple payment gateways with consistent interface

5. **Event-Driven Communication**: Use events for cross-module communication to reduce coupling

6. **Decorator for Cross-Cutting Concerns**: Apply caching, logging, and validation through decorators

### 10.3 Quality Attributes

| Attribute | Design Support |
|-----------|----------------|
| Maintainability | SOLID principles, clean architecture |
| Extensibility | Factory, Strategy, Open/Closed principle |
| Testability | Dependency injection, interface segregation |
| Performance | Caching decorator, async processing |
| Security | Authentication middleware, input validation chain |
| Scalability | Stateless services, event-driven architecture |

---

## Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Lead Developer | | | |
| Technical Reviewer | | | |
| Project Stakeholder | | | |

---

*This document serves as the primary technical design reference for the Smart Academy Digital Portal development team.*
