# Smart Academy Digital Portal - Frontend Technical Specification

**Document Title:** Frontend Technical Specification
**Document ID:** TECH_Frontend_Specification_v1.0
**Version:** 1.0
**Date:** January 10, 2026
**Project Name:** Smart Academy Digital Web Portal Development
**Prepared By:** Solo Full-Stack Developer

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | January 10, 2026 | Development Team | Initial Frontend Technical Specification |

**Reference Documents:**
- Smart Academy Technology Stack v1.0
- Smart Academy SRS v1.0
- Smart Academy Coding Standards v1.0
- Smart Academy Architecture Document v1.0

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Folder Structure](#2-folder-structure)
3. [Component Architecture](#3-component-architecture)
4. [Routing Strategy](#4-routing-strategy)
5. [State Management Architecture](#5-state-management-architecture)
6. [Form Handling Approach](#6-form-handling-approach)
7. [Error Handling Strategy](#7-error-handling-strategy)
8. [Performance Optimization Techniques](#8-performance-optimization-techniques)
9. [SEO Implementation](#9-seo-implementation)
10. [Accessibility Implementation](#10-accessibility-implementation)
11. [Responsive Design Approach](#11-responsive-design-approach)
12. [Internationalization (i18n)](#12-internationalization-i18n)
13. [Testing Strategy](#13-testing-strategy)
14. [Build and Deployment](#14-build-and-deployment)

---

## 1. Introduction

### 1.1 Purpose

This document provides comprehensive technical specifications for the frontend architecture of the Smart Academy Digital Portal. It establishes patterns, conventions, and best practices for building a scalable, maintainable, and performant frontend application.

### 1.2 Scope

This specification covers:
- **Public Website**: Next.js 15 with App Router
- **Admin Dashboard**: React 18 with Vite 6
- **Mobile Application**: React Native 0.76 with Expo 52

### 1.3 Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.x | Public website framework |
| React | 19.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| Shadcn/ui | Latest | Component library |
| TanStack Query | 5.x | Server state management |
| Zustand | 5.x | Client state management |
| React Hook Form | 7.x | Form management |
| Zod | 3.x | Schema validation |
| Framer Motion | 11.x | Animations |
| Vite | 6.x | Build tool (Admin Dashboard) |

### 1.4 Design Principles

1. **Server-First**: Leverage server components for optimal performance
2. **Type Safety**: Full TypeScript coverage with strict mode
3. **Component Driven**: Build reusable, composable components
4. **Mobile First**: Design for mobile, enhance for desktop
5. **Accessibility First**: WCAG 2.1 AA compliance
6. **Performance Budget**: LCP < 2.5s, FID < 100ms, CLS < 0.1

---

## 2. Folder Structure

### 2.1 Next.js Public Website Structure

```
smart-academy-web/
├── app/                                    # Next.js App Router
│   ├── (marketing)/                        # Marketing pages group
│   │   ├── layout.tsx                      # Marketing layout
│   │   ├── page.tsx                        # Homepage (/)
│   │   ├── about/
│   │   │   ├── page.tsx                    # About page
│   │   │   ├── history/page.tsx           # History page
│   │   │   ├── leadership/page.tsx        # Leadership team
│   │   │   └── vision-mission/page.tsx    # Vision & Mission
│   │   ├── academics/
│   │   │   ├── page.tsx                    # Academics overview
│   │   │   ├── early-childhood/page.tsx
│   │   │   ├── primary/page.tsx
│   │   │   ├── secondary/page.tsx
│   │   │   └── islamic-education/page.tsx
│   │   ├── admissions/
│   │   │   ├── page.tsx                    # Admissions info
│   │   │   ├── apply/page.tsx             # Application form
│   │   │   └── fees/page.tsx              # Fee structure
│   │   ├── campus/
│   │   │   ├── page.tsx                    # Campus overview
│   │   │   ├── facilities/page.tsx
│   │   │   └── virtual-tour/page.tsx
│   │   ├── news/
│   │   │   ├── page.tsx                    # News listing
│   │   │   └── [slug]/page.tsx            # News detail
│   │   ├── events/
│   │   │   ├── page.tsx                    # Events calendar
│   │   │   └── [slug]/page.tsx            # Event detail
│   │   └── contact/page.tsx               # Contact page
│   │
│   ├── (auth)/                             # Authentication pages
│   │   ├── layout.tsx                      # Auth layout
│   │   ├── login/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   ├── reset-password/page.tsx
│   │   └── verify-email/page.tsx
│   │
│   ├── (portal)/                           # Authenticated portal
│   │   ├── layout.tsx                      # Portal layout with sidebar
│   │   ├── dashboard/
│   │   │   └── page.tsx                    # User dashboard
│   │   ├── students/
│   │   │   ├── page.tsx                    # Student list
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx               # Student profile
│   │   │   │   ├── attendance/page.tsx    # Attendance details
│   │   │   │   ├── grades/page.tsx        # Grades details
│   │   │   │   └── islamic/page.tsx       # Islamic progress
│   │   │   └── new/page.tsx               # Add student
│   │   ├── attendance/
│   │   │   └── page.tsx                    # Attendance marking
│   │   ├── fees/
│   │   │   ├── page.tsx                    # Fee overview
│   │   │   ├── pay/page.tsx               # Payment page
│   │   │   └── history/page.tsx           # Payment history
│   │   ├── islamic/
│   │   │   ├── quran-progress/page.tsx    # Quran tracking
│   │   │   ├── prayer-times/page.tsx      # Prayer times
│   │   │   └── calendar/page.tsx          # Islamic calendar
│   │   ├── messages/
│   │   │   └── page.tsx                    # Messaging
│   │   ├── announcements/
│   │   │   └── page.tsx                    # Announcements
│   │   └── settings/
│   │       └── page.tsx                    # User settings
│   │
│   ├── api/                                # API Routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts
│   │   ├── students/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── payments/
│   │   │   ├── bkash/
│   │   │   │   ├── create/route.ts
│   │   │   │   └── callback/route.ts
│   │   │   └── nagad/
│   │   │       └── [...]
│   │   └── webhooks/
│   │       └── [...]
│   │
│   ├── layout.tsx                          # Root layout
│   ├── globals.css                         # Global styles
│   ├── not-found.tsx                       # 404 page
│   ├── error.tsx                           # Error page
│   ├── loading.tsx                         # Loading page
│   └── manifest.ts                         # PWA manifest
│
├── components/                             # React Components
│   ├── ui/                                 # UI Primitives (Shadcn)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── toast.tsx
│   │   ├── data-table.tsx
│   │   ├── pagination.tsx
│   │   ├── skeleton.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── tabs.tsx
│   │   └── index.ts                        # Re-exports
│   │
│   ├── layout/                             # Layout Components
│   │   ├── header/
│   │   │   ├── header.tsx
│   │   │   ├── navigation.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   └── user-menu.tsx
│   │   ├── footer/
│   │   │   ├── footer.tsx
│   │   │   └── footer-links.tsx
│   │   ├── sidebar/
│   │   │   ├── sidebar.tsx
│   │   │   ├── sidebar-nav.tsx
│   │   │   └── sidebar-item.tsx
│   │   └── index.ts
│   │
│   ├── features/                           # Feature Components
│   │   ├── students/
│   │   │   ├── student-card.tsx
│   │   │   ├── student-list.tsx
│   │   │   ├── student-form.tsx
│   │   │   ├── student-profile.tsx
│   │   │   ├── student-search.tsx
│   │   │   └── index.ts
│   │   ├── attendance/
│   │   │   ├── attendance-marker.tsx
│   │   │   ├── attendance-calendar.tsx
│   │   │   ├── attendance-report.tsx
│   │   │   └── index.ts
│   │   ├── fees/
│   │   │   ├── fee-summary.tsx
│   │   │   ├── payment-form.tsx
│   │   │   ├── payment-history.tsx
│   │   │   └── index.ts
│   │   ├── islamic/
│   │   │   ├── quran-progress-map.tsx
│   │   │   ├── surah-progress.tsx
│   │   │   ├── tajweed-assessment.tsx
│   │   │   ├── prayer-times-widget.tsx
│   │   │   ├── hijri-calendar.tsx
│   │   │   └── index.ts
│   │   └── dashboard/
│   │       ├── stats-card.tsx
│   │       ├── recent-activity.tsx
│   │       ├── quick-actions.tsx
│   │       └── index.ts
│   │
│   ├── shared/                             # Shared Components
│   │   ├── loading-spinner.tsx
│   │   ├── error-boundary.tsx
│   │   ├── empty-state.tsx
│   │   ├── confirmation-dialog.tsx
│   │   ├── file-upload.tsx
│   │   ├── date-picker.tsx
│   │   ├── search-input.tsx
│   │   ├── language-switcher.tsx
│   │   └── index.ts
│   │
│   └── providers/                          # Context Providers
│       ├── theme-provider.tsx
│       ├── query-provider.tsx
│       ├── auth-provider.tsx
│       ├── toast-provider.tsx
│       └── index.ts
│
├── hooks/                                  # Custom Hooks
│   ├── use-students.ts                     # Student queries
│   ├── use-attendance.ts                   # Attendance queries
│   ├── use-fees.ts                         # Fee queries
│   ├── use-islamic.ts                      # Islamic module hooks
│   ├── use-auth.ts                         # Authentication hook
│   ├── use-local-storage.ts                # Local storage hook
│   ├── use-debounce.ts                     # Debounce hook
│   ├── use-media-query.ts                  # Media query hook
│   ├── use-intersection.ts                 # Intersection observer
│   ├── use-toast.ts                        # Toast notifications
│   └── index.ts
│
├── lib/                                    # Utility Libraries
│   ├── utils.ts                            # General utilities
│   ├── api-client.ts                       # API client setup
│   ├── validators.ts                       # Validation schemas
│   ├── formatters.ts                       # Date, number formatters
│   ├── constants.ts                        # App constants
│   ├── query-keys.ts                       # React Query keys
│   └── cn.ts                               # Class name utility
│
├── services/                               # API Services
│   ├── student-service.ts
│   ├── attendance-service.ts
│   ├── fee-service.ts
│   ├── islamic-service.ts
│   ├── auth-service.ts
│   └── index.ts
│
├── store/                                  # Zustand Stores
│   ├── use-ui-store.ts                     # UI state
│   ├── use-user-store.ts                   # User preferences
│   ├── use-filter-store.ts                 # Filter state
│   └── index.ts
│
├── types/                                  # TypeScript Types
│   ├── student.ts
│   ├── attendance.ts
│   ├── fees.ts
│   ├── islamic.ts
│   ├── user.ts
│   ├── api.ts
│   └── index.ts
│
├── config/                                 # Configuration
│   ├── site.ts                             # Site metadata
│   ├── navigation.ts                       # Navigation config
│   ├── dashboard.ts                        # Dashboard config
│   └── index.ts
│
├── styles/                                 # Additional Styles
│   └── fonts.ts                            # Font definitions
│
├── public/                                 # Static Assets
│   ├── images/
│   │   ├── logo.svg
│   │   ├── logo-white.svg
│   │   └── og-image.png
│   ├── fonts/
│   │   ├── kalpurush.woff2
│   │   └── amiri.woff2
│   └── icons/
│       ├── favicon.ico
│       └── apple-touch-icon.png
│
├── tests/                                  # Test Files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.local                              # Local environment
├── .env.example                            # Environment template
├── next.config.ts                          # Next.js config
├── tailwind.config.ts                      # Tailwind config
├── tsconfig.json                           # TypeScript config
├── eslint.config.mjs                       # ESLint config
├── postcss.config.js                       # PostCSS config
├── playwright.config.ts                    # E2E test config
└── package.json
```

### 2.2 Admin Dashboard Structure (Vite + React)

```
smart-academy-admin/
├── src/
│   ├── app/                                # App entry
│   │   ├── App.tsx
│   │   ├── routes.tsx
│   │   └── main.tsx
│   ├── components/                         # Same structure as Next.js
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── store/
│   ├── types/
│   └── config/
├── public/
├── tests/
└── [config files]
```

### 2.3 File Organization Rules

1. **One component per file** - Each component gets its own file
2. **Co-locate related files** - Keep tests, styles, and types near their components
3. **Index files for re-exports** - Use `index.ts` to simplify imports
4. **Feature-based organization** - Group by feature, not by file type
5. **Max 500 lines per file** - Split larger files into smaller modules

---

## 3. Component Architecture

### 3.1 Component Categories

```
┌─────────────────────────────────────────────────────────────────────┐
│                     COMPONENT HIERARCHY                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  PAGES (app/**/page.tsx)                                       │ │
│  │  - Route-level components                                       │ │
│  │  - Server components by default                                 │ │
│  │  - Handle data fetching                                         │ │
│  │  - Compose feature components                                   │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                              │                                       │
│                              ▼                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  LAYOUTS (app/**/layout.tsx)                                   │ │
│  │  - Shared UI structure                                          │ │
│  │  - Navigation, headers, footers                                 │ │
│  │  - Auth protection                                              │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                              │                                       │
│                              ▼                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  FEATURE COMPONENTS (components/features/*)                    │ │
│  │  - Business logic specific                                      │ │
│  │  - Connected to state/API                                       │ │
│  │  - Domain-specific UI                                           │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                              │                                       │
│                              ▼                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  SHARED COMPONENTS (components/shared/*)                       │ │
│  │  - Reusable across features                                     │ │
│  │  - Generic functionality                                        │ │
│  │  - Business-logic agnostic                                      │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                              │                                       │
│                              ▼                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  UI PRIMITIVES (components/ui/*)                               │ │
│  │  - Base design system components                                │ │
│  │  - Styled with Tailwind                                         │ │
│  │  - No business logic                                            │ │
│  │  - Based on Shadcn/ui                                           │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.2 Server vs Client Components

#### 3.2.1 Server Components (Default)

Use server components for:
- Static content
- Data fetching
- SEO-critical content
- Large dependencies

```typescript
// app/students/page.tsx - Server Component (default)
import { StudentList } from '@/components/features/students/student-list';
import { studentService } from '@/services/student-service';

export default async function StudentsPage() {
  // Data fetching happens on the server
  const students = await studentService.getAll();

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Students</h1>
      <StudentList students={students} />
    </div>
  );
}
```

#### 3.2.2 Client Components

Use client components for:
- Interactivity (onClick, onChange)
- State (useState, useReducer)
- Effects (useEffect)
- Browser APIs
- Custom hooks with state

```typescript
// components/features/students/student-search.tsx
'use client';

import { useState, useCallback } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { Input } from '@/components/ui/input';

interface StudentSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function StudentSearch({
  onSearch,
  placeholder = 'Search students...',
}: StudentSearchProps) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <Input
      type="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder={placeholder}
      className="max-w-sm"
    />
  );
}
```

#### 3.2.3 Component Composition Pattern

```typescript
// Page (Server Component) - Handles data
// app/students/[id]/page.tsx
import { StudentProfile } from '@/components/features/students/student-profile';
import { StudentActions } from '@/components/features/students/student-actions';
import { studentService } from '@/services/student-service';

export default async function StudentPage({
  params,
}: {
  params: { id: string };
}) {
  const student = await studentService.getById(params.id);

  if (!student) {
    notFound();
  }

  return (
    <div>
      {/* Server Component - Static display */}
      <StudentProfile student={student} />

      {/* Client Component - Interactive */}
      <StudentActions studentId={student.id} />
    </div>
  );
}
```

### 3.3 Component Patterns

#### 3.3.1 Compound Components

```typescript
// components/ui/card.tsx
import { cn } from '@/lib/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: CardProps) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  );
}

function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: CardProps) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}

function CardFooter({ className, ...props }: CardProps) {
  return (
    <div
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

// Usage
<Card>
  <CardHeader>
    <CardTitle>Student Profile</CardTitle>
    <CardDescription>View and manage student information</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

#### 3.3.2 Render Props Pattern

```typescript
// components/shared/data-fetcher.tsx
'use client';

import { useQuery } from '@tanstack/react-query';

interface DataFetcherProps<T> {
  queryKey: string[];
  queryFn: () => Promise<T>;
  children: (data: T) => React.ReactNode;
  loading?: React.ReactNode;
  error?: (error: Error) => React.ReactNode;
}

export function DataFetcher<T>({
  queryKey,
  queryFn,
  children,
  loading = <div>Loading...</div>,
  error = (e) => <div>Error: {e.message}</div>,
}: DataFetcherProps<T>) {
  const { data, isLoading, isError, error: queryError } = useQuery({
    queryKey,
    queryFn,
  });

  if (isLoading) return loading;
  if (isError) return error(queryError);
  if (!data) return null;

  return <>{children(data)}</>;
}

// Usage
<DataFetcher
  queryKey={['student', studentId]}
  queryFn={() => studentService.getById(studentId)}
  loading={<StudentSkeleton />}
>
  {(student) => <StudentCard student={student} />}
</DataFetcher>
```

#### 3.3.3 HOC Pattern (Sparingly)

```typescript
// components/shared/with-auth.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requiredRoles?: string[],
) {
  return function AuthenticatedComponent(props: P) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      router.push('/login');
      return null;
    }

    if (requiredRoles && !requiredRoles.some((role) => user.roles.includes(role))) {
      router.push('/unauthorized');
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

// Usage (prefer using middleware or layout protection instead)
const ProtectedPage = withAuth(MyPage, ['admin', 'teacher']);
```

### 3.4 Props Interface Design

```typescript
// Good props interface design
interface StudentCardProps {
  // Required props first
  student: Student;

  // Optional props with defaults documented
  variant?: 'compact' | 'expanded';  // Default: 'compact'
  showActions?: boolean;              // Default: true

  // Event handlers
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;

  // Style customization (always optional)
  className?: string;
}

// With default values
export function StudentCard({
  student,
  variant = 'compact',
  showActions = true,
  onEdit,
  onDelete,
  className,
}: StudentCardProps) {
  // Implementation
}
```

---

## 4. Routing Strategy

### 4.1 Next.js App Router Structure

#### 4.1.1 Route Groups

```typescript
// Use route groups for logical organization
app/
├── (marketing)/          # Public marketing pages
│   ├── layout.tsx        # Marketing layout (no auth required)
│   └── page.tsx          # Homepage
├── (auth)/               # Authentication pages
│   ├── layout.tsx        # Auth layout (redirect if logged in)
│   └── login/page.tsx
├── (portal)/             # Authenticated pages
│   ├── layout.tsx        # Portal layout (auth required)
│   └── dashboard/page.tsx
```

#### 4.1.2 Dynamic Routes

```typescript
// app/students/[id]/page.tsx - Dynamic route
export default async function StudentPage({
  params,
}: {
  params: { id: string };
}) {
  const student = await getStudent(params.id);
  return <StudentProfile student={student} />;
}

// Generate static paths for common students
export async function generateStaticParams() {
  const students = await getActiveStudents();
  return students.map((student) => ({
    id: student.id,
  }));
}
```

#### 4.1.3 Parallel Routes

```typescript
// app/@modal/(.)students/[id]/edit/page.tsx
// Intercepted route for modal editing

export default function EditStudentModal({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <StudentEditForm studentId={params.id} />
    </Modal>
  );
}
```

### 4.2 Navigation Configuration

```typescript
// config/navigation.ts
import {
  Home,
  Users,
  Calendar,
  BookOpen,
  DollarSign,
  Moon,
  Settings,
} from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: string[];
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Students',
    href: '/students',
    icon: Users,
    roles: ['admin', 'teacher'],
    children: [
      { title: 'All Students', href: '/students', icon: Users },
      { title: 'Add Student', href: '/students/new', icon: Users },
      { title: 'Classes', href: '/students/classes', icon: Users },
    ],
  },
  {
    title: 'Attendance',
    href: '/attendance',
    icon: Calendar,
    roles: ['admin', 'teacher'],
  },
  {
    title: 'Academics',
    href: '/academics',
    icon: BookOpen,
    children: [
      { title: 'Grades', href: '/academics/grades', icon: BookOpen },
      { title: 'Timetable', href: '/academics/timetable', icon: Calendar },
      { title: 'Assignments', href: '/academics/assignments', icon: BookOpen },
    ],
  },
  {
    title: 'Islamic Education',
    href: '/islamic',
    icon: Moon,
    children: [
      { title: 'Quran Progress', href: '/islamic/quran-progress', icon: BookOpen },
      { title: 'Prayer Times', href: '/islamic/prayer-times', icon: Moon },
      { title: 'Calendar', href: '/islamic/calendar', icon: Calendar },
    ],
  },
  {
    title: 'Fees',
    href: '/fees',
    icon: DollarSign,
    roles: ['admin', 'parent'],
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export const publicNavigation: NavItem[] = [
  { title: 'Home', href: '/', icon: Home },
  { title: 'About', href: '/about', icon: BookOpen },
  { title: 'Academics', href: '/academics', icon: BookOpen },
  { title: 'Admissions', href: '/admissions', icon: Users },
  { title: 'Campus', href: '/campus', icon: Home },
  { title: 'News', href: '/news', icon: BookOpen },
  { title: 'Contact', href: '/contact', icon: Users },
];
```

### 4.3 Protected Routes

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/students', '/attendance', '/fees'];

// Routes that should redirect to dashboard if logged in
const authRoutes = ['/login', '/register', '/forgot-password'];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Check if accessing protected route without auth
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect to dashboard if accessing auth routes while logged in
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

### 4.4 Breadcrumb Navigation

```typescript
// components/shared/breadcrumb.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, string> = {
  students: 'Students',
  attendance: 'Attendance',
  grades: 'Grades',
  fees: 'Fees',
  islamic: 'Islamic Education',
  'quran-progress': 'Quran Progress',
  'prayer-times': 'Prayer Times',
};

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        <li>
          <Link
            href="/dashboard"
            className="hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === segments.length - 1;
          const label = routeLabels[segment] || segment;

          return (
            <li key={segment} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-2" />
              {isLast ? (
                <span className="font-medium text-foreground">{label}</span>
              ) : (
                <Link
                  href={href}
                  className="hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

---

## 5. State Management Architecture

### 5.1 State Categories

```
┌─────────────────────────────────────────────────────────────────────┐
│                    STATE MANAGEMENT STRATEGY                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  SERVER STATE (TanStack Query)                                 │ │
│  │  - API data (students, grades, attendance)                     │ │
│  │  - Remote data with caching                                     │ │
│  │  - Background refetching                                        │ │
│  │  - Optimistic updates                                           │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  CLIENT STATE (Zustand)                                        │ │
│  │  - UI state (sidebar open, theme)                               │ │
│  │  - User preferences                                             │ │
│  │  - Filter/sort state                                            │ │
│  │  - Cart/selection state                                         │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  FORM STATE (React Hook Form)                                  │ │
│  │  - Form values                                                  │ │
│  │  - Validation state                                             │ │
│  │  - Submission state                                             │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  URL STATE (Next.js Router)                                    │ │
│  │  - Search params                                                │ │
│  │  - Pagination                                                   │ │
│  │  - Filters in URL                                               │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  LOCAL STATE (useState)                                        │ │
│  │  - Component-specific state                                     │ │
│  │  - Ephemeral UI state                                           │ │
│  │  - Modal open/close                                             │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.2 TanStack Query (Server State)

#### 5.2.1 Query Client Configuration

```typescript
// lib/query-client.ts
import { QueryClient } from '@tanstack/react-query';

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,        // 5 minutes
        gcTime: 10 * 60 * 1000,          // 10 minutes (was cacheTime)
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 1,
      },
    },
  });
}
```

#### 5.2.2 Query Keys Factory

```typescript
// lib/query-keys.ts
export const queryKeys = {
  // Students
  students: {
    all: ['students'] as const,
    lists: () => [...queryKeys.students.all, 'list'] as const,
    list: (filters: StudentFilters) =>
      [...queryKeys.students.lists(), filters] as const,
    details: () => [...queryKeys.students.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.students.details(), id] as const,
    attendance: (id: string) =>
      [...queryKeys.students.detail(id), 'attendance'] as const,
    grades: (id: string) =>
      [...queryKeys.students.detail(id), 'grades'] as const,
  },

  // Attendance
  attendance: {
    all: ['attendance'] as const,
    byClass: (classId: string, date: string) =>
      [...queryKeys.attendance.all, classId, date] as const,
    byStudent: (studentId: string) =>
      [...queryKeys.attendance.all, 'student', studentId] as const,
  },

  // Islamic
  islamic: {
    all: ['islamic'] as const,
    quranProgress: (studentId: string) =>
      [...queryKeys.islamic.all, 'quran', studentId] as const,
    prayerTimes: (date: string, location: string) =>
      [...queryKeys.islamic.all, 'prayer', date, location] as const,
    hijriDate: (date: string) =>
      [...queryKeys.islamic.all, 'hijri', date] as const,
  },

  // Fees
  fees: {
    all: ['fees'] as const,
    summary: (studentId: string) =>
      [...queryKeys.fees.all, 'summary', studentId] as const,
    history: (studentId: string) =>
      [...queryKeys.fees.all, 'history', studentId] as const,
  },
};
```

#### 5.2.3 Custom Query Hooks

```typescript
// hooks/use-students.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { studentService } from '@/services/student-service';
import type { Student, StudentFilters, CreateStudentInput } from '@/types';

export function useStudents(filters: StudentFilters = {}) {
  return useQuery({
    queryKey: queryKeys.students.list(filters),
    queryFn: () => studentService.getAll(filters),
  });
}

export function useStudent(id: string) {
  return useQuery({
    queryKey: queryKeys.students.detail(id),
    queryFn: () => studentService.getById(id),
    enabled: !!id,
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStudentInput) => studentService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
    },
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Student> }) =>
      studentService.update(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: queryKeys.students.detail(id) });

      // Snapshot previous value
      const previousStudent = queryClient.getQueryData(
        queryKeys.students.detail(id)
      );

      // Optimistically update
      queryClient.setQueryData(queryKeys.students.detail(id), (old: Student) => ({
        ...old,
        ...data,
      }));

      return { previousStudent };
    },
    onError: (err, { id }, context) => {
      // Rollback on error
      if (context?.previousStudent) {
        queryClient.setQueryData(
          queryKeys.students.detail(id),
          context.previousStudent
        );
      }
    },
    onSettled: (_, __, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.students.detail(id) });
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => studentService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
    },
  });
}
```

### 5.3 Zustand (Client State)

#### 5.3.1 UI Store

```typescript
// store/use-ui-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  // Sidebar
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapse: () => void;

  // Theme
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;

  // Language
  language: 'en' | 'bn';
  setLanguage: (language: 'en' | 'bn') => void;

  // Command palette
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Sidebar
      sidebarOpen: true,
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebarCollapse: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      // Theme
      theme: 'system',
      setTheme: (theme) => set({ theme }),

      // Language
      language: 'en',
      setLanguage: (language) => set({ language }),

      // Command palette
      commandPaletteOpen: false,
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
    }),
    {
      name: 'smart-academy-ui',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);
```

#### 5.3.2 Filter Store

```typescript
// store/use-filter-store.ts
import { create } from 'zustand';

interface StudentFilters {
  search: string;
  classId: string | null;
  status: 'active' | 'inactive' | 'all';
  sortBy: 'name' | 'enrollmentNumber' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

interface FilterState {
  studentFilters: StudentFilters;
  setStudentFilter: <K extends keyof StudentFilters>(
    key: K,
    value: StudentFilters[K]
  ) => void;
  resetStudentFilters: () => void;
}

const defaultStudentFilters: StudentFilters = {
  search: '',
  classId: null,
  status: 'active',
  sortBy: 'name',
  sortOrder: 'asc',
};

export const useFilterStore = create<FilterState>((set) => ({
  studentFilters: defaultStudentFilters,
  setStudentFilter: (key, value) =>
    set((state) => ({
      studentFilters: { ...state.studentFilters, [key]: value },
    })),
  resetStudentFilters: () => set({ studentFilters: defaultStudentFilters }),
}));
```

### 5.4 URL State Management

```typescript
// hooks/use-url-state.ts
'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export function useUrlState<T extends Record<string, string | number | null>>(
  defaultValues: T
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const values = Object.keys(defaultValues).reduce((acc, key) => {
    const value = searchParams.get(key);
    acc[key as keyof T] = value !== null ? value : defaultValues[key as keyof T];
    return acc;
  }, {} as T);

  const setValues = useCallback(
    (newValues: Partial<T>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newValues).forEach(([key, value]) => {
        if (value === null || value === defaultValues[key as keyof T]) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams, defaultValues]
  );

  return [values, setValues] as const;
}

// Usage
function StudentListPage() {
  const [filters, setFilters] = useUrlState({
    page: '1',
    search: '',
    classId: null,
  });

  return (
    <div>
      <SearchInput
        value={filters.search}
        onChange={(search) => setFilters({ search, page: '1' })}
      />
      <Pagination
        page={Number(filters.page)}
        onChange={(page) => setFilters({ page: String(page) })}
      />
    </div>
  );
}
```

---

## 6. Form Handling Approach

### 6.1 Form Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                      FORM HANDLING STACK                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  React Hook Form                                               │ │
│  │  - Form state management                                        │ │
│  │  - Field registration                                           │ │
│  │  - Submission handling                                          │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                              +                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  Zod                                                           │ │
│  │  - Schema definition                                            │ │
│  │  - Type inference                                               │ │
│  │  - Validation rules                                             │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                              +                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  @hookform/resolvers                                           │ │
│  │  - Zod integration                                              │ │
│  │  - Error mapping                                                │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.2 Form Schema Definition

```typescript
// lib/validators/student-schema.ts
import { z } from 'zod';

export const studentFormSchema = z.object({
  // Basic Information
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s\u0980-\u09FF]+$/, 'Invalid characters in name'),

  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),

  email: z
    .string()
    .email('Please enter a valid email')
    .optional()
    .or(z.literal('')),

  phone: z
    .string()
    .regex(/^(\+880|880|0)?1[3-9]\d{8}$/, 'Please enter a valid Bangladesh phone number')
    .optional()
    .or(z.literal('')),

  dateOfBirth: z
    .string()
    .refine((date) => {
      const age = new Date().getFullYear() - new Date(date).getFullYear();
      return age >= 3 && age <= 20;
    }, 'Student must be between 3 and 20 years old'),

  gender: z.enum(['male', 'female'], {
    required_error: 'Please select a gender',
  }),

  // Academic Information
  classId: z.string().min(1, 'Please select a class'),
  section: z.string().optional(),
  rollNumber: z.string().optional(),

  // Islamic Education
  quranLevel: z.enum([
    'beginner',
    'qaida',
    'nazira',
    'hifz',
    'tajweed',
  ]).optional(),

  // Parent Information
  parentInfo: z.object({
    fatherName: z.string().min(2, 'Father\'s name is required'),
    motherName: z.string().min(2, 'Mother\'s name is required'),
    guardianPhone: z
      .string()
      .regex(/^(\+880|880|0)?1[3-9]\d{8}$/, 'Please enter a valid phone number'),
    guardianEmail: z.string().email().optional().or(z.literal('')),
    address: z.string().min(10, 'Please enter complete address'),
  }),

  // Documents
  birthCertificateNumber: z.string().optional(),
  previousSchool: z.string().optional(),
});

export type StudentFormData = z.infer<typeof studentFormSchema>;

// Create schema for different use cases
export const createStudentSchema = studentFormSchema;
export const updateStudentSchema = studentFormSchema.partial();
```

### 6.3 Form Component Implementation

```typescript
// components/features/students/student-form.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { studentFormSchema, type StudentFormData } from '@/lib/validators/student-schema';
import { useCreateStudent, useUpdateStudent } from '@/hooks/use-students';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { Student } from '@/types';

interface StudentFormProps {
  student?: Student;
  onSuccess?: () => void;
}

export function StudentForm({ student, onSuccess }: StudentFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const createMutation = useCreateStudent();
  const updateMutation = useUpdateStudent();

  const isEditing = !!student;
  const mutation = isEditing ? updateMutation : createMutation;

  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: student
      ? {
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email ?? '',
          // ... map other fields
        }
      : {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          gender: undefined,
          classId: '',
          parentInfo: {
            fatherName: '',
            motherName: '',
            guardianPhone: '',
            guardianEmail: '',
            address: '',
          },
        },
  });

  const onSubmit = async (data: StudentFormData) => {
    try {
      if (isEditing) {
        await updateMutation.mutateAsync({ id: student.id, data });
        toast({
          title: 'Student updated',
          description: 'Student information has been updated successfully.',
        });
      } else {
        await createMutation.mutateAsync(data);
        toast({
          title: 'Student created',
          description: 'New student has been added successfully.',
        });
      }

      onSuccess?.();
      router.push('/students');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Basic Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Academic Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Academic Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="classId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class *</FormLabel>
                  <ClassSelect
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quranLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quran Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="qaida">Qaida</SelectItem>
                      <SelectItem value="nazira">Nazira</SelectItem>
                      <SelectItem value="hifz">Hifz</SelectItem>
                      <SelectItem value="tajweed">Tajweed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Current level in Quran education
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Parent Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Parent/Guardian Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="parentInfo.fatherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Father's Name *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parentInfo.motherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mother's Name *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parentInfo.guardianPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guardian Phone *</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+880 1XXX-XXXXXX"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parentInfo.address"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Address *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter complete address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? 'Saving...'
              : isEditing
                ? 'Update Student'
                : 'Add Student'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
```

### 6.4 Form Field Components

```typescript
// components/ui/form.tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';
import { cn } from '@/lib/cn';
import { Label } from '@/components/ui/label';

const Form = FormProvider;

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

interface FormItemContextValue {
  id: string;
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
```

---

## 7. Error Handling Strategy

### 7.1 Error Boundary Implementation

```typescript
// components/shared/error-boundary.tsx
'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    // TODO: Send to Sentry or similar
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
          <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-4 text-center max-w-md">
            We apologize for the inconvenience. Please try again or contact
            support if the problem persists.
          </p>
          <Button onClick={this.handleRetry}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 7.2 Next.js Error Pages

```typescript
// app/error.tsx
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to reporting service
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
      <h1 className="text-3xl font-bold mb-2">Something went wrong</h1>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        We encountered an unexpected error. Please try again or return to the
        homepage.
      </p>
      <div className="flex gap-4">
        <Button onClick={reset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
```

```typescript
// app/not-found.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Link>
        </Button>
        <Button variant="outline" onClick={() => history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    </div>
  );
}
```

### 7.3 API Error Handling

```typescript
// lib/api-client.ts
import { toast } from '@/hooks/use-toast';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
    public details?: Record<string, string[]>,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    throw new ApiError(
      response.status,
      errorData.message || 'An error occurred',
      errorData.code,
      errorData.details,
    );
  }

  return response.json();
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    return handleResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      // Handle specific error codes
      if (error.status === 401) {
        // Redirect to login
        window.location.href = '/login';
      }

      throw error;
    }

    // Network error
    throw new ApiError(0, 'Network error. Please check your connection.');
  }
}

// Hook for handling mutation errors
export function useMutationErrorHandler() {
  return (error: unknown) => {
    if (error instanceof ApiError) {
      if (error.details) {
        // Show validation errors
        Object.entries(error.details).forEach(([field, messages]) => {
          messages.forEach((message) => {
            toast({
              title: `Validation Error: ${field}`,
              description: message,
              variant: 'destructive',
            });
          });
        });
      } else {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    }
  };
}
```

---

## 8. Performance Optimization Techniques

### 8.1 Code Splitting

```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

// Lazy load heavy components
const QuranProgressMap = dynamic(
  () => import('@/components/features/islamic/quran-progress-map'),
  {
    loading: () => <QuranProgressSkeleton />,
    ssr: false, // Disable SSR for client-only components
  }
);

const DataChart = dynamic(
  () => import('@/components/shared/data-chart'),
  {
    loading: () => <ChartSkeleton />,
  }
);

// Route-based code splitting is automatic with Next.js App Router
```

### 8.2 Image Optimization

```typescript
// components/shared/optimized-image.tsx
import Image from 'next/image';
import { cn } from '@/lib/cn';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fill?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  fill = false,
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(width || 700, height || 475))}`}
      className={cn('object-cover', className)}
      sizes={fill ? '100vw' : `${width}px`}
    />
  );
}

// Shimmer placeholder
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="0%"/>
      <stop stop-color="#edeef1" offset="50%"/>
      <stop stop-color="#f6f7f8" offset="100%"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8"/>
  <rect width="${w}" height="${h}" fill="url(#g)">
    <animate attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"/>
  </rect>
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);
```

### 8.3 Data Fetching Optimization

```typescript
// Parallel data fetching in server components
// app/dashboard/page.tsx
import { Suspense } from 'react';
import { DashboardStats } from '@/components/features/dashboard/stats';
import { RecentActivity } from '@/components/features/dashboard/recent-activity';
import { UpcomingEvents } from '@/components/features/dashboard/upcoming-events';

export default async function DashboardPage() {
  return (
    <div className="grid gap-6">
      {/* Parallel data fetching with Suspense */}
      <Suspense fallback={<StatsSkeleton />}>
        <DashboardStats />
      </Suspense>

      <div className="grid md:grid-cols-2 gap-6">
        <Suspense fallback={<ActivitySkeleton />}>
          <RecentActivity />
        </Suspense>

        <Suspense fallback={<EventsSkeleton />}>
          <UpcomingEvents />
        </Suspense>
      </div>
    </div>
  );
}

// Each component fetches its own data
async function DashboardStats() {
  const stats = await getStats(); // Fetched in parallel
  return <StatsDisplay stats={stats} />;
}
```

### 8.4 Bundle Size Optimization

```typescript
// next.config.ts
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'date-fns',
      'lodash',
    ],
  },
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
    },
  },
});
```

### 8.5 Memoization Strategies

```typescript
// Use React.memo for expensive components
import { memo } from 'react';

interface StudentCardProps {
  student: Student;
  onEdit: (id: string) => void;
}

export const StudentCard = memo(function StudentCard({
  student,
  onEdit,
}: StudentCardProps) {
  // Component implementation
});

// Custom comparison function for complex props
export const StudentList = memo(
  function StudentList({ students, filters }: StudentListProps) {
    // Component implementation
  },
  (prevProps, nextProps) => {
    return (
      prevProps.students === nextProps.students &&
      JSON.stringify(prevProps.filters) === JSON.stringify(nextProps.filters)
    );
  }
);

// useMemo for expensive calculations
function useStudentStats(students: Student[]) {
  return useMemo(() => {
    return {
      total: students.length,
      active: students.filter((s) => s.status === 'active').length,
      averageAge: calculateAverageAge(students),
      classDistribution: calculateClassDistribution(students),
    };
  }, [students]);
}

// useCallback for stable function references
function StudentActions({ studentId }: { studentId: string }) {
  const handleEdit = useCallback(() => {
    router.push(`/students/${studentId}/edit`);
  }, [studentId]);

  const handleDelete = useCallback(async () => {
    await deleteStudent(studentId);
  }, [studentId]);

  return (
    <div>
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
}
```

### 8.6 Virtual Lists

```typescript
// components/shared/virtual-list.tsx
'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

interface VirtualListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number;
  className?: string;
}

export function VirtualList<T>({
  items,
  renderItem,
  itemHeight,
  className,
}: VirtualListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan: 5,
  });

  return (
    <div ref={parentRef} className={cn('h-[600px] overflow-auto', className)}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {renderItem(items[virtualItem.index], virtualItem.index)}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 9. SEO Implementation

### 9.1 Metadata Configuration

```typescript
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://mysmart.academy'),
  title: {
    default: 'Smart Academy | Islamic Education Excellence',
    template: '%s | Smart Academy',
  },
  description:
    'Smart Academy provides quality Islamic education combined with modern STEAM curriculum for students from PlayGroup to Class 9 in Lakshmipur, Bangladesh.',
  keywords: [
    'Smart Academy',
    'Islamic education',
    'Bangladesh school',
    'STEAM education',
    'Quran education',
    'Lakshmipur school',
    'Islamic school Bangladesh',
  ],
  authors: [{ name: 'Smart Academy' }],
  creator: 'Smart Academy',
  publisher: 'Smart Academy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'bn_BD',
    url: 'https://mysmart.academy',
    siteName: 'Smart Academy',
    title: 'Smart Academy | Islamic Education Excellence',
    description:
      'Quality Islamic education combined with modern STEAM curriculum',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Smart Academy - Islamic Education Excellence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Academy | Islamic Education Excellence',
    description:
      'Quality Islamic education combined with modern STEAM curriculum',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};
```

### 9.2 Page-Specific Metadata

```typescript
// app/academics/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academic Programs',
  description:
    'Explore Smart Academy\'s comprehensive academic programs from Early Childhood to Secondary Education, featuring Islamic Studies and STEAM curriculum.',
  openGraph: {
    title: 'Academic Programs | Smart Academy',
    description:
      'Comprehensive academic programs with Islamic Studies and STEAM curriculum',
  },
};

// Dynamic metadata for student pages
// app/students/[id]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const student = await getStudent(params.id);

  return {
    title: `${student.name} - Student Profile`,
    description: `View ${student.name}'s academic profile and progress at Smart Academy`,
    robots: {
      index: false, // Don't index student profiles
      follow: false,
    },
  };
}
```

### 9.3 Structured Data

```typescript
// components/seo/structured-data.tsx
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Smart Academy',
    alternateName: 'Smart Academy Lakshmipur',
    url: 'https://mysmart.academy',
    logo: 'https://mysmart.academy/logo.png',
    description:
      'Islamic educational institution providing quality education from PlayGroup to Class 9',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Norimpur, Ramganj',
      addressLocality: 'Lakshmipur',
      addressRegion: 'Chittagong Division',
      postalCode: '3600',
      addressCountry: 'BD',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+880-1XXX-XXXXXX',
      contactType: 'admissions',
      availableLanguage: ['English', 'Bengali'],
    },
    sameAs: [
      'https://facebook.com/smartacademylakshmipur',
      'https://youtube.com/smartacademy',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### 9.4 Sitemap Generation

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mysmart.academy';

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/about/history',
    '/about/leadership',
    '/about/vision-mission',
    '/academics',
    '/academics/early-childhood',
    '/academics/primary',
    '/academics/secondary',
    '/academics/islamic-education',
    '/admissions',
    '/admissions/fees',
    '/campus',
    '/campus/facilities',
    '/news',
    '/events',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic pages (news articles)
  const news = await getPublishedNews();
  const newsPages = news.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...newsPages];
}
```

---

## 10. Accessibility Implementation

### 10.1 WCAG 2.1 AA Compliance Checklist

| Criterion | Requirement | Implementation |
|-----------|-------------|----------------|
| 1.1.1 | Non-text Content | All images have alt text |
| 1.3.1 | Info and Relationships | Semantic HTML structure |
| 1.4.3 | Contrast (Minimum) | 4.5:1 for text, 3:1 for large text |
| 2.1.1 | Keyboard | All interactive elements keyboard accessible |
| 2.4.1 | Bypass Blocks | Skip to main content link |
| 2.4.4 | Link Purpose | Descriptive link text |
| 2.4.7 | Focus Visible | Clear focus indicators |
| 3.1.1 | Language of Page | lang attribute set |
| 3.3.1 | Error Identification | Errors clearly marked |
| 4.1.2 | Name, Role, Value | ARIA attributes properly used |

### 10.2 Skip Navigation

```typescript
// components/layout/skip-nav.tsx
import Link from 'next/link';

