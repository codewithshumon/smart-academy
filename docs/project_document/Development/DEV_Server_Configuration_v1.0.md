# Development Server Configuration

## Document Information
| Field | Value |
|-------|-------|
| **Document ID** | DEV-SRV-001 |
| **Version** | 1.0 |
| **Last Updated** | 2026-01-10 |
| **Author** | Smart Academy Development Team |
| **Status** | Active |

---

## Table of Contents
1. [Overview](#1-overview)
2. [Vite Configuration](#2-vite-configuration)
3. [Hot Module Replacement (HMR)](#3-hot-module-replacement-hmr)
4. [Proxy Configuration](#4-proxy-configuration)
5. [Environment Variables](#5-environment-variables)
6. [HTTPS for Local Development](#6-https-for-local-development)
7. [Port Configuration](#7-port-configuration)
8. [Next.js Configuration](#8-nextjs-configuration)
9. [Fastify Server Configuration](#9-fastify-server-configuration)
10. [Performance Optimization](#10-performance-optimization)

---

## 1. Overview

### 1.1 Purpose
This document provides comprehensive configuration guidelines for development servers in the Smart Academy Digital Portal project. It covers Vite, Next.js, and Fastify server configurations optimized for local development.

### 1.2 Server Architecture
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     DEVELOPMENT SERVER ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                              Browser                                         │
│                                │                                             │
│                    ┌───────────┴───────────┐                                │
│                    ▼                       ▼                                │
│            http://localhost:3000    http://localhost:3001                   │
│                    │                       │                                │
│         ┌─────────┴─────────┐    ┌────────┴────────┐                       │
│         │                   │    │                  │                       │
│         │   Next.js Dev     │    │   Admin Vite    │                       │
│         │   Server (HMR)    │    │   Server (HMR)  │                       │
│         │                   │    │                  │                       │
│         │   ┌───────────┐   │    │  ┌───────────┐  │                       │
│         │   │ Turbopack │   │    │  │   Vite    │  │                       │
│         │   │  Bundler  │   │    │  │  Bundler  │  │                       │
│         │   └───────────┘   │    │  └───────────┘  │                       │
│         │                   │    │                  │                       │
│         └─────────┬─────────┘    └────────┬────────┘                       │
│                   │                       │                                 │
│                   │    /api/* proxy       │                                 │
│                   └───────────┬───────────┘                                │
│                               ▼                                             │
│                    http://localhost:4000                                    │
│                               │                                             │
│                    ┌──────────┴──────────┐                                 │
│                    │                     │                                  │
│                    │   Fastify API       │                                  │
│                    │   Server            │                                  │
│                    │                     │                                  │
│                    │  ┌───────────────┐  │                                 │
│                    │  │  TypeScript   │  │                                 │
│                    │  │  + tsx watch  │  │                                 │
│                    │  └───────────────┘  │                                 │
│                    │                     │                                  │
│                    └──────────┬──────────┘                                 │
│                               │                                             │
│         ┌─────────────────────┼─────────────────────┐                      │
│         │                     │                     │                       │
│         ▼                     ▼                     ▼                       │
│    PostgreSQL:5432       Redis:6379          MinIO:9000                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Technology Versions
| Technology | Version | Purpose |
|------------|---------|---------|
| Vite | 6.x | Admin dashboard bundler |
| Next.js | 15.x | Main web application |
| Turbopack | Latest | Next.js dev bundler |
| Fastify | 5.x | API server |
| tsx | 4.x | TypeScript execution |
| Node.js | 22 LTS | Runtime |

---

## 2. Vite Configuration

### 2.1 Base Configuration
```typescript
// apps/admin/vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig(({ mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      TanStackRouterVite(),
    ],

    // ===========================
    // Server Configuration
    // ===========================
    server: {
      port: 3001,
      strictPort: true,
      host: true, // Listen on all addresses
      open: false, // Don't auto-open browser
      cors: true,

      // HMR Configuration
      hmr: {
        port: 3001,
        host: 'localhost',
        protocol: 'ws',
      },

      // File watching
      watch: {
        usePolling: false, // Set true for Docker/WSL2
        interval: 100,
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/dist/**',
        ],
      },

      // Proxy Configuration
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:4000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy, options) => {
            proxy.on('error', (err, req, res) => {
              console.log('Proxy error:', err)
            })
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('Proxying:', req.method, req.url)
            })
          },
        },
        '/ws': {
          target: 'ws://localhost:4000',
          ws: true,
          changeOrigin: true,
        },
      },

      // Response headers
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    },

    // ===========================
    // Preview Server (Production Preview)
    // ===========================
    preview: {
      port: 3001,
      strictPort: true,
      host: true,
      cors: true,
    },

    // ===========================
    // Build Configuration
    // ===========================
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      target: 'esnext',
      minify: mode === 'production' ? 'esbuild' : false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['@tanstack/react-router'],
            query: ['@tanstack/react-query'],
            ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          },
        },
      },
    },

    // ===========================
    // Resolve Configuration
    // ===========================
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@hooks': '/src/hooks',
        '@utils': '/src/utils',
        '@lib': '/src/lib',
        '@api': '/src/api',
      },
    },

    // ===========================
    // Environment Variables
    // ===========================
    define: {
      __DEV__: mode === 'development',
      __PROD__: mode === 'production',
    },

    // ===========================
    // Optimization
    // ===========================
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        '@tanstack/react-query',
        '@tanstack/react-router',
      ],
      exclude: ['@smart-academy/shared'],
    },

    // ===========================
    // CSS Configuration
    // ===========================
    css: {
      devSourcemap: true,
      postcss: {
        plugins: [],
      },
    },

    // ===========================
    // esbuild Configuration
    // ===========================
    esbuild: {
      jsxInject: undefined,
      target: 'esnext',
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },

    // ===========================
    // Logging
    // ===========================
    logLevel: 'info',
    clearScreen: true,
  }
})
```

### 2.2 Vite Plugins Configuration
```typescript
// apps/admin/vite.config.ts - Extended plugins
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [
    // React with SWC for faster compilation
    react({
      jsxImportSource: '@emotion/react', // If using Emotion
    }),

    // TypeScript path aliases
    tsconfigPaths(),

    // Type checking during development
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
      overlay: {
        initialIsOpen: false,
        position: 'br', // bottom-right
      },
    }),

    // Bundle visualizer (production build only)
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
})
```

---

## 3. Hot Module Replacement (HMR)

### 3.1 Vite HMR Configuration
```typescript
// Vite HMR Settings
server: {
  hmr: {
    // WebSocket port for HMR
    port: 3001,

    // Host for HMR connection
    host: 'localhost',

    // Protocol: 'ws' for HTTP, 'wss' for HTTPS
    protocol: 'ws',

    // Path for HMR WebSocket
    path: undefined, // Default: /__vite_hmr

    // Timeout in milliseconds
    timeout: 30000,

    // Overlay for errors
    overlay: true,

    // Client port (useful with proxies)
    clientPort: undefined,
  },
}
```

### 3.2 HMR with Reverse Proxy (nginx)
```typescript
// When using nginx or other reverse proxy
server: {
  hmr: {
    protocol: 'wss',
    host: 'dev.smartacademy.local',
    clientPort: 443,
    path: '/__vite_hmr',
  },
}
```

```nginx
# nginx.conf for HMR
server {
    listen 443 ssl;
    server_name dev.smartacademy.local;

    # Vite HMR WebSocket
    location /__vite_hmr {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Regular requests
    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 3.3 React Fast Refresh Configuration
```typescript
// vite.config.ts - React Fast Refresh settings
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true,

      // Development-only plugins
      devTarget: 'esnext',
    }),
  ],
})
```

### 3.4 Custom HMR Handling
```typescript
// src/main.tsx - Custom HMR handling
if (import.meta.hot) {
  import.meta.hot.accept()

  // Custom dispose handler
  import.meta.hot.dispose((data) => {
    // Cleanup before module is replaced
    console.log('Disposing module...')
  })

  // Handle HMR errors
  import.meta.hot.on('vite:error', (error) => {
    console.error('HMR Error:', error)
  })

  // Custom update handler
  import.meta.hot.on('vite:beforeUpdate', () => {
    console.log('About to update...')
  })
}
```

### 3.5 Troubleshooting HMR
```typescript
// Debug HMR issues
server: {
  hmr: {
    overlay: true, // Show error overlay
  },
  watch: {
    usePolling: true, // For Docker/WSL2/VMs
    interval: 1000,
  },
}

// Check file watchers limit (Linux)
// echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
// sudo sysctl -p
```

---

## 4. Proxy Configuration

### 4.1 API Proxy Setup
```typescript
// vite.config.ts - Comprehensive proxy configuration
server: {
  proxy: {
    // API Proxy
    '/api': {
      target: 'http://localhost:4000',
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/api/, ''),
      headers: {
        'X-Forwarded-For': 'localhost',
        'X-Forwarded-Proto': 'http',
      },
      configure: (proxy, _options) => {
        proxy.on('error', (err, _req, _res) => {
          console.error('Proxy error:', err.message)
        })
        proxy.on('proxyReq', (proxyReq, req, _res) => {
          console.log('[Proxy]', req.method, req.url, '→', proxyReq.path)
        })
        proxy.on('proxyRes', (proxyRes, req, _res) => {
          console.log('[Proxy]', proxyRes.statusCode, req.url)
        })
      },
    },

    // Authentication Proxy (separate auth service)
    '/auth': {
      target: 'http://localhost:4001',
      changeOrigin: true,
      secure: false,
    },

    // File Upload Proxy
    '/upload': {
      target: 'http://localhost:9000', // MinIO
      changeOrigin: true,
      secure: false,
    },

    // WebSocket Proxy
    '/socket.io': {
      target: 'ws://localhost:4000',
      ws: true,
      changeOrigin: true,
    },

    // Gibbon SIS Proxy (Development)
    '/gibbon': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/gibbon/, ''),
    },

    // Moodle LMS Proxy (Development)
    '/moodle': {
      target: 'http://localhost:8082',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/moodle/, ''),
    },
  },
}
```

### 4.2 Proxy Middleware (Advanced)
```typescript
// vite.config.ts - Custom proxy middleware
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        bypass(req, res, proxyOptions) {
          // Skip proxy for specific requests
          if (req.headers.accept?.includes('text/html')) {
            return '/index.html'
          }

          // Log all API calls
          console.log(`[API] ${req.method} ${req.url}`)

          // Add custom headers
          req.headers['x-request-time'] = Date.now().toString()

          return null // Continue with proxy
        },
      },
    },
  },
})
```

### 4.3 Multiple Environment Proxies
```typescript
// vite.config.ts - Environment-based proxy
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const proxyConfig = {
    development: {
      '/api': 'http://localhost:4000',
    },
    staging: {
      '/api': 'https://staging-api.smartacademy.edu.bd',
    },
    production: {
      '/api': 'https://api.smartacademy.edu.bd',
    },
  }

  return {
    server: {
      proxy: Object.fromEntries(
        Object.entries(proxyConfig[mode] || proxyConfig.development).map(
          ([path, target]) => [
            path,
            {
              target,
              changeOrigin: true,
              secure: mode === 'production',
            },
          ]
        )
      ),
    },
  }
})
```

---

## 5. Environment Variables

### 5.1 Environment File Structure
```
smart-academy/
├── .env                      # Shared defaults (committed)
├── .env.local               # Local overrides (not committed)
├── .env.development         # Development mode
├── .env.development.local   # Local dev overrides
├── .env.production          # Production mode
├── .env.production.local    # Local prod overrides
├── .env.test                # Test mode
└── apps/
    ├── web/
    │   ├── .env.local       # Next.js specific
    │   └── .env.development
    ├── admin/
    │   ├── .env.local       # Vite specific
    │   └── .env.development
    └── api/
        ├── .env.local       # Fastify specific
        └── .env.development
```

### 5.2 Root Environment Variables
```bash
# .env (Root - Shared across all apps)

# ===========================
# Application
# ===========================
NODE_ENV=development

# ===========================
# Database
# ===========================
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/smart_academy_dev"
MYSQL_URL="mysql://root:root@localhost:3306/gibbon_dev"

# ===========================
# Redis
# ===========================
REDIS_URL="redis://localhost:6379"
REDIS_PASSWORD=""

# ===========================
# JWT Configuration
# ===========================
JWT_ACCESS_SECRET="dev-access-secret-min-32-chars-long"
JWT_REFRESH_SECRET="dev-refresh-secret-min-32-chars-long"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# ===========================
# API Configuration
# ===========================
API_HOST="0.0.0.0"
API_PORT=4000
API_PREFIX="/api/v1"

# ===========================
# Storage (MinIO)
# ===========================
MINIO_ENDPOINT="localhost"
MINIO_PORT=9000
MINIO_ACCESS_KEY="minioadmin"
MINIO_SECRET_KEY="minioadmin"
MINIO_BUCKET="smart-academy-dev"
MINIO_USE_SSL=false
```

### 5.3 Vite Environment Variables
```bash
# apps/admin/.env.development

# Public variables (exposed to client - prefix with VITE_)
VITE_APP_NAME="Smart Academy Admin"
VITE_APP_VERSION="1.0.0"
VITE_API_URL="http://localhost:4000"
VITE_WS_URL="ws://localhost:4000"
VITE_STORAGE_URL="http://localhost:9000"

# Build configuration
VITE_ENABLE_DEVTOOLS=true
VITE_ENABLE_MOCK_API=false

# Feature flags
VITE_FEATURE_DARK_MODE=true
VITE_FEATURE_ANALYTICS=false
```

### 5.4 Next.js Environment Variables
```bash
# apps/web/.env.development

# Public variables (exposed to client - prefix with NEXT_PUBLIC_)
NEXT_PUBLIC_APP_NAME="Smart Academy"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:4000"
NEXT_PUBLIC_WS_URL="ws://localhost:4000"
NEXT_PUBLIC_STORAGE_URL="http://localhost:9000"

# Server-only variables (no prefix)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/smart_academy_dev"
JWT_SECRET="server-side-jwt-secret"

# Feature flags
NEXT_PUBLIC_FEATURE_DARK_MODE=true
NEXT_PUBLIC_FEATURE_ANALYTICS=false
```

### 5.5 Fastify Environment Variables
```bash
# apps/api/.env.development

# Server
HOST="0.0.0.0"
PORT=4000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/smart_academy_dev"
DATABASE_POOL_SIZE=10
DATABASE_LOG_QUERIES=true

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_ACCESS_SECRET="dev-access-secret-min-32-chars-long"
JWT_REFRESH_SECRET="dev-refresh-secret-min-32-chars-long"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=60000

# Logging
LOG_LEVEL=debug
LOG_PRETTY=true

# CORS
CORS_ORIGIN="http://localhost:3000,http://localhost:3001"
CORS_CREDENTIALS=true

# File Upload
MAX_FILE_SIZE=10485760
ALLOWED_MIME_TYPES="image/jpeg,image/png,image/webp,application/pdf"
```

### 5.6 Environment Validation
```typescript
// packages/config/src/env.ts
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  API_PORT: z.coerce.number().default(4000),
})

export type Env = z.infer<typeof envSchema>

export function validateEnv(): Env {
  const result = envSchema.safeParse(process.env)

  if (!result.success) {
    console.error('❌ Invalid environment variables:')
    console.error(result.error.format())
    process.exit(1)
  }

  return result.data
}

export const env = validateEnv()
```

### 5.7 Type-Safe Environment Access
```typescript
// apps/admin/src/env.ts (Vite)
import { z } from 'zod'

const envSchema = z.object({
  VITE_APP_NAME: z.string(),
  VITE_API_URL: z.string().url(),
  VITE_WS_URL: z.string(),
  VITE_ENABLE_DEVTOOLS: z.string().transform((v) => v === 'true'),
})

export const env = envSchema.parse(import.meta.env)
```

---

## 6. HTTPS for Local Development

### 6.1 Generate SSL Certificates
```bash
#!/bin/bash
# scripts/generate-certs.sh

# Create certs directory
mkdir -p .certs

# Generate CA (Certificate Authority)
openssl genrsa -out .certs/ca.key 4096
openssl req -x509 -new -nodes -key .certs/ca.key -sha256 -days 1024 \
  -out .certs/ca.crt \
  -subj "/C=BD/ST=Dhaka/L=Dhaka/O=Smart Academy/OU=Development/CN=Smart Academy CA"

# Generate server key
openssl genrsa -out .certs/server.key 2048

# Create certificate signing request
openssl req -new -key .certs/server.key -out .certs/server.csr \
  -subj "/C=BD/ST=Dhaka/L=Dhaka/O=Smart Academy/OU=Development/CN=localhost"

# Create certificate config
cat > .certs/server.ext << EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = *.localhost
DNS.3 = smartacademy.local
DNS.4 = *.smartacademy.local
IP.1 = 127.0.0.1
IP.2 = ::1
EOF

# Generate server certificate
openssl x509 -req -in .certs/server.csr -CA .certs/ca.crt -CAkey .certs/ca.key \
  -CAcreateserial -out .certs/server.crt -days 365 -sha256 -extfile .certs/server.ext

echo "✅ SSL certificates generated in .certs/"
echo "⚠️  Add .certs/ca.crt to your system's trusted certificates"
```

### 6.2 Trust Certificate (Linux)
```bash
# Ubuntu/Debian
sudo cp .certs/ca.crt /usr/local/share/ca-certificates/smart-academy-ca.crt
sudo update-ca-certificates

# Fedora/RHEL
sudo cp .certs/ca.crt /etc/pki/ca-trust/source/anchors/smart-academy-ca.crt
sudo update-ca-trust

# For Chrome/Firefox, import ca.crt manually in browser settings
```

### 6.3 Vite HTTPS Configuration
```typescript
// vite.config.ts - HTTPS configuration
import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '.certs/server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, '.certs/server.crt')),
    },
    port: 3001,
    host: true,
    hmr: {
      protocol: 'wss',
      host: 'localhost',
    },
  },
})
```

### 6.4 Using @vitejs/plugin-basic-ssl (Simple Alternative)
```typescript
// vite.config.ts - Quick SSL setup
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [basicSsl()],
  server: {
    https: true,
    port: 3001,
  },
})
```

### 6.5 Next.js HTTPS Configuration
```javascript
// next.config.js - HTTPS for development
const fs = require('fs')
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // HTTPS handled via custom server
}

module.exports = nextConfig
```

```typescript
// server.ts - Custom HTTPS server for Next.js
import https from 'https'
import fs from 'fs'
import { parse } from 'url'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const httpsOptions = {
  key: fs.readFileSync('./.certs/server.key'),
  cert: fs.readFileSync('./.certs/server.crt'),
}

app.prepare().then(() => {
  https.createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  }).listen(3000, () => {
    console.log('> Ready on https://localhost:3000')
  })
})
```

---

## 7. Port Configuration

### 7.1 Port Allocation Matrix
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PORT ALLOCATION MATRIX                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Application Servers                                                         │
│  ─────────────────────────────────────────────────────────────────────────  │
│  Port    │ Service              │ Protocol │ Description                    │
│  ────────┼──────────────────────┼──────────┼────────────────────────────── │
│  3000    │ Next.js (Web)        │ HTTP     │ Parent/Student Portal          │
│  3001    │ Vite (Admin)         │ HTTP     │ Admin Dashboard                │
│  4000    │ Fastify (API)        │ HTTP     │ REST API Server                │
│  4001    │ Auth Service         │ HTTP     │ Authentication (if separate)   │
│  8083    │ Expo Dev Server      │ HTTP     │ React Native Development       │
│                                                                              │
│  Database Servers                                                            │
│  ─────────────────────────────────────────────────────────────────────────  │
│  Port    │ Service              │ Protocol │ Description                    │
│  ────────┼──────────────────────┼──────────┼────────────────────────────── │
│  5432    │ PostgreSQL           │ TCP      │ Primary Database               │
│  3306    │ MySQL                │ TCP      │ Gibbon/Moodle Database         │
│  6379    │ Redis                │ TCP      │ Cache/Session Store            │
│                                                                              │
│  External Services                                                           │
│  ─────────────────────────────────────────────────────────────────────────  │
│  Port    │ Service              │ Protocol │ Description                    │
│  ────────┼──────────────────────┼──────────┼────────────────────────────── │
│  8080    │ Gibbon SIS           │ HTTP     │ School Information System      │
│  8081    │ Gibbon Admin         │ HTTP     │ Gibbon Administration          │
│  8082    │ Moodle LMS           │ HTTP     │ Learning Management System     │
│  9000    │ MinIO API            │ HTTP     │ S3-compatible Storage          │
│  9001    │ MinIO Console        │ HTTP     │ MinIO Web Interface            │
│                                                                              │
│  Development Tools                                                           │
│  ─────────────────────────────────────────────────────────────────────────  │
│  Port    │ Service              │ Protocol │ Description                    │
│  ────────┼──────────────────────┼──────────┼────────────────────────────── │
│  5555    │ Prisma Studio        │ HTTP     │ Database GUI                   │
│  9229    │ Node Inspector       │ TCP      │ Node.js Debugging              │
│  6006    │ Storybook            │ HTTP     │ Component Documentation        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Port Checking Script
```bash
#!/bin/bash
# scripts/check-ports.sh

ports=(3000 3001 4000 5432 3306 6379 8080 8081 8082 9000 9001)

echo "Checking port availability..."
echo "================================"

for port in "${ports[@]}"; do
  if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
    pid=$(lsof -t -i:$port)
    process=$(ps -p $pid -o comm=)
    echo "❌ Port $port: IN USE by $process (PID: $pid)"
  else
    echo "✅ Port $port: Available"
  fi
done
```

### 7.3 Kill Port Script
```bash
#!/bin/bash
# scripts/kill-port.sh

if [ -z "$1" ]; then
  echo "Usage: ./kill-port.sh <port>"
  exit 1
fi

port=$1
pid=$(lsof -t -i:$port)

if [ -z "$pid" ]; then
  echo "No process found on port $port"
else
  echo "Killing process $pid on port $port"
  kill -9 $pid
  echo "Done"
fi
```

---

## 8. Next.js Configuration

### 8.1 Complete Next.js Configuration
```javascript
// apps/web/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ===========================
  // React Configuration
  // ===========================
  reactStrictMode: true,

  // ===========================
  // Experimental Features
  // ===========================
  experimental: {
    // Turbopack for development (faster builds)
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },

    // Server Actions
    serverActions: {
      bodySizeLimit: '2mb',
    },

    // Partial prerendering
    ppr: true,
  },

  // ===========================
  // TypeScript Configuration
  // ===========================
  typescript: {
    // Type checking during build
    ignoreBuildErrors: false,
  },

  // ===========================
  // ESLint Configuration
  // ===========================
  eslint: {
    // Lint during build
    ignoreDuringBuilds: false,
    dirs: ['src'],
  },

  // ===========================
  // Image Optimization
  // ===========================
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.smartacademy.edu.bd',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ===========================
  // Headers Configuration
  // ===========================
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  // ===========================
  // Rewrites (Proxy-like)
  // ===========================
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ]
  },

  // ===========================
  // Redirects
  // ===========================
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/overview',
        permanent: true,
      },
    ]
  },

  // ===========================
  // Webpack Configuration
  // ===========================
  webpack: (config, { dev, isServer }) => {
    // SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    // Source maps in development
    if (dev) {
      config.devtool = 'eval-source-map'
    }

    return config
  },

  // ===========================
  // Output Configuration
  // ===========================
  output: 'standalone',
  distDir: '.next',

  // ===========================
  // Compiler Options
  // ===========================
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // ===========================
  // Logging
  // ===========================
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // ===========================
  // Environment Variables
  // ===========================
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },

  // ===========================
  // Powered By Header
  // ===========================
  poweredByHeader: false,

  // ===========================
  // Trailing Slash
  // ===========================
  trailingSlash: false,

  // ===========================
  // Page Extensions
  // ===========================
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
}

module.exports = nextConfig
```

### 8.2 Turbopack Configuration
```javascript
// next.config.js - Turbopack specific settings
const nextConfig = {
  experimental: {
    turbo: {
      // Module resolution
      resolveAlias: {
        '@': './src',
        '@components': './src/components',
        '@lib': './src/lib',
      },

      // File extension resolution
      resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],

      // Loader rules
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
        '*.graphql': {
          loaders: ['graphql-tag/loader'],
          as: '*.js',
        },
      },
    },
  },
}
```

---

## 9. Fastify Server Configuration

### 9.1 Complete Server Configuration
```typescript
// apps/api/src/server.ts
import Fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import compress from '@fastify/compress'
import cookie from '@fastify/cookie'
import jwt from '@fastify/jwt'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { env } from './config/env'

export async function buildServer(): Promise<FastifyInstance> {
  const fastify = Fastify({
    // ===========================
    // Logging Configuration
    // ===========================
    logger: {
      level: env.LOG_LEVEL,
      transport: env.LOG_PRETTY
        ? {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
              colorize: true,
            },
          }
        : undefined,
    },

    // ===========================
    // Request Configuration
    // ===========================
    bodyLimit: 10 * 1024 * 1024, // 10MB
    maxParamLength: 200,

    // ===========================
    // Connection Configuration
    // ===========================
    connectionTimeout: 30000,
    keepAliveTimeout: 5000,

    // ===========================
    // Trust Proxy
    // ===========================
    trustProxy: true,

    // ===========================
    // Request ID
    // ===========================
    genReqId: () => crypto.randomUUID(),
    requestIdHeader: 'x-request-id',

    // ===========================
    // Case Sensitive Routing
    // ===========================
    caseSensitive: true,
    ignoreDuplicateSlashes: true,
    ignoreTrailingSlash: true,

    // ===========================
    // AJV Configuration (Validation)
    // ===========================
    ajv: {
      customOptions: {
        removeAdditional: 'all',
        coerceTypes: true,
        useDefaults: true,
        allErrors: true,
      },
    },
  })

  // ===========================
  // Security Plugins
  // ===========================
  await fastify.register(helmet, {
    contentSecurityPolicy: false, // Handled separately
    crossOriginEmbedderPolicy: false,
  })

  await fastify.register(cors, {
    origin: env.CORS_ORIGIN.split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
    exposedHeaders: ['X-Request-ID', 'X-RateLimit-Limit', 'X-RateLimit-Remaining'],
    maxAge: 86400,
  })

  await fastify.register(rateLimit, {
    max: env.RATE_LIMIT_MAX,
    timeWindow: env.RATE_LIMIT_WINDOW_MS,
    cache: 10000,
    allowList: ['127.0.0.1', '::1'],
    keyGenerator: (req) => req.ip,
    errorResponseBuilder: (req, context) => ({
      statusCode: 429,
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Try again in ${context.after}`,
      retryAfter: context.after,
    }),
  })

  // ===========================
  // Compression
  // ===========================
  await fastify.register(compress, {
    global: true,
    threshold: 1024,
    encodings: ['gzip', 'deflate'],
  })

  // ===========================
  // Cookie Support
  // ===========================
  await fastify.register(cookie, {
    secret: env.COOKIE_SECRET,
    parseOptions: {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  })

  // ===========================
  // JWT Authentication
  // ===========================
  await fastify.register(jwt, {
    secret: {
      private: env.JWT_ACCESS_SECRET,
      public: env.JWT_ACCESS_SECRET,
    },
    sign: {
      algorithm: 'HS256',
      expiresIn: env.JWT_ACCESS_EXPIRES_IN,
    },
    cookie: {
      cookieName: 'accessToken',
      signed: true,
    },
  })

  // ===========================
  // API Documentation (Development)
  // ===========================
  if (env.NODE_ENV === 'development') {
    await fastify.register(swagger, {
      openapi: {
        info: {
          title: 'Smart Academy API',
          description: 'API documentation for Smart Academy Digital Portal',
          version: '1.0.0',
        },
        servers: [
          { url: `http://localhost:${env.PORT}`, description: 'Development' },
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
      },
    })

    await fastify.register(swaggerUi, {
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'list',
        deepLinking: true,
      },
    })
  }

  // ===========================
  // Health Check
  // ===========================
  fastify.get('/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: env.NODE_ENV,
  }))

  // ===========================
  // Graceful Shutdown
  // ===========================
  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM']
  for (const signal of signals) {
    process.on(signal, async () => {
      fastify.log.info({ signal }, 'Received signal, shutting down...')
      await fastify.close()
      process.exit(0)
    })
  }

  return fastify
}
```

### 9.2 Development Server Entry
```typescript
// apps/api/src/index.ts
import { buildServer } from './server'
import { env } from './config/env'

async function main() {
  const server = await buildServer()

  try {
    await server.listen({
      host: env.HOST,
      port: env.PORT,
    })

    console.log(`
┌─────────────────────────────────────────────┐
│                                             │
│   🚀 Smart Academy API Server               │
│                                             │
│   Local:   http://localhost:${env.PORT}         │
│   Network: http://${env.HOST}:${env.PORT}         │
│   Docs:    http://localhost:${env.PORT}/docs    │
│   Health:  http://localhost:${env.PORT}/health  │
│                                             │
│   Environment: ${env.NODE_ENV.padEnd(26)}│
│                                             │
└─────────────────────────────────────────────┘
    `)
  } catch (error) {
    server.log.error(error)
    process.exit(1)
  }
}

main()
```

### 9.3 Development with tsx
```json
// apps/api/package.json
{
  "scripts": {
    "dev": "tsx watch --clear-screen=false src/index.ts",
    "dev:debug": "tsx watch --inspect src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

---

## 10. Performance Optimization

### 10.1 Vite Performance Configuration
```typescript
// vite.config.ts - Performance optimizations
export default defineConfig({
  // Pre-bundling optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@tanstack/react-query',
      'zod',
    ],
    exclude: ['@smart-academy/shared'],
    esbuildOptions: {
      target: 'esnext',
    },
  },

  // Build optimization
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react'
            if (id.includes('@tanstack')) return 'vendor-tanstack'
            if (id.includes('@radix-ui')) return 'vendor-radix'
            return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },

  // CSS optimization
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      drafts: {
        customMedia: true,
      },
    },
  },
})
```

### 10.2 Memory Optimization
```bash
# Increase Node.js memory for large projects
export NODE_OPTIONS="--max-old-space-size=8192"

# Add to package.json scripts
{
  "scripts": {
    "dev": "NODE_OPTIONS='--max-old-space-size=8192' vite",
    "build": "NODE_OPTIONS='--max-old-space-size=8192' vite build"
  }
}
```

### 10.3 Startup Time Optimization
```typescript
// vite.config.ts - Faster dev startup
export default defineConfig({
  server: {
    warmup: {
      // Pre-transform frequently used files
      clientFiles: [
        './src/main.tsx',
        './src/App.tsx',
        './src/components/index.ts',
      ],
    },
  },

  // Skip type checking during dev (use IDE instead)
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        skipLibCheck: true,
      },
    },
  },
})
```

---

## Appendices

### Appendix A: Quick Reference Commands
```bash
# Development Servers
pnpm dev              # Start all dev servers
pnpm dev:web          # Next.js on :3000
pnpm dev:admin        # Vite on :3001
pnpm dev:api          # Fastify on :4000

# Port Management
./scripts/check-ports.sh      # Check port availability
./scripts/kill-port.sh 3000   # Kill process on port

# SSL Certificates
./scripts/generate-certs.sh   # Generate dev SSL certs
```

### Appendix B: Troubleshooting

#### HMR Not Working
1. Check inotify watchers limit
2. Verify WebSocket connection in browser console
3. Clear Vite cache: `rm -rf node_modules/.vite`

#### Slow Dev Server
1. Increase Node.js memory
2. Exclude large folders from watching
3. Use SWC instead of Babel

#### Proxy Errors
1. Verify API server is running
2. Check CORS configuration
3. Review proxy logs in terminal

---

## Document History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-10 | Smart Academy Team | Initial document |
