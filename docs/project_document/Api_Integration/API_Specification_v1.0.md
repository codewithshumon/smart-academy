# Smart Academy Digital Portal - API Specification (OpenAPI/Swagger)

**Document Title:** API Specification Document
**Document ID:** API_Specification_v1.0
**Version:** 1.0
**Date:** January 10, 2026
**Project Name:** Smart Academy Digital Web Portal Development
**Prepared By:** Solo Full-Stack Developer

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | January 10, 2026 | Development Team | Initial API Specification Document |

**Reference Documents:**
- Smart Academy API Design Document v1.0
- Smart Academy URD v1.0
- Smart Academy SRS v1.0

---

## Table of Contents

1. [API Overview](#1-api-overview)
2. [Authentication Endpoints](#2-authentication-endpoints)
3. [User Management Endpoints](#3-user-management-endpoints)
4. [Student Endpoints](#4-student-endpoints)
5. [Attendance Endpoints](#5-attendance-endpoints)
6. [Grade Endpoints](#6-grade-endpoints)
7. [Islamic Education Endpoints](#7-islamic-education-endpoints)
8. [Payment Endpoints](#8-payment-endpoints)
9. [Notification Endpoints](#9-notification-endpoints)
10. [Request/Response Schemas](#10-requestresponse-schemas)
11. [Authentication Requirements](#11-authentication-requirements)
12. [Example Requests](#12-example-requests)

---

## 1. API Overview

### 1.1 Base URL

```
Production:  https://api.smartacademy.edu.bd/v1
Staging:     https://api.staging.smartacademy.edu.bd/v1
Development: http://localhost:3000/api/v1
```

### 1.2 OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: Smart Academy Digital Portal API
  description: |
    Comprehensive REST API for Smart Academy Digital Portal enabling:
    - Student Information Management
    - Attendance Tracking
    - Grade Management
    - Islamic Education Tracking
    - Payment Processing
    - Communication & Notifications
  version: 1.0.0
  contact:
    name: Smart Academy Development
    email: dev@smartacademy.edu.bd
    url: https://docs.smartacademy.edu.bd
  license:
    name: Proprietary
servers:
  - url: https://api.smartacademy.edu.bd/v1
    description: Production Server
  - url: https://api.staging.smartacademy.edu.bd/v1
    description: Staging Server
  - url: http://localhost:3000/api/v1
    description: Development Server

security:
  - bearerAuth: []
  - apiKeyAuth: []

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
    apiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key
```

### 1.3 Common Response Headers

| Header | Description | Example |
|--------|-------------|---------|
| `X-Request-ID` | Unique request identifier | `req_abc123xyz` |
| `X-RateLimit-Limit` | Rate limit ceiling | `300` |
| `X-RateLimit-Remaining` | Remaining requests | `295` |
| `X-RateLimit-Reset` | Reset timestamp | `1704880800` |
| `Content-Type` | Response content type | `application/json` |

---

## 2. Authentication Endpoints

### 2.1 Login

```yaml
POST /auth/login
```

**Description:** Authenticate user and receive access tokens.

**Request Body:**
```json
{
  "email": "user@smartacademy.edu.bd",
  "password": "SecurePassword123!",
  "remember_me": true
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_abc123",
      "email": "user@smartacademy.edu.bd",
      "first_name": "Ahmed",
      "last_name": "Rahman",
      "role": "teacher",
      "avatar_url": "https://cdn.smartacademy.edu.bd/avatars/usr_abc123.jpg"
    },
    "tokens": {
      "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh_token": "rf_xyz789...",
      "token_type": "Bearer",
      "expires_in": 900
    }
  },
  "meta": {
    "request_id": "req_login_001",
    "timestamp": "2026-01-10T09:00:00Z"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

---

### 2.2 Logout

```yaml
POST /auth/logout
```

**Headers:**
```
Authorization: Bearer <access_token>
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

---

### 2.3 Refresh Token

```yaml
POST /auth/refresh
```

**Request Body:**
```json
{
  "refresh_token": "rf_xyz789..."
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "rf_new123...",
    "expires_in": 900
  }
}
```

---

### 2.4 Forgot Password

```yaml
POST /auth/forgot-password
```

**Request Body:**
```json
{
  "email": "user@smartacademy.edu.bd"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Password reset instructions sent to your email"
}
```

---

### 2.5 Reset Password

```yaml
POST /auth/reset-password
```

**Request Body:**
```json
{
  "token": "reset_token_abc123",
  "password": "NewSecurePassword123!",
  "password_confirmation": "NewSecurePassword123!"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

### 2.6 Verify Email

```yaml
POST /auth/verify-email
```

**Request Body:**
```json
{
  "token": "verification_token_xyz789"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

---

### 2.7 Change Password

```yaml
POST /auth/change-password
```

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "current_password": "OldPassword123!",
  "new_password": "NewPassword456!",
  "new_password_confirmation": "NewPassword456!"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## 3. User Management Endpoints

### 3.1 Get Current User Profile

```yaml
GET /users/me
```

**Headers:**
```
Authorization: Bearer <access_token>
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "usr_abc123",
    "email": "teacher@smartacademy.edu.bd",
    "first_name": "Karim",
    "last_name": "Hassan",
    "phone": "+8801700000001",
    "role": "teacher",
    "avatar_url": "https://cdn.smartacademy.edu.bd/avatars/usr_abc123.jpg",
    "language_preference": "bn",
    "timezone": "Asia/Dhaka",
    "notification_preferences": {
      "email": true,
      "sms": true,
      "push": true
    },
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2026-01-10T08:00:00Z"
  }
}
```

---

### 3.2 Update Current User Profile

```yaml
PATCH /users/me
```

**Request Body:**
```json
{
  "first_name": "Karim",
  "last_name": "Hassan",
  "phone": "+8801700000001",
  "language_preference": "en",
  "notification_preferences": {
    "email": true,
    "sms": false,
    "push": true
  }
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "usr_abc123",
    "first_name": "Karim",
    "last_name": "Hassan",
    "updated_at": "2026-01-10T09:15:00Z"
  }
}
```

---

### 3.3 List Users (Admin)

```yaml
GET /users
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | integer | No | Page number (default: 1) |
| `limit` | integer | No | Items per page (default: 20, max: 100) |
| `role` | string | No | Filter by role (student, teacher, parent, admin) |
| `status` | string | No | Filter by status (active, inactive, suspended) |
| `search` | string | No | Search by name or email |
| `sort` | string | No | Sort field (created_at, name, email) |
| `order` | string | No | Sort order (asc, desc) |

**Example Request:**
```
GET /users?role=teacher&status=active&page=1&limit=20&sort=name&order=asc
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "usr_abc123",
      "email": "teacher1@smartacademy.edu.bd",
      "first_name": "Karim",
      "last_name": "Hassan",
      "role": "teacher",
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z"
    },
    {
      "id": "usr_abc124",
      "email": "teacher2@smartacademy.edu.bd",
      "first_name": "Fatima",
      "last_name": "Begum",
      "role": "teacher",
      "status": "active",
      "created_at": "2024-02-20T14:45:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 20,
    "total_pages": 3,
    "total_count": 45,
    "has_next": true,
    "has_prev": false
  }
}
```

---

### 3.4 Create User (Admin)

```yaml
POST /users
```

**Request Body:**
```json
{
  "email": "newuser@smartacademy.edu.bd",
  "first_name": "New",
  "last_name": "User",
  "phone": "+8801700000002",
  "role": "teacher",
  "password": "TempPassword123!",
  "send_welcome_email": true
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "usr_new001",
    "email": "newuser@smartacademy.edu.bd",
    "first_name": "New",
    "last_name": "User",
    "role": "teacher",
    "status": "pending_verification",
    "created_at": "2026-01-10T09:30:00Z"
  }
}
```

---

### 3.5 Get User by ID (Admin)

```yaml
GET /users/{id}
```

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | User ID |

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "usr_abc123",
    "email": "teacher@smartacademy.edu.bd",
    "first_name": "Karim",
    "last_name": "Hassan",
    "phone": "+8801700000001",
    "role": "teacher",
    "status": "active",
    "permissions": ["read:students", "write:grades", "read:attendance"],
    "last_login_at": "2026-01-10T08:00:00Z",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2026-01-10T08:00:00Z"
  }
}
```

---

### 3.6 Update User (Admin)

```yaml
PUT /users/{id}
```

**Request Body:**
```json
{
  "first_name": "Karim",
  "last_name": "Hassan",
  "phone": "+8801700000001",
  "role": "teacher",
  "status": "active",
  "permissions": ["read:students", "write:grades", "read:attendance", "write:attendance"]
}
```

---

### 3.7 Delete User (Admin)

```yaml
DELETE /users/{id}
```

**Success Response (204 No Content)**

---

## 4. Student Endpoints

### 4.1 List Students

```yaml
GET /students
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | integer | No | Page number |
| `limit` | integer | No | Items per page |
| `class_id` | string | No | Filter by class |
| `section` | string | No | Filter by section |
| `status` | string | No | Filter by status (active, inactive, graduated, transferred) |
| `gender` | string | No | Filter by gender |
| `search` | string | No | Search by name, student ID |
| `academic_year` | string | No | Filter by academic year |

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "stu_001",
      "student_id": "SA-2024-0001",
      "first_name": "Ahmed",
      "last_name": "Rahman",
      "date_of_birth": "2015-05-15",
      "gender": "male",
      "class": {
        "id": "cls_5a",
        "name": "Class 5",
        "section": "A"
      },
      "status": "active",
      "enrollment_date": "2024-01-15",
      "avatar_url": "https://cdn.smartacademy.edu.bd/avatars/stu_001.jpg"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 20,
    "total_pages": 25,
    "total_count": 500
  }
}
```

---

### 4.2 Get Student by ID

```yaml
GET /students/{id}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "stu_001",
    "student_id": "SA-2024-0001",
    "first_name": "Ahmed",
    "last_name": "Rahman",
    "date_of_birth": "2015-05-15",
    "gender": "male",
    "blood_group": "O+",
    "nationality": "Bangladeshi",
    "religion": "Islam",
    "address": {
      "street": "123 Main Street",
      "village": "Norimpur",
      "upazila": "Ramganj",
      "district": "Lakshmipur",
      "postal_code": "3700"
    },
    "class": {
      "id": "cls_5a",
      "name": "Class 5",
      "section": "A",
      "academic_year": "2026"
    },
    "parent": {
      "id": "par_001",
      "father_name": "Karim Rahman",
      "mother_name": "Fatima Rahman",
      "primary_contact": "+8801700000000",
      "email": "karim.rahman@email.com"
    },
    "emergency_contact": {
      "name": "Karim Rahman",
      "phone": "+8801700000000",
      "relationship": "Father"
    },
    "medical_info": {
      "allergies": ["Peanuts"],
      "chronic_conditions": [],
      "medications": [],
      "special_needs": null
    },
    "enrollment_date": "2024-01-15",
    "status": "active",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2026-01-10T08:00:00Z"
  },
  "links": {
    "self": "/api/v1/students/stu_001",
    "grades": "/api/v1/students/stu_001/grades",
    "attendance": "/api/v1/students/stu_001/attendance",
    "quran_progress": "/api/v1/students/stu_001/quran-progress",
    "fee_records": "/api/v1/students/stu_001/fee-records"
  }
}
```

---

### 4.3 Create Student

```yaml
POST /students
```

**Request Body:**
```json
{
  "first_name": "Zainab",
  "last_name": "Islam",
  "date_of_birth": "2016-03-20",
  "gender": "female",
  "blood_group": "A+",
  "nationality": "Bangladeshi",
  "religion": "Islam",
  "address": {
    "street": "456 School Road",
    "village": "Norimpur",
    "upazila": "Ramganj",
    "district": "Lakshmipur",
    "postal_code": "3700"
  },
  "class_id": "cls_4a",
  "parent_id": "par_002",
  "emergency_contact": {
    "name": "Abdul Islam",
    "phone": "+8801800000000",
    "relationship": "Father"
  },
  "medical_info": {
    "allergies": [],
    "chronic_conditions": [],
    "medications": [],
    "special_needs": null
  }
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {
    "id": "stu_002",
    "student_id": "SA-2026-0501",
    "first_name": "Zainab",
    "last_name": "Islam",
    "class": {
      "id": "cls_4a",
      "name": "Class 4A"
    },
    "status": "active",
    "created_at": "2026-01-10T10:00:00Z"
  }
}
```

---

### 4.4 Update Student

```yaml
PUT /students/{id}
```

**Request Body:**
```json
{
  "first_name": "Zainab",
  "last_name": "Islam",
  "address": {
    "street": "789 New Street",
    "village": "Norimpur",
    "upazila": "Ramganj",
    "district": "Lakshmipur",
    "postal_code": "3700"
  },
  "emergency_contact": {
    "name": "Abdul Islam",
    "phone": "+8801800000001",
    "relationship": "Father"
  }
}
```

---

### 4.5 Delete Student

```yaml
DELETE /students/{id}
```

**Success Response (204 No Content)**

---

### 4.6 Get Student Grades

```yaml
GET /students/{id}/grades
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `academic_year` | string | No | Filter by academic year |
| `term` | string | No | Filter by term |
| `subject_id` | string | No | Filter by subject |

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "student_id": "stu_001",
    "academic_year": "2026",
    "term": "First Term",
    "grades": [
      {
        "subject": {
          "id": "subj_eng",
          "name": "English",
          "name_bn": "ইংরেজি"
        },
        "assessments": [
          {
            "type": "class_test",
            "name": "Class Test 1",
            "marks_obtained": 18,
            "total_marks": 20,
            "percentage": 90,
            "date": "2026-01-05"
          },
          {
            "type": "assignment",
            "name": "Essay Writing",
            "marks_obtained": 45,
            "total_marks": 50,
            "percentage": 90,
            "date": "2026-01-08"
          }
        ],
        "term_grade": {
          "marks_obtained": 85,
          "total_marks": 100,
          "percentage": 85,
          "grade": "A",
          "gpa": 4.0
        }
      },
      {
        "subject": {
          "id": "subj_math",
          "name": "Mathematics",
          "name_bn": "গণিত"
        },
        "assessments": [
          {
            "type": "class_test",
            "name": "Class Test 1",
            "marks_obtained": 19,
            "total_marks": 20,
            "percentage": 95,
            "date": "2026-01-06"
          }
        ],
        "term_grade": {
          "marks_obtained": 92,
          "total_marks": 100,
          "percentage": 92,
          "grade": "A+",
          "gpa": 5.0
        }
      }
    ],
    "summary": {
      "total_subjects": 8,
      "average_percentage": 88.5,
      "overall_gpa": 4.5,
      "overall_grade": "A",
      "rank_in_class": 5,
      "total_students": 35
    }
  }
}
```

---

### 4.7 Get Student Attendance

```yaml
GET /students/{id}/attendance
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `from` | date | No | Start date (YYYY-MM-DD) |
| `to` | date | No | End date (YYYY-MM-DD) |
| `month` | string | No | Month (YYYY-MM) |

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "student_id": "stu_001",
    "period": {
      "from": "2026-01-01",
      "to": "2026-01-10"
    },
    "summary": {
      "total_days": 8,
      "present": 7,
      "absent": 1,
      "late": 0,
      "excused": 0,
      "attendance_percentage": 87.5
    },
    "records": [
      {
        "date": "2026-01-01",
        "status": "present",
        "check_in_time": "07:55:00",
        "marked_by": "Teacher Name"
      },
      {
        "date": "2026-01-02",
        "status": "absent",
        "reason": "Sick",
        "excused": false
      }
    ]
  }
}
```

---

## 5. Attendance Endpoints

### 5.1 Mark Attendance

```yaml
POST /attendance
```

**Request Body:**
```json
{
  "class_id": "cls_5a",
  "date": "2026-01-10",
  "records": [
    {
      "student_id": "stu_001",
      "status": "present",
      "check_in_time": "07:55:00"
    },
    {
      "student_id": "stu_002",
      "status": "absent",
      "reason": "Sick"
    },
    {
      "student_id": "stu_003",
      "status": "late",
      "check_in_time": "08:15:00",
      "reason": "Traffic"
    }
  ]
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Attendance marked successfully",
  "data": {
    "class_id": "cls_5a",
    "date": "2026-01-10",
    "total_students": 35,
    "present": 32,
    "absent": 2,
    "late": 1,
    "marked_by": "usr_teacher001",
    "marked_at": "2026-01-10T08:00:00Z"
  }
}
```

---

### 5.2 Get Attendance by Class

```yaml
GET /attendance/class/{class_id}
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | date | Yes | Date (YYYY-MM-DD) |

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "class_id": "cls_5a",
    "class_name": "Class 5A",
    "date": "2026-01-10",
    "total_students": 35,
    "summary": {
      "present": 32,
      "absent": 2,
      "late": 1,
      "excused": 0
    },
    "records": [
      {
        "student": {
          "id": "stu_001",
          "name": "Ahmed Rahman",
          "roll_number": 1
        },
        "status": "present",
        "check_in_time": "07:55:00"
      }
    ]
  }
}
```

---

### 5.3 Update Attendance Record

```yaml
PUT /attendance/{id}
```

**Request Body:**
```json
{
  "status": "excused",
  "reason": "Medical appointment",
  "notes": "Parent informed in advance"
}
```

---

### 5.4 Get Attendance Report

```yaml
GET /attendance/report
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `class_id` | string | No | Filter by class |
| `from` | date | Yes | Start date |
| `to` | date | Yes | End date |
| `format` | string | No | Response format (json, csv, pdf) |

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "period": {
      "from": "2026-01-01",
      "to": "2026-01-31"
    },
    "class": {
      "id": "cls_5a",
      "name": "Class 5A"
    },
    "summary": {
      "total_working_days": 22,
      "average_attendance": 94.5,
      "students_with_low_attendance": 2
    },
    "by_student": [
      {
        "student_id": "stu_001",
        "student_name": "Ahmed Rahman",
        "total_present": 21,
        "total_absent": 1,
        "attendance_percentage": 95.45
      }
    ]
  }
}
```

---

## 6. Grade Endpoints

### 6.1 List Grades by Class

```yaml
GET /grades
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `class_id` | string | Yes | Class ID |
| `subject_id` | string | No | Subject ID |
| `academic_year` | string | No | Academic year |
| `term` | string | No | Term (first, second, final) |
| `assessment_type` | string | No | Type (exam, quiz, assignment) |

