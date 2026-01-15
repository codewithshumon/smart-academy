# Smart Academy Digital Portal - Coding Standards Document

**Document Title:** Coding Standards and Style Guide
**Document ID:** TECH_Coding_Standards_v1.0
**Version:** 1.0
**Date:** January 10, 2026
**Project Name:** Smart Academy Digital Web Portal Development
**Prepared By:** Solo Full-Stack Developer

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | January 10, 2026 | Development Team | Initial Coding Standards Document |

**Reference Documents:**
- Smart Academy Technology Stack v1.0
- Smart Academy SRS v1.0
- Smart Academy Architecture Document v1.0

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [JavaScript/TypeScript Style Guide](#2-javascripttypescript-style-guide)
3. [React/Next.js Conventions](#3-reactnextjs-conventions)
4. [CSS/Tailwind CSS Conventions](#4-csstailwind-css-conventions)
5. [File Naming Conventions](#5-file-naming-conventions)
6. [Folder Structure Conventions](#6-folder-structure-conventions)
7. [Git Commit Message Conventions](#7-git-commit-message-conventions)
8. [Code Review Checklist](#8-code-review-checklist)
9. [ESLint/Prettier Configuration](#9-eslintprettier-configuration)
10. [Backend Coding Standards](#10-backend-coding-standards)
11. [Database Conventions](#11-database-conventions)
12. [Documentation Standards](#12-documentation-standards)

---

## 1. Introduction

### 1.1 Purpose

This document establishes the coding standards, conventions, and best practices for the Smart Academy Digital Portal development. It ensures consistency, maintainability, and quality across the entire codebase while promoting efficient collaboration in a solo full-stack developer environment.

### 1.2 Scope

These standards apply to all code written for:
- Public Website (Next.js 15 + React 19)
- Admin Dashboard (React 18 + Vite 6)
- Custom Backend Services (Node.js 22 LTS + Fastify 5)
- Mobile Application (React Native 0.76 + Expo 52)
- Database Scripts and Migrations
- Configuration and Infrastructure Code

### 1.3 Technology Stack Reference

| Technology | Version | Purpose |
|------------|---------|---------|
| TypeScript | 5.x | Primary language |
| Next.js | 15.x | Public website framework |
| React | 19.x | UI library |
| Tailwind CSS | 4.x | Styling framework |
| Node.js | 22 LTS | Backend runtime |
| Fastify | 5.x | API framework |
| Prisma | 6.x | ORM |
| ESLint | 9.x | Linting (flat config) |
| Prettier | 3.x | Code formatting |

### 1.4 Guiding Principles

1. **Consistency**: Follow established patterns throughout the codebase
2. **Readability**: Write code that is easy to understand and maintain
3. **Simplicity**: Prefer simple solutions over complex ones
4. **Type Safety**: Leverage TypeScript's type system fully
5. **Performance**: Write efficient code without premature optimization
6. **Accessibility**: Ensure all code supports accessibility requirements
7. **Security**: Follow security best practices in all code

---

## 2. JavaScript/TypeScript Style Guide

### 2.1 General Rules

#### 2.1.1 TypeScript Strict Mode

All projects MUST use TypeScript strict mode:

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

#### 2.1.2 Avoid `any` Type

Never use `any` type. Use `unknown` when type is truly unknown, then narrow the type:

```typescript
// BAD - Avoid this
function processData(data: any): any {
  return data.value;
}

// GOOD - Use proper typing
function processData(data: unknown): string {
  if (isValidData(data)) {
    return data.value;
  }
  throw new Error('Invalid data');
}

// Type guard
function isValidData(data: unknown): data is { value: string } {
  return (
    typeof data === 'object' &&
    data !== null &&
    'value' in data &&
    typeof (data as { value: unknown }).value === 'string'
  );
}
```

#### 2.1.3 Use Type Inference

Let TypeScript infer types when obvious:

```typescript
// BAD - Redundant type annotation
const name: string = 'Smart Academy';
const count: number = 42;
const students: Student[] = getStudents();

// GOOD - Let TypeScript infer
const name = 'Smart Academy';
const count = 42;
const students = getStudents(); // Return type already defined
```

### 2.2 Naming Conventions

#### 2.2.1 Variables and Functions

| Convention | Usage | Example |
|------------|-------|---------|
| camelCase | Variables, functions, methods | `studentName`, `calculateTotal()` |
| PascalCase | Classes, interfaces, types, enums | `StudentProfile`, `IUserService` |
| SCREAMING_SNAKE_CASE | Constants, environment variables | `MAX_RETRY_COUNT`, `API_BASE_URL` |
| kebab-case | File names, CSS classes | `student-profile.tsx`, `primary-button` |

#### 2.2.2 Type and Interface Naming

```typescript
// Types use PascalCase without prefix
type StudentStatus = 'active' | 'inactive' | 'graduated';

// Interfaces use PascalCase (no 'I' prefix in modern conventions)
interface Student {
  id: string;
  name: string;
  status: StudentStatus;
}

// Generic type parameters should be descriptive (avoid single letters)
type ApiResponse<TData, TError = Error> = {
  data: TData | null;
  error: TError | null;
  loading: boolean;
};

// Avoid single letter generics except in simple cases
// BAD
type Result<T> = { value: T };

// GOOD
type Result<TValue> = { value: TValue };
```

#### 2.2.3 Boolean Naming

Boolean variables should indicate true/false state clearly:

```typescript
// GOOD - Clear boolean names
const isActive = true;
const hasPermission = false;
const canEdit = true;
const shouldRefresh = false;
const wasSuccessful = true;

// BAD - Ambiguous
const active = true;
const permission = false;
const edit = true;
```

#### 2.2.4 Function Naming

```typescript
// Use verb prefixes for functions
function getStudent(id: string): Student { }
function setStudentName(name: string): void { }
function calculateTotalFees(): number { }
function validateEmail(email: string): boolean { }
function formatDate(date: Date): string { }
function parseJson<T>(json: string): T { }
function handleSubmit(): void { }
function fetchStudents(): Promise<Student[]> { }
function createStudent(data: CreateStudentDto): Promise<Student> { }
function updateStudent(id: string, data: UpdateStudentDto): Promise<Student> { }
function deleteStudent(id: string): Promise<void> { }

// Event handlers use 'handle' prefix
function handleClick(): void { }
function handleFormSubmit(event: FormEvent): void { }
function handleInputChange(event: ChangeEvent<HTMLInputElement>): void { }
```

### 2.3 Code Organization

#### 2.3.1 Import Order

Organize imports in the following order with blank lines between groups:

```typescript
// 1. React and framework imports
import React, { useState, useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';

// 2. Third-party library imports
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

// 3. Internal absolute imports (@/)
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { studentService } from '@/services/student-service';

// 4. Internal relative imports
import { StudentCard } from './student-card';
import { formatStudentName } from './utils';

// 5. Type imports (separate)
import type { Student, StudentStatus } from '@/types/student';

// 6. Style imports
import styles from './student-list.module.css';
```

#### 2.3.2 File Structure

Each file should follow this structure:

```typescript
// 1. File-level JSDoc comment (if needed)
/**
 * Student management service
 * Handles CRUD operations for student records
 */

// 2. Imports (organized as above)
import { z } from 'zod';
import type { Student } from '@/types';

// 3. Type definitions local to this file
interface StudentServiceConfig {
  baseUrl: string;
  timeout: number;
}

// 4. Constants
const DEFAULT_TIMEOUT = 5000;
const MAX_RETRIES = 3;

// 5. Helper functions (not exported)
function buildUrl(path: string): string {
  return `${config.baseUrl}${path}`;
}

// 6. Main exports
export class StudentService {
  // ...
}

// 7. Default export (if applicable)
export default StudentService;
```

### 2.4 Functions and Methods

#### 2.4.1 Function Length

- Maximum 50 lines per function
- If longer, extract into smaller helper functions
- Each function should do one thing well

#### 2.4.2 Parameter Limits

```typescript
// BAD - Too many parameters
function createStudent(
  name: string,
  email: string,
  class: string,
  section: string,
  parentName: string,
  parentPhone: string,
  address: string,
): Student { }

// GOOD - Use object parameter
interface CreateStudentParams {
  name: string;
  email: string;
  classId: string;
  section: string;
  parentInfo: {
    name: string;
    phone: string;
  };
  address: string;
}

function createStudent(params: CreateStudentParams): Student { }
```

#### 2.4.3 Return Types

Always explicitly define return types for exported functions:

```typescript
// GOOD - Explicit return type
export function calculateAttendancePercentage(
  present: number,
  total: number,
): number {
  return (present / total) * 100;
}

// GOOD - Async function with explicit return type
export async function fetchStudent(id: string): Promise<Student | null> {
  const response = await api.get(`/students/${id}`);
  return response.data;
}
```

### 2.5 Error Handling

#### 2.5.1 Custom Error Classes

```typescript
// Create custom error classes for specific error types
export class ValidationError extends Error {
  constructor(
    message: string,
    public readonly field: string,
    public readonly code: string,
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  constructor(
    resource: string,
    identifier: string,
  ) {
    super(`${resource} with identifier '${identifier}' not found`);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized access') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
```

#### 2.5.2 Try-Catch Patterns

```typescript
// GOOD - Specific error handling
async function getStudent(id: string): Promise<Student> {
  try {
    const student = await studentRepository.findById(id);
    if (!student) {
      throw new NotFoundError('Student', id);
    }
    return student;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error; // Re-throw known errors
    }
    // Log and wrap unknown errors
    logger.error('Failed to fetch student', { id, error });
    throw new Error(`Failed to fetch student: ${id}`);
  }
}
```

### 2.6 Async/Await

#### 2.6.1 Prefer async/await over Promises

```typescript
// BAD - Promise chains
function fetchStudentData(id: string) {
  return fetch(`/api/students/${id}`)
    .then(response => response.json())
    .then(data => processData(data))
    .catch(error => handleError(error));
}

// GOOD - async/await
async function fetchStudentData(id: string): Promise<ProcessedData> {
  try {
    const response = await fetch(`/api/students/${id}`);
    const data = await response.json();
    return processData(data);
  } catch (error) {
    handleError(error);
    throw error;
  }
}
```

#### 2.6.2 Parallel Execution

```typescript
// GOOD - Execute independent operations in parallel
async function fetchStudentDashboard(studentId: string): Promise<Dashboard> {
  const [attendance, grades, fees] = await Promise.all([
    fetchAttendance(studentId),
    fetchGrades(studentId),
    fetchFees(studentId),
  ]);

  return { attendance, grades, fees };
}
```

### 2.7 Comments and Documentation

#### 2.7.1 When to Comment

```typescript
// DON'T comment obvious code
// BAD
// Increment counter by 1
counter++;

// DO comment complex business logic
// Fee calculation: Apply 5% late fee if payment is overdue by more than 30 days
// as per business rule BR-FEE-006
if (daysOverdue > 30) {
  totalFee = baseFee * 1.05;
}

// DO document non-obvious decisions
// Using Hanafi calculation method for prayer times as per school's Islamic requirements
const prayerTimes = calculatePrayerTimes(location, 'hanafi');
```

#### 2.7.2 JSDoc for Public APIs

```typescript
/**
 * Calculates the attendance percentage for a student
 *
 * @param studentId - The unique identifier of the student
 * @param options - Configuration options for the calculation
 * @param options.startDate - Start date for the calculation period
 * @param options.endDate - End date for the calculation period
 * @param options.includeExcused - Whether to include excused absences as present
 * @returns The attendance percentage (0-100)
 * @throws {NotFoundError} If the student is not found
 * @example
 * ```typescript
 * const percentage = await calculateAttendancePercentage('student-123', {
 *   startDate: new Date('2026-01-01'),
 *   endDate: new Date('2026-01-31'),
 *   includeExcused: true,
 * });
 * ```
 */
export async function calculateAttendancePercentage(
  studentId: string,
  options: AttendanceCalculationOptions,
): Promise<number> {
  // Implementation
}
```

---

## 3. React/Next.js Conventions

### 3.1 Component Structure

#### 3.1.1 Functional Components Only

Use functional components with hooks exclusively:

```typescript
// GOOD - Functional component with TypeScript
interface StudentCardProps {
  student: Student;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function StudentCard({ student, onEdit, onDelete }: StudentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className="student-card">
      <h3>{student.name}</h3>
      {/* Component content */}
    </div>
  );
}
```

#### 3.1.2 Component File Structure

```typescript
// student-card.tsx

// 1. Imports
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import type { Student } from '@/types';

// 2. Types/Interfaces
interface StudentCardProps {
  student: Student;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

// 3. Constants (component-specific)
const MAX_NAME_LENGTH = 50;

// 4. Helper functions (if not exported)
function truncateName(name: string): string {
  return name.length > MAX_NAME_LENGTH
    ? `${name.slice(0, MAX_NAME_LENGTH)}...`
    : name;
}

// 5. Component definition
export function StudentCard({
  student,
  onEdit,
  onDelete,
  className,
}: StudentCardProps) {
  // 5a. Hooks (in consistent order)
  const [isLoading, setIsLoading] = useState(false);

  // 5b. Derived state
  const displayName = truncateName(student.name);

  // 5c. Event handlers
  const handleEdit = useCallback(() => {
    onEdit?.(student.id);
  }, [onEdit, student.id]);

  // 5d. Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);

  // 5e. Render
  return (
    <div className={className}>
      {/* JSX */}
    </div>
  );
}

// 6. Default export (optional, named exports preferred)
export default StudentCard;
```

### 3.2 Hooks

#### 3.2.1 Hook Order

Always call hooks in the same order:

```typescript
function StudentDashboard({ studentId }: Props) {
  // 1. useState hooks
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

  // 2. useRef hooks
  const containerRef = useRef<HTMLDivElement>(null);

  // 3. useContext hooks
  const { user } = useAuth();
  const { theme } = useTheme();

  // 4. Custom hooks
  const { data: student, isLoading: studentLoading } = useStudent(studentId);
  const { data: grades } = useGrades(studentId);

  // 5. useMemo hooks (derived data)
  const attendancePercentage = useMemo(() => {
    return calculatePercentage(student?.attendance);
  }, [student?.attendance]);

  // 6. useCallback hooks (memoized functions)
  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  // 7. useEffect hooks
  useEffect(() => {
    // Side effects
  }, [dependencies]);

  // Return JSX
}
```

#### 3.2.2 Custom Hook Naming

Custom hooks MUST start with `use`:

```typescript
// hooks/use-student.ts
export function useStudent(studentId: string) {
  return useQuery({
    queryKey: ['student', studentId],
    queryFn: () => studentService.getById(studentId),
  });
}

// hooks/use-attendance.ts
export function useAttendance(studentId: string, options?: AttendanceOptions) {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  // Implementation
  return { attendance, markAttendance, isLoading };
}

// hooks/use-local-storage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Implementation
  return [storedValue, setValue] as const;
}
```

### 3.3 Props

#### 3.3.1 Props Interface Naming

```typescript
// Use 'Props' suffix for component props
interface StudentCardProps {
  student: Student;
  variant?: 'compact' | 'expanded';
}

// Use descriptive names for complex props
interface StudentListFilterProps {
  filters: StudentFilters;
  onFilterChange: (filters: StudentFilters) => void;
}
```

#### 3.3.2 Destructure Props

```typescript
// GOOD - Destructure in function signature
function StudentCard({ student, onEdit, className }: StudentCardProps) {
  return <div className={className}>{student.name}</div>;
}

// GOOD - With default values
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
}: ButtonProps) {
  // Implementation
}
```

#### 3.3.3 Forward Refs

```typescript
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, className, ...props }, ref) {
    return (
      <div className="input-wrapper">
        {label && <label>{label}</label>}
        <input ref={ref} className={className} {...props} />
        {error && <span className="error">{error}</span>}
      </div>
    );
  }
);
```

### 3.4 State Management

#### 3.4.1 Local State

Use `useState` for component-local state:

```typescript
function StudentForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
}
```

#### 3.4.2 Form State

Use React Hook Form for complex forms:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const studentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  classId: z.string().min(1, 'Class is required'),
});

type StudentFormData = z.infer<typeof studentSchema>;

function StudentForm({ onSubmit }: StudentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      {/* More fields */}
    </form>
  );
}
```

#### 3.4.3 Server State

Use TanStack Query (React Query) for server state:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetching data
function useStudents(filters: StudentFilters) {
  return useQuery({
    queryKey: ['students', filters],
    queryFn: () => studentService.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Mutations
function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: studentService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
}
```

#### 3.4.4 Global State

Use Zustand for global client state:

```typescript
// store/use-ui-store.ts
import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  theme: 'light',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setTheme: (theme) => set({ theme }),
}));
```

### 3.5 Next.js Specific Conventions

#### 3.5.1 Server vs Client Components

```typescript
// app/students/page.tsx - Server Component (default)
import { StudentList } from '@/components/students/student-list';
import { studentService } from '@/services/student-service';

export default async function StudentsPage() {
  const students = await studentService.getAll();

  return (
    <div>
      <h1>Students</h1>
      <StudentList students={students} />
    </div>
  );
}

// components/students/student-search.tsx - Client Component
'use client';

import { useState } from 'react';

export function StudentSearch({ onSearch }: StudentSearchProps) {
  const [query, setQuery] = useState('');
  // Interactive component logic
}
```

#### 3.5.2 Route Handlers

```typescript
// app/api/students/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { studentService } from '@/services/student-service';

const createStudentSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  classId: z.string(),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') ?? '1');
    const limit = parseInt(searchParams.get('limit') ?? '10');

    const students = await studentService.getAll({ page, limit });
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createStudentSchema.parse(body);
    const student = await studentService.create(data);
    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create student' },
      { status: 500 }
    );
  }
}
```

#### 3.5.3 Metadata

```typescript
// app/students/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Students | Smart Academy',
  description: 'Manage student records and information',
  openGraph: {
    title: 'Students | Smart Academy',
    description: 'Manage student records and information',
  },
};

export default function StudentsPage() {
  // Component
}
```

---

## 4. CSS/Tailwind CSS Conventions

### 4.1 Tailwind CSS Best Practices

#### 4.1.1 Class Organization

Order Tailwind classes consistently:

```tsx
// Order: Layout -> Sizing -> Spacing -> Typography -> Colors -> Effects -> States
<button
  className="
    flex items-center justify-center
    w-full h-12
    px-4 py-2
    text-sm font-medium
    bg-primary text-white
    rounded-lg shadow-md
    hover:bg-primary-dark
    focus:outline-none focus:ring-2 focus:ring-primary
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors duration-200
  "
>
  Submit
</button>
```

#### 4.1.2 Use `clsx` or `cn` for Conditional Classes

```typescript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function (place in lib/utils.ts)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage in components
function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        // Variant styles
        {
          'bg-primary text-white hover:bg-primary-dark': variant === 'primary',
          'bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',
          'border border-gray-300 hover:bg-gray-50': variant === 'outline',
        },
        // Size styles
        {
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4 text-base': size === 'md',
          'h-12 px-6 text-lg': size === 'lg',
        },
        // Custom classes
        className,
      )}
      {...props}
    />
  );
}
```

#### 4.1.3 Component Extraction with @apply

Use `@apply` sparingly for complex, frequently repeated patterns:

```css
/* styles/components.css */
@layer components {
  /* Only for truly complex patterns that are repeated often */
  .card {
    @apply rounded-lg border border-gray-200 bg-white p-6 shadow-sm;
  }

  .input-field {
    @apply w-full rounded-md border border-gray-300 px-3 py-2
           text-sm placeholder-gray-400
           focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
           disabled:bg-gray-50 disabled:cursor-not-allowed;
  }
}
```

### 4.2 Theme Configuration

#### 4.2.1 Tailwind v4 CSS-First Theme

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Colors - Smart Academy Brand */
  --color-primary: #0F9D58;
  --color-primary-dark: #0B7A45;
  --color-primary-light: #34D399;

  --color-secondary: #1976D2;
  --color-secondary-dark: #1565C0;
  --color-secondary-light: #42A5F5;

  --color-accent: #FFB300;
  --color-accent-dark: #FF8F00;

  /* Islamic Green Theme */
  --color-islamic-green: #0F9D58;
  --color-islamic-gold: #D4AF37;

  /* Semantic Colors */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;

  /* Font Families */
  --font-sans: 'Inter', 'Roboto', system-ui, sans-serif;
  --font-bengali: 'Kalpurush', 'SolaimanLipi', sans-serif;
  --font-arabic: 'Amiri', serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Font Sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
}
```

### 4.3 Responsive Design

#### 4.3.1 Mobile-First Approach

```tsx
// Always design mobile-first, then add breakpoint modifiers
<div className="
  flex flex-col gap-4
  md:flex-row md:gap-6
  lg:gap-8
">
  <aside className="
    w-full
    md:w-64
    lg:w-80
  ">
    {/* Sidebar */}
  </aside>
  <main className="
    flex-1
    px-4
    md:px-6
    lg:px-8
  ">
    {/* Main content */}
  </main>
</div>
```

#### 4.3.2 Breakpoint Reference

| Breakpoint | Min Width | CSS | Usage |
|------------|-----------|-----|-------|
| `sm` | 640px | `@media (min-width: 640px)` | Small tablets |
| `md` | 768px | `@media (min-width: 768px)` | Tablets |
| `lg` | 1024px | `@media (min-width: 1024px)` | Laptops |
| `xl` | 1280px | `@media (min-width: 1280px)` | Desktops |
| `2xl` | 1536px | `@media (min-width: 1536px)` | Large screens |

### 4.4 Accessibility

#### 4.4.1 Focus States

```tsx
// Always provide visible focus states
<button className="
  focus:outline-none
  focus:ring-2
  focus:ring-primary
  focus:ring-offset-2
">
  Click me
</button>

// For dark backgrounds
<button className="
  focus:outline-none
  focus:ring-2
  focus:ring-white
  focus:ring-offset-2
  focus:ring-offset-primary
">
  Click me
</button>
```

#### 4.4.2 Color Contrast

Ensure minimum 4.5:1 contrast ratio for normal text, 3:1 for large text:

```tsx
// GOOD - Sufficient contrast
<p className="text-gray-700">Normal text (4.5:1+ contrast)</p>
<h1 className="text-gray-600 text-2xl">Large heading (3:1+ contrast)</h1>

// BAD - Insufficient contrast
<p className="text-gray-400">Hard to read text</p>
```

#### 4.4.3 Reduced Motion Support

```tsx
// Respect user's reduced motion preference
<div className="
  transition-transform duration-300
  motion-reduce:transition-none
  motion-reduce:transform-none
">
  Animated content
</div>
```

---

## 5. File Naming Conventions

### 5.1 General Rules

| File Type | Convention | Example |
|-----------|------------|---------|
| React Components | kebab-case | `student-card.tsx` |
| Hooks | kebab-case with `use-` prefix | `use-student.ts` |
| Utilities | kebab-case | `format-date.ts` |
| Types/Interfaces | kebab-case | `student.types.ts` |
| Constants | kebab-case | `api-routes.ts` |
| Test files | `*.test.ts` or `*.spec.ts` | `student-card.test.tsx` |
| Style modules | `*.module.css` | `student-card.module.css` |
| Config files | kebab-case | `tailwind.config.ts` |

### 5.2 React Component Files

```
components/
├── ui/
│   ├── button.tsx              # Simple component
│   ├── dialog.tsx              # Single component
│   └── form/
│       ├── index.ts            # Re-exports
│       ├── form.tsx            # Main component
│       ├── form-field.tsx      # Sub-component
│       └── form.types.ts       # Types
├── students/
│   ├── index.ts                # Re-exports
│   ├── student-card.tsx
│   ├── student-list.tsx
│   ├── student-form.tsx
│   └── student.types.ts
```

### 5.3 File Name Examples

```
// Components
student-card.tsx
student-list.tsx
dashboard-header.tsx
navigation-menu.tsx

// Hooks
use-student.ts
use-local-storage.ts
use-debounce.ts

// Services
student-service.ts
auth-service.ts
payment-service.ts

// Utilities
format-date.ts
validate-email.ts
calculate-fee.ts

// Types
student.types.ts
api.types.ts
common.types.ts

// Constants
api-routes.ts
query-keys.ts
validation-rules.ts
```

---

## 6. Folder Structure Conventions

### 6.1 Next.js Project Structure

```
smart-academy-web/
├── app/                              # Next.js App Router
│   ├── (auth)/                       # Auth route group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── forgot-password/
│   │       └── page.tsx
│   ├── (dashboard)/                  # Dashboard route group
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── students/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── loading.tsx
│   │   └── teachers/
│   │       └── page.tsx
│   ├── (public)/                     # Public route group
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   └── admissions/
│   ├── api/                          # API routes
│   │   ├── students/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   ├── layout.tsx                    # Root layout
│   ├── globals.css                   # Global styles
│   └── not-found.tsx                 # 404 page
├── components/                       # React components
│   ├── ui/                           # UI primitives
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── index.ts
│   ├── layout/                       # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── sidebar.tsx
│   │   └── navigation.tsx
│   ├── features/                     # Feature-specific components
│   │   ├── students/
│   │   │   ├── student-card.tsx
│   │   │   ├── student-list.tsx
│   │   │   └── student-form.tsx
│   │   ├── attendance/
│   │   └── islamic/
│   └── shared/                       # Shared components
│       ├── data-table.tsx
│       ├── pagination.tsx
│       └── search-input.tsx
├── hooks/                            # Custom React hooks
│   ├── use-student.ts
│   ├── use-auth.ts
│   ├── use-local-storage.ts
│   └── index.ts
├── lib/                              # Utility libraries
│   ├── utils.ts                      # General utilities
│   ├── api-client.ts                 # API client setup
│   ├── validators.ts                 # Validation utilities
│   └── constants.ts                  # App constants
├── services/                         # Business logic services
│   ├── student-service.ts
│   ├── auth-service.ts
│   └── payment-service.ts
├── store/                            # State management
│   ├── use-ui-store.ts
│   └── use-user-store.ts
├── types/                            # TypeScript types
│   ├── student.ts
│   ├── api.ts
│   └── index.ts
├── config/                           # Configuration
│   ├── site.ts
│   └── navigation.ts
├── public/                           # Static assets
│   ├── images/
│   ├── fonts/
│   └── icons/
├── tests/                            # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.local                        # Local environment
├── .env.example                      # Environment template
├── next.config.ts                    # Next.js config
├── tailwind.config.ts                # Tailwind config
├── tsconfig.json                     # TypeScript config
├── eslint.config.mjs                 # ESLint flat config
└── package.json
```

### 6.2 Backend Project Structure

```
smart-academy-api/
├── src/
│   ├── modules/                      # Feature modules
│   │   ├── students/
│   │   │   ├── students.controller.ts
│   │   │   ├── students.service.ts
│   │   │   ├── students.repository.ts
│   │   │   ├── students.schema.ts
│   │   │   ├── students.routes.ts
│   │   │   └── dto/
│   │   │       ├── create-student.dto.ts
│   │   │       └── update-student.dto.ts
│   │   ├── islamic/
│   │   │   ├── quran/
│   │   │   ├── prayer-times/
│   │   │   └── hijri-calendar/
│   │   └── payments/
│   │       ├── bkash/
│   │       ├── nagad/
│   │       └── sslcommerz/
│   ├── common/                       # Shared utilities
│   │   ├── decorators/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── filters/
│   │   └── pipes/
│   ├── config/                       # Configuration
│   │   ├── database.config.ts
│   │   ├── auth.config.ts
│   │   └── app.config.ts
│   ├── database/                     # Database
│   │   ├── migrations/
│   │   ├── seeds/
│   │   └── prisma/
│   │       └── schema.prisma
│   ├── lib/                          # Utility libraries
│   │   ├── logger.ts
│   │   ├── cache.ts
│   │   └── queue.ts
│   ├── plugins/                      # Fastify plugins
│   │   ├── auth.plugin.ts
│   │   ├── cors.plugin.ts
│   │   └── swagger.plugin.ts
│   ├── types/                        # TypeScript types
│   │   └── index.ts
│   ├── app.ts                        # App setup
│   └── server.ts                     # Server entry
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── .env
├── .env.example
├── tsconfig.json
├── eslint.config.mjs
└── package.json
```

### 6.3 Import Path Aliases

Configure path aliases in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./components/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/lib/*": ["./lib/*"],
      "@/types/*": ["./types/*"],
      "@/services/*": ["./services/*"],
      "@/store/*": ["./store/*"]
    }
  }
}
```

---

## 7. Git Commit Message Conventions

### 7.1 Conventional Commits

Follow the Conventional Commits specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 7.2 Commit Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(students): add student profile page` |
| `fix` | Bug fix | `fix(auth): resolve login redirect loop` |
| `docs` | Documentation | `docs: update README with setup instructions` |
| `style` | Code style (formatting) | `style: format with prettier` |
| `refactor` | Code refactoring | `refactor(api): simplify error handling` |
| `perf` | Performance improvement | `perf(queries): optimize student list query` |
| `test` | Adding tests | `test(students): add unit tests for service` |
| `build` | Build system changes | `build: update webpack configuration` |
| `ci` | CI/CD changes | `ci: add GitHub Actions workflow` |
| `chore` | Maintenance tasks | `chore: update dependencies` |
| `revert` | Revert previous commit | `revert: revert "feat(students): add profile"` |

### 7.3 Scope Examples

Use scope to indicate the affected area:

```
feat(students): add student registration form
fix(attendance): correct percentage calculation
docs(api): add endpoint documentation
refactor(payments): extract payment gateway logic
test(islamic): add prayer time calculation tests
```

### 7.4 Commit Message Examples

#### Simple Feature

```
feat(students): add student search functionality

Add search by name, class, and enrollment number.
Search results are paginated and sortable.

Closes #123
```

#### Bug Fix

```
fix(fees): correct late fee calculation

The late fee was being calculated from the invoice date
instead of the due date. This caused incorrect fees for
invoices created before the due date.

Fixes #456
```

#### Breaking Change

```
feat(api)!: change student endpoint response structure

BREAKING CHANGE: The /api/students endpoint now returns
a paginated response with metadata instead of a plain array.

Migration: Update all API consumers to use response.data
instead of the response directly.

Closes #789
```

### 7.5 Commit Message Rules

1. **Use imperative mood**: "Add feature" not "Added feature" or "Adds feature"
2. **No period at the end of subject line**
3. **Limit subject line to 72 characters**
4. **Separate subject from body with blank line**
5. **Wrap body at 72 characters**
6. **Use body to explain what and why, not how**

### 7.6 Branch Naming

```
# Feature branches
feature/student-registration
feature/payment-integration
feature/islamic-module

# Bug fix branches
fix/login-redirect
fix/fee-calculation

# Hotfix branches
hotfix/security-patch

# Release branches
release/v1.0.0
release/v1.1.0
```

---

## 8. Code Review Checklist

### 8.1 Self-Review Checklist

Before submitting code for review:

#### General
- [ ] Code compiles without errors or warnings
- [ ] All tests pass locally
- [ ] No console.log statements (except for debugging in development)
- [ ] No commented-out code
- [ ] No TODO comments without issue reference

#### TypeScript
- [ ] No `any` types used
- [ ] Proper type annotations for function parameters and returns
- [ ] No type assertions (`as`) without justification
- [ ] Strict null checks handled properly

#### React
- [ ] Components are properly memoized where needed
- [ ] useEffect dependencies are correct and complete
- [ ] No memory leaks (cleanup in useEffect)
- [ ] Keys are unique and stable for list items
- [ ] Error boundaries implemented for critical sections

#### Performance
- [ ] No unnecessary re-renders
- [ ] Large lists are virtualized
- [ ] Images are optimized and lazy-loaded
- [ ] Bundle size impact considered

#### Security
- [ ] No sensitive data in client code
- [ ] User input is validated and sanitized
- [ ] API calls use proper authentication
- [ ] No XSS vulnerabilities in rendered content

#### Accessibility
- [ ] Proper semantic HTML elements used
- [ ] ARIA attributes added where needed
- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] Color contrast meets WCAG AA

#### Styling
- [ ] Responsive design works on all breakpoints
- [ ] No hardcoded colors (use theme)
- [ ] Consistent spacing using design tokens
- [ ] Dark mode support (if applicable)

### 8.2 Reviewer Checklist

When reviewing code:

#### Code Quality
- [ ] Code follows established patterns
- [ ] Functions are small and focused
- [ ] Names are clear and descriptive
- [ ] Logic is easy to follow
- [ ] No code duplication

#### Architecture
- [ ] Changes align with system architecture
- [ ] New dependencies are justified
- [ ] No circular dependencies introduced
- [ ] Proper separation of concerns

#### Testing
- [ ] Unit tests cover new functionality
- [ ] Edge cases are tested
- [ ] Error scenarios are tested
- [ ] Test names are descriptive

#### Documentation
- [ ] Complex logic is commented
- [ ] Public APIs have JSDoc
- [ ] README updated if needed
- [ ] Breaking changes documented

---

## 9. ESLint/Prettier Configuration

### 9.1 ESLint Flat Configuration

```javascript
// eslint.config.mjs
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        { allowExpressions: true },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
        },
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'has', 'can', 'should', 'was', 'will'],
        },
      ],

      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
      'react/self-closing-comp': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Imports
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc' },
        },
      ],
      'import/no-duplicates': 'error',

      // Accessibility
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/no-noninteractive-element-interactions': 'error',

      // General
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  prettierConfig,
);
```

### 9.2 Prettier Configuration

```json
// prettier.config.mjs
export default {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 80,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.ts',
  tailwindFunctions: ['clsx', 'cn', 'cva'],
};
```

### 9.3 VS Code Settings

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### 9.4 Editor Extensions

Required VS Code extensions:

```json
// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "prisma.prisma",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

