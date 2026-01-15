# Smart Academy Digital Portal - API Design Document

**Document Title:** API Design Document
**Document ID:** API_Design_Document_v1.0
**Version:** 1.0
**Date:** January 10, 2026
**Project Name:** Smart Academy Digital Web Portal Development
**Prepared By:** Solo Full-Stack Developer

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | January 10, 2026 | Development Team | Initial API Design Document |

**Reference Documents:**
- Smart Academy URD v1.0
- Smart Academy SRS v1.0
- Smart Academy Technology Stack v1.0
- Smart Academy System Architecture v1.0

---

## Table of Contents

1. [API Architecture Overview](#1-api-architecture-overview)
2. [API Versioning Strategy](#2-api-versioning-strategy)
3. [Endpoint Naming Conventions](#3-endpoint-naming-conventions)
4. [Request/Response Formats](#4-requestresponse-formats)
5. [Error Response Standards](#5-error-response-standards)
6. [Rate Limiting Strategy](#6-rate-limiting-strategy)
7. [CORS Policy](#7-cors-policy)
8. [Authentication & Authorization](#8-authentication--authorization)
9. [API Gateway Architecture](#9-api-gateway-architecture)
10. [Performance Optimization](#10-performance-optimization)
11. [API Documentation Standards](#11-api-documentation-standards)

---

## 1. API Architecture Overview

### 1.1 Architectural Style

Smart Academy Digital Portal implements a **RESTful API architecture** following industry best practices for 2025 and beyond. The API serves as the central communication layer between:

- Frontend applications (Next.js web app)
- Mobile applications (React Native iOS/Android)
- Third-party integrations (Gibbon SMS, Moodle LMS)
- External services (Payment gateways, SMS providers)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SMART ACADEMY API ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                          CLIENT LAYER                                   │ │
│  │                                                                         │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │ │
│  │  │   Next.js   │  │   React     │  │  Third-     │  │   Admin     │   │ │
│  │  │   Web App   │  │   Native    │  │  Party      │  │   Tools     │   │ │
│  │  │             │  │   Mobile    │  │  Services   │  │             │   │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                    │                                         │
│                                    ▼                                         │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                          API GATEWAY LAYER                              │ │
│  │                                                                         │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐   │ │
│  │  │                     Nginx / Caddy                                │   │ │
│  │  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────────────┐ │   │ │
│  │  │  │ SSL/TLS │  │ Rate    │  │ Load    │  │  Request Routing    │ │   │ │
│  │  │  │ Termina │  │ Limiting│  │ Balance │  │  & Proxy            │ │   │ │
│  │  │  └─────────┘  └─────────┘  └─────────┘  └─────────────────────┘ │   │ │
│  │  └─────────────────────────────────────────────────────────────────┘   │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                    │                                         │
│                                    ▼                                         │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                      APPLICATION LAYER (Fastify)                       │ │
│  │                                                                         │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐   │ │
│  │  │                    API Middleware Stack                          │   │ │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │   │ │
│  │  │  │ Auth     │ │ Validat  │ │ Logging  │ │ Error    │ │ CORS   │ │   │ │
│  │  │  │ JWT/OAuth│ │ Zod      │ │ Pino     │ │ Handler  │ │ Config │ │   │ │
│  │  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └────────┘ │   │ │
│  │  └─────────────────────────────────────────────────────────────────┘   │ │
│  │                                                                         │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐   │ │
│  │  │                      API Route Groups                            │   │ │
│  │  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────────────┐ │   │ │
│  │  │  │ /auth  │ │ /users │ │/students│ │/teachers│ │ /attendance   │ │   │ │
│  │  │  └────────┘ └────────┘ └────────┘ └────────┘ └────────────────┘ │   │ │
│  │  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────────────┐ │   │ │
│  │  │  │/grades │ │/islamic│ │/payments│ │/notific│ │ /admin        │ │   │ │
│  │  │  └────────┘ └────────┘ └────────┘ └────────┘ └────────────────┘ │   │ │
│  │  └─────────────────────────────────────────────────────────────────┘   │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                    │                                         │
│                                    ▼                                         │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                          DATA LAYER                                     │ │
│  │                                                                         │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │ │
│  │  │ PostgreSQL  │  │   Redis     │  │   MinIO     │  │  External   │   │ │
│  │  │ (Primary)   │  │  (Cache)    │  │  (Files)    │  │  APIs       │   │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │ │
│  │                                                                         │ │
│  │  ┌─────────────┐  ┌─────────────┐                                      │ │
│  │  │   MySQL     │  │   BullMQ    │                                      │ │
│  │  │ (Gibbon/    │  │  (Queues)   │                                      │ │
│  │  │  Moodle)    │  │             │                                      │ │
│  │  └─────────────┘  └─────────────┘                                      │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Core Design Principles

| Principle | Description | Implementation |
|-----------|-------------|----------------|
| **RESTful** | Resource-oriented architecture | Use nouns for endpoints, HTTP verbs for actions |
| **Stateless** | No client state stored on server | JWT tokens carry all necessary context |
| **Uniform Interface** | Consistent endpoint patterns | Standardized naming and response formats |
| **Layered System** | Separation of concerns | Gateway → Application → Data layers |
| **Cacheable** | Response caching support | HTTP cache headers, Redis caching |
| **Code on Demand** | Optional client-side execution | Progressive enhancement |

### 1.3 API Categories

```
SMART ACADEMY API STRUCTURE
│
├── PUBLIC APIs (No Authentication Required)
│   ├── /api/v1/public/programs
│   ├── /api/v1/public/events
│   ├── /api/v1/public/news
│   ├── /api/v1/public/faculty
│   └── /api/v1/public/contact
│
├── AUTHENTICATION APIs
│   ├── /api/v1/auth/login
│   ├── /api/v1/auth/logout
│   ├── /api/v1/auth/refresh
│   ├── /api/v1/auth/forgot-password
│   └── /api/v1/auth/reset-password
│
├── USER MANAGEMENT APIs (Authenticated)
│   ├── /api/v1/users
│   ├── /api/v1/students
│   ├── /api/v1/parents
│   ├── /api/v1/teachers
│   └── /api/v1/admin
│
├── ACADEMIC APIs (Role-Based)
│   ├── /api/v1/classes
│   ├── /api/v1/subjects
│   ├── /api/v1/attendance
│   ├── /api/v1/grades
│   ├── /api/v1/assignments
│   └── /api/v1/timetables
│
├── ISLAMIC EDUCATION APIs (Role-Based)
│   ├── /api/v1/quran-progress
│   ├── /api/v1/hadith-studies
│   ├── /api/v1/islamic-calendar
│   └── /api/v1/prayer-times
│
├── FINANCIAL APIs (Secured)
│   ├── /api/v1/fees
│   ├── /api/v1/payments
│   ├── /api/v1/invoices
│   └── /api/v1/scholarships
│
├── COMMUNICATION APIs
│   ├── /api/v1/notifications
│   ├── /api/v1/messages
│   ├── /api/v1/announcements
│   └── /api/v1/alerts
│
├── INTEGRATION APIs (Service-to-Service)
│   ├── /api/v1/integrations/gibbon
│   ├── /api/v1/integrations/moodle
│   ├── /api/v1/integrations/payments
│   └── /api/v1/webhooks
│
└── ADMIN APIs (Super Admin Only)
    ├── /api/v1/admin/system
    ├── /api/v1/admin/audit-logs
    ├── /api/v1/admin/settings
    └── /api/v1/admin/reports
```

### 1.4 Technology Stack for API Layer

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| **Runtime** | Node.js | 22 LTS | Server runtime |
| **Framework** | Fastify | 5.x | High-performance HTTP framework |
| **ORM** | Prisma | 6.x | Database ORM |
| **Validation** | Zod | 3.x | Schema validation |
| **Authentication** | @fastify/jwt | Latest | JWT token handling |
| **Documentation** | Swagger/OpenAPI | 3.1 | API documentation |
| **Logging** | Pino | Latest | Structured logging |
| **Testing** | Vitest | Latest | Unit/integration testing |

---

## 2. API Versioning Strategy

### 2.1 Versioning Approach

Smart Academy implements **URI Path Versioning** as the primary versioning strategy:

```
https://api.smartacademy.edu.bd/v1/students
https://api.smartacademy.edu.bd/v2/students
```

**Rationale:**
- Most explicit and visible versioning method
- Easy to implement and maintain
- Clear separation between versions
- Widely adopted industry standard
- Compatible with API gateway routing

### 2.2 Version Format

```
Major Version Only: /v{major}
Example: /v1, /v2, /v3

Format Pattern: v[0-9]+
```

### 2.3 Version Lifecycle

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      API VERSION LIFECYCLE                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌────────┐│
│  │  ALPHA  │───▶│  BETA   │───▶│ STABLE  │───▶│DEPRECAT │───▶│RETIRED ││
│  │         │    │         │    │         │    │   ED    │    │        ││
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘    └────────┘│
│       │              │              │              │              │     │
│       ▼              ▼              ▼              ▼              ▼     │
│   Internal       Limited        Production    12 months      API       │
│   Testing        Preview        Ready         Notice         Removed   │
│                                                                          │
│  Timeline:       Timeline:      Timeline:     Timeline:      Timeline: │
│  1-2 months      1-2 months     Indefinite    12 months      N/A       │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.4 Deprecation Policy

| Phase | Duration | Actions |
|-------|----------|---------|
| **Announcement** | T-12 months | Publish deprecation notice |
| **Warning Headers** | T-6 months | Add `Deprecation` and `Sunset` headers |
| **Documentation Update** | T-3 months | Mark as deprecated in docs |
| **Final Notice** | T-1 month | Send final notifications |
| **Retirement** | T-0 | Remove endpoint access |

### 2.5 Version Headers

```http
# Response Headers for Deprecated Endpoints
Deprecation: true
Sunset: Sat, 01 Jan 2028 00:00:00 GMT
Link: </api/v2/students>; rel="successor-version"
X-API-Version: v1
X-API-Deprecated: true
X-API-Deprecation-Date: 2027-01-01
```

### 2.6 Multi-Version Support

```
Currently Supported Versions:
├── v1 (Current Stable) - Default
│   └── Full support, all features
│
└── v2 (Future)
    └── Planned for major breaking changes
```

---

## 3. Endpoint Naming Conventions

### 3.1 URL Structure

```
https://{host}/api/{version}/{resource}[/{id}][/{sub-resource}]

Components:
├── {host}         → api.smartacademy.edu.bd
├── {version}      → v1, v2
├── {resource}     → Plural nouns (students, teachers)
├── {id}           → UUID or unique identifier
└── {sub-resource} → Nested resource (students/{id}/grades)
```

### 3.2 Resource Naming Rules

| Rule | Correct | Incorrect |
|------|---------|-----------|
| Use plural nouns | `/students` | `/student`, `/getStudents` |
| Use lowercase | `/students` | `/Students`, `/STUDENTS` |
| Use hyphens for multi-word | `/quran-progress` | `/quranProgress`, `/quran_progress` |
| No verbs in URLs | `/students` | `/getStudents`, `/createStudent` |
| No file extensions | `/students` | `/students.json` |
| No trailing slashes | `/students` | `/students/` |

### 3.3 Standard Endpoint Patterns

```
Resource Collection Operations:
├── GET    /api/v1/students           → List all students (paginated)
├── POST   /api/v1/students           → Create a new student
├── GET    /api/v1/students/:id       → Get a specific student
├── PUT    /api/v1/students/:id       → Full update of student
├── PATCH  /api/v1/students/:id       → Partial update of student
└── DELETE /api/v1/students/:id       → Delete a student

Nested Resource Operations:
├── GET    /api/v1/students/:id/grades        → Get student's grades
├── POST   /api/v1/students/:id/grades        → Add grade for student
├── GET    /api/v1/students/:id/attendance    → Get student's attendance
├── GET    /api/v1/classes/:id/students       → Get students in a class
└── GET    /api/v1/teachers/:id/classes       → Get teacher's classes

Action Endpoints (Exceptions):
├── POST   /api/v1/auth/login                 → User login
├── POST   /api/v1/auth/logout                → User logout
├── POST   /api/v1/students/:id/enroll        → Enroll student
├── POST   /api/v1/payments/:id/refund        → Process refund
└── POST   /api/v1/reports/generate           → Generate report
```

### 3.4 Query Parameters

```
Pagination:
GET /api/v1/students?page=1&limit=20

Filtering:
GET /api/v1/students?class_id=5a&status=active&gender=male

Sorting:
GET /api/v1/students?sort=created_at&order=desc

Field Selection:
GET /api/v1/students?fields=id,name,email,class_id

Search:
GET /api/v1/students?search=ahmed

Date Range:
GET /api/v1/attendance?from=2026-01-01&to=2026-01-31

Combined:
GET /api/v1/students?class_id=5a&status=active&sort=name&order=asc&page=1&limit=20
```

### 3.5 Resource Hierarchy

```
Smart Academy API Resource Hierarchy
│
├── /users (Base user accounts)
│   ├── /students (Student profiles)
│   │   ├── /{id}/grades
│   │   ├── /{id}/attendance
│   │   ├── /{id}/assignments
│   │   ├── /{id}/quran-progress
│   │   └── /{id}/fee-records
│   │
│   ├── /parents (Parent profiles)
│   │   ├── /{id}/children
│   │   ├── /{id}/notifications
│   │   └── /{id}/payments
│   │
│   ├── /teachers (Teacher profiles)
│   │   ├── /{id}/classes
│   │   ├── /{id}/timetable
│   │   └── /{id}/assessments
│   │
│   └── /admin (Admin profiles)
│       └── /{id}/permissions
│
├── /academic
│   ├── /classes
│   │   ├── /{id}/students
│   │   ├── /{id}/subjects
│   │   └── /{id}/timetable
│   │
│   ├── /subjects
│   │   ├── /{id}/curriculum
│   │   └── /{id}/resources
│   │
│   ├── /academic-years
│   │   └── /{id}/terms
│   │
│   └── /examinations
│       ├── /{id}/results
│       └── /{id}/schedules
│
├── /islamic-education
│   ├── /quran-progress
│   │   └── /{student_id}/surahs
│   │
│   ├── /hadith-studies
│   │   └── /{id}/assessments
│   │
│   └── /prayer-times
│
├── /finance
│   ├── /fee-structures
│   ├── /invoices
│   ├── /payments
│   │   └── /{id}/receipts
│   └── /scholarships
│
└── /communication
    ├── /notifications
    ├── /messages
    ├── /announcements
    └── /alerts
```

---

## 4. Request/Response Formats

### 4.1 Request Format

#### 4.1.1 Content-Type

```http
Content-Type: application/json; charset=utf-8
```

#### 4.1.2 Standard Request Headers

```http
# Required Headers
Content-Type: application/json
Accept: application/json
Authorization: Bearer <jwt_token>

# Optional Headers
Accept-Language: en-US, bn-BD, ar-SA
X-Request-ID: <uuid>
X-Client-Version: 1.0.0
X-Device-ID: <device_uuid>
X-Platform: web|ios|android
```

#### 4.1.3 Request Body Structure

```json
// POST /api/v1/students
{
  "data": {
    "first_name": "Ahmed",
    "last_name": "Rahman",
    "email": "ahmed.rahman@example.com",
    "date_of_birth": "2015-05-15",
    "gender": "male",
    "class_id": "cls_5a_2026",
    "parent_id": "par_uuid123",
    "address": {
      "street": "123 Main Street",
      "city": "Lakshmipur",
      "district": "Lakshmipur",
      "postal_code": "3700"
    },
    "emergency_contact": {
      "name": "Karim Rahman",
      "phone": "+8801700000000",
      "relationship": "father"
    }
  }
}
```

### 4.2 Response Format

#### 4.2.1 Success Response (Single Resource)

```json
// GET /api/v1/students/stu_uuid123
// HTTP 200 OK
{
  "success": true,
  "data": {
    "id": "stu_uuid123",
    "type": "student",
    "attributes": {
      "first_name": "Ahmed",
      "last_name": "Rahman",
      "email": "ahmed.rahman@example.com",
      "date_of_birth": "2015-05-15",
      "gender": "male",
      "status": "active",
      "enrollment_date": "2024-01-15",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2026-01-10T08:45:00Z"
    },
    "relationships": {
      "class": {
        "id": "cls_5a_2026",
        "name": "Class 5A"
      },
      "parent": {
        "id": "par_uuid123",
        "name": "Karim Rahman"
      }
    },
    "links": {
      "self": "/api/v1/students/stu_uuid123",
      "grades": "/api/v1/students/stu_uuid123/grades",
      "attendance": "/api/v1/students/stu_uuid123/attendance"
    }
  },
  "meta": {
    "request_id": "req_abc123",
    "timestamp": "2026-01-10T08:45:00Z",
    "api_version": "v1"
  }
}
```

#### 4.2.2 Success Response (Collection)

```json
// GET /api/v1/students?page=1&limit=20
// HTTP 200 OK
{
  "success": true,
  "data": [
    {
      "id": "stu_uuid123",
      "type": "student",
      "attributes": {
        "first_name": "Ahmed",
        "last_name": "Rahman",
        "class_name": "Class 5A",
        "status": "active"
      }
    },
    {
      "id": "stu_uuid124",
      "type": "student",
      "attributes": {
        "first_name": "Fatima",
        "last_name": "Islam",
        "class_name": "Class 5A",
        "status": "active"
      }
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 20,
    "total_pages": 25,
    "total_count": 500,
    "has_next": true,
    "has_prev": false,
    "next_page": "/api/v1/students?page=2&limit=20",
    "prev_page": null
  },
  "links": {
    "self": "/api/v1/students?page=1&limit=20",
    "first": "/api/v1/students?page=1&limit=20",
    "last": "/api/v1/students?page=25&limit=20",
    "next": "/api/v1/students?page=2&limit=20"
  },
  "meta": {
    "request_id": "req_abc124",
    "timestamp": "2026-01-10T08:46:00Z",
    "api_version": "v1",
    "filters_applied": {
      "status": "active"
    }
  }
}
```

#### 4.2.3 Success Response (Create)

```json
// POST /api/v1/students
// HTTP 201 Created
{
  "success": true,
  "message": "Student created successfully",
  "data": {
    "id": "stu_uuid125",
    "type": "student",
    "attributes": {
      "first_name": "Zainab",
      "last_name": "Hassan",
      "email": "zainab.hassan@example.com",
      "status": "active",
      "created_at": "2026-01-10T09:00:00Z"
    }
  },
  "links": {
    "self": "/api/v1/students/stu_uuid125"
  },
  "meta": {
    "request_id": "req_abc125",
    "timestamp": "2026-01-10T09:00:00Z"
  }
}
```

#### 4.2.4 Success Response (No Content)

```json
// DELETE /api/v1/students/stu_uuid123
// HTTP 204 No Content
// (Empty body)
```

### 4.3 Data Types and Formats

| Data Type | Format | Example |
|-----------|--------|---------|
| **ID** | UUID v4 or prefixed ID | `stu_abc123`, `usr_xyz789` |
| **Date** | ISO 8601 | `2026-01-10` |
| **DateTime** | ISO 8601 with timezone | `2026-01-10T09:00:00Z` |
| **Time** | ISO 8601 | `09:00:00` |
| **Currency** | ISO 4217 + amount | `{"currency": "BDT", "amount": 5000}` |
| **Phone** | E.164 format | `+8801700000000` |
| **Email** | RFC 5322 | `user@example.com` |
| **Boolean** | JSON boolean | `true`, `false` |
| **Enum** | Lowercase string | `active`, `inactive`, `pending` |
| **Array** | JSON array | `["item1", "item2"]` |

---

## 5. Error Response Standards

### 5.1 Error Response Structure

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request data is invalid",
    "details": [
      {
        "field": "email",
        "message": "Email format is invalid",
        "code": "INVALID_FORMAT"
      },
      {
        "field": "date_of_birth",
        "message": "Date of birth is required",
        "code": "REQUIRED_FIELD"
      }
    ],
    "documentation_url": "https://docs.smartacademy.edu.bd/errors/VALIDATION_ERROR"
  },
  "meta": {
    "request_id": "req_abc126",
    "timestamp": "2026-01-10T09:05:00Z",
    "path": "/api/v1/students",
    "method": "POST"
  }
}
```

### 5.2 HTTP Status Codes

#### 5.2.1 Success Codes (2xx)

| Code | Name | Usage |
|------|------|-------|
| `200` | OK | Successful GET, PUT, PATCH |
| `201` | Created | Successful POST (resource created) |
| `202` | Accepted | Request accepted for async processing |
| `204` | No Content | Successful DELETE |

#### 5.2.2 Client Error Codes (4xx)

| Code | Name | Usage | Error Code |
|------|------|-------|------------|
| `400` | Bad Request | Malformed request | `BAD_REQUEST` |
| `401` | Unauthorized | Missing/invalid auth | `UNAUTHORIZED` |
| `403` | Forbidden | Insufficient permissions | `FORBIDDEN` |
| `404` | Not Found | Resource doesn't exist | `NOT_FOUND` |
| `405` | Method Not Allowed | Wrong HTTP method | `METHOD_NOT_ALLOWED` |
| `409` | Conflict | Resource conflict | `CONFLICT` |
| `422` | Unprocessable Entity | Validation failed | `VALIDATION_ERROR` |
| `429` | Too Many Requests | Rate limit exceeded | `RATE_LIMIT_EXCEEDED` |

#### 5.2.3 Server Error Codes (5xx)

| Code | Name | Usage | Error Code |
|------|------|-------|------------|
| `500` | Internal Server Error | Unexpected error | `INTERNAL_ERROR` |
| `502` | Bad Gateway | Upstream service error | `BAD_GATEWAY` |
| `503` | Service Unavailable | Service temporarily down | `SERVICE_UNAVAILABLE` |
| `504` | Gateway Timeout | Upstream timeout | `GATEWAY_TIMEOUT` |

### 5.3 Application Error Codes

```typescript
// Error Code Categories
const ERROR_CODES = {
  // Authentication Errors (AUTH_xxx)
  AUTH_INVALID_CREDENTIALS: "AUTH_INVALID_CREDENTIALS",
  AUTH_TOKEN_EXPIRED: "AUTH_TOKEN_EXPIRED",
  AUTH_TOKEN_INVALID: "AUTH_TOKEN_INVALID",
  AUTH_SESSION_EXPIRED: "AUTH_SESSION_EXPIRED",
  AUTH_MFA_REQUIRED: "AUTH_MFA_REQUIRED",

  // Authorization Errors (AUTHZ_xxx)
  AUTHZ_INSUFFICIENT_PERMISSIONS: "AUTHZ_INSUFFICIENT_PERMISSIONS",
  AUTHZ_ROLE_REQUIRED: "AUTHZ_ROLE_REQUIRED",
  AUTHZ_RESOURCE_ACCESS_DENIED: "AUTHZ_RESOURCE_ACCESS_DENIED",

  // Validation Errors (VAL_xxx)
  VAL_REQUIRED_FIELD: "VAL_REQUIRED_FIELD",
  VAL_INVALID_FORMAT: "VAL_INVALID_FORMAT",
  VAL_OUT_OF_RANGE: "VAL_OUT_OF_RANGE",
  VAL_INVALID_TYPE: "VAL_INVALID_TYPE",
  VAL_UNIQUE_CONSTRAINT: "VAL_UNIQUE_CONSTRAINT",

  // Resource Errors (RES_xxx)
  RES_NOT_FOUND: "RES_NOT_FOUND",
  RES_ALREADY_EXISTS: "RES_ALREADY_EXISTS",
  RES_CONFLICT: "RES_CONFLICT",
  RES_DELETED: "RES_DELETED",

  // Payment Errors (PAY_xxx)
  PAY_FAILED: "PAY_FAILED",
  PAY_INSUFFICIENT_BALANCE: "PAY_INSUFFICIENT_BALANCE",
  PAY_GATEWAY_ERROR: "PAY_GATEWAY_ERROR",
  PAY_CARD_DECLINED: "PAY_CARD_DECLINED",

  // Integration Errors (INT_xxx)
  INT_GIBBON_CONNECTION_ERROR: "INT_GIBBON_CONNECTION_ERROR",
  INT_MOODLE_SYNC_ERROR: "INT_MOODLE_SYNC_ERROR",
  INT_SMS_GATEWAY_ERROR: "INT_SMS_GATEWAY_ERROR",
  INT_EMAIL_SERVICE_ERROR: "INT_EMAIL_SERVICE_ERROR",

  // Rate Limiting (RATE_xxx)
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
  RATE_QUOTA_EXCEEDED: "RATE_QUOTA_EXCEEDED"
};
```

### 5.4 Localized Error Messages

```json
// Error response with localization
{
  "success": false,
  "error": {
    "code": "VAL_REQUIRED_FIELD",
    "message": {
      "en": "Email address is required",
      "bn": "ইমেইল ঠিকানা প্রয়োজন"
    },
    "field": "email"
  }
}
```

---

## 6. Rate Limiting Strategy

### 6.1 Rate Limiting Tiers

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      RATE LIMITING TIERS                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │   PUBLIC APIs   │  │ AUTHENTICATED   │  │   ADMIN APIs    │         │
│  │                 │  │     APIs        │  │                 │         │
│  │  Rate: 60/min   │  │  Rate: 300/min  │  │  Rate: 1000/min │         │
│  │  Burst: 10      │  │  Burst: 50      │  │  Burst: 100     │         │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘         │
│                                                                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │   LOGIN APIs    │  │  PAYMENT APIs   │  │  WEBHOOK APIs   │         │
│  │                 │  │                 │  │                 │         │
│  │  Rate: 10/min   │  │  Rate: 30/min   │  │  Rate: 500/min  │         │
│  │  Burst: 3       │  │  Burst: 5       │  │  Burst: 50      │         │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘         │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Rate Limit Configuration

| API Category | Requests/Minute | Burst Limit | Per |
|--------------|-----------------|-------------|-----|
| Public (Unauthenticated) | 60 | 10 | IP Address |
| Authenticated Users | 300 | 50 | User ID |
| Admin Users | 1,000 | 100 | User ID |
| Login Endpoints | 10 | 3 | IP Address |
| Password Reset | 5 | 2 | Email |
| Payment APIs | 30 | 5 | User ID |
| File Upload | 20 | 5 | User ID |
| Webhooks (Inbound) | 500 | 50 | Source IP |
| Service-to-Service | 5,000 | 500 | API Key |

### 6.3 Rate Limit Headers

```http
# Standard Rate Limit Headers
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 245
X-RateLimit-Reset: 1704880800
X-RateLimit-Window: 60

# When rate limited (HTTP 429)
Retry-After: 45
X-RateLimit-Retry-After: 2026-01-10T09:10:00Z
```

### 6.4 Rate Limit Response

```json
// HTTP 429 Too Many Requests
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please retry after 45 seconds.",
    "retry_after": 45,
    "limit": 300,
    "remaining": 0,
    "reset_at": "2026-01-10T09:10:00Z"
  },
  "meta": {
    "request_id": "req_abc127",
    "timestamp": "2026-01-10T09:09:15Z"
  }
}
```

### 6.5 Rate Limiting Algorithm

```
Token Bucket Algorithm:

1. Each user/IP has a bucket with capacity = rate_limit
2. Bucket refills at rate_limit / window_seconds per second
3. Each request consumes 1 token
4. Request allowed if tokens > 0
5. Request denied if tokens = 0

Implementation: Redis with sliding window
Key Pattern: rate_limit:{identifier}:{endpoint}
TTL: Window duration (60 seconds)
```

---

## 7. CORS Policy

### 7.1 CORS Configuration

```typescript
// Fastify CORS Configuration
const corsOptions = {
  origin: [
    'https://smartacademy.edu.bd',
    'https://www.smartacademy.edu.bd',
    'https://portal.smartacademy.edu.bd',
    'https://admin.smartacademy.edu.bd',
    // Development origins
    ...(process.env.NODE_ENV === 'development' ? [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000'
    ] : [])
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Request-ID',
    'X-Client-Version',
    'X-Device-ID',
    'X-Platform',
    'Accept-Language'
  ],
  exposedHeaders: [
    'X-RateLimit-Limit',
    'X-RateLimit-Remaining',
    'X-RateLimit-Reset',
    'X-Request-ID',
    'X-Total-Count',
    'X-Page-Count'
  ],
  credentials: true,
  maxAge: 86400, // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204
};
```

### 7.2 CORS Headers

```http
# Response Headers for CORS
Access-Control-Allow-Origin: https://smartacademy.edu.bd
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Request-ID
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400
Access-Control-Expose-Headers: X-RateLimit-Limit, X-RateLimit-Remaining
```

### 7.3 Preflight Request Handling

```http
# Preflight Request (OPTIONS)
OPTIONS /api/v1/students HTTP/1.1
Host: api.smartacademy.edu.bd
Origin: https://portal.smartacademy.edu.bd
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization

# Preflight Response
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://portal.smartacademy.edu.bd
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
```

### 7.4 Environment-Specific CORS

| Environment | Allowed Origins | Credentials |
|-------------|-----------------|-------------|
| Development | localhost:*, 127.0.0.1:* | Yes |
| Staging | *.staging.smartacademy.edu.bd | Yes |
| Production | *.smartacademy.edu.bd | Yes |

---

## 8. Authentication & Authorization

### 8.1 Authentication Methods

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION METHODS                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                     JWT BEARER TOKEN                             │    │
│  │                   (Primary Method)                               │    │
│  │                                                                   │    │
│  │  • Access Token: 15 minutes expiry                              │    │
│  │  • Refresh Token: 7 days expiry                                 │    │
│  │  • Algorithm: RS256 (RSA with SHA-256)                          │    │
│  │  • Used for: Web app, Mobile app, SPA                           │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                     API KEY                                      │    │
│  │                (Service-to-Service)                              │    │
│  │                                                                   │    │
│  │  • Format: sk_live_xxxxx / sk_test_xxxxx                        │    │
│  │  • Used for: Webhooks, Integrations, Server apps                │    │
│  │  • Passed via: X-API-Key header                                 │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                     OAUTH 2.0                                    │    │
│  │                  (Third-Party SSO)                               │    │
│  │                                                                   │    │
│  │  • Providers: Google Workspace                                  │    │
│  │  • Grant Type: Authorization Code                               │    │
│  │  • Used for: Teacher SSO, Admin SSO                             │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 8.2 JWT Token Structure

```json
// Access Token Payload
{
  "sub": "usr_uuid123",           // User ID
  "type": "access",               // Token type
  "role": "teacher",              // User role
  "permissions": ["read:students", "write:grades"],
  "school_id": "sch_001",         // School context
  "iat": 1704880800,              // Issued at
  "exp": 1704881700,              // Expires at (15 min)
  "iss": "smartacademy.edu.bd",   // Issuer
  "aud": "smartacademy-api"       // Audience
}

// Refresh Token Payload
{
  "sub": "usr_uuid123",
  "type": "refresh",
  "family": "rf_uuid456",         // Token family for rotation
  "iat": 1704880800,
  "exp": 1705485600               // Expires at (7 days)
}
```

### 8.3 Authorization Model (RBAC)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      ROLE-BASED ACCESS CONTROL                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ROLES HIERARCHY:                                                        │
│                                                                          │
│  ┌─────────────┐                                                         │
│  │ Super Admin │ ────────────────────────────────────────────────────   │
│  └─────────────┘                                                   │     │
│         │                                                          │     │
│         ▼                                                          │     │
│  ┌─────────────┐                                                   │     │
│  │    Admin    │ ─────────────────────────────────────────────     │     │
│  └─────────────┘                                             │     │     │
│         │                                                    │     │     │
│         ▼                                                    │     │     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │     │     │
│  │   Teacher   │  │  Accountant │  │   Librarian │          │     │     │
│  └─────────────┘  └─────────────┘  └─────────────┘          │     │     │
│         │                │                │                  │     │     │
│         ▼                ▼                ▼                  ▼     ▼     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐   │
│  │   Parent    │  │   Student   │  │   Alumni    │  │    Guest     │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └──────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 8.4 Permission Matrix

| Permission | Super Admin | Admin | Teacher | Parent | Student | Guest |
|------------|:-----------:|:-----:|:-------:|:------:|:-------:|:-----:|
| users:read | ✓ | ✓ | ✓* | ✓* | ✓* | - |
| users:write | ✓ | ✓ | - | - | - | - |
| students:read | ✓ | ✓ | ✓* | ✓* | ✓* | - |
| students:write | ✓ | ✓ | - | - | - | - |
| grades:read | ✓ | ✓ | ✓* | ✓* | ✓* | - |
| grades:write | ✓ | ✓ | ✓* | - | - | - |
| attendance:read | ✓ | ✓ | ✓* | ✓* | ✓* | - |
| attendance:write | ✓ | ✓ | ✓* | - | - | - |
| payments:read | ✓ | ✓ | - | ✓* | - | - |
| payments:write | ✓ | ✓ | - | ✓* | - | - |
| system:admin | ✓ | - | - | - | - | - |
| public:read | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

*Limited to own/related resources

---

## 9. API Gateway Architecture

### 9.1 Gateway Components

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        API GATEWAY (NGINX)                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                     INGRESS LAYER                                │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │    │
│  │  │ SSL/TLS  │  │ DDoS     │  │ IP White │  │ Request Size    │ │    │
│  │  │ Term.    │  │ Protect  │  │ /Blacklist│  │ Limits          │ │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘ │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                    │                                     │
│                                    ▼                                     │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                   PROCESSING LAYER                               │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │    │
│  │  │ Rate     │  │ Request  │  │ Auth     │  │ Request          │ │    │
│  │  │ Limiting │  │ Logging  │  │ Verify   │  │ Transform        │ │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘ │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                    │                                     │
│                                    ▼                                     │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                    ROUTING LAYER                                 │    │
│  │  ┌────────────────────────────────────────────────────────────┐ │    │
│  │  │                      Load Balancer                          │ │    │
│  │  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────────┐│ │    │
│  │  │  │ API     │  │ API     │  │ Webhook │  │ Static          ││ │    │
│  │  │  │ Server 1│  │ Server 2│  │ Handler │  │ Assets          ││ │    │
│  │  │  └─────────┘  └─────────┘  └─────────┘  └─────────────────┘│ │    │
│  │  └────────────────────────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 9.2 Nginx Configuration

```nginx
# API Gateway Configuration
upstream api_backend {
    least_conn;
    server 127.0.0.1:3000 weight=5;
    server 127.0.0.1:3001 weight=5;
    keepalive 32;
}

server {
    listen 443 ssl http2;
    server_name api.smartacademy.edu.bd;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/smartacademy.edu.bd/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/smartacademy.edu.bd/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Request Size Limits
    client_max_body_size 10M;
    client_body_buffer_size 128k;

    # Rate Limiting Zone
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=60r/m;
    limit_req zone=api_limit burst=10 nodelay;

    # API Routes
    location /api/ {
        proxy_pass http://api_backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Connection "";
        proxy_connect_timeout 5s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health Check
    location /health {
        access_log off;
        return 200 "OK";
        add_header Content-Type text/plain;
    }
}
```

---

## 10. Performance Optimization

### 10.1 Caching Strategy

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        CACHING LAYERS                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Layer 1: CDN Cache (CloudFlare)                                        │
│  ├── Static assets: 1 year                                              │
│  ├── API responses: 5 minutes (public endpoints only)                   │
│  └── Edge locations: Global                                             │
│                                                                          │
│  Layer 2: Nginx Cache (Proxy Cache)                                     │
│  ├── Static files: 1 day                                                │
│  ├── Gzip compression: Enabled                                          │
│  └── Cache key: $request_uri                                            │
│                                                                          │
│  Layer 3: Redis Cache (Application Cache)                               │
│  ├── Session data: 24 hours                                             │
│  ├── Frequently accessed data: 5-30 minutes                             │
│  ├── Query results: 1-5 minutes                                         │
│  └── Rate limit counters: 1 minute                                      │
│                                                                          │
│  Layer 4: Database Query Cache                                          │
│  ├── Prisma query cache: Enabled                                        │
│  └── PostgreSQL shared_buffers: Optimized                               │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 10.2 Cache Headers

```http
# Public cacheable responses
Cache-Control: public, max-age=300, s-maxage=600
ETag: "abc123"
Last-Modified: Sat, 10 Jan 2026 08:00:00 GMT

# Private/authenticated responses
Cache-Control: private, no-cache, no-store, must-revalidate
Pragma: no-cache
Expires: 0

# Static assets
Cache-Control: public, max-age=31536000, immutable
```

### 10.3 Response Compression

```typescript
// Fastify compression configuration
fastify.register(compression, {
  global: true,
  encodings: ['gzip', 'br', 'deflate'],
  threshold: 1024, // Minimum bytes to compress
  brotliOptions: {
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 4
    }
  },
  zlibOptions: {
    level: 6
  }
});
```

### 10.4 Database Optimization

| Optimization | Implementation |
|--------------|----------------|
| Connection Pooling | Prisma connection pool: min=5, max=20 |
| Query Optimization | Indexed queries, selective field loading |
| Pagination | Cursor-based for large datasets |
| Batch Operations | Bulk inserts/updates where applicable |
| Read Replicas | PostgreSQL streaming replication (future) |

---

## 11. API Documentation Standards

### 11.1 OpenAPI Specification

All APIs are documented using **OpenAPI 3.1** specification:

```yaml
openapi: 3.1.0
info:
  title: Smart Academy API
  description: |
    RESTful API for Smart Academy Digital Portal.

    ## Authentication
    All authenticated endpoints require a Bearer token in the Authorization header.

    ## Rate Limiting
    API requests are rate limited. See response headers for current limits.
  version: 1.0.0
  contact:
    name: Smart Academy Development Team
    email: dev@smartacademy.edu.bd
  license:
    name: Proprietary
    url: https://smartacademy.edu.bd/terms

servers:
  - url: https://api.smartacademy.edu.bd/v1
    description: Production
  - url: https://api.staging.smartacademy.edu.bd/v1
    description: Staging
  - url: http://localhost:3000/api/v1
    description: Local Development

tags:
  - name: Authentication
    description: User authentication and authorization
  - name: Students
    description: Student management operations
  - name: Teachers
    description: Teacher management operations
  - name: Attendance
    description: Attendance tracking operations
  - name: Grades
    description: Grade management operations
  - name: Payments
    description: Payment processing operations
```

### 11.2 Documentation Tools

| Tool | Purpose |
|------|---------|
| **Swagger UI** | Interactive API documentation |
| **Redoc** | Developer-friendly documentation |
| **Postman Collection** | API testing and examples |
| **OpenAPI Generator** | SDK generation |

### 11.3 Documentation URL

```
Production:  https://api.smartacademy.edu.bd/docs
Staging:     https://api.staging.smartacademy.edu.bd/docs
Development: http://localhost:3000/docs
```

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | January 10, 2026 | Development Team | Initial API Design Document |

---

## References

- [Azure REST API Design Best Practices](https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design)
- [RESTful API Design Best Practices](https://restfulapi.net/rest-api-best-practices/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [API Versioning Best Practices](https://www.docuwriter.ai/posts/api-versioning-best-practices)
- [Smart Academy Technology Stack v1.0](../Technology/TECH_Technology_Stack_v1.0.md)

---

*End of API Design Document*
