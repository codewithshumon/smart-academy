# Smart Academy Digital Portal - Backend Technical Specification

**Document Title:** Backend Technical Specification
**Document ID:** TECH_Backend_Specification_v1.0
**Version:** 1.0
**Date:** January 10, 2026
**Project Name:** Smart Academy Digital Web Portal Development
**Prepared By:** Solo Full-Stack Developer

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | January 10, 2026 | Development Team | Initial Backend Technical Specification |

**Reference Documents:**
- Smart Academy Technology Stack v1.0
- Smart Academy SRS v1.0
- Smart Academy Coding Standards v1.0
- Smart Academy Architecture Document v1.0

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Project Structure](#2-project-structure)
3. [API Architecture](#3-api-architecture)
4. [Authentication and Authorization Strategy](#4-authentication-and-authorization-strategy)
5. [Middleware Architecture](#5-middleware-architecture)
6. [Service Layer Design](#6-service-layer-design)
7. [Error Handling and Logging](#7-error-handling-and-logging)
8. [Background Job Processing](#8-background-job-processing)
9. [File Upload and Storage Strategy](#9-file-upload-and-storage-strategy)
10. [Caching Strategy](#10-caching-strategy)
11. [Database Design](#11-database-design)
12. [External Integrations](#12-external-integrations)
13. [Testing Strategy](#13-testing-strategy)
14. [Deployment and DevOps](#14-deployment-and-devops)

---

## 1. Introduction

### 1.1 Purpose

This document provides comprehensive technical specifications for the backend architecture of the Smart Academy Digital Portal. It establishes patterns, conventions, and best practices for building scalable, secure, and maintainable backend services.

### 1.2 Scope

This specification covers:
- **Custom API Services**: Node.js 22 LTS with Fastify 5
- **Database Layer**: PostgreSQL 16 + MySQL 8 (for Gibbon/Moodle)
- **Caching Layer**: Redis 7
- **Background Processing**: BullMQ
- **Integration Services**: Payment gateways, SMS, Email

### 1.3 Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 22 LTS | Runtime environment |
| Fastify | 5.x | Web framework |
| TypeScript | 5.x | Programming language |
| Prisma | 6.x | ORM for PostgreSQL |
| PostgreSQL | 16+ | Primary database |
| MySQL | 8.0+ | Gibbon/Moodle database |
| Redis | 7+ | Cache, sessions, queues |
| BullMQ | 5.x | Job queue |
| Zod | 3.x | Schema validation |
| Winston | 3.x | Logging |
| Jest/Vitest | Latest | Testing |

### 1.4 Architecture Principles

1. **Modular Design**: Feature-based module organization
2. **Dependency Injection**: Loose coupling between components
3. **Repository Pattern**: Abstract data access layer
4. **CQRS Light**: Separate read and write models where beneficial
5. **Event-Driven**: Use events for cross-module communication
6. **Security First**: Defense in depth approach
7. **Observability**: Comprehensive logging and monitoring

---

## 2. Project Structure

### 2.1 Directory Structure

```
smart-academy-api/
├── src/
│   ├── app.ts                          # Application setup
│   ├── server.ts                       # Server entry point
│   │
│   ├── config/                         # Configuration
│   │   ├── index.ts                    # Config loader
│   │   ├── app.config.ts               # App configuration
│   │   ├── database.config.ts          # Database configuration
│   │   ├── auth.config.ts              # Auth configuration
│   │   ├── cache.config.ts             # Cache configuration
│   │   ├── queue.config.ts             # Queue configuration
│   │   └── external.config.ts          # External services config
│   │
│   ├── modules/                        # Feature modules
│   │   ├── auth/                       # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.schema.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── local.strategy.ts
│   │   │   └── dto/
│   │   │       ├── login.dto.ts
│   │   │       └── register.dto.ts
│   │   │
│   │   ├── users/                      # User management
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.repository.ts
│   │   │   ├── users.routes.ts
│   │   │   ├── users.schema.ts
│   │   │   └── dto/
│   │   │
│   │   ├── students/                   # Student management
│   │   │   ├── students.controller.ts
│   │   │   ├── students.service.ts
│   │   │   ├── students.repository.ts
│   │   │   ├── students.routes.ts
│   │   │   ├── students.schema.ts
│   │   │   ├── students.events.ts
│   │   │   └── dto/
│   │   │       ├── create-student.dto.ts
│   │   │       ├── update-student.dto.ts
│   │   │       └── student-query.dto.ts
│   │   │
│   │   ├── attendance/                 # Attendance management
│   │   │   ├── attendance.controller.ts
│   │   │   ├── attendance.service.ts
│   │   │   ├── attendance.repository.ts
│   │   │   ├── attendance.routes.ts
│   │   │   └── dto/
│   │   │
│   │   ├── grades/                     # Grade management
│   │   │   ├── grades.controller.ts
│   │   │   ├── grades.service.ts
│   │   │   ├── grades.repository.ts
│   │   │   ├── grades.routes.ts
│   │   │   └── dto/
│   │   │
│   │   ├── islamic/                    # Islamic education module
│   │   │   ├── quran/
│   │   │   │   ├── quran.controller.ts
│   │   │   │   ├── quran.service.ts
│   │   │   │   ├── quran.repository.ts
│   │   │   │   └── dto/
│   │   │   ├── prayer-times/
│   │   │   │   ├── prayer-times.controller.ts
│   │   │   │   ├── prayer-times.service.ts
│   │   │   │   └── dto/
│   │   │   ├── hijri-calendar/
│   │   │   │   ├── hijri-calendar.controller.ts
│   │   │   │   └── hijri-calendar.service.ts
│   │   │   ├── islamic.routes.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── fees/                       # Fee management
│   │   │   ├── fees.controller.ts
│   │   │   ├── fees.service.ts
│   │   │   ├── fees.repository.ts
│   │   │   ├── fees.routes.ts
│   │   │   └── dto/
│   │   │
│   │   ├── payments/                   # Payment processing
│   │   │   ├── payments.controller.ts
│   │   │   ├── payments.service.ts
│   │   │   ├── payments.routes.ts
│   │   │   ├── gateways/
│   │   │   │   ├── bkash.gateway.ts
│   │   │   │   ├── nagad.gateway.ts
│   │   │   │   └── sslcommerz.gateway.ts
│   │   │   └── dto/
│   │   │
│   │   ├── notifications/              # Notification service
│   │   │   ├── notifications.controller.ts
│   │   │   ├── notifications.service.ts
│   │   │   ├── notifications.routes.ts
│   │   │   ├── channels/
│   │   │   │   ├── sms.channel.ts
│   │   │   │   ├── email.channel.ts
│   │   │   │   └── push.channel.ts
│   │   │   └── templates/
│   │   │
│   │   ├── reports/                    # Report generation
│   │   │   ├── reports.controller.ts
│   │   │   ├── reports.service.ts
│   │   │   ├── reports.routes.ts
│   │   │   └── generators/
│   │   │
│   │   └── files/                      # File management
│   │       ├── files.controller.ts
│   │       ├── files.service.ts
│   │       ├── files.routes.ts
│   │       └── storage/
│   │           ├── local.storage.ts
│   │           └── s3.storage.ts
│   │
│   ├── common/                         # Shared utilities
│   │   ├── decorators/
│   │   │   ├── auth.decorator.ts
│   │   │   ├── roles.decorator.ts
│   │   │   └── validate.decorator.ts
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   └── throttle.guard.ts
│   │   ├── interceptors/
│   │   │   ├── logging.interceptor.ts
│   │   │   ├── transform.interceptor.ts
│   │   │   └── timeout.interceptor.ts
│   │   ├── filters/
│   │   │   ├── http-exception.filter.ts
│   │   │   └── validation.filter.ts
│   │   ├── pipes/
│   │   │   ├── validation.pipe.ts
│   │   │   └── parse-uuid.pipe.ts
│   │   └── types/
│   │       ├── request.types.ts
│   │       ├── response.types.ts
│   │       └── pagination.types.ts
│   │
│   ├── database/                       # Database layer
│   │   ├── prisma/
│   │   │   ├── schema.prisma           # Prisma schema
│   │   │   ├── migrations/             # Migration files
│   │   │   └── seed.ts                 # Seed data
│   │   ├── repositories/
│   │   │   └── base.repository.ts
│   │   └── index.ts
│   │
│   ├── plugins/                        # Fastify plugins
│   │   ├── auth.plugin.ts
│   │   ├── cors.plugin.ts
│   │   ├── helmet.plugin.ts
│   │   ├── rate-limit.plugin.ts
│   │   ├── swagger.plugin.ts
│   │   ├── prisma.plugin.ts
│   │   └── redis.plugin.ts
│   │
│   ├── lib/                            # Utility libraries
│   │   ├── logger.ts                   # Winston logger
│   │   ├── cache.ts                    # Cache utilities
│   │   ├── queue.ts                    # Queue utilities
│   │   ├── crypto.ts                   # Encryption utilities
│   │   ├── date.ts                     # Date utilities
│   │   ├── validators.ts               # Common validators
│   │   └── constants.ts                # App constants
│   │
│   ├── jobs/                           # Background jobs
│   │   ├── processors/
│   │   │   ├── email.processor.ts
│   │   │   ├── sms.processor.ts
│   │   │   ├── report.processor.ts
│   │   │   └── cleanup.processor.ts
│   │   ├── schedulers/
│   │   │   ├── attendance-reminder.ts
│   │   │   ├── fee-reminder.ts
│   │   │   └── backup.scheduler.ts
│   │   └── index.ts
│   │
│   ├── events/                         # Event system
│   │   ├── event-emitter.ts
│   │   ├── handlers/
│   │   │   ├── student.handler.ts
│   │   │   ├── attendance.handler.ts
│   │   │   └── payment.handler.ts
│   │   └── index.ts
│   │
│   └── types/                          # TypeScript types
│       ├── index.ts
│       ├── fastify.d.ts                # Fastify type extensions
│       ├── env.d.ts                    # Environment types
│       └── global.d.ts                 # Global types
│
├── tests/                              # Test files
│   ├── unit/
│   │   ├── services/
│   │   └── utils/
│   ├── integration/
│   │   ├── api/
│   │   └── database/
│   ├── e2e/
│   ├── fixtures/
│   └── setup.ts
│
├── scripts/                            # Utility scripts
│   ├── migrate.ts
│   ├── seed.ts
│   └── generate-types.ts
│
├── docker/                             # Docker configuration
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   └── docker-compose.yml
│
├── .env.example                        # Environment template
├── .env.local                          # Local environment
├── tsconfig.json                       # TypeScript config
├── eslint.config.mjs                   # ESLint config
├── vitest.config.ts                    # Test config
└── package.json
```

### 2.2 Module Structure Pattern

Each module follows a consistent structure:

```
module-name/
├── module-name.controller.ts     # HTTP handlers
├── module-name.service.ts        # Business logic
├── module-name.repository.ts     # Data access (optional)
├── module-name.routes.ts         # Route definitions
├── module-name.schema.ts         # Zod validation schemas
├── module-name.events.ts         # Event definitions (optional)
├── dto/                          # Data transfer objects
│   ├── create-*.dto.ts
│   ├── update-*.dto.ts
│   └── *-query.dto.ts
└── index.ts                      # Module exports
```

---

## 3. API Architecture

### 3.1 RESTful API Design

#### 3.1.1 URL Structure

```
Base URL: https://api.mysmart.academy/v1

Resources:
├── /auth                           # Authentication
│   ├── POST   /login
│   ├── POST   /register
│   ├── POST   /logout
│   ├── POST   /refresh
│   └── POST   /forgot-password
│
├── /users                          # User management
│   ├── GET    /                    # List users
│   ├── POST   /                    # Create user
│   ├── GET    /:id                 # Get user
│   ├── PUT    /:id                 # Update user
│   ├── DELETE /:id                 # Delete user
│   └── GET    /me                  # Current user
│
├── /students                       # Student management
│   ├── GET    /                    # List students
│   ├── POST   /                    # Create student
│   ├── GET    /:id                 # Get student
│   ├── PUT    /:id                 # Update student
│   ├── DELETE /:id                 # Delete student
│   ├── GET    /:id/attendance      # Student attendance
│   ├── GET    /:id/grades          # Student grades
│   └── GET    /:id/quran-progress  # Quran progress
│
├── /attendance                     # Attendance management
│   ├── GET    /                    # List attendance
│   ├── POST   /                    # Mark attendance
│   ├── GET    /class/:classId      # Class attendance
│   └── PUT    /:id                 # Update attendance
│
├── /islamic                        # Islamic module
│   ├── /quran
│   │   ├── GET    /progress/:studentId
│   │   ├── POST   /progress
│   │   └── PUT    /progress/:id
│   ├── /prayer-times
│   │   └── GET    /                # Get prayer times
│   └── /calendar
│       ├── GET    /events          # Islamic events
│       └── GET    /hijri           # Hijri date
│
├── /fees                           # Fee management
│   ├── GET    /structure           # Fee structure
│   ├── GET    /student/:id         # Student fees
│   └── POST   /invoice             # Generate invoice
│
├── /payments                       # Payment processing
│   ├── POST   /initiate            # Initiate payment
│   ├── POST   /bkash/callback      # bKash callback
│   ├── POST   /nagad/callback      # Nagad callback
│   ├── GET    /history/:studentId  # Payment history
│   └── GET    /receipt/:id         # Get receipt
│
├── /notifications                  # Notifications
│   ├── GET    /                    # List notifications
│   ├── POST   /send                # Send notification
│   └── PUT    /:id/read            # Mark as read
│
├── /reports                        # Reports
│   ├── GET    /attendance          # Attendance report
│   ├── GET    /grades              # Grades report
│   ├── GET    /fees                # Fee report
│   └── POST   /generate            # Generate custom report
│
└── /files                          # File management
    ├── POST   /upload              # Upload file
    ├── GET    /:id                 # Get file
    └── DELETE /:id                 # Delete file
```

#### 3.1.2 HTTP Methods

| Method | Usage | Example |
|--------|-------|---------|
| GET | Retrieve resources | `GET /students` |
| POST | Create resources | `POST /students` |
| PUT | Full update | `PUT /students/:id` |
| PATCH | Partial update | `PATCH /students/:id` |
| DELETE | Remove resources | `DELETE /students/:id` |

#### 3.1.3 Response Format

```typescript
// Success Response
interface SuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

// Error Response
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
    stack?: string; // Only in development
  };
}

// Example Success Response
{
  "success": true,
  "data": {
    "id": "student-uuid",
    "firstName": "Ahmed",
    "lastName": "Khan",
    "email": "ahmed@example.com"
  }
}

// Example Paginated Response
{
  "success": true,
  "data": [
    { "id": "1", "name": "Ahmed" },
    { "id": "2", "name": "Fatima" }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}

// Example Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "email": ["Invalid email format"],
      "phone": ["Phone number is required"]
    }
  }
}
```

### 3.2 API Versioning

```typescript
// Use URL path versioning
// v1: /api/v1/students
// v2: /api/v2/students

// routes/index.ts
import { FastifyInstance } from 'fastify';
import v1Routes from './v1';
import v2Routes from './v2';

export async function registerRoutes(app: FastifyInstance) {
  // Register v1 routes
  app.register(v1Routes, { prefix: '/api/v1' });

  // Register v2 routes (when needed)
  app.register(v2Routes, { prefix: '/api/v2' });
}
```

### 3.3 OpenAPI/Swagger Documentation

```typescript
// plugins/swagger.plugin.ts
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';

export async function swaggerPlugin(app: FastifyInstance) {
  await app.register(fastifySwagger, {
    openapi: {
      openapi: '3.1.0',
      info: {
        title: 'Smart Academy API',
        description: 'API documentation for Smart Academy Digital Portal',
        version: '1.0.0',
        contact: {
          name: 'Smart Academy Support',
          email: 'support@mysmart.academy',
        },
      },
      servers: [
        {
          url: process.env.API_URL || 'http://localhost:3000',
          description: process.env.NODE_ENV === 'production'
            ? 'Production server'
            : 'Development server',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ bearerAuth: [] }],
      tags: [
        { name: 'Auth', description: 'Authentication endpoints' },
        { name: 'Students', description: 'Student management' },
        { name: 'Attendance', description: 'Attendance tracking' },
        { name: 'Islamic', description: 'Islamic education module' },
        { name: 'Fees', description: 'Fee management' },
        { name: 'Payments', description: 'Payment processing' },
      ],
    },
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
  });
}
```

---

## 4. Authentication and Authorization Strategy

### 4.1 Authentication Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION FLOW                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐       │
│  │  Client │────▶│  Login  │────▶│ Verify  │────▶│ Generate│       │
│  │         │     │ Request │     │ Creds   │     │  Tokens │       │
│  └─────────┘     └─────────┘     └─────────┘     └────┬────┘       │
│                                                        │            │
│                                                        ▼            │
│  ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐       │
│  │  Store  │◀────│ Return  │◀────│ Access  │◀────│ Refresh │       │
│  │ Tokens  │     │ Tokens  │     │  Token  │     │  Token  │       │
│  └─────────┘     └─────────┘     └─────────┘     └─────────┘       │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │                    TOKEN REFRESH FLOW                           ││
│  │                                                                  ││
│  │  Access Token Expired ──▶ Use Refresh Token ──▶ New Access Token││
│  │                                                                  ││
│  │  Refresh Token Expired ──▶ Re-authenticate                      ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.2 JWT Configuration

```typescript
// config/auth.config.ts
export const authConfig = {
  jwt: {
    accessToken: {
      secret: process.env.JWT_ACCESS_SECRET!,
      expiresIn: '15m',
    },
    refreshToken: {
      secret: process.env.JWT_REFRESH_SECRET!,
      expiresIn: '7d',
    },
  },
  bcrypt: {
    saltRounds: 12,
  },
  session: {
    maxConcurrent: 5,
  },
  lockout: {
    maxAttempts: 5,
    duration: 15 * 60 * 1000, // 15 minutes
  },
};
```

### 4.3 Authentication Service

```typescript
// modules/auth/auth.service.ts
import { FastifyRequest } from 'fastify';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '@/database';
import { authConfig } from '@/config/auth.config';
import { redis } from '@/lib/cache';
import { UnauthorizedError, ValidationError } from '@/common/errors';
import type { User, TokenPayload, AuthTokens } from '@/types';

export class AuthService {
  async login(email: string, password: string): Promise<AuthTokens> {
    // Check lockout
    const lockoutKey = `lockout:${email}`;
    const attempts = await redis.get(lockoutKey);

    if (attempts && parseInt(attempts) >= authConfig.lockout.maxAttempts) {
      throw new UnauthorizedError(
        'Account temporarily locked. Please try again later.'
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: { roles: true },
    });

    if (!user || !user.isActive) {
      await this.incrementLoginAttempts(email);
      throw new UnauthorizedError('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      await this.incrementLoginAttempts(email);
      throw new UnauthorizedError('Invalid credentials');
    }

    // Clear lockout on successful login
    await redis.del(lockoutKey);

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // Store refresh token
    await this.storeRefreshToken(user.id, tokens.refreshToken);

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return tokens;
  }

  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    try {
      // Verify refresh token
      const payload = jwt.verify(
        refreshToken,
        authConfig.jwt.refreshToken.secret
      ) as TokenPayload;

      // Check if refresh token is stored (not revoked)
      const storedToken = await redis.get(`refresh:${payload.sub}`);

      if (!storedToken || storedToken !== refreshToken) {
        throw new UnauthorizedError('Invalid refresh token');
      }

      // Get user
      const user = await prisma.user.findUnique({
        where: { id: payload.sub },
        include: { roles: true },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedError('User not found or inactive');
      }

      // Rotate refresh token
      await redis.del(`refresh:${payload.sub}`);

      // Generate new tokens
      const tokens = await this.generateTokens(user);

      // Store new refresh token
      await this.storeRefreshToken(user.id, tokens.refreshToken);

      return tokens;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedError('Refresh token expired');
      }
      throw error;
    }
  }

  async logout(userId: string): Promise<void> {
    await redis.del(`refresh:${userId}`);
  }

  async validateAccessToken(token: string): Promise<TokenPayload> {
    try {
      const payload = jwt.verify(
        token,
        authConfig.jwt.accessToken.secret
      ) as TokenPayload;

      // Check if token is blacklisted
      const isBlacklisted = await redis.get(`blacklist:${token}`);
      if (isBlacklisted) {
        throw new UnauthorizedError('Token has been revoked');
      }

      return payload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedError('Access token expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedError('Invalid access token');
      }
      throw error;
    }
  }

  private async generateTokens(user: User): Promise<AuthTokens> {
    const payload: Omit<TokenPayload, 'exp' | 'iat'> = {
      sub: user.id,
      email: user.email,
      roles: user.roles.map((r) => r.name),
    };

    const accessToken = jwt.sign(
      payload,
      authConfig.jwt.accessToken.secret,
      { expiresIn: authConfig.jwt.accessToken.expiresIn }
    );

    const refreshToken = jwt.sign(
      { sub: user.id },
      authConfig.jwt.refreshToken.secret,
      { expiresIn: authConfig.jwt.refreshToken.expiresIn }
    );

    return { accessToken, refreshToken };
  }

  private async storeRefreshToken(
    userId: string,
    token: string
  ): Promise<void> {
    await redis.set(
      `refresh:${userId}`,
      token,
      'EX',
      7 * 24 * 60 * 60 // 7 days
    );
  }

  private async incrementLoginAttempts(email: string): Promise<void> {
    const key = `lockout:${email}`;
    const attempts = await redis.incr(key);

    if (attempts === 1) {
      await redis.expire(key, authConfig.lockout.duration / 1000);
    }
  }
}
```

### 4.4 Role-Based Access Control (RBAC)

```typescript
// common/guards/roles.guard.ts
import { FastifyRequest, FastifyReply } from 'fastify';

export type Role = 'admin' | 'teacher' | 'parent' | 'student';

interface RolePermissions {
  [key: string]: string[];
}

const rolePermissions: RolePermissions = {
  admin: [
    'students:read',
    'students:write',
    'students:delete',
    'attendance:read',
    'attendance:write',
    'grades:read',
    'grades:write',
    'fees:read',
    'fees:write',
    'users:read',
    'users:write',
    'users:delete',
    'reports:read',
    'reports:generate',
    'settings:read',
    'settings:write',
  ],
  teacher: [
    'students:read',
    'attendance:read',
    'attendance:write',
    'grades:read',
    'grades:write',
    'reports:read',
  ],
  parent: [
    'students:read:own',
    'attendance:read:own',
    'grades:read:own',
    'fees:read:own',
    'fees:pay',
  ],
  student: [
    'students:read:self',
    'attendance:read:self',
    'grades:read:self',
  ],
};

export function createRolesGuard(allowedRoles: Role[]) {
  return async function rolesGuard(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const userRoles = request.user?.roles || [];

    const hasRole = userRoles.some((role) =>
      allowedRoles.includes(role as Role)
    );

    if (!hasRole) {
      reply.code(403).send({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'You do not have permission to access this resource',
        },
      });
    }
  };
}

export function createPermissionGuard(requiredPermission: string) {
  return async function permissionGuard(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const userRoles = request.user?.roles || [];

    const hasPermission = userRoles.some((role) => {
      const permissions = rolePermissions[role] || [];
      return permissions.includes(requiredPermission);
    });

    if (!hasPermission) {
      reply.code(403).send({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'You do not have permission to perform this action',
        },
      });
    }
  };
}
```

### 4.5 Auth Plugin

```typescript
// plugins/auth.plugin.ts
import fp from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from '@/modules/auth/auth.service';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
    optionalAuth: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }

  interface FastifyRequest {
    user?: {
      id: string;
      email: string;
      roles: string[];
    };
  }
}

async function authPlugin(app: FastifyInstance) {
  const authService = new AuthService();

  // Mandatory authentication
  app.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return reply.code(401).send({
            success: false,
            error: {
              code: 'UNAUTHORIZED',
              message: 'Missing or invalid authorization header',
            },
          });
        }

        const token = authHeader.substring(7);
        const payload = await authService.validateAccessToken(token);

        request.user = {
          id: payload.sub,
          email: payload.email,
          roles: payload.roles,
        };
      } catch (error) {
        return reply.code(401).send({
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message:
              error instanceof Error ? error.message : 'Authentication failed',
          },
        });
      }
    }
  );

  // Optional authentication
  app.decorate(
    'optionalAuth',
    async function (request: FastifyRequest, _reply: FastifyReply) {
      try {
        const authHeader = request.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.substring(7);
          const payload = await authService.validateAccessToken(token);

          request.user = {
            id: payload.sub,
            email: payload.email,
            roles: payload.roles,
          };
        }
      } catch {
        // Ignore authentication errors for optional auth
      }
    }
  );
}

export default fp(authPlugin, {
  name: 'auth-plugin',
});
```

---

## 5. Middleware Architecture

### 5.1 Request Lifecycle

```
┌─────────────────────────────────────────────────────────────────────┐
│                     REQUEST LIFECYCLE                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Request                                                             │
│     │                                                                │
│     ▼                                                                │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  1. CORS Middleware                                             ││
│  └─────────────────────────────────────────────────────────────────┘│
│     │                                                                │
│     ▼                                                                │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  2. Helmet (Security Headers)                                   ││
│  └─────────────────────────────────────────────────────────────────┘│
│     │                                                                │
│     ▼                                                                │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  3. Rate Limiting                                               ││
│  └─────────────────────────────────────────────────────────────────┘│
│     │                                                                │
│     ▼                                                                │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  4. Request Logging                                             ││
│  └─────────────────────────────────────────────────────────────────┘│
│     │                                                                │
│     ▼                                                                │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  5. Authentication (if required)                                ││
│  └─────────────────────────────────────────────────────────────────┘│
│     │                                                                │
│     ▼                                                                │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  6. Authorization (role/permission check)                       ││
│  └─────────────────────────────────────────────────────────────────┘│
│     │                                                                │
│     ▼                                                                │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  7. Request Validation (Zod schemas)                            ││
│  └─────────────────────────────────────────────────────────────────┘│
│     │                                                                │
│     ▼                                                                │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  8. Route Handler (Controller)                                  ││
│  └─────────────────────────────────────────────────────────────────┘│
│     │                                                                │
│     ▼                                                                │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  9. Response Transformation                                     ││
│  └─────────────────────────────────────────────────────────────────┘│
│     │                                                                │
│     ▼                                                                │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  10. Error Handler (if error occurred)                          ││
│  └─────────────────────────────────────────────────────────────────┘│
│     │                                                                │
│     ▼                                                                │
│  Response                                                            │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.2 Core Middleware

```typescript
// plugins/cors.plugin.ts
import fp from 'fastify-plugin';
import cors from '@fastify/cors';
import { FastifyInstance } from 'fastify';

async function corsPlugin(app: FastifyInstance) {
  await app.register(cors, {
    origin: (origin, cb) => {
      const allowedOrigins = [
        'https://mysmart.academy',
        'https://admin.mysmart.academy',
        'https://app.mysmart.academy',
      ];

      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        cb(null, true);
        return;
      }

      // Allow localhost in development
      if (
        process.env.NODE_ENV === 'development' &&
        origin.includes('localhost')
      ) {
        cb(null, true);
        return;
      }

      cb(new Error('Not allowed by CORS'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
    exposedHeaders: ['X-Request-ID', 'X-RateLimit-Limit', 'X-RateLimit-Remaining'],
    maxAge: 86400,
  });
}

export default fp(corsPlugin);
```

```typescript
// plugins/helmet.plugin.ts
import fp from 'fastify-plugin';
import helmet from '@fastify/helmet';
import { FastifyInstance } from 'fastify';

async function helmetPlugin(app: FastifyInstance) {
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https://api.mysmart.academy'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  });
}

export default fp(helmetPlugin);
```

```typescript
// plugins/rate-limit.plugin.ts
import fp from 'fastify-plugin';
import rateLimit from '@fastify/rate-limit';
import { FastifyInstance } from 'fastify';
import { redis } from '@/lib/cache';

async function rateLimitPlugin(app: FastifyInstance) {
  await app.register(rateLimit, {
    global: true,
    max: 1000, // 1000 requests per hour
    timeWindow: '1 hour',
    redis,
    keyGenerator: (request) => {
      // Use user ID if authenticated, otherwise use IP
      return request.user?.id || request.ip;
    },
    errorResponseBuilder: (request, context) => ({
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: `Rate limit exceeded. You can make ${context.max} requests per ${context.after}. Please try again later.`,
      },
    }),
    addHeaders: {
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
      'retry-after': true,
    },
  });

  // Apply stricter limits to sensitive routes
  app.addHook('onRoute', (routeOptions) => {
    if (routeOptions.url.startsWith('/api/v1/auth')) {
      routeOptions.config = {
        ...routeOptions.config,
        rateLimit: {
          max: 10,
          timeWindow: '15 minutes',
        },
      };
    }
  });
}

export default fp(rateLimitPlugin);
```

### 5.3 Request Logging

```typescript
// plugins/logging.plugin.ts
import fp from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { logger } from '@/lib/logger';
import { randomUUID } from 'crypto';

declare module 'fastify' {
  interface FastifyRequest {
    requestId: string;
    startTime: bigint;
  }
}

async function loggingPlugin(app: FastifyInstance) {
  // Add request ID and start time
  app.addHook('onRequest', async (request) => {
    request.requestId = request.headers['x-request-id'] as string || randomUUID();
    request.startTime = process.hrtime.bigint();
  });

  // Log request
  app.addHook('preHandler', async (request) => {
    logger.info('Incoming request', {
      requestId: request.requestId,
      method: request.method,
      url: request.url,
      userAgent: request.headers['user-agent'],
      ip: request.ip,
      userId: request.user?.id,
    });
  });

  // Log response
  app.addHook('onResponse', async (request, reply) => {
    const duration = Number(process.hrtime.bigint() - request.startTime) / 1e6;

    logger.info('Request completed', {
      requestId: request.requestId,
      method: request.method,
      url: request.url,
      statusCode: reply.statusCode,
      duration: `${duration.toFixed(2)}ms`,
      userId: request.user?.id,
    });
  });

  // Add request ID to response headers
  app.addHook('onSend', async (request, reply) => {
    reply.header('X-Request-ID', request.requestId);
  });
}

export default fp(loggingPlugin);
```

---

## 6. Service Layer Design

### 6.1 Service Pattern

```typescript
// modules/students/students.service.ts
import { prisma } from '@/database';
import { cache } from '@/lib/cache';
import { eventEmitter } from '@/events';
import { logger } from '@/lib/logger';
import { NotFoundError, ValidationError } from '@/common/errors';
import type {
  Student,
  CreateStudentDto,
  UpdateStudentDto,
  StudentQuery,
  PaginatedResult,
} from '@/types';

export class StudentsService {
  private readonly cachePrefix = 'students';
  private readonly cacheTTL = 300; // 5 minutes

  async findAll(query: StudentQuery): Promise<PaginatedResult<Student>> {
    const { page = 1, limit = 10, search, classId, status, sortBy, sortOrder } = query;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Prisma.StudentWhereInput = {
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { enrollmentNumber: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(classId && { classId }),
      ...(status && status !== 'all' && { status }),
      deletedAt: null,
    };

    // Execute queries in parallel
    const [data, total] = await Promise.all([
      prisma.student.findMany({
        where,
        skip,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortOrder || 'asc' } : { createdAt: 'desc' },
        include: {
          class: {
            select: { id: true, name: true, section: true },
          },
        },
      }),
      prisma.student.count({ where }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<Student> {
    // Check cache first
    const cacheKey = `${this.cachePrefix}:${id}`;
    const cached = await cache.get<Student>(cacheKey);

    if (cached) {
      return cached;
    }

    const student = await prisma.student.findUnique({
      where: { id, deletedAt: null },
      include: {
        class: true,
        parent: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
          },
        },
        attendances: {
          take: 30,
          orderBy: { date: 'desc' },
        },
        grades: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!student) {
      throw new NotFoundError('Student', id);
    }

    // Cache the result
    await cache.set(cacheKey, student, this.cacheTTL);

    return student;
  }

  async create(data: CreateStudentDto): Promise<Student> {
    // Generate enrollment number
    const enrollmentNumber = await this.generateEnrollmentNumber();

    // Create student
    const student = await prisma.student.create({
      data: {
        ...data,
        enrollmentNumber,
      },
      include: {
        class: true,
      },
    });

    // Emit event
    eventEmitter.emit('student.created', { student });

    logger.info('Student created', {
      studentId: student.id,
      enrollmentNumber: student.enrollmentNumber,
    });

    return student;
  }

  async update(id: string, data: UpdateStudentDto): Promise<Student> {
    // Verify student exists
    const existing = await this.findById(id);

    // Update student
    const student = await prisma.student.update({
      where: { id },
      data,
      include: {
        class: true,
      },
    });

    // Invalidate cache
    await cache.del(`${this.cachePrefix}:${id}`);

    // Emit event
    eventEmitter.emit('student.updated', {
      student,
      changes: data,
      previousData: existing,
    });

    logger.info('Student updated', { studentId: id });

    return student;
  }

  async delete(id: string): Promise<void> {
    // Verify student exists
    await this.findById(id);

    // Soft delete
    await prisma.student.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    // Invalidate cache
    await cache.del(`${this.cachePrefix}:${id}`);

    // Emit event
    eventEmitter.emit('student.deleted', { studentId: id });

    logger.info('Student deleted', { studentId: id });
  }

  private async generateEnrollmentNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const prefix = `SA${year}`;

    // Get the latest enrollment number for this year
    const latest = await prisma.student.findFirst({
      where: {
        enrollmentNumber: { startsWith: prefix },
      },
      orderBy: { enrollmentNumber: 'desc' },
      select: { enrollmentNumber: true },
    });

    let sequence = 1;
    if (latest) {
      const lastSequence = parseInt(latest.enrollmentNumber.slice(-5), 10);
      sequence = lastSequence + 1;
    }

    return `${prefix}${String(sequence).padStart(5, '0')}`;
  }
}
```

### 6.2 Repository Pattern

```typescript
// database/repositories/base.repository.ts
import { PrismaClient, Prisma } from '@prisma/client';

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export abstract class BaseRepository<
  Model,
  CreateInput,
  UpdateInput,
  WhereUniqueInput,
  WhereInput,
  OrderByInput,
> {
  constructor(protected prisma: PrismaClient) {}

  protected abstract get model(): {
    findUnique: (args: any) => Promise<Model | null>;
    findMany: (args: any) => Promise<Model[]>;
    create: (args: any) => Promise<Model>;
    update: (args: any) => Promise<Model>;
    delete: (args: any) => Promise<Model>;
    count: (args: any) => Promise<number>;
  };

  async findById(id: string): Promise<Model | null> {
    return this.model.findUnique({
      where: { id } as WhereUniqueInput,
    });
  }

  async findMany(
    where?: WhereInput,
    pagination?: PaginationOptions,
    include?: any,
  ): Promise<PaginatedResult<Model>> {
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;

    const orderBy = pagination?.sortBy
      ? { [pagination.sortBy]: pagination.sortOrder || 'asc' }
      : undefined;

    const [data, total] = await Promise.all([
      this.model.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include,
      }),
      this.model.count({ where }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(data: CreateInput): Promise<Model> {
    return this.model.create({ data });
  }

  async update(id: string, data: UpdateInput): Promise<Model> {
    return this.model.update({
      where: { id } as WhereUniqueInput,
      data,
    });
  }

  async delete(id: string): Promise<Model> {
    return this.model.delete({
      where: { id } as WhereUniqueInput,
    });
  }

  async exists(where: WhereInput): Promise<boolean> {
    const count = await this.model.count({ where });
    return count > 0;
  }
}
```

---

## 7. Error Handling and Logging

### 7.1 Custom Error Classes

```typescript
// common/errors/index.ts
export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number = 500,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    public readonly fields: Record<string, string[]>,
  ) {
    super('VALIDATION_ERROR', message, 400, { fields });
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, identifier: string) {
    super(
      'NOT_FOUND',
      `${resource} with identifier '${identifier}' not found`,
      404,
    );
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access') {
    super('UNAUTHORIZED', message, 401);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Access forbidden') {
    super('FORBIDDEN', message, 403);
    this.name = 'ForbiddenError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super('CONFLICT', message, 409);
    this.name = 'ConflictError';
  }
}

export class RateLimitError extends AppError {
  constructor(retryAfter: number) {
    super('RATE_LIMIT_EXCEEDED', 'Too many requests', 429, { retryAfter });
    this.name = 'RateLimitError';
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, message: string) {
    super('EXTERNAL_SERVICE_ERROR', `${service}: ${message}`, 502);
    this.name = 'ExternalServiceError';
  }
}
```

### 7.2 Global Error Handler

```typescript
// plugins/error-handler.plugin.ts
import fp from 'fastify-plugin';
import { FastifyInstance, FastifyError } from 'fastify';
import { ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AppError, ValidationError } from '@/common/errors';
import { logger } from '@/lib/logger';

async function errorHandlerPlugin(app: FastifyInstance) {
  app.setErrorHandler((error, request, reply) => {
    const requestId = request.requestId;

    // Log the error
    logger.error('Request error', {
      requestId,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      request: {
        method: request.method,
        url: request.url,
        userId: request.user?.id,
      },
    });

    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const fields: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        if (!fields[path]) {
          fields[path] = [];
        }
        fields[path].push(err.message);
      });

      return reply.code(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: fields,
        },
      });
    }

    // Handle custom AppError
    if (error instanceof AppError) {
      return reply.code(error.statusCode).send({
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
      });
    }

    // Handle Prisma errors
    if (error instanceof PrismaClientKnownRequestError) {
      return handlePrismaError(error, reply);
    }

    // Handle Fastify validation errors
    if ((error as FastifyError).validation) {
      return reply.code(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: (error as FastifyError).validation,
        },
      });
    }

    // Default error response
    const statusCode = (error as FastifyError).statusCode || 500;

    return reply.code(statusCode).send({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message:
          process.env.NODE_ENV === 'production'
            ? 'An unexpected error occurred'
            : error.message,
        ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
      },
    });
  });
}

function handlePrismaError(
  error: PrismaClientKnownRequestError,
  reply: FastifyReply,
) {
  switch (error.code) {
    case 'P2002':
      // Unique constraint violation
      return reply.code(409).send({
        success: false,
        error: {
          code: 'CONFLICT',
          message: 'A record with this value already exists',
          details: { field: error.meta?.target },
        },
      });

    case 'P2025':
      // Record not found
      return reply.code(404).send({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Record not found',
        },
      });

    case 'P2003':
      // Foreign key constraint failed
      return reply.code(400).send({
        success: false,
        error: {
          code: 'INVALID_REFERENCE',
          message: 'Referenced record does not exist',
        },
      });

    default:
      return reply.code(500).send({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'A database error occurred',
        },
      });
  }
}

export default fp(errorHandlerPlugin);
```

### 7.3 Winston Logger Configuration

```typescript
// lib/logger.ts
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize, json, errors } = winston.format;

// Custom format for console output
const consoleFormat = printf(({ level, message, timestamp, ...meta }) => {
  const metaStr = Object.keys(meta).length
    ? JSON.stringify(meta, null, 2)
    : '';
  return `${timestamp} [${level}]: ${message} ${metaStr}`;
});

// Create logger instance
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    json(),
  ),
  defaultMeta: {
    service: 'smart-academy-api',
    environment: process.env.NODE_ENV,
  },
  transports: [
    // Console transport
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'HH:mm:ss' }),
        consoleFormat,
      ),
    }),

    // File transport for errors
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: '20m',
      maxFiles: '14d',
    }),

    // File transport for all logs
    new DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
  exceptionHandlers: [
    new DailyRotateFile({
      filename: 'logs/exceptions-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
    }),
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      filename: 'logs/rejections-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
    }),
  ],
});

