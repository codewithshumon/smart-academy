# Development Environment Setup Guide

## Document Information
| Field | Value |
|-------|-------|
| **Document ID** | DEV-ENV-001 |
| **Version** | 1.0 |
| **Last Updated** | 2026-01-10 |
| **Author** | Smart Academy Development Team |
| **Status** | Active |

---

## Table of Contents
1. [Overview](#1-overview)
2. [System Requirements](#2-system-requirements)
3. [Hardware Specifications](#3-hardware-specifications)
4. [Operating System Configuration](#4-operating-system-configuration)
5. [Software Installation](#5-software-installation)
6. [Project Setup](#6-project-setup)
7. [Environment Verification Checklist](#7-environment-verification-checklist)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Overview

### 1.1 Purpose
This document provides comprehensive instructions for setting up the development environment for the Smart Academy Digital Portal. Following this guide ensures a consistent, fully-functional development setup.

### 1.2 Development Environment Architecture
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Development Environment                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         Host Machine (Linux)                         │   │
│  │                                                                       │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │   │
│  │  │   VSCode    │  │    Git      │  │   Node.js   │                  │   │
│  │  │    IDE      │  │   v2.43+    │  │   22 LTS    │                  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                  │   │
│  │                                                                       │   │
│  │  ┌───────────────────────────────────────────────────────────────┐  │   │
│  │  │                     Docker Compose                             │  │   │
│  │  │                                                                 │  │   │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │  │   │
│  │  │  │PostgreSQL│ │  MySQL   │ │  Redis   │ │ MinIO (S3)       │  │  │   │
│  │  │  │  :5432   │ │  :3306   │ │  :6379   │ │ :9000/:9001      │  │  │   │
│  │  │  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘  │  │   │
│  │  │                                                                 │  │   │
│  │  │  ┌──────────┐ ┌──────────┐                                     │  │   │
│  │  │  │  Gibbon  │ │  Moodle  │                                     │  │   │
│  │  │  │:8080/8081│ │  :8082   │                                     │  │   │
│  │  │  └──────────┘ └──────────┘                                     │  │   │
│  │  └───────────────────────────────────────────────────────────────┘  │   │
│  │                                                                       │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐│   │
│  │  │                    Application Servers                          ││   │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   ││   │
│  │  │  │ Next.js  │ │  Admin   │ │ Fastify  │ │ Expo Dev Server  │   ││   │
│  │  │  │  :3000   │ │  :3001   │ │  :4000   │ │     :8083        │   ││   │
│  │  │  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   ││   │
│  │  └─────────────────────────────────────────────────────────────────┘│   │
│  │                                                                       │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Technology Stack Summary
| Category | Technology | Version |
|----------|------------|---------|
| Frontend | Next.js | 15.x |
| Frontend | React | 19.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Backend | Node.js | 22 LTS |
| API Framework | Fastify | 5.x |
| ORM | Prisma | 6.x |
| Database | PostgreSQL | 16+ |
| Database | MySQL | 8.0 |
| Cache | Redis | 7+ |
| Mobile | React Native | 0.76+ |
| Mobile | Expo | 52+ |
| Package Manager | pnpm | 9.x |
| Build Tool | Vite | 6.x |
| Containerization | Docker | 26+ |

---

## 2. System Requirements

### 2.1 Minimum Requirements
| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | 4 cores | 8+ cores |
| RAM | 16 GB | 32 GB |
| Storage | 100 GB SSD | 256 GB NVMe SSD |
| Network | 10 Mbps | 100 Mbps |

### 2.2 Software Requirements
| Software | Minimum Version | Recommended Version |
|----------|-----------------|---------------------|
| Linux Kernel | 5.15+ | 6.x+ |
| Docker | 26.0+ | 27.x |
| Docker Compose | 2.24+ | 2.29+ |
| Node.js | 22.0.0 | 22.x LTS (Latest) |
| pnpm | 9.0.0 | 9.x (Latest) |
| Git | 2.40+ | 2.47+ |

### 2.3 Supported Operating Systems
| Distribution | Versions | Support Level |
|--------------|----------|---------------|
| Ubuntu | 22.04 LTS, 24.04 LTS | Full |
| Debian | 12 (Bookworm) | Full |
| Fedora | 39, 40 | Full |
| Linux Mint | 21.x, 22.x | Full |
| Arch Linux | Rolling | Community |

---

## 3. Hardware Specifications

### 3.1 Development Workstation
```
Recommended Development Hardware
================================

CPU:        AMD Ryzen 7/9 or Intel Core i7/i9 (8+ cores)
            - Multi-threading critical for parallel builds
            - Higher clock speeds improve TypeScript compilation

RAM:        32 GB DDR4/DDR5 (3200MHz+)
            - Docker containers: ~8 GB
            - Node.js processes: ~4 GB
            - IDE + Browser: ~8 GB
            - OS + Buffer: ~12 GB

Storage:    256 GB+ NVMe SSD
            - Project files: ~5 GB
            - Docker images: ~20 GB
            - Docker volumes: ~10 GB
            - node_modules: ~5 GB
            - System: ~50 GB

Network:    Gigabit Ethernet or Wi-Fi 6
            - npm/pnpm package downloads
            - Docker image pulls
            - External API testing

Display:    1920x1080 minimum
            - 4K recommended for code readability
            - Dual monitor setup ideal
```

### 3.2 Resource Allocation Matrix
| Service | CPU (cores) | RAM (GB) | Disk I/O Priority |
|---------|-------------|----------|-------------------|
| VSCode + Extensions | 2 | 4 | Medium |
| Node.js (Next.js) | 2 | 2 | High |
| Node.js (Fastify) | 1 | 1 | Medium |
| PostgreSQL | 1 | 2 | High |
| MySQL | 1 | 2 | High |
| Redis | 0.5 | 0.5 | High |
| Docker Engine | 1 | 2 | Medium |
| Browser (Chrome/Firefox) | 2 | 4 | Low |

---

## 4. Operating System Configuration

### 4.1 System Updates
```bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade -y
sudo apt install -y build-essential curl wget git gnupg lsb-release

# Fedora
sudo dnf update -y
sudo dnf groupinstall -y "Development Tools"
sudo dnf install -y curl wget git
```

### 4.2 File Descriptor Limits
```bash
# Check current limits
ulimit -n

# Add to /etc/security/limits.conf
cat << 'EOF' | sudo tee -a /etc/security/limits.conf
# Smart Academy Development Environment
* soft nofile 65536
* hard nofile 65536
* soft nproc 4096
* hard nproc 4096
EOF

# Apply changes (requires logout/login)
```

### 4.3 Inotify Watchers
```bash
# Check current value
cat /proc/sys/fs/inotify/max_user_watches

# Increase for large projects (required for file watching)
echo "fs.inotify.max_user_watches=524288" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### 4.4 Swap Configuration
```bash
# Check swap status
swapon --show

# Create 8GB swap file if needed (for systems with 16GB RAM)
sudo fallocate -l 8G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 4.5 Timezone Configuration
```bash
# Set timezone to project timezone (adjust as needed)
sudo timedatectl set-timezone Asia/Dhaka

# Verify
timedatectl
```

---

## 5. Software Installation

### 5.1 Git Installation and Configuration
```bash
# Install Git
# Ubuntu/Debian
sudo apt install -y git

# Fedora
sudo dnf install -y git

# Verify installation
git --version

# Configure Git identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Configure Git defaults
git config --global init.defaultBranch main
git config --global core.autocrlf input
git config --global core.editor "code --wait"
git config --global pull.rebase false
git config --global push.autoSetupRemote true
git config --global fetch.prune true

# Enable Git credential caching (15 minutes)
git config --global credential.helper cache
git config --global credential.helper 'cache --timeout=900'

# Configure Git aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.lg "log --oneline --graph --decorate"
```

### 5.2 Node.js Installation (via nvm)
```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Reload shell configuration
source ~/.bashrc  # or ~/.zshrc for zsh

# Verify nvm installation
nvm --version

# Install Node.js 22 LTS
nvm install 22
nvm use 22
nvm alias default 22

# Verify Node.js installation
node --version    # Should show v22.x.x
npm --version     # Should show 10.x.x

# Enable corepack for pnpm
corepack enable
corepack prepare pnpm@latest --activate

# Verify pnpm
pnpm --version    # Should show 9.x.x
```

### 5.3 Docker Installation
```bash
# Remove old versions
sudo apt remove docker docker-engine docker.io containerd runc 2>/dev/null

# Install prerequisites
sudo apt install -y ca-certificates curl gnupg

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Set up repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Add user to docker group (avoid sudo for docker commands)
sudo usermod -aG docker $USER

# Apply group changes (requires logout/login or newgrp)
newgrp docker

# Verify installation
docker --version
docker compose version

# Enable Docker to start on boot
sudo systemctl enable docker
sudo systemctl start docker

# Test Docker installation
docker run --rm hello-world
```

### 5.4 PostgreSQL Client Installation
```bash
# Install PostgreSQL client (for psql command)
# Ubuntu/Debian
sudo apt install -y postgresql-client

# Verify
psql --version

# Install pgAdmin4 (optional GUI tool)
curl -fsS https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg
sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list && apt update'
sudo apt install -y pgadmin4-desktop
```

### 5.5 Redis Client Installation
```bash
# Install Redis CLI
sudo apt install -y redis-tools

# Verify
redis-cli --version
```

### 5.6 Visual Studio Code Installation
```bash
# Download and install via official package
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt update
sudo apt install -y code

# Verify installation
code --version
```

### 5.7 Additional Development Tools
```bash
# Install jq for JSON processing
sudo apt install -y jq

# Install httpie for API testing
sudo apt install -y httpie

# Install tree for directory visualization
sudo apt install -y tree

# Install ripgrep for fast code searching
sudo apt install -y ripgrep

# Install fzf for fuzzy finding
sudo apt install -y fzf

# Install tmux for terminal multiplexing
sudo apt install -y tmux

# Install htop for system monitoring
sudo apt install -y htop

# Install ncdu for disk usage analysis
sudo apt install -y ncdu
```

---

## 6. Project Setup

### 6.1 Clone Repository
```bash
# Create development directory
mkdir -p ~/development
cd ~/development

# Clone the repository
git clone <repository-url> smart-academy
cd smart-academy

# Verify project structure
tree -L 2 -d
```

### 6.2 Environment Configuration
```bash
# Copy example environment files
cp .env.example .env
cp apps/web/.env.example apps/web/.env.local
cp apps/admin/.env.example apps/admin/.env.local
cp apps/api/.env.example apps/api/.env.local

# Edit environment files with appropriate values
code .env
```

### 6.3 Environment Variables Template
```bash
# .env (Root - Shared across all apps)
NODE_ENV=development

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/smart_academy_dev"
MYSQL_URL="mysql://root:root@localhost:3306/gibbon_dev"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT Secrets (Generate unique values for development)
JWT_ACCESS_SECRET="dev-access-secret-change-in-production"
JWT_REFRESH_SECRET="dev-refresh-secret-change-in-production"

# API URLs
NEXT_PUBLIC_API_URL="http://localhost:4000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# External Services (Development/Sandbox)
MINIO_ENDPOINT="localhost"
MINIO_PORT=9000
MINIO_ACCESS_KEY="minioadmin"
MINIO_SECRET_KEY="minioadmin"
MINIO_BUCKET="smart-academy-dev"

# Gibbon SIS
GIBBON_API_URL="http://localhost:8080"
GIBBON_API_KEY="dev-gibbon-key"

# Moodle LMS
MOODLE_API_URL="http://localhost:8082"
MOODLE_API_TOKEN="dev-moodle-token"
```

### 6.4 Install Dependencies
```bash
# Install all dependencies using pnpm
pnpm install

# This will install dependencies for all workspaces:
# - apps/web (Next.js frontend)
# - apps/admin (React admin dashboard)
# - apps/api (Fastify backend)
# - apps/mobile (React Native/Expo)
# - packages/* (Shared packages)
```

### 6.5 Database Setup
```bash
# Start Docker services
docker compose up -d postgres mysql redis minio

# Wait for services to be healthy
docker compose ps

# Run Prisma migrations
pnpm prisma:migrate:dev

# Seed development data
pnpm prisma:seed

# Generate Prisma client
pnpm prisma:generate
```

### 6.6 Start Development Servers
```bash
# Start all development servers (using Turborepo)
pnpm dev

# Or start individual services:
pnpm dev:web      # Next.js on port 3000
pnpm dev:admin    # Admin on port 3001
pnpm dev:api      # Fastify on port 4000
pnpm dev:mobile   # Expo on port 8083

# View all running processes
pnpm dev:status
```

### 6.7 Verify Installation
```bash
# Test frontend
curl http://localhost:3000 -I

# Test API
curl http://localhost:4000/health

# Test database connection
pnpm prisma:studio
```

---

## 7. Environment Verification Checklist

### 7.1 Pre-Flight Checklist
Use this checklist to verify your development environment is properly configured.

```
┌─────────────────────────────────────────────────────────────────────┐
│                 DEVELOPMENT ENVIRONMENT CHECKLIST                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  SYSTEM REQUIREMENTS                                                 │
│  ─────────────────────────────────────────────────────────────────  │
│  [ ] Linux OS installed and updated                                  │
│  [ ] File descriptor limits increased (65536+)                       │
│  [ ] Inotify watchers increased (524288+)                           │
│  [ ] Swap configured (8GB+ for 16GB RAM systems)                    │
│  [ ] Timezone set correctly                                          │
│                                                                      │
│  SOFTWARE INSTALLATION                                               │
│  ─────────────────────────────────────────────────────────────────  │
│  [ ] Git installed (v2.40+): git --version                          │
│  [ ] Git identity configured: git config user.name                  │
│  [ ] nvm installed: nvm --version                                    │
│  [ ] Node.js 22 LTS installed: node --version                       │
│  [ ] pnpm installed (v9+): pnpm --version                           │
│  [ ] Docker installed (v26+): docker --version                      │
│  [ ] Docker Compose installed: docker compose version               │
│  [ ] Docker running without sudo: docker ps                         │
│  [ ] VSCode installed: code --version                               │
│                                                                      │
│  PROJECT SETUP                                                       │
│  ─────────────────────────────────────────────────────────────────  │
│  [ ] Repository cloned successfully                                  │
│  [ ] Environment files created (.env, .env.local)                   │
│  [ ] Dependencies installed: pnpm install                           │
│  [ ] Docker containers running: docker compose ps                   │
│  [ ] Prisma migrations applied                                       │
│  [ ] Database seeded with test data                                 │
│                                                                      │
│  SERVICES VERIFICATION                                               │
│  ─────────────────────────────────────────────────────────────────  │
│  [ ] PostgreSQL accessible: psql -h localhost -U postgres           │
│  [ ] Redis accessible: redis-cli ping                               │
│  [ ] Next.js running: http://localhost:3000                         │
│  [ ] Admin dashboard running: http://localhost:3001                 │
│  [ ] API server running: http://localhost:4000/health               │
│  [ ] MinIO accessible: http://localhost:9001                        │
│                                                                      │
│  DEVELOPMENT TOOLS                                                   │
│  ─────────────────────────────────────────────────────────────────  │
│  [ ] VSCode extensions installed                                     │
│  [ ] ESLint working: pnpm lint                                      │
│  [ ] TypeScript compiling: pnpm type-check                          │
│  [ ] Hot Module Replacement working                                  │
│  [ ] Prisma Studio accessible: pnpm prisma:studio                   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 7.2 Automated Verification Script
```bash
#!/bin/bash
# save as: scripts/verify-environment.sh

echo "🔍 Smart Academy Development Environment Verification"
echo "======================================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

check() {
    if $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $2"
        return 0
    else
        echo -e "${RED}✗${NC} $2"
        return 1
    fi
}

errors=0

echo ""
echo "📦 Checking installed software..."
check "git --version" "Git installed" || ((errors++))
check "node --version" "Node.js installed" || ((errors++))
check "pnpm --version" "pnpm installed" || ((errors++))
check "docker --version" "Docker installed" || ((errors++))
check "docker compose version" "Docker Compose installed" || ((errors++))
check "code --version" "VSCode installed" || ((errors++))

echo ""
echo "🐳 Checking Docker services..."
check "docker ps" "Docker daemon running" || ((errors++))
check "docker compose ps --filter 'status=running' | grep postgres" "PostgreSQL container" || ((errors++))
check "docker compose ps --filter 'status=running' | grep redis" "Redis container" || ((errors++))

echo ""
echo "🌐 Checking service connectivity..."
check "curl -s http://localhost:3000 -o /dev/null" "Next.js (port 3000)" || ((errors++))
check "curl -s http://localhost:4000/health -o /dev/null" "API Server (port 4000)" || ((errors++))
check "redis-cli ping | grep -q PONG" "Redis connection" || ((errors++))

echo ""
echo "======================================================="
if [ $errors -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed! Environment is ready.${NC}"
    exit 0
else
    echo -e "${RED}✗ $errors check(s) failed. Please review above.${NC}"
    exit 1
fi
```

### 7.3 Service Health Endpoints
| Service | Health Check Command | Expected Response |
|---------|---------------------|-------------------|
| Next.js | `curl http://localhost:3000` | 200 OK |
| Admin | `curl http://localhost:3001` | 200 OK |
| API | `curl http://localhost:4000/health` | `{"status":"ok"}` |
| PostgreSQL | `pg_isready -h localhost -p 5432` | "accepting connections" |
| Redis | `redis-cli ping` | `PONG` |
| MinIO | `curl http://localhost:9000/minio/health/live` | 200 OK |

---

## 8. Troubleshooting

### 8.1 Common Issues and Solutions

#### Docker Permission Denied
```bash
# Error: permission denied while trying to connect to Docker daemon
# Solution: Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
# Or logout and login again
```

#### Port Already in Use
```bash
# Check what's using the port
sudo lsof -i :3000
sudo netstat -tulpn | grep 3000

# Kill process using port
sudo kill -9 $(lsof -t -i:3000)

# Or use fuser
sudo fuser -k 3000/tcp
```

#### Node Modules Issues
```bash
# Clear pnpm cache and reinstall
pnpm store prune
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
pnpm install
```

#### Database Connection Failed
```bash
# Check if PostgreSQL container is running
docker compose ps postgres

# View PostgreSQL logs
docker compose logs postgres

# Restart PostgreSQL
docker compose restart postgres

# Reset database (WARNING: Deletes all data)
docker compose down -v
docker compose up -d postgres
pnpm prisma:migrate:dev
pnpm prisma:seed
```

#### Prisma Issues
```bash
# Regenerate Prisma client
pnpm prisma:generate

# Reset database and migrations
pnpm prisma:migrate:reset

# View database in browser
pnpm prisma:studio
```

#### Hot Module Replacement Not Working
```bash
# Increase inotify watchers
echo "fs.inotify.max_user_watches=524288" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Restart development server
pnpm dev
```

#### Out of Memory Errors
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=8192"

# Add to ~/.bashrc for persistence
echo 'export NODE_OPTIONS="--max-old-space-size=8192"' >> ~/.bashrc
```

### 8.2 Debug Mode
```bash
# Enable verbose logging
export DEBUG=*

# Enable specific debug namespaces
export DEBUG=prisma:*,fastify:*

# Run with debug output
DEBUG=* pnpm dev:api
```

### 8.3 Getting Help
| Resource | URL/Command |
|----------|-------------|
| Project Wiki | Internal documentation |
| Team Chat | #smart-academy-dev |
| Issue Tracker | GitHub Issues |
| Stack Overflow | Tag: smart-academy |

---

## Appendices

### Appendix A: Port Reference
| Port | Service | Protocol |
|------|---------|----------|
| 3000 | Next.js (Parent Portal) | HTTP |
| 3001 | Admin Dashboard | HTTP |
| 4000 | Fastify API | HTTP |
| 5432 | PostgreSQL | TCP |
| 3306 | MySQL (Gibbon/Moodle) | TCP |
| 6379 | Redis | TCP |
| 8080 | Gibbon SIS | HTTP |
| 8081 | Gibbon Admin | HTTP |
| 8082 | Moodle LMS | HTTP |
| 8083 | Expo Dev Server | HTTP |
| 9000 | MinIO API | HTTP |
| 9001 | MinIO Console | HTTP |

### Appendix B: Keyboard Shortcuts Reference
| Action | Shortcut (Linux) |
|--------|------------------|
| Open terminal | `Ctrl + `` |
| Open file | `Ctrl + P` |
| Search in files | `Ctrl + Shift + F` |
| Go to definition | `F12` |
| Rename symbol | `F2` |
| Format document | `Shift + Alt + F` |
| Toggle sidebar | `Ctrl + B` |
| Command palette | `Ctrl + Shift + P` |

### Appendix C: Useful Commands
```bash
# Development
pnpm dev                    # Start all services
pnpm build                  # Build all packages
pnpm test                   # Run all tests
pnpm lint                   # Lint all code
pnpm type-check            # TypeScript check

# Docker
docker compose up -d        # Start services
docker compose down         # Stop services
docker compose logs -f      # View logs
docker compose ps           # List services

# Database
pnpm prisma:studio         # Open Prisma Studio
pnpm prisma:migrate:dev    # Run migrations
pnpm prisma:seed           # Seed database

# Git
git st                     # Status (alias)
git lg                     # Log graph (alias)
```

---

## Document History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-10 | Smart Academy Team | Initial document |