export function SkipNav() {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
                 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white
                 focus:rounded-md focus:outline-none"
    >
      Skip to main content
    </Link>
  );
}

// Usage in layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SkipNav />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

### 10.3 Focus Management

```typescript
// hooks/use-focus-trap.ts
import { useEffect, useRef } from 'react';

export function useFocusTrap<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return containerRef;
}
```

### 10.4 ARIA Components

```typescript
// components/ui/accessible-tabs.tsx
'use client';

import { useState, useId } from 'react';
import { cn } from '@/lib/cn';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AccessibleTabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function AccessibleTabs({ tabs, defaultTab }: AccessibleTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const id = useId();

  return (
    <div>
      <div
        role="tablist"
        aria-label="Content tabs"
        className="flex border-b"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`${id}-tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${id}-panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => {
              const currentIndex = tabs.findIndex((t) => t.id === activeTab);
              if (e.key === 'ArrowRight') {
                const nextIndex = (currentIndex + 1) % tabs.length;
                setActiveTab(tabs[nextIndex].id);
              } else if (e.key === 'ArrowLeft') {
                const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                setActiveTab(tabs[prevIndex].id);
              }
            }}
            className={cn(
              'px-4 py-2 font-medium transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset',
              activeTab === tab.id
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${id}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          tabIndex={0}
          className="py-4"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
```

### 10.5 Screen Reader Utilities

```typescript
// components/ui/screen-reader.tsx

// Visually hidden but accessible to screen readers
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  );
}