// Request context logger
export function createRequestLogger(requestId: string) {
  return logger.child({ requestId });
}
```

---

## 8. Background Job Processing

### 8.1 Queue Configuration

```typescript
// lib/queue.ts
import { Queue, Worker, QueueEvents, Job } from 'bullmq';
import { redis } from './cache';
import { logger } from './logger';

// Queue names
export const QUEUE_NAMES = {
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push-notification',
  REPORT: 'report-generation',
  CLEANUP: 'cleanup',
} as const;

// Create queue instance
export function createQueue(name: string): Queue {
  return new Queue(name, {
    connection: redis,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
      removeOnComplete: {
        count: 100,
      },
      removeOnFail: {
        count: 500,
      },
    },
  });
}

// Create worker instance
export function createWorker<T = any>(
  name: string,
  processor: (job: Job<T>) => Promise<void>,
  concurrency = 5,
): Worker {
  const worker = new Worker(name, processor, {
    connection: redis,
    concurrency,
  });

  worker.on('completed', (job) => {
    logger.info('Job completed', {
      queue: name,
      jobId: job.id,
      jobName: job.name,
    });
  });

  worker.on('failed', (job, error) => {
    logger.error('Job failed', {
      queue: name,
      jobId: job?.id,
      jobName: job?.name,
      error: error.message,
    });
  });

  return worker;
}

