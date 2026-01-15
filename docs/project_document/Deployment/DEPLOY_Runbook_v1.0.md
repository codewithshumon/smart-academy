# Deployment Runbook

## Smart Academy Digital Portal

### Version 1.0 | January 2026

---

## Document Control

| Field | Details |
|-------|---------|
| **Document Title** | Deployment Runbook |
| **Version** | 1.0 |
| **Status** | Draft |
| **Created Date** | January 2026 |
| **Last Updated** | January 2026 |
| **Author** | Development Team |
| **Classification** | Internal |

---

## Table of Contents

1. [Overview](#1-overview)
2. [Pre-Deployment Checklist](#2-pre-deployment-checklist)
3. [Deployment Steps](#3-deployment-steps)
4. [Post-Deployment Verification](#4-post-deployment-verification)
5. [Rollback Procedures](#5-rollback-procedures)
6. [Emergency Contacts](#6-emergency-contacts)
7. [Troubleshooting Guide](#7-troubleshooting-guide)
8. [Appendices](#8-appendices)

---

## 1. Overview

### 1.1 Purpose

This runbook provides step-by-step procedures for deploying, verifying, and maintaining the Smart Academy Digital Portal in production environments. It serves as the authoritative guide for all deployment activities.

### 1.2 Scope

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Deployment Runbook Scope                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │
│  │   Pre-Deploy    │  │    Deploy       │  │   Post-Deploy   │     │
│  │   Activities    │──│    Process      │──│   Verification  │     │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘     │
│          │                    │                    │                │
│          ▼                    ▼                    ▼                │
│  • Checklist         • Step-by-step       • Health checks          │
│  • Approvals         • Blue-green         • Smoke tests            │
│  • Backups           • Database           • Monitoring             │
│  • Notifications     • Configuration      • Notifications          │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Rollback Procedures                       │   │
│  │         (Available at any stage if issues detected)          │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.3 Target Environments

| Environment | Purpose | Deployment Window |
|-------------|---------|-------------------|
| Development | Feature development | Continuous |
| Staging | Pre-production testing | On-demand |
| Production | Live system | Scheduled maintenance windows |

### 1.4 Deployment Types

| Type | Description | Downtime | Risk Level |
|------|-------------|----------|------------|
| **Standard** | Regular feature releases | Zero (blue-green) | Low |
| **Hotfix** | Critical bug fixes | Zero | Medium |
| **Emergency** | Security patches | Minimal | High |
| **Database Migration** | Schema changes | Possible | Medium-High |
| **Infrastructure** | Server/network changes | Planned | Medium |

---

## 2. Pre-Deployment Checklist

### 2.1 Master Checklist

```
╔══════════════════════════════════════════════════════════════════════╗
║                     PRE-DEPLOYMENT CHECKLIST                         ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  PHASE 1: PLANNING & APPROVAL                                        ║
║  ───────────────────────────────────────────────────────────────     ║
║  □ Deployment date/time confirmed                                    ║
║  □ Change request approved                                           ║
║  □ Stakeholders notified                                             ║
║  □ Rollback plan documented                                          ║
║  □ Support team availability confirmed                               ║
║                                                                      ║
║  PHASE 2: CODE & BUILD VERIFICATION                                  ║
║  ───────────────────────────────────────────────────────────────     ║
║  □ All CI/CD pipeline stages passed                                  ║
║  □ Security scans completed (no critical issues)                     ║
║  □ Code review approved                                              ║
║  □ Version tag created in Git                                        ║
║  □ Release notes prepared                                            ║
║                                                                      ║
║  PHASE 3: TESTING VERIFICATION                                       ║
║  ───────────────────────────────────────────────────────────────     ║
║  □ Unit tests passed (>80% coverage)                                 ║
║  □ Integration tests passed                                          ║
║  □ E2E tests passed on staging                                       ║
║  □ Performance tests passed (within thresholds)                      ║
║  □ UAT sign-off received (if applicable)                             ║
║                                                                      ║
║  PHASE 4: INFRASTRUCTURE READINESS                                   ║
║  ───────────────────────────────────────────────────────────────     ║
║  □ Server resources adequate                                         ║
║  □ Database backup completed                                         ║
║  □ File storage backup completed                                     ║
║  □ SSL certificates valid                                            ║
║  □ DNS configuration verified                                        ║
║                                                                      ║
║  PHASE 5: CONFIGURATION                                              ║
║  ───────────────────────────────────────────────────────────────     ║
║  □ Environment variables updated                                     ║
║  □ Feature flags configured                                          ║
║  □ Third-party API keys verified                                     ║
║  □ Database connection strings verified                              ║
║  □ Cache configuration reviewed                                      ║
║                                                                      ║
║  PHASE 6: FINAL CHECKS                                               ║
║  ───────────────────────────────────────────────────────────────     ║
║  □ Monitoring dashboards ready                                       ║
║  □ Alert thresholds configured                                       ║
║  □ Log aggregation functional                                        ║
║  □ Communication channels open                                       ║
║  □ Emergency contacts available                                      ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

### 2.2 Detailed Verification Scripts

#### 2.2.1 Pipeline Status Check

```bash
#!/bin/bash
# pre-deploy-pipeline-check.sh

echo "=== Pre-Deployment Pipeline Verification ==="
echo ""

# Check latest CI run
echo "Checking CI pipeline status..."
gh run list --workflow=ci.yml --limit=1 --json status,conclusion

# Verify all checks passed
LATEST_RUN=$(gh run list --workflow=ci.yml --limit=1 --json conclusion -q '.[0].conclusion')
if [ "$LATEST_RUN" != "success" ]; then
    echo "ERROR: Latest CI run did not succeed"
    exit 1
fi

echo "✓ CI pipeline passed"

# Check staging deployment
echo ""
echo "Checking staging deployment status..."
gh run list --workflow=deploy-staging.yml --limit=1 --json status,conclusion

echo "=== Pipeline verification complete ==="
```

#### 2.2.2 Database Backup Verification

```bash
#!/bin/bash
# pre-deploy-backup-check.sh

set -e

echo "=== Database Backup Verification ==="
BACKUP_DATE=$(date +%Y%m%d)
BACKUP_DIR="/backups/database"

# PostgreSQL backup check
echo "Checking PostgreSQL backup..."
PG_BACKUP="${BACKUP_DIR}/postgres/smart_academy_${BACKUP_DATE}.sql.gz"
if [ -f "$PG_BACKUP" ]; then
    SIZE=$(du -h "$PG_BACKUP" | cut -f1)
    echo "✓ PostgreSQL backup found: $PG_BACKUP ($SIZE)"
else
    echo "ERROR: PostgreSQL backup not found"
    echo "Run: ./scripts/backup-database.sh postgres"
    exit 1
fi

# MySQL backup check (Gibbon/Moodle)
echo "Checking MySQL backup..."
MYSQL_BACKUP="${BACKUP_DIR}/mysql/gibbon_${BACKUP_DATE}.sql.gz"
if [ -f "$MYSQL_BACKUP" ]; then
    SIZE=$(du -h "$MYSQL_BACKUP" | cut -f1)
    echo "✓ MySQL backup found: $MYSQL_BACKUP ($SIZE)"
else
    echo "WARNING: MySQL backup not found"
fi

# Test backup integrity
echo ""
echo "Verifying backup integrity..."
gunzip -t "$PG_BACKUP" && echo "✓ PostgreSQL backup integrity verified"

echo ""
echo "=== Backup verification complete ==="
```

#### 2.2.3 Infrastructure Health Check

```bash
#!/bin/bash
# pre-deploy-infra-check.sh

echo "=== Infrastructure Health Check ==="
echo ""

# Check disk space
echo "Checking disk space..."
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | tr -d '%')
if [ "$DISK_USAGE" -gt 80 ]; then
    echo "WARNING: Disk usage at ${DISK_USAGE}%"
else
    echo "✓ Disk usage: ${DISK_USAGE}%"
fi

# Check memory
echo ""
echo "Checking memory..."
FREE_MEM=$(free -m | awk 'NR==2 {printf "%.1f", $7/$2*100}')
echo "✓ Available memory: ${FREE_MEM}%"

# Check Docker
echo ""
echo "Checking Docker status..."
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | head -20
echo ""

# Check external services
echo "Checking external services connectivity..."

# Cloudflare
curl -s -o /dev/null -w "Cloudflare API: %{http_code}\n" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    https://api.cloudflare.com/client/v4/user/tokens/verify

# Payment gateways
echo "SSLCommerz: $(curl -s -o /dev/null -w "%{http_code}" https://sandbox.sslcommerz.com/gwprocess/v4/api.php)"
echo "bKash API: $(curl -s -o /dev/null -w "%{http_code}" https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized)"

echo ""
echo "=== Infrastructure health check complete ==="
```

### 2.3 Pre-Deployment Notification Template

```markdown
## Deployment Notification

**System:** Smart Academy Digital Portal
**Environment:** Production
**Scheduled Time:** [DATE] [TIME] (Bangladesh Time, UTC+6)
**Duration:** Approximately [X] minutes
**Type:** [Standard/Hotfix/Emergency]

### Changes Included
- [Feature/Fix 1]
- [Feature/Fix 2]
- [Feature/Fix 3]

### Expected Impact
- Zero downtime (blue-green deployment)
- [Any specific feature impacts]

### Contacts
- Deployment Lead: [Name] ([Contact])
- Technical Lead: [Name] ([Contact])

### Status Updates
Updates will be posted to: #deployments channel

---
*This is an automated notification from the deployment system.*
```

---

## 3. Deployment Steps

### 3.1 Deployment Process Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        DEPLOYMENT PROCESS FLOW                          │
└─────────────────────────────────────────────────────────────────────────┘

 START
   │
   ▼
┌──────────────────┐
│  1. Initialize   │
│  Deployment      │────────────────────────────────────────────┐
└────────┬─────────┘                                            │
         │                                                      │
         ▼                                                      │
┌──────────────────┐                                            │
│  2. Pull Latest  │     ┌───────────────────────────────────┐  │
│  Code & Images   │────▶│ If error: Abort & notify team     │  │
└────────┬─────────┘     └───────────────────────────────────┘  │
         │                                                      │
         ▼                                                      │
┌──────────────────┐                                            │
│  3. Run Database │     ┌───────────────────────────────────┐  │
│  Migrations      │────▶│ If error: Rollback migrations     │──┤
└────────┬─────────┘     └───────────────────────────────────┘  │
         │                                                      │
         ▼                                                      │
┌──────────────────┐                                            │
│  4. Deploy to    │                                            │
│  Green Stack     │                                            │
└────────┬─────────┘                                            │
         │                                                      │
         ▼                                                      │
┌──────────────────┐                                            │
│  5. Health Check │     ┌───────────────────────────────────┐  │
│  Green Stack     │────▶│ If unhealthy: Keep blue, abort    │──┤
└────────┬─────────┘     └───────────────────────────────────┘  │
         │                                                      │
         ▼                                                      │
┌──────────────────┐                                            │
│  6. Switch       │                                            │
│  Traffic (Nginx) │                                            │
└────────┬─────────┘                                            │
         │                                                      │
         ▼                                                      │
┌──────────────────┐                                            │
│  7. Verify       │     ┌───────────────────────────────────┐  │
│  Production      │────▶│ If error: Rollback to blue        │──┤
└────────┬─────────┘     └───────────────────────────────────┘  │
         │                                                      │
         ▼                                                      │
┌──────────────────┐                                            │
│  8. Cleanup      │                                            │
│  & Notify        │                                            │
└────────┬─────────┘                                            │
         │                                                      │
         ▼                                                      │
       END                                            ROLLBACK ◀┘
```

### 3.2 Step-by-Step Deployment Procedure

#### Step 1: Initialize Deployment

```bash
#!/bin/bash
# deploy-step1-initialize.sh

set -e

DEPLOY_ID=$(date +%Y%m%d%H%M%S)
DEPLOY_LOG="/var/log/deployments/${DEPLOY_ID}.log"

echo "=== Deployment ${DEPLOY_ID} Started ===" | tee -a $DEPLOY_LOG
echo "Time: $(date)" | tee -a $DEPLOY_LOG
echo "Operator: $USER" | tee -a $DEPLOY_LOG

# Create deployment directory
mkdir -p /var/log/deployments

# Set deployment marker
echo "$DEPLOY_ID" > /tmp/current_deployment_id

# Send start notification
curl -X POST "$SLACK_WEBHOOK_URL" \
    -H "Content-Type: application/json" \
    -d "{\"text\": \"🚀 Deployment ${DEPLOY_ID} started\"}"

echo "Deployment initialized successfully"
```

#### Step 2: Pull Latest Code and Images

```bash
#!/bin/bash
# deploy-step2-pull.sh

set -e

DEPLOY_ID=$(cat /tmp/current_deployment_id)
echo "=== Step 2: Pulling Latest Code and Images ===" | tee -a /var/log/deployments/${DEPLOY_ID}.log

cd /app/smart-academy

# Pull latest code
echo "Pulling latest code from main branch..."
git fetch origin
git checkout main
git pull origin main

# Get the deployment tag
VERSION=$(git describe --tags --always)
echo "Deploying version: $VERSION" | tee -a /var/log/deployments/${DEPLOY_ID}.log

# Login to container registry
echo "$GITHUB_TOKEN" | docker login ghcr.io -u $GITHUB_USER --password-stdin

# Pull latest images
echo "Pulling Docker images..."
docker compose -f docker-compose.prod.yml pull

echo "✓ Code and images pulled successfully"
```

#### Step 3: Run Database Migrations

```bash
#!/bin/bash
# deploy-step3-migrations.sh

set -e

DEPLOY_ID=$(cat /tmp/current_deployment_id)
echo "=== Step 3: Running Database Migrations ===" | tee -a /var/log/deployments/${DEPLOY_ID}.log

cd /app/smart-academy

# Create migration backup point
echo "Creating migration checkpoint..."
MIGRATION_CHECKPOINT=$(date +%Y%m%d%H%M%S)
echo $MIGRATION_CHECKPOINT > /tmp/migration_checkpoint

# Check for pending migrations
echo "Checking for pending migrations..."
docker compose -f docker-compose.prod.yml run --rm api \
    npx prisma migrate status

# Run migrations
echo "Applying database migrations..."
docker compose -f docker-compose.prod.yml run --rm api \
    npx prisma migrate deploy

# Verify migration success
echo "Verifying migration status..."
docker compose -f docker-compose.prod.yml run --rm api \
    npx prisma migrate status

echo "✓ Database migrations completed successfully"
```

#### Step 4: Deploy to Green Stack

```bash
#!/bin/bash
# deploy-step4-green-deploy.sh

set -e

DEPLOY_ID=$(cat /tmp/current_deployment_id)
echo "=== Step 4: Deploying to Green Stack ===" | tee -a /var/log/deployments/${DEPLOY_ID}.log

cd /app/smart-academy

# Determine current active stack
CURRENT_STACK=$(cat /etc/nginx/conf.d/active-stack 2>/dev/null || echo "blue")
if [ "$CURRENT_STACK" = "blue" ]; then
    TARGET_STACK="green"
else
    TARGET_STACK="blue"
fi

echo "Current stack: $CURRENT_STACK"
echo "Target stack: $TARGET_STACK"

# Deploy to target stack
echo "Starting $TARGET_STACK stack..."
docker compose -f docker-compose.prod.yml \
    -f docker-compose.${TARGET_STACK}.yml \
    up -d --remove-orphans

# Wait for containers to be ready
echo "Waiting for containers to start..."
sleep 30

# Show container status
docker compose -f docker-compose.prod.yml \
    -f docker-compose.${TARGET_STACK}.yml \
    ps

echo "✓ Green stack deployed successfully"
echo "$TARGET_STACK" > /tmp/target_stack
```

#### Step 5: Health Check Green Stack

```bash
#!/bin/bash
# deploy-step5-healthcheck.sh

set -e

DEPLOY_ID=$(cat /tmp/current_deployment_id)
TARGET_STACK=$(cat /tmp/target_stack)
echo "=== Step 5: Health Checking $TARGET_STACK Stack ===" | tee -a /var/log/deployments/${DEPLOY_ID}.log

# Define health check endpoints
if [ "$TARGET_STACK" = "green" ]; then
    API_PORT=4001
    WEB_PORT=3002
    ADMIN_PORT=3003
else
    API_PORT=4000
    WEB_PORT=3000
    ADMIN_PORT=3001
fi

MAX_RETRIES=30
RETRY_INTERVAL=10

# Health check function
health_check() {
    local service=$1
    local url=$2
    local retries=0

    echo "Checking $service health..."
    while [ $retries -lt $MAX_RETRIES ]; do
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$url" || echo "000")
        if [ "$HTTP_CODE" = "200" ]; then
            echo "✓ $service is healthy"
            return 0
        fi
        retries=$((retries + 1))
        echo "  Attempt $retries/$MAX_RETRIES - HTTP $HTTP_CODE"
        sleep $RETRY_INTERVAL
    done
    echo "✗ $service health check failed"
    return 1
}

# Run health checks
health_check "API Server" "http://localhost:${API_PORT}/health"
health_check "Web Application" "http://localhost:${WEB_PORT}/api/health"
health_check "Admin Dashboard" "http://localhost:${ADMIN_PORT}/api/health"

# Database connectivity check
echo "Checking database connectivity..."
docker compose -f docker-compose.prod.yml exec -T api \
    npx prisma db execute --stdin <<< "SELECT 1"
echo "✓ Database connectivity verified"

# Redis connectivity check
echo "Checking Redis connectivity..."
docker compose -f docker-compose.prod.yml exec -T redis redis-cli ping
echo "✓ Redis connectivity verified"

echo ""
echo "=== All health checks passed ==="
```

#### Step 6: Switch Traffic

```bash
#!/bin/bash
# deploy-step6-switch-traffic.sh

set -e

DEPLOY_ID=$(cat /tmp/current_deployment_id)
TARGET_STACK=$(cat /tmp/target_stack)
echo "=== Step 6: Switching Traffic to $TARGET_STACK ===" | tee -a /var/log/deployments/${DEPLOY_ID}.log

# Backup current nginx config
cp /etc/nginx/conf.d/upstream.conf /etc/nginx/conf.d/upstream.conf.backup

# Update nginx upstream configuration
if [ "$TARGET_STACK" = "green" ]; then
    cat > /etc/nginx/conf.d/upstream.conf << 'EOF'
# Active Stack: green
upstream api_backend {
    server 127.0.0.1:4001 weight=100;
    server 127.0.0.1:4000 backup;
}

upstream web_backend {
    server 127.0.0.1:3002 weight=100;
    server 127.0.0.1:3000 backup;
}

upstream admin_backend {
    server 127.0.0.1:3003 weight=100;
    server 127.0.0.1:3001 backup;
}
EOF
else
    cat > /etc/nginx/conf.d/upstream.conf << 'EOF'
# Active Stack: blue
upstream api_backend {
    server 127.0.0.1:4000 weight=100;
    server 127.0.0.1:4001 backup;
}

upstream web_backend {
    server 127.0.0.1:3000 weight=100;
    server 127.0.0.1:3002 backup;
}

upstream admin_backend {
    server 127.0.0.1:3001 weight=100;
    server 127.0.0.1:3003 backup;
}
EOF
fi

# Test nginx configuration
echo "Testing nginx configuration..."
nginx -t

# Reload nginx
echo "Reloading nginx..."
nginx -s reload

# Update active stack marker
echo "$TARGET_STACK" > /etc/nginx/conf.d/active-stack

echo "✓ Traffic switched to $TARGET_STACK stack"
```

#### Step 7: Verify Production

```bash
#!/bin/bash
# deploy-step7-verify.sh

set -e

DEPLOY_ID=$(cat /tmp/current_deployment_id)
echo "=== Step 7: Verifying Production ===" | tee -a /var/log/deployments/${DEPLOY_ID}.log

DOMAIN="smartacademy.edu.bd"

# Smoke tests
echo "Running smoke tests..."

# Test main website
echo "Testing main website..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://${DOMAIN}")
if [ "$HTTP_CODE" = "200" ]; then
    echo "✓ Main website accessible"
else
    echo "✗ Main website returned HTTP $HTTP_CODE"
    exit 1
fi

# Test API endpoint
echo "Testing API..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://api.${DOMAIN}/health")
if [ "$HTTP_CODE" = "200" ]; then
    echo "✓ API accessible"
else
    echo "✗ API returned HTTP $HTTP_CODE"
    exit 1
fi

# Test admin dashboard
echo "Testing Admin dashboard..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://admin.${DOMAIN}")
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "302" ]; then
    echo "✓ Admin dashboard accessible"
else
    echo "✗ Admin dashboard returned HTTP $HTTP_CODE"
    exit 1
fi

# Test critical user flows
echo ""
echo "Testing critical flows..."

# Login page
curl -s "https://${DOMAIN}/login" | grep -q "Login" && echo "✓ Login page loads"

# API authentication
curl -s "https://api.${DOMAIN}/auth/status" | grep -q "status" && echo "✓ Auth API responds"

# Check version endpoint
VERSION=$(curl -s "https://api.${DOMAIN}/version" | jq -r '.version')
echo "✓ Deployed version: $VERSION"

echo ""
echo "=== Production verification complete ==="
```

#### Step 8: Cleanup and Notify

```bash
#!/bin/bash
# deploy-step8-cleanup.sh

set -e

DEPLOY_ID=$(cat /tmp/current_deployment_id)
TARGET_STACK=$(cat /tmp/target_stack)
OLD_STACK=$( [ "$TARGET_STACK" = "green" ] && echo "blue" || echo "green" )

echo "=== Step 8: Cleanup and Notification ===" | tee -a /var/log/deployments/${DEPLOY_ID}.log

# Wait before stopping old stack (grace period)
echo "Waiting 5 minutes before stopping old stack..."
sleep 300

# Stop old stack
echo "Stopping $OLD_STACK stack..."
docker compose -f docker-compose.prod.yml \
    -f docker-compose.${OLD_STACK}.yml \
    down --remove-orphans

# Clean up old images
echo "Cleaning up old Docker images..."
docker image prune -f --filter "until=24h"

# Clean up old volumes (be careful!)
# docker volume prune -f --filter "label!=keep"

# Update deployment log
echo "Deployment completed at $(date)" >> /var/log/deployments/${DEPLOY_ID}.log
echo "Active stack: $TARGET_STACK" >> /var/log/deployments/${DEPLOY_ID}.log

# Send completion notification
VERSION=$(git describe --tags --always)
curl -X POST "$SLACK_WEBHOOK_URL" \
    -H "Content-Type: application/json" \
    -d "{
        \"text\": \"✅ Deployment ${DEPLOY_ID} completed successfully\",
        \"attachments\": [{
            \"color\": \"good\",
            \"fields\": [
                {\"title\": \"Version\", \"value\": \"${VERSION}\", \"short\": true},
                {\"title\": \"Stack\", \"value\": \"${TARGET_STACK}\", \"short\": true},
                {\"title\": \"Time\", \"value\": \"$(date)\", \"short\": false}
            ]
        }]
    }"

# Clean up temp files
rm -f /tmp/current_deployment_id
rm -f /tmp/target_stack
rm -f /tmp/migration_checkpoint

echo ""
echo "🎉 Deployment completed successfully!"
```

### 3.3 One-Command Deployment Script

```bash
#!/bin/bash
# deploy.sh - Complete deployment script

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "╔════════════════════════════════════════════════════════════╗"
echo "║       Smart Academy Digital Portal - Deployment            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Pre-flight checks
echo "Running pre-deployment checks..."
$SCRIPT_DIR/pre-deploy-pipeline-check.sh
$SCRIPT_DIR/pre-deploy-backup-check.sh
$SCRIPT_DIR/pre-deploy-infra-check.sh

read -p "All checks passed. Continue with deployment? (y/N) " confirm
if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo "Deployment cancelled"
    exit 0
fi

# Run deployment steps
$SCRIPT_DIR/deploy-step1-initialize.sh
$SCRIPT_DIR/deploy-step2-pull.sh
$SCRIPT_DIR/deploy-step3-migrations.sh
$SCRIPT_DIR/deploy-step4-green-deploy.sh
$SCRIPT_DIR/deploy-step5-healthcheck.sh

read -p "Health checks passed. Switch traffic? (y/N) " confirm
if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo "Traffic switch cancelled. Green stack is running but not receiving traffic."
    exit 0
fi

$SCRIPT_DIR/deploy-step6-switch-traffic.sh
$SCRIPT_DIR/deploy-step7-verify.sh
$SCRIPT_DIR/deploy-step8-cleanup.sh

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║           Deployment Completed Successfully!               ║"
echo "╚════════════════════════════════════════════════════════════╝"
```

---

## 4. Post-Deployment Verification

### 4.1 Verification Checklist

```
╔══════════════════════════════════════════════════════════════════════╗
║                  POST-DEPLOYMENT VERIFICATION                        ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  IMMEDIATE CHECKS (0-5 minutes)                                      ║
║  ───────────────────────────────────────────────────────────────     ║
║  □ All services responding (API, Web, Admin)                         ║
║  □ Health endpoints returning 200 OK                                 ║
║  □ No critical errors in logs                                        ║
║  □ Database connections established                                  ║
║  □ Redis cache operational                                           ║
║                                                                      ║
║  FUNCTIONAL CHECKS (5-15 minutes)                                    ║
║  ───────────────────────────────────────────────────────────────     ║
║  □ User login/logout working                                         ║
║  □ Student registration flow                                         ║
║  □ Course catalog accessible                                         ║
║  □ Payment processing functional (test transaction)                  ║
║  □ Email notifications sending                                       ║
║  □ File uploads working                                              ║
║                                                                      ║
║  INTEGRATION CHECKS (15-30 minutes)                                  ║
║  ───────────────────────────────────────────────────────────────     ║
║  □ Gibbon SIS sync operational                                       ║
║  □ Moodle LMS integration working                                    ║
║  □ Payment gateway callbacks received                                ║
║  □ SMS notifications delivering                                      ║
║  □ CDN serving static assets                                         ║
║                                                                      ║
║  PERFORMANCE CHECKS (30-60 minutes)                                  ║
║  ───────────────────────────────────────────────────────────────     ║
║  □ Response times within SLA (<500ms)                                ║
║  □ No memory leaks detected                                          ║
║  □ CPU usage normal                                                  ║
║  □ Database query times acceptable                                   ║
║  □ Cache hit rates normal                                            ║
║                                                                      ║
║  MONITORING CHECKS                                                   ║
║  ───────────────────────────────────────────────────────────────     ║
║  □ Grafana dashboards showing data                                   ║
║  □ Prometheus scraping metrics                                       ║
║  □ Log aggregation working (Loki)                                    ║
║  □ Alerts configured and tested                                      ║
║  □ Error tracking active (Sentry)                                    ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

### 4.2 Automated Verification Script

```bash
#!/bin/bash
# post-deploy-verification.sh

set -e

echo "=== Post-Deployment Verification ==="
echo "Started at: $(date)"
echo ""

DOMAIN="smartacademy.edu.bd"
API_URL="https://api.${DOMAIN}"
WEB_URL="https://${DOMAIN}"
ADMIN_URL="https://admin.${DOMAIN}"

ERRORS=0

# Function to check endpoint
check_endpoint() {
    local name=$1
    local url=$2
    local expected_code=${3:-200}

    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    if [ "$HTTP_CODE" = "$expected_code" ]; then
        echo "✓ $name: OK (HTTP $HTTP_CODE)"
    else
        echo "✗ $name: FAILED (HTTP $HTTP_CODE, expected $expected_code)"
        ERRORS=$((ERRORS + 1))
    fi
}

# Function to check response time
check_response_time() {
    local name=$1
    local url=$2
    local max_time=${3:-1}

    RESPONSE_TIME=$(curl -s -o /dev/null -w "%{time_total}" "$url")
    if (( $(echo "$RESPONSE_TIME < $max_time" | bc -l) )); then
        echo "✓ $name: ${RESPONSE_TIME}s"
    else
        echo "⚠ $name: ${RESPONSE_TIME}s (exceeds ${max_time}s threshold)"
    fi
}

echo "=== Endpoint Checks ==="
check_endpoint "Web Home" "$WEB_URL"
check_endpoint "Web Login" "$WEB_URL/login"
check_endpoint "API Health" "$API_URL/health"
check_endpoint "API Version" "$API_URL/version"
check_endpoint "Admin Dashboard" "$ADMIN_URL" "200"

echo ""
echo "=== Response Time Checks ==="
check_response_time "Web Home" "$WEB_URL" 2
check_response_time "API Health" "$API_URL/health" 0.5
check_response_time "Admin Dashboard" "$ADMIN_URL" 2

echo ""
echo "=== Service Status ==="
docker compose -f docker-compose.prod.yml ps --format "table {{.Name}}\t{{.Status}}"

echo ""
echo "=== Database Checks ==="
# Check database connections
DB_CONNECTIONS=$(docker compose -f docker-compose.prod.yml exec -T postgres \
    psql -U smart_academy -d smart_academy -t -c \
    "SELECT count(*) FROM pg_stat_activity WHERE datname = 'smart_academy'")
echo "Active database connections: $DB_CONNECTIONS"

echo ""
echo "=== Cache Status ==="
REDIS_INFO=$(docker compose -f docker-compose.prod.yml exec -T redis redis-cli info stats | grep -E "(keyspace_hits|keyspace_misses)")
echo "$REDIS_INFO"

echo ""
echo "=== Recent Errors (last 5 minutes) ==="
docker compose -f docker-compose.prod.yml logs --since 5m 2>&1 | grep -i "error\|exception" | tail -10 || echo "No errors found"

echo ""
echo "=== Summary ==="
if [ $ERRORS -eq 0 ]; then
    echo "✅ All verification checks passed!"
    exit 0
else
    echo "❌ $ERRORS verification check(s) failed!"
    exit 1
fi
```

### 4.3 Critical User Flow Tests

```typescript
// tests/e2e/post-deploy-verification.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Post-Deployment Verification', () => {
  const baseUrl = process.env.VERIFY_URL || 'https://smartacademy.edu.bd';

  test('homepage loads correctly', async ({ page }) => {
    await page.goto(baseUrl);
    await expect(page).toHaveTitle(/Smart Academy/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('login page is accessible', async ({ page }) => {
    await page.goto(`${baseUrl}/login`);
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('API health check', async ({ request }) => {
    const response = await request.get(`${baseUrl.replace('https://', 'https://api.')}/health`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.status).toBe('healthy');
  });

  test('course catalog loads', async ({ page }) => {
    await page.goto(`${baseUrl}/courses`);
    await expect(page.locator('[data-testid="course-list"]')).toBeVisible();
  });

  test('student registration form accessible', async ({ page }) => {
    await page.goto(`${baseUrl}/register`);
    await expect(page.locator('form[data-testid="registration-form"]')).toBeVisible();
  });

  test('static assets served via CDN', async ({ page }) => {
    await page.goto(baseUrl);
    const images = await page.locator('img').all();
    for (const img of images.slice(0, 5)) {
      const src = await img.getAttribute('src');
      if (src && src.startsWith('http')) {
        expect(src).toMatch(/cdn|cloudflare/i);
      }
    }
  });
});
```

---

## 5. Rollback Procedures

### 5.1 Rollback Decision Matrix

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      ROLLBACK DECISION MATRIX                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  IMMEDIATE ROLLBACK (< 5 minutes)                                       │
│  ────────────────────────────────────────────────────────               │
│  • Application won't start                                              │
│  • Critical services unresponsive                                       │
│  • Database connection failures                                         │
│  • Authentication completely broken                                     │
│  • Payment processing failures                                          │
│                                                                         │
│  QUICK ROLLBACK (5-30 minutes)                                          │
│  ────────────────────────────────────────────────────────               │
│  • Multiple 5xx errors (>1% of requests)                                │
│  • Response times >3x normal                                            │
│  • Critical feature broken (enrollment, payments)                       │
│  • Data integrity issues detected                                       │
│  • Security vulnerability discovered                                    │
│                                                                         │
│  MONITORED ROLLBACK (30+ minutes)                                       │
│  ────────────────────────────────────────────────────────               │
│  • Gradual performance degradation                                      │
│  • Non-critical features broken                                         │
│  • Intermittent errors increasing                                       │
│  • User complaints escalating                                           │
│                                                                         │
│  NO ROLLBACK - FIX FORWARD                                              │
│  ────────────────────────────────────────────────────────               │
│  • Minor UI issues                                                      │
│  • Non-blocking bugs                                                    │
│  • Performance within acceptable range                                  │
│  • Easy hotfix available                                                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Rollback Procedures by Type

#### 5.2.1 Application Rollback (Blue-Green Switch)

```bash
#!/bin/bash
# rollback-application.sh

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║              APPLICATION ROLLBACK INITIATED                 ║"
echo "╚════════════════════════════════════════════════════════════╝"

# Get current and previous stack
CURRENT_STACK=$(cat /etc/nginx/conf.d/active-stack)
if [ "$CURRENT_STACK" = "green" ]; then
    ROLLBACK_STACK="blue"
else
    ROLLBACK_STACK="green"
fi

echo "Current stack: $CURRENT_STACK"
echo "Rolling back to: $ROLLBACK_STACK"

# Verify rollback stack is healthy
echo ""
echo "Verifying $ROLLBACK_STACK stack health..."
if [ "$ROLLBACK_STACK" = "blue" ]; then
    API_PORT=4000
else
    API_PORT=4001
fi

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:${API_PORT}/health")
if [ "$HTTP_CODE" != "200" ]; then
    echo "ERROR: Rollback stack is not healthy!"
    echo "Attempting to start rollback stack..."
    docker compose -f docker-compose.prod.yml \
        -f docker-compose.${ROLLBACK_STACK}.yml \
        up -d
    sleep 30
fi

# Switch traffic
echo ""
echo "Switching traffic to $ROLLBACK_STACK..."

if [ "$ROLLBACK_STACK" = "blue" ]; then
    cat > /etc/nginx/conf.d/upstream.conf << 'EOF'
# ROLLBACK - Active Stack: blue
upstream api_backend {
    server 127.0.0.1:4000 weight=100;
    server 127.0.0.1:4001 backup;
}
upstream web_backend {
    server 127.0.0.1:3000 weight=100;
    server 127.0.0.1:3002 backup;
}
upstream admin_backend {
    server 127.0.0.1:3001 weight=100;
    server 127.0.0.1:3003 backup;
}
EOF
else
    cat > /etc/nginx/conf.d/upstream.conf << 'EOF'
# ROLLBACK - Active Stack: green
upstream api_backend {
    server 127.0.0.1:4001 weight=100;
    server 127.0.0.1:4000 backup;
}
upstream web_backend {
    server 127.0.0.1:3002 weight=100;
    server 127.0.0.1:3000 backup;
}
upstream admin_backend {
    server 127.0.0.1:3003 weight=100;
    server 127.0.0.1:3001 backup;
}
EOF
fi

# Reload nginx
nginx -t && nginx -s reload

# Update active stack marker
echo "$ROLLBACK_STACK" > /etc/nginx/conf.d/active-stack

# Verify rollback
echo ""
echo "Verifying rollback..."
sleep 5
curl -s "https://smartacademy.edu.bd" > /dev/null && echo "✓ Website accessible"
curl -s "https://api.smartacademy.edu.bd/health" > /dev/null && echo "✓ API accessible"

# Send notification
curl -X POST "$SLACK_WEBHOOK_URL" \
    -H "Content-Type: application/json" \
    -d "{\"text\": \"⚠️ ROLLBACK EXECUTED - Switched from $CURRENT_STACK to $ROLLBACK_STACK\"}"

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║              ROLLBACK COMPLETED                             ║"
echo "╚════════════════════════════════════════════════════════════╝"
```

#### 5.2.2 Database Rollback

```bash
#!/bin/bash
# rollback-database.sh

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║               DATABASE ROLLBACK INITIATED                   ║"
echo "╚════════════════════════════════════════════════════════════╝"

BACKUP_DATE=${1:-$(date +%Y%m%d)}
BACKUP_FILE="/backups/database/postgres/smart_academy_${BACKUP_DATE}.sql.gz"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "ERROR: Backup file not found: $BACKUP_FILE"
    echo "Available backups:"
    ls -la /backups/database/postgres/
    exit 1
fi

echo "Rolling back to backup: $BACKUP_FILE"
read -p "This will OVERWRITE the current database. Continue? (yes/NO) " confirm
if [ "$confirm" != "yes" ]; then
    echo "Rollback cancelled"
    exit 0
fi

# Stop application to prevent new writes
echo "Stopping application containers..."
docker compose -f docker-compose.prod.yml stop api web admin

# Create emergency backup
echo "Creating emergency backup before rollback..."
EMERGENCY_BACKUP="/backups/database/postgres/emergency_$(date +%Y%m%d%H%M%S).sql.gz"
docker compose -f docker-compose.prod.yml exec -T postgres \
    pg_dump -U smart_academy smart_academy | gzip > "$EMERGENCY_BACKUP"
echo "Emergency backup created: $EMERGENCY_BACKUP"

# Restore database
echo "Restoring database from backup..."
gunzip -c "$BACKUP_FILE" | docker compose -f docker-compose.prod.yml exec -T postgres \
    psql -U smart_academy -d postgres -c "DROP DATABASE IF EXISTS smart_academy_restore;"

docker compose -f docker-compose.prod.yml exec -T postgres \
    psql -U smart_academy -d postgres -c "CREATE DATABASE smart_academy_restore;"

gunzip -c "$BACKUP_FILE" | docker compose -f docker-compose.prod.yml exec -T postgres \
    psql -U smart_academy smart_academy_restore

# Swap databases
echo "Swapping databases..."
docker compose -f docker-compose.prod.yml exec -T postgres \
    psql -U smart_academy -d postgres << EOF
SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'smart_academy';
ALTER DATABASE smart_academy RENAME TO smart_academy_old;
ALTER DATABASE smart_academy_restore RENAME TO smart_academy;
EOF

# Start application
echo "Starting application containers..."
docker compose -f docker-compose.prod.yml start api web admin

# Verify
echo "Verifying database..."
docker compose -f docker-compose.prod.yml exec -T api \
    npx prisma db execute --stdin <<< "SELECT COUNT(*) FROM users;"

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║           DATABASE ROLLBACK COMPLETED                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "NOTE: Old database retained as 'smart_academy_old'"
echo "To remove: DROP DATABASE smart_academy_old;"
```

#### 5.2.3 Migration Rollback

```bash
#!/bin/bash
# rollback-migrations.sh

set -e

echo "=== Migration Rollback ==="

ROLLBACK_COUNT=${1:-1}

echo "Rolling back $ROLLBACK_COUNT migration(s)..."

# Show current migration status
echo ""
echo "Current migration status:"
docker compose -f docker-compose.prod.yml run --rm api \
    npx prisma migrate status

# Prisma doesn't support down migrations directly
# We need to revert using raw SQL or restore from backup

echo ""
echo "WARNING: Prisma does not support automatic down migrations."
echo "Options:"
echo "  1. Restore database from backup (recommended)"
echo "  2. Manually revert schema changes"
echo "  3. Deploy previous code version"
echo ""

read -p "Choose option (1/2/3): " option

case $option in
    1)
        echo "Proceeding with database restore..."
        ./rollback-database.sh
        ;;
    2)
        echo "Manual schema reversion required."
        echo "Please apply the reversal SQL manually."
        ;;
    3)
        echo "Deploy previous version using:"
        echo "  git checkout <previous-tag>"
        echo "  ./deploy.sh"
        ;;
    *)
        echo "Invalid option"
        exit 1
        ;;
esac
```

### 5.3 Emergency Rollback Quick Reference

```
╔══════════════════════════════════════════════════════════════════════╗
║                  EMERGENCY ROLLBACK QUICK REFERENCE                  ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  1. SWITCH TRAFFIC IMMEDIATELY (Blue-Green):                         ║
║     ./scripts/rollback-application.sh                                ║
║                                                                      ║
║  2. QUICK NGINX MANUAL SWITCH:                                       ║
║     vim /etc/nginx/conf.d/upstream.conf                              ║
║     # Change weight=100 to the other stack                           ║
║     nginx -t && nginx -s reload                                      ║
║                                                                      ║
║  3. STOP BAD CONTAINERS:                                             ║
║     docker compose -f docker-compose.prod.yml \                      ║
║         -f docker-compose.[stack].yml stop                           ║
║                                                                      ║
║  4. DATABASE RESTORE:                                                ║
║     ./scripts/rollback-database.sh [YYYYMMDD]                        ║
║                                                                      ║
║  5. DEPLOY PREVIOUS VERSION:                                         ║
║     git checkout <previous-tag>                                      ║
║     ./scripts/deploy.sh                                              ║
║                                                                      ║
║  6. EMERGENCY CONTACTS:                                              ║
║     See Section 6 for full contact list                              ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## 6. Emergency Contacts

### 6.1 Contact Directory

```
╔══════════════════════════════════════════════════════════════════════╗
║                     EMERGENCY CONTACT DIRECTORY                      ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  INTERNAL TEAM                                                       ║
║  ────────────────────────────────────────────────────────────────    ║
║                                                                      ║
║  Role              Name              Phone           Availability    ║
║  ────────────────────────────────────────────────────────────────    ║
║  Tech Lead         [Name]            [Phone]         24/7            ║
║  Backend Dev       [Name]            [Phone]         Business Hours  ║
║  DevOps            [Name]            [Phone]         24/7            ║
║  DBA               [Name]            [Phone]         On-call         ║
║  Security          [Name]            [Phone]         On-call         ║
║                                                                      ║
║  MANAGEMENT                                                          ║
║  ────────────────────────────────────────────────────────────────    ║
║                                                                      ║
║  Project Manager   [Name]            [Phone]         Business Hours  ║
║  IT Director       [Name]            [Phone]         Escalation      ║
║  CEO               [Name]            [Phone]         Critical Only   ║
║                                                                      ║
║  EXTERNAL VENDORS                                                    ║
║  ────────────────────────────────────────────────────────────────    ║
║                                                                      ║
║  Service           Provider          Support Number  Ticket URL      ║
║  ────────────────────────────────────────────────────────────────    ║
║  Hosting           [Provider]        [Phone]         [URL]           ║
║  Cloudflare        Cloudflare        Enterprise      [Dashboard]     ║
║  SSLCommerz        SSLCommerz        [Phone]         [Support URL]   ║
║  bKash             bKash API         [Phone]         [Support URL]   ║
║  Nagad             Nagad API         [Phone]         [Support URL]   ║
║  SMS (BulkSMSBD)   BulkSMSBD         [Phone]         [Support URL]   ║
║  Email (SendGrid)  SendGrid          [Support]       [Dashboard]     ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

### 6.2 Escalation Matrix

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        ESCALATION MATRIX                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Severity     Response Time     First Contact      Escalation Path      │
│  ─────────────────────────────────────────────────────────────────      │
│                                                                         │
│  P1 Critical  15 minutes        Tech Lead       → IT Director → CEO     │
│  (System down, data loss,       DevOps                                  │
│   security breach)                                                      │
│                                                                         │
│  P2 High      1 hour            Tech Lead       → Project Manager       │
│  (Major feature broken,         Backend Dev                             │
│   significant performance)                                              │
│                                                                         │
│  P3 Medium    4 hours           Backend Dev     → Tech Lead             │
│  (Minor feature broken,                                                 │
│   degraded performance)                                                 │
│                                                                         │
│  P4 Low       24 hours          Backend Dev     → (Standard Process)    │
│  (Cosmetic issues,                                                      │
│   minor bugs)                                                           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.3 Communication Templates

#### P1 Critical Incident Alert

```markdown
🚨 **P1 CRITICAL INCIDENT ALERT** 🚨

**System:** Smart Academy Digital Portal
**Status:** [DOWN/DEGRADED/SECURITY]
**Started:** [TIME] (Bangladesh Time)
**Duration:** [X minutes/hours]

**Impact:**
- [Description of user impact]
- [Affected features/services]
- [Estimated affected users]

**Current Actions:**
- [What is being done]
- [Who is working on it]

**Next Update:** [TIME]

**Incident Commander:** [Name]
**Contact:** [Phone/Slack]
```

#### Incident Resolution

```markdown
✅ **INCIDENT RESOLVED**

**System:** Smart Academy Digital Portal
**Status:** RESOLVED
**Duration:** [Total time]
**Root Cause:** [Brief description]

**Resolution:**
- [What was done to fix]
- [Any rollback performed]

**Impact Summary:**
- [Users affected]
- [Data impact if any]

**Follow-up Actions:**
- [ ] Post-incident review scheduled
- [ ] Documentation updated
- [ ] Preventive measures identified

**Incident Commander:** [Name]
```

---

## 7. Troubleshooting Guide

### 7.1 Common Issues and Solutions

```
╔══════════════════════════════════════════════════════════════════════╗
║                     TROUBLESHOOTING QUICK REFERENCE                  ║
╠══════════════════════════════════════════════════════════════════════╣

┌─────────────────────────────────────────────────────────────────────┐
│ ISSUE: Application won't start                                      │
├─────────────────────────────────────────────────────────────────────┤
│ Symptoms: Container exits immediately, health check fails           │
│                                                                     │
│ Diagnosis:                                                          │
│ 1. docker compose logs [service] --tail 100                         │
│ 2. docker compose exec [service] env                                │
│ 3. Check disk space: df -h                                          │
│                                                                     │
│ Common Causes & Solutions:                                          │
│ • Missing env vars → Check .env file, verify all required vars      │
│ • Database not ready → Wait or check postgres/mysql containers      │
│ • Port already in use → lsof -i :[port], kill conflicting process   │
│ • Disk full → Clean up logs, remove old images                      │
│ • Memory exhausted → Increase limits or scale down                  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ ISSUE: Database connection failures                                 │
├─────────────────────────────────────────────────────────────────────┤
│ Symptoms: "Connection refused", timeouts, "too many connections"    │
│                                                                     │
│ Diagnosis:                                                          │
│ 1. docker compose exec postgres pg_isready                          │
│ 2. Check connection count:                                          │
│    SELECT count(*) FROM pg_stat_activity;                           │
│ 3. Check for locks:                                                 │
│    SELECT * FROM pg_locks WHERE NOT granted;                        │
│                                                                     │
│ Common Causes & Solutions:                                          │
│ • Max connections reached → Restart app, increase max_connections   │
│ • Network issue → Check Docker network, restart compose             │
│ • Credentials wrong → Verify DATABASE_URL in env                    │
│ • Database crashed → Check postgres logs, restart container         │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ ISSUE: High memory usage / OOM                                      │
├─────────────────────────────────────────────────────────────────────┤
│ Symptoms: Containers killed, slow response, swapping                │
│                                                                     │
│ Diagnosis:                                                          │
│ 1. docker stats                                                     │
│ 2. free -h                                                          │
│ 3. Check Node.js heap: process.memoryUsage()                        │
│                                                                     │
│ Common Causes & Solutions:                                          │
│ • Memory leak → Restart container, profile with --inspect           │
│ • Large file uploads → Implement streaming, increase limits         │
│ • Cache overflow → Clear Redis, implement eviction policy           │
│ • Too many connections → Scale horizontally, add connection pool    │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ ISSUE: Slow response times                                          │
├─────────────────────────────────────────────────────────────────────┤
│ Symptoms: >1s response, timeouts, user complaints                   │
│                                                                     │
│ Diagnosis:                                                          │
│ 1. Check Grafana dashboards for patterns                            │
│ 2. Enable query logging: SET log_min_duration_statement = 100;      │
│ 3. Check Redis cache hit rate                                       │
│                                                                     │
│ Common Causes & Solutions:                                          │
│ • Slow queries → Add indexes, optimize queries, use EXPLAIN         │
│ • Cache misses → Warm cache, check eviction policy                  │
│ • Network latency → Check CDN, verify geographic routing            │
│ • CPU throttling → Scale up resources, optimize code                │
│ • Missing indexes → Run ANALYZE, create missing indexes             │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ ISSUE: Payment processing failures                                  │
├─────────────────────────────────────────────────────────────────────┤
│ Symptoms: Payments failing, callbacks not received                  │
│                                                                     │
│ Diagnosis:                                                          │
│ 1. Check payment gateway dashboard for errors                       │
│ 2. Verify webhook endpoints accessible externally                   │
│ 3. Check API credentials expiry                                     │
│                                                                     │
│ Common Causes & Solutions:                                          │
│ • Credentials expired → Rotate API keys                             │
│ • Webhook blocked → Check Cloudflare rules, whitelist IPs           │
│ • SSL issues → Verify certificate chain                             │
│ • Rate limited → Implement retry with backoff                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ ISSUE: SSL/Certificate errors                                       │
├─────────────────────────────────────────────────────────────────────┤
│ Symptoms: Browser warnings, "certificate expired"                   │
│                                                                     │
│ Diagnosis:                                                          │
│ 1. openssl s_client -connect domain.com:443                         │
│ 2. Check certificate expiry date                                    │
│ 3. Verify Cloudflare SSL settings                                   │
│                                                                     │
│ Common Causes & Solutions:                                          │
│ • Certificate expired → Renew via Cloudflare                        │
│ • Wrong cert installed → Update nginx ssl_certificate path          │
│ • Mixed content → Force HTTPS in application                        │
│ • Chain incomplete → Include intermediate certificates              │
└─────────────────────────────────────────────────────────────────────┘
```

### 7.2 Diagnostic Commands Reference

```bash
#!/bin/bash
# diagnostics.sh - System diagnostics toolkit

echo "=== Smart Academy Diagnostics ==="

# System overview
echo ""
echo "--- System Resources ---"
echo "CPU:"
top -bn1 | head -5
echo ""
echo "Memory:"
free -h
echo ""
echo "Disk:"
df -h /

# Docker status
echo ""
echo "--- Docker Status ---"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo ""
docker stats --no-stream

# Container health
echo ""
echo "--- Container Health ---"
for container in api web admin; do
    health=$(docker inspect --format='{{.State.Health.Status}}' $container 2>/dev/null || echo "N/A")
    echo "$container: $health"
done

# Database status
echo ""
echo "--- Database Status ---"
echo "PostgreSQL:"
docker compose exec -T postgres pg_isready
echo "Active connections: $(docker compose exec -T postgres psql -U smart_academy -t -c 'SELECT count(*) FROM pg_stat_activity')"

# Redis status
echo ""
echo "--- Redis Status ---"
docker compose exec -T redis redis-cli info | grep -E "used_memory_human|connected_clients|keyspace_hits"

# Recent errors
echo ""
echo "--- Recent Errors (last 30 minutes) ---"
docker compose logs --since 30m 2>&1 | grep -i "error\|exception\|fatal" | tail -20

# Network connectivity
echo ""
echo "--- External Connectivity ---"
echo "Cloudflare: $(curl -s -o /dev/null -w "%{http_code}" https://api.cloudflare.com/client/v4/)"
echo "SSLCommerz: $(curl -s -o /dev/null -w "%{http_code}" https://sandbox.sslcommerz.com/)"

echo ""
echo "=== Diagnostics Complete ==="
```

### 7.3 Log Analysis

```bash
#!/bin/bash
# analyze-logs.sh - Log analysis toolkit

SERVICE=${1:-api}
TIMEFRAME=${2:-1h}

echo "=== Log Analysis: $SERVICE (last $TIMEFRAME) ==="

# Error summary
echo ""
echo "--- Error Summary ---"
docker compose logs --since $TIMEFRAME $SERVICE 2>&1 | \
    grep -i "error" | \
    sed 's/.*\(error[^:]*:[^|]*\).*/\1/' | \
    sort | uniq -c | sort -rn | head -10

# Warning summary
echo ""
echo "--- Warning Summary ---"
docker compose logs --since $TIMEFRAME $SERVICE 2>&1 | \
    grep -i "warn" | \
    sed 's/.*\(warn[^:]*:[^|]*\).*/\1/' | \
    sort | uniq -c | sort -rn | head -10

# Request patterns
echo ""
echo "--- Request Volume (by minute) ---"
docker compose logs --since $TIMEFRAME $SERVICE 2>&1 | \
    grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}' | \
    sort | uniq -c | tail -20

# Slow requests (if logged)
echo ""
echo "--- Slow Requests (>1000ms) ---"
docker compose logs --since $TIMEFRAME $SERVICE 2>&1 | \
    grep -E "duration.*[0-9]{4,}ms" | tail -10

echo ""
echo "=== Analysis Complete ==="
```

### 7.4 Recovery Procedures

#### Database Recovery

```bash
#!/bin/bash
# recover-database.sh

echo "=== Database Recovery ==="

# Option 1: Point-in-time recovery (if WAL archiving enabled)
echo "Option 1: Point-in-time recovery"
echo "  1. Stop application"
echo "  2. Restore base backup"
echo "  3. Apply WAL logs up to target time"
echo ""

# Option 2: Restore from backup
echo "Option 2: Restore from latest backup"
ls -la /backups/database/postgres/*.sql.gz | tail -5
echo ""
read -p "Enter backup filename to restore: " backup_file

if [ -f "/backups/database/postgres/$backup_file" ]; then
    echo "Restoring from $backup_file..."
    ./rollback-database.sh "$backup_file"
else
    echo "Backup file not found"
fi
```

#### Cache Rebuild

```bash
#!/bin/bash
# rebuild-cache.sh

echo "=== Cache Rebuild ==="

# Clear Redis cache
echo "Flushing Redis cache..."
docker compose exec -T redis redis-cli FLUSHALL

# Warm critical caches
echo "Warming caches..."

# Course catalog cache
echo "Warming course catalog..."
curl -s "http://localhost:4000/api/courses?limit=100" > /dev/null

# User session cache (trigger refresh)
echo "Cache rebuild complete"
```

---

## 8. Appendices

### 8.1 Deployment Scripts Location

```
/app/smart-academy/scripts/
├── deploy/
│   ├── deploy.sh                    # Main deployment script
│   ├── deploy-step1-initialize.sh   # Step 1: Initialize
│   ├── deploy-step2-pull.sh         # Step 2: Pull code
│   ├── deploy-step3-migrations.sh   # Step 3: Migrations
│   ├── deploy-step4-green-deploy.sh # Step 4: Deploy green
│   ├── deploy-step5-healthcheck.sh  # Step 5: Health check
│   ├── deploy-step6-switch.sh       # Step 6: Switch traffic
│   ├── deploy-step7-verify.sh       # Step 7: Verify
│   └── deploy-step8-cleanup.sh      # Step 8: Cleanup
├── rollback/
│   ├── rollback-application.sh      # App rollback
│   ├── rollback-database.sh         # DB rollback
│   └── rollback-migrations.sh       # Migration rollback
├── pre-deploy/
│   ├── pre-deploy-checklist.sh      # Full checklist
│   ├── pre-deploy-pipeline-check.sh # CI check
│   ├── pre-deploy-backup-check.sh   # Backup verify
│   └── pre-deploy-infra-check.sh    # Infra health
├── post-deploy/
│   ├── post-deploy-verification.sh  # Verification
│   └── smoke-tests.sh               # Smoke tests
├── diagnostics/
│   ├── diagnostics.sh               # System diag
│   ├── analyze-logs.sh              # Log analysis
│   └── health-check.sh              # Health check
└── backup/
    ├── backup-database.sh           # DB backup
    ├── backup-files.sh              # File backup
    └── backup-verify.sh             # Verify backups
```

### 8.2 Environment Variables Reference

```bash
# Required for deployment scripts
export GITHUB_TOKEN="ghp_xxxxxxxxxxxx"
export GITHUB_USER="smart-academy"
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/xxx"
export CLOUDFLARE_API_TOKEN="xxxxxxxxxxxx"
export SENTRY_DSN="https://xxx@sentry.io/xxx"

# Application configuration
export NODE_ENV="production"
export DATABASE_URL="postgresql://..."
export REDIS_URL="redis://..."
export JWT_SECRET="..."

# Feature flags
export FEATURE_NEW_ENROLLMENT="true"
export FEATURE_BETA_DASHBOARD="false"
```

### 8.3 Useful Aliases

```bash
# Add to ~/.bashrc or ~/.zshrc

# Deployment
alias deploy="cd /app/smart-academy && ./scripts/deploy/deploy.sh"
alias rollback="cd /app/smart-academy && ./scripts/rollback/rollback-application.sh"

# Logs
alias logs-api="docker compose logs -f api"
alias logs-web="docker compose logs -f web"
alias logs-all="docker compose logs -f"

# Status
alias status="docker compose ps && echo '' && docker stats --no-stream"
alias health="./scripts/diagnostics/health-check.sh"

# Database
alias db-console="docker compose exec postgres psql -U smart_academy"
alias redis-console="docker compose exec redis redis-cli"
```

### 8.4 Monitoring Dashboards

| Dashboard | URL | Purpose |
|-----------|-----|---------|
| Grafana | https://grafana.smartacademy.edu.bd | Metrics & visualization |
| Prometheus | https://prometheus.smartacademy.edu.bd | Metrics collection |
| Loki | https://loki.smartacademy.edu.bd | Log aggregation |
| Cloudflare | https://dash.cloudflare.com | CDN & security |
| Sentry | https://sentry.io/smart-academy | Error tracking |
| GitHub Actions | https://github.com/smart-academy/repo/actions | CI/CD status |

### 8.5 Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | January 2026 | Development Team | Initial document |

---

*This runbook should be reviewed and updated after every major deployment or incident.*
