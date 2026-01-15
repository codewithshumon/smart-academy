# Infrastructure as Code

## Smart Academy Digital Portal

### Version 1.0 | January 2026

---

## Document Control

| Field | Details |
|-------|---------|
| **Document Title** | Infrastructure as Code |
| **Version** | 1.0 |
| **Status** | Draft |
| **Created Date** | January 2026 |
| **Last Updated** | January 2026 |
| **Author** | Development Team |
| **Classification** | Internal |

---

## Table of Contents

1. [Overview](#1-overview)
2. [Server Provisioning Scripts](#2-server-provisioning-scripts)
3. [Docker Compose Production Configuration](#3-docker-compose-production-configuration)
4. [Nginx Configuration](#4-nginx-configuration)
5. [Database Configuration](#5-database-configuration)
6. [Caching Configuration](#6-caching-configuration)
7. [Monitoring Configuration](#7-monitoring-configuration)
8. [Backup Configuration](#8-backup-configuration)

---

## 1. Overview

### 1.1 Infrastructure Philosophy

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    INFRASTRUCTURE AS CODE PRINCIPLES                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐               │
│  │   Version     │  │  Immutable    │  │  Automated    │               │
│  │   Controlled  │  │  Infrastructure│  │  Provisioning │               │
│  └───────────────┘  └───────────────┘  └───────────────┘               │
│         │                  │                  │                         │
│         ▼                  ▼                  ▼                         │
│  All configs in    Infrastructure     Scripts handle                    │
│  Git repository    replaced, not       all setup tasks                  │
│                    modified                                             │
│                                                                         │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐               │
│  │  Reproducible │  │   Documented  │  │   Tested      │               │
│  │  Environments │  │   Changes     │  │   Configs     │               │
│  └───────────────┘  └───────────────┘  └───────────────┘               │
│         │                  │                  │                         │
│         ▼                  ▼                  ▼                         │
│  Same configs     Every change        Validate before                   │
│  produce same     traceable in        applying to                       │
│  environments     commit history      production                        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Infrastructure Components

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      INFRASTRUCTURE STACK                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Layer 1: Compute                                                       │
│  ┌──────────────────────────────────────────────────────────────┐      │
│  │  Ubuntu 24.04 LTS Server                                     │      │
│  │  Docker Engine 26+ | Docker Compose v2                       │      │
│  └──────────────────────────────────────────────────────────────┘      │
│                                                                         │
│  Layer 2: Container Orchestration                                       │
│  ┌──────────────────────────────────────────────────────────────┐      │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │      │
│  │  │   API   │ │   Web   │ │  Admin  │ │  Workers│           │      │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │      │
│  └──────────────────────────────────────────────────────────────┘      │
│                                                                         │
│  Layer 3: Data Services                                                 │
│  ┌──────────────────────────────────────────────────────────────┐      │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐    │      │
│  │  │ PostgreSQL│ │   MySQL   │ │   Redis   │ │   MinIO   │    │      │
│  │  │    17     │ │    8.0    │ │     7     │ │           │    │      │
│  │  └───────────┘ └───────────┘ └───────────┘ └───────────┘    │      │
│  └──────────────────────────────────────────────────────────────┘      │
│                                                                         │
│  Layer 4: Reverse Proxy & Load Balancing                               │
│  ┌──────────────────────────────────────────────────────────────┐      │
│  │  Nginx (Load Balancer, SSL Termination, Static Files)        │      │
│  └──────────────────────────────────────────────────────────────┘      │
│                                                                         │
│  Layer 5: Monitoring & Observability                                    │
│  ┌──────────────────────────────────────────────────────────────┐      │
│  │  Prometheus │ Grafana │ Loki │ Node Exporter │ cAdvisor      │      │
│  └──────────────────────────────────────────────────────────────┘      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Directory Structure

```
infrastructure/
├── scripts/
│   ├── provision/
│   │   ├── provision-server.sh
│   │   ├── install-docker.sh
│   │   ├── setup-firewall.sh
│   │   └── configure-swap.sh
│   ├── deploy/
│   │   ├── deploy.sh
│   │   └── rollback.sh
│   └── backup/
│       ├── backup-database.sh
│       ├── backup-files.sh
│       └── backup-verify.sh
├── docker/
│   ├── docker-compose.yml
│   ├── docker-compose.prod.yml
│   ├── docker-compose.blue.yml
│   ├── docker-compose.green.yml
│   ├── docker-compose.monitoring.yml
│   └── .env.example
├── nginx/
│   ├── nginx.conf
│   ├── conf.d/
│   │   ├── default.conf
│   │   ├── upstream.conf
│   │   ├── ssl.conf
│   │   └── security.conf
│   └── sites-available/
│       ├── smartacademy.conf
│       └── api.smartacademy.conf
├── database/
│   ├── postgresql/
│   │   ├── postgresql.conf
│   │   ├── pg_hba.conf
│   │   └── init-scripts/
│   └── mysql/
│       ├── my.cnf
│       └── init-scripts/
├── redis/
│   └── redis.conf
├── monitoring/
│   ├── prometheus/
│   │   ├── prometheus.yml
│   │   └── alert-rules.yml
│   ├── grafana/
│   │   ├── grafana.ini
│   │   ├── provisioning/
│   │   └── dashboards/
│   └── loki/
│       └── loki-config.yml
└── ssl/
    ├── cloudflare-origin.pem
    └── cloudflare-origin-key.pem
```

---

## 2. Server Provisioning Scripts

### 2.1 Main Provisioning Script

```bash
#!/bin/bash
# provision-server.sh - Complete server provisioning

set -e

# Configuration
SERVER_USER="deploy"
APP_DIR="/app/smart-academy"
DATA_DIR="/data"
BACKUP_DIR="/backups"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║       Smart Academy - Server Provisioning                     ║"
echo "╚══════════════════════════════════════════════════════════════╝"

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "Please run as root"
    exit 1
fi

# Update system
echo ""
echo "=== Updating System ==="
apt-get update
apt-get upgrade -y

# Install essential packages
echo ""
echo "=== Installing Essential Packages ==="
apt-get install -y \
    curl \
    wget \
    git \
    vim \
    htop \
    iotop \
    ncdu \
    net-tools \
    dnsutils \
    unzip \
    jq \
    tree \
    fail2ban \
    ufw \
    logrotate \
    cron

# Set timezone
echo ""
echo "=== Setting Timezone ==="
timedatectl set-timezone Asia/Dhaka
echo "Timezone set to: $(timedatectl | grep 'Time zone')"

# Create deploy user
echo ""
echo "=== Creating Deploy User ==="
if ! id "$SERVER_USER" &>/dev/null; then
    useradd -m -s /bin/bash "$SERVER_USER"
    usermod -aG sudo "$SERVER_USER"
    echo "$SERVER_USER ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/$SERVER_USER
    echo "Created user: $SERVER_USER"
else
    echo "User $SERVER_USER already exists"
fi

# Create application directories
echo ""
echo "=== Creating Application Directories ==="
mkdir -p "$APP_DIR"
mkdir -p "$DATA_DIR"/{postgres,mysql,redis,minio,uploads}
mkdir -p "$BACKUP_DIR"/{database/{postgres,mysql},files,configs}
mkdir -p /var/log/smart-academy

chown -R $SERVER_USER:$SERVER_USER "$APP_DIR"
chown -R $SERVER_USER:$SERVER_USER "$DATA_DIR"
chown -R $SERVER_USER:$SERVER_USER "$BACKUP_DIR"
chown -R $SERVER_USER:$SERVER_USER /var/log/smart-academy

echo "Directories created:"
echo "  - $APP_DIR"
echo "  - $DATA_DIR"
echo "  - $BACKUP_DIR"

# Configure swap
echo ""
echo "=== Configuring Swap ==="
./configure-swap.sh

# Install Docker
echo ""
echo "=== Installing Docker ==="
./install-docker.sh

# Configure firewall
echo ""
echo "=== Configuring Firewall ==="
./setup-firewall.sh

# Configure fail2ban
echo ""
echo "=== Configuring Fail2Ban ==="
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 1h
findtime = 10m
maxretry = 5

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 24h

[nginx-http-auth]
enabled = true
port = http,https
filter = nginx-http-auth
logpath = /var/log/nginx/error.log
maxretry = 5

[nginx-limit-req]
enabled = true
port = http,https
filter = nginx-limit-req
logpath = /var/log/nginx/error.log
maxretry = 10
bantime = 1h
EOF

systemctl enable fail2ban
systemctl restart fail2ban

# Configure log rotation
echo ""
echo "=== Configuring Log Rotation ==="
cat > /etc/logrotate.d/smart-academy << 'EOF'
/var/log/smart-academy/*.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    create 0640 deploy deploy
    sharedscripts
    postrotate
        docker compose -f /app/smart-academy/docker-compose.prod.yml kill -s USR1 api web admin || true
    endscript
}

/var/log/nginx/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 0640 www-data adm
    sharedscripts
    postrotate
        [ -f /var/run/nginx.pid ] && kill -USR1 $(cat /var/run/nginx.pid)
    endscript
}
EOF

# Set system limits
echo ""
echo "=== Configuring System Limits ==="
cat >> /etc/security/limits.conf << 'EOF'
* soft nofile 65535
* hard nofile 65535
* soft nproc 65535
* hard nproc 65535
deploy soft nofile 65535
deploy hard nofile 65535
EOF

# Kernel optimizations
echo ""
echo "=== Applying Kernel Optimizations ==="
cat > /etc/sysctl.d/99-smart-academy.conf << 'EOF'
# Network optimizations
net.core.somaxconn = 65535
net.core.netdev_max_backlog = 65535
net.ipv4.tcp_max_syn_backlog = 65535
net.ipv4.tcp_fin_timeout = 15
net.ipv4.tcp_keepalive_time = 300
net.ipv4.tcp_keepalive_probes = 5
net.ipv4.tcp_keepalive_intvl = 15
net.ipv4.tcp_tw_reuse = 1
net.ipv4.ip_local_port_range = 1024 65535

# Memory optimizations
vm.swappiness = 10
vm.dirty_ratio = 60
vm.dirty_background_ratio = 2
vm.overcommit_memory = 1

# File system
fs.file-max = 2097152
fs.inotify.max_user_watches = 524288
EOF

sysctl -p /etc/sysctl.d/99-smart-academy.conf

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║       Server Provisioning Complete!                           ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "Next steps:"
echo "  1. Copy application code to $APP_DIR"
echo "  2. Configure environment variables"
echo "  3. Run docker compose up -d"
```

### 2.2 Docker Installation Script

```bash
#!/bin/bash
# install-docker.sh - Install Docker Engine and Docker Compose

set -e

echo "=== Installing Docker Engine ==="

# Remove old versions
apt-get remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true

# Install prerequisites
apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker's official GPG key
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

# Set up repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Add deploy user to docker group
usermod -aG docker deploy

# Configure Docker daemon
mkdir -p /etc/docker
cat > /etc/docker/daemon.json << 'EOF'
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m",
    "max-file": "5"
  },
  "storage-driver": "overlay2",
  "live-restore": true,
  "default-ulimits": {
    "nofile": {
      "Name": "nofile",
      "Hard": 65535,
      "Soft": 65535
    }
  },
  "metrics-addr": "127.0.0.1:9323",
  "experimental": false
}
EOF

# Enable and start Docker
systemctl enable docker
systemctl restart docker

# Verify installation
echo ""
echo "Docker version:"
docker --version
echo ""
echo "Docker Compose version:"
docker compose version

echo ""
echo "Docker installed successfully!"
```

### 2.3 Firewall Configuration Script

```bash
#!/bin/bash
# setup-firewall.sh - Configure UFW firewall

set -e

echo "=== Configuring UFW Firewall ==="

# Reset UFW to default
ufw --force reset

# Default policies
ufw default deny incoming
ufw default allow outgoing

# SSH (rate limited)
ufw limit 22/tcp comment 'SSH rate limited'

# HTTP/HTTPS
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'

# Application ports (internal only - handled by Docker)
# These are exposed via Docker and Nginx, not directly

# Monitoring (internal only)
# ufw allow from 10.0.0.0/8 to any port 9090 comment 'Prometheus'
# ufw allow from 10.0.0.0/8 to any port 3000 comment 'Grafana'

# Enable firewall
ufw --force enable

# Show status
echo ""
ufw status verbose

echo ""
echo "Firewall configured successfully!"
```

### 2.4 Swap Configuration Script

```bash
#!/bin/bash
# configure-swap.sh - Configure swap space

set -e

SWAP_SIZE="4G"
SWAP_FILE="/swapfile"

echo "=== Configuring Swap Space ==="

# Check if swap already exists
if swapon --show | grep -q "$SWAP_FILE"; then
    echo "Swap already configured"
    swapon --show
    exit 0
fi

# Create swap file
echo "Creating $SWAP_SIZE swap file..."
fallocate -l $SWAP_SIZE $SWAP_FILE
chmod 600 $SWAP_FILE
mkswap $SWAP_FILE
swapon $SWAP_FILE

# Make permanent
if ! grep -q "$SWAP_FILE" /etc/fstab; then
    echo "$SWAP_FILE none swap sw 0 0" >> /etc/fstab
fi

# Configure swappiness
echo "vm.swappiness=10" > /etc/sysctl.d/99-swap.conf
sysctl -p /etc/sysctl.d/99-swap.conf

echo ""
echo "Swap configured:"
swapon --show
free -h

echo ""
echo "Swap configuration complete!"
```

---

## 3. Docker Compose Production Configuration

### 3.1 Base Production Configuration

```yaml
# docker-compose.prod.yml
version: '3.9'

x-common-env: &common-env
  NODE_ENV: production
  TZ: Asia/Dhaka

x-healthcheck-defaults: &healthcheck-defaults
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s

x-logging: &logging
  driver: "json-file"
  options:
    max-size: "50m"
    max-file: "5"

x-restart-policy: &restart-policy
  restart: unless-stopped

services:
  # ===================
  # Application Services
  # ===================

  api:
    image: ghcr.io/smart-academy/api:${VERSION:-latest}
    container_name: smart-academy-api
    <<: *restart-policy
    environment:
      <<: *common-env
      PORT: 4000
      DATABASE_URL: ${DATABASE_URL}
      REDIS_URL: redis://redis:6379
      JWT_SECRET: ${JWT_SECRET}
      SSLCOMMERZ_STORE_ID: ${SSLCOMMERZ_STORE_ID}
      SSLCOMMERZ_STORE_PASSWORD: ${SSLCOMMERZ_STORE_PASSWORD}
      BKASH_APP_KEY: ${BKASH_APP_KEY}
      BKASH_APP_SECRET: ${BKASH_APP_SECRET}
      NAGAD_MERCHANT_ID: ${NAGAD_MERCHANT_ID}
      SENDGRID_API_KEY: ${SENDGRID_API_KEY}
      BULKSMSBD_API_KEY: ${BULKSMSBD_API_KEY}
      MINIO_ENDPOINT: minio
      MINIO_PORT: 9000
      MINIO_ACCESS_KEY: ${MINIO_ACCESS_KEY}
      MINIO_SECRET_KEY: ${MINIO_SECRET_KEY}
    volumes:
      - api_logs:/app/logs
    networks:
      - internal
      - database
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:4000/health"]
      <<: *healthcheck-defaults
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '0.5'
          memory: 512M
    logging: *logging

  web:
    image: ghcr.io/smart-academy/web:${VERSION:-latest}
    container_name: smart-academy-web
    <<: *restart-policy
    environment:
      <<: *common-env
      NEXT_PUBLIC_API_URL: https://api.smartacademy.edu.bd
      NEXT_PUBLIC_CDN_URL: https://cdn.smartacademy.edu.bd
    networks:
      - internal
    depends_on:
      api:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3000/api/health"]
      <<: *healthcheck-defaults
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.25'
          memory: 256M
    logging: *logging

  admin:
    image: ghcr.io/smart-academy/admin:${VERSION:-latest}
    container_name: smart-academy-admin
    <<: *restart-policy
    environment:
      <<: *common-env
      NEXT_PUBLIC_API_URL: https://api.smartacademy.edu.bd
    networks:
      - internal
    depends_on:
      api:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3001/api/health"]
      <<: *healthcheck-defaults
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.25'
          memory: 256M
    logging: *logging

  # ===================
  # Database Services
  # ===================

  postgres:
    image: postgres:17-alpine
    container_name: smart-academy-postgres
    <<: *restart-policy
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-smart_academy}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB:-smart_academy}
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - /data/postgres:/var/lib/postgresql/data
      - ./database/postgresql/postgresql.conf:/etc/postgresql/postgresql.conf:ro
      - ./database/postgresql/init-scripts:/docker-entrypoint-initdb.d:ro
    command: postgres -c config_file=/etc/postgresql/postgresql.conf
    networks:
      - database
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-smart_academy}"]
      <<: *healthcheck-defaults
    deploy:
      resources:
        limits:
          cpus: '4'
          memory: 8G
        reservations:
          cpus: '1'
          memory: 2G
    logging: *logging

  mysql:
    image: mysql:8.0
    container_name: smart-academy-mysql
    <<: *restart-policy
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: gibbon
      MYSQL_USER: gibbon
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    volumes:
      - /data/mysql:/var/lib/mysql
      - ./database/mysql/my.cnf:/etc/mysql/conf.d/my.cnf:ro
      - ./database/mysql/init-scripts:/docker-entrypoint-initdb.d:ro
    networks:
      - database
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      <<: *healthcheck-defaults
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 4G
        reservations:
          cpus: '0.5'
          memory: 1G
    logging: *logging

  redis:
    image: redis:7-alpine
    container_name: smart-academy-redis
    <<: *restart-policy
    command: redis-server /etc/redis/redis.conf
    volumes:
      - /data/redis:/data
      - ./redis/redis.conf:/etc/redis/redis.conf:ro
    networks:
      - database
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      <<: *healthcheck-defaults
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 2G
        reservations:
          cpus: '0.25'
          memory: 256M
    logging: *logging

  # ===================
  # Storage Services
  # ===================

  minio:
    image: minio/minio:latest
    container_name: smart-academy-minio
    <<: *restart-policy
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: ${MINIO_ACCESS_KEY}
      MINIO_ROOT_PASSWORD: ${MINIO_SECRET_KEY}
    volumes:
      - /data/minio:/data
    networks:
      - internal
      - database
    healthcheck:
      test: ["CMD", "mc", "ready", "local"]
      <<: *healthcheck-defaults
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.25'
          memory: 256M
    logging: *logging

  # ===================
  # External Integrations
  # ===================

  gibbon:
    image: gibbonedu/core:latest
    container_name: smart-academy-gibbon
    <<: *restart-policy
    environment:
      GIBBON_DATABASE_SERVER: mysql
      GIBBON_DATABASE_NAME: gibbon
      GIBBON_DATABASE_USERNAME: gibbon
      GIBBON_DATABASE_PASSWORD: ${MYSQL_PASSWORD}
    volumes:
      - /data/gibbon:/var/www/html/uploads
    networks:
      - internal
      - database
    depends_on:
      mysql:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      <<: *healthcheck-defaults
    logging: *logging

networks:
  internal:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
  database:
    driver: bridge
    internal: true
    ipam:
      config:
        - subnet: 172.21.0.0/16

volumes:
  api_logs:
```

### 3.2 Blue Stack Configuration

```yaml
# docker-compose.blue.yml
version: '3.9'

services:
  api:
    container_name: smart-academy-api-blue
    ports:
      - "4000:4000"
    environment:
      STACK_COLOR: blue

  web:
    container_name: smart-academy-web-blue
    ports:
      - "3000:3000"
    environment:
      STACK_COLOR: blue

  admin:
    container_name: smart-academy-admin-blue
    ports:
      - "3001:3001"
    environment:
      STACK_COLOR: blue
```

### 3.3 Green Stack Configuration

```yaml
# docker-compose.green.yml
version: '3.9'

services:
  api:
    container_name: smart-academy-api-green
    ports:
      - "4001:4000"
    environment:
      STACK_COLOR: green

  web:
    container_name: smart-academy-web-green
    ports:
      - "3002:3000"
    environment:
      STACK_COLOR: green

  admin:
    container_name: smart-academy-admin-green
    ports:
      - "3003:3001"
    environment:
      STACK_COLOR: green
```

### 3.4 Monitoring Stack Configuration

```yaml
# docker-compose.monitoring.yml
version: '3.9'

services:
  prometheus:
    image: prom/prometheus:v2.48.0
    container_name: smart-academy-prometheus
    restart: unless-stopped
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--storage.tsdb.retention.time=30d'
      - '--web.enable-lifecycle'
      - '--web.enable-admin-api'
    volumes:
      - ./monitoring/prometheus:/etc/prometheus:ro
      - prometheus_data:/prometheus
    ports:
      - "9090:9090"
    networks:
      - monitoring
      - internal

  grafana:
    image: grafana/grafana:10.2.0
    container_name: smart-academy-grafana
    restart: unless-stopped
    environment:
      GF_SECURITY_ADMIN_USER: ${GRAFANA_ADMIN_USER:-admin}
      GF_SECURITY_ADMIN_PASSWORD: ${GRAFANA_ADMIN_PASSWORD}
      GF_USERS_ALLOW_SIGN_UP: false
      GF_SERVER_ROOT_URL: https://grafana.smartacademy.edu.bd
    volumes:
      - ./monitoring/grafana/grafana.ini:/etc/grafana/grafana.ini:ro
      - ./monitoring/grafana/provisioning:/etc/grafana/provisioning:ro
      - ./monitoring/grafana/dashboards:/var/lib/grafana/dashboards:ro
      - grafana_data:/var/lib/grafana
    ports:
      - "3100:3000"
    networks:
      - monitoring
    depends_on:
      - prometheus

  loki:
    image: grafana/loki:2.9.0
    container_name: smart-academy-loki
    restart: unless-stopped
    command: -config.file=/etc/loki/loki-config.yml
    volumes:
      - ./monitoring/loki:/etc/loki:ro
      - loki_data:/loki
    ports:
      - "3200:3100"
    networks:
      - monitoring

  promtail:
    image: grafana/promtail:2.9.0
    container_name: smart-academy-promtail
    restart: unless-stopped
    command: -config.file=/etc/promtail/promtail-config.yml
    volumes:
      - ./monitoring/promtail:/etc/promtail:ro
      - /var/log:/var/log:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
    networks:
      - monitoring
    depends_on:
      - loki

  node-exporter:
    image: prom/node-exporter:v1.7.0
    container_name: smart-academy-node-exporter
    restart: unless-stopped
    command:
      - '--path.procfs=/host/proc'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    networks:
      - monitoring

  cadvisor:
    image: gcr.io/cadvisor/cadvisor:v0.47.2
    container_name: smart-academy-cadvisor
    restart: unless-stopped
    privileged: true
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker:/var/lib/docker:ro
      - /dev/disk:/dev/disk:ro
    networks:
      - monitoring

  alertmanager:
    image: prom/alertmanager:v0.26.0
    container_name: smart-academy-alertmanager
    restart: unless-stopped
    command:
      - '--config.file=/etc/alertmanager/alertmanager.yml'
      - '--storage.path=/alertmanager'
    volumes:
      - ./monitoring/alertmanager:/etc/alertmanager:ro
      - alertmanager_data:/alertmanager
    ports:
      - "9093:9093"
    networks:
      - monitoring

networks:
  monitoring:
    driver: bridge
  internal:
    external: true
    name: smart-academy_internal

volumes:
  prometheus_data:
  grafana_data:
  loki_data:
  alertmanager_data:
```

---

## 4. Nginx Configuration

### 4.1 Main Nginx Configuration

```nginx
# nginx.conf

user www-data;
worker_processes auto;
pid /run/nginx.pid;
error_log /var/log/nginx/error.log warn;

# Load dynamic modules
include /etc/nginx/modules-enabled/*.conf;

events {
    worker_connections 4096;
    multi_accept on;
    use epoll;
}

http {
    # Basic Settings
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    server_tokens off;

    # Buffer sizes
    client_body_buffer_size 16k;
    client_header_buffer_size 1k;
    client_max_body_size 50M;
    large_client_header_buffers 4 8k;

    # Timeouts
    client_body_timeout 60;
    client_header_timeout 60;
    send_timeout 60;

    # MIME Types
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for" '
                    'rt=$request_time uct="$upstream_connect_time" '
                    'uht="$upstream_header_time" urt="$upstream_response_time"';

    log_format json escape=json '{'
        '"time":"$time_iso8601",'
        '"remote_addr":"$remote_addr",'
        '"method":"$request_method",'
        '"uri":"$request_uri",'
        '"status":$status,'
        '"body_bytes":$body_bytes_sent,'
        '"request_time":$request_time,'
        '"upstream_time":"$upstream_response_time",'
        '"user_agent":"$http_user_agent",'
        '"referer":"$http_referer"'
    '}';

    access_log /var/log/nginx/access.log json;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_min_length 256;
    gzip_types
        application/atom+xml
        application/javascript
        application/json
        application/ld+json
        application/manifest+json
        application/rss+xml
        application/vnd.geo+json
        application/vnd.ms-fontobject
        application/x-font-ttf
        application/x-web-app-manifest+json
        application/xhtml+xml
        application/xml
        font/opentype
        image/bmp
        image/svg+xml
        image/x-icon
        text/cache-manifest
        text/css
        text/plain
        text/vcard
        text/vnd.rim.location.xloc
        text/vtt
        text/x-component
        text/x-cross-domain-policy
        text/xml;

    # Rate Limiting Zones
    limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=api:10m rate=30r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;
    limit_conn_zone $binary_remote_addr zone=conn_limit:10m;

    # SSL Session Cache
    ssl_session_cache shared:SSL:50m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;

    # Include additional configurations
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

### 4.2 Upstream Configuration

```nginx
# conf.d/upstream.conf

# Active Stack: blue (updated by deployment scripts)

upstream api_backend {
    least_conn;
    server 127.0.0.1:4000 weight=100 max_fails=3 fail_timeout=30s;
    server 127.0.0.1:4001 backup;

    keepalive 32;
}

upstream web_backend {
    least_conn;
    server 127.0.0.1:3000 weight=100 max_fails=3 fail_timeout=30s;
    server 127.0.0.1:3002 backup;

    keepalive 32;
}

upstream admin_backend {
    least_conn;
    server 127.0.0.1:3001 weight=100 max_fails=3 fail_timeout=30s;
    server 127.0.0.1:3003 backup;

    keepalive 32;
}

upstream gibbon_backend {
    server 127.0.0.1:8080;
    keepalive 16;
}

upstream grafana_backend {
    server 127.0.0.1:3100;
    keepalive 8;
}
```

### 4.3 SSL Configuration

```nginx
# conf.d/ssl.conf

# Modern TLS configuration
ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers off;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;

# OCSP Stapling
ssl_stapling on;
ssl_stapling_verify on;
resolver 1.1.1.1 8.8.8.8 valid=300s;
resolver_timeout 5s;

# Cloudflare Origin Certificate
ssl_certificate /etc/nginx/ssl/cloudflare-origin.pem;
ssl_certificate_key /etc/nginx/ssl/cloudflare-origin-key.pem;

# Trusted CA for Cloudflare
ssl_client_certificate /etc/nginx/ssl/cloudflare-origin-ca.pem;
```

### 4.4 Security Headers Configuration

```nginx
# conf.d/security.conf

# Security Headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

# CSP Header (adjust as needed)
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://api.smartacademy.edu.bd wss:; frame-ancestors 'self';" always;

# HSTS (if not using Cloudflare HSTS)
# add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

# Hide server version
server_tokens off;

# Prevent clickjacking
map $http_x_frame_options $frame_options {
    default "SAMEORIGIN";
}
```

### 4.5 Main Site Configuration

```nginx
# sites-available/smartacademy.conf

# HTTP to HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name smartacademy.edu.bd www.smartacademy.edu.bd;

    # Allow Cloudflare health checks
    location /health {
        access_log off;
        return 200 "OK";
    }

    # Redirect all HTTP to HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

# Main Website
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name smartacademy.edu.bd www.smartacademy.edu.bd;

    # SSL Configuration
    include /etc/nginx/conf.d/ssl.conf;

    # Security Headers
    include /etc/nginx/conf.d/security.conf;

    # Root and index
    root /var/www/html;
    index index.html;

    # Rate limiting
    limit_req zone=general burst=20 nodelay;
    limit_conn conn_limit 20;

    # Logging
    access_log /var/log/nginx/smartacademy.access.log json;
    error_log /var/log/nginx/smartacademy.error.log warn;

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "OK";
    }

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2|ttf|svg|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Next.js static files
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        proxy_pass http://web_backend;
    }

    # Next.js image optimization
    location /_next/image {
        proxy_pass http://web_backend;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_valid 200 30d;
    }

    # API proxy
    location /api/ {
        limit_req zone=api burst=50 nodelay;

        proxy_pass http://api_backend/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
    }

    # Login endpoint (stricter rate limiting)
    location /api/auth/login {
        limit_req zone=login burst=5 nodelay;

        proxy_pass http://api_backend/auth/login;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WebSocket support
    location /ws {
        proxy_pass http://api_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
    }

    # Main application
    location / {
        proxy_pass http://web_backend;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Error pages
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /var/www/html;
        internal;
    }
}
```

### 4.6 API Subdomain Configuration

```nginx
# sites-available/api.smartacademy.conf

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name api.smartacademy.edu.bd;

    # SSL Configuration
    include /etc/nginx/conf.d/ssl.conf;

    # Security Headers
    include /etc/nginx/conf.d/security.conf;

    # CORS Headers for API
    add_header 'Access-Control-Allow-Origin' 'https://smartacademy.edu.bd' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type, X-Requested-With' always;
    add_header 'Access-Control-Max-Age' '86400' always;

    # Rate limiting
    limit_req zone=api burst=100 nodelay;
    limit_conn conn_limit 50;

    # Logging
    access_log /var/log/nginx/api.access.log json;
    error_log /var/log/nginx/api.error.log warn;

    # Handle preflight requests
    location / {
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' 'https://smartacademy.edu.bd';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type, X-Requested-With';
            add_header 'Access-Control-Max-Age' '86400';
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            add_header 'Content-Length' '0';
            return 204;
        }

        proxy_pass http://api_backend;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        proxy_buffering on;
        proxy_buffer_size 8k;
        proxy_buffers 16 8k;
    }

    # Health check
    location /health {
        access_log off;
        proxy_pass http://api_backend/health;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
    }

    # Payment webhooks (increased limits)
    location ~ ^/(sslcommerz|bkash|nagad)/webhook {
        client_max_body_size 10M;

        proxy_pass http://api_backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_connect_timeout 120s;
        proxy_send_timeout 120s;
        proxy_read_timeout 120s;
    }

    # File uploads
    location /upload {
        client_max_body_size 100M;

        proxy_pass http://api_backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_request_buffering off;

        proxy_connect_timeout 300s;
        proxy_send_timeout 300s;
        proxy_read_timeout 300s;
    }
}
```

---

## 5. Database Configuration

### 5.1 PostgreSQL Configuration

```ini
# database/postgresql/postgresql.conf

# Connection Settings
listen_addresses = '*'
port = 5432
max_connections = 200
superuser_reserved_connections = 3

# Memory Settings
shared_buffers = 4GB                    # 25% of RAM
effective_cache_size = 12GB             # 75% of RAM
maintenance_work_mem = 1GB
work_mem = 20MB
wal_buffers = 64MB

# Query Planner
random_page_cost = 1.1                  # For SSD
effective_io_concurrency = 200          # For SSD
default_statistics_target = 100

# WAL Settings
wal_level = replica
max_wal_size = 4GB
min_wal_size = 1GB
checkpoint_completion_target = 0.9
checkpoint_timeout = 15min
archive_mode = on
archive_command = 'cp %p /backups/database/postgres/wal/%f'

# Replication (if needed in future)
max_wal_senders = 3
wal_keep_size = 1GB

# Logging
log_destination = 'stderr'
logging_collector = on
log_directory = 'log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_rotation_age = 1d
log_rotation_size = 100MB
log_min_duration_statement = 500        # Log queries > 500ms
log_checkpoints = on
log_connections = on
log_disconnections = on
log_lock_waits = on
log_temp_files = 0

# Performance
huge_pages = try
temp_buffers = 32MB
max_prepared_transactions = 0

# Autovacuum
autovacuum = on
autovacuum_max_workers = 4
autovacuum_naptime = 1min
autovacuum_vacuum_threshold = 50
autovacuum_analyze_threshold = 50
autovacuum_vacuum_scale_factor = 0.05
autovacuum_analyze_scale_factor = 0.02
autovacuum_vacuum_cost_delay = 2ms
autovacuum_vacuum_cost_limit = 1000

# Security
ssl = off                               # Handled by nginx/cloudflare
password_encryption = scram-sha-256

# Locale
lc_messages = 'en_US.UTF-8'
lc_monetary = 'en_US.UTF-8'
lc_numeric = 'en_US.UTF-8'
lc_time = 'en_US.UTF-8'
default_text_search_config = 'pg_catalog.english'

# Timezone
timezone = 'Asia/Dhaka'
```

### 5.2 PostgreSQL HBA Configuration

```
# database/postgresql/pg_hba.conf

# TYPE  DATABASE        USER            ADDRESS                 METHOD

# Local connections
local   all             all                                     trust

# Docker network connections
host    all             all             172.20.0.0/16           scram-sha-256
host    all             all             172.21.0.0/16           scram-sha-256

# Localhost (for backups, monitoring)
host    all             all             127.0.0.1/32            scram-sha-256
host    all             all             ::1/128                 scram-sha-256

# Replication (for future use)
host    replication     replicator      172.21.0.0/16           scram-sha-256
```

### 5.3 PostgreSQL Initialization Scripts

```sql
-- database/postgresql/init-scripts/01-init.sql

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create replication user (for future use)
-- CREATE USER replicator WITH REPLICATION ENCRYPTED PASSWORD 'secure_password';

-- Create read-only user for analytics
CREATE USER analytics WITH PASSWORD 'secure_analytics_password';
GRANT CONNECT ON DATABASE smart_academy TO analytics;
GRANT USAGE ON SCHEMA public TO analytics;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO analytics;

-- Performance indexes on common queries
-- (These will be created by Prisma migrations, examples for reference)
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_email ON users(email);
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_enrollments_student ON enrollments(student_id);
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_payments_status ON payments(status, created_at);
```

### 5.4 MySQL Configuration

```ini
# database/mysql/my.cnf

[mysqld]
# Basic Settings
user = mysql
datadir = /var/lib/mysql
socket = /var/run/mysqld/mysqld.sock
port = 3306
bind-address = 0.0.0.0

# Character Set
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

# Connection Settings
max_connections = 200
max_allowed_packet = 256M
wait_timeout = 600
interactive_timeout = 600
connect_timeout = 10

# InnoDB Settings
innodb_buffer_pool_size = 2G           # 50% of available RAM
innodb_buffer_pool_instances = 4
innodb_log_file_size = 512M
innodb_log_buffer_size = 64M
innodb_flush_log_at_trx_commit = 1
innodb_flush_method = O_DIRECT
innodb_file_per_table = 1
innodb_io_capacity = 2000
innodb_io_capacity_max = 4000
innodb_read_io_threads = 8
innodb_write_io_threads = 8

# Query Cache (disabled in MySQL 8.0+)
# query_cache_type = 0

# Temporary Tables
tmp_table_size = 256M
max_heap_table_size = 256M

# Binary Logging (for replication/point-in-time recovery)
server-id = 1
log_bin = mysql-bin
binlog_format = ROW
expire_logs_days = 7
max_binlog_size = 500M
sync_binlog = 1

# Slow Query Log
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2
log_queries_not_using_indexes = 1

# Error Log
log_error = /var/log/mysql/error.log

# Performance Schema
performance_schema = ON

# Security
local_infile = 0
symbolic-links = 0
skip_name_resolve = 1

[client]
socket = /var/run/mysqld/mysqld.sock
default-character-set = utf8mb4
```

---

## 6. Caching Configuration

### 6.1 Redis Configuration

```conf
# redis/redis.conf

# Network
bind 0.0.0.0
port 6379
protected-mode yes
tcp-backlog 511
timeout 0
tcp-keepalive 300

# General
daemonize no
supervised no
pidfile /var/run/redis/redis.pid
loglevel notice
logfile ""
databases 16
always-show-logo no

# Persistence - RDB
save 900 1
save 300 10
save 60 10000
stop-writes-on-bgsave-error yes
rdbcompression yes
rdbchecksum yes
dbfilename dump.rdb
dir /data

# Persistence - AOF
appendonly yes
appendfilename "appendonly.aof"
appendfsync everysec
no-appendfsync-on-rewrite no
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
aof-load-truncated yes
aof-use-rdb-preamble yes

# Memory Management
maxmemory 2gb
maxmemory-policy allkeys-lru
maxmemory-samples 5

# Lazy Freeing
lazyfree-lazy-eviction yes
lazyfree-lazy-expire yes
lazyfree-lazy-server-del yes
replica-lazy-flush yes

# Security
# requirepass your_redis_password
# Uncomment and set password in production

# Clients
maxclients 10000

# Slow Log
slowlog-log-slower-than 10000
slowlog-max-len 128

# Latency Monitor
latency-monitor-threshold 100

# Event Notification
notify-keyspace-events ""

# Advanced Config
hash-max-ziplist-entries 512
hash-max-ziplist-value 64
list-max-ziplist-size -2
list-compress-depth 0
set-max-intset-entries 512
zset-max-ziplist-entries 128
zset-max-ziplist-value 64
hll-sparse-max-bytes 3000
stream-node-max-bytes 4096
stream-node-max-entries 100
activerehashing yes
client-output-buffer-limit normal 0 0 0
client-output-buffer-limit replica 256mb 64mb 60
client-output-buffer-limit pubsub 32mb 8mb 60
hz 10
dynamic-hz yes
aof-rewrite-incremental-fsync yes
rdb-save-incremental-fsync yes

# Modules
# loadmodule /path/to/module.so
```

### 6.2 Application Cache Strategy

```typescript
// cache-config.ts - Application-level cache configuration

export const cacheConfig = {
  // Default TTL settings (in seconds)
  ttl: {
    short: 60,           // 1 minute - frequently changing data
    medium: 300,         // 5 minutes - moderately stable data
    long: 3600,          // 1 hour - stable data
    veryLong: 86400,     // 24 hours - rarely changing data
  },

  // Cache key prefixes
  prefixes: {
    user: 'user:',
    session: 'session:',
    course: 'course:',
    catalog: 'catalog:',
    enrollment: 'enrollment:',
    payment: 'payment:',
    config: 'config:',
    rateLimit: 'rate:',
  },

  // Cache strategies by data type
  strategies: {
    // User sessions
    session: {
      ttl: 86400,        // 24 hours
      prefix: 'session:',
    },

    // Course catalog (public, cacheable)
    courseCatalog: {
      ttl: 300,          // 5 minutes
      prefix: 'catalog:courses:',
      staleWhileRevalidate: true,
    },

    // User enrollments
    userEnrollments: {
      ttl: 60,           // 1 minute
      prefix: 'enrollment:user:',
      invalidateOn: ['enrollment.created', 'enrollment.updated'],
    },

    // Payment status
    paymentStatus: {
      ttl: 30,           // 30 seconds
      prefix: 'payment:',
      invalidateOn: ['payment.completed', 'payment.failed'],
    },

    // Configuration/settings
    systemConfig: {
      ttl: 3600,         // 1 hour
      prefix: 'config:',
      warmOnStartup: true,
    },

    // Rate limiting
    rateLimit: {
      ttl: 60,           // 1 minute window
      prefix: 'rate:',
    },
  },
};
```

---

## 7. Monitoring Configuration

### 7.1 Prometheus Configuration

```yaml
# monitoring/prometheus/prometheus.yml

global:
  scrape_interval: 15s
  evaluation_interval: 15s
  external_labels:
    environment: production
    project: smart-academy

alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - alertmanager:9093

rule_files:
  - /etc/prometheus/alert-rules.yml

scrape_configs:
  # Prometheus self-monitoring
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  # Node Exporter - System metrics
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  # cAdvisor - Container metrics
  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']

  # Docker daemon metrics
  - job_name: 'docker'
    static_configs:
      - targets: ['host.docker.internal:9323']

  # API Server metrics
  - job_name: 'api'
    metrics_path: /metrics
    static_configs:
      - targets: ['api:4000']
    relabel_configs:
      - source_labels: [__address__]
        target_label: instance
        replacement: api-blue

  # PostgreSQL metrics
  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']

  # Redis metrics
  - job_name: 'redis'
    static_configs:
      - targets: ['redis-exporter:9121']

  # Nginx metrics
  - job_name: 'nginx'
    static_configs:
      - targets: ['nginx-exporter:9113']

  # MinIO metrics
  - job_name: 'minio'
    metrics_path: /minio/v2/metrics/cluster
    scheme: http
    static_configs:
      - targets: ['minio:9000']
```

### 7.2 Alert Rules Configuration

```yaml
# monitoring/prometheus/alert-rules.yml

groups:
  - name: smart-academy-alerts
    rules:
      # High CPU Usage
      - alert: HighCPUUsage
        expr: 100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage detected"
          description: "CPU usage is above 80% for more than 5 minutes on {{ $labels.instance }}"

      # High Memory Usage
      - alert: HighMemoryUsage
        expr: (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100 > 85
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage detected"
          description: "Memory usage is above 85% on {{ $labels.instance }}"

      # Disk Space Low
      - alert: DiskSpaceLow
        expr: (1 - (node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"})) * 100 > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Disk space running low"
          description: "Disk usage is above 80% on {{ $labels.instance }}"

      # Container Down
      - alert: ContainerDown
        expr: absent(container_last_seen{name=~"smart-academy.*"})
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Container is down"
          description: "Container {{ $labels.name }} has been down for more than 1 minute"

      # High Response Time
      - alert: HighResponseTime
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket{job="api"}[5m])) > 1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High API response time"
          description: "95th percentile response time is above 1 second"

      # High Error Rate
      - alert: HighErrorRate
        expr: sum(rate(http_requests_total{job="api", status=~"5.."}[5m])) / sum(rate(http_requests_total{job="api"}[5m])) > 0.01
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is above 1% for the API"

      # Database Connection Issues
      - alert: DatabaseConnectionHigh
        expr: pg_stat_activity_count > 150
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High database connections"
          description: "PostgreSQL connection count is above 150"

      # Redis Memory High
      - alert: RedisMemoryHigh
        expr: redis_memory_used_bytes / redis_memory_max_bytes > 0.9
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Redis memory usage high"
          description: "Redis is using more than 90% of max memory"

      # SSL Certificate Expiring
      - alert: SSLCertificateExpiring
        expr: (probe_ssl_earliest_cert_expiry - time()) / 86400 < 30
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "SSL certificate expiring soon"
          description: "SSL certificate for {{ $labels.instance }} expires in less than 30 days"
```

### 7.3 Alertmanager Configuration

```yaml
# monitoring/alertmanager/alertmanager.yml

global:
  resolve_timeout: 5m
  smtp_smarthost: 'smtp.sendgrid.net:587'
  smtp_from: 'alerts@smartacademy.edu.bd'
  smtp_auth_username: 'apikey'
  smtp_auth_password: '${SENDGRID_API_KEY}'

templates:
  - '/etc/alertmanager/templates/*.tmpl'

route:
  group_by: ['alertname', 'severity']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  receiver: 'default-receiver'

  routes:
    - match:
        severity: critical
      receiver: 'critical-receiver'
      continue: true

    - match:
        severity: warning
      receiver: 'warning-receiver'

receivers:
  - name: 'default-receiver'
    email_configs:
      - to: 'devops@smartacademy.edu.bd'
        send_resolved: true

  - name: 'critical-receiver'
    email_configs:
      - to: 'devops@smartacademy.edu.bd, management@smartacademy.edu.bd'
        send_resolved: true
    webhook_configs:
      - url: '${SLACK_WEBHOOK_URL}'
        send_resolved: true

  - name: 'warning-receiver'
    email_configs:
      - to: 'devops@smartacademy.edu.bd'
        send_resolved: true

inhibit_rules:
  - source_match:
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['alertname', 'instance']
```

### 7.4 Grafana Dashboard Provisioning

```yaml
# monitoring/grafana/provisioning/dashboards/dashboards.yml

apiVersion: 1

providers:
  - name: 'Smart Academy'
    orgId: 1
    folder: 'Smart Academy'
    folderUid: 'smart-academy'
    type: file
    disableDeletion: false
    editable: true
    options:
      path: /var/lib/grafana/dashboards
```

### 7.5 Loki Configuration

```yaml
# monitoring/loki/loki-config.yml

auth_enabled: false

server:
  http_listen_port: 3100
  grpc_listen_port: 9096

common:
  instance_addr: 127.0.0.1
  path_prefix: /loki
  storage:
    filesystem:
      chunks_directory: /loki/chunks
      rules_directory: /loki/rules
  replication_factor: 1
  ring:
    kvstore:
      store: inmemory

query_range:
  results_cache:
    cache:
      embedded_cache:
        enabled: true
        max_size_mb: 100

schema_config:
  configs:
    - from: 2020-10-24
      store: boltdb-shipper
      object_store: filesystem
      schema: v11
      index:
        prefix: index_
        period: 24h

ruler:
  alertmanager_url: http://alertmanager:9093

analytics:
  reporting_enabled: false

limits_config:
  retention_period: 720h  # 30 days
  enforce_metric_name: false
  reject_old_samples: true
  reject_old_samples_max_age: 168h
  max_query_series: 500
```

---

## 8. Backup Configuration

### 8.1 Database Backup Script

```bash
#!/bin/bash
# scripts/backup/backup-database.sh

set -e

# Configuration
BACKUP_DIR="/backups/database"
RETENTION_DAYS=30
DATE=$(date +%Y%m%d)
TIME=$(date +%H%M%S)
TIMESTAMP="${DATE}_${TIME}"

# Notification function
notify() {
    local status=$1
    local message=$2
    curl -s -X POST "${SLACK_WEBHOOK_URL}" \
        -H "Content-Type: application/json" \
        -d "{\"text\": \"${status} Database Backup: ${message}\"}" || true
}

echo "=== Database Backup Started: $TIMESTAMP ==="

# PostgreSQL Backup
echo "Backing up PostgreSQL..."
PG_BACKUP_FILE="${BACKUP_DIR}/postgres/smart_academy_${TIMESTAMP}.sql.gz"

docker compose -f /app/smart-academy/docker-compose.prod.yml exec -T postgres \
    pg_dump -U smart_academy -d smart_academy \
    --no-owner --no-privileges --clean --if-exists | \
    gzip > "$PG_BACKUP_FILE"

PG_SIZE=$(du -h "$PG_BACKUP_FILE" | cut -f1)
echo "PostgreSQL backup completed: $PG_BACKUP_FILE ($PG_SIZE)"

# Verify PostgreSQL backup
if gunzip -t "$PG_BACKUP_FILE" 2>/dev/null; then
    echo "PostgreSQL backup integrity verified"
else
    echo "ERROR: PostgreSQL backup integrity check failed!"
    notify "FAILED" "PostgreSQL backup integrity check failed"
    exit 1
fi

# MySQL Backup (Gibbon)
echo "Backing up MySQL (Gibbon)..."
MYSQL_BACKUP_FILE="${BACKUP_DIR}/mysql/gibbon_${TIMESTAMP}.sql.gz"

docker compose -f /app/smart-academy/docker-compose.prod.yml exec -T mysql \
    mysqldump -u root -p"${MYSQL_ROOT_PASSWORD}" gibbon \
    --single-transaction --routines --triggers | \
    gzip > "$MYSQL_BACKUP_FILE"

MYSQL_SIZE=$(du -h "$MYSQL_BACKUP_FILE" | cut -f1)
echo "MySQL backup completed: $MYSQL_BACKUP_FILE ($MYSQL_SIZE)"

# Clean old backups
echo "Cleaning old backups (older than $RETENTION_DAYS days)..."
find "${BACKUP_DIR}/postgres" -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete
find "${BACKUP_DIR}/mysql" -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete

# Count remaining backups
PG_COUNT=$(ls -1 "${BACKUP_DIR}/postgres"/*.sql.gz 2>/dev/null | wc -l)
MYSQL_COUNT=$(ls -1 "${BACKUP_DIR}/mysql"/*.sql.gz 2>/dev/null | wc -l)

echo ""
echo "=== Backup Summary ==="
echo "PostgreSQL: $PG_BACKUP_FILE ($PG_SIZE)"
echo "MySQL: $MYSQL_BACKUP_FILE ($MYSQL_SIZE)"
echo "Retained backups: PostgreSQL=$PG_COUNT, MySQL=$MYSQL_COUNT"
echo "=== Backup Completed ==="

notify "SUCCESS" "PostgreSQL: $PG_SIZE, MySQL: $MYSQL_SIZE"
```

### 8.2 File Backup Script

```bash
#!/bin/bash
# scripts/backup/backup-files.sh

set -e

# Configuration
BACKUP_DIR="/backups/files"
RETENTION_DAYS=14
DATE=$(date +%Y%m%d)
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "=== File Backup Started: $TIMESTAMP ==="

# Backup MinIO data
echo "Backing up MinIO storage..."
MINIO_BACKUP="${BACKUP_DIR}/minio_${TIMESTAMP}.tar.gz"

tar -czf "$MINIO_BACKUP" \
    -C /data minio \
    --exclude="*.tmp" \
    --exclude=".minio.sys"

MINIO_SIZE=$(du -h "$MINIO_BACKUP" | cut -f1)
echo "MinIO backup completed: $MINIO_BACKUP ($MINIO_SIZE)"

# Backup configuration files
echo "Backing up configuration files..."
CONFIG_BACKUP="${BACKUP_DIR}/config_${TIMESTAMP}.tar.gz"

tar -czf "$CONFIG_BACKUP" \
    -C /app/smart-academy \
    docker-compose.prod.yml \
    docker-compose.blue.yml \
    docker-compose.green.yml \
    .env \
    nginx/ \
    database/ \
    redis/ \
    monitoring/

CONFIG_SIZE=$(du -h "$CONFIG_BACKUP" | cut -f1)
echo "Config backup completed: $CONFIG_BACKUP ($CONFIG_SIZE)"

# Clean old backups
echo "Cleaning old backups..."
find "$BACKUP_DIR" -name "minio_*.tar.gz" -mtime +$RETENTION_DAYS -delete
find "$BACKUP_DIR" -name "config_*.tar.gz" -mtime +$RETENTION_DAYS -delete

echo ""
echo "=== File Backup Summary ==="
echo "MinIO: $MINIO_BACKUP ($MINIO_SIZE)"
echo "Config: $CONFIG_BACKUP ($CONFIG_SIZE)"
echo "=== Backup Completed ==="
```

### 8.3 Backup Verification Script

```bash
#!/bin/bash
# scripts/backup/backup-verify.sh

set -e

BACKUP_DIR="/backups"
ERRORS=0

echo "=== Backup Verification ==="
echo ""

# Check PostgreSQL backups
echo "Checking PostgreSQL backups..."
PG_LATEST=$(ls -1t "${BACKUP_DIR}/database/postgres"/*.sql.gz 2>/dev/null | head -1)
if [ -n "$PG_LATEST" ]; then
    PG_AGE=$(( ($(date +%s) - $(stat -c %Y "$PG_LATEST")) / 3600 ))
    PG_SIZE=$(du -h "$PG_LATEST" | cut -f1)

    if [ $PG_AGE -gt 24 ]; then
        echo "WARNING: PostgreSQL backup is $PG_AGE hours old!"
        ERRORS=$((ERRORS + 1))
    else
        echo "PostgreSQL: $PG_LATEST ($PG_SIZE, ${PG_AGE}h ago)"
    fi

    # Test integrity
    if gunzip -t "$PG_LATEST" 2>/dev/null; then
        echo "  Integrity: OK"
    else
        echo "  Integrity: FAILED"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo "ERROR: No PostgreSQL backups found!"
    ERRORS=$((ERRORS + 1))
fi

# Check MySQL backups
echo ""
echo "Checking MySQL backups..."
MYSQL_LATEST=$(ls -1t "${BACKUP_DIR}/database/mysql"/*.sql.gz 2>/dev/null | head -1)
if [ -n "$MYSQL_LATEST" ]; then
    MYSQL_AGE=$(( ($(date +%s) - $(stat -c %Y "$MYSQL_LATEST")) / 3600 ))
    MYSQL_SIZE=$(du -h "$MYSQL_LATEST" | cut -f1)

    if [ $MYSQL_AGE -gt 24 ]; then
        echo "WARNING: MySQL backup is $MYSQL_AGE hours old!"
        ERRORS=$((ERRORS + 1))
    else
        echo "MySQL: $MYSQL_LATEST ($MYSQL_SIZE, ${MYSQL_AGE}h ago)"
    fi
else
    echo "WARNING: No MySQL backups found"
fi

# Check file backups
echo ""
echo "Checking file backups..."
FILE_LATEST=$(ls -1t "${BACKUP_DIR}/files"/minio_*.tar.gz 2>/dev/null | head -1)
if [ -n "$FILE_LATEST" ]; then
    FILE_AGE=$(( ($(date +%s) - $(stat -c %Y "$FILE_LATEST")) / 3600 ))
    FILE_SIZE=$(du -h "$FILE_LATEST" | cut -f1)

    if [ $FILE_AGE -gt 24 ]; then
        echo "WARNING: File backup is $FILE_AGE hours old!"
        ERRORS=$((ERRORS + 1))
    else
        echo "MinIO: $FILE_LATEST ($FILE_SIZE, ${FILE_AGE}h ago)"
    fi
else
    echo "WARNING: No file backups found"
fi

# Disk space check
echo ""
echo "Backup storage usage:"
du -sh "${BACKUP_DIR}"/*

echo ""
if [ $ERRORS -eq 0 ]; then
    echo "All backup checks passed!"
    exit 0
else
    echo "WARNING: $ERRORS backup issue(s) detected!"
    exit 1
fi
```

### 8.4 Cron Configuration for Backups

```cron
# /etc/cron.d/smart-academy-backups

# Database backups - daily at 2 AM
0 2 * * * deploy /app/smart-academy/scripts/backup/backup-database.sh >> /var/log/smart-academy/backup-db.log 2>&1

# File backups - daily at 3 AM
0 3 * * * deploy /app/smart-academy/scripts/backup/backup-files.sh >> /var/log/smart-academy/backup-files.log 2>&1

# Backup verification - daily at 4 AM
0 4 * * * deploy /app/smart-academy/scripts/backup/backup-verify.sh >> /var/log/smart-academy/backup-verify.log 2>&1

# WAL archiving check - every hour
0 * * * * deploy find /backups/database/postgres/wal -mmin +60 -delete 2>/dev/null

# Cleanup old logs - weekly on Sunday at 5 AM
0 5 * * 0 deploy find /var/log/smart-academy -name "*.log" -mtime +30 -delete 2>/dev/null
```

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | January 2026 | Development Team | Initial document |

---

*This Infrastructure as Code document should be reviewed and updated whenever infrastructure changes are made.*