---

### 6.2 Create Grade Entry

```yaml
POST /grades
```

**Request Body:**
```json
{
  "class_id": "cls_5a",
  "subject_id": "subj_math",
  "assessment": {
    "type": "class_test",
    "name": "Chapter 5 Test",
    "total_marks": 20,
    "date": "2026-01-10",
    "weight": 10
  },
  "grades": [
    {
      "student_id": "stu_001",
      "marks_obtained": 18,
      "remarks": "Excellent work"
    },
    {
      "student_id": "stu_002",
      "marks_obtained": 15,
      "remarks": "Good effort"
    }
  ]
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Grades recorded successfully",
  "data": {
    "assessment_id": "asmt_001",
    "class_id": "cls_5a",
    "subject_id": "subj_math",
    "total_students": 35,
    "grades_entered": 35,
    "class_average": 16.5,
    "highest": 20,
    "lowest": 8
  }
}
```

---

### 6.3 Update Grade

```yaml
PUT /grades/{id}
```

**Request Body:**
```json
{
  "marks_obtained": 19,
  "remarks": "Updated after recheck"
}
```

---

### 6.4 Get Grade Report

```yaml
GET /grades/report
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `student_id` | string | No | Student ID |
| `class_id` | string | No | Class ID |
| `academic_year` | string | Yes | Academic year |
| `term` | string | No | Term |
| `format` | string | No | Response format |

---

### 6.5 Generate Report Card

```yaml
POST /grades/report-card
```

**Request Body:**
```json
{
  "student_id": "stu_001",
  "academic_year": "2026",
  "term": "first",
  "include_remarks": true,
  "include_attendance": true
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "report_card": {
      "student": {
        "id": "stu_001",
        "name": "Ahmed Rahman",
        "class": "Class 5A",
        "roll_number": 1
      },
      "academic_year": "2026",
      "term": "First Term",
      "subjects": [
        {
          "name": "English",
          "marks_obtained": 85,
          "total_marks": 100,
          "grade": "A",
          "gpa": 4.0,
          "teacher_remarks": "Excellent progress in writing skills"
        }
      ],
      "summary": {
        "total_marks": 750,
        "marks_obtained": 678,
        "percentage": 90.4,
        "overall_grade": "A+",
        "overall_gpa": 4.8,
        "rank": 3,
        "total_students": 35
      },
      "attendance": {
        "total_days": 65,
        "present": 62,
        "percentage": 95.38
      },
      "class_teacher_remarks": "Ahmed is a dedicated student with excellent academic performance.",
      "principal_remarks": "Keep up the good work!"
    },
    "download_url": "https://cdn.smartacademy.edu.bd/reports/stu_001_2026_first.pdf"
  }
}
```

---

## 7. Islamic Education Endpoints

### 7.1 Get Quran Progress

```yaml
GET /quran-progress/{student_id}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "student_id": "stu_001",
    "student_name": "Ahmed Rahman",
    "overall_progress": {
      "total_surahs": 114,
      "completed_surahs": 45,
      "in_progress_surahs": 3,
      "percentage_complete": 39.47,
      "total_verses_memorized": 1250,
      "juz_completed": 5
    },
    "current_surah": {
      "number": 48,
      "name": "Al-Fath",
      "name_arabic": "الفتح",
      "total_verses": 29,
      "verses_memorized": 15,
      "started_date": "2025-12-15"
    },
    "surahs": [
      {
        "number": 1,
        "name": "Al-Fatiha",
        "name_arabic": "الفاتحة",
        "status": "completed",
        "verses_memorized": 7,
        "total_verses": 7,
        "completion_date": "2024-02-10",
        "tajweed_score": 95,
        "teacher_notes": "Excellent pronunciation"
      },
      {
        "number": 2,
        "name": "Al-Baqarah",
        "name_arabic": "البقرة",
        "status": "in_progress",
        "verses_memorized": 50,
        "total_verses": 286,
        "started_date": "2025-06-01",
        "tajweed_score": 88
      }
    ],
    "recent_assessments": [
      {
        "date": "2026-01-08",
        "surah": "Al-Fath",
        "verses_tested": "1-15",
        "score": 92,
        "teacher": "Maulana Abdullah",
        "feedback": "Good memorization, work on verse 12 pronunciation"
      }
    ],
    "milestones": [
      {
        "milestone": "First Juz Completed",
        "achieved_date": "2024-06-15"
      },
      {
        "milestone": "Fifth Juz Completed",
        "achieved_date": "2025-11-20"
      }
    ]
  }
}
```

---

### 7.2 Update Quran Progress

```yaml
POST /quran-progress/{student_id}/update
```

**Request Body:**
```json
{
  "surah_number": 48,
  "verses_memorized": 18,
  "tajweed_score": 90,
  "assessment_date": "2026-01-10",
  "teacher_notes": "Good progress, memorized verses 16-18 today"
}
```

---

### 7.3 Get Hadith Studies Progress

```yaml
GET /hadith-studies/{student_id}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "student_id": "stu_001",
    "academic_year": "2026",
    "overall_progress": {
      "total_hadith_studied": 150,
      "hadith_memorized": 75,
      "current_book": "Riyad as-Salihin",
      "chapters_completed": 12
    },
    "current_studies": [
      {
        "collection": "Sahih Bukhari",
        "chapter": "Book of Prayer",
        "hadith_number": 450,
        "status": "in_progress",
        "started_date": "2025-12-01"
      }
    ],
    "assessments": [
      {
        "date": "2026-01-05",
        "type": "oral_examination",
        "hadith_tested": 10,
        "score": 85,
        "teacher": "Maulana Hassan"
      }
    ]
  }
}
```

---

### 7.4 Get Islamic Calendar Events

```yaml
GET /islamic-calendar
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `month` | string | No | Hijri month (1-12) |
| `year` | string | No | Hijri year |
| `from` | date | No | Start date (Gregorian) |
| `to` | date | No | End date (Gregorian) |

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "current_hijri_date": {
      "day": 10,
      "month": 7,
      "month_name": "Rajab",
      "year": 1447
    },
    "events": [
      {
        "id": "evt_001",
        "name": "Isra and Mi'raj",
        "name_bn": "ইসরা ও মিরাজ",
        "name_ar": "الإسراء والمعراج",
        "hijri_date": "27 Rajab 1447",
        "gregorian_date": "2026-01-25",
        "type": "religious_observance",
        "description": "Commemoration of the Night Journey",
        "is_holiday": true
      }
    ],
    "prayer_times": {
      "date": "2026-01-10",
      "location": "Lakshmipur, Bangladesh",
      "fajr": "05:15",
      "sunrise": "06:35",
      "dhuhr": "12:10",
      "asr": "15:45",
      "maghrib": "17:35",
      "isha": "18:55"
    }
  }
}
```

---

### 7.5 Get Prayer Times

```yaml
GET /prayer-times
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | date | No | Date (default: today) |
| `latitude` | number | No | Location latitude |
| `longitude` | number | No | Location longitude |

