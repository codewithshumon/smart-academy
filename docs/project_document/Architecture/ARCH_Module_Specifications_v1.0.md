# Module Specifications
## Smart Academy Digital Portal
### Version 1.0

---

## Document Control

| Field | Value |
|-------|-------|
| Document ID | SA-ARCH-MOD-001 |
| Version | 1.0 |
| Status | Draft |
| Created Date | 2026-01-10 |
| Last Updated | 2026-01-10 |
| Author | Development Team |
| Approved By | Project Stakeholders |

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Module Inventory](#2-module-inventory)
3. [Core Modules](#3-core-modules)
4. [Academic Modules](#4-academic-modules)
5. [Administrative Modules](#5-administrative-modules)
6. [Financial Modules](#6-financial-modules)
7. [Communication Modules](#7-communication-modules)
8. [Islamic Education Module](#8-islamic-education-module)
9. [Integration Modules](#9-integration-modules)
10. [Module Dependencies](#10-module-dependencies)
11. [Interface Specifications](#11-interface-specifications)

---

## 1. Introduction

### 1.1 Purpose

This document provides detailed specifications for all modules in the Smart Academy Digital Portal system. Each module is described with its responsibilities, interfaces, dependencies, and implementation details.

### 1.2 Scope

The specifications cover:
- Module inventory and classification
- Detailed module descriptions
- Input/Output specifications
- API interfaces
- Inter-module dependencies
- Database schemas per module

### 1.3 Module Architecture Pattern

All modules follow a consistent layered architecture:

```
┌─────────────────────────────────────────────────────────────────┐
│                    MODULE ARCHITECTURE PATTERN                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                    Controller Layer                      │   │
│   │   - Route handlers                                       │   │
│   │   - Request validation                                   │   │
│   │   - Response formatting                                  │   │
│   └───────────────────────────┬─────────────────────────────┘   │
│                               │                                  │
│   ┌───────────────────────────▼─────────────────────────────┐   │
│   │                    Service Layer                         │   │
│   │   - Business logic                                       │   │
│   │   - Domain operations                                    │   │
│   │   - Transaction management                               │   │
│   └───────────────────────────┬─────────────────────────────┘   │
│                               │                                  │
│   ┌───────────────────────────▼─────────────────────────────┐   │
│   │                   Repository Layer                       │   │
│   │   - Data access                                          │   │
│   │   - ORM operations                                       │   │
│   │   - Query building                                       │   │
│   └───────────────────────────┬─────────────────────────────┘   │
│                               │                                  │
│   ┌───────────────────────────▼─────────────────────────────┐   │
│   │                    Data Layer                            │   │
│   │   - Database entities                                    │   │
│   │   - Schema definitions                                   │   │
│   │   - Migrations                                           │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Module Inventory

### 2.1 Complete Module List

| Module ID | Module Name | Category | Priority | Status |
|-----------|-------------|----------|----------|--------|
| MOD-001 | Authentication | Core | P0 | Planned |
| MOD-002 | User Management | Core | P0 | Planned |
| MOD-003 | Role & Permission | Core | P0 | Planned |
| MOD-004 | Student Management | Academic | P0 | Planned |
| MOD-005 | Teacher Management | Academic | P0 | Planned |
| MOD-006 | Class Management | Academic | P0 | Planned |
| MOD-007 | Attendance Management | Academic | P1 | Planned |
| MOD-008 | Grading System | Academic | P1 | Planned |
| MOD-009 | Examination Management | Academic | P1 | Planned |
| MOD-010 | Timetable Management | Academic | P1 | Planned |
| MOD-011 | Learning Management | Academic | P1 | Planned |
| MOD-012 | Admission Management | Administrative | P0 | Planned |
| MOD-013 | Document Management | Administrative | P2 | Planned |
| MOD-014 | Event Management | Administrative | P2 | Planned |
| MOD-015 | Fee Management | Financial | P0 | Planned |
| MOD-016 | Payment Gateway | Financial | P0 | Planned |
| MOD-017 | Invoice Management | Financial | P1 | Planned |
| MOD-018 | Financial Reporting | Financial | P1 | Planned |
| MOD-019 | Notification Service | Communication | P1 | Planned |
| MOD-020 | Messaging System | Communication | P2 | Planned |
| MOD-021 | Islamic Education | Specialized | P1 | Planned |
| MOD-022 | Gibbon Integration | Integration | P0 | Planned |
| MOD-023 | Moodle Integration | Integration | P1 | Planned |
| MOD-024 | Reporting Engine | Core | P1 | Planned |
| MOD-025 | Audit & Logging | Core | P1 | Planned |

### 2.2 Module Categories

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                            MODULE CLASSIFICATION                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│   ┌─────────────────────────────────────────────────────────────────────────────┐   │
│   │                          CORE MODULES                                        │   │
│   │                                                                              │   │
│   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │   │
│   │  │Authentication│  │User Mgmt   │  │Role/Perm   │  │Audit/Log   │        │   │
│   │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │   │
│   └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                      │
│   ┌─────────────────────────────────────────────────────────────────────────────┐   │
│   │                        ACADEMIC MODULES                                      │   │
│   │                                                                              │   │
│   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │   │
│   │  │Student Mgmt │  │Teacher Mgmt│  │Class Mgmt  │  │Attendance  │        │   │
│   │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │   │
│   │                                                                              │   │
│   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │   │
│   │  │Grading     │  │Examination │  │Timetable   │  │LMS         │        │   │
│   │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │   │
│   └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                      │
│   ┌─────────────────────────────────────────────────────────────────────────────┐   │
│   │                      ADMINISTRATIVE MODULES                                  │   │
│   │                                                                              │   │
│   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                          │   │
│   │  │Admission   │  │Document    │  │Event Mgmt  │                          │   │
│   │  └─────────────┘  └─────────────┘  └─────────────┘                          │   │
│   └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                      │
│   ┌─────────────────────────────────────────────────────────────────────────────┐   │
│   │                        FINANCIAL MODULES                                     │   │
│   │                                                                              │   │
│   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │   │
│   │  │Fee Mgmt    │  │Payment GW  │  │Invoice     │  │Fin Reports │        │   │
│   │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │   │
│   └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                      │
│   ┌─────────────────────────────────────────────────────────────────────────────┐   │
│   │                      SPECIALIZED MODULES                                     │   │
│   │                                                                              │   │
│   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                          │   │
│   │  │Islamic Ed  │  │Notification│  │Messaging   │                          │   │
│   │  └─────────────┘  └─────────────┘  └─────────────┘                          │   │
│   └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                      │
│   ┌─────────────────────────────────────────────────────────────────────────────┐   │
│   │                      INTEGRATION MODULES                                     │   │
│   │                                                                              │   │
│   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                          │   │
│   │  │Gibbon Int  │  │Moodle Int  │  │Report Engine│                          │   │
│   │  └─────────────┘  └─────────────┘  └─────────────┘                          │   │
│   └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Core Modules

### 3.1 MOD-001: Authentication Module

#### 3.1.1 Overview

| Attribute | Value |
|-----------|-------|
| Module ID | MOD-001 |
| Name | Authentication Module |
| Category | Core |
| Priority | P0 (Critical) |
| Owner | Development Team |
| Dependencies | MOD-002, MOD-003 |

#### 3.1.2 Responsibilities

- User login/logout management
- Password management (reset, change)
- Session management
- Multi-factor authentication (OTP)
- SSO integration with Gibbon/Moodle
- JWT token generation and validation
- OAuth 2.0 support

#### 3.1.3 API Endpoints

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/v1/auth/login` | POST | User login | Public |
| `/api/v1/auth/logout` | POST | User logout | Required |
| `/api/v1/auth/refresh` | POST | Refresh access token | Required |
| `/api/v1/auth/password/reset` | POST | Request password reset | Public |
| `/api/v1/auth/password/change` | PUT | Change password | Required |
| `/api/v1/auth/otp/send` | POST | Send OTP | Public |
| `/api/v1/auth/otp/verify` | POST | Verify OTP | Public |
| `/api/v1/auth/sso/gibbon` | GET | Gibbon SSO callback | Public |
| `/api/v1/auth/sso/moodle` | GET | Moodle SSO callback | Public |

#### 3.1.4 Data Models

```typescript
// User Session
interface Session {
  id: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  deviceInfo: DeviceInfo;
  ipAddress: string;
  createdAt: Date;
  expiresAt: Date;
  isActive: boolean;
}

// Login Request
interface LoginRequest {
  email?: string;
  phone?: string;
  password: string;
  rememberMe?: boolean;
  deviceInfo?: DeviceInfo;
}

// Login Response
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserProfile;
  permissions: string[];
}
```

#### 3.1.5 Database Schema

```sql
-- sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  access_token_hash VARCHAR(255) NOT NULL,
  refresh_token_hash VARCHAR(255) NOT NULL,
  device_type VARCHAR(50),
  device_name VARCHAR(100),
  browser VARCHAR(50),
  os VARCHAR(50),
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  revoked_at TIMESTAMPTZ,
  revoked_reason VARCHAR(100)
);

-- password_resets table
CREATE TABLE password_resets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  token_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  ip_address INET
);

-- otp_verifications table
CREATE TABLE otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier VARCHAR(255) NOT NULL,
  identifier_type VARCHAR(20) NOT NULL, -- 'email' or 'phone'
  otp_hash VARCHAR(255) NOT NULL,
  purpose VARCHAR(50) NOT NULL,
  attempts INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  verified_at TIMESTAMPTZ
);
```

---

### 3.2 MOD-002: User Management Module

#### 3.2.1 Overview

| Attribute | Value |
|-----------|-------|
| Module ID | MOD-002 |
| Name | User Management Module |
| Category | Core |
| Priority | P0 (Critical) |
| Owner | Development Team |
| Dependencies | MOD-001, MOD-003 |

#### 3.2.2 Responsibilities

- User CRUD operations
- Profile management
- Account status management
- User search and filtering
- Bulk user operations
- User import/export
- Account deactivation/reactivation

#### 3.2.3 API Endpoints

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/v1/users` | GET | List users with pagination | Admin |
| `/api/v1/users` | POST | Create new user | Admin |
| `/api/v1/users/:id` | GET | Get user by ID | Admin/Self |
| `/api/v1/users/:id` | PUT | Update user | Admin/Self |
| `/api/v1/users/:id` | DELETE | Deactivate user | Admin |
| `/api/v1/users/:id/profile` | GET | Get user profile | Self |
| `/api/v1/users/:id/profile` | PUT | Update profile | Self |
| `/api/v1/users/:id/avatar` | POST | Upload avatar | Self |
| `/api/v1/users/import` | POST | Bulk import users | Admin |
| `/api/v1/users/export` | GET | Export users | Admin |

#### 3.2.4 Data Models

```typescript
interface User {
  id: string;
  email: string;
  phone: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  firstNameBn?: string;
  lastNameBn?: string;
  dateOfBirth?: Date;
  gender: 'male' | 'female' | 'other';
  avatarUrl?: string;
  status: UserStatus;
  emailVerifiedAt?: Date;
  phoneVerifiedAt?: Date;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

enum UserStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  DELETED = 'deleted'
}

interface UserProfile extends User {
  roles: Role[];
  permissions: string[];
  addresses: Address[];
  preferences: UserPreferences;
}
```

---

### 3.3 MOD-003: Role & Permission Module

#### 3.3.1 Overview

| Attribute | Value |
|-----------|-------|
| Module ID | MOD-003 |
| Name | Role & Permission Module |
| Category | Core |
| Priority | P0 (Critical) |
| Owner | Development Team |
| Dependencies | MOD-002 |

#### 3.3.2 Responsibilities

- Role definition and management
- Permission definition
- Role-permission mapping
- User-role assignment
- Permission inheritance
- Access control enforcement
- Permission caching

#### 3.3.3 Default Roles

| Role | Description | Base Permissions |
|------|-------------|------------------|
| super_admin | Full system access | All permissions |
| admin | Administrative access | User, academic, financial management |
| principal | School principal | View all, manage academic |
| teacher | Teaching staff | Class, grades, attendance |
| student | Enrolled student | View own data, submit work |
| parent | Student guardian | View child data, payments |
| accountant | Financial staff | Financial management |
| librarian | Library staff | Library management |

#### 3.3.4 Permission Categories

```typescript
const PermissionCategories = {
  USER: {
    CREATE: 'user:create',
    READ: 'user:read',
    UPDATE: 'user:update',
    DELETE: 'user:delete',
    MANAGE_ROLES: 'user:manage_roles'
  },
  STUDENT: {
    CREATE: 'student:create',
    READ: 'student:read',
    UPDATE: 'student:update',
    DELETE: 'student:delete',
    ENROLL: 'student:enroll',
    VIEW_GRADES: 'student:view_grades'
  },
  ACADEMIC: {
    MANAGE_CLASSES: 'academic:manage_classes',
    MANAGE_SUBJECTS: 'academic:manage_subjects',
    MANAGE_TIMETABLE: 'academic:manage_timetable',
    MANAGE_EXAMS: 'academic:manage_exams'
  },
  ATTENDANCE: {
    MARK: 'attendance:mark',
    VIEW: 'attendance:view',
    REPORT: 'attendance:report',
    EDIT: 'attendance:edit'
  },
  GRADES: {
    ENTER: 'grades:enter',
    VIEW: 'grades:view',
    EDIT: 'grades:edit',
    PUBLISH: 'grades:publish'
  },
  FINANCIAL: {
    VIEW_FEES: 'financial:view_fees',
    MANAGE_FEES: 'financial:manage_fees',
    PROCESS_PAYMENTS: 'financial:process_payments',
    VIEW_REPORTS: 'financial:view_reports'
  },
  CONTENT: {
    CREATE: 'content:create',
    READ: 'content:read',
    UPDATE: 'content:update',
    DELETE: 'content:delete',
    PUBLISH: 'content:publish'
  }
};
```

#### 3.3.5 Database Schema

```sql
-- roles table
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  description TEXT,
  is_system BOOLEAN DEFAULT FALSE,
  parent_role_id UUID REFERENCES roles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- permissions table
CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  display_name VARCHAR(150) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- role_permissions table
CREATE TABLE role_permissions (
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  granted_by UUID REFERENCES users(id),
  PRIMARY KEY (role_id, permission_id)
);

-- user_roles table
CREATE TABLE user_roles (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  assigned_by UUID REFERENCES users(id),
  expires_at TIMESTAMPTZ,
  PRIMARY KEY (user_id, role_id)
);
```

---

## 4. Academic Modules

### 4.1 MOD-004: Student Management Module

#### 4.1.1 Overview

| Attribute | Value |
|-----------|-------|
| Module ID | MOD-004 |
| Name | Student Management Module |
| Category | Academic |
| Priority | P0 (Critical) |
| Owner | Development Team |
| Dependencies | MOD-002, MOD-003, MOD-006, MOD-012 |

#### 4.1.2 Responsibilities

- Student registration and enrollment
- Student profile management
- Guardian/parent association
- Class and section assignment
- Student document management
- Student history tracking
- Student status management (active, graduated, transferred)

#### 4.1.3 API Endpoints

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/v1/students` | GET | List students | Admin/Teacher |
| `/api/v1/students` | POST | Create student | Admin |
| `/api/v1/students/:id` | GET | Get student details | Admin/Teacher/Self |
| `/api/v1/students/:id` | PUT | Update student | Admin |
| `/api/v1/students/:id/enroll` | POST | Enroll in class | Admin |
| `/api/v1/students/:id/transfer` | POST | Transfer student | Admin |
| `/api/v1/students/:id/guardians` | GET | Get guardians | Admin/Self |
| `/api/v1/students/:id/guardians` | POST | Add guardian | Admin |
| `/api/v1/students/:id/academic-history` | GET | Get history | Admin/Teacher/Self |
| `/api/v1/students/:id/documents` | GET | Get documents | Admin/Self |
| `/api/v1/students/:id/documents` | POST | Upload document | Admin/Self |

#### 4.1.4 Data Models

```typescript
interface Student {
  id: string;
  userId: string;
  rollNumber: string;
  admissionNumber: string;
  admissionDate: Date;
  currentClassId: string;
  currentSectionId: string;
  academicYearId: string;
  bloodGroup?: string;
  religion?: string;
  nationality: string;
  birthCertificateNo?: string;
  previousSchool?: string;
  previousClass?: string;
  status: StudentStatus;
  createdAt: Date;
  updatedAt: Date;
}

interface Guardian {
  id: string;
  userId: string;
  relationship: 'father' | 'mother' | 'guardian' | 'other';
  occupation?: string;
  annualIncome?: number;
  isPrimary: boolean;
  canPickup: boolean;
  emergencyContact: boolean;
}

interface StudentGuardian {
  studentId: string;
  guardianId: string;
  relationship: string;
  isPrimary: boolean;
}

enum StudentStatus {
  ADMITTED = 'admitted',
  ACTIVE = 'active',
  ON_LEAVE = 'on_leave',
  TRANSFERRED = 'transferred',
  GRADUATED = 'graduated',
  EXPELLED = 'expelled',
  WITHDRAWN = 'withdrawn'
}
```

---

### 4.2 MOD-007: Attendance Management Module

#### 4.2.1 Overview

| Attribute | Value |
|-----------|-------|
| Module ID | MOD-007 |
| Name | Attendance Management Module |
| Category | Academic |
| Priority | P1 (High) |
| Owner | Development Team |
| Dependencies | MOD-004, MOD-006 |

#### 4.2.2 Responsibilities

- Daily attendance marking
- Period-wise attendance
- Attendance status types (Present, Absent, Late, Excused)
- Attendance reports generation
- Absence notification to parents
- Attendance statistics calculation
- Leave management integration

#### 4.2.3 API Endpoints

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/v1/attendance` | GET | Get attendance records | Teacher/Admin |
| `/api/v1/attendance` | POST | Mark attendance | Teacher |
| `/api/v1/attendance/bulk` | POST | Bulk mark attendance | Teacher |
| `/api/v1/attendance/:id` | PUT | Update attendance | Teacher/Admin |
| `/api/v1/attendance/class/:classId/date/:date` | GET | Class attendance | Teacher |
| `/api/v1/attendance/student/:studentId` | GET | Student attendance | Teacher/Parent/Self |
| `/api/v1/attendance/student/:studentId/summary` | GET | Attendance summary | Teacher/Parent/Self |
| `/api/v1/attendance/reports/daily` | GET | Daily report | Admin |
| `/api/v1/attendance/reports/monthly` | GET | Monthly report | Admin |

#### 4.2.4 Data Models

```typescript
interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  sectionId: string;
  date: Date;
  status: AttendanceStatus;
  period?: number;
  markedById: string;
  markedAt: Date;
  notes?: string;
  modifiedById?: string;
  modifiedAt?: Date;
  modificationReason?: string;
}

enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
  EXCUSED = 'excused',
  HALF_DAY = 'half_day',
  ON_LEAVE = 'on_leave'
}

interface AttendanceSummary {
  studentId: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  excusedDays: number;
  attendancePercentage: number;
  period: {
    start: Date;
    end: Date;
  };
}
```

---

### 4.3 MOD-008: Grading System Module

#### 4.3.1 Overview

| Attribute | Value |
|-----------|-------|
| Module ID | MOD-008 |
| Name | Grading System Module |
| Category | Academic |
| Priority | P1 (High) |
| Owner | Development Team |
| Dependencies | MOD-004, MOD-006, MOD-009 |

#### 4.3.2 Responsibilities

- Grade entry and management
- Multiple grading scales support
- GPA/CGPA calculation
- Grade conversion (marks to letter grades)
- Report card generation
- Grade publication workflow
- Academic transcript generation

#### 4.3.3 Grading Scales

```typescript
// Bangladesh Secondary Education Grading Scale
const BDSecondaryGradingScale = {
  'A+': { min: 80, max: 100, gpa: 5.00 },
  'A':  { min: 70, max: 79,  gpa: 4.00 },
  'A-': { min: 60, max: 69,  gpa: 3.50 },
  'B':  { min: 50, max: 59,  gpa: 3.00 },
  'C':  { min: 40, max: 49,  gpa: 2.00 },
  'D':  { min: 33, max: 39,  gpa: 1.00 },
  'F':  { min: 0,  max: 32,  gpa: 0.00 }
};

// Islamic Education Grading (for Hifz, Tajweed)
const IslamicGradingScale = {
  'Mumtaz (Excellent)':     { min: 90, max: 100 },
  'Jayyid Jiddan (V.Good)': { min: 80, max: 89 },
  'Jayyid (Good)':          { min: 70, max: 79 },
  'Maqbool (Pass)':         { min: 60, max: 69 },
  'Rasib (Fail)':           { min: 0,  max: 59 }
};
```

#### 4.3.4 API Endpoints

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/v1/grades` | GET | List grades | Teacher/Admin |
| `/api/v1/grades` | POST | Enter grades | Teacher |
| `/api/v1/grades/bulk` | POST | Bulk grade entry | Teacher |
| `/api/v1/grades/:id` | PUT | Update grade | Teacher/Admin |
| `/api/v1/grades/student/:studentId` | GET | Student grades | Teacher/Parent/Self |
| `/api/v1/grades/class/:classId/subject/:subjectId` | GET | Class grades | Teacher |
| `/api/v1/grades/publish` | POST | Publish grades | Admin |
| `/api/v1/grades/report-card/:studentId` | GET | Generate report card | Admin/Parent/Self |
| `/api/v1/grades/transcript/:studentId` | GET | Generate transcript | Admin |

#### 4.3.5 Data Models

```typescript
interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  examinationId: string;
  academicYearId: string;
  termId: string;
  marksObtained: number;
  maxMarks: number;
  percentage: number;
  letterGrade: string;
  gradePoint: number;
  remarks?: string;
  enteredById: string;
  enteredAt: Date;
  publishedAt?: Date;
  status: GradeStatus;
}

interface ReportCard {
  studentId: string;
  student: StudentInfo;
  academicYear: string;
  term: string;
  class: string;
  section: string;
  subjects: SubjectGrade[];
  attendance: AttendanceSummary;
  overallGPA: number;
  rank?: number;
  teacherRemarks?: string;
  principalRemarks?: string;
  generatedAt: Date;
}

interface SubjectGrade {
  subject: SubjectInfo;
  assessments: AssessmentGrade[];
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  letterGrade: string;
  gradePoint: number;
}
```

---

## 5. Administrative Modules

### 5.1 MOD-012: Admission Management Module

#### 5.1.1 Overview

| Attribute | Value |
|-----------|-------|
| Module ID | MOD-012 |
| Name | Admission Management Module |
| Category | Administrative |
| Priority | P0 (Critical) |
| Owner | Development Team |
| Dependencies | MOD-002, MOD-004, MOD-015 |

#### 5.1.2 Responsibilities

- Online application form management
- Application processing workflow
- Document verification
- Admission tests scheduling
- Interview management
- Merit list generation
- Admission approval workflow
- Seat allocation management
- Waitlist management

#### 5.1.3 Admission Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    ADMISSION WORKFLOW                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────┐           │
│  │Application│───►│ Document     │───►│ Eligibility  │           │
│  │ Submitted │    │ Verification │    │ Check        │           │
│  └──────────┘    └──────────────┘    └───────┬──────┘           │
│                                              │                   │
│                         ┌────────────────────┴──────────────┐   │
│                         ▼                                   ▼   │
│                  ┌────────────┐                     ┌───────────┐│
│                  │ Eligible   │                     │ Rejected  ││
│                  └─────┬──────┘                     └───────────┘│
│                        │                                         │
│                        ▼                                         │
│                  ┌────────────────┐                              │
│                  │ Admission Test │ (if applicable)              │
│                  │ / Interview    │                              │
│                  └───────┬────────┘                              │
│                          │                                       │
│              ┌───────────┴───────────┐                          │
│              ▼                       ▼                          │
│      ┌─────────────┐         ┌─────────────┐                    │
│      │ Selected    │         │ Waitlisted  │                    │
│      └──────┬──────┘         └─────────────┘                    │
│             │                                                    │
│             ▼                                                    │
│      ┌─────────────┐                                            │
│      │ Fee Payment │                                            │
│      └──────┬──────┘                                            │
│             │                                                    │
│             ▼                                                    │
│      ┌─────────────┐                                            │
│      │ Enrolled    │                                            │
│      └─────────────┘                                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### 5.1.4 API Endpoints

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/v1/admissions/applications` | GET | List applications | Admin |
| `/api/v1/admissions/applications` | POST | Submit application | Public |
| `/api/v1/admissions/applications/:id` | GET | Get application | Admin/Applicant |
| `/api/v1/admissions/applications/:id` | PUT | Update application | Admin |
| `/api/v1/admissions/applications/:id/documents` | POST | Upload documents | Applicant |
| `/api/v1/admissions/applications/:id/verify` | POST | Verify documents | Admin |
| `/api/v1/admissions/applications/:id/approve` | POST | Approve application | Admin |
| `/api/v1/admissions/applications/:id/reject` | POST | Reject application | Admin |
| `/api/v1/admissions/merit-list` | GET | Get merit list | Admin |
| `/api/v1/admissions/seat-allocation` | GET | Get seat allocation | Admin |

#### 5.1.5 Data Models

```typescript
interface AdmissionApplication {
  id: string;
  applicationNumber: string;
  academicYearId: string;
  classAppliedFor: string;

  // Student Information
  studentInfo: {
    firstName: string;
    lastName: string;
    firstNameBn?: string;
    lastNameBn?: string;
    dateOfBirth: Date;
    gender: string;
    bloodGroup?: string;
    religion?: string;
    nationality: string;
    birthCertificateNo?: string;
    photoUrl?: string;
  };

  // Guardian Information
  guardianInfo: {
    fatherName: string;
    fatherNameBn?: string;
    fatherOccupation?: string;
    fatherPhone: string;
    fatherEmail?: string;
    motherName: string;
    motherNameBn?: string;
    motherOccupation?: string;
    motherPhone?: string;
  };

  // Address
  presentAddress: Address;
  permanentAddress: Address;

  // Previous Education
  previousEducation?: {
    schoolName: string;
    class: string;
    year: number;
    result?: string;
  };

  // Application Status
  status: ApplicationStatus;
  submittedAt: Date;

  // Processing
  documentsVerified: boolean;
  documentVerifiedAt?: Date;
  documentVerifiedById?: string;

  testScore?: number;
  interviewScore?: number;
  meritPosition?: number;

  approvedAt?: Date;
  approvedById?: string;
  rejectedAt?: Date;
  rejectedById?: string;
  rejectionReason?: string;

  // Enrollment
  enrolledAt?: Date;
  studentId?: string;
}

enum ApplicationStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  DOCUMENTS_PENDING = 'documents_pending',
  UNDER_REVIEW = 'under_review',
  ELIGIBLE = 'eligible',
  INELIGIBLE = 'ineligible',
  TEST_SCHEDULED = 'test_scheduled',
  SELECTED = 'selected',
  WAITLISTED = 'waitlisted',
  REJECTED = 'rejected',
  PAYMENT_PENDING = 'payment_pending',
  ENROLLED = 'enrolled',
  CANCELLED = 'cancelled'
}
```

---

## 6. Financial Modules

### 6.1 MOD-015: Fee Management Module

#### 6.1.1 Overview

| Attribute | Value |
|-----------|-------|
| Module ID | MOD-015 |
| Name | Fee Management Module |
| Category | Financial |
| Priority | P0 (Critical) |
| Owner | Development Team |
| Dependencies | MOD-004, MOD-016 |

#### 6.1.2 Responsibilities

- Fee structure definition
- Fee category management
- Discount and scholarship management
- Fine/penalty management
- Fee waiver processing
- Fee reminder automation
- Fee collection tracking

#### 6.1.3 Fee Categories

| Category | Type | Frequency | Examples |
|----------|------|-----------|----------|
| Tuition | Academic | Monthly/Term | Regular tuition |
| Admission | One-time | Once | Admission fee |
| Examination | Academic | Term | Board exam fees |
| Transport | Service | Monthly | Bus service |
| Hostel | Service | Monthly | Boarding fees |
| Library | Academic | Annual | Library membership |
| Laboratory | Academic | Annual | Lab usage |
| Sports | Activity | Annual | Sports equipment |
| Activities | Activity | Annual | Co-curricular |

#### 6.1.4 API Endpoints

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/v1/fees/structures` | GET | List fee structures | Admin |
| `/api/v1/fees/structures` | POST | Create fee structure | Admin |
| `/api/v1/fees/structures/:id` | PUT | Update fee structure | Admin |
| `/api/v1/fees/categories` | GET | List fee categories | Admin |
| `/api/v1/fees/discounts` | GET | List discounts | Admin |
| `/api/v1/fees/discounts` | POST | Create discount | Admin |
| `/api/v1/fees/student/:studentId` | GET | Get student fees | Admin/Parent/Self |
| `/api/v1/fees/student/:studentId/dues` | GET | Get dues | Admin/Parent/Self |
| `/api/v1/fees/waivers` | POST | Request fee waiver | Admin |
| `/api/v1/fees/waivers/:id/approve` | POST | Approve waiver | Admin |

#### 6.1.5 Data Models

```typescript
interface FeeStructure {
  id: string;
  name: string;
  academicYearId: string;
  classId: string;
  categoryId: string;
  amount: Money;
  frequency: FeeFrequency;
  dueDay: number;
  lateFinePerDay?: Money;
  lateFineMaxDays?: number;
  isOptional: boolean;
  applicableFrom: Date;
  applicableTo?: Date;
  createdById: string;
  createdAt: Date;
}

interface FeeDiscount {
  id: string;
  name: string;
  type: 'percentage' | 'fixed';
  value: number;
  applicableFeeCategories: string[];
  criteria: DiscountCriteria;
  maxBeneficiaries?: number;
  currentBeneficiaries: number;
  validFrom: Date;
  validTo?: Date;
  requiresApproval: boolean;
}

interface StudentFee {
  id: string;
  studentId: string;
  feeStructureId: string;
  originalAmount: Money;
  discountAmount: Money;
  fineAmount: Money;
  finalAmount: Money;
  discountId?: string;
  dueDate: Date;
  paidAmount: Money;
  paidDate?: Date;
  status: FeeStatus;
  invoiceId?: string;
}

enum FeeStatus {
  NOT_DUE = 'not_due',
  DUE = 'due',
  OVERDUE = 'overdue',
  PARTIALLY_PAID = 'partially_paid',
  PAID = 'paid',
  WAIVED = 'waived'
}
```

---

### 6.2 MOD-016: Payment Gateway Module

#### 6.2.1 Overview

| Attribute | Value |
|-----------|-------|
| Module ID | MOD-016 |
| Name | Payment Gateway Module |
| Category | Financial |
| Priority | P0 (Critical) |
| Owner | Development Team |
| Dependencies | MOD-015, MOD-017 |

#### 6.2.2 Supported Payment Methods

| Provider | Type | Features |
|----------|------|----------|
| bKash | Mobile Wallet | MFS, QR, App2App |
| Nagad | Mobile Wallet | MFS, QR |
| SSLCommerz | Gateway | Cards, Net Banking, MFS |
| Cash | Offline | Counter payment |
| Bank Transfer | Offline | Direct deposit |

#### 6.2.3 API Endpoints

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/v1/payments/initiate` | POST | Initiate payment | Parent/Self |
| `/api/v1/payments/:id/status` | GET | Get payment status | Parent/Self |
| `/api/v1/payments/callback/bkash` | POST | bKash callback | Webhook |
| `/api/v1/payments/callback/nagad` | POST | Nagad callback | Webhook |
| `/api/v1/payments/callback/sslcommerz` | POST | SSLCommerz callback | Webhook |
| `/api/v1/payments/:id/verify` | POST | Verify payment | Admin |
| `/api/v1/payments/:id/refund` | POST | Process refund | Admin |
| `/api/v1/payments/methods` | GET | List payment methods | Public |
| `/api/v1/payments/history` | GET | Payment history | Parent/Admin |

#### 6.2.4 Gateway Integration Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                         PAYMENT GATEWAY INTEGRATION                                  │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│   ┌─────────────────────────────────────────────────────────────────────────────┐   │
│   │                        PAYMENT CONTROLLER                                    │   │
│   └───────────────────────────────────┬─────────────────────────────────────────┘   │
│                                       │                                             │
│   ┌───────────────────────────────────▼─────────────────────────────────────────┐   │
│   │                        PAYMENT SERVICE                                       │   │
│   │                                                                              │   │
│   │  ┌────────────────────────────────────────────────────────────────────────┐ │   │
│   │  │                    PAYMENT GATEWAY FACTORY                             │ │   │
│   │  │                                                                         │ │   │
│   │  │  createGateway(method: PaymentMethod): PaymentGateway                  │ │   │
│   │  └────────────────────────────────────────────────────────────────────────┘ │   │
│   │                                                                              │   │
│   │  ┌─────────────────────────────────────────────────────────────────────────┐│   │
│   │  │                <<interface>> PaymentGateway                             ││   │
│   │  │                                                                          ││   │
│   │  │  + initiate(request: PaymentRequest): Promise<PaymentResponse>          ││   │
│   │  │  + verify(transactionId: string): Promise<VerificationResult>           ││   │
│   │  │  + refund(transactionId: string, amount: Money): Promise<RefundResult>  ││   │
│   │  │  + getStatus(transactionId: string): Promise<TransactionStatus>         ││   │
│   │  └───────────────────────────────┬─────────────────────────────────────────┘│   │
│   │                                  │                                          │   │
│   │         ┌────────────────────────┼────────────────────────┐                 │   │
│   │         │                        │                        │                 │   │
│   │         ▼                        ▼                        ▼                 │   │
│   │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐     │   │
│   │  │  BkashGateway   │  │  NagadGateway   │  │  SSLCommerzGateway      │     │   │
│   │  │                 │  │                 │  │                         │     │   │
│   │  │ - apiKey        │  │ - merchantId    │  │ - storeId               │     │   │
│   │  │ - secretKey     │  │ - publicKey     │  │ - storePassword         │     │   │
│   │  │ - baseUrl       │  │ - baseUrl       │  │ - baseUrl               │     │   │
│   │  └────────┬────────┘  └────────┬────────┘  └────────────┬────────────┘     │   │
│   │           │                    │                        │                  │   │
│   └───────────┼────────────────────┼────────────────────────┼──────────────────┘   │
│               │                    │                        │                      │
│               ▼                    ▼                        ▼                      │
│       ┌─────────────┐      ┌─────────────┐         ┌─────────────────┐            │
│       │   bKash     │      │   Nagad     │         │   SSLCommerz    │            │
│       │   API       │      │   API       │         │   API           │            │
│       └─────────────┘      └─────────────┘         └─────────────────┘            │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

#### 6.2.5 Data Models

```typescript
interface PaymentRequest {
  invoiceId: string;
  amount: Money;
  paymentMethod: PaymentMethod;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  returnUrl: string;
  cancelUrl: string;
  metadata?: Record<string, any>;
}

interface PaymentResponse {
  transactionId: string;
  gatewayRef: string;
  status: TransactionStatus;
  paymentUrl?: string;
  qrCode?: string;
  expiresAt: Date;
}

interface Transaction {
  id: string;
  invoiceId: string;
  transactionRef: string;
  gatewayRef: string;
  paymentMethod: PaymentMethod;
  amount: Money;
  currency: string;
  status: TransactionStatus;
  initiatedAt: Date;
  completedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  gatewayResponse?: Record<string, any>;
  refundedAmount?: Money;
  refundedAt?: Date;
  refundRef?: string;
}

enum TransactionStatus {
  INITIATED = 'initiated',
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded'
}

enum PaymentMethod {
  BKASH = 'bkash',
  NAGAD = 'nagad',
  SSLCOMMERZ_CARD = 'sslcommerz_card',
  SSLCOMMERZ_BANK = 'sslcommerz_bank',
  CASH = 'cash',
  BANK_TRANSFER = 'bank_transfer'
}
```

---

## 7. Communication Modules

### 7.1 MOD-019: Notification Service Module

#### 7.1.1 Overview

| Attribute | Value |
|-----------|-------|
| Module ID | MOD-019 |
| Name | Notification Service Module |
| Category | Communication |
| Priority | P1 (High) |
| Owner | Development Team |
| Dependencies | MOD-002 |

#### 7.1.2 Notification Channels

| Channel | Provider | Use Cases |
|---------|----------|-----------|
| SMS | BulkSMSBD | OTP, Urgent alerts, Attendance |
| Email | SendGrid | Reports, Newsletters, Receipts |
| Push | Firebase FCM | Real-time updates, Reminders |
| In-App | Native | All notifications |

#### 7.1.3 API Endpoints

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/v1/notifications` | GET | Get notifications | Self |
| `/api/v1/notifications/:id/read` | PUT | Mark as read | Self |
| `/api/v1/notifications/mark-all-read` | PUT | Mark all read | Self |
| `/api/v1/notifications/preferences` | GET | Get preferences | Self |
| `/api/v1/notifications/preferences` | PUT | Update preferences | Self |
| `/api/v1/notifications/send` | POST | Send notification | Admin |
| `/api/v1/notifications/broadcast` | POST | Broadcast | Admin |

#### 7.1.4 Data Models

```typescript
interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  titleBn?: string;
  message: string;
  messageBn?: string;
  data?: Record<string, any>;
  channels: NotificationChannel[];
  priority: 'low' | 'normal' | 'high' | 'urgent';
  scheduledFor?: Date;
  sentAt?: Date;
  readAt?: Date;
  createdAt: Date;
}

interface NotificationPreferences {
  userId: string;
  email: {
    enabled: boolean;
    types: NotificationType[];
  };
  sms: {
    enabled: boolean;
    types: NotificationType[];
  };
  push: {
    enabled: boolean;
    types: NotificationType[];
  };
  quietHours?: {
    enabled: boolean;
    start: string; // "22:00"
    end: string;   // "07:00"
  };
}

enum NotificationType {
  ATTENDANCE_ABSENT = 'attendance_absent',
  GRADE_PUBLISHED = 'grade_published',
  FEE_DUE = 'fee_due',
  FEE_OVERDUE = 'fee_overdue',
  PAYMENT_RECEIVED = 'payment_received',
  EXAM_SCHEDULE = 'exam_schedule',
  ASSIGNMENT_DUE = 'assignment_due',
  ANNOUNCEMENT = 'announcement',
  PRAYER_REMINDER = 'prayer_reminder',
  EVENT_REMINDER = 'event_reminder',
  SYSTEM = 'system'
}

enum NotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  IN_APP = 'in_app'
}
```

---

## 8. Islamic Education Module

### 8.1 MOD-021: Islamic Education Module

#### 8.1.1 Overview

| Attribute | Value |
|-----------|-------|
| Module ID | MOD-021 |
| Name | Islamic Education Module |
| Category | Specialized |
| Priority | P1 (High) |
| Owner | Development Team |
| Dependencies | MOD-004, MOD-019 |

#### 8.1.2 Sub-Modules

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                       ISLAMIC EDUCATION MODULE STRUCTURE                             │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│   ┌───────────────────────────────────────────────────────────────────────────────┐ │
│   │                           ISLAMIC EDUCATION                                    │ │
│   └───────────────────────────────────┬───────────────────────────────────────────┘ │
│                                       │                                             │
│      ┌────────────────────────────────┼────────────────────────────────┐           │
│      │                                │                                │           │
│      ▼                                ▼                                ▼           │
│   ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐            │
│   │   QURAN MODULE   │    │  PRAYER MODULE   │    │ CALENDAR MODULE  │            │
│   │                  │    │                  │    │                  │            │
│   │ - Recitation     │    │ - Prayer Times   │    │ - Hijri Calendar │            │
│   │ - Hifz Tracking  │    │ - Reminders      │    │ - Islamic Events │            │
│   │ - Tajweed        │    │ - Prayer Log     │    │ - Holidays       │            │
│   │ - Progress       │    │ - Qibla Direction│    │ - Ramadan Track  │            │
│   └──────────────────┘    └──────────────────┘    └──────────────────┘            │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

#### 8.1.3 API Endpoints

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/v1/islamic/quran/surahs` | GET | List all surahs | Any |
| `/api/v1/islamic/quran/surahs/:id` | GET | Get surah details | Any |
| `/api/v1/islamic/quran/surahs/:id/ayahs` | GET | Get ayahs | Any |
| `/api/v1/islamic/quran/audio/:reciterId/:surahId` | GET | Get audio | Any |
| `/api/v1/islamic/hifz/progress` | GET | Get hifz progress | Self/Teacher |
| `/api/v1/islamic/hifz/progress` | POST | Update progress | Teacher |
| `/api/v1/islamic/hifz/assessment` | POST | Record assessment | Teacher |
| `/api/v1/islamic/prayer/times` | GET | Get prayer times | Any |
| `/api/v1/islamic/prayer/preferences` | PUT | Set preferences | Self |
| `/api/v1/islamic/calendar/hijri` | GET | Get Hijri date | Any |
| `/api/v1/islamic/calendar/events` | GET | Get Islamic events | Any |

#### 8.1.4 Data Models

```typescript
interface HifzProgress {
  id: string;
  studentId: string;
  surahId: number;
  startAyah: number;
  endAyah: number;
  status: HifzStatus;
  memorizedAt?: Date;
  lastReviewedAt?: Date;
  nextReviewDue?: Date;
  reviewCount: number;
  assessments: TajweedAssessment[];
}

interface TajweedAssessment {
  id: string;
  studentId: string;
  surahId: number;
  ayahRange: { start: number; end: number };
  assessedById: string;
  assessedAt: Date;
  overallScore: number;
  tajweedRules: TajweedRuleScore[];
  fluency: number;
  memorization: number;
  notes?: string;
  audioRecordingUrl?: string;
}

interface TajweedRuleScore {
  rule: TajweedRule;
  score: number;
  corrections?: string;
}

enum TajweedRule {
  NOON_SAKIN_TANWEEN = 'noon_sakin_tanween',
  MEEM_SAKIN = 'meem_sakin',
  MADD = 'madd',
  QALQALAH = 'qalqalah',
  IDGHAM = 'idgham',
  IKHFA = 'ikhfa',
  IQLAB = 'iqlab',
  IZHAR = 'izhar',
  GHUNNA = 'ghunna'
}

interface PrayerTimes {
  date: string;
  location: {
    latitude: number;
    longitude: number;
    timezone: string;
  };
  times: {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  method: string; // Calculation method
}

enum HifzStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  MEMORIZED = 'memorized',
  NEEDS_REVIEW = 'needs_review',
  MASTERED = 'mastered'
}
```

#### 8.1.5 External Integrations

| Service | API | Purpose |
|---------|-----|---------|
| Quran.com | REST API | Quran text, translations, audio |
| Aladhan | REST API | Prayer times calculation |
| Local Calculation | Algorithm | Hijri calendar conversion |

---

## 9. Integration Modules

### 9.1 MOD-022: Gibbon Integration Module

#### 9.1.1 Overview

| Attribute | Value |
|-----------|-------|
| Module ID | MOD-022 |
| Name | Gibbon Integration Module |
| Category | Integration |
| Priority | P0 (Critical) |
| Owner | Development Team |
| Dependencies | MOD-002, MOD-004 |

#### 9.1.2 Integration Points

| Gibbon Module | Integration Type | Sync Direction |
|---------------|------------------|----------------|
| User Management | SSO + Data Sync | Bidirectional |
| Student | Data Sync | Bidirectional |
| Attendance | Data Sync | To Gibbon |
| Timetable | Read | From Gibbon |
| Finance | Data Sync | Bidirectional |
| Activities | Read | From Gibbon |

#### 9.1.3 Sync Strategy

```typescript
interface GibbonSyncConfig {
  modules: {
    students: {
      enabled: boolean;
      syncInterval: number; // minutes
      direction: 'to_gibbon' | 'from_gibbon' | 'bidirectional';
      conflictResolution: 'custom_wins' | 'gibbon_wins' | 'latest_wins';
    };
    attendance: {
      enabled: boolean;
      syncInterval: number;
      direction: 'to_gibbon';
    };
    // ... other modules
  };
  webhookUrl?: string;
  apiCredentials: {
    baseUrl: string;
    username: string;
    password: string;
  };
}

interface SyncLog {
  id: string;
  module: string;
  direction: string;
  recordsProcessed: number;
  recordsCreated: number;
  recordsUpdated: number;
  recordsFailed: number;
  errors: SyncError[];
  startedAt: Date;
  completedAt: Date;
  status: 'success' | 'partial' | 'failed';
}
```

---

### 9.2 MOD-023: Moodle Integration Module

#### 9.2.1 Overview

| Attribute | Value |
|-----------|-------|
| Module ID | MOD-023 |
| Name | Moodle Integration Module |
| Category | Integration |
| Priority | P1 (High) |
| Owner | Development Team |
| Dependencies | MOD-002, MOD-011 |

#### 9.2.2 Integration Points

| Moodle Component | Integration | Description |
|------------------|-------------|-------------|
| Authentication | SSO | Single sign-on via SAML/OAuth |
| User Enrollment | Sync | Automatic course enrollment |
| Course Content | Deep Link | Direct course access |
| Grades | Sync | Grade synchronization |
| Completion | Sync | Progress tracking |
| Notifications | Webhook | Activity notifications |

#### 9.2.3 API Wrapper

```typescript
interface MoodleAdapter {
  // Authentication
  authenticateUser(username: string): Promise<MoodleSession>;

  // Courses
  getCourses(userId: number): Promise<MoodleCourse[]>;
  getCourseContent(courseId: number): Promise<MoodleContent[]>;
  enrollUser(userId: number, courseId: number, roleId: number): Promise<void>;

  // Grades
  getGrades(userId: number, courseId: number): Promise<MoodleGrade[]>;

  // Completion
  getProgress(userId: number, courseId: number): Promise<MoodleProgress>;

  // Utility
  mapMoodleUserToLocal(moodleUser: MoodleUser): User;
  mapLocalUserToMoodle(user: User): MoodleUser;
}
```

---

## 10. Module Dependencies

### 10.1 Dependency Matrix

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              MODULE DEPENDENCY MATRIX                                                │
├──────────────┬────────────────────────────────────────────────────────────────────────────────────┤
│              │ 001 002 003 004 005 006 007 008 009 010 011 012 015 016 017 019 021 022 023         │
├──────────────┼────────────────────────────────────────────────────────────────────────────────────┤
│ MOD-001 Auth │  -   ●   ●   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ●   ●         │
│ MOD-002 User │  ●   -   ●   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ●   ●         │
│ MOD-003 Role │  ●   ●   -   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○         │
│ MOD-004 Stud │  ○   ●   ●   -   ○   ●   ○   ○   ○   ○   ○   ●   ●   ○   ○   ○   ○   ●   ○         │
│ MOD-005 Tchr │  ○   ●   ●   ○   -   ●   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ●   ●         │
│ MOD-006 Clss │  ○   ○   ○   ●   ●   -   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ●   ○         │
│ MOD-007 Attn │  ○   ○   ○   ●   ●   ●   -   ○   ○   ○   ○   ○   ○   ○   ○   ●   ○   ●   ○         │
│ MOD-008 Grde │  ○   ○   ○   ●   ●   ●   ○   -   ●   ○   ○   ○   ○   ○   ○   ●   ○   ●   ●         │
│ MOD-009 Exam │  ○   ○   ○   ●   ●   ●   ○   ●   -   ●   ○   ○   ○   ○   ○   ●   ○   ●   ●         │
│ MOD-010 Time │  ○   ○   ○   ○   ●   ●   ○   ○   ○   -   ○   ○   ○   ○   ○   ○   ○   ●   ○         │
│ MOD-011 LMS  │  ○   ●   ○   ●   ●   ●   ○   ●   ○   ○   -   ○   ○   ○   ○   ●   ○   ○   ●         │
│ MOD-012 Admn │  ○   ●   ○   ●   ○   ●   ○   ○   ○   ○   ○   -   ●   ●   ○   ●   ○   ●   ○         │
│ MOD-015 Fee  │  ○   ○   ○   ●   ○   ●   ○   ○   ○   ○   ○   ○   -   ●   ●   ●   ○   ●   ○         │
│ MOD-016 Pay  │  ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ●   -   ●   ●   ○   ○   ○         │
│ MOD-017 Inv  │  ○   ○   ○   ●   ○   ○   ○   ○   ○   ○   ○   ○   ●   ●   -   ●   ○   ○   ○         │
│ MOD-019 Notf │  ○   ●   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   -   ○   ○   ○         │
│ MOD-021 Islm │  ○   ○   ○   ●   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ○   ●   -   ○   ○         │
│ MOD-022 Gibb │  ●   ●   ○   ●   ●   ●   ●   ●   ○   ●   ○   ○   ●   ○   ○   ○   ○   -   ○         │
│ MOD-023 Mood │  ●   ●   ○   ○   ●   ●   ○   ●   ●   ○   ●   ○   ○   ○   ○   ○   ○   ○   -         │
├──────────────┴────────────────────────────────────────────────────────────────────────────────────┤
│  Legend: ● = Direct Dependency   ○ = No Direct Dependency                                         │
└───────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 10.2 Module Boot Order

```
PHASE 1 (Core):
  → MOD-003: Role & Permission
  → MOD-002: User Management
  → MOD-001: Authentication

PHASE 2 (Academic Foundation):
  → MOD-006: Class Management
  → MOD-004: Student Management
  → MOD-005: Teacher Management

PHASE 3 (Integrations):
  → MOD-022: Gibbon Integration
  → MOD-023: Moodle Integration

PHASE 4 (Academic Operations):
  → MOD-007: Attendance
  → MOD-008: Grading
  → MOD-009: Examination
  → MOD-010: Timetable
  → MOD-011: LMS

PHASE 5 (Administrative):
  → MOD-012: Admission
  → MOD-015: Fee Management
  → MOD-016: Payment Gateway
  → MOD-017: Invoice Management

PHASE 6 (Communication & Specialized):
  → MOD-019: Notification Service
  → MOD-021: Islamic Education
```

---

## 11. Interface Specifications

### 11.1 Inter-Module Communication

All modules communicate through well-defined interfaces:

```typescript
// Event-based communication
interface ModuleEvent<T = unknown> {
  type: string;
  source: string;
  timestamp: Date;
  correlationId: string;
  payload: T;
}

// Standard module interface
interface Module {
  name: string;
  version: string;
  dependencies: string[];

  initialize(): Promise<void>;
  shutdown(): Promise<void>;

  // Event handling
  emit<T>(event: ModuleEvent<T>): void;
  on<T>(eventType: string, handler: (event: ModuleEvent<T>) => void): void;

  // Health check
  healthCheck(): Promise<HealthStatus>;
}

// Service locator pattern
interface ServiceLocator {
  register<T>(name: string, service: T): void;
  get<T>(name: string): T;
  has(name: string): boolean;
}
```

### 11.2 API Response Standards

```typescript
// Success response
interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: {
    pagination?: PaginationMeta;
    timestamp: string;
    requestId: string;
  };
}

// Error response
interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    stack?: string; // Only in development
  };
  meta: {
    timestamp: string;
    requestId: string;
  };
}

// Pagination
interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

---

## Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Lead Developer | | | |
| System Architect | | | |
| Project Stakeholder | | | |

---

*This document provides complete specifications for all modules in the Smart Academy Digital Portal system.*