---

## 10. Backend Coding Standards

### 10.1 Fastify Controller Pattern

```typescript
// modules/students/students.controller.ts
import type { FastifyRequest, FastifyReply } from 'fastify';
import { StudentService } from './students.service';
import { CreateStudentDto, UpdateStudentDto } from './dto';
import { PaginationParams } from '@/common/types';

export class StudentsController {
  constructor(private readonly studentService: StudentService) {}

  async getAll(
    request: FastifyRequest<{ Querystring: PaginationParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    const { page = 1, limit = 10 } = request.query;
    const students = await this.studentService.findAll({ page, limit });
    return reply.send(students);
  }

  async getById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id } = request.params;
    const student = await this.studentService.findById(id);

    if (!student) {
      return reply.code(404).send({ error: 'Student not found' });
    }

    return reply.send(student);
  }

  async create(
    request: FastifyRequest<{ Body: CreateStudentDto }>,
    reply: FastifyReply,
  ): Promise<void> {
    const student = await this.studentService.create(request.body);
    return reply.code(201).send(student);
  }

  async update(
    request: FastifyRequest<{ Params: { id: string }; Body: UpdateStudentDto }>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id } = request.params;
    const student = await this.studentService.update(id, request.body);
    return reply.send(student);
  }

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id } = request.params;
    await this.studentService.delete(id);
    return reply.code(204).send();
  }
}
```

