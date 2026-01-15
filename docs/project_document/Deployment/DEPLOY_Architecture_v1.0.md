# Deployment Architecture Document

## Document Information
| Field | Value |
|-------|-------|
| **Document ID** | DEPLOY-ARCH-001 |
| **Version** | 1.0 |
| **Last Updated** | 2026-01-10 |
| **Author** | Smart Academy Development Team |
| **Status** | Active |

---

## Table of Contents
1. [Overview](#1-overview)
2. [Deployment Diagram](#2-deployment-diagram)
3. [Server Specifications](#3-server-specifications)
4. [Network Architecture](#4-network-architecture)
5. [Load Balancer Configuration](#5-load-balancer-configuration)
6. [CDN Configuration](#6-cdn-configuration)
7. [SSL/TLS Configuration](#7-ssltls-configuration)
8. [Monitoring and Observability](#8-monitoring-and-observability)
9. [Disaster Recovery](#9-disaster-recovery)

---

## 1. Overview

### 1.1 Purpose
This document defines the comprehensive deployment architecture for the Smart Academy Digital Portal, covering all infrastructure components from edge services to database backends, optimized for a Bangladesh-based educational institution.

### 1.2 Deployment Strategy
| Environment | Strategy | Purpose |
|-------------|----------|---------|
| Development | Local Docker Compose | Solo developer workstation |
| Staging | Single VPS | Pre-production testing |
| Production | Multi-tier VPS/Cloud | Live system |

### 1.3 Architecture Principles
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     DEPLOYMENT ARCHITECTURE PRINCIPLES                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   1. SECURITY FIRST                                                          │
│      • Defense in depth (CDN → WAF → Reverse Proxy → App → DB)              │
│      • Zero-trust networking                                                 │
│      • Encrypted data at rest and in transit                                │
│                                                                              │
│   2. HIGH AVAILABILITY                                                       │
│      • No single point of failure                                           │
│      • Automatic failover capabilities                                       │
│      • 99.9% uptime target (8.76 hours downtime/year)                       │
│                                                                              │
│   3. SCALABILITY                                                             │
│      • Horizontal scaling for application tier                              │
│      • Vertical scaling for database tier                                   │
│      • CDN for static content distribution                                  │
│                                                                              │
│   4. COST OPTIMIZATION                                                       │
│      • Right-sized infrastructure                                            │
│      • Resource utilization monitoring                                       │
│      • Reserved instances for predictable workloads                         │
│                                                                              │
│   5. MAINTAINABILITY                                                         │
│      • Infrastructure as Code                                                │
│      • Automated deployments                                                 │
│      • Comprehensive logging and monitoring                                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Deployment Diagram

### 2.1 Production Architecture Overview
```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                    SMART ACADEMY PRODUCTION DEPLOYMENT ARCHITECTURE                  │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│                                   INTERNET                                           │
│                                      │                                               │
│                              ┌───────┴───────┐                                      │
│                              │   DNS (CF)    │                                      │
│                              │ smartacademy  │                                      │
│                              │  .edu.bd      │                                      │
│                              └───────┬───────┘                                      │
│                                      │                                               │
│   ┌──────────────────────────────────┴──────────────────────────────────────────┐  │
│   │                        CLOUDFLARE EDGE NETWORK                               │  │
│   │  ┌──────────────────────────────────────────────────────────────────────┐   │  │
│   │  │                          CLOUDFLARE SERVICES                          │   │  │
│   │  │                                                                        │   │  │
│   │  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────────────┐ │   │  │
│   │  │  │   DNS      │ │   CDN      │ │   WAF      │ │   DDoS Protection  │ │   │  │
│   │  │  │ Management │ │  Caching   │ │ Firewall   │ │   (Always-On)      │ │   │  │
│   │  │  └────────────┘ └────────────┘ └────────────┘ └────────────────────┘ │   │  │
│   │  │                                                                        │   │  │
│   │  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────────────┐ │   │  │
│   │  │  │   SSL/TLS  │ │   Argo     │ │ Rate       │ │   Bot Management   │ │   │  │
│   │  │  │ Termination│ │   Tunnel   │ │ Limiting   │ │   (Challenge)      │ │   │  │
│   │  │  └────────────┘ └────────────┘ └────────────┘ └────────────────────┘ │   │  │
│   │  │                                                                        │   │  │
│   │  └──────────────────────────────────────────────────────────────────────┘   │  │
│   └──────────────────────────────────────────────────────────────────────────────┘  │
│                                      │                                               │
│                          Cloudflare Tunnel (Encrypted)                              │
│                                      │                                               │
│   ┌──────────────────────────────────┴──────────────────────────────────────────┐  │
│   │                         PRIMARY SERVER (VPS/Cloud)                           │  │
│   │                              Bangladesh DC                                    │  │
│   │                                                                               │  │
│   │  ┌─────────────────────────────────────────────────────────────────────────┐ │  │
│   │  │                         NGINX REVERSE PROXY                              │ │  │
│   │  │                                                                          │ │  │
│   │  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────────────┐│ │  │
│   │  │  │   SSL      │  │  Request   │  │   Gzip     │  │   Rate Limiting    ││ │  │
│   │  │  │ (Backup)   │  │  Routing   │  │ Compression│  │   (Backup)         ││ │  │
│   │  │  └────────────┘  └────────────┘  └────────────┘  └────────────────────┘│ │  │
│   │  │                                                                          │ │  │
│   │  │  Routing Rules:                                                          │ │  │
│   │  │  • /              → Next.js Web (upstream: web:3000)                    │ │  │
│   │  │  • /admin/*       → Admin React (upstream: admin:80)                    │ │  │
│   │  │  • /api/*         → Fastify API (upstream: api:4000)                    │ │  │
│   │  │  • /gibbon/*      → Gibbon SIS (upstream: gibbon:80)                    │ │  │
│   │  │  • /moodle/*      → Moodle LMS (upstream: moodle:8080)                  │ │  │
│   │  │  • /storage/*     → MinIO S3 (upstream: minio:9000)                     │ │  │
│   │  │                                                                          │ │  │
│   │  └─────────────────────────────────────────────────────────────────────────┘ │  │
│   │                                      │                                        │  │
│   │           ┌──────────────────────────┼──────────────────────────┐            │  │
│   │           │                          │                          │            │  │
│   │           ▼                          ▼                          ▼            │  │
│   │  ┌────────────────┐        ┌────────────────┐        ┌────────────────┐     │  │
│   │  │   Next.js      │        │   Fastify      │        │   PHP-FPM      │     │  │
│   │  │   Web App      │        │   API Server   │        │                │     │  │
│   │  │                │        │                │        │   ┌─────────┐  │     │  │
│   │  │  ┌──────────┐  │        │  ┌──────────┐  │        │   │ Gibbon  │  │     │  │
│   │  │  │  PM2     │  │        │  │  PM2     │  │        │   └─────────┘  │     │  │
│   │  │  │ Cluster  │  │        │  │ Cluster  │  │        │   ┌─────────┐  │     │  │
│   │  │  │ (2-4)    │  │        │  │ (2-4)    │  │        │   │ Moodle  │  │     │  │
│   │  │  └──────────┘  │        │  └──────────┘  │        │   └─────────┘  │     │  │
│   │  │                │        │                │        │                │     │  │
│   │  │  Port: 3000    │        │  Port: 4000    │        │  Port: 8080    │     │  │
│   │  └────────────────┘        └────────────────┘        └────────────────┘     │  │
│   │                                      │                                        │  │
│   │                                      ▼                                        │  │
│   │  ┌─────────────────────────────────────────────────────────────────────────┐ │  │
│   │  │                           CACHE LAYER                                    │ │  │
│   │  │                                                                          │ │  │
│   │  │  ┌─────────────────────────────────────────────────────────────────┐    │ │  │
│   │  │  │                      Redis Sentinel Cluster                      │    │ │  │
│   │  │  │                                                                  │    │ │  │
│   │  │  │  ┌───────────┐    ┌───────────┐    ┌───────────┐               │    │ │  │
│   │  │  │  │  Master   │───▶│  Replica  │───▶│  Replica  │               │    │ │  │
│   │  │  │  │  :6379    │    │  :6380    │    │  :6381    │               │    │ │  │
│   │  │  │  └───────────┘    └───────────┘    └───────────┘               │    │ │  │
│   │  │  │                                                                  │    │ │  │
│   │  │  │  Purpose: Sessions, API Cache, Rate Limiting, Pub/Sub           │    │ │  │
│   │  │  │  Persistence: AOF + RDB                                          │    │ │  │
│   │  │  │  Memory: 2GB                                                     │    │ │  │
│   │  │  └─────────────────────────────────────────────────────────────────┘    │ │  │
│   │  │                                                                          │ │  │
│   │  └─────────────────────────────────────────────────────────────────────────┘ │  │
│   │                                      │                                        │  │
│   │                                      ▼                                        │  │
│   │  ┌─────────────────────────────────────────────────────────────────────────┐ │  │
│   │  │                          DATABASE LAYER                                  │ │  │
│   │  │                                                                          │ │  │
│   │  │  ┌──────────────────────────┐  ┌──────────────────────────┐            │ │  │
│   │  │  │       PostgreSQL 17      │  │         MySQL 8.0        │            │ │  │
│   │  │  │                          │  │                          │            │ │  │
│   │  │  │  ┌────────┐ ┌────────┐   │  │  ┌────────┐ ┌────────┐   │            │ │  │
│   │  │  │  │Primary │▶│Replica │   │  │  │Primary │▶│Replica │   │            │ │  │
│   │  │  │  │ :5432  │ │ :5433  │   │  │  │ :3306  │ │ :3307  │   │            │ │  │
│   │  │  │  └────────┘ └────────┘   │  │  └────────┘ └────────┘   │            │ │  │
│   │  │  │                          │  │                          │            │ │  │
│   │  │  │  Purpose:                │  │  Purpose:                │            │ │  │
│   │  │  │  • Custom Modules        │  │  • Gibbon SIS            │            │ │  │
│   │  │  │  • User Data             │  │  • Moodle LMS            │            │ │  │
│   │  │  │  • Payments              │  │                          │            │ │  │
│   │  │  │                          │  │                          │            │ │  │
│   │  │  │  Backup: Daily + WAL     │  │  Backup: Daily + Binlog  │            │ │  │
│   │  │  └──────────────────────────┘  └──────────────────────────┘            │ │  │
│   │  │                                                                          │ │  │
│   │  └─────────────────────────────────────────────────────────────────────────┘ │  │
│   │                                      │                                        │  │
│   │                                      ▼                                        │  │
│   │  ┌─────────────────────────────────────────────────────────────────────────┐ │  │
│   │  │                          STORAGE LAYER                                   │ │  │
│   │  │                                                                          │ │  │
│   │  │  ┌──────────────────────────────────────────────────────────────────┐   │ │  │
│   │  │  │                    MinIO Object Storage                           │   │ │  │
│   │  │  │                                                                   │   │ │  │
│   │  │  │  Buckets:                                                         │   │ │  │
│   │  │  │  • smart-academy-documents  (Private - Student docs)             │   │ │  │
│   │  │  │  • smart-academy-avatars    (Public - Profile images)            │   │ │  │
│   │  │  │  • smart-academy-uploads    (Private - General uploads)          │   │ │  │
│   │  │  │  • smart-academy-backups    (Private - DB backups)               │   │ │  │
│   │  │  │                                                                   │   │ │  │
│   │  │  │  API: :9000 | Console: :9001                                      │   │ │  │
│   │  │  │  Storage: 500GB SSD                                               │   │ │  │
│   │  │  └──────────────────────────────────────────────────────────────────┘   │ │  │
│   │  │                                                                          │ │  │
│   │  └─────────────────────────────────────────────────────────────────────────┘ │  │
│   │                                                                               │  │
│   └───────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                      │
│   ┌──────────────────────────────────────────────────────────────────────────────┐  │
│   │                           EXTERNAL SERVICES                                   │  │
│   │                                                                               │  │
│   │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ │  │
│   │  │   bKash    │ │   Nagad    │ │ SSLCommerz │ │ BulkSMSBD  │ │  SendGrid  │ │  │
│   │  │  Payment   │ │  Payment   │ │  Payment   │ │    SMS     │ │   Email    │ │  │
│   │  │    API     │ │    API     │ │    API     │ │    API     │ │    API     │ │  │
│   │  └────────────┘ └────────────┘ └────────────┘ └────────────┘ └────────────┘ │  │
│   │                                                                               │  │
│   └──────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Staging Environment
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       STAGING ENVIRONMENT ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   DNS: staging.smartacademy.edu.bd                                           │
│                        │                                                     │
│                        ▼                                                     │
│   ┌──────────────────────────────────────────────────────────────────────┐  │
│   │                  STAGING SERVER (Single VPS)                          │  │
│   │                     4 vCPU | 8GB RAM | 160GB SSD                      │  │
│   │                                                                        │  │
│   │  ┌────────────────────────────────────────────────────────────────┐   │  │
│   │  │                      Docker Compose Stack                       │   │  │
│   │  │                                                                  │   │  │
│   │  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────────┐   │   │  │
│   │  │  │ Nginx  │ │Next.js │ │Fastify │ │ Redis  │ │ PostgreSQL │   │   │  │
│   │  │  │  :80   │ │ :3000  │ │ :4000  │ │ :6379  │ │   :5432    │   │   │  │
│   │  │  └────────┘ └────────┘ └────────┘ └────────┘ └────────────┘   │   │  │
│   │  │                                                                  │   │  │
│   │  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                   │   │  │
│   │  │  │ Admin  │ │ Gibbon │ │ Moodle │ │  MySQL │                   │   │  │
│   │  │  │  :3001 │ │ :8080  │ │ :8082  │ │ :3306  │                   │   │  │
│   │  │  └────────┘ └────────┘ └────────┘ └────────┘                   │   │  │
│   │  │                                                                  │   │  │
│   │  └────────────────────────────────────────────────────────────────┘   │  │
│   │                                                                        │  │
│   │  Features:                                                             │  │
│   │  • Production-like configuration                                       │  │
│   │  • Test data (anonymized)                                              │  │
│   │  • Password-protected access                                           │  │
│   │  • Automated deployment from develop branch                            │  │
│   │                                                                        │  │
│   └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Server Specifications

### 3.1 Production Server Requirements

#### Primary Application Server
| Specification | Minimum | Recommended | Production |
|---------------|---------|-------------|------------|
| **CPU** | 4 vCPU | 8 vCPU | 8+ vCPU |
| **RAM** | 16 GB | 32 GB | 32 GB |
| **Storage** | 200 GB SSD | 500 GB NVMe | 500 GB NVMe |
| **Network** | 1 Gbps | 1 Gbps | 1 Gbps |
| **OS** | Ubuntu 24.04 LTS | Ubuntu 24.04 LTS | Ubuntu 24.04 LTS |

#### Database Server (if separate)
| Specification | Minimum | Recommended | Production |
|---------------|---------|-------------|------------|
| **CPU** | 4 vCPU | 8 vCPU | 8 vCPU |
| **RAM** | 16 GB | 32 GB | 32 GB |
| **Storage** | 500 GB SSD | 1 TB NVMe | 1 TB NVMe |
| **IOPS** | 3000 | 6000 | 6000+ |

### 3.2 Resource Allocation Matrix
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        RESOURCE ALLOCATION MATRIX                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Service              │ CPU (cores) │ RAM (GB) │ Storage │ Instances       │
│   ─────────────────────┼─────────────┼──────────┼─────────┼──────────────── │
│   Nginx                │     0.5     │    0.5   │   1 GB  │      1          │
│   Next.js (PM2)        │     2.0     │    4.0   │  10 GB  │   2-4 cluster   │
│   Fastify API (PM2)    │     2.0     │    2.0   │   5 GB  │   2-4 cluster   │
│   Admin (Nginx)        │     0.5     │    0.5   │   1 GB  │      1          │
│   Redis                │     1.0     │    2.0   │  10 GB  │      1+replica  │
│   PostgreSQL           │     2.0     │    8.0   │ 200 GB  │      1+replica  │
│   MySQL                │     2.0     │    4.0   │ 100 GB  │      1+replica  │
│   Gibbon               │     1.0     │    2.0   │  20 GB  │      1          │
│   Moodle               │     2.0     │    4.0   │  50 GB  │      1          │
│   MinIO                │     1.0     │    2.0   │ 500 GB  │      1          │
│   ─────────────────────┼─────────────┼──────────┼─────────┼──────────────── │
│   TOTAL                │    14.0     │   29.0   │ 897 GB  │                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Recommended Cloud Providers for Bangladesh
| Provider | Region | Benefits | Monthly Cost (Est.) |
|----------|--------|----------|---------------------|
| **DigitalOcean** | Singapore (SGP1) | Low latency to BD, simple | $200-400 |
| **Vultr** | Singapore | Competitive pricing | $150-350 |
| **AWS** | Mumbai (ap-south-1) | Enterprise features | $300-600 |
| **Google Cloud** | Mumbai | Good BD connectivity | $300-600 |
| **Local BD Hosting** | Dhaka | Lowest latency, BTCL | $200-500 |

---

## 4. Network Architecture

### 4.1 Network Topology
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         NETWORK TOPOLOGY DIAGRAM                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   INTERNET                                                                   │
│       │                                                                      │
│       │ HTTPS (443)                                                          │
│       ▼                                                                      │
│   ┌───────────────────────────────────────────────────────────────────────┐ │
│   │                    CLOUDFLARE EDGE (Anycast)                           │ │
│   │                                                                         │ │
│   │   IP Ranges: 103.21.244.0/22, 103.22.200.0/22, 103.31.4.0/22, ...     │ │
│   │                                                                         │ │
│   │   Services:                                                             │ │
│   │   • DNS Resolution (1.1.1.1)                                            │ │
│   │   • SSL/TLS Termination (Full Strict)                                   │ │
│   │   • WAF Rules (OWASP Core Rule Set)                                     │ │
│   │   • DDoS Mitigation (Layer 3, 4, 7)                                     │ │
│   │   • CDN Caching (Static Assets)                                         │ │
│   │   • Bot Management                                                       │ │
│   │                                                                         │ │
│   └────────────────────────────────┬──────────────────────────────────────┘ │
│                                    │                                        │
│                      Cloudflare Tunnel (Argo) or                            │
│                      HTTPS to Origin (Allowlisted IPs)                      │
│                                    │                                        │
│   ┌────────────────────────────────┴──────────────────────────────────────┐ │
│   │                       ORIGIN SERVER NETWORK                            │ │
│   │                                                                         │ │
│   │   ┌─────────────────────────────────────────────────────────────────┐  │ │
│   │   │                      PUBLIC SUBNET                               │  │ │
│   │   │                      10.0.1.0/24                                 │  │ │
│   │   │                                                                   │  │ │
│   │   │   ┌───────────────────────────────────────────────────────────┐ │  │ │
│   │   │   │              Nginx Reverse Proxy                           │ │  │ │
│   │   │   │              10.0.1.10                                      │ │  │ │
│   │   │   │              Ports: 80 (redirect), 443 (main)              │ │  │ │
│   │   │   └───────────────────────────────────────────────────────────┘ │  │ │
│   │   │                                                                   │  │ │
│   │   └─────────────────────────────────────────────────────────────────┘  │ │
│   │                                    │                                    │ │
│   │   ┌────────────────────────────────┴────────────────────────────────┐  │ │
│   │   │                    PRIVATE SUBNET (Apps)                         │  │ │
│   │   │                       10.0.2.0/24                                │  │ │
│   │   │                                                                   │  │ │
│   │   │   ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐   │  │ │
│   │   │   │ Next.js   │  │ Fastify   │  │  Admin    │  │  Gibbon   │   │  │ │
│   │   │   │ 10.0.2.10 │  │ 10.0.2.11 │  │ 10.0.2.12 │  │ 10.0.2.13 │   │  │ │
│   │   │   └───────────┘  └───────────┘  └───────────┘  └───────────┘   │  │ │
│   │   │                                                                   │  │ │
│   │   │   ┌───────────┐                                                  │  │ │
│   │   │   │  Moodle   │                                                  │  │ │
│   │   │   │ 10.0.2.14 │                                                  │  │ │
│   │   │   └───────────┘                                                  │  │ │
│   │   │                                                                   │  │ │
│   │   └─────────────────────────────────────────────────────────────────┘  │ │
│   │                                    │                                    │ │
│   │   ┌────────────────────────────────┴────────────────────────────────┐  │ │
│   │   │                   PRIVATE SUBNET (Data)                          │  │ │
│   │   │                       10.0.3.0/24                                │  │ │
│   │   │                                                                   │  │ │
│   │   │   ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐   │  │ │
│   │   │   │PostgreSQL │  │  MySQL    │  │  Redis    │  │  MinIO    │   │  │ │
│   │   │   │ 10.0.3.10 │  │ 10.0.3.11 │  │ 10.0.3.12 │  │ 10.0.3.13 │   │  │ │
│   │   │   └───────────┘  └───────────┘  └───────────┘  └───────────┘   │  │ │
│   │   │                                                                   │  │ │
│   │   │   No direct internet access - egress via NAT gateway             │  │ │
│   │   │                                                                   │  │ │
│   │   └─────────────────────────────────────────────────────────────────┘  │ │
│   │                                                                         │ │
│   └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Firewall Rules
```yaml
# UFW Firewall Configuration
# /etc/ufw/user.rules

# Cloudflare IP Ranges Only
# https://www.cloudflare.com/ips/

ufw default deny incoming
ufw default allow outgoing

# SSH (from specific IP only)
ufw allow from YOUR_ADMIN_IP to any port 22

# HTTP/HTTPS from Cloudflare only
# Cloudflare IPv4 ranges
ufw allow from 173.245.48.0/20 to any port 443
ufw allow from 103.21.244.0/22 to any port 443
ufw allow from 103.22.200.0/22 to any port 443
ufw allow from 103.31.4.0/22 to any port 443
ufw allow from 141.101.64.0/18 to any port 443
ufw allow from 108.162.192.0/18 to any port 443
ufw allow from 190.93.240.0/20 to any port 443
ufw allow from 188.114.96.0/20 to any port 443
ufw allow from 197.234.240.0/22 to any port 443
ufw allow from 198.41.128.0/17 to any port 443
ufw allow from 162.158.0.0/15 to any port 443
ufw allow from 104.16.0.0/13 to any port 443
ufw allow from 104.24.0.0/14 to any port 443
ufw allow from 172.64.0.0/13 to any port 443
ufw allow from 131.0.72.0/22 to any port 443

# Enable firewall
ufw enable
```

### 4.3 DNS Configuration
```
# Cloudflare DNS Records

# Primary domain
smartacademy.edu.bd.        A       (Proxied - CF IP)
www.smartacademy.edu.bd.    CNAME   smartacademy.edu.bd (Proxied)

# Subdomains
admin.smartacademy.edu.bd.  CNAME   smartacademy.edu.bd (Proxied)
api.smartacademy.edu.bd.    CNAME   smartacademy.edu.bd (Proxied)
lms.smartacademy.edu.bd.    CNAME   smartacademy.edu.bd (Proxied)
sis.smartacademy.edu.bd.    CNAME   smartacademy.edu.bd (Proxied)
storage.smartacademy.edu.bd CNAME   smartacademy.edu.bd (Proxied)

# Staging
staging.smartacademy.edu.bd A       (Proxied - CF IP)

# Email (MX records)
smartacademy.edu.bd.        MX 10   aspmx.l.google.com
smartacademy.edu.bd.        MX 20   alt1.aspmx.l.google.com

# SPF, DKIM, DMARC
smartacademy.edu.bd.        TXT     "v=spf1 include:_spf.google.com include:sendgrid.net ~all"
```

---

## 5. Load Balancer Configuration

### 5.1 Nginx Main Configuration
```nginx
# /etc/nginx/nginx.conf

user www-data;
worker_processes auto;
pid /run/nginx.pid;
error_log /var/log/nginx/error.log warn;

# Performance tuning
worker_rlimit_nofile 65535;

events {
    worker_connections 4096;
    use epoll;
    multi_accept on;
}

http {
    # Basic settings
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for" '
                    'rt=$request_time uct="$upstream_connect_time" '
                    'uht="$upstream_header_time" urt="$upstream_response_time"';

    access_log /var/log/nginx/access.log main buffer=16k flush=2m;

    # Performance
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 100M;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_min_length 1000;
    gzip_types text/plain text/css text/xml application/json
               application/javascript application/rss+xml
               application/atom+xml image/svg+xml;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Hide nginx version
    server_tokens off;

    # Rate limiting zones
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;
    limit_conn_zone $binary_remote_addr zone=conn:10m;

    # Upstream servers
    upstream web_backend {
        least_conn;
        server 127.0.0.1:3000 weight=1 max_fails=3 fail_timeout=30s;
        keepalive 32;
    }

    upstream api_backend {
        least_conn;
        server 127.0.0.1:4000 weight=1 max_fails=3 fail_timeout=30s;
        keepalive 32;
    }

    upstream admin_backend {
        server 127.0.0.1:3001 weight=1;
    }

    upstream gibbon_backend {
        server 127.0.0.1:8080 weight=1;
    }

    upstream moodle_backend {
        server 127.0.0.1:8082 weight=1;
    }

    upstream minio_backend {
        server 127.0.0.1:9000 weight=1;
    }

    # Include site configurations
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

### 5.2 Site Configuration
```nginx
# /etc/nginx/sites-available/smartacademy.conf

# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name smartacademy.edu.bd www.smartacademy.edu.bd;
    return 301 https://$server_name$request_uri;
}

# Main HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name smartacademy.edu.bd www.smartacademy.edu.bd;

    # SSL Configuration (Cloudflare Origin Certificate)
    ssl_certificate /etc/nginx/ssl/cloudflare-origin.pem;
    ssl_certificate_key /etc/nginx/ssl/cloudflare-origin-key.pem;
    ssl_client_certificate /etc/nginx/ssl/cloudflare-ca.pem;
    ssl_verify_client on;

    # SSL Security Settings
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # HSTS
    add_header Strict-Transport-Security "max-age=63072000" always;

    # Real IP from Cloudflare
    set_real_ip_from 103.21.244.0/22;
    set_real_ip_from 103.22.200.0/22;
    set_real_ip_from 103.31.4.0/22;
    set_real_ip_from 104.16.0.0/13;
    set_real_ip_from 104.24.0.0/14;
    set_real_ip_from 108.162.192.0/18;
    set_real_ip_from 131.0.72.0/22;
    set_real_ip_from 141.101.64.0/18;
    set_real_ip_from 162.158.0.0/15;
    set_real_ip_from 172.64.0.0/13;
    set_real_ip_from 173.245.48.0/20;
    set_real_ip_from 188.114.96.0/20;
    set_real_ip_from 190.93.240.0/20;
    set_real_ip_from 197.234.240.0/22;
    set_real_ip_from 198.41.128.0/17;
    real_ip_header CF-Connecting-IP;

    # =====================
    # Static Assets (CDN)
    # =====================
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://web_backend;
        proxy_cache_valid 200 1y;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # =====================
    # API Routes
    # =====================
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        limit_conn conn 10;

        proxy_pass http://api_backend/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Request-ID $request_id;

        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
    }

    # Rate limit login endpoints
    location /api/auth/login {
        limit_req zone=login burst=5 nodelay;
        proxy_pass http://api_backend/auth/login;
        include /etc/nginx/proxy_params;
    }

    # =====================
    # Admin Dashboard
    # =====================
    location /admin {
        proxy_pass http://admin_backend;
        include /etc/nginx/proxy_params;
    }

    # =====================
    # Gibbon SIS
    # =====================
    location /gibbon/ {
        proxy_pass http://gibbon_backend/;
        include /etc/nginx/proxy_params;
        client_max_body_size 50M;
    }

    # =====================
    # Moodle LMS
    # =====================
    location /moodle/ {
        proxy_pass http://moodle_backend/;
        include /etc/nginx/proxy_params;
        client_max_body_size 100M;
    }

    # =====================
    # MinIO Storage
    # =====================
    location /storage/ {
        proxy_pass http://minio_backend/;
        include /etc/nginx/proxy_params;
        client_max_body_size 100M;
    }

    # =====================
    # Main Application (Next.js)
    # =====================
    location / {
        proxy_pass http://web_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # =====================
    # Health Check
    # =====================
    location /health {
        access_log off;
        return 200 "OK\n";
        add_header Content-Type text/plain;
    }

    # =====================
    # Security
    # =====================
    location ~ /\. {
        deny all;
    }

    location ~* \.(env|git|htaccess|htpasswd)$ {
        deny all;
    }
}
```

---

## 6. CDN Configuration

### 6.1 Cloudflare Configuration
```yaml
# Cloudflare Settings Configuration

# SSL/TLS
ssl_mode: full_strict
min_tls_version: "1.2"
tls_1_3: on
automatic_https_rewrites: on
always_use_https: on

# Security
security_level: medium
challenge_ttl: 1800
browser_check: on
privacy_pass_support: on

# WAF Rules (Custom)
waf_rules:
  - name: "Block Known Bad Bots"
    expression: "(cf.client.bot) or (cf.threat_score gt 14)"
    action: challenge

  - name: "Protect API Endpoints"
    expression: '(http.request.uri.path contains "/api/") and (cf.threat_score gt 10)'
    action: challenge

  - name: "Rate Limit Login"
    expression: 'http.request.uri.path eq "/api/auth/login"'
    action: rate_limit
    rate_limit:
      requests_per_period: 10
      period: 60

# Caching
cache_level: standard
browser_cache_ttl: 14400

# Page Rules
page_rules:
  - pattern: "smartacademy.edu.bd/api/*"
    settings:
      cache_level: bypass
      security_level: high

  - pattern: "smartacademy.edu.bd/admin/*"
    settings:
      cache_level: bypass
      security_level: high

  - pattern: "*.smartacademy.edu.bd/*.js"
    settings:
      cache_level: cache_everything
      edge_cache_ttl: 604800
      browser_cache_ttl: 31536000

  - pattern: "*.smartacademy.edu.bd/*.css"
    settings:
      cache_level: cache_everything
      edge_cache_ttl: 604800
      browser_cache_ttl: 31536000

  - pattern: "*.smartacademy.edu.bd/images/*"
    settings:
      cache_level: cache_everything
      edge_cache_ttl: 2592000

# Speed Optimizations
auto_minify:
  javascript: on
  css: on
  html: on

rocket_loader: off  # Can conflict with Next.js
mirage: on
polish: lossless
early_hints: on
```

### 6.2 Cache Headers Strategy
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CDN CACHING STRATEGY                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Content Type          │ Browser Cache │ Edge Cache │ Cache-Control        │
│   ──────────────────────┼───────────────┼────────────┼──────────────────── │
│   HTML pages            │    No-store   │  Bypass    │ no-store             │
│   API responses         │    No-store   │  Bypass    │ no-store             │
│   Static JS/CSS (hashed)│    1 year     │  7 days    │ public, immutable    │
│   Images (static)       │    1 year     │  30 days   │ public, immutable    │
│   User avatars          │    1 hour     │  1 hour    │ public, max-age=3600 │
│   Fonts                 │    1 year     │  30 days   │ public, immutable    │
│   Documents (PDF)       │    1 hour     │  1 hour    │ private              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. SSL/TLS Configuration

### 7.1 SSL Architecture
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SSL/TLS ARCHITECTURE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   CLIENT                                                                     │
│     │                                                                        │
│     │ TLS 1.3 (Encrypted)                                                    │
│     │ Certificate: Cloudflare Universal SSL                                  │
│     │ Trust Chain: DigiCert → Cloudflare → smartacademy.edu.bd              │
│     │                                                                        │
│     ▼                                                                        │
│   CLOUDFLARE EDGE                                                            │
│     │                                                                        │
│     │ Full (Strict) Mode                                                     │
│     │ Certificate: Cloudflare Origin Certificate                             │
│     │ Valid: 15 years (Cloudflare issued)                                    │
│     │ Authenticated Origin Pulls enabled                                     │
│     │                                                                        │
│     ▼                                                                        │
│   NGINX (Origin)                                                             │
│     │                                                                        │
│     │ mTLS Client Verification                                               │
│     │ ssl_verify_client on                                                   │
│     │ ssl_client_certificate cloudflare-ca.pem                               │
│     │                                                                        │
│     ▼                                                                        │
│   APPLICATION (Internal)                                                     │
│     │                                                                        │
│     │ HTTP (internal network only)                                           │
│     │ No SSL termination at app level                                        │
│     │                                                                        │
│     ▼                                                                        │
│   DATABASE (Internal)                                                        │
│       PostgreSQL: SSL mode = prefer                                          │
│       Redis: No TLS (internal network)                                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Certificate Setup
```bash
#!/bin/bash
# scripts/setup-ssl.sh

# Create SSL directory
mkdir -p /etc/nginx/ssl
cd /etc/nginx/ssl

# Download Cloudflare Origin CA Certificate
# (Generate from Cloudflare Dashboard → SSL/TLS → Origin Server)
# Save as cloudflare-origin.pem and cloudflare-origin-key.pem

# Download Cloudflare CA for Authenticated Origin Pulls
curl -o cloudflare-ca.pem https://developers.cloudflare.com/ssl/static/authenticated_origin_pull_ca.pem

# Set permissions
chmod 600 cloudflare-origin-key.pem
chmod 644 cloudflare-origin.pem cloudflare-ca.pem
chown root:root /etc/nginx/ssl/*

# Verify certificate
openssl x509 -in cloudflare-origin.pem -text -noout

# Test Nginx configuration
nginx -t
systemctl reload nginx
```

### 7.3 SSL Security Headers
```nginx
# Add to server block
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(self)" always;

# Content Security Policy
add_header Content-Security-Policy "
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https: blob:;
    connect-src 'self' https://api.smartacademy.edu.bd wss://api.smartacademy.edu.bd;
    frame-ancestors 'self';
    form-action 'self';
    base-uri 'self';
    upgrade-insecure-requests;
" always;
```

---

## 8. Monitoring and Observability

### 8.1 Monitoring Stack
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MONITORING ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                      METRICS COLLECTION                              │   │
│   │                                                                       │   │
│   │   ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐   │   │
│   │   │   Node     │  │  Nginx     │  │ PostgreSQL │  │   Redis    │   │   │
│   │   │  Exporter  │  │  Exporter  │  │  Exporter  │  │  Exporter  │   │   │
│   │   │   :9100    │  │   :9113    │  │   :9187    │  │   :9121    │   │   │
│   │   └──────┬─────┘  └──────┬─────┘  └──────┬─────┘  └──────┬─────┘   │   │
│   │          │               │               │               │          │   │
│   │          └───────────────┴───────────────┴───────────────┘          │   │
│   │                                    │                                 │   │
│   │                                    ▼                                 │   │
│   │   ┌────────────────────────────────────────────────────────────┐    │   │
│   │   │                     PROMETHEUS                              │    │   │
│   │   │                       :9090                                 │    │   │
│   │   │                                                             │    │   │
│   │   │   Retention: 15 days                                        │    │   │
│   │   │   Scrape Interval: 15s                                      │    │   │
│   │   │   Evaluation Interval: 15s                                  │    │   │
│   │   └────────────────────────────────────────────────────────────┘    │   │
│   │                                    │                                 │   │
│   │                                    ▼                                 │   │
│   │   ┌────────────────────────────────────────────────────────────┐    │   │
│   │   │                      GRAFANA                                │    │   │
│   │   │                       :3003                                 │    │   │
│   │   │                                                             │    │   │
│   │   │   Dashboards:                                               │    │   │
│   │   │   • System Overview                                         │    │   │
│   │   │   • Node.js Metrics                                         │    │   │
│   │   │   • Database Performance                                    │    │   │
│   │   │   • API Request Rates                                       │    │   │
│   │   └────────────────────────────────────────────────────────────┘    │   │
│   │                                                                       │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                        LOG AGGREGATION                               │   │
│   │                                                                       │   │
│   │   Application → JSON Logs → Loki → Grafana                           │   │
│   │   Nginx       → Access Logs → Loki → Grafana                         │   │
│   │   System      → Journald → Loki → Grafana                            │   │
│   │                                                                       │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                          ALERTING                                    │   │
│   │                                                                       │   │
│   │   Prometheus → Alertmanager → Email / Slack / PagerDuty              │   │
│   │                                                                       │   │
│   │   Critical Alerts:                                                    │   │
│   │   • Service down (5+ minutes)                                        │   │
│   │   • Error rate > 5%                                                  │   │
│   │   • Response time p95 > 2s                                           │   │
│   │   • Disk usage > 85%                                                 │   │
│   │   • Memory usage > 90%                                               │   │
│   │                                                                       │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Key Performance Indicators (KPIs)
| Metric | Warning | Critical | Action |
|--------|---------|----------|--------|
| Response Time (p95) | > 500ms | > 2000ms | Scale/optimize |
| Error Rate | > 1% | > 5% | Investigate |
| CPU Usage | > 70% | > 90% | Scale out |
| Memory Usage | > 80% | > 95% | Scale up |
| Disk Usage | > 75% | > 90% | Clean/expand |
| Database Connections | > 80% | > 95% | Scale/optimize |
| SSL Certificate Expiry | < 30 days | < 7 days | Renew |
| Uptime | < 99.9% | < 99% | Incident review |

---

## 9. Disaster Recovery

### 9.1 Backup Strategy
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          BACKUP STRATEGY                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Data Type          │ Frequency  │ Retention │ Location         │ Method   │
│   ───────────────────┼────────────┼───────────┼──────────────────┼──────── │
│   PostgreSQL Full    │ Daily 2AM  │ 30 days   │ MinIO + Offsite  │ pg_dump  │
│   PostgreSQL WAL     │ Continuous │ 7 days    │ MinIO            │ Archive  │
│   MySQL Full         │ Daily 2AM  │ 30 days   │ MinIO + Offsite  │ mysqldump│
│   MySQL Binlog       │ Continuous │ 7 days    │ MinIO            │ Archive  │
│   Redis RDB          │ Every 6hr  │ 7 days    │ MinIO            │ BGSAVE   │
│   MinIO Files        │ Daily 3AM  │ 30 days   │ Offsite S3       │ mc mirror│
│   Config Files       │ On change  │ Forever   │ Git repo         │ Git      │
│   SSL Certificates   │ On change  │ Forever   │ Vault/Encrypted  │ Manual   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 9.2 Recovery Time Objectives
| Scenario | RTO | RPO | Recovery Steps |
|----------|-----|-----|----------------|
| Single service failure | 5 min | 0 | Auto-restart via PM2/Docker |
| Server failure | 30 min | 15 min | Restore from backup |
| Database corruption | 1 hour | 5 min | Point-in-time recovery |
| Complete data center failure | 4 hours | 1 hour | DR site activation |
| Ransomware/Security breach | 24 hours | 1 day | Clean restore from backup |

### 9.3 Disaster Recovery Procedures
```bash
#!/bin/bash
# scripts/disaster-recovery.sh

# 1. Assess the situation
echo "Starting disaster recovery assessment..."

# 2. Stop affected services
docker compose down

# 3. Restore from latest backup
# PostgreSQL
pg_restore -h localhost -U postgres -d smart_academy_dev \
  /backups/postgres/latest/smart_academy.dump

# MySQL
mysql -h localhost -u root -p < /backups/mysql/latest/gibbon_moodle.sql

# 4. Restore file storage
mc mirror myminio-backup/smart-academy myminio/smart-academy

# 5. Verify data integrity
pnpm prisma db push --accept-data-loss=false

# 6. Restart services
docker compose up -d

# 7. Run health checks
./scripts/health-check.sh

# 8. Notify stakeholders
./scripts/send-notification.sh "DR Complete"
```

---

## Appendices

### Appendix A: Port Reference
| Port | Service | Protocol | Exposed |
|------|---------|----------|---------|
| 22 | SSH | TCP | Admin IP only |
| 80 | HTTP | TCP | Cloudflare only |
| 443 | HTTPS | TCP | Cloudflare only |
| 3000 | Next.js | TCP | Internal |
| 3001 | Admin | TCP | Internal |
| 4000 | API | TCP | Internal |
| 5432 | PostgreSQL | TCP | Internal |
| 3306 | MySQL | TCP | Internal |
| 6379 | Redis | TCP | Internal |
| 8080 | Gibbon | TCP | Internal |
| 8082 | Moodle | TCP | Internal |
| 9000 | MinIO API | TCP | Internal |
| 9001 | MinIO Console | TCP | Internal |
| 9090 | Prometheus | TCP | Internal |
| 3003 | Grafana | TCP | Internal |

### Appendix B: Quick Reference Commands
```bash
# Check all services
docker compose ps

# View logs
docker compose logs -f --tail=100

# Restart service
docker compose restart api

# Check disk usage
df -h

# Check memory
free -m

# Check CPU
htop

# Test connectivity
curl -I https://smartacademy.edu.bd/health
```

---

## Document History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-10 | Smart Academy Team | Initial document |