// Announce dynamic content changes
export function LiveRegion({
  children,
  assertive = false,
}: {
  children: React.ReactNode;
  assertive?: boolean;
}) {
  return (
    <div
      role="status"
      aria-live={assertive ? 'assertive' : 'polite'}
      aria-atomic="true"
      className="sr-only"
    >
      {children}
    </div>
  );
}

// Usage
function StudentList({ students, isLoading }) {
  return (
    <div>
      <LiveRegion>
        {isLoading
          ? 'Loading students...'
          : `Showing ${students.length} students`}
      </LiveRegion>
      {/* Student list */}
    </div>
  );
}
```

---

## 11. Responsive Design Approach

### 11.1 Breakpoint System

```css
/* Tailwind CSS 4 breakpoints (mobile-first) */
@theme {
  --breakpoint-sm: 640px;   /* Small tablets */
  --breakpoint-md: 768px;   /* Tablets */
  --breakpoint-lg: 1024px;  /* Laptops */
  --breakpoint-xl: 1280px;  /* Desktops */
  --breakpoint-2xl: 1536px; /* Large screens */
}
```

### 11.2 Container Queries

```typescript
// components/shared/responsive-card.tsx
import { cn } from '@/lib/cn';

interface ResponsiveCardProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveCard({ children, className }: ResponsiveCardProps) {
  return (
    <div className={cn('@container', className)}>
      <div
        className="
          p-4
          @sm:p-6
          @md:p-8

          grid gap-4
          @sm:grid-cols-2
          @md:grid-cols-3
        "
      >
        {children}
      </div>
    </div>
  );
}
```

### 11.3 Responsive Layout Patterns

```typescript
// components/layout/responsive-sidebar-layout.tsx
'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import { useUIStore } from '@/store/use-ui-store';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface ResponsiveSidebarLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export function ResponsiveSidebarLayout({
  sidebar,
  children,
}: ResponsiveSidebarLayoutProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  if (isDesktop) {
    // Desktop: Fixed sidebar
    return (
      <div className="flex min-h-screen">
        <aside className="w-64 flex-shrink-0 border-r bg-background">
          {sidebar}
        </aside>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    );
  }

  // Mobile: Sheet sidebar
  return (
    <div className="min-h-screen">
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          {sidebar}
        </SheetContent>
      </Sheet>
      <main className="p-4">{children}</main>
    </div>
  );
}
```

### 11.4 Responsive Data Display

```typescript
// components/features/students/responsive-student-list.tsx
'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import { StudentCard } from './student-card';
import { StudentTable } from './student-table';
import type { Student } from '@/types';

