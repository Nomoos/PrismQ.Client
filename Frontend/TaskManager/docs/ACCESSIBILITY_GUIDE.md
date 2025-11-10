# Accessibility Guide - WCAG 2.1 AA Compliance

## Overview

This document outlines the accessibility features implemented in the TaskManager frontend application to achieve WCAG 2.1 Level AA compliance.

## Table of Contents

1. [Key Accessibility Features](#key-accessibility-features)
2. [ARIA Labels and Semantic HTML](#aria-labels-and-semantic-html)
3. [Keyboard Navigation](#keyboard-navigation)
4. [Screen Reader Support](#screen-reader-support)
5. [Focus Management](#focus-management)
6. [Color Contrast](#color-contrast)
7. [Touch Targets](#touch-targets)
8. [Testing Guidelines](#testing-guidelines)

## Key Accessibility Features

### ✅ Implemented Features

- **ARIA Labels**: All interactive elements have appropriate ARIA labels
- **Keyboard Navigation**: Full keyboard support for all views and actions
- **Focus Management**: Proper focus indicators and focus trapping in modals
- **Screen Reader Support**: Compatible with NVDA, JAWS, and other screen readers
- **Color Contrast**: All text meets WCAG 2.1 AA minimum contrast ratio (4.5:1)
- **Semantic HTML**: Proper use of HTML5 semantic elements
- **Touch Targets**: All interactive elements are at least 44x44px
- **Skip Links**: Skip to main content link for keyboard users
- **Live Regions**: Dynamic content updates announced to screen readers
- **Reduced Motion**: Respects user's preference for reduced motion

## ARIA Labels and Semantic HTML

### Semantic Structure

The application uses proper HTML5 semantic elements:

```html
<!-- Headers use role="banner" -->
<header role="banner">
  <h1>TaskManager</h1>
</header>

<!-- Main content uses role="main" -->
<main id="main-content" role="main" aria-label="Task list">
  <!-- Content -->
</main>

<!-- Navigation uses role="navigation" -->
<nav role="navigation" aria-label="Main navigation">
  <!-- Navigation items -->
</nav>

<!-- Sections use semantic HTML -->
<section aria-labelledby="heading-id">
  <h2 id="heading-id">Section Title</h2>
</section>
```

### ARIA Labels

All interactive elements have descriptive ARIA labels:

```html
<!-- Buttons -->
<button aria-label="Claim task: Email Processing">Claim</button>
<button aria-label="Mark task as complete">Complete</button>
<button aria-label="Go back to task list">← Back</button>

<!-- Links -->
<a href="/tasks" aria-label="Tasks">Tasks</a>

<!-- Status indicators -->
<span role="status" aria-label="Status: pending">PENDING</span>

<!-- Progress bars -->
<div 
  role="progressbar"
  aria-valuenow="75"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label="Task progress: 75%"
>
```

### Live Regions

Dynamic content updates use ARIA live regions:

```html
<!-- Polite announcements (non-critical) -->
<div role="status" aria-live="polite" aria-atomic="true">
  Task claimed successfully
</div>

<!-- Assertive announcements (critical) -->
<div role="alert" aria-live="assertive">
  Error loading tasks. Please try again.
</div>
```

## Keyboard Navigation

### Global Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to next interactive element |
| `Shift + Tab` | Move focus to previous interactive element |
| `Enter` | Activate focused element |
| `Space` | Activate focused element (buttons, checkboxes) |
| `Escape` | Close modal/dialog |
| `Arrow Keys` | Navigate between filter tabs |
| `Home` | Jump to first filter tab |
| `End` | Jump to last filter tab |

### Skip to Main Content

A skip link is provided for keyboard users to bypass navigation:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

The skip link is hidden by default but becomes visible when focused.

### Filter Tab Navigation

Filter tabs implement proper keyboard navigation:

```javascript
// Arrow keys navigate between tabs
@keydown.left="navigateFilter(-1, currentStatus)"
@keydown.right="navigateFilter(1, currentStatus)"
@keydown.home="navigateToFirstFilter"
@keydown.end="navigateToLastFilter"
```

### Task Card Interaction

Task cards are keyboard accessible:

```html
<article
  tabindex="0"
  @keydown.enter="goToTask(task.id)"
  @keydown.space.prevent="goToTask(task.id)"
>
```

## Screen Reader Support

### Screen Reader Announcements

The application uses a composable for screen reader announcements:

```typescript
import { useAccessibility } from '@/composables/useAccessibility'

const { announce } = useAccessibility()

// Announce success
announce('Task claimed successfully')

// Announce error
announce('Failed to load tasks')
```

### Screen Reader Only Content

Use the `.sr-only` class for content that should only be read by screen readers:

```html
<span class="sr-only">Task progress: 75%</span>
```

### Loading States

Loading states are announced to screen readers:

```html
<div role="status" aria-live="polite">
  <LoadingSpinner />
  <p>Loading tasks...</p>
</div>
```

## Focus Management

### Focus Indicators

All interactive elements have visible focus indicators:

```css
/* Default focus indicator */
*:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 2px;
}

/* Enhanced focus for buttons and links */
button:focus-visible,
a:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 3px;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}
```

### Focus Trapping in Modals

Modals implement focus trapping to keep keyboard navigation within the dialog:

```typescript
// Focus is trapped within the modal
// Tab cycles through focusable elements
// Escape closes the modal
// Focus is restored when modal closes
```

### Focus Restoration

When modals close, focus is restored to the element that opened the modal:

```typescript
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    previousActiveElement.value = document.activeElement as HTMLElement
  } else {
    previousActiveElement.value?.focus()
  }
})
```

## Color Contrast

All text meets WCAG 2.1 AA minimum contrast ratio of 4.5:1:

### Color Palette

```css
:root {
  /* Text colors */
  --text-high-contrast: #1f2937;    /* 14.2:1 on white ✅ */
  --text-medium-contrast: #4b5563;  /* 7.9:1 on white ✅ */
  
  /* Links */
  --link-color: #1d4ed8;            /* 7.0:1 on white ✅ */
  --link-hover: #1e40af;            /* 8.5:1 on white ✅ */
  
  /* Status colors */
  --error-text: #b91c1c;            /* 5.9:1 on white ✅ */
  --success-text: #166534;          /* 6.5:1 on white ✅ */
  --warning-text: #92400e;          /* 8.2:1 on white ✅ */
  --info-text: #1e40af;             /* 8.5:1 on white ✅ */
}
```

### High Contrast Mode

The application supports high contrast mode:

```css
@media (prefers-contrast: high) {
  *:focus,
  *:focus-visible {
    outline: 4px solid currentColor;
    outline-offset: 2px;
  }
}
```

## Touch Targets

All interactive elements meet the minimum touch target size of 44x44px:

```css
button,
a,
input[type="checkbox"],
input[type="radio"],
select,
[role="button"],
[role="link"] {
  min-width: 44px;
  min-height: 44px;
}
```

Exception: Inline text links within paragraphs are exempt from this requirement.

## Testing Guidelines

### Keyboard Testing

1. **Tab Navigation**: Ensure all interactive elements are reachable via Tab key
2. **Logical Tab Order**: Tab order follows visual layout
3. **Focus Visible**: Focus indicator is clearly visible on all elements
4. **Keyboard Shortcuts**: All actions can be performed with keyboard alone
5. **No Keyboard Traps**: User can navigate away from any element

### Screen Reader Testing

Recommended screen readers:
- **Windows**: NVDA (free), JAWS
- **macOS**: VoiceOver (built-in)
- **Mobile**: TalkBack (Android), VoiceOver (iOS)

Test checklist:
1. All content is read by screen reader
2. Headings create proper document outline
3. Links and buttons have descriptive labels
4. Form inputs have associated labels
5. Dynamic content updates are announced
6. Loading states are announced
7. Error messages are announced

### Automated Testing

Use automated testing tools:

```bash
# Run Playwright accessibility tests
npm run test:ux:accessibility
```

Recommended tools:
- axe DevTools (browser extension)
- WAVE (browser extension)
- Lighthouse (Chrome DevTools)
- pa11y (command line)

### Manual Testing Checklist

- [ ] Skip to main content link works
- [ ] All pages navigable by keyboard only
- [ ] Tab order is logical
- [ ] Focus visible on all interactive elements
- [ ] Screen reader announces all content
- [ ] Color contrast meets WCAG 2.1 AA (4.5:1)
- [ ] Forms accessible with labels and error messages
- [ ] Modals trap focus properly
- [ ] Dynamic content updates announced
- [ ] Loading states accessible
- [ ] Touch targets ≥44x44px
- [ ] Reduced motion preference respected

## Common Patterns

### Accessible Button

```html
<button
  @click="handleAction"
  :disabled="loading"
  :aria-busy="loading"
  aria-label="Descriptive action name"
  class="min-h-[44px]"
>
  <LoadingSpinner v-if="loading" />
  {{ loading ? 'Loading...' : 'Action' }}
</button>
```

### Accessible Form Input

```html
<div>
  <label for="task-name" class="required">
    Task Name
  </label>
  <input
    id="task-name"
    type="text"
    v-model="taskName"
    aria-required="true"
    :aria-invalid="hasError"
    :aria-describedby="hasError ? 'task-name-error' : undefined"
  />
  <p v-if="hasError" id="task-name-error" class="error-message" role="alert">
    Task name is required
  </p>
</div>
```

### Accessible List

```html
<div role="list" aria-label="Tasks">
  <article
    v-for="task in tasks"
    :key="task.id"
    role="listitem"
    tabindex="0"
    @keydown.enter="viewTask(task)"
    :aria-label="`Task ${task.type}, status ${task.status}`"
  >
    <!-- Task content -->
  </article>
</div>
```

### Accessible Progress Bar

```html
<div 
  role="progressbar"
  :aria-valuenow="progress"
  aria-valuemin="0"
  aria-valuemax="100"
  :aria-label="`Task progress: ${progress}%`"
>
  <div :style="{ width: `${progress}%` }"></div>
</div>
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs - Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM - Web Accessibility In Mind](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)

## Support

For accessibility issues or questions, please create an issue with the label `accessibility`.

---

**Last Updated**: 2025-11-10
**WCAG Level**: AA
**Compliance Status**: Compliant