---

## 8. Payment Endpoints

### 8.1 Get Fee Structure

```yaml
GET /fees/structure
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `class_id` | string | No | Class ID |
| `academic_year` | string | No | Academic year |

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "academic_year": "2026",
    "fee_structures": [
      {
        "class": "Class 5",
        "fees": [
          {
            "type": "tuition",
            "name": "Tuition Fee",
            "amount": 5000,
            "currency": "BDT",
            "frequency": "monthly",
            "due_day": 10
          },
          {
            "type": "admission",
            "name": "Admission Fee",
            "amount": 15000,
            "currency": "BDT",
            "frequency": "one-time"
          },
          {
            "type": "exam",
            "name": "Examination Fee",
            "amount": 2000,
            "currency": "BDT",
            "frequency": "per-term"
          }
        ],
        "total_annual": 75000
      }
    ],
    "payment_methods": [
      {
        "method": "bkash",
        "name": "bKash",
        "enabled": true
      },
      {
        "method": "nagad",
        "name": "Nagad",
        "enabled": true
      },
      {
        "method": "card",
        "name": "Credit/Debit Card",
        "enabled": true
      },
      {
        "method": "bank_transfer",
        "name": "Bank Transfer",
        "enabled": true
      }
    ]
  }
}
```

---

### 8.2 Get Student Fee Status

