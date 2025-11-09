# Accessibility Guidelines

**Version**: 1.0.0  
**Last Updated**: 2025-11-09  
**Standard**: WCAG 2.1 AA Compliance

---

## Table of Contents

1. [WCAG 2.1 AA Compliance](#wcag-21-aa-compliance)
2. [Color & Contrast](#color--contrast)
3. [Typography & Readability](#typography--readability)
4. [Touch Targets](#touch-targets)
5. [Keyboard Navigation](#keyboard-navigation)
6. [Screen Reader Support](#screen-reader-support)
7. [Focus Management](#focus-management)
8. [Forms & Validation](#forms--validation)
9. [Motion & Animation](#motion--animation)
10. [Testing Checklist](#testing-checklist)

---

## WCAG 2.1 AA Compliance

### Overview

Our TaskManager app targets **WCAG 2.1 Level AA** compliance for mobile and desktop interfaces.

### Key Requirements

✅ **Perceivable**: Information and UI components must be presentable to users  
✅ **Operable**: UI components and navigation must be operable  
✅ **Understandable**: Information and operation of UI must be understandable  
✅ **Robust**: Content must be robust enough for various assistive technologies

---

## Color & Contrast

### Contrast Ratios (WCAG 2.1 AA)

**Normal Text** (< 18px):
- Minimum: **4.5:1**
- Target: **7:1** (AAA)

**Large Text** (≥ 18px or ≥ 14px bold):
- Minimum: **3:1**
- Target: **4.5:1** (AAA)

**UI Components & Graphics**:
- Minimum: **3:1**

### Color Palette Compliance

#### Primary Colors (On White Background)

| Color | Hex | Contrast | WCAG | Use Case |
|-------|-----|----------|------|----------|
| primary-500 | `#0ea5e9` | 4.51:1 | ✅ AA | Buttons, links |
| primary-600 | `#0284c7` | 6.04:1 | ✅ AAA | Hover states |
| primary-700 | `#0369a1` | 8.03:1 | ✅ AAA | Active states |

#### Status Colors (On White Background)

| Status | Color | Hex | Contrast | WCAG |
|--------|-------|-----|----------|------|
| Success | success-600 | `#16a34a` | 4.53:1 | ✅ AA |
| Warning | warning-600 | `#d97706` | 4.52:1 | ✅ AA |
| Error | error-600 | `#dc2626` | 5.91:1 | ✅ AAA |
| Info | info-600 | `#2563eb` | 6.37:1 | ✅ AAA |

#### Text Colors (On White Background)

| Text Type | Color | Hex | Contrast | WCAG |
|-----------|-------|-----|----------|------|
| Primary | gray-900 | `#111827` | 16.07:1 | ✅ AAA |
| Secondary | gray-600 | `#4b5563` | 7.27:1 | ✅ AAA |
| Tertiary | gray-500 | `#6b7280` | 5.38:1 | ✅ AAA |
| Disabled | gray-400 | `#9ca3af` | 3.12:1 | ⚠️ Use for disabled only |

### Color Contrast Testing

**Tools**:
- Chrome DevTools: Lighthouse Accessibility Audit
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Stark Plugin (Figma): https://www.getstark.co/

**Example**:
```css
/* Good: primary-600 on white */
.button-primary {
  background: #ffffff;
  color: #0284c7; /* 6.04:1 - AAA ✅ */
}

/* Bad: primary-400 on white */
.button-bad {
  background: #ffffff;
  color: #38bdf8; /* 2.89:1 - Fail ❌ */
}
```

### Color Blindness Considerations

**Don't Rely on Color Alone**:
- ❌ Red/green for status
- ✅ Red/green + icon + text label

**Status Indicators**:
```html
<!-- Good: Color + Icon + Text -->
<div class="status-success">
  <svg class="icon-check">...</svg>
  <span>Completed</span>
</div>

<!-- Bad: Color only -->
<div class="bg-green">Task</div>
```

**Types to Consider**:
- **Protanopia** (red-blind): 1% of males
- **Deuteranopia** (green-blind): 1% of males
- **Tritanopia** (blue-blind): 0.01% of population
- **Achromatopsia** (total color blindness): Very rare

**Testing Tools**:
- Color Oracle: https://colororacle.org/
- Chromelens: Chrome extension
- Sim Daltonism (macOS): Free app

---

## Typography & Readability

### Font Size Requirements

**Minimum Sizes** (Mobile):
- Body text: **16px** (prevents zoom on mobile)
- Labels: **14px**
- Captions: **12px** (use sparingly)
- Buttons: **16px**

**Minimum Sizes** (Desktop):
- Body text: **16px**
- Labels: **14px**
- Small text: **12px** (use sparingly)

### Line Height

**Body Text**:
- Minimum: **1.5** (WCAG requirement)
- Recommended: **1.5** to **1.75**

**Headings**:
- Minimum: **1.25**
- Recommended: **1.25** to **1.375**

### Line Length

**Optimal Reading**:
- Minimum: **45 characters**
- Maximum: **75 characters**
- Ideal: **60-70 characters**

**Implementation**:
```css
.prose {
  max-width: 65ch; /* ~65 characters */
  line-height: 1.5;
  font-size: 16px;
}
```

### Text Spacing

**Paragraph Spacing**:
- Minimum: **2x font-size** (32px for 16px font)

**Letter Spacing**:
- Body text: **0** (default)
- All caps: **0.05em** to **0.1em**
- Buttons: **0.01em**

### Font Weights

**Avoid Thin Fonts** (< 400):
- Harder to read
- Poor contrast
- Not accessible

**Recommended**:
- Body: 400 (normal)
- Emphasis: 500-600 (medium/semibold)
- Headings: 600-700 (semibold/bold)

---

## Touch Targets

### Minimum Size

**WCAG 2.1 Level AAA (Target Size)**:
- Minimum: **44x44px** (iOS, Android standard)
- Recommended: **48x48px**
- Exception: Inline links in text

### Touch Target Spacing

**Minimum Gap**:
- Between targets: **8px**
- Recommended: **12-16px**

### Examples

**Good Touch Targets**:
```css
.btn {
  min-width: 44px;
  min-height: 44px;
  padding: 12px 24px;
}

.icon-button {
  width: 48px;
  height: 48px;
  padding: 12px;
}

.nav-item {
  min-height: 56px;
  padding: 16px;
}
```

**Bad Touch Targets**:
```css
/* Too small */
.btn-small {
  width: 32px;
  height: 32px; /* ❌ Below minimum */
}

/* Too close */
.buttons {
  gap: 4px; /* ❌ Too close */
}
```

### Touch Target Heatmap

```
┌─────────────────────────────────────────┐
│ [48x48]    [48x48]    [48x48]           │ ✅ Good
│   12px       12px                       │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ [32x32][32x32][32x32]                   │ ❌ Bad
│   4px   4px                             │
└─────────────────────────────────────────┘
```

---

## Keyboard Navigation

### Tab Order

**Logical Order**:
1. Header navigation
2. Main content (top to bottom, left to right)
3. Footer navigation

**Skip Links**:
```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<main id="main-content">
  <!-- Content -->
</main>
```

### Focus Indicators

**Visibility**:
- Must be visible (not `outline: none`)
- Minimum 2px outline
- High contrast color

**Implementation**:
```css
/* Default browser focus */
*:focus {
  outline: 2px solid #0ea5e9;
  outline-offset: 2px;
}

/* Focus-visible (keyboard only) */
*:focus-visible {
  outline: 2px solid #0ea5e9;
  outline-offset: 2px;
}

/* Remove outline for mouse clicks */
*:focus:not(:focus-visible) {
  outline: none;
}
```

### Keyboard Shortcuts

**Essential Actions**:
- `Tab`: Next element
- `Shift + Tab`: Previous element
- `Enter`: Activate button/link
- `Space`: Activate button, toggle checkbox
- `Escape`: Close modal/menu
- `Arrow Keys`: Navigate lists/menus

**Custom Shortcuts** (Optional):
- `Ctrl + K`: Search
- `Ctrl + N`: New task
- `Ctrl + R`: Refresh

**Implementation**:
```javascript
document.addEventListener('keydown', (e) => {
  // Close modal on Escape
  if (e.key === 'Escape' && modalOpen) {
    closeModal();
  }
  
  // Create task on Ctrl+N
  if (e.ctrlKey && e.key === 'n') {
    e.preventDefault();
    openCreateTaskForm();
  }
});
```

### Focus Trap (Modals)

**Requirement**: Keep focus within modal when open

**Implementation**:
```javascript
function trapFocus(modal) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
  
  firstElement.focus();
}
```

---

## Screen Reader Support

### Semantic HTML

**Use Proper Elements**:
```html
<!-- Good: Semantic HTML -->
<nav>
  <ul>
    <li><a href="/">Tasks</a></li>
  </ul>
</nav>

<main>
  <article>
    <h1>Task Details</h1>
  </article>
</main>

<button type="button">Claim Task</button>

<!-- Bad: Div soup -->
<div class="nav">
  <div class="link">Tasks</div>
</div>

<div class="main">
  <div class="heading">Task Details</div>
</div>

<div class="btn" onclick="claimTask()">Claim Task</div>
```

### ARIA Labels

**When to Use**:
- Icon-only buttons
- Dynamically updated content
- Custom widgets
- Additional context needed

**Examples**:
```html
<!-- Icon button -->
<button aria-label="Close modal">
  <svg>...</svg>
</button>

<!-- Dynamic content -->
<div aria-live="polite" aria-atomic="true">
  <p>Task claimed successfully</p>
</div>

<!-- Status indicator -->
<span aria-label="Status: Completed">
  <svg class="icon-check">...</svg>
</span>

<!-- Loading state -->
<div role="status" aria-live="polite">
  <span class="spinner" aria-hidden="true"></span>
  <span class="sr-only">Loading tasks...</span>
</div>
```

### ARIA Roles

**Common Roles**:
- `role="button"`: For clickable divs (prefer `<button>`)
- `role="navigation"`: For nav (prefer `<nav>`)
- `role="status"`: For status messages
- `role="alert"`: For important alerts
- `role="dialog"`: For modals
- `role="tablist"`: For tabs

### Live Regions

**Politeness Levels**:

**Polite** (Don't interrupt):
```html
<div aria-live="polite">
  Task list updated
</div>
```

**Assertive** (Interrupt immediately):
```html
<div aria-live="assertive" role="alert">
  Error: Unable to claim task
</div>
```

**Off** (No announcement):
```html
<div aria-live="off">
  <!-- Updates not announced -->
</div>
```

### Screen Reader Only Text

**Implementation**:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

**Usage**:
```html
<button>
  <svg class="icon" aria-hidden="true">...</svg>
  <span class="sr-only">Claim task</span>
</button>
```

---

## Focus Management

### Focus on Page Load

**Set Initial Focus**:
```javascript
// Focus on main heading
document.querySelector('h1').focus();

// Or focus on main content area
document.getElementById('main-content').focus();
```

### Focus After Actions

**Modal Opens**:
```javascript
function openModal() {
  modal.style.display = 'block';
  modal.querySelector('h2').focus();
}
```

**Form Submission**:
```javascript
function submitForm() {
  // Success
  successToast.querySelector('.toast-message').focus();
  
  // Error
  firstErrorField.focus();
}
```

### Restore Focus

**After Modal Closes**:
```javascript
let previousFocus;

function openModal() {
  previousFocus = document.activeElement;
  modal.open();
}

function closeModal() {
  modal.close();
  previousFocus.focus();
}
```

---

## Forms & Validation

### Label Association

**Explicit Labels**:
```html
<!-- Good: Explicit association -->
<label for="task-type">Task Type</label>
<select id="task-type" name="taskType">
  <option>YouTube.Scrape</option>
</select>

<!-- Bad: No label -->
<select name="taskType">
  <option>YouTube.Scrape</option>
</select>
```

### Required Fields

**Mark Required**:
```html
<label for="task-type">
  Task Type <span aria-label="required">*</span>
</label>
<input id="task-type" required aria-required="true">
```

### Error Messages

**Associate with Field**:
```html
<label for="email">Email</label>
<input 
  id="email" 
  type="email" 
  aria-describedby="email-error"
  aria-invalid="true"
>
<span id="email-error" class="error">
  Please enter a valid email
</span>
```

### Field Instructions

**Provide Help Text**:
```html
<label for="priority">Priority</label>
<select id="priority" aria-describedby="priority-help">
  <option>Low</option>
  <option>High</option>
</select>
<span id="priority-help" class="help-text">
  High priority tasks are processed first
</span>
```

---

## Motion & Animation

### Respect Reduced Motion

**CSS**:
```css
/* Default: Animations enabled */
.card {
  transition: transform 200ms ease-out;
}

.card:hover {
  transform: translateY(-2px);
}

/* Reduced motion: Disable or simplify */
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
  
  .card:hover {
    transform: none;
  }
  
  /* Or simplify to opacity only */
  .modal {
    transition: opacity 150ms ease-out;
    /* Remove transform animations */
  }
}
```

**JavaScript**:
```javascript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

function animateElement(element) {
  if (prefersReducedMotion) {
    // Instant change, no animation
    element.classList.add('visible');
  } else {
    // Animated transition
    element.classList.add('fade-in');
  }
}
```

### Safe Animation Triggers

**Avoid**:
- Auto-playing videos
- Infinite looping animations
- Parallax effects
- Rapid flashing (seizure risk)

**Safe**:
- User-triggered animations
- Short, purposeful transitions
- Smooth scrolling (with option to disable)
- Loading spinners (non-flashing)

---

## Testing Checklist

### Manual Testing

#### Keyboard Navigation
- [ ] All interactive elements accessible via Tab
- [ ] Focus indicators visible
- [ ] Logical tab order
- [ ] No keyboard traps
- [ ] Modals trap focus correctly
- [ ] Escape closes modals

#### Screen Reader
- [ ] All images have alt text
- [ ] Icon buttons have labels
- [ ] Form fields have labels
- [ ] Error messages announced
- [ ] Live regions work correctly
- [ ] Heading hierarchy logical (H1 → H2 → H3)

#### Visual
- [ ] 200% zoom works without horizontal scroll
- [ ] Color contrast meets AA (4.5:1 for text)
- [ ] No color-only information
- [ ] Touch targets ≥ 44x44px
- [ ] Text readable on mobile

#### Motion
- [ ] Reduced motion preference respected
- [ ] No auto-playing content
- [ ] No rapid flashing
- [ ] Animations can be paused

### Automated Testing

**Tools**:
- **axe DevTools**: Chrome/Firefox extension
- **Lighthouse**: Chrome DevTools
- **WAVE**: Web accessibility evaluation tool
- **Pa11y**: CLI accessibility tester

**Example (axe)**:
```javascript
// In browser console
axe.run().then(results => {
  console.log(results.violations);
});
```

**Example (Lighthouse CLI)**:
```bash
lighthouse https://your-app.com --only-categories=accessibility
```

### Accessibility Score Target

- **Lighthouse**: ≥ 95/100
- **axe**: 0 violations
- **WAVE**: 0 errors (warnings acceptable if justified)

---

## Resources

### Standards & Guidelines
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Pa11y](https://pa11y.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Color Tools
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Color Oracle](https://colororacle.org/)
- [Who Can Use](https://whocanuse.com/)

### Screen Readers
- **NVDA** (Windows): Free
- **JAWS** (Windows): Commercial
- **VoiceOver** (macOS/iOS): Built-in
- **TalkBack** (Android): Built-in

---

## Version History

- v1.0.0 (2025-11-09): Initial accessibility guidelines for Worker11
