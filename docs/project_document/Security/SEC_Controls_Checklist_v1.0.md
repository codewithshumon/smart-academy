# Smart Academy Digital Portal - Security Controls Checklist

**Document Title:** Security Controls Checklist
**Document ID:** SEC_Controls_Checklist_v1.0
**Version:** 1.0
**Date:** January 10, 2026
**Project Name:** Smart Academy Digital Web Portal Development
**Prepared By:** Solo Full-Stack Developer

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | January 10, 2026 | Development Team | Initial Security Controls Checklist |

**Reference Documents:**
- Smart Academy Security Architecture v1.0
- Smart Academy Auth Specification v1.0
- OWASP Top 10 2025
- OWASP ASVS 4.0

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [OWASP Top 10 Mitigation](#2-owasp-top-10-mitigation)
3. [Input Validation Controls](#3-input-validation-controls)
4. [Output Encoding Controls](#4-output-encoding-controls)
5. [CSRF Protection](#5-csrf-protection)
6. [XSS Prevention](#6-xss-prevention)
7. [SQL Injection Prevention](#7-sql-injection-prevention)
8. [Security Headers Configuration](#8-security-headers-configuration)
9. [Content Security Policy](#9-content-security-policy)
10. [Additional Security Controls](#10-additional-security-controls)
11. [Pre-Deployment Security Checklist](#11-pre-deployment-security-checklist)

---

## 1. Introduction

### 1.1 Purpose

This Security Controls Checklist provides a comprehensive set of security controls that must be implemented in the Smart Academy Digital Portal. It serves as both a development guide and an audit checklist to ensure all security requirements are met.

### 1.2 How to Use This Document

Each control item includes:
- **Control ID**: Unique identifier
- **Description**: What the control does
- **Implementation**: How to implement
- **Verification**: How to test/verify
- **Status**: Checkbox for tracking
- **Priority**: Critical, High, Medium, Low

### 1.3 Compliance Requirements

| Standard | Requirement | Coverage |
|----------|-------------|----------|
| OWASP Top 10 2025 | All categories addressed | Full |
| OWASP ASVS 4.0 | Level 1 (Minimum) | Full |
| OWASP ASVS 4.0 | Level 2 (Standard) | Partial |
| COPPA Principles | Child data protection | Full |
| Bangladesh ICT Act | Data protection requirements | Full |

---

## 2. OWASP Top 10 Mitigation

### 2.1 A01:2021 – Broken Access Control

| ID | Control | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| A01-01 | Deny access by default, require explicit grants | Critical | [ ] | Whitelist approach |
| A01-02 | Implement RBAC with principle of least privilege | Critical | [ ] | See Auth Specification |
| A01-03 | Validate user permissions on every request | Critical | [ ] | Middleware implementation |
| A01-04 | Disable web server directory listing | High | [ ] | Server configuration |
| A01-05 | Log access control failures, alert on repeated failures | High | [ ] | Centralized logging |
| A01-06 | Rate limit API access to prevent automated attacks | High | [ ] | Per-user and per-IP |
| A01-07 | Invalidate sessions and tokens on logout | Critical | [ ] | Server-side invalidation |
| A01-08 | Use secure session IDs with sufficient entropy | Critical | [ ] | 256-bit random |
| A01-09 | Prevent direct object reference attacks (IDOR) | Critical | [ ] | Ownership verification |
| A01-10 | Enforce record ownership on CRUD operations | Critical | [ ] | Scoped queries |

**Implementation Details:**

```typescript
// A01-09: IDOR Prevention Example
async function getStudent(userId: string, studentId: string): Promise<Student> {
  const user = await getUser(userId);

  // Students can only access their own record
  if (user.role === 'student' && user.studentId !== studentId) {
    throw new ForbiddenError('Access denied');
  }

  // Parents can only access their children
  if (user.role === 'parent') {
    const isChild = await isParentOfStudent(userId, studentId);
    if (!isChild) {
      throw new ForbiddenError('Access denied');
    }
  }

  // Teachers can only access students in their classes
  if (user.role === 'teacher') {
    const isInClass = await isStudentInTeacherClass(userId, studentId);
    if (!isInClass) {
      throw new ForbiddenError('Access denied');
    }
  }

  return await studentRepository.findById(studentId);
}
```

### 2.2 A02:2021 – Cryptographic Failures

| ID | Control | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| A02-01 | Classify data and identify sensitive data | Critical | [ ] | Data classification matrix |
| A02-02 | Encrypt all sensitive data at rest | Critical | [ ] | AES-256 |
| A02-03 | Encrypt all data in transit with TLS 1.3 | Critical | [ ] | HTTPS only |
| A02-04 | Use strong, up-to-date cryptographic algorithms | Critical | [ ] | No MD5, SHA1 for security |
| A02-05 | Hash passwords with bcrypt (cost factor 12) | Critical | [ ] | With pepper |
| A02-06 | Generate cryptographic keys securely | Critical | [ ] | Use crypto.randomBytes |
| A02-07 | Rotate encryption keys periodically | High | [ ] | Quarterly rotation |
| A02-08 | Store secrets in secure secrets manager | Critical | [ ] | Environment variables minimum |
| A02-09 | Disable caching for sensitive data responses | High | [ ] | Cache-Control headers |
| A02-10 | Never log sensitive data (passwords, tokens, PII) | Critical | [ ] | Data masking in logs |

**Implementation Details:**

```typescript
// A02-04: Cryptographic Configuration
const CRYPTO_CONFIG = {
  // Password hashing
  password: {
    algorithm: 'bcrypt',
    saltRounds: 12,
  },

  // Symmetric encryption
  symmetric: {
    algorithm: 'aes-256-gcm',
    keyLength: 32,
    ivLength: 16,
    tagLength: 16,
  },

  // Asymmetric (JWT signing)
  asymmetric: {
    algorithm: 'RS256',
    keySize: 4096,
  },

  // Hashing (non-password)
  hash: {
    algorithm: 'sha256',
  },

  // Random generation
  random: {
    tokenLength: 32,  // 256 bits
  },
};

// A02-10: PII Masking in Logs
function maskPII(data: Record<string, unknown>): Record<string, unknown> {
  const sensitiveFields = ['password', 'email', 'phone', 'address', 'ssn'];
  const masked = { ...data };

  for (const field of sensitiveFields) {
    if (field in masked) {
      masked[field] = '[REDACTED]';
    }
  }

  return masked;
}
```

### 2.3 A03:2021 – Injection

| ID | Control | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| A03-01 | Use parameterized queries (Prisma ORM) | Critical | [ ] | Never concatenate SQL |
| A03-02 | Validate and sanitize all user inputs | Critical | [ ] | Zod schemas |
| A03-03 | Use allowlist validation for permitted values | High | [ ] | Enum validation |
| A03-04 | Escape special characters for interpreter contexts | Critical | [ ] | Context-aware escaping |
| A03-05 | Use LIMIT and other SQL controls | Medium | [ ] | Prevent data extraction |
| A03-06 | Avoid dynamic queries where possible | High | [ ] | Use prepared statements |
| A03-07 | Validate file names and paths | Critical | [ ] | Path traversal prevention |
| A03-08 | Validate and sanitize HTML content | Critical | [ ] | DOMPurify |
| A03-09 | Validate JSON/XML inputs against schema | High | [ ] | Schema validation |
| A03-10 | Implement positive server-side validation | Critical | [ ] | Never trust client |

**Implementation Details:**

```typescript
// A03-01: Parameterized Queries with Prisma
// GOOD - Prisma automatically parameterizes
const student = await prisma.student.findFirst({
  where: {
    id: studentId,  // Parameterized
    name: {
      contains: searchTerm,  // Parameterized
    },
  },
});

// BAD - Never do this
// const result = await prisma.$queryRaw`
//   SELECT * FROM students WHERE name = '${userInput}'
// `;

// A03-02: Input Validation with Zod
import { z } from 'zod';

const createStudentSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\-\.]+$/, 'Name contains invalid characters'),
  email: z.string().email('Invalid email format'),
  classId: z.string().uuid('Invalid class ID'),
  dateOfBirth: z.string().datetime().optional(),
});

// A03-07: Path Traversal Prevention
function sanitizeFilename(filename: string): string {
  // Remove path separators and parent directory references
  return filename
    .replace(/\.\./g, '')
    .replace(/[\/\\]/g, '')
    .replace(/\0/g, '');
}

function isPathWithinBase(basePath: string, targetPath: string): boolean {
  const resolvedBase = path.resolve(basePath);
  const resolvedTarget = path.resolve(basePath, targetPath);
  return resolvedTarget.startsWith(resolvedBase + path.sep);
}
```

### 2.4 A04:2021 – Insecure Design

| ID | Control | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| A04-01 | Implement threat modeling for critical features | High | [ ] | Document threats |
| A04-02 | Use secure design patterns and architecture | High | [ ] | Defense in depth |
| A04-03 | Implement business logic security controls | Critical | [ ] | Rate limits, quotas |
| A04-04 | Design with fail-secure defaults | Critical | [ ] | Default deny |
| A04-05 | Separate user and admin functionality | High | [ ] | Separate routes/apps |
| A04-06 | Implement resource consumption limits | High | [ ] | File size, API calls |
| A04-07 | Use security requirements in user stories | Medium | [ ] | Abuse cases |
| A04-08 | Conduct security review of design | High | [ ] | Before implementation |
| A04-09 | Implement defense in depth | Critical | [ ] | Multiple layers |
| A04-10 | Use established security frameworks | High | [ ] | Don't reinvent |

### 2.5 A05:2021 – Security Misconfiguration

| ID | Control | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| A05-01 | Remove or disable unnecessary features | High | [ ] | Minimal attack surface |
| A05-02 | Configure secure defaults for all components | Critical | [ ] | Hardening |
| A05-03 | Keep software and dependencies updated | Critical | [ ] | Regular updates |
| A05-04 | Disable detailed error messages in production | Critical | [ ] | Generic errors |
| A05-05 | Implement security headers | Critical | [ ] | See Section 8 |
| A05-06 | Remove default accounts and passwords | Critical | [ ] | Before deployment |
| A05-07 | Disable unnecessary HTTP methods | Medium | [ ] | Only GET, POST, etc. |
| A05-08 | Configure cloud services securely | High | [ ] | S3, CDN, etc. |
| A05-09 | Separate development, staging, production | High | [ ] | Environment isolation |
| A05-10 | Automate configuration verification | Medium | [ ] | Infrastructure as code |

**Implementation Details:**

```typescript
// A05-04: Error Handling
// Production error handler - generic messages
function productionErrorHandler(error: Error, reply: FastifyReply) {
  // Log full error internally
  logger.error('Application error', {
    error: error.message,
    stack: error.stack,
  });

  // Return generic message to client
  if (error instanceof ValidationError) {
    return reply.code(400).send({
      error: 'Validation Error',
      message: 'Invalid input provided',
    });
  }

  if (error instanceof NotFoundError) {
    return reply.code(404).send({
      error: 'Not Found',
      message: 'Resource not found',
    });
  }

  // Generic 500 error - never expose internals
  return reply.code(500).send({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
  });
}
```

### 2.6 A06:2021 – Vulnerable and Outdated Components

| ID | Control | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| A06-01 | Maintain inventory of all components | High | [ ] | package.json |
| A06-02 | Remove unused dependencies | Medium | [ ] | depcheck |
| A06-03 | Run npm audit regularly | Critical | [ ] | Weekly minimum |
| A06-04 | Monitor for security advisories | Critical | [ ] | GitHub alerts |
| A06-05 | Use only official, maintained packages | High | [ ] | Check maintenance |
| A06-06 | Pin dependency versions | Medium | [ ] | package-lock.json |
| A06-07 | Subscribe to security mailing lists | Medium | [ ] | Node.js, React, etc. |
| A06-08 | Use automated dependency updates | High | [ ] | Dependabot |
| A06-09 | Test updates before deployment | High | [ ] | Staging environment |
| A06-10 | Have a plan for emergency patches | Critical | [ ] | Quick deployment |

**Implementation Details:**

```bash
# A06-03: Dependency Audit Script
#!/bin/bash

# Run npm audit
npm audit --production

# Check for outdated packages
npm outdated

# Use Snyk for deeper analysis
npx snyk test

# Check for known vulnerabilities in Docker images
docker scan smart-academy:latest
```

### 2.7 A07:2021 – Identification and Authentication Failures

| ID | Control | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| A07-01 | Implement MFA for privileged accounts | Critical | [ ] | Admin, Teacher |
| A07-02 | Enforce password complexity requirements | High | [ ] | See Auth Spec |
| A07-03 | Implement account lockout | Critical | [ ] | After 5 failures |
| A07-04 | Use secure session management | Critical | [ ] | See Auth Spec |
| A07-05 | Invalidate sessions on logout | Critical | [ ] | Server-side |
| A07-06 | Regenerate session IDs on login | Critical | [ ] | Prevent fixation |
| A07-07 | Use secure password recovery | High | [ ] | Time-limited tokens |
| A07-08 | Log all authentication events | High | [ ] | Success and failure |
| A07-09 | Protect against credential stuffing | Critical | [ ] | Rate limiting |
| A07-10 | Use secure credential storage | Critical | [ ] | bcrypt hashing |

### 2.8 A08:2021 – Software and Data Integrity Failures

| ID | Control | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| A08-01 | Verify integrity of software updates | High | [ ] | Checksums |
| A08-02 | Use Subresource Integrity (SRI) | High | [ ] | CDN resources |
| A08-03 | Verify CI/CD pipeline integrity | High | [ ] | Signed commits |
| A08-04 | Implement code signing | Medium | [ ] | App releases |
| A08-05 | Use trusted repositories only | High | [ ] | npm, official CDNs |
| A08-06 | Review and audit dependencies | High | [ ] | Before adding |
| A08-07 | Implement database integrity checks | Medium | [ ] | Foreign keys |
| A08-08 | Protect configuration from tampering | High | [ ] | Environment vars |
| A08-09 | Validate deserialized objects | Critical | [ ] | JSON schema |
| A08-10 | Implement audit logging | High | [ ] | Track changes |

**Implementation Details:**

```html
<!-- A08-02: Subresource Integrity -->
<script
  src="https://cdn.example.com/library.min.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxZJNMHmJm0O4M..."
  crossorigin="anonymous"
></script>

<link
  href="https://cdn.example.com/styles.css"
  rel="stylesheet"
  integrity="sha384-..."
  crossorigin="anonymous"
/>
```

### 2.9 A09:2021 – Security Logging and Monitoring Failures

| ID | Control | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| A09-01 | Log authentication events | Critical | [ ] | Login, logout, MFA |
| A09-02 | Log authorization failures | Critical | [ ] | Access denials |
| A09-03 | Log input validation failures | High | [ ] | Potential attacks |
| A09-04 | Log high-value transactions | Critical | [ ] | Payments, data changes |
| A09-05 | Ensure logs have sufficient detail | High | [ ] | Timestamp, user, action |
| A09-06 | Protect logs from tampering | Critical | [ ] | Write-once storage |
| A09-07 | Implement centralized logging | High | [ ] | ELK, CloudWatch |
| A09-08 | Set up alerting for security events | Critical | [ ] | Real-time alerts |
| A09-09 | Implement log retention policy | Medium | [ ] | Comply with regulations |
| A09-10 | Do not log sensitive data | Critical | [ ] | Mask PII |

**Implementation Details:**

```typescript
// A09-05: Security Event Logging
interface SecurityEvent {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'critical';
  event: string;
  category: 'auth' | 'access' | 'data' | 'system';
  user?: {
    id: string;
    role: string;
    ip: string;
    userAgent: string;
  };
  resource?: {
    type: string;
    id: string;
  };
  result: 'success' | 'failure';
  details: Record<string, unknown>;
}

function logSecurityEvent(event: SecurityEvent): void {
  // Mask any PII in details
  const maskedEvent = {
    ...event,
    details: maskPII(event.details),
  };

  // Send to centralized logging
  logger.log(maskedEvent);

  // Alert on critical events
  if (event.level === 'critical') {
    sendAlert(maskedEvent);
  }
}
```

### 2.10 A10:2021 – Server-Side Request Forgery (SSRF)

| ID | Control | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| A10-01 | Validate and sanitize all URLs | Critical | [ ] | Whitelist domains |
| A10-02 | Enforce URL schemas (https only) | High | [ ] | Block file://, etc. |
| A10-03 | Disable HTTP redirects | Medium | [ ] | Or limit redirects |
| A10-04 | Block access to internal networks | Critical | [ ] | 10.x, 172.16.x, etc. |
| A10-05 | Block access to cloud metadata | Critical | [ ] | 169.254.169.254 |
| A10-06 | Use allowlist for external calls | High | [ ] | Known APIs only |
| A10-07 | Limit response data returned | Medium | [ ] | Don't proxy full response |
| A10-08 | Use network segmentation | High | [ ] | Separate web and internal |
| A10-09 | Log all outbound requests | High | [ ] | For monitoring |
| A10-10 | Implement request timeouts | Medium | [ ] | Prevent hanging |

**Implementation Details:**

```typescript
// A10-01: URL Validation
import { URL } from 'url';

const ALLOWED_DOMAINS = [
  'api.bkash.com',
  'api.nagad.com',
  'sandbox.sslcommerz.com',
  'securepay.sslcommerz.com',
];

const BLOCKED_IP_RANGES = [
  /^127\./,                    // Localhost
  /^10\./,                     // Private
  /^172\.(1[6-9]|2[0-9]|3[01])\./, // Private
  /^192\.168\./,               // Private
  /^169\.254\./,               // Link-local (metadata)
  /^0\./,                      // Current network
];

function validateExternalUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);

    // Only allow HTTPS
    if (url.protocol !== 'https:') {
      return false;
    }

    // Check against allowlist
    if (!ALLOWED_DOMAINS.includes(url.hostname)) {
      return false;
    }

    // Block internal IPs
    for (const pattern of BLOCKED_IP_RANGES) {
      if (pattern.test(url.hostname)) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}
```

---

## 3. Input Validation Controls

### 3.1 General Input Validation

| ID | Control | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| INP-01 | Validate all inputs on server-side | Critical | [ ] | Never trust client |
| INP-02 | Use strict type checking | Critical | [ ] | TypeScript strict |
| INP-03 | Validate input length limits | High | [ ] | Min/max lengths |
| INP-04 | Use allowlist validation | High | [ ] | Known good values |
| INP-05 | Reject invalid input (don't sanitize) | High | [ ] | Fail-closed |
| INP-06 | Validate file uploads thoroughly | Critical | [ ] | Type, size, content |
| INP-07 | Canonicalize before validation | High | [ ] | Unicode normalization |
| INP-08 | Validate against expected format | High | [ ] | Regex patterns |
| INP-09 | Log validation failures | Medium | [ ] | Detect attacks |
| INP-10 | Implement rate limiting | High | [ ] | Prevent abuse |

### 3.2 Input Validation by Type

| Input Type | Validation Rules | Implementation |
|------------|------------------|----------------|
| Email | RFC 5322 format, max 254 chars | `z.string().email()` |
| Phone | E.164 format, Bangladesh pattern | Custom regex |
| Name | 2-100 chars, letters/spaces/hyphens | Character allowlist |
| Password | 8-128 chars, complexity rules | Custom validator |
| UUID | v4 format | `z.string().uuid()` |
| Date | ISO 8601 format | `z.string().datetime()` |
| Integer | Within expected range | `z.number().int().min().max()` |
| URL | Valid URL, allowed protocols | URL constructor + checks |
| File path | No traversal, allowed extensions | Path sanitization |
| HTML | Strict sanitization | DOMPurify |

### 3.3 File Upload Validation

| ID | Control | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| FILE-01 | Validate file extension (allowlist) | Critical | [ ] | .jpg, .png, .pdf only |
| FILE-02 | Validate MIME type | Critical | [ ] | Check actual type |
| FILE-03 | Validate file content (magic bytes) | High | [ ] | Match extension |
| FILE-04 | Limit file size | Critical | [ ] | 10MB max |
| FILE-05 | Rename files on upload | Critical | [ ] | UUID naming |
| FILE-06 | Store outside web root | Critical | [ ] | Private storage |
| FILE-07 | Scan for malware | High | [ ] | ClamAV integration |
| FILE-08 | Validate image dimensions | Medium | [ ] | Max 4000x4000 |
| FILE-09 | Strip metadata from images | Medium | [ ] | EXIF removal |
| FILE-10 | Serve with Content-Disposition | High | [ ] | Force download for some types |

**Implementation Details:**

```typescript
// File Upload Validation
import { fileTypeFromBuffer } from 'file-type';

const ALLOWED_FILE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/gif': ['.gif'],
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

async function validateFileUpload(
  file: Buffer,
  originalName: string
): Promise<{ valid: boolean; error?: string }> {
  // Check file size
  if (file.length > MAX_FILE_SIZE) {
    return { valid: false, error: 'File too large' };
  }

  // Check file extension
  const ext = path.extname(originalName).toLowerCase();
  const allowedExts = Object.values(ALLOWED_FILE_TYPES).flat();
  if (!allowedExts.includes(ext)) {
    return { valid: false, error: 'File type not allowed' };
  }

  // Verify actual file type matches extension
  const detectedType = await fileTypeFromBuffer(file);
  if (!detectedType || !ALLOWED_FILE_TYPES[detectedType.mime]?.includes(ext)) {
    return { valid: false, error: 'File content does not match extension' };
  }

  return { valid: true };
}
```

---

## 4. Output Encoding Controls

### 4.1 Context-Sensitive Encoding

| ID | Control | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| OUT-01 | HTML encode for HTML context | Critical | [ ] | React auto-encodes |
| OUT-02 | JavaScript encode for JS context | Critical | [ ] | JSON.stringify |
| OUT-03 | URL encode for URL parameters | High | [ ] | encodeURIComponent |
| OUT-04 | CSS encode for style context | High | [ ] | Avoid inline styles |
| OUT-05 | Use framework auto-escaping | Critical | [ ] | React, Next.js |
| OUT-06 | Never use dangerouslySetInnerHTML without sanitization | Critical | [ ] | DOMPurify required |
| OUT-07 | Encode database output | High | [ ] | Before rendering |
| OUT-08 | Set correct Content-Type headers | High | [ ] | text/html, etc. |
| OUT-09 | Use charset in Content-Type | Medium | [ ] | UTF-8 |
| OUT-10 | Validate output against expected format | Medium | [ ] | Response validation |

### 4.2 Encoding Functions

```typescript
// Context-Specific Encoding

// HTML encoding (React handles automatically)
// Manual encoding if needed:
function htmlEncode(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// JavaScript encoding for inline scripts
function jsEncode(str: string): string {
  return JSON.stringify(str).slice(1, -1);
}

// URL encoding
function urlEncode(str: string): string {
  return encodeURIComponent(str);
}

// Safe HTML rendering (when needed)
import DOMPurify from 'dompurify';

function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [],
  });
}
```

---

## 5. CSRF Protection

### 5.1 CSRF Controls

| ID | Control | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| CSRF-01 | Use SameSite=Strict cookies | Critical | [ ] | Primary defense |
| CSRF-02 | Implement CSRF tokens for forms | High | [ ] | Synchronizer token |
| CSRF-03 | Validate Origin/Referer headers | Medium | [ ] | Additional check |
| CSRF-04 | Use custom request headers for API | High | [ ] | X-Requested-With |
| CSRF-05 | Re-authenticate for sensitive operations | High | [ ] | Password confirmation |
| CSRF-06 | Use POST for state-changing operations | High | [ ] | Never GET for changes |
| CSRF-07 | Generate unique tokens per session | Critical | [ ] | Not predictable |
| CSRF-08 | Rotate CSRF tokens periodically | Medium | [ ] | Per-request or session |
| CSRF-09 | Log CSRF validation failures | High | [ ] | Detect attacks |
| CSRF-10 | Protect logout from CSRF | Medium | [ ] | POST with token |

### 5.2 CSRF Implementation

```typescript
// CSRF Token Generation and Validation
import crypto from 'crypto';

function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Store in session
async function setSessionCsrfToken(sessionId: string, token: string): Promise<void> {
  await redis.set(`csrf:${sessionId}`, token, 'EX', 3600);
}

// Validate token
async function validateCsrfToken(
  sessionId: string,
  providedToken: string
): Promise<boolean> {
  const storedToken = await redis.get(`csrf:${sessionId}`);

  if (!storedToken || !providedToken) {
    return false;
  }

  // Constant-time comparison
  return crypto.timingSafeEqual(
    Buffer.from(storedToken),
    Buffer.from(providedToken)
  );
}

// Cookie configuration for SameSite
const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict' as const,  // Primary CSRF protection
  path: '/',
};
```

---

## 6. XSS Prevention

### 6.1 XSS Controls

| ID | Control | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| XSS-01 | Use React's automatic escaping | Critical | [ ] | Default behavior |
| XSS-02 | Sanitize all user HTML input | Critical | [ ] | DOMPurify |
| XSS-03 | Implement Content Security Policy | Critical | [ ] | See Section 9 |
| XSS-04 | Set X-XSS-Protection header | Medium | [ ] | Legacy browser support |
| XSS-05 | Use HttpOnly cookies | Critical | [ ] | Prevent theft |
| XSS-06 | Avoid dangerouslySetInnerHTML | Critical | [ ] | Or sanitize first |
| XSS-07 | Validate URLs before rendering | High | [ ] | javascript: prevention |
| XSS-08 | Use text/plain for user content downloads | Medium | [ ] | Not text/html |
| XSS-09 | Implement input validation | High | [ ] | Reject malformed |
| XSS-10 | Use Trusted Types (experimental) | Low | [ ] | Future consideration |

### 6.2 XSS Prevention Patterns

```typescript
// XSS-01: React automatic escaping (safe)
function UserGreeting({ name }: { name: string }) {
  // This is safe - React escapes the name
  return <h1>Hello, {name}</h1>;
}

// XSS-06: Safe HTML rendering with sanitization
import DOMPurify from 'dompurify';

function RichTextContent({ html }: { html: string }) {
  // Sanitize before rendering
  const cleanHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'a'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}

// XSS-07: URL Validation
function SafeLink({ url, children }: { url: string; children: React.ReactNode }) {
  const isValidUrl = (urlString: string): boolean => {
    try {
      const parsed = new URL(urlString);
      // Only allow http and https
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  };

  if (!isValidUrl(url)) {
    return <span>{children}</span>;
  }

  return (
    <a href={url} rel="noopener noreferrer">
      {children}
    </a>
  );
}
```

---

## 7. SQL Injection Prevention

### 7.1 SQL Injection Controls

| ID | Control | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| SQL-01 | Use Prisma ORM exclusively | Critical | [ ] | Parameterized by default |
| SQL-02 | Never concatenate user input in queries | Critical | [ ] | Code review |
| SQL-03 | Use parameterized queries for raw SQL | Critical | [ ] | When ORM not possible |
| SQL-04 | Validate input types strictly | High | [ ] | UUID, integer, etc. |
| SQL-05 | Use stored procedures where appropriate | Medium | [ ] | Complex operations |
| SQL-06 | Apply least privilege to database users | High | [ ] | Role-based access |
| SQL-07 | Enable query logging | High | [ ] | Detect anomalies |
| SQL-08 | Limit query results | Medium | [ ] | LIMIT clause |
| SQL-09 | Use database-level encoding | Medium | [ ] | UTF-8 |
| SQL-10 | Regular security testing | High | [ ] | SQLMap, etc. |

### 7.2 Safe Query Patterns

```typescript
// SQL-01: Using Prisma ORM (Safe)
async function findStudentByName(name: string): Promise<Student[]> {
  // Prisma automatically parameterizes all inputs
  return prisma.student.findMany({
    where: {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
    take: 50,  // SQL-08: Limit results
  });
}

// SQL-03: Raw SQL when needed (Still Safe)
async function complexQuery(classId: string): Promise<unknown> {
  // Use Prisma's $queryRaw with template literals (parameterized)
  return prisma.$queryRaw`
    SELECT s.*, COUNT(a.id) as attendance_count
    FROM students s
    LEFT JOIN attendance a ON s.id = a.student_id
    WHERE s.class_id = ${classId}  -- Parameterized!
    GROUP BY s.id
  `;
}

// DANGEROUS - Never do this!
// const result = await prisma.$executeRawUnsafe(
//   `SELECT * FROM students WHERE name = '${userInput}'`
// );
```

---

## 8. Security Headers Configuration

### 8.1 Required Security Headers

| ID | Header | Value | Priority | Status |
|----|--------|-------|----------|--------|
| HDR-01 | Strict-Transport-Security | max-age=31536000; includeSubDomains; preload | Critical | [ ] |
| HDR-02 | X-Content-Type-Options | nosniff | Critical | [ ] |
| HDR-03 | X-Frame-Options | DENY | High | [ ] |
| HDR-04 | X-XSS-Protection | 0 | Medium | [ ] |
| HDR-05 | Content-Security-Policy | See Section 9 | Critical | [ ] |
| HDR-06 | Referrer-Policy | strict-origin-when-cross-origin | High | [ ] |
| HDR-07 | Permissions-Policy | See below | High | [ ] |
| HDR-08 | Cache-Control | no-store (for sensitive) | High | [ ] |
| HDR-09 | Cross-Origin-Opener-Policy | same-origin | Medium | [ ] |
| HDR-10 | Cross-Origin-Embedder-Policy | require-corp | Medium | [ ] |

### 8.2 Header Implementation

```typescript
// Next.js Security Headers Configuration
// next.config.ts

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-XSS-Protection',
    value: '0',  // Disabled as CSP is preferred
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'require-corp',
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

### 8.3 Fastify Security Headers

```typescript
// Fastify Security Headers Plugin
import fastifyHelmet from '@fastify/helmet';

fastify.register(fastifyHelmet, {
  contentSecurityPolicy: false,  // Custom CSP below
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  frameguard: {
    action: 'deny',
  },
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin',
  },
  permittedCrossDomainPolicies: false,
  dnsPrefetchControl: {
    allow: false,
  },
});
```

---

## 9. Content Security Policy

### 9.1 CSP Configuration

| ID | Directive | Value | Notes | Status |
|----|-----------|-------|-------|--------|
| CSP-01 | default-src | 'self' | Base restriction | [ ] |
| CSP-02 | script-src | 'self' 'nonce-{random}' | Strict CSP with nonces | [ ] |
| CSP-03 | style-src | 'self' 'unsafe-inline' | Tailwind requires inline | [ ] |
| CSP-04 | img-src | 'self' data: https: | Images from any HTTPS | [ ] |
| CSP-05 | font-src | 'self' https://fonts.gstatic.com | Google Fonts | [ ] |
| CSP-06 | connect-src | 'self' wss: https://api.* | API and WebSocket | [ ] |
| CSP-07 | frame-ancestors | 'none' | No embedding | [ ] |
| CSP-08 | form-action | 'self' | Forms submit to self | [ ] |
| CSP-09 | base-uri | 'self' | Base tag restriction | [ ] |
| CSP-10 | report-uri | /api/csp-report | Violation reporting | [ ] |

### 9.2 CSP Implementation

```typescript
// CSP Middleware for Next.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export function middleware(request: Request) {
  const nonce = crypto.randomBytes(16).toString('base64');

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https: blob:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://*.smartacademy.edu.bd wss://*.smartacademy.edu.bd https://api.bkash.com https://api.nagad.com;
    frame-ancestors 'none';
    form-action 'self';
    base-uri 'self';
    object-src 'none';
    upgrade-insecure-requests;
    report-uri /api/csp-report;
  `.replace(/\s+/g, ' ').trim();

  const response = NextResponse.next();

  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Nonce', nonce);

  return response;
}
```

### 9.3 CSP Violation Reporting

```typescript
// CSP Report Handler
// app/api/csp-report/route.ts

export async function POST(request: Request) {
  try {
    const report = await request.json();

    // Log CSP violation
    logger.warn('CSP Violation', {
      documentUri: report['csp-report']?.['document-uri'],
      violatedDirective: report['csp-report']?.['violated-directive'],
      blockedUri: report['csp-report']?.['blocked-uri'],
      sourceFile: report['csp-report']?.['source-file'],
      lineNumber: report['csp-report']?.['line-number'],
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(null, { status: 400 });
  }
}
```

---

## 10. Additional Security Controls

### 10.1 API Security

| ID | Control | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| API-01 | Implement rate limiting | Critical | [ ] | Per-user and per-IP |
| API-02 | Use API versioning | Medium | [ ] | /api/v1/* |
| API-03 | Validate Content-Type header | High | [ ] | application/json |
| API-04 | Implement request size limits | High | [ ] | 10MB max |
| API-05 | Use pagination for list endpoints | High | [ ] | Limit results |
| API-06 | Implement field-level filtering | Medium | [ ] | GraphQL-style |
| API-07 | Log all API requests | High | [ ] | Audit trail |
| API-08 | Implement API key rotation | Medium | [ ] | For integrations |
| API-09 | Use request signing for webhooks | High | [ ] | HMAC signatures |
| API-10 | Implement CORS properly | Critical | [ ] | Whitelist origins |

### 10.2 Payment Security

| ID | Control | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| PAY-01 | Never store card numbers | Critical | [ ] | Use tokenization |
| PAY-02 | Use HTTPS for all payment flows | Critical | [ ] | TLS 1.3 |
| PAY-03 | Validate payment gateway responses | Critical | [ ] | Signature verification |
| PAY-04 | Implement idempotency for payments | Critical | [ ] | Prevent double-charge |
| PAY-05 | Log all payment transactions | Critical | [ ] | Audit trail |
| PAY-06 | Use separate payment microservice | High | [ ] | Isolation |
| PAY-07 | Implement webhook security | Critical | [ ] | Signature verification |
| PAY-08 | Monitor for fraudulent patterns | High | [ ] | Anomaly detection |
| PAY-09 | Comply with gateway requirements | Critical | [ ] | bKash, Nagad specs |
| PAY-10 | Store minimal payment data | Critical | [ ] | Reference IDs only |

### 10.3 Mobile App Security

| ID | Control | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| MOB-01 | Implement certificate pinning | High | [ ] | Prevent MITM |
| MOB-02 | Use secure storage for tokens | Critical | [ ] | Keychain/Keystore |
| MOB-03 | Implement root/jailbreak detection | Medium | [ ] | Warning only |
| MOB-04 | Obfuscate sensitive code | Medium | [ ] | ProGuard/R8 |
| MOB-05 | Disable debugging in production | High | [ ] | Release builds |
| MOB-06 | Implement app integrity checks | Medium | [ ] | Tampering detection |
| MOB-07 | Use biometric authentication securely | High | [ ] | Fallback to PIN |
| MOB-08 | Clear sensitive data on logout | Critical | [ ] | Token cleanup |
| MOB-09 | Implement session timeout | High | [ ] | Background timeout |
| MOB-10 | Validate server certificates | Critical | [ ] | SSL/TLS validation |

---

## 11. Pre-Deployment Security Checklist

### 11.1 Development Phase Checklist

| Category | Control | Status | Verified By | Date |
|----------|---------|--------|-------------|------|
| **Authentication** |
| | Password hashing implemented (bcrypt) | [ ] | | |
| | MFA implemented for admin accounts | [ ] | | |
| | Session management secure | [ ] | | |
| | JWT implementation secure | [ ] | | |
| **Authorization** |
| | RBAC implemented and tested | [ ] | | |
| | All endpoints protected | [ ] | | |
| | IDOR vulnerabilities addressed | [ ] | | |
| **Input Validation** |
| | All inputs validated server-side | [ ] | | |
| | File upload validation implemented | [ ] | | |
| | SQL injection prevention verified | [ ] | | |
| **Output Encoding** |
| | XSS prevention verified | [ ] | | |
| | CSP implemented and tested | [ ] | | |
| | Security headers configured | [ ] | | |

### 11.2 Pre-Production Checklist

| Category | Control | Status | Verified By | Date |
|----------|---------|--------|-------------|------|
| **Configuration** |
| | Debug mode disabled | [ ] | | |
| | Production secrets configured | [ ] | | |
| | Default accounts removed | [ ] | | |
| | Error messages are generic | [ ] | | |
| **Dependencies** |
| | npm audit passed | [ ] | | |
| | No critical vulnerabilities | [ ] | | |
| | All packages from official sources | [ ] | | |
| **Infrastructure** |
| | TLS/HTTPS configured | [ ] | | |
| | Firewall rules configured | [ ] | | |
| | Database access restricted | [ ] | | |
| | Backup encryption verified | [ ] | | |

### 11.3 Go-Live Checklist

| Category | Control | Status | Verified By | Date |
|----------|---------|--------|-------------|------|
| **Monitoring** |
| | Security logging enabled | [ ] | | |
| | Alerting configured | [ ] | | |
| | Uptime monitoring active | [ ] | | |
| **Documentation** |
| | Security procedures documented | [ ] | | |
| | Incident response plan ready | [ ] | | |
| | Contact information updated | [ ] | | |
| **Final Verification** |
| | Penetration testing completed | [ ] | | |
| | Security review signed off | [ ] | | |
| | OWASP Top 10 mitigated | [ ] | | |
| | All critical controls verified | [ ] | | |

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

*This Security Controls Checklist provides the implementation requirements and verification procedures for all security controls in the Smart Academy Digital Portal. All controls must be verified before production deployment.*

---

## References

- [OWASP Top 10 2025](https://owasp.org/Top10/)
- [OWASP ASVS 4.0](https://owasp.org/www-project-application-security-verification-standard/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [MDN Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Security Headers Best Practices](https://www.dotcms.com/blog/security-headers-best-practices)
