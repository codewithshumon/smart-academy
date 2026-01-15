# Technology Stack Document
## Smart Academy Digital Portal
### Version 1.0

---

## Document Control

| Field | Value |
|-------|-------|
| Document ID | SA-ARCH-TECH-001 |
| Version | 1.0 |
| Status | Draft |
| Created Date | 2026-01-10 |
| Last Updated | 2026-01-10 |
| Author | Development Team |
| Approved By | Project Stakeholders |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Technology Selection Criteria](#2-technology-selection-criteria)
3. [Frontend Technologies](#3-frontend-technologies)
4. [Backend Technologies](#4-backend-technologies)
5. [Database Technologies](#5-database-technologies)
6. [Mobile Technologies](#6-mobile-technologies)
7. [DevOps & Infrastructure](#7-devops--infrastructure)
8. [Third-Party Integrations](#8-third-party-integrations)
9. [Development Tools](#9-development-tools)
10. [Security Technologies](#10-security-technologies)
11. [Technology Comparison Matrix](#11-technology-comparison-matrix)
12. [Version Compatibility Matrix](#12-version-compatibility-matrix)

---

## 1. Executive Summary

### 1.1 Technology Stack Overview

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                        SMART ACADEMY TECHNOLOGY STACK                                        │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                              │
│   ┌───────────────────────────────────────────────────────────────────────────────────┐     │
│   │                              PRESENTATION LAYER                                    │     │
│   │                                                                                    │     │
│   │   Web: Next.js 15 + React 19 + TypeScript 5.x + Tailwind CSS 4.x                 │     │
│   │   Mobile: React Native 0.76+ + Expo 52+ + TypeScript                              │     │
│   │                                                                                    │     │
│   └───────────────────────────────────────────────────────────────────────────────────┘     │
│                                                                                              │
│   ┌───────────────────────────────────────────────────────────────────────────────────┐     │
│   │                              APPLICATION LAYER                                     │     │
│   │                                                                                    │     │
│   │   API: Fastify 5.x + Node.js 22 LTS                                               │     │
│   │   ORM: Prisma 6.x                                                                 │     │
│   │   Queue: BullMQ + Redis                                                           │     │
│   │   Auth: JWT + Passport.js                                                         │     │
│   │                                                                                    │     │
│   └───────────────────────────────────────────────────────────────────────────────────┘     │
│                                                                                              │
│   ┌───────────────────────────────────────────────────────────────────────────────────┐     │
│   │                              INTEGRATION LAYER                                     │     │
│   │                                                                                    │     │
│   │   Gibbon SMS: PHP 8.3+ + MySQL 8.0                                                │     │
│   │   Moodle LMS: PHP 8.3+ + MySQL 8.0                                                │     │
│   │                                                                                    │     │
│   └───────────────────────────────────────────────────────────────────────────────────┘     │
│                                                                                              │
│   ┌───────────────────────────────────────────────────────────────────────────────────┐     │
│   │                                DATA LAYER                                          │     │
│   │                                                                                    │     │
│   │   Primary: PostgreSQL 16+                                                         │     │
│   │   Legacy: MySQL 8.0 (Gibbon/Moodle)                                               │     │
│   │   Cache: Redis 7+                                                                 │     │
│   │   Search: Meilisearch 1.x (optional)                                              │     │
│   │   Storage: MinIO / S3                                                             │     │
│   │                                                                                    │     │
│   └───────────────────────────────────────────────────────────────────────────────────┘     │
│                                                                                              │
│   ┌───────────────────────────────────────────────────────────────────────────────────┐     │
│   │                            INFRASTRUCTURE LAYER                                    │     │
│   │                                                                                    │     │
│   │   Container: Docker + Docker Compose                                              │     │
│   │   Reverse Proxy: Nginx / Caddy                                                    │     │
│   │   CI/CD: GitHub Actions                                                           │     │
│   │   Monitoring: Prometheus + Grafana (optional)                                     │     │
│   │                                                                                    │     │
│   └───────────────────────────────────────────────────────────────────────────────────┘     │
│                                                                                              │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Key Technology Decisions

| Layer | Technology | Version | Justification |
|-------|------------|---------|---------------|
| Frontend Framework | Next.js | 15.x | SSR, App Router, React Server Components |
| UI Framework | React | 19.x | Concurrent features, improved performance |
| Mobile | React Native + Expo | 52+ | Code sharing, rapid development |
| Backend Runtime | Node.js | 22 LTS | Long-term support, modern features |
| API Framework | Fastify | 5.x | High performance, TypeScript support |
| ORM | Prisma | 6.x | Type safety, migrations, multi-database |
| Primary Database | PostgreSQL | 16+ | Advanced features, reliability |
| Cache | Redis | 7+ | Sessions, queues, caching |
| Build Tool | Vite | 6.x | Fast HMR, modern bundling |

---

## 2. Technology Selection Criteria

### 2.1 Selection Framework

Technologies were evaluated based on the following criteria:

| Criterion | Weight | Description |
|-----------|--------|-------------|
| Developer Experience | 25% | Ease of use, documentation, learning curve |
| Performance | 20% | Speed, scalability, resource efficiency |
| Community & Support | 15% | Active community, enterprise support |
| Solo Developer Fit | 15% | Manageable complexity, maintenance burden |
| Security | 10% | Built-in security features, audit history |
| Cost | 10% | Licensing, operational costs |
| Future Proof | 5% | Long-term viability, roadmap |

### 2.2 Solo Developer Considerations

As this project is developed by a solo full-stack developer, special emphasis was placed on:

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                        SOLO DEVELOPER OPTIMIZATION CRITERIA                          │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│   ✓ Unified Language Stack                                                          │
│     TypeScript across frontend, backend, and mobile                                 │
│     → Reduces context switching, maximizes code reuse                               │
│                                                                                      │
│   ✓ Monorepo Architecture                                                           │
│     pnpm workspaces for shared packages                                             │
│     → Single repository, unified tooling, easier maintenance                        │
│                                                                                      │
│   ✓ Type Safety                                                                     │
│     Prisma ORM with generated types                                                 │
│     → Catch errors at compile time, reduce runtime bugs                             │
│                                                                                      │
│   ✓ Hot Module Replacement                                                          │
│     Vite for instant feedback                                                       │
│     → Faster development iteration                                                  │
│                                                                                      │
│   ✓ Excellent Documentation                                                         │
│     All selected technologies have comprehensive docs                               │
│     → Self-service learning, reduce dependency on external help                     │
│                                                                                      │
│   ✓ Active Community                                                                │
│     Large npm ecosystems, Stack Overflow presence                                   │
│     → Solutions available for common problems                                       │
│                                                                                      │
│   ✓ Low Operational Overhead                                                        │
│     Docker Compose for local development                                            │
│     → Simple infrastructure management                                              │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Frontend Technologies

### 3.1 Next.js 15

#### 3.1.1 Overview

| Attribute | Value |
|-----------|-------|
| Version | 15.x (latest stable) |
| Category | React Framework |
| License | MIT |
| Vendor | Vercel |

#### 3.1.2 Selection Rationale

| Factor | Rating | Justification |
|--------|--------|---------------|
| Server-Side Rendering | ★★★★★ | Built-in SSR/SSG/ISR support |
| App Router | ★★★★★ | Modern file-based routing |
| React Server Components | ★★★★★ | Reduced client bundle size |
| API Routes | ★★★★☆ | Built-in API endpoints |
| TypeScript Support | ★★★★★ | First-class TypeScript support |
| Developer Experience | ★★★★★ | Fast refresh, excellent tooling |
| Performance | ★★★★★ | Automatic optimizations |
| Learning Curve | ★★★★☆ | React knowledge required |

#### 3.1.3 Key Features Used

```typescript
// App Router with layouts
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

// Server Components for data fetching
// app/students/page.tsx
async function StudentsPage() {
  const students = await getStudents(); // Server-side fetch
  return <StudentList students={students} />;
}

// API Routes
// app/api/students/route.ts
export async function GET(request: Request) {
  const students = await prisma.student.findMany();
  return Response.json(students);
}
```

#### 3.1.4 Alternatives Considered

| Framework | Pros | Cons | Decision |
|-----------|------|------|----------|
| Remix | Full-stack, good DX | Smaller ecosystem | Not selected |
| Nuxt.js | Vue-based, mature | Different ecosystem | Not selected |
| SvelteKit | Fast, small bundles | Smaller community | Not selected |
| Astro | Content-focused | Limited interactivity | Not selected |

---

### 3.2 React 19

#### 3.2.1 Overview

| Attribute | Value |
|-----------|-------|
| Version | 19.x |
| Category | UI Library |
| License | MIT |
| Vendor | Meta (Facebook) |

#### 3.2.2 Key Features

```typescript
// Concurrent Features
function StudentDashboard() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <StudentStats />
      <RecentActivity />
      <UpcomingClasses />
    </Suspense>
  );
}

// Server Actions (React 19)
async function submitAttendance(formData: FormData) {
  'use server';
  const studentId = formData.get('studentId');
  const status = formData.get('status');
  await markAttendance(studentId, status);
  revalidatePath('/attendance');
}

// useOptimistic Hook
function PaymentButton({ invoiceId }: { invoiceId: string }) {
  const [optimisticStatus, setOptimisticStatus] = useOptimistic('pending');

  async function handlePayment() {
    setOptimisticStatus('processing');
    await processPayment(invoiceId);
  }

  return <Button onClick={handlePayment}>{optimisticStatus}</Button>;
}
```

---

### 3.3 Tailwind CSS 4.x

#### 3.3.1 Overview

| Attribute | Value |
|-----------|-------|
| Version | 4.x |
| Category | CSS Framework |
| License | MIT |
| Vendor | Tailwind Labs |

#### 3.3.2 Selection Rationale

| Factor | Rating | Justification |
|--------|--------|---------------|
| Utility-First | ★★★★★ | Rapid UI development |
| Customization | ★★★★★ | Highly configurable |
| Bundle Size | ★★★★★ | PurgeCSS removes unused styles |
| Responsive Design | ★★★★★ | Mobile-first utilities |
| Dark Mode | ★★★★★ | Built-in dark mode support |
| Component Libraries | ★★★★☆ | Headless UI, shadcn/ui |
| Learning Curve | ★★★★☆ | Different paradigm |

#### 3.3.3 Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          // ... Smart Academy brand colors
          600: '#16a34a',
          700: '#15803d',
        },
        islamic: {
          gold: '#d4af37',
          green: '#006400',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Bengali', 'sans-serif'],
        arabic: ['Amiri', 'Traditional Arabic', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
```

---

### 3.4 Vite 6.x

#### 3.4.1 Overview

| Attribute | Value |
|-----------|-------|
| Version | 6.x |
| Category | Build Tool |
| License | MIT |
| Vendor | Evan You / Vite Team |

#### 3.4.2 Selection Rationale

| Factor | Rating | Justification |
|--------|--------|---------------|
| Dev Server Speed | ★★★★★ | Instant startup with ESM |
| HMR Performance | ★★★★★ | Sub-100ms updates |
| Build Speed | ★★★★★ | Rollup-based production builds |
| Plugin Ecosystem | ★★★★☆ | Growing, Rollup compatible |
| TypeScript Support | ★★★★★ | Native TypeScript support |
| SSR Support | ★★★★☆ | Framework integration |

#### 3.4.3 Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  server: {
    port: 3000,
    hmr: {
      overlay: true,
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
});
```

---

### 3.5 TypeScript 5.x

#### 3.5.1 Overview

| Attribute | Value |
|-----------|-------|
| Version | 5.x |
| Category | Programming Language |
| License | Apache 2.0 |
| Vendor | Microsoft |

#### 3.5.2 Selection Rationale

| Factor | Rating | Justification |
|--------|--------|---------------|
| Type Safety | ★★★★★ | Compile-time error detection |
| IDE Support | ★★★★★ | IntelliSense, refactoring |
| Documentation | ★★★★★ | Types serve as documentation |
| Ecosystem | ★★★★★ | Nearly universal adoption |
| Performance | ★★★★★ | No runtime overhead |
| Learning Curve | ★★★★☆ | Additional complexity |

#### 3.5.3 Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"]
    }
  }
}
```

---

## 4. Backend Technologies

### 4.1 Node.js 22 LTS

#### 4.1.1 Overview

| Attribute | Value |
|-----------|-------|
| Version | 22 LTS |
| Category | Runtime |
| License | MIT |
| Vendor | OpenJS Foundation |

#### 4.1.2 Selection Rationale

| Factor | Rating | Justification |
|--------|--------|---------------|
| Performance | ★★★★★ | V8 engine optimizations |
| npm Ecosystem | ★★★★★ | Largest package registry |
| TypeScript Support | ★★★★★ | Native ESM, type stripping (22.6+) |
| Async/Await | ★★★★★ | Non-blocking I/O |
| Long-Term Support | ★★★★★ | LTS until April 2027 |
| Solo Dev Friendly | ★★★★★ | Same language as frontend |

#### 4.1.3 Key Features

```typescript
// Native fetch API (Node 18+)
const response = await fetch('https://api.example.com/data');

// Native test runner (Node 20+)
import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';

describe('Student Service', () => {
  it('should create a student', async () => {
    const student = await createStudent({ name: 'Test' });
    assert.ok(student.id);
  });
});

// Permission model for security (Node 20+)
// node --experimental-permission --allow-fs-read=./data app.js
```

#### 4.1.4 Alternatives Considered

| Runtime | Pros | Cons | Decision |
|---------|------|------|----------|
| Deno | Security, TypeScript native | Smaller ecosystem | Not selected |
| Bun | Speed, all-in-one | Less mature | Not selected |
| Go | Performance, compiled | Different language | Not selected |

---

### 4.2 Fastify 5.x

#### 4.2.1 Overview

| Attribute | Value |
|-----------|-------|
| Version | 5.x |
| Category | Web Framework |
| License | MIT |
| Vendor | Fastify Team |

#### 4.2.2 Selection Rationale

| Factor | Rating | Justification |
|--------|--------|---------------|
| Performance | ★★★★★ | Fastest Node.js framework |
| TypeScript Support | ★★★★★ | First-class TypeScript |
| Plugin System | ★★★★★ | Modular architecture |
| Validation | ★★★★★ | JSON Schema validation |
| Documentation | ★★★★★ | Comprehensive docs |
| Learning Curve | ★★★★☆ | Express-like but different |

#### 4.2.3 Benchmark Comparison

```
Framework            Requests/sec    Latency (avg)
─────────────────────────────────────────────────
Fastify 5.x          75,000+         0.5ms
Express 4.x          35,000          1.2ms
Koa 2.x              45,000          0.9ms
Hapi 21.x            25,000          1.8ms
```

#### 4.2.4 Implementation Example

```typescript
// src/server.ts
import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import swagger from '@fastify/swagger';
import { studentRoutes } from './routes/students';
import { authRoutes } from './routes/auth';

const app = Fastify({
  logger: true,
  trustProxy: true,
});

// Plugins
await app.register(cors, { origin: true });
await app.register(jwt, { secret: process.env.JWT_SECRET! });
await app.register(swagger, {
  openapi: {
    info: {
      title: 'Smart Academy API',
      version: '1.0.0',
    },
  },
});

// Routes
await app.register(authRoutes, { prefix: '/api/v1/auth' });
await app.register(studentRoutes, { prefix: '/api/v1/students' });

// Error handler
app.setErrorHandler((error, request, reply) => {
  app.log.error(error);
  reply.status(error.statusCode ?? 500).send({
    success: false,
    error: {
      code: error.code ?? 'INTERNAL_ERROR',
      message: error.message,
    },
  });
});

await app.listen({ port: 3001, host: '0.0.0.0' });
```

---

### 4.3 Prisma 6.x

#### 4.3.1 Overview

| Attribute | Value |
|-----------|-------|
| Version | 6.x |
| Category | ORM / Database Toolkit |
| License | Apache 2.0 |
| Vendor | Prisma Data |

#### 4.3.2 Selection Rationale

| Factor | Rating | Justification |
|--------|--------|---------------|
| Type Safety | ★★★★★ | Generated TypeScript types |
| Developer Experience | ★★★★★ | Prisma Studio, migrations |
| Multi-Database | ★★★★★ | PostgreSQL + MySQL support |
| Performance | ★★★★☆ | Query engine optimization |
| Documentation | ★★★★★ | Excellent documentation |
| Learning Curve | ★★★★★ | Intuitive schema language |

#### 4.3.3 Schema Example

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["fullTextSearch", "multiSchema"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  phone         String?   @unique
  passwordHash  String
  firstName     String
  lastName      String
  status        UserStatus @default(PENDING)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  student       Student?
  teacher       Teacher?
  sessions      Session[]
  roles         UserRole[]

  @@index([email])
  @@index([phone])
}

model Student {
  id              String        @id @default(uuid())
  userId          String        @unique
  rollNumber      String        @unique
  admissionNumber String        @unique
  admissionDate   DateTime
  currentClassId  String
  currentSectionId String
  status          StudentStatus @default(ACTIVE)
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  // Relations
  user            User          @relation(fields: [userId], references: [id])
  currentClass    Class         @relation(fields: [currentClassId], references: [id])
  currentSection  Section       @relation(fields: [currentSectionId], references: [id])
  attendances     Attendance[]
  grades          Grade[]
  enrollments     Enrollment[]
  guardians       StudentGuardian[]

  @@index([currentClassId])
  @@index([currentSectionId])
}

enum UserStatus {
  PENDING
  ACTIVE
  INACTIVE
  SUSPENDED
}

enum StudentStatus {
  ADMITTED
  ACTIVE
  ON_LEAVE
  TRANSFERRED
  GRADUATED
}
```

#### 4.3.4 Alternatives Considered

| ORM | Pros | Cons | Decision |
|-----|------|------|----------|
| TypeORM | Mature, decorators | Complex, less type-safe | Not selected |
| Drizzle | Lightweight, SQL-like | Newer, smaller community | Not selected |
| Knex.js | Query builder, flexible | No type generation | Not selected |
| Sequelize | Mature, feature-rich | Verbose, weaker types | Not selected |

---

### 4.4 BullMQ

#### 4.4.1 Overview

| Attribute | Value |
|-----------|-------|
| Version | 5.x |
| Category | Job Queue |
| License | MIT |
| Vendor | Taskforce.sh |

#### 4.4.2 Use Cases

| Queue | Purpose | Priority |
|-------|---------|----------|
| `email` | Send emails | Normal |
| `sms` | Send SMS notifications | High |
| `reports` | Generate reports | Low |
| `sync` | Gibbon/Moodle sync | Normal |
| `payments` | Payment webhooks | Critical |

#### 4.4.3 Implementation

```typescript
// src/queues/email.queue.ts
import { Queue, Worker } from 'bullmq';
import { sendEmail } from '../services/email.service';

const connection = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT!),
};

export const emailQueue = new Queue('email', { connection });

const worker = new Worker(
  'email',
  async (job) => {
    const { to, subject, template, data } = job.data;
    await sendEmail({ to, subject, template, data });
    return { sent: true, timestamp: new Date() };
  },
  {
    connection,
    concurrency: 5,
    limiter: {
      max: 100,
      duration: 60000, // 100 emails per minute
    },
  }
);

worker.on('completed', (job) => {
  console.log(`Email sent: ${job.id}`);
});

worker.on('failed', (job, err) => {
  console.error(`Email failed: ${job?.id}`, err);
});
```

---

## 5. Database Technologies

### 5.1 PostgreSQL 16+

#### 5.1.1 Overview

| Attribute | Value |
|-----------|-------|
| Version | 16+ |
| Category | Relational Database |
| License | PostgreSQL License |
| Vendor | PostgreSQL Global Development Group |

#### 5.1.2 Selection Rationale

| Factor | Rating | Justification |
|--------|--------|---------------|
| Reliability | ★★★★★ | ACID compliance, proven stability |
| Features | ★★★★★ | JSON, full-text search, arrays |
| Performance | ★★★★★ | Excellent query optimization |
| Scalability | ★★★★★ | Partitioning, replication |
| Community | ★★★★★ | Large, active community |
| Cost | ★★★★★ | Open source, free |

#### 5.1.3 PostgreSQL 16 Features Used

```sql
-- JSON aggregation and path queries
SELECT
  s.id,
  s.roll_number,
  jsonb_agg(
    jsonb_build_object(
      'subject', sub.name,
      'grade', g.letter_grade,
      'marks', g.marks_obtained
    )
  ) as grades
FROM students s
JOIN grades g ON g.student_id = s.id
JOIN subjects sub ON sub.id = g.subject_id
GROUP BY s.id;

-- Full-text search for students
SELECT id, first_name, last_name
FROM students
WHERE to_tsvector('english', first_name || ' ' || last_name)
      @@ plainto_tsquery('english', 'ahmed');

-- Partitioning for attendance (by date)
CREATE TABLE attendance (
  id UUID PRIMARY KEY,
  student_id UUID NOT NULL,
  date DATE NOT NULL,
  status VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
) PARTITION BY RANGE (date);

CREATE TABLE attendance_2026_q1 PARTITION OF attendance
  FOR VALUES FROM ('2026-01-01') TO ('2026-04-01');
```

---

### 5.2 MySQL 8.0 (Gibbon/Moodle)

#### 5.2.1 Overview

| Attribute | Value |
|-----------|-------|
| Version | 8.0 |
| Category | Relational Database |
| License | GPL v2 |
| Purpose | Gibbon SMS & Moodle LMS |

#### 5.2.2 Usage Context

MySQL 8.0 is used exclusively for:
- Gibbon School Management System (existing schema)
- Moodle Learning Management System (existing schema)

Custom modules use PostgreSQL for new development.

#### 5.2.3 Connection Configuration

```typescript
// prisma/schema-gibbon.prisma
datasource gibbon {
  provider = "mysql"
  url      = env("GIBBON_DATABASE_URL")
}

// src/config/database.ts
export const gibbonConnection = {
  host: process.env.GIBBON_DB_HOST,
  port: parseInt(process.env.GIBBON_DB_PORT || '3306'),
  database: process.env.GIBBON_DB_NAME,
  user: process.env.GIBBON_DB_USER,
  password: process.env.GIBBON_DB_PASSWORD,
};
```

---

### 5.3 Redis 7+

#### 5.3.1 Overview

| Attribute | Value |
|-----------|-------|
| Version | 7+ |
| Category | In-Memory Data Store |
| License | BSD 3-Clause |
| Vendor | Redis Ltd |

#### 5.3.2 Use Cases

| Use Case | Data Structure | TTL |
|----------|----------------|-----|
| Session Storage | Hash | 24h |
| API Rate Limiting | Sorted Set | 1min |
| Page Caching | String | 5min |
| Job Queues | List/Stream | Persistent |
| Real-time Presence | Set | 5min |
| Distributed Locks | String | 30s |

#### 5.3.3 Implementation

```typescript
// src/lib/redis.ts
import { Redis } from 'ioredis';

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT!),
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

// Session management
export async function createSession(userId: string, data: SessionData) {
  const sessionId = crypto.randomUUID();
  await redis.hset(`session:${sessionId}`, {
    userId,
    ...data,
    createdAt: Date.now(),
  });
  await redis.expire(`session:${sessionId}`, 86400); // 24 hours
  return sessionId;
}

// Rate limiting
export async function checkRateLimit(key: string, limit: number, window: number) {
  const current = await redis.incr(`ratelimit:${key}`);
  if (current === 1) {
    await redis.expire(`ratelimit:${key}`, window);
  }
  return current <= limit;
}

// Caching with tags
export async function cacheWithTags(
  key: string,
  data: unknown,
  tags: string[],
  ttl: number
) {
  const multi = redis.multi();
  multi.set(`cache:${key}`, JSON.stringify(data), 'EX', ttl);
  for (const tag of tags) {
    multi.sadd(`tag:${tag}`, key);
  }
  await multi.exec();
}
```

---

### 5.4 MinIO / S3 Object Storage

#### 5.4.1 Overview

| Attribute | Value |
|-----------|-------|
| Version | Latest |
| Category | Object Storage |
| License | AGPL v3 (MinIO) |
| Protocol | S3-compatible |

#### 5.4.2 Use Cases

| Bucket | Content | Access |
|--------|---------|--------|
| `documents` | Student documents, certificates | Private |
| `avatars` | User profile photos | Public |
| `course-content` | LMS course materials | Private |
| `exports` | Generated reports | Temporary |
| `backups` | Database backups | Private |

#### 5.4.3 Implementation

```typescript
// src/lib/storage.ts
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
  forcePathStyle: true, // Required for MinIO
});

export async function uploadFile(
  bucket: string,
  key: string,
  body: Buffer,
  contentType: string
) {
  await s3.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
  }));

  return `${process.env.S3_ENDPOINT}/${bucket}/${key}`;
}

export async function getSignedDownloadUrl(bucket: string, key: string) {
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(s3, command, { expiresIn: 3600 });
}
```

---

## 6. Mobile Technologies

### 6.1 React Native + Expo

#### 6.1.1 Overview

| Attribute | Value |
|-----------|-------|
| React Native Version | 0.76+ |
| Expo SDK | 52+ |
| Category | Cross-Platform Mobile |
| License | MIT |

#### 6.1.2 Selection Rationale

| Factor | Rating | Justification |
|--------|--------|---------------|
| Code Sharing | ★★★★★ | Share code with web app |
| Development Speed | ★★★★★ | Expo tooling, hot reload |
| Native Performance | ★★★★☆ | Near-native performance |
| Solo Dev Friendly | ★★★★★ | Single codebase, easier maintenance |
| OTA Updates | ★★★★★ | Expo Updates for quick fixes |
| Learning Curve | ★★★★☆ | React knowledge transfers |

#### 6.1.3 Project Structure

```
apps/
├── mobile/
│   ├── app/                    # Expo Router pages
│   │   ├── (auth)/
│   │   │   ├── login.tsx
│   │   │   └── register.tsx
│   │   ├── (tabs)/
│   │   │   ├── index.tsx       # Dashboard
│   │   │   ├── courses.tsx
│   │   │   ├── grades.tsx
│   │   │   └── profile.tsx
│   │   └── _layout.tsx
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── app.json
│   └── package.json
```

#### 6.1.4 Key Libraries

| Library | Purpose | Version |
|---------|---------|---------|
| expo-router | File-based routing | 4.x |
| expo-notifications | Push notifications | 0.28+ |
| expo-secure-store | Secure storage | 13+ |
| expo-image | Image optimization | 1.x |
| react-native-reanimated | Animations | 3.x |
| @tanstack/react-query | Data fetching | 5.x |
| zustand | State management | 4.x |

---

## 7. DevOps & Infrastructure

### 7.1 Docker & Docker Compose

#### 7.1.1 Overview

| Attribute | Value |
|-----------|-------|
| Docker Version | 24+ |
| Compose Version | 2.x |
| Category | Containerization |
| License | Apache 2.0 |

#### 7.1.2 Development Environment

```yaml
# docker-compose.yml
version: '3.8'

services:
  # Custom API
  api:
    build:
      context: ./apps/api
      dockerfile: Dockerfile.dev
    ports:
      - "3001:3001"
    volumes:
      - ./apps/api:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/smartacademy
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  # PostgreSQL (Custom modules)
  postgres:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=smartacademy
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  # MySQL (Gibbon/Moodle)
  mysql:
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=gibbon
    volumes:
      - mysql_data:/var/lib/mysql

  # Redis
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  # MinIO
  minio:
    image: minio/minio:latest
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      - MINIO_ROOT_USER=minioadmin
      - MINIO_ROOT_PASSWORD=minioadmin
    volumes:
      - minio_data:/data
    command: server /data --console-address ":9001"

  # Gibbon SMS
  gibbon:
    image: gibbonedu/gibbon:latest
    ports:
      - "8080:80"
    environment:
      - GIBBON_DB_HOST=mysql
      - GIBBON_DB_USER=root
      - GIBBON_DB_PASSWORD=password
      - GIBBON_DB_DATABASE=gibbon
    depends_on:
      - mysql

volumes:
  postgres_data:
  mysql_data:
  redis_data:
  minio_data:
```

---

### 7.2 GitHub Actions CI/CD

#### 7.2.1 Workflow Configuration

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: password
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
      redis:
        image: redis:7
        ports:
          - 6379:6379
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:ci
        env:
          DATABASE_URL: postgresql://postgres:password@localhost:5432/test
          REDIS_URL: redis://localhost:6379

  build:
    runs-on: ubuntu-latest
    needs: [lint, typecheck, test]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: actions/upload-artifact@v4
        with:
          name: build
          path: |
            apps/web/.next
            apps/api/dist
```

---

### 7.3 Nginx Reverse Proxy

#### 7.3.1 Configuration

```nginx
# nginx/nginx.conf
upstream api {
    server api:3001;
    keepalive 32;
}

upstream web {
    server web:3000;
    keepalive 32;
}

server {
    listen 80;
    server_name smartacademy.local;

    # API routes
    location /api {
        proxy_pass http://api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket support
    location /ws {
        proxy_pass http://api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Static files
    location /_next/static {
        proxy_pass http://web;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Web app
    location / {
        proxy_pass http://web;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;
}
```

---

## 8. Third-Party Integrations

### 8.1 Payment Gateways

#### 8.1.1 bKash Integration

| Attribute | Value |
|-----------|-------|
| API Version | 1.2.0 |
| Integration Type | Checkout URL |
| Documentation | https://developer.bka.sh |

```typescript
// src/services/payment/bkash.service.ts
interface BkashConfig {
  appKey: string;
  appSecret: string;
  username: string;
  password: string;
  baseUrl: string;
}

class BkashGateway implements PaymentGateway {
  private config: BkashConfig;
  private token: string | null = null;

  async getToken(): Promise<string> {
    const response = await fetch(`${this.config.baseUrl}/tokenized/checkout/token/grant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        username: this.config.username,
        password: this.config.password,
      },
      body: JSON.stringify({
        app_key: this.config.appKey,
        app_secret: this.config.appSecret,
      }),
    });
    const data = await response.json();
    this.token = data.id_token;
    return this.token;
  }

  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    const token = await this.getToken();
    const response = await fetch(`${this.config.baseUrl}/tokenized/checkout/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        'X-APP-Key': this.config.appKey,
      },
      body: JSON.stringify({
        mode: '0011',
        payerReference: request.customerPhone,
        callbackURL: request.returnUrl,
        amount: request.amount.toString(),
        currency: 'BDT',
        intent: 'sale',
        merchantInvoiceNumber: request.invoiceId,
      }),
    });
    return response.json();
  }
}
```

#### 8.1.2 SSLCommerz Integration

| Attribute | Value |
|-----------|-------|
| API Version | 4.0 |
| Integration Type | Hosted Payment Page |
| Documentation | https://developer.sslcommerz.com |

---

### 8.2 Communication Services

#### 8.2.1 BulkSMSBD (SMS)

| Attribute | Value |
|-----------|-------|
| Provider | BulkSMSBD |
| Type | Transactional SMS |
| Character Limit | 160 (English), 70 (Bengali) |

```typescript
// src/services/sms/bulksmsbd.service.ts
class BulkSMSBDService {
  private apiKey: string;
  private senderId: string;

  async send(phone: string, message: string): Promise<SMSResult> {
    const response = await fetch('https://bulksmsbd.net/api/smsapi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: this.apiKey,
        senderid: this.senderId,
        number: phone,
        message: message,
      }),
    });

    const data = await response.json();
    return {
      success: data.response_code === 202,
      messageId: data.message_id,
    };
  }
}
```

#### 8.2.2 SendGrid (Email)

| Attribute | Value |
|-----------|-------|
| Provider | SendGrid |
| Type | Transactional Email |
| Templates | Dynamic Templates |

```typescript
// src/services/email/sendgrid.service.ts
import sgMail from '@sendgrid/mail';

class SendGridService {
  constructor(apiKey: string) {
    sgMail.setApiKey(apiKey);
  }

  async sendTemplateEmail(
    to: string,
    templateId: string,
    dynamicData: Record<string, any>
  ): Promise<void> {
    await sgMail.send({
      to,
      from: {
        email: 'noreply@smartacademy.edu.bd',
        name: 'Smart Academy',
      },
      templateId,
      dynamicTemplateData: dynamicData,
    });
  }
}
```

---

### 8.3 Islamic APIs

#### 8.3.1 Aladhan API (Prayer Times)

| Attribute | Value |
|-----------|-------|
| Provider | Aladhan.com |
| Type | REST API |
| Rate Limit | 50 requests/minute |

```typescript
// src/services/islamic/prayer.service.ts
interface PrayerTimesResponse {
  code: number;
  data: {
    timings: {
      Fajr: string;
      Sunrise: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
    };
    date: {
      hijri: {
        date: string;
        month: { en: string; ar: string };
        year: string;
      };
    };
  };
}

class PrayerTimesService {
  private baseUrl = 'https://api.aladhan.com/v1';

  async getPrayerTimes(
    latitude: number,
    longitude: number,
    date: Date
  ): Promise<PrayerTimes> {
    const dateStr = date.toISOString().split('T')[0];
    const response = await fetch(
      `${this.baseUrl}/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=4`
    );
    const data: PrayerTimesResponse = await response.json();
    return this.mapToPrayerTimes(data);
  }
}
```

#### 8.3.2 Quran.com API

| Attribute | Value |
|-----------|-------|
| Provider | Quran.com |
| Type | REST API |
| Content | Text, Translations, Audio |

---

## 9. Development Tools

### 9.1 IDE & Extensions

#### 9.1.1 VSCode Configuration

```json
// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "ms-azuretools.vscode-docker",
    "GitHub.copilot",
    "ms-vscode.vscode-typescript-next",
    "christian-kohler.path-intellisense",
    "usernamehw.errorlens",
    "eamodio.gitlens"
  ]
}
```

```json
// .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

### 9.2 Code Quality Tools

#### 9.2.1 ESLint Configuration

```javascript
// eslint.config.js
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  }
);
```

#### 9.2.2 Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

### 9.3 Testing Tools

| Tool | Purpose | Category |
|------|---------|----------|
| Vitest | Unit testing | Frontend/Backend |
| Playwright | E2E testing | Frontend |
| Testing Library | Component testing | Frontend |
| Supertest | API testing | Backend |
| MSW | API mocking | Frontend |

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'tests/'],
    },
  },
});
```

---

## 10. Security Technologies

### 10.1 Authentication & Authorization

| Technology | Purpose |
|------------|---------|
| JWT (jose) | Token-based authentication |
| bcrypt | Password hashing |
| Passport.js | Authentication strategies |
| RBAC | Role-based access control |

### 10.2 Security Headers

```typescript
// src/middleware/security.ts
import helmet from '@fastify/helmet';

app.register(helmet, {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: 'same-site' },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
});
```

### 10.3 Data Protection

| Measure | Implementation |
|---------|----------------|
| Encryption at Rest | PostgreSQL TDE |
| Encryption in Transit | TLS 1.3 |
| Input Validation | Zod schemas |
| SQL Injection | Prisma parameterized queries |
| XSS Prevention | React automatic escaping |
| CSRF Protection | Same-site cookies |

---

## 11. Technology Comparison Matrix

### 11.1 Frontend Frameworks Comparison

| Criteria | Next.js | Remix | Nuxt | SvelteKit |
|----------|---------|-------|------|-----------|
| Performance | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★★★ |
| DX | ★★★★★ | ★★★★☆ | ★★★★☆ | ★★★★☆ |
| Ecosystem | ★★★★★ | ★★★☆☆ | ★★★★☆ | ★★★☆☆ |
| Learning Curve | ★★★★☆ | ★★★★☆ | ★★★★☆ | ★★★★★ |
| TypeScript | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★★☆ |
| **Selected** | ✓ | | | |

### 11.2 Backend Frameworks Comparison

| Criteria | Fastify | Express | NestJS | Hono |
|----------|---------|---------|--------|------|
| Performance | ★★★★★ | ★★★☆☆ | ★★★★☆ | ★★★★★ |
| TypeScript | ★★★★★ | ★★★☆☆ | ★★★★★ | ★★★★★ |
| Simplicity | ★★★★★ | ★★★★★ | ★★★☆☆ | ★★★★★ |
| Ecosystem | ★★★★☆ | ★★★★★ | ★★★★☆ | ★★★☆☆ |
| Documentation | ★★★★★ | ★★★★☆ | ★★★★★ | ★★★★☆ |
| **Selected** | ✓ | | | |

### 11.3 Database Comparison

| Criteria | PostgreSQL | MySQL | MongoDB | SQLite |
|----------|------------|-------|---------|--------|
| Features | ★★★★★ | ★★★★☆ | ★★★★☆ | ★★★☆☆ |
| Performance | ★★★★★ | ★★★★☆ | ★★★★☆ | ★★★★☆ |
| Scalability | ★★★★★ | ★★★★☆ | ★★★★★ | ★★☆☆☆ |
| ACID | ★★★★★ | ★★★★★ | ★★★☆☆ | ★★★★☆ |
| JSON Support | ★★★★★ | ★★★★☆ | ★★★★★ | ★★★☆☆ |
| **Selected** | ✓ (Custom) | ✓ (Gibbon/Moodle) | | |

---

## 12. Version Compatibility Matrix

### 12.1 Core Technology Versions

| Technology | Minimum | Recommended | Maximum |
|------------|---------|-------------|---------|
| Node.js | 20.x | 22 LTS | 23.x |
| pnpm | 8.x | 9.x | Latest |
| Next.js | 14.x | 15.x | Latest |
| React | 18.x | 19.x | Latest |
| TypeScript | 5.0 | 5.x | Latest |
| Prisma | 5.x | 6.x | Latest |
| Fastify | 4.x | 5.x | Latest |

### 12.2 Database Versions

| Database | Minimum | Recommended | Notes |
|----------|---------|-------------|-------|
| PostgreSQL | 14 | 16+ | Custom modules |
| MySQL | 8.0 | 8.0 | Gibbon/Moodle |
| Redis | 6.x | 7+ | Caching/Sessions |

### 12.3 Mobile SDK Versions

| Technology | Minimum | Recommended |
|------------|---------|-------------|
| React Native | 0.73 | 0.76+ |
| Expo SDK | 50 | 52+ |
| iOS Target | 13.0 | 15.0+ |
| Android Target | API 23 | API 26+ |

---

## 13. Summary

### 13.1 Technology Stack Quick Reference

```
FRONTEND
├── Framework: Next.js 15 (App Router)
├── UI: React 19 + TypeScript 5.x
├── Styling: Tailwind CSS 4.x
├── Build: Vite 6.x
└── State: TanStack Query + Zustand