### 10.2 Service Layer Pattern

```typescript
// modules/students/students.service.ts
import { PrismaClient } from '@prisma/client';
import { CreateStudentDto, UpdateStudentDto } from './dto';
import { Student } from '@/types';
import { NotFoundError } from '@/common/errors';
import { logger } from '@/lib/logger';

export class StudentService {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(params: { page: number; limit: number }): Promise<{
    data: Student[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const { page, limit } = params;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.student.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.student.count(),
    ]);

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<Student | null> {
    return this.prisma.student.findUnique({
      where: { id },
      include: {
        class: true,
        parent: true,
      },
    });
  }

  async create(data: CreateStudentDto): Promise<Student> {
    logger.info('Creating student', { name: data.name });

    return this.prisma.student.create({
      data: {
        name: data.name,
        email: data.email,
        classId: data.classId,
        enrollmentNumber: await this.generateEnrollmentNumber(),
      },
    });
  }

  async update(id: string, data: UpdateStudentDto): Promise<Student> {
    const student = await this.findById(id);

    if (!student) {
      throw new NotFoundError('Student', id);
    }

    return this.prisma.student.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    const student = await this.findById(id);

    if (!student) {
      throw new NotFoundError('Student', id);
    }

    await this.prisma.student.delete({ where: { id } });
  }

  private async generateEnrollmentNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.prisma.student.count({
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01`),
        },
      },
    });

    return `SA${year}${String(count + 1).padStart(5, '0')}`;
  }
}
```

### 10.3 Schema Validation with Zod

```typescript
// modules/students/students.schema.ts
import { z } from 'zod';