interface ResponsiveStudentListProps {
  students: Student[];
}

export function ResponsiveStudentList({ students }: ResponsiveStudentListProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    // Desktop: Table view
    return <StudentTable students={students} />;
  }

  // Mobile: Card view
  return (
    <div className="space-y-4">
      {students.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}
```

---

## 12. Internationalization (i18n)

### 12.1 Language Configuration

```typescript
// config/i18n.ts
export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'bn'] as const,
  localeNames: {
    en: 'English',
    bn: 'বাংলা',
  },
};

export type Locale = (typeof i18nConfig.locales)[number];
```

### 12.2 Translation Files

```typescript
// dictionaries/en.ts
export const en = {
  common: {
    welcome: 'Welcome',
    login: 'Login',
    logout: 'Logout',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    loading: 'Loading...',
    noResults: 'No results found',
  },
  navigation: {
    home: 'Home',
    about: 'About',
    academics: 'Academics',
    admissions: 'Admissions',
    contact: 'Contact',
    dashboard: 'Dashboard',
    students: 'Students',
    attendance: 'Attendance',
    fees: 'Fees',
    islamic: 'Islamic Education',
  },
  students: {
    title: 'Students',
    addStudent: 'Add Student',
    editStudent: 'Edit Student',
    studentDetails: 'Student Details',
    firstName: 'First Name',
    lastName: 'Last Name',
    class: 'Class',
    section: 'Section',
    enrollmentNumber: 'Enrollment Number',
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
  },
  islamic: {
    quranProgress: 'Quran Progress',
    prayerTimes: 'Prayer Times',
    surah: 'Surah',
    juz: 'Juz',
    memorized: 'Memorized',
    inProgress: 'In Progress',
    notStarted: 'Not Started',
    fajr: 'Fajr',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha',
  },
  validation: {
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email',
    invalidPhone: 'Please enter a valid phone number',
    minLength: 'Must be at least {{min}} characters',
    maxLength: 'Must be less than {{max}} characters',
  },
};

