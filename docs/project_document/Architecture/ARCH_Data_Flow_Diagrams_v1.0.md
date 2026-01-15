# Data Flow Diagrams (DFD)
## Smart Academy Digital Portal
### Version 1.0

---

## Document Control

| Field | Value |
|-------|-------|
| Document ID | SA-ARCH-DFD-001 |
| Version | 1.0 |
| Status | Draft |
| Created Date | 2026-01-10 |
| Last Updated | 2026-01-10 |
| Author | Development Team |
| Approved By | Project Stakeholders |

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [DFD Notation Guide](#2-dfd-notation-guide)
3. [Context Diagram (Level 0)](#3-context-diagram-level-0)
4. [System Overview (Level 1)](#4-system-overview-level-1)
5. [Admission Process DFD](#5-admission-process-dfd)
6. [Attendance Management DFD](#6-attendance-management-dfd)
7. [Grading System DFD](#7-grading-system-dfd)
8. [Payment Processing DFD](#8-payment-processing-dfd)
9. [Learning Management DFD](#9-learning-management-dfd)
10. [Islamic Education Module DFD](#10-islamic-education-module-dfd)
11. [Reporting System DFD](#11-reporting-system-dfd)
12. [Communication System DFD](#12-communication-system-dfd)

---

## 1. Introduction

### 1.1 Purpose

This document provides comprehensive Data Flow Diagrams (DFDs) for the Smart Academy Digital Portal. DFDs visually represent how data moves through the system, from input to storage to output.

### 1.2 Scope

The diagrams cover:
- Context-level system overview
- Major subsystem data flows
- Detailed process flows for critical functions
- Data stores and external entities

### 1.3 DFD Levels

| Level | Description | Detail |
|-------|-------------|--------|
| 0 | Context Diagram | System as single process with external entities |
| 1 | System Overview | Major subsystems and their interactions |
| 2 | Detailed Process | Individual processes within subsystems |

---

## 2. DFD Notation Guide

### 2.1 Symbols Used

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              DFD NOTATION LEGEND                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│   ┌───────────────┐                                                                 │
│   │               │     EXTERNAL ENTITY                                             │
│   │   [Entity]    │     Sources or destinations of data outside the system         │
│   │               │     Examples: Student, Teacher, Payment Gateway                 │
│   └───────────────┘                                                                 │
│                                                                                      │
│   ╔═══════════════╗                                                                 │
│   ║               ║     PROCESS                                                     │
│   ║  [1.0]        ║     Transforms or manipulates data                              │
│   ║  Process Name ║     Numbered for reference                                      │
│   ║               ║                                                                 │
│   ╚═══════════════╝                                                                 │
│                                                                                      │
│   ═══════════════════                                                               │
│   │  Data Store   │     DATA STORE                                                  │
│   │  D1           │     Repository where data is stored                             │
│   ═══════════════════   Open-ended rectangle                                        │
│                                                                                      │
│   ────────────────►     DATA FLOW                                                   │
│                         Arrow showing direction of data movement                    │
│                         Labeled with data description                               │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Context Diagram (Level 0)

### 3.1 Smart Academy Digital Portal - Context Level

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                              CONTEXT DIAGRAM (LEVEL 0)                                       │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                              │
│                                                                                              │
│   ┌─────────────┐                                          ┌─────────────┐                  │
│   │   STUDENT   │                                          │   TEACHER   │                  │
│   └──────┬──────┘                                          └──────┬──────┘                  │
│          │                                                        │                         │
│          │ • Enrollment request                                   │ • Class schedules       │
│          │ • Assignment submissions                               │ • Assignment creation   │
│          │ • Course access requests                               │ • Grade submissions     │
│          │ • Progress queries                                     │ • Attendance marking    │
│          │                                                        │                         │
│          │                 ╔════════════════════════╗            │                         │
│          │                 ║                        ║            │                         │
│          └────────────────►║                        ║◄───────────┘                         │
│                            ║   SMART ACADEMY        ║                                       │
│          ┌────────────────►║   DIGITAL PORTAL       ║◄───────────┐                         │
│          │                 ║                        ║            │                         │
│          │                 ║   [0.0]                ║            │                         │
│          │                 ║                        ║            │                         │
│          │                 ╚════════════════════════╝            │                         │
│          │                    │            │                     │                         │
│          │                    │            │                     │                         │
│   ┌──────┴──────┐             │            │              ┌──────┴──────┐                  │
│   │   PARENT/   │             │            │              │   ADMIN     │                  │
│   │   GUARDIAN  │◄────────────┘            └──────────────│             │                  │
│   └─────────────┘                                         └─────────────┘                  │
│          │ • Progress reports                                    │ • System configuration  │
│          │ • Payment receipts                                    │ • User management       │
│          │ • Notifications                                       │ • Report requests       │
│          │ • Fee invoices                                        │ • Audit logs            │
│          │                                                        │                         │
│          ▼                                                        ▼                         │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐              │
│   │  PAYMENT    │     │    SMS      │     │   EMAIL     │     │ EDUCATION   │              │
│   │  GATEWAYS   │     │  PROVIDER   │     │  SERVICE    │     │ BOARD API   │              │
│   │             │     │             │     │             │     │             │              │
│   │ bKash,Nagad │◄────│ BulkSMSBD   │◄────│  SendGrid   │◄────│ BD Board    │              │
│   │ SSLCommerz  │     │             │     │             │     │             │              │
│   └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘              │
│          ▲                   ▲                   ▲                   ▲                     │
│          │                   │                   │                   │                     │
│          │ Payment requests  │ SMS messages      │ Email content    │ Result queries      │
│          │ Transaction status│ Delivery status   │ Delivery status  │ Verification        │
│          │                   │                   │                   │                     │
│          └───────────────────┴───────────────────┴───────────────────┘                     │
│                                         │                                                   │
│                                         │                                                   │
│                              ╔════════════════════════╗                                     │
│                              ║   SMART ACADEMY        ║                                     │
│                              ║   DIGITAL PORTAL       ║                                     │
│                              ╚════════════════════════╝                                     │
│                                                                                              │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. System Overview (Level 1)

### 4.1 Main System Decomposition

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    LEVEL 1 DFD - SYSTEM OVERVIEW                                     │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                      │
│  ┌──────────┐        ╔══════════════════╗                      ╔══════════════════╗                 │
│  │ STUDENT  │───────►║  [1.0]           ║    student data     ║  [2.0]           ║                 │
│  │          │        ║  AUTHENTICATION  ║─────────────────────►║  STUDENT         ║                 │
│  └──────────┘        ║  & ACCESS        ║                      ║  MANAGEMENT      ║                 │
│       ▲              ╚════════╤═════════╝                      ╚════════╤═════════╝                 │
│       │                       │                                         │                           │
│       │ session               │ auth token                              │ enrollment                │
│       │                       ▼                                         ▼                           │
│       │              ═══════════════════                       ═══════════════════                  │
│       │              │ D1: User         │                      │ D2: Student      │                  │
│       │              │ Sessions         │                      │ Records          │                  │
│       │              ═══════════════════                       ═══════════════════                  │
│       │                       │                                         │                           │
│       │                       │                                         │                           │
│  ┌────┴─────┐                 ▼                                         ▼                           │
│  │ TEACHER  │        ╔══════════════════╗                      ╔══════════════════╗                 │
│  │          │───────►║  [3.0]           ║    academic data    ║  [4.0]           ║                 │
│  └──────────┘        ║  ACADEMIC        ║─────────────────────►║  GRADING &       ║                 │
│       │              ║  MANAGEMENT      ║                      ║  ASSESSMENT      ║                 │
│       │              ╚════════╤═════════╝                      ╚════════╤═════════╝                 │
│       │                       │                                         │                           │
│       │                       │ class data                              │ grades                    │
│       │                       ▼                                         ▼                           │
│       │              ═══════════════════                       ═══════════════════                  │
│       │              │ D3: Academic     │                      │ D4: Grade        │                  │
│       │              │ Data             │                      │ Records          │                  │
│       │              ═══════════════════                       ═══════════════════                  │
│       │                       │                                         │                           │
│       │                       │                                         │                           │
│  ┌────┴─────┐                 ▼                                         ▼                           │
│  │ PARENT   │        ╔══════════════════╗                      ╔══════════════════╗                 │
│  │          │───────►║  [5.0]           ║    attendance data  ║  [6.0]           ║                 │
│  └──────────┘        ║  ATTENDANCE      ║─────────────────────►║  LEARNING        ║                 │
│       │              ║  MANAGEMENT      ║                      ║  MANAGEMENT      ║                 │
│       │              ╚════════╤═════════╝                      ╚════════╤═════════╝                 │
│       │                       │                                         │                           │
│       │                       │ attendance                              │ course data               │
│       │                       ▼                                         ▼                           │
│       │              ═══════════════════                       ═══════════════════                  │
│       │              │ D5: Attendance   │                      │ D6: Course       │                  │
│       │              │ Records          │                      │ Content          │                  │
│       │              ═══════════════════                       ═══════════════════                  │
│       │                       │                                         │                           │
│       │                       │                                         │                           │
│  ┌────┴─────┐                 ▼                                         ▼                           │
│  │ ADMIN    │        ╔══════════════════╗                      ╔══════════════════╗                 │
│  │          │───────►║  [7.0]           ║    fee data         ║  [8.0]           ║                 │
│  └──────────┘        ║  PAYMENT &       ║─────────────────────►║  REPORTING &     ║                 │
│                      ║  FINANCE         ║                      ║  ANALYTICS       ║                 │
│                      ╚════════╤═════════╝                      ╚════════╤═════════╝                 │
│                               │                                         │                           │
│                               │ transactions                            │ reports                   │
│                               ▼                                         ▼                           │
│                      ═══════════════════                       ═══════════════════                  │
│                      │ D7: Financial    │                      │ D8: Report       │                  │
│                      │ Records          │                      │ Repository       │                  │
│                      ═══════════════════                       ═══════════════════                  │
│                               │                                         │                           │
│                               ▼                                         ▼                           │
│                      ╔══════════════════╗                      ╔══════════════════╗                 │
│                      ║  [9.0]           ║                      ║  [10.0]          ║                 │
│                      ║  NOTIFICATION    ║                      ║  ISLAMIC         ║                 │
│                      ║  SERVICES        ║                      ║  EDUCATION       ║                 │
│                      ╚════════════════════╝                    ╚════════════════════╝               │
│                               │                                         │                           │
│                               ▼                                         ▼                           │
│                      ┌─────────────┐                           ═══════════════════                  │
│                      │ SMS/EMAIL   │                           │ D9: Islamic      │                  │
│                      │ PROVIDERS   │                           │ Content          │                  │
│                      └─────────────┘                           ═══════════════════                  │
│                                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Admission Process DFD

### 5.1 Level 2 - Admission Process

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              LEVEL 2 DFD - ADMISSION PROCESS [2.0]                                   │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                      │
│  ┌──────────────┐                                                                                   │
│  │   PARENT/    │                                                                                   │
│  │   APPLICANT  │                                                                                   │
│  └───────┬──────┘                                                                                   │
│          │                                                                                          │
│          │ Application form data                                                                    │
│          │ (student info, documents,                                                                │
│          │  class preference)                                                                       │
│          ▼                                                                                          │
│  ╔══════════════════════╗                                                                           │
│  ║  [2.1]               ║                                                                           │
│  ║  RECEIVE             ║                                                                           │
│  ║  APPLICATION         ║                                                                           │
│  ║                      ║                                                                           │
│  ╚═══════════╤══════════╝                                                                           │
│              │                                                                                      │
│              │ Application record                                                                   │
│              ▼                                                                                      │
│  ═══════════════════════                                                                            │
│  │ D2.1: Applications   │                                                                           │
│  ═══════════════════════                                                                            │
│              │                                                                                      │
│              │ Pending applications                                                                 │
│              ▼                                                                                      │
│  ╔══════════════════════╗          ╔══════════════════════╗                                        │
│  ║  [2.2]               ║          ║  [2.3]               ║                                        │
│  ║  VALIDATE            ║─────────►║  VERIFY              ║                                        │
│  ║  APPLICATION         ║ Valid    ║  DOCUMENTS           ║                                        │
│  ║                      ║ data     ║                      ║                                        │
│  ╚═══════════╤══════════╝          ╚═══════════╤══════════╝                                        │
│              │                                  │                                                   │
│              │ Validation errors                │ Document status                                   │
│              ▼                                  ▼                                                   │
│  ┌──────────────┐              ═══════════════════════                                              │
│  │   PARENT/    │◄─────────────│ D2.2: Document       │                                              │
│  │   APPLICANT  │ Correction   │ Repository           │                                              │
│  └──────────────┘ request      ═══════════════════════                                              │
│                                         │                                                           │
│                                         │ Verified docs                                             │
│                                         ▼                                                           │
│                                ╔══════════════════════╗                                             │
│                                ║  [2.4]               ║                                             │
│                                ║  EVALUATE            ║                                             │
│                                ║  ELIGIBILITY         ║                                             │
│                                ║                      ║                                             │
│                                ╚═══════════╤══════════╝                                             │
│                                            │                                                        │
│               ┌────────────────────────────┼────────────────────────────┐                           │
│               │                            │                            │                           │
│               ▼                            ▼                            ▼                           │
│      ╔════════════════╗          ╔════════════════════╗       ╔════════════════╗                   │
│      ║  [2.5]         ║          ║  [2.6]             ║       ║  [2.7]         ║                   │
│      ║  REJECT        ║          ║  APPROVE           ║       ║  WAITLIST      ║                   │
│      ║  APPLICATION   ║          ║  ADMISSION         ║       ║  APPLICATION   ║                   │
│      ╚═══════╤════════╝          ╚═══════════╤════════╝       ╚═══════╤════════╝                   │
│              │                               │                        │                            │
│              │ Rejection notice              │ Admission letter       │ Waitlist notice            │
│              ▼                               ▼                        ▼                            │
│      ┌──────────────┐              ═══════════════════════   ═══════════════════════               │
│      │   PARENT/    │              │ D2.3: Admissions     │  │ D2.4: Waitlist     │               │
│      │   APPLICANT  │◄─────────────═══════════════════════   ═══════════════════════               │
│      └──────────────┘                        │                                                     │
│                                              │ Approved admission                                  │
│                                              ▼                                                     │
│                                     ╔══════════════════════╗                                       │
│                                     ║  [2.8]               ║                                       │
│                                     ║  GENERATE            ║                                       │
│                                     ║  FEE INVOICE         ║                                       │
│                                     ║                      ║                                       │
│                                     ╚═══════════╤══════════╝                                       │
│                                                 │                                                  │
│                                                 │ Invoice                                          │
│                                                 ▼                                                  │
│                      ┌────────────────────────────────────────────────────────┐                    │
│                      │                                                        │                    │
│                      ▼                                                        ▼                    │
│             ═══════════════════════                                  ┌──────────────┐              │
│             │ D7: Financial       │                                  │   PARENT/    │              │
│             │ Records             │                                  │   APPLICANT  │              │
│             ═══════════════════════                                  └───────┬──────┘              │
│                      │                                                       │                     │
│                      │                                                       │ Payment             │
│                      ▼                                                       ▼                     │
│             ╔══════════════════════╗                                ╔══════════════════════╗       │
│             ║  [2.9]               ║        Confirmation            ║  [2.10]              ║       │
│             ║  PROCESS             ║◄───────────────────────────────║  FINALIZE            ║       │
│             ║  PAYMENT             ║                                ║  ENROLLMENT          ║       │
│             ╚═══════════╤══════════╝                                ╚═══════════╤══════════╝       │
│                         │                                                       │                  │
│                         ▼                                                       ▼                  │
│             ┌─────────────┐                                         ═══════════════════════        │
│             │  PAYMENT    │                                         │ D2: Student          │        │
│             │  GATEWAY    │                                         │ Records              │        │
│             └─────────────┘                                         ═══════════════════════        │
│                                                                                │                   │
│                                                                                │ Enrolled student  │
│                                                                                ▼                   │
│                                                                       ╔══════════════════════╗     │
│                                                                       ║  [2.11]              ║     │
│                                                                       ║  SYNC TO             ║     │
│                                                                       ║  GIBBON/MOODLE       ║     │
│                                                                       ╚═══════════╤══════════╝     │
│                                                                                   │                │
│                                                                                   ▼                │
│                                                                       ┌─────────────────┐          │
│                                                                       │ GIBBON / MOODLE │          │
│                                                                       └─────────────────┘          │
│                                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Admission Data Flow Summary

| Process | Input | Output | Data Store |
|---------|-------|--------|------------|
| 2.1 Receive Application | Application form, documents | Application record | D2.1 Applications |
| 2.2 Validate Application | Application record | Validation status | - |
| 2.3 Verify Documents | Document files | Verification status | D2.2 Document Repository |
| 2.4 Evaluate Eligibility | Verified application | Eligibility decision | - |
| 2.5 Reject Application | Ineligible application | Rejection notice | D2.1 Applications |
| 2.6 Approve Admission | Eligible application | Admission letter | D2.3 Admissions |
| 2.7 Waitlist Application | Capacity full | Waitlist notice | D2.4 Waitlist |
| 2.8 Generate Fee Invoice | Approved admission | Invoice | D7 Financial Records |
| 2.9 Process Payment | Payment data | Receipt | D7 Financial Records |
| 2.10 Finalize Enrollment | Payment confirmation | Student record | D2 Student Records |
| 2.11 Sync to Gibbon/Moodle | Student record | Sync confirmation | External Systems |

---

## 6. Attendance Management DFD

### 6.1 Level 2 - Attendance Management

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                            LEVEL 2 DFD - ATTENDANCE MANAGEMENT [5.0]                                 │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                      │
│  ┌──────────────┐                        ═══════════════════════                                    │
│  │   TEACHER    │                        │ D3: Academic        │                                    │
│  └───────┬──────┘                        │ Data                │                                    │
│          │                               ═══════════════════════                                    │
│          │ Attendance marking                     │                                                 │
│          │ request                                │ Class roster                                    │
│          ▼                                        ▼                                                 │
│  ╔══════════════════════╗               ╔══════════════════════╗                                   │
│  ║  [5.1]               ║               ║  [5.2]               ║                                   │
│  ║  INITIATE            ║──────────────►║  LOAD                ║                                   │
│  ║  ATTENDANCE          ║ Date, Class   ║  STUDENT LIST        ║                                   │
│  ║  SESSION             ║               ║                      ║                                   │
│  ╚═══════════════════════╝               ╚═══════════╤══════════╝                                   │
│                                                      │                                              │
│                                                      │ Student list with                            │
│                                                      │ enrollment status                            │
│                                                      ▼                                              │
│  ╔══════════════════════╗               ╔══════════════════════╗                                   │
│  ║  [5.3]               ║◄──────────────║  [5.4]               ║                                   │
│  ║  RECORD              ║ Attendance    ║  DISPLAY             ║                                   │
│  ║  ATTENDANCE          ║ data          ║  ATTENDANCE          ║                                   │
│  ║                      ║               ║  FORM                ║                                   │
│  ╚═══════════╤══════════╝               ╚════════════════════════╝                                   │
│              │                                                                                      │
│              │ Attendance records                                                                   │
│              │ (Present/Absent/Late/                                                               │
│              │  Excused)                                                                            │
│              ▼                                                                                      │
│  ═══════════════════════                                                                            │
│  │ D5: Attendance       │                                                                           │
│  │ Records              │                                                                           │
│  ═══════════════════════                                                                            │
│              │                                                                                      │
│       ┌──────┴───────────────────────────────────────────────────┐                                 │
│       │                                    │                     │                                 │
│       ▼                                    ▼                     ▼                                 │
│  ╔══════════════════╗              ╔══════════════════╗  ╔══════════════════╗                      │
│  ║  [5.5]           ║              ║  [5.6]           ║  ║  [5.7]           ║                      │
│  ║  CALCULATE       ║              ║  DETECT          ║  ║  SYNC TO         ║                      │
│  ║  ATTENDANCE      ║              ║  PATTERNS        ║  ║  GIBBON          ║                      │
│  ║  STATISTICS      ║              ║  & ALERTS        ║  ║                  ║                      │
│  ╚═══════╤══════════╝              ╚═══════╤══════════╝  ╚═══════╤══════════╝                      │
│          │                                 │                     │                                 │
│          │ Statistics                      │ Alert triggers      │ Sync data                       │
│          ▼                                 ▼                     ▼                                 │
│  ═══════════════════════           ╔══════════════════╗  ┌─────────────────┐                       │
│  │ D5.1: Attendance     │          ║  [5.8]           ║  │   GIBBON SMS    │                       │
│  │ Statistics           │          ║  SEND            ║  └─────────────────┘                       │
│  ═══════════════════════           ║  NOTIFICATION    ║                                            │
│          │                          ╚═══════╤══════════╝                                            │
│          │                                  │                                                       │
│          │                                  │ Alert messages                                        │
│          │                                  ▼                                                       │
│          │                  ┌───────────────────────────────────┐                                  │
│          │                  │              │                    │                                  │
│          │                  ▼              ▼                    ▼                                  │
│          │           ┌──────────┐   ┌──────────┐         ┌──────────┐                              │
│          │           │  SMS     │   │  EMAIL   │         │   PUSH   │                              │
│          │           │ PROVIDER │   │ SERVICE  │         │ SERVICE  │                              │
│          │           └──────────┘   └──────────┘         └──────────┘                              │
│          │                  │              │                    │                                  │
│          │                  └──────────────┼────────────────────┘                                  │
│          │                                 │                                                       │
│          │                                 ▼                                                       │
│          │                         ┌──────────────┐                                                │
│          │                         │   PARENT/    │                                                │
│          │                         │   GUARDIAN   │                                                │
│          │                         └──────────────┘                                                │
│          │                                                                                         │
│          │                                                                                         │
│          ▼                                                                                         │
│  ╔══════════════════════╗                                                                          │
│  ║  [5.9]               ║                                                                          │
│  ║  GENERATE            ║                                                                          │
│  ║  ATTENDANCE          ║                                                                          │
│  ║  REPORT              ║                                                                          │
│  ╚═══════════╤══════════╝                                                                          │
│              │                                                                                      │
│              │ Attendance report                                                                    │
│              ▼                                                                                      │
│  ┌───────────────────────────────────────────────────┐                                             │
│  │                       │                           │                                             │
│  ▼                       ▼                           ▼                                             │
│  ┌──────────────┐   ┌──────────────┐        ┌──────────────┐                                       │
│  │   TEACHER    │   │   PARENT     │        │   ADMIN      │                                       │
│  └──────────────┘   └──────────────┘        └──────────────┘                                       │
│                                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Attendance Data Dictionary

| Data Element | Description | Format |
|--------------|-------------|--------|
| attendance_id | Unique identifier | UUID |
| student_id | Reference to student | UUID |
| class_id | Reference to class | UUID |
| date | Attendance date | DATE |
| status | Present/Absent/Late/Excused | ENUM |
| marked_by | Teacher who marked | UUID |
| marked_at | Timestamp of marking | DATETIME |
| notes | Optional remarks | TEXT |
| period | Class period number | INT |

---

## 7. Grading System DFD

### 7.1 Level 2 - Grading System

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              LEVEL 2 DFD - GRADING SYSTEM [4.0]                                      │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                      │
│  ┌──────────────┐                                                                                   │
│  │   TEACHER    │                                                                                   │
│  └───────┬──────┘                                                                                   │
│          │                                                                                          │
│          │ Grade entry request                                                                      │
│          ▼                                                                                          │
│  ╔══════════════════════╗           ═══════════════════════                                        │
│  ║  [4.1]               ║           │ D3: Academic        │                                        │
│  ║  SELECT              ║◄──────────│ Data                │                                        │
│  ║  ASSESSMENT          ║           ═══════════════════════                                        │
│  ║  TYPE                ║                                                                          │
│  ╚═══════════╤══════════╝                                                                          │
│              │                                                                                      │
│              │ Assessment details                                                                   │
│              │ (Exam/Quiz/Assignment/                                                              │
│              │  Project/Participation)                                                             │
│              ▼                                                                                      │
│  ╔══════════════════════╗           ═══════════════════════                                        │
│  ║  [4.2]               ║           │ D2: Student         │                                        │
│  ║  LOAD                ║◄──────────│ Records             │                                        │
│  ║  STUDENT LIST        ║           ═══════════════════════                                        │
│  ╚═══════════╤══════════╝                                                                          │
│              │                                                                                      │
│              │ Student list                                                                         │
│              ▼                                                                                      │
│  ╔══════════════════════╗                                                                          │
│  ║  [4.3]               ║                                                                          │
│  ║  ENTER               ║                                                                          │
│  ║  MARKS/GRADES        ║                                                                          │
│  ╚═══════════╤══════════╝                                                                          │
│              │                                                                                      │
│              │ Raw marks                                                                            │
│              ▼                                                                                      │
│  ╔══════════════════════╗           ═══════════════════════                                        │
│  ║  [4.4]               ║           │ D4.1: Grading       │                                        │
│  ║  APPLY               ║◄──────────│ Scale               │                                        │
│  ║  GRADING SCALE       ║           ═══════════════════════                                        │
│  ╚═══════════╤══════════╝                                                                          │
│              │                                                                                      │
│              │ Converted grades                                                                     │
│              ▼                                                                                      │
│  ╔══════════════════════╗                                                                          │
│  ║  [4.5]               ║                                                                          │
│  ║  VALIDATE            ║                                                                          │
│  ║  GRADES              ║                                                                          │
│  ╚═══════════╤══════════╝                                                                          │
│              │                                                                                      │
│       ┌──────┴───────────────────────────────┐                                                     │
│       │                                      │                                                     │
│       ▼                                      ▼                                                     │
│  ╔══════════════════╗              ╔══════════════════════╗                                        │
│  ║  [4.6]           ║              ║  [4.7]               ║                                        │
│  ║  SAVE            ║              ║  FLAG                ║                                        │
│  ║  GRADES          ║              ║  ANOMALIES           ║                                        │
│  ╚═══════╤══════════╝              ╚═══════════╤══════════╝                                        │
│          │                                     │                                                   │
│          │ Grades                              │ Anomaly report                                    │
│          ▼                                     ▼                                                   │
│  ═══════════════════════               ┌──────────────┐                                            │
│  │ D4: Grade            │              │   TEACHER    │                                            │
│  │ Records              │              └──────────────┘                                            │
│  ═══════════════════════                                                                           │
│          │                                                                                         │
│          │ Saved grades                                                                            │
│          ▼                                                                                         │
│  ╔══════════════════════╗                                                                          │
│  ║  [4.8]               ║                                                                          │
│  ║  CALCULATE           ║                                                                          │
│  ║  AGGREGATES          ║                                                                          │
│  ║  (GPA/Average)       ║                                                                          │
│  ╚═══════════╤══════════╝                                                                          │
│              │                                                                                      │
│       ┌──────┴───────────────────────────────────────────┐                                         │
│       │                                                  │                                         │
│       ▼                                                  ▼                                         │
│  ╔══════════════════════╗                  ╔══════════════════════╗                               │
│  ║  [4.9]               ║                  ║  [4.10]              ║                               │
│  ║  SYNC TO             ║                  ║  GENERATE            ║                               │
│  ║  GIBBON/MOODLE       ║                  ║  REPORT CARD         ║                               │
│  ╚═══════════╤══════════╝                  ╚═══════════╤══════════╝                               │
│              │                                         │                                          │
│              ▼                                         │ Report card                              │
│  ┌─────────────────────┐                              ▼                                          │
│  │ GIBBON SMS /        │                   ═══════════════════════                               │
│  │ MOODLE LMS          │                   │ D8: Report          │                               │
│  └─────────────────────┘                   │ Repository          │                               │
│                                            ═══════════════════════                               │
│                                                        │                                          │
│                                                        │ Report cards                             │
│                                            ┌───────────┴───────────┐                              │
│                                            │                       │                              │
│                                            ▼                       ▼                              │
│                                   ┌──────────────┐        ┌──────────────┐                        │
│                                   │   STUDENT    │        │   PARENT     │                        │
│                                   └──────────────┘        └──────────────┘                        │
│                                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Grading Scale Reference

| Percentage | Grade | Grade Point | Description |
|------------|-------|-------------|-------------|
| 80-100 | A+ | 5.00 | Outstanding |
| 70-79 | A | 4.00 | Excellent |
| 60-69 | A- | 3.50 | Very Good |
| 50-59 | B | 3.00 | Good |
| 40-49 | C | 2.00 | Satisfactory |
| 33-39 | D | 1.00 | Pass |
| 0-32 | F | 0.00 | Fail |

---

## 8. Payment Processing DFD

### 8.1 Level 2 - Payment Processing

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                            LEVEL 2 DFD - PAYMENT PROCESSING [7.0]                                    │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                      │
│  ┌──────────────┐                                                                                   │
│  │   ADMIN      │                                                                                   │
│  └───────┬──────┘                                                                                   │
│          │                                                                                          │
│          │ Fee structure                                                                            │
│          │ configuration                                                                            │
│          ▼                                                                                          │
│  ╔══════════════════════╗                                                                          │
│  ║  [7.1]               ║                                                                          │
│  ║  CONFIGURE           ║                                                                          │
│  ║  FEE STRUCTURE       ║                                                                          │
│  ╚═══════════╤══════════╝                                                                          │
│              │                                                                                      │
│              │ Fee structure                                                                        │
│              ▼                                                                                      │
│  ═══════════════════════                                                                           │
│  │ D7.1: Fee            │                                                                          │
│  │ Structures           │                                                                          │
│  ═══════════════════════                                                                           │
│              │                                                                                      │
│              ▼                                                                                      │
│  ╔══════════════════════╗          ═══════════════════════                                         │
│  ║  [7.2]               ║          │ D2: Student         │                                         │
│  ║  GENERATE            ║◄─────────│ Records             │                                         │
│  ║  INVOICES            ║          ═══════════════════════                                         │
│  ╚═══════════╤══════════╝                                                                          │
│              │                                                                                      │
│              │ Invoice                                                                              │
│              ▼                                                                                      │
│  ═══════════════════════                      ┌──────────────┐                                     │
│  │ D7.2: Invoices       │─────────────────────►│   PARENT     │                                     │
│  ═══════════════════════  Invoice notification└──────┬───────┘                                     │
│              │                                       │                                             │
│              │                                       │ Payment request                             │
│              │                                       ▼                                             │
│              │                              ╔══════════════════════╗                               │
│              │                              ║  [7.3]               ║                               │
│              └─────────────────────────────►║  SELECT              ║                               │
│                    Invoice details          ║  PAYMENT METHOD      ║                               │
│                                             ╚═══════════╤══════════╝                               │
│                                                         │                                          │
│                   ┌─────────────────────────────────────┼─────────────────────────────────────┐    │
│                   │                                     │                                     │    │
│                   ▼                                     ▼                                     ▼    │
│          ╔══════════════════╗               ╔══════════════════╗              ╔══════════════════╗ │
│          ║  [7.4a]          ║               ║  [7.4b]          ║              ║  [7.4c]          ║ │
│          ║  PROCESS         ║               ║  PROCESS         ║              ║  PROCESS         ║ │
│          ║  bKash           ║               ║  NAGAD           ║              ║  SSLCommerz      ║ │
│          ║  PAYMENT         ║               ║  PAYMENT         ║              ║  PAYMENT         ║ │
│          ╚═══════╤══════════╝               ╚═══════╤══════════╝              ╚═══════╤══════════╝ │
│                  │                                  │                                 │            │
│                  ▼                                  ▼                                 ▼            │
│          ┌─────────────┐                    ┌─────────────┐                   ┌─────────────┐      │
│          │   bKash     │                    │   NAGAD     │                   │ SSLCommerz  │      │
│          │   API       │                    │   API       │                   │ API         │      │
│          └──────┬──────┘                    └──────┬──────┘                   └──────┬──────┘      │
│                 │                                  │                                 │            │
│                 │ Transaction result               │ Transaction result              │            │
│                 │                                  │                                 │            │
│                 └──────────────────────────────────┼─────────────────────────────────┘            │
│                                                    │                                              │
│                                                    ▼                                              │
│                                           ╔══════════════════════╗                               │
│                                           ║  [7.5]               ║                               │
│                                           ║  VERIFY              ║                               │
│                                           ║  TRANSACTION         ║                               │
│                                           ╚═══════════╤══════════╝                               │
│                                                       │                                          │
│                           ┌───────────────────────────┼───────────────────────────┐              │
│                           │                           │                           │              │
│                           ▼                           ▼                           ▼              │
│                  ╔════════════════╗          ╔════════════════╗          ╔════════════════╗      │
│                  ║  [7.6a]        ║          ║  [7.6b]        ║          ║  [7.6c]        ║      │
│                  ║  PAYMENT       ║          ║  PAYMENT       ║          ║  PAYMENT       ║      │
│                  ║  SUCCESS       ║          ║  FAILED        ║          ║  PENDING       ║      │
│                  ╚═══════╤════════╝          ╚═══════╤════════╝          ╚═══════╤════════╝      │
│                          │                           │                           │              │
│                          │                           │                           │ Retry        │
│                          │                           │                           ▼              │
│                          │                           │                    ╔══════════════╗      │
│                          │                           │                    ║  [7.7]       ║      │
│                          │                           │                    ║  SCHEDULE    ║      │
│                          │                           │                    ║  RETRY       ║      │
│                          │                           │                    ╚══════════════╝      │
│                          │                           │                                          │
│                          ▼                           ▼                                          │
│                  ═══════════════════════    ╔══════════════════════╗                            │
│                  │ D7.3: Transactions  │    ║  [7.8]               ║                            │
│                  ═══════════════════════    ║  SEND                ║                            │
│                          │                  ║  FAILURE             ║                            │
│                          │                  ║  NOTIFICATION        ║                            │
│                          ▼                  ╚═══════════╤══════════╝                            │
│                  ╔══════════════════════╗              │                                        │
│                  ║  [7.9]               ║              ▼                                        │
│                  ║  GENERATE            ║       ┌──────────────┐                                │
│                  ║  RECEIPT             ║       │   PARENT     │                                │
│                  ╚═══════════╤══════════╝       └──────────────┘                                │
│                              │                                                                  │
│                              │ Receipt                                                          │
│                              ▼                                                                  │
│                  ═══════════════════════                                                        │
│                  │ D7.4: Receipts      │                                                        │
│                  ═══════════════════════                                                        │
│                              │                                                                  │
│                       ┌──────┴──────────────────────────────────┐                               │
│                       │                                         │                               │
│                       ▼                                         ▼                               │
│              ╔══════════════════════╗               ╔══════════════════════╗                    │
│              ║  [7.10]              ║               ║  [7.11]              ║                    │
│              ║  UPDATE              ║               ║  SEND                ║                    │
│              ║  STUDENT             ║               ║  RECEIPT             ║                    │
│              ║  PAYMENT STATUS      ║               ║  NOTIFICATION        ║                    │
│              ╚═══════════╤══════════╝               ╚═══════════╤══════════╝                    │
│                          │                                      │                               │
│                          ▼                                      ▼                               │
│              ═══════════════════════                ┌───────────────────────────┐               │
│              │ D2: Student          │               │              │            │               │
│              │ Records              │               ▼              ▼            ▼               │
│              ═══════════════════════          ┌────────┐    ┌────────┐    ┌────────┐           │
│                                               │ EMAIL  │    │  SMS   │    │  PUSH  │           │
│                                               └────────┘    └────────┘    └────────┘           │
│                                                     │            │            │                │
│                                                     └────────────┼────────────┘                │
│                                                                  │                             │
│                                                                  ▼                             │
│                                                          ┌──────────────┐                      │
│                                                          │   PARENT     │                      │
│                                                          └──────────────┘                      │
│                                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Payment Flow Summary

| Step | Process | Data Input | Data Output | External System |
|------|---------|------------|-------------|-----------------|
| 1 | Configure Fee | Fee details | Fee structure | - |
| 2 | Generate Invoice | Student + Fee | Invoice | - |
| 3 | Select Payment Method | Invoice | Payment request | - |
| 4 | Process Payment | Payment request | Transaction | bKash/Nagad/SSLCommerz |
| 5 | Verify Transaction | Transaction ID | Verification status | Payment Gateway |
| 6 | Handle Result | Status | Success/Fail/Pending | - |
| 7 | Generate Receipt | Transaction | Receipt | - |
| 8 | Update Status | Payment status | Student record | - |
| 9 | Send Notification | Receipt | SMS/Email/Push | SendGrid/BulkSMSBD |

---

## 9. Learning Management DFD

### 9.1 Level 2 - Learning Management

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                          LEVEL 2 DFD - LEARNING MANAGEMENT [6.0]                                     │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                      │
│  ┌──────────────┐                                                                                   │
│  │   TEACHER    │                                                                                   │
│  └───────┬──────┘                                                                                   │
│          │                                                                                          │
│          │ Course content                                                                           │
│          ▼                                                                                          │
│  ╔══════════════════════╗                                                                          │
│  ║  [6.1]               ║                                                                          │
│  ║  CREATE/EDIT         ║                                                                          │
│  ║  COURSE              ║                                                                          │
│  ╚═══════════╤══════════╝                                                                          │
│              │                                                                                      │
│              │ Course data                                                                          │
│              ▼                                                                                      │
│  ═══════════════════════                              ╔══════════════════════╗                     │
│  │ D6: Course           │─────────────────────────────║  [6.2]               ║                     │
│  │ Content              │  Course sync                ║  SYNC TO             ║                     │
│  ═══════════════════════                              ║  MOODLE              ║                     │
│              │                                        ╚═══════════╤══════════╝                     │
│              │                                                    │                                │
│              │                                                    ▼                                │
│              │                                        ┌─────────────────┐                          │
│              │                                        │   MOODLE LMS    │                          │
│              │                                        └─────────────────┘                          │
│              │                                                                                     │
│              │ Course catalog                                                                      │
│              ▼                                                                                     │
│  ╔══════════════════════╗                                                                          │
│  ║  [6.3]               ║                                                                          │
│  ║  PUBLISH             ║                                                                          │
│  ║  COURSE              ║                                                                          │
│  ╚═══════════╤══════════╝                                                                          │
│              │                                                                                     │
│              │ Published course                                                                    │
│              ▼                                                                                     │
│  ╔══════════════════════╗         ┌──────────────┐                                                │
│  ║  [6.4]               ║◄────────│   STUDENT    │                                                │
│  ║  ENROLL              ║         └──────────────┘                                                │
│  ║  STUDENT             ║         Enrollment request                                              │
│  ╚═══════════╤══════════╝                                                                          │
│              │                                                                                     │
│              │ Enrollment                                                                          │
│              ▼                                                                                     │
│  ═══════════════════════                                                                          │
│  │ D6.1: Enrollments    │                                                                          │
│  ═══════════════════════                                                                          │
│              │                                                                                     │
│              ▼                                                                                     │
│  ╔══════════════════════╗                                                                          │
│  ║  [6.5]               ║◄────────┌──────────────┐                                                │
│  ║  ACCESS              ║         │   STUDENT    │                                                │
│  ║  CONTENT             ║         └──────────────┘                                                │
│  ╚═══════════╤══════════╝         Content request                                                  │
│              │                                                                                     │
│              │ Content (video/doc/quiz)                                                            │
│       ┌──────┴───────────────────────────────────────────────────┐                                │
│       │                                    │                     │                                │
│       ▼                                    ▼                     ▼                                │
│  ╔══════════════════╗              ╔══════════════════╗  ╔══════════════════╗                     │
│  ║  [6.6]           ║              ║  [6.7]           ║  ║  [6.8]           ║                     │
│  ║  STREAM          ║              ║  SERVE           ║  ║  PRESENT         ║                     │
│  ║  VIDEO           ║              ║  DOCUMENT        ║  ║  QUIZ            ║                     │
│  ╚═══════╤══════════╝              ╚═══════╤══════════╝  ╚═══════╤══════════╝                     │
│          │                                 │                     │                                │
│          │ Video stream                    │ Document            │ Quiz                           │
│          └─────────────────────────────────┼─────────────────────┘                                │
│                                            │                                                      │
│                                            ▼                                                      │
│                                   ┌──────────────┐                                                │
│                                   │   STUDENT    │                                                │
│                                   └───────┬──────┘                                                │
│                                           │                                                       │
│                                           │ Interaction data                                      │
│                                           │ (watch time, answers,                                 │
│                                           │  page views)                                          │
│                                           ▼                                                       │
│                                  ╔══════════════════════╗                                         │
│                                  ║  [6.9]               ║                                         │
│                                  ║  TRACK               ║                                         │
│                                  ║  PROGRESS            ║                                         │
│                                  ╚═══════════╤══════════╝                                         │
│                                              │                                                    │
│                                              │ Progress data                                      │
│                                              ▼                                                    │
│                                  ═══════════════════════                                         │
│                                  │ D6.2: Progress       │                                         │
│                                  │ Tracking             │                                         │
│                                  ═══════════════════════                                         │
│                                              │                                                    │
│                          ┌───────────────────┼───────────────────┐                               │
│                          │                   │                   │                               │
│                          ▼                   ▼                   ▼                               │
│                ╔══════════════════╗ ╔══════════════════╗ ╔══════════════════╗                    │
│                ║  [6.10]          ║ ║  [6.11]          ║ ║  [6.12]          ║                    │
│                ║  CALCULATE       ║ ║  GENERATE        ║ ║  CHECK           ║                    │
│                ║  COMPLETION      ║ ║  CERTIFICATE     ║ ║  PREREQUISITES   ║                    │
│                ╚═══════╤══════════╝ ╚═══════╤══════════╝ ╚═══════╤══════════╝                    │
│                        │                    │                    │                               │
│                        │                    │ Certificate        │ Unlock status                 │
│                        │                    ▼                    ▼                               │
│                        │           ═══════════════════════     ╔══════════════════╗              │
│                        │           │ D6.3: Certificates  │     ║  [6.13]          ║              │
│                        │           ═══════════════════════     ║  UNLOCK          ║              │
│                        │                    │                  ║  NEXT MODULE     ║              │
│                        │                    ▼                  ╚══════════════════╝              │
│                        │           ┌──────────────┐                                              │
│                        │           │   STUDENT    │                                              │
│                        │           └──────────────┘                                              │
│                        │                                                                         │
│                        │ Completion percentage                                                   │
│                        ▼                                                                         │
│               ┌──────────────────────────────────────┐                                           │
│               │                                      │                                           │
│               ▼                                      ▼                                           │
│      ┌──────────────┐                       ┌──────────────┐                                    │
│      │   STUDENT    │                       │   PARENT     │                                    │
│      └──────────────┘                       └──────────────┘                                    │
│                                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 10. Islamic Education Module DFD

### 10.1 Level 2 - Islamic Education

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                          LEVEL 2 DFD - ISLAMIC EDUCATION [10.0]                                      │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                      │
│  ┌──────────────┐                                                                                   │
│  │   STUDENT    │                                                                                   │
│  └───────┬──────┘                                                                                   │
│          │                                                                                          │
│          │ Hifz/Prayer request                                                                      │
│          ▼                                                                                          │
│  ╔══════════════════════╗                                                                          │
│  ║  [10.1]              ║                                                                          │
│  ║  ACCESS              ║                                                                          │
│  ║  QURAN               ║                                                                          │
│  ║  MODULE              ║                                                                          │
│  ╚═══════════╤══════════╝                                                                          │
│              │                                                                                      │
│       ┌──────┴────────────────────────────────────┐                                                │
│       │                                           │                                                │
│       ▼                                           ▼                                                │
│  ╔══════════════════╗                    ╔══════════════════╗                                      │
│  ║  [10.2]          ║                    ║  [10.3]          ║                                      │
│  ║  RECITE          ║                    ║  MEMORIZE        ║                                      │
│  ║  QURAN           ║                    ║  (HIFZ)          ║                                      │
│  ╚═══════╤══════════╝                    ╚═══════╤══════════╝                                      │
│          │                                       │                                                 │
│          │ Audio/Text request                    │ Memorization session                            │
│          ▼                                       ▼                                                 │
│  ┌─────────────────┐                    ╔══════════════════════╗                                   │
│  │  QURAN API      │                    ║  [10.4]              ║                                   │
│  │  (quran.com)    │                    ║  TRACK HIFZ          ║                                   │
│  └────────┬────────┘                    ║  PROGRESS            ║                                   │
│           │                             ╚═══════════╤══════════╝                                   │
│           │ Verse/Audio                             │                                              │
│           ▼                                         │ Progress data                                │
│  ┌──────────────┐                                  ▼                                              │
│  │   STUDENT    │                       ═══════════════════════                                    │
│  └──────────────┘                       │ D9.1: Hifz Progress  │                                    │
│                                         ═══════════════════════                                    │
│                                                    │                                               │
│                                                    ▼                                               │
│                                         ╔══════════════════════╗                                   │
│                                         ║  [10.5]              ║                                   │
│                                         ║  ASSESS              ║                                   │
│                                         ║  TAJWEED             ║                                   │
│                                         ╚═══════════╤══════════╝                                   │
│                                                     │                                              │
│                                                     │ Tajweed score                                │
│                                                     ▼                                              │
│                                         ═══════════════════════                                    │
│                                         │ D9.2: Tajweed        │                                    │
│                                         │ Assessments          │                                    │
│                                         ═══════════════════════                                    │
│                                                                                                    │
│  ════════════════════════════════════════════════════════════════════════════                      │
│                                                                                                    │
│  ┌──────────────┐                                                                                  │
│  │   STUDENT    │                                                                                  │
│  └───────┬──────┘                                                                                  │
│          │                                                                                         │
│          │ Prayer times request                                                                    │
│          ▼                                                                                         │
│  ╔══════════════════════╗                                                                          │
│  ║  [10.6]              ║                                                                          │
│  ║  GET PRAYER          ║                                                                          │
│  ║  TIMES               ║                                                                          │
│  ╚═══════════╤══════════╝                                                                          │
│              │                                                                                     │
│              │ Location data                                                                       │
│              ▼                                                                                     │
│  ┌─────────────────┐                                                                               │
│  │  ALADHAN API    │                                                                               │
│  │  (aladhan.com)  │                                                                               │
│  └────────┬────────┘                                                                               │
│           │                                                                                        │
│           │ Prayer times                                                                           │
│           ▼                                                                                        │
│  ╔══════════════════════╗                                                                          │
│  ║  [10.7]              ║                                                                          │
│  ║  SCHEDULE            ║                                                                          │
│  ║  REMINDERS           ║                                                                          │
│  ╚═══════════╤══════════╝                                                                          │
│              │                                                                                     │
│              │ Reminder schedule                                                                   │
│              ▼                                                                                     │
│  ═══════════════════════                                                                           │
│  │ D9.3: Prayer         │                                                                           │
│  │ Schedules            │                                                                           │
│  ═══════════════════════                                                                           │
│              │                                                                                     │
│              ▼                                                                                     │
│  ╔══════════════════════╗              ┌──────────────┐                                            │
│  ║  [10.8]              ║─────────────►│   STUDENT    │                                            │
│  ║  SEND PRAYER         ║  Reminder    └──────────────┘                                            │
│  ║  NOTIFICATION        ║                                                                          │
│  ╚══════════════════════╝                                                                          │
│                                                                                                    │
│  ════════════════════════════════════════════════════════════════════════════                      │
│                                                                                                    │
│  ┌──────────────┐                                                                                  │
│  │   STUDENT    │                                                                                  │
│  └───────┬──────┘                                                                                  │
│          │                                                                                         │
│          │ Calendar request                                                                        │
│          ▼                                                                                         │
│  ╔══════════════════════╗                                                                          │
│  ║  [10.9]              ║                                                                          │
│  ║  DISPLAY             ║                                                                          │
│  ║  HIJRI CALENDAR      ║                                                                          │
│  ╚═══════════╤══════════╝                                                                          │
│              │                                                                                     │
│              │ Hijri date request                                                                  │
│              ▼                                                                                     │
│  ╔══════════════════════╗                                                                          │
│  ║  [10.10]             ║                                                                          │
│  ║  CALCULATE           ║                                                                          │
│  ║  HIJRI DATE          ║                                                                          │
│  ╚═══════════╤══════════╝                                                                          │
│              │                                                                                     │
│              │ Hijri calendar                                                                      │
│              ▼                                                                                     │
│  ╔══════════════════════╗                                                                          │
│  ║  [10.11]             ║               ═══════════════════════                                    │
│  ║  IDENTIFY            ║◄──────────────│ D9.4: Islamic       │                                    │
│  ║  ISLAMIC EVENTS      ║               │ Events Database     │                                    │
│  ╚═══════════╤══════════╝               ═══════════════════════                                    │
│              │                                                                                     │
│              │ Event notifications                                                                 │
│              ▼                                                                                     │
│  ┌──────────────┐                                                                                  │
│  │   STUDENT    │                                                                                  │
│  └──────────────┘                                                                                  │
│                                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 11. Reporting System DFD

### 11.1 Level 2 - Reporting System

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                           LEVEL 2 DFD - REPORTING SYSTEM [8.0]                                       │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                      │
│  ┌──────────────┐                                                                                   │
│  │   ADMIN /    │                                                                                   │
│  │   TEACHER    │                                                                                   │
│  └───────┬──────┘                                                                                   │
│          │                                                                                          │
│          │ Report request                                                                           │
│          ▼                                                                                          │
│  ╔══════════════════════╗                                                                          │
│  ║  [8.1]               ║                                                                          │
│  ║  SELECT              ║                                                                          │
│  ║  REPORT TYPE         ║                                                                          │
│  ╚═══════════╤══════════╝                                                                          │
│              │                                                                                      │
│       ┌──────┴────────────────────────────────────────────────────┐                                │
│       │                          │                                │                                │
│       ▼                          ▼                                ▼                                │
│  ╔══════════════════╗    ╔══════════════════╗           ╔══════════════════╗                      │
│  ║  [8.2]           ║    ║  [8.3]           ║           ║  [8.4]           ║                      │
│  ║  ACADEMIC        ║    ║  FINANCIAL       ║           ║  ATTENDANCE      ║                      │
│  ║  REPORTS         ║    ║  REPORTS         ║           ║  REPORTS         ║                      │
│  ╚═══════╤══════════╝    ╚═══════╤══════════╝           ╚═══════╤══════════╝                      │
│          │                       │                               │                                │
│          │                       │                               │                                │
│          ▼                       ▼                               ▼                                │
│  ═══════════════════     ═══════════════════            ═══════════════════                       │
│  │ D4: Grade        │    │ D7: Financial   │           │ D5: Attendance   │                       │
│  │ Records          │    │ Records         │           │ Records          │                       │
│  ═══════════════════     ═══════════════════            ═══════════════════                       │
│          │                       │                               │                                │
│          └───────────────────────┼───────────────────────────────┘                                │
│                                  │                                                                 │
│                                  ▼                                                                 │
│                         ╔══════════════════════╗                                                  │
│                         ║  [8.5]               ║                                                  │
│                         ║  AGGREGATE           ║                                                  │
│                         ║  DATA                ║                                                  │
│                         ╚═══════════╤══════════╝                                                  │
│                                     │                                                             │
│                                     │ Aggregated data                                             │
│                                     ▼                                                             │
│                         ╔══════════════════════╗                                                  │
│                         ║  [8.6]               ║                                                  │
│                         ║  APPLY               ║                                                  │
│                         ║  FILTERS             ║                                                  │
│                         ╚═══════════╤══════════╝                                                  │
│                                     │                                                             │
│                                     │ Filtered data                                               │
│                                     ▼                                                             │
│                         ╔══════════════════════╗                                                  │
│                         ║  [8.7]               ║                                                  │
│                         ║  GENERATE            ║                                                  │
│                         ║  VISUALIZATIONS      ║                                                  │
│                         ╚═══════════╤══════════╝                                                  │
│                                     │                                                             │
│                       ┌─────────────┼─────────────────┐                                          │
│                       │             │                 │                                          │
│                       ▼             ▼                 ▼                                          │
│              ╔════════════════╗  ╔════════════════╗  ╔════════════════╗                          │
│              ║  [8.8a]        ║  ║  [8.8b]        ║  ║  [8.8c]        ║                          │
│              ║  EXPORT        ║  ║  EXPORT        ║  ║  DISPLAY       ║                          │
│              ║  PDF           ║  ║  EXCEL         ║  ║  DASHBOARD     ║                          │
│              ╚═══════╤════════╝  ╚═══════╤════════╝  ╚═══════╤════════╝                          │
│                      │                   │                   │                                   │
│                      │                   │                   │ Dashboard view                    │
│                      │                   │                   ▼                                   │
│                      │                   │          ┌──────────────┐                             │
│                      │                   │          │   ADMIN /    │                             │
│                      │                   │          │   TEACHER    │                             │
│                      │                   │          └──────────────┘                             │
│                      │                   │                                                       │
│                      │ PDF report        │ Excel report                                          │
│                      ▼                   ▼                                                       │
│              ═══════════════════════════════════════════════════════                             │
│              │                D8: Report Repository                 │                             │
│              ═══════════════════════════════════════════════════════                             │
│                                     │                                                            │
│                                     │ Report file                                                │
│                                     ▼                                                            │
│                         ╔══════════════════════╗                                                 │
│                         ║  [8.9]               ║                                                 │
│                         ║  DISTRIBUTE          ║                                                 │
│                         ║  REPORT              ║                                                 │
│                         ╚═══════════╤══════════╝                                                 │
│                                     │                                                            │
│                      ┌──────────────┼──────────────────┐                                        │
│                      │              │                  │                                        │
│                      ▼              ▼                  ▼                                        │
│             ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                                │
│             │   TEACHER    │  │   PARENT     │  │   ADMIN      │                                │
│             └──────────────┘  └──────────────┘  └──────────────┘                                │
│                                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 11.2 Report Types Catalog

| Report Category | Report Types | Data Sources | Frequency |
|----------------|--------------|--------------|-----------|
| Academic | Progress Report, Transcript, Class Performance | D4 Grades, D2 Students | Term/Annual |
| Financial | Fee Collection, Outstanding Dues, Revenue | D7 Financial | Monthly |
| Attendance | Daily/Weekly Summary, Absentee List | D5 Attendance | Daily/Weekly |
| Administrative | Enrollment Statistics, Staff Reports | D2 Students, D3 Academic | Monthly/Annual |
| Custom | Ad-hoc queries with filters | All data stores | On-demand |

---

## 12. Communication System DFD

### 12.1 Level 2 - Communication System

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                          LEVEL 2 DFD - COMMUNICATION SYSTEM [9.0]                                    │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                      │
│                      ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                       │
│                      │   ADMIN      │    │   TEACHER    │    │   PARENT     │                       │
│                      └───────┬──────┘    └───────┬──────┘    └───────┬──────┘                       │
│                              │                   │                   │                              │
│                              │ Broadcast         │ Class message     │ Query                        │
│                              │ message           │                   │                              │
│                              └───────────────────┼───────────────────┘                              │
│                                                  │                                                  │
│                                                  ▼                                                  │
│                                         ╔══════════════════════╗                                   │
│                                         ║  [9.1]               ║                                   │
│                                         ║  RECEIVE             ║                                   │
│                                         ║  MESSAGE             ║                                   │
│                                         ╚═══════════╤══════════╝                                   │
│                                                     │                                              │
│                                                     │ Message data                                 │
│                                                     ▼                                              │
│                                         ╔══════════════════════╗                                   │
│                                         ║  [9.2]               ║                                   │
│                                         ║  CLASSIFY            ║                                   │
│                                         ║  MESSAGE             ║                                   │
│                                         ╚═══════════╤══════════╝                                   │
│                                                     │                                              │
│                   ┌─────────────────────────────────┼─────────────────────────────────┐            │
│                   │                                 │                                 │            │
│                   ▼                                 ▼                                 ▼            │
│          ╔════════════════╗              ╔════════════════════╗            ╔════════════════╗      │
│          ║  [9.3]         ║              ║  [9.4]             ║            ║  [9.5]         ║      │
│          ║  URGENT        ║              ║  STANDARD          ║            ║  SCHEDULED     ║      │
│          ║  NOTIFICATION  ║              ║  NOTIFICATION      ║            ║  NOTIFICATION  ║      │
│          ╚═══════╤════════╝              ╚═══════════╤════════╝            ╚═══════╤════════╝      │
│                  │                                   │                             │              │
│                  │ Immediate                         │ Queue                       │ Schedule     │
│                  │                                   ▼                             ▼              │
│                  │                       ═══════════════════════       ═══════════════════════    │
│                  │                       │ D9.1: Message Queue │       │ D9.2: Scheduled     │    │
│                  │                       ═══════════════════════       │ Messages            │    │
│                  │                                   │                 ═══════════════════════    │
│                  │                                   │                             │              │
│                  │                                   ▼                             │              │
│                  │                       ╔══════════════════════╗                  │              │
│                  │                       ║  [9.6]               ║                  │              │
│                  │                       ║  PROCESS             ║◄─────────────────┘              │
│                  │                       ║  QUEUE               ║  Trigger                        │
│                  │                       ╚═══════════╤══════════╝                                  │
│                  │                                   │                                             │
│                  └───────────────────────────────────┤                                             │
│                                                      │                                             │
│                                                      ▼                                             │
│                                         ╔══════════════════════╗                                   │
│                                         ║  [9.7]               ║                                   │
│                                         ║  DETERMINE           ║                                   │
│                                         ║  RECIPIENTS          ║                                   │
│                                         ╚═══════════╤══════════╝                                   │
│                                                     │                                              │
│                                                     │ Recipient list                               │
│                                                     ▼                                              │
│                                         ╔══════════════════════╗           ═══════════════════════ │
│                                         ║  [9.8]               ║           │ D9.3: User          │ │
│                                         ║  CHECK               ║◄──────────│ Preferences         │ │
│                                         ║  PREFERENCES         ║           ═══════════════════════ │
│                                         ╚═══════════╤══════════╝                                   │
│                                                     │                                              │
│                   ┌─────────────────────────────────┼─────────────────────────────────┐            │
│                   │                                 │                                 │            │
│                   ▼                                 ▼                                 ▼            │
│          ╔════════════════╗              ╔════════════════════╗            ╔════════════════╗      │
│          ║  [9.9]         ║              ║  [9.10]            ║            ║  [9.11]        ║      │
│          ║  SEND          ║              ║  SEND              ║            ║  SEND          ║      │
│          ║  SMS           ║              ║  EMAIL             ║            ║  PUSH          ║      │
│          ╚═══════╤════════╝              ╚═══════════╤════════╝            ╚═══════╤════════╝      │
│                  │                                   │                             │              │
│                  ▼                                   ▼                             ▼              │
│          ┌─────────────┐                    ┌─────────────┐                ┌─────────────┐        │
│          │ BulkSMSBD   │                    │  SendGrid   │                │  Firebase   │        │
│          │ API         │                    │  API        │                │  FCM        │        │
│          └──────┬──────┘                    └──────┬──────┘                └──────┬──────┘        │
│                 │                                  │                              │              │
│                 │ Delivery status                  │ Delivery status              │              │
│                 │                                  │                              │              │
│                 └──────────────────────────────────┼──────────────────────────────┘              │
│                                                    │                                             │
│                                                    ▼                                             │
│                                         ╔══════════════════════╗                                 │
│                                         ║  [9.12]              ║                                 │
│                                         ║  LOG                 ║                                 │
│                                         ║  DELIVERY            ║                                 │
│                                         ╚═══════════╤══════════╝                                 │
│                                                     │                                            │
│                                                     │ Delivery log                               │
│                                                     ▼                                            │
│                                         ═══════════════════════                                  │
│                                         │ D9.4: Notification   │                                  │
│                                         │ Logs                 │                                  │
│                                         ═══════════════════════                                  │
│                                                     │                                            │
│                                                     ▼                                            │
│                                    ┌────────────────────────────────────┐                        │
│                                    │                │                   │                        │
│                                    ▼                ▼                   ▼                        │
│                           ┌──────────────┐  ┌──────────────┐   ┌──────────────┐                  │
│                           │   STUDENT    │  │   PARENT     │   │   TEACHER    │                  │
│                           └──────────────┘  └──────────────┘   └──────────────┘                  │
│                                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 13. Data Store Summary

### 13.1 Master Data Store Catalog

| Store ID | Name | Description | Primary Key | Related Stores |
|----------|------|-------------|-------------|----------------|
| D1 | User Sessions | Active login sessions | session_id | D2 |
| D2 | Student Records | Student master data | student_id | D3, D4, D5, D7 |
| D2.1 | Applications | Admission applications | application_id | D2 |
| D2.2 | Document Repository | Student documents | document_id | D2.1 |
| D2.3 | Admissions | Approved admissions | admission_id | D2 |
| D2.4 | Waitlist | Waitlisted applications | waitlist_id | D2.1 |
| D3 | Academic Data | Classes, sections, subjects | class_id, subject_id | D2 |
| D4 | Grade Records | Student grades | grade_id | D2, D3 |
| D4.1 | Grading Scale | Grade conversion rules | scale_id | D4 |
| D5 | Attendance Records | Daily attendance | attendance_id | D2, D3 |
| D5.1 | Attendance Statistics | Aggregated attendance | stat_id | D5 |
| D6 | Course Content | LMS course materials | course_id | D3 |
| D6.1 | Enrollments | Course enrollments | enrollment_id | D6, D2 |
| D6.2 | Progress Tracking | Learning progress | progress_id | D6.1 |
| D6.3 | Certificates | Completion certificates | certificate_id | D6.1 |
| D7 | Financial Records | All financial transactions | transaction_id | D2 |
| D7.1 | Fee Structures | Fee configurations | fee_id | D3 |
| D7.2 | Invoices | Generated invoices | invoice_id | D7.1, D2 |
| D7.3 | Transactions | Payment transactions | txn_id | D7.2 |
| D7.4 | Receipts | Payment receipts | receipt_id | D7.3 |
| D8 | Report Repository | Generated reports | report_id | All |
| D9 | Islamic Content | Quran, prayer data | content_id | D2 |
| D9.1 | Hifz Progress | Memorization tracking | hifz_id | D9, D2 |
| D9.2 | Tajweed Assessments | Tajweed evaluations | assessment_id | D9, D2 |
| D9.3 | Prayer Schedules | Prayer time data | schedule_id | D2 |
| D9.4 | Islamic Events | Calendar events | event_id | D9 |

---

## Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Lead Developer | | | |
| System Analyst | | | |
| Project Stakeholder | | | |

---

*This document provides the complete data flow visualization for the Smart Academy Digital Portal system.*
