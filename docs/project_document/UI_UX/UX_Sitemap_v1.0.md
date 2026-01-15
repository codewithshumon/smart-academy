# Smart Academy Digital Portal - Site Map

**Document Title:** Site Map Document
**Document ID:** UX_Sitemap_v1.0
**Version:** 1.0
**Date:** January 10, 2026
**Project Name:** Smart Academy Digital Web Portal Development
**Prepared By:** Solo Full-Stack Developer

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | January 10, 2026 | Development Team | Initial Site Map Document |

**Reference Documents:**
- Smart Academy URD v1.0
- Smart Academy Frontend Specification v1.0
- Smart Academy Functional Requirements v1.0

---

## Table of Contents

1. [Overview](#1-overview)
2. [Public Website Sitemap](#2-public-website-sitemap)
3. [Student Portal Sitemap](#3-student-portal-sitemap)
4. [Parent Portal Sitemap](#4-parent-portal-sitemap)
5. [Teacher Portal Sitemap](#5-teacher-portal-sitemap)
6. [Admin Dashboard Sitemap](#6-admin-dashboard-sitemap)
7. [Navigation Structure](#7-navigation-structure)
8. [URL Structure](#8-url-structure)
9. [Page Inventory](#9-page-inventory)

---

## 1. Overview

### 1.1 Purpose

This document defines the complete site structure for the Smart Academy Digital Portal, including:
- Public marketing website
- Student portal
- Parent portal
- Teacher portal
- Administrator dashboard

### 1.2 Sitemap Legend

```
🏠 Homepage / Root
📁 Section / Category
📄 Page
🔒 Authentication Required
⚡ Dynamic Content
🔗 External Link
```

### 1.3 User Roles & Access

| Role | Public Site | Student Portal | Parent Portal | Teacher Portal | Admin Dashboard |
|------|-------------|----------------|---------------|----------------|-----------------|
| Visitor | Full | - | - | - | - |
| Student | Full | Full | - | - | - |
| Parent | Full | - | Full | - | - |
| Teacher | Full | - | - | Full | Limited |
| Staff | Full | - | - | Limited | Limited |
| Admin | Full | View | View | View | Full |
| Super Admin | Full | Full | Full | Full | Full |

---

## 2. Public Website Sitemap

### 2.1 Visual Sitemap

```
🏠 Smart Academy (/)
│
├── 📁 About
│   ├── 📄 About Smart Academy (/about)
│   ├── 📄 Vision, Mission & Values (/about/vision-mission)
│   ├── 📄 History & Milestones (/about/history)
│   ├── 📄 Leadership Team (/about/leadership)
│   ├── 📄 Smart Foundation Story (/about/foundation)
│   ├── 📄 Accreditation & Affiliations (/about/accreditation)
│   └── 📄 Awards & Recognition (/about/awards)
│
├── 📁 Why Choose Us
│   ├── 📄 Unique Value Proposition (/why-choose-us)
│   ├── 📄 Islamic Identity (/why-choose-us/islamic-identity)
│   ├── 📄 STEAM Education (/why-choose-us/steam)
│   ├── 📄 Technology Integration (/why-choose-us/technology)
│   ├── 📄 Rural Education Impact (/why-choose-us/rural-impact)
│   ├── 📄 Affordability & Scholarships (/why-choose-us/affordability)
│   ├── 📄 Safety & Security (/why-choose-us/safety)
│   ├── 📄 Success Stories (/why-choose-us/success-stories)
│   └── 📄 Comparative Advantages (/why-choose-us/comparison)
│
├── 📁 Academics
│   ├── 📄 Academic Overview (/academics)
│   ├── 📁 Early Childhood (PlayGroup - KG)
│   │   ├── 📄 Overview (/academics/early-childhood)
│   │   ├── 📄 PlayGroup Curriculum (/academics/early-childhood/playgroup)
│   │   ├── 📄 Nursery Curriculum (/academics/early-childhood/nursery)
│   │   ├── 📄 Kindergarten Curriculum (/academics/early-childhood/kg)
│   │   ├── 📄 Pedagogy & Approach (/academics/early-childhood/pedagogy)
│   │   ├── 📄 Daily Schedule (/academics/early-childhood/schedule)
│   │   └── 📄 Assessment System (/academics/early-childhood/assessment)
│   │
│   ├── 📁 Primary Education (Class 1-5)
│   │   ├── 📄 Overview (/academics/primary)
│   │   ├── 📄 Class 1-3 Curriculum (/academics/primary/lower)
│   │   ├── 📄 Class 4-5 Curriculum (/academics/primary/upper)
│   │   ├── 📄 Subject Guides (/academics/primary/subjects)
│   │   ├── 📄 Technology Integration (/academics/primary/technology)
│   │   ├── 📄 Assessment System (/academics/primary/assessment)
│   │   └── 📄 Learning Outcomes (/academics/primary/outcomes)
│   │
│   ├── 📁 Secondary Education (Class 6-9+)
│   │   ├── 📄 Overview (/academics/secondary)
│   │   ├── 📄 Class 6-8 Curriculum (/academics/secondary/junior)
│   │   ├── 📄 Class 9-10 Curriculum (/academics/secondary/senior)
│   │   ├── 📄 SSC Preparation (/academics/secondary/ssc-prep)
│   │   ├── 📄 Subject Guides (/academics/secondary/subjects)
│   │   └── 📄 Career Guidance (/academics/secondary/careers)
│   │
│   ├── 📁 Islamic Studies
│   │   ├── 📄 Islamic Studies Overview (/academics/islamic)
│   │   ├── 📄 Quran & Hifz Program (/academics/islamic/quran)
│   │   ├── 📄 Tajweed & Recitation (/academics/islamic/tajweed)
│   │   ├── 📄 Islamic Values (/academics/islamic/values)
│   │   └── 📄 Arabic Language (/academics/islamic/arabic)
│   │
│   └── 📁 STEAM Education
│       ├── 📄 STEAM Philosophy (/academics/steam)
│       ├── 📄 Science Program (/academics/steam/science)
│       ├── 📄 Technology Program (/academics/steam/technology)
│       ├── 📄 Engineering Program (/academics/steam/engineering)
│       ├── 📄 Arts Program (/academics/steam/arts)
│       ├── 📄 Mathematics Program (/academics/steam/mathematics)
│       ├── 📄 Robotics & Coding (/academics/steam/robotics)
│       ├── 📄 Projects Showcase (/academics/steam/projects)
│       └── 📄 Competitions (/academics/steam/competitions)
│
├── 📁 Admissions
│   ├── 📄 Admissions Overview (/admissions)
│   ├── 📄 Admission Process (/admissions/process)
│   ├── 📄 Eligibility Criteria (/admissions/eligibility)
│   ├── 📄 Fee Structure (/admissions/fees)
│   ├── 📄 Scholarships & Aid (/admissions/scholarships)
│   ├── 📄 Apply Online 🔒 (/admissions/apply)
│   ├── 📄 Application Status 🔒 (/admissions/status)
│   ├── 📄 FAQs (/admissions/faqs)
│   └── 📄 Contact Admissions (/admissions/contact)
│
├── 📁 Campus & Facilities
│   ├── 📄 Campus Overview (/campus)
│   ├── 📄 Virtual Tour ⚡ (/campus/virtual-tour)
│   ├── 📄 Smart Classrooms (/campus/classrooms)
│   ├── 📄 Science Labs (/campus/science-labs)
│   ├── 📄 Computer Labs (/campus/computer-labs)
│   ├── 📄 Library (/campus/library)
│   ├── 📄 Sports Facilities (/campus/sports)
│   ├── 📄 Prayer Facilities (/campus/prayer)
│   ├── 📄 Cafeteria (/campus/cafeteria)
│   ├── 📄 Medical Facilities (/campus/medical)
│   └── 📄 Transportation (/campus/transportation)
│
├── 📁 News & Events
│   ├── 📄 News Listing ⚡ (/news)
│   ├── 📄 News Article ⚡ (/news/[slug])
│   ├── 📄 Events Calendar ⚡ (/events)
│   ├── 📄 Event Details ⚡ (/events/[slug])
│   ├── 📄 Photo Gallery (/gallery)
│   └── 📄 Video Gallery (/videos)
│
├── 📁 Community
│   ├── 📄 Alumni Network (/alumni)
│   ├── 📄 Alumni Registration 🔒 (/alumni/register)
│   ├── 📄 Parent Association (/parents-association)
│   ├── 📄 Donors & Partners (/donors)
│   └── 📄 Careers (/careers)
│
├── 📁 Resources
│   ├── 📄 Downloads (/resources)
│   ├── 📄 Academic Calendar (/resources/calendar)
│   ├── 📄 Student Handbook (/resources/handbook)
│   ├── 📄 Parent Guidelines (/resources/parent-guide)
│   └── 📄 Forms & Documents (/resources/forms)
│
├── 📄 Contact Us (/contact)
│
├── 📁 Portals
│   ├── 📄 Portal Login (/login)
│   ├── 📄 Forgot Password (/forgot-password)
│   ├── 📄 Reset Password (/reset-password)
│   └── 📄 Verify Email (/verify-email)
│
└── 📁 Legal
    ├── 📄 Privacy Policy (/privacy)
    ├── 📄 Terms of Service (/terms)
    └── 📄 Cookie Policy (/cookies)
```

### 2.2 Page Count Summary

| Section | Pages |
|---------|-------|
| Home | 1 |
| About | 7 |
| Why Choose Us | 9 |
| Academics | 28 |
| Admissions | 9 |
| Campus | 11 |
| News & Events | 6 |
| Community | 5 |
| Resources | 5 |
| Contact | 1 |
| Auth | 4 |
| Legal | 3 |
| **Total Public Pages** | **89** |

---

## 3. Student Portal Sitemap

### 3.1 Visual Sitemap

```
🔒 Student Portal (/portal/student)
│
├── 🏠 Dashboard (/portal/student/dashboard)
│   ├── 📄 Overview Cards
│   ├── 📄 Today's Schedule
│   ├── 📄 Recent Announcements
│   ├── 📄 Quick Actions
│   └── 📄 Upcoming Events
│
├── 📁 My Profile
│   ├── 📄 Profile Overview (/portal/student/profile)
│   ├── 📄 Edit Profile (/portal/student/profile/edit)
│   ├── 📄 Change Password (/portal/student/profile/password)
│   └── 📄 ID Card (/portal/student/profile/id-card)
│
├── 📁 Academics
│   ├── 📄 My Classes (/portal/student/classes)
│   ├── 📄 Class Schedule (/portal/student/schedule)
│   ├── 📄 Subjects (/portal/student/subjects)
│   ├── 📄 Assignments ⚡ (/portal/student/assignments)
│   └── 📄 Resources (/portal/student/resources)
│
├── 📁 Attendance
│   ├── 📄 Attendance Overview (/portal/student/attendance)
│   ├── 📄 Monthly Report (/portal/student/attendance/monthly)
│   └── 📄 Leave Applications (/portal/student/attendance/leave)
│
├── 📁 Grades & Results
│   ├── 📄 Current Grades (/portal/student/grades)
│   ├── 📄 Exam Results (/portal/student/results)
│   ├── 📄 Report Cards (/portal/student/report-cards)
│   └── 📄 Academic Progress (/portal/student/progress)
│
├── 📁 Islamic Studies (Quran)
│   ├── 📄 Quran Progress (/portal/student/quran)
│   ├── 📄 Surah Progress Map (/portal/student/quran/surahs)
│   ├── 📄 Murajaah Sessions (/portal/student/quran/murajaah)
│   ├── 📄 Tajweed Assessments (/portal/student/quran/tajweed)
│   └── 📄 Certificates (/portal/student/quran/certificates)
│
├── 📁 Fees
│   ├── 📄 Fee Overview (/portal/student/fees)
│   ├── 📄 Payment History (/portal/student/fees/history)
│   ├── 📄 Pending Payments (/portal/student/fees/pending)
│   └── 📄 Receipts (/portal/student/fees/receipts)
│
├── 📁 Communication
│   ├── 📄 Announcements (/portal/student/announcements)
│   ├── 📄 Messages (/portal/student/messages)
│   └── 📄 Notifications (/portal/student/notifications)
│
├── 📁 Library
│   ├── 📄 Browse Books (/portal/student/library)
│   ├── 📄 My Borrowed Books (/portal/student/library/borrowed)
│   └── 📄 E-Resources (/portal/student/library/e-resources)
│
└── 📁 Settings
    ├── 📄 Preferences (/portal/student/settings)
    ├── 📄 Language (/portal/student/settings/language)
    └── 📄 Notifications (/portal/student/settings/notifications)
```

### 3.2 Page Count

| Section | Pages |
|---------|-------|
| Dashboard | 1 |
| Profile | 4 |
| Academics | 5 |
| Attendance | 3 |
| Grades | 4 |
| Islamic Studies | 5 |
| Fees | 4 |
| Communication | 3 |
| Library | 3 |
| Settings | 3 |
| **Total Student Portal Pages** | **35** |

---

## 4. Parent Portal Sitemap

### 4.1 Visual Sitemap

```
🔒 Parent Portal (/portal/parent)
│
├── 🏠 Dashboard (/portal/parent/dashboard)
│   ├── 📄 Children Overview
│   ├── 📄 Attendance Summary
│   ├── 📄 Fee Status
│   ├── 📄 Recent Updates
│   └── 📄 Quick Actions
│
├── 📁 My Children
│   ├── 📄 Children List (/portal/parent/children)
│   ├── 📄 Child Profile ⚡ (/portal/parent/children/[id])
│   ├── 📄 Add Child (Link Account) (/portal/parent/children/add)
│   └── 📄 Switch Child (/portal/parent/children/switch)
│
├── 📁 Child Academic (per child)
│   ├── 📄 Academic Overview (/portal/parent/children/[id]/academics)
│   ├── 📄 Class Schedule (/portal/parent/children/[id]/schedule)
│   ├── 📄 Grades (/portal/parent/children/[id]/grades)
│   ├── 📄 Report Cards (/portal/parent/children/[id]/reports)
│   ├── 📄 Assignments (/portal/parent/children/[id]/assignments)
│   └── 📄 Teachers (/portal/parent/children/[id]/teachers)
│
├── 📁 Attendance
│   ├── 📄 Attendance Overview (/portal/parent/attendance)
│   ├── 📄 Child Attendance ⚡ (/portal/parent/attendance/[childId])
│   ├── 📄 Request Leave (/portal/parent/attendance/leave)
│   └── 📄 Leave History (/portal/parent/attendance/leave-history)
│
├── 📁 Quran Progress (per child)
│   ├── 📄 Quran Overview (/portal/parent/quran)
│   ├── 📄 Child Progress ⚡ (/portal/parent/quran/[childId])
│   ├── 📄 Memorization Tracker (/portal/parent/quran/[childId]/tracker)
│   └── 📄 Murajaah Schedule (/portal/parent/quran/[childId]/murajaah)
│
├── 📁 Fees & Payments
│   ├── 📄 Fee Overview (/portal/parent/fees)
│   ├── 📄 Pending Payments (/portal/parent/fees/pending)
│   ├── 📄 Make Payment (/portal/parent/fees/pay)
│   ├── 📄 Payment History (/portal/parent/fees/history)
│   ├── 📄 Receipts (/portal/parent/fees/receipts)
│   └── 📄 Scholarship Status (/portal/parent/fees/scholarships)
│
├── 📁 Communication
│   ├── 📄 Announcements (/portal/parent/announcements)
│   ├── 📄 Messages (/portal/parent/messages)
│   ├── 📄 Compose Message (/portal/parent/messages/compose)
│   ├── 📄 Contact Teachers (/portal/parent/messages/teachers)
│   └── 📄 Notifications (/portal/parent/notifications)
│
├── 📁 Events & Calendar
│   ├── 📄 School Calendar (/portal/parent/calendar)
│   ├── 📄 Upcoming Events (/portal/parent/events)
│   ├── 📄 Parent-Teacher Meetings (/portal/parent/meetings)
│   └── 📄 Book Meeting (/portal/parent/meetings/book)
│
├── 📁 My Profile
│   ├── 📄 Profile Overview (/portal/parent/profile)
│   ├── 📄 Edit Profile (/portal/parent/profile/edit)
│   ├── 📄 Emergency Contacts (/portal/parent/profile/emergency)
│   └── 📄 Change Password (/portal/parent/profile/password)
│
└── 📁 Settings
    ├── 📄 Preferences (/portal/parent/settings)
    ├── 📄 Notification Settings (/portal/parent/settings/notifications)
    └── 📄 Language (/portal/parent/settings/language)
```

### 4.2 Page Count

| Section | Pages |
|---------|-------|
| Dashboard | 1 |
| My Children | 4 |
| Child Academic | 6 |
| Attendance | 4 |
| Quran Progress | 4 |
| Fees & Payments | 6 |
| Communication | 5 |
| Events & Calendar | 4 |
| Profile | 4 |
| Settings | 3 |
| **Total Parent Portal Pages** | **41** |

---

## 5. Teacher Portal Sitemap

### 5.1 Visual Sitemap

```
🔒 Teacher Portal (/portal/teacher)
│
├── 🏠 Dashboard (/portal/teacher/dashboard)
│   ├── 📄 Today's Classes
│   ├── 📄 Pending Tasks
│   ├── 📄 Quick Stats
│   ├── 📄 Recent Submissions
│   └── 📄 Announcements
│
├── 📁 My Classes
│   ├── 📄 Class List (/portal/teacher/classes)
│   ├── 📄 Class Details ⚡ (/portal/teacher/classes/[id])
│   ├── 📄 Class Schedule (/portal/teacher/schedule)
│   └── 📄 Timetable (/portal/teacher/timetable)
│
├── 📁 Students
│   ├── 📄 Student Directory (/portal/teacher/students)
│   ├── 📄 Student Profile ⚡ (/portal/teacher/students/[id])
│   ├── 📄 Student Search (/portal/teacher/students/search)
│   └── 📄 Class Students ⚡ (/portal/teacher/classes/[id]/students)
│
├── 📁 Attendance
│   ├── 📄 Mark Attendance (/portal/teacher/attendance)
│   ├── 📄 Today's Attendance (/portal/teacher/attendance/today)
│   ├── 📄 Class Attendance ⚡ (/portal/teacher/attendance/class/[id])
│   ├── 📄 Attendance History (/portal/teacher/attendance/history)
│   ├── 📄 Attendance Reports (/portal/teacher/attendance/reports)
│   └── 📄 Leave Requests (/portal/teacher/attendance/leave-requests)
│
├── 📁 Grades & Assessments
│   ├── 📄 Enter Grades (/portal/teacher/grades)
│   ├── 📄 Class Gradebook ⚡ (/portal/teacher/grades/class/[id])
│   ├── 📄 Assessments (/portal/teacher/assessments)
│   ├── 📄 Create Assessment (/portal/teacher/assessments/create)
│   ├── 📄 Grade Reports (/portal/teacher/grades/reports)
│   └── 📄 Progress Reports (/portal/teacher/reports/progress)
│
├── 📁 Islamic Studies (Quran Teachers)
│   ├── 📄 Quran Dashboard (/portal/teacher/quran)
│   ├── 📄 My Students (/portal/teacher/quran/students)
│   ├── 📄 Record Progress (/portal/teacher/quran/record)
│   ├── 📄 Student Progress ⚡ (/portal/teacher/quran/students/[id])
│   ├── 📄 Murajaah Sessions (/portal/teacher/quran/murajaah)
│   ├── 📄 Record Murajaah (/portal/teacher/quran/murajaah/record)
│   ├── 📄 Tajweed Assessments (/portal/teacher/quran/tajweed)
│   ├── 📄 Create Assessment (/portal/teacher/quran/tajweed/create)
│   └── 📄 Quran Reports (/portal/teacher/quran/reports)
│
├── 📁 Assignments
│   ├── 📄 Assignment List (/portal/teacher/assignments)
│   ├── 📄 Create Assignment (/portal/teacher/assignments/create)
│   ├── 📄 Assignment Details ⚡ (/portal/teacher/assignments/[id])
│   ├── 📄 Submissions ⚡ (/portal/teacher/assignments/[id]/submissions)
│   └── 📄 Grade Submissions (/portal/teacher/assignments/[id]/grade)
│
├── 📁 Communication
│   ├── 📄 Messages (/portal/teacher/messages)
│   ├── 📄 Compose (/portal/teacher/messages/compose)
│   ├── 📄 To Parents (/portal/teacher/messages/parents)
│   ├── 📄 Announcements (/portal/teacher/announcements)
│   ├── 📄 Create Announcement (/portal/teacher/announcements/create)
│   └── 📄 Notifications (/portal/teacher/notifications)
│
├── 📁 Resources
│   ├── 📄 Teaching Materials (/portal/teacher/resources)
│   ├── 📄 Upload Resource (/portal/teacher/resources/upload)
│   ├── 📄 Lesson Plans (/portal/teacher/lesson-plans)
│   └── 📄 Create Lesson Plan (/portal/teacher/lesson-plans/create)
│
├── 📁 Reports
│   ├── 📄 Reports Dashboard (/portal/teacher/reports)
│   ├── 📄 Class Reports (/portal/teacher/reports/class)
│   ├── 📄 Student Reports (/portal/teacher/reports/students)
│   └── 📄 Custom Report (/portal/teacher/reports/custom)
│
├── 📁 My Profile
│   ├── 📄 Profile Overview (/portal/teacher/profile)
│   ├── 📄 Edit Profile (/portal/teacher/profile/edit)
│   ├── 📄 Qualifications (/portal/teacher/profile/qualifications)
│   └── 📄 Change Password (/portal/teacher/profile/password)
│
└── 📁 Settings
    ├── 📄 Preferences (/portal/teacher/settings)
    ├── 📄 Notification Settings (/portal/teacher/settings/notifications)
    └── 📄 Language (/portal/teacher/settings/language)
```

### 5.2 Page Count

| Section | Pages |
|---------|-------|
| Dashboard | 1 |
| My Classes | 4 |
| Students | 4 |
| Attendance | 6 |
| Grades & Assessments | 6 |
| Islamic Studies | 9 |
| Assignments | 5 |
| Communication | 6 |
| Resources | 4 |
| Reports | 4 |
| Profile | 4 |
| Settings | 3 |
| **Total Teacher Portal Pages** | **56** |

---

## 6. Admin Dashboard Sitemap

### 6.1 Visual Sitemap

```
🔒 Admin Dashboard (/admin)
│
├── 🏠 Dashboard (/admin/dashboard)
│   ├── 📄 Key Metrics
│   ├── 📄 Enrollment Stats
│   ├── 📄 Financial Overview
│   ├── 📄 Attendance Summary
│   ├── 📄 Recent Activity
│   └── 📄 System Alerts
│
├── 📁 Students
│   ├── 📄 All Students (/admin/students)
│   ├── 📄 Add Student (/admin/students/add)
│   ├── 📄 Student Profile ⚡ (/admin/students/[id])
│   ├── 📄 Edit Student ⚡ (/admin/students/[id]/edit)
│   ├── 📄 Student Attendance ⚡ (/admin/students/[id]/attendance)
│   ├── 📄 Student Grades ⚡ (/admin/students/[id]/grades)
│   ├── 📄 Student Fees ⚡ (/admin/students/[id]/fees)
│   ├── 📄 Import Students (/admin/students/import)
│   └── 📄 Export Students (/admin/students/export)
│
├── 📁 Guardians/Parents
│   ├── 📄 All Guardians (/admin/guardians)
│   ├── 📄 Add Guardian (/admin/guardians/add)
│   ├── 📄 Guardian Profile ⚡ (/admin/guardians/[id])
│   └── 📄 Link to Student (/admin/guardians/link)
│
├── 📁 Teachers/Staff
│   ├── 📄 All Staff (/admin/staff)
│   ├── 📄 Add Staff (/admin/staff/add)
│   ├── 📄 Staff Profile ⚡ (/admin/staff/[id])
│   ├── 📄 Staff Attendance (/admin/staff/attendance)
│   ├── 📄 Assign Classes (/admin/staff/assign-classes)
│   └── 📄 Departments (/admin/staff/departments)
│
├── 📁 Classes & Sections
│   ├── 📄 All Classes (/admin/classes)
│   ├── 📄 Add Class (/admin/classes/add)
│   ├── 📄 Class Details ⚡ (/admin/classes/[id])
│   ├── 📄 Assign Teachers (/admin/classes/assign-teachers)
│   ├── 📄 Sections (/admin/classes/sections)
│   └── 📄 Timetable (/admin/classes/timetable)
│
├── 📁 Enrollments
│   ├── 📄 All Enrollments (/admin/enrollments)
│   ├── 📄 New Enrollment (/admin/enrollments/new)
│   ├── 📄 Enrollment Details ⚡ (/admin/enrollments/[id])
│   ├── 📄 Bulk Enrollment (/admin/enrollments/bulk)
│   ├── 📄 Promotions (/admin/enrollments/promotions)
│   └── 📄 Transfers (/admin/enrollments/transfers)
│
├── 📁 Admissions
│   ├── 📄 Applications (/admin/admissions)
│   ├── 📄 Application Details ⚡ (/admin/admissions/[id])
│   ├── 📄 Review Application ⚡ (/admin/admissions/[id]/review)
│   ├── 📄 Admission Settings (/admin/admissions/settings)
│   └── 📄 Reports (/admin/admissions/reports)
│
├── 📁 Attendance
│   ├── 📄 Attendance Dashboard (/admin/attendance)
│   ├── 📄 Daily Attendance (/admin/attendance/daily)
│   ├── 📄 Class Attendance ⚡ (/admin/attendance/class/[id])
│   ├── 📄 Attendance Reports (/admin/attendance/reports)
│   ├── 📄 Leave Management (/admin/attendance/leaves)
│   └── 📄 Attendance Settings (/admin/attendance/settings)
│
├── 📁 Academics
│   ├── 📄 Academic Years (/admin/academics/years)
│   ├── 📄 Subjects (/admin/academics/subjects)
│   ├── 📄 Curriculum (/admin/academics/curriculum)
│   ├── 📄 Exams (/admin/academics/exams)
│   ├── 📄 Create Exam (/admin/academics/exams/create)
│   ├── 📄 Grade Scales (/admin/academics/grades)
│   └── 📄 Report Cards (/admin/academics/report-cards)
│
├── 📁 Islamic Education
│   ├── 📄 Quran Programs (/admin/islamic/programs)
│   ├── 📄 Add Program (/admin/islamic/programs/add)
│   ├── 📄 Program Enrollments (/admin/islamic/enrollments)
│   ├── 📄 Progress Overview (/admin/islamic/progress)
│   ├── 📄 Quran Teachers (/admin/islamic/teachers)
│   ├── 📄 Assessments (/admin/islamic/assessments)
│   └── 📄 Reports (/admin/islamic/reports)
│
├── 📁 Finance
│   ├── 📄 Finance Dashboard (/admin/finance)
│   ├── 📄 Fee Structures (/admin/finance/fee-structures)
│   ├── 📄 Add Fee Structure (/admin/finance/fee-structures/add)
│   ├── 📄 Invoices (/admin/finance/invoices)
│   ├── 📄 Create Invoice (/admin/finance/invoices/create)
│   ├── 📄 Bulk Invoicing (/admin/finance/invoices/bulk)
│   ├── 📄 Payments (/admin/finance/payments)
│   ├── 📄 Record Payment (/admin/finance/payments/record)
│   ├── 📄 Payment Methods (/admin/finance/payment-methods)
│   ├── 📄 Scholarships (/admin/finance/scholarships)
│   ├── 📄 Award Scholarship (/admin/finance/scholarships/award)
│   ├── 📄 Financial Reports (/admin/finance/reports)
│   └── 📄 Outstanding Fees (/admin/finance/outstanding)
│
├── 📁 Communication
│   ├── 📄 Announcements (/admin/communication/announcements)
│   ├── 📄 Create Announcement (/admin/communication/announcements/create)
│   ├── 📄 SMS/Email (/admin/communication/messaging)
│   ├── 📄 Templates (/admin/communication/templates)
│   ├── 📄 Notifications (/admin/communication/notifications)
│   └── 📄 Message History (/admin/communication/history)
│
├── 📁 Content Management
│   ├── 📄 Pages (/admin/content/pages)
│   ├── 📄 Edit Page ⚡ (/admin/content/pages/[id])
│   ├── 📄 News/Blog (/admin/content/news)
│   ├── 📄 Create Post (/admin/content/news/create)
│   ├── 📄 Events (/admin/content/events)
│   ├── 📄 Create Event (/admin/content/events/create)
│   ├── 📄 Media Library (/admin/content/media)
│   └── 📄 Banners/Sliders (/admin/content/banners)
│
├── 📁 Reports & Analytics
│   ├── 📄 Analytics Dashboard (/admin/reports)
│   ├── 📄 Enrollment Reports (/admin/reports/enrollment)
│   ├── 📄 Attendance Reports (/admin/reports/attendance)
│   ├── 📄 Academic Reports (/admin/reports/academic)
│   ├── 📄 Financial Reports (/admin/reports/financial)
│   ├── 📄 Custom Reports (/admin/reports/custom)
│   └── 📄 Export Data (/admin/reports/export)
│
├── 📁 Users & Access
│   ├── 📄 All Users (/admin/users)
│   ├── 📄 Add User (/admin/users/add)
│   ├── 📄 User Details ⚡ (/admin/users/[id])
│   ├── 📄 Roles & Permissions (/admin/users/roles)
│   ├── 📄 Add Role (/admin/users/roles/add)
│   └── 📄 Activity Logs (/admin/users/activity)
│
├── 📁 Settings
│   ├── 📄 General Settings (/admin/settings)
│   ├── 📄 School Profile (/admin/settings/school)
│   ├── 📄 Academic Settings (/admin/settings/academic)
│   ├── 📄 Fee Settings (/admin/settings/fees)
│   ├── 📄 Notification Settings (/admin/settings/notifications)
│   ├── 📄 Integration Settings (/admin/settings/integrations)
│   ├── 📄 Email/SMS Config (/admin/settings/messaging)
│   ├── 📄 Backup & Restore (/admin/settings/backup)
│   └── 📄 System Logs (/admin/settings/logs)
│
└── 📁 Help & Support
    ├── 📄 Documentation (/admin/help)
    ├── 📄 FAQs (/admin/help/faqs)
    └── 📄 Contact Support (/admin/help/support)
```

### 6.2 Page Count

| Section | Pages |
|---------|-------|
| Dashboard | 1 |
| Students | 9 |
| Guardians | 4 |
| Teachers/Staff | 6 |
| Classes | 6 |
| Enrollments | 6 |
| Admissions | 5 |
| Attendance | 6 |
| Academics | 7 |
| Islamic Education | 7 |
| Finance | 13 |
| Communication | 6 |
| Content Management | 8 |
| Reports & Analytics | 7 |
| Users & Access | 6 |
| Settings | 9 |
| Help & Support | 3 |
| **Total Admin Dashboard Pages** | **109** |

---

## 7. Navigation Structure

### 7.1 Public Website Main Navigation

```
┌─────────────────────────────────────────────────────────────────────┐
│ Logo    Home   About ▼   Academics ▼   Admissions   Campus   Contact│
└─────────────────────────────────────────────────────────────────────┘

About Mega Menu:
┌─────────────────────────────────────────────────────────────────────┐
│ About Smart Academy     |  Leadership      |  Foundation           │
│ Vision & Mission        |  Awards          |  Accreditation        │
│ History & Milestones    |                  |                       │
├─────────────────────────────────────────────────────────────────────┤
│ Why Choose Us                                                       │
│ ├── Islamic Identity  ├── STEAM Education  ├── Safety & Security  │
│ ├── Technology        ├── Affordability    ├── Success Stories    │
└─────────────────────────────────────────────────────────────────────┘

Academics Mega Menu:
┌─────────────────────────────────────────────────────────────────────┐
│ Early Childhood     |  Primary (1-5)    |  Secondary (6-9+)        │
│ ├── PlayGroup       |  ├── Lower (1-3)  |  ├── Junior (6-8)       │
│ ├── Nursery         |  ├── Upper (4-5)  |  ├── Senior (9-10)      │
│ └── KG              |  └── Subjects     |  └── SSC Prep           │
├─────────────────────────────────────────────────────────────────────┤
│ Islamic Studies          |  STEAM Education                         │
│ ├── Quran & Hifz         |  ├── Science    ├── Technology          │
│ ├── Tajweed              |  ├── Engineering├── Arts                 │
│ └── Arabic               |  └── Mathematics└── Robotics            │
└─────────────────────────────────────────────────────────────────────┘
```

### 7.2 Portal Sidebar Navigation

```
Student Portal:
├── Dashboard
├── My Profile
├── Academics
│   ├── Classes
│   ├── Schedule
│   └── Assignments
├── Attendance
├── Grades & Results
├── Quran Progress
├── Fees
├── Messages
└── Settings

Parent Portal:
├── Dashboard
├── My Children
├── Attendance
├── Quran Progress
├── Fees & Payments
├── Messages
├── Calendar
├── My Profile
└── Settings

Teacher Portal:
├── Dashboard
├── My Classes
├── Students
├── Attendance
├── Grades
├── Quran (if Quran teacher)
├── Assignments
├── Messages
├── Resources
├── Reports
├── My Profile
└── Settings

Admin Dashboard:
├── Dashboard
├── Students
├── Guardians
├── Staff
├── Classes
├── Enrollments
├── Admissions
├── Attendance
├── Academics
├── Islamic Education
├── Finance
├── Communication
├── Content
├── Reports
├── Users
├── Settings
└── Help
```

### 7.3 Mobile Bottom Navigation

```
Student:  🏠 Home  | 📚 Classes  | 📅 Schedule | 💰 Fees | 👤 Profile
Parent:   🏠 Home  | 👶 Children | 📅 Calendar | 💰 Fees | 👤 Profile
Teacher:  🏠 Home  | 📚 Classes  | ✓ Attend.  | 📝 Grades| 👤 Profile
Admin:    🏠 Home  | 👨‍🎓 Students | 💰 Finance | 📊 Reports| ⚙️ Settings
```

---

## 8. URL Structure

### 8.1 URL Conventions

| Pattern | Example | Description |
|---------|---------|-------------|
| `/` | `/` | Homepage |
| `/[section]` | `/about` | Section landing page |
| `/[section]/[page]` | `/about/history` | Sub-page |
| `/[section]/[category]/[page]` | `/academics/primary/subjects` | Nested page |
| `/[section]/[slug]` | `/news/school-reopening-2026` | Dynamic content |
| `/portal/[role]` | `/portal/student` | Portal root |
| `/portal/[role]/[section]` | `/portal/student/grades` | Portal section |
| `/portal/[role]/[section]/[id]` | `/portal/student/grades/2026-term1` | Dynamic portal |
| `/admin` | `/admin` | Admin root |
| `/admin/[section]` | `/admin/students` | Admin section |
| `/admin/[section]/[action]` | `/admin/students/add` | Admin action |
| `/admin/[section]/[id]` | `/admin/students/123` | Admin detail |
| `/admin/[section]/[id]/[action]` | `/admin/students/123/edit` | Admin edit |

### 8.2 URL Slugs

| Page Type | Slug Pattern | Example |
|-----------|--------------|---------|
| Static pages | `kebab-case` | `/about/vision-mission` |
| News articles | `title-slug` | `/news/annual-day-celebration-2026` |
| Events | `event-title-date` | `/events/parent-meeting-jan-2026` |
| Student profiles | `id` or `student-number` | `/admin/students/STU2026MY0001` |
| Classes | `code` | `/admin/classes/5A-2026` |

### 8.3 Query Parameters

| Parameter | Usage | Example |
|-----------|-------|---------|
| `page` | Pagination | `/admin/students?page=2` |
| `limit` | Items per page | `/admin/students?limit=50` |
| `search` | Search query | `/admin/students?search=ahmed` |
| `sort` | Sort field | `/admin/students?sort=name` |
| `order` | Sort direction | `/admin/students?order=asc` |
| `filter` | Filter values | `/admin/students?filter[class]=5A` |
| `from` | Date range start | `/admin/attendance?from=2026-01-01` |
| `to` | Date range end | `/admin/attendance?to=2026-01-31` |
| `status` | Status filter | `/admin/invoices?status=pending` |

### 8.4 API Route Structure

```
/api/v1/
├── auth/
│   ├── login
│   ├── logout
│   ├── refresh
│   ├── forgot-password
│   └── reset-password
├── users/
│   ├── GET /
│   ├── POST /
│   ├── GET /:id
│   ├── PUT /:id
│   └── DELETE /:id
├── students/
│   ├── GET /
│   ├── POST /
│   ├── GET /:id
│   ├── PUT /:id
│   ├── DELETE /:id
│   ├── GET /:id/attendance
│   ├── GET /:id/grades
│   └── GET /:id/fees
├── attendance/
│   ├── GET /
│   ├── POST /
│   └── PUT /:id
├── grades/
│   ├── GET /
│   ├── POST /
│   └── PUT /:id
├── fees/
│   ├── invoices/
│   └── payments/
├── islamic/
│   ├── programs/
│   ├── enrollments/
│   ├── progress/
│   └── assessments/
└── reports/
    ├── attendance/
    ├── academic/
    └── financial/
```

---

## 9. Page Inventory

### 9.1 Complete Page Count

| Portal/Section | Page Count |
|----------------|------------|
| Public Website | 89 |
| Student Portal | 35 |
| Parent Portal | 41 |
| Teacher Portal | 56 |
| Admin Dashboard | 109 |
| **Total Pages** | **330** |

### 9.2 Page Priority Matrix

| Priority | Description | Count | Phase |
|----------|-------------|-------|-------|
| P0 - Critical | Core functionality | 50 | MVP |
| P1 - High | Essential features | 80 | Phase 1 |
| P2 - Medium | Important features | 100 | Phase 2 |
| P3 - Low | Nice-to-have | 100 | Phase 3 |

### 9.3 MVP Page List (P0)

**Public Website (15 pages):**
- Homepage
- About Smart Academy
- Academic Programs Overview
- Admissions Overview + Apply
- Fee Structure
- Contact

**Student Portal (8 pages):**
- Dashboard
- Profile
- Schedule
- Attendance
- Grades
- Quran Progress
- Fees

**Parent Portal (8 pages):**
- Dashboard
- Children Overview
- Attendance
- Grades
- Quran Progress
- Fees & Payment
- Messages

**Teacher Portal (10 pages):**
- Dashboard
- Classes
- Attendance Marking
- Enter Grades
- Quran Progress (for Quran teachers)
- Messages

**Admin Dashboard (9 pages):**
- Dashboard
- Students List + Add
- Staff List
- Classes
- Attendance Overview
- Finance Overview
- Settings

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | January 10, 2026 | Development Team | Initial sitemap document |

---

*End of Site Map Document*
