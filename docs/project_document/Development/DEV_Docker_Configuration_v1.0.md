# Docker Configuration

## Document Information
| Field | Value |
|-------|-------|
| **Document ID** | DEV-DCK-001 |
| **Version** | 1.0 |
| **Last Updated** | 2026-01-10 |
| **Author** | Smart Academy Development Team |
| **Status** | Active |

---

## Table of Contents
1. [Overview](#1-overview)
2. [Docker Compose Configuration](#2-docker-compose-configuration)
3. [Dockerfiles](#3-dockerfiles)
4. [Volume Mappings](#4-volume-mappings)
5. [Network Configuration](#5-network-configuration)
6. [Environment Variables](#6-environment-variables)
7. [Database Initialization](#7-database-initialization)
8. [Development Workflows](#8-development-workflows)
9. [Production Build](#9-production-build)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Overview

### 1.1 Purpose
This document provides comprehensive Docker configuration for the Smart Academy Digital Portal development environment. It covers containerized services, volume management, networking, and best practices for 2025-2026.

### 1.2 Container Architecture
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DOCKER DEVELOPMENT ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     Docker Network: smart-academy-network            │   │
│  │                                                                       │   │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐            │   │
│  │  │   PostgreSQL  │  │     MySQL     │  │     Redis     │            │   │
│  │  │               │  │               │  │               │            │   │
│  │  │  postgres:17  │  │   mysql:8.0   │  │   redis:7     │            │   │
│  │  │    :5432      │  │    :3306      │  │    :6379      │            │   │
│  │  │               │  │               │  │               │            │   │
│  │  │  Volume:      │  │  Volume:      │  │  Volume:      │            │   │
│  │  │  pg_data      │  │  mysql_data   │  │  redis_data   │            │   │
│  │  └───────────────┘  └───────────────┘  └───────────────┘            │   │
│  │                                                                       │   │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐            │   │
│  │  │    MinIO      │  │    Gibbon     │  │    Moodle     │            │   │
│  │  │               │  │               │  │               │            │   │
│  │  │  minio:latest │  │  gibbonedu/*  │  │   moodle:*    │            │   │
│  │  │  :9000/:9001  │  │  :8080/:8081  │  │    :8082      │            │   │
│  │  │               │  │               │  │               │            │   │
│  │  │  Volume:      │  │  Volume:      │  │  Volume:      │            │   │
│  │  │  minio_data   │  │  gibbon_data  │  │  moodle_data  │            │   │
│  │  └───────────────┘  └───────────────┘  └───────────────┘            │   │
│  │                                                                       │   │
│  │  ┌───────────────────────────────────────────────────────────────┐  │   │
│  │  │                    Mailhog (Development Only)                  │  │   │
│  │  │                    :1025 (SMTP) / :8025 (Web)                  │  │   │
│  │  └───────────────────────────────────────────────────────────────┘  │   │
│  │                                                                       │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Host Machine (Development)                                                  │
│  ─────────────────────────────────────────────────────────────────────────  │
│  │ Next.js (:3000) │ Admin (:3001) │ API (:4000) │ Expo (:8083) │          │
│  │ (pnpm dev)      │ (pnpm dev)    │ (pnpm dev)  │ (expo start) │          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Service Overview
| Service | Image | Port(s) | Purpose |
|---------|-------|---------|---------|
| PostgreSQL | `postgres:17-alpine` | 5432 | Primary database |
| MySQL | `mysql:8.0` | 3306 | Gibbon/Moodle database |
| Redis | `redis:7-alpine` | 6379 | Cache & sessions |
| MinIO | `minio/minio:latest` | 9000, 9001 | S3-compatible storage |
| Gibbon | `gibbonedu/gibbon:*` | 8080, 8081 | School Information System |
| Moodle | `bitnami/moodle:*` | 8082 | Learning Management System |
| Mailhog | `mailhog/mailhog` | 1025, 8025 | Email testing |

---

## 2. Docker Compose Configuration

### 2.1 Main Docker Compose File
```yaml
# docker-compose.yml
name: smart-academy

services:
  # ============================================
  # PostgreSQL - Primary Database
  # ============================================
  postgres:
    image: postgres:17-alpine
    container_name: smart-academy-postgres
    restart: unless-stopped
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-postgres}
      POSTGRES_DB: ${POSTGRES_DB:-smart_academy_dev}
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./docker/postgres/init:/docker-entrypoint-initdb.d:ro
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-postgres} -d ${POSTGRES_DB:-smart_academy_dev}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
    networks:
      - smart-academy-network
    deploy:
      resources:
        limits:
          memory: 2G
        reservations:
          memory: 512M

  # ============================================
  # MySQL - Gibbon/Moodle Database
  # ============================================
  mysql:
    image: mysql:8.0
    container_name: smart-academy-mysql
    restart: unless-stopped
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD:-root}
      MYSQL_DATABASE: ${MYSQL_DATABASE:-gibbon_dev}
      MYSQL_USER: ${MYSQL_USER:-gibbon}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD:-gibbon}
    volumes:
      - mysql_data:/var/lib/mysql
      - ./docker/mysql/init:/docker-entrypoint-initdb.d:ro
      - ./docker/mysql/conf.d:/etc/mysql/conf.d:ro
    command: >
      --default-authentication-plugin=mysql_native_password
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_unicode_ci
      --max_connections=200
      --innodb_buffer_pool_size=256M
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p${MYSQL_ROOT_PASSWORD:-root}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 60s
    networks:
      - smart-academy-network
    deploy:
      resources:
        limits:
          memory: 2G
        reservations:
          memory: 512M

  # ============================================
  # Redis - Cache & Session Store
  # ============================================
  redis:
    image: redis:7-alpine
    container_name: smart-academy-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    environment:
      REDIS_PASSWORD: ${REDIS_PASSWORD:-}
    command: >
      redis-server
      --appendonly yes
      --maxmemory 256mb
      --maxmemory-policy allkeys-lru
      ${REDIS_PASSWORD:+--requirepass ${REDIS_PASSWORD}}
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - smart-academy-network
    deploy:
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 128M

  # ============================================
  # MinIO - S3-Compatible Object Storage
  # ============================================
  minio:
    image: minio/minio:latest
    container_name: smart-academy-minio
    restart: unless-stopped
    ports:
      - "9000:9000"  # API
      - "9001:9001"  # Console
    environment:
      MINIO_ROOT_USER: ${MINIO_ROOT_USER:-minioadmin}
      MINIO_ROOT_PASSWORD: ${MINIO_ROOT_PASSWORD:-minioadmin}
      MINIO_BROWSER_REDIRECT_URL: http://localhost:9001
    command: server /data --console-address ":9001"
    volumes:
      - minio_data:/data
    healthcheck:
      test: ["CMD", "mc", "ready", "local"]
      interval: 30s
      timeout: 20s
      retries: 3
    networks:
      - smart-academy-network
    deploy:
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M

  # ============================================
  # MinIO Client - Bucket Initialization
  # ============================================
  minio-init:
    image: minio/mc:latest
    container_name: smart-academy-minio-init
    depends_on:
      minio:
        condition: service_healthy
    entrypoint: >
      /bin/sh -c "
      mc alias set myminio http://minio:9000 ${MINIO_ROOT_USER:-minioadmin} ${MINIO_ROOT_PASSWORD:-minioadmin};
      mc mb myminio/smart-academy-dev --ignore-existing;
      mc anonymous set download myminio/smart-academy-dev/public;
      mc mb myminio/smart-academy-avatars --ignore-existing;
      mc mb myminio/smart-academy-documents --ignore-existing;
      echo 'MinIO buckets initialized successfully';
      exit 0;
      "
    networks:
      - smart-academy-network

  # ============================================
  # Gibbon SIS
  # ============================================
  gibbon:
    image: gibbonedu/gibbon:v26.0.01
    container_name: smart-academy-gibbon
    restart: unless-stopped
    ports:
      - "8080:80"
      - "8081:443"
    environment:
      GIBBON_LOCALE: en_US
      GIBBON_INSTALL: auto
      GIBBON_TIMEZONE: Asia/Dhaka
      GIBBON_COUNTRY: Bangladesh
      GIBBON_CURRENCY: BDT
      MYSQL_HOST: mysql
      MYSQL_DATABASE: ${MYSQL_DATABASE:-gibbon_dev}
      MYSQL_USER: ${MYSQL_USER:-gibbon}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD:-gibbon}
    volumes:
      - gibbon_data:/var/www/html/uploads
    depends_on:
      mysql:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 120s
    networks:
      - smart-academy-network
    deploy:
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 256M

  # ============================================
  # Moodle LMS
  # ============================================
  moodle:
    image: bitnami/moodle:4.4
    container_name: smart-academy-moodle
    restart: unless-stopped
    ports:
      - "8082:8080"
      - "8443:8443"
    environment:
      MOODLE_DATABASE_TYPE: mysqli
      MOODLE_DATABASE_HOST: mysql
      MOODLE_DATABASE_PORT_NUMBER: 3306
      MOODLE_DATABASE_NAME: moodle_dev
      MOODLE_DATABASE_USER: ${MYSQL_USER:-gibbon}
      MOODLE_DATABASE_PASSWORD: ${MYSQL_PASSWORD:-gibbon}
      MOODLE_USERNAME: admin
      MOODLE_PASSWORD: ${MOODLE_ADMIN_PASSWORD:-Admin123!}
      MOODLE_EMAIL: admin@smartacademy.local
      MOODLE_SITE_NAME: Smart Academy LMS
      MOODLE_SKIP_BOOTSTRAP: no
      ALLOW_EMPTY_PASSWORD: no
    volumes:
      - moodle_data:/bitnami/moodle
      - moodledata_data:/bitnami/moodledata
    depends_on:
      mysql:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/login/index.php"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 180s
    networks:
      - smart-academy-network
    deploy:
      resources:
        limits:
          memory: 2G
        reservations:
          memory: 512M

  # ============================================
  # Mailhog - Email Testing (Development Only)
  # ============================================
  mailhog:
    image: mailhog/mailhog:latest
    container_name: smart-academy-mailhog
    restart: unless-stopped
    ports:
      - "1025:1025"  # SMTP
      - "8025:8025"  # Web UI
    networks:
      - smart-academy-network
    profiles:
      - dev-tools
    deploy:
      resources:
        limits:
          memory: 128M

# ============================================
# Volumes
# ============================================
volumes:
  postgres_data:
    name: smart-academy-postgres-data
    driver: local
  mysql_data:
    name: smart-academy-mysql-data
    driver: local
  redis_data:
    name: smart-academy-redis-data
    driver: local
  minio_data:
    name: smart-academy-minio-data
    driver: local
  gibbon_data:
    name: smart-academy-gibbon-data
    driver: local
  moodle_data:
    name: smart-academy-moodle-data
    driver: local
  moodledata_data:
    name: smart-academy-moodledata
    driver: local

# ============================================
# Networks
# ============================================
networks:
  smart-academy-network:
    name: smart-academy-network
    driver: bridge
    ipam:
      config:
        - subnet: 172.28.0.0/16
```

### 2.2 Development Override File
```yaml
# docker-compose.override.yml
# Automatically loaded with docker-compose.yml in development

services:
  # Enable Mailhog in development
  mailhog:
    profiles: []  # Remove profile restriction

  # PostgreSQL with debug logging
  postgres:
    command: >
      postgres
      -c log_statement=all
      -c log_duration=on
      -c log_min_duration_statement=100

  # MySQL with query logging
  mysql:
    command: >
      --default-authentication-plugin=mysql_native_password
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_unicode_ci
      --general-log=1
      --general-log-file=/var/log/mysql/general.log

  # Redis with verbose logging
  redis:
    command: >
      redis-server
      --appendonly yes
      --loglevel verbose
      --maxmemory 256mb
      --maxmemory-policy allkeys-lru
```

### 2.3 Production Compose File
```yaml
# docker-compose.prod.yml
# Usage: docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

services:
  postgres:
    restart: always
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    deploy:
      resources:
        limits:
          memory: 4G
        reservations:
          memory: 2G

  mysql:
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    deploy:
      resources:
        limits:
          memory: 4G
        reservations:
          memory: 2G

  redis:
    restart: always
    command: >
      redis-server
      --appendonly yes
      --maxmemory 1gb
      --maxmemory-policy allkeys-lru
      --requirepass ${REDIS_PASSWORD}
    deploy:
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 512M

  # Remove development-only services
  mailhog:
    deploy:
      replicas: 0
```

---

## 3. Dockerfiles

### 3.1 API Dockerfile (Multi-Stage)
```dockerfile
# apps/api/Dockerfile

# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:22-alpine AS deps

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/
COPY packages/config/package.json ./packages/config/

# Install dependencies
RUN pnpm install --frozen-lockfile --filter @smart-academy/api...

# ============================================
# Stage 2: Builder
# ============================================
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=deps /app/packages ./packages

# Copy source code
COPY apps/api ./apps/api
COPY packages ./packages
COPY tsconfig.json ./

# Generate Prisma client
RUN pnpm --filter @smart-academy/api prisma:generate

# Build the application
RUN pnpm --filter @smart-academy/api build

# ============================================
# Stage 3: Production
# ============================================
FROM node:22-alpine AS runner

RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 fastify

WORKDIR /app

# Copy built application
COPY --from=builder --chown=fastify:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=fastify:nodejs /app/apps/api/node_modules ./node_modules
COPY --from=builder --chown=fastify:nodejs /app/apps/api/package.json ./

# Copy Prisma files for migrations
COPY --from=builder --chown=fastify:nodejs /app/apps/api/prisma ./prisma

# Set environment
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4000

# Switch to non-root user
USER fastify

EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4000/health || exit 1

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]
```

### 3.2 Web (Next.js) Dockerfile
```dockerfile
# apps/web/Dockerfile

# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:22-alpine AS deps

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/shared/package.json ./packages/shared/
COPY packages/ui/package.json ./packages/ui/

# Install dependencies
RUN pnpm install --frozen-lockfile --filter @smart-academy/web...

# ============================================
# Stage 2: Builder
# ============================================
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /app/packages ./packages

# Copy source code
COPY apps/web ./apps/web
COPY packages ./packages
COPY tsconfig.json ./

# Build arguments for environment
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_URL

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}

# Build the application
RUN pnpm --filter @smart-academy/web build

# ============================================
# Stage 3: Production
# ============================================
FROM node:22-alpine AS runner

RUN apk add --no-cache dumb-init

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/apps/web/public ./public

# Copy Next.js build output
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static

# Set environment
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

USER nextjs

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
```

### 3.3 Admin (Vite) Dockerfile
```dockerfile
# apps/admin/Dockerfile

# ============================================
# Stage 1: Build
# ============================================
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/admin/package.json ./apps/admin/
COPY packages/shared/package.json ./packages/shared/
COPY packages/ui/package.json ./packages/ui/

# Install dependencies
RUN pnpm install --frozen-lockfile --filter @smart-academy/admin...

# Copy source code
COPY apps/admin ./apps/admin
COPY packages ./packages
COPY tsconfig.json ./

# Build arguments
ARG VITE_API_URL
ARG VITE_APP_NAME

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_APP_NAME=${VITE_APP_NAME}

# Build the application
RUN pnpm --filter @smart-academy/admin build

# ============================================
# Stage 2: Production (nginx)
# ============================================
FROM nginx:alpine AS runner

# Copy nginx configuration
COPY apps/admin/nginx.conf /etc/nginx/nginx.conf

# Copy built assets
COPY --from=builder /app/apps/admin/dist /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 3.4 Admin Nginx Configuration
```nginx
# apps/admin/nginx.conf

worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;

        # Static file caching
        location /assets/ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # SPA fallback
        location / {
            try_files $uri $uri/ /index.html;
        }

        # API proxy (if needed)
        location /api/ {
            proxy_pass http://api:4000/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Health check endpoint
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }
}
```

---

## 4. Volume Mappings

### 4.1 Volume Configuration Matrix
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         VOLUME MAPPING MATRIX                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Volume Name              │ Container Path              │ Purpose            │
│  ─────────────────────────┼─────────────────────────────┼─────────────────── │
│  postgres_data            │ /var/lib/postgresql/data    │ PostgreSQL data    │
│  mysql_data               │ /var/lib/mysql              │ MySQL data         │
│  redis_data               │ /data                       │ Redis persistence  │
│  minio_data               │ /data                       │ Object storage     │
│  gibbon_data              │ /var/www/html/uploads       │ Gibbon uploads     │
│  moodle_data              │ /bitnami/moodle             │ Moodle files       │
│  moodledata_data          │ /bitnami/moodledata         │ Moodle data        │
│                                                                              │
│  Bind Mounts (Development)                                                   │
│  ─────────────────────────────────────────────────────────────────────────  │
│  ./docker/postgres/init   │ /docker-entrypoint-initdb.d │ DB init scripts    │
│  ./docker/mysql/init      │ /docker-entrypoint-initdb.d │ DB init scripts    │
│  ./docker/mysql/conf.d    │ /etc/mysql/conf.d           │ MySQL config       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Volume Backup Scripts
```bash
#!/bin/bash
# scripts/backup-volumes.sh

BACKUP_DIR="./backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "📦 Backing up Docker volumes..."

# PostgreSQL backup
docker exec smart-academy-postgres pg_dumpall -U postgres > "$BACKUP_DIR/postgres_backup.sql"
echo "✅ PostgreSQL backed up"

# MySQL backup
docker exec smart-academy-mysql mysqldump -u root -proot --all-databases > "$BACKUP_DIR/mysql_backup.sql"
echo "✅ MySQL backed up"

# Redis backup (RDB file)
docker exec smart-academy-redis redis-cli BGSAVE
sleep 5
docker cp smart-academy-redis:/data/dump.rdb "$BACKUP_DIR/redis_backup.rdb"
echo "✅ Redis backed up"

# MinIO backup (copy data)
docker run --rm \
  -v smart-academy-minio-data:/source:ro \
  -v "$BACKUP_DIR:/backup" \
  alpine tar czf /backup/minio_backup.tar.gz -C /source .
echo "✅ MinIO backed up"

echo "📁 Backup completed: $BACKUP_DIR"
ls -lh "$BACKUP_DIR"
```

### 4.3 Volume Restore Scripts
```bash
#!/bin/bash
# scripts/restore-volumes.sh

if [ -z "$1" ]; then
  echo "Usage: ./restore-volumes.sh <backup_directory>"
  exit 1
fi

BACKUP_DIR="$1"

echo "⚠️  This will replace all existing data. Continue? (y/n)"
read -r confirm
if [ "$confirm" != "y" ]; then
  echo "Aborted."
  exit 0
fi

# Stop services
docker compose down

# Restore PostgreSQL
docker compose up -d postgres
sleep 10
docker exec -i smart-academy-postgres psql -U postgres < "$BACKUP_DIR/postgres_backup.sql"
echo "✅ PostgreSQL restored"

# Restore MySQL
docker compose up -d mysql
sleep 20
docker exec -i smart-academy-mysql mysql -u root -proot < "$BACKUP_DIR/mysql_backup.sql"
echo "✅ MySQL restored"

# Restore Redis
docker run --rm \
  -v smart-academy-redis-data:/data \
  -v "$BACKUP_DIR:/backup:ro" \
  alpine cp /backup/redis_backup.rdb /data/dump.rdb
echo "✅ Redis restored"

# Restore MinIO
docker run --rm \
  -v smart-academy-minio-data:/data \
  -v "$BACKUP_DIR:/backup:ro" \
  alpine tar xzf /backup/minio_backup.tar.gz -C /data
echo "✅ MinIO restored"

# Restart all services
docker compose up -d
echo "🚀 All services restored and restarted"
```

---

## 5. Network Configuration

### 5.1 Network Topology
```yaml
# Network configuration in docker-compose.yml
networks:
  smart-academy-network:
    name: smart-academy-network
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: 172.28.0.0/16
          gateway: 172.28.0.1
```

### 5.2 Service DNS Names
| Service | Internal DNS | External Port |
|---------|--------------|---------------|
| PostgreSQL | `postgres` | 5432 |
| MySQL | `mysql` | 3306 |
| Redis | `redis` | 6379 |
| MinIO | `minio` | 9000, 9001 |
| Gibbon | `gibbon` | 8080, 8081 |
| Moodle | `moodle` | 8082 |
| Mailhog | `mailhog` | 1025, 8025 |

### 5.3 Connection Strings
```bash
# PostgreSQL (from host)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/smart_academy_dev"

# PostgreSQL (from container)
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/smart_academy_dev"

# MySQL (from host)
MYSQL_URL="mysql://root:root@localhost:3306/gibbon_dev"

# MySQL (from container)
MYSQL_URL="mysql://root:root@mysql:3306/gibbon_dev"

# Redis (from host)
REDIS_URL="redis://localhost:6379"

# Redis (from container)
REDIS_URL="redis://redis:6379"

# MinIO (from host)
MINIO_ENDPOINT="localhost"
MINIO_PORT=9000

# MinIO (from container)
MINIO_ENDPOINT="minio"
MINIO_PORT=9000
```

---

## 6. Environment Variables

### 6.1 Docker Environment File
```bash
# .env (for Docker Compose)

# ===========================
# PostgreSQL
# ===========================
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=smart_academy_dev

# ===========================
# MySQL
# ===========================
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=gibbon_dev
MYSQL_USER=gibbon
MYSQL_PASSWORD=gibbon

# ===========================
# Redis
# ===========================
REDIS_PASSWORD=

# ===========================
# MinIO
# ===========================
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin

# ===========================
# Moodle
# ===========================
MOODLE_ADMIN_PASSWORD=Admin123!

# ===========================
# Compose Settings
# ===========================
COMPOSE_PROJECT_NAME=smart-academy
COMPOSE_FILE=docker-compose.yml
```

### 6.2 Environment Variable Injection
```yaml
# Using env_file in docker-compose.yml
services:
  api:
    env_file:
      - .env
      - .env.local  # Optional overrides
    environment:
      # Override specific variables
      NODE_ENV: development
      DATABASE_URL: "postgresql://postgres:postgres@postgres:5432/smart_academy_dev"
```

---

## 7. Database Initialization

### 7.1 PostgreSQL Init Scripts
```sql
-- docker/postgres/init/01-init.sql

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";

-- Create additional databases
CREATE DATABASE smart_academy_test;
CREATE DATABASE smart_academy_shadow;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE smart_academy_dev TO postgres;
GRANT ALL PRIVILEGES ON DATABASE smart_academy_test TO postgres;
GRANT ALL PRIVILEGES ON DATABASE smart_academy_shadow TO postgres;

-- Create read-only user for reporting
CREATE USER readonly_user WITH PASSWORD 'readonly_password';
GRANT CONNECT ON DATABASE smart_academy_dev TO readonly_user;

\echo 'PostgreSQL initialization complete!'
```

```bash
#!/bin/bash
# docker/postgres/init/02-setup.sh

set -e

echo "Running PostgreSQL setup script..."

# Create schemas
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE SCHEMA IF NOT EXISTS audit;
    CREATE SCHEMA IF NOT EXISTS analytics;
EOSQL

echo "PostgreSQL setup complete!"
```

### 7.2 MySQL Init Scripts
```sql
-- docker/mysql/init/01-init.sql

-- Create Moodle database
CREATE DATABASE IF NOT EXISTS moodle_dev
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Grant permissions
GRANT ALL PRIVILEGES ON gibbon_dev.* TO 'gibbon'@'%';
GRANT ALL PRIVILEGES ON moodle_dev.* TO 'gibbon'@'%';
FLUSH PRIVILEGES;

-- Create additional user for Moodle
CREATE USER IF NOT EXISTS 'moodle'@'%' IDENTIFIED BY 'moodle';
GRANT ALL PRIVILEGES ON moodle_dev.* TO 'moodle'@'%';
FLUSH PRIVILEGES;
```

### 7.3 MySQL Configuration
```ini
# docker/mysql/conf.d/custom.cnf

[mysqld]
# Character Set
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

# InnoDB Settings
innodb_buffer_pool_size = 256M
innodb_log_file_size = 64M
innodb_flush_log_at_trx_commit = 2

# Connection Settings
max_connections = 200
wait_timeout = 28800
interactive_timeout = 28800

# Query Cache (deprecated in MySQL 8, but shown for reference)
# query_cache_type = 1
# query_cache_size = 32M

# Logging
log_error = /var/log/mysql/error.log
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2

[mysql]
default-character-set = utf8mb4

[client]
default-character-set = utf8mb4
```

---

## 8. Development Workflows

### 8.1 Quick Start Commands
```bash
# Start all services
docker compose up -d

# Start with build
docker compose up -d --build

# Start specific services
docker compose up -d postgres redis minio

# View logs
docker compose logs -f

# View specific service logs
docker compose logs -f postgres

# Stop all services
docker compose down

# Stop and remove volumes (CAUTION: Deletes all data)
docker compose down -v

# Restart specific service
docker compose restart postgres

# Execute command in container
docker compose exec postgres psql -U postgres

# Check service health
docker compose ps
```

### 8.2 Development Helper Scripts
```bash
#!/bin/bash
# scripts/docker-dev.sh

case "$1" in
  start)
    echo "🚀 Starting development environment..."
    docker compose up -d
    echo "⏳ Waiting for services to be healthy..."
    sleep 10
    docker compose ps
    echo "✅ Development environment ready!"
    echo ""
    echo "Services:"
    echo "  PostgreSQL: localhost:5432"
    echo "  MySQL:      localhost:3306"
    echo "  Redis:      localhost:6379"
    echo "  MinIO:      localhost:9000 (Console: localhost:9001)"
    echo "  Gibbon:     localhost:8080"
    echo "  Moodle:     localhost:8082"
    echo "  Mailhog:    localhost:8025"
    ;;

  stop)
    echo "🛑 Stopping development environment..."
    docker compose down
    echo "✅ Stopped!"
    ;;

  restart)
    echo "🔄 Restarting development environment..."
    docker compose restart
    echo "✅ Restarted!"
    ;;

  reset)
    echo "⚠️  This will delete all data. Continue? (y/n)"
    read -r confirm
    if [ "$confirm" = "y" ]; then
      docker compose down -v
      docker compose up -d
      echo "✅ Environment reset complete!"
    else
      echo "Aborted."
    fi
    ;;

  logs)
    docker compose logs -f "${@:2}"
    ;;

  shell)
    service="${2:-postgres}"
    case "$service" in
      postgres)
        docker compose exec postgres psql -U postgres -d smart_academy_dev
        ;;
      mysql)
        docker compose exec mysql mysql -u root -proot gibbon_dev
        ;;
      redis)
        docker compose exec redis redis-cli
        ;;
      *)
        docker compose exec "$service" sh
        ;;
    esac
    ;;

  status)
    docker compose ps
    echo ""
    echo "📊 Resource Usage:"
    docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"
    ;;

  *)
    echo "Usage: $0 {start|stop|restart|reset|logs|shell|status}"
    echo ""
    echo "Commands:"
    echo "  start   - Start all Docker services"
    echo "  stop    - Stop all Docker services"
    echo "  restart - Restart all Docker services"
    echo "  reset   - Reset all data and restart"
    echo "  logs    - View service logs (optional: service name)"
    echo "  shell   - Open shell in container (postgres|mysql|redis)"
    echo "  status  - Show container status and resource usage"
    exit 1
    ;;
esac
```

### 8.3 Makefile for Docker Commands
```makefile
# Makefile

.PHONY: docker-up docker-down docker-restart docker-logs docker-shell docker-reset

# Default target
.DEFAULT_GOAL := help

# Help
help:
	@echo "Docker Development Commands:"
	@echo "  make docker-up      - Start all services"
	@echo "  make docker-down    - Stop all services"
	@echo "  make docker-restart - Restart all services"
	@echo "  make docker-logs    - View logs"
	@echo "  make docker-shell   - Open database shell"
	@echo "  make docker-reset   - Reset all data"
	@echo "  make docker-status  - Show status"

docker-up:
	docker compose up -d
	@echo "Waiting for services..."
	@sleep 5
	docker compose ps

docker-down:
	docker compose down

docker-restart:
	docker compose restart

docker-logs:
	docker compose logs -f

docker-shell:
	docker compose exec postgres psql -U postgres -d smart_academy_dev

docker-reset:
	docker compose down -v
	docker compose up -d

docker-status:
	docker compose ps
	@echo ""
	docker stats --no-stream
```

### 8.4 Docker Compose Watch (Hot Reload)
```yaml
# docker-compose.yml - Development with watch mode
services:
  api:
    build:
      context: .
      dockerfile: apps/api/Dockerfile
      target: builder
    volumes:
      - ./apps/api/src:/app/apps/api/src:ro
    develop:
      watch:
        - action: sync
          path: ./apps/api/src
          target: /app/apps/api/src
        - action: rebuild
          path: ./apps/api/package.json
```

```bash
# Start with watch mode
docker compose up --watch
# or
docker compose watch
```

---

## 9. Production Build

### 9.1 Production Docker Compose
```yaml
# docker-compose.production.yml
version: '3.9'

services:
  api:
    image: smart-academy/api:${TAG:-latest}
    build:
      context: .
      dockerfile: apps/api/Dockerfile
      args:
        - NODE_ENV=production
    restart: always
    ports:
      - "4000:4000"
    environment:
      NODE_ENV: production
      DATABASE_URL: ${DATABASE_URL}
      REDIS_URL: ${REDIS_URL}
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    deploy:
      replicas: 2
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 512M
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost:4000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    networks:
      - smart-academy-network

  web:
    image: smart-academy/web:${TAG:-latest}
    build:
      context: .
      dockerfile: apps/web/Dockerfile
      args:
        - NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
        - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
    restart: always
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
    deploy:
      replicas: 2
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost:3000/"]
      interval: 30s
      timeout: 10s
      retries: 3
    networks:
      - smart-academy-network

  admin:
    image: smart-academy/admin:${TAG:-latest}
    build:
      context: .
      dockerfile: apps/admin/Dockerfile
      args:
        - VITE_API_URL=${VITE_API_URL}
    restart: always
    ports:
      - "3001:80"
    deploy:
      resources:
        limits:
          memory: 128M
        reservations:
          memory: 64M
    networks:
      - smart-academy-network
```

### 9.2 Build and Push Script
```bash
#!/bin/bash
# scripts/docker-build.sh

set -e

# Configuration
REGISTRY="${DOCKER_REGISTRY:-ghcr.io/smart-academy}"
TAG="${TAG:-$(git rev-parse --short HEAD)}"

echo "🏗️  Building Docker images..."
echo "Registry: $REGISTRY"
echo "Tag: $TAG"

# Build images
docker build -t "$REGISTRY/api:$TAG" -t "$REGISTRY/api:latest" \
  -f apps/api/Dockerfile .

docker build -t "$REGISTRY/web:$TAG" -t "$REGISTRY/web:latest" \
  --build-arg NEXT_PUBLIC_API_URL="$NEXT_PUBLIC_API_URL" \
  --build-arg NEXT_PUBLIC_APP_URL="$NEXT_PUBLIC_APP_URL" \
  -f apps/web/Dockerfile .

docker build -t "$REGISTRY/admin:$TAG" -t "$REGISTRY/admin:latest" \
  --build-arg VITE_API_URL="$VITE_API_URL" \
  -f apps/admin/Dockerfile .

echo "✅ Build complete!"

# Push to registry (optional)
if [ "$PUSH" = "true" ]; then
  echo "📤 Pushing to registry..."
  docker push "$REGISTRY/api:$TAG"
  docker push "$REGISTRY/api:latest"
  docker push "$REGISTRY/web:$TAG"
  docker push "$REGISTRY/web:latest"
  docker push "$REGISTRY/admin:$TAG"
  docker push "$REGISTRY/admin:latest"
  echo "✅ Push complete!"
fi
```

---

## 10. Troubleshooting

### 10.1 Common Issues and Solutions

#### Container Won't Start
```bash
# Check logs
docker compose logs <service-name>

# Check container status
docker compose ps

# Inspect container
docker inspect <container-id>

# Common fixes:
# 1. Port already in use
sudo lsof -i :5432
sudo kill -9 <pid>

# 2. Volume permission issues
docker compose down -v
docker compose up -d

# 3. Image issues
docker compose pull
docker compose up -d --force-recreate
```

#### Database Connection Issues
```bash
# Check if database is healthy
docker compose exec postgres pg_isready -U postgres

# Check database logs
docker compose logs postgres

# Test connection from host
psql -h localhost -U postgres -d smart_academy_dev

# Reset database
docker compose down -v
docker compose up -d postgres
```

#### Out of Disk Space
```bash
# Check Docker disk usage
docker system df

# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune

# Full cleanup
docker system prune -a --volumes
```

#### Slow Performance
```bash
# Check resource usage
docker stats

# Increase Docker resources (Docker Desktop)
# Settings → Resources → Advanced

# Use local volumes for better I/O
# Change from bind mounts to named volumes
```

### 10.2 Health Check Commands
```bash
# Check all service health
docker compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Health}}"

# Individual health checks
docker compose exec postgres pg_isready -U postgres
docker compose exec mysql mysqladmin ping -h localhost -u root -proot
docker compose exec redis redis-cli ping
docker compose exec minio mc ready local
```

### 10.3 Debug Mode
```bash
# Run container with debug
docker compose run --rm postgres bash

# Override entrypoint
docker run --rm -it --entrypoint bash postgres:17-alpine

# View container environment
docker compose exec api env

# Access container filesystem
docker compose exec api ls -la /app
```

---

## Appendices

### Appendix A: Docker Compose Cheat Sheet
```bash
# Basic Commands
docker compose up -d                    # Start services
docker compose down                     # Stop services
docker compose restart                  # Restart services
docker compose logs -f                  # View logs
docker compose ps                       # List containers
docker compose exec <service> <cmd>     # Execute command

# Build Commands
docker compose build                    # Build images
docker compose build --no-cache         # Build without cache
docker compose up -d --build            # Start with build
docker compose pull                     # Pull latest images

# Cleanup Commands
docker compose down -v                  # Remove with volumes
docker compose down --rmi all           # Remove with images
docker system prune -a                  # Full cleanup
```

### Appendix B: Service URLs Quick Reference
| Service | URL | Credentials |
|---------|-----|-------------|
| PostgreSQL | `localhost:5432` | postgres/postgres |
| MySQL | `localhost:3306` | root/root |
| Redis | `localhost:6379` | - |
| MinIO Console | `localhost:9001` | minioadmin/minioadmin |
| Gibbon | `localhost:8080` | admin/setup |
| Moodle | `localhost:8082` | admin/Admin123! |
| Mailhog | `localhost:8025` | - |
| Prisma Studio | `localhost:5555` | - |

---

## Document History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-10 | Smart Academy Team | Initial document |