export const createStudentSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Invalid email address'),
  classId: z
    .string()
    .uuid('Invalid class ID'),
  dateOfBirth: z
    .string()
    .datetime()
    .optional(),
  parentId: z
    .string()
    .uuid()
    .optional(),
  address: z
    .string()
    .max(500)
    .optional(),
});

export const updateStudentSchema = createStudentSchema.partial();

export const studentQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  classId: z.string().uuid().optional(),
  status: z.enum(['active', 'inactive', 'graduated']).optional(),
});

// Type inference from schemas
export type CreateStudentDto = z.infer<typeof createStudentSchema>;
export type UpdateStudentDto = z.infer<typeof updateStudentSchema>;
export type StudentQuery = z.infer<typeof studentQuerySchema>;
```

### 10.4 Route Registration

```typescript
// modules/students/students.routes.ts
import type { FastifyInstance } from 'fastify';
import { StudentsController } from './students.controller';
import { StudentService } from './students.service';
import { createStudentSchema, updateStudentSchema, studentQuerySchema } from './students.schema';
import { zodToJsonSchema } from 'zod-to-json-schema';

export async function studentsRoutes(fastify: FastifyInstance): Promise<void> {
  const studentService = new StudentService(fastify.prisma);
  const controller = new StudentsController(studentService);

  fastify.get(
    '/',
    {
      schema: {
        querystring: zodToJsonSchema(studentQuerySchema),
        response: {
          200: {
            type: 'object',
            properties: {
              data: { type: 'array' },
              total: { type: 'number' },
              page: { type: 'number' },
              totalPages: { type: 'number' },
            },
          },
        },
      },
    },
    controller.getAll.bind(controller),
  );

  fastify.get(
    '/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
          required: ['id'],
        },
      },
    },
    controller.getById.bind(controller),
  );

  fastify.post(
    '/',
    {
      schema: {
        body: zodToJsonSchema(createStudentSchema),
      },
      preHandler: [fastify.authenticate],
    },
    controller.create.bind(controller),
  );

  fastify.put(
    '/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
          required: ['id'],
        },
        body: zodToJsonSchema(updateStudentSchema),
      },
      preHandler: [fastify.authenticate],
    },
    controller.update.bind(controller),
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
          required: ['id'],
        },
      },
      preHandler: [fastify.authenticate, fastify.authorize(['admin'])],
    },
    controller.delete.bind(controller),
  );
}
```

---

## 11. Database Conventions

### 11.1 Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Tables | snake_case, plural | `students`, `class_sections` |
| Columns | snake_case | `first_name`, `created_at` |
| Primary Keys | `id` | `id` (UUID) |
| Foreign Keys | `{table}_id` | `student_id`, `class_id` |
| Indexes | `idx_{table}_{columns}` | `idx_students_email` |
| Constraints | `{table}_{type}_{column}` | `students_unique_email` |

### 11.2 Prisma Schema Conventions

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Student {
  id               String    @id @default(uuid())
  enrollmentNumber String    @unique @map("enrollment_number")
  firstName        String    @map("first_name")
  lastName         String    @map("last_name")
  email            String    @unique
  dateOfBirth      DateTime? @map("date_of_birth")
  status           StudentStatus @default(ACTIVE)

  // Relations
  classId          String    @map("class_id")
  class            Class     @relation(fields: [classId], references: [id])

  parentId         String?   @map("parent_id")
  parent           Parent?   @relation(fields: [parentId], references: [id])

  attendances      Attendance[]
  grades           Grade[]
  quranProgress    QuranProgress[]

  // Timestamps
  createdAt        DateTime  @default(now()) @map("created_at")
  updatedAt        DateTime  @updatedAt @map("updated_at")
  deletedAt        DateTime? @map("deleted_at")

  @@map("students")
  @@index([classId])
  @@index([status])
  @@index([createdAt])
}

enum StudentStatus {
  ACTIVE
  INACTIVE
  GRADUATED
  TRANSFERRED

  @@map("student_status")
}

model Class {
  id          String    @id @default(uuid())
  name        String
  section     String
  academicYear String   @map("academic_year")

  students    Student[]

  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")

  @@unique([name, section, academicYear])
  @@map("classes")
}
```