```yaml
GET /fees/students/{student_id}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "student_id": "stu_001",
    "student_name": "Ahmed Rahman",
    "class": "Class 5A",
    "academic_year": "2026",
    "fee_summary": {
      "total_fees": 75000,
      "paid": 45000,
      "due": 30000,
      "currency": "BDT"
    },
    "pending_payments": [
      {
        "invoice_id": "inv_001",
        "type": "tuition",
        "description": "January 2026 Tuition Fee",
        "amount": 5000,
        "due_date": "2026-01-10",
        "status": "overdue",
        "late_fee": 250
      }
    ],
    "payment_history": [
      {
        "payment_id": "pay_001",
        "invoice_id": "inv_prev_001",
        "amount": 5000,
        "payment_method": "bkash",
        "transaction_id": "TXN123456789",
        "paid_date": "2025-12-08",
        "receipt_url": "https://cdn.smartacademy.edu.bd/receipts/pay_001.pdf"
      }
    ]
  }
}
```

---

### 8.3 Create Payment

```yaml
POST /payments
```

**Request Body:**
```json
{
  "student_id": "stu_001",
  "invoice_id": "inv_001",
  "amount": 5250,
  "payment_method": "bkash",
  "return_url": "https://portal.smartacademy.edu.bd/payment/success",
  "cancel_url": "https://portal.smartacademy.edu.bd/payment/cancel"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "payment_id": "pay_002",
    "status": "pending",
    "amount": 5250,
    "currency": "BDT",
    "payment_method": "bkash",
    "gateway_url": "https://payment.bkash.com/checkout/xyz123",
    "expires_at": "2026-01-10T10:30:00Z"
  }
}
```