export type Dictionary = typeof en;
```

```typescript
// dictionaries/bn.ts
export const bn: Dictionary = {
  common: {
    welcome: 'স্বাগতম',
    login: 'লগইন',
    logout: 'লগআউট',
    save: 'সংরক্ষণ',
    cancel: 'বাতিল',
    delete: 'মুছুন',
    edit: 'সম্পাদনা',
    search: 'অনুসন্ধান',
    loading: 'লোড হচ্ছে...',
    noResults: 'কোনো ফলাফল পাওয়া যায়নি',
  },
  navigation: {
    home: 'হোম',
    about: 'আমাদের সম্পর্কে',
    academics: 'শিক্ষা কার্যক্রম',
    admissions: 'ভর্তি',
    contact: 'যোগাযোগ',
    dashboard: 'ড্যাশবোর্ড',
    students: 'শিক্ষার্থী',
    attendance: 'উপস্থিতি',
    fees: 'ফি',
    islamic: 'ইসলামিক শিক্ষা',
  },
  students: {
    title: 'শিক্ষার্থী',
    addStudent: 'শিক্ষার্থী যোগ করুন',
    editStudent: 'শিক্ষার্থী সম্পাদনা',
    studentDetails: 'শিক্ষার্থীর বিবরণ',
    firstName: 'প্রথম নাম',
    lastName: 'শেষ নাম',
    class: 'শ্রেণী',
    section: 'শাখা',
    enrollmentNumber: 'ভর্তি নম্বর',
    dateOfBirth: 'জন্ম তারিখ',
    gender: 'লিঙ্গ',
    male: 'পুরুষ',
    female: 'মহিলা',
  },
  islamic: {
    quranProgress: 'কুরআন অগ্রগতি',
    prayerTimes: 'নামাজের সময়',
    surah: 'সূরা',
    juz: 'পারা',
    memorized: 'মুখস্থ',
    inProgress: 'চলমান',
    notStarted: 'শুরু হয়নি',
    fajr: 'ফজর',
    dhuhr: 'যোহর',
    asr: 'আসর',
    maghrib: 'মাগরিব',
    isha: 'ইশা',
  },
  validation: {
    required: 'এই ফিল্ডটি প্রয়োজন',
    invalidEmail: 'সঠিক ইমেইল প্রদান করুন',
    invalidPhone: 'সঠিক ফোন নম্বর প্রদান করুন',
    minLength: 'কমপক্ষে {{min}} অক্ষর হতে হবে',
    maxLength: '{{max}} অক্ষরের কম হতে হবে',
  },
};
```

### 12.3 Translation Hook

```typescript
// hooks/use-translations.ts
'use client';