### 11.3 Migration Naming

```
# Format: YYYYMMDDHHMMSS_description.sql
20260110120000_create_students_table.sql
20260110120001_add_email_index_to_students.sql
20260110120002_create_classes_table.sql
20260110120003_add_class_relation_to_students.sql
```

---

## 12. Documentation Standards

### 12.1 Code Documentation

#### 12.1.1 File Headers

```typescript
/**
 * @fileoverview Student service for managing student records
 * @module services/student
 *
 * This service handles all CRUD operations for student entities,
 * including enrollment, status management, and data validation.
 */
```

#### 12.1.2 Function Documentation

```typescript
/**
 * Calculates the attendance percentage for a student within a date range.
 *
 * The calculation excludes weekends and official holidays. Excused absences
 * can optionally be counted as present days based on the options parameter.
 *
 * @param studentId - The unique identifier of the student
 * @param options - Configuration options for the calculation
 * @returns The attendance percentage as a number between 0 and 100
 * @throws {NotFoundError} When the student is not found
 * @throws {ValidationError} When the date range is invalid
 *
 * @example
 * // Calculate attendance for January 2026
 * const percentage = await calculateAttendance('student-123', {
 *   startDate: new Date('2026-01-01'),
 *   endDate: new Date('2026-01-31'),
 *   includeExcused: true,
 * });
 * console.log(`Attendance: ${percentage}%`);
 *
 * @see {@link AttendanceService} for related operations
 * @since 1.0.0
 */
```