---

### 8.4 Verify Payment

```yaml
GET /payments/{payment_id}/verify
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "payment_id": "pay_002",
    "status": "completed",
    "amount": 5250,
    "currency": "BDT",
    "payment_method": "bkash",
    "transaction_id": "TXN987654321",
    "paid_at": "2026-01-10T09:45:00Z",
    "receipt_url": "https://cdn.smartacademy.edu.bd/receipts/pay_002.pdf"
  }
}
```

---

### 8.5 Get Payment History

```yaml
GET /payments
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `student_id` | string | No | Filter by student |
| `status` | string | No | Filter by status |
| `from` | date | No | Start date |
| `to` | date | No | End date |
| `payment_method` | string | No | Filter by method |

---

### 8.6 Request Refund

```yaml
POST /payments/{payment_id}/refund
```

**Request Body:**
```json
{
  "reason": "Duplicate payment",
  "amount": 5250,
  "notes": "Parent paid twice by mistake"
}
```

---

## 9. Notification Endpoints

### 9.1 Get Notifications

```yaml
GET /notifications
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | integer | No | Page number |
| `limit` | integer | No | Items per page |
| `status` | string | No | Filter by status (unread, read, all) |
| `type` | string | No | Filter by type |

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "unread_count": 5,
    "notifications": [
      {
        "id": "notif_001",
        "type": "grade_published",
        "title": "New Grade Published",
        "message": "Mathematics Class Test 1 grades have been published",
        "data": {
          "subject_id": "subj_math",
          "assessment_id": "asmt_001"
        },
        "read": false,
        "created_at": "2026-01-10T08:00:00Z"
      },
      {
        "id": "notif_002",
        "type": "fee_reminder",
        "title": "Fee Payment Due",
        "message": "January 2026 tuition fee is due on January 10",
        "data": {
          "invoice_id": "inv_001",
          "amount": 5000
        },
        "read": false,
        "created_at": "2026-01-08T09:00:00Z"
      }
    ]
  },
  "pagination": {
    "current_page": 1,
    "per_page": 20,
    "total_count": 25
  }
}
```

---

### 9.2 Mark Notification as Read

```yaml
POST /notifications/{id}/read
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