// Queue instances
export const emailQueue = createQueue(QUEUE_NAMES.EMAIL);
export const smsQueue = createQueue(QUEUE_NAMES.SMS);
export const pushQueue = createQueue(QUEUE_NAMES.PUSH);
export const reportQueue = createQueue(QUEUE_NAMES.REPORT);
export const cleanupQueue = createQueue(QUEUE_NAMES.CLEANUP);
```

### 8.2 Email Job Processor

```typescript
// jobs/processors/email.processor.ts
import { Job } from 'bullmq';
import { createWorker, QUEUE_NAMES } from '@/lib/queue';
import { logger } from '@/lib/logger';
import { sendEmail } from '@/lib/email';

interface EmailJobData {
  to: string | string[];
  subject: string;
  template: string;
  data: Record<string, unknown>;
  attachments?: Array<{
    filename: string;
    path: string;
  }>;
}

async function processEmailJob(job: Job<EmailJobData>): Promise<void> {
  const { to, subject, template, data, attachments } = job.data;

  logger.info('Processing email job', {
    jobId: job.id,
    to,
    template,
  });

  try {
    await sendEmail({
      to,
      subject,
      template,
      data,
      attachments,
    });

    logger.info('Email sent successfully', {
      jobId: job.id,
      to,
    });
  } catch (error) {
    logger.error('Failed to send email', {
      jobId: job.id,
      to,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
}

export const emailWorker = createWorker(
  QUEUE_NAMES.EMAIL,
  processEmailJob,
  3, // Concurrency
);
```

### 8.3 Scheduled Jobs

```typescript
// jobs/schedulers/fee-reminder.ts
import { CronJob } from 'cron';
import { prisma } from '@/database';
import { smsQueue, emailQueue } from '@/lib/queue';
import { logger } from '@/lib/logger';

// Send fee reminders at 9 AM every day
export const feeReminderJob = new CronJob(
  '0 9 * * *', // 9:00 AM daily
  async function () {
    logger.info('Starting fee reminder job');

    try {
      // Get students with overdue fees
      const overdueStudents = await prisma.studentFeeAccount.findMany({
        where: {
          balance: { gt: 0 },
          dueDate: { lt: new Date() },
        },
        include: {
          student: {
            include: {
              parent: true,
            },
          },
        },
      });

      logger.info(`Found ${overdueStudents.length} students with overdue fees`);

      for (const account of overdueStudents) {
        const { student, balance, dueDate } = account;
        const parent = student.parent;

        if (!parent) continue;

        // Queue SMS
        if (parent.phone) {
          await smsQueue.add('fee-reminder-sms', {
            phone: parent.phone,
            template: 'fee-reminder',
            data: {
              studentName: `${student.firstName} ${student.lastName}`,
              amount: balance,
              dueDate,
            },
          });
        }

        // Queue Email
        if (parent.email) {
          await emailQueue.add('fee-reminder-email', {
            to: parent.email,
            subject: 'Fee Payment Reminder - Smart Academy',
            template: 'fee-reminder',
            data: {
              parentName: `${parent.firstName} ${parent.lastName}`,
              studentName: `${student.firstName} ${student.lastName}`,
              amount: balance,
              dueDate,
            },
          });
        }
      }

      logger.info('Fee reminder job completed');
    } catch (error) {
      logger.error('Fee reminder job failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  },
  null,
  false,
  'Asia/Dhaka',
);

// Start the job
feeReminderJob.start();
```

---

## 9. File Upload and Storage Strategy

### 9.1 Storage Abstraction

```typescript
// modules/files/storage/storage.interface.ts
export interface StorageDriver {
  upload(
    file: Buffer,
    options: UploadOptions,
  ): Promise<UploadResult>;

  download(key: string): Promise<Buffer>;

  delete(key: string): Promise<void>;

  getSignedUrl(key: string, expiresIn?: number): Promise<string>;

  exists(key: string): Promise<boolean>;
}

export interface UploadOptions {
  filename: string;
  mimeType: string;
  folder?: string;
  public?: boolean;
}

export interface UploadResult {
  key: string;
  url: string;
  size: number;
  mimeType: string;
}
```

```typescript
// modules/files/storage/s3.storage.ts
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { StorageDriver, UploadOptions, UploadResult } from './storage.interface';
import { config } from '@/config';

export class S3Storage implements StorageDriver {
  private client: S3Client;
  private bucket: string;

  constructor() {
    this.client = new S3Client({
      region: config.s3.region,
      credentials: {
        accessKeyId: config.s3.accessKeyId,
        secretAccessKey: config.s3.secretAccessKey,
      },
      endpoint: config.s3.endpoint, // For MinIO or other S3-compatible storage
    });
    this.bucket = config.s3.bucket;
  }

  async upload(file: Buffer, options: UploadOptions): Promise<UploadResult> {
    const key = this.generateKey(options.filename, options.folder);

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file,
        ContentType: options.mimeType,
        ACL: options.public ? 'public-read' : 'private',
      }),
    );

    const url = options.public
      ? `https://${this.bucket}.s3.${config.s3.region}.amazonaws.com/${key}`
      : await this.getSignedUrl(key);

    return {
      key,
      url,
      size: file.length,
      mimeType: options.mimeType,
    };
  }

  async download(key: string): Promise<Buffer> {
    const response = await this.client.send(
      new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );

    const stream = response.Body as NodeJS.ReadableStream;
    const chunks: Buffer[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk as Buffer);
    }

    return Buffer.concat(chunks);
  }

  async delete(key: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );
  }

  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return getSignedUrl(this.client, command, { expiresIn });
  }

  async exists(key: string): Promise<boolean> {
    try {
      await this.client.send(
        new HeadObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      );
      return true;
    } catch {
      return false;
    }
  }

  private generateKey(filename: string, folder?: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const ext = filename.split('.').pop();
    const key = `${timestamp}-${random}.${ext}`;

    return folder ? `${folder}/${key}` : key;
  }
}
```

### 9.2 File Upload Service

```typescript
// modules/files/files.service.ts
import { StorageDriver } from './storage/storage.interface';
import { S3Storage } from './storage/s3.storage';
import { prisma } from '@/database';
import { ValidationError } from '@/common/errors';
import { logger } from '@/lib/logger';