import { useUIStore } from '@/store/use-ui-store';
import { en } from '@/dictionaries/en';
import { bn } from '@/dictionaries/bn';
import type { Dictionary } from '@/dictionaries/en';

const dictionaries = {
  en,
  bn,
};

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

type TranslationKey = NestedKeyOf<Dictionary>;

export function useTranslations() {
  const { language } = useUIStore();
  const dictionary = dictionaries[language];

  function t(key: TranslationKey, params?: Record<string, string | number>): string {
    const keys = key.split('.');
    let value: unknown = dictionary;

    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    // Replace parameters
    if (params) {
      return Object.entries(params).reduce(
        (acc, [paramKey, paramValue]) =>
          acc.replace(`{{${paramKey}}}`, String(paramValue)),
        value
      );
    }

    return value;
  }

  return { t, language };
}

// Usage
function StudentForm() {
  const { t } = useTranslations();

  return (
    <form>
      <label>{t('students.firstName')}</label>
      <Button>{t('common.save')}</Button>
    </form>
  );
}
```

---

## 13. Testing Strategy

### 13.1 Testing Pyramid

```
                    ┌───────────────┐
                    │      E2E      │  (5-10%)
                    │   Playwright  │
                    └───────┬───────┘
                            │
              ┌─────────────┴─────────────┐
              │       Integration         │  (20-30%)
              │    React Testing Lib      │
              └─────────────┬─────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │              Unit Tests               │  (60-70%)
        │          Vitest / Jest                │
        └───────────────────────────────────────┘
