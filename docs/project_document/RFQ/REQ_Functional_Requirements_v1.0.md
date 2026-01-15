# Smart Academy Digital Portal - Functional Requirements Specification

**Document Title:** Functional Requirements Specification
**Document ID:** REQ_Functional_Requirements_v1.0
**Version:** 1.0
**Date:** January 10, 2026
**Project Name:** Smart Academy Digital Web Portal Development
**Prepared By:** Solo Full-Stack Developer

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | January 10, 2026 | Development Team | Initial Functional Requirements Specification |

**Reference Documents:**
- Smart Academy URD v1.0
- Smart Academy SRS v1.0
- Smart Academy PRD v1.0

---

## Table of Contents

1. [Use Case Diagrams](#1-use-case-diagrams)
2. [Use Case Descriptions](#2-use-case-descriptions)
3. [Business Rules](#3-business-rules)
4. [Functional Requirements by Module](#4-functional-requirements-by-module)

---

## 1. Use Case Diagrams

### 1.1 System Context Diagram

```
                            ┌─────────────────────────────────────────┐
                            │     SMART ACADEMY DIGITAL PORTAL        │
                            │                                          │
    ┌──────────┐            │  ┌────────────────────────────────────┐ │           ┌───────────┐
    │  Public  │───────────►│  │       Public Website               │ │           │  bKash    │
    │ Visitor  │            │  │   (Information, Admission)         │ │◄─────────►│  Nagad    │
    └──────────┘            │  └────────────────────────────────────┘ │           │SSLCommerz │
                            │                                          │           └───────────┘
    ┌──────────┐            │  ┌────────────────────────────────────┐ │
    │ Student  │───────────►│  │       Student Portal               │ │           ┌───────────┐
    │          │            │  │  (Schedule, Grades, Resources)     │ │◄─────────►│  SMS      │
    └──────────┘            │  └────────────────────────────────────┘ │           │ Gateway   │
                            │                                          │           └───────────┘
    ┌──────────┐            │  ┌────────────────────────────────────┐ │
    │  Parent  │───────────►│  │       Parent Portal                │ │           ┌───────────┐
    │          │            │  │ (Progress, Fees, Communication)    │ │◄─────────►│  Email    │
    └──────────┘            │  └────────────────────────────────────┘ │           │ Service   │
                            │                                          │           └───────────┘
    ┌──────────┐            │  ┌────────────────────────────────────┐ │
    │ Teacher  │───────────►│  │       Teacher Portal               │ │           ┌───────────┐
    │          │            │  │ (Attendance, Grades, Islamic)      │ │◄─────────►│  Gibbon   │
    └──────────┘            │  └────────────────────────────────────┘ │           │   SMS     │
                            │                                          │           └───────────┘
    ┌──────────┐            │  ┌────────────────────────────────────┐ │
    │  Admin   │───────────►│  │       Admin Dashboard              │ │           ┌───────────┐
    │          │            │  │ (Management, Reports, Config)      │ │◄─────────►│  Moodle   │
    └──────────┘            │  └────────────────────────────────────┘ │           │   LMS     │
                            │                                          │           └───────────┘
                            └─────────────────────────────────────────┘
```

### 1.2 Public Website Use Cases

```
                           PUBLIC WEBSITE USE CASES
                    ┌──────────────────────────────────────┐
                    │                                      │
    ┌────────────┐  │  ┌─────────────────────────────────┐│
    │            │  │  │ UC-PW-001: View Homepage        ││
    │   Public   │──┼──│                                 ││
    │  Visitor   │  │  └─────────────────────────────────┘│
    │            │  │  ┌─────────────────────────────────┐│
    │            │──┼──│ UC-PW-002: View About Pages     ││
    │            │  │  │                                 ││
    │            │  │  └─────────────────────────────────┘│
    │            │  │  ┌─────────────────────────────────┐│
    │            │──┼──│ UC-PW-003: View Academic Info   ││
    │            │  │  │                                 ││
    │            │  │  └─────────────────────────────────┘│
    │            │  │  ┌─────────────────────────────────┐│
    │            │──┼──│ UC-PW-004: Submit Admission     ││
    │            │  │  │             Inquiry             ││
    │            │  │  └─────────────────────────────────┘│
    │            │  │  ┌─────────────────────────────────┐│
    │            │──┼──│ UC-PW-005: View News/Events     ││
    │            │  │  │                                 ││
    │            │  │  └─────────────────────────────────┘│
    │            │  │  ┌─────────────────────────────────┐│
    │            │──┼──│ UC-PW-006: Contact School       ││
    └────────────┘  │  │                                 ││
                    │  └─────────────────────────────────┘│
                    └──────────────────────────────────────┘
```

### 1.3 Parent Portal Use Cases

```
                           PARENT PORTAL USE CASES
                    ┌──────────────────────────────────────────────┐
                    │                                              │
    ┌────────────┐  │  ┌───────────────────────────────────────┐  │
    │            │  │  │ UC-PP-001: View Child Dashboard       │  │
    │   Parent   │──┼──│                                       │  │
    │            │  │  └───────────────────────────────────────┘  │
    │            │  │  ┌───────────────────────────────────────┐  │
    │            │──┼──│ UC-PP-002: View Academic Progress     │  │
    │            │  │  │                                       │  │
    │            │  │  └───────────────────────────────────────┘  │
    │            │  │  ┌───────────────────────────────────────┐  │
    │            │──┼──│ UC-PP-003: View Attendance Records    │  │
    │            │  │  │                                       │  │
    │            │  │  └───────────────────────────────────────┘  │
    │            │  │  ┌───────────────────────────────────────┐  │
    │            │──┼──│ UC-PP-004: View Quran Progress        │  │
    │            │  │  │                                       │  │
    │            │  │  └───────────────────────────────────────┘  │
    │            │  │  ┌───────────────────────────────────────┐  │
    │            │──┼──│ UC-PP-005: Pay Fees Online            │  │
    │            │  │  │         ────────────────────          │  │
    │            │  │  │   «includes» bKash/Nagad/Card         │  │
    │            │  │  └───────────────────────────────────────┘  │
    │            │  │  ┌───────────────────────────────────────┐  │
    │            │──┼──│ UC-PP-006: Message Teacher            │  │
    │            │  │  │                                       │  │
    │            │  │  └───────────────────────────────────────┘  │
    │            │  │  ┌───────────────────────────────────────┐  │
    │            │──┼──│ UC-PP-007: View Announcements         │  │
    └────────────┘  │  │                                       │  │
                    │  └───────────────────────────────────────┘  │
                    └──────────────────────────────────────────────┘
```

### 1.4 Teacher Portal Use Cases

```
                           TEACHER PORTAL USE CASES
                    ┌──────────────────────────────────────────────┐
                    │                                              │
    ┌────────────┐  │  ┌───────────────────────────────────────┐  │
    │            │  │  │ UC-TP-001: Mark Attendance            │  │
    │  Teacher   │──┼──│                                       │  │
    │            │  │  └───────────────────────────────────────┘  │
    │            │  │  ┌───────────────────────────────────────┐  │
    │            │──┼──│ UC-TP-002: Enter/Update Grades        │  │
    │            │  │  │                                       │  │
    │            │  │  └───────────────────────────────────────┘  │
    │            │  │  ┌───────────────────────────────────────┐  │
    │            │──┼──│ UC-TP-003: Record Quran Progress      │  │
    │            │  │  │     «includes»                        │  │
    │            │  │  │   - Record Surah Completion           │  │
    │            │  │  │   - Conduct Tajweed Assessment        │  │
    │            │  │  └───────────────────────────────────────┘  │
    │            │  │  ┌───────────────────────────────────────┐  │
    │            │──┼──│ UC-TP-004: View Class Schedule        │  │
    │            │  │  │                                       │  │
    │            │  │  └───────────────────────────────────────┘  │
    │            │  │  ┌───────────────────────────────────────┐  │
    │            │──┼──│ UC-TP-005: Communicate with Parents   │  │
    │            │  │  │                                       │  │
    │            │  │  └───────────────────────────────────────┘  │
    │            │  │  ┌───────────────────────────────────────┐  │
    │            │──┼──│ UC-TP-006: Upload Learning Materials  │  │
    └────────────┘  │  │                                       │  │
                    │  └───────────────────────────────────────┘  │
                    └──────────────────────────────────────────────┘
```

### 1.5 Admin Dashboard Use Cases

```
                           ADMIN DASHBOARD USE CASES
                    ┌──────────────────────────────────────────────┐
                    │                                              │
    ┌────────────┐  │  ┌───────────────────────────────────────┐  │
    │            │  │  │ UC-AD-001: Manage Students            │  │
    │   Admin    │──┼──│   (CRUD operations)                   │  │
    │            │  │  └───────────────────────────────────────┘  │
    │            │  │  ┌───────────────────────────────────────┐  │
    │            │──┼──│ UC-AD-002: Manage Staff               │  │
    │            │  │  │   (Teachers, Admin)                   │  │
    │            │  │  └───────────────────────────────────────┘  │
    │            │  │  ┌───────────────────────────────────────┐  │
    │            │──┼──│ UC-AD-003: Process Admissions         │  │
    │            │  │  │                                       │  │
    │            │  │  └───────────────────────────────────────┘  │
    │            │  │  ┌───────────────────────────────────────┐  │
    │            │──┼──│ UC-AD-004: Manage Fees                │  │
    │            │  │  │   (Structure, Collection)             │  │
    │            │  │  └───────────────────────────────────────┘  │
    │            │  │  ┌───────────────────────────────────────┐  │
    │            │──┼──│ UC-AD-005: Generate Reports           │  │
    │            │  │  │                                       │  │
    │            │  │  └───────────────────────────────────────┘  │
    │            │  │  ┌───────────────────────────────────────┐  │
    │            │──┼──│ UC-AD-006: Send Announcements         │  │
    │            │  │  │                                       │  │
    │            │  │  └───────────────────────────────────────┘  │
    │            │  │  ┌───────────────────────────────────────┐  │
    │            │──┼──│ UC-AD-007: Configure System           │  │
    └────────────┘  │  │                                       │  │
                    │  └───────────────────────────────────────┘  │
                    └──────────────────────────────────────────────┘
```

---

## 2. Use Case Descriptions

### 2.1 Parent Portal Use Cases

#### UC-PP-005: Pay Fees Online

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-PP-005 |
| **Use Case Name** | Pay Fees Online |
| **Actor(s)** | Parent |
| **Description** | Parent pays outstanding school fees using online payment gateway |
| **Pre-conditions** | 1. Parent is authenticated<br>2. Parent has outstanding fee balance<br>3. Payment gateway is available |
| **Post-conditions** | 1. Fee payment is recorded<br>2. Balance is updated<br>3. Receipt is generated<br>4. Confirmation sent to parent |

**Main Flow:**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Parent navigates to Fees section | System displays fee dashboard with outstanding balance |
| 2 | Parent clicks "Pay Now" | System displays payment options (bKash, Nagad, Card) |
| 3 | Parent selects bKash | System redirects to bKash payment page |
| 4 | Parent enters bKash PIN | bKash processes payment |
| 5 | - | System receives payment confirmation |
| 6 | - | System updates fee balance |
| 7 | - | System generates digital receipt |
| 8 | - | System sends SMS confirmation to parent |
| 9 | System displays success message with receipt | - |

**Alternative Flows:**

| Flow | Condition | Steps |
|------|-----------|-------|
| A1 | Parent selects Nagad | Redirect to Nagad gateway, process similarly |
| A2 | Parent selects Card | Redirect to SSLCommerz, process card payment |
| A3 | Parent chooses partial payment | Display amount input, validate minimum (500 BDT) |

**Exception Flows:**

| Flow | Condition | Steps |
|------|-----------|-------|
| E1 | Payment failed | Display error message, log transaction, allow retry |
| E2 | Gateway timeout | Display timeout message, check status, allow retry |
| E3 | Insufficient balance | Display error from gateway, return to payment options |

---

#### UC-PP-004: View Quran Progress

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-PP-004 |
| **Use Case Name** | View Quran Progress |
| **Actor(s)** | Parent |
| **Description** | Parent views child's Quran memorization and Islamic education progress |
| **Pre-conditions** | 1. Parent is authenticated<br>2. Child has Islamic education records |
| **Post-conditions** | Parent views detailed Quran progress |

**Main Flow:**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Parent navigates to Islamic Progress | System displays Islamic education dashboard |
| 2 | Parent selects child (if multiple) | System displays child's Quran progress |
| 3 | - | System shows visual Quran map with completion status |
| 4 | - | System shows statistics (Surahs memorized, Juz completed) |
| 5 | Parent taps on specific Surah | System shows verse-by-verse completion |
| 6 | - | System shows Tajweed assessment scores |
| 7 | - | System shows teacher comments |

---

### 2.2 Teacher Portal Use Cases

#### UC-TP-003: Record Quran Progress

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-TP-003 |
| **Use Case Name** | Record Quran Progress |
| **Actor(s)** | Teacher (Islamic Studies) |
| **Description** | Teacher records student's Quran memorization progress and conducts Tajweed assessment |
| **Pre-conditions** | 1. Teacher is authenticated<br>2. Teacher has Islamic education teaching role<br>3. Class is in session |
| **Post-conditions** | 1. Progress record saved<br>2. Parents notified (optional)<br>3. Student progress updated |

**Main Flow:**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Teacher opens Quran Progress module | System displays class list |
| 2 | Teacher selects student | System displays student's current progress |
| 3 | - | System shows visual Quran map |
| 4 | Teacher taps Surah/verses being assessed | System highlights selection |
| 5 | Teacher selects memorization status | Options: In Progress, Memorized, Mastered |
| 6 | Teacher optionally conducts Tajweed assessment | System displays assessment form |
| 7 | Teacher rates Tajweed areas | Makhraj, Mad, Qalqalah, etc. |
| 8 | Teacher adds comments (optional) | System accepts text input |
| 9 | Teacher saves progress | System saves and confirms |
| 10 | - | System optionally notifies parent |

---

#### UC-TP-001: Mark Attendance

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-TP-001 |
| **Use Case Name** | Mark Attendance |
| **Actor(s)** | Teacher |
| **Description** | Teacher marks daily attendance for assigned class |
| **Pre-conditions** | 1. Teacher is authenticated<br>2. Class is assigned to teacher<br>3. School day is active |
| **Post-conditions** | 1. Attendance records saved<br>2. Absence notifications sent to parents |

**Main Flow:**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Teacher opens attendance module | System shows today's classes |
| 2 | Teacher selects class | System displays student list |
| 3 | - | System defaults all to "Present" |
| 4 | Teacher taps absent students | Status changes to "Absent" |
| 5 | Teacher taps late students | Status changes to "Late" |
| 6 | Teacher submits attendance | System saves records |
| 7 | - | System sends SMS to absent students' parents |
| 8 | - | System confirms submission |

---

### 2.3 Admin Dashboard Use Cases

#### UC-AD-003: Process Admissions

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-AD-003 |
| **Use Case Name** | Process Admissions |
| **Actor(s)** | Admin |
| **Description** | Admin processes admission applications from inquiry to enrollment |
| **Pre-conditions** | 1. Admin is authenticated<br>2. Admission applications exist |
| **Post-conditions** | 1. Application decision made<br>2. Applicant notified<br>3. Student record created (if admitted) |

**Main Flow:**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Admin opens Admissions module | System shows application queue |
| 2 | Admin selects application | System displays application details |
| 3 | - | System shows uploaded documents |
| 4 | Admin reviews documents | System provides checklist |
| 5 | Admin verifies eligibility | System shows requirements vs. submitted |
| 6 | Admin makes decision | Options: Approve, Reject, Waitlist |
| 7 | Admin approves | System prompts for class assignment |
| 8 | Admin assigns class | System shows available classes |
| 9 | Admin confirms | System creates student record |
| 10 | - | System sends admission letter (email/SMS) |
| 11 | - | System generates fee schedule |

---

## 3. Business Rules

### 3.1 Authentication Rules

| Rule ID | Rule Description | Enforcement |
|---------|------------------|-------------|
| BR-AUTH-001 | Password must be minimum 8 characters with at least one number | Registration, Password change |
| BR-AUTH-002 | Session expires after 24 hours of inactivity | Automatic logout |
| BR-AUTH-003 | Maximum 5 failed login attempts before temporary lockout (15 minutes) | Login process |
| BR-AUTH-004 | SSO token valid across Gibbon, Moodle, and custom apps | All authenticated requests |
| BR-AUTH-005 | Parent can only view data for their registered children | Data access |

### 3.2 Fee and Payment Rules

| Rule ID | Rule Description | Enforcement |
|---------|------------------|-------------|
| BR-FEE-001 | Minimum online payment amount is 500 BDT | Payment initiation |
| BR-FEE-002 | Partial payments are allowed but must be at least 500 BDT | Payment processing |
| BR-FEE-003 | Payment receipt must be generated for every successful transaction | Post-payment |
| BR-FEE-004 | Fee reminders sent 7 days before due date | Automated notification |
| BR-FEE-005 | Overdue fees flagged after 15 days past due date | Fee status calculation |
| BR-FEE-006 | Late fee of 5% applied after 30 days overdue | Fee calculation |
| BR-FEE-007 | Refunds require Principal approval | Refund processing |

### 3.3 Attendance Rules

| Rule ID | Rule Description | Enforcement |
|---------|------------------|-------------|
| BR-ATT-001 | Attendance must be marked within first 30 minutes of class | Attendance entry |
| BR-ATT-002 | Late attendance (after 15 min) marked as "Late" | Attendance marking |
| BR-ATT-003 | Absence notification sent to parent within 1 hour | Automated notification |
| BR-ATT-004 | Medical leave requires document upload | Leave application |
| BR-ATT-005 | Student flagged if absence exceeds 20% of school days | Reporting |

### 3.4 Grading Rules

| Rule ID | Rule Description | Enforcement |
|---------|------------------|-------------|
| BR-GRD-001 | Grade scale: A+ (80-100), A (70-79), A- (60-69), B (50-59), C (40-49), D (33-39), F (<33) | Grade calculation |
| BR-GRD-002 | Passing grade is D (33%) or above | Report generation |
| BR-GRD-003 | Grades must be entered within 7 days of assessment | Grade entry |
| BR-GRD-004 | Grade changes after publication require Admin approval | Grade modification |
| BR-GRD-005 | Class average excludes absent students | Statistics calculation |

### 3.5 Islamic Education Rules

| Rule ID | Rule Description | Enforcement |
|---------|------------------|-------------|
| BR-ISL-001 | Quran progress tracked by Surah, Juz, and verse | Progress recording |
| BR-ISL-002 | Tajweed assessment required for Surah completion | Completion marking |
| BR-ISL-003 | "Mastered" status requires score ≥ 80% in Tajweed | Status assignment |
| BR-ISL-004 | Hifz certificate issued upon completing 30 Juz with "Mastered" status | Certificate generation |
| BR-ISL-005 | Prayer times calculated using Hanafi method for Bangladesh | Prayer time display |
| BR-ISL-006 | Hijri date calculated using Umm al-Qura calendar | Calendar display |

### 3.6 Admission Rules

| Rule ID | Rule Description | Enforcement |
|---------|------------------|-------------|
| BR-ADM-001 | Admission age: Class 1 minimum 6 years as of January 1 | Application validation |
| BR-ADM-002 | Birth certificate required for all admissions | Document checklist |
| BR-ADM-003 | Previous school leaving certificate required for transfers | Document checklist |
| BR-ADM-004 | Admission fee non-refundable after enrollment | Fee policy |
| BR-ADM-005 | Maximum class size is 40 students | Enrollment limits |

### 3.7 Communication Rules

| Rule ID | Rule Description | Enforcement |
|---------|------------------|-------------|
| BR-COM-001 | SMS sent only between 8 AM and 8 PM local time | SMS scheduling |
| BR-COM-002 | Maximum 3 SMS reminders per unpaid fee | Reminder system |
| BR-COM-003 | Parent-teacher messages visible to Admin upon request | Message storage |
| BR-COM-004 | Announcements can be targeted by class, grade, or all | Announcement creation |

---

## 4. Functional Requirements by Module

### 4.1 Public Website

#### FR-PW-001 to FR-PW-050: Public Website Requirements

| FR ID | Requirement | Priority | Module |
|-------|-------------|----------|--------|
| FR-PW-001 | System shall display homepage with hero section, welcome message, and key information | Must | Homepage |
| FR-PW-002 | System shall display quick stats (students, teachers, programs) on homepage | Must | Homepage |
| FR-PW-003 | System shall display featured news articles on homepage | Must | Homepage |
| FR-PW-004 | System shall display upcoming events on homepage | Should | Homepage |
| FR-PW-005 | System shall display testimonials from parents/students | Should | Homepage |
| FR-PW-006 | System shall provide About Us page with vision, mission, values | Must | About |
| FR-PW-007 | System shall display school history and milestones | Must | About |
| FR-PW-008 | System shall display leadership team profiles | Must | About |
| FR-PW-009 | System shall display awards and recognition | Should | About |
| FR-PW-010 | System shall display accreditation information | Should | About |
| FR-PW-011 | System shall display academic programs overview | Must | Academics |
| FR-PW-012 | System shall display Early Childhood curriculum details | Must | Academics |
| FR-PW-013 | System shall display Primary Education curriculum | Must | Academics |
| FR-PW-014 | System shall display Secondary Education curriculum | Must | Academics |
| FR-PW-015 | System shall display Islamic Education program details | Must | Academics |
| FR-PW-016 | System shall display STEAM Education program | Should | Academics |
| FR-PW-017 | System shall display campus and facility information | Must | Campus |
| FR-PW-018 | System shall display laboratory facilities | Should | Campus |
| FR-PW-019 | System shall display library resources | Should | Campus |
| FR-PW-020 | System shall display sports facilities | Should | Campus |
| FR-PW-021 | System shall provide online admission inquiry form | Must | Admission |
| FR-PW-022 | System shall provide full online admission application | Should | Admission |
| FR-PW-023 | System shall accept document uploads for admission | Should | Admission |
| FR-PW-024 | System shall send confirmation email for admission inquiry | Must | Admission |
| FR-PW-025 | System shall display admission requirements and process | Must | Admission |
| FR-PW-026 | System shall display fee structure | Must | Admission |
| FR-PW-027 | System shall display news articles with pagination | Must | News |
| FR-PW-028 | System shall display event calendar | Should | Events |
| FR-PW-029 | System shall allow event filtering by category | Could | Events |
| FR-PW-030 | System shall display contact information | Must | Contact |
| FR-PW-031 | System shall provide contact form | Must | Contact |
| FR-PW-032 | System shall display school location on map | Should | Contact |
| FR-PW-033 | System shall provide Bengali language option | Must | All |
| FR-PW-034 | System shall be mobile responsive | Must | All |
| FR-PW-035 | System shall implement SEO best practices | Should | All |
| FR-PW-036 | System shall load pages within 3 seconds | Must | All |
| FR-PW-037 | System shall display main navigation menu | Must | Navigation |
| FR-PW-038 | System shall display mega menu for complex sections | Should | Navigation |
| FR-PW-039 | System shall display footer with quick links | Must | Navigation |
| FR-PW-040 | System shall provide site search functionality | Should | Search |

### 4.2 Student Portal

#### FR-SP-001 to FR-SP-040: Student Portal Requirements

| FR ID | Requirement | Priority | Module |
|-------|-------------|----------|--------|
| FR-SP-001 | System shall display student dashboard with overview | Must | Dashboard |
| FR-SP-002 | System shall display today's class schedule | Must | Schedule |
| FR-SP-003 | System shall display weekly timetable | Must | Schedule |
| FR-SP-004 | System shall display subject-wise grades | Must | Grades |
| FR-SP-005 | System shall display exam results | Must | Grades |
| FR-SP-006 | System shall display grade trends over time | Should | Grades |
| FR-SP-007 | System shall display attendance percentage | Must | Attendance |
| FR-SP-008 | System shall display attendance by date | Must | Attendance |
| FR-SP-009 | System shall display pending assignments | Must | Assignments |
| FR-SP-010 | System shall allow assignment submission (if LMS integrated) | Should | Assignments |
| FR-SP-011 | System shall provide access to study materials | Should | Resources |
| FR-SP-012 | System shall integrate with Moodle for course access | Must | LMS |
| FR-SP-013 | System shall display Quran memorization progress | Must | Islamic |
| FR-SP-014 | System shall display Tajweed assessment scores | Must | Islamic |
| FR-SP-015 | System shall display announcements | Must | Communication |
| FR-SP-016 | System shall display exam schedule | Must | Schedule |
| FR-SP-017 | System shall allow profile viewing | Should | Profile |

### 4.3 Parent Portal

#### FR-PP-001 to FR-PP-060: Parent Portal Requirements

| FR ID | Requirement | Priority | Module |
|-------|-------------|----------|--------|
| FR-PP-001 | System shall display parent dashboard with all children | Must | Dashboard |
| FR-PP-002 | System shall allow switching between children | Must | Dashboard |
| FR-PP-003 | System shall display child's current grades | Must | Academics |
| FR-PP-004 | System shall display child's exam results | Must | Academics |
| FR-PP-005 | System shall display grade comparison with class average | Should | Academics |
| FR-PP-006 | System shall display attendance summary | Must | Attendance |
| FR-PP-007 | System shall display detailed attendance records | Must | Attendance |
| FR-PP-008 | System shall display Quran memorization progress | Must | Islamic |
| FR-PP-009 | System shall display visual Quran progress map | Must | Islamic |
| FR-PP-010 | System shall display Tajweed assessment results | Must | Islamic |
| FR-PP-011 | System shall display teacher comments on progress | Must | Islamic |
| FR-PP-012 | System shall display outstanding fee balance | Must | Fees |
| FR-PP-013 | System shall display fee breakdown by type | Must | Fees |
| FR-PP-014 | System shall display payment history | Must | Fees |
| FR-PP-015 | System shall allow fee payment via bKash | Must | Payment |
| FR-PP-016 | System shall allow fee payment via Nagad | Must | Payment |
| FR-PP-017 | System shall allow fee payment via card (SSLCommerz) | Should | Payment |
| FR-PP-018 | System shall allow partial fee payment | Should | Payment |
| FR-PP-019 | System shall generate digital receipt | Must | Payment |
| FR-PP-020 | System shall send payment confirmation via SMS | Must | Payment |
| FR-PP-021 | System shall allow downloading PDF receipt | Must | Payment |
| FR-PP-022 | System shall allow messaging teachers | Must | Communication |
| FR-PP-023 | System shall display message history | Must | Communication |
| FR-PP-024 | System shall display school announcements | Must | Communication |
| FR-PP-025 | System shall send push notifications | Must | Notifications |
| FR-PP-026 | System shall allow leave request submission | Should | Leave |

### 4.4 Teacher Portal

#### FR-TP-001 to FR-TP-060: Teacher Portal Requirements

| FR ID | Requirement | Priority | Module |
|-------|-------------|----------|--------|
| FR-TP-001 | System shall display teacher dashboard | Must | Dashboard |
| FR-TP-002 | System shall display today's classes | Must | Schedule |
| FR-TP-003 | System shall display weekly schedule | Must | Schedule |
| FR-TP-004 | System shall allow attendance marking for class | Must | Attendance |
| FR-TP-005 | System shall default all students to "Present" | Must | Attendance |
| FR-TP-006 | System shall allow one-tap status change | Must | Attendance |
| FR-TP-007 | System shall submit attendance with confirmation | Must | Attendance |
| FR-TP-008 | System shall trigger absence notifications | Must | Attendance |
| FR-TP-009 | System shall display class student list | Must | Students |
| FR-TP-010 | System shall display student profiles | Should | Students |
| FR-TP-011 | System shall allow grade entry for assessments | Must | Grades |
| FR-TP-012 | System shall support percentage and letter grades | Must | Grades |
| FR-TP-013 | System shall calculate class averages | Must | Grades |
| FR-TP-014 | System shall allow grade comments | Should | Grades |
| FR-TP-015 | System shall record Quran memorization progress | Must | Islamic |
| FR-TP-016 | System shall display visual Quran progress map | Must | Islamic |
| FR-TP-017 | System shall allow verse-level progress marking | Must | Islamic |
| FR-TP-018 | System shall conduct Tajweed assessment | Must | Islamic |
| FR-TP-019 | System shall record Tajweed scores by category | Must | Islamic |
| FR-TP-020 | System shall add comments to Islamic progress | Should | Islamic |
| FR-TP-021 | System shall allow messaging parents | Must | Communication |
| FR-TP-022 | System shall display staff announcements | Must | Communication |
| FR-TP-023 | System shall allow resource upload to Moodle | Should | Resources |
| FR-TP-024 | System shall generate class reports | Should | Reports |

### 4.5 Admin Dashboard

#### FR-AD-001 to FR-AD-080: Admin Dashboard Requirements

| FR ID | Requirement | Priority | Module |
|-------|-------------|----------|--------|
| FR-AD-001 | System shall display analytics dashboard | Must | Analytics |
| FR-AD-002 | System shall display enrollment statistics | Must | Analytics |
| FR-AD-003 | System shall display attendance trends | Must | Analytics |
| FR-AD-004 | System shall display fee collection summary | Must | Analytics |
| FR-AD-005 | System shall display academic performance overview | Must | Analytics |
| FR-AD-006 | System shall allow date range filtering | Must | Analytics |
| FR-AD-007 | System shall export reports to PDF/Excel | Should | Reports |
| FR-AD-008 | System shall manage student records (CRUD) | Must | Students |
| FR-AD-009 | System shall assign students to classes | Must | Students |
| FR-AD-010 | System shall manage staff records (CRUD) | Must | Staff |
| FR-AD-011 | System shall assign roles to staff | Must | Staff |
| FR-AD-012 | System shall manage parent accounts | Must | Parents |
| FR-AD-013 | System shall link parents to children | Must | Parents |
| FR-AD-014 | System shall process admission applications | Must | Admissions |
| FR-AD-015 | System shall review uploaded documents | Must | Admissions |
| FR-AD-016 | System shall approve/reject applications | Must | Admissions |
| FR-AD-017 | System shall generate admission letters | Should | Admissions |
| FR-AD-018 | System shall configure fee structure | Must | Fees |
| FR-AD-019 | System shall generate invoices | Must | Fees |
| FR-AD-020 | System shall track fee payments | Must | Fees |
| FR-AD-021 | System shall generate fee collection reports | Must | Fees |
| FR-AD-022 | System shall send fee reminders | Must | Fees |
| FR-AD-023 | System shall create announcements | Must | Communication |
| FR-AD-024 | System shall target announcements by audience | Must | Communication |
| FR-AD-025 | System shall send bulk SMS | Must | Communication |
| FR-AD-026 | System shall configure system settings | Must | Config |
| FR-AD-027 | System shall manage academic year | Must | Config |
| FR-AD-028 | System shall manage grade structure | Must | Config |
| FR-AD-029 | System shall manage user roles and permissions | Must | Security |

### 4.6 Islamic Education Module

#### FR-IE-001 to FR-IE-040: Islamic Education Requirements

| FR ID | Requirement | Priority | Module |
|-------|-------------|----------|--------|
| FR-IE-001 | System shall track Quran memorization by Surah | Must | Quran |
| FR-IE-002 | System shall track Quran memorization by Juz | Must | Quran |
| FR-IE-003 | System shall track verse-level completion | Must | Quran |
| FR-IE-004 | System shall display visual Quran progress map | Must | Quran |
| FR-IE-005 | System shall support memorization statuses | Must | Quran |
| FR-IE-006 | System shall record revision counts | Should | Quran |
| FR-IE-007 | System shall conduct Tajweed assessments | Must | Tajweed |
| FR-IE-008 | System shall rate Makhraj (pronunciation) | Must | Tajweed |
| FR-IE-009 | System shall rate Tajweed rules application | Must | Tajweed |
| FR-IE-010 | System shall calculate overall Tajweed score | Must | Tajweed |
| FR-IE-011 | System shall track Hadith study progress | Should | Hadith |
| FR-IE-012 | System shall display prayer times for location | Must | Prayer |
| FR-IE-013 | System shall use Hanafi calculation method | Must | Prayer |
| FR-IE-014 | System shall display Hijri calendar | Must | Calendar |
| FR-IE-015 | System shall highlight Islamic holidays | Should | Calendar |
| FR-IE-016 | System shall generate Hifz certificates | Should | Certificates |
| FR-IE-017 | System shall generate Quran progress reports | Must | Reports |
| FR-IE-018 | System shall generate class-wide Islamic progress report | Should | Reports |

### 4.7 Payment System

#### FR-PY-001 to FR-PY-040: Payment System Requirements

| FR ID | Requirement | Priority | Module |
|-------|-------------|----------|--------|
| FR-PY-001 | System shall integrate with bKash API | Must | Gateway |
| FR-PY-002 | System shall integrate with Nagad API | Must | Gateway |
| FR-PY-003 | System shall integrate with SSLCommerz | Should | Gateway |
| FR-PY-004 | System shall handle payment initiation | Must | Processing |
| FR-PY-005 | System shall handle payment callbacks | Must | Processing |
| FR-PY-006 | System shall verify transaction status | Must | Processing |
| FR-PY-007 | System shall update fee balance on success | Must | Processing |
| FR-PY-008 | System shall log all transactions | Must | Logging |
| FR-PY-009 | System shall generate unique transaction ID | Must | Processing |
| FR-PY-010 | System shall generate digital receipts | Must | Receipts |
| FR-PY-011 | System shall send SMS confirmation | Must | Notifications |
| FR-PY-012 | System shall allow receipt download | Must | Receipts |
| FR-PY-013 | System shall handle payment failures gracefully | Must | Error Handling |
| FR-PY-014 | System shall prevent duplicate payments | Must | Validation |
| FR-PY-015 | System shall support partial payments | Should | Processing |
| FR-PY-016 | System shall enforce minimum payment amount | Must | Validation |
| FR-PY-017 | System shall reconcile payments with gateway | Must | Reconciliation |
| FR-PY-018 | System shall generate financial reports | Must | Reports |

### 4.8 Communication Hub

#### FR-CH-001 to FR-CH-030: Communication Requirements

| FR ID | Requirement | Priority | Module |
|-------|-------------|----------|--------|
| FR-CH-001 | System shall send SMS notifications | Must | SMS |
| FR-CH-002 | System shall integrate with BulkSMSBD | Must | SMS |
| FR-CH-003 | System shall support Bengali SMS | Must | SMS |
| FR-CH-004 | System shall send email notifications | Must | Email |
| FR-CH-005 | System shall integrate with SendGrid | Must | Email |
| FR-CH-006 | System shall use email templates | Should | Email |
| FR-CH-007 | System shall send push notifications | Must | Push |
| FR-CH-008 | System shall support FCM for Android | Must | Push |
| FR-CH-009 | System shall support APNs for iOS | Must | Push |
| FR-CH-010 | System shall allow in-app messaging | Must | Messaging |
| FR-CH-011 | System shall store message history | Must | Messaging |
| FR-CH-012 | System shall allow attachment sending | Should | Messaging |
| FR-CH-013 | System shall create bulk announcements | Must | Announcements |
| FR-CH-014 | System shall target announcements by audience | Must | Announcements |
| FR-CH-015 | System shall schedule announcements | Should | Announcements |
| FR-CH-016 | System shall allow notification preferences | Should | Preferences |

---

## Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Developer | | _________________ | ________ |
| Principal | | _________________ | ________ |

---

**Document Version:** 1.0
**Last Updated:** January 10, 2026
**Status:** Pending Approval

---

*This Functional Requirements Specification provides detailed use cases and requirements for the Smart Academy Digital Portal. Requirements are traceable to user stories and aligned with the URD and SRS.*