### 9.3 Mark All Notifications as Read

```yaml
POST /notifications/read-all
```

---

### 9.4 Get Notification Preferences

```yaml
GET /notifications/preferences
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "channels": {
      "email": true,
      "sms": true,
      "push": true,
      "in_app": true
    },
    "types": {
      "grade_published": {
        "email": true,
        "sms": false,
        "push": true
      },
      "attendance_alert": {
        "email": true,
        "sms": true,
        "push": true
      },
      "fee_reminder": {
        "email": true,
        "sms": true,
        "push": true
      },
      "announcement": {
        "email": true,
        "sms": false,
        "push": true
      }
    }
  }
}
```

---

### 9.5 Update Notification Preferences

```yaml
PUT /notifications/preferences
```

**Request Body:**
```json
{
  "channels": {
    "email": true,
    "sms": false,
    "push": true
  },
  "types": {
    "grade_published": {
      "email": true,
      "sms": false,
      "push": true
    }
  }
}
```

---

### 9.6 Send Notification (Admin)

```yaml
POST /notifications/send
```

**Request Body:**
```json
{
  "type": "announcement",
  "title": "School Closure Notice",
  "message": "School will remain closed on January 15 due to local election",
  "recipients": {
    "type": "all",
    "roles": ["parent", "student", "teacher"]
  },
  "channels": ["email", "sms", "push"],
  "scheduled_at": null
}
```

