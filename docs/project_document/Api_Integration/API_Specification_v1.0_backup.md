# API Specification v1.0

**Project:** Smart Academy Digital Portal  
**Document Type:** API Specification  
**Version:** 1.0  
**Last Updated:** 2026-01-10  
**Status:** Draft  

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-10 | Documentation Team | Initial version - Complete API specification |

---

## Table of Contents

1. [Document Header](#document-header)
2. [OpenAPI Specification Overview](#openapi-specification-overview)
3. [Authentication Endpoints](#authentication-endpoints)
4. [User Management Endpoints](#user-management-endpoints)
5. [Student Endpoints](#student-endpoints)
6. [Teacher Endpoints](#teacher-endpoints)
7. [Parent Endpoints](#parent-endpoints)
8. [Attendance Endpoints](#attendance-endpoints)
9. [Grade Endpoints](#grade-endpoints)
10. [Islamic Education Endpoints](#islamic-education-endpoints)
11. [Payment Endpoints](#payment-endpoints)
12. [Notification Endpoints](#notification-endpoints)
13. [Gibbon Integration Endpoints](#gibbon-integration-endpoints)
14. [Moodle Integration Endpoints](#moodle-integration-endpoints)
15. [Request/Response Schemas](#requestresponse-schemas)
16. [Authentication Requirements](#authentication-requirements)
17. [Example Requests](#example-requests)
18. [Appendix](#appendix)

---

## OpenAPI Specification Overview

### OpenAPI Version
This API specification follows **OpenAPI 3.0.3** standards.

### Base URL Structure

| Environment | Base URL |
|-------------|-----------|
| **Development** | `http://localhost:3000/api/v1` |
| **Staging** | `https://staging-api.smartacademy.edu/api/v1` |
| **Production** | `https://api.smartacademy.edu/api/v1` |

### Authentication Scheme

The API uses **JWT Bearer Token** authentication for protected endpoints.

**Security Scheme Definition:**
```yaml
securitySchemes:
  bearerAuth:
    type: http
    scheme: bearer
    bearerFormat: JWT
    description: JWT Bearer token authentication
```

### Content Types

| Content Type | Usage |
|--------------|--------|
| `application/json` | Request and response bodies (default) |
| `application/vnd.smartacademy.v1+json` | Versioned content negotiation |
| `multipart/form-data` | File uploads |

### Standard Response Headers

| Header | Description | Example |
|---------|-------------|---------|
| `Content-Type` | Media type of response body | `application/json` |
| `X-Request-ID` | Unique request identifier | `550e8400-e29b-41d4-a716-446655440000` |
| `X-Response-Time` | Response processing time in milliseconds | `45ms` |
| `X-RateLimit-Limit` | Maximum requests allowed in window | `1000` |
| `X-RateLimit-Remaining` | Remaining requests in window | `995` |
| `X-RateLimit-Reset` | Unix timestamp when limit resets | `1704873600` |
| `X-Cache` | Cache status (HIT/MISS) | `HIT` |

### Standard Request Headers

| Header | Required | Description | Example |
|---------|----------|-------------|---------|
| `Content-Type` | Conditional | Media type of request body | `application/json` |
| `Authorization` | Conditional | Bearer token for authentication | `Bearer eyJhbGciOiJSUzI1NiIs...` |
| `X-Request-ID` | Recommended | Unique request identifier | `550e8400-e29b-41d4-a716-446655440000` |
| `X-Client-Version` | Recommended | Client application version | `1.0.0` |
| `Accept` | Optional | Expected response format | `application/json` |
| `Accept-Language` | Optional | Preferred language for response | `en-US` |

---

## Authentication Endpoints

### POST /api/v1/auth/login

Authenticates a user and returns JWT tokens.

**Endpoint:** `POST /api/v1/auth/login`  
**Authentication:** Not required  
**Rate Limit:** 10 requests/minute

#### Request Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Content-Type` | string | Yes | Must be `application/json` |
| `X-Request-ID` | string | Recommended | Unique request identifier |

#### Request Body Schema

```json
{
  "email": "string (required, email format)",
  "password": "string (required, min 8 characters)",
  "remember_me": "boolean (optional, default: false)"
}
```

#### Request Body Example

```json
{
  "email": "student@smartacademy.edu",
  "password": "SecurePass123!",
  "remember_me": true
}
```

#### Response Schema

**200 OK - Login Successful**

```json
{
  "success": true,
  "data": {
    "access_token": "string (JWT access token)",
    "refresh_token": "string (JWT refresh token)",
    "token_type": "Bearer",
    "expires_in": 900,
    "user": {
      "id": "string (UUID)",
      "email": "string",
      "first_name": "string",
      "last_name": "string",
      "role": "string",
      "mfa_enabled": "boolean",
      "mfa_verified": "boolean"
    }
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

**400 Bad Request - Invalid Input**

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed for one or more fields",
    "details": [
      {
        "field": "email",
        "message": "Email is required",
        "code": "VALIDATION_REQUIRED_FIELD"
      }
    ],
    "request_id": "string (UUID)",
    "timestamp": "string (ISO 8601)"
  }
}
```

**401 Unauthorized - Invalid Credentials**

```json
{
  "success": false,
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "Invalid email or password",
    "request_id": "string (UUID)",
    "timestamp": "string (ISO 8601)"
  }
}
```

**422 Unprocessable Entity - MFA Required**

```json
{
  "success": false,
  "error": {
    "code": "AUTH_MFA_REQUIRED",
    "message": "Multi-factor authentication is required",
    "details": {
      "otp_id": "string (UUID)",
      "mfa_method": "sms"
    },
    "request_id": "string (UUID)",
    "timestamp": "string (ISO 8601)"
  }
}
```

**500 Internal Server Error**

```json
{
  "success": false,
  "error": {
    "code": "SYSTEM_ERROR",
    "message": "An unexpected error occurred",
    "request_id": "string (UUID)",
    "timestamp": "string (ISO 8601)"
  }
}
```

---

### POST /api/v1/auth/refresh

Refreshes an expired access token using a valid refresh token.

**Endpoint:** `POST /api/v1/auth/refresh`  
**Authentication:** Not required (refresh token in cookie or body)  
**Rate Limit:** 20 requests/minute

#### Request Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Content-Type` | string | Yes | Must be `application/json` |
| `Cookie` | string | Conditional | Contains refresh_token if using cookie-based auth |

#### Request Body Schema

```json
{
  "refresh_token": "string (required if not in cookie)"
}
```

#### Request Body Example

```json
{
  "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Response Schema

**200 OK - Token Refreshed**

```json
{
  "success": true,
  "data": {
    "access_token": "string (JWT access token)",
    "token_type": "Bearer",
    "expires_in": 900
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

**401 Unauthorized - Invalid Refresh Token**

```json
{
  "success": false,
  "error": {
    "code": "REFRESH_TOKEN_INVALID",
    "message": "Invalid or expired refresh token",
    "request_id": "string (UUID)",
    "timestamp": "string (ISO 8601)"
  }
}
```

**422 Unprocessable Entity - Missing Refresh Token**

```json
{
  "success": false,
  "error": {
    "code": "REFRESH_TOKEN_MISSING",
    "message": "Refresh token is required",
    "request_id": "string (UUID)",
    "timestamp": "string (ISO 8601)"
  }
}
```

---

### POST /api/v1/auth/logout

Logs out the current user and invalidates tokens.

**Endpoint:** `POST /api/v1/auth/logout`  
**Authentication:** Required (JWT Bearer)  
**Rate Limit:** 30 requests/minute

#### Request Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Authorization` | string | Yes | Bearer token |
| `Content-Type` | string | Yes | Must be `application/json` |

#### Request Body Schema

```json
{
  "refresh_token": "string (optional)"
}
```

#### Request Body Example

```json
{
  "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Response Schema

**200 OK - Logout Successful**

```json
{
  "success": true,
  "data": {
    "message": "Successfully logged out"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

**401 Unauthorized**

```json
{
  "success": false,
  "error": {
    "code": "AUTH_UNAUTHENTICATED",
    "message": "Authentication required",
    "request_id": "string (UUID)",
    "timestamp": "string (ISO 8601)"
  }
}
```

---

### POST /api/v1/auth/forgot-password

Initiates password reset process by sending reset link to user's email.

**Endpoint:** `POST /api/v1/auth/forgot-password`  
**Authentication:** Not required  
**Rate Limit:** 5 requests/hour per email

#### Request Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Content-Type` | string | Yes | Must be `application/json` |

#### Request Body Schema

```json
{
  "email": "string (required, email format)"
}
```

#### Request Body Example

```json
{
  "email": "student@smartacademy.edu"
}
```

#### Response Schema

**200 OK - Reset Email Sent**

```json
{
  "success": true,
  "data": {
    "message": "Password reset link sent to your email"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

**400 Bad Request - Invalid Email**

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email address",
    "details": [
      {
        "field": "email",
        "message": "Email must be a valid email address",
        "code": "VALIDATION_EMAIL_FORMAT"
      }
    ],
    "request_id": "string (UUID)",
    "timestamp": "string (ISO 8601)"
  }
}
```

**404 Not Found - Email Not Registered**

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "No account found with this email address",
    "request_id": "string (UUID)",
    "timestamp": "string (ISO 8601)"
  }
}
```

**429 Too Many Requests**

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 3600

{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many password reset attempts. Please try again later."
  }
}
```

---

### POST /api/v1/auth/reset-password

Resets user password using a valid reset token.

**Endpoint:** `POST /api/v1/auth/reset-password`  
**Authentication:** Not required  
**Rate Limit:** 10 requests/hour

#### Request Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Content-Type` | string | Yes | Must be `application/json` |

#### Request Body Schema

```json
{
  "token": "string (required, password reset token)",
  "password": "string (required, min 8 characters)",
  "confirm_password": "string (required, must match password)"
}
```

#### Request Body Example

```json
{
  "token": "abc123def456...",
  "password": "NewSecurePass123!",
  "confirm_password": "NewSecurePass123!"
}
```

#### Response Schema

**200 OK - Password Reset Successful**

```json
{
  "success": true,
  "data": {
    "message": "Password reset successfully"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

**400 Bad Request - Passwords Don't Match**

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Passwords do not match",
    "details": [
      {
        "field": "confirm_password",
        "message": "Password confirmation does not match",
        "code": "VALIDATION_PASSWORD_MISMATCH"
      }
    ],
    "request_id": "string (UUID)",
    "timestamp": "string (ISO 8601)"
  }
}
```

**400 Bad Request - Invalid Token**

```json
{
  "success": false,
  "error": {
    "code": "AUTH_INVALID_TOKEN",
    "message": "Invalid or expired password reset token",
    "request_id": "string (UUID)",
    "timestamp": "string (ISO 8601)"
  }
}
```

---

### POST /api/v1/auth/verify-mfa

Verifies multi-factor authentication code.

**Endpoint:** `POST /api/v1/auth/verify-mfa`  
**Authentication:** Not required  
**Rate Limit:** 5 attempts per OTP

#### Request Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Content-Type` | string | Yes | Must be `application/json` |

#### Request Body Schema

```json
{
  "otp_id": "string (required, UUID)",
  "otp_code": "string (required, 6 digits)"
}
```

#### Request Body Example

```json
{
  "otp_id": "550e8400-e29b-41d4-a716-446655440000",
  "otp_code": "123456"
}
```

#### Response Schema

**200 OK - MFA Verified**

```json
{
  "success": true,
  "data": {
    "access_token": "string (JWT access token)",
    "refresh_token": "string (JWT refresh token)",
    "token_type": "Bearer",
    "expires_in": 900,
    "user": {
      "id": "string (UUID)",
      "email": "string",
      "first_name": "string",
      "last_name": "string",
      "role": "string"
    }
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

**400 Bad Request - Invalid OTP**

```json
{
  "success": false,
  "error": {
    "code": "AUTH_INVALID_OTP",
    "message": "Invalid verification code",
    "details": {
      "attempts_remaining": 2
    },
    "request_id": "string (UUID)",
    "timestamp": "string (ISO 8601)"
  }
}
```

**400 Bad Request - Maximum Attempts Exceeded**

```json
{
  "success": false,
  "error": {
    "code": "AUTH_OTP_ATTEMPTS_EXCEEDED",
    "message": "Maximum verification attempts exceeded. Please request a new code.",
    "request_id": "string (UUID)",
    "timestamp": "string (ISO 8601)"
  }
}
```

**410 Gone - OTP Expired**

```json
{
  "success": false,
  "error": {
    "code": "AUTH_OTP_EXPIRED",
    "message": "Verification code has expired. Please request a new code.",
    "request_id": "string (UUID)",
    "timestamp": "string (ISO 8601)"
  }
}
```

---

## User Management Endpoints

### GET /api/v1/users

Retrieves a paginated list of users.

**Endpoint:** `GET /api/v1/users`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `users:read`  
**Rate Limit:** 100 requests/minute

#### Request Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Authorization` | string | Yes | Bearer token |
| `Accept` | string | Optional | Expected response format |

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number (1-indexed) |
| `limit` | integer | 20 | Items per page (max 100) |
| `search` | string | - | Search by name or email |
| `role` | string | - | Filter by user role |
| `status` | string | - | Filter by status (active/inactive) |
| `sort` | string | created_at:desc | Sort field and direction |
| `fields` | string | - | Comma-separated fields to return |

#### Request Example

```http
GET /api/v1/users?page=1&limit=20&role=student&status=active&sort=last_name:asc
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
X-Request-ID: 550e8400-e29b-41d4-a716-446655440000
```

#### Response Schema

**200 OK - Users Retrieved**

```json
{
  "success": true,
  "data": [
    {
      "id": "string (UUID)",
      "email": "string",
      "first_name": "string",
      "last_name": "string",
      "role": "string",
      "status": "string",
      "created_at": "string (ISO 8601)",
      "updated_at": "string (ISO 8601)"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "total_pages": 8,
    "has_next": true,
    "has_prev": false
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

**401 Unauthorized**

```json
{
  "success": false,
  "error": {
    "code": "AUTH_UNAUTHENTICATED",
    "message": "Authentication required",
    "request_id": "string (UUID)",
    "timestamp": "string (ISO 8601)"
  }
}
```

**403 Forbidden**

```json
{
  "success": false,
  "error": {
    "code": "AUTHZ_INSUFFICIENT_PERMISSIONS",
    "message": "You do not have permission to access this resource",
    "details": {
      "required_permission": "users:read",
      "user_permissions": ["read:profile"]
    },
    "request_id": "string (UUID)",
    "timestamp": "string (ISO 8601)"
  }
}
```

---

### GET /api/v1/users/:id

Retrieves details of a specific user.

**Endpoint:** `GET /api/v1/users/:id`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `users:read` or `read:own_profile`  
**Rate Limit:** 100 requests/minute

#### Request Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Authorization` | string | Yes | Bearer token |

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (UUID) | Yes | User ID |

#### Request Example

```http
GET /api/v1/users/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

#### Response Schema

**200 OK - User Retrieved**

```json
{
  "success": true,
  "data": {
    "id": "string (UUID)",
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "phone": "string",
    "role": "string",
    "status": "string",
    "avatar_url": "string",
    "created_at": "string (ISO 8601)",
    "updated_at": "string (ISO 8601)",
    "last_login": "string (ISO 8601)"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

**404 Not Found**

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "User not found",
    "request_id": "string (UUID)",
    "timestamp": "string (ISO 8601)"
  }
}
```

---

### POST /api/v1/users

Creates a new user account.

**Endpoint:** `POST /api/v1/users`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `users:write`  
**Rate Limit:** 50 requests/minute

#### Request Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Authorization` | string | Yes | Bearer token |
| `Content-Type` | string | Yes | Must be `application/json` |

#### Request Body Schema

```json
{
  "email": "string (required, email format)",
  "password": "string (required, min 8 characters)",
  "first_name": "string (required, 2-50 characters)",
  "last_name": "string (required, 2-50 characters)",
  "phone": "string (required, phone format)",
  "role": "string (required, enum)",
  "status": "string (optional, default: active)"
}
```

#### Request Body Example

```json
{
  "email": "new.user@smartacademy.edu",
  "password": "SecurePass123!",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+8801712345678",
  "role": "teacher",
  "status": "active"
}
```

#### Response Schema

**201 Created - User Created**

```json
{
  "success": true,
  "data": {
    "id": "string (UUID)",
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "role": "string",
    "status": "string",
    "created_at": "string (ISO 8601)"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

**409 Conflict - Email Already Exists**

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_CONFLICT",
    "message": "User with this email already exists",
    "details": {
      "field": "email",
      "value": "new.user@smartacademy.edu"
    },
    "request_id": "string (UUID)",
    "timestamp": "string (ISO 8601)"
  }
}
```

**422 Unprocessable Entity - Validation Error**

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed for one or more fields",
    "details": [
      {
        "field": "password",
        "message": "Password must be at least 8 characters",
        "code": "VALIDATION_MIN_LENGTH"
      }
    ],
    "request_id": "string (UUID)",
    "timestamp": "string (ISO 8601)"
  }
}
```

---

### PUT /api/v1/users/:id

Updates an existing user.

**Endpoint:** `PUT /api/v1/users/:id`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `users:write` or `update:own_profile`  
**Rate Limit:** 50 requests/minute

#### Request Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Authorization` | string | Yes | Bearer token |
| `Content-Type` | string | Yes | Must be `application/json` |

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (UUID) | Yes | User ID |

#### Request Body Schema

```json
{
  "first_name": "string (optional, 2-50 characters)",
  "last_name": "string (optional, 2-50 characters)",
  "phone": "string (optional, phone format)",
  "status": "string (optional)",
  "role": "string (optional, requires admin permission)"
}
```

#### Request Body Example

```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "phone": "+8801812345678",
  "status": "active"
}
```

#### Response Schema

**200 OK - User Updated**

```json
{
  "success": true,
  "data": {
    "id": "string (UUID)",
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "phone": "string",
    "role": "string",
    "status": "string",
    "updated_at": "string (ISO 8601)"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### DELETE /api/v1/users/:id

Deletes a user account.

**Endpoint:** `DELETE /api/v1/users/:id`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `users:delete`  
**Rate Limit:** 20 requests/minute

#### Request Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Authorization` | string | Yes | Bearer token |

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (UUID) | Yes | User ID |

#### Request Example

```http
DELETE /api/v1/users/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

#### Response Schema

**200 OK - User Deleted**

```json
{
  "success": true,
  "data": {
    "message": "User deleted successfully",
    "id": "string (UUID)"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

**403 Forbidden - Cannot Delete Self**

```json
{
  "success": false,
  "error": {
    "code": "AUTHZ_FORBIDDEN",
    "message": "You cannot delete your own account",
    "request_id": "string (UUID)",
    "timestamp": "string (ISO 8601)"
  }
}
```

---

### GET /api/v1/users/:id/profile

Retrieves user profile information.

**Endpoint:** `GET /api/v1/users/:id/profile`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `users:read` or `read:own_profile`  
**Rate Limit:** 100 requests/minute

#### Request Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Authorization` | string | Yes | Bearer token |

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (UUID) | Yes | User ID |

#### Response Schema

**200 OK - Profile Retrieved**

```json
{
  "success": true,
  "data": {
    "id": "string (UUID)",
    "user_id": "string (UUID)",
    "avatar_url": "string",
    "bio": "string",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "postal_code": "string",
      "country": "string"
    },
    "emergency_contact": {
      "name": "string",
      "phone": "string",
      "relationship": "string"
    },
    "preferences": {
      "language": "string",
      "timezone": "string",
      "notification_email": "boolean",
      "notification_sms": "boolean",
      "notification_push": "boolean"
    },
    "updated_at": "string (ISO 8601)"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### PUT /api/v1/users/:id/profile

Updates user profile information.

**Endpoint:** `PUT /api/v1/users/:id/profile`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `users:write` or `update:own_profile`  
**Rate Limit:** 50 requests/minute

#### Request Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Authorization` | string | Yes | Bearer token |
| `Content-Type` | string | Yes | Must be `application/json` |

#### Request Body Schema

```json
{
  "avatar_url": "string (optional)",
  "bio": "string (optional, max 500 characters)",
  "address": {
    "street": "string (optional)",
    "city": "string (optional)",
    "state": "string (optional)",
    "postal_code": "string (optional)",
    "country": "string (optional)"
  },
  "emergency_contact": {
    "name": "string (optional)",
    "phone": "string (optional)",
    "relationship": "string (optional)"
  },
  "preferences": {
    "language": "string (optional)",
    "timezone": "string (optional)",
    "notification_email": "boolean (optional)",
    "notification_sms": "boolean (optional)",
    "notification_push": "boolean (optional)"
  }
}
```

#### Request Body Example

```json
{
  "bio": "Passionate educator with 10 years of experience",
  "address": {
    "street": "123 Education Street",
    "city": "Dhaka",
    "state": "Dhaka",
    "postal_code": "1000",
    "country": "Bangladesh"
  },
  "preferences": {
    "language": "en",
    "timezone": "Asia/Dhaka",
    "notification_email": true,
    "notification_sms": false,
    "notification_push": true
  }
}
```

#### Response Schema

**200 OK - Profile Updated**

```json
{
  "success": true,
  "data": {
    "id": "string (UUID)",
    "user_id": "string (UUID)",
    "avatar_url": "string",
    "bio": "string",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "postal_code": "string",
      "country": "string"
    },
    "emergency_contact": {
      "name": "string",
      "phone": "string",
      "relationship": "string"
    },
    "preferences": {
      "language": "string",
      "timezone": "string",
      "notification_email": "boolean",
      "notification_sms": "boolean",
      "notification_push": "boolean"
    },
    "updated_at": "string (ISO 8601)"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

## Student Endpoints

### GET /api/v1/students

Retrieves a paginated list of students.

**Endpoint:** `GET /api/v1/students`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `students:read`  
**Rate Limit:** 100 requests/minute

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number (1-indexed) |
| `limit` | integer | 20 | Items per page (max 100) |
| `search` | string | - | Search by name or student ID |
| `class_id` | string | - | Filter by class ID |
| `section` | string | - | Filter by section (A, B, C) |
| `status` | string | - | Filter by status |
| `sort` | string | last_name:asc | Sort field and direction |
| `fields` | string | - | Comma-separated fields to return |

#### Request Example

```http
GET /api/v1/students?page=1&limit=20&class_id=class_10&section=A&status=active
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

#### Response Schema

**200 OK - Students Retrieved**

```json
{
  "success": true,
  "data": [
    {
      "id": "string (UUID)",
      "student_id": "string",
      "user_id": "string (UUID)",
      "first_name": "string",
      "last_name": "string",
      "email": "string",
      "phone": "string",
      "date_of_birth": "string (ISO 8601 date)",
      "gender": "string",
      "blood_group": "string",
      "class_id": "string",
      "section": "string",
      "roll_number": "string",
      "admission_date": "string (ISO 8601 date)",
      "status": "string",
      "parent_id": "string (UUID)",
      "avatar_url": "string",
      "created_at": "string (ISO 8601)",
      "updated_at": "string (ISO 8601)"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "total_pages": 3,
    "has_next": true,
    "has_prev": false
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### GET /api/v1/students/:id

Retrieves details of a specific student.

**Endpoint:** `GET /api/v1/students/:id`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `students:read` or `read:own_student_data`  
**Rate Limit:** 100 requests/minute

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (UUID) | Yes | Student ID |

#### Response Schema

**200 OK - Student Retrieved**

```json
{
  "success": true,
  "data": {
    "id": "string (UUID)",
    "student_id": "string",
    "user_id": "string (UUID)",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "phone": "string",
    "date_of_birth": "string (ISO 8601 date)",
    "gender": "string",
    "blood_group": "string",
    "class_id": "string",
    "section": "string",
    "roll_number": "string",
    "admission_date": "string (ISO 8601 date)",
    "status": "string",
    "parent_id": "string (UUID)",
    "avatar_url": "string",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "postal_code": "string",
      "country": "string"
    },
    "medical_info": {
      "allergies": ["string"],
      "chronic_conditions": ["string"],
      "medications": ["string"],
      "emergency_notes": "string"
    },
    "created_at": "string (ISO 8601)",
    "updated_at": "string (ISO 8601)"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### POST /api/v1/students

Creates a new student record.

**Endpoint:** `POST /api/v1/students`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `students:write`  
**Rate Limit:** 50 requests/minute

#### Request Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Authorization` | string | Yes | Bearer token |
| `Content-Type` | string | Yes | Must be `application/json` |

#### Request Body Schema

```json
{
  "first_name": "string (required, 2-50 characters)",
  "last_name": "string (required, 2-50 characters)",
  "email": "string (required, email format)",
  "phone": "string (required, phone format)",
  "date_of_birth": "string (required, ISO 8601 date)",
  "gender": "string (required, enum: male/female/other)",
  "blood_group": "string (optional)",
  "class_id": "string (required)",
  "section": "string (required, enum: A/B/C)",
  "roll_number": "string (optional)",
  "admission_date": "string (optional, ISO 8601 date)",
  "parent_id": "string (required, UUID)",
  "address": {
    "street": "string (optional)",
    "city": "string (optional)",
    "state": "string (optional)",
    "postal_code": "string (optional)",
    "country": "string (optional)"
  },
  "medical_info": {
    "allergies": ["string (optional)"],
    "chronic_conditions": ["string (optional)"],
    "medications": ["string (optional)"],
    "emergency_notes": "string (optional)"
  }
}
```

#### Request Body Example

```json
{
  "first_name": "Ahmed",
  "last_name": "Rahman",
  "email": "ahmed.rahman@example.com",
  "phone": "+8801712345678",
  "date_of_birth": "2010-05-15",
  "gender": "male",
  "blood_group": "O+",
  "class_id": "class_10",
  "section": "A",
  "roll_number": "15",
  "admission_date": "2024-01-01",
  "parent_id": "550e8400-e29b-41d4-a716-446655440000",
  "address": {
    "street": "123 Main Street",
    "city": "Dhaka",
    "state": "Dhaka",
    "postal_code": "1000",
    "country": "Bangladesh"
  },
  "medical_info": {
    "allergies": ["Peanuts"],
    "emergency_notes": "No chronic conditions"
  }
}
```

#### Response Schema

**201 Created - Student Created**

```json
{
  "success": true,
  "data": {
    "id": "string (UUID)",
    "student_id": "string",
    "user_id": "string (UUID)",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "class_id": "string",
    "section": "string",
    "roll_number": "string",
    "status": "active",
    "created_at": "string (ISO 8601)"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### PUT /api/v1/students/:id

Updates an existing student record.

**Endpoint:** `PUT /api/v1/students/:id`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `students:write`  
**Rate Limit:** 50 requests/minute

#### Request Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Authorization` | string | Yes | Bearer token |
| `Content-Type` | string | Yes | Must be `application/json` |

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (UUID) | Yes | Student ID |

#### Request Body Schema

```json
{
  "first_name": "string (optional, 2-50 characters)",
  "last_name": "string (optional, 2-50 characters)",
  "email": "string (optional, email format)",
  "phone": "string (optional, phone format)",
  "date_of_birth": "string (optional, ISO 8601 date)",
  "gender": "string (optional, enum: male/female/other)",
  "blood_group": "string (optional)",
  "class_id": "string (optional)",
  "section": "string (optional, enum: A/B/C)",
  "roll_number": "string (optional)",
  "status": "string (optional)",
  "address": {
    "street": "string (optional)",
    "city": "string (optional)",
    "state": "string (optional)",
    "postal_code": "string (optional)",
    "country": "string (optional)"
  },
  "medical_info": {
    "allergies": ["string (optional)"],
    "chronic_conditions": ["string (optional)"],
    "medications": ["string (optional)"],
    "emergency_notes": "string (optional)"
  }
}
```

#### Response Schema

**200 OK - Student Updated**

```json
{
  "success": true,
  "data": {
    "id": "string (UUID)",
    "student_id": "string",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "class_id": "string",
    "section": "string",
    "roll_number": "string",
    "status": "string",
    "updated_at": "string (ISO 8601)"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### DELETE /api/v1/students/:id

Deletes a student record.

**Endpoint:** `DELETE /api/v1/students/:id`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `students:delete`  
**Rate Limit:** 20 requests/minute

#### Request Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Authorization` | string | Yes | Bearer token |

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (UUID) | Yes | Student ID |

#### Response Schema

**200 OK - Student Deleted**

```json
{
  "success": true,
  "data": {
    "message": "Student deleted successfully",
    "id": "string (UUID)"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### GET /api/v1/students/:id/attendance

Retrieves attendance records for a specific student.

**Endpoint:** `GET /api/v1/students/:id/attendance`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `students:read` or `read:own_attendance`  
**Rate Limit:** 100 requests/minute

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `from_date` | string | - | Start date (ISO 8601) |
| `to_date` | string | - | End date (ISO 8601) |
| `page` | integer | 1 | Page number |
| `limit` | integer | 20 | Items per page |

#### Request Example

```http
GET /api/v1/students/550e8400-e29b-41d4-a716-446655440000/attendance?from_date=2024-01-01&to_date=2024-01-31
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

#### Response Schema

**200 OK - Attendance Retrieved**

```json
{
  "success": true,
  "data": [
    {
      "id": "string (UUID)",
      "student_id": "string (UUID)",
      "date": "string (ISO 8601 date)",
      "status": "string (enum: present/absent/late/excused)",
      "check_in_time": "string (ISO 8601 time)",
      "check_out_time": "string (ISO 8601 time)",
      "notes": "string",
      "marked_by": "string (UUID)",
      "created_at": "string (ISO 8601)"
    }
  ],
  "summary": {
    "total_days": 22,
    "present": 18,
    "absent": 2,
    "late": 1,
    "excused": 1,
    "attendance_percentage": 81.8
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 22,
    "total_pages": 2
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### GET /api/v1/students/:id/grades

Retrieves grade records for a specific student.

**Endpoint:** `GET /api/v1/students/:id/grades`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `students:read` or `read:own_grades`  
**Rate Limit:** 100 requests/minute

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `subject_id` | string | - | Filter by subject ID |
| `exam_id` | string | - | Filter by exam ID |
| `term` | string | - | Filter by term |
| `academic_year` | string | - | Filter by academic year |
| `page` | integer | 1 | Page number |
| `limit` | integer | 20 | Items per page |

#### Request Example

```http
GET /api/v1/students/550e8400-e29b-41d4-a716-446655440000/grades?term=1&academic_year=2024
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

#### Response Schema

**200 OK - Grades Retrieved**

```json
{
  "success": true,
  "data": [
    {
      "id": "string (UUID)",
      "student_id": "string (UUID)",
      "subject_id": "string",
      "subject_name": "string",
      "exam_id": "string",
      "exam_name": "string",
      "term": "string",
      "academic_year": "string",
      "marks_obtained": "number",
      "total_marks": "number",
      "percentage": "number",
      "grade": "string",
      "gpa": "number",
      "remarks": "string",
      "graded_by": "string (UUID)",
      "graded_at": "string (ISO 8601)"
    }
  ],
  "summary": {
    "total_subjects": 8,
    "overall_gpa": 3.8,
    "overall_percentage": 85.5,
    "class_rank": 5,
    "total_students": 45
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 8,
    "total_pages": 1
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### GET /api/v1/students/:id/timetable

Retrieves timetable for a specific student.

**Endpoint:** `GET /api/v1/students/:id/timetable`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `students:read` or `read:own_timetable`  
**Rate Limit:** 100 requests/minute

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `day` | string | - | Filter by day (Monday-Sunday) |
| `week` | string | current | Filter by week |

#### Request Example

```http
GET /api/v1/students/550e8400-e29b-41d4-a716-446655440000/timetable?day=Monday
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

#### Response Schema

**200 OK - Timetable Retrieved**

```json
{
  "success": true,
  "data": {
    "student_id": "string (UUID)",
    "class_id": "string",
    "section": "string",
    "week_of": "string (ISO 8601 date)",
    "schedule": [
      {
        "day": "Monday",
        "periods": [
          {
            "period": 1,
            "start_time": "08:00:00",
            "end_time": "08:45:00",
            "subject": "Mathematics",
            "subject_id": "string",
            "teacher": "John Doe",
            "teacher_id": "string (UUID)",
            "room": "Room 101"
          }
        ]
      }
    ]
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### GET /api/v1/students/:id/islamic-progress

Retrieves Islamic education progress for a specific student.

**Endpoint:** `GET /api/v1/students/:id/islamic-progress`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `students:read` or `read:own_islamic_progress`  
**Rate Limit:** 100 requests/minute

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | string | - | Filter by type (quran/hafiz/tajweed/hadith) |
| `academic_year` | string | current | Filter by academic year |

#### Request Example

```http
GET /api/v1/students/550e8400-e29b-41d4-a716-446655440000/islamic-progress?academic_year=2024
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

#### Response Schema

**200 OK - Islamic Progress Retrieved**

```json
{
  "success": true,
  "data": {
    "student_id": "string (UUID)",
    "student_name": "string",
    "academic_year": "string",
    "quran_progress": {
      "surahs_completed": 15,
      "total_surahs": 114,
      "verses_memorized": 250,
      "current_surah": "Al-Baqarah",
      "current_verse": 50,
      "last_assessment_date": "string (ISO 8601)",
      "teacher_notes": "string"
    },
    "hafiz_progress": {
      "is_hafiz": false,
      "juz_completed": 5,
      "total_juz": 30,
      "completion_percentage": 16.7,
      "estimated_completion_date": "string (ISO 8601 date)"
    },
    "tajweed_progress": {
      "level": "Intermediate",
      "rules_mastered": 12,
      "total_rules": 20,
      "last_assessment_score": 85,
      "assessment_date": "string (ISO 8601)"
    },
    "hadith_progress": {
      "hadiths_memorized": 20,
      "total_target": 50,
      "current_collection": "Sahih Al-Bukhari",
      "last_assessment_date": "string (ISO 8601)"
    },
    "prayer_attendance": {
      "total_prayers": 300,
      "prayers_attended": 280,
      "attendance_percentage": 93.3
    }
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

## Teacher Endpoints

### GET /api/v1/teachers

Retrieves a list of teachers.

**Endpoint:** `GET /api/v1/teachers`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `teachers:read`  
**Rate Limit:** 100 requests/minute

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 20 | Items per page |
| `search` | string | - | Search by name or email |
| `subject_id` | string | - | Filter by subject ID |
| `status` | string | - | Filter by status |

#### Request Example

```http
GET /api/v1/teachers?page=1&limit=20&status=active
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

#### Response Schema

**200 OK - Teachers Retrieved**

```json
{
  "success": true,
  "data": [
    {
      "id": "string (UUID)",
      "user_id": "string (UUID)",
      "employee_id": "string",
      "first_name": "string",
      "last_name": "string",
      "email": "string",
      "phone": "string",
      "subjects": ["string"],
      "designation": "string",
      "qualification": "string",
      "joining_date": "string (ISO 8601 date)",
      "status": "string",
      "avatar_url": "string",
      "created_at": "string (ISO 8601)"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 25,
    "total_pages": 2
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### GET /api/v1/teachers/:id

Retrieves details of a specific teacher.

**Endpoint:** `GET /api/v1/teachers/:id`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `teachers:read`  
**Rate Limit:** 100 requests/minute

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (UUID) | Yes | Teacher ID |

#### Response Schema

**200 OK - Teacher Retrieved**

```json
{
  "success": true,
  "data": {
    "id": "string (UUID)",
    "user_id": "string (UUID)",
    "employee_id": "string",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "phone": "string",
    "subjects": [
      {
        "id": "string",
        "name": "string",
        "code": "string"
      }
    ],
    "designation": "string",
    "qualification": "string",
    "specialization": "string",
    "experience_years": "number",
    "joining_date": "string (ISO 8601 date)",
    "status": "string",
    "avatar_url": "string",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "postal_code": "string",
      "country": "string"
    },
    "created_at": "string (ISO 8601)",
    "updated_at": "string (ISO 8601)"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### GET /api/v1/teachers/:id/classes

Retrieves classes assigned to a specific teacher.

**Endpoint:** `GET /api/v1/teachers/:id/classes`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `teachers:read`  
**Rate Limit:** 100 requests/minute

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (UUID) | Yes | Teacher ID |

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `academic_year` | string | current | Filter by academic year |
| `term` | string | - | Filter by term |

#### Response Schema

**200 OK - Classes Retrieved**

```json
{
  "success": true,
  "data": [
    {
      "class_id": "string",
      "class_name": "Class 10",
      "section": "A",
      "subject_id": "string",
      "subject_name": "Mathematics",
      "room": "Room 101",
      "academic_year": "string",
      "term": "string",
      "student_count": 30,
      "schedule": {
        "days": ["Monday", "Wednesday", "Friday"],
        "periods": [1, 3, 5]
      }
    }
  ],
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### GET /api/v1/teachers/:id/students

Retrieves students taught by a specific teacher.

**Endpoint:** `GET /api/v1/teachers/:id/students`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `teachers:read`  
**Rate Limit:** 100 requests/minute

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (UUID) | Yes | Teacher ID |

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `class_id` | string | - | Filter by class ID |
| `subject_id` | string | - | Filter by subject ID |
| `page` | integer | 1 | Page number |
| `limit` | integer | 20 | Items per page |

#### Response Schema

**200 OK - Students Retrieved**

```json
{
  "success": true,
  "data": [
    {
      "id": "string (UUID)",
      "student_id": "string",
      "first_name": "string",
      "last_name": "string",
      "email": "string",
      "class_id": "string",
      "section": "string",
      "roll_number": "string",
      "avatar_url": "string"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 90,
    "total_pages": 5
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### GET /api/v1/teachers/:id/timetable

Retrieves timetable for a specific teacher.

**Endpoint:** `GET /api/v1/teachers/:id/timetable`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `teachers:read` or `read:own_timetable`  
**Rate Limit:** 100 requests/minute

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (UUID) | Yes | Teacher ID |

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `day` | string | - | Filter by day (Monday-Sunday) |
| `week` | string | current | Filter by week |

#### Response Schema

**200 OK - Timetable Retrieved**

```json
{
  "success": true,
  "data": {
    "teacher_id": "string (UUID)",
    "teacher_name": "string",
    "week_of": "string (ISO 8601 date)",
    "schedule": [
      {
        "day": "Monday",
        "periods": [
          {
            "period": 1,
            "start_time": "08:00:00",
            "end_time": "08:45:00",
            "subject": "Mathematics",
            "subject_id": "string",
            "class_id": "string",
            "class_name": "Class 10-A",
            "room": "Room 101"
          }
        ]
      }
    ]
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

## Parent Endpoints

### GET /api/v1/parents/:id

Retrieves details of a specific parent.

**Endpoint:** `GET /api/v1/parents/:id`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `parents:read` or `read:own_parent_data`  
**Rate Limit:** 100 requests/minute

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (UUID) | Yes | Parent ID |

#### Response Schema

**200 OK - Parent Retrieved**

```json
{
  "success": true,
  "data": {
    "id": "string (UUID)",
    "user_id": "string (UUID)",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "phone": "string",
    "occupation": "string",
    "relation": "string (enum: father/mother/guardian)",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "postal_code": "string",
      "country": "string"
    },
    "emergency_contact": {
      "name": "string",
      "phone": "string",
      "relationship": "string"
    },
    "avatar_url": "string",
    "created_at": "string (ISO 8601)",
    "updated_at": "string (ISO 8601)"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### GET /api/v1/parents/:id/children

Retrieves children associated with a specific parent.

**Endpoint:** `GET /api/v1/parents/:id/children`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `parents:read` or `read:own_children`  
**Rate Limit:** 100 requests/minute

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (UUID) | Yes | Parent ID |

#### Response Schema

**200 OK - Children Retrieved**

```json
{
  "success": true,
  "data": [
    {
      "id": "string (UUID)",
      "student_id": "string",
      "first_name": "string",
      "last_name": "string",
      "email": "string",
      "class_id": "string",
      "section": "string",
      "roll_number": "string",
      "avatar_url": "string",
      "status": "string",
      "academic_year": "string"
    }
  ],
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### GET /api/v1/parents/:id/dashboard

Retrieves dashboard data for a parent.

**Endpoint:** `GET /api/v1/parents/:id/dashboard`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `parents:read` or `read:own_dashboard`  
**Rate Limit:** 100 requests/minute

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (UUID) | Yes | Parent ID |

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `academic_year` | string | current | Filter by academic year |
| `term` | string | - | Filter by term |

#### Response Schema

**200 OK - Dashboard Retrieved**

```json
{
  "success": true,
  "data": {
    "parent_id": "string (UUID)",
    "children": [
      {
        "id": "string (UUID)",
        "name": "string",
        "class": "string",
        "section": "string"
      }
    ],
    "summary": {
      "total_children": 2,
      "total_fees_due": 25000,
      "upcoming_events": 3,
      "notifications_unread": 5
    },
    "recent_activities": [
      {
        "type": "grade",
        "message": "Ahmed received A+ in Mathematics",
        "date": "string (ISO 8601)",
        "student_id": "string (UUID)"
      }
    ],
    "upcoming_events": [
      {
        "id": "string",
        "title": "Parent-Teacher Meeting",
        "date": "string (ISO 8601)",
        "time": "string"
      }
    ],
    "fee_summary": [
      {
        "student_id": "string (UUID)",
        "student_name": "string",
        "total_due": 15000,
        "due_date": "string (ISO 8601 date)"
      }
    ]
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### POST /api/v1/leave-applications

Submits a leave application.

**Endpoint:** `POST /api/v1/leave-applications`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `leave:write`  
**Rate Limit:** 20 requests/day

#### Request Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Authorization` | string | Yes | Bearer token |
| `Content-Type` | string | Yes | Must be `application/json` |

#### Request Body Schema

```json
{
  "student_id": "string (required, UUID)",
  "leave_type": "string (required, enum: sick/personal/family/other)",
  "start_date": "string (required, ISO 8601 date)",
  "end_date": "string (required, ISO 8601 date)",
  "reason": "string (required, max 500 characters)",
  "attachments": ["string (optional, file URLs)"]
}
```

#### Request Body Example

```json
{
  "student_id": "550e8400-e29b-41d4-a716-446655440000",
  "leave_type": "sick",
  "start_date": "2024-01-15",
  "end_date": "2024-01-17",
  "reason": "Student has fever and doctor advised rest for 3 days",
  "attachments": ["https://storage.smartacademy.edu/medical_cert.pdf"]
}
```

#### Response Schema

**201 Created - Leave Application Submitted**

```json
{
  "success": true,
  "data": {
    "id": "string (UUID)",
    "student_id": "string (UUID)",
    "student_name": "string",
    "leave_type": "string",
    "start_date": "string (ISO 8601 date)",
    "end_date": "string (ISO 8601 date)",
    "reason": "string",
    "status": "pending",
    "submitted_by": "string (UUID)",
    "submitted_at": "string (ISO 8601)",
    "attachments": ["string"]
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### GET /api/v1/leave-applications/:id

Retrieves details of a specific leave application.

**Endpoint:** `GET /api/v1/leave-applications/:id`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `leave:read`  
**Rate Limit:** 100 requests/minute

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (UUID) | Yes | Leave application ID |

#### Response Schema

**200 OK - Leave Application Retrieved**

```json
{
  "success": true,
  "data": {
    "id": "string (UUID)",
    "student_id": "string (UUID)",
    "student_name": "string",
    "leave_type": "string",
    "start_date": "string (ISO 8601 date)",
    "end_date": "string (ISO 8601 date)",
    "reason": "string",
    "status": "string (enum: pending/approved/rejected)",
    "attachments": ["string"],
    "submitted_by": "string (UUID)",
    "submitted_at": "string (ISO 8601)",
    "reviewed_by": "string (UUID)",
    "reviewed_at": "string (ISO 8601)",
    "review_comments": "string"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

## Attendance Endpoints

### GET /api/v1/attendance

Retrieves attendance records.

**Endpoint:** `GET /api/v1/attendance`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `attendance:read`  
**Rate Limit:** 100 requests/minute

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 20 | Items per page |
| `class_id` | string | - | Filter by class ID |
| `section` | string | - | Filter by section |
| `date` | string | - | Filter by date (ISO 8601) |
| `from_date` | string | - | Start date range |
| `to_date` | string | - | End date range |
| `status` | string | - | Filter by status |

#### Request Example

```http
GET /api/v1/attendance?class_id=class_10&section=A&date=2024-01-10
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

#### Response Schema

**200 OK - Attendance Retrieved**

```json
{
  "success": true,
  "data": [
    {
      "id": "string (UUID)",
      "student_id": "string (UUID)",
      "student_name": "string",
      "date": "string (ISO 8601 date)",
      "status": "string (enum: present/absent/late/excused)",
      "check_in_time": "string (ISO 8601 time)",
      "check_out_time": "string (ISO 8601 time)",
      "notes": "string",
      "marked_by": "string (UUID)",
      "marked_by_name": "string",
      "created_at": "string (ISO 8601)"
    }
  ],
  "summary": {
    "total_students": 30,
    "present": 28,
    "absent": 1,
    "late": 1,
    "excused": 0,
    "attendance_percentage": 93.3
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 30,
    "total_pages": 2
  },
  "meta