```

### 13.2 Unit Tests

```typescript
// components/ui/__tests__/button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies variant classes', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');
  });
});
```

### 13.3 Integration Tests

```typescript
// components/features/students/__tests__/student-form.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi } from 'vitest';
import { StudentForm } from '../student-form';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe('StudentForm', () => {
  it('validates required fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(<StudentForm />);

    await user.click(screen.getByRole('button', { name: /add student/i }));

    await waitFor(() => {
      expect(screen.getByText(/first name must be at least/i)).toBeInTheDocument();
    });
  });

  it('submits valid form data', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    renderWithProviders(<StudentForm onSuccess={onSuccess} />);

    await user.type(screen.getByLabelText(/first name/i), 'Ahmed');
    await user.type(screen.getByLabelText(/last name/i), 'Khan');
    await user.type(screen.getByLabelText(/date of birth/i), '2015-01-01');
    await user.selectOptions(screen.getByLabelText(/gender/i), 'male');
    // ... fill other required fields

    await user.click(screen.getByRole('button', { name: /add student/i }));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
```

### 13.4 E2E Tests

```typescript
// tests/e2e/student-management.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Student Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('input[name="email"]', 'admin@smartacademy.com');
    await page.fill('input[name="password"]', 'testpassword');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('can add a new student', async ({ page }) => {
    await page.goto('/students/new');

    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'Student');
    await page.fill('input[name="dateOfBirth"]', '2015-06-15');
    await page.selectOption('select[name="gender"]', 'male');
    await page.selectOption('select[name="classId"]', { index: 1 });

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/students');
    await expect(page.getByText('Test Student')).toBeVisible();
  });

  test('can search for students', async ({ page }) => {
    await page.goto('/students');

    await page.fill('input[placeholder*="Search"]', 'Ahmed');
    await page.waitForTimeout(500); // Debounce

    const studentCards = page.getByTestId('student-card');
    const count = await studentCards.count();

    for (let i = 0; i < count; i++) {
      await expect(studentCards.nth(i)).toContainText(/ahmed/i);
    }
  });
});
```

---

## 14. Build and Deployment

### 14.1 Build Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Output
  output: 'standalone',

  // TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.mysmart.academy',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Headers
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
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },

  // Environment variables validation
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default nextConfig;
```

### 14.2 Deployment Checklist

```markdown
## Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Code reviewed

### Performance
- [ ] Bundle size within budget (< 300KB initial JS)
- [ ] Lighthouse score > 90
- [ ] Images optimized
- [ ] Fonts preloaded

### SEO
- [ ] Meta tags configured
- [ ] Sitemap generated
- [ ] robots.txt configured
- [ ] Structured data validated

### Security
- [ ] Environment variables secure
- [ ] HTTPS configured
- [ ] Security headers set
- [ ] CSP configured

### Accessibility
- [ ] WCAG 2.1 AA compliant
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Color contrast verified

### Monitoring
- [ ] Error tracking configured
- [ ] Analytics configured
- [ ] Uptime monitoring set
- [ ] Performance monitoring enabled
```

---

## Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Developer | | _________________ | ________ |
| Technical Lead | | _________________ | ________ |

---

**Document Version:** 1.0
**Last Updated:** January 10, 2026
**Status:** Approved for Implementation

---

*This Frontend Technical Specification provides comprehensive guidelines for building the Smart Academy Digital Portal frontend applications. All frontend development must adhere to these specifications to ensure consistency, performance, and maintainability.*