---

## 10. Request/Response Schemas

### 10.1 Common Schemas

```yaml
# Pagination Schema
Pagination:
  type: object
  properties:
    current_page:
      type: integer
    per_page:
      type: integer
    total_pages:
      type: integer
    total_count:
      type: integer
    has_next:
      type: boolean
    has_prev:
      type: boolean

# Error Schema
Error:
  type: object
  properties:
    success:
      type: boolean
      example: false
    error:
      type: object
      properties:
        code:
          type: string
          example: "VALIDATION_ERROR"
        message:
          type: string
          example: "The request data is invalid"
        details:
          type: array
          items:
            type: object
            properties:
              field:
                type: string
              message:
                type: string
              code:
                type: string

# Address Schema
Address:
  type: object
  properties:
    street:
      type: string
    village:
      type: string
    upazila:
      type: string
    district:
      type: string
    postal_code:
      type: string
```

### 10.2 Student Schema

```yaml
Student:
  type: object
  required:
    - first_name
    - last_name
    - date_of_birth
    - gender
    - class_id
  properties:
    id:
      type: string
      readOnly: true
    student_id:
      type: string
      readOnly: true
    first_name:
      type: string
      minLength: 2
      maxLength: 50
    last_name:
      type: string
      minLength: 2
      maxLength: 50
    date_of_birth:
      type: string
      format: date
    gender:
      type: string
      enum: [male, female]
    blood_group:
      type: string
      enum: [A+, A-, B+, B-, AB+, AB-, O+, O-]
    nationality:
      type: string
    religion:
      type: string
    address:
      $ref: '#/components/schemas/Address'
    class_id:
      type: string
    parent_id:
      type: string
    status:
      type: string
      enum: [active, inactive, graduated, transferred]
```

