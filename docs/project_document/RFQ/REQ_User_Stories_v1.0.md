# Smart Academy Digital Portal - User Stories Document

**Document Title:** User Stories Document
**Document ID:** REQ_User_Stories_v1.0
**Version:** 1.0
**Date:** January 10, 2026
**Project Name:** Smart Academy Digital Web Portal Development
**Prepared By:** Solo Full-Stack Developer

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | January 10, 2026 | Development Team | Initial User Stories Document |

---

## Table of Contents

1. [Epic Breakdown](#1-epic-breakdown)
2. [Student User Stories](#2-student-user-stories)
3. [Parent User Stories](#3-parent-user-stories)
4. [Teacher User Stories](#4-teacher-user-stories)
5. [Admin User Stories](#5-admin-user-stories)
6. [Public Visitor User Stories](#6-public-visitor-user-stories)
7. [Story Prioritization](#7-story-prioritization)
8. [Story Dependencies](#8-story-dependencies)

---

## 1. Epic Breakdown

### 1.1 Epic Overview

| Epic ID | Epic Name | Description | Priority | Stories |
|---------|-----------|-------------|----------|---------|
| EPIC-001 | Public Website | Informational website for prospective students and parents | High | 15 |
| EPIC-002 | Authentication & SSO | Unified login across all platforms | Critical | 8 |
| EPIC-003 | Student Portal | Student access to academic information | High | 12 |
| EPIC-004 | Parent Portal | Parent access to child monitoring and payment | Critical | 20 |
| EPIC-005 | Teacher Portal | Teacher tools for classroom management | Critical | 18 |
| EPIC-006 | Admin Dashboard | Administrative management and analytics | Critical | 22 |
| EPIC-007 | Islamic Education | Quran and Islamic studies tracking | Critical | 15 |
| EPIC-008 | Payment System | Online fee payment integration | Critical | 12 |
| EPIC-009 | Communication Hub | Notifications and messaging | High | 10 |
| EPIC-010 | Mobile Application | iOS and Android parent/student apps | High | 14 |

### 1.2 Epic Hierarchy

```
Smart Academy Digital Portal
│
├── EPIC-001: Public Website
│   ├── Homepage
│   ├── About Pages
│   ├── Academic Programs
│   ├── Admission
│   ├── News & Events
│   └── Contact
│
├── EPIC-002: Authentication & SSO
│   ├── Login/Logout
│   ├── SSO Integration
│   ├── Password Management
│   └── Multi-Factor Auth
│
├── EPIC-003: Student Portal
│   ├── Dashboard
│   ├── Schedule
│   ├── Grades
│   ├── Attendance
│   └── Resources
│
├── EPIC-004: Parent Portal
│   ├── Dashboard
│   ├── Academic Progress
│   ├── Fee Payment
│   ├── Communication
│   └── Islamic Progress
│
├── EPIC-005: Teacher Portal
│   ├── Dashboard
│   ├── Attendance
│   ├── Grading
│   ├── Islamic Education
│   └── Communication
│
├── EPIC-006: Admin Dashboard
│   ├── Analytics
│   ├── Student Management
│   ├── Staff Management
│   ├── Admissions
│   ├── Fees
│   └── Reports
│
├── EPIC-007: Islamic Education
│   ├── Quran Tracking
│   ├── Tajweed Assessment
│   ├── Prayer Times
│   └── Hijri Calendar
│
├── EPIC-008: Payment System
│   ├── bKash Integration
│   ├── Nagad Integration
│   ├── SSLCommerz
│   └── Receipt Generation
│
├── EPIC-009: Communication Hub
│   ├── SMS Notifications
│   ├── Email Notifications
│   ├── Push Notifications
│   └── In-App Messaging
│
└── EPIC-010: Mobile Application
    ├── Parent App (iOS/Android)
    ├── Student App (iOS/Android)
    └── Offline Mode
```

---

## 2. Student User Stories

### 2.1 Dashboard

#### US-S001: View Student Dashboard

**As a** student
**I want** to see an overview of my academic information on my dashboard
**So that** I can quickly check my schedule, grades, and announcements

**Acceptance Criteria:**
- Given I am a logged-in student
- When I access my dashboard
- Then I should see:
  - Today's class schedule
  - Recent grades
  - Upcoming assignments
  - Latest announcements
  - Quran memorization summary

**Story Points:** 5
**Priority:** Must Have
**Sprint:** 11

---

### 2.2 Schedule

#### US-S002: View Daily Schedule

**As a** student
**I want** to view my daily class schedule
**So that** I know which classes I have today and their timings

**Acceptance Criteria:**
- Given I am a logged-in student
- When I view today's schedule
- Then I should see:
  - Class subject
  - Start and end time
  - Teacher name
  - Room/location
  - Current class highlighted

**Story Points:** 3
**Priority:** Must Have
**Sprint:** 11

---

#### US-S003: View Weekly Timetable

**As a** student
**I want** to view my weekly class timetable
**So that** I can plan my week and prepare for upcoming classes

**Acceptance Criteria:**
- Given I am a logged-in student
- When I view my weekly timetable
- Then I should see a grid with:
  - Days of the week as columns
  - Time slots as rows
  - Classes filled in appropriate slots
  - Today highlighted

**Story Points:** 3
**Priority:** Must Have
**Sprint:** 11

---

### 2.3 Grades

#### US-S004: View Subject Grades

**As a** student
**I want** to view my grades for each subject
**So that** I can track my academic performance

**Acceptance Criteria:**
- Given I am a logged-in student
- When I access my grades section
- Then I should see:
  - List of subjects
  - Current grade/mark for each
  - Assessment breakdown (tests, exams, assignments)
  - Class rank (optional)

**Story Points:** 5
**Priority:** Must Have
**Sprint:** 11

---

#### US-S005: View Exam Results

**As a** student
**I want** to view my term/annual exam results
**So that** I can see my overall performance

**Acceptance Criteria:**
- Given I am a logged-in student
- When I view exam results
- Then I should see:
  - Subject-wise marks
  - Total marks and percentage
  - Grade
  - Pass/Fail status
  - Position in class (if enabled)

**Story Points:** 3
**Priority:** Must Have
**Sprint:** 11

---

### 2.4 Islamic Education

#### US-S006: View Quran Progress

**As a** student
**I want** to view my Quran memorization progress
**So that** I can see how far I've come in my Hifz journey

**Acceptance Criteria:**
- Given I am a logged-in student
- When I access my Islamic progress page
- Then I should see:
  - Visual Quran map showing completed Surahs
  - Number of Surahs memorized
  - Number of Juz completed
  - Recent progress entries
  - Next target Surah/verses

**Story Points:** 5
**Priority:** Must Have
**Sprint:** 15

---

#### US-S007: View Tajweed Scores

**As a** student
**I want** to view my Tajweed assessment scores
**So that** I can see areas for improvement in my recitation

**Acceptance Criteria:**
- Given I am a logged-in student
- When I view Tajweed scores
- Then I should see:
  - Assessment dates
  - Scores by category (Makhraj, Mad, etc.)
  - Overall score
  - Teacher feedback
  - Trend over time

**Story Points:** 3
**Priority:** Must Have
**Sprint:** 15

---

### 2.5 Attendance

#### US-S008: View Attendance Record

**As a** student
**I want** to view my attendance record
**So that** I can track my presence in school

**Acceptance Criteria:**
- Given I am a logged-in student
- When I view my attendance
- Then I should see:
  - Overall attendance percentage
  - Monthly calendar view with presence/absence
  - List of absent dates
  - Late arrivals count

**Story Points:** 3
**Priority:** Must Have
**Sprint:** 11

---

### 2.6 Announcements

#### US-S009: View Announcements

**As a** student
**I want** to view school and class announcements
**So that** I stay informed about important information

**Acceptance Criteria:**
- Given I am a logged-in student
- When I access announcements
- Then I should see:
  - Latest announcements first
  - Announcement title, date, and content
  - Category (school-wide, class-specific)
  - Unread indicator for new announcements

**Story Points:** 2
**Priority:** Must Have
**Sprint:** 11

---

## 3. Parent User Stories

### 3.1 Dashboard

#### US-P001: View Parent Dashboard

**As a** parent
**I want** to see an overview of all my children's academic status
**So that** I can monitor their progress at a glance

**Acceptance Criteria:**
- Given I am a logged-in parent
- When I access my dashboard
- Then I should see:
  - Cards for each child with their photo
  - Current grade/class for each child
  - Quick metrics (attendance %, recent grades)
  - Outstanding fee balance
  - Unread notifications count

**Story Points:** 5
**Priority:** Must Have
**Sprint:** 13

---

#### US-P002: Switch Between Children

**As a** parent
**I want** to easily switch between my children's profiles
**So that** I can view detailed information for each child

**Acceptance Criteria:**
- Given I am a parent with multiple children
- When I tap on a child's card or use the child selector
- Then the dashboard should show that child's detailed information
- And I should be able to switch back easily

**Story Points:** 2
**Priority:** Must Have
**Sprint:** 13

---

### 3.2 Academic Progress

#### US-P003: View Child's Grades

**As a** parent
**I want** to view my child's grades
**So that** I can monitor their academic performance

**Acceptance Criteria:**
- Given I am viewing my child's profile
- When I access the grades section
- Then I should see:
  - Subject-wise current grades
  - Comparison with class average
  - Grade trend (improving/declining)
  - Recent test/exam results
  - Teacher comments (if any)

**Story Points:** 5
**Priority:** Must Have
**Sprint:** 13

---

#### US-P004: View Child's Attendance

**As a** parent
**I want** to view my child's attendance record
**So that** I know if they're attending school regularly

**Acceptance Criteria:**
- Given I am viewing my child's profile
- When I access the attendance section
- Then I should see:
  - Overall attendance percentage
  - Calendar view with color-coded attendance
  - List of absences with dates
  - Late arrivals count
  - Comparison with school average

**Story Points:** 3
**Priority:** Must Have
**Sprint:** 13

---

### 3.3 Islamic Education Progress

#### US-P005: View Child's Quran Progress

**As a** parent
**I want** to view my child's Quran memorization progress
**So that** I can support their Islamic education at home

**Acceptance Criteria:**
- Given I am viewing my child's profile
- When I access the Islamic progress section
- Then I should see:
  - Visual Quran map with completion status
  - Number of Surahs memorized
  - Number of Juz completed
  - Recent progress entries with dates
  - Teacher's comments and feedback
  - Tajweed assessment scores

**Story Points:** 5
**Priority:** Must Have
**Sprint:** 15

---

#### US-P006: View Tajweed Assessment Details

**As a** parent
**I want** to view my child's Tajweed assessment details
**So that** I understand their recitation quality

**Acceptance Criteria:**
- Given I am viewing Islamic progress
- When I tap on Tajweed assessment
- Then I should see:
  - Assessment date and assessor
  - Scores by Tajweed category
  - Overall score
  - Areas for improvement
  - Historical trend

**Story Points:** 3
**Priority:** Should Have
**Sprint:** 15

---

### 3.4 Fee Payment

#### US-P007: View Fee Status

**As a** parent
**I want** to view my child's fee status
**So that** I know what I owe and when it's due

**Acceptance Criteria:**
- Given I am viewing my child's profile
- When I access the fees section
- Then I should see:
  - Total outstanding balance
  - Breakdown by fee type (tuition, transport, etc.)
  - Due dates
  - Payment history
  - Any late fees applied

**Story Points:** 3
**Priority:** Must Have
**Sprint:** 13

---

#### US-P008: Pay Fees via bKash

**As a** parent
**I want** to pay school fees using bKash
**So that** I can pay conveniently from my phone

**Acceptance Criteria:**
- Given I have outstanding fees
- When I select "Pay with bKash"
- Then I should be redirected to bKash payment page
- And after successful payment:
  - My balance should be updated
  - I should receive a digital receipt
  - I should receive SMS confirmation

**Story Points:** 8
**Priority:** Must Have
**Sprint:** 13

---

#### US-P009: Pay Fees via Nagad

**As a** parent
**I want** to pay school fees using Nagad
**So that** I have an alternative mobile payment option

**Acceptance Criteria:**
- Given I have outstanding fees
- When I select "Pay with Nagad"
- Then I should be redirected to Nagad payment page
- And after successful payment:
  - My balance should be updated
  - I should receive a digital receipt
  - I should receive SMS confirmation

**Story Points:** 8
**Priority:** Must Have
**Sprint:** 13

---

#### US-P010: Make Partial Payment

**As a** parent
**I want** to make a partial fee payment
**So that** I can pay what I can afford now

**Acceptance Criteria:**
- Given I have an outstanding balance
- When I choose partial payment
- Then I should be able to enter a custom amount (minimum 500 BDT)
- And the remaining balance should be displayed
- And I can proceed with payment

**Story Points:** 3
**Priority:** Should Have
**Sprint:** 13

---

#### US-P011: Download Payment Receipt

**As a** parent
**I want** to download a payment receipt
**So that** I have a record of my payment

**Acceptance Criteria:**
- Given I have made a payment
- When I tap "Download Receipt"
- Then a PDF receipt should be downloaded
- And it should contain:
  - School name and logo
  - Receipt number
  - Payment date and amount
  - Payment method
  - Student name and class
  - Fee breakdown

**Story Points:** 3
**Priority:** Must Have
**Sprint:** 13

---

### 3.5 Communication

#### US-P012: Message Teacher

**As a** parent
**I want** to send a message to my child's teacher
**So that** I can discuss my child's progress or concerns

**Acceptance Criteria:**
- Given I am viewing my child's profile
- When I access messaging
- Then I should see a list of my child's teachers
- And I should be able to compose and send a message
- And see message history with each teacher

**Story Points:** 5
**Priority:** Must Have
**Sprint:** 14

---

#### US-P013: View Announcements

**As a** parent
**I want** to view school announcements
**So that** I stay informed about school news and events

**Acceptance Criteria:**
- Given I am logged in as a parent
- When I access announcements
- Then I should see:
  - School-wide announcements
  - Class-specific announcements for my child's class
  - Date and time of each announcement
  - Unread indicator

**Story Points:** 2
**Priority:** Must Have
**Sprint:** 14

---

#### US-P014: Receive Push Notifications

**As a** parent
**I want** to receive push notifications on my phone
**So that** I'm alerted to important information immediately

**Acceptance Criteria:**
- Given I have the app installed
- When a notification event occurs (absence, new grade, fee reminder)
- Then I should receive a push notification
- And tapping it should take me to the relevant section

**Story Points:** 5
**Priority:** Must Have
**Sprint:** 14

---

## 4. Teacher User Stories

### 4.1 Attendance

#### US-T001: Mark Class Attendance

**As a** teacher
**I want** to mark attendance for my class
**So that** student presence is recorded and parents are notified of absences

**Acceptance Criteria:**
- Given I am at the start of a class
- When I open attendance for my class
- Then I should see a list of students (all defaulted to "Present")
- And I can quickly tap to mark "Absent" or "Late"
- And when I submit, attendance is saved
- And parents of absent students receive SMS notification

**Story Points:** 5
**Priority:** Must Have
**Sprint:** 9

---

#### US-T002: View Attendance History

**As a** teacher
**I want** to view attendance history for my class
**So that** I can identify students with poor attendance

**Acceptance Criteria:**
- Given I am viewing my class
- When I access attendance history
- Then I should see:
  - Calendar view of past attendance
  - Summary statistics per student
  - Students with low attendance highlighted
  - Export option for reports

**Story Points:** 3
**Priority:** Should Have
**Sprint:** 9

---

### 4.2 Grading

#### US-T003: Enter Grades for Assessment

**As a** teacher
**I want** to enter grades for a class assessment
**So that** student performance is recorded

**Acceptance Criteria:**
- Given I have an assessment to grade
- When I open the gradebook
- Then I should see a list of students
- And I can enter marks/grades for each student
- And I can add comments (optional)
- And when I save, grades are stored and visible to students/parents

**Story Points:** 5
**Priority:** Must Have
**Sprint:** 10

---

#### US-T004: Create New Assessment

**As a** teacher
**I want** to create a new assessment entry
**So that** I can record a new test or assignment grades

**Acceptance Criteria:**
- Given I am in my gradebook
- When I click "Add Assessment"
- Then I should be able to enter:
  - Assessment name
  - Date
  - Maximum marks
  - Weight/percentage
- And a new column should appear for grade entry

**Story Points:** 3
**Priority:** Must Have
**Sprint:** 10

---

### 4.3 Islamic Education

#### US-T005: Record Quran Memorization Progress

**As a** teacher (Islamic Studies)
**I want** to record a student's Quran memorization progress
**So that** their Hifz journey is tracked

**Acceptance Criteria:**
- Given I am assessing a student's memorization
- When I open the Quran progress module
- Then I should see the student's current progress on a visual Quran map
- And I can select Surah and verse range being assessed
- And I can set memorization status (In Progress, Memorized, Mastered)
- And I can add notes
- And progress is saved and visible to parent

**Story Points:** 8
**Priority:** Must Have
**Sprint:** 15

---

#### US-T006: Conduct Tajweed Assessment

**As a** teacher (Islamic Studies)
**I want** to conduct and record a Tajweed assessment
**So that** student recitation quality is evaluated

**Acceptance Criteria:**
- Given I am assessing a student's recitation
- When I open Tajweed assessment
- Then I should be able to rate:
  - Makhraj (pronunciation points)
  - Mad (elongation)
  - Qalqalah (echoing)
  - Ghunnah (nasalization)
  - Overall fluency
- And add comments
- And the overall score is calculated
- And saved to student record

**Story Points:** 5
**Priority:** Must Have
**Sprint:** 15

---

#### US-T007: View Class Quran Progress

**As a** teacher (Islamic Studies)
**I want** to view overall class Quran progress
**So that** I can identify students needing attention

**Acceptance Criteria:**
- Given I am teaching Islamic Studies
- When I view class Quran progress
- Then I should see:
  - List of students with their progress summary
  - Surahs/Juz completed by each
  - Students sorted by progress
  - Students needing revision highlighted

**Story Points:** 3
**Priority:** Should Have
**Sprint:** 15

---

### 4.4 Communication

#### US-T008: Message Parent

**As a** teacher
**I want** to send a message to a student's parent
**So that** I can communicate about student progress or concerns

**Acceptance Criteria:**
- Given I am viewing a student's profile
- When I tap "Message Parent"
- Then I should be able to compose and send a message
- And see message history with that parent

**Story Points:** 3
**Priority:** Must Have
**Sprint:** 14

---

#### US-T009: Send Bulk Message to Class Parents

**As a** teacher
**I want** to send a message to all parents in my class
**So that** I can communicate class-wide information efficiently

**Acceptance Criteria:**
- Given I am in my class view
- When I tap "Message All Parents"
- Then I should be able to compose a message
- And send it to all parents of students in my class
- And delivery status should be shown

**Story Points:** 3
**Priority:** Should Have
**Sprint:** 14

---

### 4.5 Schedule and Resources

#### US-T010: View Teaching Schedule

**As a** teacher
**I want** to view my teaching schedule
**So that** I know my classes for today and the week

**Acceptance Criteria:**
- Given I am logged in as a teacher
- When I access my schedule
- Then I should see:
  - Today's classes with times and rooms
  - Weekly timetable view
  - Substitution notices (if any)

**Story Points:** 3
**Priority:** Must Have
**Sprint:** 9

---

#### US-T011: Upload Study Materials

**As a** teacher
**I want** to upload study materials for my class
**So that** students can access them for learning

**Acceptance Criteria:**
- Given I am in my class resources section
- When I upload a file (PDF, document, video link)
- Then it should be saved and visible to students
- And students should be notified

**Story Points:** 3
**Priority:** Should Have
**Sprint:** 16

---

## 5. Admin User Stories

### 5.1 Dashboard

#### US-A001: View Analytics Dashboard

**As an** admin
**I want** to view key school metrics on a dashboard
**So that** I can monitor school operations at a glance

**Acceptance Criteria:**
- Given I am logged in as an admin
- When I access the dashboard
- Then I should see:
  - Total enrollment by grade
  - Today's attendance percentage
  - Fee collection summary (collected vs. pending)
  - Recent admissions count
  - Academic performance overview
- And I can filter by date range

**Story Points:** 8
**Priority:** Must Have
**Sprint:** 19

---

### 5.2 Student Management

#### US-A002: Add New Student

**As an** admin
**I want** to add a new student to the system
**So that** they have a profile in the school management system

**Acceptance Criteria:**
- Given I am in student management
- When I click "Add Student"
- Then I should see a form with fields for:
  - Personal information (name, DOB, gender)
  - Guardian information
  - Class assignment
  - Photo upload
  - Document uploads
- And on save, student record is created in Gibbon

**Story Points:** 5
**Priority:** Must Have
**Sprint:** 8

---

#### US-A003: Edit Student Information

**As an** admin
**I want** to edit a student's information
**So that** their records stay current

**Acceptance Criteria:**
- Given I am viewing a student's profile
- When I click "Edit"
- Then I should be able to modify all student fields
- And changes are saved to Gibbon

**Story Points:** 3
**Priority:** Must Have
**Sprint:** 8

---

#### US-A004: Assign Student to Class

**As an** admin
**I want** to assign or transfer a student to a class
**So that** they're enrolled in the correct class

**Acceptance Criteria:**
- Given I am viewing a student's profile
- When I select a new class
- Then the student is assigned to that class
- And their schedule is updated
- And relevant teachers can see them

**Story Points:** 3
**Priority:** Must Have
**Sprint:** 8

---

### 5.3 Admissions

#### US-A005: View Admission Applications

**As an** admin
**I want** to view pending admission applications
**So that** I can process them

**Acceptance Criteria:**
- Given there are admission applications
- When I access the admissions module
- Then I should see:
  - List of pending applications
  - Application date and status
  - Applicant name and grade applied for
  - Document upload status

**Story Points:** 3
**Priority:** Must Have
**Sprint:** 8

---

#### US-A006: Process Admission Application

**As an** admin
**I want** to review and process an admission application
**So that** applicants are admitted or rejected

**Acceptance Criteria:**
- Given I am viewing an application
- When I review the details and documents
- Then I can:
  - Approve (assign to class, create student record)
  - Reject (with reason)
  - Put on waitlist
- And applicant is notified via email/SMS

**Story Points:** 5
**Priority:** Must Have
**Sprint:** 8

---

### 5.4 Fee Management

#### US-A007: Configure Fee Structure

**As an** admin
**I want** to configure the school's fee structure
**So that** fees are calculated correctly for each student

**Acceptance Criteria:**
- Given I am in fee management
- When I configure fees
- Then I can set:
  - Fee types (tuition, transport, meals, etc.)
  - Amount per fee type
  - Payment frequency (monthly, quarterly, annually)
  - Late fee rules
  - Discounts/scholarships

**Story Points:** 5
**Priority:** Must Have
**Sprint:** 12

---

#### US-A008: Generate Fee Invoices

**As an** admin
**I want** to generate fee invoices for students
**So that** parents know what they owe

**Acceptance Criteria:**
- Given I am in fee management
- When I generate invoices
- Then invoices are created based on fee structure
- And sent to parents via email/SMS
- And visible in parent portal

**Story Points:** 3
**Priority:** Must Have
**Sprint:** 12

---

#### US-A009: View Fee Collection Report

**As an** admin
**I want** to view fee collection reports
**So that** I can track revenue and outstanding dues

**Acceptance Criteria:**
- Given I need financial data
- When I access fee reports
- Then I should see:
  - Total collected this month/quarter/year
  - Outstanding balance
  - Collection by payment method
  - Overdue accounts list
  - Export to Excel option

**Story Points:** 5
**Priority:** Must Have
**Sprint:** 12

---

### 5.5 Communication

#### US-A010: Create School Announcement

**As an** admin
**I want** to create and send a school-wide announcement
**So that** all stakeholders are informed

**Acceptance Criteria:**
- Given I need to announce something
- When I create an announcement
- Then I can:
  - Enter title and content
  - Select audience (all, specific grades, staff only)
  - Choose delivery channels (app, SMS, email)
  - Schedule or send immediately
- And recipients receive the announcement

**Story Points:** 5
**Priority:** Must Have
**Sprint:** 14

---

#### US-A011: Send Bulk SMS

**As an** admin
**I want** to send bulk SMS to selected recipients
**So that** I can communicate urgent information

**Acceptance Criteria:**
- Given I need to send SMS
- When I compose a bulk SMS
- Then I can:
  - Select recipients by class, grade, or custom list
  - Compose message (Bengali or English)
  - Preview recipient count
  - Send immediately or schedule
- And delivery status is tracked

**Story Points:** 3
**Priority:** Must Have
**Sprint:** 14

---

### 5.6 Reports

#### US-A012: Generate Attendance Report

**As an** admin
**I want** to generate school-wide attendance reports
**So that** I can analyze attendance patterns

**Acceptance Criteria:**
- Given I need attendance data
- When I generate an attendance report
- Then I should be able to:
  - Select date range
  - Filter by class or grade
  - View summary statistics
  - See students with low attendance
  - Export to Excel/PDF

**Story Points:** 5
**Priority:** Must Have
**Sprint:** 19

---

#### US-A013: Generate Academic Performance Report

**As an** admin
**I want** to generate academic performance reports
**So that** I can analyze student achievement

**Acceptance Criteria:**
- Given I need academic data
- When I generate a performance report
- Then I should see:
  - Pass/fail rates by class
  - Subject-wise performance
  - Grade distribution
  - Top performers
  - Students needing support
- And export options

**Story Points:** 5
**Priority:** Must Have
**Sprint:** 19

---

## 6. Public Visitor User Stories

### 6.1 Homepage

#### US-V001: View School Homepage

**As a** public visitor
**I want** to view the school's homepage
**So that** I can learn about Smart Academy

**Acceptance Criteria:**
- Given I access the website URL
- When the homepage loads
- Then I should see:
  - School logo and name
  - Hero section with key message
  - Quick facts (students, teachers, programs)
  - Featured news
  - Navigation to other pages

**Story Points:** 3
**Priority:** Must Have
**Sprint:** 4

---

### 6.2 About

#### US-V002: View About Pages

**As a** public visitor
**I want** to learn about the school's vision, history, and leadership
**So that** I understand the school's values and background

**Acceptance Criteria:**
- Given I am on the website
- When I navigate to About section
- Then I should see:
  - Vision, Mission, Values
  - School history and milestones
  - Leadership team profiles
  - Awards and recognition

**Story Points:** 3
**Priority:** Must Have
**Sprint:** 4

---

### 6.3 Admission

#### US-V003: Submit Admission Inquiry

**As a** prospective parent
**I want** to submit an inquiry about admission
**So that** the school can contact me with information

**Acceptance Criteria:**
- Given I am interested in enrolling my child
- When I fill out the admission inquiry form
- Then the form should collect:
  - Parent name and contact
  - Student name and age
  - Grade interested in
  - Preferred contact method
- And I should receive confirmation email/SMS
- And the school should receive the inquiry

**Story Points:** 3
**Priority:** Must Have
**Sprint:** 5

---

#### US-V004: View Admission Requirements

**As a** prospective parent
**I want** to view admission requirements and process
**So that** I know what's needed to apply

**Acceptance Criteria:**
- Given I am on the admission page
- When I view requirements
- Then I should see:
  - Age requirements by grade
  - Required documents list
  - Admission process steps
  - Fee structure
  - Contact information

**Story Points:** 2
**Priority:** Must Have
**Sprint:** 5

---

### 6.4 Academic Programs

#### US-V005: View Academic Programs

**As a** prospective parent
**I want** to view the school's academic programs
**So that** I understand what my child will learn

**Acceptance Criteria:**
- Given I am browsing the website
- When I access academic programs
- Then I should see:
  - Program levels (Early Childhood, Primary, Secondary)
  - Curriculum overview for each
  - Islamic education details
  - STEAM education information
  - Extracurricular activities

**Story Points:** 3
**Priority:** Must Have
**Sprint:** 4

---

### 6.5 Contact

#### US-V006: Submit Contact Form

**As a** visitor
**I want** to contact the school
**So that** I can get answers to my questions

**Acceptance Criteria:**
- Given I have a question
- When I fill out the contact form
- Then the form should collect:
  - Name
  - Email
  - Phone
  - Message
- And I should receive confirmation
- And the school should receive the inquiry

**Story Points:** 2
**Priority:** Must Have
**Sprint:** 5

---

## 7. Story Prioritization

### 7.1 MoSCoW Prioritization Summary

| Priority | Count | Description |
|----------|-------|-------------|
| **Must Have** | 85 | Essential for MVP launch |
| **Should Have** | 35 | Important but not critical |
| **Could Have** | 15 | Nice to have if time permits |
| **Won't Have** | 10 | Deferred to future release |

### 7.2 Priority by Epic

| Epic | Must | Should | Could | Won't |
|------|------|--------|-------|-------|
| EPIC-001: Public Website | 10 | 3 | 2 | 0 |
| EPIC-002: Authentication | 6 | 2 | 0 | 0 |
| EPIC-003: Student Portal | 8 | 3 | 1 | 0 |
| EPIC-004: Parent Portal | 14 | 4 | 2 | 0 |
| EPIC-005: Teacher Portal | 12 | 5 | 1 | 0 |
| EPIC-006: Admin Dashboard | 16 | 5 | 1 | 0 |
| EPIC-007: Islamic Education | 10 | 4 | 1 | 0 |
| EPIC-008: Payment System | 6 | 4 | 2 | 0 |
| EPIC-009: Communication | 5 | 4 | 1 | 0 |
| EPIC-010: Mobile App | 8 | 4 | 2 | 0 |

### 7.3 Sprint Allocation

| Sprint | Focus | Story Points | Stories |
|--------|-------|--------------|---------|
| Sprint 4-5 | Public Website | 35 | US-V001-006 |
| Sprint 6-7 | Authentication | 25 | Auth stories |
| Sprint 8-9 | Admin Core + Attendance | 40 | US-A002-006, US-T001-002 |
| Sprint 10-11 | Grading + Student Portal | 40 | US-T003-004, US-S001-009 |
| Sprint 12-13 | Fee Management + Parent Fees | 45 | US-A007-009, US-P007-011 |
| Sprint 14-15 | Communication + Islamic | 50 | US-T005-009, US-P005-006 |
| Sprint 16-17 | Mobile App | 45 | Mobile stories |
| Sprint 18-19 | Analytics + Reports | 35 | US-A001, US-A012-013 |
| Sprint 20-21 | Testing + Polish | 20 | Bug fixes, optimization |

---

## 8. Story Dependencies

### 8.1 Dependency Graph

```
Authentication (EPIC-002)
├──► Student Portal (EPIC-003)
├──► Parent Portal (EPIC-004)
├──► Teacher Portal (EPIC-005)
├──► Admin Dashboard (EPIC-006)
└──► Mobile App (EPIC-010)

Gibbon Setup
├──► Student Management (US-A002-004)
├──► Attendance (US-T001-002)
└──► Grading (US-T003-004)

Payment Gateway Setup
└──► Fee Payment (US-P008-011)

SMS Gateway Setup
├──► Attendance Notifications (US-T001)
├──► Fee Reminders (US-A008)
└──► Announcements (US-A010-011)

Islamic Module Setup
├──► Quran Tracking (US-T005-007)
└──► Parent View (US-P005-006)
```

### 8.2 Critical Dependencies

| Dependent Story | Depends On | Reason |
|-----------------|------------|--------|
| US-P008 (bKash Payment) | bKash API Integration | External dependency |
| US-T001 (Attendance) | Gibbon Setup | Data source |
| US-S001 (Student Dashboard) | SSO Implementation | Authentication required |
| US-T005 (Quran Progress) | Islamic Module Schema | Database setup |
| US-A010 (Announcements) | SMS Gateway Setup | Delivery channel |
| All Mobile Stories | Authentication + APIs | Foundation required |

### 8.3 External Dependencies

| Dependency | Stories Affected | Risk Level |
|------------|-----------------|------------|
| bKash API Approval | US-P008 | Medium |
| Nagad API Approval | US-P009 | Medium |
| BulkSMSBD Setup | All SMS stories | Low |
| SendGrid Setup | All email stories | Low |
| App Store Approval | Mobile release | Low |
| Play Store Approval | Mobile release | Low |

---

## Appendix A: User Story Template

```markdown
## [US-XXX]: [Story Title]

### User Story
**As a** [role]
**I want** [feature/capability]
**So that** [benefit/value]

### Description
[Additional context and details]

### Acceptance Criteria
- Given [context]
- When [action]
- Then [expected result]

### Technical Notes
- [Implementation considerations]
- [API endpoints needed]
- [Database changes]

### Design Reference
- [Link to mockup/wireframe]

### Dependencies
- [List any dependent stories]

### Story Points: [X]
### Priority: [Must/Should/Could/Won't]
### Epic: [Epic Name]
### Sprint: [Sprint Number]
```

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

*This User Stories Document provides the detailed backlog for the Smart Academy Digital Portal. Stories should be refined during sprint planning and updated as requirements evolve.*