### 12.2 API Documentation

Use OpenAPI/Swagger for API documentation:

```typescript
// Fastify Swagger schema example
const schema = {
  description: 'Get all students with pagination',
  tags: ['Students'],
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1 },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
      search: { type: 'string', description: 'Search by name or enrollment number' },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/Student' },
        },
        total: { type: 'integer' },
        page: { type: 'integer' },
        totalPages: { type: 'integer' },
      },
    },
    401: { $ref: '#/components/responses/Unauthorized' },
    500: { $ref: '#/components/responses/InternalError' },
  },
};
```

### 12.3 README Template

```markdown
# Module Name

Brief description of the module.

## Features

- Feature 1
- Feature 2
- Feature 3

## Installation

```bash
npm install
```

## Usage

```typescript
import { ModuleName } from '@/modules/module-name';

const instance = new ModuleName();
await instance.doSomething();
```

## API Reference

### `methodName(params)`

Description of the method.

**Parameters:**
- `param1` (Type): Description
- `param2` (Type, optional): Description

**Returns:** ReturnType - Description

**Example:**
```typescript
const result = await methodName({ param1: 'value' });
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| option1 | string | 'default' | Description |
| option2 | number | 10 | Description |

## Related

- [Related Module 1](../related-module-1)
- [Related Module 2](../related-module-2)
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

*This Coding Standards Document establishes the technical standards and conventions for the Smart Academy Digital Portal. All code contributions must adhere to these standards to ensure consistency, maintainability, and quality across the codebase.*
