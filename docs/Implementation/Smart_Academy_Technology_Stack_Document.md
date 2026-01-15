# Smart Academy Web Portal - Comprehensive Technology Stack Document

**Document Version:** 1.0
**Date:** January 10, 2026
**Project Name:** Smart Academy Digital Portal
**Implementation Approach:** Gibbon + Moodle + Custom Development (Hybrid)
**Development Environment:** Solo Full-Stack Developer on Linux Desktop
**Document Status:** Approved for Development

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | January 10, 2026 | Technical Team | Initial Technology Stack Document |

**Reference Documents:**
- Smart Academy URD v1.0 (January 8, 2026)
- Smart Academy SRS v1.0 (January 10, 2026)
- Smart Academy Implementation Options Analysis v1.0 (January 10, 2026)
- Gibbon Comprehensive Documentation v1.0
- Moodle Comprehensive Documentation v1.0

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Development Environment Setup](#2-development-environment-setup)
3. [Open Source Platform Stack](#3-open-source-platform-stack)
4. [Custom Development Stack](#4-custom-development-stack)
5. [Database Technologies](#5-database-technologies)
6. [Frontend Technologies](#6-frontend-technologies)
7. [Backend Technologies](#7-backend-technologies)
8. [Mobile Application Stack](#8-mobile-application-stack)
9. [Development Tools & Workflow](#9-development-tools--workflow)
10. [Build & Bundling Tools](#10-build--bundling-tools)
11. [Testing Technologies](#11-testing-technologies)
12. [DevOps & Infrastructure](#12-devops--infrastructure)
13. [External Integrations](#13-external-integrations)
14. [Security Stack](#14-security-stack)
15. [Performance & Caching](#15-performance--caching)
16. [URD/SRS Compliance Matrix](#16-urdsrs-compliance-matrix)
17. [Solo Developer Workflow](#17-solo-developer-workflow)
18. [Technology Version Matrix](#18-technology-version-matrix)
19. [Appendices](#19-appendices)

---

## 1. Executive Summary

### 1.1 Overview

This document defines the complete technology stack for implementing the Smart Academy Digital Portal using the approved hybrid approach: **Gibbon + Moodle + Custom Development**. The stack is specifically optimized for a **solo full-stack developer** working on a **Linux desktop** environment using **VSCode IDE** with a local development server setup.

### 1.2 Stack Philosophy

The technology choices are guided by:

1. **Solo Developer Productivity:** Tools that maximize individual developer efficiency
2. **Modern Standards:** Using 2025-2026 best practices and stable technologies
3. **URD/SRS Compliance:** 100% alignment with project requirements
4. **Cost Efficiency:** Open-source solutions with minimal licensing costs
5. **Scalability:** Architecture that supports growth from 500 to 2,000+ students
6. **Maintainability:** Clear separation of concerns and documentation

### 1.3 High-Level Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     SMART ACADEMY TECHNOLOGY STACK                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                         CLIENT LAYER                                    │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │ │
│  │  │Public Website│  │Admin Dashboard│  │ Mobile Apps  │  │  Gibbon/   │ │ │
│  │  │   Next.js    │  │React + Vite  │  │ React Native │  │  Moodle UI │ │ │
│  │  │   15.x       │  │   + HMR      │  │   + Expo     │  │    PHP     │ │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └────────────┘ │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                      │                                       │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                         API/SERVICE LAYER                               │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐ │ │
│  │  │              Node.js 22 LTS + Fastify 5.x                        │ │ │
│  │  │         TypeScript 5.x + Zod Validation + JWT Auth               │ │ │
│  │  └──────────────────────────────────────────────────────────────────┘ │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────────┐ │ │
│  │  │   Gibbon     │  │    Moodle    │  │     Custom Services          │ │ │
│  │  │  PHP 8.3+    │  │   PHP 8.3+   │  │  Islamic | Payment | Admin   │ │ │
│  │  └──────────────┘  └──────────────┘  └──────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                      │                                       │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                          DATA LAYER                                     │ │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────────────┐ │ │
│  │  │  MySQL 8   │  │ PostgreSQL │  │   Redis    │  │    MinIO/S3      │ │ │
│  │  │ (Gibbon/   │  │    16+     │  │    7+      │  │  File Storage    │ │ │
│  │  │  Moodle)   │  │ (Custom)   │  │  (Cache)   │  │                  │ │ │
│  │  └────────────┘  └────────────┘  └────────────┘  └──────────────────┘ │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                    EXTERNAL INTEGRATIONS                                │ │
│  │  [bKash] [Nagad] [SSLCommerz] [SMS Gateway] [SendGrid] [BigBlueButton] │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.4 Technology Category Summary

| Category | Primary Technology | Purpose |
|----------|-------------------|---------|
| **Open Source SMS** | Gibbon v30+ | Student Management System |
| **Open Source LMS** | Moodle 4.5+ | Learning Management System |
| **Frontend Framework** | Next.js 15 + React 19 | Public Website, Admin Dashboard |
| **Backend Runtime** | Node.js 22 LTS | Custom APIs and Services |
| **API Framework** | Fastify 5.x | High-performance REST APIs |
| **Mobile Framework** | React Native + Expo 52+ | iOS and Android Apps |
| **Primary Database** | MySQL 8.0+ | Gibbon/Moodle Data |
| **Custom Database** | PostgreSQL 16+ | Custom Module Data |
| **Cache Layer** | Redis 7+ | Session, Cache, Queue |
| **Build Tool** | Vite 6.x | Fast HMR Development |
| **Language** | TypeScript 5.x | Type-safe Development |
| **Styling** | Tailwind CSS 4.x | Utility-first CSS |
| **IDE** | VSCode | Primary Development IDE |
| **OS** | Linux (Ubuntu/Fedora) | Development Environment |

---

## 2. Development Environment Setup

### 2.1 Operating System Requirements

| Component | Specification | Notes |
|-----------|---------------|-------|
| **OS** | Linux (Ubuntu 24.04 LTS / Fedora 40+) | Primary development environment |
| **Kernel** | 5.15+ | For optimal container support |
| **Architecture** | x86_64 (AMD64) | Standard desktop architecture |
| **RAM** | 16GB minimum, 32GB recommended | For running all services locally |
| **Storage** | 256GB SSD minimum | For code, databases, and containers |
| **CPU** | 4+ cores, 3.0GHz+ | For compilation and build tasks |

### 2.2 VSCode IDE Setup

#### Essential Extensions

```json
{
  "recommendations": [
    // Core Development
    "ms-vscode.vscode-typescript-next",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",

    // React/Next.js
    "dsznajder.es7-react-js-snippets",
    "formulahendry.auto-rename-tag",
    "steoates.autoimport",

    // PHP (Gibbon/Moodle)
    "bmewburn.vscode-intelephense-client",
    "xdebug.php-debug",
    "neilbrayfield.php-docblocker",

    // Database
    "mtxr.sqltools",
    "mtxr.sqltools-driver-mysql",
    "mtxr.sqltools-driver-pg",
    "cweijan.vscode-redis-client",

    // Git & Collaboration
    "eamodio.gitlens",
    "github.vscode-pull-request-github",

    // Docker & DevOps
    "ms-azuretools.vscode-docker",
    "ms-vscode-remote.remote-containers",

    // API Development
    "humao.rest-client",
    "rangav.vscode-thunder-client",

    // Productivity
    "christian-kohler.path-intellisense",
    "usernamehw.errorlens",
    "gruntfuggly.todo-tree",
    "wayou.vscode-todo-highlight",

    // Markdown
    "yzhang.markdown-all-in-one",
    "bierner.markdown-preview-github-styles"
  ]
}
```

#### VSCode Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  }
}
```

### 2.3 Development Server Stack

```
Development Environment
├── Node.js 22 LTS (via nvm)
├── PHP 8.3+ (via apt/dnf)
├── MySQL 8.0+ (Docker container)
├── PostgreSQL 16+ (Docker container)
├── Redis 7+ (Docker container)
├── Nginx (Local reverse proxy)
└── Docker & Docker Compose
```

#### Local Services docker-compose.yml

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: smart_academy_mysql
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: gibbon
      MYSQL_USER: gibbon_user
      MYSQL_PASSWORD: gibbon_password
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./init-scripts/mysql:/docker-entrypoint-initdb.d
    command: --default-authentication-plugin=mysql_native_password

  postgres:
    image: postgres:16-alpine
    container_name: smart_academy_postgres
    environment:
      POSTGRES_DB: smart_academy
      POSTGRES_USER: smart_user
      POSTGRES_PASSWORD: smart_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-scripts/postgres:/docker-entrypoint-initdb.d

  redis:
    image: redis:7-alpine
    container_name: smart_academy_redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes

  adminer:
    image: adminer
    container_name: smart_academy_adminer
    ports:
      - "8080:8080"
    depends_on:
      - mysql
      - postgres

volumes:
  mysql_data:
  postgres_data:
  redis_data:
```

### 2.4 Node.js Environment Setup

```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Install Node.js 22 LTS
nvm install 22
nvm use 22
nvm alias default 22

# Verify installation
node --version  # v22.x.x
npm --version   # 10.x.x

# Enable corepack for pnpm
corepack enable
corepack prepare pnpm@latest --activate

# Verify pnpm
pnpm --version  # 9.x.x
```

### 2.5 PHP Environment Setup

```bash
# Ubuntu 24.04
sudo apt update
sudo apt install php8.3 php8.3-fpm php8.3-mysql php8.3-pgsql \
    php8.3-xml php8.3-mbstring php8.3-curl php8.3-zip \
    php8.3-gd php8.3-intl php8.3-soap php8.3-redis \
    composer

# Verify installation
php --version   # PHP 8.3.x
composer --version
```

---

## 3. Open Source Platform Stack

### 3.1 Gibbon Student Management System

| Component | Specification | URD Coverage |
|-----------|---------------|--------------|
| **Platform** | Gibbon v30.0.00+ | FR-201 to FR-242, FR-501 to FR-542 |
| **License** | GNU GPL v3 | No licensing costs |
| **Language** | PHP 8.3+ | Standard web hosting compatible |
| **Database** | MySQL 8.0+ | Shared with Moodle |
| **Web Server** | Apache 2.4+ / Nginx | Flexible deployment |

#### Gibbon Module Configuration

| Module | Status | Customization | Purpose |
|--------|--------|---------------|---------|
| User Admin | Enabled | Low | User account management |
| Students | Enabled | Medium | Student records and profiles |
| Staff | Enabled | Low | Teacher/staff management |
| Timetable | Enabled | Medium | Class scheduling |
| Attendance | Enabled | Medium | Attendance tracking |
| Markbook | Enabled | Medium | Grade management |
| Planner | Enabled | Low | Lesson planning |
| Activities | Enabled | Low | Extracurricular activities |
| Finance | Enabled | High | Fee management (basic) |
| Messenger | Enabled | Medium | Communication |
| Reports | Enabled | High | Custom reports |

#### Gibbon Custom Extensions

```sql
-- Custom tables extending Gibbon for Smart Academy

-- Islamic Education Tracking
CREATE TABLE gibbonIslamicProgress (
    gibbonIslamicProgressID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    gibbonPersonID INT UNSIGNED NOT NULL,
    progressType ENUM('quran', 'hadith', 'tajweed', 'prayer') NOT NULL,
    surahNumber INT,
    juzNumber INT,
    verseFrom INT,
    verseTo INT,
    completionDate DATE,
    assessmentScore DECIMAL(5,2),
    teacherComment TEXT,
    gibbonPersonIDAssessor INT UNSIGNED,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (gibbonPersonID) REFERENCES gibbonPerson(gibbonPersonID)
);

-- Extended Payment Tracking
CREATE TABLE gibbonFeePaymentExtended (
    paymentID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    gibbonFinanceInvoiceID INT UNSIGNED NOT NULL,
    paymentGateway ENUM('bkash', 'nagad', 'sslcommerz', 'bank', 'cash') NOT NULL,
    transactionID VARCHAR(100),
    gatewayResponse JSON,
    paymentStatus ENUM('pending', 'completed', 'failed', 'refunded') NOT NULL,
    paidAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transportation Management
CREATE TABLE gibbonTransportRoute (
    routeID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    routeName VARCHAR(100) NOT NULL,
    driverName VARCHAR(100),
    driverPhone VARCHAR(20),
    vehicleNumber VARCHAR(20),
    isActive BOOLEAN DEFAULT TRUE
);
```

### 3.2 Moodle Learning Management System

| Component | Specification | URD Coverage |
|-----------|---------------|--------------|
| **Platform** | Moodle 4.5+ LTS | FR-301 to FR-342 |
| **License** | GNU GPL v3 | No licensing costs |
| **Language** | PHP 8.3+ | Same as Gibbon |
| **Database** | MySQL 8.0+ | Shared with Gibbon |
| **Plugins** | 20+ selected plugins | Extended functionality |

#### Required Moodle Plugins

| Plugin | Type | Purpose | Source |
|--------|------|---------|--------|
| BigBlueButton | Activity | Virtual classroom | Moodle Core (4.0+) |
| H5P | Activity | Interactive content | Moodle Core |
| SCORM | Activity | Standardized content | Moodle Core |
| Attendance | Activity | Class attendance | Moodle Plugins |
| Custom Certificate | Activity | Certificate generation | Moodle Plugins |
| Level Up! | Block | Gamification | Moodle Plugins |
| Completion Progress | Block | Progress tracking | Moodle Plugins |
| Tiles Format | Course Format | Visual course layout | Moodle Plugins |

#### Moodle Theme Configuration

```php
// Smart Academy Moodle Theme Configuration
$themeConfig = [
    'parent' => 'boost',
    'name' => 'smartacademy',
    'colors' => [
        'primary' => '#0F9D58',      // Islamic green
        'secondary' => '#1976D2',    // Academic blue
        'success' => '#34A853',
        'warning' => '#FBBC04',
        'danger' => '#EA4335',
    ],
    'fonts' => [
        'primary' => 'Inter, sans-serif',
        'bengali' => 'Kalpurush, SolaimanLipi, sans-serif',
    ],
];
```

### 3.3 Gibbon-Moodle Integration

```
┌─────────────────────────────────────────────────────────────────┐
│                   SSO INTEGRATION FLOW                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐         ┌──────────┐         ┌──────────┐        │
│  │  Gibbon  │◄───────►│   SSO    │◄───────►│  Moodle  │        │
│  │   SMS    │         │ Service  │         │   LMS    │        │
│  └────┬─────┘         └────┬─────┘         └────┬─────┘        │
│       │                    │                    │               │
│       │                    │                    │               │
│  ┌────┴────────────────────┴────────────────────┴────┐         │
│  │              SHARED MYSQL DATABASE                 │         │
│  │  ┌─────────────┐            ┌─────────────────┐   │         │
│  │  │ gibbon_*    │            │ mdl_*           │   │         │
│  │  │ tables      │◄──────────►│ tables          │   │         │
│  │  └─────────────┘   Views    └─────────────────┘   │         │
│  └────────────────────────────────────────────────────┘         │
│                                                                  │
│  Data Flow:                                                      │
│  • Users sync: Gibbon → Moodle (via database views)             │
│  • Enrollments: Gibbon classes → Moodle courses                 │
│  • Grades: Moodle gradebook → Gibbon markbook (optional)        │
│  • SSO: JWT-based unified authentication                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Custom Development Stack

### 4.1 Language: TypeScript 5.x

| Aspect | Specification |
|--------|---------------|
| **Version** | TypeScript 5.7+ |
| **Target** | ES2022 |
| **Module** | ESNext |
| **Strict Mode** | Enabled |
| **Purpose** | Type safety, better DX, fewer runtime errors |

#### tsconfig.json (Base)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "allowSyntheticDefaultImports": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 4.2 Package Manager: pnpm

| Feature | Benefit |
|---------|---------|
| **Disk Efficiency** | Content-addressable storage saves disk space |
| **Speed** | 2x faster than npm for large projects |
| **Strictness** | Prevents phantom dependencies |
| **Monorepo Support** | Built-in workspace support |
| **Version** | 9.x (latest) |

#### pnpm Workspace Configuration

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

#### Project Structure (Monorepo)

```
smart-academy/
├── apps/
│   ├── web/                    # Next.js Public Website
│   ├── admin/                  # React Admin Dashboard
│   ├── mobile/                 # React Native Mobile App
│   └── api/                    # Fastify API Server
├── packages/
│   ├── ui/                     # Shared UI Components
│   ├── database/               # Prisma Schema & Client
│   ├── types/                  # Shared TypeScript Types
│   ├── utils/                  # Shared Utilities
│   └── islamic/                # Islamic Module Logic
├── docker/
│   ├── gibbon/
│   ├── moodle/
│   └── services/
├── docs/
├── scripts/
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── docker-compose.yml
```

---

## 5. Database Technologies

### 5.1 MySQL 8.0+ (Gibbon & Moodle)

| Aspect | Specification |
|--------|---------------|
| **Version** | MySQL 8.0+ |
| **Character Set** | utf8mb4 |
| **Collation** | utf8mb4_unicode_ci |
| **Storage Engine** | InnoDB |
| **Purpose** | Gibbon SMS, Moodle LMS data |

#### MySQL Configuration

```ini
# my.cnf optimizations for Smart Academy
[mysqld]
# Character set
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

# InnoDB settings
innodb_buffer_pool_size = 2G
innodb_log_file_size = 256M
innodb_flush_log_at_trx_commit = 2
innodb_flush_method = O_DIRECT

# Performance
max_connections = 200
query_cache_type = 0
thread_cache_size = 16

# Timeouts
wait_timeout = 600
interactive_timeout = 600
```

### 5.2 PostgreSQL 16+ (Custom Modules)

| Aspect | Specification |
|--------|---------------|
| **Version** | PostgreSQL 16+ |
| **Purpose** | Custom module data, analytics |
| **Extensions** | uuid-ossp, pg_trgm, pgcrypto |
| **ORM** | Prisma 6.x |

#### PostgreSQL Features Used

- **JSONB** - Flexible schema for Islamic education tracking
- **Full-text Search** - Bengali text search support
- **Partitioning** - For large tables (logs, analytics)
- **Row-Level Security** - Multi-tenant isolation

#### Prisma Schema (Excerpt)

```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Student {
  id                String   @id @default(uuid())
  gibbonPersonId    Int      @unique
  userId            String   @unique
  quranProgress     QuranProgress[]
  hadithProgress    HadithProgress[]
  prayerAttendance  PrayerAttendance[]
  feePayments       FeePayment[]
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@index([gibbonPersonId])
}

model QuranProgress {
  id                String   @id @default(uuid())
  studentId         String
  student           Student  @relation(fields: [studentId], references: [id])
  surahNumber       Int
  surahNameArabic   String
  surahNameEnglish  String
  juzNumber         Int?
  verseStart        Int
  verseEnd          Int
  memorizationStatus MemorizationStatus @default(NOT_STARTED)
  revisionCount     Int      @default(0)
  lastRevisionDate  DateTime?
  assessmentScore   Float?
  teacherComments   String?
  assessedBy        String?
  assessedAt        DateTime?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@index([studentId, surahNumber])
}

enum MemorizationStatus {
  NOT_STARTED
  IN_PROGRESS
  MEMORIZED
  MASTERED
}

model FeePayment {
  id                String   @id @default(uuid())
  studentId         String
  student           Student  @relation(fields: [studentId], references: [id])
  amount            Decimal  @db.Decimal(10, 2)
  currency          String   @default("BDT")
  paymentGateway    PaymentGateway
  gatewayTransactionId String?
  gatewayResponse   Json?
  status            PaymentStatus @default(PENDING)
  feeType           String
  paymentMonth      String?
  initiatedAt       DateTime @default(now())
  completedAt       DateTime?
  receiptNumber     String?  @unique

  @@index([studentId, status])
  @@index([initiatedAt])
}

enum PaymentGateway {
  BKASH
  NAGAD
  SSLCOMMERZ
  BANK
  CASH
}

enum PaymentStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  REFUNDED
  CANCELLED
}
```

### 5.3 Redis 7+ (Cache & Sessions)

| Aspect | Specification |
|--------|---------------|
| **Version** | Redis 7+ |
| **Purpose** | Caching, sessions, message queue |
| **Persistence** | AOF enabled |
| **Eviction Policy** | allkeys-lru |

#### Redis Use Cases

| Use Case | TTL | Data Type |
|----------|-----|-----------|
| Session Storage | 24 hours | Hash |
| API Response Cache | 5-60 minutes | String |
| Rate Limiting | 1 hour | String/Sorted Set |
| Real-time Notifications | 7 days | List/Pub-Sub |
| Prayer Times Cache | 24 hours | String |
| User Preferences | 30 days | Hash |

#### Redis Configuration

```javascript
// redis.config.ts
import { createClient } from 'redis';

export const redisConfig = {
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
  password: process.env.REDIS_PASSWORD,
  database: 0,
};

export const createRedisClient = () => {
  return createClient(redisConfig);
};
```

---

## 6. Frontend Technologies

### 6.1 React 19 + Next.js 15

| Component | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.x | UI Library |
| **Next.js** | 15.x | Full-stack Framework |
| **React DOM** | 19.x | DOM Rendering |

#### Next.js Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,  // Partial Pre-rendering
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.smartacademy.edu.bd',
      },
    ],
  },
  i18n: {
    locales: ['en', 'bn'],
    defaultLocale: 'en',
  },
  // Enable standalone output for Docker
  output: 'standalone',
};

export default nextConfig;
```

### 6.2 Styling: Tailwind CSS 4.x + Shadcn/ui

| Component | Version | Purpose |
|-----------|---------|---------|
| **Tailwind CSS** | 4.x | Utility-first CSS |
| **Shadcn/ui** | Latest | Pre-built components |
| **tailwind-merge** | Latest | Class merging utility |
| **clsx** | Latest | Conditional classes |
| **cva** | Latest | Class variance authority |

#### Tailwind Configuration

```javascript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Smart Academy Brand Colors
        primary: {
          DEFAULT: '#0F9D58',  // Islamic Green
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#0F9D58',
          600: '#0D8A4D',
          700: '#0B7742',
          800: '#096437',
          900: '#07512C',
        },
        secondary: {
          DEFAULT: '#1976D2',  // Academic Blue
          50: '#E3F2FD',
          100: '#BBDEFB',
          500: '#1976D2',
          700: '#1565C0',
          900: '#0D47A1',
        },
        accent: {
          DEFAULT: '#FFB300',  // Gold
          500: '#FFB300',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        bengali: ['Kalpurush', 'SolaimanLipi', 'sans-serif'],
        arabic: ['Amiri', 'serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};

export default config;
```

### 6.3 State Management

| Library | Version | Purpose |
|---------|---------|---------|
| **Zustand** | 5.x | Global state management |
| **TanStack Query** | 5.x | Server state / Data fetching |
| **React Hook Form** | 7.x | Form state management |
| **Zod** | 3.x | Schema validation |

#### Zustand Store Example

```typescript
// stores/auth.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'parent' | 'teacher' | 'admin';
  gibbonPersonId?: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user, token) =>
        set({ user, token, isAuthenticated: true }),
      logout: () =>
        set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
```

### 6.4 Data Visualization

| Library | Version | Purpose |
|---------|---------|---------|
| **Recharts** | 2.x | Charts and graphs |
| **TanStack Table** | 8.x | Data tables |
| **date-fns** | 3.x | Date manipulation |
| **date-fns-hijri** | Latest | Hijri calendar support |

---

## 7. Backend Technologies

### 7.1 Node.js 22 LTS Runtime

| Aspect | Specification |
|--------|---------------|
| **Version** | Node.js 22 LTS |
| **Features Used** | Native ESM, fetch API, Web Streams |
| **Process Manager** | PM2 5.x |

### 7.2 Fastify 5.x Framework

| Aspect | Specification |
|--------|---------------|
| **Version** | Fastify 5.x |
| **Why Fastify** | 2x faster than Express, TypeScript-first |
| **Plugins** | @fastify/cors, @fastify/jwt, @fastify/swagger |

#### Fastify Server Setup

```typescript
// src/server.ts
import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

const server = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  },
});

// Register plugins
await server.register(cors, {
  origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
});

await server.register(jwt, {
  secret: process.env.JWT_SECRET!,
  sign: {
    expiresIn: '24h',
  },
});

await server.register(swagger, {
  openapi: {
    info: {
      title: 'Smart Academy API',
      version: '1.0.0',
    },
    servers: [
      { url: 'http://localhost:4000', description: 'Development' },
      { url: 'https://api.smartacademy.edu.bd', description: 'Production' },
    ],
  },
});

await server.register(swaggerUi, {
  routePrefix: '/docs',
});

// Health check
server.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

// Start server
const start = async () => {
  try {
    await server.listen({ port: 4000, host: '0.0.0.0' });
    console.log('Server running at http://localhost:4000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
```

### 7.3 ORM: Prisma 6.x

| Aspect | Specification |
|--------|---------------|
| **Version** | Prisma 6.x |
| **Database** | PostgreSQL 16+ |
| **Features** | Type-safe queries, migrations, seeding |

### 7.4 Validation: Zod 3.x

```typescript
// schemas/payment.schema.ts
import { z } from 'zod';

export const paymentInitiateSchema = z.object({
  studentId: z.string().uuid(),
  amount: z.number().positive().max(100000),
  gateway: z.enum(['bkash', 'nagad', 'sslcommerz']),
  feeType: z.string().min(1).max(50),
  paymentMonth: z.string().optional(),
});

export type PaymentInitiateInput = z.infer<typeof paymentInitiateSchema>;

export const paymentCallbackSchema = z.object({
  transactionId: z.string(),
  status: z.enum(['success', 'failed', 'cancelled']),
  gatewayResponse: z.record(z.unknown()),
});
```

---

## 8. Mobile Application Stack

### 8.1 React Native + Expo

| Component | Version | Purpose |
|-----------|---------|---------|
| **React Native** | 0.76+ | Cross-platform mobile framework |
| **Expo** | SDK 52+ | Development toolchain |
| **Expo Router** | 4.x | File-based routing |

#### Expo Configuration

```json
// app.json
{
  "expo": {
    "name": "Smart Academy",
    "slug": "smart-academy",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#0F9D58"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "bd.edu.smartacademy.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0F9D58"
      },
      "package": "bd.edu.smartacademy.app"
    },
    "plugins": [
      "expo-router",
      "expo-localization",
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#0F9D58"
        }
      ],
      [
        "expo-local-authentication",
        {
          "faceIDPermission": "Allow Smart Academy to use Face ID."
        }
      ]
    ],
    "scheme": "smartacademy"
  }
}
```

### 8.2 Mobile Navigation

```typescript
// app/_layout.tsx
import { Tabs } from 'expo-router';
import { Home, Book, Moon, CreditCard, Menu } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#0F9D58' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="academic"
        options={{
          title: 'Academic',
          tabBarIcon: ({ color }) => <Book size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="islamic"
        options={{
          title: 'Islamic',
          tabBarIcon: ({ color }) => <Moon size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="fees"
        options={{
          title: 'Fees',
          tabBarIcon: ({ color }) => <CreditCard size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color }) => <Menu size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
```

### 8.3 Mobile Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| **expo-router** | 4.x | File-based navigation |
| **expo-notifications** | Latest | Push notifications |
| **expo-local-authentication** | Latest | Biometric auth |
| **expo-secure-store** | Latest | Secure storage |
| **@tanstack/react-query** | 5.x | Data fetching |
| **zustand** | 5.x | State management |
| **react-native-reanimated** | 3.x | Animations |
| **nativewind** | 4.x | Tailwind for RN |

---

## 9. Development Tools & Workflow

### 9.1 Version Control

| Tool | Version | Purpose |
|------|---------|---------|
| **Git** | 2.43+ | Version control |
| **GitHub** | - | Remote repository |
| **Conventional Commits** | - | Commit message standard |
| **Husky** | 9.x | Git hooks |
| **lint-staged** | 15.x | Pre-commit linting |
| **commitlint** | 19.x | Commit message linting |

#### Git Hooks Configuration

```json
// package.json
{
  "scripts": {
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,css}": [
      "prettier --write"
    ]
  }
}
```

### 9.2 Code Quality

| Tool | Version | Purpose |
|------|---------|---------|
| **ESLint** | 9.x | Linting (flat config) |
| **Prettier** | 3.x | Code formatting |
| **TypeScript ESLint** | 8.x | TypeScript linting |
| **eslint-plugin-react** | Latest | React linting |
| **eslint-plugin-tailwindcss** | Latest | Tailwind linting |

#### ESLint Configuration

```javascript
// eslint.config.js
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tailwindPlugin from 'eslint-plugin-tailwindcss';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      tailwindcss: tailwindPlugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  }
);
```

### 9.3 API Development

| Tool | Purpose |
|------|---------|
| **Thunder Client** | VSCode REST client |
| **Swagger UI** | API documentation |
| **Postman** | API testing (optional) |
| **HTTPie** | CLI HTTP client |

---

## 10. Build & Bundling Tools

### 10.1 Vite 6.x

| Aspect | Specification |
|--------|---------------|
| **Version** | Vite 6.x |
| **Purpose** | Fast HMR development server |
| **Build Target** | ES2022 |
| **Plugins** | @vitejs/plugin-react |

#### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3001,
    host: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3001,
      overlay: true,
    },
    watch: {
      usePolling: false,
      ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
    },
  },
  build: {
    target: 'es2022',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          charts: ['recharts'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'zustand', '@tanstack/react-query'],
  },
});
```

### 10.2 Turbo (Monorepo Build)

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "typecheck": {
      "dependsOn": ["^typecheck"]
    },
    "test": {
      "dependsOn": ["^build"]
    }
  }
}
```

---

## 11. Testing Technologies

### 11.1 Testing Stack

| Type | Tool | Version | Purpose |
|------|------|---------|---------|
| **Unit Testing** | Vitest | 2.x | Fast unit tests |
| **Component Testing** | React Testing Library | 16.x | React component tests |
| **E2E Testing** | Playwright | 1.49+ | End-to-end tests |
| **API Testing** | Supertest | 7.x | HTTP assertions |
| **Mobile Testing** | Detox | 20.x | React Native E2E |

### 11.2 Vitest Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### 11.3 Test Coverage Requirements

| Module | Minimum Coverage |
|--------|-----------------|
| **Core Utilities** | 90% |
| **API Endpoints** | 85% |
| **React Components** | 80% |
| **Business Logic** | 90% |
| **Overall** | 80% |

---

## 12. DevOps & Infrastructure

### 12.1 Containerization

| Tool | Version | Purpose |
|------|---------|---------|
| **Docker** | 25+ | Containerization |
| **Docker Compose** | 2.24+ | Multi-container orchestration |
| **Docker Desktop** | Latest | Local container management |

### 12.2 CI/CD

| Tool | Purpose |
|------|---------|
| **GitHub Actions** | CI/CD pipeline |
| **Docker Hub** | Container registry |

#### GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck

  test:
    runs-on: ubuntu-latest
    needs: lint-and-typecheck
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:coverage

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
```

### 12.3 Production Infrastructure

```
Production Architecture
├── Cloudflare (CDN + WAF + DDoS)
├── Load Balancer (Nginx)
├── Web Servers (2x)
│   ├── Gibbon (PHP-FPM)
│   ├── Moodle (PHP-FPM)
│   └── Next.js (PM2)
├── API Server
│   └── Node.js Services (PM2)
├── Database Cluster
│   ├── MySQL Primary + Replica
│   └── PostgreSQL Primary + Replica
├── Cache Layer
│   └── Redis Cluster
└── Storage
    └── MinIO / S3 Compatible
```

---

## 13. External Integrations

### 13.1 Payment Gateways (Bangladesh)

| Gateway | SDK/Package | Purpose |
|---------|-------------|---------|
| **bKash** | bkash-payment-gateway | Mobile money payments |
| **Nagad** | Custom integration | Mobile money payments |
| **SSLCommerz** | sslcommerz-lts | Card/bank payments |

#### SSLCommerz Integration Example

```typescript
// services/payment/sslcommerz.ts
import SSLCommerzPayment from 'sslcommerz-lts';

const sslcz = new SSLCommerzPayment(
  process.env.SSL_STORE_ID!,
  process.env.SSL_STORE_PASSWORD!,
  process.env.NODE_ENV !== 'production'
);

export async function initiatePayment(data: PaymentData) {
  const paymentData = {
    total_amount: data.amount,
    currency: 'BDT',
    tran_id: `SA_${Date.now()}`,
    success_url: `${process.env.APP_URL}/api/payment/ssl/success`,
    fail_url: `${process.env.APP_URL}/api/payment/ssl/fail`,
    cancel_url: `${process.env.APP_URL}/api/payment/ssl/cancel`,
    ipn_url: `${process.env.APP_URL}/api/payment/ssl/ipn`,
    shipping_method: 'NO',
    product_name: data.feeType,
    product_category: 'Education',
    product_profile: 'general',
    cus_name: data.studentName,
    cus_email: data.parentEmail,
    cus_phone: data.parentPhone,
    cus_add1: 'Smart Academy',
    cus_city: 'Lakshmipur',
    cus_country: 'Bangladesh',
  };

  const response = await sslcz.init(paymentData);
  return response;
}
```

### 13.2 SMS Gateway (Bangladesh)

| Provider | Purpose |
|----------|---------|
| **BulkSMSBD** | Primary SMS provider |
| **SSL Wireless** | Backup SMS provider |

```typescript
// services/sms/bulksmsbd.ts
export async function sendSMS(phone: string, message: string) {
  const response = await fetch('https://bulksmsbd.net/api/smsapi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: process.env.BULKSMS_API_KEY,
      senderid: 'SMARTACADEMY',
      number: phone,
      message: message,
      type: 'unicode', // For Bengali
    }),
  });
  return response.json();
}
```

### 13.3 Email Service

| Service | Purpose |
|---------|---------|
| **SendGrid** | Transactional emails |
| **Resend** | Alternative (Modern API) |

### 13.4 Video Conferencing

| Service | Purpose |
|---------|---------|
| **BigBlueButton** | Integrated in Moodle |
| **Zoom** | Optional integration |

### 13.5 Prayer Times API

| Service | Purpose |
|---------|---------|
| **Aladhan API** | Prayer times calculation |
| **IslamicFinder API** | Alternative source |

```typescript
// services/islamic/prayer-times.ts
export async function getPrayerTimes(date: Date, location: Location) {
  const response = await fetch(
    `https://api.aladhan.com/v1/timings/${formatDate(date)}` +
    `?latitude=${location.lat}&longitude=${location.lng}` +
    `&method=2&school=1` // Hanafi method
  );
  return response.json();
}
```

---

## 14. Security Stack

### 14.1 Authentication & Authorization

| Component | Technology |
|-----------|------------|
| **JWT Tokens** | Access & Refresh tokens |
| **bcrypt** | Password hashing |
| **Argon2** | Alternative hashing |
| **RBAC** | Role-based access control |
| **2FA** | TOTP via speakeasy |

### 14.2 Security Headers

```typescript
// middleware/security.ts
export const securityHeaders = {
  'Content-Security-Policy':
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' data:; " +
    "connect-src 'self' https:;",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};
```

### 14.3 Data Protection

| Component | Technology |
|-----------|------------|
| **Encryption at Rest** | AES-256 |
| **Encryption in Transit** | TLS 1.3 |
| **Input Validation** | Zod schemas |
| **SQL Injection** | Parameterized queries (Prisma) |
| **XSS Prevention** | React auto-escaping + CSP |
| **CSRF Protection** | SameSite cookies + tokens |

---

## 15. Performance & Caching

### 15.1 Caching Strategy

| Layer | Technology | TTL |
|-------|------------|-----|
| **Browser** | Cache-Control headers | Varies |
| **CDN** | Cloudflare | 1 hour |
| **Application** | Redis | 5-60 min |
| **Database** | Query cache | Automatic |

### 15.2 Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| **First Contentful Paint** | < 1.5s | Lighthouse |
| **Largest Contentful Paint** | < 2.5s | Lighthouse |
| **Time to Interactive** | < 3.5s | Lighthouse |
| **API Response (p95)** | < 200ms | APM |
| **Page Load (3G)** | < 5s | WebPageTest |

### 15.3 Optimization Techniques

- **Image Optimization:** Next.js Image component, WebP format
- **Code Splitting:** Dynamic imports, route-based splitting
- **Bundle Analysis:** Rollup visualizer
- **Database Queries:** Query optimization, indexing
- **Caching:** Redis for frequent queries
- **CDN:** Static asset caching via Cloudflare

---

## 16. URD/SRS Compliance Matrix

### 16.1 Functional Requirements Coverage

| URD Section | FR Range | Technology | Coverage |
|-------------|----------|------------|----------|
| Public Website | FR-101 to FR-167 | Next.js 15 | 100% |
| Student Management | FR-201 to FR-242 | Gibbon + Custom | 100% |
| Islamic Education | FR-227 to FR-234 | Custom Node.js | 100% |
| Learning Management | FR-301 to FR-342 | Moodle 4.5 | 100% |
| Parent Portal | FR-401 to FR-439 | React Native + Expo | 100% |
| Mobile App | FR-432 to FR-439 | React Native + Expo | 100% |
| Teacher Portal | FR-501 to FR-542 | Gibbon + Custom | 100% |
| Admin Dashboard | FR-601 to FR-652 | React + Vite | 100% |
| Communication | FR-701 to FR-732 | Custom + Gibbon | 100% |
| Calendar & Events | FR-801 to FR-816 | Gibbon + Custom | 100% |
| Islamic Features | FR-901 to FR-914 | Custom Node.js | 100% |
| Transportation | FR-1001 to FR-1009 | Custom | 100% |
| Alumni | FR-1101 to FR-1109 | Custom | 100% |

### 16.2 Non-Functional Requirements Coverage

| NFR Category | Requirement | Technology Solution |
|--------------|-------------|---------------------|
| Performance | < 3s page load | Vite HMR, Next.js SSR, CDN |
| Scalability | 2,000 concurrent users | Horizontal scaling, Redis cache |
| Availability | 99.5% uptime | Redundant infrastructure |
| Security | OWASP compliance | JWT, HTTPS, CSP headers |
| Accessibility | WCAG 2.1 AA | Moodle certified, Radix UI |
| Localization | English, Bengali, Arabic | next-intl, i18n |
| Mobile | iOS & Android apps | React Native + Expo |
| Offline | Mobile offline mode | expo-sqlite, AsyncStorage |

### 16.3 Technical Requirements Alignment

| SRS Requirement | Stack Specification | Compliance |
|-----------------|---------------------|------------|
| PHP 8.2+ | PHP 8.3 | ✅ Exceeds |
| MySQL 8.0+ | MySQL 8.0 | ✅ Meets |
| Node.js 20 LTS | Node.js 22 LTS | ✅ Exceeds |
| React 18+ | React 19 | ✅ Exceeds |
| Next.js 14+ | Next.js 15 | ✅ Exceeds |
| React Native 0.73+ | React Native 0.76+ | ✅ Exceeds |
| Redis 7+ | Redis 7+ | ✅ Meets |
| PostgreSQL 15+ | PostgreSQL 16+ | ✅ Exceeds |

---

## 17. Solo Developer Workflow

### 17.1 Daily Development Routine

```bash
# Start of day
cd ~/projects/smart-academy
docker compose up -d           # Start databases
pnpm dev                       # Start all apps with Turbo

# Development
# Work in VSCode with HMR enabled
# Changes reflect instantly

# End of day
docker compose stop            # Stop containers
git add . && git commit -m "feat: ..." && git push
```

### 17.2 Local Development URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Public Website | http://localhost:3000 | Next.js public site |
| Admin Dashboard | http://localhost:3001 | React admin panel |
| API Server | http://localhost:4000 | Fastify API |
| API Docs | http://localhost:4000/docs | Swagger UI |
| Gibbon | http://localhost:8081 | SMS |
| Moodle | http://localhost:8082 | LMS |
| Adminer | http://localhost:8080 | Database UI |
| Redis Commander | http://localhost:8083 | Redis UI |

### 17.3 Productivity Tools

| Tool | Purpose |
|------|---------|
| **Turbo** | Monorepo task runner |
| **tsx** | TypeScript execution |
| **nodemon** | Auto-restart on changes |
| **concurrently** | Run multiple processes |
| **dotenv-cli** | Environment management |

### 17.4 Development Scripts

```json
// package.json (root)
{
  "scripts": {
    "dev": "turbo run dev",
    "dev:web": "turbo run dev --filter=@smart-academy/web",
    "dev:admin": "turbo run dev --filter=@smart-academy/admin",
    "dev:api": "turbo run dev --filter=@smart-academy/api",
    "dev:mobile": "turbo run dev --filter=@smart-academy/mobile",
    "build": "turbo run build",
    "test": "turbo run test",
    "test:coverage": "turbo run test:coverage",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
    "db:migrate": "pnpm --filter=@smart-academy/database prisma migrate dev",
    "db:generate": "pnpm --filter=@smart-academy/database prisma generate",
    "db:studio": "pnpm --filter=@smart-academy/database prisma studio",
    "docker:up": "docker compose up -d",
    "docker:down": "docker compose down",
    "docker:logs": "docker compose logs -f",
    "clean": "turbo run clean && rm -rf node_modules",
    "prepare": "husky"
  }
}
```

---

## 18. Technology Version Matrix

### 18.1 Complete Version Requirements

| Category | Technology | Minimum | Recommended | Maximum |
|----------|------------|---------|-------------|---------|
| **Runtime** |
| | Node.js | 20.x LTS | 22.x LTS | 23.x |
| | PHP | 8.2 | 8.3 | 8.4 |
| **Databases** |
| | MySQL | 8.0 | 8.0 | 8.4 |
| | PostgreSQL | 15 | 16 | 17 |
| | Redis | 7.0 | 7.2 | 7.4 |
| **Frontend** |
| | React | 18 | 19 | 19 |
| | Next.js | 14 | 15 | 15 |
| | Vite | 5.x | 6.x | 6.x |
| | TypeScript | 5.0 | 5.7 | 5.8 |
| | Tailwind CSS | 3.x | 4.x | 4.x |
| **Backend** |
| | Fastify | 4.x | 5.x | 5.x |
| | Prisma | 5.x | 6.x | 6.x |
| | Zod | 3.x | 3.x | 3.x |
| **Mobile** |
| | React Native | 0.73 | 0.76 | 0.77 |
| | Expo SDK | 50 | 52 | 53 |
| **Open Source** |
| | Gibbon | 27.x | 30.x | 30.x |
| | Moodle | 4.3 | 4.5 | 4.5 |
| **DevOps** |
| | Docker | 24 | 25 | 27 |
| | Docker Compose | 2.20 | 2.24 | 2.31 |

### 18.2 Browser Support

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 100+ |
| Firefox | 100+ |
| Safari | 15+ |
| Edge | 100+ |
| Mobile Chrome | 100+ |
| Mobile Safari | 15+ |

---

## 19. Appendices

### Appendix A: NPM Package List (Core)

```json
{
  "dependencies": {
    // Frontend
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "^15.0.0",
    "@tanstack/react-query": "^5.60.0",
    "@tanstack/react-table": "^8.20.0",
    "zustand": "^5.0.0",
    "react-hook-form": "^7.53.0",
    "zod": "^3.24.0",
    "@hookform/resolvers": "^3.9.0",
    "recharts": "^2.14.0",
    "date-fns": "^3.6.0",
    "lucide-react": "^0.460.0",

    // Styling
    "tailwindcss": "^4.0.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.5.0",
    "class-variance-authority": "^0.7.0",

    // Backend
    "fastify": "^5.0.0",
    "@fastify/cors": "^10.0.0",
    "@fastify/jwt": "^9.0.0",
    "@fastify/swagger": "^9.0.0",
    "@fastify/swagger-ui": "^5.0.0",
    "@prisma/client": "^6.0.0",
    "redis": "^4.7.0",
    "ioredis": "^5.4.0",
    "sslcommerz-lts": "^1.1.0",

    // Utilities
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "nanoid": "^5.0.0",
    "dayjs": "^1.11.0"
  },
  "devDependencies": {
    // TypeScript
    "typescript": "^5.7.0",
    "@types/node": "^22.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",

    // Testing
    "vitest": "^2.1.0",
    "@testing-library/react": "^16.0.0",
    "@playwright/test": "^1.49.0",

    // Code Quality
    "eslint": "^9.0.0",
    "prettier": "^3.4.0",
    "husky": "^9.0.0",
    "lint-staged": "^15.0.0",

    // Build
    "vite": "^6.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "turbo": "^2.3.0",
    "prisma": "^6.0.0"
  }
}
```

### Appendix B: Environment Variables Template

```bash
# .env.example

# App Configuration
NODE_ENV=development
APP_URL=http://localhost:3000
API_URL=http://localhost:4000

# Database - MySQL (Gibbon/Moodle)
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=gibbon
MYSQL_USER=gibbon_user
MYSQL_PASSWORD=your_secure_password

# Database - PostgreSQL (Custom)
DATABASE_URL="postgresql://smart_user:smart_password@localhost:5432/smart_academy"

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-chars

# Payment Gateways
SSL_STORE_ID=your_store_id
SSL_STORE_PASSWORD=your_store_password
BKASH_APP_KEY=your_bkash_app_key
BKASH_APP_SECRET=your_bkash_app_secret
NAGAD_MERCHANT_ID=your_nagad_merchant_id
NAGAD_PRIVATE_KEY=your_nagad_private_key

# SMS
BULKSMS_API_KEY=your_bulksms_api_key

# Email
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@smartacademy.edu.bd

# Gibbon Configuration
GIBBON_URL=http://localhost:8081
GIBBON_API_KEY=your_gibbon_api_key

# Moodle Configuration
MOODLE_URL=http://localhost:8082
MOODLE_TOKEN=your_moodle_web_service_token
```

### Appendix C: Folder Structure Reference

```
smart-academy/
├── apps/
│   ├── web/                         # Next.js Public Website
│   │   ├── src/
│   │   │   ├── app/                 # App Router pages
│   │   │   ├── components/          # React components
│   │   │   ├── lib/                 # Utilities
│   │   │   └── styles/              # Global styles
│   │   ├── public/                  # Static assets
│   │   ├── next.config.js
│   │   └── package.json
│   │
│   ├── admin/                       # React Admin Dashboard
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── stores/
│   │   │   └── services/
│   │   ├── vite.config.ts
│   │   └── package.json
│   │
│   ├── api/                         # Fastify API Server
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── middlewares/
│   │   │   └── plugins/
│   │   ├── prisma/
│   │   └── package.json
│   │
│   └── mobile/                      # React Native App
│       ├── app/                     # Expo Router pages
│       ├── components/
│       ├── services/
│       ├── stores/
│       ├── app.json
│       └── package.json
│
├── packages/
│   ├── ui/                          # Shared UI Components
│   ├── database/                    # Prisma Schema
│   ├── types/                       # Shared Types
│   ├── utils/                       # Shared Utilities
│   └── islamic/                     # Islamic Module Logic
│
├── docker/
│   ├── gibbon/
│   │   └── Dockerfile
│   ├── moodle/
│   │   └── Dockerfile
│   └── nginx/
│       └── nginx.conf
│
├── scripts/
│   ├── setup.sh
│   ├── seed.ts
│   └── migrate.ts
│
├── docs/
│   └── Implementation/
│       ├── Smart_Academy_Technology_Stack_Document.md
│       └── ...
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── docker-compose.yml
├── docker-compose.prod.yml
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── .env.example
├── .gitignore
└── README.md
```

### Appendix D: Glossary

| Term | Definition |
|------|------------|
| **HMR** | Hot Module Replacement - instant code updates without page reload |
| **SSR** | Server-Side Rendering - HTML generated on server |
| **SSG** | Static Site Generation - HTML pre-generated at build time |
| **LMS** | Learning Management System |
| **SMS** | Student Management System |
| **JWT** | JSON Web Token - authentication standard |
| **RBAC** | Role-Based Access Control |
| **ORM** | Object-Relational Mapping |
| **API** | Application Programming Interface |
| **REST** | Representational State Transfer |
| **CDN** | Content Delivery Network |
| **CSP** | Content Security Policy |
| **WCAG** | Web Content Accessibility Guidelines |

### Appendix E: Reference Links

**Official Documentation:**
- [Next.js 15](https://nextjs.org/docs)
- [React 19](https://react.dev)
- [Vite](https://vite.dev)
- [Fastify](https://fastify.dev)
- [Prisma](https://prisma.io/docs)
- [Expo](https://docs.expo.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Gibbon](https://docs.gibbonedu.org)
- [Moodle](https://docs.moodle.org)

**Research Sources:**
- [Imaginary Cloud - Top 10 Tech Stacks 2026](https://www.imaginarycloud.com/blog/tech-stack-software-development)
- [DEV Community - Choosing Tech Stack 2025](https://dev.to/dimeloper/choosing-tech-stack-in-2025-a-practical-guide-4gll)
- [Robin Wieruch - React Tech Stack 2025](https://www.robinwieruch.de/react-tech-stack/)
- [Expo for React Native 2025](https://hashrocket.com/blog/posts/expo-for-react-native-in-2025-a-perspective)
- [SSLCommerz NodeJS](https://github.com/sslcommerz/SSLCommerz-NodeJS)
- [Connecting Gibbon to Moodle](https://docs.gibbonedu.org/administrators/misc/connecting-to-moodle/)

---

## Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Technical Lead | | _________________ | ________ |
| Project Manager | | _________________ | ________ |
| School Admin | | _________________ | ________ |

---

**Document Version:** 1.0
**Last Updated:** January 10, 2026
**Status:** Approved for Development

*This document is confidential and intended for Smart Academy project team reference.*

*This technology stack is 100% compliant with:*
- *Smart Academy URD v1.0*
- *Smart Academy SRS v1.0*
- *Smart Academy Implementation Options Analysis v1.0*
- *Gibbon Comprehensive Documentation*
- *Moodle Comprehensive Documentation*
