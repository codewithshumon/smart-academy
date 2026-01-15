# Smart Academy Digital Portal - System Architecture Document

**Document Title:** System Architecture Document (SAD)
**Document ID:** ARCH_System_Architecture_v1.0
**Version:** 1.0
**Date:** January 10, 2026
**Project Name:** Smart Academy Digital Web Portal Development
**Prepared By:** Solo Full-Stack Developer
**Implementation Approach:** Gibbon + Moodle + Custom Development (Hybrid)

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | January 10, 2026 | Development Team | Initial System Architecture Document |

**Reference Documents:**
- Smart Academy Technology Stack Document v1.0
- Smart Academy SRS v1.0
- Smart Academy URD v1.0

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Component Architecture](#2-component-architecture)
3. [Deployment Architecture](#3-deployment-architecture)
4. [Technology Stack Justification](#4-technology-stack-justification)
5. [Integration Architecture](#5-integration-architecture)
6. [Third-Party Service Architecture](#6-third-party-service-architecture)
7. [Scalability Architecture](#7-scalability-architecture)
8. [High Availability Design](#8-high-availability-design)

---

## 1. Architecture Overview

### 1.1 High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                           SMART ACADEMY DIGITAL PORTAL                               │
│                              SYSTEM ARCHITECTURE                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│   CLIENTS                                                                            │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐   │
│   │   Web       │  │   Mobile    │  │   Mobile    │  │   Third-Party           │   │
│   │   Browser   │  │   App (iOS) │  │App (Android)│  │   Systems               │   │
│   │             │  │   Parent/   │  │   Parent/   │  │   (Gibbon/Moodle UI)    │   │
│   └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └────────────┬────────────┘   │
│          │                │                │                      │                 │
│          └────────────────┼────────────────┼──────────────────────┘                 │
│                           │                │                                        │
│                           ▼                ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────────────┐  │
│   │                         CDN (Cloudflare)                                     │  │
│   │                    Static Assets, DDoS Protection, WAF                       │  │
│   └─────────────────────────────────────────────────────────────────────────────┘  │
│                                      │                                             │
│                                      ▼                                             │
│   ┌─────────────────────────────────────────────────────────────────────────────┐  │
│   │                      LOAD BALANCER (Nginx)                                   │  │
│   │                    SSL Termination, Request Routing                          │  │
│   └─────────────────────────────────────────────────────────────────────────────┘  │
│                                      │                                             │
│           ┌──────────────────────────┼──────────────────────────┐                  │
│           │                          │                          │                  │
│           ▼                          ▼                          ▼                  │
│   ┌───────────────┐        ┌─────────────────┐        ┌─────────────────┐        │
│   │   Next.js     │        │   Fastify       │        │   PHP-FPM       │        │
│   │   (Public     │        │   API Server    │        │   (Gibbon/      │        │
│   │    Website)   │        │   (Custom APIs) │        │    Moodle)      │        │
│   │   Port 3000   │        │   Port 4000     │        │   Port 8080     │        │
│   └───────┬───────┘        └────────┬────────┘        └────────┬────────┘        │
│           │                         │                          │                  │
│           │                         ▼                          │                  │
│           │                ┌─────────────────┐                 │                  │
│           │                │   Redis Cache   │                 │                  │
│           │                │   Sessions,     │                 │                  │
│           │                │   API Cache     │                 │                  │
│           │                │   Port 6379     │                 │                  │
│           │                └────────┬────────┘                 │                  │
│           │                         │                          │                  │
│           └─────────────────────────┼──────────────────────────┘                  │
│                                     │                                             │
│                                     ▼                                             │
│   ┌─────────────────────────────────────────────────────────────────────────────┐  │
│   │                          DATABASE LAYER                                      │  │
│   │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────┐  │  │
│   │  │   PostgreSQL    │  │     MySQL       │  │        MinIO/S3             │  │  │
│   │  │   (Custom       │  │   (Gibbon/      │  │     (File Storage)          │  │  │
│   │  │    Modules)     │  │    Moodle)      │  │                             │  │  │
│   │  │   Port 5432     │  │   Port 3306     │  │        Port 9000            │  │  │
│   │  └─────────────────┘  └─────────────────┘  └─────────────────────────────┘  │  │
│   └─────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                      │
│   EXTERNAL SERVICES                                                                 │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐    │
│   │  bKash   │  │  Nagad   │  │SSLCommerz│  │BulkSMSBD │  │    SendGrid      │    │
│   │ Payment  │  │ Payment  │  │ Payment  │  │   SMS    │  │     Email        │    │
│   └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘    │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Architecture Principles

| Principle | Description | Application |
|-----------|-------------|-------------|
| **Separation of Concerns** | Each component has a single responsibility | Distinct services for web, API, platform |
| **API-First Design** | All interactions through well-defined APIs | RESTful APIs with OpenAPI spec |
| **Loose Coupling** | Components can be modified independently | Abstraction layers between services |
| **Defense in Depth** | Multiple security layers | CDN → Load Balancer → App → DB |
| **Fail-Safe Defaults** | Secure by default configuration | Minimal permissions, deny by default |
| **Horizontal Scalability** | Scale out rather than up | Stateless services, shared cache |

### 1.3 Architecture Style

**Primary Style:** Hybrid Monolith with Service-Oriented Architecture

**Rationale for Solo Developer:**
- Simpler deployment and debugging
- Reduced operational complexity
- Faster development velocity
- Gradual service extraction possible

**Components:**
- **Monolithic Core:** Next.js (SSR), Fastify API (consolidated)
- **External Services:** Gibbon, Moodle (SOA integration)
- **Microservice Candidates:** Payment processing (isolated)

---

## 2. Component Architecture

### 2.1 Component Diagram

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                           APPLICATION COMPONENTS                                │
├────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                     PRESENTATION LAYER                                   │  │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │  │
│   │  │ Public       │  │ Admin        │  │ Mobile       │  │ Portal      │ │  │
│   │  │ Website      │  │ Dashboard    │  │ Apps         │  │ (Student/   │ │  │
│   │  │ (Next.js)    │  │ (React+Vite) │  │ (Expo)       │  │  Parent/    │ │  │
│   │  │              │  │              │  │              │  │  Teacher)   │ │  │
│   │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬──────┘ │  │
│   └─────────┼─────────────────┼─────────────────┼─────────────────┼────────┘  │
│             │                 │                 │                 │           │
│             └─────────────────┴─────────────────┴─────────────────┘           │
│                                       │                                        │
│                                       ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                        API GATEWAY LAYER                                 │  │
│   │  ┌────────────────────────────────────────────────────────────────────┐ │  │
│   │  │                    Fastify API Server                               │ │  │
│   │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │ │  │
│   │  │  │   Auth   │  │  CORS    │  │  Rate    │  │   Request        │   │ │  │
│   │  │  │ Middleware│  │Middleware│  │ Limiter  │  │   Validation     │   │ │  │
│   │  │  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘   │ │  │
│   │  └────────────────────────────────────────────────────────────────────┘ │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                       │                                        │
│                                       ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                        BUSINESS LOGIC LAYER                              │  │
│   │                                                                          │  │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │  │
│   │  │   Auth       │  │   Student    │  │   Teacher    │  │   Admin     │ │  │
│   │  │   Service    │  │   Service    │  │   Service    │  │   Service   │ │  │
│   │  └──────────────┘  └──────────────┘  └──────────────┘  └─────────────┘ │  │
│   │                                                                          │  │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │  │
│   │  │   Islamic    │  │   Payment    │  │  Notification│  │   Report    │ │  │
│   │  │   Service    │  │   Service    │  │   Service    │  │   Service   │ │  │
│   │  └──────────────┘  └──────────────┘  └──────────────┘  └─────────────┘ │  │
│   │                                                                          │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                       │                                        │
│                                       ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                      INTEGRATION LAYER                                   │  │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │  │
│   │  │   Gibbon     │  │   Moodle     │  │   Payment    │  │   External  │ │  │
│   │  │   Adapter    │  │   Adapter    │  │   Gateway    │  │   APIs      │ │  │
│   │  │              │  │              │  │   Adapter    │  │   Adapter   │ │  │
│   │  └──────────────┘  └──────────────┘  └──────────────┘  └─────────────┘ │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                       │                                        │
│                                       ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                         DATA ACCESS LAYER                                │  │
│   │  ┌──────────────────────────────────────────────────────────────────┐   │  │
│   │  │                     Prisma ORM (PostgreSQL)                       │   │  │
│   │  │     Models: User, Student, QuranProgress, Payment, etc.          │   │  │
│   │  └──────────────────────────────────────────────────────────────────┘   │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Component Descriptions

| Component | Technology | Responsibility |
|-----------|------------|----------------|
| **Public Website** | Next.js 15 | SEO-optimized public-facing pages |
| **Admin Dashboard** | React + Vite | Administrative interface |
| **Mobile Apps** | React Native + Expo | iOS/Android parent/student apps |
| **Portal Frontend** | Next.js (Server Components) | Student, Parent, Teacher portals |
| **API Gateway** | Fastify 5 | Request routing, auth, rate limiting |
| **Auth Service** | Custom + Gibbon SSO | Authentication and authorization |
| **Student Service** | Custom | Student-related business logic |
| **Islamic Service** | Custom | Quran tracking, Tajweed assessment |
| **Payment Service** | Custom | Payment processing, reconciliation |
| **Notification Service** | Custom | SMS, Email, Push notifications |
| **Gibbon Adapter** | Custom | Integration with Gibbon SMS |
| **Moodle Adapter** | Custom | Integration with Moodle LMS |
| **Data Access Layer** | Prisma | ORM for PostgreSQL |

### 2.3 Service Responsibilities

#### Auth Service

```typescript
interface AuthService {
  // User authentication
  login(credentials: LoginCredentials): Promise<AuthToken>;
  logout(userId: string): Promise<void>;
  refreshToken(refreshToken: string): Promise<AuthToken>;

  // SSO
  generateSSOToken(userId: string, target: 'gibbon' | 'moodle'): Promise<string>;
  validateSSOToken(token: string): Promise<User>;

  // Password management
  resetPassword(email: string): Promise<void>;
  changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void>;

  // MFA
  enableMFA(userId: string): Promise<MFASecret>;
  verifyMFA(userId: string, code: string): Promise<boolean>;
}
```

#### Islamic Service

```typescript
interface IslamicService {
  // Quran Progress
  recordProgress(entry: QuranProgressEntry): Promise<QuranProgress>;
  getStudentProgress(studentId: string): Promise<QuranProgressSummary>;
  getSurahCompletion(studentId: string, surahNumber: number): Promise<SurahCompletion>;

  // Tajweed Assessment
  conductAssessment(assessment: TajweedAssessment): Promise<TajweedResult>;
  getAssessmentHistory(studentId: string): Promise<TajweedResult[]>;

  // Prayer Times
  getPrayerTimes(date: Date, location: GeoLocation): Promise<PrayerTimes>;

  // Hijri Calendar
  getHijriDate(gregorianDate: Date): Promise<HijriDate>;
  getIslamicEvents(month: number, year: number): Promise<IslamicEvent[]>;
}
```

#### Payment Service

```typescript
interface PaymentService {
  // Payment Initiation
  initiateBkashPayment(request: PaymentRequest): Promise<PaymentSession>;
  initiateNagadPayment(request: PaymentRequest): Promise<PaymentSession>;
  initiateSSLCommerzPayment(request: PaymentRequest): Promise<PaymentSession>;

  // Payment Callbacks
  handlePaymentCallback(gateway: string, payload: any): Promise<PaymentResult>;

  // Transaction Management
  getTransactionStatus(transactionId: string): Promise<TransactionStatus>;
  getPaymentHistory(studentId: string): Promise<Payment[]>;

  // Receipts
  generateReceipt(paymentId: string): Promise<Receipt>;
  downloadReceipt(paymentId: string): Promise<Buffer>;

  // Reconciliation
  reconcilePayments(date: Date): Promise<ReconciliationReport>;
}
```

---

## 3. Deployment Architecture

### 3.1 Development Environment

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    LOCAL DEVELOPMENT ENVIRONMENT                         │
│                         (Linux Desktop)                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌───────────────────────────────────────────────────────────────────┐ │
│   │                    Docker Compose Stack                            │ │
│   │                                                                    │ │
│   │   ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐ │ │
│   │   │   MySQL    │  │ PostgreSQL │  │   Redis    │  │  Adminer   │ │ │
│   │   │   :3306    │  │   :5432    │  │   :6379    │  │   :8080    │ │ │
│   │   └────────────┘  └────────────┘  └────────────┘  └────────────┘ │ │
│   │                                                                    │ │
│   │   ┌────────────┐  ┌────────────┐                                  │ │
│   │   │  Gibbon    │  │  Moodle    │                                  │ │
│   │   │   :8081    │  │   :8082    │                                  │ │
│   │   └────────────┘  └────────────┘                                  │ │
│   │                                                                    │ │
│   └───────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│   ┌───────────────────────────────────────────────────────────────────┐ │
│   │                    Local Development Servers                       │ │
│   │                                                                    │ │
│   │   ┌────────────┐  ┌────────────┐  ┌────────────┐                 │ │
│   │   │  Next.js   │  │   React    │  │  Fastify   │                 │ │
│   │   │  (Web)     │  │  (Admin)   │  │   (API)    │                 │ │
│   │   │  :3000     │  │   :3001    │  │   :4000    │                 │ │
│   │   │   HMR      │  │   Vite/HMR │  │            │                 │ │
│   │   └────────────┘  └────────────┘  └────────────┘                 │ │
│   │                                                                    │ │
│   │   ┌────────────┐                                                  │ │
│   │   │   Expo     │                                                  │ │
│   │   │  (Mobile)  │                                                  │ │
│   │   │   :8083    │                                                  │ │
│   │   └────────────┘                                                  │ │
│   │                                                                    │ │
│   └───────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│   ┌───────────────────────────────────────────────────────────────────┐ │
│   │                         VSCode IDE                                 │ │
│   │   Extensions: TypeScript, ESLint, Prettier, GitLens, Docker...    │ │
│   └───────────────────────────────────────────────────────────────────┘ │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Production Environment

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      PRODUCTION DEPLOYMENT ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Internet                                                                   │
│       │                                                                      │
│       ▼                                                                      │
│   ┌───────────────────────────────────────────────────────────────────────┐ │
│   │                   Cloudflare (CDN + WAF + DDoS)                        │ │
│   │   • SSL Certificate Management                                         │ │
│   │   • DDoS Protection                                                    │ │
│   │   • Web Application Firewall                                           │ │
│   │   • Static Asset Caching                                               │ │
│   │   • Geographic Distribution                                            │ │
│   └───────────────────────────────────────────────────────────────────────┘ │
│                                    │                                        │
│                                    ▼                                        │
│   ┌───────────────────────────────────────────────────────────────────────┐ │
│   │                    Primary Server (VPS/Cloud)                          │ │
│   │                                                                        │ │
│   │   ┌─────────────────────────────────────────────────────────────────┐ │ │
│   │   │                     Nginx Reverse Proxy                          │ │ │
│   │   │   • SSL Termination (Backup)                                     │ │ │
│   │   │   • Request Routing                                              │ │ │
│   │   │   • Load Balancing                                               │ │ │
│   │   │   • Rate Limiting                                                │ │ │
│   │   └─────────────────────────────────────────────────────────────────┘ │ │
│   │                             │                                         │ │
│   │       ┌─────────────────────┼─────────────────────┐                  │ │
│   │       │                     │                     │                  │ │
│   │       ▼                     ▼                     ▼                  │ │
│   │  ┌──────────┐         ┌──────────┐         ┌──────────┐             │ │
│   │  │ Next.js  │         │ Fastify  │         │ PHP-FPM  │             │ │
│   │  │ (PM2)    │         │ (PM2)    │         │          │             │ │
│   │  │          │         │          │         │ Gibbon/  │             │ │
│   │  │ Port 3000│         │ Port 4000│         │ Moodle   │             │ │
│   │  └──────────┘         └──────────┘         └──────────┘             │ │
│   │                                                                        │ │
│   │   ┌─────────────────────────────────────────────────────────────────┐ │ │
│   │   │                        Data Layer                                │ │ │
│   │   │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐│ │ │
│   │   │  │PostgreSQL│  │  MySQL   │  │  Redis   │  │  MinIO (Files)   ││ │ │
│   │   │  │ Primary  │  │ Primary  │  │  Cache   │  │                  ││ │ │
│   │   │  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘│ │ │
│   │   └─────────────────────────────────────────────────────────────────┘ │ │
│   │                                                                        │ │
│   └───────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│   ┌───────────────────────────────────────────────────────────────────────┐ │
│   │                    Backup/Secondary Server                             │ │
│   │   • Database Replicas                                                  │ │
│   │   • Backup Storage                                                     │ │
│   │   • Monitoring & Logging                                               │ │
│   └───────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Container Architecture

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - web
      - api
      - gibbon
      - moodle
    restart: always

  # Next.js Web Application
  web:
    build:
      context: ./apps/web
      dockerfile: Dockerfile
    environment:
      - NODE_ENV=production
      - API_URL=http://api:4000
    restart: always

  # Fastify API Server
  api:
    build:
      context: ./apps/api
      dockerfile: Dockerfile
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    restart: always

  # Gibbon SMS
  gibbon:
    image: gibbonedu/core:latest
    environment:
      - GIBBON_MYSQL_HOST=mysql
      - GIBBON_MYSQL_DATABASE=gibbon
    depends_on:
      - mysql
    restart: always

  # Moodle LMS
  moodle:
    image: bitnami/moodle:latest
    environment:
      - MOODLE_DATABASE_HOST=mysql
      - MOODLE_DATABASE_NAME=moodle
    depends_on:
      - mysql
    restart: always

  # PostgreSQL (Custom modules)
  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_DB=smart_academy
      - POSTGRES_USER=smart_user
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

  # MySQL (Gibbon/Moodle)
  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
    volumes:
      - mysql_data:/var/lib/mysql
    restart: always

  # Redis Cache
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    restart: always

  # MinIO (File Storage)
  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    environment:
      - MINIO_ROOT_USER=${MINIO_USER}
      - MINIO_ROOT_PASSWORD=${MINIO_PASSWORD}
    volumes:
      - minio_data:/data
    restart: always

volumes:
  postgres_data:
  mysql_data:
  redis_data:
  minio_data:
```

---

## 4. Technology Stack Justification

### 4.1 Frontend Technology Selection

| Technology | Alternative Considered | Justification |
|------------|----------------------|---------------|
| **Next.js 15** | Nuxt, SvelteKit | SSR, SEO, React ecosystem, largest community |
| **React 19** | Vue, Svelte | Job market dominance, component reusability |
| **TypeScript 5.x** | JavaScript | Type safety, better DX, fewer runtime errors |
| **Tailwind CSS 4.x** | CSS Modules, Styled Components | Rapid development, consistent design |
| **Shadcn/ui** | MUI, Chakra | Customizable, accessible, modern |

### 4.2 Backend Technology Selection

| Technology | Alternative Considered | Justification |
|------------|----------------------|---------------|
| **Node.js 22 LTS** | Deno, Bun | Mature ecosystem, TypeScript integration |
| **Fastify 5.x** | Express, Hono | Performance, TypeScript-first, plugins |
| **Prisma 6.x** | TypeORM, Drizzle | Type safety, migrations, schema-first |

### 4.3 Database Selection

| Database | Purpose | Justification |
|----------|---------|---------------|
| **PostgreSQL 16** | Custom modules | Advanced features, JSONB, reliability |
| **MySQL 8.0** | Gibbon/Moodle | Required by these platforms |
| **Redis 7** | Cache, sessions | Speed, pub/sub, persistence |

### 4.4 Platform Selection

| Platform | Purpose | Justification |
|----------|---------|---------------|
| **Gibbon** | Student Management | Open source, comprehensive, extensible |
| **Moodle** | Learning Management | Industry standard, plugin ecosystem |

---

## 5. Integration Architecture

### 5.1 Integration Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        INTEGRATION ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌──────────────────────────────────────────────────────────────────────┐  │
│   │                      SMART ACADEMY CUSTOM API                         │  │
│   │                        (Integration Hub)                              │  │
│   └───────────────────────────────┬──────────────────────────────────────┘  │
│                                   │                                         │
│         ┌─────────────────────────┼─────────────────────────┐               │
│         │                         │                         │               │
│         ▼                         ▼                         ▼               │
│   ┌───────────────┐        ┌───────────────┐        ┌───────────────┐      │
│   │    GIBBON     │        │    MOODLE     │        │   EXTERNAL    │      │
│   │   ADAPTER     │        │   ADAPTER     │        │   SERVICES    │      │
│   │               │        │               │        │               │      │
│   │ • REST API    │        │ • Web Services│        │ • bKash API   │      │
│   │ • Database    │        │ • REST API    │        │ • Nagad API   │      │
│   │   Views       │        │ • SSO (OAuth) │        │ • SMS Gateway │      │
│   │ • Webhooks    │        │               │        │ • Email API   │      │
│   └───────┬───────┘        └───────┬───────┘        └───────┬───────┘      │
│           │                        │                        │               │
│           ▼                        ▼                        ▼               │
│   ┌───────────────┐        ┌───────────────┐        ┌───────────────┐      │
│   │    GIBBON     │        │    MOODLE     │        │   EXTERNAL    │      │
│   │   DATABASE    │        │   DATABASE    │        │   SERVICES    │      │
│   │   (MySQL)     │        │   (MySQL)     │        │               │      │
│   └───────────────┘        └───────────────┘        └───────────────┘      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Gibbon Integration

**Integration Methods:**

1. **REST API** - Gibbon provides API endpoints for CRUD operations
2. **Database Views** - Direct read access to MySQL views
3. **Webhooks** - Custom events for real-time updates
4. **SSO** - Shared authentication tokens

**Data Synchronization:**

| Data Type | Direction | Frequency | Method |
|-----------|-----------|-----------|--------|
| Users | Gibbon → Custom | Real-time | Webhook + API |
| Students | Gibbon → Custom | Real-time | Webhook + API |
| Attendance | Custom ↔ Gibbon | Real-time | API |
| Grades | Custom ↔ Gibbon | Real-time | API |
| Classes | Gibbon → Custom | Daily | Scheduled sync |

### 5.3 Moodle Integration

**Integration Methods:**

1. **Web Services API** - RESTful API for course management
2. **SSO (OAuth 2.0)** - Unified authentication
3. **Event Webhooks** - Grade and completion notifications

**Data Synchronization:**

| Data Type | Direction | Frequency | Method |
|-----------|-----------|-----------|--------|
| Users | Custom → Moodle | Real-time | Web Services |
| Enrollments | Gibbon → Moodle | Real-time | API |
| Grades | Moodle → Custom | On completion | Webhook |
| Courses | Manual | As needed | Admin UI |

### 5.4 SSO Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SSO AUTHENTICATION FLOW                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   User                Custom App            SSO Service           Gibbon/   │
│    │                     │                     │                  Moodle    │
│    │  1. Login Request   │                     │                     │      │
│    │────────────────────►│                     │                     │      │
│    │                     │  2. Authenticate    │                     │      │
│    │                     │────────────────────►│                     │      │
│    │                     │                     │                     │      │
│    │                     │  3. JWT + Refresh   │                     │      │
│    │                     │◄────────────────────│                     │      │
│    │  4. Set Session     │                     │                     │      │
│    │◄────────────────────│                     │                     │      │
│    │                     │                     │                     │      │
│    │  5. Access Gibbon   │                     │                     │      │
│    │────────────────────────────────────────────────────────────────►│      │
│    │                     │                     │  6. Validate Token  │      │
│    │                     │                     │◄────────────────────│      │
│    │                     │                     │  7. Token Valid     │      │
│    │                     │                     │────────────────────►│      │
│    │  8. Gibbon Session  │                     │                     │      │
│    │◄────────────────────────────────────────────────────────────────│      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Third-Party Service Architecture

### 6.1 Payment Gateway Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      PAYMENT GATEWAY ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌────────────────────────────────────────────────────────────────────┐    │
│   │                    PAYMENT SERVICE (Node.js)                        │    │
│   │                                                                     │    │
│   │   ┌─────────────────────────────────────────────────────────────┐  │    │
│   │   │                  Payment Gateway Abstraction                 │  │    │
│   │   │                                                              │  │    │
│   │   │   interface PaymentGateway {                                 │  │    │
│   │   │     initiate(request: PaymentRequest): Promise<Session>      │  │    │
│   │   │     verify(transactionId: string): Promise<Status>           │  │    │
│   │   │     refund(transactionId: string): Promise<Result>           │  │    │
│   │   │   }                                                          │  │    │
│   │   │                                                              │  │    │
│   │   └─────────────────────────────────────────────────────────────┘  │    │
│   │                              │                                     │    │
│   │         ┌────────────────────┼────────────────────┐               │    │
│   │         │                    │                    │               │    │
│   │         ▼                    ▼                    ▼               │    │
│   │   ┌───────────┐        ┌───────────┐        ┌───────────┐        │    │
│   │   │  bKash    │        │   Nagad   │        │SSLCommerz │        │    │
│   │   │  Adapter  │        │  Adapter  │        │  Adapter  │        │    │
│   │   └─────┬─────┘        └─────┬─────┘        └─────┬─────┘        │    │
│   │         │                    │                    │               │    │
│   └─────────┼────────────────────┼────────────────────┼───────────────┘    │
│             │                    │                    │                    │
│             ▼                    ▼                    ▼                    │
│   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐          │
│   │   bKash API     │  │   Nagad API     │  │  SSLCommerz     │          │
│   │   (External)    │  │   (External)    │  │  API (External) │          │
│   └─────────────────┘  └─────────────────┘  └─────────────────┘          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Notification Service Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      NOTIFICATION SERVICE ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌────────────────────────────────────────────────────────────────────┐    │
│   │                   NOTIFICATION SERVICE                              │    │
│   │                                                                     │    │
│   │   ┌─────────────────────────────────────────────────────────────┐  │    │
│   │   │                  Notification Queue (Redis)                  │  │    │
│   │   └─────────────────────────────────────────────────────────────┘  │    │
│   │                              │                                     │    │
│   │         ┌────────────────────┼────────────────────┐               │    │
│   │         │                    │                    │               │    │
│   │         ▼                    ▼                    ▼               │    │
│   │   ┌───────────┐        ┌───────────┐        ┌───────────┐        │    │
│   │   │    SMS    │        │   Email   │        │   Push    │        │    │
│   │   │  Handler  │        │  Handler  │        │  Handler  │        │    │
│   │   └─────┬─────┘        └─────┬─────┘        └─────┬─────┘        │    │
│   │         │                    │                    │               │    │
│   └─────────┼────────────────────┼────────────────────┼───────────────┘    │
│             │                    │                    │                    │
│             ▼                    ▼                    ▼                    │
│   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐          │
│   │  BulkSMSBD     │  │   SendGrid      │  │  FCM / APNs     │          │
│   │  (SMS Gateway) │  │   (Email)       │  │  (Push)         │          │
│   └─────────────────┘  └─────────────────┘  └─────────────────┘          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Scalability Architecture

### 7.1 Scaling Strategy

| Component | Scaling Approach | Implementation |
|-----------|------------------|----------------|
| Web Servers | Horizontal | Multiple PM2 instances, Nginx load balancing |
| API Servers | Horizontal | Multiple instances, Redis for shared state |
| Database | Vertical + Read Replicas | Primary-Replica configuration |
| Cache | Cluster | Redis Cluster mode |
| File Storage | Distributed | MinIO cluster or S3 |

### 7.2 Caching Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CACHING LAYERS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Layer 1: Browser Cache                                                     │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │   • Static assets (JS, CSS, images) - Cache-Control: max-age=31536000│   │
│   │   • API responses (where appropriate) - ETag-based                   │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                      │                                      │
│                                      ▼                                      │
│   Layer 2: CDN Cache (Cloudflare)                                           │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │   • Static assets - Edge caching globally                            │   │
│   │   • HTML pages (public) - Short TTL (1 hour)                         │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                      │                                      │
│                                      ▼                                      │
│   Layer 3: Application Cache (Redis)                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │   • Session data - 24 hour TTL                                       │   │
│   │   • API response cache - 5-60 minute TTL                             │   │
│   │   • User preferences - 30 day TTL                                    │   │
│   │   • Prayer times - 24 hour TTL                                       │   │
│   │   • Computed reports - 1 hour TTL                                    │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                      │                                      │
│                                      ▼                                      │
│   Layer 4: Database Query Cache                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │   • PostgreSQL query plan caching                                    │   │
│   │   • Connection pooling (PgBouncer)                                   │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. High Availability Design

### 8.1 HA Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      HIGH AVAILABILITY ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                          Cloudflare (Global HA)                              │
│                                   │                                          │
│                                   ▼                                          │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                        Load Balancer                                 │   │
│   │                     (Active-Passive HA)                              │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                   │                                          │
│           ┌───────────────────────┼───────────────────────┐                 │
│           │                       │                       │                 │
│           ▼                       ▼                       ▼                 │
│   ┌───────────────┐       ┌───────────────┐       ┌───────────────┐        │
│   │  App Server 1 │       │  App Server 2 │       │  App Server N │        │
│   │   (Active)    │       │   (Active)    │       │   (Active)    │        │
│   └───────────────┘       └───────────────┘       └───────────────┘        │
│                                   │                                          │
│                                   ▼                                          │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                        Redis Cluster                                 │   │
│   │                    (3 Masters, 3 Replicas)                           │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                   │                                          │
│                                   ▼                                          │
│   ┌────────────────────────────────────────────────────────────────────┐    │
│   │                        Database Cluster                             │    │
│   │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐       │    │
│   │  │ PostgreSQL     │  │ PostgreSQL     │  │ MySQL Primary  │       │    │
│   │  │ Primary        │──│ Replica        │  │      +         │       │    │
│   │  │                │  │                │  │   Replica      │       │    │
│   │  └────────────────┘  └────────────────┘  └────────────────┘       │    │
│   └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                        Backup & Recovery                             │   │
│   │   • Automated daily backups                                          │   │
│   │   • Point-in-time recovery (PostgreSQL WAL)                          │   │
│   │   • Cross-region backup storage                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Failure Scenarios and Recovery

| Scenario | Detection | Recovery | RTO |
|----------|-----------|----------|-----|
| Single app server failure | Health check | Auto-restart, traffic rerouted | < 30 sec |
| All app servers failure | Monitoring alert | Manual intervention | < 15 min |
| Database primary failure | Replication lag | Promote replica | < 5 min |
| Redis failure | Connection error | Restart, fallback to DB | < 2 min |
| CDN failure | External monitoring | Direct server access | < 5 min |
| Complete site failure | Multi-source monitoring | DR site activation | < 4 hours |

### 8.3 Monitoring and Alerting

| Metric | Threshold | Alert |
|--------|-----------|-------|
| CPU Usage | > 80% for 5 min | Warning |
| Memory Usage | > 85% | Warning |
| Response Time (p95) | > 500ms | Warning |
| Error Rate | > 1% | Critical |
| Disk Usage | > 80% | Warning |
| Database Connections | > 80% of max | Warning |
| SSL Expiry | < 30 days | Warning |

---

## Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Developer | | _________________ | ________ |
| Technical Reviewer | | _________________ | ________ |

---

**Document Version:** 1.0
**Last Updated:** January 10, 2026
**Status:** Pending Approval

---

*This System Architecture Document provides the technical blueprint for the Smart Academy Digital Portal. It should be reviewed and updated as architectural decisions are refined during development.*
