# Smart Academy Digital Portal - Component Library Documentation

**Document Title:** Component Library Documentation
**Document ID:** UX_Component_Library_v1.0
**Version:** 1.0
**Date:** January 10, 2026
**Project Name:** Smart Academy Digital Web Portal Development
**Prepared By:** Solo Full-Stack Developer

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | January 10, 2026 | Development Team | Initial Component Library Document |

**Reference Documents:**
- Smart Academy Design System v1.0
- Smart Academy Frontend Specification v1.0
- Shadcn/ui Component Library

---

## Table of Contents

1. [Overview](#1-overview)
2. [Atomic Design Structure](#2-atomic-design-structure)
3. [Atoms](#3-atoms)
4. [Molecules](#4-molecules)
5. [Organisms](#5-organisms)
6. [Templates](#6-templates)
7. [Component States](#7-component-states)
8. [Accessibility Specifications](#8-accessibility-specifications)
9. [Implementation Guide](#9-implementation-guide)

---

## 1. Overview

### 1.1 Purpose

This document defines the complete component library for the Smart Academy Digital Portal. Components are built using:

- **React 19.x** - UI library
- **TypeScript 5.x** - Type safety
- **Tailwind CSS 4.x** - Styling
- **Shadcn/ui** - Base component primitives
- **Radix UI** - Accessible primitives
- **Framer Motion** - Animations

### 1.2 Component Principles

1. **Accessibility First**: WCAG 2.2 AA compliant
2. **Composable**: Small, focused components that combine well
3. **Consistent**: Unified API patterns across all components
4. **Themeable**: Support for light/dark modes and RTL
5. **Performant**: Optimized for React Server Components where possible

### 1.3 File Structure

```
components/
├── ui/                    # Atoms (Shadcn/ui primitives)
│   ├── button.tsx
│   ├── input.tsx
│   ├── label.tsx
│   └── ...
├── molecules/             # Molecules (Composed atoms)
│   ├── form-field.tsx
│   ├── search-box.tsx
│   └── ...
├── organisms/             # Organisms (Complex components)
│   ├── header.tsx
│   ├── data-table.tsx
│   └── ...
├── templates/             # Page templates
│   ├── dashboard-layout.tsx
│   └── ...
└── index.ts              # Re-exports
```

---

## 2. Atomic Design Structure

### 2.1 Design Hierarchy

```
┌─────────────────────────────────────────────────────────────────────┐
│                         TEMPLATES                                    │
│  Complete page structures with placeholder content                   │
│  Examples: DashboardTemplate, AuthTemplate, MarketingTemplate        │
├─────────────────────────────────────────────────────────────────────┤
│                         ORGANISMS                                    │
│  Complex UI components built from molecules and atoms                │
│  Examples: Header, Footer, DataTable, Modal, Form                    │
├─────────────────────────────────────────────────────────────────────┤
│                         MOLECULES                                    │
│  Simple groups of atoms functioning as a unit                        │
│  Examples: FormField, SearchBox, Card, AlertBox                      │
├─────────────────────────────────────────────────────────────────────┤
│                         ATOMS                                        │
│  Basic building blocks (HTML elements with styling)                  │
│  Examples: Button, Input, Label, Icon, Avatar, Badge                 │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 Component Categories Summary

| Category | Count | Description |
|----------|-------|-------------|
| Atoms | 25+ | Basic UI elements |
| Molecules | 15+ | Composed components |
| Organisms | 12+ | Complex components |
| Templates | 6 | Page layouts |

---

## 3. Atoms

### 3.1 Button

The primary interactive element for actions and navigation.

#### 3.1.1 Variants

| Variant | Use Case | Visual |
|---------|----------|--------|
| `default` | Primary actions | Solid primary color |
| `secondary` | Secondary actions | Muted background |
| `outline` | Tertiary actions | Border only |
| `ghost` | Subtle actions | No background |
| `destructive` | Dangerous actions | Red/error color |
| `link` | Navigation | Text with underline |

#### 3.1.2 Sizes

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| `sm` | 32px | px-3 | text-sm |
| `default` | 40px | px-4 | text-sm |
| `lg` | 48px | px-6 | text-base |
| `icon` | 40px | p-2 | - |

#### 3.1.3 States

- **Default**: Resting state
- **Hover**: Slight color change, scale(1.02)
- **Active/Pressed**: Darker color, scale(0.98)
- **Focus**: Focus ring visible
- **Disabled**: Reduced opacity, cursor-not-allowed
- **Loading**: Spinner icon, disabled interaction

#### 3.1.4 API

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}
```

#### 3.1.5 Code Example

```tsx
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';

// Primary button
<Button variant="default">Submit</Button>

// With icon
<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add Student
</Button>

// Loading state
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Please wait
</Button>

// Icon only
<Button variant="outline" size="icon">
  <Plus className="h-4 w-4" />
</Button>
```

#### 3.1.6 Accessibility

- Uses native `<button>` element
- Supports `aria-label` for icon-only buttons
- Focus ring on `:focus-visible`
- Disabled state removes from tab order

---

### 3.2 Input

Text input field for user data entry.

#### 3.2.1 Types

| Type | Use Case |
|------|----------|
| `text` | General text input |
| `email` | Email addresses |
| `password` | Password entry |
| `number` | Numeric values |
| `tel` | Phone numbers |
| `search` | Search queries |
| `url` | URLs |

#### 3.2.2 States

- **Default**: Ready for input
- **Focus**: Border highlight, focus ring
- **Filled**: Contains user input
- **Error**: Red border, error message
- **Disabled**: Reduced opacity, read-only
- **Read-only**: Visible but not editable

#### 3.2.3 API

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

#### 3.2.4 Code Example

```tsx
import { Input } from '@/components/ui/input';
import { Search, Eye, EyeOff } from 'lucide-react';

// Basic input
<Input type="text" placeholder="Enter name" />

// With icon
<div className="relative">
  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  <Input className="pl-9" placeholder="Search students..." />
</div>

// Error state
<Input
  type="email"
  placeholder="Email"
  className="border-destructive focus-visible:ring-destructive"
  aria-invalid="true"
/>
```

---

### 3.3 Label

Text label associated with form controls.

#### 3.3.1 API

```typescript
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
}
```

#### 3.3.2 Code Example

```tsx
import { Label } from '@/components/ui/label';

<Label htmlFor="email">
  Email Address
  <span className="text-destructive ml-1">*</span>
</Label>
<Input id="email" type="email" />
```

---

### 3.4 Checkbox

Binary toggle for options.

#### 3.4.1 States

- **Unchecked**: Empty box
- **Checked**: Box with checkmark
- **Indeterminate**: Partial selection (for parent items)
- **Disabled**: Reduced opacity

#### 3.4.2 API

```typescript
interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
  description?: string;
}
```

#### 3.4.3 Code Example

```tsx
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>
```

---

### 3.5 Radio Group

Single selection from multiple options.

#### 3.5.1 API

```typescript
interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
}

interface RadioGroupItemProps {
  value: string;
  id: string;
  disabled?: boolean;
}
```

#### 3.5.2 Code Example

```tsx
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

<RadioGroup defaultValue="male">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="male" id="male" />
    <Label htmlFor="male">Male</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="female" id="female" />
    <Label htmlFor="female">Female</Label>
  </div>
</RadioGroup>
```

---

### 3.6 Select

Dropdown selection component.

#### 3.6.1 API

```typescript
interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}
```

#### 3.6.2 Code Example

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select class" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="class-1">Class 1</SelectItem>
    <SelectItem value="class-2">Class 2</SelectItem>
    <SelectItem value="class-3">Class 3</SelectItem>
  </SelectContent>
</Select>
```

---

### 3.7 Textarea

Multi-line text input.

#### 3.7.1 API

```typescript
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}
```

#### 3.7.2 Code Example

```tsx
import { Textarea } from '@/components/ui/textarea';

<Textarea
  placeholder="Enter description..."
  rows={4}
  maxLength={500}
/>
```

---

### 3.8 Switch

Toggle for binary settings.

#### 3.8.1 API

```typescript
interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}
```

#### 3.8.2 Code Example

```tsx
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

<div className="flex items-center space-x-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>
```

---

### 3.9 Avatar

User profile image or initials.

#### 3.9.1 Sizes

| Size | Dimension | Use Case |
|------|-----------|----------|
| `xs` | 24px | Compact lists |
| `sm` | 32px | Comments, messages |
| `default` | 40px | General use |
| `lg` | 48px | Profile cards |
| `xl` | 64px | Profile pages |
| `2xl` | 96px | Profile header |

#### 3.9.2 API

```typescript
interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl' | '2xl';
}
```

#### 3.9.3 Code Example

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

<Avatar>
  <AvatarImage src="/avatars/student.jpg" alt="Student Name" />
  <AvatarFallback>SN</AvatarFallback>
</Avatar>
```

---

### 3.10 Badge

Status indicators and labels.

#### 3.10.1 Variants

| Variant | Use Case | Color |
|---------|----------|-------|
| `default` | General labels | Primary |
| `secondary` | Muted labels | Gray |
| `outline` | Subtle labels | Border only |
| `success` | Positive status | Green |
| `warning` | Caution status | Yellow/Amber |
| `destructive` | Error/danger | Red |

#### 3.10.2 API

```typescript
interface BadgeProps {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'destructive';
  size?: 'sm' | 'default' | 'lg';
}
```

#### 3.10.3 Code Example

```tsx
import { Badge } from '@/components/ui/badge';

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Overdue</Badge>
```

---

### 3.11 Icon

Wrapper for SVG icons from Lucide.

#### 3.11.1 Sizes

| Size Token | Dimension |
|------------|-----------|
| `xs` | 12px |
| `sm` | 16px |
| `default` | 20px |
| `lg` | 24px |
| `xl` | 32px |

#### 3.11.2 Common Icons

```tsx
import {
  // Navigation
  Menu, X, ChevronDown, ChevronRight, ArrowLeft, ArrowRight,
  // Actions
  Plus, Minus, Edit, Trash, Save, Download, Upload, Search,
  // Status
  Check, AlertCircle, Info, AlertTriangle, XCircle,
  // Users
  User, Users, UserPlus, UserMinus,
  // Academic
  BookOpen, GraduationCap, Calendar, Clock,
  // Islamic
  Moon, Star, Book,
  // Financial
  CreditCard, DollarSign, Receipt,
  // Communication
  Bell, Mail, MessageSquare, Phone,
  // Settings
  Settings, Cog, Sliders,
} from 'lucide-react';
```

---

### 3.12 Separator

Visual divider between content sections.

#### 3.12.1 Code Example

```tsx
import { Separator } from '@/components/ui/separator';

<Separator /> {/* Horizontal */}
<Separator orientation="vertical" /> {/* Vertical */}
```

---

### 3.13 Skeleton

Loading placeholder for content.

#### 3.13.1 Code Example

```tsx
import { Skeleton } from '@/components/ui/skeleton';

// Text skeleton
<Skeleton className="h-4 w-[250px]" />

// Avatar skeleton
<Skeleton className="h-12 w-12 rounded-full" />

// Card skeleton
<div className="space-y-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
</div>
```

---

### 3.14 Progress

Visual indicator of progress or loading.

#### 3.14.1 API

```typescript
interface ProgressProps {
  value?: number;  // 0-100
  max?: number;
  showLabel?: boolean;
}
```

#### 3.14.2 Code Example

```tsx
import { Progress } from '@/components/ui/progress';

<Progress value={33} />
<Progress value={66} className="h-2" />
```

---

### 3.15 Slider

Range input for selecting values.

#### 3.15.1 API

```typescript
interface SliderProps {
  value?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}
```

---

## 4. Molecules

### 4.1 Form Field

Combines Label, Input, and error message.

#### 4.1.1 Structure

```
┌─────────────────────────────────────────┐
│ Label *                                 │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ Input                               │ │
│ └─────────────────────────────────────┘ │
│ Helper text or error message            │
└─────────────────────────────────────────┘
```

#### 4.1.2 API

```typescript
interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}
```

#### 4.1.3 Code Example

```tsx
import { FormField } from '@/components/molecules/form-field';

<FormField
  name="email"
  label="Email Address"
  type="email"
  placeholder="student@smart-academy.edu"
  description="We'll never share your email."
  required
  error={errors.email?.message}
/>
```

---

### 4.2 Search Box

Input with search icon and clear button.

#### 4.2.1 Structure

```
┌─────────────────────────────────────────┐
│ 🔍 Search students...              ✕   │
└─────────────────────────────────────────┘
```

#### 4.2.2 API

```typescript
interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  debounceMs?: number;
}
```

#### 4.2.3 Code Example

```tsx
import { SearchBox } from '@/components/molecules/search-box';

<SearchBox
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="Search by name or ID..."
  debounceMs={300}
/>
```

---

### 4.3 Card

Container for grouped content.

#### 4.3.1 Structure

```
┌─────────────────────────────────────────┐
│ Card Header                             │
│ Card Description                        │
├─────────────────────────────────────────┤
│                                         │
│ Card Content                            │
│                                         │
├─────────────────────────────────────────┤
│ Card Footer                             │
└─────────────────────────────────────────┘
```

#### 4.3.2 API

```typescript
interface CardProps {
  className?: string;
  variant?: 'default' | 'elevated' | 'outline';
  padding?: 'none' | 'sm' | 'default' | 'lg';
}
```

#### 4.3.3 Code Example

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Student Profile</CardTitle>
    <CardDescription>View and manage student information</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    <Button>Save Changes</Button>
  </CardFooter>
</Card>
```

---

### 4.4 Alert

Informational message component.

#### 4.4.1 Variants

| Variant | Icon | Use Case |
|---------|------|----------|
| `default` | Info | General information |
| `success` | Check | Success messages |
| `warning` | AlertTriangle | Warnings |
| `destructive` | XCircle | Errors |

#### 4.4.2 API

```typescript
interface AlertProps {
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  title?: string;
  description: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}
```

#### 4.4.3 Code Example

```tsx
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>
```

---

### 4.5 Alert Dialog

Confirmation dialog for critical actions.

#### 4.5.1 Structure

```
┌─────────────────────────────────────────┐
│                                         │
│ ⚠️ Are you sure?                        │
│                                         │
│ This action cannot be undone.           │
│                                         │
│               [ Cancel ]  [ Continue ]  │
│                                         │
└─────────────────────────────────────────┘
```

#### 4.5.2 Code Example

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete Student</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the student
        record and all associated data.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

### 4.6 Stat Card

Dashboard metric display.

#### 4.6.1 Structure

```
┌─────────────────────────────────────────┐
│ Total Students            📈 +12%       │
│                                         │
│ 1,234                                   │
│ ───────────── progress bar              │
└─────────────────────────────────────────┘
```

#### 4.6.2 API

```typescript
interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  progress?: number;
}
```

---

### 4.7 Empty State

Placeholder for empty content areas.

#### 4.7.1 Structure

```
┌─────────────────────────────────────────┐
│                                         │
│              📋                         │
│                                         │
│        No students found                │
│   Try adjusting your search filters     │
│                                         │
│         [ Clear Filters ]               │
│                                         │
└─────────────────────────────────────────┘
```

#### 4.7.2 API

```typescript
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

---

### 4.8 Tooltip

Contextual information on hover.

#### 4.8.1 API

```typescript
interface TooltipProps {
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  delayDuration?: number;
}
```

#### 4.8.2 Code Example

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline" size="icon">
        <HelpCircle className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Click to view help documentation</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

### 4.9 Dropdown Menu

Action menu with nested options.

#### 4.9.1 Code Example

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <Edit className="mr-2 h-4 w-4" />
      Edit
    </DropdownMenuItem>
    <DropdownMenuItem className="text-destructive">
      <Trash className="mr-2 h-4 w-4" />
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

### 4.10 Tabs

Content organization with tabbed navigation.

#### 4.10.1 Code Example

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

<Tabs defaultValue="profile" className="w-full">
  <TabsList>
    <TabsTrigger value="profile">Profile</TabsTrigger>
    <TabsTrigger value="attendance">Attendance</TabsTrigger>
    <TabsTrigger value="grades">Grades</TabsTrigger>
  </TabsList>
  <TabsContent value="profile">
    {/* Profile content */}
  </TabsContent>
  <TabsContent value="attendance">
    {/* Attendance content */}
  </TabsContent>
  <TabsContent value="grades">
    {/* Grades content */}
  </TabsContent>
</Tabs>
```

---

## 5. Organisms

### 5.1 Navigation Header

Main navigation component for the website.

#### 5.1.1 Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│ 📚 Smart Academy    Home  About  Academics  Admissions   🔍  EN  👤 │
└─────────────────────────────────────────────────────────────────────┘
```

#### 5.1.2 Components

- Logo
- Main navigation links
- Mega menu dropdowns
- Search trigger
- Language switcher
- User menu (authenticated)
- Mobile menu button

#### 5.1.3 Mobile Behavior

- Hamburger menu on mobile
- Full-screen overlay navigation
- Accordion-style nested menus
- Touch-friendly targets

#### 5.1.4 API

```typescript
interface NavigationHeaderProps {
  user?: User | null;
  currentPath: string;
  onSearch?: () => void;
  onLanguageChange?: (lang: string) => void;
}
```

---

### 5.2 Footer

Site-wide footer with links and information.

#### 5.2.1 Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  📚 Smart Academy          Quick Links    Programs    Contact Us   │
│  Excellence Through Faith  About          Primary     Phone        │
│                            Admissions     Secondary   Email        │
│  Address                   Campus         Islamic     Location     │
│  Bhola, Bangladesh         News           STEAM                    │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  © 2026 Smart Academy. All rights reserved.   Privacy | Terms      │
│                          Facebook  YouTube  Instagram               │
└─────────────────────────────────────────────────────────────────────┘
```

#### 5.2.2 Components

- Logo and tagline
- Contact information
- Link columns
- Social media links
- Copyright and legal links

---

### 5.3 Sidebar Navigation

Portal sidebar navigation.

#### 5.3.1 Structure

```
┌────────────────────┐
│ 📚 Smart Academy   │
├────────────────────┤
│ 🏠 Dashboard       │
│ 👨‍🎓 Students       │
│   └─ All Students  │
│   └─ Add New       │
│ 📅 Attendance      │
│ 💰 Fees            │
│ 📿 Islamic         │
│   └─ Quran         │
│   └─ Prayer        │
│ 📢 Announcements   │
│ ⚙️ Settings        │
├────────────────────┤
│ 👤 User Name       │
│ 🚪 Logout          │
└────────────────────┘
```

#### 5.3.2 API

```typescript
interface SidebarProps {
  items: SidebarItem[];
  currentPath: string;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  badge?: string | number;
  children?: SidebarItem[];
}
```

---

### 5.4 Data Table

Complex data display with sorting, filtering, and pagination.

#### 5.4.1 Features

- Column sorting (asc/desc)
- Column visibility toggle
- Row selection (checkbox)
- Pagination
- Search/filter
- Row actions menu
- Responsive design
- Empty state
- Loading state

#### 5.4.2 Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│ 🔍 Search...                              Columns ▼   + Add New    │
├─────────────────────────────────────────────────────────────────────┤
│ ☐ │ Name ▲        │ Class     │ Status   │ Attendance │ Actions   │
├───┼────────────────┼───────────┼──────────┼────────────┼───────────┤
│ ☐ │ Ahmed Rahman  │ Class 5-A │ 🟢 Active │ 95%        │ ⋮         │
│ ☐ │ Fatima Akter  │ Class 5-B │ 🟢 Active │ 98%        │ ⋮         │
│ ☐ │ Mohammed Khan │ Class 6-A │ 🟡 Leave  │ 87%        │ ⋮         │
├─────────────────────────────────────────────────────────────────────┤
│ Showing 1-10 of 234 results              ◀ 1 2 3 ... 24 ▶          │
└─────────────────────────────────────────────────────────────────────┘
```

#### 5.4.3 API

```typescript
interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  searchKey?: string;
  searchPlaceholder?: string;
  pagination?: boolean;
  pageSize?: number;
  sorting?: boolean;
  selection?: boolean;
  onRowClick?: (row: T) => void;
  actions?: (row: T) => React.ReactNode;
  emptyState?: React.ReactNode;
  loading?: boolean;
}
```

---

### 5.5 Modal / Dialog

Overlay dialog for focused interactions.

#### 5.5.1 Sizes

| Size | Width | Use Case |
|------|-------|----------|
| `sm` | 400px | Confirmations, alerts |
| `default` | 500px | Forms, details |
| `lg` | 640px | Complex forms |
| `xl` | 800px | Wizards, previews |
| `full` | 95vw | Full content |

#### 5.5.2 Code Example

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Add Student</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Add New Student</DialogTitle>
      <DialogDescription>
        Enter the student details below.
      </DialogDescription>
    </DialogHeader>
    <form>
      {/* Form fields */}
    </form>
    <DialogFooter>
      <Button type="submit">Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

### 5.6 Form

Complete form component with validation.

#### 5.6.1 Features

- Field validation (Zod)
- Error messages
- Submit handling
- Loading states
- Field arrays
- Conditional fields

#### 5.6.2 Code Example

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  class: z.string().min(1, 'Please select a class'),
});

function StudentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      class: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Student name" {...field} />
              </FormControl>
              <FormDescription>
                Enter the student's full name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* More fields... */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

---

### 5.7 Toast / Notification

Temporary notification messages.

#### 5.7.1 Variants

| Variant | Use Case |
|---------|----------|
| `default` | General information |
| `success` | Success confirmation |
| `warning` | Warning messages |
| `destructive` | Error messages |

#### 5.7.2 Code Example

```tsx
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

function Component() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: 'Student Added',
          description: 'The student has been successfully enrolled.',
          action: <ToastAction altText="View">View</ToastAction>,
        });
      }}
    >
      Add Student
    </Button>
  );
}
```

---

### 5.8 Breadcrumb

Navigation hierarchy indicator.

#### 5.8.1 Code Example

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/students">Students</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Ahmed Rahman</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

---

### 5.9 Calendar

Date picker and calendar display.

#### 5.9.1 Features

- Single date selection
- Date range selection
- Disabled dates
- Hijri calendar support
- Event indicators

#### 5.9.2 Code Example

```tsx
import { Calendar } from '@/components/ui/calendar';

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>
```

---

### 5.10 Command Palette

Keyboard-driven command interface.

#### 5.10.1 Code Example

```tsx
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Navigation">
      <CommandItem>Dashboard</CommandItem>
      <CommandItem>Students</CommandItem>
      <CommandItem>Attendance</CommandItem>
    </CommandGroup>
    <CommandGroup heading="Actions">
      <CommandItem>Add Student</CommandItem>
      <CommandItem>Mark Attendance</CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>
```

---

### 5.11 Sheet (Slide-over Panel)

Side panel for additional content.

#### 5.11.1 Code Example

```tsx
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Filters</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Filter Students</SheetTitle>
      <SheetDescription>
        Apply filters to narrow down results.
      </SheetDescription>
    </SheetHeader>
    {/* Filter form */}
  </SheetContent>
</Sheet>
```

---

### 5.12 Accordion

Collapsible content sections.

#### 5.12.1 Code Example

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Personal Information</AccordionTrigger>
    <AccordionContent>
      {/* Content */}
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Academic Records</AccordionTrigger>
    <AccordionContent>
      {/* Content */}
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

---

## 6. Templates

### 6.1 Marketing Layout

Public website pages layout.

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Navigation Header]                                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                       [Page Content]                                │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ [Footer]                                                            │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.2 Auth Layout

Login and authentication pages.

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ┌─────────────────────────┐  ┌─────────────────────────────────┐  │
│  │                         │  │                                 │  │
│  │   [Brand/Decorative]    │  │       [Auth Form]               │  │
│  │                         │  │                                 │  │
│  │                         │  │                                 │  │
│  └─────────────────────────┘  └─────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.3 Dashboard Layout

Authenticated portal layout.

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Top Bar - User Menu, Notifications, Search]                       │
├──────────────┬──────────────────────────────────────────────────────┤
│              │                                                      │
│  [Sidebar]   │            [Main Content Area]                       │
│              │                                                      │
│  Navigation  │  ┌────────────────────────────────────────────────┐ │
│              │  │ [Breadcrumb]                                   │ │
│  - Dashboard │  ├────────────────────────────────────────────────┤ │
│  - Students  │  │                                                │ │
│  - Fees      │  │               [Page Content]                   │ │
│  - Islamic   │  │                                                │ │
│  - Settings  │  │                                                │ │
│              │  └────────────────────────────────────────────────┘ │
│              │                                                      │
└──────────────┴──────────────────────────────────────────────────────┘
```

### 6.4 Portal Mobile Layout

Mobile-optimized dashboard.

```
┌─────────────────────────┐
│ ☰  Smart Academy    👤  │
├─────────────────────────┤
│                         │
│    [Page Content]       │
│                         │
│                         │
├─────────────────────────┤
│ 🏠  👨‍🎓  📅  💰  ⚙️       │
│ Home Student Att. Fees  │
└─────────────────────────┘
```

### 6.5 Form Page Layout

Standard form page layout.

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Breadcrumb]                                                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Form Title                                                   │   │
│  │ Form description                                             │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │                                                             │   │
│  │ [Form Fields]                                               │   │
│  │                                                             │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │                              [Cancel]  [Save]               │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.6 List Page Layout

Standard list/table page layout.

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Breadcrumb]                                                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Page Title                                     [+ Add New]         │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ [Search & Filters]                                          │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │                                                             │   │
│  │                    [Data Table]                             │   │
│  │                                                             │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ [Pagination]                                                │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 7. Component States

### 7.1 Interactive States

All interactive components support these states:

| State | Description | Visual Change |
|-------|-------------|---------------|
| Default | Resting state | Base styling |
| Hover | Mouse over | Color shift, cursor |
| Focus | Keyboard focus | Focus ring |
| Active | Being pressed | Darker color |
| Disabled | Not interactive | Opacity 50%, no pointer |
| Loading | Processing | Spinner, disabled |
| Error | Invalid state | Red border/text |
| Success | Valid state | Green indicator |

### 7.2 State CSS Classes

```css
/* Tailwind utilities for states */
.interactive {
  @apply transition-colors duration-200;
  @apply hover:bg-accent hover:text-accent-foreground;
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring;
  @apply disabled:pointer-events-none disabled:opacity-50;
}

.error-state {
  @apply border-destructive text-destructive;
  @apply focus-visible:ring-destructive;
}

.loading-state {
  @apply pointer-events-none opacity-70;
}
```

---

## 8. Accessibility Specifications

### 8.1 Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Move to next focusable element |
| Shift + Tab | Move to previous focusable element |
| Enter/Space | Activate buttons, links |
| Escape | Close modals, menus |
| Arrow Keys | Navigate within components |
| Home/End | Jump to first/last item |

### 8.2 ARIA Patterns

#### 8.2.1 Button
```html
<button
  type="button"
  aria-label="Close dialog"
  aria-pressed="false"
>
  <XIcon aria-hidden="true" />
</button>
```

#### 8.2.2 Modal/Dialog
```html
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">Dialog Title</h2>
  <p id="dialog-description">Dialog description</p>
</div>
```

#### 8.2.3 Navigation
```html
<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="none">
      <a role="menuitem" href="/">Home</a>
    </li>
    <li role="none">
      <button role="menuitem" aria-haspopup="true" aria-expanded="false">
        About
      </button>
    </li>
  </ul>
</nav>
```

#### 8.2.4 Form Field
```html
<div>
  <label id="email-label" for="email">
    Email <span aria-hidden="true">*</span>
  </label>
  <input
    id="email"
    type="email"
    aria-labelledby="email-label"
    aria-describedby="email-error email-hint"
    aria-invalid="true"
    aria-required="true"
  />
  <span id="email-hint">We'll never share your email</span>
  <span id="email-error" role="alert">Please enter a valid email</span>
</div>
```

### 8.3 Focus Management

```typescript
// Focus trap for modals
import { FocusTrap } from '@/components/utils/focus-trap';

<FocusTrap active={isOpen}>
  <DialogContent>
    {/* Content */}
  </DialogContent>
</FocusTrap>
```

### 8.4 Screen Reader Announcements

```typescript
// Live region for dynamic content
import { useLiveRegion } from '@/hooks/use-live-region';

function Component() {
  const announce = useLiveRegion();

  const handleSave = () => {
    // ... save logic
    announce('Student saved successfully');
  };
}
```

---

## 9. Implementation Guide

### 9.1 Installing Components

```bash
# Install Shadcn/ui CLI
npx shadcn-ui@latest init

# Add individual components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
# etc.
```

### 9.2 Component Import Pattern

```typescript
// Recommended: Import from component index
import { Button, Input, Card } from '@/components/ui';

// Or import individually
import { Button } from '@/components/ui/button';
```

### 9.3 Customization

#### 9.3.1 Extending Base Components

```typescript
// components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        // Custom variants
        islamic: 'bg-emerald-600 text-white hover:bg-emerald-700',
        gold: 'bg-amber-500 text-white hover:bg-amber-600',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

### 9.4 Testing Components

```typescript
// __tests__/button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | January 10, 2026 | Development Team | Initial component library document |

---

## References

- [Shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

---

*End of Component Library Document*
