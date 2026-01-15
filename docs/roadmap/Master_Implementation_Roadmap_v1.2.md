# Smart Academy Digital Portal - Master Implementation Roadmap v1.2

**Project:** Smart Academy Digital Portal
**Version:** 1.2 (Unified Edition)
**Date:** 2026-01-11
**Developer:** Solo Full-Stack Developer
**Environment:** Linux OS, VS Code IDE, Local Database Server, Vite Build Server, HMR, Browser Preview

---

## Document Control

| Field | Details |
|-------|---------|
| **Document Title** | Master Implementation Roadmap |
| **Version** | 1.2 (Unified) |
| **Status** | Active |
| **Created Date** | January 2026 |
| **Last Updated** | January 11, 2026 |
| **Classification** | Internal |

---

## Table of Contents

1. [Document Overview](#document-overview)
2. [Project Context](#project-context)
3. [Roadmap Overview](#roadmap-overview)
4. [Phase 1: Project Foundation & Environment Setup](#phase-1-project-foundation--environment-setup)
5. [Phase 2: Database Infrastructure Setup](#phase-2-database-infrastructure-setup)
6. [Phase 3: Authentication & Authorization System](#phase-3-authentication--authorization-system)
7. [Phase 4: User Management Module](#phase-4-user-management-module)
8. [Phase 5: Academic Management Module](#phase-5-academic-management-module)
9. [Phase 6: Attendance Management Module](#phase-6-attendance-management-module)
10. [Phase 7: Grading & Assessment Module](#phase-7-grading--assessment-module)
11. [Phase 8: Fee Management Module](#phase-8-fee-management-module)
12. [Phase 9: Islamic Education Module](#phase-9-islamic-education-module)
13. [Phase 10: Communication Hub](#phase-10-communication-hub)
14. [Phase 11: Library & Inventory Modules](#phase-11-library--inventory-modules)
15. [Phase 12: Transport & Hostel Modules](#phase-12-transport--hostel-modules)
16. [Phase 13: External Integrations](#phase-13-external-integrations)
17. [Phase 14: Frontend Development - Web Portals](#phase-14-frontend-development---web-portals)
18. [Phase 15: Mobile Apps & Production Deployment](#phase-15-mobile-apps--production-deployment)
19. [Appendix A: Phase Dependencies](#appendix-a-phase-dependencies)
20. [Appendix B: Risk Matrix](#appendix-b-risk-matrix)
21. [Appendix C: Documentation References](#appendix-c-documentation-references)

---

## Document Overview

This Master Implementation Roadmap v1.2 is a **unified and corrected version** that consolidates the best elements from v1.0 and v1.1, with additional insights from deployment documentation. It provides a comprehensive, step-by-step guide for developing the Smart Academy Digital Portal.

### What's New in v1.2

- **Unified Structure**: Combined the best phase organization from both versions
- **Deployment Integration**: Incorporated deployment runbook knowledge
- **Corrected Timeline**: Adjusted phase durations for realistic solo development
- **Updated Technology**: Reflects latest versions (Next.js 15, React 19, Node.js 22 LTS)
- **Enhanced Dependencies**: Clear phase dependency mapping
- **Islamic Module**: Dedicated phase for Islamic education features
- **Production Focus**: Emphasizes deployment and monitoring from the start

### Key Characteristics

| Attribute | Value |
|-----------|-------|
| **Total Phases** | 15 |
| **Total Milestones** | 150 (10 per phase) |
| **Estimated Duration** | 170 days (~5.6 months) |
| **Target Developer** | Solo Full-Stack Developer |
| **Documentation Format** | Markdown |
| **Development Approach** | Sequential, incremental delivery |
| **Deployment Strategy** | Blue-Green with Zero Downtime |

---

## Project Context

### Project Summary

The Smart Academy Digital Portal is a comprehensive educational institution management system for Islamic schools in Bangladesh. It encompasses:

- **5 User Portals**: Public, Student, Parent, Teacher, Admin
- **13+ Functional Modules**: Auth, Academic, Attendance, Grading, Fees, Library, Communication, Transport, Hostel, Inventory, Reporting, Islamic Education, External Integrations
- **50+ API Endpoints**: RESTful APIs with OpenAPI 3.1.0 specification
- **45+ Database Tables**: PostgreSQL 16+ with Prisma 6.x ORM
- **30+ UI Components**: Reusable React components with Radix UI
- **8+ External Integrations**: bKash, Nagad, SSLCommerz, BulkSMSBD, SendGrid, Aladhan, Quran.com, Gibbon SMS, Moodle LMS

### Technical Stack

#### Frontend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.x | React framework for web portals |
| React | 19.x | UI library |
| TypeScript | 5.x | Type-safe JavaScript |
| Tailwind CSS | 4.x | Utility-first CSS framework |
| Radix UI | Latest | Accessible component primitives |
| Vite | 6.x | Build tool for admin dashboard |
| Turbopack | Latest | Fast bundler for Next.js |

#### Backend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 22 LTS | JavaScript runtime |
| Fastify | 5.x | High-performance web framework |
| TypeScript | 5.x | Type-safe backend development |
| Prisma | 6.x | Next-generation ORM |
| tRPC | Latest | End-to-end typesafe APIs |

#### Database Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| PostgreSQL | 16+ | Primary database |
| MySQL | 8.0+ | Gibbon/Moodle integration |
| Redis | 7+ | Caching and sessions |

#### DevOps Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| Docker | 26+ | Containerization |
| Docker Compose | v2.24+ | Multi-container orchestration |
| nginx | Latest | Reverse proxy & web server |
| GitHub Actions | Latest | CI/CD pipelines |
| Cloudflare | - | CDN & DNS |
| Prometheus | Latest | Metrics collection |
| Grafana | Latest | Monitoring dashboards |

#### Mobile Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| React Native | 0.76+ | Mobile app framework |
| Expo | 52+ | Development platform |

---

## Roadmap Overview

### Timeline Summary

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    SMART ACADEMY IMPLEMENTATION TIMELINE                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  MONTH 1                          MONTH 2                          MONTH 3      │
│  ┌──────────────────────────────────────────────────────────────────────────┐  │
│  │ Phase 1: Foundation         Phase 3: Auth           Phase 5: Academic   │  │
│  │ Phase 2: Database           Phase 4: Users           Phase 6: Attendance │  │
│  └──────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│  MONTH 4                          MONTH 5                          MONTH 6      │
│  ┌──────────────────────────────────────────────────────────────────────────┐  │
│  │ Phase 7: Grading          Phase 9: Islamic        Phase 11: Library     │  │
│  │ Phase 8: Fees              Phase 10: Communication  Phase 12: Transport │  │
│  └──────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│  FINAL STRETCH                                                                   │
│  ┌──────────────────────────────────────────────────────────────────────────┐  │
│  │ Phase 13: Integrations      Phase 14: Frontend      Phase 15: Deploy     │  │
│  └──────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Phase Duration Summary

| Phase | Name | Duration | Cumulative Days |
|-------|------|----------|-----------------|
| 1 | Project Foundation & Environment Setup | 7 days | 7 |
| 2 | Database Infrastructure Setup | 10 days | 17 |
| 3 | Authentication & Authorization System | 7 days | 24 |
| 4 | User Management Module | 10 days | 34 |
| 5 | Academic Management Module | 14 days | 48 |
| 6 | Attendance Management Module | 10 days | 58 |
| 7 | Grading & Assessment Module | 10 days | 68 |
| 8 | Fee Management Module | 10 days | 78 |
| 9 | Islamic Education Module | 14 days | 92 |
| 10 | Communication Hub | 10 days | 102 |
| 11 | Library & Inventory Modules | 10 days | 112 |
| 12 | Transport & Hostel Modules | 7 days | 119 |
| 13 | External Integrations | 14 days | 133 |
| 14 | Frontend Development - Web Portals | 21 days | 154 |
| 15 | Mobile Apps & Production Deployment | 16 days | 170 |
| **Total** | | **170 days** | **~5.6 months** |

### Critical Path

```
Foundation → Database → Auth → Users → Academic → Attendance → Grading → Fees
                                                            ↓
                                          Islamic → Communication → Library
                                                            ↓
                                          Transport → Integrations → Frontend
                                                            ↓
                                                    Mobile + Deployment
```

---

## Phase 1: Project Foundation & Environment Setup

**Estimated Duration:** 7 days
**Dependencies:** None
**Risk Level:** Low

### Milestone 1: Linux System Configuration

**Objective:** Configure Linux OS for development.

**Tasks:**
- Install Ubuntu 24.04 LTS or similar Linux distribution
- Update system: `sudo apt update && sudo apt upgrade -y`
- Install build tools: `sudo apt install build-essential curl wget git -y`
- Configure timezone: `sudo timedatectl set-timezone Asia/Dhaka`
- Set up UTF-8 locale
- Configure UFW firewall for ports 3000-3003, 4000-4001, 5432, 6379, 8080
- Install SSH server for remote access
- Configure swap space (4GB recommended)

**Deliverables:**
- Fully configured Linux development environment
- System configuration documented in `docs/Development/DEV_System_Configuration.md`

**Acceptance Criteria:**
- All system packages updated
- Development ports accessible
- Timezone set to Asia/Dhaka
- SSH access working

---

### Milestone 2: Install Node.js 22 LTS and pnpm

**Objective:** Set up JavaScript runtime and package manager.

**Tasks:**
- Install Node.js 22 LTS via NodeSource:
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt install -y nodejs
  ```
- Verify: `node --version` (v22.x.x) and `npm --version`
- Install pnpm globally: `npm install -g pnpm`
- Verify pnpm: `pnpm --version`
- Create `.npmrc` with:
  ```
  auto-install-peers=true
  strict-peer-dependencies=false
  ```
- Create `.nvmrc` with: `22`

**Deliverables:**
- Node.js 22 LTS installed
- pnpm package manager configured
- Configuration files in place

**Acceptance Criteria:**
- Node.js v22.x.x verified
- pnpm can install packages without sudo
- `.npmrc` and `.nvmrc` files created

---

### Milestone 3: Install Docker and Docker Compose

**Objective:** Set up containerization platform.

**Tasks:**
- Install Docker Engine following official docs
- Add user to docker group: `sudo usermod -aG docker $USER`
- Install Docker Compose V2 plugin
- Verify: `docker --version` and `docker compose version`
- Create base dockerfiles in `docker/` directory
- Configure daemon with `daemon.json` for logging

**Deliverables:**
- Docker and Docker Compose installed
- Base Dockerfile templates
- Configuration documented

**Acceptance Criteria:**
- Docker runs without sudo
- Docker Compose V2 functional
- Can run `docker run hello-world` successfully

---

### Milestone 4: Install Git and Configure Workflow

**Objective:** Set up version control.

**Tasks:**
- Install Git: `sudo apt install git`
- Configure: `git config --global user.name "Your Name"` and `git config --global user.email "email@example.com"`
- Set default branch: `git config --global init.defaultBranch main`
- Create `.gitignore` for Node.js/Docker
- Set up commit message template
- Install Git LFS if needed

**Deliverables:**
- Git configured with user identity
- `.gitignore` file created
- Commit template in place

**Acceptance Criteria:**
- Git version 2.40+
- Can commit and push changes
- `.gitignore` covers node_modules, .env, builds

---

### Milestone 5: Install VS Code and Extensions

**Objective:** Set up IDE with essential extensions.

**Tasks:**
- Install VS Code for Linux
- Install CLI: `code --install-extension`
- Required extensions:
  - `dbaeumer.vscode-eslint`
  - `esbenp.prettier-vscode`
  - `bradlc.vscode-tailwindcss`
  - `Prisma.prisma`
  - `ms-azuretools.vscode-docker`
  - `eamodio.gitlens`
  - `wallabyjs.quokka-vscode` (optional)
- Create `.vscode/settings.json`
- Create `.vscode/extensions.json` for recommendations

**Deliverables:**
- VS Code with extensions installed
- Workspace settings configured
- Extensions recommendations file

**Acceptance Criteria:**
- All extensions installed and working
- Prettier and ESLint configured in settings
- Format on save enabled

---

### Milestone 6: Create Monorepo Structure with Turborepo

**Objective:** Initialize project structure.

**Tasks:**
- Create directory structure:
  ```
  smart-academy-portal/
  ├── apps/
  │   ├── web/          # Next.js 15 web portal
  │   ├── admin/        # Vite + React admin
  │   ├── api/          # Fastify backend
  │   └── mobile/       # React Native + Expo
  ├── packages/
  │   ├── ui/           # Shared components
  │   ├── config/       # Shared config (ESLint, TSConfig)
  │   ├── types/        # Shared TypeScript types
  │   └── utils/        # Shared utilities
  ├── docs/
  ├── docker/
  └── scripts/
  ```
- Initialize: `pnpm create turbo@latest`
- Create `turbo.json`
- Create `pnpm-workspace.yaml`
- Initialize Git repository

**Deliverables:**
- Complete monorepo structure
- Turborepo initialized
- Workspace configuration

**Acceptance Criteria:**
- All directories created
- `pnpm install` works
- `turbo build` executes without errors

---

### Milestone 7: Configure ESLint, Prettier, and Husky

**Objective:** Set up code quality and Git hooks.

**Tasks:**
- Install ESLint and plugins
- Create `.eslintrc.js` with TypeScript, React, Next.js rules
- Install and configure Prettier
- Create `.prettierrc` for formatting rules
- Install Husky: `pnpm exec husky install`
- Create `.husky/pre-commit` for lint-staged
- Create `.husky/commit-msg` for conventional commits
- Install lint-staged

**Deliverables:**
- ESLint configuration
- Prettier configuration
- Husky hooks active
- lint-staged configured

**Acceptance Criteria:**
- Pre-commit hook runs on staged files
- Linting catches errors
- Commit messages validated
- Formatting consistent across codebase

---

### Milestone 8: Set Up GitHub Actions CI/CD

**Objective:** Configure continuous integration.

**Tasks:**
- Create `.github/workflows/ci.yml`
- Configure: lint, test, build steps
- Set up caching for dependencies
- Configure branch protection rules
- Set up GitHub secrets template
- Create PR template in `.github/`

**Deliverables:**
- CI pipeline configuration
- PR templates
- Branch protection rules

**Acceptance Criteria:**
- CI runs on push/PR
- All checks pass on main branch
- PR template displays correctly

---

### Milestone 9: Create Environment Configuration

**Objective:** Set up environment variable management.

**Tasks:**
- Create `.env.example` template
- Set up `@t3-oss/env-nextjs` for type-safe env vars
- Create validation schemas
- Document all required environment variables
- Set up different configs for dev/staging/prod

**Deliverables:**
- Environment variable templates
- Validation schemas
- Documentation

**Acceptance Criteria:**
- `.env.example` contains all variables
- Type-safe access to env vars
- Validation fails on missing vars

---

### Milestone 10: Verify Development Environment

**Objective:** Complete environment validation.

**Tasks:**
- Run `pnpm install` across monorepo
- Run `turbo build` to verify builds
- Run linting across all packages
- Test Docker compose startup
- Verify all tooling works
- Create verification script: `scripts/verify-env.sh`
- Document results in `docs/Development/DEV_Environment_Verification.md`

**Deliverables:**
- Environment verification script
- Verification documentation
- All tools confirmed working

**Acceptance Criteria:**
- All packages build successfully
- Linting passes
- Docker containers start
- Verification script runs without errors

---

## Phase 2: Database Infrastructure Setup

**Estimated Duration:** 10 days
**Dependencies:** Phase 1
**Risk Level:** Medium

### Milestone 1: Design Complete Database Schema

**Objective:** Create comprehensive ERD and schema design.

**Tasks:**
- Review functional requirements for all data needs
- Identify entities: Users, Students, Teachers, Classes, Subjects, Attendance, Grades, Fees, etc.
- Design entity-relationship diagram
- Define primary/foreign keys
- Plan indexes for performance
- Define constraints and relationships
- Document in `docs/Database/DB_Schema_Design_v1.0.md`

**Deliverables:**
- Complete ERD diagram
- Schema design document
- Entity relationship definitions

**Acceptance Criteria:**
- All functional requirements mapped to entities
- Relationships clearly defined
- Performance indexes identified
- Design reviewed and approved

---

### Milestone 2: Create Prisma Schema File

**Objective:** Define all database models in Prisma.

**Tasks:**
- Create `apps/api/prisma/schema.prisma`
- Define datasource for PostgreSQL
- Create models:
  - **auth schema**: User, Role, Permission, Session
  - **academic schema**: Class, Section, Subject, Enrollment, Assignment
  - **attendance schema**: Attendance, AttendanceRecord, LeaveRequest
  - **grading schema**: Grade, Exam, Assessment
  - **fee schema**: FeeStructure, FeePayment, PaymentTransaction
  - **library schema**: Book, BookIssue, BookReturn
  - **communication schema**: Message, Notice, Notification
  - **islamic schema**: QuranProgress, HifzRecord, PrayerLog
  - **transport schema**: Route, Vehicle, TransportAllocation
  - **hostel schema**: Room, RoomAllocation, HostelFee
  - **inventory schema**: Asset, PurchaseRecord, Maintenance
- Add indexes for frequently queried fields
- Document in `docs/Database/DB_Prisma_Schema_v1.0.md`

**Deliverables:**
- Complete `schema.prisma` file
- Prisma schema documentation

**Acceptance Criteria:**
- All models defined
- Relationships configured correctly
- Indexes added
- `npx prisma validate` passes

---

### Milestone 3: Set Up PostgreSQL Docker Container

**Objective:** Configure PostgreSQL database.

**Tasks:**
- Create `docker/postgres/Dockerfile`
- Create `docker/postgres/init.sql`
- Configure environment variables in `.env`
- Set up volume persistence
- Add PostgreSQL service to `docker-compose.yml`
- Configure connection settings
- Test container startup

**Deliverables:**
- PostgreSQL Dockerfile
- docker-compose service configuration
- Connection documentation

**Acceptance Criteria:**
- Container starts successfully
- Database initialized
- Data persists across restarts
- Application can connect

---

### Milestone 4: Set Up MySQL for Gibbon/Moodle

**Objective:** Configure MySQL for external integrations.

**Tasks:**
- Create `docker/mysql/Dockerfile`
- Create init script for Gibbon and Moodle databases
- Configure MySQL settings
- Add MySQL service to docker-compose.yml
- Set up separate databases: `gibbon_db`, `moodle_db`
- Test container startup

**Deliverables:**
- MySQL Docker configuration
- Separate databases created
- Connection documentation

**Acceptance Criteria:**
- MySQL container starts
- Gibbon and Moodle databases created
- Connections work from application

---

### Milestone 5: Set Up Redis for Caching

**Objective:** Configure Redis for sessions and caching.

**Tasks:**
- Create `docker/redis/Dockerfile`
- Configure persistence (RDB + AOF)
- Set up memory management
- Configure password authentication
- Add Redis service to docker-compose.yml
- Test connection

**Deliverables:**
- Redis Docker configuration
- Connection documentation

**Acceptance Criteria:**
- Redis container starts
- Persistence configured
- Authentication working
- Application can connect

---

### Milestone 6: Set Up MinIO for Object Storage

**Objective:** Configure S3-compatible storage.

**Tasks:**
- Create `docker/minio/Dockerfile`
- Configure buckets: avatars, documents, images, exports
- Set up access policies
- Add MinIO service to docker-compose.yml
- Configure SDK connection

**Deliverables:**
- MinIO Docker configuration
- Bucket configuration
- SDK integration

**Acceptance Criteria:**
- MinIO container starts
- Buckets created
- Files can be uploaded/retrieved

---

### Milestone 7: Create Database Migrations

**Objective:** Generate and test Prisma migrations.

**Tasks:**
- Run `npx prisma generate`
- Create initial migration: `npx prisma migrate dev --name init`
- Review generated SQL
- Create seed script: `prisma/seed.ts`
- Define seed data (roles, permissions, sample data)
- Test migration and seed

**Deliverables:**
- Migration files
- Seed script
- Migration documentation

**Acceptance Criteria:**
- Migrations apply successfully
- Seed data inserted correctly
- Migration rollback works

---

### Milestone 8: Configure Connection Pooling

**Objective:** Optimize database connections.

**Tasks:**
- Configure Prisma connection pool settings
- Set connection limits
- Configure timeout settings
- Set up pool monitoring
- Test under load

**Deliverables:**
- Connection pool configuration
- Monitoring setup
- Performance benchmarks

**Acceptance Criteria:**
- Pool handles concurrent connections
- No connection exhaustion
- Metrics are visible

---

### Milestone 9: Set Up Backup Procedures

**Objective:** Configure automated backups.

**Tasks:**
- Create backup script for PostgreSQL
- Create backup script for MySQL
- Set up cron jobs for daily/weekly backups
- Configure retention policy
- Create restore scripts
- Test backup/restore cycle

**Deliverables:**
- Backup scripts
- Restore scripts
- Scheduled tasks
- Documentation in `docs/Database/DB_Backup_Restore_v1.0.md`

**Acceptance Criteria:**
- Backups run automatically
- Restore procedure tested
- Retention policy enforced

---

### Milestone 10: Test CRUD Operations

**Objective:** Verify database operations.

**Tasks:**
- Create test scripts for each entity
- Test Create, Read, Update, Delete operations
- Test relationships
- Test transactions
- Test error handling
- Document test results

**Deliverables:**
- CRUD test suite
- Test results documentation

**Acceptance Criteria:**
- All entities tested
- CRUD operations work
- Relationships maintained
- Error handling robust

---

## Phase 3: Authentication & Authorization System

**Estimated Duration:** 7 days
**Dependencies:** Phase 1, Phase 2
**Risk Level:** High

### Milestone 1: Design JWT Authentication Architecture

**Objective:** Design secure authentication system.

**Tasks:**
- Research JWT best practices
- Design token structure (access + refresh tokens)
- Define token payload
- Design refresh mechanism
- Plan token revocation
- Define expiration policies (access: 15min, refresh: 7 days)
- Plan httpOnly cookie storage
- Document in `docs/Security/SEC_Auth_Architecture_v1.0.md`

**Deliverables:**
- Authentication architecture document
- Token specifications
- Flow diagrams

**Acceptance Criteria:**
- Architecture follows OWASP guidelines
- Token structure defined
- Security considerations documented

---

### Milestone 2: Implement User Registration

**Objective:** Create registration endpoint with email verification.

**Tasks:**
- Create `POST /api/auth/register` endpoint
- Hash passwords with bcrypt (cost: 12)
- Generate email verification token
- Send verification email via SendGrid
- Create `POST /api/auth/verify-email` endpoint
- Implement token validation
- Activate account on verification
- Add input validation

**Deliverables:**
- Registration endpoint
- Email verification endpoint
- Email templates

**Acceptance Criteria:**
- Users can register
- Passwords hashed securely
- Verification emails sent
- Accounts activated after verification

---

### Milestone 3: Implement User Login

**Objective:** Create login endpoint with JWT generation.

**Tasks:**
- Create `POST /api/auth/login` endpoint
- Verify password with bcrypt
- Generate JWT access token
- Generate JWT refresh token
- Store refresh token in Redis
- Set httpOnly cookies
- Implement rate limiting (5 attempts/15min)
- Implement account lockout (10 failures)

**Deliverables:**
- Login endpoint
- JWT generation logic
- Rate limiting

**Acceptance Criteria:**
- Valid credentials generate tokens
- Tokens stored securely
- Rate limiting prevents brute force
- Account locks after failures

---

### Milestone 4: Implement Password Reset

**Objective:** Create password reset with email/SMS.

**Tasks:**
- Create `POST /api/auth/reset-password-request` endpoint
- Generate reset token
- Send email via SendGrid
- Send SMS via BulkSMSBD
- Store token in Redis (1 hour expiry)
- Create `POST /api/auth/reset-password` endpoint
- Invalidate old tokens on reset

**Deliverables:**
- Password reset endpoints
- Email/SMS templates
- Reset documentation

**Acceptance Criteria:**
- Users can request reset
- Reset emails/SMS sent
- Tokens validated correctly
- Passwords updated securely

---

### Milestone 5: Implement RBAC

**Objective:** Create role-based access control.

**Tasks:**
- Define roles: ADMIN, TEACHER, STUDENT, PARENT, STAFF
- Define permissions for each role
- Create permission constants
- Implement permission middleware
- Create role assignment API
- Implement route protection
- Document permission matrix

**Deliverables:**
- RBAC middleware
- Permission definitions
- Permission matrix documentation

**Acceptance Criteria:**
- Roles clearly defined
- Permissions enforced
- Routes protected
- Matrix documented

---

### Milestone 6: Implement Refresh Token Flow

**Objective:** Create token refresh mechanism.

**Tasks:**
- Create `POST /api/auth/refresh` endpoint
- Validate refresh token from Redis
- Generate new access token
- Implement token rotation
- Create `POST /api/auth/logout` endpoint
- Invalidate all tokens on logout

**Deliverables:**
- Refresh token endpoint
- Logout endpoint
- Token rotation logic

**Acceptance Criteria:**
- Refresh tokens generate new access tokens
- Token rotation prevents reuse
- Logout invalidates all tokens
- Expired tokens handled correctly

---

### Milestone 7: Implement Session Management

**Objective:** Create Redis-based session management.

**Tasks:**
- Design session data structure
- Create session utilities (create, get, update, delete)
- Implement session expiration
- Store sessions in Redis
- Limit concurrent sessions (5 per user)
- Track session activity

**Deliverables:**
- Session management utilities
- Redis session storage
- Session tracking

**Acceptance Criteria:**
- Sessions created and stored correctly
- Sessions expire automatically
- Concurrent sessions limited
- Activity tracked

---

### Milestone 8: Create Authentication Middleware

**Objective:** Build API protection middleware.

**Tasks:**
- Create authentication middleware
- Extract and validate JWT
- Verify signature and expiration
- Attach user to request
- Create authorization middleware
- Check permissions
- Handle errors gracefully

**Deliverables:**
- Auth middleware
- Authorization middleware
- Protected route configuration

**Acceptance Criteria:**
- Middleware validates tokens
- Unauthorized requests rejected
- User data attached to requests
- Permissions checked correctly

---

### Milestone 9: Implement MFA (Optional)

**Objective:** Add multi-factor authentication support.

**Tasks:**
- Research TOTP implementation
- Create `POST /api/auth/mfa/setup` endpoint
- Generate TOTP secret
- Generate QR codes
- Create `POST /api/auth/mfa/verify` endpoint
- Implement backup codes
- Integrate into login flow

**Deliverables:**
- MFA endpoints
- QR code generation
- Backup codes

**Acceptance Criteria:**
- Users can enable MFA
- QR codes generated correctly
- TOTP tokens validated
- Backup codes work as fallback

---

### Milestone 10: Write Auth Tests

**Objective:** Comprehensive test coverage.

**Tasks:**
- Set up Jest for testing
- Write unit tests for all endpoints
- Write integration tests for auth flows
- Test middleware
- Test RBAC
- Test MFA
- Achieve >80% coverage

**Deliverables:**
- Test suite
- Coverage report
- Test documentation

**Acceptance Criteria:**
- All endpoints tested
- Coverage >80%
- All tests pass
- Edge cases covered

---

## Phase 4: User Management Module

**Estimated Duration:** 10 days
**Dependencies:** Phase 3
**Risk Level:** Medium

### Milestone 1: Design User Profile Models

**Objective:** Create comprehensive profile data models.

**Tasks:**
- Define User profile fields
- Create Student-specific profile
- Create Teacher-specific profile
- Create Parent-specific profile
- Design profile image storage
- Add profile completion tracking
- Document in `docs/Database/DB_User_Profile_Model_v1.0.md`

**Deliverables:**
- User profile data model
- Profile validation rules
- Model documentation

**Acceptance Criteria:**
- All user types modeled
- Fields properly typed
- Validation rules comprehensive

---

### Milestone 2: Create User CRUD Endpoints

**Objective:** Build user management API.

**Tasks:**
- Create `GET /api/users` (list with pagination)
- Create `GET /api/users/:id` (single user)
- Create `POST /api/users` (create user)
- Create `PUT /api/users/:id` (update user)
- Create `DELETE /api/users/:id` (soft delete)
- Implement filtering and sorting
- Add input validation

**Deliverables:**
- User CRUD endpoints
- Pagination implementation
- API documentation

**Acceptance Criteria:**
- All CRUD operations work
- Pagination functional
- Filtering/sorting works

---

### Milestone 3: Implement Bulk User Import

**Objective:** Create CSV/Excel import functionality.

**Tasks:**
- Create `POST /api/users/import` endpoint
- Implement file upload handling
- Parse CSV files
- Parse Excel files (xlsx library)
- Validate imported data
- Batch create users
- Handle duplicates
- Generate import report

**Deliverables:**
- Bulk import endpoint
- Parsers for CSV/Excel
- Import report generator

**Acceptance Criteria:**
- Files upload successfully
- Data parsed correctly
- Validation catches errors
- Report accurate

---

### Milestone 4: Implement Avatar Upload

**Objective:** Add profile image functionality.

**Tasks:**
- Create `POST /api/users/:id/avatar` endpoint
- Validate image types (jpg, png, webp)
- Resize images (sharp library)
- Store in MinIO
- Update database with URL
- Delete old avatar on update
- Serve images via CDN

**Deliverables:**
- Avatar upload endpoint
- Image processing
- MinIO integration

**Acceptance Criteria:**
- Images upload successfully
- File types validated
- Images optimized
- Old images deleted

---

### Milestone 5: Implement User Activation/Deactivation

**Objective:** Add account status management.

**Tasks:**
- Create `POST /api/users/:id/activate` endpoint
- Create `POST /api/users/:id/deactivate` endpoint
- Invalidate sessions on deactivation
- Send notifications
- Log status changes
- Add authorization (admin only)

**Deliverables:**
- Activation endpoints
- Status change logging
- Notification system

**Acceptance Criteria:**
- Accounts can be activated/deactivated
- Sessions invalidated
- Notifications sent
- Changes logged

---

### Milestone 6: Create Parent-Child Relationships

**Objective:** Link parents to students.

**Tasks:**
- Design relationship model
- Create `POST /api/users/:parentId/children/:studentId` endpoint
- Create bulk relationship endpoint
- Implement validation
- Create query endpoint
- Create remove endpoint

**Deliverables:**
- Relationship endpoints
- Validation logic
- Documentation

**Acceptance Criteria:**
- Parents linked to students
- Multiple parents supported
- Relationships validated

---

### Milestone 7: Implement User Search

**Objective:** Advanced search and filtering.

**Tasks:**
- Create `GET /api/users/search` endpoint
- Implement full-text search
- Filter by role, class, status
- Implement sorting
- Add search suggestions
- Optimize with indexes

**Deliverables:**
- Search endpoint
- Full-text search
- Filtering options

**Acceptance Criteria:**
- Search returns relevant results
- Filters work correctly
- Performance acceptable

---

### Milestone 8: Create User Management UI Components

**Objective:** Build React components for user management.

**Tasks:**
- Create UserList component
- Create UserDetail component
- CreateUserForm component
- UserSearch component
- BulkImport component
- AvatarUpload component
- Pagination UI

**Deliverables:**
- Reusable UI components
- Component documentation

**Acceptance Criteria:**
- Components reusable
- Accessible (ARIA labels)
- Responsive design
- Follow design system

---

### Milestone 9: Implement Permissions Management

**Objective:** UI and API for permissions.

**Tasks:**
- Create `PUT /api/users/:id/permissions` endpoint
- Design permissions UI component
- Implement assignment/revocation
- Create permission templates
- Add bulk operations
- Log permission changes

**Deliverables:**
- Permissions endpoints
- Permissions UI
- Permission templates

**Acceptance Criteria:**
- Permissions can be assigned/revoked
- Templates work
- Changes logged

---

### Milestone 10: Write User Management Tests

**Objective:** Test user module.

**Tasks:**
- Write unit tests for CRUD
- Test bulk import
- Test avatar upload
- Test activation/deactivation
- Test relationships
- Test search/filtering
- Integration tests

**Deliverables:**
- Test suite
- Coverage report
- Documentation

**Acceptance Criteria:**
- All endpoints tested
- Coverage >80%
- Tests pass

---

## Phase 5: Academic Management Module

**Estimated Duration:** 14 days
**Dependencies:** Phase 4
**Risk Level:** Medium

### Milestone 1: Design Academic Data Models

**Objective:** Model academic entities.

**Tasks:**
- Define Class, Section, Subject models
- Define Enrollment, Assignment models
- Define Timetable, AcademicCalendar models
- Define relationships
- Document in `docs/Database/DB_Academic_Models_v1.0.md`

**Deliverables:**
- Academic data models
- Relationship documentation

**Acceptance Criteria:**
- All entities modeled
- Relationships correct
- Models documented

---

### Milestone 2: Create Class/Section Management API

**Objective:** API for classes and sections.

**Tasks:**
- CRUD endpoints for Classes
- CRUD endpoints for Sections
- Validation for class codes
- Section capacity limits
- Active/inactive status

**Deliverables:**
- Class/Section endpoints
- Validation logic
- API documentation

**Acceptance Criteria:**
- All CRUD operations work
- Validation functional
- Capacity enforced

---

### Milestone 3: Create Subject Management API

**Objective:** API for subjects.

**Tasks:**
- CRUD endpoints for Subjects
- Assign subjects to classes
- Assign teachers to subjects
- Subject prerequisites
- Credit hours tracking

**Deliverables:**
- Subject endpoints
- Assignment endpoints
- Documentation

**Acceptance Criteria:**
- CRUD operations work
- Assignments functional
- Prereqs enforced

---

### Milestone 4: Implement Timetable System

**Objective:** Class scheduling functionality.

**Tasks:**
- Design timetable data model
- Create timetable management endpoints
- Implement conflict detection
- Create timetable generation algorithm
- Add export functionality (PDF, iCal)
- Teacher availability tracking

**Deliverables:**
- Timetable endpoints
- Conflict detection
- Generation algorithm
- Export functionality

**Acceptance Criteria:**
- Timetables created
- Conflicts detected
- Export works
- Availability tracked

---

### Milestone 5: Create Academic Calendar

**Objective:** School calendar management.

**Tasks:**
- Create calendar event endpoints
- Support event types (holidays, exams, events)
- Implement recurring events
- Add iCal export
- Public calendar view
- Calendar subscription support

**Deliverables:**
- Calendar endpoints
- Event types
- Export functionality

**Acceptance Criteria:**
- Events created/managed
- Recurring events work
- iCal export functional

---

### Milestone 6: Implement Student Promotion

**Objective:** Grade promotion system.

**Tasks:**
- Design promotion data model
- Create promotion endpoints
- Implement validation (passing grades required)
- Transfer academic records
- Bulk promotion
- Generate promotion reports

**Deliverables:**
- Promotion endpoints
- Validation logic
- Bulk operations
- Reports

**Acceptance Criteria:**
- Students promoted correctly
- Validation prevents invalid promotions
- Records transferred
- Reports generated

---

### Milestone 7: Create Class Teacher Assignment

**Objective:** Assign teachers to classes.

**Tasks:**
- Create assignment endpoints
- Implement validation (one class teacher per class)
- Track teacher workload
- Create teacher class list view
- Assignment history

**Deliverables:**
- Assignment endpoints
- Workload tracking
- Documentation

**Acceptance Criteria:**
- Teachers assigned to classes
- One teacher per class enforced
- Workload tracked

---

### Milestone 8: Build Academic Management UI

**Objective:** Admin UI for academic module.

**Tasks:**
- Class management UI
- Section management UI
- Subject management UI
- Timetable UI with drag-drop
- Calendar UI
- Promotion UI

**Deliverables:**
- Academic UI components
- Responsive design
- UI documentation

**Acceptance Criteria:**
- UI user-friendly
- Responsive
- Accessible
- Documented

---

### Milestone 9: Implement Academic Reports

**Objective:** Generate academic reports.

**Tasks:**
- Design report templates
- Class list report
- Student enrollment report
- Subject assignment report
- Timetable report
- PDF generation (jsPDF)
- Excel export

**Deliverables:**
- Report templates
- Report endpoints
- PDF generation
- Excel export

**Acceptance Criteria:**
- Reports generate correctly
- PDFs formatted properly
- Excel exports work

---

### Milestone 10: Write Academic Module Tests

**Objective:** Test academic functionality.

**Tasks:**
- Unit tests for all endpoints
- Test timetable conflict detection
- Test promotion logic
- Test calendar recurrence
- Integration tests

**Deliverables:**
- Test suite
- Coverage report
- Documentation

**Acceptance Criteria:**
- All endpoints tested
- Coverage >80%
- Tests pass

---

## Phase 6: Attendance Management Module

**Estimated Duration:** 10 days
**Dependencies:** Phase 5
**Risk Level:** Medium

### Milestone 1: Design Attendance Data Models

**Objective:** Model attendance entities.

**Tasks:**
- Define Attendance, AttendanceRecord models
- Define LeaveRequest model
- Document relationships
- Create indexes for date queries

**Deliverables:**
- Attendance data model
- Model documentation

**Acceptance Criteria:**
- All entities modeled
- Relationships defined
- Indexes created

---

### Milestone 2: Create Attendance Marking API

**Objective:** API for daily attendance.

**Tasks:**
- Create `POST /api/attendance/mark` endpoint
- Create `POST /api/attendance/bulk` endpoint
- Create `GET /api/attendance` query endpoint
- Implement date range filtering
- Add status validation (present, absent, late, excused)

**Deliverables:**
- Attendance endpoints
- Validation logic
- API documentation

**Acceptance Criteria:**
- Attendance can be marked
- Bulk marking works
- Filtering functional

---

### Milestone 3: Implement Attendance Notifications

**Objective:** Notify parents of attendance.

**Tasks:**
- Design notification data model
- Create notification templates
- Integrate BulkSMSBD for SMS
- Integrate SendGrid for email
- Create notification preferences
- Implement scheduling

**Deliverables:**
- Notification templates
- SMS integration
- Email integration
- Preferences system

**Acceptance Criteria:**
- Notifications sent on mark
- SMS works
- Email works
- Preferences respected

---

### Milestone 4: Create Attendance Reports

**Objective:** Generate attendance reports.

**Tasks:**
- Monthly attendance report
- Term attendance report
- Student summary
- Class summary
- PDF generation
- Excel export

**Deliverables:**
- Report endpoints
- Report templates
- Export functionality

**Acceptance Criteria:**
- Reports generate correctly
- PDFs formatted
- Exports work

---

### Milestone 5: Implement Leave Requests

**Objective:** Manage student leave.

**Tasks:**
- Create leave request endpoints
- Create approval/rejection endpoints
- Track leave balance
- Configure leave types
- Auto-approve based on rules

**Deliverables:**
- Leave request endpoints
- Balance tracking
- Leave type configuration

**Acceptance Criteria:**
- Requests can be created
- Approval flow works
- Balance tracked

---

### Milestone 6: Create Attendance Analytics

**Objective:** Attendance dashboard.

**Tasks:**
- Design metrics
- Calculate attendance rates
- Trend analysis
- Comparison charts
- Create dashboard UI

**Deliverables:**
- Analytics calculations
- Dashboard UI
- Visualization

**Acceptance Criteria:**
- Metrics accurate
- Trends correct
- UI user-friendly

---

### Milestone 7: Biometric Integration Readiness

**Objective:** Prepare for biometric devices.

**Tasks:**
- Design biometric data model
- Create `POST /api/attendance/biometric` endpoint
- Implement validation
- Create device integration interface

**Deliverables:**
- Biometric data model
- Biometric endpoint
- Integration interface

**Acceptance Criteria:**
- Endpoint receives data
- Validation works
- Interface ready

---

### Milestone 8: Build Attendance UI

**Objective:** User interface for attendance.

**Tasks:**
- Attendance marking UI
- Attendance view UI
- Leave request UI
- Reports UI
- Analytics dashboard

**Deliverables:**
- Attendance UI components
- Documentation

**Acceptance Criteria:**
- UI user-friendly
- Responsive
- Accessible

---

### Milestone 9: Implement Attendance Export

**Objective:** Export attendance data.

**Tasks:**
- CSV export
- Excel export
- PDF export
- Create `GET /api/attendance/export` endpoint

**Deliverables:**
- Export endpoints
- Export formats

**Acceptance Criteria:**
- All exports work
- Data accurate

---

### Milestone 10: Write Attendance Tests

**Objective:** Test attendance module.

**Tasks:**
- Unit tests for all endpoints
- Test notifications
- Test leave requests
- Test reports
- Integration tests

**Deliverables:**
- Test suite
- Coverage report

**Acceptance Criteria:**
- Coverage >80%
- Tests pass

---

## Phase 7: Grading & Assessment Module

**Estimated Duration:** 10 days
**Dependencies:** Phase 5
**Risk Level:** Medium

### Milestone 1: Design Grading Data Models

**Objective:** Model grading entities.

**Tasks:**
- Define Exam, Assessment, Grade models
- Define Gradebook, GradeScale models
- Document relationships

**Deliverables:**
- Grading data models
- Documentation

---

### Milestone 2: Create Exam Management API

**Objective:** Manage exams.

**Tasks:**
- CRUD endpoints for exams
- Exam scheduling
- Exam type configuration (midterm, final, quiz)
- Max marks and weight settings

**Deliverables:**
- Exam endpoints
- Documentation

---

### Milestone 3: Implement Grade Entry

**Objective:** Enter and manage grades.

**Tasks:**
- Create grade entry endpoints
- Bulk grade upload
- Grade validation
- Auto-calculate totals
- Grade locking after approval

**Deliverables:**
- Grade entry endpoints
- Validation logic

---

### Milestone 4: Create Gradebook

**Objective:** Student gradebook view.

**Tasks:**
- Gradebook query endpoints
- Student view
- Parent view
- Teacher view
- Admin view
- Performance trends

**Deliverables:**
- Gradebook endpoints
- Multiple views

---

### Milestone 5: Generate Report Cards

**Objective:** Create student report cards.

**Tasks:**
- Report card template
- Generate PDF report cards
- Include grades, attendance, remarks
- Digital signature support
- Bulk generation

**Deliverables:**
- Report card generator
- PDF templates

---

### Milestone 6: Create Transcripts

**Objective:** Official student transcripts.

**Tasks:**
- Transcript template
- Academic record history
- GPA calculation
- PDF generation
- Official seal

**Deliverables:**
- Transcript generator
- Templates

---

### Milestone 7: Build Grading UI

**Objective:** User interface for grading.

**Tasks:**
- Grade entry UI
- Gradebook view UI
- Report card preview
- Bulk upload UI

**Deliverables:**
- Grading UI components

---

### Milestone 8: Implement Grade Analytics

**Objective:** Grading analytics dashboard.

**Tasks:**
- Class performance metrics
- Subject performance
- Student performance trends
- Grade distribution charts

**Deliverables:**
- Analytics calculations
- Dashboard UI

---

### Milestone 9: Create Grade Notifications

**Objective:** Notify of grade publication.

**Tasks:**
- Notify students when grades published
- Notify parents of low grades
- SMS and email notifications

**Deliverables:**
- Notification system
- Templates

---

### Milestone 10: Write Grading Tests

**Objective:** Test grading module.

**Tasks:**
- Unit tests for all endpoints
- Test GPA calculations
- Test report card generation
- Integration tests

**Deliverables:**
- Test suite
- Coverage report

---

## Phase 8: Fee Management Module

**Estimated Duration:** 10 days
**Dependencies:** Phase 4
**Risk Level:** High

### Milestone 1: Design Fee Data Models

**Objective:** Model fee entities.

**Tasks:**
- Define FeeStructure, FeePayment models
- Define PaymentTransaction model
- Define Installment, FeeWaiver models
- Document relationships

**Deliverables:**
- Fee data models
- Documentation

---

### Milestone 2: Create Fee Structure API

**Objective:** Manage fee structures.

**Tasks:**
- CRUD endpoints for fee structures
- Class-based fee assignment
- Fee categories (tuition, transport, hostel)
- Fee schedule configuration
- Discount rules

**Deliverables:**
- Fee structure endpoints
- Documentation

---

### Milestone 3: Generate Fee Invoices

**Objective:** Create student invoices.

**Tasks:**
- Generate monthly invoices
- Generate custom invoices
- Apply discounts
- Calculate late fees
- Send invoice notifications

**Deliverables:**
- Invoice generation
- Templates

---

### Milestone 4: Integrate Payment Gateways

**Objective:** Multiple payment options.

**Tasks:**
- Integrate bKash
- Integrate Nagad
- Integrate SSLCommerz
- Create payment endpoints
- Webhook handlers
- Payment verification

**Deliverables:**
- Payment gateway integrations
- Webhook handlers

---

### Milestone 5: Process Payment Callbacks

**Objective:** Handle payment responses.

**Tasks:**
- Verify payment signatures
- Update payment status
- Generate receipts
- Handle failed payments
- Retry logic

**Deliverables:**
- Payment processing
- Receipt generation

---

### Milestone 6: Create Payment Reports

**Objective:** Financial reporting.

**Tasks:**
- Daily collection report
- Outstanding dues report
- Payment history
- Class-wise collection
- PDF/Excel export

**Deliverables:**
- Report endpoints
- Templates

---

### Milestone 7: Build Fee Management UI

**Objective:** User interface for fees.

**Tasks:**
- Fee structure UI
- Invoice generation UI
- Payment UI
- Reports dashboard

**Deliverables:**
- Fee UI components

---

### Milestone 8: Implement Fee Reminders

**Objective:** Automated payment reminders.

**Tasks:**
- Schedule reminders
- SMS reminders
- Email reminders
- Overdue notifications

**Deliverables:**
- Reminder system
- Templates

---

### Milestone 9: Create Fee Receipts

**Objective:** Generate payment receipts.

**Tasks:**
- Receipt template
- PDF generation
- QR code on receipt
- Digital signature
- Send receipt via email/SMS

**Deliverables:**
- Receipt generator
- Templates

---

### Milestone 10: Write Fee Tests

**Objective:** Test fee module.

**Tasks:**
- Unit tests for all endpoints
- Test payment gateway integration
- Test invoice generation
- Integration tests

**Deliverables:**
- Test suite
- Coverage report

---

## Phase 9: Islamic Education Module

**Estimated Duration:** 14 days
**Dependencies:** Phase 4
**Risk Level:** Low

### Milestone 1: Design Islamic Education Models

**Objective:** Model Islamic education entities.

**Tasks:**
- Define QuranProgress, HifzRecord models
- Define PrayerLog, IslamicStudies models
- Document relationships

**Deliverables:**
- Islamic data models
- Documentation

---

### Milestone 2: Create Quran Tracking API

**Objective:** Track Quran memorization.

**Tasks:**
- CRUD endpoints for Quran progress
- Surah-wise tracking
- Ayat tracking
- Hifz level assessment
- Progress reports

**Deliverables:**
- Quran tracking endpoints
- Documentation

---

### Milestone 3: Integrate Quran.com API

**Objective:** Fetch Quran data.

**Tasks:**
- Integrate Quran.com API
- Fetch Surah list
- Fetch Ayat text
- Fetch translations (Bangla, English)
- Cache responses

**Deliverables:**
- Quran.com integration
- Caching layer

---

### Milestone 4: Create Prayer Time Tracking

**Objective:** Track prayer attendance.

**Tasks:**
- Integrate Aladhan API
- Fetch prayer times by location
- Mark prayer attendance
- Prayer streak tracking
- Monthly prayer reports

**Deliverables:**
- Prayer time endpoints
- Attendance tracking

---

### Milestone 5: Implement Hifz Management

**Objective:** Manage Hifz program.

**Tasks:**
- Hifz student enrollment
- Surah assignment
- Revision tracking
- Hifz tests
- Sabqi/Manzil tracking
- Hifz certificates

**Deliverables:**
- Hifz management endpoints
- Certificate templates

---

### Milestone 6: Create Islamic Studies Curriculum

**Objective:** Islamic studies content.

**Tasks:**
- Curriculum topics management
- Aqidah, Fiqh, Hadith, Seerah modules
- Lesson planning
- Assessment for Islamic studies
- Progress tracking

**Deliverables:**
- Curriculum endpoints
- Lesson management

---

### Milestone 7: Build Islamic Education UI

**Objective:** UI for Islamic module.

**Tasks:**
- Quran progress UI
- Hifz tracking UI
- Prayer attendance UI
- Islamic studies dashboard

**Deliverables:**
- Islamic UI components

---

### Milestone 8: Create Islamic Reports

**Objective:** Islamic education reports.

**Tasks:**
- Quran progress report
- Hifz status report
- Prayer attendance report
- Islamic studies grade report
- PDF generation

**Deliverables:**
- Report endpoints
- Templates

---

### Milestone 9: Implement Islamic Calendar

**Objective:** Islamic calendar integration.

**Tasks:**
- Display Hijri dates
- Important Islamic dates
- Ramadan tracking
- Eid holiday planning

**Deliverables:**
- Calendar integration
- Date display

---

### Milestone 10: Write Islamic Module Tests

**Objective:** Test Islamic module.

**Tasks:**
- Unit tests for all endpoints
- Test API integrations
- Test calculations
- Integration tests

**Deliverables:**
- Test suite
- Coverage report

---

## Phase 10: Communication Hub

**Estimated Duration:** 10 days
**Dependencies:** Phase 4
**Risk Level:** Medium

### Milestone 1: Design Communication Models

**Objective:** Model communication entities.

**Tasks:**
- Define Message, Notice models
- Define Notification, Announcement models
- Document relationships

**Deliverables:**
- Communication data models
- Documentation

---

### Milestone 2: Create Messaging System

**Objective:** Internal messaging.

**Tasks:**
- One-to-one messaging
- Group messaging
- Message threads
- Read receipts
- Message search
- Attachment support

**Deliverables:**
- Messaging endpoints
- WebSocket integration

---

### Milestone 3: Create Notice Board

**Objective:** School notice board.

**Tasks:**
- CRUD endpoints for notices
- Notice categories
- Target audience filtering
- Priority levels
- Expiry dates
- Public/private notices

**Deliverables:**
- Notice board endpoints
- Documentation

---

### Milestone 4: Implement Announcement System

**Objective:** School-wide announcements.

**Tasks:**
- Create announcement endpoints
- Push notifications
- Email blasts
- SMS broadcasts
- Audience targeting

**Deliverables:**
- Announcement endpoints
- Broadcast system

---

### Milestone 5: Create Notification Preferences

**Objective:** User notification settings.

**Tasks:**
- Notification preference model
- Preference management endpoints
- Channel selection (email, SMS, push)
- Frequency controls

**Deliverables:**
- Preference endpoints
- UI components

---

### Milestone 6: Build Communication UI

**Objective:** UI for communication.

**Tasks:**
- Message inbox UI
- Notice board UI
- Announcement composer
- Notification center

**Deliverables:**
- Communication UI components

---

### Milestone 7: Implement Email Templates

**Objective:** Email notification templates.

**Tasks:**
- Template design
- Dynamic content
- Multilingual support
- SendGrid integration

**Deliverables:**
- Email templates
- Template engine

---

### Milestone 8: Implement SMS Templates

**Objective:** SMS notification templates.

**Tasks:**
- SMS template design
- Character optimization
- BulkSMSBD integration
- Multilingual SMS

**Deliverables:**
- SMS templates
- Integration

---

### Milestone 9: Create Communication Reports

**Objective:** Communication analytics.

**Tasks:**
- Message statistics
- Delivery reports
- Read rates
- Engagement metrics

**Deliverables:**
- Analytics endpoints
- Dashboard

---

### Milestone 10: Write Communication Tests

**Objective:** Test communication module.

**Tasks:**
- Unit tests for all endpoints
- Test message delivery
- Test notifications
- Integration tests

**Deliverables:**
- Test suite
- Coverage report

---

## Phase 11: Library & Inventory Modules

**Estimated Duration:** 10 days
**Dependencies:** Phase 4
**Risk Level:** Low

### Milestone 1: Design Library Models

**Objective:** Model library entities.

**Tasks:**
- Define Book, BookIssue, BookReturn models
- Define Fine, Reservation models
- Document relationships

**Deliverables:**
- Library data models
- Documentation

---

### Milestone 2: Create Library Management API

**Objective:** Library operations.

**Tasks:**
- Book catalog CRUD
- Book issue/return
- Fine calculation
- Book reservation
- Catalog search
- Barcode/ISBN support

**Deliverables:**
- Library endpoints
- Documentation

---

### Milestone 3: Design Inventory Models

**Objective:** Model inventory entities.

**Tasks:**
- Define Asset, PurchaseRecord models
- Define Maintenance, Disposal models
- Document relationships

**Deliverables:**
- Inventory data models
- Documentation

---

### Milestone 4: Create Inventory Management API

**Objective:** Asset tracking.

**Tasks:**
- Asset registration
- Asset assignment
- Maintenance tracking
- Purchase records
- Asset disposal
- Depreciation calculation

**Deliverables:**
- Inventory endpoints
- Documentation

---

### Milestone 5: Build Library UI

**Objective:** Library interface.

**Tasks:**
- Book catalog UI
- Issue/return UI
- Fine payment UI
- Student library dashboard

**Deliverables:**
- Library UI components

---

### Milestone 6: Build Inventory UI

**Objective:** Inventory interface.

**Tasks:**
- Asset list UI
- Asset detail UI
- Maintenance UI
- Reports dashboard

**Deliverables:**
- Inventory UI components

---

### Milestone 7: Create Library Reports

**Objective:** Library analytics.

**Tasks:**
- Issue/return reports
- Overdue reports
- Fine collection reports
- Popular books report

**Deliverables:**
- Report endpoints
- Templates

---

### Milestone 8: Create Inventory Reports

**Objective:** Inventory analytics.

**Tasks:**
- Asset valuation
- Maintenance reports
- Purchase history
- Disposal reports

**Deliverables:**
- Report endpoints
- Templates

---

### Milestone 9: Implement Barcode Integration

**Objective:** Barcode scanning support.

**Tasks:**
- Barcode generation
- Barcode scanning UI
- Integration with hardware scanners

**Deliverables:**
- Barcode system
- Scanner integration

---

### Milestone 10: Write Library/Inventory Tests

**Objective:** Test modules.

**Tasks:**
- Unit tests for all endpoints
- Test fine calculations
- Test depreciation
- Integration tests

**Deliverables:**
- Test suite
- Coverage report

---

## Phase 12: Transport & Hostel Modules

**Estimated Duration:** 7 days
**Dependencies:** Phase 4
**Risk Level**: Low

### Milestone 1: Design Transport Models

**Objective:** Model transport entities.

**Tasks:**
- Define Route, Vehicle, TransportAllocation models
- Define Driver, FuelLog models
- Document relationships

**Deliverables:**
- Transport data models
- Documentation

---

### Milestone 2: Create Transport Management API

**Objective:** Transport operations.

**Tasks:**
- Route management
- Vehicle management
- Driver management
- Student allocation
- Route optimization
- Transport fees

**Deliverables:**
- Transport endpoints
- Documentation

---

### Milestone 3: Design Hostel Models

**Objective:** Model hostel entities.

**Tasks:**
- Define Room, RoomAllocation models
- Define HostelFee, VisitorLog models
- Document relationships

**Deliverables:**
- Hostel data models
- Documentation

---

### Milestone 4: Create Hostel Management API

**Objective:** Hostel operations.

**Tasks:**
- Room management
- Room allocation
- Visitor management
- Hostel fee management
- Room availability

**Deliverables:**
- Hostel endpoints
- Documentation

---

### Milestone 5: Build Transport UI

**Objective:** Transport interface.

**Tasks:**
- Route management UI
- Vehicle tracking UI
- Allocation UI
- Fee collection UI

**Deliverables:**
- Transport UI components

---

### Milestone 6: Build Hostel UI

**Objective:** Hostel interface.

**Tasks:**
- Room allocation UI
- Visitor log UI
- Fee management UI
- Dashboard

**Deliverables:**
- Hostel UI components

---

### Milestone 7: Create Transport Reports

**Objective:** Transport analytics.

**Tasks:**
- Route utilization
- Fuel consumption
- Fee collection
- Vehicle maintenance

**Deliverables:**
- Report endpoints
- Templates

---

### Milestone 8: Create Hostel Reports

**Objective:** Hostel analytics.

**Tasks:**
- Occupancy reports
- Fee collection
- Visitor logs
- Maintenance reports

**Deliverables:**
- Report endpoints
- Templates

---

### Milestone 9: Implement GPS Tracking (Optional)

**Objective:** Vehicle tracking.

**Tasks:**
- GPS integration endpoints
- Real-time tracking
- Route deviation alerts
- Parent notifications

**Deliverables:**
- GPS integration
- Tracking UI

---

### Milestone 10: Write Transport/Hostel Tests

**Objective:** Test modules.

**Tasks:**
- Unit tests for all endpoints
- Test allocations
- Test fee calculations
- Integration tests

**Deliverables:**
- Test suite
- Coverage report

---

## Phase 13: External Integrations

**Estimated Duration:** 14 days
**Dependencies:** Phase 3, Phase 4
**Risk Level:** High

### Milestone 1: Gibbon SIS Integration

**Objective:** Integrate with Gibbon.

**Tasks:**
- Design integration architecture
- Create Gibbon service module
- Implement data sync (students, classes)
- Sync attendance to Gibbon
- Sync grades to Gibbon
- Error handling and retry logic

**Deliverables:**
- Gibbon integration module
- Sync jobs
- Documentation

---

### Milestone 2: Moodle LMS Integration

**Objective:** Integrate with Moodle.

**Tasks:**
- Design integration architecture
- Create Moodle service module
- User synchronization
- Course enrollment sync
- Grade sync from Moodle
- SSO integration

**Deliverables:**
- Moodle integration module
- Sync jobs
- Documentation

---

### Milestone 3: bKash Payment Integration

**Objective:** Integrate bKash payments.

**Tasks:**
- bKash merchant API setup
- Create payment endpoints
- Webhook handler
- Payment verification
- Refund support
- Sandbox and production configs

**Deliverables:**
- bKash integration
- Documentation

---

### Milestone 4: Nagad Payment Integration

**Objective:** Integrate Nagad payments.

**Tasks:**
- Nagad merchant API setup
- Create payment endpoints
- Webhook handler
- Payment verification
- Refund support

**Deliverables:**
- Nagad integration
- Documentation

---

### Milestone 5: SSLCommerz Integration

**Objective:** Integrate SSLCommerz.

**Tasks:**
- SSLCommerz API setup
- Create payment endpoints
- IPN handler
- Success/failure pages
- Payment verification

**Deliverables:**
- SSLCommerz integration
- Documentation

---

### Milestone 6: BulkSMSBD Integration

**Objective:** SMS notifications.

**Tasks:**
- BulkSMSBD API setup
- Create SMS service
- Template management
- Bulk sending
- Delivery tracking
- Balance monitoring

**Deliverables:**
- SMS service
- Templates
- Documentation

---

### Milestone 7: SendGrid Integration

**Objective:** Email notifications.

**Tasks:**
- SendGrid API setup
- Create email service
- Template management
- Bulk sending
- Delivery tracking
- Webhook for bounces

**Deliverables:**
- Email service
- Templates
- Documentation

---

### Milestone 8: Cloudflare CDN Integration

**Objective:** CDN and caching.

**Tasks:**
- Cloudflare account setup
- Configure CDN for static assets
- Set up caching rules
- Configure SSL/TLS
- DNS configuration
- DDoS protection

**Deliverables:**
- CDN configuration
- Security setup
- Documentation

---

### Milestone 9: Create Integration Dashboard

**Objective:** Monitor integrations.

**Tasks:**
- Integration status dashboard
- Sync job monitoring
- API call metrics
- Error logs
- Health checks

**Deliverables:**
- Monitoring dashboard
- Alerts

---

### Milestone 10: Write Integration Tests

**Objective:** Test integrations.

**Tasks:**
- Mock external APIs
- Test sync jobs
- Test payment flows
- Test notification delivery
- Error handling tests

**Deliverables:**
- Integration test suite
- Coverage report

---

## Phase 14: Frontend Development - Web Portals

**Estimated Duration:** 21 days
**Dependencies:** Phase 1-13
**Risk Level:** High

### Milestone 1: Set Up Next.js 15 Web App

**Objective:** Initialize web portal.

**Tasks:**
- Create Next.js 15 app in `apps/web/`
- Configure App Router
- Set up TypeScript
- Configure Tailwind CSS 4
- Set up Radix UI
- Configure i18n (en, bn, ar)

**Deliverables:**
- Next.js web app
- Configuration files

---

### Milestone 2: Create Shared UI Package

**Objective:** Build reusable components.

**Tasks:**
- Create `packages/ui` package
- Set up component library
- Create base components (Button, Input, Card, etc.)
- Create layout components
- Document components with Storybook

**Deliverables:**
- UI component library
- Storybook setup

---

### Milestone 3: Build Public Portal

**Objective:** Public-facing website.

**Tasks:**
- Homepage with hero section
- About page
- Admissions page
- Contact page
- News/Events listing
- Footer with links
- Mobile responsive

**Deliverables:**
- Public portal pages
- Responsive design

---

### Milestone 4: Build Student Portal

**Objective:** Student dashboard and features.

**Tasks:**
- Student dashboard
- Profile management
- Class schedule view
- Attendance view
- Grades view
- Fee payment
- Assignment submissions
- Islamic progress

**Deliverables:**
- Student portal pages
- Student dashboard

---

### Milestone 5: Build Parent Portal

**Objective:** Parent dashboard and features.

**Tasks:**
- Parent dashboard
- Child(ren) overview
- Attendance monitoring
- Grade reports
- Fee payment
- Communication center
- Leave requests

**Deliverables:**
- Parent portal pages
- Parent dashboard

---

### Milestone 6: Build Teacher Portal

**Objective:** Teacher dashboard and features.

**Tasks:**
- Teacher dashboard
- Class management
- Attendance marking
- Grade entry
- Assignment management
- Timetable view
- Student information

**Deliverables:**
- Teacher portal pages
- Teacher dashboard

---

### Milestone 7: Build Admin Dashboard

**Objective:** Admin interface with Vite.

**Tasks:**
- Create Vite + React app in `apps/admin/`
- Admin dashboard layout
- Sidebar navigation
- User management UI
- Academic management UI
- Fee management UI
- Reports center
- Settings pages

**Deliverables:**
- Admin dashboard
- Management UIs

---

### Milestone 8: Implement Authentication UI

**Objective:** Login and registration pages.

**Tasks:**
- Login page
- Registration page
- Password reset flow
- Email verification page
- MFA setup page
- Protected route wrapper
- Auth state management

**Deliverables:**
- Auth pages
- Auth components

---

### Milestone 9: Implement State Management

**Objective:** Global state with Zustand/Jotai.

**Tasks:**
- Set up state management
- Auth store
- UI store (theme, sidebar)
- Data caching strategy
- API integration layer
- Error boundaries

**Deliverables:**
- State management setup
- API integration layer

---

### Milestone 10: Optimize and Test Frontend

**Objective:** Performance and testing.

**Tasks:**
- Code splitting
- Image optimization
- Lazy loading
- Bundle analysis
- Playwright E2E tests
- Accessibility audit (axe-core)
- Performance audit (Lighthouse)

**Deliverables:**
- Optimized build
- Test suite
- Audit reports

---

## Phase 15: Mobile Apps & Production Deployment

**Estimated Duration:** 16 days
**Dependencies:** Phase 14
**Risk Level:** High

### Milestone 1: Set Up React Native Project

**Objective:** Initialize mobile app.

**Tasks:**
- Create Expo project in `apps/mobile/`
- Configure TypeScript
- Set up navigation (React Navigation)
- Configure state management
- Set up API integration
- Configure environment variables

**Deliverables:**
- React Native project
- Base configuration

---

### Milestone 2: Build Mobile Auth Flow

**Objective:** Mobile authentication.

**Tasks:**
- Login screen
- Registration screen
- OTP verification
- Biometric auth support
- Secure storage
- Auto-login

**Deliverables:**
- Auth screens
- Auth logic

---

### Milestone 3: Build Student Mobile App

**Objective:** Student features on mobile.

**Tasks:**
- Student dashboard
- Class schedule
- Attendance view
- Grades view
- Fee payment
- Notifications
- QR code for ID

**Deliverables:**
- Student mobile screens
- Features implemented

---

### Milestone 4: Build Parent Mobile App

**Objective:** Parent features on mobile.

**Tasks:**
- Parent dashboard
- Children overview
- Attendance alerts
- Grade notifications
- Fee payment
- Communication
- Leave requests

**Deliverables:**
- Parent mobile screens
- Features implemented

---

### Milestone 5: Set Up Production Infrastructure

**Objective:** Configure servers.

**Tasks:**
- Provision VPS/server
- Configure nginx reverse proxy
- Set up SSL certificates
- Configure firewall
- Set up monitoring
- Configure backups

**Deliverables:**
- Production infrastructure
- Security configuration

---

### Milestone 6: Configure Docker Production

**Objective:** Production containers.

**Tasks:**
- Create production Dockerfiles
- Create docker-compose.prod.yml
- Configure blue-green deployment
- Set up volume mounts
- Configure resource limits
- Health checks

**Deliverables:**
- Production Docker setup
- Blue-green configuration

---

### Milestone 7: Set Up CI/CD Pipeline

**Objective:** Automated deployment.

**Tasks:**
- Configure GitHub Actions
- Set up build pipeline
- Configure deployment workflow
- Set up blue-green switch
- Configure rollback
- Set up notifications

**Deliverables:**
- CI/CD pipeline
- Deployment automation

---

### Milestone 8: Configure Monitoring

**Objective:** Production monitoring.

**Tasks:**
- Set up Prometheus metrics
- Configure Grafana dashboards
- Set up Loki for logs
- Configure Sentry for errors
- Set up uptime monitoring
- Configure alerts

**Deliverables:**
- Monitoring setup
- Dashboards
- Alerts

---

### Milestone 9: Deploy to Production

**Objective:** Go live.

**Tasks:**
- Run database migrations
- Deploy blue stack
- Health check verification
- Switch traffic (blue-green)
- Run smoke tests
- DNS configuration
- SSL verification

**Deliverables:**
- Production deployment
- Verification results

---

### Milestone 10: Final Handover

**Objective:** Project completion.

**Tasks:**
- Complete documentation
- Create user guides
- Create admin guides
- Create troubleshooting guide
- Train administrators
- Create maintenance schedule
- Project sign-off

**Deliverables:**
- Complete documentation
- User guides
- Admin guides
- Maintenance runbook
- Project sign-off

---

## Appendix A: Phase Dependencies

```
Phase 1 (Foundation)
    ↓
Phase 2 (Database)
    ↓
Phase 3 (Auth) → Phase 4 (Users)
                    ↓
    ┌───────────────┼───────────────┐
    ↓               ↓               ↓
Phase 5          Phase 6          Phase 8
(Academic)     (Attendance)     (Fees)
    ↓               ↓               ↓
Phase 7         Phase 10 ←───────┘
(Grading)    (Communication)
    ↓
Phase 9 (Islamic) ─────→ Phase 11 (Library/Inventory)
                              ↓
                         Phase 12 (Transport/Hostel)
                              ↓
                         Phase 13 (Integrations)
                              ↓
                         Phase 14 (Frontend)
                              ↓
                         Phase 15 (Mobile + Deploy)
```

---

## Appendix B: Risk Matrix

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Database corruption | Critical | Low | Regular backups, testing restores |
| Payment gateway downtime | High | Medium | Multiple gateways, retry logic |
| Security breach | Critical | Low | Regular audits, MFA, penetration testing |
| Third-party API changes | Medium | High | Version locking, fallback handling |
| Scope creep | High | Medium | Clear requirements, change control |
| Performance issues | High | Medium | Load testing, monitoring, optimization |
| Developer burnout | High | Medium | Realistic timeline, breaks |
| Data loss | Critical | Low | Backups, replication |
| Integration failures | High | Medium | Thorough testing, mock APIs |
| Mobile app rejection | Medium | Low | Follow store guidelines, testing |

---

## Appendix C: Documentation References

### Existing Documentation

| Document | Location | Purpose |
|----------|----------|---------|
| Functional Requirements | `docs/project_document/REQ_Functional_Requirements_v1.0.md` | Feature requirements |
| Technology Stack | `docs/project_document/ARCH_Technology_Stack_v1.0.md` | Tech specifications |
| System Architecture | `docs/project_document/ARCH_System_Architecture_v1.0.md` | Architecture design |
| Database Schema | `docs/project_document/DB_Schema_Documentation_v1.0.md` | Database design |
| API Specification | `docs/project_document/API_Specification_v1.0.md` | API documentation |
| Design System | `docs/project_document/UX_Design_System_v1.0.md` | UI/UX guidelines |
| Environment Setup | `docs/project_document/DEV_Environment_Setup_v1.0.md` | Dev environment |
| Deployment Runbook | `docs/project_document/Deployment/DEPLOY_Runbook_v1.0.md` | Deployment procedures |
| Infrastructure Config | `docs/project_document/Deployment/DEPLOY_Infrastructure_Configuration_v1.0.md` | Infrastructure |

### To Be Created Documentation

| Document | Location | Purpose |
|----------|----------|---------|
| User Guide | `docs/user_guide/` | End-user documentation |
| Admin Guide | `docs/admin_guide/` | Administrator documentation |
| API Documentation | `docs/api/` | Interactive API docs |
| Component Storybook | `apps/web/storybook/` | Component showcase |
| Troubleshooting Guide | `docs/troubleshooting/` | Common issues and solutions |
| Maintenance Guide | `docs/maintenance/` | Ongoing maintenance procedures |

---

**End of Master Implementation Roadmap v1.2**

*This unified roadmap consolidates v1.0 and v1.1 with deployment best practices, providing a comprehensive guide for implementing the Smart Academy Digital Portal from foundation to production deployment.*