const ALLOWED_MIME_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  spreadsheet: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export class FilesService {
  private storage: StorageDriver;

  constructor() {
    this.storage = new S3Storage();
  }

  async upload(
    file: Buffer,
    filename: string,
    mimeType: string,
    options: {
      folder?: string;
      userId?: string;
      entityType?: string;
      entityId?: string;
    } = {},
  ) {
    // Validate file size
    if (file.length > MAX_FILE_SIZE) {
      throw new ValidationError('File too large', {
        size: [`File size exceeds maximum of ${MAX_FILE_SIZE / 1024 / 1024}MB`],
      });
    }

    // Validate MIME type
    const allowedTypes = Object.values(ALLOWED_MIME_TYPES).flat();
    if (!allowedTypes.includes(mimeType)) {
      throw new ValidationError('Invalid file type', {
        mimeType: ['File type not allowed'],
      });
    }

    // Upload to storage
    const result = await this.storage.upload(file, {
      filename,
      mimeType,
      folder: options.folder,
    });

    // Save to database
    const fileRecord = await prisma.file.create({
      data: {
        key: result.key,
        filename,
        mimeType,
        size: result.size,
        url: result.url,
        uploadedById: options.userId,
        entityType: options.entityType,
        entityId: options.entityId,
      },
    });

    logger.info('File uploaded', {
      fileId: fileRecord.id,
      filename,
      size: result.size,
    });

    return fileRecord;
  }

  async getDownloadUrl(fileId: string): Promise<string> {
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      throw new NotFoundError('File', fileId);
    }

    return this.storage.getSignedUrl(file.key, 3600);
  }

  async delete(fileId: string): Promise<void> {
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      throw new NotFoundError('File', fileId);
    }

    // Delete from storage
    await this.storage.delete(file.key);

    // Delete from database
    await prisma.file.delete({
      where: { id: fileId },
    });

    logger.info('File deleted', { fileId });
  }
}
```

---

## 10. Caching Strategy

### 10.1 Cache Configuration

```typescript
// lib/cache.ts
import Redis from 'ioredis';
import { config } from '@/config';
import { logger } from '@/lib/logger';

