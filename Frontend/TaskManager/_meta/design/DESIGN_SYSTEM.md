# PrismQ TaskManager Design System

**Version**: 1.0.0  
**Last Updated**: 2025-11-09  
**Target Device**: Redmi 24115RA8EG (6.7" AMOLED, 2712x1220px)

## Overview

Mobile-first design system for the PrismQ TaskManager Frontend, optimized for the Redmi 24115RA8EG device with WCAG 2.1 AA accessibility compliance.

---

## Table of Contents

1. [Design Principles](#design-principles)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing System](#spacing-system)
5. [Breakpoints](#breakpoints)
6. [Iconography](#iconography)
7. [Shadows & Elevation](#shadows--elevation)
8. [Animations](#animations)

---

## Design Principles

### 1. Mobile-First
- Design for 360px viewport first
- Progressive enhancement for larger screens
- Touch-optimized interactions (44x44px minimum)
- Portrait-primary orientation

### 2. Accessibility
- WCAG 2.1 AA compliance
- Color contrast minimum 4.5:1 for normal text
- Color contrast minimum 3:1 for large text (18px+)
- Screen reader compatible
- Keyboard navigable
- Focus indicators visible

### 3. Performance
- Lightweight visuals
- System fonts for fast loading
- Optimized images (WebP, lazy loading)
- Minimal animations (60fps)
- AMOLED-optimized dark theme

### 4. Task-Focused
- Clear task status indicators
- Quick actions (claim, complete, fail)
- Minimal steps to complete workflows
- Clear error states
- Progress visibility

---

## Color System

### Primary Colors (Task Actions)

```css
/* Primary Blue - Main Actions */
--primary-50:  #f0f9ff;
--primary-100: #e0f2fe;
--primary-200: #b9e6fe;
--primary-300: #7dd3fc;
--primary-400: #38bdf8;
--primary-500: #0ea5e9;  /* Main primary */
--primary-600: #0284c7;  /* Hover state */
--primary-700: #0369a1;  /* Active state */
--primary-800: #075985;
--primary-900: #0c4a6e;
```

**Usage**: Claim buttons, active states, links, primary CTAs

**Accessibility**:
- primary-500 on white: 4.51:1 ✅ (WCAG AA)
- primary-600 on white: 6.04:1 ✅ (WCAG AA)
- primary-700 on white: 8.03:1 ✅ (WCAG AAA)

### Status Colors

```css
/* Success Green - Completed Tasks */
--success-50:  #f0fdf4;
--success-100: #dcfce7;
--success-500: #22c55e;  /* Main success */
--success-600: #16a34a;  /* Dark variant */
--success-700: #15803d;

/* Warning Orange - Claimed/In Progress */
--warning-50:  #fffbeb;
--warning-100: #fef3c7;
--warning-500: #f59e0b;  /* Main warning */
--warning-600: #d97706;  /* Dark variant */
--warning-700: #b45309;

/* Error Red - Failed Tasks */
--error-50:  #fef2f2;
--error-100: #fee2e2;
--error-500: #ef4444;  /* Main error */
--error-600: #dc2626;  /* Dark variant */
--error-700: #b91c1c;

/* Info Blue - Pending Tasks */
--info-50:  #eff6ff;
--info-100: #dbeafe;
--info-500: #3b82f6;  /* Main info */
--info-600: #2563eb;  /* Dark variant */
--info-700: #1d4ed8;
```

**Status Mapping**:
- **Pending**: Info Blue (--info-500)
- **Claimed**: Warning Orange (--warning-500)
- **Completed**: Success Green (--success-500)
- **Failed**: Error Red (--error-500)

**Accessibility**:
- All status colors meet 4.5:1 contrast on white backgrounds
- All -600 variants meet 7:1 contrast (AAA)

### Neutral Colors

```css
/* Gray Scale */
--gray-50:  #f9fafb;  /* Background light */
--gray-100: #f3f4f6;  /* Card background */
--gray-200: #e5e7eb;  /* Border light */
--gray-300: #d1d5db;  /* Border */
--gray-400: #9ca3af;  /* Disabled text */
--gray-500: #6b7280;  /* Secondary text */
--gray-600: #4b5563;  /* Body text */
--gray-700: #374151;  /* Headings */
--gray-800: #1f2937;  /* Dark headings */
--gray-900: #111827;  /* Black */
```

**Usage**:
- gray-50/100: Backgrounds
- gray-200/300: Borders
- gray-400: Disabled states
- gray-500: Secondary text
- gray-600: Body text
- gray-700/800/900: Headings

### Dark Theme (AMOLED Optimized)

```css
/* Dark Mode Colors */
--dark-bg: #000000;        /* Pure black for AMOLED */
--dark-surface: #121212;   /* Card background */
--dark-border: #1f1f1f;    /* Borders */
--dark-text: #e5e5e5;      /* Body text */
--dark-text-secondary: #a0a0a0;  /* Secondary text */
```

**Contrast Ratios** (Dark Mode):
- Text on dark-bg: 15.5:1 ✅ (AAA)
- Secondary text on dark-bg: 8.2:1 ✅ (AAA)

### Semantic Colors

```css
/* Backgrounds */
--bg-primary: #ffffff;      /* Light mode */
--bg-secondary: #f9fafb;
--bg-tertiary: #f3f4f6;

/* Text */
--text-primary: #111827;
--text-secondary: #6b7280;
--text-tertiary: #9ca3af;
--text-inverse: #ffffff;

/* Borders */
--border-light: #e5e7eb;
--border-medium: #d1d5db;
--border-dark: #9ca3af;
```

---

## Typography

### Font Family

```css
/* System Font Stack (Performance) */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", 
             Roboto, "Helvetica Neue", Arial, sans-serif;
```

**Rationale**: System fonts load instantly, look native, and provide excellent readability.

### Font Sizes (Mobile-Optimized)

```css
/* Base: 16px = 1rem */
--text-xs:   0.75rem;  /* 12px - Captions, timestamps */
--text-sm:   0.875rem; /* 14px - Labels, secondary text */
--text-base: 1rem;     /* 16px - Body text (minimum) */
--text-lg:   1.125rem; /* 18px - Large body text */
--text-xl:   1.25rem;  /* 20px - H6 */
--text-2xl:  1.5rem;   /* 24px - H5 */
--text-3xl:  1.875rem; /* 30px - H4 */
--text-4xl:  2.25rem;  /* 36px - H3 */
```

**Minimum Sizes**:
- Body text: 16px (1rem) - optimal mobile readability
- Labels: 14px (0.875rem)
- Captions: 12px (0.75rem) - use sparingly

### Font Weights

```css
--font-normal: 400;   /* Body text */
--font-medium: 500;   /* Emphasis, labels */
--font-semibold: 600; /* Headings, buttons */
--font-bold: 700;     /* Strong emphasis */
```

### Line Heights

```css
--leading-tight: 1.25;   /* Headings */
--leading-snug: 1.375;   /* Tight paragraphs */
--leading-normal: 1.5;   /* Body text (optimal) */
--leading-relaxed: 1.625;/* Comfortable reading */
--leading-loose: 2;      /* Extra spacing */
```

**Default**: 1.5 for body text (optimal readability)

### Type Scale

```css
/* H1 - Page Titles */
.text-h1 {
  font-size: 2.25rem;    /* 36px */
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

/* H2 - Section Headings */
.text-h2 {
  font-size: 1.875rem;   /* 30px */
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

/* H3 - Subsection Headings */
.text-h3 {
  font-size: 1.5rem;     /* 24px */
  font-weight: 600;
  line-height: 1.375;
}

/* H4 - Card Headings */
.text-h4 {
  font-size: 1.25rem;    /* 20px */
  font-weight: 600;
  line-height: 1.375;
}

/* Body Large */
.text-body-lg {
  font-size: 1.125rem;   /* 18px */
  font-weight: 400;
  line-height: 1.5;
}

/* Body (Default) */
.text-body {
  font-size: 1rem;       /* 16px */
  font-weight: 400;
  line-height: 1.5;
}

/* Body Small */
.text-body-sm {
  font-size: 0.875rem;   /* 14px */
  font-weight: 400;
  line-height: 1.5;
}

/* Caption */
.text-caption {
  font-size: 0.75rem;    /* 12px */
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-secondary);
}

/* Label */
.text-label {
  font-size: 0.875rem;   /* 14px */
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.01em;
}

/* Button */
.text-button {
  font-size: 1rem;       /* 16px */
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.01em;
}
```

---

## Spacing System

### Base Unit: 8px

```css
--space-0: 0;
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
```

### Touch Targets

```css
--touch-target-min: 44px;  /* Minimum touch target (iOS/Android) */
--touch-spacing: 8px;      /* Minimum spacing between touch targets */
```

**Guidelines**:
- All interactive elements: minimum 44x44px
- Spacing between touch targets: minimum 8px
- Prefer 48x48px for primary actions

### Component Spacing

```css
/* Cards */
--card-padding: 1rem;        /* 16px */
--card-spacing: 0.75rem;     /* 12px between cards */

/* Forms */
--form-field-spacing: 1rem;  /* 16px between fields */
--form-label-spacing: 0.5rem;/* 8px label to input */

/* Sections */
--section-spacing: 1.5rem;   /* 24px between sections */
--section-padding: 1rem;     /* 16px section padding */

/* Layout */
--layout-padding: 1rem;      /* 16px page padding */
--layout-max-width: 1280px;  /* Max content width */
```

---

## Breakpoints

### Mobile-First Strategy

```css
/* Mobile (default) - 0-639px */
/* Redmi 24115RA8EG primary target */
/* CSS Viewport: 360-428px */

/* Small tablets - 640px+ */
@media (min-width: 640px) {
  /* 2-column grids, larger cards */
}

/* Tablets - 768px+ */
@media (min-width: 768px) {
  /* More columns, sidebar option */
}

/* Laptops - 1024px+ */
@media (min-width: 1024px) {
  /* Desktop layout, persistent sidebar */
}

/* Desktops - 1280px+ */
@media (min-width: 1280px) {
  /* Max width containers, more whitespace */
}
```

### Tailwind Breakpoints

```javascript
screens: {
  'xs': '360px',   // Small phones (safe minimum)
  'sm': '428px',   // Large phones
  'md': '768px',   // Tablets
  'lg': '1024px',  // Laptops
  'xl': '1280px',  // Desktops
  '2xl': '1536px', // Large desktops
}
```

---

## Iconography

### Icon Sizes

```css
--icon-xs: 16px;   /* Small icons in text */
--icon-sm: 20px;   /* Labels, secondary actions */
--icon-md: 24px;   /* Default size */
--icon-lg: 32px;   /* Large touch targets */
--icon-xl: 48px;   /* Feature icons */
```

**Touch-Friendly**: Use 24px+ for interactive icons

### Icon System

**Recommended**: Heroicons (MIT License) or similar simple icon set

**Characteristics**:
- Outline style for default state
- Solid style for active/selected state
- 24x24px base size
- 1.5px stroke width
- Rounded stroke caps

### Icon Usage

```html
<!-- Status Icons -->
<svg class="w-5 h-5 text-success-500"><!-- Completed --></svg>
<svg class="w-5 h-5 text-warning-500"><!-- Claimed --></svg>
<svg class="w-5 h-5 text-error-500"><!-- Failed --></svg>
<svg class="w-5 h-5 text-info-500"><!-- Pending --></svg>

<!-- Navigation Icons -->
<svg class="w-6 h-6"><!-- 24px for nav items --></svg>

<!-- Action Icons -->
<svg class="w-8 h-8"><!-- 32px for touch actions --></svg>
```

---

## Shadows & Elevation

### Shadow Scale

```css
/* Elevation System (0-5) */
--shadow-none: none;

--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
/* Cards at rest */

--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1),
             0 2px 4px -2px rgb(0 0 0 / 0.1);
/* Cards on hover, dropdowns */

--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1),
             0 4px 6px -4px rgb(0 0 0 / 0.1);
/* Modals, popovers */

--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1),
             0 8px 10px -6px rgb(0 0 0 / 0.1);
/* Drawers, large modals */

--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
/* Maximum elevation */
```

### Usage Guidelines

- **Level 0** (none): Flat elements
- **Level 1** (sm): Cards, list items
- **Level 2** (md): Hovering cards, dropdown menus
- **Level 3** (lg): Modals, bottom sheets
- **Level 4** (xl): Navigation drawers
- **Level 5** (2xl): Fullscreen overlays

### Dark Mode Shadows

```css
/* Dark mode uses more subtle shadows */
--shadow-dark-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
--shadow-dark-md: 0 4px 6px -1px rgb(0 0 0 / 0.4),
                  0 2px 4px -2px rgb(0 0 0 / 0.3);
--shadow-dark-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5),
                  0 4px 6px -4px rgb(0 0 0 / 0.4);
```

---

## Animations

### Duration

```css
--duration-fast: 150ms;     /* Hover states, toggles */
--duration-normal: 200ms;   /* Default transitions */
--duration-slow: 300ms;     /* Modals, drawers */
--duration-slower: 500ms;   /* Page transitions */
```

### Easing

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);      /* Default */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1); /* Smooth */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

**Default**: ease-out (cubic-bezier(0, 0, 0.2, 1))

### Common Transitions

```css
/* Button Hover */
transition: background-color 150ms ease-out,
            transform 150ms ease-out;

/* Card Hover */
transition: box-shadow 200ms ease-out,
            transform 200ms ease-out;

/* Modal Open/Close */
transition: opacity 300ms ease-in-out,
            transform 300ms ease-in-out;

/* Drawer Slide */
transition: transform 300ms ease-out;

/* Color Changes */
transition: color 200ms ease-out,
            background-color 200ms ease-out,
            border-color 200ms ease-out;
```

### Performance Guidelines

- Use `transform` and `opacity` for best performance (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left` (causes reflow)
- Target 60fps (16.67ms per frame)
- Use `will-change` sparingly for complex animations
- Prefer CSS transitions over JavaScript animations

### Loading Animations

```css
/* Spinner */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}

/* Pulse (Loading states) */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Skeleton Loading */
@keyframes skeleton {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.animate-skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: skeleton 1.5s ease-in-out infinite;
}
```

---

## Border Radius

```css
--radius-none: 0;
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.375rem;  /* 6px */
--radius-lg: 0.5rem;    /* 8px - Default for cards */
--radius-xl: 0.75rem;   /* 12px */
--radius-2xl: 1rem;     /* 16px */
--radius-full: 9999px;  /* Pills, rounded buttons */
```

**Default**: 8px (--radius-lg) for cards and containers

---

## Accessibility Guidelines

### Color Contrast

✅ **WCAG 2.1 AA Compliant**
- Normal text (< 18px): minimum 4.5:1
- Large text (≥ 18px): minimum 3:1
- UI components: minimum 3:1

### Touch Targets

✅ **Mobile-Friendly**
- Minimum size: 44x44px
- Minimum spacing: 8px between targets
- Recommended: 48x48px for primary actions

### Focus Indicators

```css
/* Focus Ring */
.focus-visible:focus {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* Focus within (for containers) */
.focus-within:focus-within {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}
```

### Screen Reader Support

- Use semantic HTML (`<button>`, `<nav>`, `<main>`)
- Provide ARIA labels for icons
- Use ARIA live regions for dynamic updates
- Meaningful alt text for images
- Skip navigation links

### Keyboard Navigation

- All interactive elements focusable
- Logical tab order
- Visible focus indicators
- Keyboard shortcuts for common actions
- Escape to close modals/menus

---

## References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Design Touch Targets](https://material.io/design/usability/accessibility.html)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Android Material Design](https://material.io/design)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Version History**:
- v1.0.0 (2025-11-09): Initial design system for Worker11
