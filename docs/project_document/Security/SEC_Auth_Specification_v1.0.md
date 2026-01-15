# Smart Academy Digital Portal - Authentication & Authorization Specification

**Document Title:** Authentication & Authorization Specification
**Document ID:** SEC_Auth_Specification_v1.0
**Version:** 1.0
**Date:** January 10, 2026
**Project Name:** Smart Academy Digital Web Portal Development
**Prepared By:** Solo Full-Stack Developer

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | January 10, 2026 | Development Team | Initial Authentication & Authorization Specification |

**Reference Documents:**
- Smart Academy Security Architecture v1.0
- Smart Academy System Architecture v1.0
- Smart Academy Non-Functional Requirements v1.0
- OWASP Authentication Cheat Sheet

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Authentication Methods](#2-authentication-methods)
3. [Session Management](#3-session-management)
4. [JWT Implementation](#4-jwt-implementation)
5. [Role-Based Access Control (RBAC)](#5-role-based-access-control-rbac)
6. [Permission Definitions](#6-permission-definitions)
7. [Password Policies](#7-password-policies)
8. [Account Security](#8-account-security)
9. [SSO Integration](#9-sso-integration)
10. [Implementation Guidelines](#10-implementation-guidelines)

---

## 1. Introduction

### 1.1 Purpose

This document specifies the authentication and authorization mechanisms for the Smart Academy Digital Portal. It defines how users are identified, verified, and granted access to system resources based on their roles and permissions.

### 1.2 Scope

This specification covers:
- User authentication mechanisms
- Multi-factor authentication (MFA)
- Session and token management
- Role-based access control (RBAC)
- Permission matrices
- Password policies
- SSO integration with Gibbon/Moodle

### 1.3 Security Objectives

| Objective | Description | Implementation |
|-----------|-------------|----------------|
| Identity Verification | Confirm user is who they claim to be | Password + MFA |
| Access Control | Grant appropriate permissions | RBAC system |
| Session Security | Protect active sessions | Secure tokens |
| Accountability | Track user actions | Audit logging |
| Non-repudiation | Prevent denial of actions | Digital signatures |

---

## 2. Authentication Methods

### 2.1 Password-Based Authentication

#### 2.1.1 Password Requirements

| Requirement | Specification | Rationale |
|-------------|---------------|-----------|
| Minimum Length | 8 characters | Balance security and usability |
| Maximum Length | 128 characters | Allow strong passphrases |
| Complexity | At least 1 number required | Basic entropy requirement |
| Prohibited | Common passwords (top 10,000) | Prevent dictionary attacks |
| Prohibited | Username/email as password | Prevent obvious passwords |
| History | Cannot reuse last 5 passwords | Prevent password cycling |

#### 2.1.2 Password Hashing

```typescript
// Password Hashing Configuration
const PASSWORD_CONFIG = {
  algorithm: 'bcrypt',
  saltRounds: 12,       // Cost factor
  pepper: process.env.PASSWORD_PEPPER,  // Additional secret
};

// Implementation
import bcrypt from 'bcrypt';

async function hashPassword(plainPassword: string): Promise<string> {
  const pepperedPassword = plainPassword + PASSWORD_CONFIG.pepper;
  return bcrypt.hash(pepperedPassword, PASSWORD_CONFIG.saltRounds);
}

async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const pepperedPassword = plainPassword + PASSWORD_CONFIG.pepper;
  return bcrypt.compare(pepperedPassword, hashedPassword);
}
```

#### 2.1.3 Password Strength Meter

```typescript
// Password Strength Levels
enum PasswordStrength {
  WEAK = 'weak',           // Score 0-1: Red
  FAIR = 'fair',           // Score 2: Orange
  GOOD = 'good',           // Score 3: Yellow-Green
  STRONG = 'strong',       // Score 4: Green
}

// Strength Criteria
const strengthCriteria = {
  length8: (p: string) => p.length >= 8,
  length12: (p: string) => p.length >= 12,
  hasLower: (p: string) => /[a-z]/.test(p),
  hasUpper: (p: string) => /[A-Z]/.test(p),
  hasNumber: (p: string) => /\d/.test(p),
  hasSpecial: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p),
  noCommon: (p: string) => !commonPasswords.includes(p.toLowerCase()),
};
```

### 2.2 Multi-Factor Authentication (MFA)

#### 2.2.1 MFA Overview

| Property | Specification |
|----------|---------------|
| Type | TOTP (Time-based One-Time Password) |
| Standard | RFC 6238 |
| Algorithm | HMAC-SHA1 |
| Digits | 6 |
| Period | 30 seconds |
| Window | ±1 period (allows for clock drift) |

#### 2.2.2 MFA Requirements by Role

| Role | MFA Requirement | Enforcement |
|------|-----------------|-------------|
| Student | Optional | User choice |
| Parent | Optional | User choice |
| Teacher | Recommended | Prompted on setup |
| Staff | Recommended | Prompted on setup |
| Admin | **Required** | Cannot access without MFA |
| Super Admin | **Required** | Cannot access without MFA |

#### 2.2.3 MFA Setup Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      MFA SETUP FLOW                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   1. User Initiates Setup                                       │
│      │                                                          │
│      ▼                                                          │
│   2. Generate Secret Key (Base32, 160 bits)                    │
│      │                                                          │
│      ▼                                                          │
│   3. Generate QR Code                                           │
│      │  otpauth://totp/SmartAcademy:user@email.com             │
│      │  ?secret=BASE32SECRET&issuer=SmartAcademy               │
│      ▼                                                          │
│   4. User Scans with Authenticator App                         │
│      │  (Google Authenticator, Authy, etc.)                    │
│      ▼                                                          │
│   5. User Enters Verification Code                              │
│      │                                                          │
│      ▼                                                          │
│   6. Server Verifies Code                                       │
│      │                                                          │
│      ├──[Invalid]──> Show Error, Retry                         │
│      │                                                          │
│      ▼                                                          │
│   7. Store Encrypted Secret                                     │
│      │                                                          │
│      ▼                                                          │
│   8. Generate Recovery Codes (10 codes)                        │
│      │                                                          │
│      ▼                                                          │
│   9. Display Recovery Codes (one-time view)                    │
│      │                                                          │
│      ▼                                                          │
│   10. MFA Enabled Successfully                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 2.2.4 Recovery Codes

| Property | Specification |
|----------|---------------|
| Count | 10 codes per user |
| Format | 8 alphanumeric characters |
| Storage | Hashed (bcrypt) |
| Usage | Single-use, invalidated after use |
| Regeneration | Available after authentication |

```typescript
// Recovery Code Generation
function generateRecoveryCodes(count: number = 10): string[] {
  const codes: string[] = [];
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude confusing chars

  for (let i = 0; i < count; i++) {
    let code = '';
    for (let j = 0; j < 8; j++) {
      code += alphabet[crypto.randomInt(alphabet.length)];
    }
    codes.push(code);
  }

  return codes;
}
```

### 2.3 Biometric Authentication (Mobile App)

| Feature | Specification |
|---------|---------------|
| Types Supported | Fingerprint, Face ID |
| Implementation | Device-native biometrics |
| Storage | Biometric-protected secure storage |
| Fallback | PIN or password |
| Requirement | Optional for all users |

---

## 3. Session Management

### 3.1 Session Configuration

| Property | Value | Rationale |
|----------|-------|-----------|
| Session ID Length | 256 bits | Sufficient entropy |
| Session ID Algorithm | `crypto.randomBytes(32)` | Cryptographically secure |
| Idle Timeout | 24 hours | User convenience |
| Absolute Timeout | 7 days | Security limit |
| Concurrent Sessions | Maximum 5 | Limit exposure |
| Session Storage | Server-side (Redis) | Central management |

### 3.2 Session Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                    SESSION LIFECYCLE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐│
│   │  LOGIN   │───>│  ACTIVE  │───>│  IDLE    │───>│  EXPIRED ││
│   └──────────┘    └────┬─────┘    └────┬─────┘    └──────────┘│
│                        │               │                        │
│                        │   User        │   Idle                 │
│                        │   Activity    │   Timeout              │
│                        │               │   (24h)                │
│                        ▼               │                        │
│                   ┌──────────┐         │                        │
│                   │ EXTENDED │<────────┘                        │
│                   │ (Active) │    Activity                      │
│                   └──────────┘    Detected                      │
│                        │                                        │
│                        │   Logout or                            │
│                        │   Force Logout                         │
│                        ▼                                        │
│                   ┌──────────┐                                  │
│                   │TERMINATED│                                  │
│                   └──────────┘                                  │
│                                                                 │
│   Session Events:                                               │
│   • Created: New login                                          │
│   • Extended: User activity within idle window                 │
│   • Revoked: User logout or admin force logout                 │
│   • Expired: Idle or absolute timeout reached                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 Session Security Controls

| Control | Implementation |
|---------|----------------|
| Cookie Security | `HttpOnly`, `Secure`, `SameSite=Strict` |
| Session Fixation Prevention | Regenerate session ID on login |
| Session Hijacking Prevention | Bind session to user agent/IP (optional) |
| Logout | Invalidate session server-side |
| Force Logout All | Admin capability to revoke all sessions |
| Session Enumeration Prevention | Generic error messages |

### 3.4 Cookie Configuration

```typescript
// Session Cookie Configuration
const SESSION_COOKIE_OPTIONS = {
  name: 'smart_academy_session',
  httpOnly: true,           // Prevent JavaScript access
  secure: true,             // HTTPS only
  sameSite: 'strict',       // CSRF protection
  path: '/',
  domain: '.smartacademy.edu.bd',
  maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days in ms
};

// Refresh Token Cookie
const REFRESH_COOKIE_OPTIONS = {
  name: 'smart_academy_refresh',
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  path: '/api/auth/refresh',  // Limited path
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
```

---

## 4. JWT Implementation

### 4.1 Token Structure

#### 4.1.1 Access Token

```json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT",
    "kid": "key-id-2026-01"
  },
  "payload": {
    "iss": "smart-academy",
    "sub": "user-uuid",
    "aud": ["smart-academy-api"],
    "exp": 1704890400,
    "iat": 1704889500,
    "jti": "unique-token-id",
    "type": "access",
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "role": "teacher",
      "permissions": ["students:read", "attendance:write"]
    }
  }
}
```

#### 4.1.2 Refresh Token

```json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT"
  },
  "payload": {
    "iss": "smart-academy",
    "sub": "user-uuid",
    "exp": 1705494300,
    "iat": 1704889500,
    "jti": "unique-refresh-token-id",
    "type": "refresh",
    "family": "token-family-id"
  }
}
```

### 4.2 Token Configuration

| Property | Access Token | Refresh Token |
|----------|--------------|---------------|
| Algorithm | RS256 (asymmetric) | RS256 (asymmetric) |
| Expiration | 15 minutes | 7 days |
| Storage | Memory (client) | HttpOnly cookie |
| Rotation | N/A | On each use |
| Revocation | Blacklist | Database invalidation |
| Content | User info, permissions | Minimal (user ID only) |

### 4.3 Token Signing Keys

```typescript
// Key Configuration
const JWT_CONFIG = {
  algorithm: 'RS256',
  publicKey: process.env.JWT_PUBLIC_KEY,
  privateKey: process.env.JWT_PRIVATE_KEY,
  keyId: 'key-2026-01',
  issuer: 'smart-academy',
  audience: ['smart-academy-api'],

  accessToken: {
    expiresIn: '15m',
  },

  refreshToken: {
    expiresIn: '7d',
  },
};

// Key Rotation Schedule
// - Generate new keys quarterly
// - Keep previous key active for 1 week after rotation
// - Use kid (key ID) to identify which key to use
```

### 4.4 Token Refresh Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     TOKEN REFRESH FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   CLIENT                         API SERVER                     │
│     │                                │                          │
│     │  1. Access Token Expired       │                          │
│     │     (401 Unauthorized)         │                          │
│     │<───────────────────────────────│                          │
│     │                                │                          │
│     │  2. Send Refresh Token         │                          │
│     │     (HttpOnly Cookie)          │                          │
│     │───────────────────────────────>│                          │
│     │                                │                          │
│     │                                │  3. Validate Refresh Token│
│     │                                │     • Check signature     │
│     │                                │     • Check expiration    │
│     │                                │     • Check revocation    │
│     │                                │                          │
│     │                                │  4. Check Token Family    │
│     │                                │     • Detect reuse attack │
│     │                                │                          │
│     │                                │  5. Generate New Tokens   │
│     │                                │     • New Access Token    │
│     │                                │     • New Refresh Token   │
│     │                                │                          │
│     │                                │  6. Invalidate Old Token  │
│     │                                │     • Mark as used        │
│     │                                │                          │
│     │  7. Return New Tokens          │                          │
│     │<───────────────────────────────│                          │
│     │                                │                          │
│                                                                 │
│   REUSE DETECTION:                                              │
│   If a refresh token is used twice (potential theft):          │
│   1. Revoke all tokens in the family                           │
│   2. Force re-authentication                                    │
│   3. Log security event                                         │
│   4. Optional: Notify user                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.5 Token Revocation

```typescript
// Token Revocation Strategies
interface TokenRevocation {
  // Immediate revocation using Redis blacklist
  blacklist: {
    storage: 'redis',
    ttl: 'token_expiry + 1_hour',
    key_format: 'revoked:${jti}',
  };

  // Refresh token family revocation
  familyRevocation: {
    storage: 'database',
    strategy: 'revoke_all_in_family',
  };

  // User-level revocation
  userRevocation: {
    storage: 'database',
    strategy: 'increment_token_version',
    effect: 'invalidate_all_user_tokens',
  };
}

// Check if token is revoked
async function isTokenRevoked(jti: string): Promise<boolean> {
  return redis.exists(`revoked:${jti}`);
}

// Revoke a token
async function revokeToken(jti: string, expiresAt: Date): Promise<void> {
  const ttl = Math.ceil((expiresAt.getTime() - Date.now()) / 1000);
  await redis.setex(`revoked:${jti}`, ttl + 3600, '1');
}
```

---

## 5. Role-Based Access Control (RBAC)

### 5.1 Role Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                      ROLE HIERARCHY                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                     ┌──────────────┐                            │
│                     │ SUPER_ADMIN  │                            │
│                     │ (System)     │                            │
│                     └──────┬───────┘                            │
│                            │                                    │
│              ┌─────────────┼─────────────┐                      │
│              │             │             │                      │
│        ┌─────▼─────┐ ┌─────▼─────┐ ┌─────▼─────┐              │
│        │   ADMIN   │ │ PRINCIPAL │ │ FINANCE   │              │
│        │ (System)  │ │ (School)  │ │ (Finance) │              │
│        └─────┬─────┘ └─────┬─────┘ └───────────┘              │
│              │             │                                    │
│              │       ┌─────┴─────┐                              │
│              │       │           │                              │
│        ┌─────▼─────┐ │     ┌─────▼─────┐                        │
│        │   STAFF   │ │     │  TEACHER  │                        │
│        │ (Admin)   │ │     │ (Academic)│                        │
│        └───────────┘ │     └─────┬─────┘                        │
│                      │           │                              │
│                      │     ┌─────┴─────┐                        │
│                      │     │           │                        │
│                ┌─────▼─────┐     ┌─────▼─────┐                  │
│                │  PARENT   │     │  STUDENT  │                  │
│                │ (Guardian)│     │ (Learner) │                  │
│                └───────────┘     └───────────┘                  │
│                                                                 │
│   ROLE INHERITANCE:                                             │
│   • Higher roles inherit permissions from lower roles          │
│   • Roles can be combined (e.g., Teacher + Parent)             │
│   • Permissions can be explicitly denied at any level          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Role Definitions

| Role | Code | Description | MFA Required |
|------|------|-------------|--------------|
| Super Admin | `super_admin` | System-level access, all permissions | Yes |
| Admin | `admin` | School administration, user management | Yes |
| Principal | `principal` | Academic leadership, reports, oversight | Recommended |
| Finance | `finance` | Financial operations, fee management | Recommended |
| Staff | `staff` | Administrative tasks, data entry | Recommended |
| Teacher | `teacher` | Class management, grades, attendance | Recommended |
| Parent | `parent` | View children's data, pay fees | Optional |
| Student | `student` | View own data, access learning materials | Optional |

### 5.3 RBAC Matrix - Core Operations

| Permission | Student | Parent | Teacher | Staff | Finance | Principal | Admin | Super Admin |
|------------|---------|--------|---------|-------|---------|-----------|-------|-------------|
| **User Management** |
| users:create | - | - | - | - | - | - | ✓ | ✓ |
| users:read | Own | Children | Class | All | All | All | All | All |
| users:update | Own* | - | - | - | - | - | ✓ | ✓ |
| users:delete | - | - | - | - | - | - | ✓ | ✓ |
| **Student Records** |
| students:create | - | - | - | ✓ | - | ✓ | ✓ | ✓ |
| students:read | Own | Children | Class | All | All | All | All | All |
| students:update | - | - | Class* | ✓ | - | ✓ | ✓ | ✓ |
| students:delete | - | - | - | - | - | - | ✓ | ✓ |
| **Attendance** |
| attendance:create | - | - | ✓ | ✓ | - | ✓ | ✓ | ✓ |
| attendance:read | Own | Children | Class | All | - | All | All | All |
| attendance:update | - | - | ✓* | ✓ | - | ✓ | ✓ | ✓ |
| attendance:delete | - | - | - | - | - | ✓ | ✓ | ✓ |
| **Grades** |
| grades:create | - | - | ✓ | - | - | ✓ | ✓ | ✓ |
| grades:read | Own | Children | Class | All | - | All | All | All |
| grades:update | - | - | ✓* | - | - | ✓ | ✓ | ✓ |
| grades:delete | - | - | - | - | - | ✓ | ✓ | ✓ |
| **Fees & Payments** |
| fees:create | - | - | - | - | ✓ | ✓ | ✓ | ✓ |
| fees:read | Own | Children | - | - | All | All | All | All |
| fees:update | - | - | - | - | ✓ | ✓ | ✓ | ✓ |
| payments:create | - | ✓ | - | - | ✓ | ✓ | ✓ | ✓ |
| payments:read | Own | Children | - | - | All | All | All | All |
| **Quran Progress** |
| quran:create | - | - | ✓ | - | - | ✓ | ✓ | ✓ |
| quran:read | Own | Children | Class | All | - | All | All | All |
| quran:update | - | - | ✓ | - | - | ✓ | ✓ | ✓ |
| **Reports** |
| reports:student | Own | Children | Class | - | - | All | All | All |
| reports:class | - | - | ✓ | - | - | All | All | All |
| reports:school | - | - | - | - | ✓ | ✓ | ✓ | ✓ |
| reports:financial | - | - | - | - | ✓ | ✓ | ✓ | ✓ |
| **System Settings** |
| settings:read | - | - | - | - | - | - | ✓ | ✓ |
| settings:update | - | - | - | - | - | - | ✓ | ✓ |
| audit:read | - | - | - | - | - | - | ✓ | ✓ |

**Legend:**
- ✓ = Full access
- Own = Own records only
- Children = Own children's records only
- Class = Assigned class records only
- All = All records
- \* = With restrictions (e.g., time-limited)
- \- = No access

### 5.4 Permission Scopes

```typescript
// Permission Scope Definitions
interface PermissionScope {
  // Resource-level scopes
  own: 'Only resources owned by the user';
  children: 'Only resources of user\'s children';
  class: 'Only resources in user\'s assigned classes';
  department: 'Only resources in user\'s department';
  all: 'All resources (system-wide)';
}

// Permission Check Implementation
interface PermissionCheck {
  userId: string;
  action: 'create' | 'read' | 'update' | 'delete';
  resource: string;
  resourceId?: string;
  scope: PermissionScope;
}

// Example: Teacher checking student grades
async function canAccess(check: PermissionCheck): Promise<boolean> {
  const user = await getUser(check.userId);

  if (check.scope === 'class') {
    // Verify student is in teacher's class
    const studentClass = await getStudentClass(check.resourceId);
    return user.assignedClasses.includes(studentClass.id);
  }

  // ... other scope checks
}
```

---

## 6. Permission Definitions

### 6.1 Permission Naming Convention

```
{resource}:{action}[:{scope}]

Examples:
- students:read           # Read all students (scope from role)
- students:read:own       # Read own student record
- attendance:write:class  # Write attendance for assigned class
- payments:create         # Create payment (parent paying fees)
- settings:admin          # Administrative settings access
```

### 6.2 Complete Permission List

#### 6.2.1 User Management Permissions

| Permission | Description | Roles |
|------------|-------------|-------|
| `users:create` | Create new user accounts | admin, super_admin |
| `users:read` | View user profiles | All (scoped) |
| `users:update` | Update user information | admin, super_admin |
| `users:delete` | Deactivate/delete users | admin, super_admin |
| `users:roles:assign` | Assign roles to users | super_admin |
| `users:password:reset` | Force password reset | admin, super_admin |
| `users:mfa:manage` | Enable/disable MFA | admin, super_admin |

#### 6.2.2 Student Management Permissions

| Permission | Description | Roles |
|------------|-------------|-------|
| `students:create` | Enroll new students | staff, admin |
| `students:read` | View student records | All (scoped) |
| `students:update` | Update student info | staff, admin |
| `students:delete` | Remove students | admin |
| `students:transfer` | Transfer between classes | admin |
| `students:graduate` | Mark as graduated | admin |
| `students:photo:upload` | Upload student photos | staff, admin |

#### 6.2.3 Academic Permissions

| Permission | Description | Roles |
|------------|-------------|-------|
| `attendance:create` | Mark attendance | teacher, staff |
| `attendance:read` | View attendance | All (scoped) |
| `attendance:update` | Modify attendance | teacher (limited time), admin |
| `attendance:delete` | Delete attendance | admin |
| `attendance:report` | Generate reports | teacher, principal, admin |
| `grades:create` | Enter grades | teacher |
| `grades:read` | View grades | All (scoped) |
| `grades:update` | Modify grades | teacher (limited time), admin |
| `grades:approve` | Approve final grades | principal |
| `grades:report` | Generate grade reports | teacher, principal, admin |
| `exams:create` | Create exams | teacher, admin |
| `exams:schedule` | Schedule exams | admin |
| `exams:results:publish` | Publish results | principal, admin |

#### 6.2.4 Financial Permissions

| Permission | Description | Roles |
|------------|-------------|-------|
| `fees:create` | Create fee structures | finance, admin |
| `fees:read` | View fee information | All (scoped) |
| `fees:update` | Modify fee structures | finance, admin |
| `fees:waiver:create` | Create fee waivers | finance, admin |
| `payments:create` | Process payments | parent, finance |
| `payments:read` | View payment history | All (scoped) |
| `payments:refund` | Process refunds | finance, admin |
| `payments:report` | Financial reports | finance, principal, admin |
| `invoices:generate` | Generate invoices | finance |
| `invoices:send` | Send invoice notifications | finance |

#### 6.2.5 Islamic Education Permissions

| Permission | Description | Roles |
|------------|-------------|-------|
| `quran:progress:create` | Record Quran progress | teacher |
| `quran:progress:read` | View progress | All (scoped) |
| `quran:progress:update` | Update progress | teacher |
| `quran:memorization:certify` | Certify memorization | principal |
| `islamic:curriculum:manage` | Manage Islamic curriculum | admin |
| `prayer:times:configure` | Configure prayer times | admin |

#### 6.2.6 Communication Permissions

| Permission | Description | Roles |
|------------|-------------|-------|
| `announcements:create` | Create announcements | teacher, staff, admin |
| `announcements:read` | View announcements | All |
| `announcements:publish` | Publish to all | admin |
| `messages:send` | Send messages | All (scoped) |
| `messages:read` | Read messages | Own |
| `notifications:manage` | Manage notification settings | admin |
| `sms:send` | Send SMS notifications | admin |

#### 6.2.7 System Permissions

| Permission | Description | Roles |
|------------|-------------|-------|
| `settings:read` | View system settings | admin |
| `settings:update` | Modify system settings | admin |
| `audit:read` | View audit logs | admin, super_admin |
| `backup:create` | Create system backups | super_admin |
| `backup:restore` | Restore from backup | super_admin |
| `integrations:manage` | Manage third-party integrations | admin |
| `api:keys:manage` | Manage API keys | super_admin |

### 6.3 Permission Implementation

```typescript
// Permission Check Middleware
import { FastifyRequest, FastifyReply } from 'fastify';

interface AuthenticatedRequest extends FastifyRequest {
  user: {
    id: string;
    role: string;
    permissions: string[];
  };
}

function requirePermission(permission: string) {
  return async (
    request: AuthenticatedRequest,
    reply: FastifyReply
  ): Promise<void> => {
    const { user } = request;

    // Check direct permission
    if (user.permissions.includes(permission)) {
      return;
    }

    // Check wildcard permission (e.g., students:* matches students:read)
    const [resource, action] = permission.split(':');
    if (user.permissions.includes(`${resource}:*`)) {
      return;
    }

    // Check admin override
    if (user.permissions.includes('*')) {
      return;
    }

    reply.code(403).send({
      error: 'Forbidden',
      message: 'You do not have permission to perform this action',
    });
  };
}

// Usage in routes
fastify.get(
  '/api/students',
  { preHandler: [authenticate, requirePermission('students:read')] },
  studentController.getAll
);

fastify.post(
  '/api/students',
  { preHandler: [authenticate, requirePermission('students:create')] },
  studentController.create
);
```

---

## 7. Password Policies

### 7.1 Password Requirements

| Requirement | Value | Enforced At |
|-------------|-------|-------------|
| Minimum Length | 8 characters | Registration, Password Change |
| Maximum Length | 128 characters | Registration, Password Change |
| Required Characters | At least 1 number | Registration, Password Change |
| Prohibited | Common passwords (10,000 list) | Registration, Password Change |
| Prohibited | Username or email in password | Registration, Password Change |
| Prohibited | Repeating characters (>3) | Registration, Password Change |
| History | Cannot reuse last 5 passwords | Password Change |

### 7.2 Password Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                    PASSWORD LIFECYCLE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐ │
│   │                    INITIAL SETUP                          │ │
│   │                                                           │ │
│   │   Account Creation ──> Temporary Password ──> First Login│ │
│   │                             │                             │ │
│   │                             ▼                             │ │
│   │                   Force Password Change                   │ │
│   └───────────────────────────┬──────────────────────────────┘ │
│                               │                                 │
│                               ▼                                 │
│   ┌───────────────────────────────────────────────────────────┐│
│   │                     ACTIVE PASSWORD                        ││
│   │                                                            ││
│   │   • Valid until changed or expired                        ││
│   │   • No mandatory expiration (per NIST guidelines)         ││
│   │   • Can be changed anytime by user                        ││
│   │   • Admin can force reset                                 ││
│   └────────────────────────┬──────────────────────────────────┘│
│                            │                                    │
│            ┌───────────────┼───────────────┐                   │
│            │               │               │                    │
│            ▼               ▼               ▼                    │
│   ┌────────────┐   ┌────────────┐   ┌────────────┐             │
│   │   USER     │   │   ADMIN    │   │  BREACH    │             │
│   │   CHANGE   │   │   RESET    │   │  DETECTED  │             │
│   │            │   │            │   │            │             │
│   │ • Verify   │   │ • Force    │   │ • Auto     │             │
│   │   current  │   │   change   │   │   invalidate│             │
│   │ • Set new  │   │ • Temp     │   │ • Notify   │             │
│   │ • Update   │   │   password │   │   user     │             │
│   │   history  │   │ • Email    │   │ • Force    │             │
│   │            │   │   notify   │   │   reset    │             │
│   └────────────┘   └────────────┘   └────────────┘             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 7.3 Password Reset Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                  PASSWORD RESET FLOW                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   1. User Requests Reset                                        │
│      │  (Forgot Password form)                                  │
│      ▼                                                          │
│   2. Validate Email Exists                                      │
│      │  (Don't reveal if email exists - security)              │
│      ▼                                                          │
│   3. Generate Reset Token                                       │
│      │  • 256-bit random token                                  │
│      │  • Hash before storing                                   │
│      │  • Set 1-hour expiration                                │
│      ▼                                                          │
│   4. Send Reset Email                                           │
│      │  • Include reset link with token                        │
│      │  • Rate limit: 3 emails per hour                        │
│      ▼                                                          │
│   5. User Clicks Reset Link                                     │
│      │                                                          │
│      ▼                                                          │
│   6. Validate Token                                             │
│      │  • Check token hash matches                             │
│      │  • Check not expired                                    │
│      │  • Check not already used                               │
│      ▼                                                          │
│   7. User Sets New Password                                     │
│      │  • Validate password strength                           │
│      │  • Check password history                               │
│      ▼                                                          │
│   8. Update Password                                            │
│      │  • Hash new password                                    │
│      │  • Invalidate reset token                               │
│      │  • Revoke all sessions                                  │
│      │  • Log password change                                  │
│      ▼                                                          │
│   9. Notify User                                                │
│      │  • Send confirmation email                              │
│      │  • Include security notice                              │
│                                                                 │
│   SECURITY CONTROLS:                                            │
│   • Token single-use                                            │
│   • Token expires in 1 hour                                     │
│   • Rate limit reset requests                                   │
│   • Generic error messages                                      │
│   • All sessions invalidated on reset                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 7.4 Password Storage

```typescript
// Password Hashing Implementation
import bcrypt from 'bcrypt';

const PASSWORD_CONFIG = {
  saltRounds: 12,           // Cost factor (2^12 iterations)
  pepper: process.env.PASSWORD_PEPPER,
  historyCount: 5,          // Number of previous passwords to keep
};

async function hashPassword(password: string): Promise<string> {
  // Add pepper for additional security
  const pepperedPassword = password + PASSWORD_CONFIG.pepper;

  // Generate salt and hash
  return bcrypt.hash(pepperedPassword, PASSWORD_CONFIG.saltRounds);
}

async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const pepperedPassword = password + PASSWORD_CONFIG.pepper;
  return bcrypt.compare(pepperedPassword, hash);
}

async function checkPasswordHistory(
  userId: string,
  newPassword: string
): Promise<boolean> {
  const history = await getPasswordHistory(userId, PASSWORD_CONFIG.historyCount);

  for (const oldHash of history) {
    if (await verifyPassword(newPassword, oldHash)) {
      return false; // Password was used before
    }
  }

  return true; // Password is new
}
```

---

## 8. Account Security

### 8.1 Account Lockout Policy

| Condition | Threshold | Duration | Action |
|-----------|-----------|----------|--------|
| Failed Login Attempts | 5 attempts | 15 minutes | Temporary lockout |
| Failed MFA Attempts | 3 attempts | 15 minutes | Temporary lockout |
| Repeated Lockouts | 3 lockouts/day | 24 hours | Extended lockout |
| Suspicious Activity | Pattern detection | Until review | Manual unlock required |

### 8.2 Brute Force Protection

```typescript
// Rate Limiting Configuration
const RATE_LIMIT_CONFIG = {
  login: {
    windowMs: 15 * 60 * 1000,    // 15 minutes
    maxAttempts: 5,               // Per IP
    maxAttemptsPerUser: 5,        // Per username
    lockoutDuration: 15 * 60,     // 15 minutes in seconds
  },

  passwordReset: {
    windowMs: 60 * 60 * 1000,     // 1 hour
    maxAttempts: 3,               // Per email
  },

  mfa: {
    windowMs: 15 * 60 * 1000,     // 15 minutes
    maxAttempts: 3,
  },
};

// Implementation using Redis
import Redis from 'ioredis';

async function checkRateLimit(
  key: string,
  config: { windowMs: number; maxAttempts: number }
): Promise<{ allowed: boolean; remaining: number; resetAt: Date }> {
  const redis = new Redis();
  const current = await redis.incr(key);

  if (current === 1) {
    await redis.pexpire(key, config.windowMs);
  }

  const ttl = await redis.pttl(key);
  const resetAt = new Date(Date.now() + ttl);

  return {
    allowed: current <= config.maxAttempts,
    remaining: Math.max(0, config.maxAttempts - current),
    resetAt,
  };
}
```

### 8.3 Suspicious Activity Detection

| Activity | Detection Method | Response |
|----------|------------------|----------|
| Login from new device | Device fingerprint comparison | Email notification |
| Login from new location | IP geolocation change | Email notification |
| Login at unusual time | Time pattern analysis | Log for review |
| Multiple failed logins | Counter threshold | Temporary lockout |
| Password spray attack | Cross-user pattern | IP block |
| Session anomaly | Behavior analysis | Force re-authentication |

### 8.4 Account Recovery

```
┌─────────────────────────────────────────────────────────────────┐
│                   ACCOUNT RECOVERY OPTIONS                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   OPTION 1: Email Recovery                                      │
│   ──────────────────────                                        │
│   • Primary method                                              │
│   • Reset link sent to registered email                        │
│   • 1-hour expiration                                           │
│                                                                 │
│   OPTION 2: MFA Recovery Codes                                  │
│   ────────────────────────────                                  │
│   • For users who lost MFA device                              │
│   • Use pre-generated recovery code                            │
│   • Single-use, 10 codes provided                              │
│                                                                 │
│   OPTION 3: Admin-Assisted Recovery                            │
│   ─────────────────────────────────                            │
│   • For users who lost email access                            │
│   • Identity verification required                              │
│   • Admin generates temporary password                          │
│   • Force password change on next login                        │
│                                                                 │
│   OPTION 4: Parent Recovery (for Students)                     │
│   ─────────────────────────────────────────                    │
│   • Parent can request password reset                          │
│   • Linked to parent account verification                      │
│   • Generates temporary password                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9. SSO Integration

### 9.1 SSO with Gibbon SIS

Smart Academy integrates with Gibbon SIS for single sign-on capabilities:

```
┌─────────────────────────────────────────────────────────────────┐
│                   GIBBON SSO FLOW                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Smart Academy                    Gibbon SIS                   │
│        │                               │                        │
│        │  1. User clicks "Login with Gibbon"                   │
│        │──────────────────────────────>│                        │
│        │                               │                        │
│        │  2. Redirect to Gibbon login  │                        │
│        │<──────────────────────────────│                        │
│        │                               │                        │
│   User │  3. User enters Gibbon credentials                    │
│   ─────│──────────────────────────────>│                        │
│        │                               │                        │
│        │  4. Gibbon validates & generates token                │
│        │                               │                        │
│        │  5. Redirect back with auth code                      │
│        │<──────────────────────────────│                        │
│        │                               │                        │
│        │  6. Exchange code for user info                       │
│        │──────────────────────────────>│                        │
│        │                               │                        │
│        │  7. Return user profile                               │
│        │<──────────────────────────────│                        │
│        │                               │                        │
│        │  8. Create/update local session                       │
│        │                               │                        │
│                                                                 │
│   DATA SYNCHRONIZED:                                            │
│   • User ID (linked)                                            │
│   • Name                                                         │
│   • Email                                                        │
│   • Role                                                         │
│   • Class assignments                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 9.2 SSO with Moodle LMS

```
┌─────────────────────────────────────────────────────────────────┐
│                   MOODLE SSO FLOW                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Smart Academy ───────────> Moodle LMS                         │
│                                                                 │
│   OPTIONS:                                                      │
│                                                                 │
│   1. OAuth 2.0 Integration                                      │
│      • Smart Academy as OAuth client                           │
│      • Moodle as OAuth provider                                │
│      • Standard OAuth 2.0 flow                                 │
│                                                                 │
│   2. LTI (Learning Tools Interoperability)                     │
│      • Smart Academy as LTI tool                               │
│      • Moodle as LTI platform                                  │
│      • Launch with user context                                │
│                                                                 │
│   3. Shared Token Validation                                    │
│      • Smart Academy generates JWT                             │
│      • Moodle validates with shared secret                     │
│      • User automatically logged in                            │
│                                                                 │
│   PREFERRED: OAuth 2.0 for secure, standard integration       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 9.3 SSO Security Requirements

| Requirement | Specification |
|-------------|---------------|
| Protocol | OAuth 2.0 with PKCE |
| Token Validation | Verify signature, issuer, expiration |
| State Parameter | Required for CSRF protection |
| Nonce | Required for replay protection |
| Token Storage | Encrypted, server-side only |
| Session Binding | Link SSO session to local session |
| Logout | Propagate logout to SSO provider |

---

## 10. Implementation Guidelines

### 10.1 Authentication Implementation Checklist

- [ ] Password hashing with bcrypt (cost factor 12)
- [ ] Password pepper stored in environment variable
- [ ] Password strength validation on client and server
- [ ] Common password blacklist check
- [ ] Password history tracking (5 passwords)
- [ ] MFA setup flow with QR code generation
- [ ] TOTP validation with time drift tolerance
- [ ] Recovery code generation and secure storage
- [ ] Session token generation with secure random
- [ ] Session storage in Redis with TTL
- [ ] JWT signing with RS256
- [ ] Access token expiration (15 minutes)
- [ ] Refresh token rotation on use
- [ ] Token blacklist for revocation
- [ ] Rate limiting on login endpoint
- [ ] Account lockout after failed attempts
- [ ] Secure password reset flow
- [ ] Login notification emails

### 10.2 Authorization Implementation Checklist

- [ ] RBAC middleware implementation
- [ ] Permission checks on all protected routes
- [ ] Scope validation for data access
- [ ] Resource ownership verification
- [ ] Admin action audit logging
- [ ] Permission caching (Redis)
- [ ] Role assignment workflows
- [ ] Permission inheritance logic
- [ ] Dynamic permission updates
- [ ] API route protection

### 10.3 Security Testing Requirements

| Test Type | Description | Frequency |
|-----------|-------------|-----------|
| Unit Tests | Test auth functions | Every commit |
| Integration Tests | Test auth flows | Every PR |
| Penetration Testing | Security assessment | Quarterly |
| Password Audit | Check password quality | Monthly |
| Permission Audit | Verify role permissions | Monthly |
| Token Security Test | Test token handling | Monthly |
| Session Management Test | Test session lifecycle | Monthly |

### 10.4 Monitoring and Alerts

| Event | Alert Level | Notification |
|-------|-------------|--------------|
| Failed login spike | Warning | Slack + Email |
| Account lockout | Info | Logging only |
| Admin login | Info | Email |
| Password reset | Info | Email to user |
| MFA disabled | Warning | Email to user + admin |
| New device login | Info | Email to user |
| Suspicious activity | Critical | Immediate notification |
| Token theft detected | Critical | Force logout + notification |

---

## Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Developer | | _________________ | ________ |
| Security Reviewer | | _________________ | ________ |
| Principal | | _________________ | ________ |

---

**Document Version:** 1.0
**Last Updated:** January 10, 2026
**Status:** Pending Approval
**Next Review Date:** April 10, 2026

---

*This Authentication & Authorization Specification defines the security mechanisms for user identity management in the Smart Academy Digital Portal. All authentication and authorization implementations must adhere to these specifications.*

---

## References

- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [JWT Best Practices 2025](https://jwt.app/blog/jwt-best-practices/)
- [Auth0 Token Best Practices](https://auth0.com/docs/secure/tokens/token-best-practices)
- [NIST Digital Identity Guidelines (SP 800-63B)](https://pages.nist.gov/800-63-3/sp800-63b.html)
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