export const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
  db: config.redis.db,
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  lazyConnect: true,
});

redis.on('connect', () => {
  logger.info('Redis connected');
});

redis.on('error', (error) => {
  logger.error('Redis error', { error: error.message });
});

// Cache utilities
export const cache = {
  async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  },

  async set(key: string, value: unknown, ttl?: number): Promise<void> {
    const data = JSON.stringify(value);
    if (ttl) {
      await redis.setex(key, ttl, data);
    } else {
      await redis.set(key, data);
    }
  },

  async del(key: string): Promise<void> {
    await redis.del(key);
  },

  async delPattern(pattern: string): Promise<void> {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  },

  async remember<T>(
    key: string,
    ttl: number,
    factory: () => Promise<T>,
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const value = await factory();
    await this.set(key, value, ttl);
    return value;
  },

  async increment(key: string): Promise<number> {
    return redis.incr(key);
  },

  async expire(key: string, seconds: number): Promise<void> {
    await redis.expire(key, seconds);
  },

  async exists(key: string): Promise<boolean> {
    const result = await redis.exists(key);
    return result === 1;
  },
};

// Cache key builders
export const cacheKeys = {
  student: (id: string) => `student:${id}`,
  studentList: (filters: string) => `students:list:${filters}`,
  attendance: (classId: string, date: string) =>
    `attendance:${classId}:${date}`,
  grades: (studentId: string, termId: string) =>
    `grades:${studentId}:${termId}`,
  prayerTimes: (date: string, location: string) =>
    `prayer:${date}:${location}`,
  session: (userId: string) => `session:${userId}`,
  rateLimit: (identifier: string) => `ratelimit:${identifier}`,
};
```

### 10.2 Caching Decorators

```typescript
// common/decorators/cache.decorator.ts
import { cache, cacheKeys } from '@/lib/cache';

