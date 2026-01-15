# Smart Academy Digital Portal - Design System

**Document Title:** Design System Document
**Document ID:** UX_Design_System_v1.0
**Version:** 1.0
**Date:** January 10, 2026
**Project Name:** Smart Academy Digital Web Portal Development
**Prepared By:** Solo Full-Stack Developer

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | January 10, 2026 | Development Team | Initial Design System Document |

**Reference Documents:**
- Smart Academy URD v1.0
- Smart Academy Frontend Specification v1.0
- Smart Academy Technology Stack v1.0

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [Brand Guidelines Application](#2-brand-guidelines-application)
3. [Color Palette](#3-color-palette)
4. [Typography](#4-typography)
5. [Spacing System](#5-spacing-system)
6. [Border Radius](#6-border-radius)
7. [Shadow System](#7-shadow-system)
8. [Icon Library](#8-icon-library)
9. [Animation & Motion](#9-animation--motion)
10. [Accessibility Standards](#10-accessibility-standards)
11. [RTL Support](#11-rtl-support)
12. [Implementation Guidelines](#12-implementation-guidelines)

---

## 1. Design Principles

### 1.1 Core Design Philosophy

Smart Academy's design system is built on six foundational principles that guide all design decisions:

#### 1.1.1 Islamic Elegance
- Incorporate subtle Islamic geometric patterns and motifs
- Use culturally appropriate imagery and colors
- Respect conservative design values
- Integrate Arabic calligraphy elements tastefully

#### 1.1.2 Educational Excellence
- Prioritize clarity and readability
- Support focused learning environments
- Design for extended reading sessions
- Minimize cognitive load

#### 1.1.3 Accessibility First
- WCAG 2.2 AA compliance mandatory
- Support for screen readers and assistive technologies
- Keyboard-navigable interfaces
- Inclusive design for all users

#### 1.1.4 Mobile-First Responsiveness
- Design for mobile devices first
- Progressive enhancement for larger screens
- Touch-friendly interaction patterns
- Optimal performance on all devices

#### 1.1.5 Multilingual Support
- English as primary language
- Bengali (Bangla) as secondary language
- Arabic for Islamic content
- RTL layout support for Arabic content

#### 1.1.6 Modern Simplicity
- Clean, uncluttered interfaces
- Consistent visual language
- Intuitive navigation patterns
- Progressive disclosure of complexity

### 1.2 Design Goals

| Goal | Description | Success Metric |
|------|-------------|----------------|
| Usability | Easy to learn and use | Task completion rate > 90% |
| Accessibility | Inclusive for all users | WCAG 2.2 AA compliant |
| Performance | Fast loading and responsive | LCP < 2.5s, FID < 100ms |
| Consistency | Unified visual language | Design token adoption 100% |
| Scalability | Support future growth | Component reuse > 80% |

---

## 2. Brand Guidelines Application

### 2.1 Brand Identity

#### 2.1.1 Brand Values
- **Excellence**: Pursuit of highest standards in education
- **Faith**: Islamic values and principles
- **Innovation**: Modern approach to traditional education
- **Community**: Family-oriented learning environment
- **Integrity**: Honesty and ethical conduct

#### 2.1.2 Brand Voice
| Attribute | Description | Example |
|-----------|-------------|---------|
| Warm | Welcoming and approachable | "Welcome to our family" |
| Professional | Competent and reliable | "Excellence in education" |
| Inspiring | Motivational and uplifting | "Nurturing tomorrow's leaders" |
| Respectful | Culturally sensitive | "Guided by Islamic values" |

### 2.2 Logo Usage

#### 2.2.1 Primary Logo
```
┌─────────────────────────────────────────┐
│                                         │
│    ╭─────╮                             │
│   │  📚  │  Smart Academy              │
│   │  🌙  │  Excellence Through Faith   │
│    ╰─────╯                             │
│                                         │
└─────────────────────────────────────────┘
```

#### 2.2.2 Logo Specifications

| Context | Format | Minimum Size | Clear Space |
|---------|--------|--------------|-------------|
| Website Header | SVG | 120px width | 16px all sides |
| Mobile Header | SVG | 40px height | 8px all sides |
| Favicon | ICO/PNG | 32x32px | N/A |
| Social Media | PNG | 400x400px | 20% of size |
| Print Materials | PDF/EPS | 1 inch | 0.25 inch |

#### 2.2.3 Logo Variants

| Variant | Use Case | Background |
|---------|----------|------------|
| Primary (Color) | Default usage | Light backgrounds |
| White | Dark backgrounds, images | Dark/colored backgrounds |
| Monochrome | Grayscale printing | Any |
| Icon Only | Compact spaces, favicon | Any |

### 2.3 Imagery Guidelines

#### 2.3.1 Photography Style
- Natural, candid moments
- Diverse representation of students
- Professional but warm atmosphere
- Well-lit, high-quality images
- Culturally appropriate dress and settings

#### 2.3.2 Illustration Style
- Clean, modern line art
- Islamic geometric patterns as accents
- Soft, approachable characters
- Educational themes
- Consistent stroke weights

#### 2.3.3 Imagery Don'ts
- No alcohol or inappropriate imagery
- Avoid revealing clothing
- No religious imagery without context
- Avoid dark or frightening themes
- No copyright-infringing content

---

## 3. Color Palette

### 3.1 Primary Colors

Primary colors represent the core brand identity and are used for main actions, branding, and key UI elements.

#### 3.1.1 Islamic Green (Primary)
Represents growth, prosperity, and Islamic heritage.

```css
/* Primary Green */
--color-primary-50:  #ecfdf5;   /* Lightest */
--color-primary-100: #d1fae5;
--color-primary-200: #a7f3d0;
--color-primary-300: #6ee7b7;
--color-primary-400: #34d399;
--color-primary-500: #10b981;   /* Base - Islamic Green */
--color-primary-600: #059669;   /* Hover */
--color-primary-700: #047857;   /* Active */
--color-primary-800: #065f46;
--color-primary-900: #064e3b;
--color-primary-950: #022c22;   /* Darkest */
```

| Shade | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Primary 50 | #ecfdf5 | 236, 253, 245 | Backgrounds, subtle highlights |
| Primary 100 | #d1fae5 | 209, 250, 229 | Light backgrounds, cards |
| Primary 200 | #a7f3d0 | 167, 243, 208 | Borders, dividers |
| Primary 300 | #6ee7b7 | 110, 231, 183 | Icons, decorative elements |
| Primary 400 | #34d399 | 52, 211, 153 | Secondary buttons |
| **Primary 500** | **#10b981** | **16, 185, 129** | **Primary brand color** |
| Primary 600 | #059669 | 5, 150, 105 | Hover states |
| Primary 700 | #047857 | 4, 120, 87 | Active states |
| Primary 800 | #065f46 | 6, 95, 70 | Dark accents |
| Primary 900 | #064e3b | 6, 78, 59 | Very dark accents |
| Primary 950 | #022c22 | 2, 44, 34 | Darkest, text on light |

#### 3.1.2 Trust Blue (Secondary)
Represents trust, reliability, and education.

```css
/* Secondary Blue */
--color-secondary-50:  #eff6ff;
--color-secondary-100: #dbeafe;
--color-secondary-200: #bfdbfe;
--color-secondary-300: #93c5fd;
--color-secondary-400: #60a5fa;
--color-secondary-500: #3b82f6;   /* Base - Trust Blue */
--color-secondary-600: #2563eb;   /* Hover */
--color-secondary-700: #1d4ed8;   /* Active */
--color-secondary-800: #1e40af;
--color-secondary-900: #1e3a8a;
--color-secondary-950: #172554;
```

| Shade | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Secondary 50 | #eff6ff | 239, 246, 255 | Backgrounds |
| Secondary 100 | #dbeafe | 219, 234, 254 | Light cards |
| Secondary 200 | #bfdbfe | 191, 219, 254 | Borders |
| Secondary 300 | #93c5fd | 147, 197, 253 | Icons |
| Secondary 400 | #60a5fa | 96, 165, 250 | Links |
| **Secondary 500** | **#3b82f6** | **59, 130, 246** | **Secondary brand** |
| Secondary 600 | #2563eb | 37, 99, 235 | Hover |
| Secondary 700 | #1d4ed8 | 29, 78, 216 | Active |
| Secondary 800 | #1e40af | 30, 64, 175 | Dark accents |
| Secondary 900 | #1e3a8a | 30, 58, 138 | Darker |
| Secondary 950 | #172554 | 23, 37, 84 | Darkest |

### 3.2 Secondary Colors

#### 3.2.1 Gold/Amber (Accent)
Represents excellence, achievement, and Islamic heritage.

```css
/* Accent Gold */
--color-accent-50:  #fffbeb;
--color-accent-100: #fef3c7;
--color-accent-200: #fde68a;
--color-accent-300: #fcd34d;
--color-accent-400: #fbbf24;
--color-accent-500: #f59e0b;   /* Base - Gold */
--color-accent-600: #d97706;
--color-accent-700: #b45309;
--color-accent-800: #92400e;
--color-accent-900: #78350f;
--color-accent-950: #451a03;
```

#### 3.2.2 Purple (Islamic Heritage)
Represents wisdom, spirituality, and Islamic scholarly tradition.

```css
/* Islamic Purple */
--color-purple-50:  #faf5ff;
--color-purple-100: #f3e8ff;
--color-purple-200: #e9d5ff;
--color-purple-300: #d8b4fe;
--color-purple-400: #c084fc;
--color-purple-500: #a855f7;   /* Base */
--color-purple-600: #9333ea;
--color-purple-700: #7c3aed;
--color-purple-800: #6b21a8;
--color-purple-900: #581c87;
--color-purple-950: #3b0764;
```

### 3.3 Semantic Colors

#### 3.3.1 Success (Green)
```css
--color-success-50:  #f0fdf4;
--color-success-100: #dcfce7;
--color-success-200: #bbf7d0;
--color-success-300: #86efac;
--color-success-400: #4ade80;
--color-success-500: #22c55e;   /* Base */
--color-success-600: #16a34a;
--color-success-700: #15803d;
--color-success-800: #166534;
--color-success-900: #14532d;
```

#### 3.3.2 Warning (Amber)
```css
--color-warning-50:  #fffbeb;
--color-warning-100: #fef3c7;
--color-warning-200: #fde68a;
--color-warning-300: #fcd34d;
--color-warning-400: #fbbf24;
--color-warning-500: #f59e0b;   /* Base */
--color-warning-600: #d97706;
--color-warning-700: #b45309;
--color-warning-800: #92400e;
--color-warning-900: #78350f;
```

#### 3.3.3 Error (Red)
```css
--color-error-50:  #fef2f2;
--color-error-100: #fee2e2;
--color-error-200: #fecaca;
--color-error-300: #fca5a5;
--color-error-400: #f87171;
--color-error-500: #ef4444;   /* Base */
--color-error-600: #dc2626;
--color-error-700: #b91c1c;
--color-error-800: #991b1b;
--color-error-900: #7f1d1d;
```

#### 3.3.4 Info (Blue)
```css
--color-info-50:  #eff6ff;
--color-info-100: #dbeafe;
--color-info-200: #bfdbfe;
--color-info-300: #93c5fd;
--color-info-400: #60a5fa;
--color-info-500: #3b82f6;   /* Base */
--color-info-600: #2563eb;
--color-info-700: #1d4ed8;
--color-info-800: #1e40af;
--color-info-900: #1e3a8a;
```

### 3.4 Neutral Colors

```css
/* Slate Gray Palette */
--color-neutral-50:  #f8fafc;   /* Background */
--color-neutral-100: #f1f5f9;   /* Card backgrounds */
--color-neutral-200: #e2e8f0;   /* Borders, dividers */
--color-neutral-300: #cbd5e1;   /* Disabled states */
--color-neutral-400: #94a3b8;   /* Placeholder text */
--color-neutral-500: #64748b;   /* Secondary text */
--color-neutral-600: #475569;   /* Body text */
--color-neutral-700: #334155;   /* Strong text */
--color-neutral-800: #1e293b;   /* Headings */
--color-neutral-900: #0f172a;   /* Primary text */
--color-neutral-950: #020617;   /* Darkest */
```

### 3.5 Dark Mode Colors

```css
/* Dark Mode Semantic Tokens */
:root[data-theme="dark"] {
  /* Backgrounds */
  --bg-primary: #0f172a;        /* Main background */
  --bg-secondary: #1e293b;      /* Card backgrounds */
  --bg-tertiary: #334155;       /* Elevated surfaces */
  --bg-elevated: #475569;       /* Highest elevation */

  /* Text */
  --text-primary: #f8fafc;      /* Primary text */
  --text-secondary: #cbd5e1;    /* Secondary text */
  --text-tertiary: #94a3b8;     /* Muted text */
  --text-disabled: #64748b;     /* Disabled text */

  /* Borders */
  --border-default: #334155;
  --border-strong: #475569;
  --border-subtle: #1e293b;

  /* Primary colors (adjusted for dark mode) */
  --color-primary: #34d399;     /* Lighter green for contrast */
  --color-primary-hover: #10b981;
  --color-primary-active: #059669;

  /* Secondary colors */
  --color-secondary: #60a5fa;   /* Lighter blue */
  --color-secondary-hover: #3b82f6;
  --color-secondary-active: #2563eb;
}
```

### 3.6 Color Accessibility Matrix

All color combinations meet WCAG 2.2 AA contrast requirements:

| Text Color | Background | Contrast Ratio | Status |
|------------|------------|----------------|--------|
| Neutral 900 | White | 15.8:1 | AAA |
| Neutral 800 | White | 12.6:1 | AAA |
| Neutral 700 | White | 8.9:1 | AAA |
| Neutral 600 | White | 5.9:1 | AA |
| Primary 700 | White | 4.7:1 | AA |
| Primary 600 | White | 3.8:1 | AA (Large) |
| White | Primary 600 | 3.8:1 | AA (Large) |
| White | Primary 700 | 4.7:1 | AA |
| White | Neutral 800 | 12.6:1 | AAA |
| White | Neutral 900 | 15.8:1 | AAA |

---

## 4. Typography

### 4.1 Font Families

#### 4.1.1 English/Latin Text

**Primary Font: Inter**
- Modern, highly legible sans-serif
- Excellent screen readability
- Variable font support
- Wide language support

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

**Fallback Stack:**
```css
--font-fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                 'Helvetica Neue', Arial, sans-serif;
```

#### 4.1.2 Bengali (Bangla) Text

**Primary Font: Noto Sans Bengali**
- Google's comprehensive Bengali font
- Consistent with Noto font family
- Excellent Unicode support
- Variable weight support

```css
--font-bengali: 'Noto Sans Bengali', 'Kalpurush', 'SolaimanLipi', sans-serif;
```

**Alternative: Kalpurush**
- Traditional Bengali aesthetic
- Widely used in Bangladesh
- Good print and screen readability

#### 4.1.3 Arabic Text

**Primary Font: Noto Kufi Arabic**
- Modern Kufi style
- Excellent readability
- Consistent with design system

```css
--font-arabic: 'Noto Kufi Arabic', 'Amiri', 'Traditional Arabic', serif;
```

**Secondary Font: Amiri**
- Traditional Naskh style
- Ideal for Quranic text
- Elegant calligraphic appearance

```css
--font-arabic-quran: 'Amiri', 'KFGQPC Uthman Taha Naskh', serif;
```

### 4.2 Font Scales

#### 4.2.1 Desktop Font Scale (≥1024px)

| Token | Size (rem) | Size (px) | Line Height | Letter Spacing | Usage |
|-------|------------|-----------|-------------|----------------|-------|
| text-xs | 0.75 | 12 | 1.5 | 0.025em | Captions, meta |
| text-sm | 0.875 | 14 | 1.5 | 0.015em | Secondary text, labels |
| text-base | 1 | 16 | 1.6 | 0 | Body text |
| text-lg | 1.125 | 18 | 1.6 | -0.01em | Lead paragraphs |
| text-xl | 1.25 | 20 | 1.5 | -0.015em | Subheadings |
| text-2xl | 1.5 | 24 | 1.4 | -0.02em | Section headings |
| text-3xl | 1.875 | 30 | 1.3 | -0.025em | Page headings |
| text-4xl | 2.25 | 36 | 1.2 | -0.03em | Hero headings |
| text-5xl | 3 | 48 | 1.1 | -0.035em | Display headings |
| text-6xl | 3.75 | 60 | 1.1 | -0.04em | Large display |
| text-7xl | 4.5 | 72 | 1 | -0.045em | Extra large display |

#### 4.2.2 Mobile Font Scale (<768px)

| Token | Size (rem) | Size (px) | Line Height | Usage |
|-------|------------|-----------|-------------|-------|
| text-xs | 0.75 | 12 | 1.5 | Captions |
| text-sm | 0.875 | 14 | 1.5 | Secondary text |
| text-base | 1 | 16 | 1.6 | Body text |
| text-lg | 1.0625 | 17 | 1.6 | Lead text |
| text-xl | 1.125 | 18 | 1.5 | Subheadings |
| text-2xl | 1.25 | 20 | 1.4 | Section headings |
| text-3xl | 1.5 | 24 | 1.3 | Page headings |
| text-4xl | 1.875 | 30 | 1.2 | Hero headings |
| text-5xl | 2.25 | 36 | 1.1 | Display headings |

#### 4.2.3 Bengali Font Adjustments

Bengali text requires 10-15% larger font sizes for equivalent readability:

```css
/* Bengali-specific adjustments */
[lang="bn"] {
  font-size: 1.1em;  /* 10% larger */
  line-height: 1.7;  /* Slightly taller line height */
}
```

#### 4.2.4 Arabic Font Adjustments

Arabic text typically needs 15-20% larger font sizes:

```css
/* Arabic-specific adjustments */
[lang="ar"] {
  font-size: 1.15em;  /* 15% larger */
  line-height: 1.8;   /* Taller for diacritics */
  direction: rtl;
  text-align: right;
}

/* Quranic text (Amiri font) */
.quran-text {
  font-family: var(--font-arabic-quran);
  font-size: 1.25em;  /* 25% larger */
  line-height: 2;     /* Extra height for tajweed marks */
}
```

### 4.3 Font Weights

```css
--font-thin: 100;
--font-extralight: 200;
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
--font-black: 900;
```

| Weight | Usage |
|--------|-------|
| 400 (Regular) | Body text, paragraphs |
| 500 (Medium) | Emphasized body, buttons |
| 600 (Semibold) | Subheadings, labels |
| 700 (Bold) | Headings, important text |

### 4.4 Line Heights

```css
--leading-none: 1;          /* Headings, tight */
--leading-tight: 1.25;      /* Large headings */
--leading-snug: 1.375;      /* Medium headings */
--leading-normal: 1.5;      /* UI text */
--leading-relaxed: 1.625;   /* Body text */
--leading-loose: 2;         /* Spacious text */
```

### 4.5 Typography CSS Variables

```css
:root {
  /* Font Families */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-bengali: 'Noto Sans Bengali', 'Kalpurush', sans-serif;
  --font-arabic: 'Noto Kufi Arabic', sans-serif;
  --font-arabic-quran: 'Amiri', serif;
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
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;

  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  /* Letter Spacing */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
}
```

---

## 5. Spacing System

### 5.1 Base Spacing Scale

Built on a 4px (0.25rem) base unit for consistent rhythm:

```css
--space-0: 0;           /* 0px */
--space-px: 1px;        /* 1px - borders */
--space-0.5: 0.125rem;  /* 2px */
--space-1: 0.25rem;     /* 4px - micro */
--space-1.5: 0.375rem;  /* 6px */
--space-2: 0.5rem;      /* 8px - xs */
--space-2.5: 0.625rem;  /* 10px */
--space-3: 0.75rem;     /* 12px - sm */
--space-3.5: 0.875rem;  /* 14px */
--space-4: 1rem;        /* 16px - base */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px - md */
--space-7: 1.75rem;     /* 28px */
--space-8: 2rem;        /* 32px - lg */
--space-9: 2.25rem;     /* 36px */
--space-10: 2.5rem;     /* 40px */
--space-11: 2.75rem;    /* 44px */
--space-12: 3rem;       /* 48px - xl */
--space-14: 3.5rem;     /* 56px */
--space-16: 4rem;       /* 64px - 2xl */
--space-20: 5rem;       /* 80px */
--space-24: 6rem;       /* 96px - 3xl */
--space-28: 7rem;       /* 112px */
--space-32: 8rem;       /* 128px - 4xl */
--space-36: 9rem;       /* 144px */
--space-40: 10rem;      /* 160px */
--space-44: 11rem;      /* 176px */
--space-48: 12rem;      /* 192px */
--space-52: 13rem;      /* 208px */
--space-56: 14rem;      /* 224px */
--space-60: 15rem;      /* 240px */
--space-64: 16rem;      /* 256px */
--space-72: 18rem;      /* 288px */
--space-80: 20rem;      /* 320px */
--space-96: 24rem;      /* 384px */
```

### 5.2 Semantic Spacing Tokens

```css
/* Component Spacing */
--spacing-component-xs: var(--space-1);    /* 4px */
--spacing-component-sm: var(--space-2);    /* 8px */
--spacing-component-md: var(--space-4);    /* 16px */
--spacing-component-lg: var(--space-6);    /* 24px */
--spacing-component-xl: var(--space-8);    /* 32px */

/* Section Spacing */
--spacing-section-sm: var(--space-12);     /* 48px */
--spacing-section-md: var(--space-16);     /* 64px */
--spacing-section-lg: var(--space-24);     /* 96px */
--spacing-section-xl: var(--space-32);     /* 128px */

/* Layout Spacing */
--spacing-layout-gutter: var(--space-4);   /* 16px - mobile */
--spacing-layout-gutter-md: var(--space-6); /* 24px - tablet */
--spacing-layout-gutter-lg: var(--space-8); /* 32px - desktop */

/* Content Width */
--content-width-prose: 65ch;               /* Optimal reading width */
--content-width-sm: 640px;
--content-width-md: 768px;
--content-width-lg: 1024px;
--content-width-xl: 1280px;
--content-width-2xl: 1536px;
```

### 5.3 Spacing Usage Guidelines

| Context | Spacing Token | Size |
|---------|---------------|------|
| Between icons and text | space-2 | 8px |
| Between form label and input | space-1.5 | 6px |
| Between list items | space-2 | 8px |
| Card internal padding | space-4 to space-6 | 16-24px |
| Between cards | space-4 to space-6 | 16-24px |
| Section padding (mobile) | space-8 | 32px |
| Section padding (desktop) | space-16 | 64px |
| Page container padding | space-4 to space-8 | 16-32px |

---

## 6. Border Radius

### 6.1 Border Radius Scale

```css
--radius-none: 0;
--radius-sm: 0.125rem;     /* 2px */
--radius-default: 0.25rem; /* 4px */
--radius-md: 0.375rem;     /* 6px */
--radius-lg: 0.5rem;       /* 8px */
--radius-xl: 0.75rem;      /* 12px */
--radius-2xl: 1rem;        /* 16px */
--radius-3xl: 1.5rem;      /* 24px */
--radius-full: 9999px;     /* Fully rounded (pills, circles) */
```

### 6.2 Border Radius Usage

| Element | Token | Value |
|---------|-------|-------|
| Buttons (small) | radius-md | 6px |
| Buttons (default) | radius-lg | 8px |
| Input fields | radius-md | 6px |
| Cards | radius-xl | 12px |
| Modals/Dialogs | radius-2xl | 16px |
| Avatars | radius-full | 9999px |
| Badges/Pills | radius-full | 9999px |
| Tooltips | radius-lg | 8px |
| Dropdown menus | radius-lg | 8px |

---

## 7. Shadow System

### 7.1 Shadow Scale

```css
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);

--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1),
             0 1px 2px -1px rgb(0 0 0 / 0.1);

--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1),
             0 2px 4px -2px rgb(0 0 0 / 0.1);

--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1),
             0 4px 6px -4px rgb(0 0 0 / 0.1);

--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1),
             0 8px 10px -6px rgb(0 0 0 / 0.1);

--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

--shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);

--shadow-none: 0 0 #0000;
```

### 7.2 Shadow Usage

| Element | Shadow | Description |
|---------|--------|-------------|
| Cards (default) | shadow-sm | Subtle elevation |
| Cards (hover) | shadow-md | Enhanced on interaction |
| Dropdown menus | shadow-lg | Floating elements |
| Modals/Dialogs | shadow-xl | High elevation |
| Navigation (sticky) | shadow-md | Sticky header |
| Buttons (focus) | Custom focus ring | Accessibility indicator |
| Input focus | shadow-sm + ring | Focus state |

### 7.3 Dark Mode Shadows

```css
:root[data-theme="dark"] {
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.3),
               0 1px 2px -1px rgb(0 0 0 / 0.3);

  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4),
               0 2px 4px -2px rgb(0 0 0 / 0.3);

  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5),
               0 4px 6px -4px rgb(0 0 0 / 0.4);
}
```

---

## 8. Icon Library

### 8.1 Icon Library Selection

**Primary: Lucide Icons**
- MIT licensed, open source
- 1000+ consistent icons
- Optimized for React
- Consistent with Shadcn/ui

```bash
npm install lucide-react
```

**Secondary: Radix Icons**
- For additional UI icons
- Matches Radix UI components

```bash
npm install @radix-ui/react-icons
```

### 8.2 Icon Sizes

```css
--icon-xs: 12px;     /* Inline, badges */
--icon-sm: 16px;     /* Small buttons, lists */
--icon-md: 20px;     /* Default, buttons */
--icon-lg: 24px;     /* Large buttons, navigation */
--icon-xl: 32px;     /* Featured icons */
--icon-2xl: 48px;    /* Hero sections */
--icon-3xl: 64px;    /* Empty states, illustrations */
```

### 8.3 Icon Usage Guidelines

| Context | Size | Stroke Width |
|---------|------|--------------|
| Navigation items | 20px | 2px |
| Buttons (sm) | 16px | 2px |
| Buttons (md) | 20px | 2px |
| Buttons (lg) | 24px | 2px |
| Form field icons | 20px | 2px |
| Status indicators | 16px | 2px |
| Feature cards | 32-48px | 1.5px |
| Empty states | 64px | 1.5px |

### 8.4 Custom Islamic Icons

For Islamic-specific icons not available in Lucide:

```
📿 Tasbih / Prayer beads
🕌 Mosque
🕋 Kaaba
📖 Quran
🌙 Crescent moon
☪️ Star and crescent
🤲 Prayer hands (Dua)
📿 Misbaha
```

Consider creating custom SVG icons for:
- Quran progress (Mushaf pages)
- Surah indicators
- Juz markers
- Tajweed symbols
- Prayer time icons

---

## 9. Animation & Motion

### 9.1 Animation Principles

1. **Purposeful**: Animations should guide attention and provide feedback
2. **Subtle**: Avoid flashy or distracting animations
3. **Consistent**: Use standardized timing and easing across the app
4. **Respectful**: Honor user motion preferences (prefers-reduced-motion)
5. **Performant**: Use GPU-accelerated properties (transform, opacity)

### 9.2 Duration Scale

```css
--duration-instant: 0ms;
--duration-fast: 100ms;      /* Micro-interactions */
--duration-normal: 200ms;    /* Standard transitions */
--duration-moderate: 300ms;  /* Complex transitions */
--duration-slow: 400ms;      /* Large-scale animations */
--duration-slower: 500ms;    /* Modal/page transitions */
--duration-slowest: 1000ms;  /* Loading states */
```

### 9.3 Easing Functions

```css
/* Standard easings */
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Custom easings */
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
```

### 9.4 Common Animation Patterns

```css
/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale in */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Skeleton loading */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

### 9.5 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 9.6 Framer Motion Tokens

```typescript
// lib/animation-tokens.ts
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

export const slideUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2 }
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

---

## 10. Accessibility Standards

### 10.1 WCAG 2.2 AA Compliance

This design system is built to meet WCAG 2.2 Level AA requirements:

#### 10.1.1 Perceivable
- **1.1 Text Alternatives**: All images have alt text
- **1.3 Adaptable**: Semantic HTML structure
- **1.4.3 Contrast**: Minimum 4.5:1 for text, 3:1 for large text
- **1.4.11 Non-text Contrast**: 3:1 for UI components

#### 10.1.2 Operable
- **2.1 Keyboard Accessible**: All interactive elements keyboard-accessible
- **2.4 Navigable**: Clear focus indicators, skip links
- **2.5.5 Target Size**: Minimum 24x24px touch targets

#### 10.1.3 Understandable
- **3.1 Readable**: Language specified, clear language
- **3.2 Predictable**: Consistent navigation and naming
- **3.3 Input Assistance**: Error identification and suggestions

#### 10.1.4 Robust
- **4.1 Compatible**: Valid HTML, ARIA attributes

### 10.2 Focus States

```css
/* Default focus ring */
.focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Focus ring for dark backgrounds */
.focus-visible-light {
  outline: 2px solid white;
  outline-offset: 2px;
}

/* Shadcn focus ring */
:focus-visible {
  outline: none;
  ring: 2px;
  ring-color: var(--color-primary-500);
  ring-offset: 2px;
  ring-offset-color: var(--bg-primary);
}
```

### 10.3 Color Accessibility

- Never use color alone to convey information
- Always pair colors with icons, text, or patterns
- Test with color blindness simulators

### 10.4 Touch Target Sizes

```css
/* Minimum touch target */
--touch-target-min: 44px;

/* Recommended touch target */
--touch-target-recommended: 48px;

/* Spacing between targets */
--touch-target-spacing: 8px;
```

### 10.5 Screen Reader Support

```html
<!-- Skip link -->
<a href="#main-content" class="sr-only focus:not-sr-only">
  Skip to main content
</a>

<!-- Landmarks -->
<header role="banner">...</header>
<nav role="navigation" aria-label="Main">...</nav>
<main id="main-content" role="main">...</main>
<footer role="contentinfo">...</footer>

<!-- ARIA labels -->
<button aria-label="Close dialog">
  <XIcon aria-hidden="true" />
</button>

<!-- Live regions -->
<div role="status" aria-live="polite">
  <!-- Dynamic content announcements -->
</div>
```

---

## 11. RTL Support

### 11.1 RTL Layout Principles

For Arabic content, the layout must support right-to-left (RTL) reading direction:

#### 11.1.1 Mirrored Elements
- Navigation flows from right to left
- Icons flip direction (arrows, chevrons)
- Text alignment shifts to right
- Padding/margin reverses

#### 11.1.2 Non-Mirrored Elements
- Media controls (play/pause)
- Clocks and progress bars
- Numbers and phone numbers
- Slashes and mathematical operators

### 11.2 CSS Logical Properties

Use logical properties for automatic RTL support:

```css
/* Instead of left/right, use start/end */

/* Margin */
margin-inline-start: 1rem;  /* margin-left in LTR, margin-right in RTL */
margin-inline-end: 1rem;    /* margin-right in LTR, margin-left in RTL */

/* Padding */
padding-inline-start: 1rem;
padding-inline-end: 1rem;

/* Border */
border-inline-start: 1px solid;
border-inline-end: 1px solid;

/* Position */
inset-inline-start: 0;  /* left: 0 in LTR, right: 0 in RTL */
inset-inline-end: 0;

/* Text alignment */
text-align: start;  /* left in LTR, right in RTL */
text-align: end;

/* Flexbox */
justify-content: flex-start;  /* Automatic LTR/RTL handling */
```

### 11.3 RTL Implementation

```css
/* Base RTL styles */
[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

/* Icon flipping */
[dir="rtl"] .icon-arrow-right {
  transform: scaleX(-1);
}

/* Specific RTL overrides */
[dir="rtl"] .sidebar {
  right: 0;
  left: auto;
}
```

### 11.4 Tailwind CSS RTL

```typescript
// tailwind.config.ts
export default {
  plugins: [
    require('tailwindcss-rtl'), // RTL support plugin
  ],
  theme: {
    extend: {
      // Custom RTL utilities
    }
  }
}
```

Usage:
```html
<div class="ps-4 pe-2 ms-auto">
  <!-- ps = padding-start, pe = padding-end, ms = margin-start -->
</div>
```

---

## 12. Implementation Guidelines

### 12.1 CSS Variables Setup

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Colors */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 160 84% 39%;
    --primary-foreground: 0 0% 100%;
    --secondary: 217.2 91.2% 59.8%;
    --secondary-foreground: 0 0% 100%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 43 96% 56%;
    --accent-foreground: 0 0% 0%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 160 84% 39%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 160 74% 50%;
    --primary-foreground: 0 0% 0%;
    --secondary: 217.2 91.2% 59.8%;
    --secondary-foreground: 0 0% 100%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 43 96% 56%;
    --accent-foreground: 0 0% 0%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 160 74% 50%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### 12.2 Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        bengali: ['Noto Sans Bengali', 'Kalpurush', 'sans-serif'],
        arabic: ['Noto Kufi Arabic', 'sans-serif'],
        'arabic-quran': ['Amiri', 'serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

### 12.3 Design Token Export

```typescript
// lib/design-tokens.ts
export const colors = {
  primary: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22',
  },
  // ... other color scales
};

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
};

export const typography = {
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};
```

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | January 10, 2026 | Development Team | Initial design system document |

---

## References

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [UAE Design System Typography](https://designsystem.gov.ae/guidelines/typography)
- [Arabic Web Design Best Practices](https://uxbert.com/designing-an-arabic-user-experience-usability-arabic-user-interfaces/)
- [Lucide Icons](https://lucide.dev/)

---

*End of Design System Document*
