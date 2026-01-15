# Smart Academy Digital Portal - Project Charter

**Document Title:** Project Charter
**Document ID:** PM_Project_Charter_v1.0
**Version:** 1.0
**Date:** January 10, 2026
**Project Name:** Smart Academy Digital Web Portal Development
**Prepared By:** Solo Full-Stack Developer
**Development Environment:** Linux OS | VSCode IDE | Vite | HMR | Local Database

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | January 10, 2026 | Development Team | Initial Project Charter |

**Distribution List:**
- Smart Academy Administration
- Smart Foundation Board
- Project Development Team
- Key Stakeholders

---

## Table of Contents

1. [Project Vision and Objectives](#1-project-vision-and-objectives)
2. [Project Scope Statement](#2-project-scope-statement)
3. [Key Stakeholders Identification](#3-key-stakeholders-identification)
4. [High-Level Requirements Summary](#4-high-level-requirements-summary)
5. [Project Constraints and Assumptions](#5-project-constraints-and-assumptions)
6. [Success Criteria and KPIs](#6-success-criteria-and-kpis)
7. [Project Authorization](#7-project-authorization)
8. [Appendices](#appendices)

---

## 1. Project Vision and Objectives

### 1.1 Project Vision

**Vision Statement:**

> *"To transform Smart Academy's digital presence by creating a comprehensive, modern web portal that seamlessly integrates Islamic education tracking, student management, learning resources, and parent engagement capabilities - bridging the urban-rural education divide through technology while preserving Islamic values and delivering world-class educational experiences to underprivileged children in rural Bangladesh."*

### 1.2 Project Purpose

The Smart Academy Digital Portal project aims to replace the existing basic website (mysmart.academy) with a state-of-the-art, comprehensive digital platform that reflects Smart Academy's commitment to excellence in Islamic education integrated with modern technology. This portal will serve as the primary digital hub for the institution, enabling seamless communication, efficient administration, and enhanced learning experiences for all stakeholders.

### 1.3 Strategic Alignment

This project directly aligns with Smart Academy's core mission elements:

| Mission Element | How This Project Supports It |
|----------------|------------------------------|
| **Islamic Identity Preservation** | Custom Islamic Education Module for Quran memorization tracking, Hadith studies, prayer attendance, and Hijri calendar integration |
| **Academic Excellence** | Learning Management System (Moodle) integration with STEAM-based curriculum support |
| **Holistic Development** | Comprehensive student portal with extracurricular activities, clubs, and achievement tracking |
| **Equal Opportunity** | Accessible platform design supporting low-bandwidth connections and multi-language (English, Bengali, Arabic) support |
| **Character Formation** | Integrated character development tracking and Islamic values progress monitoring |

### 1.4 Project Objectives

#### 1.4.1 Primary Objectives

| ID | Objective | Description | Alignment |
|----|-----------|-------------|-----------|
| OBJ-01 | **Digital Transformation** | Modernize Smart Academy's digital presence with a comprehensive web portal replacing the current basic website | Strategic Goal 1 |
| OBJ-02 | **Operational Excellence** | Streamline administrative processes through integrated Student Management System (Gibbon) reducing manual workload by 60% | Strategic Goal 2 |
| OBJ-03 | **Enhanced Communication** | Establish robust communication channels between school, parents, students, and teachers via messaging, notifications, and mobile app | Strategic Goal 3 |
| OBJ-04 | **Academic Tracking** | Implement comprehensive grade management, attendance tracking, and progress reporting for 500+ students | Strategic Goal 4 |
| OBJ-05 | **Islamic Education Management** | Deploy custom Islamic Education Module for Quran memorization (Hifz), Tajweed assessment, Hadith studies, and prayer tracking | Strategic Goal 5 |
| OBJ-06 | **Mobile Accessibility** | Develop native iOS and Android applications for parents and students with offline capabilities | Strategic Goal 6 |
| OBJ-07 | **Online Learning** | Implement Learning Management System (Moodle) for digital courses, assignments, quizzes, and virtual classrooms | Strategic Goal 7 |
| OBJ-08 | **Fee Automation** | Integrate Bangladesh payment gateways (bKash, Nagad, SSLCommerz) for online fee collection | Strategic Goal 8 |

#### 1.4.2 Secondary Objectives

| ID | Objective | Description |
|----|-----------|-------------|
| OBJ-09 | Implement comprehensive analytics dashboard for leadership decision-making |
| OBJ-10 | Create virtual campus tour and interactive facilities showcase |
| OBJ-11 | Establish alumni portal for community engagement and networking |
| OBJ-12 | Develop transportation tracking system with GPS integration |
| OBJ-13 | Build resource library with e-books, video lessons, and interactive content |
| OBJ-14 | Enable online admission application with document upload and status tracking |

### 1.5 Business Justification

#### 1.5.1 Current Challenges Addressed

| Challenge | Current Impact | Expected Improvement |
|-----------|---------------|---------------------|
| Manual student records management | 20+ hours/week administrative overhead | 60% reduction in manual tasks |
| Paper-based attendance | Delayed reporting, data entry errors | Real-time digital attendance with instant parent notifications |
| Limited parent communication | Phone calls, paper notices (inefficient) | 24/7 portal access, push notifications, instant messaging |
| No online fee payment | Physical collection, accounting delays | 70% online payment adoption, instant reconciliation |
| No Islamic education tracking | Manual Quran progress logs | Comprehensive digital Hifz tracking with certificates |
| Outdated website | Poor mobile experience, limited information | Modern, responsive, feature-rich portal |
| No online learning | Limited to classroom instruction | Full LMS with virtual classrooms, assignments, quizzes |

#### 1.5.2 Expected Benefits

**Quantitative Benefits:**
- 60% reduction in administrative workload
- 70% adoption of online fee payments
- 90% parent portal engagement rate
- 80% teacher LMS utilization
- 100% digital student records
- 96%+ student retention (current rate maintained/improved)
- 35% annual growth support capability

**Qualitative Benefits:**
- Enhanced institutional reputation and competitive positioning
- Improved parent satisfaction and trust
- Better academic oversight and intervention capability
- Stronger Islamic education tracking and recognition
- Data-driven decision making for leadership
- Model for rural Islamic education technology

---

## 2. Project Scope Statement

### 2.1 In-Scope Items

#### 2.1.1 Technology Platforms

| Platform | Technology | Purpose |
|----------|------------|---------|
| **Student Management System (SMS)** | Gibbon v30+ (Open Source) | Student records, attendance, grades, timetables, fee management |
| **Learning Management System (LMS)** | Moodle 4.5+ (Open Source) | Online courses, assignments, quizzes, virtual classrooms, resources |
| **Public Website** | Next.js 15 + React 19 | School information, admissions, news, events, content |
| **Admin Dashboard** | React 19 + Vite 6 | Analytics, reporting, CMS, system management |
| **Mobile Applications** | React Native + Expo 52+ | Parent/student iOS and Android apps |
| **Custom API Services** | Node.js 22 LTS + Fastify 5 | Islamic module, payment integration, notifications |
| **Database Layer** | MySQL 8.0 (Gibbon/Moodle), PostgreSQL 16 (Custom) | Data storage and management |
| **Cache Layer** | Redis 7+ | Session management, API caching, queuing |

#### 2.1.2 Functional Modules

**A. Public Website Module**
- [x] Homepage with dynamic content, hero section, events, testimonials
- [x] About section (vision, mission, history, leadership, facilities)
- [x] Academic programs (Early Childhood, Primary, Secondary, STEAM)
- [x] Islamic education program overview
- [x] Admission module with online application
- [x] Student life and activities showcase
- [x] News and events with calendar
- [x] Photo/video gallery
- [x] Virtual campus tour
- [x] Contact with interactive map
- [x] Multi-language support (English, Bengali)

**B. Student Management System (Gibbon)**
- [x] Student profile management (personal, academic, medical records)
- [x] Attendance tracking (daily, subject-wise, period-wise)
- [x] Grade and markbook management
- [x] Timetable creation and management
- [x] Examination scheduling and result processing
- [x] Report card generation
- [x] Fee structure and invoice management
- [x] Teacher and staff management
- [x] Parent/guardian information
- [x] Messenger and notifications

**C. Learning Management System (Moodle)**
- [x] Course creation and management (by grade level)
- [x] Assignment submission and grading
- [x] Quiz and test creation with auto-grading
- [x] Video conferencing integration (BigBlueButton)
- [x] Discussion forums
- [x] Digital library and resources
- [x] Progress tracking and completion certificates
- [x] H5P interactive content support
- [x] SCORM content compatibility

**D. Islamic Education Module (Custom)**
- [x] Quran memorization (Hifz) progress tracking
- [x] Surah-by-Surah and Juz-by-Juz completion
- [x] Tajweed proficiency assessment
- [x] Hadith study tracking
- [x] Prayer times calculation and display
- [x] Prayer attendance tracking
- [x] Hijri calendar integration
- [x] Islamic events and holidays
- [x] Daily Quran verse and Hadith display
- [x] Islamic education certificates
- [x] Ramadan features (Iftar/Suhoor times)

**E. Parent Portal**
- [x] Child's academic progress viewing
- [x] Attendance monitoring with notifications
- [x] Grade and report card access
- [x] Fee payment and history
- [x] Teacher communication
- [x] Leave application submission
- [x] Event calendar and RSVP
- [x] School announcements
- [x] Islamic education progress tracking
- [x] Push notifications

**F. Mobile Applications (iOS/Android)**
- [x] Parent app with full portal functionality
- [x] Student app for academic resources
- [x] Biometric login (fingerprint, Face ID)
- [x] Offline data access
- [x] Push notifications
- [x] Fee payment integration
- [x] Calendar sync
- [x] Dark mode support

**G. Admin Dashboard**
- [x] KPI dashboard (enrollment, attendance, finances)
- [x] Real-time analytics and reporting
- [x] Custom report generation
- [x] User and role management
- [x] System configuration
- [x] Content management system
- [x] Audit logs and activity tracking
- [x] Backup management interface

**H. Payment Integration**
- [x] bKash payment gateway
- [x] Nagad payment gateway
- [x] SSLCommerz (cards, bank transfer)
- [x] Payment reconciliation
- [x] Receipt generation
- [x] Payment reminders
- [x] Fee concession management

**I. Communication Hub**
- [x] SMS gateway integration (BulkSMSBD)
- [x] Email notifications (SendGrid)
- [x] Push notifications (mobile)
- [x] Bulk messaging capability
- [x] Message templates
- [x] Emergency alerts

#### 2.1.3 Technical Infrastructure

- [x] Development environment setup documentation
- [x] Local development server configuration (Vite + HMR)
- [x] Docker containerization for all services
- [x] Database setup and migration scripts
- [x] CI/CD pipeline (GitHub Actions)
- [x] API documentation (OpenAPI/Swagger)
- [x] Security implementation (JWT, HTTPS, CSP)
- [x] Performance optimization and caching
- [x] Backup and recovery procedures

### 2.2 Out-of-Scope Items

The following items are explicitly **NOT** included in this project:

| Item | Reason | Future Consideration |
|------|--------|---------------------|
| **Biometric hardware integration** | Requires physical hardware procurement and installation | Phase 2 (2027) |
| **ERP modules** (Inventory, HR Payroll details) | Beyond core educational needs | Post-launch enhancement |
| **Advanced AI features** (Chatbot, predictive analytics) | Complex implementation, not critical for MVP | Phase 2 (2027) |
| **Multi-campus support** | Single campus operation currently | When expansion occurs |
| **Custom mobile app for teachers** | Teachers can use web portal on mobile | Post-launch evaluation |
| **Video hosting infrastructure** | Will use YouTube/Vimeo embedding | Cost consideration |
| **Advanced gamification** | Basic Level Up! plugin only | Enhancement phase |
| **Detailed payroll system** | Basic staff records only | Separate HR system |
| **Library physical book management** | Digital resources focus only | Separate library system |
| **Cafeteria/meal ordering system** | Not core requirement | Future enhancement |

### 2.3 Deliverables

#### 2.3.1 Primary Deliverables

| ID | Deliverable | Description | Format |
|----|-------------|-------------|--------|
| D-01 | Public Website | Fully functional Next.js website with all content | Deployed web application |
| D-02 | Gibbon SMS | Configured and customized Gibbon installation | Deployed PHP application |
| D-03 | Moodle LMS | Configured Moodle with course structure | Deployed PHP application |
| D-04 | Islamic Education Module | Custom Node.js service with APIs | Deployed microservice |
| D-05 | Admin Dashboard | React admin panel with analytics | Deployed web application |
| D-06 | iOS Mobile App | React Native app for parents/students | App Store submission |
| D-07 | Android Mobile App | React Native app for parents/students | Play Store submission |
| D-08 | API Gateway | Unified API layer with authentication | Deployed service |
| D-09 | Payment Integration | bKash, Nagad, SSLCommerz integration | Functional integration |
| D-10 | Database Infrastructure | MySQL + PostgreSQL + Redis setup | Configured databases |

#### 2.3.2 Documentation Deliverables

| ID | Deliverable | Description |
|----|-------------|-------------|
| D-11 | Technical Documentation | System architecture, API docs, database schema |
| D-12 | User Manuals | Parent portal guide, teacher guide, admin guide |
| D-13 | Training Materials | Video tutorials, quick reference guides |
| D-14 | Deployment Runbook | Step-by-step deployment procedures |
| D-15 | Operations Manual | Monitoring, backup, maintenance procedures |

#### 2.3.3 Training Deliverables

| ID | Deliverable | Target Audience |
|----|-------------|-----------------|
| D-16 | Admin Training | Administrative staff (10 users) |
| D-17 | Teacher Training | Teaching faculty (40+ users) |
| D-18 | Parent Orientation | Parent community (400+ users) |

### 2.4 Project Boundaries

#### 2.4.1 Geographic Scope
- Primary: Smart Academy, Narimpur, Ramganj, Laxmipur, Bangladesh
- User Access: Global (for alumni and donors)

#### 2.4.2 Organizational Scope
- Smart Academy (primary beneficiary)
- Smart Foundation (parent organization oversight)
- Development Team (implementation)

#### 2.4.3 Technical Scope
- Web-based access (all modern browsers)
- Mobile app (iOS 15+, Android 10+)
- Internet connectivity required (offline mode for mobile app limited features)

---

## 3. Key Stakeholders Identification

### 3.1 Stakeholder Register

#### 3.1.1 Primary Stakeholders

| Stakeholder | Role | Interest Level | Influence Level | Engagement Strategy |
|-------------|------|----------------|-----------------|---------------------|
| **Smart Foundation Board** | Project Sponsor | High | High | Regular executive briefings, milestone approvals |
| **School Principal** | Project Champion | High | High | Weekly progress meetings, key decisions |
| **Administrative Staff** | Primary Users (Admin) | High | Medium | Requirements input, UAT, training |
| **Teaching Faculty** | Primary Users (Teachers) | High | Medium | Requirements input, UAT, training |
| **Parents/Guardians** | Primary Users (Parents) | High | Medium | Surveys, beta testing, feedback sessions |
| **Students** | Primary Users (Students) | High | Low | Usability testing, feedback collection |
| **Solo Developer** | Project Implementer | High | High | Daily development, technical decisions |

#### 3.1.2 Secondary Stakeholders

| Stakeholder | Role | Interest Level | Influence Level | Engagement Strategy |
|-------------|------|----------------|-----------------|---------------------|
| **IT Support Staff** | Technical Support | Medium | Medium | Technical documentation, knowledge transfer |
| **Finance Department** | Payment Integration | Medium | Medium | Requirements for fee management |
| **Transport Coordinator** | Transportation Module | Medium | Low | Requirements input |
| **Islamic Studies Department** | Islamic Module | High | Medium | Detailed requirements, content validation |
| **Alumni Community** | Future Users | Low | Low | Feature requests, testing |
| **Prospective Parents** | Public Website Users | Medium | Low | User experience feedback |
| **Community Members** | Public Website Users | Low | Low | Awareness of features |

#### 3.1.3 External Stakeholders

| Stakeholder | Role | Interest Level | Influence Level | Engagement Strategy |
|-------------|------|----------------|-----------------|---------------------|
| **Payment Gateway Providers** | Technical Integration | Medium | Medium | API integration, testing |
| **SMS Gateway Provider** | Communication Service | Medium | Low | Service configuration |
| **Email Service Provider** | Communication Service | Medium | Low | Service configuration |
| **Hosting Provider** | Infrastructure | Medium | Medium | Server provisioning, support |
| **Ministry of Education** | Regulatory | Low | High | Compliance awareness |

### 3.2 RACI Matrix

| Activity | Smart Foundation | Principal | Admin Staff | Teachers | Developer | Parents |
|----------|-----------------|-----------|-------------|----------|-----------|---------|
| Project Approval | **A** | C | I | I | I | I |
| Requirements Definition | A | **R** | C | C | R | C |
| Design Decisions | I | C | C | C | **R/A** | I |
| Development | I | I | I | I | **R/A** | I |
| Testing | I | C | **R** | R | A | R |
| Training | I | A | **R** | R | C | R |
| Deployment Approval | **A** | R | C | I | R | I |
| Ongoing Maintenance | I | A | C | I | **R** | I |

*Legend: R = Responsible, A = Accountable, C = Consulted, I = Informed*

### 3.3 Stakeholder Communication Matrix

| Stakeholder Group | Communication Method | Frequency | Content |
|-------------------|---------------------|-----------|---------|
| Smart Foundation Board | Executive Report | Monthly | Progress summary, risks, budget status |
| School Principal | Progress Meeting | Weekly | Detailed progress, decisions needed |
| Administrative Staff | Status Update | Weekly | Feature updates, training schedule |
| Teaching Faculty | Newsletter | Bi-weekly | Feature previews, training opportunities |
| Parents | Announcement | Monthly | Launch timeline, feature highlights |
| Development Log | Documentation | Daily | Technical progress, issues, solutions |

---

## 4. High-Level Requirements Summary

### 4.1 Functional Requirements Overview

#### 4.1.1 User Management Requirements

| ID | Requirement | Priority | Stakeholder |
|----|-------------|----------|-------------|
| FR-001 | System shall support role-based access control (Student, Parent, Teacher, Admin, Leadership) | Critical | All |
| FR-002 | Users shall be able to login with unique credentials (username/password) | Critical | All |
| FR-003 | System shall support password reset via email/SMS | High | All |
| FR-004 | Mobile app shall support biometric authentication | High | Parents, Students |
| FR-005 | System shall implement Single Sign-On (SSO) across Gibbon, Moodle, and custom modules | High | Teachers, Admin |
| FR-006 | Parents shall be able to manage multiple children from single account | Critical | Parents |

#### 4.1.2 Student Management Requirements

| ID | Requirement | Priority | Stakeholder |
|----|-------------|----------|-------------|
| FR-010 | System shall maintain complete student profiles (personal, academic, medical) | Critical | Admin |
| FR-011 | System shall support student enrollment and class assignment | Critical | Admin |
| FR-012 | System shall track student attendance (daily, subject-wise) | Critical | Teachers, Admin |
| FR-013 | System shall send automatic absence notifications to parents | High | Parents |
| FR-014 | System shall manage grade book and assessments | Critical | Teachers |
| FR-015 | System shall generate report cards and progress reports | Critical | Teachers, Parents |
| FR-016 | System shall support timetable management | High | Admin, Teachers |
| FR-017 | System shall track student behavior and discipline | Medium | Teachers, Admin |

#### 4.1.3 Islamic Education Requirements

| ID | Requirement | Priority | Stakeholder |
|----|-------------|----------|-------------|
| FR-020 | System shall track Quran memorization progress (Surah by Surah) | Critical | Islamic Dept |
| FR-021 | System shall monitor Hafiz program progress (Juz completion) | Critical | Islamic Dept |
| FR-022 | System shall assess and record Tajweed proficiency | High | Islamic Dept |
| FR-023 | System shall track Hadith study completion | High | Islamic Dept |
| FR-024 | System shall display prayer times based on location | High | All |
| FR-025 | System shall track student prayer attendance | Medium | Islamic Dept |
| FR-026 | System shall display Hijri calendar and Islamic events | High | All |
| FR-027 | System shall generate Islamic education certificates | Medium | Islamic Dept |
| FR-028 | System shall display daily Quran verse and Hadith | Low | All |

#### 4.1.4 Learning Management Requirements

| ID | Requirement | Priority | Stakeholder |
|----|-------------|----------|-------------|
| FR-030 | System shall support course creation with multimedia content | Critical | Teachers |
| FR-031 | System shall enable online assignment submission | Critical | Students, Teachers |
| FR-032 | System shall support quiz creation with auto-grading | High | Teachers |
| FR-033 | System shall integrate video conferencing for virtual classes | High | Teachers |
| FR-034 | System shall provide discussion forums per course | Medium | Teachers, Students |
| FR-035 | System shall maintain digital resource library | High | All |
| FR-036 | System shall track course progress and completion | High | Teachers, Students |
| FR-037 | System shall synchronize grades with Gibbon markbook | High | Teachers |

#### 4.1.5 Parent Portal Requirements

| ID | Requirement | Priority | Stakeholder |
|----|-------------|----------|-------------|
| FR-040 | Parents shall view child's attendance records | Critical | Parents |
| FR-041 | Parents shall view grades and report cards | Critical | Parents |
| FR-042 | Parents shall pay fees online (bKash, Nagad, SSLCommerz) | Critical | Parents |
| FR-043 | Parents shall view fee structure and payment history | High | Parents |
| FR-044 | Parents shall communicate with teachers | High | Parents |
| FR-045 | Parents shall submit leave applications | High | Parents |
| FR-046 | Parents shall receive push notifications | High | Parents |
| FR-047 | Parents shall view school calendar and events | Medium | Parents |
| FR-048 | Parents shall track Islamic education progress | High | Parents |

#### 4.1.6 Administrative Requirements

| ID | Requirement | Priority | Stakeholder |
|----|-------------|----------|-------------|
| FR-050 | Admin shall manage all student records | Critical | Admin |
| FR-051 | Admin shall process online admission applications | High | Admin |
| FR-052 | Admin shall configure fee structures | Critical | Admin |
| FR-053 | Admin shall generate financial reports | High | Admin |
| FR-054 | Admin shall send bulk SMS/email notifications | High | Admin |
| FR-055 | Admin shall manage user accounts and roles | Critical | Admin |
| FR-056 | Admin shall access comprehensive analytics dashboard | High | Leadership |
| FR-057 | Admin shall configure system settings | High | Admin |

### 4.2 Non-Functional Requirements Overview

#### 4.2.1 Performance Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-001 | Page load time (3G network) | < 5 seconds |
| NFR-002 | Page load time (4G/WiFi) | < 2 seconds |
| NFR-003 | API response time (p95) | < 200ms |
| NFR-004 | Concurrent users supported | 2,000 minimum |
| NFR-005 | System uptime | 99.5% |
| NFR-006 | Mobile app launch time | < 3 seconds |

#### 4.2.2 Security Requirements

| ID | Requirement | Implementation |
|----|-------------|----------------|
| NFR-010 | All data transmission shall be encrypted | TLS 1.3 |
| NFR-011 | Passwords shall be securely hashed | bcrypt/Argon2 |
| NFR-012 | Session tokens shall expire appropriately | JWT with 24hr expiry |
| NFR-013 | System shall prevent OWASP Top 10 vulnerabilities | Security headers, input validation |
| NFR-014 | Child data shall be protected with parental consent | COPPA compliance |
| NFR-015 | Financial transactions shall be logged | Audit trail |
| NFR-016 | System shall implement role-based access control | RBAC matrix |

#### 4.2.3 Usability Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-020 | Interface shall be mobile-responsive | All screen sizes |
| NFR-021 | System shall support Bengali language | Full translation |
| NFR-022 | System shall support Arabic (for Islamic content) | RTL support |
| NFR-023 | System shall meet WCAG 2.1 AA accessibility | Accessibility audit pass |
| NFR-024 | New user onboarding time | < 30 minutes |
| NFR-025 | Mobile app shall support offline mode | Core features |

#### 4.2.4 Scalability Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-030 | System shall support growth from 500 to 2,000+ students | Horizontal scaling |
| NFR-031 | Database shall handle 5 years of historical data | Data archiving strategy |
| NFR-032 | System shall support additional grade levels | Modular course structure |
| NFR-033 | Infrastructure shall support 3x peak load | Auto-scaling capability |

#### 4.2.5 Compatibility Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-040 | Browser support: Chrome, Firefox, Safari, Edge | Last 2 major versions |
| NFR-041 | Mobile browser support | Chrome Mobile, Safari Mobile |
| NFR-042 | iOS app compatibility | iOS 15+ |
| NFR-043 | Android app compatibility | Android 10+ |

### 4.3 Data Requirements

#### 4.3.1 Data Migration

| Data Type | Source | Volume | Strategy |
|-----------|--------|--------|----------|
| Student Records | Excel spreadsheets | 500+ records | Clean, validate, import to Gibbon |
| Teacher Information | HR documents | 40+ records | Manual entry with verification |
| Fee Records | Accounting system | Historical data | Import after validation |
| Academic Calendar | Existing documents | Annual calendar | Manual configuration |

#### 4.3.2 Data Retention

| Data Type | Retention Period | Archive Strategy |
|-----------|------------------|------------------|
| Student Academic Records | Permanent | Cold storage after graduation |
| Financial Transactions | 7 years | Archived yearly |
| Attendance Records | 5 years | Archived yearly |
| Communication Logs | 2 years | Automatic purge |
| System Logs | 1 year | Rotating logs |

---

## 5. Project Constraints and Assumptions

### 5.1 Project Constraints

#### 5.1.1 Technical Constraints

| ID | Constraint | Impact | Mitigation |
|----|------------|--------|------------|
| TC-001 | Must run on VPS with 4 cores, 16GB RAM initially | Limits initial deployment capacity | Optimize code, implement caching, plan for scaling |
| TC-002 | Must support 3G mobile networks (rural Bangladesh) | Requires lightweight page loads | Optimize images, implement lazy loading, PWA |
| TC-003 | Must support Bengali Unicode throughout | Affects font loading, database encoding | UTF-8 encoding, Bengali font integration |
| TC-004 | Must integrate with Bangladesh payment gateways | Limited to bKash, Nagad, SSLCommerz APIs | Design flexible payment architecture |
| TC-005 | Must work with Gibbon v30+ and Moodle 4.5+ | Constrained by platform capabilities | Custom development for gaps |
| TC-006 | Solo developer implementation | Single point of knowledge, capacity limits | Comprehensive documentation, modular architecture |

#### 5.1.2 Business Constraints

| ID | Constraint | Impact | Mitigation |
|----|------------|--------|------------|
| BC-001 | Budget: $65,000 - $95,000 total | Limits scope and timeline | Prioritize MVP features, use open source |
| BC-002 | Must launch before December 2026 academic year | 11-month timeline | Phased approach, MVP first |
| BC-003 | Solo developer capacity | Limited parallel development | Sequential sprints, clear priorities |
| BC-004 | School cannot halt operations during implementation | Parallel development required | Careful migration strategy |
| BC-005 | Limited IT support staff for ongoing maintenance | Must be maintainable by non-developers | Comprehensive documentation, admin tools |

#### 5.1.3 Regulatory Constraints

| ID | Constraint | Impact | Mitigation |
|----|------------|--------|------------|
| RC-001 | Bangladesh data protection laws | Data storage and processing rules | Legal review, privacy policy |
| RC-002 | Child data protection (under 18) | Parental consent requirements | Consent workflows, data protection |
| RC-003 | Financial transaction logging | Audit trail requirements | Transaction logging, reporting |
| RC-004 | Educational institution regulations | Ministry of Education compliance | Review applicable regulations |

#### 5.1.4 Resource Constraints

| ID | Constraint | Impact | Mitigation |
|----|------------|--------|------------|
| RSC-001 | Single developer team | Limited development velocity | Efficient tooling, code reuse |
| RSC-002 | Limited client-side IT expertise | Training and support burden | User-friendly design, comprehensive training |
| RSC-003 | Rural internet connectivity | Testing and deployment challenges | Local testing, staged rollout |

### 5.2 Project Assumptions

#### 5.2.1 Technical Assumptions

| ID | Assumption | Risk if False | Validation Method |
|----|------------|---------------|-------------------|
| TA-001 | Smart Academy has stable internet connectivity for development testing | Development delays | Site assessment |
| TA-002 | Gibbon v30+ will be stable and compatible with requirements | Custom development needed | Version testing |
| TA-003 | Moodle 4.5+ will meet LMS requirements | Alternative LMS needed | Feature evaluation |
| TA-004 | Bangladesh payment gateway APIs will be accessible | Payment integration delays | API access verification |
| TA-005 | SMS gateway will support Bengali Unicode | Alternative provider needed | Provider confirmation |
| TA-006 | Apple and Google will approve mobile apps | Platform-specific issues | Pre-submission review |

#### 5.2.2 Business Assumptions

| ID | Assumption | Risk if False | Validation Method |
|----|------------|---------------|-------------------|
| BA-001 | School administration commits to change management | Adoption failure | Leadership commitment |
| BA-002 | Teachers will adopt new technology with training | Underutilization | Training program |
| BA-003 | Parents have basic smartphone access | Mobile app unused | Survey parents |
| BA-004 | Existing student data is available for migration | Data recreation needed | Data audit |
| BA-005 | Current website content can be migrated | Content recreation needed | Content audit |
| BA-006 | Islamic studies curriculum is documented | Module design delays | Document collection |

#### 5.2.3 Organizational Assumptions

| ID | Assumption | Risk if False | Validation Method |
|----|------------|---------------|-------------------|
| OA-001 | Smart Foundation will continue funding | Project termination | Funding commitment |
| OA-002 | Key stakeholders remain available throughout | Decision delays | Stakeholder commitment |
| OA-003 | No major organizational changes during project | Scope changes | Communication |
| OA-004 | School will provide subject matter experts for requirements | Incomplete requirements | Resource allocation |

### 5.3 Dependencies

#### 5.3.1 External Dependencies

| ID | Dependency | Required By | Risk Level |
|----|------------|-------------|------------|
| ED-001 | Gibbon v30+ stable release | Development start | Medium |
| ED-002 | Moodle 4.5+ stable release | LMS configuration | Low |
| ED-003 | bKash API access and credentials | Payment integration | Medium |
| ED-004 | Nagad API access and credentials | Payment integration | Medium |
| ED-005 | SSLCommerz merchant account | Payment integration | Low |
| ED-006 | BulkSMSBD API access | Notification launch | Low |
| ED-007 | SendGrid account approval | Email notification | Low |
| ED-008 | Apple Developer account | iOS app submission | Low |
| ED-009 | Google Play Developer account | Android app submission | Low |
| ED-010 | VPS hosting provisioning | Deployment | Low |

#### 5.3.2 Internal Dependencies

| ID | Dependency | Required By | Owner |
|----|------------|-------------|-------|
| ID-001 | Student data extraction from current systems | Data migration | Admin Staff |
| ID-002 | Islamic education curriculum documentation | Islamic module design | Islamic Dept |
| ID-003 | Fee structure finalization | Fee module configuration | Finance |
| ID-004 | Timetable and academic calendar | System configuration | Admin Staff |
| ID-005 | Content for all website pages | Website launch | Admin Staff |
| ID-006 | User account information | User provisioning | Admin Staff |

---

## 6. Success Criteria and KPIs

### 6.1 Project Success Criteria

#### 6.1.1 Primary Success Criteria

| ID | Criterion | Target | Measurement Method |
|----|-----------|--------|-------------------|
| PSC-001 | All Phase 1 (MVP) features deployed and functional | 100% | Feature checklist |
| PSC-002 | System uptime after launch | ≥ 99.5% | Monitoring tools |
| PSC-003 | All critical bugs resolved before launch | 0 critical bugs | Bug tracking |
| PSC-004 | Project delivered within budget | ≤ $95,000 | Financial tracking |
| PSC-005 | Project delivered within timeline | By November 2026 | Project schedule |
| PSC-006 | Stakeholder acceptance achieved | Sign-off obtained | Approval document |

#### 6.1.2 Secondary Success Criteria

| ID | Criterion | Target | Measurement Method |
|----|-----------|--------|-------------------|
| SSC-001 | User training completed | 100% of staff trained | Training records |
| SSC-002 | Documentation complete | All documents delivered | Document checklist |
| SSC-003 | Data migration successful | 100% student records migrated | Data validation |
| SSC-004 | Mobile apps published | iOS and Android live | Store listings |
| SSC-005 | Payment integration operational | All gateways functional | Transaction testing |

### 6.2 Key Performance Indicators (KPIs)

#### 6.2.1 Adoption KPIs

| KPI | Target (Month 1) | Target (Month 3) | Target (Month 6) | Measurement |
|-----|------------------|------------------|------------------|-------------|
| Parent portal registration rate | 50% | 80% | 90% | Active accounts / Total parents |
| Teacher LMS usage rate | 40% | 70% | 80% | Active teachers / Total teachers |
| Mobile app downloads | 200 | 400 | 500+ | App store analytics |
| Student portal logins | 30% | 60% | 80% | Login statistics |
| Admin dashboard usage | 100% | 100% | 100% | Daily active admins |

#### 6.2.2 Engagement KPIs

| KPI | Target | Measurement |
|-----|--------|-------------|
| Daily active users (parents) | 40% of registered | Analytics |
| Weekly active users (students) | 60% during term | Analytics |
| Average session duration | > 3 minutes | Analytics |
| Pages per session | > 4 pages | Analytics |
| Mobile vs. web usage ratio | 60% mobile | Analytics |
| Push notification open rate | > 40% | Notification analytics |

#### 6.2.3 Operational KPIs

| KPI | Target | Measurement |
|-----|--------|-------------|
| Online fee payment adoption | 70% of payments | Payment reports |
| Digital attendance marking | 100% of classes | Attendance reports |
| Assignment online submission | 80% of assignments | LMS reports |
| Parent-teacher messages sent | > 100/month | Communication logs |
| Leave applications online | 90% of requests | Application logs |

#### 6.2.4 Performance KPIs

| KPI | Target | Measurement |
|-----|--------|-------------|
| Page load time (p95) | < 3 seconds | Performance monitoring |
| API response time (p95) | < 200ms | API monitoring |
| Error rate | < 0.1% | Error tracking |
| System uptime | ≥ 99.5% | Uptime monitoring |
| Mobile app crash rate | < 1% | Crash analytics |

#### 6.2.5 Islamic Education KPIs

| KPI | Target | Measurement |
|-----|--------|-------------|
| Quran progress entries | 100% of Hifz students tracked | Islamic module reports |
| Tajweed assessments recorded | 2+ per student per term | Assessment records |
| Prayer attendance tracking | Daily for all students | Prayer module |
| Hadith study completion | Per curriculum requirements | Progress reports |

### 6.3 Success Metrics Timeline

| Timeframe | Metrics Focus | Review Method |
|-----------|---------------|---------------|
| Week 1-4 (Post-Launch) | Technical stability, bug fixes, user onboarding | Daily monitoring |
| Month 1-3 | Adoption rates, training effectiveness, user feedback | Weekly dashboards |
| Month 3-6 | Engagement depth, operational efficiency gains | Monthly reports |
| Month 6-12 | Long-term adoption, ROI measurement, satisfaction | Quarterly reviews |

### 6.4 Acceptance Criteria

#### 6.4.1 Functional Acceptance

| Module | Acceptance Criteria |
|--------|---------------------|
| **Public Website** | All pages accessible, content accurate, forms functional, mobile responsive |
| **Gibbon SMS** | Student CRUD, attendance, grades, timetable, reports functional |
| **Moodle LMS** | Course creation, assignments, quizzes, virtual classroom operational |
| **Islamic Module** | Quran tracking, prayer times, Hijri calendar, Hadith display working |
| **Parent Portal** | View child data, pay fees, communicate with teachers, receive notifications |
| **Mobile Apps** | iOS and Android apps published, core features functional, biometric login |
| **Admin Dashboard** | Analytics visible, reports generated, user management functional |
| **Payment Integration** | All gateways processing test transactions successfully |

#### 6.4.2 Non-Functional Acceptance

| Aspect | Acceptance Criteria |
|--------|---------------------|
| **Performance** | Page load < 5s on 3G, API response < 200ms |
| **Security** | Penetration test passed, no critical vulnerabilities |
| **Accessibility** | WCAG 2.1 AA compliance verified |
| **Localization** | Bengali language fully translated, RTL support for Arabic |
| **Compatibility** | Works on all supported browsers and devices |
| **Documentation** | All user and technical documentation complete |

---

## 7. Project Authorization

### 7.1 Project Authority

This Project Charter, upon approval, authorizes the **Smart Academy Digital Portal Development Project** to proceed with implementation as described herein.

**Project Authority Granted To:**
- **Solo Full-Stack Developer** - Technical implementation, development decisions, architecture choices
- **School Principal** - Operational decisions, resource allocation, stakeholder coordination
- **Smart Foundation Board** - Strategic decisions, budget approval, major scope changes

### 7.2 Authorization Scope

The Project Authority includes:

1. **Resource Utilization**
   - Access to development infrastructure and tools
   - Engagement with stakeholders for requirements and feedback
   - Use of allocated budget within approved limits
   - Procurement of necessary services and subscriptions

2. **Technical Decisions**
   - Architecture and design choices within approved technology stack
   - Implementation approach and methodology
   - Tool and library selection
   - Development environment configuration

3. **Schedule Decisions**
   - Sprint planning and prioritization
   - Feature sequencing within scope
   - Release timing within overall timeline

4. **Quality Decisions**
   - Definition of done criteria
   - Testing approach and coverage
   - Bug prioritization and resolution

### 7.3 Escalation Path

| Issue Type | First Escalation | Second Escalation | Final Authority |
|------------|------------------|-------------------|-----------------|
| Technical Issues | Developer discretion | Principal | Smart Foundation |
| Budget Issues | Principal | Smart Foundation | Board |
| Scope Changes | Principal | Smart Foundation | Board |
| Timeline Issues | Developer + Principal | Smart Foundation | Board |
| Stakeholder Conflicts | Principal | Smart Foundation | Board |
| Quality Issues | Developer | Principal | Smart Foundation |

### 7.4 Change Control

Any changes to the following require formal approval:

| Change Type | Approval Required From |
|-------------|----------------------|
| Scope additions (new features) | Principal + Smart Foundation |
| Scope reductions | Principal |
| Budget increases (> 10%) | Smart Foundation Board |
| Timeline extensions (> 2 weeks) | Principal + Smart Foundation |
| Technology stack changes | Developer + Principal |
| Security-related changes | Developer + Principal |

### 7.5 Approval Signatures

By signing below, the undersigned acknowledge they have read and agree to the contents of this Project Charter and authorize the project to proceed.

---

**Smart Foundation Board Representative**

| | |
|---|---|
| Name | _________________________________ |
| Title | _________________________________ |
| Signature | _________________________________ |
| Date | _________________________________ |

---

**Smart Academy Principal**

| | |
|---|---|
| Name | _________________________________ |
| Title | _________________________________ |
| Signature | _________________________________ |
| Date | _________________________________ |

---

**Project Developer**

| | |
|---|---|
| Name | Solo Full-Stack Developer |
| Title | Lead Developer |
| Signature | _________________________________ |
| Date | _________________________________ |

---

**Project Start Authorization**

| | |
|---|---|
| Authorized Start Date | _________________________________ |
| Approved Budget | $ _________________________________ |
| Expected Completion | November 2026 |

---

## Appendices

### Appendix A: Reference Documents

| Document | Version | Location |
|----------|---------|----------|
| User Requirements Document (URD) | 1.0 | `docs/Implementation/Smart_Academy_URD_Complete.md` |
| Software Requirements Specification (SRS) | 1.0 | `docs/Implementation/Smart_Academy_SRS_Gibbon_Moodle_Custom.md` |
| Technology Stack Document | 1.0 | `docs/Implementation/Smart_Academy_Technology_Stack_Document.md` |
| Content Documents List | 1.0 | `docs/Implementation/smart_academy_content_documents_list.md` |
| Project Documents Master List | 1.0 | `docs/Implementation/Smart_Academy_Project_Documents_Master_List.md` |
| Gibbon Documentation | 1.0 | `docs/platform/Gibbon_Comprehensive_Documentation_Smart_Academy.md` |

### Appendix B: Glossary

| Term | Definition |
|------|------------|
| **Gibbon** | Open-source school management platform (gibbonedu.org) |
| **Moodle** | Open-source learning management system (moodle.org) |
| **SMS** | Student Management System (not Short Message Service) |
| **LMS** | Learning Management System |
| **Hifz** | Memorization of the Holy Quran |
| **Tajweed** | Rules for proper Quran recitation |
| **SSO** | Single Sign-On authentication |
| **STEAM** | Science, Technology, Engineering, Arts, Mathematics |
| **MVP** | Minimum Viable Product |
| **HMR** | Hot Module Replacement (development feature) |
| **KPI** | Key Performance Indicator |
| **UAT** | User Acceptance Testing |

### Appendix C: Acronyms

| Acronym | Full Form |
|---------|-----------|
| API | Application Programming Interface |
| RBAC | Role-Based Access Control |
| JWT | JSON Web Token |
| CRUD | Create, Read, Update, Delete |
| UI/UX | User Interface / User Experience |
| PWA | Progressive Web Application |
| CDN | Content Delivery Network |
| SSL/TLS | Secure Sockets Layer / Transport Layer Security |
| WCAG | Web Content Accessibility Guidelines |
| RTL | Right-to-Left (text direction) |

### Appendix D: Research References

**Project Charter Best Practices:**
- [Wrike - Project Charter Guide](https://www.wrike.com/project-management-guide/faq/what-is-a-project-charter-in-project-management/)
- [Asana - Write a Project Charter](https://asana.com/resources/project-charter)
- [Monday.com - Project Charter Templates 2025](https://monday.com/blog/project-management/project-charter-templates/)
- [ClickUp - Project Charter Examples](https://clickup.com/blog/project-charter-example/)
- [Smartsheet - Project Charter Templates](https://www.smartsheet.com/blog/project-charter-templates-and-guidelines-every-business-need)
- [Project Manager - Project Charter Guide](https://www.projectmanager.com/blog/project-charter)

**School Management System References:**
- [Redwerk - How to Build School Management System](https://redwerk.com/blog/school-management-system-software-development/)
- [Code&Care - School Management System Development](https://code-care.com/blog/how-to-build-a-school-management-system-steps-features-benefits-and-costs/)
- [Project Manager Template - SMS Requirements](https://www.projectmanagertemplate.com/post/school-management-system-project-requirements)

---

## Document Control

| Attribute | Value |
|-----------|-------|
| **Document Owner** | Solo Full-Stack Developer |
| **Document Status** | Pending Approval |
| **Creation Date** | January 10, 2026 |
| **Last Updated** | January 10, 2026 |
| **Version** | 1.0 |
| **Review Frequency** | Quarterly |
| **Next Review Date** | April 10, 2026 |

---

**End of Project Charter Document**

*This Project Charter establishes the formal authorization and foundational framework for the Smart Academy Digital Portal Development Project. All stakeholders are expected to review, understand, and adhere to the contents of this document throughout the project lifecycle.*

---

*"And say: My Lord, increase me in knowledge." - Quran 20:114*