interface CacheOptions {
  ttl?: number;
  keyBuilder?: (...args: unknown[]) => string;
}

export function Cacheable(options: CacheOptions = {}) {
  const { ttl = 300, keyBuilder } = options;

  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      const key = keyBuilder
        ? keyBuilder(...args)
        : `${target.constructor.name}:${propertyKey}:${JSON.stringify(args)}`;

      // Try to get from cache
      const cached = await cache.get(key);
      if (cached !== null) {
        return cached;
      }

      // Execute original method
      const result = await originalMethod.apply(this, args);

      // Cache the result
      await cache.set(key, result, ttl);

      return result;
    };

    return descriptor;
  };
}

export function CacheInvalidate(keyBuilder: (...args: unknown[]) => string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      // Execute original method
      const result = await originalMethod.apply(this, args);

      // Invalidate cache
      const key = keyBuilder(...args);
      await cache.del(key);

      return result;
    };

    return descriptor;
  };
}

// Usage example
class StudentsService {
  @Cacheable({
    ttl: 300,
    keyBuilder: (id: string) => cacheKeys.student(id),
  })
  async findById(id: string): Promise<Student> {
    return prisma.student.findUnique({ where: { id } });
  }

  @CacheInvalidate((id: string) => cacheKeys.student(id))
  async update(id: string, data: UpdateStudentDto): Promise<Student> {
    return prisma.student.update({ where: { id }, data });
  }
}
```

---

## 11. Database Design

### 11.1 Prisma Schema (Custom Database)

```prisma
// database/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User Management
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  passwordHash  String    @map("password_hash")
  firstName     String    @map("first_name")
  lastName      String    @map("last_name")
  phone         String?
  avatarUrl     String?   @map("avatar_url")
  isActive      Boolean   @default(true) @map("is_active")
  emailVerified DateTime? @map("email_verified")
  lastLoginAt   DateTime? @map("last_login_at")

  roles    UserRole[]
  sessions Session[]
  files    File[]

  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("users")
}

model Role {
  id          String  @id @default(uuid())
  name        String  @unique
  description String?

  users       UserRole[]
  permissions RolePermission[]

  createdAt DateTime @default(now()) @map("created_at")

  @@map("roles")
}

model UserRole {
  userId String @map("user_id")
  roleId String @map("role_id")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  role Role @relation(fields: [roleId], references: [id], onDelete: Cascade)

  assignedAt DateTime @default(now()) @map("assigned_at")

  @@id([userId, roleId])
  @@map("user_roles")
}

model Permission {
  id          String @id @default(uuid())
  name        String @unique
  description String?

  roles RolePermission[]

  @@map("permissions")
}

model RolePermission {
  roleId       String @map("role_id")
  permissionId String @map("permission_id")

  role       Role       @relation(fields: [roleId], references: [id], onDelete: Cascade)
  permission Permission @relation(fields: [permissionId], references: [id], onDelete: Cascade)

  @@id([roleId, permissionId])
  @@map("role_permissions")
}

model Session {
  id        String   @id @default(uuid())
  userId    String   @map("user_id")
  token     String   @unique
  expiresAt DateTime @map("expires_at")
  userAgent String?  @map("user_agent")
  ipAddress String?  @map("ip_address")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now()) @map("created_at")

  @@index([userId])
  @@map("sessions")
}

