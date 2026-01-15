# Smart Academy - Configuration Management Document

**Document ID:** TECH_Configuration_Management_v1.0
**Version:** 1.0
**Last Updated:** 2026-01-10
**Status:** Draft
**Author:** Development Team

---

## Table of Contents

1. [Document Overview](#1-document-overview)
2. [Environment Variables Structure](#2-environment-variables-structure)
3. [Configuration Hierarchy](#3-configuration-hierarchy)
4. [Secrets Management](#4-secrets-management)
5. [Feature Flags](#5-feature-flags)
6. [Environment-Specific Configurations](#6-environment-specific-configurations)
7. [Configuration Validation](#7-configuration-validation)
8. [Configuration Files Reference](#8-configuration-files-reference)
9. [Deployment Configuration](#9-deployment-configuration)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Document Overview

### 1.1 Purpose

This document defines the configuration management strategy for the Smart Academy platform. It establishes standards for managing environment variables, secrets, feature flags, and environment-specific configurations across development, staging, and production environments.

### 1.2 Scope

This specification covers:
- Frontend (Next.js 15.x) configuration
- Backend (Fastify 5.x) configuration
- Database (PostgreSQL/MySQL) configuration
- Cache (Redis) configuration
- Third-party service configurations
- CI/CD pipeline configurations

### 1.3 Technology Stack Context

| Component | Technology | Configuration Method |
|-----------|------------|---------------------|
| Frontend | Next.js 15.x | `.env.local`, `next.config.ts` |
| Backend | Fastify 5.x | `.env`, `config/` module |
| Database | PostgreSQL 16+ / MySQL 8.0+ | Environment variables |
| Cache | Redis 7+ | Environment variables |
| Build Tool | Vite 6.x | `vite.config.ts` |
| Container | Docker | `docker-compose.yml`, Dockerfile |

### 1.4 Configuration Principles

1. **Twelve-Factor App Compliance**: Store config in environment variables
2. **Security First**: Never commit secrets to version control
3. **Environment Parity**: Keep dev, staging, and production as similar as possible
4. **Validation**: Validate all configuration at startup
5. **Documentation**: Document all configuration options
6. **Defaults**: Provide sensible defaults for development

---

## 2. Environment Variables Structure

### 2.1 Naming Conventions

#### 2.1.1 General Rules

```plaintext
# Format: [PREFIX]_[CATEGORY]_[NAME]
# Examples:
NEXT_PUBLIC_API_URL          # Public frontend variable
DATABASE_PRIMARY_URL         # Database connection
REDIS_CACHE_HOST             # Redis configuration
SMTP_EMAIL_HOST              # Email service
BKASH_PAYMENT_API_KEY        # Payment gateway
```

#### 2.1.2 Prefix Standards

| Prefix | Usage | Exposed To |
|--------|-------|------------|
| `NEXT_PUBLIC_` | Frontend public variables | Browser |
| `DATABASE_` | Database configurations | Server only |
| `REDIS_` | Redis configurations | Server only |
| `AUTH_` | Authentication settings | Server only |
| `SMTP_` | Email service settings | Server only |
| `SMS_` | SMS gateway settings | Server only |
| `STORAGE_` | File storage settings | Server only |
| `PAYMENT_` | Payment gateway settings | Server only |
| `FEATURE_` | Feature flags | Both |
| `LOG_` | Logging configurations | Server only |

#### 2.1.3 Variable Categories

```plaintext
# Application
APP_NAME=SmartAcademy
APP_ENV=development|staging|production
APP_DEBUG=true|false
APP_URL=https://smartacademy.com.bd
APP_PORT=3000
APP_SECRET_KEY=<random-32-chars>

# Frontend Public
NEXT_PUBLIC_APP_NAME=Smart Academy
NEXT_PUBLIC_APP_URL=https://smartacademy.com.bd
NEXT_PUBLIC_API_URL=https://api.smartacademy.com.bd
NEXT_PUBLIC_WS_URL=wss://ws.smartacademy.com.bd
NEXT_PUBLIC_STORAGE_URL=https://storage.smartacademy.com.bd
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx

# Database - Primary (PostgreSQL)
DATABASE_PRIMARY_URL=postgresql://user:pass@host:5432/dbname
DATABASE_PRIMARY_HOST=localhost
DATABASE_PRIMARY_PORT=5432
DATABASE_PRIMARY_NAME=smart_academy
DATABASE_PRIMARY_USER=sa_user
DATABASE_PRIMARY_PASSWORD=<secure-password>
DATABASE_PRIMARY_SSL=true
DATABASE_PRIMARY_POOL_MIN=2
DATABASE_PRIMARY_POOL_MAX=10

# Database - Gibbon (MySQL)
DATABASE_GIBBON_URL=mysql://user:pass@host:3306/gibbon
DATABASE_GIBBON_HOST=localhost
DATABASE_GIBBON_PORT=3306
DATABASE_GIBBON_NAME=gibbon
DATABASE_GIBBON_USER=gibbon_user
DATABASE_GIBBON_PASSWORD=<secure-password>

# Database - Moodle (MySQL)
DATABASE_MOODLE_URL=mysql://user:pass@host:3306/moodle
DATABASE_MOODLE_HOST=localhost
DATABASE_MOODLE_PORT=3306
DATABASE_MOODLE_NAME=moodle
DATABASE_MOODLE_USER=moodle_user
DATABASE_MOODLE_PASSWORD=<secure-password>

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=<secure-password>
REDIS_DB=0
REDIS_CACHE_DB=1
REDIS_SESSION_DB=2
REDIS_QUEUE_DB=3
REDIS_TLS=false

# Authentication
AUTH_JWT_SECRET=<random-64-chars>
AUTH_JWT_ACCESS_EXPIRY=15m
AUTH_JWT_REFRESH_EXPIRY=7d
AUTH_BCRYPT_ROUNDS=12
AUTH_SESSION_SECRET=<random-32-chars>
AUTH_COOKIE_DOMAIN=.smartacademy.com.bd
AUTH_COOKIE_SECURE=true

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=true
SMTP_USER=noreply@smartacademy.com.bd
SMTP_PASSWORD=<app-password>
SMTP_FROM_NAME=Smart Academy
SMTP_FROM_EMAIL=noreply@smartacademy.com.bd

# SMS Gateway (Bangladesh)
SMS_PROVIDER=ssl_wireless|bdbulksms|infobip
SMS_API_KEY=<api-key>
SMS_API_SECRET=<api-secret>
SMS_SENDER_ID=SmartAcademy
SMS_COUNTRY_CODE=+880

# Storage (S3/MinIO)
STORAGE_PROVIDER=s3|minio|local
STORAGE_ENDPOINT=https://s3.amazonaws.com
STORAGE_REGION=ap-south-1
STORAGE_BUCKET=smart-academy-files
STORAGE_ACCESS_KEY=<access-key>
STORAGE_SECRET_KEY=<secret-key>
STORAGE_CDN_URL=https://cdn.smartacademy.com.bd

# Payment - bKash
PAYMENT_BKASH_APP_KEY=<app-key>
PAYMENT_BKASH_APP_SECRET=<app-secret>
PAYMENT_BKASH_USERNAME=<username>
PAYMENT_BKASH_PASSWORD=<password>
PAYMENT_BKASH_SANDBOX=true
PAYMENT_BKASH_CALLBACK_URL=https://api.smartacademy.com.bd/payments/bkash/callback

# Payment - Nagad
PAYMENT_NAGAD_MERCHANT_ID=<merchant-id>
PAYMENT_NAGAD_MERCHANT_NUMBER=<merchant-number>
PAYMENT_NAGAD_PUBLIC_KEY=<public-key>
PAYMENT_NAGAD_PRIVATE_KEY=<private-key>
PAYMENT_NAGAD_SANDBOX=true
PAYMENT_NAGAD_CALLBACK_URL=https://api.smartacademy.com.bd/payments/nagad/callback

# Payment - SSLCommerz
PAYMENT_SSLCOMMERZ_STORE_ID=<store-id>
PAYMENT_SSLCOMMERZ_STORE_PASSWORD=<store-password>
PAYMENT_SSLCOMMERZ_SANDBOX=true
PAYMENT_SSLCOMMERZ_SUCCESS_URL=https://api.smartacademy.com.bd/payments/ssl/success
PAYMENT_SSLCOMMERZ_FAIL_URL=https://api.smartacademy.com.bd/payments/ssl/fail
PAYMENT_SSLCOMMERZ_CANCEL_URL=https://api.smartacademy.com.bd/payments/ssl/cancel

# Logging
LOG_LEVEL=debug|info|warn|error
LOG_FORMAT=json|pretty
LOG_FILE_PATH=/var/log/smart-academy
LOG_MAX_SIZE=10m
LOG_MAX_FILES=7

# Monitoring
SENTRY_DSN=https://xxx@sentry.io/xxx
SENTRY_ENVIRONMENT=development
SENTRY_TRACES_SAMPLE_RATE=0.1

# Rate Limiting
RATE_LIMIT_ENABLED=true
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGINS=https://smartacademy.com.bd,https://admin.smartacademy.com.bd
CORS_CREDENTIALS=true
```

### 2.2 Frontend Environment Variables

#### 2.2.1 Next.js Public Variables

```typescript
// src/lib/config/env.ts
import { z } from 'zod';

const clientEnvSchema = z.object({
  // App
  NEXT_PUBLIC_APP_NAME: z.string().default('Smart Academy'),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_WS_URL: z.string().url().optional(),

  // Storage
  NEXT_PUBLIC_STORAGE_URL: z.string().url().optional(),

  // Analytics
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),

  // Feature Flags
  NEXT_PUBLIC_FEATURE_DARK_MODE: z.coerce.boolean().default(true),
  NEXT_PUBLIC_FEATURE_BENGALI_UI: z.coerce.boolean().default(true),
  NEXT_PUBLIC_FEATURE_LIVE_CLASSES: z.coerce.boolean().default(false),
  NEXT_PUBLIC_FEATURE_PAYMENT_BKASH: z.coerce.boolean().default(true),
  NEXT_PUBLIC_FEATURE_PAYMENT_NAGAD: z.coerce.boolean().default(true),
});

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
  NEXT_PUBLIC_STORAGE_URL: process.env.NEXT_PUBLIC_STORAGE_URL,
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  NEXT_PUBLIC_FEATURE_DARK_MODE: process.env.NEXT_PUBLIC_FEATURE_DARK_MODE,
  NEXT_PUBLIC_FEATURE_BENGALI_UI: process.env.NEXT_PUBLIC_FEATURE_BENGALI_UI,
  NEXT_PUBLIC_FEATURE_LIVE_CLASSES: process.env.NEXT_PUBLIC_FEATURE_LIVE_CLASSES,
  NEXT_PUBLIC_FEATURE_PAYMENT_BKASH: process.env.NEXT_PUBLIC_FEATURE_PAYMENT_BKASH,
  NEXT_PUBLIC_FEATURE_PAYMENT_NAGAD: process.env.NEXT_PUBLIC_FEATURE_PAYMENT_NAGAD,
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;
```

#### 2.2.2 Next.js Server Variables

```typescript
// src/lib/config/server-env.ts
import { z } from 'zod';

const serverEnvSchema = z.object({
  // Node
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),

  // App
  APP_SECRET_KEY: z.string().min(32),

  // Database
  DATABASE_URL: z.string().url(),

  // Redis (for Next.js caching)
  REDIS_URL: z.string().optional(),

  // Auth
  AUTH_SECRET: z.string().min(32),

  // Sentry
  SENTRY_AUTH_TOKEN: z.string().optional(),
});

export const serverEnv = serverEnvSchema.parse(process.env);

export type ServerEnv = z.infer<typeof serverEnvSchema>;
```

### 2.3 Backend Environment Variables

#### 2.3.1 Fastify Configuration

```typescript
// src/config/env.ts
import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment-specific .env file
const envFile = process.env.NODE_ENV === 'production'
  ? '.env.production'
  : process.env.NODE_ENV === 'staging'
    ? '.env.staging'
    : '.env';

dotenv.config({ path: envFile });

const envSchema = z.object({
  // Node Environment
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),

  // Application
  APP_NAME: z.string().default('Smart Academy API'),
  APP_PORT: z.coerce.number().default(3001),
  APP_HOST: z.string().default('0.0.0.0'),
  APP_SECRET_KEY: z.string().min(32),
  APP_DEBUG: z.coerce.boolean().default(false),

  // Database - Primary (PostgreSQL)
  DATABASE_PRIMARY_URL: z.string().url(),
  DATABASE_PRIMARY_POOL_MIN: z.coerce.number().default(2),
  DATABASE_PRIMARY_POOL_MAX: z.coerce.number().default(10),

  // Database - Gibbon (MySQL)
  DATABASE_GIBBON_URL: z.string().url().optional(),

  // Database - Moodle (MySQL)
  DATABASE_MOODLE_URL: z.string().url().optional(),

  // Redis
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_DB: z.coerce.number().default(0),
  REDIS_TLS: z.coerce.boolean().default(false),

  // Authentication
  AUTH_JWT_SECRET: z.string().min(64),
  AUTH_JWT_ACCESS_EXPIRY: z.string().default('15m'),
  AUTH_JWT_REFRESH_EXPIRY: z.string().default('7d'),
  AUTH_BCRYPT_ROUNDS: z.coerce.number().default(12),

  // Email
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_SECURE: z.coerce.boolean().default(true),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
  SMTP_FROM_NAME: z.string().default('Smart Academy'),
  SMTP_FROM_EMAIL: z.string().email(),

  // SMS
  SMS_PROVIDER: z.enum(['ssl_wireless', 'bdbulksms', 'infobip']).default('ssl_wireless'),
  SMS_API_KEY: z.string(),
  SMS_API_SECRET: z.string().optional(),
  SMS_SENDER_ID: z.string().default('SmartAcademy'),

  // Storage
  STORAGE_PROVIDER: z.enum(['s3', 'minio', 'local']).default('local'),
  STORAGE_ENDPOINT: z.string().optional(),
  STORAGE_REGION: z.string().optional(),
  STORAGE_BUCKET: z.string().optional(),
  STORAGE_ACCESS_KEY: z.string().optional(),
  STORAGE_SECRET_KEY: z.string().optional(),
  STORAGE_LOCAL_PATH: z.string().default('./uploads'),

  // Payment - bKash
  PAYMENT_BKASH_APP_KEY: z.string().optional(),
  PAYMENT_BKASH_APP_SECRET: z.string().optional(),
  PAYMENT_BKASH_USERNAME: z.string().optional(),
  PAYMENT_BKASH_PASSWORD: z.string().optional(),
  PAYMENT_BKASH_SANDBOX: z.coerce.boolean().default(true),

  // Payment - Nagad
  PAYMENT_NAGAD_MERCHANT_ID: z.string().optional(),
  PAYMENT_NAGAD_PRIVATE_KEY: z.string().optional(),
  PAYMENT_NAGAD_SANDBOX: z.coerce.boolean().default(true),

  // Payment - SSLCommerz
  PAYMENT_SSLCOMMERZ_STORE_ID: z.string().optional(),
  PAYMENT_SSLCOMMERZ_STORE_PASSWORD: z.string().optional(),
  PAYMENT_SSLCOMMERZ_SANDBOX: z.coerce.boolean().default(true),

  // Logging
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  LOG_FORMAT: z.enum(['json', 'pretty']).default('pretty'),

  // Rate Limiting
  RATE_LIMIT_ENABLED: z.coerce.boolean().default(true),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),

  // CORS
  CORS_ORIGINS: z.string().transform(s => s.split(',')),
  CORS_CREDENTIALS: z.coerce.boolean().default(true),

  // Sentry
  SENTRY_DSN: z.string().optional(),
  SENTRY_TRACES_SAMPLE_RATE: z.coerce.number().default(0.1),
});

// Parse and validate
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(JSON.stringify(parsed.error.format(), null, 2));
  process.exit(1);
}

export const env = parsed.data;

export type Env = z.infer<typeof envSchema>;
```

---

## 3. Configuration Hierarchy

### 3.1 Configuration Precedence

Configuration values are loaded in the following order (later sources override earlier ones):

```plaintext
1. Default values (in code)
2. Base configuration file (.env)
3. Environment-specific file (.env.development, .env.staging, .env.production)
4. Local overrides (.env.local) - NOT committed to git
5. System environment variables
6. Command-line arguments (where applicable)
```

### 3.2 File Structure

```plaintext
project-root/
├── .env                      # Base configuration (committed, no secrets)
├── .env.example              # Template with all variables (committed)
├── .env.development          # Development overrides (committed, no secrets)
├── .env.staging              # Staging overrides (committed, no secrets)
├── .env.production           # Production overrides (committed, no secrets)
├── .env.local                # Local overrides (NOT committed)
├── .env.development.local    # Local dev overrides (NOT committed)
├── .env.staging.local        # Local staging overrides (NOT committed)
├── .env.production.local     # Local prod overrides (NOT committed)
│
├── apps/
│   ├── web/                  # Next.js Frontend
│   │   ├── .env.local        # Frontend local secrets
│   │   └── next.config.ts    # Next.js configuration
│   │
│   └── api/                  # Fastify Backend
│       ├── .env.local        # Backend local secrets
│       └── src/
│           └── config/
│               ├── index.ts          # Main config export
│               ├── env.ts            # Environment validation
│               ├── database.ts       # Database config
│               ├── redis.ts          # Redis config
│               ├── auth.ts           # Auth config
│               ├── storage.ts        # Storage config
│               ├── email.ts          # Email config
│               ├── sms.ts            # SMS config
│               ├── payment.ts        # Payment config
│               └── features.ts       # Feature flags
│
└── docker/
    ├── .env.docker           # Docker-specific config
    └── docker-compose.yml    # Docker services config
```

### 3.3 Monorepo Configuration (Turborepo)

```typescript
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [".env"],
  "globalEnv": [
    "NODE_ENV",
    "DATABASE_PRIMARY_URL",
    "REDIS_HOST",
    "REDIS_PORT"
  ],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "env": [
        "NEXT_PUBLIC_*",
        "DATABASE_*",
        "AUTH_*"
      ],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true,
      "env": ["*"]
    },
    "test": {
      "env": [
        "DATABASE_TEST_URL",
        "REDIS_TEST_*"
      ]
    }
  }
}
```

### 3.4 Configuration Modules

#### 3.4.1 Main Configuration Export

```typescript
// src/config/index.ts
import { env } from './env';
import { databaseConfig } from './database';
import { redisConfig } from './redis';
import { authConfig } from './auth';
import { storageConfig } from './storage';
import { emailConfig } from './email';
import { smsConfig } from './sms';
import { paymentConfig } from './payment';
import { featureFlags } from './features';

export const config = {
  env: env.NODE_ENV,
  isDev: env.NODE_ENV === 'development',
  isStaging: env.NODE_ENV === 'staging',
  isProd: env.NODE_ENV === 'production',
  debug: env.APP_DEBUG,

  app: {
    name: env.APP_NAME,
    port: env.APP_PORT,
    host: env.APP_HOST,
    secretKey: env.APP_SECRET_KEY,
  },

  database: databaseConfig,
  redis: redisConfig,
  auth: authConfig,
  storage: storageConfig,
  email: emailConfig,
  sms: smsConfig,
  payment: paymentConfig,
  features: featureFlags,

  logging: {
    level: env.LOG_LEVEL,
    format: env.LOG_FORMAT,
  },

  rateLimit: {
    enabled: env.RATE_LIMIT_ENABLED,
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    maxRequests: env.RATE_LIMIT_MAX_REQUESTS,
  },

  cors: {
    origins: env.CORS_ORIGINS,
    credentials: env.CORS_CREDENTIALS,
  },

  sentry: {
    dsn: env.SENTRY_DSN,
    tracesSampleRate: env.SENTRY_TRACES_SAMPLE_RATE,
  },
} as const;

export type Config = typeof config;
```

#### 3.4.2 Database Configuration

```typescript
// src/config/database.ts
import { env } from './env';

export const databaseConfig = {
  primary: {
    url: env.DATABASE_PRIMARY_URL,
    pool: {
      min: env.DATABASE_PRIMARY_POOL_MIN,
      max: env.DATABASE_PRIMARY_POOL_MAX,
    },
  },
  gibbon: env.DATABASE_GIBBON_URL ? {
    url: env.DATABASE_GIBBON_URL,
  } : null,
  moodle: env.DATABASE_MOODLE_URL ? {
    url: env.DATABASE_MOODLE_URL,
  } : null,
} as const;
```

#### 3.4.3 Redis Configuration

```typescript
// src/config/redis.ts
import { env } from './env';

export const redisConfig = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
  db: env.REDIS_DB,
  tls: env.REDIS_TLS ? {} : undefined,

  // Separate Redis databases for different purposes
  databases: {
    default: 0,
    cache: 1,
    session: 2,
    queue: 3,
    rateLimit: 4,
  },

  // Connection options
  options: {
    maxRetriesPerRequest: 3,
    retryDelayOnFailover: 100,
    enableReadyCheck: true,
    lazyConnect: true,
  },
} as const;
```

#### 3.4.4 Authentication Configuration

```typescript
// src/config/auth.ts
import { env } from './env';

export const authConfig = {
  jwt: {
    secret: env.AUTH_JWT_SECRET,
    accessExpiry: env.AUTH_JWT_ACCESS_EXPIRY,
    refreshExpiry: env.AUTH_JWT_REFRESH_EXPIRY,
    algorithm: 'HS256' as const,
    issuer: 'smart-academy',
    audience: 'smart-academy-users',
  },
  bcrypt: {
    rounds: env.AUTH_BCRYPT_ROUNDS,
  },
  cookie: {
    name: 'sa_refresh_token',
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/api/auth',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
  session: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
} as const;
```

#### 3.4.5 Storage Configuration

```typescript
// src/config/storage.ts
import { env } from './env';

export const storageConfig = {
  provider: env.STORAGE_PROVIDER,

  s3: env.STORAGE_PROVIDER === 's3' || env.STORAGE_PROVIDER === 'minio' ? {
    endpoint: env.STORAGE_ENDPOINT,
    region: env.STORAGE_REGION || 'ap-south-1',
    bucket: env.STORAGE_BUCKET!,
    accessKey: env.STORAGE_ACCESS_KEY!,
    secretKey: env.STORAGE_SECRET_KEY!,
    forcePathStyle: env.STORAGE_PROVIDER === 'minio',
  } : null,

  local: {
    path: env.STORAGE_LOCAL_PATH,
    maxFileSize: 50 * 1024 * 1024, // 50MB
  },

  allowedMimeTypes: {
    images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    videos: ['video/mp4', 'video/webm', 'video/quicktime'],
    audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  },

  maxFileSizes: {
    image: 10 * 1024 * 1024,      // 10MB
    document: 25 * 1024 * 1024,   // 25MB
    video: 500 * 1024 * 1024,     // 500MB
    audio: 50 * 1024 * 1024,      // 50MB
  },
} as const;
```

#### 3.4.6 Payment Configuration

```typescript
// src/config/payment.ts
import { env } from './env';

export const paymentConfig = {
  defaultCurrency: 'BDT',

  bkash: {
    enabled: !!env.PAYMENT_BKASH_APP_KEY,
    sandbox: env.PAYMENT_BKASH_SANDBOX,
    appKey: env.PAYMENT_BKASH_APP_KEY,
    appSecret: env.PAYMENT_BKASH_APP_SECRET,
    username: env.PAYMENT_BKASH_USERNAME,
    password: env.PAYMENT_BKASH_PASSWORD,
    baseUrl: env.PAYMENT_BKASH_SANDBOX
      ? 'https://tokenized.sandbox.bka.sh/v1.2.0-beta'
      : 'https://tokenized.pay.bka.sh/v1.2.0-beta',
  },

  nagad: {
    enabled: !!env.PAYMENT_NAGAD_MERCHANT_ID,
    sandbox: env.PAYMENT_NAGAD_SANDBOX,
    merchantId: env.PAYMENT_NAGAD_MERCHANT_ID,
    privateKey: env.PAYMENT_NAGAD_PRIVATE_KEY,
    baseUrl: env.PAYMENT_NAGAD_SANDBOX
      ? 'https://sandbox.nagad.com.bd/api/dfs'
      : 'https://api.nagad.com.bd/api/dfs',
  },

  sslcommerz: {
    enabled: !!env.PAYMENT_SSLCOMMERZ_STORE_ID,
    sandbox: env.PAYMENT_SSLCOMMERZ_SANDBOX,
    storeId: env.PAYMENT_SSLCOMMERZ_STORE_ID,
    storePassword: env.PAYMENT_SSLCOMMERZ_STORE_PASSWORD,
    baseUrl: env.PAYMENT_SSLCOMMERZ_SANDBOX
      ? 'https://sandbox.sslcommerz.com'
      : 'https://securepay.sslcommerz.com',
  },
} as const;
```

---

## 4. Secrets Management

### 4.1 Secret Categories

| Category | Examples | Storage Method |
|----------|----------|----------------|
| API Keys | Payment gateway keys, SMS API keys | Encrypted env vars |
| Database Credentials | Usernames, passwords | Encrypted env vars |
| JWT Secrets | Access token secret, refresh token secret | Encrypted env vars |
| Encryption Keys | Data encryption keys | Hardware Security Module |
| OAuth Credentials | Client secrets | Encrypted env vars |
| SSL Certificates | TLS certificates | Certificate manager |

### 4.2 Local Development Secrets

#### 4.2.1 Using .env.local

```bash
# .env.local (NEVER commit this file)
# Copy from .env.example and fill in actual values

# Database
DATABASE_PRIMARY_URL="postgresql://postgres:localdevpass@localhost:5432/smart_academy_dev"

# Redis
REDIS_PASSWORD="localredispass"

# Auth
AUTH_JWT_SECRET="local-dev-jwt-secret-min-64-chars-xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
APP_SECRET_KEY="local-dev-secret-key-32-chars-x"

# SMTP (using Mailhog for local dev)
SMTP_HOST="localhost"
SMTP_PORT=1025
SMTP_USER=""
SMTP_PASSWORD=""

# Payment (Sandbox credentials)
PAYMENT_BKASH_APP_KEY="sandbox_app_key"
PAYMENT_BKASH_APP_SECRET="sandbox_app_secret"
```

#### 4.2.2 Git Ignore Configuration

```gitignore
# .gitignore

# Environment files with secrets
.env.local
.env.*.local
.env.development.local
.env.staging.local
.env.production.local

# Secret key files
*.pem
*.key
*.p12
*.pfx
private.key
secrets/

# IDE and editor secrets
.vscode/settings.json
.idea/
```

### 4.3 Production Secrets Management

#### 4.3.1 Using HashiCorp Vault

```typescript
// src/lib/vault.ts
import Vault from 'node-vault';

const vault = Vault({
  apiVersion: 'v1',
  endpoint: process.env.VAULT_ADDR,
  token: process.env.VAULT_TOKEN,
});

export async function getSecret(path: string): Promise<Record<string, string>> {
  const result = await vault.read(`secret/data/${path}`);
  return result.data.data;
}

export async function getDatabaseCredentials() {
  return getSecret('smart-academy/database');
}

export async function getPaymentSecrets() {
  return getSecret('smart-academy/payment');
}

// Usage in config initialization
async function loadSecrets() {
  if (process.env.NODE_ENV === 'production') {
    const dbSecrets = await getDatabaseCredentials();
    process.env.DATABASE_PRIMARY_URL = dbSecrets.url;

    const paymentSecrets = await getPaymentSecrets();
    process.env.PAYMENT_BKASH_APP_SECRET = paymentSecrets.bkash_secret;
  }
}
```

#### 4.3.2 Using AWS Secrets Manager

```typescript
// src/lib/aws-secrets.ts
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

const client = new SecretsManagerClient({
  region: process.env.AWS_REGION || 'ap-south-1',
});

export async function getSecret(secretName: string): Promise<Record<string, string>> {
  const command = new GetSecretValueCommand({ SecretId: secretName });
  const response = await client.send(command);

  if (response.SecretString) {
    return JSON.parse(response.SecretString);
  }

  throw new Error(`Secret ${secretName} not found`);
}

// Load secrets at startup
export async function loadProductionSecrets() {
  if (process.env.NODE_ENV !== 'production') return;

  try {
    // Load database secrets
    const dbSecrets = await getSecret('smart-academy/prod/database');
    process.env.DATABASE_PRIMARY_URL = dbSecrets.DATABASE_PRIMARY_URL;
    process.env.DATABASE_PRIMARY_PASSWORD = dbSecrets.DATABASE_PRIMARY_PASSWORD;

    // Load auth secrets
    const authSecrets = await getSecret('smart-academy/prod/auth');
    process.env.AUTH_JWT_SECRET = authSecrets.AUTH_JWT_SECRET;

    // Load payment secrets
    const paymentSecrets = await getSecret('smart-academy/prod/payment');
    process.env.PAYMENT_BKASH_APP_SECRET = paymentSecrets.PAYMENT_BKASH_APP_SECRET;
    process.env.PAYMENT_NAGAD_PRIVATE_KEY = paymentSecrets.PAYMENT_NAGAD_PRIVATE_KEY;

    console.log('✅ Production secrets loaded from AWS Secrets Manager');
  } catch (error) {
    console.error('❌ Failed to load secrets:', error);
    process.exit(1);
  }
}
```

#### 4.3.3 Using Docker Secrets

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  api:
    image: smart-academy-api:latest
    secrets:
      - db_password
      - jwt_secret
      - bkash_secret
    environment:
      DATABASE_PRIMARY_PASSWORD_FILE: /run/secrets/db_password
      AUTH_JWT_SECRET_FILE: /run/secrets/jwt_secret
      PAYMENT_BKASH_APP_SECRET_FILE: /run/secrets/bkash_secret

secrets:
  db_password:
    external: true
  jwt_secret:
    external: true
  bkash_secret:
    external: true
```

```typescript
// src/lib/docker-secrets.ts
import fs from 'node:fs';
import path from 'node:path';

export function loadDockerSecrets() {
  const secretsPath = '/run/secrets';

  // Check if running in Docker with secrets
  if (!fs.existsSync(secretsPath)) {
    return;
  }

  // Map of environment variable to secret file
  const secretMappings: Record<string, string> = {
    DATABASE_PRIMARY_PASSWORD: 'db_password',
    AUTH_JWT_SECRET: 'jwt_secret',
    PAYMENT_BKASH_APP_SECRET: 'bkash_secret',
  };

  for (const [envVar, secretFile] of Object.entries(secretMappings)) {
    const filePath = path.join(secretsPath, secretFile);

    if (fs.existsSync(filePath)) {
      const secret = fs.readFileSync(filePath, 'utf-8').trim();
      process.env[envVar] = secret;
    }
  }
}
```

### 4.4 Secret Rotation

```typescript
// src/lib/secret-rotation.ts
import { EventEmitter } from 'node:events';

class SecretRotation extends EventEmitter {
  private rotationInterval: NodeJS.Timeout | null = null;

  startRotationCheck(intervalMs: number = 3600000) { // 1 hour
    this.rotationInterval = setInterval(async () => {
      await this.checkAndRotate();
    }, intervalMs);
  }

  async checkAndRotate() {
    // Check if secrets need rotation
    const secrets = await this.fetchCurrentSecrets();

    if (secrets.needsRotation) {
      await this.rotateSecrets(secrets);
      this.emit('secrets-rotated', secrets.rotatedKeys);
    }
  }

  private async fetchCurrentSecrets() {
    // Implementation depends on secret manager
    return { needsRotation: false, rotatedKeys: [] };
  }

  private async rotateSecrets(secrets: any) {
    // Rotate secrets and update environment
  }

  stop() {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
    }
  }
}

export const secretRotation = new SecretRotation();
```

---

## 5. Feature Flags

### 5.1 Feature Flag Configuration

```typescript
// src/config/features.ts
import { env } from './env';

export interface FeatureFlag {
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage?: number;
  allowedRoles?: string[];
  startDate?: Date;
  endDate?: Date;
}

export const featureFlags = {
  // UI Features
  darkMode: {
    key: 'dark_mode',
    name: 'Dark Mode',
    description: 'Enable dark mode theme option',
    enabled: process.env.FEATURE_DARK_MODE !== 'false',
  },

  bengaliUI: {
    key: 'bengali_ui',
    name: 'Bengali UI',
    description: 'Enable Bengali language interface',
    enabled: process.env.FEATURE_BENGALI_UI !== 'false',
  },

  // Academic Features
  liveClasses: {
    key: 'live_classes',
    name: 'Live Classes',
    description: 'Enable live class streaming feature',
    enabled: process.env.FEATURE_LIVE_CLASSES === 'true',
    allowedRoles: ['admin', 'teacher'],
  },

  quizSystem: {
    key: 'quiz_system',
    name: 'Quiz System',
    description: 'Enable interactive quiz system',
    enabled: process.env.FEATURE_QUIZ_SYSTEM !== 'false',
  },

  assignmentSubmission: {
    key: 'assignment_submission',
    name: 'Online Assignment Submission',
    description: 'Allow students to submit assignments online',
    enabled: process.env.FEATURE_ASSIGNMENT_SUBMISSION !== 'false',
  },

  // Payment Features
  bkashPayment: {
    key: 'payment_bkash',
    name: 'bKash Payment',
    description: 'Enable bKash mobile payment',
    enabled: process.env.FEATURE_PAYMENT_BKASH !== 'false',
  },

  nagadPayment: {
    key: 'payment_nagad',
    name: 'Nagad Payment',
    description: 'Enable Nagad mobile payment',
    enabled: process.env.FEATURE_PAYMENT_NAGAD !== 'false',
  },

  sslCommerzPayment: {
    key: 'payment_sslcommerz',
    name: 'SSLCommerz Payment',
    description: 'Enable SSLCommerz card payment',
    enabled: process.env.FEATURE_PAYMENT_SSLCOMMERZ === 'true',
  },

  // Communication Features
  smsNotifications: {
    key: 'sms_notifications',
    name: 'SMS Notifications',
    description: 'Enable SMS notifications for alerts',
    enabled: process.env.FEATURE_SMS_NOTIFICATIONS !== 'false',
  },

  emailNotifications: {
    key: 'email_notifications',
    name: 'Email Notifications',
    description: 'Enable email notifications',
    enabled: process.env.FEATURE_EMAIL_NOTIFICATIONS !== 'false',
  },

  pushNotifications: {
    key: 'push_notifications',
    name: 'Push Notifications',
    description: 'Enable browser push notifications',
    enabled: process.env.FEATURE_PUSH_NOTIFICATIONS === 'true',
  },

  // Islamic Education Features
  islamicModules: {
    key: 'islamic_modules',
    name: 'Islamic Education Modules',
    description: 'Enable Islamic education content and features',
    enabled: process.env.FEATURE_ISLAMIC_MODULES !== 'false',
  },

  prayerTimeWidget: {
    key: 'prayer_time_widget',
    name: 'Prayer Time Widget',
    description: 'Show prayer times on dashboard',
    enabled: process.env.FEATURE_PRAYER_TIME_WIDGET !== 'false',
  },

  // Experimental Features
  aiAssistant: {
    key: 'ai_assistant',
    name: 'AI Teaching Assistant',
    description: 'Enable AI-powered learning assistant',
    enabled: process.env.FEATURE_AI_ASSISTANT === 'true',
    rolloutPercentage: 10,
  },

  advancedAnalytics: {
    key: 'advanced_analytics',
    name: 'Advanced Analytics',
    description: 'Enable advanced learning analytics',
    enabled: process.env.FEATURE_ADVANCED_ANALYTICS === 'true',
    allowedRoles: ['admin'],
  },
} as const;

export type FeatureKey = keyof typeof featureFlags;
```

### 5.2 Feature Flag Service

```typescript
// src/services/feature-flag.service.ts
import { featureFlags, FeatureKey } from '@/config/features';
import { redis } from '@/lib/redis';

export class FeatureFlagService {
  private cache = new Map<string, boolean>();
  private cacheTimeout = 60000; // 1 minute

  async isEnabled(
    featureKey: FeatureKey,
    context?: {
      userId?: string;
      role?: string;
      percentage?: number;
    }
  ): Promise<boolean> {
    const feature = featureFlags[featureKey];

    if (!feature) {
      console.warn(`Unknown feature flag: ${featureKey}`);
      return false;
    }

    // Check base enabled status
    if (!feature.enabled) {
      return false;
    }

    // Check role restrictions
    if (feature.allowedRoles && context?.role) {
      if (!feature.allowedRoles.includes(context.role)) {
        return false;
      }
    }

    // Check rollout percentage
    if (feature.rolloutPercentage !== undefined && context?.userId) {
      const userPercentage = this.getUserPercentage(context.userId);
      if (userPercentage > feature.rolloutPercentage) {
        return false;
      }
    }

    // Check date restrictions
    const now = new Date();
    if (feature.startDate && now < feature.startDate) {
      return false;
    }
    if (feature.endDate && now > feature.endDate) {
      return false;
    }

    return true;
  }

  private getUserPercentage(userId: string): number {
    // Consistent hashing for user percentage
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = ((hash << 5) - hash) + userId.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash) % 100;
  }

  async getEnabledFeatures(context?: { userId?: string; role?: string }): Promise<FeatureKey[]> {
    const enabled: FeatureKey[] = [];

    for (const key of Object.keys(featureFlags) as FeatureKey[]) {
      if (await this.isEnabled(key, context)) {
        enabled.push(key);
      }
    }

    return enabled;
  }

  // Dynamic feature flag override (stored in Redis)
  async setOverride(featureKey: FeatureKey, enabled: boolean): Promise<void> {
    await redis.set(`feature:override:${featureKey}`, enabled ? '1' : '0');
    this.cache.delete(featureKey);
  }

  async removeOverride(featureKey: FeatureKey): Promise<void> {
    await redis.del(`feature:override:${featureKey}`);
    this.cache.delete(featureKey);
  }
}

export const featureFlagService = new FeatureFlagService();
```

### 5.3 Feature Flag Usage

#### 5.3.1 Server-Side Usage

```typescript
// In API routes
import { featureFlagService } from '@/services/feature-flag.service';

fastify.get('/api/v1/live-classes', async (request, reply) => {
  const isEnabled = await featureFlagService.isEnabled('liveClasses', {
    userId: request.user.id,
    role: request.user.role,
  });

  if (!isEnabled) {
    return reply.status(403).send({
      error: 'Feature not available',
      code: 'FEATURE_DISABLED',
    });
  }

  // Handle request...
});
```

#### 5.3.2 Client-Side Usage

```typescript
// src/hooks/use-feature-flag.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { clientEnv } from '@/lib/config/env';
import type { FeatureKey } from '@/config/features';

export function useFeatureFlag(featureKey: FeatureKey): boolean {
  // For public feature flags, check client env
  const publicKey = `NEXT_PUBLIC_FEATURE_${featureKey.toUpperCase()}` as keyof typeof clientEnv;

  if (publicKey in clientEnv) {
    return clientEnv[publicKey] as boolean;
  }

  // For server-controlled flags, fetch from API
  const { data } = useQuery({
    queryKey: ['feature-flags'],
    queryFn: async () => {
      const response = await fetch('/api/features');
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return data?.features?.[featureKey] ?? false;
}

// Usage in components
function LiveClassButton() {
  const liveClassesEnabled = useFeatureFlag('liveClasses');

  if (!liveClassesEnabled) {
    return null;
  }

  return <Button>Join Live Class</Button>;
}
```

#### 5.3.3 Feature Flag Component Wrapper

```typescript
// src/components/feature-flag.tsx
'use client';

import { useFeatureFlag } from '@/hooks/use-feature-flag';
import type { FeatureKey } from '@/config/features';
import type { ReactNode } from 'react';

interface FeatureFlagProps {
  feature: FeatureKey;
  children: ReactNode;
  fallback?: ReactNode;
}

export function FeatureFlag({ feature, children, fallback = null }: FeatureFlagProps) {
  const isEnabled = useFeatureFlag(feature);

  return isEnabled ? children : fallback;
}

// Usage
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <FeatureFlag feature="prayerTimeWidget">
        <PrayerTimeWidget />
      </FeatureFlag>

      <FeatureFlag
        feature="advancedAnalytics"
        fallback={<BasicAnalytics />}
      >
        <AdvancedAnalytics />
      </FeatureFlag>
    </div>
  );
}
```

---

## 6. Environment-Specific Configurations

### 6.1 Development Environment

```bash
# .env.development

# Application
NODE_ENV=development
APP_DEBUG=true
APP_URL=http://localhost:3000
API_URL=http://localhost:3001

# Frontend
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001

# Database (Local Docker)
DATABASE_PRIMARY_URL=postgresql://postgres:postgres@localhost:5432/smart_academy_dev
DATABASE_PRIMARY_POOL_MIN=1
DATABASE_PRIMARY_POOL_MAX=5

# Redis (Local Docker)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Auth (Weak for fast hashing in dev)
AUTH_BCRYPT_ROUNDS=4
AUTH_JWT_ACCESS_EXPIRY=1h

# Email (Mailhog)
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_USER=
SMTP_PASSWORD=

# Storage (Local filesystem)
STORAGE_PROVIDER=local
STORAGE_LOCAL_PATH=./uploads

# Payment (Sandbox)
PAYMENT_BKASH_SANDBOX=true
PAYMENT_NAGAD_SANDBOX=true
PAYMENT_SSLCOMMERZ_SANDBOX=true

# Logging
LOG_LEVEL=debug
LOG_FORMAT=pretty

# Rate Limiting (Disabled for dev)
RATE_LIMIT_ENABLED=false

# CORS (Allow all in dev)
CORS_ORIGINS=http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000

# Feature Flags (All enabled for testing)
FEATURE_DARK_MODE=true
FEATURE_BENGALI_UI=true
FEATURE_LIVE_CLASSES=true
FEATURE_AI_ASSISTANT=true
FEATURE_ADVANCED_ANALYTICS=true
```

### 6.2 Staging Environment

```bash
# .env.staging

# Application
NODE_ENV=staging
APP_DEBUG=false
APP_URL=https://staging.smartacademy.com.bd
API_URL=https://api-staging.smartacademy.com.bd

# Frontend
NEXT_PUBLIC_APP_URL=https://staging.smartacademy.com.bd
NEXT_PUBLIC_API_URL=https://api-staging.smartacademy.com.bd

# Database (Staging server)
DATABASE_PRIMARY_URL=postgresql://sa_staging:${DB_PASSWORD}@staging-db.internal:5432/smart_academy_staging
DATABASE_PRIMARY_POOL_MIN=2
DATABASE_PRIMARY_POOL_MAX=10

# Redis (Staging server)
REDIS_HOST=staging-redis.internal
REDIS_PORT=6379
REDIS_TLS=true

# Auth
AUTH_BCRYPT_ROUNDS=10
AUTH_JWT_ACCESS_EXPIRY=15m

# Storage (S3/MinIO staging bucket)
STORAGE_PROVIDER=s3
STORAGE_BUCKET=smart-academy-staging

# Payment (Sandbox)
PAYMENT_BKASH_SANDBOX=true
PAYMENT_NAGAD_SANDBOX=true
PAYMENT_SSLCOMMERZ_SANDBOX=true

# Logging
LOG_LEVEL=info
LOG_FORMAT=json

# Rate Limiting
RATE_LIMIT_ENABLED=true
RATE_LIMIT_MAX_REQUESTS=200

# CORS
CORS_ORIGINS=https://staging.smartacademy.com.bd,https://admin-staging.smartacademy.com.bd

# Sentry
SENTRY_ENVIRONMENT=staging
SENTRY_TRACES_SAMPLE_RATE=0.5

# Feature Flags (Selective)
FEATURE_DARK_MODE=true
FEATURE_BENGALI_UI=true
FEATURE_LIVE_CLASSES=true
FEATURE_AI_ASSISTANT=false
FEATURE_ADVANCED_ANALYTICS=true
```

### 6.3 Production Environment

```bash
# .env.production

# Application
NODE_ENV=production
APP_DEBUG=false
APP_URL=https://smartacademy.com.bd
API_URL=https://api.smartacademy.com.bd

# Frontend
NEXT_PUBLIC_APP_URL=https://smartacademy.com.bd
NEXT_PUBLIC_API_URL=https://api.smartacademy.com.bd
NEXT_PUBLIC_STORAGE_URL=https://cdn.smartacademy.com.bd

# Database (Production - credentials from secrets manager)
DATABASE_PRIMARY_POOL_MIN=5
DATABASE_PRIMARY_POOL_MAX=20

# Redis (Production cluster)
REDIS_TLS=true

# Auth (Strong security)
AUTH_BCRYPT_ROUNDS=12
AUTH_JWT_ACCESS_EXPIRY=15m
AUTH_COOKIE_SECURE=true

# Storage (Production S3)
STORAGE_PROVIDER=s3
STORAGE_REGION=ap-south-1
STORAGE_BUCKET=smart-academy-production

# Payment (Production)
PAYMENT_BKASH_SANDBOX=false
PAYMENT_NAGAD_SANDBOX=false
PAYMENT_SSLCOMMERZ_SANDBOX=false

# Logging
LOG_LEVEL=warn
LOG_FORMAT=json

# Rate Limiting (Strict)
RATE_LIMIT_ENABLED=true
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# CORS (Strict)
CORS_ORIGINS=https://smartacademy.com.bd,https://admin.smartacademy.com.bd,https://www.smartacademy.com.bd

# Sentry
SENTRY_ENVIRONMENT=production
SENTRY_TRACES_SAMPLE_RATE=0.1

# Feature Flags (Conservative)
FEATURE_DARK_MODE=true
FEATURE_BENGALI_UI=true
FEATURE_LIVE_CLASSES=false
FEATURE_AI_ASSISTANT=false
FEATURE_ADVANCED_ANALYTICS=false
```

### 6.4 Test Environment

```bash
# .env.test

# Application
NODE_ENV=test
APP_DEBUG=false

# Database (Test database)
DATABASE_PRIMARY_URL=postgresql://postgres:postgres@localhost:5432/smart_academy_test
DATABASE_PRIMARY_POOL_MIN=1
DATABASE_PRIMARY_POOL_MAX=5

# Redis (Test database)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=15

# Auth (Fast for tests)
AUTH_BCRYPT_ROUNDS=4
AUTH_JWT_SECRET=test-jwt-secret-for-testing-only-do-not-use-in-prod

# Email (Mock)
SMTP_HOST=localhost
SMTP_PORT=1025

# Storage (Memory/temp)
STORAGE_PROVIDER=local
STORAGE_LOCAL_PATH=./test-uploads

# Payment (Mock)
PAYMENT_BKASH_SANDBOX=true
PAYMENT_NAGAD_SANDBOX=true

# Logging (Minimal)
LOG_LEVEL=error

# Rate Limiting (Disabled)
RATE_LIMIT_ENABLED=false

# CORS
CORS_ORIGINS=*
```

### 6.5 Docker Development Environment

```yaml
# docker-compose.dev.yml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:16-alpine
    container_name: sa-postgres-dev
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: smart_academy_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./docker/init-db.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  # MySQL (for Gibbon/Moodle)
  mysql:
    image: mysql:8.0
    container_name: sa-mysql-dev
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: gibbon
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis
  redis:
    image: redis:7-alpine
    container_name: sa-redis-dev
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Mailhog (Email testing)
  mailhog:
    image: mailhog/mailhog
    container_name: sa-mailhog-dev
    ports:
      - "1025:1025"  # SMTP
      - "8025:8025"  # Web UI

  # MinIO (S3-compatible storage)
  minio:
    image: minio/minio
    container_name: sa-minio-dev
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - minio_data:/data

volumes:
  postgres_data:
  mysql_data:
  redis_data:
  minio_data:
```

```bash
# docker/.env.docker
# Used when running services in Docker

DATABASE_PRIMARY_HOST=postgres
DATABASE_PRIMARY_PORT=5432

DATABASE_GIBBON_HOST=mysql
DATABASE_GIBBON_PORT=3306

REDIS_HOST=redis

SMTP_HOST=mailhog
SMTP_PORT=1025

STORAGE_PROVIDER=minio
STORAGE_ENDPOINT=http://minio:9000
STORAGE_ACCESS_KEY=minioadmin
STORAGE_SECRET_KEY=minioadmin
```

---

## 7. Configuration Validation

### 7.1 Startup Validation

```typescript
// src/lib/validate-config.ts
import { z } from 'zod';
import { config } from '@/config';

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateConfiguration(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required checks
  if (!config.app.secretKey || config.app.secretKey.length < 32) {
    errors.push('APP_SECRET_KEY must be at least 32 characters');
  }

  if (!config.auth.jwt.secret || config.auth.jwt.secret.length < 64) {
    errors.push('AUTH_JWT_SECRET must be at least 64 characters');
  }

  if (!config.database.primary.url) {
    errors.push('DATABASE_PRIMARY_URL is required');
  }

  // Environment-specific checks
  if (config.isProd) {
    // Production-only validations
    if (config.debug) {
      errors.push('APP_DEBUG must be false in production');
    }

    if (config.auth.bcrypt.rounds < 10) {
      errors.push('AUTH_BCRYPT_ROUNDS must be at least 10 in production');
    }

    if (!config.cors.origins.every(o => o.startsWith('https://'))) {
      errors.push('All CORS origins must use HTTPS in production');
    }

    if (config.payment.bkash.sandbox) {
      errors.push('Payment gateways must not use sandbox in production');
    }

    if (!config.sentry.dsn) {
      warnings.push('SENTRY_DSN is not configured for production');
    }
  }

  // Feature-specific checks
  if (config.features.smsNotifications.enabled && !config.sms) {
    errors.push('SMS configuration required when SMS notifications enabled');
  }

  if (config.features.bkashPayment.enabled && !config.payment.bkash.appKey) {
    errors.push('bKash credentials required when bKash payment enabled');
  }

  // Connection string format validation
  try {
    new URL(config.database.primary.url);
  } catch {
    errors.push('DATABASE_PRIMARY_URL is not a valid URL');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// Run validation at startup
export function assertValidConfiguration(): void {
  const result = validateConfiguration();

  if (result.warnings.length > 0) {
    console.warn('⚠️ Configuration warnings:');
    result.warnings.forEach(w => console.warn(`  - ${w}`));
  }

  if (!result.valid) {
    console.error('❌ Configuration validation failed:');
    result.errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log('✅ Configuration validated successfully');
}
```

### 7.2 Health Check Endpoint

```typescript
// src/modules/health/health.controller.ts
import { FastifyInstance } from 'fastify';
import { config } from '@/config';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  environment: string;
  version: string;
  checks: {
    database: { status: string; latency?: number };
    redis: { status: string; latency?: number };
    storage: { status: string };
  };
}

export async function healthRoutes(fastify: FastifyInstance) {
  // Basic health check
  fastify.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // Detailed health check
  fastify.get('/health/detailed', async (): Promise<HealthStatus> => {
    const checks = {
      database: await checkDatabase(),
      redis: await checkRedis(),
      storage: await checkStorage(),
    };

    const allHealthy = Object.values(checks).every(c => c.status === 'ok');
    const anyUnhealthy = Object.values(checks).some(c => c.status === 'error');

    return {
      status: anyUnhealthy ? 'unhealthy' : allHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      environment: config.env,
      version: process.env.npm_package_version || '0.0.0',
      checks,
    };
  });

  // Readiness probe (for Kubernetes)
  fastify.get('/health/ready', async (request, reply) => {
    const dbCheck = await checkDatabase();
    const redisCheck = await checkRedis();

    if (dbCheck.status !== 'ok' || redisCheck.status !== 'ok') {
      return reply.status(503).send({ status: 'not ready' });
    }

    return { status: 'ready' };
  });

  // Liveness probe (for Kubernetes)
  fastify.get('/health/live', async () => {
    return { status: 'alive' };
  });
}

async function checkDatabase(): Promise<{ status: string; latency?: number }> {
  try {
    const start = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'ok', latency: Date.now() - start };
  } catch (error) {
    return { status: 'error' };
  }
}

async function checkRedis(): Promise<{ status: string; latency?: number }> {
  try {
    const start = Date.now();
    await redis.ping();
    return { status: 'ok', latency: Date.now() - start };
  } catch (error) {
    return { status: 'error' };
  }
}

async function checkStorage(): Promise<{ status: string }> {
  try {
    // Check storage connectivity based on provider
    if (config.storage.provider === 'local') {
      const fs = await import('node:fs/promises');
      await fs.access(config.storage.local.path);
    }
    // Add S3/MinIO check if needed
    return { status: 'ok' };
  } catch {
    return { status: 'error' };
  }
}
```

---

## 8. Configuration Files Reference

### 8.1 Next.js Configuration

```typescript
// apps/web/next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Standalone output for Docker
  output: process.env.DOCKER_BUILD === 'true' ? 'standalone' : undefined,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.smartacademy.com.bd',
      },
      {
        protocol: 'https',
        hostname: 'storage.smartacademy.com.bd',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Internationalization
  i18n: {
    locales: ['en', 'bn'],
    defaultLocale: 'en',
  },

  // Environment variables exposed to browser
  env: {
    NEXT_PUBLIC_BUILD_ID: process.env.VERCEL_GIT_COMMIT_SHA || 'local',
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Handle SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true,
      },
    ];
  },

  // Experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default nextConfig;
```

### 8.2 Vite Configuration (for Storybook/Testing)

```typescript
// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    define: {
      'process.env.NEXT_PUBLIC_APP_NAME': JSON.stringify(env.NEXT_PUBLIC_APP_NAME),
      'process.env.NEXT_PUBLIC_API_URL': JSON.stringify(env.NEXT_PUBLIC_API_URL),
    },

    server: {
      port: 6006,
      proxy: {
        '/api': {
          target: env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    },

    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
    },
  };
});
```

### 8.3 TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/config": ["./src/config/index.ts"],
      "@/lib/*": ["./src/lib/*"],
      "@/components/*": ["./src/components/*"]
    },
    "plugins": [
      { "name": "next" }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 8.4 Prisma Configuration

```prisma
// prisma/schema.prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["fullTextSearch", "multiSchema"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_PRIMARY_URL")
  schemas  = ["public", "auth", "academic", "financial"]
}

// Schema definitions...
```

### 8.5 Docker Configuration

```dockerfile
# Dockerfile
FROM node:22-alpine AS base

# Install dependencies only
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for environment
ARG NODE_ENV=production
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_URL

ENV NODE_ENV=$NODE_ENV
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV DOCKER_BUILD=true

RUN corepack enable pnpm && pnpm build

# Production runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

---

## 9. Deployment Configuration

### 9.1 CI/CD Environment Variables

```yaml
# .github/workflows/deploy.yml (partial)
env:
  # Build-time variables
  NODE_ENV: production
  NEXT_PUBLIC_APP_URL: ${{ vars.NEXT_PUBLIC_APP_URL }}
  NEXT_PUBLIC_API_URL: ${{ vars.NEXT_PUBLIC_API_URL }}

  # Runtime secrets (from GitHub Secrets)
  DATABASE_PRIMARY_URL: ${{ secrets.DATABASE_PRIMARY_URL }}
  AUTH_JWT_SECRET: ${{ secrets.AUTH_JWT_SECRET }}
  SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
```

### 9.2 GitHub Actions Secrets Setup

```plaintext
# Required Secrets in GitHub Repository Settings

# Database
DATABASE_PRIMARY_URL          # Production database connection string

# Authentication
AUTH_JWT_SECRET              # JWT signing secret (64+ chars)
APP_SECRET_KEY               # Application secret key (32+ chars)

# External Services
SENTRY_AUTH_TOKEN            # Sentry release tracking
SENTRY_DSN                   # Sentry error reporting

# Payment Gateways
PAYMENT_BKASH_APP_SECRET     # bKash API secret
PAYMENT_NAGAD_PRIVATE_KEY    # Nagad private key

# Storage
STORAGE_SECRET_KEY           # S3/MinIO secret key

# Email
SMTP_PASSWORD                # SMTP password

# SMS
SMS_API_SECRET               # SMS gateway secret
```

### 9.3 Kubernetes ConfigMaps and Secrets

```yaml
# k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: smart-academy-config
  namespace: production
data:
  NODE_ENV: "production"
  APP_NAME: "Smart Academy"
  APP_PORT: "3000"
  LOG_LEVEL: "info"
  LOG_FORMAT: "json"
  REDIS_HOST: "redis-cluster.production.svc.cluster.local"
  REDIS_PORT: "6379"
  CORS_ORIGINS: "https://smartacademy.com.bd,https://admin.smartacademy.com.bd"
  FEATURE_DARK_MODE: "true"
  FEATURE_BENGALI_UI: "true"
---
# k8s/secret.yaml (encrypted with sealed-secrets or similar)
apiVersion: v1
kind: Secret
metadata:
  name: smart-academy-secrets
  namespace: production
type: Opaque
stringData:
  DATABASE_PRIMARY_URL: "postgresql://..."
  AUTH_JWT_SECRET: "..."
  PAYMENT_BKASH_APP_SECRET: "..."
```

### 9.4 Environment Variable Injection

```yaml
# k8s/deployment.yaml (partial)
spec:
  containers:
    - name: api
      image: smart-academy-api:latest
      envFrom:
        - configMapRef:
            name: smart-academy-config
        - secretRef:
            name: smart-academy-secrets
      env:
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
```

---

## 10. Troubleshooting

### 10.1 Common Configuration Issues

| Issue | Symptoms | Solution |
|-------|----------|----------|
| Missing env variable | Startup crash with validation error | Check .env.local exists and contains required variable |
| Wrong database URL | Connection refused errors | Verify host, port, credentials in DATABASE_PRIMARY_URL |
| Redis connection failed | Cache/session errors | Check REDIS_HOST, REDIS_PORT, REDIS_PASSWORD |
| CORS errors | Browser blocks API requests | Add frontend URL to CORS_ORIGINS |
| JWT errors | Authentication failures | Ensure AUTH_JWT_SECRET is 64+ characters |
| Payment sandbox mode | Payments fail in production | Set PAYMENT_*_SANDBOX=false |

### 10.2 Debugging Configuration

```typescript
// src/lib/debug-config.ts
import { config } from '@/config';

export function debugConfiguration(): void {
  if (!config.isDev) {
    console.warn('⚠️ Debug output should only be used in development');
    return;
  }

  console.log('\n📋 Current Configuration:');
  console.log('═'.repeat(50));

  console.log('\n🏠 Application:');
  console.log(`  Environment: ${config.env}`);
  console.log(`  Debug: ${config.debug}`);
  console.log(`  Port: ${config.app.port}`);

  console.log('\n🗄️ Database:');
  console.log(`  Primary: ${maskConnectionString(config.database.primary.url)}`);
  console.log(`  Pool: ${config.database.primary.pool.min}-${config.database.primary.pool.max}`);

  console.log('\n📦 Redis:');
  console.log(`  Host: ${config.redis.host}:${config.redis.port}`);
  console.log(`  TLS: ${config.redis.tls ? 'enabled' : 'disabled'}`);

  console.log('\n🚩 Feature Flags:');
  Object.entries(config.features).forEach(([key, flag]) => {
    console.log(`  ${key}: ${flag.enabled ? '✅' : '❌'}`);
  });

  console.log('\n' + '═'.repeat(50));
}

function maskConnectionString(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.password) {
      parsed.password = '****';
    }
    return parsed.toString();
  } catch {
    return '(invalid URL)';
  }
}
```

### 10.3 Environment Verification Script

```bash
#!/bin/bash
# scripts/verify-env.sh

echo "🔍 Verifying environment configuration..."
echo ""

# Check required files
check_file() {
  if [ -f "$1" ]; then
    echo "✅ $1 exists"
  else
    echo "❌ $1 is missing"
  fi
}

check_file ".env"
check_file ".env.local"
check_file ".env.example"

echo ""

# Check required variables
check_var() {
  if [ -n "${!1}" ]; then
    echo "✅ $1 is set"
  else
    echo "❌ $1 is not set"
  fi
}

# Load .env.local
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi

echo "Checking required variables:"
check_var "DATABASE_PRIMARY_URL"
check_var "REDIS_HOST"
check_var "AUTH_JWT_SECRET"
check_var "APP_SECRET_KEY"

echo ""

# Check connections
echo "Testing connections:"

# Database
if pg_isready -h ${DATABASE_PRIMARY_HOST:-localhost} -p ${DATABASE_PRIMARY_PORT:-5432} > /dev/null 2>&1; then
  echo "✅ PostgreSQL is reachable"
else
  echo "❌ PostgreSQL is not reachable"
fi

# Redis
if redis-cli -h ${REDIS_HOST:-localhost} -p ${REDIS_PORT:-6379} ping > /dev/null 2>&1; then
  echo "✅ Redis is reachable"
else
  echo "❌ Redis is not reachable"
fi

echo ""
echo "Verification complete."
```

### 10.4 Configuration Migration

```typescript
// scripts/migrate-config.ts
/**
 * Script to migrate environment variables between versions
 * Run: npx tsx scripts/migrate-config.ts
 */

import fs from 'node:fs';
import path from 'node:path';

const migrations: Record<string, (env: Record<string, string>) => Record<string, string>> = {
  // v1.0 to v1.1: Rename DATABASE_URL to DATABASE_PRIMARY_URL
  '1.0_to_1.1': (env) => {
    if (env.DATABASE_URL && !env.DATABASE_PRIMARY_URL) {
      env.DATABASE_PRIMARY_URL = env.DATABASE_URL;
      delete env.DATABASE_URL;
    }
    return env;
  },

  // v1.1 to v1.2: Add new payment variables
  '1.1_to_1.2': (env) => {
    if (!env.PAYMENT_BKASH_SANDBOX) {
      env.PAYMENT_BKASH_SANDBOX = 'true';
    }
    return env;
  },
};

function parseEnvFile(content: string): Record<string, string> {
  const env: Record<string, string> = {};
  const lines = content.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const [key, ...valueParts] = trimmed.split('=');
    if (key) {
      env[key] = valueParts.join('=').replace(/^["']|["']$/g, '');
    }
  }

  return env;
}

function serializeEnv(env: Record<string, string>): string {
  return Object.entries(env)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
}

// Main migration logic
const envPath = path.join(process.cwd(), '.env.local');

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf-8');
  let env = parseEnvFile(content);

  // Apply all migrations
  for (const [version, migrate] of Object.entries(migrations)) {
    console.log(`Applying migration: ${version}`);
    env = migrate(env);
  }

  // Backup and write
  fs.copyFileSync(envPath, `${envPath}.backup`);
  fs.writeFileSync(envPath, serializeEnv(env));

  console.log('✅ Configuration migrated successfully');
} else {
  console.log('No .env.local file found');
}
```

---

## Appendix A: Environment Variable Template

```bash
# .env.example
# Copy this file to .env.local and fill in the values

#==============================================================================
# APPLICATION
#==============================================================================
NODE_ENV=development
APP_NAME=Smart Academy
APP_URL=http://localhost:3000
APP_PORT=3000
APP_DEBUG=true
APP_SECRET_KEY=                    # Required: 32+ character secret

#==============================================================================
# FRONTEND (Public - exposed to browser)
#==============================================================================
NEXT_PUBLIC_APP_NAME=Smart Academy
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001

#==============================================================================
# DATABASE - Primary (PostgreSQL)
#==============================================================================
DATABASE_PRIMARY_URL=              # Required: postgresql://user:pass@host:5432/db
DATABASE_PRIMARY_POOL_MIN=2
DATABASE_PRIMARY_POOL_MAX=10

#==============================================================================
# DATABASE - Gibbon (MySQL) - Optional
#==============================================================================
DATABASE_GIBBON_URL=               # Optional: mysql://user:pass@host:3306/gibbon

#==============================================================================
# DATABASE - Moodle (MySQL) - Optional
#==============================================================================
DATABASE_MOODLE_URL=               # Optional: mysql://user:pass@host:3306/moodle

#==============================================================================
# REDIS
#==============================================================================
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

#==============================================================================
# AUTHENTICATION
#==============================================================================
AUTH_JWT_SECRET=                   # Required: 64+ character secret
AUTH_JWT_ACCESS_EXPIRY=15m
AUTH_JWT_REFRESH_EXPIRY=7d
AUTH_BCRYPT_ROUNDS=12

#==============================================================================
# EMAIL (SMTP)
#==============================================================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=true
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM_NAME=Smart Academy
SMTP_FROM_EMAIL=noreply@smartacademy.com.bd

#==============================================================================
# SMS GATEWAY
#==============================================================================
SMS_PROVIDER=ssl_wireless
SMS_API_KEY=
SMS_API_SECRET=
SMS_SENDER_ID=SmartAcademy

#==============================================================================
# FILE STORAGE
#==============================================================================
STORAGE_PROVIDER=local             # local, s3, or minio
STORAGE_LOCAL_PATH=./uploads
STORAGE_ENDPOINT=
STORAGE_REGION=ap-south-1
STORAGE_BUCKET=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=

#==============================================================================
# PAYMENT - bKash
#==============================================================================
PAYMENT_BKASH_APP_KEY=
PAYMENT_BKASH_APP_SECRET=
PAYMENT_BKASH_USERNAME=
PAYMENT_BKASH_PASSWORD=
PAYMENT_BKASH_SANDBOX=true

#==============================================================================
# PAYMENT - Nagad
#==============================================================================
PAYMENT_NAGAD_MERCHANT_ID=
PAYMENT_NAGAD_PRIVATE_KEY=
PAYMENT_NAGAD_SANDBOX=true

#==============================================================================
# PAYMENT - SSLCommerz
#==============================================================================
PAYMENT_SSLCOMMERZ_STORE_ID=
PAYMENT_SSLCOMMERZ_STORE_PASSWORD=
PAYMENT_SSLCOMMERZ_SANDBOX=true

#==============================================================================
# LOGGING
#==============================================================================
LOG_LEVEL=debug
LOG_FORMAT=pretty

#==============================================================================
# MONITORING
#==============================================================================
SENTRY_DSN=
SENTRY_ENVIRONMENT=development

#==============================================================================
# RATE LIMITING
#==============================================================================
RATE_LIMIT_ENABLED=false
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

#==============================================================================
# CORS
#==============================================================================
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

#==============================================================================
# FEATURE FLAGS
#==============================================================================
FEATURE_DARK_MODE=true
FEATURE_BENGALI_UI=true
FEATURE_LIVE_CLASSES=false
FEATURE_QUIZ_SYSTEM=true
FEATURE_ASSIGNMENT_SUBMISSION=true
FEATURE_SMS_NOTIFICATIONS=false
FEATURE_EMAIL_NOTIFICATIONS=true
FEATURE_PUSH_NOTIFICATIONS=false
FEATURE_ISLAMIC_MODULES=true
FEATURE_PRAYER_TIME_WIDGET=true
FEATURE_AI_ASSISTANT=false
FEATURE_ADVANCED_ANALYTICS=false
FEATURE_PAYMENT_BKASH=true
FEATURE_PAYMENT_NAGAD=true
FEATURE_PAYMENT_SSLCOMMERZ=false
```

---

## Appendix B: Quick Reference Card

### Environment Files

| File | Purpose | Git |
|------|---------|-----|
| `.env` | Base config, no secrets | ✅ Commit |
| `.env.example` | Template for developers | ✅ Commit |
| `.env.development` | Dev environment overrides | ✅ Commit |
| `.env.staging` | Staging overrides | ✅ Commit |
| `.env.production` | Prod overrides (no secrets) | ✅ Commit |
| `.env.local` | Local secrets | ❌ Never |
| `.env.*.local` | Env-specific local secrets | ❌ Never |

### Prefix Reference

| Prefix | Visibility | Example |
|--------|------------|---------|
| `NEXT_PUBLIC_` | Browser + Server | `NEXT_PUBLIC_API_URL` |
| `DATABASE_` | Server only | `DATABASE_PRIMARY_URL` |
| `AUTH_` | Server only | `AUTH_JWT_SECRET` |
| `FEATURE_` | Configurable | `FEATURE_DARK_MODE` |

### Required Variables Checklist

- [ ] `DATABASE_PRIMARY_URL`
- [ ] `AUTH_JWT_SECRET` (64+ chars)
- [ ] `APP_SECRET_KEY` (32+ chars)
- [ ] `NEXT_PUBLIC_APP_URL`
- [ ] `NEXT_PUBLIC_API_URL`
- [ ] `CORS_ORIGINS`

---

**Document Version History:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-10 | Development Team | Initial document |

---

*This document is part of the Smart Academy Technical Specification series.*
