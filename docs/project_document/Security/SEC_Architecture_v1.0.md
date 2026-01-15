# Smart Academy Digital Portal - Security Architecture Document

**Document Title:** Security Architecture Document
**Document ID:** SEC_Architecture_v1.0
**Version:** 1.0
**Date:** January 10, 2026
**Project Name:** Smart Academy Digital Web Portal Development
**Prepared By:** Solo Full-Stack Developer

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | January 10, 2026 | Development Team | Initial Security Architecture Document |

**Reference Documents:**
- Smart Academy System Architecture v1.0
- Smart Academy Technology Stack v1.0
- Smart Academy Non-Functional Requirements v1.0
- OWASP Top 10 2025

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Security Principles](#2-security-principles)
3. [Defense in Depth Strategy](#3-defense-in-depth-strategy)
4. [Attack Surface Analysis](#4-attack-surface-analysis)
5. [Security Zones](#5-security-zones)
6. [Trust Boundaries](#6-trust-boundaries)
7. [Data Classification](#7-data-classification)
8. [Security Architecture Diagrams](#8-security-architecture-diagrams)
9. [Security Monitoring and Logging](#9-security-monitoring-and-logging)
10. [Incident Response Framework](#10-incident-response-framework)

---

## 1. Introduction

### 1.1 Purpose

This Security Architecture Document defines the comprehensive security framework for the Smart Academy Digital Portal. It establishes the security principles, defense strategies, and architectural decisions that protect the system, its users, and sensitive data from threats and vulnerabilities.

### 1.2 Scope

This document covers security architecture for:
- Public Website (Next.js 15)
- Admin Dashboard (React 18 + Vite 6)
- Backend API Services (Node.js 22 LTS + Fastify 5)
- Mobile Application (React Native + Expo 52)
- Database Systems (PostgreSQL 17, MySQL 8.4, Redis 8)
- Integration Points (Gibbon SIS, Moodle LMS, Payment Gateways)

### 1.3 Target Audience

- Development Team
- System Administrators
- Security Auditors
- School Management
- Third-party Integrators

### 1.4 Security Context

Smart Academy Digital Portal handles sensitive data including:
- **Student Personal Information**: Names, dates of birth, addresses, photos
- **Academic Records**: Grades, attendance, Quran progress
- **Financial Data**: Fee payments, transaction records
- **Parent/Guardian Information**: Contact details, relationships
- **Authentication Credentials**: Passwords, session tokens

The system serves multiple user types with varying trust levels:
- Students (ages 5-15)
- Parents/Guardians
- Teachers
- Administrative Staff
- School Leadership
- System Administrators

---

## 2. Security Principles

### 2.1 Core Security Principles

| Principle | Description | Implementation |
|-----------|-------------|----------------|
| **Least Privilege** | Users and processes receive minimum necessary permissions | Role-based access control with granular permissions |
| **Defense in Depth** | Multiple security layers protect assets | Multi-tier architecture with redundant controls |
| **Fail Secure** | System fails to a secure state | Default-deny policies, graceful error handling |
| **Separation of Duties** | Critical operations require multiple parties | Admin actions require approval workflows |
| **Complete Mediation** | Every access request is verified | Middleware-based authorization checks |
| **Open Design** | Security doesn't rely on obscurity | Published security practices, standard algorithms |
| **Psychological Acceptability** | Security measures are user-friendly | Intuitive interfaces, clear error messages |
| **Economy of Mechanism** | Simple, minimal security implementations | Standard libraries, proven frameworks |

### 2.2 Security-by-Design Principles

```
┌─────────────────────────────────────────────────────────────────┐
│                    SECURITY-BY-DESIGN                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   SECURE    │  │   SECURE    │  │   SECURE    │             │
│  │   DEFAULTS  │  │   BY        │  │   LIFECYCLE │             │
│  │             │  │   DEFAULT   │  │             │             │
│  │ • Deny all  │  │ • No debug  │  │ • Secure    │             │
│  │ • Encrypt   │  │ • Strong    │  │   coding    │             │
│  │   always    │  │   auth      │  │ • Testing   │             │
│  │ • Log all   │  │ • Minimal   │  │ • Review    │             │
│  │   access    │  │   exposure  │  │ • Patching  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 CIA Triad Implementation

| Aspect | Requirement | Implementation |
|--------|-------------|----------------|
| **Confidentiality** | Protect sensitive data from unauthorized disclosure | Encryption (TLS 1.3, AES-256), access controls, data masking |
| **Integrity** | Ensure data accuracy and prevent unauthorized modification | Digital signatures, checksums, audit trails, input validation |
| **Availability** | Ensure system accessibility when needed | Redundancy, backup systems, DDoS protection, monitoring |

### 2.4 Zero Trust Principles

Smart Academy implements a Zero Trust security model:

1. **Never Trust, Always Verify**: Every request is authenticated and authorized
2. **Assume Breach**: Design systems assuming attackers may already have access
3. **Verify Explicitly**: Use multiple attributes for access decisions
4. **Least Privileged Access**: Just-in-time and just-enough access
5. **Micro-segmentation**: Isolate network segments and services

```
┌─────────────────────────────────────────────────────────────────┐
│                     ZERO TRUST MODEL                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│    ┌──────────┐    ┌──────────┐    ┌──────────┐                │
│    │ Identity │───>│  Device  │───>│  Access  │                │
│    │ Verify   │    │  Health  │    │ Decision │                │
│    └──────────┘    └──────────┘    └─────┬────┘                │
│                                          │                      │
│    ┌──────────────────────────────────────▼────────────────┐   │
│    │                  Policy Engine                         │   │
│    │  • User context  • Device context  • Risk level       │   │
│    │  • Location      • Time            • Resource type    │   │
│    └──────────────────────────────────────┬────────────────┘   │
│                                           │                     │
│    ┌────────────┐    ┌────────────┐    ┌──▼─────────┐          │
│    │ Continuous │    │ Micro-     │    │ Protected  │          │
│    │ Monitoring │<───│ Segment    │<───│ Resources  │          │
│    └────────────┘    └────────────┘    └────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Defense in Depth Strategy

### 3.1 Security Layers Overview

Smart Academy implements seven security layers aligned with modern defense-in-depth best practices:

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEFENSE IN DEPTH LAYERS                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Layer 7: DATA SECURITY                                         │
│  ├── Encryption at rest (AES-256)                              │
│  ├── Encryption in transit (TLS 1.3)                           │
│  ├── Data classification                                        │
│  └── Data loss prevention                                       │
│                                                                 │
│  Layer 6: APPLICATION SECURITY                                  │
│  ├── Input validation                                           │
│  ├── Output encoding                                            │
│  ├── OWASP Top 10 mitigations                                  │
│  └── Secure coding practices                                    │
│                                                                 │
│  Layer 5: ENDPOINT SECURITY                                     │
│  ├── Client-side validation                                     │
│  ├── Content Security Policy                                    │
│  ├── Subresource Integrity                                      │
│  └── Mobile app security                                        │
│                                                                 │
│  Layer 4: NETWORK SECURITY                                      │
│  ├── TLS/HTTPS enforcement                                      │
│  ├── Rate limiting                                              │
│  ├── DDoS protection                                            │
│  └── Network segmentation                                       │
│                                                                 │
│  Layer 3: IDENTITY & ACCESS                                     │
│  ├── Authentication (JWT, MFA)                                  │
│  ├── Authorization (RBAC)                                       │
│  ├── Session management                                         │
│  └── SSO integration                                            │
│                                                                 │
│  Layer 2: PERIMETER SECURITY                                    │
│  ├── Web Application Firewall (WAF)                            │
│  ├── CDN protection                                             │
│  ├── Geo-blocking (optional)                                    │
│  └── Bot protection                                             │
│                                                                 │
│  Layer 1: PHYSICAL/INFRASTRUCTURE                               │
│  ├── Hosting provider security                                  │
│  ├── Database isolation                                         │
│  ├── Backup encryption                                          │
│  └── Environment separation                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Layer Details

#### 3.2.1 Layer 1: Physical/Infrastructure Security

| Control | Description | Implementation |
|---------|-------------|----------------|
| Hosting Security | Secure hosting infrastructure | Cloud provider with SOC 2 compliance |
| Database Isolation | Separate database servers | Private network, no public IP |
| Backup Encryption | Encrypted backup storage | AES-256 encryption for all backups |
| Environment Separation | Isolated dev/staging/prod | Separate infrastructure per environment |

#### 3.2.2 Layer 2: Perimeter Security

| Control | Description | Implementation |
|---------|-------------|----------------|
| WAF | Filter malicious traffic | Cloud-based WAF (Cloudflare/AWS WAF) |
| CDN Protection | Edge security and caching | Cloudflare or similar CDN |
| DDoS Protection | Mitigate denial of service | CDN-level and application-level protection |
| Rate Limiting | Prevent abuse | API rate limits per IP/user |

#### 3.2.3 Layer 3: Identity & Access Security

| Control | Description | Implementation |
|---------|-------------|----------------|
| Authentication | Verify user identity | JWT with RS256, bcrypt passwords |
| MFA | Multi-factor authentication | TOTP-based for admin/teacher accounts |
| Authorization | Control access rights | RBAC with granular permissions |
| Session Management | Secure session handling | Short-lived tokens, secure cookies |

#### 3.2.4 Layer 4: Network Security

| Control | Description | Implementation |
|---------|-------------|----------------|
| TLS Enforcement | Encrypt all traffic | TLS 1.3, HSTS headers |
| Rate Limiting | Prevent brute force attacks | Per-endpoint rate limits |
| Network Segmentation | Isolate components | Private subnets, security groups |
| API Security | Protect API endpoints | API key validation, request signing |

#### 3.2.5 Layer 5: Endpoint Security

| Control | Description | Implementation |
|---------|-------------|----------------|
| CSP | Content Security Policy | Strict CSP with nonces |
| SRI | Subresource Integrity | Hash verification for external resources |
| CORS | Cross-Origin Resource Sharing | Strict origin whitelist |
| Client Security | Browser security features | Security headers, secure contexts |

#### 3.2.6 Layer 6: Application Security

| Control | Description | Implementation |
|---------|-------------|----------------|
| Input Validation | Validate all inputs | Zod schemas, parameterized queries |
| Output Encoding | Prevent XSS | React auto-escaping, explicit encoding |
| Error Handling | Secure error responses | Generic messages, detailed logging |
| Dependency Security | Secure dependencies | npm audit, Snyk integration |

#### 3.2.7 Layer 7: Data Security

| Control | Description | Implementation |
|---------|-------------|----------------|
| Encryption at Rest | Protect stored data | AES-256, database encryption |
| Encryption in Transit | Protect data in motion | TLS 1.3 |
| Data Masking | Hide sensitive data | PII masking in logs/displays |
| Data Classification | Categorize data sensitivity | Defined classification levels |

### 3.3 Security Control Matrix

| Threat Category | Layer 1 | Layer 2 | Layer 3 | Layer 4 | Layer 5 | Layer 6 | Layer 7 |
|-----------------|---------|---------|---------|---------|---------|---------|---------|
| Unauthorized Access | ✓ | ✓ | ✓✓✓ | ✓ | ✓ | ✓ | ✓ |
| Data Breach | ✓ | | ✓ | ✓ | | ✓ | ✓✓✓ |
| DDoS Attack | | ✓✓✓ | | ✓✓ | | | |
| SQL Injection | | | | | | ✓✓✓ | ✓ |
| XSS Attack | | | | | ✓✓ | ✓✓✓ | |
| CSRF Attack | | | | | ✓✓ | ✓✓✓ | |
| Session Hijacking | | | ✓✓✓ | ✓ | ✓ | ✓ | |
| Man-in-the-Middle | | | | ✓✓✓ | | | ✓ |

**Legend:** ✓ = Basic Protection, ✓✓ = Medium Protection, ✓✓✓ = Primary Protection

---

## 4. Attack Surface Analysis

### 4.1 Attack Surface Components

#### 4.1.1 External Attack Surface

| Component | Entry Points | Risk Level | Mitigation |
|-----------|--------------|------------|------------|
| Public Website | All public pages, forms | Medium | WAF, input validation, rate limiting |
| API Endpoints | REST API routes | High | Authentication, authorization, validation |
| Authentication | Login, password reset, MFA | Critical | Brute force protection, secure tokens |
| File Upload | Document/image uploads | High | Type validation, virus scan, size limits |
| Payment Gateway | Payment integration | Critical | PCI-DSS compliance, tokenization |
| Email Links | Password reset, verification | Medium | Token expiration, secure generation |
| Mobile App | App API calls | Medium | Certificate pinning, secure storage |

#### 4.1.2 Internal Attack Surface

| Component | Entry Points | Risk Level | Mitigation |
|-----------|--------------|------------|------------|
| Admin Dashboard | Admin interface | Critical | MFA, IP whitelist, audit logging |
| Database | Direct database access | Critical | Private network, encrypted connections |
| Internal APIs | Service-to-service calls | High | Internal authentication, mTLS |
| File Storage | Uploaded files | Medium | Encryption, access controls |
| Cache Layer | Redis cache | Medium | Authentication, private network |
| Message Queue | Event processing | Low | Internal network only |

### 4.2 Attack Surface Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    ATTACK SURFACE MAP                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  EXTERNAL THREATS                    INTERNAL THREATS           │
│  ================                    ================           │
│                                                                 │
│  ┌──────────────┐                   ┌──────────────┐           │
│  │ Internet     │                   │ Admin Users  │           │
│  │ Attackers    │                   │ (Privileged) │           │
│  └──────┬───────┘                   └──────┬───────┘           │
│         │                                   │                   │
│         ▼                                   ▼                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                     PERIMETER                            │   │
│  │  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────────┐  ┌─────────┐   │   │
│  │  │ WAF │  │ CDN │  │ DDoS│  │Rate Limit│  │IP Filter│   │   │
│  │  └─────┘  └─────┘  └─────┘  └─────────┘  └─────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  APPLICATION LAYER                       │   │
│  │                                                          │   │
│  │   ┌────────────┐  ┌────────────┐  ┌────────────┐        │   │
│  │   │ Public Web │  │ Admin UI   │  │ Mobile App │        │   │
│  │   │ (Next.js)  │  │ (React)    │  │ (RN+Expo)  │        │   │
│  │   └─────┬──────┘  └─────┬──────┘  └─────┬──────┘        │   │
│  │         │               │               │                │   │
│  │         └───────────────┼───────────────┘                │   │
│  │                         ▼                                 │   │
│  │              ┌─────────────────────┐                     │   │
│  │              │   API Gateway       │                     │   │
│  │              │   (Fastify)         │                     │   │
│  │              └──────────┬──────────┘                     │   │
│  │                         │                                 │   │
│  └─────────────────────────┼────────────────────────────────┘   │
│                            │                                    │
│  ┌─────────────────────────▼────────────────────────────────┐   │
│  │                    DATA LAYER                             │   │
│  │                                                           │   │
│  │   ┌────────────┐  ┌────────────┐  ┌────────────┐         │   │
│  │   │ PostgreSQL │  │   MySQL    │  │   Redis    │         │   │
│  │   │ (Primary)  │  │ (Gibbon)   │  │  (Cache)   │         │   │
│  │   └────────────┘  └────────────┘  └────────────┘         │   │
│  │                                                           │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Attack Vector Analysis

| Vector | Description | Likelihood | Impact | Risk Score | Priority |
|--------|-------------|------------|--------|------------|----------|
| SQL Injection | Database manipulation | Low | Critical | High | P1 |
| XSS (Stored) | Script injection | Medium | High | High | P1 |
| Authentication Bypass | Unauthorized access | Low | Critical | High | P1 |
| IDOR | Accessing other users' data | Medium | High | High | P1 |
| CSRF | Forged requests | Low | Medium | Medium | P2 |
| Credential Stuffing | Password attacks | High | High | High | P1 |
| File Upload Exploit | Malicious file execution | Low | High | Medium | P2 |
| API Abuse | Rate limit bypass | Medium | Medium | Medium | P2 |
| Session Hijacking | Token theft | Low | High | Medium | P2 |
| SSRF | Server-side request forgery | Low | High | Medium | P2 |

---

## 5. Security Zones

### 5.1 Zone Definitions

```
┌─────────────────────────────────────────────────────────────────┐
│                      SECURITY ZONES                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ZONE 0: UNTRUSTED (Internet)                            │   │
│  │ • Anonymous users                                        │   │
│  │ • Public API consumers                                   │   │
│  │ • Potential attackers                                    │   │
│  │ Trust Level: NONE                                        │   │
│  └───────────────────────────┬─────────────────────────────┘   │
│                              │ [WAF, CDN, Rate Limiting]        │
│  ┌───────────────────────────▼─────────────────────────────┐   │
│  │ ZONE 1: DMZ (Public Access)                             │   │
│  │ • Public website (read-only content)                    │   │
│  │ • Login/registration pages                              │   │
│  │ • Public API endpoints                                   │   │
│  │ Trust Level: MINIMAL                                     │   │
│  └───────────────────────────┬─────────────────────────────┘   │
│                              │ [Authentication Required]        │
│  ┌───────────────────────────▼─────────────────────────────┐   │
│  │ ZONE 2: AUTHENTICATED (User Access)                      │   │
│  │ • Student/Parent portals                                 │   │
│  │ • Teacher dashboards                                     │   │
│  │ • Protected API endpoints                                │   │
│  │ Trust Level: LOW-MEDIUM (based on role)                  │   │
│  └───────────────────────────┬─────────────────────────────┘   │
│                              │ [Role Authorization + MFA]       │
│  ┌───────────────────────────▼─────────────────────────────┐   │
│  │ ZONE 3: PRIVILEGED (Admin Access)                        │   │
│  │ • Admin dashboard                                        │   │
│  │ • System configuration                                   │   │
│  │ • User management                                        │   │
│  │ Trust Level: MEDIUM-HIGH                                 │   │
│  └───────────────────────────┬─────────────────────────────┘   │
│                              │ [Encryption, Access Logs]        │
│  ┌───────────────────────────▼─────────────────────────────┐   │
│  │ ZONE 4: RESTRICTED (Data Layer)                          │   │
│  │ • Database servers                                       │   │
│  │ • Backup systems                                         │   │
│  │ • Encryption keys                                        │   │
│  │ Trust Level: HIGH (verified services only)               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Zone Security Controls

| Zone | Network Controls | Access Controls | Data Controls |
|------|------------------|-----------------|---------------|
| Zone 0 | WAF, DDoS protection | None (public) | No sensitive data |
| Zone 1 | TLS, rate limiting | IP validation, CAPTCHA | Public content only |
| Zone 2 | TLS, session validation | JWT authentication, RBAC | User's own data |
| Zone 3 | TLS, IP whitelist | MFA, elevated permissions | Admin functions |
| Zone 4 | Private network, encryption | Service accounts only | All sensitive data |

### 5.3 Inter-Zone Communication

| From Zone | To Zone | Protocol | Authentication | Authorization |
|-----------|---------|----------|----------------|---------------|
| 0 → 1 | HTTPS | None (public) | None |
| 1 → 2 | HTTPS | JWT token | Role-based |
| 2 → 3 | HTTPS | JWT + MFA | Admin role required |
| 2 → 4 | Internal | Service credentials | Query-level permissions |
| 3 → 4 | Internal | Service credentials | Full access with audit |

---

## 6. Trust Boundaries

### 6.1 Trust Boundary Map

```
┌─────────────────────────────────────────────────────────────────┐
│                     TRUST BOUNDARIES                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   UNTRUSTED                    TRUSTED                          │
│   =========                    =======                          │
│                                                                 │
│   ┌─────────┐     TB-1        ┌──────────────────────────────┐ │
│   │ Browser │ ══════════════> │ Next.js Frontend             │ │
│   └─────────┘                 │ (Server Components)          │ │
│        │                      └────────────┬─────────────────┘ │
│        │                                   │                    │
│        │              TB-2                 │                    │
│        └─────────════════════════════════> │                    │
│                                            │                    │
│   ┌─────────┐     TB-3        ┌────────────▼─────────────────┐ │
│   │ Mobile  │ ══════════════> │ Fastify API Server           │ │
│   │  App    │                 │ (Authentication Gateway)     │ │
│   └─────────┘                 └────────────┬─────────────────┘ │
│                                            │                    │
│                               TB-4         │                    │
│   ┌─────────┐                 ┌────────────▼─────────────────┐ │
│   │ Third   │ ══════════════> │ Integration Layer            │ │
│   │ Party   │                 │ (Payment, SMS, Email)        │ │
│   │ APIs    │                 └────────────┬─────────────────┘ │
│   └─────────┘                              │                    │
│                               TB-5         │                    │
│                               ┌────────────▼─────────────────┐ │
│                               │ Database Layer               │ │
│                               │ (PostgreSQL, MySQL, Redis)   │ │
│                               └──────────────────────────────┘ │
│                                                                 │
│   TRUST BOUNDARY LEGEND:                                        │
│   TB-1: Browser → Server (Client-side attacks possible)        │
│   TB-2: API Client → Server (Input validation required)        │
│   TB-3: Mobile → Server (Certificate pinning required)         │
│   TB-4: External Services (Response validation required)       │
│   TB-5: Application → Database (Query parameterization)        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Trust Boundary Controls

#### TB-1: Browser to Server

| Control | Description | Implementation |
|---------|-------------|----------------|
| TLS Encryption | Encrypt all traffic | TLS 1.3 with strong ciphers |
| CSP Headers | Prevent script injection | Strict Content Security Policy |
| Input Sanitization | Clean user inputs | Server-side validation with Zod |
| CSRF Protection | Prevent forged requests | CSRF tokens, SameSite cookies |
| Cookie Security | Secure session cookies | HttpOnly, Secure, SameSite=Strict |

#### TB-2: API Client to Server

| Control | Description | Implementation |
|---------|-------------|----------------|
| Authentication | Verify identity | JWT with RS256 |
| Rate Limiting | Prevent abuse | Per-user and per-IP limits |
| Request Validation | Validate all inputs | JSON Schema, Zod validation |
| Response Filtering | Control data exposure | Field-level permissions |
| CORS | Control cross-origin access | Whitelist allowed origins |

#### TB-3: Mobile App to Server

| Control | Description | Implementation |
|---------|-------------|----------------|
| Certificate Pinning | Prevent MITM attacks | Pin server certificate in app |
| Secure Storage | Protect stored data | Encrypted local storage |
| Token Security | Protect auth tokens | Secure enclave storage |
| App Integrity | Prevent tampering | Code signing, integrity checks |

#### TB-4: External Service Integration

| Control | Description | Implementation |
|---------|-------------|----------------|
| API Key Security | Protect credentials | Environment variables, secrets manager |
| Response Validation | Validate external data | Schema validation |
| Timeout Handling | Prevent hanging requests | Configurable timeouts |
| Circuit Breaker | Handle failures gracefully | Retry with exponential backoff |
| Webhook Verification | Validate callbacks | Signature verification |

#### TB-5: Application to Database

| Control | Description | Implementation |
|---------|-------------|----------------|
| Parameterized Queries | Prevent SQL injection | Prisma ORM (parameterized by default) |
| Connection Encryption | Encrypt database traffic | TLS for database connections |
| Least Privilege | Minimal database permissions | Role-based database users |
| Query Logging | Audit database access | Query logging for sensitive tables |
| Connection Pooling | Manage connections securely | PgBouncer with authentication |

### 6.3 Trust Levels

| Entity | Trust Level | Capabilities | Restrictions |
|--------|-------------|--------------|--------------|
| Anonymous User | 0 (None) | View public content | No data access |
| Student | 1 (Low) | View own data, submit assignments | Cannot modify grades |
| Parent | 2 (Low-Medium) | View children's data, pay fees | Limited to own children |
| Teacher | 3 (Medium) | Manage class data, enter grades | Limited to assigned classes |
| Staff | 4 (Medium-High) | View reports, manage records | Cannot modify system settings |
| Admin | 5 (High) | Full system access | Audited, MFA required |
| System | 6 (Maximum) | All operations | Service accounts only |

---

## 7. Data Classification

### 7.1 Classification Levels

| Level | Classification | Description | Examples |
|-------|----------------|-------------|----------|
| L1 | **Public** | Information safe for public access | School name, contact info, announcements |
| L2 | **Internal** | Information for authenticated users | Class schedules, general notices |
| L3 | **Confidential** | Sensitive user information | Grades, attendance, contact details |
| L4 | **Restricted** | Highly sensitive/regulated data | Financial records, health info, passwords |
| L5 | **Critical** | System security data | Encryption keys, API secrets, credentials |

### 7.2 Data Classification Matrix

| Data Type | Classification | Encryption at Rest | Encryption in Transit | Access Control | Retention |
|-----------|----------------|-------------------|----------------------|----------------|-----------|
| School Info | L1 Public | Optional | TLS | Public | Indefinite |
| Announcements | L2 Internal | Optional | TLS | Authenticated | 1 year |
| Student Names | L3 Confidential | Required | TLS | Role-based | Enrollment + 5 years |
| Student Photos | L3 Confidential | Required | TLS | Role-based | Enrollment + 1 year |
| Grades | L3 Confidential | Required | TLS | Role-based | Permanent |
| Attendance | L3 Confidential | Required | TLS | Role-based | 5 years |
| Quran Progress | L3 Confidential | Required | TLS | Role-based | Permanent |
| Parent Contact | L3 Confidential | Required | TLS | Role-based | Enrollment + 1 year |
| Fee Records | L4 Restricted | Required | TLS | Admin only | 7 years |
| Transaction IDs | L4 Restricted | Required | TLS | Admin only | 7 years |
| Passwords (hashed) | L5 Critical | Required | TLS | System only | Current |
| JWT Secrets | L5 Critical | Required | TLS | System only | Rotation period |
| API Keys | L5 Critical | Required | TLS | System only | Rotation period |
| Database Credentials | L5 Critical | Required | TLS | System only | Rotation period |

### 7.3 Handling Requirements by Classification

#### L1 - Public Data

- No encryption requirements
- Can be cached at CDN level
- No access logging required
- No special handling on deletion

#### L2 - Internal Data

- TLS for transmission
- Optional encryption at rest
- Basic access logging
- Standard deletion procedures

#### L3 - Confidential Data

- TLS 1.3 for transmission
- AES-256 encryption at rest
- Detailed access logging
- Secure deletion required
- Data masking in logs
- Backup encryption required

#### L4 - Restricted Data

- All L3 requirements plus:
- Additional access controls (MFA)
- Audit trail required
- Data retention policies enforced
- Regular access reviews
- Encryption key rotation
- Compliance documentation

#### L5 - Critical Data

- All L4 requirements plus:
- Secrets management system
- Key escrow procedures
- Immediate breach notification
- Hardware security modules (optional)
- Zero-knowledge architecture where possible

### 7.4 PII Identification

| Data Field | PII Category | Child Data | Handling |
|------------|--------------|------------|----------|
| Student Name | Direct PII | Yes | L3 Confidential, COPPA compliant |
| Date of Birth | Direct PII | Yes | L3 Confidential, age verification |
| Student Photo | Biometric PII | Yes | L3 Confidential, consent required |
| Parent Name | Direct PII | No | L3 Confidential |
| Phone Number | Contact PII | Indirect | L3 Confidential |
| Email Address | Contact PII | Indirect | L3 Confidential |
| Home Address | Location PII | Indirect | L3 Confidential |
| Student ID | Indirect PII | Yes | L2 Internal |
| IP Address | Technical PII | Indirect | L2 Internal, log rotation |
| Device Info | Technical PII | Indirect | L2 Internal |

---

## 8. Security Architecture Diagrams

### 8.1 High-Level Security Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SMART ACADEMY SECURITY ARCHITECTURE                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌──────────────────────────────────────────────────────────────────────┐  │
│   │                          USERS                                        │  │
│   │   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │  │
│   │   │ Students│  │ Parents │  │ Teachers│  │ Admins  │  │ Public  │   │  │
│   │   └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘   │  │
│   └────────┼───────────┼───────────┼───────────┼───────────┼────────────┘  │
│            │           │           │           │           │               │
│   ┌────────▼───────────▼───────────▼───────────▼───────────▼────────────┐  │
│   │                    EDGE SECURITY LAYER                               │  │
│   │   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌──────────────┐  │  │
│   │   │     CDN     │ │     WAF     │ │ DDoS Shield │ │ Rate Limiter │  │  │
│   │   │(Cloudflare) │ │  (Rules)    │ │(Protection) │ │   (Global)   │  │  │
│   │   └──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬───────┘  │  │
│   └──────────┼───────────────┼───────────────┼───────────────┼──────────┘  │
│              └───────────────┴───────────────┴───────────────┘              │
│                                      │                                      │
│   ┌──────────────────────────────────▼──────────────────────────────────┐  │
│   │                    APPLICATION SECURITY LAYER                        │  │
│   │                                                                      │  │
│   │   ┌────────────────────────────────────────────────────────────┐    │  │
│   │   │                    LOAD BALANCER                           │    │  │
│   │   │                   (TLS Termination)                        │    │  │
│   │   └────────────────────────────┬───────────────────────────────┘    │  │
│   │                                │                                     │  │
│   │   ┌────────────────────────────▼───────────────────────────────┐    │  │
│   │   │              REVERSE PROXY / API GATEWAY                    │    │  │
│   │   │   • Security Headers      • Request Validation              │    │  │
│   │   │   • CORS Handling         • Route Protection                │    │  │
│   │   └───────┬──────────────────────────────────────┬─────────────┘    │  │
│   │           │                                       │                  │  │
│   │   ┌───────▼───────┐                      ┌───────▼───────┐          │  │
│   │   │  PUBLIC WEB   │                      │   ADMIN UI    │          │  │
│   │   │  (Next.js)    │                      │   (React)     │          │  │
│   │   │               │                      │               │          │  │
│   │   │ • CSP Headers │                      │ • MFA Enforced│          │  │
│   │   │ • CSRF Tokens │                      │ • IP Whitelist│          │  │
│   │   │ • XSS Prevent │                      │ • Audit Logs  │          │  │
│   │   └───────┬───────┘                      └───────┬───────┘          │  │
│   │           │                                       │                  │  │
│   │           └───────────────────┬───────────────────┘                  │  │
│   │                               │                                      │  │
│   │   ┌───────────────────────────▼───────────────────────────────┐     │  │
│   │   │                   API SERVER (Fastify)                     │     │  │
│   │   │                                                            │     │  │
│   │   │   ┌───────────────────────────────────────────────────┐   │     │  │
│   │   │   │              SECURITY MIDDLEWARE                   │   │     │  │
│   │   │   │  • JWT Validation    • Rate Limiting (per-user)   │   │     │  │
│   │   │   │  • RBAC Enforcement  • Request Logging            │   │     │  │
│   │   │   │  • Input Validation  • Response Filtering         │   │     │  │
│   │   │   └───────────────────────────────────────────────────┘   │     │  │
│   │   │                                                            │     │  │
│   │   │   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │     │  │
│   │   │   │ Students │  │ Teachers │  │ Payments │  │ Islamic  │ │     │  │
│   │   │   │  Module  │  │  Module  │  │  Module  │  │  Module  │ │     │  │
│   │   │   └──────────┘  └──────────┘  └──────────┘  └──────────┘ │     │  │
│   │   └────────────────────────────┬───────────────────────────────┘     │  │
│   └────────────────────────────────┼────────────────────────────────────┘  │
│                                    │                                       │
│   ┌────────────────────────────────▼────────────────────────────────────┐  │
│   │                      DATA SECURITY LAYER                             │  │
│   │                                                                      │  │
│   │   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │  │
│   │   │    PostgreSQL    │  │      MySQL       │  │      Redis       │  │  │
│   │   │   (Primary DB)   │  │   (Gibbon SIS)   │  │     (Cache)      │  │  │
│   │   │                  │  │                  │  │                  │  │  │
│   │   │ • TDE Encryption │  │ • TLS Connection │  │ • AUTH Required  │  │  │
│   │   │ • Query Logging  │  │ • Read Replica   │  │ • Encryption     │  │  │
│   │   │ • Access Control │  │ • Sync Security  │  │ • Private Net    │  │  │
│   │   └──────────────────┘  └──────────────────┘  └──────────────────┘  │  │
│   │                                                                      │  │
│   │   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │  │
│   │   │  File Storage    │  │    Backups       │  │   Secrets Mgmt   │  │  │
│   │   │  (Encrypted)     │  │  (Encrypted)     │  │  (Vault/Env)     │  │  │
│   │   └──────────────────┘  └──────────────────┘  └──────────────────┘  │  │
│   └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Authentication Flow Security

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     SECURE AUTHENTICATION FLOW                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   USER                      API SERVER                    DATABASE           │
│    │                            │                            │               │
│    │  1. Login Request          │                            │               │
│    │  (email + password)        │                            │               │
│    │──────────────────────────>│                            │               │
│    │                            │                            │               │
│    │                            │  2. Rate Limit Check      │               │
│    │                            │  (5 attempts / 15 min)    │               │
│    │                            │──────────────────────────>│               │
│    │                            │                            │               │
│    │                            │  3. Fetch User             │               │
│    │                            │──────────────────────────>│               │
│    │                            │<──────────────────────────│               │
│    │                            │                            │               │
│    │                            │  4. Verify Password        │               │
│    │                            │  (bcrypt, cost=12)        │               │
│    │                            │                            │               │
│    │                            │  5. Check MFA Required    │               │
│    │                            │                            │               │
│    │  6. MFA Challenge          │                            │               │
│    │  (if enabled)              │                            │               │
│    │<──────────────────────────│                            │               │
│    │                            │                            │               │
│    │  7. MFA Response           │                            │               │
│    │  (TOTP code)               │                            │               │
│    │──────────────────────────>│                            │               │
│    │                            │                            │               │
│    │                            │  8. Generate Tokens        │               │
│    │                            │  - Access Token (15 min)  │               │
│    │                            │  - Refresh Token (7 days) │               │
│    │                            │                            │               │
│    │                            │  9. Store Refresh Token   │               │
│    │                            │──────────────────────────>│               │
│    │                            │                            │               │
│    │  10. Return Tokens         │                            │               │
│    │  (HttpOnly cookies)        │                            │               │
│    │<──────────────────────────│                            │               │
│    │                            │                            │               │
│    │  11. Log Authentication    │                            │               │
│    │                            │──────────────────────────>│               │
│    │                            │                            │               │
│                                                                              │
│   TOKEN SECURITY:                                                            │
│   • Access Token: JWT with RS256, contains user ID, role, permissions       │
│   • Refresh Token: Opaque, stored in DB, rotated on each use               │
│   • Cookies: HttpOnly, Secure, SameSite=Strict                              │
│   • Token Blacklist: Redis-based for logout/revocation                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Security Monitoring and Logging

### 9.1 Security Logging Strategy

| Log Type | Content | Retention | Storage | Alert |
|----------|---------|-----------|---------|-------|
| Authentication Logs | Login attempts, failures, MFA events | 1 year | Encrypted | On repeated failures |
| Authorization Logs | Permission checks, denials | 1 year | Encrypted | On privilege escalation attempt |
| API Access Logs | All API requests | 90 days | Encrypted | On anomalous patterns |
| Admin Action Logs | All admin operations | 2 years | Encrypted | On sensitive operations |
| Security Event Logs | Detected threats, blocks | 1 year | Encrypted | Immediate |
| Error Logs | Application errors | 30 days | Encrypted | On critical errors |
| Audit Trail | Data modifications | 7 years | Encrypted | On PII access |

### 9.2 Security Metrics

| Metric | Description | Threshold | Response |
|--------|-------------|-----------|----------|
| Failed Login Rate | % of failed logins | > 10% | Investigate |
| Rate Limit Hits | Rate limit triggers per hour | > 100 | Review limits |
| Error Rate | 5xx errors per minute | > 1% | Alert on-call |
| Suspicious IP Count | Blocked IPs per day | > 50 | Review WAF rules |
| Token Revocations | Forced logouts per day | > 10 | Investigate |
| MFA Failures | Failed MFA attempts | > 5/user/day | Account review |

### 9.3 Log Format Standards

```json
{
  "timestamp": "2026-01-10T12:00:00.000Z",
  "level": "warn",
  "event": "authentication_failed",
  "category": "security",
  "user": {
    "id": "user-uuid",
    "email": "[REDACTED]",
    "role": "student"
  },
  "request": {
    "id": "req-uuid",
    "ip": "192.168.1.1",
    "userAgent": "Mozilla/5.0...",
    "method": "POST",
    "path": "/api/auth/login"
  },
  "details": {
    "reason": "invalid_password",
    "attempt": 3
  },
  "context": {
    "environment": "production",
    "service": "api-server",
    "version": "1.0.0"
  }
}
```

---

## 10. Incident Response Framework

### 10.1 Security Incident Categories

| Category | Severity | Examples | Response Time |
|----------|----------|----------|---------------|
| Critical | P1 | Data breach, system compromise | Immediate (< 15 min) |
| High | P2 | Active attack, credential leak | < 1 hour |
| Medium | P3 | Vulnerability discovery, anomaly | < 4 hours |
| Low | P4 | Policy violation, minor issue | < 24 hours |

### 10.2 Incident Response Steps

```
┌─────────────────────────────────────────────────────────────────┐
│                 INCIDENT RESPONSE WORKFLOW                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   1. DETECTION ─────> 2. TRIAGE ─────> 3. CONTAINMENT           │
│       │                   │                 │                    │
│       │                   │                 │                    │
│       ▼                   ▼                 ▼                    │
│   • Monitoring        • Classify        • Isolate affected      │
│   • Alerts            • Assess impact   • Block threat actor    │
│   • User reports      • Assign severity • Preserve evidence     │
│   • Log analysis      • Notify team     • Limit damage          │
│                                                                  │
│   4. ERADICATION ───> 5. RECOVERY ────> 6. POST-INCIDENT        │
│       │                   │                 │                    │
│       │                   │                 │                    │
│       ▼                   ▼                 ▼                    │
│   • Remove threat     • Restore systems • Document timeline     │
│   • Patch vuln        • Verify integrity• Root cause analysis   │
│   • Reset creds       • Monitor closely • Update procedures     │
│   • Clean systems     • Resume normal   • Share learnings       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 10.3 Communication Plan

| Stakeholder | When to Notify | Method | Information |
|-------------|----------------|--------|-------------|
| Development Team | All incidents | Slack/Email | Full technical details |
| School Admin | P1-P2 incidents | Phone + Email | Impact, timeline, actions |
| Affected Users | Data breach only | Email | What happened, what to do |
| Regulators | If legally required | Official channels | Formal notification |
| Parents | Child data involved | Email + SMS | Clear, non-technical summary |

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
**Next Review Date:** July 10, 2026

---

*This Security Architecture Document establishes the foundational security framework for the Smart Academy Digital Portal. All development and operational decisions must align with these security principles and controls.*

---

## References

- [OWASP Top 10 2025](https://owasp.org/Top10/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Defense in Depth - Imperva](https://www.imperva.com/learn/application-security/defense-in-depth/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [Zero Trust Architecture - NIST SP 800-207](https://csrc.nist.gov/publications/detail/sp/800-207/final)