// Islamic Education Module
model QuranProgress {
  id               String             @id @default(uuid())
  studentId        String             @map("student_id")
  gibbonPersonId   Int                @map("gibbon_person_id")
  surahNumber      Int                @map("surah_number")
  surahNameArabic  String             @map("surah_name_arabic")
  surahNameEnglish String             @map("surah_name_english")
  juzNumber        Int?               @map("juz_number")
  verseStart       Int                @map("verse_start")
  verseEnd         Int                @map("verse_end")
  status           MemorizationStatus @default(NOT_STARTED)
  revisionCount    Int                @default(0) @map("revision_count")
  lastRevisionDate DateTime?          @map("last_revision_date")
  assessmentScore  Decimal?           @map("assessment_score") @db.Decimal(5, 2)
  teacherComments  String?            @map("teacher_comments")
  assessedBy       String?            @map("assessed_by")
  assessedAt       DateTime?          @map("assessed_at")

  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@index([studentId])
  @@index([surahNumber])
  @@map("quran_progress")
}

enum MemorizationStatus {
  NOT_STARTED
  IN_PROGRESS
  MEMORIZED
  MASTERED

  @@map("memorization_status")
}

model TajweedAssessment {
  id                   String        @id @default(uuid())
  studentId            String        @map("student_id")
  gibbonPersonId       Int           @map("gibbon_person_id")
  assessmentDate       DateTime      @map("assessment_date")
  assessmentType       String        @map("assessment_type")
  makhrajScore         Decimal?      @map("makhraj_score") @db.Decimal(5, 2)
  sifatScore           Decimal?      @map("sifat_score") @db.Decimal(5, 2)
  rulesApplicationScore Decimal?     @map("rules_application_score") @db.Decimal(5, 2)
  fluencyScore         Decimal?      @map("fluency_score") @db.Decimal(5, 2)
  overallScore         Decimal?      @map("overall_score") @db.Decimal(5, 2)
  levelAchieved        TajweedLevel? @map("level_achieved")
  assessorId           String?       @map("assessor_id")
  assessorComments     String?       @map("assessor_comments")
  audioRecordingUrl    String?       @map("audio_recording_url")

  createdAt DateTime @default(now()) @map("created_at")

  @@index([studentId, assessmentDate])
  @@map("tajweed_assessments")
}

enum TajweedLevel {
  BEGINNER
  ELEMENTARY
  INTERMEDIATE
  ADVANCED
  EXPERT

  @@map("tajweed_level")
}

// Payment Module
model PaymentTransaction {
  id                   String            @id @default(uuid())
  studentId            String            @map("student_id")
  gibbonPersonId       Int               @map("gibbon_person_id")
  amount               Decimal           @db.Decimal(10, 2)
  currency             String            @default("BDT")
  paymentGateway       PaymentGateway    @map("payment_gateway")
  gatewayTransactionId String?           @map("gateway_transaction_id")
  gatewayResponse      Json?             @map("gateway_response")
  status               PaymentStatus     @default(PENDING)
  feeType              String?           @map("fee_type")
  paymentMonth         String?           @map("payment_month")
  initiatedAt          DateTime          @default(now()) @map("initiated_at")
  completedAt          DateTime?         @map("completed_at")
  refundedAt           DateTime?         @map("refunded_at")
  refundAmount         Decimal?          @map("refund_amount") @db.Decimal(10, 2)
  receiptNumber        String?           @unique @map("receipt_number")
  notes                String?

  receipt PaymentReceipt?

  @@index([studentId])
  @@index([status])
  @@index([initiatedAt])
  @@map("payment_transactions")
}

enum PaymentGateway {
  BKASH
  NAGAD
  SSLCOMMERZ
  BANK
  CASH

  @@map("payment_gateway")
}

enum PaymentStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  REFUNDED
  CANCELLED

  @@map("payment_status")
}

model PaymentReceipt {
  id            String   @id @default(uuid())
  transactionId String   @unique @map("transaction_id")
  receiptNumber String   @unique @map("receipt_number")
  studentName   String   @map("student_name")
  studentClass  String   @map("student_class")
  amount        Decimal  @db.Decimal(10, 2)
  amountInWords String   @map("amount_in_words")
  paymentMethod String   @map("payment_method")
  paymentDate   DateTime @map("payment_date")
  feeDetails    Json     @map("fee_details")
  pdfUrl        String?  @map("pdf_url")

  transaction PaymentTransaction @relation(fields: [transactionId], references: [id])

  generatedAt DateTime @default(now()) @map("generated_at")

  @@map("payment_receipts")
}

// File Management
model File {
  id           String   @id @default(uuid())
  key          String   @unique
  filename     String
  mimeType     String   @map("mime_type")
  size         Int
  url          String
  uploadedById String?  @map("uploaded_by_id")
  entityType   String?  @map("entity_type")
  entityId     String?  @map("entity_id")

  uploadedBy User? @relation(fields: [uploadedById], references: [id])

  createdAt DateTime @default(now()) @map("created_at")

  @@index([entityType, entityId])
  @@map("files")
}

// Notification System
model Notification {
  id        String           @id @default(uuid())
  userId    String           @map("user_id")
  type      NotificationType
  title     String
  message   String
  data      Json?
  readAt    DateTime?        @map("read_at")
  sentAt    DateTime         @default(now()) @map("sent_at")

  @@index([userId, readAt])
  @@map("notifications")
}

enum NotificationType {
  ATTENDANCE
  GRADE
  FEE_REMINDER
  FEE_PAYMENT
  ANNOUNCEMENT
  MESSAGE
  SYSTEM

  @@map("notification_type")
}
```

---

## 12. External Integrations

### 12.1 bKash Integration

```typescript
// modules/payments/gateways/bkash.gateway.ts
import axios from 'axios';
import { config } from '@/config';
import { logger } from '@/lib/logger';
import { ExternalServiceError } from '@/common/errors';

interface BkashTokenResponse {
  statusCode: string;
  statusMessage: string;
  id_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

interface BkashCreatePaymentResponse {
  paymentID: string;
  bkashURL: string;
  statusCode: string;
  statusMessage: string;
}

export class BkashGateway {
  private baseUrl: string;
  private appKey: string;
  private appSecret: string;
  private username: string;
  private password: string;
  private accessToken: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor() {
    this.baseUrl = config.bkash.baseUrl;
    this.appKey = config.bkash.appKey;
    this.appSecret = config.bkash.appSecret;
    this.username = config.bkash.username;
    this.password = config.bkash.password;
  }

  private async getAccessToken(): Promise<string> {
    // Return cached token if still valid
    if (this.accessToken && this.tokenExpiry && this.tokenExpiry > new Date()) {
      return this.accessToken;
    }

    try {
      const response = await axios.post<BkashTokenResponse>(
        `${this.baseUrl}/tokenized/checkout/token/grant`,
        {
          app_key: this.appKey,
          app_secret: this.appSecret,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            username: this.username,
            password: this.password,
          },
        },
      );

      if (response.data.statusCode !== '0000') {
        throw new Error(response.data.statusMessage);
      }

      this.accessToken = response.data.id_token;
      this.tokenExpiry = new Date(Date.now() + response.data.expires_in * 1000);

      return this.accessToken;
    } catch (error) {
      logger.error('bKash token grant failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw new ExternalServiceError('bKash', 'Failed to obtain access token');
    }
  }

  async createPayment(params: {
    amount: number;
    payerReference: string;
    merchantInvoiceNumber: string;
    callbackURL: string;
  }): Promise<BkashCreatePaymentResponse> {
    const token = await this.getAccessToken();

    try {
      const response = await axios.post<BkashCreatePaymentResponse>(
        `${this.baseUrl}/tokenized/checkout/create`,
        {
          mode: '0011',
          payerReference: params.payerReference,
          callbackURL: params.callbackURL,
          merchantAssociationInfo: '',
          amount: params.amount.toString(),
          currency: 'BDT',
          intent: 'sale',
          merchantInvoiceNumber: params.merchantInvoiceNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: token,
            'X-App-Key': this.appKey,
          },
        },
      );

      if (response.data.statusCode !== '0000') {
        throw new Error(response.data.statusMessage);
      }

      logger.info('bKash payment created', {
        paymentId: response.data.paymentID,
        invoiceNumber: params.merchantInvoiceNumber,
      });

      return response.data;
    } catch (error) {
      logger.error('bKash create payment failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw new ExternalServiceError('bKash', 'Failed to create payment');
    }
  }

  async executePayment(paymentID: string): Promise<any> {
    const token = await this.getAccessToken();

    try {
      const response = await axios.post(
        `${this.baseUrl}/tokenized/checkout/execute`,
        { paymentID },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: token,
            'X-App-Key': this.appKey,
          },
        },
      );

      logger.info('bKash payment executed', {
        paymentId: paymentID,
        status: response.data.statusCode,
      });