BACKEND
├── Runtime: Node.js 22 LTS
├── Framework: Fastify 5.x
├── ORM: Prisma 6.x
├── Queue: BullMQ
└── Auth: JWT + Passport.js

MOBILE
├── Framework: React Native 0.76+
├── Platform: Expo SDK 52+
└── Navigation: Expo Router

DATABASE
├── Primary: PostgreSQL 16+
├── Legacy: MySQL 8.0 (Gibbon/Moodle)
├── Cache: Redis 7+
└── Storage: MinIO S3

INFRASTRUCTURE
├── Containers: Docker + Compose
├── Proxy: Nginx / Caddy
├── CI/CD: GitHub Actions
└── Package: pnpm 9.x (Monorepo)

INTEGRATIONS
├── Payments: bKash, Nagad, SSLCommerz
├── SMS: BulkSMSBD
├── Email: SendGrid
└── Islamic: Aladhan API, Quran.com API
```

### 13.2 Key Benefits

1. **Unified TypeScript Stack**: Single language across all platforms
2. **Modern Tooling**: Latest stable versions with long-term support
3. **Solo Developer Optimized**: Manageable complexity, excellent DX
4. **Performance First**: Chosen for speed and efficiency
5. **Future Proof**: Active communities, strong roadmaps
6. **Cost Effective**: Open source foundation

---

## Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Lead Developer | | | |
| Technical Architect | | | |
| Project Stakeholder | | | |

---

*This document provides the complete technology stack specification for the Smart Academy Digital Portal.*
