# Environment Configuration

## Smart Academy Digital Portal

### Version 1.0 | January 2026

---

## Document Control

| Field | Details |
|-------|---------|
| **Document Title** | Environment Configuration |
| **Version** | 1.0 |
| **Status** | Draft |
| **Created Date** | January 2026 |
| **Last Updated** | January 2026 |
| **Author** | Development Team |
| **Classification** | Confidential |

---

## Table of Contents

1. [Overview](#1-overview)
2. [Development Environment](#2-development-environment)
3. [Staging Environment](#3-staging-environment)
4. [Production Environment](#4-production-environment)
5. [Environment Variables](#5-environment-variables)
6. [Feature Flags](#6-feature-flags)
7. [Secrets Management](#7-secrets-management)
8. [Environment Promotion](#8-environment-promotion)

---

## 1. Overview

### 1.1 Environment Strategy

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      ENVIRONMENT ARCHITECTURE                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                 │
│  │ Development │───▶│   Staging   │───▶│ Production  │                 │
│  │   (Local)   │    │  (Preview)  │    │   (Live)    │                 │
│  └─────────────┘    └─────────────┘    └─────────────┘                 │
│        │                  │                  │                          │
│        ▼                  ▼                  ▼                          │
│  ┌───────────────────────────────────────────────────────────────┐     │
│  │                    Configuration Layers                        │     │
│  ├───────────────────────────────────────────────────────────────┤     │
│  │  Base Config  │  Env-Specific  │  Secrets  │  Feature Flags   │     │
│  └───────────────────────────────────────────────────────────────┘     │
│                                                                         │
│  Configuration Flow:                                                    │
│  ─────────────────                                                      │
│  1. Base configuration (defaults)                                       │
│  2. Environment-specific overrides                                      │
│  3. Secrets injection (at runtime)                                      │
│  4. Feature flags (dynamic, per-environment)                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Environment Comparison Matrix

| Aspect | Development | Staging | Production |
|--------|-------------|---------|------------|
| **Purpose** | Local development | Pre-production testing | Live system |
| **URL** | localhost:3000 | staging.smartacademy.edu.bd | smartacademy.edu.bd |
| **Database** | Local Docker | Isolated staging DB | Production DB (replicated) |
| **Data** | Seed/Mock data | Anonymized production copy | Real user data |
| **SSL** | Self-signed/None | Let's Encrypt | Cloudflare Origin |
| **CDN** | None | Cloudflare (dev mode) | Cloudflare (production) |
| **Logging** | Verbose/Debug | Standard | Standard + APM |
| **Monitoring** | Optional | Full stack | Full stack + Alerts |
| **Payment** | Sandbox | Sandbox | Live |
| **Email** | Mailhog (local) | SendGrid (sandbox) | SendGrid (production) |
| **SMS** | Mock/Console | BulkSMSBD (test) | BulkSMSBD (live) |
| **Backups** | None | Daily | Continuous + Daily |
| **Access** | Developer only | Team + QA | Restricted |

### 1.3 Environment Naming Convention

```
┌─────────────────────────────────────────────────────────────────┐
│                    ENVIRONMENT IDENTIFIERS                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  NODE_ENV Values:                                               │
│  ───────────────                                                │
│  • development  - Local development                             │
│  • staging      - Pre-production testing                        │
│  • production   - Live production system                        │
│                                                                 │
│  APP_ENV Values (more granular):                                │
│  ───────────────────────────────                                │
│  • local        - Developer's machine                           │
│  • development  - Shared dev server                             │
│  • staging      - Pre-production                                │
│  • production   - Live production                               │
│                                                                 │
│  Branch Mapping:                                                │
│  ───────────────                                                │
│  • feature/*    → development (auto-deploy preview)             │
│  • develop      → staging (auto-deploy)                         │
│  • main         → production (manual approval)                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Development Environment

### 2.1 Development Setup Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT ENVIRONMENT                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Developer Machine (Ubuntu/Linux)                                       │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                                                                   │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │ │
│  │  │   VSCode    │  │   Docker    │  │   Browser   │               │ │
│  │  │    IDE      │  │   Desktop   │  │  (Preview)  │               │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘               │ │
│  │        │                │                │                        │ │
│  │        ▼                ▼                ▼                        │ │
│  │  ┌──────────────────────────────────────────────────────────────┐│ │
│  │  │                   Docker Compose Stack                       ││ │
│  │  │  ┌──────┐ ┌──────┐ ┌───────┐ ┌──────┐ ┌─────┐ ┌───────────┐ ││ │
│  │  │  │ API  │ │ Web  │ │ Admin │ │Postgres│ │MySQL│ │   Redis   │ ││ │
│  │  │  │:4000 │ │:3000 │ │ :3001 │ │ :5432 │ │:3306│ │   :6379   │ ││ │
│  │  │  └──────┘ └──────┘ └───────┘ └──────┘ └─────┘ └───────────┘ ││ │
│  │  │  ┌──────┐ ┌──────┐ ┌───────┐ ┌─────────────────────────────┐││ │
│  │  │  │MinIO │ │Gibbon│ │Moodle │ │          Mailhog            │││ │
│  │  │  │:9000 │ │:8080 │ │ :8082 │ │      :1025 / :8025          │││ │
│  │  │  └──────┘ └──────┘ └───────┘ └─────────────────────────────┘││ │
│  │  └──────────────────────────────────────────────────────────────┘│ │
│  │                                                                   │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  Features:                                                              │
│  • Hot Module Replacement (HMR) via Vite                               │
│  • Real-time TypeScript compilation                                    │
│  • Local database with seed data                                       │
│  • Mock payment gateways                                               │
│  • Email capture via Mailhog                                           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Development Docker Compose

```yaml
# docker-compose.dev.yml
version: '3.9'

services:
  # API Server (Development with hot reload)
  api:
    build:
      context: .
      dockerfile: apps/api/Dockerfile.dev
    container_name: smart-academy-api-dev
    volumes:
      - ./apps/api:/app/apps/api
      - ./packages:/app/packages
      - /app/node_modules
      - /app/apps/api/node_modules
    ports:
      - "4000:4000"
      - "9229:9229"  # Node.js debug port
    environment:
      NODE_ENV: development
      PORT: 4000
      DATABASE_URL: postgresql://smart_academy:dev_password@postgres:5432/smart_academy_dev
      REDIS_URL: redis://redis:6379
      JWT_SECRET: dev-jwt-secret-not-for-production
      SSLCOMMERZ_STORE_ID: testbox
      SSLCOMMERZ_STORE_PASSWORD: qwerty
      SSLCOMMERZ_IS_SANDBOX: "true"
      BKASH_APP_KEY: sandbox_app_key
      BKASH_APP_SECRET: sandbox_app_secret
      BKASH_IS_SANDBOX: "true"
      SMTP_HOST: mailhog
      SMTP_PORT: 1025
      MINIO_ENDPOINT: minio
      MINIO_PORT: 9000
      MINIO_ACCESS_KEY: minioadmin
      MINIO_SECRET_KEY: minioadmin
      LOG_LEVEL: debug
    command: pnpm run dev
    depends_on:
      - postgres
      - redis
      - mailhog
    networks:
      - smart-academy-dev

  # Web Application (Next.js with HMR)
  web:
    build:
      context: .
      dockerfile: apps/web/Dockerfile.dev
    container_name: smart-academy-web-dev
    volumes:
      - ./apps/web:/app/apps/web
      - ./packages:/app/packages
      - /app/node_modules
      - /app/apps/web/node_modules
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: development
      NEXT_PUBLIC_API_URL: http://localhost:4000
      NEXT_PUBLIC_WS_URL: ws://localhost:4000
      NEXT_PUBLIC_FEATURE_BETA: "true"
    command: pnpm run dev
    depends_on:
      - api
    networks:
      - smart-academy-dev

  # Admin Dashboard
  admin:
    build:
      context: .
      dockerfile: apps/admin/Dockerfile.dev
    container_name: smart-academy-admin-dev
    volumes:
      - ./apps/admin:/app/apps/admin
      - ./packages:/app/packages
      - /app/node_modules
      - /app/apps/admin/node_modules
    ports:
      - "3001:3001"
    environment:
      NODE_ENV: development
      NEXT_PUBLIC_API_URL: http://localhost:4000
    command: pnpm run dev
    depends_on:
      - api
    networks:
      - smart-academy-dev

  # PostgreSQL
  postgres:
    image: postgres:17-alpine
    container_name: smart-academy-postgres-dev
    environment:
      POSTGRES_USER: smart_academy
      POSTGRES_PASSWORD: dev_password
      POSTGRES_DB: smart_academy_dev
    volumes:
      - postgres_dev_data:/var/lib/postgresql/data
      - ./database/init-dev.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    networks:
      - smart-academy-dev

  # MySQL (for Gibbon)
  mysql:
    image: mysql:8.0
    container_name: smart-academy-mysql-dev
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: gibbon_dev
      MYSQL_USER: gibbon
      MYSQL_PASSWORD: gibbon_password
    volumes:
      - mysql_dev_data:/var/lib/mysql
    ports:
      - "3306:3306"
    networks:
      - smart-academy-dev

  # Redis
  redis:
    image: redis:7-alpine
    container_name: smart-academy-redis-dev
    ports:
      - "6379:6379"
    networks:
      - smart-academy-dev

  # MinIO (S3-compatible storage)
  minio:
    image: minio/minio:latest
    container_name: smart-academy-minio-dev
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    volumes:
      - minio_dev_data:/data
    ports:
      - "9000:9000"
      - "9001:9001"
    networks:
      - smart-academy-dev

  # Mailhog (Email testing)
  mailhog:
    image: mailhog/mailhog:latest
    container_name: smart-academy-mailhog-dev
    ports:
      - "1025:1025"   # SMTP
      - "8025:8025"   # Web UI
    networks:
      - smart-academy-dev

  # Gibbon SIS (Development)
  gibbon:
    image: gibbonedu/core:latest
    container_name: smart-academy-gibbon-dev
    environment:
      GIBBON_DATABASE_SERVER: mysql
      GIBBON_DATABASE_NAME: gibbon_dev
      GIBBON_DATABASE_USERNAME: gibbon
      GIBBON_DATABASE_PASSWORD: gibbon_password
    ports:
      - "8080:80"
    depends_on:
      - mysql
    networks:
      - smart-academy-dev

networks:
  smart-academy-dev:
    driver: bridge

volumes:
  postgres_dev_data:
  mysql_dev_data:
  minio_dev_data:
```

### 2.3 Development Environment File

```bash
# .env.development

# ===========================================
# DEVELOPMENT ENVIRONMENT CONFIGURATION
# ===========================================

# Application
NODE_ENV=development
APP_ENV=local
APP_NAME="Smart Academy (Dev)"
APP_URL=http://localhost:3000
API_URL=http://localhost:4000
ADMIN_URL=http://localhost:3001

# Debug
LOG_LEVEL=debug
DEBUG=smart-academy:*
ENABLE_QUERY_LOGGING=true
ENABLE_REQUEST_LOGGING=true

# Database - PostgreSQL
DATABASE_URL="postgresql://smart_academy:dev_password@localhost:5432/smart_academy_dev?schema=public"
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
DATABASE_LOG_QUERIES=true

# Database - MySQL (Gibbon)
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=gibbon_dev
MYSQL_USER=gibbon
MYSQL_PASSWORD=gibbon_password

# Redis
REDIS_URL=redis://localhost:6379
REDIS_PREFIX=smart_academy_dev:

# Authentication
JWT_SECRET=dev-jwt-secret-not-for-production-use-only
JWT_EXPIRES_IN=7d
SESSION_SECRET=dev-session-secret-not-for-production
BCRYPT_ROUNDS=10

# Payment Gateways (Sandbox)
SSLCOMMERZ_STORE_ID=testbox
SSLCOMMERZ_STORE_PASSWORD=qwerty
SSLCOMMERZ_IS_SANDBOX=true
SSLCOMMERZ_CALLBACK_URL=http://localhost:4000/payments/sslcommerz/callback

BKASH_APP_KEY=sandbox_app_key
BKASH_APP_SECRET=sandbox_app_secret
BKASH_USERNAME=sandbox_user
BKASH_PASSWORD=sandbox_password
BKASH_IS_SANDBOX=true

NAGAD_MERCHANT_ID=sandbox_merchant
NAGAD_MERCHANT_NUMBER=01XXXXXXXXX
NAGAD_IS_SANDBOX=true

# Email (Mailhog)
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_USER=
SMTP_PASSWORD=
EMAIL_FROM="Smart Academy Dev <dev@smartacademy.local>"

# SMS (Mock in development)
SMS_PROVIDER=mock
BULKSMSBD_API_KEY=test_api_key
BULKSMSBD_SENDER_ID=TEST

# Storage (MinIO)
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=smart-academy-dev

# File Upload
MAX_FILE_SIZE=52428800
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,application/pdf,video/mp4

# External Integrations (Dev/Mock)
GIBBON_URL=http://localhost:8080
GIBBON_API_KEY=dev_gibbon_key

MOODLE_URL=http://localhost:8082
MOODLE_TOKEN=dev_moodle_token

# Feature Flags
FEATURE_NEW_ENROLLMENT=true
FEATURE_MOBILE_APP=true
FEATURE_AI_TUTOR=true
FEATURE_LIVE_CLASSES=false
FEATURE_PAYMENT_INSTALLMENTS=true
FEATURE_SMS_NOTIFICATIONS=false
FEATURE_ADVANCED_ANALYTICS=true

# Development Tools
ENABLE_SWAGGER=true
ENABLE_GRAPHQL_PLAYGROUND=true
ENABLE_DEBUG_TOOLBAR=true
HOT_RELOAD=true

# CORS (Development - allow all)
CORS_ORIGINS=*
CORS_CREDENTIALS=true
```

### 2.4 Development Scripts

```json
// package.json scripts for development
{
  "scripts": {
    "dev": "turbo run dev",
    "dev:api": "turbo run dev --filter=@smart-academy/api",
    "dev:web": "turbo run dev --filter=@smart-academy/web",
    "dev:admin": "turbo run dev --filter=@smart-academy/admin",

    "docker:dev": "docker compose -f docker-compose.dev.yml up",
    "docker:dev:build": "docker compose -f docker-compose.dev.yml up --build",
    "docker:dev:down": "docker compose -f docker-compose.dev.yml down",
    "docker:dev:clean": "docker compose -f docker-compose.dev.yml down -v --remove-orphans",

    "db:dev:migrate": "prisma migrate dev",
    "db:dev:seed": "prisma db seed",
    "db:dev:reset": "prisma migrate reset",
    "db:dev:studio": "prisma studio",

    "test:dev": "vitest",
    "test:dev:ui": "vitest --ui",
    "test:dev:coverage": "vitest run --coverage",

    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 3. Staging Environment

### 3.1 Staging Environment Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      STAGING ENVIRONMENT                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Purpose: Pre-production testing & QA                                   │
│  URL: https://staging.smartacademy.edu.bd                              │
│  API: https://api-staging.smartacademy.edu.bd                          │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                        Staging Server                             │ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────┐ │ │
│  │  │                    Cloudflare (Dev Mode)                     │ │ │
│  │  │              SSL | CDN (Bypass) | WAF (Monitor)              │ │ │
│  │  └─────────────────────────────────────────────────────────────┘ │ │
│  │                              │                                    │ │
│  │                              ▼                                    │ │
│  │  ┌─────────────────────────────────────────────────────────────┐ │ │
│  │  │                         Nginx                                │ │ │
│  │  └─────────────────────────────────────────────────────────────┘ │ │
│  │                              │                                    │ │
│  │         ┌────────────────────┼────────────────────┐              │ │
│  │         ▼                    ▼                    ▼              │ │
│  │  ┌───────────┐        ┌───────────┐        ┌───────────┐        │ │
│  │  │    API    │        │    Web    │        │   Admin   │        │ │
│  │  │  (Blue)   │        │  (Blue)   │        │  (Blue)   │        │ │
│  │  └───────────┘        └───────────┘        └───────────┘        │ │
│  │         │                                                        │ │
│  │         ▼                                                        │ │
│  │  ┌─────────────────────────────────────────────────────────────┐ │ │
│  │  │  PostgreSQL  │  MySQL  │  Redis  │  MinIO  │  Gibbon        │ │ │
│  │  │  (Staging)   │(Staging)│(Staging)│(Staging)│  (Staging)     │ │ │
│  │  └─────────────────────────────────────────────────────────────┘ │ │
│  │                                                                   │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  Key Differences from Production:                                       │
│  • Single server (no HA)                                               │
│  • Sandbox payment gateways                                            │
│  • CDN in development mode                                             │
│  • Anonymized data                                                     │
│  • Debug logging enabled                                               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Staging Environment File

```bash
# .env.staging

# ===========================================
# STAGING ENVIRONMENT CONFIGURATION
# ===========================================

# Application
NODE_ENV=staging
APP_ENV=staging
APP_NAME="Smart Academy (Staging)"
APP_URL=https://staging.smartacademy.edu.bd
API_URL=https://api-staging.smartacademy.edu.bd
ADMIN_URL=https://admin-staging.smartacademy.edu.bd

# Debug (Moderate logging for staging)
LOG_LEVEL=info
DEBUG=smart-academy:error,smart-academy:warn
ENABLE_QUERY_LOGGING=false
ENABLE_REQUEST_LOGGING=true

# Database - PostgreSQL
DATABASE_URL="postgresql://smart_academy:${DB_PASSWORD}@postgres-staging:5432/smart_academy_staging?schema=public"
DATABASE_POOL_MIN=5
DATABASE_POOL_MAX=20
DATABASE_LOG_QUERIES=false

# Database - MySQL (Gibbon)
MYSQL_HOST=mysql-staging
MYSQL_PORT=3306
MYSQL_DATABASE=gibbon_staging
MYSQL_USER=gibbon
MYSQL_PASSWORD=${MYSQL_PASSWORD}

# Redis
REDIS_URL=redis://:${REDIS_PASSWORD}@redis-staging:6379
REDIS_PREFIX=smart_academy_staging:

# Authentication
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRES_IN=1d
SESSION_SECRET=${SESSION_SECRET}
BCRYPT_ROUNDS=12

# Payment Gateways (Sandbox but with real test accounts)
SSLCOMMERZ_STORE_ID=${SSLCOMMERZ_SANDBOX_STORE_ID}
SSLCOMMERZ_STORE_PASSWORD=${SSLCOMMERZ_SANDBOX_PASSWORD}
SSLCOMMERZ_IS_SANDBOX=true
SSLCOMMERZ_CALLBACK_URL=https://api-staging.smartacademy.edu.bd/payments/sslcommerz/callback

BKASH_APP_KEY=${BKASH_SANDBOX_APP_KEY}
BKASH_APP_SECRET=${BKASH_SANDBOX_APP_SECRET}
BKASH_USERNAME=${BKASH_SANDBOX_USERNAME}
BKASH_PASSWORD=${BKASH_SANDBOX_PASSWORD}
BKASH_IS_SANDBOX=true

NAGAD_MERCHANT_ID=${NAGAD_SANDBOX_MERCHANT_ID}
NAGAD_MERCHANT_NUMBER=${NAGAD_SANDBOX_NUMBER}
NAGAD_IS_SANDBOX=true

# Email (SendGrid Sandbox)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=true
SMTP_USER=apikey
SMTP_PASSWORD=${SENDGRID_API_KEY}
EMAIL_FROM="Smart Academy Staging <staging@smartacademy.edu.bd>"
SENDGRID_SANDBOX_MODE=true

# SMS (BulkSMSBD Test)
SMS_PROVIDER=bulksmsbd
BULKSMSBD_API_KEY=${BULKSMSBD_TEST_API_KEY}
BULKSMSBD_SENDER_ID=SMARTACAD
BULKSMSBD_TEST_MODE=true

# Storage (MinIO Staging)
MINIO_ENDPOINT=minio-staging
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=${MINIO_ACCESS_KEY}
MINIO_SECRET_KEY=${MINIO_SECRET_KEY}
MINIO_BUCKET=smart-academy-staging

# File Upload
MAX_FILE_SIZE=52428800
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,application/pdf,video/mp4

# External Integrations
GIBBON_URL=https://gibbon-staging.smartacademy.edu.bd
GIBBON_API_KEY=${GIBBON_STAGING_API_KEY}

MOODLE_URL=https://moodle-staging.smartacademy.edu.bd
MOODLE_TOKEN=${MOODLE_STAGING_TOKEN}

# Feature Flags (All features enabled for testing)
FEATURE_NEW_ENROLLMENT=true
FEATURE_MOBILE_APP=true
FEATURE_AI_TUTOR=true
FEATURE_LIVE_CLASSES=true
FEATURE_PAYMENT_INSTALLMENTS=true
FEATURE_SMS_NOTIFICATIONS=true
FEATURE_ADVANCED_ANALYTICS=true

# Monitoring
SENTRY_DSN=${SENTRY_DSN}
SENTRY_ENVIRONMENT=staging

# Development Tools (Disabled in staging)
ENABLE_SWAGGER=true
ENABLE_GRAPHQL_PLAYGROUND=false
ENABLE_DEBUG_TOOLBAR=false

# CORS
CORS_ORIGINS=https://staging.smartacademy.edu.bd,https://admin-staging.smartacademy.edu.bd
CORS_CREDENTIALS=true

# Rate Limiting (Relaxed for testing)
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=200
```

### 3.3 Staging-Specific Configurations

```yaml
# docker-compose.staging.yml
version: '3.9'

services:
  api:
    image: ghcr.io/smart-academy/api:${VERSION:-develop}
    environment:
      NODE_ENV: staging
      SENTRY_ENVIRONMENT: staging
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G

  web:
    image: ghcr.io/smart-academy/web:${VERSION:-develop}
    environment:
      NODE_ENV: staging
      NEXT_PUBLIC_ENVIRONMENT: staging

  admin:
    image: ghcr.io/smart-academy/admin:${VERSION:-develop}
    environment:
      NODE_ENV: staging

  postgres:
    environment:
      POSTGRES_DB: smart_academy_staging
    volumes:
      - postgres_staging_data:/var/lib/postgresql/data

  redis:
    command: redis-server --requirepass ${REDIS_PASSWORD}

volumes:
  postgres_staging_data:
```

---

## 4. Production Environment

### 4.1 Production Environment Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      PRODUCTION ENVIRONMENT                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Purpose: Live production system serving real users                     │
│  URL: https://smartacademy.edu.bd                                      │
│  API: https://api.smartacademy.edu.bd                                  │
│  Admin: https://admin.smartacademy.edu.bd                              │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                    Cloudflare Edge Network                         │ │
│  │           CDN | WAF | DDoS Protection | SSL/TLS                    │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                              │                                          │
│                              ▼                                          │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                      Production Server                             │ │
│  │  ┌─────────────────────────────────────────────────────────────┐  │ │
│  │  │                         Nginx                                │  │ │
│  │  │         Load Balancer | SSL | Rate Limiting                  │  │ │
│  │  └─────────────────────────────────────────────────────────────┘  │ │
│  │                              │                                     │ │
│  │         ┌────────────────────┼────────────────────┐               │ │
│  │         ▼                    ▼                    ▼               │ │
│  │  ┌───────────┐        ┌───────────┐        ┌───────────┐         │ │
│  │  │ API Blue  │        │ Web Blue  │        │Admin Blue │         │ │
│  │  │  (Active) │        │  (Active) │        │  (Active) │         │ │
│  │  └───────────┘        └───────────┘        └───────────┘         │ │
│  │  ┌───────────┐        ┌───────────┐        ┌───────────┐         │ │
│  │  │API Green  │        │Web Green  │        │Admin Green│         │ │
│  │  │ (Standby) │        │ (Standby) │        │ (Standby) │         │ │
│  │  └───────────┘        └───────────┘        └───────────┘         │ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────┐ │ │
│  │  │                      Data Layer                              │ │ │
│  │  │  PostgreSQL 17  │  MySQL 8.0  │  Redis 7  │  MinIO          │ │ │
│  │  │  (Primary)      │  (Gibbon)   │ (Cluster) │  (S3-compat)    │ │ │
│  │  └─────────────────────────────────────────────────────────────┘ │ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────┐ │ │
│  │  │                   Monitoring Stack                           │ │ │
│  │  │  Prometheus | Grafana | Loki | Alertmanager                  │ │ │
│  │  └─────────────────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  Production Characteristics:                                            │
│  • Blue-green deployment for zero-downtime                             │
│  • Continuous backup with point-in-time recovery                       │
│  • Full monitoring and alerting                                        │
│  • Live payment processing                                             │
│  • Real user data (encrypted at rest)                                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Production Environment File

```bash
# .env.production

# ===========================================
# PRODUCTION ENVIRONMENT CONFIGURATION
# ===========================================
# IMPORTANT: This file contains sensitive production secrets
# Never commit actual values to version control
# Use environment variable substitution or secrets manager

# Application
NODE_ENV=production
APP_ENV=production
APP_NAME="Smart Academy"
APP_URL=https://smartacademy.edu.bd
API_URL=https://api.smartacademy.edu.bd
ADMIN_URL=https://admin.smartacademy.edu.bd

# Logging (Production - minimal, structured)
LOG_LEVEL=warn
LOG_FORMAT=json
ENABLE_QUERY_LOGGING=false
ENABLE_REQUEST_LOGGING=true
REQUEST_LOG_BODY=false

# Database - PostgreSQL (Production)
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}?schema=public&connection_limit=50&pool_timeout=30"
DATABASE_POOL_MIN=10
DATABASE_POOL_MAX=50
DATABASE_LOG_QUERIES=false
DATABASE_SSL=true
DATABASE_SSL_CA=/etc/ssl/certs/rds-ca-cert.pem

# Database - MySQL (Gibbon Production)
MYSQL_HOST=${MYSQL_HOST}
MYSQL_PORT=3306
MYSQL_DATABASE=gibbon
MYSQL_USER=${MYSQL_USER}
MYSQL_PASSWORD=${MYSQL_PASSWORD}
MYSQL_SSL=true

# Redis (Production with auth)
REDIS_URL=rediss://:${REDIS_PASSWORD}@${REDIS_HOST}:6379
REDIS_PREFIX=smart_academy:
REDIS_TLS=true

# Authentication (Strong secrets)
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
SESSION_SECRET=${SESSION_SECRET}
BCRYPT_ROUNDS=14

# Payment Gateways (LIVE)
SSLCOMMERZ_STORE_ID=${SSLCOMMERZ_LIVE_STORE_ID}
SSLCOMMERZ_STORE_PASSWORD=${SSLCOMMERZ_LIVE_PASSWORD}
SSLCOMMERZ_IS_SANDBOX=false
SSLCOMMERZ_CALLBACK_URL=https://api.smartacademy.edu.bd/payments/sslcommerz/callback

BKASH_APP_KEY=${BKASH_LIVE_APP_KEY}
BKASH_APP_SECRET=${BKASH_LIVE_APP_SECRET}
BKASH_USERNAME=${BKASH_LIVE_USERNAME}
BKASH_PASSWORD=${BKASH_LIVE_PASSWORD}
BKASH_IS_SANDBOX=false

NAGAD_MERCHANT_ID=${NAGAD_LIVE_MERCHANT_ID}
NAGAD_MERCHANT_NUMBER=${NAGAD_LIVE_NUMBER}
NAGAD_PRIVATE_KEY=${NAGAD_PRIVATE_KEY}
NAGAD_IS_SANDBOX=false

# Email (SendGrid Production)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=true
SMTP_USER=apikey
SMTP_PASSWORD=${SENDGRID_API_KEY}
EMAIL_FROM="Smart Academy <noreply@smartacademy.edu.bd>"
SENDGRID_SANDBOX_MODE=false

# SMS (BulkSMSBD Production)
SMS_PROVIDER=bulksmsbd
BULKSMSBD_API_KEY=${BULKSMSBD_LIVE_API_KEY}
BULKSMSBD_SENDER_ID=SMARTACAD
BULKSMSBD_TEST_MODE=false

# Storage (MinIO/S3 Production)
MINIO_ENDPOINT=${MINIO_ENDPOINT}
MINIO_PORT=443
MINIO_USE_SSL=true
MINIO_ACCESS_KEY=${MINIO_ACCESS_KEY}
MINIO_SECRET_KEY=${MINIO_SECRET_KEY}
MINIO_BUCKET=smart-academy-prod

# CDN
CDN_URL=https://cdn.smartacademy.edu.bd
CDN_ENABLED=true

# File Upload
MAX_FILE_SIZE=104857600
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,application/pdf,video/mp4

# External Integrations
GIBBON_URL=https://sis.smartacademy.edu.bd
GIBBON_API_KEY=${GIBBON_PROD_API_KEY}

MOODLE_URL=https://lms.smartacademy.edu.bd
MOODLE_TOKEN=${MOODLE_PROD_TOKEN}

# Feature Flags (Conservative in production)
FEATURE_NEW_ENROLLMENT=true
FEATURE_MOBILE_APP=true
FEATURE_AI_TUTOR=false
FEATURE_LIVE_CLASSES=false
FEATURE_PAYMENT_INSTALLMENTS=true
FEATURE_SMS_NOTIFICATIONS=true
FEATURE_ADVANCED_ANALYTICS=true

# Monitoring & Error Tracking
SENTRY_DSN=${SENTRY_DSN}
SENTRY_ENVIRONMENT=production
SENTRY_TRACES_SAMPLE_RATE=0.1

# Disable Development Tools
ENABLE_SWAGGER=false
ENABLE_GRAPHQL_PLAYGROUND=false
ENABLE_DEBUG_TOOLBAR=false

# CORS (Strict in production)
CORS_ORIGINS=https://smartacademy.edu.bd,https://admin.smartacademy.edu.bd,https://sis.smartacademy.edu.bd
CORS_CREDENTIALS=true

# Rate Limiting (Strict)
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_LOGIN_MAX=5

# Security Headers
HELMET_ENABLED=true
CSP_ENABLED=true
HSTS_ENABLED=true

# Encryption
ENCRYPTION_KEY=${ENCRYPTION_KEY}
ENCRYPTION_ALGORITHM=aes-256-gcm
```

### 4.3 Production Security Checklist

```
╔══════════════════════════════════════════════════════════════════════╗
║               PRODUCTION SECURITY CHECKLIST                          ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  SECRETS MANAGEMENT                                                  ║
║  ───────────────────────────────────────────────────────────────     ║
║  □ All secrets stored in secure secrets manager                      ║
║  □ No secrets in environment files or code                          ║
║  □ Secrets rotated on schedule                                       ║
║  □ Access to secrets is audited                                      ║
║                                                                      ║
║  DATABASE SECURITY                                                   ║
║  ───────────────────────────────────────────────────────────────     ║
║  □ SSL/TLS enabled for connections                                   ║
║  □ Strong passwords (32+ characters)                                 ║
║  □ Limited user privileges (least privilege)                         ║
║  □ Regular backups with encryption                                   ║
║  □ Connection limits configured                                      ║
║                                                                      ║
║  APPLICATION SECURITY                                                ║
║  ───────────────────────────────────────────────────────────────     ║
║  □ Debug mode disabled                                               ║
║  □ Stack traces hidden                                               ║
║  □ HTTPS enforced                                                    ║
║  □ Security headers enabled (Helmet)                                 ║
║  □ CORS strictly configured                                          ║
║  □ Rate limiting enabled                                             ║
║  □ Input validation on all endpoints                                 ║
║                                                                      ║
║  INFRASTRUCTURE SECURITY                                             ║
║  ───────────────────────────────────────────────────────────────     ║
║  □ Firewall configured (UFW)                                         ║
║  □ SSH key-based auth only                                           ║
║  □ Fail2ban active                                                   ║
║  □ Regular security updates                                          ║
║  □ Container images scanned                                          ║
║                                                                      ║
║  MONITORING                                                          ║
║  ───────────────────────────────────────────────────────────────     ║
║  □ Security alerts configured                                        ║
║  □ Audit logging enabled                                             ║
║  □ Intrusion detection active                                        ║
║  □ Error tracking (no sensitive data)                                ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## 5. Environment Variables

### 5.1 Complete Environment Variables Reference

```typescript
// env-schema.ts - Complete environment variable schema

interface EnvironmentVariables {
  // ===========================================
  // CORE APPLICATION
  // ===========================================
  NODE_ENV: 'development' | 'staging' | 'production';
  APP_ENV: 'local' | 'development' | 'staging' | 'production';
  APP_NAME: string;
  APP_URL: string;
  API_URL: string;
  ADMIN_URL: string;
  PORT: number;

  // ===========================================
  // LOGGING & DEBUG
  // ===========================================
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
  LOG_FORMAT: 'json' | 'pretty';
  DEBUG: string;
  ENABLE_QUERY_LOGGING: boolean;
  ENABLE_REQUEST_LOGGING: boolean;
  REQUEST_LOG_BODY: boolean;

  // ===========================================
  // DATABASE - PostgreSQL
  // ===========================================
  DATABASE_URL: string;
  DATABASE_POOL_MIN: number;
  DATABASE_POOL_MAX: number;
  DATABASE_LOG_QUERIES: boolean;
  DATABASE_SSL: boolean;
  DATABASE_SSL_CA?: string;

  // ===========================================
  // DATABASE - MySQL
  // ===========================================
  MYSQL_HOST: string;
  MYSQL_PORT: number;
  MYSQL_DATABASE: string;
  MYSQL_USER: string;
  MYSQL_PASSWORD: string;
  MYSQL_SSL: boolean;

  // ===========================================
  // REDIS
  // ===========================================
  REDIS_URL: string;
  REDIS_PREFIX: string;
  REDIS_TLS: boolean;
  REDIS_PASSWORD?: string;

  // ===========================================
  // AUTHENTICATION
  // ===========================================
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  JWT_REFRESH_EXPIRES_IN: string;
  SESSION_SECRET: string;
  BCRYPT_ROUNDS: number;

  // ===========================================
  // PAYMENT GATEWAYS
  // ===========================================
  // SSLCommerz
  SSLCOMMERZ_STORE_ID: string;
  SSLCOMMERZ_STORE_PASSWORD: string;
  SSLCOMMERZ_IS_SANDBOX: boolean;
  SSLCOMMERZ_CALLBACK_URL: string;

  // bKash
  BKASH_APP_KEY: string;
  BKASH_APP_SECRET: string;
  BKASH_USERNAME: string;
  BKASH_PASSWORD: string;
  BKASH_IS_SANDBOX: boolean;

  // Nagad
  NAGAD_MERCHANT_ID: string;
  NAGAD_MERCHANT_NUMBER: string;
  NAGAD_PRIVATE_KEY?: string;
  NAGAD_IS_SANDBOX: boolean;

  // ===========================================
  // EMAIL
  // ===========================================
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_SECURE: boolean;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
  EMAIL_FROM: string;
  SENDGRID_API_KEY?: string;
  SENDGRID_SANDBOX_MODE: boolean;

  // ===========================================
  // SMS
  // ===========================================
  SMS_PROVIDER: 'bulksmsbd' | 'mock';
  BULKSMSBD_API_KEY: string;
  BULKSMSBD_SENDER_ID: string;
  BULKSMSBD_TEST_MODE: boolean;

  // ===========================================
  // STORAGE
  // ===========================================
  MINIO_ENDPOINT: string;
  MINIO_PORT: number;
  MINIO_USE_SSL: boolean;
  MINIO_ACCESS_KEY: string;
  MINIO_SECRET_KEY: string;
  MINIO_BUCKET: string;

  CDN_URL?: string;
  CDN_ENABLED: boolean;

  MAX_FILE_SIZE: number;
  ALLOWED_FILE_TYPES: string;

  // ===========================================
  // EXTERNAL INTEGRATIONS
  // ===========================================
  GIBBON_URL: string;
  GIBBON_API_KEY: string;

  MOODLE_URL: string;
  MOODLE_TOKEN: string;

  // ===========================================
  // FEATURE FLAGS
  // ===========================================
  FEATURE_NEW_ENROLLMENT: boolean;
  FEATURE_MOBILE_APP: boolean;
  FEATURE_AI_TUTOR: boolean;
  FEATURE_LIVE_CLASSES: boolean;
  FEATURE_PAYMENT_INSTALLMENTS: boolean;
  FEATURE_SMS_NOTIFICATIONS: boolean;
  FEATURE_ADVANCED_ANALYTICS: boolean;

  // ===========================================
  // MONITORING
  // ===========================================
  SENTRY_DSN?: string;
  SENTRY_ENVIRONMENT: string;
  SENTRY_TRACES_SAMPLE_RATE: number;

  // ===========================================
  // SECURITY
  // ===========================================
  CORS_ORIGINS: string;
  CORS_CREDENTIALS: boolean;

  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX_REQUESTS: number;
  RATE_LIMIT_LOGIN_MAX: number;

  HELMET_ENABLED: boolean;
  CSP_ENABLED: boolean;
  HSTS_ENABLED: boolean;

  ENCRYPTION_KEY?: string;
  ENCRYPTION_ALGORITHM: string;

  // ===========================================
  // DEVELOPMENT TOOLS
  // ===========================================
  ENABLE_SWAGGER: boolean;
  ENABLE_GRAPHQL_PLAYGROUND: boolean;
  ENABLE_DEBUG_TOOLBAR: boolean;
  HOT_RELOAD: boolean;
}
```

### 5.2 Environment Variables by Category

```
┌─────────────────────────────────────────────────────────────────────────┐
│                   ENVIRONMENT VARIABLES BY ENVIRONMENT                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Variable                    │ Development │ Staging   │ Production    │
│  ────────────────────────────┼─────────────┼───────────┼──────────────│
│                                                                         │
│  NODE_ENV                    │ development │ staging   │ production    │
│  LOG_LEVEL                   │ debug       │ info      │ warn          │
│  DATABASE_POOL_MAX           │ 10          │ 20        │ 50            │
│  JWT_EXPIRES_IN              │ 7d          │ 1d        │ 1h            │
│  BCRYPT_ROUNDS               │ 10          │ 12        │ 14            │
│  SSLCOMMERZ_IS_SANDBOX       │ true        │ true      │ false         │
│  BKASH_IS_SANDBOX            │ true        │ true      │ false         │
│  SENDGRID_SANDBOX_MODE       │ true        │ true      │ false         │
│  SMS_TEST_MODE               │ true        │ true      │ false         │
│  RATE_LIMIT_MAX_REQUESTS     │ 1000        │ 200       │ 100           │
│  SENTRY_TRACES_SAMPLE_RATE   │ 1.0         │ 0.5       │ 0.1           │
│  ENABLE_SWAGGER              │ true        │ true      │ false         │
│  CDN_ENABLED                 │ false       │ false     │ true          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Feature Flags

### 6.1 Feature Flag Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      FEATURE FLAG ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│                      ┌─────────────────────┐                           │
│                      │   Feature Flag      │                           │
│                      │     Service         │                           │
│                      └──────────┬──────────┘                           │
│                                 │                                       │
│            ┌────────────────────┼────────────────────┐                 │
│            │                    │                    │                 │
│            ▼                    ▼                    ▼                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐        │
│  │  Environment    │  │    Database     │  │     Redis       │        │
│  │   Variables     │  │   (Overrides)   │  │    (Cache)      │        │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘        │
│                                                                         │
│  Flag Resolution Priority:                                              │
│  1. Database overrides (for user-specific or gradual rollout)          │
│  2. Environment variables (default per environment)                     │
│  3. Code defaults (fallback)                                           │
│                                                                         │
│  Flag Types:                                                            │
│  ────────────                                                           │
│  • Boolean:    Simple on/off                                           │
│  • Percentage: Gradual rollout (0-100%)                                │
│  • User-based: Specific user segments                                  │
│  • Time-based: Scheduled activation/deactivation                       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Feature Flag Configuration

```typescript
// config/feature-flags.ts

export interface FeatureFlag {
  name: string;
  description: string;
  defaultValue: boolean;
  environments: {
    development: boolean | FeatureFlagConfig;
    staging: boolean | FeatureFlagConfig;
    production: boolean | FeatureFlagConfig;
  };
}

export interface FeatureFlagConfig {
  enabled: boolean;
  percentage?: number;        // 0-100 for gradual rollout
  userSegments?: string[];    // e.g., ['beta-testers', 'staff']
  startDate?: string;         // ISO date for scheduled activation
  endDate?: string;           // ISO date for scheduled deactivation
}

export const featureFlags: Record<string, FeatureFlag> = {
  // ===========================================
  // ENROLLMENT FEATURES
  // ===========================================
  FEATURE_NEW_ENROLLMENT: {
    name: 'New Enrollment Flow',
    description: 'Redesigned student enrollment process with improved UX',
    defaultValue: false,
    environments: {
      development: true,
      staging: true,
      production: true,
    },
  },

  FEATURE_BULK_ENROLLMENT: {
    name: 'Bulk Enrollment',
    description: 'Allow batch enrollment of multiple students',
    defaultValue: false,
    environments: {
      development: true,
      staging: true,
      production: {
        enabled: true,
        userSegments: ['admin', 'registrar'],
      },
    },
  },

  // ===========================================
  // MOBILE APP FEATURES
  // ===========================================
  FEATURE_MOBILE_APP: {
    name: 'Mobile App Integration',
    description: 'Enable mobile app API endpoints and features',
    defaultValue: false,
    environments: {
      development: true,
      staging: true,
      production: true,
    },
  },

  FEATURE_PUSH_NOTIFICATIONS: {
    name: 'Push Notifications',
    description: 'Mobile push notification support',
    defaultValue: false,
    environments: {
      development: true,
      staging: true,
      production: {
        enabled: true,
        percentage: 50,  // Gradual rollout
      },
    },
  },

  // ===========================================
  // AI/ML FEATURES
  // ===========================================
  FEATURE_AI_TUTOR: {
    name: 'AI Tutor',
    description: 'AI-powered tutoring assistant',
    defaultValue: false,
    environments: {
      development: true,
      staging: true,
      production: {
        enabled: false,  // Disabled in production
        userSegments: ['beta-testers'],
      },
    },
  },

  FEATURE_SMART_RECOMMENDATIONS: {
    name: 'Smart Course Recommendations',
    description: 'ML-based course recommendations',
    defaultValue: false,
    environments: {
      development: true,
      staging: true,
      production: {
        enabled: true,
        percentage: 25,  // Testing with 25% of users
      },
    },
  },

  // ===========================================
  // LIVE FEATURES
  // ===========================================
  FEATURE_LIVE_CLASSES: {
    name: 'Live Classes',
    description: 'Real-time video classes integration',
    defaultValue: false,
    environments: {
      development: true,
      staging: true,
      production: false,  // Not yet ready for production
    },
  },

  FEATURE_LIVE_CHAT: {
    name: 'Live Chat Support',
    description: 'Real-time chat with support staff',
    defaultValue: false,
    environments: {
      development: true,
      staging: true,
      production: {
        enabled: true,
        // Only during business hours
        startDate: '2026-02-01T09:00:00+06:00',
      },
    },
  },

  // ===========================================
  // PAYMENT FEATURES
  // ===========================================
  FEATURE_PAYMENT_INSTALLMENTS: {
    name: 'Payment Installments',
    description: 'Allow fee payment in installments',
    defaultValue: false,
    environments: {
      development: true,
      staging: true,
      production: true,
    },
  },

  FEATURE_NAGAD_PAYMENT: {
    name: 'Nagad Payment',
    description: 'Nagad mobile payment gateway',
    defaultValue: false,
    environments: {
      development: true,
      staging: true,
      production: {
        enabled: true,
        startDate: '2026-03-01T00:00:00+06:00',  // Scheduled launch
      },
    },
  },

  // ===========================================
  // NOTIFICATION FEATURES
  // ===========================================
  FEATURE_SMS_NOTIFICATIONS: {
    name: 'SMS Notifications',
    description: 'Send SMS for important updates',
    defaultValue: false,
    environments: {
      development: false,  // Mock in development
      staging: true,
      production: true,
    },
  },

  FEATURE_EMAIL_TEMPLATES_V2: {
    name: 'Email Templates V2',
    description: 'New responsive email templates',
    defaultValue: false,
    environments: {
      development: true,
      staging: true,
      production: {
        enabled: true,
        percentage: 100,
      },
    },
  },

  // ===========================================
  // ANALYTICS FEATURES
  // ===========================================
  FEATURE_ADVANCED_ANALYTICS: {
    name: 'Advanced Analytics',
    description: 'Enhanced analytics dashboard with ML insights',
    defaultValue: false,
    environments: {
      development: true,
      staging: true,
      production: {
        enabled: true,
        userSegments: ['admin', 'teacher'],
      },
    },
  },

  FEATURE_STUDENT_ANALYTICS: {
    name: 'Student Analytics',
    description: 'Personal analytics dashboard for students',
    defaultValue: false,
    environments: {
      development: true,
      staging: true,
      production: {
        enabled: true,
        percentage: 75,
      },
    },
  },
};
```

### 6.3 Feature Flag Service Implementation

```typescript
// services/feature-flag.service.ts

import { featureFlags, FeatureFlag, FeatureFlagConfig } from '@/config/feature-flags';

interface FeatureFlagContext {
  userId?: string;
  userSegments?: string[];
  environment: 'development' | 'staging' | 'production';
}

export class FeatureFlagService {
  private cache: Map<string, boolean> = new Map();

  constructor(private readonly environment: string) {}

  /**
   * Check if a feature is enabled for a given context
   */
  isEnabled(flagName: string, context?: Partial<FeatureFlagContext>): boolean {
    const flag = featureFlags[flagName];
    if (!flag) {
      console.warn(`Unknown feature flag: ${flagName}`);
      return false;
    }

    const envConfig = flag.environments[this.environment as keyof typeof flag.environments];

    // Simple boolean
    if (typeof envConfig === 'boolean') {
      return envConfig;
    }

    // Complex configuration
    const config = envConfig as FeatureFlagConfig;

    if (!config.enabled) {
      return false;
    }

    // Check scheduled dates
    if (config.startDate && new Date() < new Date(config.startDate)) {
      return false;
    }
    if (config.endDate && new Date() > new Date(config.endDate)) {
      return false;
    }

    // Check user segments
    if (config.userSegments && context?.userSegments) {
      const hasSegment = config.userSegments.some(
        segment => context.userSegments?.includes(segment)
      );
      if (hasSegment) {
        return true;
      }
      // If user segments are defined but user doesn't match, check percentage
    }

    // Check percentage rollout
    if (config.percentage !== undefined && context?.userId) {
      const hash = this.hashUserId(context.userId, flagName);
      return hash < config.percentage;
    }

    return config.enabled;
  }

  /**
   * Get all feature flags for current environment
   */
  getAllFlags(): Record<string, boolean> {
    const result: Record<string, boolean> = {};

    for (const [name, flag] of Object.entries(featureFlags)) {
      result[name] = this.isEnabled(name);
    }

    return result;
  }

  /**
   * Hash user ID for consistent percentage rollout
   */
  private hashUserId(userId: string, flagName: string): number {
    const str = `${userId}-${flagName}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash % 100);
  }
}

// Usage example
const featureFlagService = new FeatureFlagService(process.env.NODE_ENV || 'development');

// Simple check
if (featureFlagService.isEnabled('FEATURE_AI_TUTOR')) {
  // Show AI tutor
}

// With user context
if (featureFlagService.isEnabled('FEATURE_SMART_RECOMMENDATIONS', {
  userId: 'user-123',
  userSegments: ['beta-testers'],
})) {
  // Show recommendations
}
```

### 6.4 Feature Flag Matrix by Environment

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    FEATURE FLAG STATUS BY ENVIRONMENT                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Feature Flag                │ Development │ Staging │ Production      │
│  ────────────────────────────┼─────────────┼─────────┼────────────────│
│                                                                         │
│  FEATURE_NEW_ENROLLMENT      │     ✅      │   ✅    │      ✅         │
│  FEATURE_BULK_ENROLLMENT     │     ✅      │   ✅    │  ✅ (segments)  │
│  FEATURE_MOBILE_APP          │     ✅      │   ✅    │      ✅         │
│  FEATURE_PUSH_NOTIFICATIONS  │     ✅      │   ✅    │  ✅ (50%)       │
│  FEATURE_AI_TUTOR            │     ✅      │   ✅    │  ❌ (beta only) │
│  FEATURE_SMART_RECOMMENDATIONS│    ✅      │   ✅    │  ✅ (25%)       │
│  FEATURE_LIVE_CLASSES        │     ✅      │   ✅    │      ❌         │
│  FEATURE_LIVE_CHAT           │     ✅      │   ✅    │  ✅ (scheduled) │
│  FEATURE_PAYMENT_INSTALLMENTS│     ✅      │   ✅    │      ✅         │
│  FEATURE_NAGAD_PAYMENT       │     ✅      │   ✅    │  ✅ (scheduled) │
│  FEATURE_SMS_NOTIFICATIONS   │     ❌      │   ✅    │      ✅         │
│  FEATURE_EMAIL_TEMPLATES_V2  │     ✅      │   ✅    │  ✅ (100%)      │
│  FEATURE_ADVANCED_ANALYTICS  │     ✅      │   ✅    │  ✅ (segments)  │
│  FEATURE_STUDENT_ANALYTICS   │     ✅      │   ✅    │  ✅ (75%)       │
│                                                                         │
│  Legend:                                                                │
│  ✅ = Enabled    ❌ = Disabled    (%) = Percentage rollout             │
│  (segments) = User segment restricted    (scheduled) = Time-based      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Secrets Management

### 7.1 Secrets Management Strategy

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     SECRETS MANAGEMENT ARCHITECTURE                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Development                                                            │
│  ────────────────                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  .env.local (gitignored) → Local secrets for development        │   │
│  │  docker-compose.dev.yml → Default/mock credentials               │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  Staging                                                                │
│  ────────────────                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  GitHub Secrets → CI/CD deployment                               │   │
│  │  Environment Variables → Container runtime                        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  Production                                                             │
│  ────────────────                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  GitHub Secrets → CI/CD deployment                               │   │
│  │  Docker Secrets → Container runtime (encrypted)                  │   │
│  │  Environment Variables → Injected at startup                     │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  Secret Categories:                                                     │
│  ──────────────────                                                     │
│  • Database credentials                                                 │
│  • API keys (payment gateways, SMS, email)                             │
│  • JWT/Session secrets                                                  │
│  • Encryption keys                                                      │
│  • Third-party service credentials                                      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 7.2 GitHub Secrets Configuration

```yaml
# Required GitHub Repository Secrets

# Database
DB_USER: "smart_academy"
DB_PASSWORD: "<secure-password>"
DB_HOST: "<database-host>"
DB_NAME: "smart_academy"

MYSQL_ROOT_PASSWORD: "<secure-password>"
MYSQL_PASSWORD: "<secure-password>"

REDIS_PASSWORD: "<secure-password>"

# Authentication
JWT_SECRET: "<256-bit-secret>"
SESSION_SECRET: "<256-bit-secret>"

# Payment Gateways - Sandbox
SSLCOMMERZ_SANDBOX_STORE_ID: "<sandbox-store-id>"
SSLCOMMERZ_SANDBOX_PASSWORD: "<sandbox-password>"

BKASH_SANDBOX_APP_KEY: "<sandbox-key>"
BKASH_SANDBOX_APP_SECRET: "<sandbox-secret>"
BKASH_SANDBOX_USERNAME: "<sandbox-user>"
BKASH_SANDBOX_PASSWORD: "<sandbox-password>"

NAGAD_SANDBOX_MERCHANT_ID: "<sandbox-merchant>"
NAGAD_SANDBOX_NUMBER: "<sandbox-number>"

# Payment Gateways - Production
SSLCOMMERZ_LIVE_STORE_ID: "<live-store-id>"
SSLCOMMERZ_LIVE_PASSWORD: "<live-password>"

BKASH_LIVE_APP_KEY: "<live-key>"
BKASH_LIVE_APP_SECRET: "<live-secret>"
BKASH_LIVE_USERNAME: "<live-user>"
BKASH_LIVE_PASSWORD: "<live-password>"

NAGAD_LIVE_MERCHANT_ID: "<live-merchant>"
NAGAD_LIVE_NUMBER: "<live-number>"
NAGAD_PRIVATE_KEY: "<private-key-base64>"

# Communication Services
SENDGRID_API_KEY: "<api-key>"
BULKSMSBD_TEST_API_KEY: "<test-key>"
BULKSMSBD_LIVE_API_KEY: "<live-key>"

# Storage
MINIO_ACCESS_KEY: "<access-key>"
MINIO_SECRET_KEY: "<secret-key>"

# External Services
GIBBON_STAGING_API_KEY: "<staging-key>"
GIBBON_PROD_API_KEY: "<prod-key>"
MOODLE_STAGING_TOKEN: "<staging-token>"
MOODLE_PROD_TOKEN: "<prod-token>"

# Monitoring
SENTRY_DSN: "<sentry-dsn>"
SLACK_WEBHOOK_URL: "<webhook-url>"

# Container Registry
GITHUB_TOKEN: "<pat-token>"

# Cloudflare
CLOUDFLARE_API_TOKEN: "<api-token>"
CLOUDFLARE_ZONE_ID: "<zone-id>"

# Encryption
ENCRYPTION_KEY: "<256-bit-key>"
```

### 7.3 Secret Rotation Procedures

```bash
#!/bin/bash
# scripts/rotate-secrets.sh

echo "=== Secret Rotation Script ==="
echo "This script assists with rotating sensitive credentials"
echo ""

# Function to generate secure password
generate_password() {
    openssl rand -base64 32 | tr -d '/+=' | cut -c1-32
}

# Function to generate JWT secret
generate_jwt_secret() {
    openssl rand -hex 64
}

echo "Select secret to rotate:"
echo "1. Database password"
echo "2. JWT secret"
echo "3. Redis password"
echo "4. Session secret"
echo "5. All secrets"
read -p "Choice: " choice

case $choice in
    1)
        NEW_DB_PASSWORD=$(generate_password)
        echo "New database password: $NEW_DB_PASSWORD"
        echo ""
        echo "Steps to apply:"
        echo "1. Update database user password"
        echo "2. Update GitHub secret: DB_PASSWORD"
        echo "3. Re-deploy application"
        ;;
    2)
        NEW_JWT_SECRET=$(generate_jwt_secret)
        echo "New JWT secret: $NEW_JWT_SECRET"
        echo ""
        echo "WARNING: All existing sessions will be invalidated!"
        echo "Steps to apply:"
        echo "1. Update GitHub secret: JWT_SECRET"
        echo "2. Re-deploy application"
        ;;
    3)
        NEW_REDIS_PASSWORD=$(generate_password)
        echo "New Redis password: $NEW_REDIS_PASSWORD"
        echo ""
        echo "Steps to apply:"
        echo "1. Update Redis configuration"
        echo "2. Update GitHub secret: REDIS_PASSWORD"
        echo "3. Re-deploy application"
        ;;
    4)
        NEW_SESSION_SECRET=$(generate_jwt_secret)
        echo "New session secret: $NEW_SESSION_SECRET"
        echo ""
        echo "WARNING: All existing sessions will be invalidated!"
        echo "Steps to apply:"
        echo "1. Update GitHub secret: SESSION_SECRET"
        echo "2. Re-deploy application"
        ;;
    5)
        echo "Generating all new secrets..."
        echo ""
        echo "DB_PASSWORD=$(generate_password)"
        echo "JWT_SECRET=$(generate_jwt_secret)"
        echo "SESSION_SECRET=$(generate_jwt_secret)"
        echo "REDIS_PASSWORD=$(generate_password)"
        echo "ENCRYPTION_KEY=$(openssl rand -hex 32)"
        ;;
esac

echo ""
echo "=== Remember to update GitHub Secrets after rotation ==="
```

---

## 8. Environment Promotion

### 8.1 Promotion Workflow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     ENVIRONMENT PROMOTION WORKFLOW                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Developer Machine → Development → Staging → Production                 │
│                                                                         │
│  ┌─────────────┐                                                        │
│  │  Local Dev  │                                                        │
│  │  (feature)  │                                                        │
│  └──────┬──────┘                                                        │
│         │ git push                                                      │
│         ▼                                                               │
│  ┌─────────────┐    ┌────────────────────────────────────────┐         │
│  │   GitHub    │───▶│ CI Pipeline                            │         │
│  │  (feature/) │    │ • Build • Test • Security Scan         │         │
│  └──────┬──────┘    └────────────────────────────────────────┘         │
│         │ PR merge to develop                                           │
│         ▼                                                               │
│  ┌─────────────┐    ┌────────────────────────────────────────┐         │
│  │  Staging    │───▶│ Auto-deploy to Staging                 │         │
│  │  (develop)  │    │ • Deploy • E2E Tests • QA Testing      │         │
│  └──────┬──────┘    └────────────────────────────────────────┘         │
│         │ PR merge to main (approval required)                          │
│         ▼                                                               │
│  ┌─────────────┐    ┌────────────────────────────────────────┐         │
│  │ Production  │───▶│ Manual Approval → Blue-Green Deploy    │         │
│  │   (main)    │    │ • Deploy • Smoke Tests • Monitor       │         │
│  └─────────────┘    └────────────────────────────────────────┘         │
│                                                                         │
│  Promotion Gates:                                                       │
│  ─────────────────                                                      │
│  • Development → Staging: PR approval, all tests pass                  │
│  • Staging → Production: QA sign-off, security review, approval        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Promotion Checklist

```
╔══════════════════════════════════════════════════════════════════════╗
║                     PROMOTION CHECKLIST                              ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  STAGING → PRODUCTION PROMOTION                                      ║
║  ───────────────────────────────────────────────────────────────     ║
║                                                                      ║
║  Pre-Promotion Checks:                                               ║
║  □ All CI pipeline stages passed                                     ║
║  □ E2E tests passed on staging                                       ║
║  □ Security scan completed (no critical issues)                      ║
║  □ Performance testing passed                                        ║
║  □ QA sign-off received                                              ║
║  □ Product owner approval received                                   ║
║  □ Release notes prepared                                            ║
║                                                                      ║
║  Technical Checks:                                                   ║
║  □ Database migrations reviewed                                      ║
║  □ Environment variables verified                                    ║
║  □ Feature flags configured correctly                                ║
║  □ Third-party integrations tested                                   ║
║  □ Rollback plan documented                                          ║
║                                                                      ║
║  Deployment:                                                         ║
║  □ Maintenance window scheduled (if needed)                          ║
║  □ Stakeholders notified                                             ║
║  □ Monitoring dashboards ready                                       ║
║  □ Support team on standby                                           ║
║                                                                      ║
║  Post-Deployment:                                                    ║
║  □ Smoke tests passed                                                ║
║  □ Key user flows verified                                           ║
║  □ Monitoring shows normal metrics                                   ║
║  □ No critical errors in logs                                        ║
║  □ Success notification sent                                         ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

### 8.3 Configuration Sync Script

```bash
#!/bin/bash
# scripts/sync-env-config.sh

echo "=== Environment Configuration Sync ==="
echo ""

SOURCE_ENV=${1:-staging}
TARGET_ENV=${2:-production}

echo "Comparing configuration: $SOURCE_ENV → $TARGET_ENV"
echo ""

# Compare environment variables (without values)
echo "=== Environment Variable Differences ==="

SOURCE_VARS=$(grep -E "^[A-Z_]+=" .env.$SOURCE_ENV | cut -d'=' -f1 | sort)
TARGET_VARS=$(grep -E "^[A-Z_]+=" .env.$TARGET_ENV | cut -d'=' -f1 | sort)

echo "Variables in $SOURCE_ENV but not in $TARGET_ENV:"
comm -23 <(echo "$SOURCE_VARS") <(echo "$TARGET_VARS")
echo ""

echo "Variables in $TARGET_ENV but not in $SOURCE_ENV:"
comm -13 <(echo "$SOURCE_VARS") <(echo "$TARGET_VARS")
echo ""

# Compare feature flags
echo "=== Feature Flag Differences ==="
echo "Run: npm run feature-flags:compare $SOURCE_ENV $TARGET_ENV"
echo ""

# Generate diff report
echo "=== Configuration Diff Report ==="
diff --side-by-side --suppress-common-lines \
    <(grep -v "^#" .env.$SOURCE_ENV | grep -v "^$" | sort) \
    <(grep -v "^#" .env.$TARGET_ENV | grep -v "^$" | sort) || true

echo ""
echo "=== Sync Complete ==="
```

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | January 2026 | Development Team | Initial document |

---

*This Environment Configuration document should be reviewed and updated whenever environment configurations change.*