      return response.data;
    } catch (error) {
      logger.error('bKash execute payment failed', {
        paymentId: paymentID,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw new ExternalServiceError('bKash', 'Failed to execute payment');
    }
  }

  async queryPayment(paymentID: string): Promise<any> {
    const token = await this.getAccessToken();

    try {
      const response = await axios.post(
        `${this.baseUrl}/tokenized/checkout/payment/status`,
        { paymentID },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: token,
            'X-App-Key': this.appKey,
          },
        },
      );

      return response.data;
    } catch (error) {
      logger.error('bKash query payment failed', {
        paymentId: paymentID,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw new ExternalServiceError('bKash', 'Failed to query payment');
    }
  }
}
```

### 12.2 SMS Gateway Integration

```typescript
// modules/notifications/channels/sms.channel.ts
import axios from 'axios';
import { config } from '@/config';
import { logger } from '@/lib/logger';
import { ExternalServiceError } from '@/common/errors';

interface SMSResponse {
  success: boolean;
  message: string;
  messageId?: string;
}

export class SMSChannel {
  private apiUrl: string;
  private apiKey: string;
  private senderId: string;

  constructor() {
    this.apiUrl = config.sms.apiUrl;
    this.apiKey = config.sms.apiKey;
    this.senderId = config.sms.senderId;
  }

  async send(
    phone: string,
    message: string,
    options?: { unicode?: boolean },
  ): Promise<SMSResponse> {
    // Normalize phone number
    const normalizedPhone = this.normalizePhone(phone);

    // Check if within allowed hours (8 AM - 8 PM)
    const hour = new Date().getHours();
    if (hour < 8 || hour >= 20) {
      logger.warn('SMS outside allowed hours, queuing for later', {
        phone: normalizedPhone,
      });
      // In production, queue for later instead of sending immediately
    }

    try {
      const response = await axios.post<SMSResponse>(
        `${this.apiUrl}/send`,
        {
          api_key: this.apiKey,
          sender_id: this.senderId,
          to: normalizedPhone,
          msg: message,
          type: options?.unicode ? 'unicode' : 'text',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        },
      );

      logger.info('SMS sent', {
        phone: normalizedPhone,
        messageId: response.data.messageId,
      });

      return response.data;
    } catch (error) {
      logger.error('SMS send failed', {
        phone: normalizedPhone,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw new ExternalServiceError('SMS Gateway', 'Failed to send SMS');
    }
  }

  async sendBulk(
    messages: Array<{ phone: string; message: string }>,
  ): Promise<void> {
    // Send in batches of 50
    const batchSize = 50;

    for (let i = 0; i < messages.length; i += batchSize) {
      const batch = messages.slice(i, i + batchSize);

      await Promise.all(
        batch.map((msg) => this.send(msg.phone, msg.message)),
      );

      // Rate limiting - wait between batches
      if (i + batchSize < messages.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  private normalizePhone(phone: string): string {
    // Remove all non-digit characters
    let cleaned = phone.replace(/\D/g, '');

    // Handle Bangladesh phone numbers
    if (cleaned.startsWith('880')) {
      return `+${cleaned}`;
    }

    if (cleaned.startsWith('0')) {
      return `+880${cleaned.substring(1)}`;
    }

    if (cleaned.length === 10) {
      return `+880${cleaned}`;
    }

    return `+${cleaned}`;
  }
}
```

---

## 13. Testing Strategy

### 13.1 Test Structure

```typescript
// tests/setup.ts
import { PrismaClient } from '@prisma/client';
import { beforeAll, afterAll, beforeEach } from 'vitest';

const prisma = new PrismaClient();

beforeAll(async () => {
  // Connect to test database
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  // Clean database before each test
  const tableNames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  for (const { tablename } of tableNames) {
    if (tablename !== '_prisma_migrations') {
      await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "public"."${tablename}" CASCADE;`,
      );
    }
  }
});

export { prisma };
```

### 13.2 Unit Test Example

```typescript
// tests/unit/services/students.service.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StudentsService } from '@/modules/students/students.service';
import { prisma } from '../../setup';
import { NotFoundError } from '@/common/errors';

describe('StudentsService', () => {
  let service: StudentsService;

  beforeEach(() => {
    service = new StudentsService();
  });

  describe('findById', () => {
    it('should return student when found', async () => {
      // Arrange
      const student = await prisma.student.create({
        data: {
          firstName: 'Ahmed',
          lastName: 'Khan',
          enrollmentNumber: 'SA20260001',
          gibbonPersonId: 1,
        },
      });

      // Act
      const result = await service.findById(student.id);

      // Assert
      expect(result).toBeDefined();
      expect(result.firstName).toBe('Ahmed');
      expect(result.lastName).toBe('Khan');
    });

    it('should throw NotFoundError when student not found', async () => {
      // Act & Assert
      await expect(
        service.findById('non-existent-id'),
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('create', () => {
    it('should create student with generated enrollment number', async () => {
      // Arrange
      const data = {
        firstName: 'Fatima',
        lastName: 'Rahman',
        gibbonPersonId: 2,
        classId: 'class-uuid',
      };

      // Act
      const result = await service.create(data);

      // Assert
      expect(result.id).toBeDefined();
      expect(result.enrollmentNumber).toMatch(/^SA2026\d{5}$/);
      expect(result.firstName).toBe('Fatima');
    });
  });
});
```

### 13.3 Integration Test Example

```typescript
// tests/integration/api/students.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import { buildApp } from '@/app';
import { prisma } from '../../setup';

describe('Students API', () => {
  let app: FastifyInstance;
  let authToken: string;

  beforeAll(async () => {
    app = await buildApp();

    // Create test user and get auth token
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/login',
      payload: {
        email: 'admin@test.com',
        password: 'testpassword',
      },
    });

    authToken = response.json().data.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /api/v1/students', () => {
    it('should return paginated students', async () => {
      // Arrange
      await prisma.student.createMany({
        data: [
          { firstName: 'Ahmed', lastName: 'Khan', enrollmentNumber: 'SA20260001', gibbonPersonId: 1 },
          { firstName: 'Fatima', lastName: 'Rahman', enrollmentNumber: 'SA20260002', gibbonPersonId: 2 },
        ],
      });

      // Act
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/students',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Assert
      expect(response.statusCode).toBe(200);
      const body = response.json();
      expect(body.success).toBe(true);
      expect(body.data).toHaveLength(2);
      expect(body.meta.total).toBe(2);
    });

    it('should filter students by search query', async () => {
      // Act
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/students?search=Ahmed',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Assert
      expect(response.statusCode).toBe(200);
      const body = response.json();
      expect(body.data).toHaveLength(1);
      expect(body.data[0].firstName).toBe('Ahmed');
    });
  });

  describe('POST /api/v1/students', () => {
    it('should create a new student', async () => {
      // Act
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/students',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        payload: {
          firstName: 'New',
          lastName: 'Student',
          gibbonPersonId: 3,
          classId: 'class-uuid',
        },
      });

      // Assert
      expect(response.statusCode).toBe(201);
      const body = response.json();
      expect(body.success).toBe(true);
      expect(body.data.firstName).toBe('New');
      expect(body.data.enrollmentNumber).toBeDefined();
    });

    it('should return validation error for invalid data', async () => {
      // Act
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/students',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        payload: {
          firstName: 'A', // Too short
        },
      });

      // Assert
      expect(response.statusCode).toBe(400);
      const body = response.json();
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('VALIDATION_ERROR');
    });
  });
});
```

---

## 14. Deployment and DevOps

### 14.1 Docker Configuration

```dockerfile
# docker/Dockerfile
FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 fastify

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER fastify

EXPOSE 3000

ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["node", "dist/server.js"]
```

### 14.2 Docker Compose

```yaml
# docker/docker-compose.yml
version: '3.8'

services:
  api:
    build:
      context: ..
      dockerfile: docker/Dockerfile
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@postgres:5432/smartacademy
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    healthcheck:
      test: ['CMD', 'wget', '-qO-', 'http://localhost:3000/health']
      interval: 30s
      timeout: 10s
      retries: 3

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: smartacademy
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - '5432:5432'

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    ports:
      - '6379:6379'

volumes:
  postgres_data:
  redis_data:
```

### 14.3 Health Check Endpoint

```typescript
// modules/health/health.routes.ts
import { FastifyInstance } from 'fastify';
import { prisma } from '@/database';
import { redis } from '@/lib/cache';

export async function healthRoutes(app: FastifyInstance) {
  app.get('/health', async (request, reply) => {
    const checks = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {
        database: 'unknown',
        redis: 'unknown',
      },
    };

    try {
      await prisma.$queryRaw`SELECT 1`;
      checks.services.database = 'healthy';
    } catch {
      checks.services.database = 'unhealthy';
      checks.status = 'degraded';
    }

    try {
      await redis.ping();
      checks.services.redis = 'healthy';
    } catch {
      checks.services.redis = 'unhealthy';
      checks.status = 'degraded';
    }

    const statusCode = checks.status === 'healthy' ? 200 : 503;
    return reply.code(statusCode).send(checks);
  });

  app.get('/ready', async (request, reply) => {
    // Check if all dependencies are ready
    try {
      await prisma.$queryRaw`SELECT 1`;
      await redis.ping();
      return reply.code(200).send({ ready: true });
    } catch {
      return reply.code(503).send({ ready: false });
    }
  });
}
```

---

## Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Developer | | _________________ | ________ |
| Technical Lead | | _________________ | ________ |

---

**Document Version:** 1.0
**Last Updated:** January 10, 2026
**Status:** Approved for Implementation

---

*This Backend Technical Specification provides comprehensive guidelines for building the Smart Academy Digital Portal backend services. All backend development must adhere to these specifications to ensure consistency, security, and maintainability.*