### 10.3 Grade Schema

```yaml
Grade:
  type: object
  properties:
    id:
      type: string
      readOnly: true
    student_id:
      type: string
    subject_id:
      type: string
    assessment_id:
      type: string
    marks_obtained:
      type: number
      minimum: 0
    total_marks:
      type: number
      minimum: 0
    percentage:
      type: number
      readOnly: true
    grade:
      type: string
      enum: [A+, A, A-, B+, B, B-, C+, C, C-, D, F]
    gpa:
      type: number
      minimum: 0
      maximum: 5
    remarks:
      type: string
```

---

## 11. Authentication Requirements

### 11.1 Endpoint Authentication Matrix

| Endpoint Category | Authentication | Authorization |
|-------------------|----------------|---------------|
| `GET /public/*` | None | None |
| `POST /auth/login` | None | None |
| `POST /auth/forgot-password` | None | None |
| `GET /users/me` | Bearer Token | Any authenticated user |
| `GET /users` | Bearer Token | Admin only |
| `GET /students` | Bearer Token | Teacher, Admin, Parent (limited) |
| `POST /students` | Bearer Token | Admin only |
| `GET /attendance` | Bearer Token | Teacher, Admin, Parent (limited) |
| `POST /attendance` | Bearer Token | Teacher only |
| `GET /grades` | Bearer Token | Teacher, Admin, Parent, Student (limited) |
| `POST /grades` | Bearer Token | Teacher only |
| `GET /payments` | Bearer Token | Admin, Parent (own) |
| `POST /payments` | Bearer Token | Parent |
| `POST /notifications/send` | Bearer Token | Admin only |

### 11.2 Authorization Header Format

```http
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 11.3 API Key Header Format

```http
X-API-Key: sk_live_xxxxxxxxxxxxxxxxxxxxx
```

---

## 12. Example Requests

### 12.1 cURL Examples

```bash
# Login
curl -X POST https://api.smartacademy.edu.bd/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@smartacademy.edu.bd", "password": "password123"}'

# Get Students (with authentication)
curl -X GET https://api.smartacademy.edu.bd/v1/students?class_id=cls_5a&page=1 \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIs..."

# Mark Attendance
curl -X POST https://api.smartacademy.edu.bd/v1/attendance \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIs..." \
  -H "Content-Type: application/json" \
  -d '{
    "class_id": "cls_5a",
    "date": "2026-01-10",
    "records": [
      {"student_id": "stu_001", "status": "present"},
      {"student_id": "stu_002", "status": "absent", "reason": "Sick"}
    ]
  }'

# Create Payment
curl -X POST https://api.smartacademy.edu.bd/v1/payments \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIs..." \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": "stu_001",
    "invoice_id": "inv_001",
    "amount": 5250,
    "payment_method": "bkash"
  }'
```

### 12.2 JavaScript/TypeScript Examples

```typescript
// Using fetch API
const API_BASE = 'https://api.smartacademy.edu.bd/v1';

// Login
async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

// Get students with authentication
async function getStudents(token: string, classId: string) {
  const response = await fetch(
    `${API_BASE}/students?class_id=${classId}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.json();
}

// Mark attendance
async function markAttendance(
  token: string,
  classId: string,
  date: string,
  records: AttendanceRecord[]
) {
  const response = await fetch(`${API_BASE}/attendance`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ class_id: classId, date, records }),
  });
  return response.json();
}
```

### 12.3 Python Examples

```python
import requests

API_BASE = 'https://api.smartacademy.edu.bd/v1'

# Login
def login(email: str, password: str) -> dict:
    response = requests.post(
        f'{API_BASE}/auth/login',
        json={'email': email, 'password': password}
    )
    return response.json()

# Get students
def get_students(token: str, class_id: str) -> dict:
    response = requests.get(
        f'{API_BASE}/students',
        params={'class_id': class_id},
        headers={'Authorization': f'Bearer {token}'}
    )
    return response.json()

# Mark attendance
def mark_attendance(token: str, class_id: str, date: str, records: list) -> dict:
    response = requests.post(
        f'{API_BASE}/attendance',
        json={'class_id': class_id, 'date': date, 'records': records},
        headers={'Authorization': f'Bearer {token}'}
    )
    return response.json()
```

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | January 10, 2026 | Development Team | Initial API Specification Document |

---

## References

- [OpenAPI Specification 3.1](https://swagger.io/specification/)
- [Swagger Best Practices](https://swagger.io/blog/api-documentation/best-practices-in-api-documentation/)
- [Smart Academy API Design Document v1.0](./API_Design_Document_v1.0.md)
- [Smart Academy URD v1.0](../Implementation/Smart_Academy_URD_Complete.md)

---

*End of API Specification Document*
