# CI/CD Pipeline Document

## Document Information
| Field | Value |
|-------|-------|
| **Document ID** | DEPLOY-CICD-001 |
| **Version** | 1.0 |
| **Last Updated** | 2026-01-10 |
| **Author** | Smart Academy Development Team |
| **Status** | Active |

---

## Table of Contents
1. [Overview](#1-overview)
2. [Pipeline Architecture](#2-pipeline-architecture)
3. [Pipeline Stages](#3-pipeline-stages)
4. [GitHub Actions Configuration](#4-github-actions-configuration)
5. [Automated Testing](#5-automated-testing)
6. [Security Scanning](#6-security-scanning)
7. [Deployment Triggers](#7-deployment-triggers)
8. [Rollback Procedures](#8-rollback-procedures)
9. [Pipeline Monitoring](#9-pipeline-monitoring)

---

## 1. Overview

### 1.1 Purpose
This document defines the Continuous Integration and Continuous Deployment (CI/CD) pipeline for the Smart Academy Digital Portal, ensuring automated, reliable, and secure deployments.

### 1.2 CI/CD Philosophy
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CI/CD PHILOSOPHY                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   1. AUTOMATION FIRST                                                        │
│      • Every deployment is automated                                         │
│      • No manual steps in production deployments                            │
│      • Infrastructure as Code                                                │
│                                                                              │
│   2. SHIFT LEFT SECURITY                                                     │
│      • Security scans in every pipeline                                     │
│      • Dependency vulnerability checks                                       │
│      • SAST and secret detection                                            │
│                                                                              │
│   3. QUALITY GATES                                                           │
│      • All tests must pass                                                   │
│      • Code coverage thresholds                                              │
│      • Linting and type checking                                            │
│                                                                              │
│   4. FAST FEEDBACK                                                           │
│      • Pipeline completes in < 15 minutes                                   │
│      • Parallel execution where possible                                     │
│      • Incremental builds and caching                                       │
│                                                                              │
│   5. RELIABLE ROLLBACKS                                                      │
│      • One-click rollback capability                                        │
│      • Database migration rollback support                                   │
│      • Versioned artifacts                                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Pipeline Tools
| Tool | Purpose | Version |
|------|---------|---------|
| GitHub Actions | CI/CD orchestration | Latest |
| Docker | Containerization | 26+ |
| pnpm | Package management | 9.x |
| Turborepo | Monorepo build | 2.x |
| ESLint | Code linting | 9.x |
| Vitest | Unit testing | 2.x |
| Playwright | E2E testing | Latest |
| Trivy | Container scanning | Latest |
| CodeQL | SAST scanning | Latest |

---

## 2. Pipeline Architecture

### 2.1 Pipeline Overview
```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                           CI/CD PIPELINE ARCHITECTURE                                │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│   DEVELOPER                                                                          │
│       │                                                                              │
│       │ git push / PR                                                                │
│       ▼                                                                              │
│   ┌───────────────────────────────────────────────────────────────────────────────┐ │
│   │                            GITHUB REPOSITORY                                   │ │
│   │                                                                                │ │
│   │   Branches:                                                                    │ │
│   │   • main (protected) ────────────────────────► Production                      │ │
│   │   • develop ─────────────────────────────────► Staging                         │ │
│   │   • feature/* ───────────────────────────────► PR Only                         │ │
│   │   • hotfix/* ────────────────────────────────► Production (emergency)          │ │
│   │                                                                                │ │
│   └────────────────────────────────────────┬──────────────────────────────────────┘ │
│                                            │                                        │
│                                            ▼                                        │
│   ┌────────────────────────────────────────────────────────────────────────────────┐│
│   │                          GITHUB ACTIONS WORKFLOWS                               ││
│   │                                                                                 ││
│   │  ┌─────────────────────────────────────────────────────────────────────────┐  ││
│   │  │                        CI WORKFLOW (All PRs)                             │  ││
│   │  │                                                                          │  ││
│   │  │   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐  │  ││
│   │  │   │ Install │──▶│  Lint   │──▶│ Type    │──▶│  Unit   │──▶│ Build   │  │  ││
│   │  │   │  Deps   │   │         │   │ Check   │   │  Tests  │   │         │  │  ││
│   │  │   └─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘  │  ││
│   │  │                                                                          │  ││
│   │  └─────────────────────────────────────────────────────────────────────────┘  ││
│   │                                            │                                   ││
│   │                                            ▼                                   ││
│   │  ┌─────────────────────────────────────────────────────────────────────────┐  ││
│   │  │                      SECURITY WORKFLOW (All PRs)                         │  ││
│   │  │                                                                          │  ││
│   │  │   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────────────────────┐│  ││
│   │  │   │ CodeQL  │   │ Trivy   │   │ Secret  │   │  Dependency           │ │  ││
│   │  │   │  SAST   │   │ Scan    │   │ Scan    │   │  Vulnerability Check  │ │  ││
│   │  │   └─────────┘   └─────────┘   └─────────┘   └─────────────────────────┘│  ││
│   │  │                                                                          │  ││
│   │  └─────────────────────────────────────────────────────────────────────────┘  ││
│   │                                            │                                   ││
│   │                                            ▼                                   ││
│   │  ┌─────────────────────────────────────────────────────────────────────────┐  ││
│   │  │                     DEPLOY STAGING (develop branch)                      │  ││
│   │  │                                                                          │  ││
│   │  │   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────────────────────┐│  ││
│   │  │   │  Build  │──▶│  Push   │──▶│ Deploy  │──▶│   E2E Tests           │ │  ││
│   │  │   │ Images  │   │ to GHCR │   │ Staging │   │   (Playwright)        │ │  ││
│   │  │   └─────────┘   └─────────┘   └─────────┘   └─────────────────────────┘│  ││
│   │  │                                                                          │  ││
│   │  └─────────────────────────────────────────────────────────────────────────┘  ││
│   │                                            │                                   ││
│   │                                            ▼                                   ││
│   │  ┌─────────────────────────────────────────────────────────────────────────┐  ││
│   │  │                   DEPLOY PRODUCTION (main branch)                        │  ││
│   │  │                                                                          │  ││
│   │  │   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐  │  ││
│   │  │   │ Approval│──▶│  Build  │──▶│ Deploy  │──▶│ Health  │──▶│ Notify  │  │  ││
│   │  │   │ Gate    │   │ Images  │   │  Prod   │   │ Check   │   │  Team   │  │  ││
│   │  │   └─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘  │  ││
│   │  │                                                                          │  ││
│   │  └─────────────────────────────────────────────────────────────────────────┘  ││
│   │                                                                                 ││
│   └─────────────────────────────────────────────────────────────────────────────────┘│
│                                                                                      │
│   ENVIRONMENTS                                                                       │
│   ┌───────────────────┐     ┌───────────────────┐     ┌───────────────────┐        │
│   │     STAGING       │     │    PRODUCTION     │     │     ROLLBACK      │        │
│   │                   │     │                   │     │                   │        │
│   │ staging.smart     │     │ smartacademy      │     │ Previous version  │        │
│   │ academy.edu.bd    │     │ .edu.bd           │     │ available         │        │
│   │                   │     │                   │     │                   │        │
│   │ Auto-deploy from  │     │ Manual approval   │     │ One-click via     │        │
│   │ develop branch    │     │ required          │     │ GitHub Actions    │        │
│   └───────────────────┘     └───────────────────┘     └───────────────────┘        │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Branching Strategy Integration
| Branch | Trigger | Pipeline | Target |
|--------|---------|----------|--------|
| `feature/*` | Push/PR | CI only | None |
| `develop` | Merge | CI + Deploy | Staging |
| `main` | Merge | CI + Deploy | Production |
| `hotfix/*` | Push | CI + Fast Deploy | Production |
| `release/*` | Tag | CI + Release | Production |

---

## 3. Pipeline Stages

### 3.1 Stage Overview
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          PIPELINE STAGES                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   STAGE 1: BUILD                                        Duration: ~3 min    │
│   ────────────────────────────────────────────────────────────────────────  │
│   │ Install Dependencies (pnpm install --frozen-lockfile)                   │
│   │ Generate Prisma Client                                                  │
│   │ Build Applications (turbo build)                                        │
│   │ Cache node_modules and build artifacts                                  │
│                                                                              │
│   STAGE 2: TEST                                         Duration: ~5 min    │
│   ────────────────────────────────────────────────────────────────────────  │
│   │ Run ESLint (turbo lint)                                                 │
│   │ Run TypeScript Check (turbo type-check)                                 │
│   │ Run Unit Tests (turbo test)                                             │
│   │ Generate Coverage Report                                                │
│                                                                              │
│   STAGE 3: SECURITY SCAN                                Duration: ~4 min    │
│   ────────────────────────────────────────────────────────────────────────  │
│   │ CodeQL Analysis (JavaScript/TypeScript)                                 │
│   │ Dependency Audit (pnpm audit)                                           │
│   │ Secret Detection (Gitleaks)                                             │
│   │ Container Scan (Trivy)                                                  │
│                                                                              │
│   STAGE 4: BUILD ARTIFACTS                              Duration: ~3 min    │
│   ────────────────────────────────────────────────────────────────────────  │
│   │ Build Docker Images (multi-stage)                                       │
│   │ Tag Images (commit SHA + version)                                       │
│   │ Push to GitHub Container Registry                                       │
│                                                                              │
│   STAGE 5: DEPLOY                                       Duration: ~2 min    │
│   ────────────────────────────────────────────────────────────────────────  │
│   │ SSH to Target Server                                                    │
│   │ Pull Latest Images                                                      │
│   │ Run Database Migrations                                                 │
│   │ Rolling Update (zero-downtime)                                          │
│   │ Health Check Verification                                               │
│                                                                              │
│   STAGE 6: POST-DEPLOY                                  Duration: ~3 min    │
│   ────────────────────────────────────────────────────────────────────────  │
│   │ Run E2E Tests (Playwright)                                              │
│   │ Performance Baseline Check                                              │
│   │ Notification (Slack/Email)                                              │
│   │ Update Deployment Status                                                │
│                                                                              │
│   TOTAL PIPELINE DURATION                               Target: < 15 min    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Stage Details

#### 3.2.1 Build Stage
```yaml
# .github/workflows/ci.yml - Build Stage
build:
  runs-on: ubuntu-latest
  steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Setup pnpm
      uses: pnpm/action-setup@v4
      with:
        version: 9

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '22'
        cache: 'pnpm'

    - name: Install dependencies
      run: pnpm install --frozen-lockfile

    - name: Generate Prisma Client
      run: pnpm prisma:generate

    - name: Build
      run: pnpm build

    - name: Upload build artifacts
      uses: actions/upload-artifact@v4
      with:
        name: build-artifacts
        path: |
          apps/*/dist
          apps/*/.next
        retention-days: 1
```

#### 3.2.2 Test Stage
```yaml
# .github/workflows/ci.yml - Test Stage
test:
  runs-on: ubuntu-latest
  needs: build
  steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Setup pnpm
      uses: pnpm/action-setup@v4
      with:
        version: 9

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '22'
        cache: 'pnpm'

    - name: Install dependencies
      run: pnpm install --frozen-lockfile

    - name: Run Lint
      run: pnpm lint

    - name: Run Type Check
      run: pnpm type-check

    - name: Run Unit Tests
      run: pnpm test:coverage

    - name: Upload coverage
      uses: codecov/codecov-action@v4
      with:
        token: ${{ secrets.CODECOV_TOKEN }}
        files: ./coverage/lcov.info
        fail_ci_if_error: true
```

#### 3.2.3 Security Scan Stage
```yaml
# .github/workflows/security.yml - Security Stage
security:
  runs-on: ubuntu-latest
  steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Run CodeQL Analysis
      uses: github/codeql-action/init@v3
      with:
        languages: javascript-typescript

    - name: Perform CodeQL Analysis
      uses: github/codeql-action/analyze@v3

    - name: Run Dependency Audit
      run: pnpm audit --audit-level=high

    - name: Run Gitleaks (Secret Detection)
      uses: gitleaks/gitleaks-action@v2
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

    - name: Run Trivy (Container Scan)
      uses: aquasecurity/trivy-action@master
      with:
        scan-type: 'fs'
        ignore-unfixed: true
        format: 'sarif'
        output: 'trivy-results.sarif'
        severity: 'CRITICAL,HIGH'

    - name: Upload Trivy scan results
      uses: github/codeql-action/upload-sarif@v3
      with:
        sarif_file: 'trivy-results.sarif'
```

---

## 4. GitHub Actions Configuration

### 4.1 Main CI Workflow
```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

env:
  NODE_VERSION: '22'
  PNPM_VERSION: '9'

jobs:
  # ==========================================
  # Build Job
  # ==========================================
  build:
    name: Build
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'

      - name: Get pnpm store directory
        shell: bash
        run: echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV

      - name: Setup pnpm cache
        uses: actions/cache@v4
        with:
          path: ${{ env.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Generate Prisma Client
        run: pnpm prisma:generate

      - name: Build with Turborepo
        run: pnpm build
        env:
          NEXT_TELEMETRY_DISABLED: 1

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: |
            apps/web/.next
            apps/admin/dist
            apps/api/dist
          retention-days: 1

  # ==========================================
  # Lint Job
  # ==========================================
  lint:
    name: Lint
    runs-on: ubuntu-latest
    timeout-minutes: 5

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run ESLint
        run: pnpm lint

      - name: Run Prettier Check
        run: pnpm format:check

  # ==========================================
  # Type Check Job
  # ==========================================
  type-check:
    name: Type Check
    runs-on: ubuntu-latest
    timeout-minutes: 5

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Generate Prisma Client
        run: pnpm prisma:generate

      - name: Run Type Check
        run: pnpm type-check

  # ==========================================
  # Unit Tests Job
  # ==========================================
  test:
    name: Unit Tests
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Generate Prisma Client
        run: pnpm prisma:generate

      - name: Run Tests with Coverage
        run: pnpm test:coverage

      - name: Upload Coverage to Codecov
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          files: ./coverage/lcov.info
          fail_ci_if_error: false

  # ==========================================
  # All Checks Passed
  # ==========================================
  ci-success:
    name: CI Success
    runs-on: ubuntu-latest
    needs: [build, lint, type-check, test]
    if: always()

    steps:
      - name: Check all jobs passed
        run: |
          if [[ "${{ needs.build.result }}" != "success" ]] ||
             [[ "${{ needs.lint.result }}" != "success" ]] ||
             [[ "${{ needs.type-check.result }}" != "success" ]] ||
             [[ "${{ needs.test.result }}" != "success" ]]; then
            echo "One or more jobs failed"
            exit 1
          fi
          echo "All CI checks passed!"
```

### 4.2 Staging Deployment Workflow
```yaml
# .github/workflows/deploy-staging.yml
name: Deploy to Staging

on:
  push:
    branches: [develop]

concurrency:
  group: staging-deploy
  cancel-in-progress: false

env:
  REGISTRY: ghcr.io
  IMAGE_PREFIX: ${{ github.repository }}

jobs:
  # ==========================================
  # Build and Push Images
  # ==========================================
  build-images:
    name: Build Docker Images
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    outputs:
      image-tag: ${{ steps.meta.outputs.tags }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_PREFIX }}
          tags: |
            type=sha,prefix=staging-
            type=raw,value=staging-latest

      # Build API Image
      - name: Build and push API image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./apps/api/Dockerfile
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_PREFIX }}/api:staging-${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      # Build Web Image
      - name: Build and push Web image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./apps/web/Dockerfile
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_PREFIX }}/web:staging-${{ github.sha }}
          build-args: |
            NEXT_PUBLIC_API_URL=${{ vars.STAGING_API_URL }}
            NEXT_PUBLIC_APP_URL=${{ vars.STAGING_APP_URL }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      # Build Admin Image
      - name: Build and push Admin image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./apps/admin/Dockerfile
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_PREFIX }}/admin:staging-${{ github.sha }}
          build-args: |
            VITE_API_URL=${{ vars.STAGING_API_URL }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  # ==========================================
  # Deploy to Staging
  # ==========================================
  deploy:
    name: Deploy to Staging Server
    runs-on: ubuntu-latest
    needs: build-images
    environment:
      name: staging
      url: https://staging.smartacademy.edu.bd

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Deploy to Staging via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.STAGING_HOST }}
          username: ${{ secrets.STAGING_USER }}
          key: ${{ secrets.STAGING_SSH_KEY }}
          script: |
            cd /opt/smart-academy

            # Pull latest images
            docker compose -f docker-compose.staging.yml pull

            # Run database migrations
            docker compose -f docker-compose.staging.yml exec -T api pnpm prisma:migrate:deploy

            # Rolling update with zero downtime
            docker compose -f docker-compose.staging.yml up -d --remove-orphans

            # Wait for health checks
            sleep 30

            # Verify deployment
            curl -f https://staging.smartacademy.edu.bd/health || exit 1

            # Clean up old images
            docker image prune -f

      - name: Run E2E Tests
        uses: actions/checkout@v4
        with:
          sparse-checkout: 'tests/e2e'

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Install Playwright
        run: |
          npm install -g pnpm
          cd tests/e2e
          pnpm install
          pnpm exec playwright install --with-deps chromium

      - name: Run E2E Tests against Staging
        run: |
          cd tests/e2e
          pnpm test:e2e
        env:
          BASE_URL: ${{ vars.STAGING_APP_URL }}

      - name: Notify on Success
        if: success()
        uses: slackapi/slack-github-action@v1.26.0
        with:
          payload: |
            {
              "text": "✅ Staging deployment successful!",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Staging Deployment*\n✅ Successfully deployed to staging\n*Commit:* ${{ github.sha }}\n*URL:* https://staging.smartacademy.edu.bd"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

      - name: Notify on Failure
        if: failure()
        uses: slackapi/slack-github-action@v1.26.0
        with:
          payload: |
            {
              "text": "❌ Staging deployment failed!",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Staging Deployment Failed*\n❌ Deployment to staging failed\n*Commit:* ${{ github.sha }}\n*Run:* ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### 4.3 Production Deployment Workflow
```yaml
# .github/workflows/deploy-production.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      version:
        description: 'Version tag to deploy'
        required: false
        type: string

concurrency:
  group: production-deploy
  cancel-in-progress: false

env:
  REGISTRY: ghcr.io
  IMAGE_PREFIX: ${{ github.repository }}

jobs:
  # ==========================================
  # Pre-deployment Checks
  # ==========================================
  pre-deploy-check:
    name: Pre-deployment Checks
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Check if tests passed
        run: |
          # Verify CI workflow passed for this commit
          gh run list --branch main --workflow ci.yml --limit 1 --json conclusion -q '.[0].conclusion' | grep -q 'success'
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  # ==========================================
  # Build Production Images
  # ==========================================
  build-images:
    name: Build Production Images
    runs-on: ubuntu-latest
    needs: pre-deploy-check
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Generate version tag
        id: version
        run: |
          if [ -n "${{ inputs.version }}" ]; then
            echo "tag=${{ inputs.version }}" >> $GITHUB_OUTPUT
          else
            echo "tag=v$(date +'%Y%m%d')-${{ github.sha }}" >> $GITHUB_OUTPUT
          fi

      # Build API Image
      - name: Build and push API image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./apps/api/Dockerfile
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_PREFIX }}/api:${{ steps.version.outputs.tag }}
            ${{ env.REGISTRY }}/${{ env.IMAGE_PREFIX }}/api:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

      # Build Web Image
      - name: Build and push Web image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./apps/web/Dockerfile
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_PREFIX }}/web:${{ steps.version.outputs.tag }}
            ${{ env.REGISTRY }}/${{ env.IMAGE_PREFIX }}/web:latest
          build-args: |
            NEXT_PUBLIC_API_URL=${{ vars.PRODUCTION_API_URL }}
            NEXT_PUBLIC_APP_URL=${{ vars.PRODUCTION_APP_URL }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      # Build Admin Image
      - name: Build and push Admin image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./apps/admin/Dockerfile
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_PREFIX }}/admin:${{ steps.version.outputs.tag }}
            ${{ env.REGISTRY }}/${{ env.IMAGE_PREFIX }}/admin:latest
          build-args: |
            VITE_API_URL=${{ vars.PRODUCTION_API_URL }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

    outputs:
      version-tag: ${{ steps.version.outputs.tag }}

  # ==========================================
  # Deploy to Production (requires approval)
  # ==========================================
  deploy:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: build-images
    environment:
      name: production
      url: https://smartacademy.edu.bd

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Create deployment backup
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.PRODUCTION_HOST }}
          username: ${{ secrets.PRODUCTION_USER }}
          key: ${{ secrets.PRODUCTION_SSH_KEY }}
          script: |
            cd /opt/smart-academy

            # Create backup timestamp
            BACKUP_TAG=$(date +%Y%m%d_%H%M%S)

            # Backup current database
            docker compose exec -T postgres pg_dump -U postgres smart_academy > /backups/db/pre-deploy-$BACKUP_TAG.sql

            # Tag current images for rollback
            docker tag smart-academy/api:latest smart-academy/api:rollback-$BACKUP_TAG
            docker tag smart-academy/web:latest smart-academy/web:rollback-$BACKUP_TAG
            docker tag smart-academy/admin:latest smart-academy/admin:rollback-$BACKUP_TAG

            echo "Backup created: $BACKUP_TAG"

      - name: Deploy to Production via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.PRODUCTION_HOST }}
          username: ${{ secrets.PRODUCTION_USER }}
          key: ${{ secrets.PRODUCTION_SSH_KEY }}
          script: |
            cd /opt/smart-academy

            # Pull new images
            docker compose pull

            # Run database migrations
            docker compose exec -T api pnpm prisma:migrate:deploy

            # Perform rolling update
            docker compose up -d --remove-orphans --scale api=2 --scale web=2

            # Wait for new containers to be healthy
            sleep 30

            # Scale down old containers
            docker compose up -d --remove-orphans

            # Verify deployment
            curl -f https://smartacademy.edu.bd/health || exit 1
            curl -f https://api.smartacademy.edu.bd/health || exit 1

            # Cleanup
            docker image prune -f

      - name: Health Check
        run: |
          # Wait for services to stabilize
          sleep 10

          # Check main site
          HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://smartacademy.edu.bd/)
          if [ "$HTTP_STATUS" != "200" ]; then
            echo "Main site health check failed: $HTTP_STATUS"
            exit 1
          fi

          # Check API
          API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://api.smartacademy.edu.bd/health)
          if [ "$API_STATUS" != "200" ]; then
            echo "API health check failed: $API_STATUS"
            exit 1
          fi

          echo "All health checks passed!"

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          tag_name: ${{ needs.build-images.outputs.version-tag }}
          name: Release ${{ needs.build-images.outputs.version-tag }}
          body: |
            ## Deployment to Production

            **Version:** ${{ needs.build-images.outputs.version-tag }}
            **Commit:** ${{ github.sha }}
            **Deployed:** ${{ github.event.head_commit.timestamp }}

            ### Changes
            ${{ github.event.head_commit.message }}
          draft: false
          prerelease: false

      - name: Notify Success
        if: success()
        uses: slackapi/slack-github-action@v1.26.0
        with:
          payload: |
            {
              "text": "🚀 Production deployment successful!",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Production Deployment*\n🚀 Successfully deployed to production!\n*Version:* ${{ needs.build-images.outputs.version-tag }}\n*URL:* https://smartacademy.edu.bd"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

      - name: Notify Failure
        if: failure()
        uses: slackapi/slack-github-action@v1.26.0
        with:
          payload: |
            {
              "text": "🔴 Production deployment FAILED!",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*PRODUCTION DEPLOYMENT FAILED*\n🔴 Immediate attention required!\n*Commit:* ${{ github.sha }}\n*Run:* ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

## 5. Automated Testing

### 5.1 Test Strategy
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          TEST PYRAMID                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                              /\                                              │
│                             /  \                                             │
│                            /    \         E2E Tests (Playwright)             │
│                           / E2E  \        • Critical user journeys           │
│                          /________\       • 10-20 tests                      │
│                         /          \      • Run on staging deploy            │
│                        /            \                                        │
│                       / Integration  \    Integration Tests                  │
│                      /________________\   • API endpoints                    │
│                     /                  \  • Database operations              │
│                    /                    \ • 50-100 tests                     │
│                   /       Unit          \                                    │
│                  /_______________________\  Unit Tests (Vitest)              │
│                                           • Functions, hooks, utils         │
│                                           • 200+ tests                      │
│                                           • 80% coverage target             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Unit Test Configuration
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/types/**',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },
    testTimeout: 10000,
    hookTimeout: 10000,
  },
})
```

### 5.3 E2E Test Configuration
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results.json' }],
    process.env.CI ? ['github'] : ['list'],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 5'] },
    },
  ],

  webServer: process.env.CI ? undefined : {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

### 5.4 Critical E2E Test Scenarios
```typescript
// tests/e2e/critical-paths.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Critical User Journeys', () => {
  test('Parent can login and view dashboard', async ({ page }) => {
    await page.goto('/login')
    await page.fill('[name="email"]', 'parent@test.com')
    await page.fill('[name="password"]', 'TestPassword123')
    await page.click('[type="submit"]')

    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('h1')).toContainText('Dashboard')
  })

  test('Parent can view student progress', async ({ page }) => {
    // Login first
    await page.goto('/login')
    await page.fill('[name="email"]', 'parent@test.com')
    await page.fill('[name="password"]', 'TestPassword123')
    await page.click('[type="submit"]')

    // Navigate to student progress
    await page.click('[data-testid="student-progress-link"]')
    await expect(page.locator('[data-testid="progress-card"]')).toBeVisible()
  })

  test('Fee payment flow works', async ({ page }) => {
    await page.goto('/payments')
    // Test payment initiation (sandbox mode)
    await page.click('[data-testid="pay-fees-btn"]')
    await expect(page.locator('[data-testid="payment-modal"]')).toBeVisible()
  })

  test('Mobile responsive navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Check mobile menu
    await page.click('[data-testid="mobile-menu-btn"]')
    await expect(page.locator('[data-testid="mobile-nav"]')).toBeVisible()
  })
})
```

---

## 6. Security Scanning

### 6.1 Security Workflow
```yaml
# .github/workflows/security.yml
name: Security Scan

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
  schedule:
    # Run daily at midnight
    - cron: '0 0 * * *'

permissions:
  contents: read
  security-events: write

jobs:
  # ==========================================
  # CodeQL SAST Analysis
  # ==========================================
  codeql:
    name: CodeQL Analysis
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: javascript-typescript
          config-file: ./.github/codeql/codeql-config.yml

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
        with:
          category: "/language:javascript-typescript"

  # ==========================================
  # Dependency Vulnerability Scan
  # ==========================================
  dependency-scan:
    name: Dependency Audit
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run pnpm audit
        run: pnpm audit --audit-level=high
        continue-on-error: true

      - name: Run Snyk vulnerability scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high

  # ==========================================
  # Secret Detection
  # ==========================================
  secret-scan:
    name: Secret Detection
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Run Gitleaks
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GITLEAKS_NOTIFY_USER_LIST: '@security-team'

  # ==========================================
  # Container Security Scan
  # ==========================================
  container-scan:
    name: Container Security
    runs-on: ubuntu-latest
    if: github.event_name != 'schedule'

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Build test image
        run: docker build -t test-image:latest -f apps/api/Dockerfile .

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'test-image:latest'
          format: 'sarif'
          output: 'trivy-results.sarif'
          severity: 'CRITICAL,HIGH'
          ignore-unfixed: true

      - name: Upload Trivy scan results
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: 'trivy-results.sarif'

  # ==========================================
  # Infrastructure Security Scan
  # ==========================================
  infrastructure-scan:
    name: Infrastructure Scan
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Run Checkov (IaC scan)
        uses: bridgecrewio/checkov-action@master
        with:
          directory: .
          framework: dockerfile,github_actions
          output_format: sarif
          output_file_path: checkov-results.sarif

      - name: Upload Checkov results
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: 'checkov-results.sarif'
```

### 6.2 CodeQL Configuration
```yaml
# .github/codeql/codeql-config.yml
name: "Smart Academy CodeQL Config"

queries:
  - uses: security-and-quality
  - uses: security-extended

query-filters:
  - exclude:
      id: js/unused-local-variable
  - exclude:
      id: js/useless-expression

paths-ignore:
  - node_modules
  - '**/node_modules'
  - '**/*.test.ts'
  - '**/*.spec.ts'
  - tests
  - coverage
  - dist
  - .next
```

---

## 7. Deployment Triggers

### 7.1 Trigger Configuration
| Trigger | Branch | Workflow | Environment | Approval |
|---------|--------|----------|-------------|----------|
| Push | `feature/*` | CI only | None | No |
| PR | `develop` | CI only | None | No |
| Merge | `develop` | CI + Deploy | Staging | No |
| Merge | `main` | CI + Deploy | Production | Yes |
| Manual | Any | Deploy | Selected | Yes |
| Tag `v*` | Any | Release | Production | Yes |
| Hotfix | `hotfix/*` | Fast Deploy | Production | Yes |
| Schedule | N/A | Security | None | No |

### 7.2 Environment Protection Rules
```yaml
# GitHub Environment Settings

# Staging Environment
staging:
  deployment_branch_policy:
    protected_branches: false
    custom_branch_policies:
      - develop
  reviewers: []
  wait_timer: 0

# Production Environment
production:
  deployment_branch_policy:
    protected_branches: true
  reviewers:
    - tech-lead
  wait_timer: 5  # 5 minute delay
  required_reviewers: 1
```

### 7.3 Manual Deployment Trigger
```yaml
# .github/workflows/manual-deploy.yml
name: Manual Deployment

on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Deployment environment'
        required: true
        type: choice
        options:
          - staging
          - production
      version:
        description: 'Image tag to deploy'
        required: true
        type: string
      run_migrations:
        description: 'Run database migrations'
        required: true
        type: boolean
        default: true

jobs:
  deploy:
    name: Deploy ${{ inputs.version }} to ${{ inputs.environment }}
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}

    steps:
      - name: Deploy
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ inputs.environment == 'production' && secrets.PRODUCTION_HOST || secrets.STAGING_HOST }}
          username: ${{ secrets.DEPLOY_USER }}
          key: ${{ secrets.DEPLOY_SSH_KEY }}
          script: |
            cd /opt/smart-academy

            # Update image tags
            sed -i 's/IMAGE_TAG=.*/IMAGE_TAG=${{ inputs.version }}/' .env

            # Pull and deploy
            docker compose pull

            ${{ inputs.run_migrations && 'docker compose exec -T api pnpm prisma:migrate:deploy' || 'echo "Skipping migrations"' }}

            docker compose up -d

            # Health check
            sleep 30
            curl -f https://${{ inputs.environment == 'production' && 'smartacademy.edu.bd' || 'staging.smartacademy.edu.bd' }}/health
```

---

## 8. Rollback Procedures

### 8.1 Rollback Strategy
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          ROLLBACK DECISION TREE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                        Deployment Issue Detected                             │
│                                  │                                           │
│                                  ▼                                           │
│                    ┌──────────────────────────┐                              │
│                    │  Is it a critical issue? │                              │
│                    │  (Site down, data loss)  │                              │
│                    └──────────────────────────┘                              │
│                           │              │                                   │
│                          YES            NO                                   │
│                           │              │                                   │
│                           ▼              ▼                                   │
│              ┌────────────────────┐ ┌────────────────────┐                  │
│              │ IMMEDIATE ROLLBACK │ │  Can wait for fix? │                  │
│              │   (< 5 minutes)    │ │                    │                  │
│              └────────────────────┘ └────────────────────┘                  │
│                           │              │        │                          │
│                           │            YES       NO                          │
│                           │              │        │                          │
│                           │              ▼        ▼                          │
│                           │    ┌───────────┐ ┌───────────┐                  │
│                           │    │Deploy Fix │ │  ROLLBACK │                  │
│                           │    │ Forward   │ │           │                  │
│                           │    └───────────┘ └───────────┘                  │
│                           │                                                  │
│                           ▼                                                  │
│              ┌────────────────────────────────────────────┐                 │
│              │           ROLLBACK EXECUTION               │                 │
│              │                                            │                 │
│              │  1. Run rollback workflow                  │                 │
│              │  2. Verify previous images deployed        │                 │
│              │  3. Run database rollback (if needed)      │                 │
│              │  4. Verify site functionality              │                 │
│              │  5. Notify stakeholders                    │                 │
│              │  6. Document incident                      │                 │
│              └────────────────────────────────────────────┘                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Rollback Workflow
```yaml
# .github/workflows/rollback.yml
name: Rollback Deployment

on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to rollback'
        required: true
        type: choice
        options:
          - staging
          - production
      version:
        description: 'Version to rollback to (leave empty for previous)'
        required: false
        type: string
      rollback_database:
        description: 'Also rollback database migrations'
        required: true
        type: boolean
        default: false

jobs:
  rollback:
    name: Rollback ${{ inputs.environment }}
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Determine rollback version
        id: version
        run: |
          if [ -n "${{ inputs.version }}" ]; then
            echo "target=${{ inputs.version }}" >> $GITHUB_OUTPUT
          else
            # Get previous version from deployment history
            PREVIOUS=$(gh run list --workflow deploy-production.yml --limit 2 --json headSha -q '.[1].headSha')
            echo "target=$PREVIOUS" >> $GITHUB_OUTPUT
          fi
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Execute Rollback
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ inputs.environment == 'production' && secrets.PRODUCTION_HOST || secrets.STAGING_HOST }}
          username: ${{ secrets.DEPLOY_USER }}
          key: ${{ secrets.DEPLOY_SSH_KEY }}
          script: |
            cd /opt/smart-academy

            echo "🔄 Starting rollback to version: ${{ steps.version.outputs.target }}"

            # Update to previous version
            sed -i 's/IMAGE_TAG=.*/IMAGE_TAG=${{ steps.version.outputs.target }}/' .env

            # Pull previous images
            docker compose pull

            # Database rollback if requested
            if [ "${{ inputs.rollback_database }}" = "true" ]; then
              echo "Rolling back database migrations..."
              docker compose exec -T api pnpm prisma:migrate:rollback --steps 1
            fi

            # Deploy previous version
            docker compose up -d --force-recreate

            # Wait and verify
            sleep 30

            # Health check
            curl -f https://${{ inputs.environment == 'production' && 'smartacademy.edu.bd' || 'staging.smartacademy.edu.bd' }}/health

            echo "✅ Rollback completed successfully"

      - name: Notify Rollback
        uses: slackapi/slack-github-action@v1.26.0
        with:
          payload: |
            {
              "text": "⚠️ Rollback executed on ${{ inputs.environment }}",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Rollback Executed*\n⚠️ ${{ inputs.environment }} rolled back to version ${{ steps.version.outputs.target }}\n*Database Rollback:* ${{ inputs.rollback_database }}\n*Triggered by:* ${{ github.actor }}"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### 8.3 Database Rollback Scripts
```bash
#!/bin/bash
# scripts/db-rollback.sh

# Usage: ./db-rollback.sh [steps]
STEPS=${1:-1}

echo "⚠️  WARNING: Database rollback will be performed"
echo "Rolling back $STEPS migration(s)"
echo ""
read -p "Are you sure? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Aborted."
    exit 1
fi

# Create backup before rollback
BACKUP_FILE="/backups/db/pre-rollback-$(date +%Y%m%d_%H%M%S).sql"
echo "Creating backup: $BACKUP_FILE"
docker compose exec -T postgres pg_dump -U postgres smart_academy > "$BACKUP_FILE"

# Execute rollback
echo "Executing migration rollback..."
docker compose exec -T api pnpm prisma migrate resolve --rolled-back

# If using numbered rollback
# docker compose exec -T api pnpm prisma:migrate:rollback --steps $STEPS

echo "✅ Database rollback completed"
echo "Backup available at: $BACKUP_FILE"
```

---

## 9. Pipeline Monitoring

### 9.1 Metrics Dashboard
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        PIPELINE METRICS DASHBOARD                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   KEY METRICS                                                                │
│   ────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│   Deployment Frequency:                                                      │
│   ┌────────────────────────────────────────────────────────────────────┐   │
│   │ Target: 5-10 deploys/week   │  Actual: [████████░░] 8 deploys      │   │
│   └────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   Lead Time for Changes:                                                     │
│   ┌────────────────────────────────────────────────────────────────────┐   │
│   │ Target: < 1 day              │  Actual: [██████████] 4 hours       │   │
│   └────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   Pipeline Success Rate:                                                     │
│   ┌────────────────────────────────────────────────────────────────────┐   │
│   │ Target: > 95%                │  Actual: [█████████░] 96.5%         │   │
│   └────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   Mean Time to Recovery (MTTR):                                              │
│   ┌────────────────────────────────────────────────────────────────────┐   │
│   │ Target: < 1 hour             │  Actual: [██████████] 25 min        │   │
│   └────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   Change Failure Rate:                                                       │
│   ┌────────────────────────────────────────────────────────────────────┐   │
│   │ Target: < 5%                 │  Actual: [█░░░░░░░░░] 2.1%          │   │
│   └────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   Average Pipeline Duration:                                                 │
│   ┌────────────────────────────────────────────────────────────────────┐   │
│   │ Target: < 15 min             │  Actual: [████████░░] 12 min        │   │
│   └────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 9.2 Alerting Rules
```yaml
# GitHub Actions job for monitoring
- name: Check pipeline health
  run: |
    # Get recent workflow runs
    RUNS=$(gh run list --workflow ci.yml --limit 20 --json conclusion)

    # Calculate success rate
    TOTAL=$(echo $RUNS | jq length)
    SUCCESS=$(echo $RUNS | jq '[.[] | select(.conclusion == "success")] | length')
    RATE=$(echo "scale=2; $SUCCESS / $TOTAL * 100" | bc)

    # Alert if below threshold
    if (( $(echo "$RATE < 90" | bc -l) )); then
      echo "::warning::Pipeline success rate below 90%: ${RATE}%"
      # Send alert
    fi
```

### 9.3 Status Badges
```markdown
<!-- Add to README.md -->
![CI](https://github.com/smart-academy/portal/actions/workflows/ci.yml/badge.svg)
![Security](https://github.com/smart-academy/portal/actions/workflows/security.yml/badge.svg)
![Deploy Staging](https://github.com/smart-academy/portal/actions/workflows/deploy-staging.yml/badge.svg)
![Deploy Production](https://github.com/smart-academy/portal/actions/workflows/deploy-production.yml/badge.svg)
[![codecov](https://codecov.io/gh/smart-academy/portal/branch/main/graph/badge.svg)](https://codecov.io/gh/smart-academy/portal)
```

---

## Appendices

### Appendix A: GitHub Secrets Configuration
| Secret | Environment | Description |
|--------|-------------|-------------|
| `STAGING_HOST` | Staging | Staging server IP |
| `STAGING_USER` | Staging | SSH username |
| `STAGING_SSH_KEY` | Staging | SSH private key |
| `PRODUCTION_HOST` | Production | Production server IP |
| `PRODUCTION_USER` | Production | SSH username |
| `PRODUCTION_SSH_KEY` | Production | SSH private key |
| `SLACK_WEBHOOK_URL` | All | Slack notifications |
| `CODECOV_TOKEN` | All | Code coverage upload |
| `SNYK_TOKEN` | All | Snyk vulnerability scanning |

### Appendix B: Pipeline Optimization Tips
1. Use pnpm caching effectively
2. Run independent jobs in parallel
3. Use matrix builds for multi-version testing
4. Implement incremental builds with Turborepo
5. Use shallow clones (`fetch-depth: 1`) for faster checkouts
6. Cache Docker layers with GitHub Actions cache

---

## Document History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-10 | Smart Academy Team | Initial document |
