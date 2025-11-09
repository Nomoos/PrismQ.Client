# Component Specifications

**Version**: 1.0.0  
**Last Updated**: 2025-11-09  
**Design System**: [Design System](../DESIGN_SYSTEM.md)

---

## Table of Contents

1. [Task Card](#task-card)
2. [Buttons](#buttons)
3. [Form Inputs](#form-inputs)
4. [Navigation](#navigation)
5. [Modals & Sheets](#modals--sheets)
6. [Badges & Status Indicators](#badges--status-indicators)
7. [Loading States](#loading-states)
8. [Empty States](#empty-states)
9. [Toast Notifications](#toast-notifications)

---

## Task Card

### Purpose
Display task information in list views with status, priority, and quick actions.

### Specifications

**Dimensions**:
- Minimum height: 72px (touch-friendly)
- Padding: 16px
- Margin bottom: 12px
- Border radius: 8px

**Layout**:
```
┌─────────────────────────────────────┐
│ ● Task Type              [Status]   │
│ ID: 12345                           │
│ Priority: High | Attempts: 1/3      │
│ ──────────────────── 45% (if active)│
│ Created: 2h ago                     │
└─────────────────────────────────────┘
```

**States**:
1. **Default**: White background, light gray border, shadow-sm
2. **Hover**: shadow-md, slight lift (transform: translateY(-2px))
3. **Active/Pressed**: shadow-sm, no transform
4. **Claimed**: Warning-50 background
5. **Completed**: Success-50 background
6. **Failed**: Error-50 background

**Visual Specifications**:

```css
.task-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  min-height: 72px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  transition: box-shadow 200ms ease-out,
              transform 200ms ease-out;
  cursor: pointer;
}

.task-card:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
              0 2px 4px -2px rgb(0 0 0 / 0.1);
  transform: translateY(-2px);
}

.task-card.claimed {
  background: #fffbeb; /* warning-50 */
  border-color: #fef3c7; /* warning-100 */
}

.task-card.completed {
  background: #f0fdf4; /* success-50 */
  border-color: #dcfce7; /* success-100 */
}

.task-card.failed {
  background: #fef2f2; /* error-50 */
  border-color: #fee2e2; /* error-100 */
}
```

**Content Elements**:

1. **Status Indicator** (Circle):
   - Size: 12px diameter
   - Position: Top-left, inline with title
   - Colors: Pending (blue), Claimed (orange), Completed (green), Failed (red)

2. **Task Type** (Title):
   - Font: 16px, font-weight: 600, color: gray-900
   - Truncate with ellipsis if too long

3. **Task ID**:
   - Font: 14px, color: gray-500
   - Format: "ID: {number}"

4. **Metadata Row**:
   - Font: 14px, color: gray-600
   - Format: "Priority: {level} | Attempts: {current}/{max}"

5. **Progress Bar** (if claimed and progress > 0):
   - Height: 8px
   - Background: gray-200
   - Foreground: primary-500
   - Border radius: 4px (full)
   - Margin top: 8px
   - Progress text: 12px, gray-500

6. **Status Badge**:
   - Position: Top-right
   - Padding: 4px 8px
   - Font: 12px, font-weight: 500
   - Border radius: 4px
   - Colors: 
     - Pending: info-100 bg, info-800 text
     - Claimed: warning-100 bg, warning-800 text
     - Completed: success-100 bg, success-800 text
     - Failed: error-100 bg, error-800 text

7. **Timestamp**:
   - Font: 12px, color: gray-500
   - Position: Below status badge
   - Format: Relative time (e.g., "2h ago", "Just now")

**Interactions**:
- **Tap**: Navigate to task detail view
- **Swipe Right**: Quick claim (pending tasks only)
- **Swipe Left**: Reveal quick actions menu
- **Long Press**: Open context menu (future)

**Accessibility**:
- Full card is focusable and keyboard accessible
- Screen reader announces: "{Task type}, {status}, priority {level}"
- Focus indicator: 2px primary-500 outline with 2px offset
- Minimum tap target: 72px height ensures > 44px

---

## Buttons

### Primary Button

**Purpose**: Main call-to-action (Claim, Complete, Submit)

**Specifications**:
- Height: 44px (minimum touch target)
- Padding: 12px 24px
- Font: 16px, font-weight: 600
- Border radius: 8px
- Background: primary-500
- Text color: white
- Shadow: shadow-sm

**States**:
```css
.btn-primary {
  height: 44px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  background: #0ea5e9; /* primary-500 */
  color: #ffffff;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  transition: background-color 150ms ease-out,
              box-shadow 150ms ease-out;
}

.btn-primary:hover {
  background: #0284c7; /* primary-600 */
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.btn-primary:active {
  background: #0369a1; /* primary-700 */
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.btn-primary:disabled {
  background: #9ca3af; /* gray-400 */
  cursor: not-allowed;
  opacity: 0.6;
}
```

### Secondary Button

**Purpose**: Secondary actions (Cancel, Back)

**Specifications**:
- Same dimensions as primary
- Background: white
- Border: 1px solid gray-300
- Text color: gray-700

```css
.btn-secondary {
  height: 44px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  background: #ffffff;
  color: #374151; /* gray-700 */
  border: 1px solid #d1d5db; /* gray-300 */
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  transition: background-color 150ms ease-out,
              border-color 150ms ease-out;
}

.btn-secondary:hover {
  background: #f9fafb; /* gray-50 */
  border-color: #9ca3af; /* gray-400 */
}
```

### Danger Button

**Purpose**: Destructive actions (Fail Task, Delete)

**Specifications**:
- Same dimensions as primary
- Background: error-500
- Text color: white

```css
.btn-danger {
  height: 44px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  background: #ef4444; /* error-500 */
  color: #ffffff;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.btn-danger:hover {
  background: #dc2626; /* error-600 */
}
```

### Icon Button

**Purpose**: Icon-only actions (Close, Menu, More)

**Specifications**:
- Size: 44x44px (touch target)
- Icon: 24px
- Border radius: 8px (or 50% for circular)
- Background: transparent (hover: gray-100)

```css
.btn-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: transparent;
  color: #6b7280; /* gray-500 */
  transition: background-color 150ms ease-out,
              color 150ms ease-out;
}

.btn-icon:hover {
  background: #f3f4f6; /* gray-100 */
  color: #374151; /* gray-700 */
}
```

**Accessibility**:
- All buttons: minimum 44x44px touch target
- Focus indicator: 2px outline, 2px offset
- ARIA labels for icon buttons
- Disabled buttons: aria-disabled="true"

---

## Form Inputs

### Text Input

**Purpose**: Text entry (Task ID, Search, etc.)

**Specifications**:
- Height: 44px
- Padding: 12px 16px
- Font: 16px (prevents zoom on mobile)
- Border: 1px solid gray-300
- Border radius: 8px
- Background: white

```css
.input-text {
  height: 44px;
  padding: 12px 16px;
  font-size: 16px; /* Prevents iOS zoom */
  border: 1px solid #d1d5db; /* gray-300 */
  border-radius: 8px;
  background: #ffffff;
  color: #111827; /* gray-900 */
  transition: border-color 150ms ease-out,
              box-shadow 150ms ease-out;
}

.input-text:focus {
  outline: none;
  border-color: #0ea5e9; /* primary-500 */
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

.input-text:disabled {
  background: #f3f4f6; /* gray-100 */
  color: #9ca3af; /* gray-400 */
  cursor: not-allowed;
}

.input-text.error {
  border-color: #ef4444; /* error-500 */
}
```

**Label**:
```css
.input-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151; /* gray-700 */
  margin-bottom: 8px;
}
```

**Error Message**:
```css
.input-error-message {
  display: block;
  font-size: 14px;
  color: #ef4444; /* error-500 */
  margin-top: 8px;
}
```

### Select Dropdown

**Purpose**: Option selection (Priority, Status filter)

**Specifications**:
- Same as text input
- Arrow icon: 20px, positioned right
- Options: 44px height each (mobile-friendly)

```css
.select {
  height: 44px;
  padding: 12px 40px 12px 16px;
  font-size: 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff url("data:image/svg...") no-repeat right 12px center;
  background-size: 20px;
  appearance: none;
}

.select option {
  min-height: 44px;
  padding: 12px;
}
```

### Checkbox

**Purpose**: Boolean selection (Terms acceptance, filters)

**Specifications**:
- Size: 20x20px
- Border: 2px solid gray-400
- Border radius: 4px
- Checked: primary-500 background, white checkmark

```css
.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #9ca3af; /* gray-400 */
  border-radius: 4px;
  background: #ffffff;
  cursor: pointer;
  transition: background-color 150ms ease-out,
              border-color 150ms ease-out;
}

.checkbox:checked {
  background: #0ea5e9; /* primary-500 */
  border-color: #0ea5e9;
}

.checkbox:focus {
  outline: 2px solid #0ea5e9;
  outline-offset: 2px;
}
```

**Label**:
- Position: Right of checkbox
- Minimum tap target: Create 44x44px wrapper around checkbox + label

### Textarea

**Purpose**: Multi-line text entry (Task result, notes)

**Specifications**:
- Min-height: 88px (2 lines @ 44px)
- Padding: 12px 16px
- Font: 16px
- Resizable: vertical only

```css
.textarea {
  min-height: 88px;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff;
  resize: vertical;
}
```

---

## Navigation

### Bottom Tab Bar

**Purpose**: Primary navigation between views (Tasks, Workers, Settings)

**Specifications**:
- Height: 56px + safe-area-inset-bottom
- Background: white
- Border-top: 1px solid gray-200
- Position: fixed bottom
- Shadow: shadow-lg (reversed, top shadow)

**Layout**:
```
┌─────────┬─────────┬─────────┐
│  Tasks  │ Workers │Settings │
│    ●    │         │         │
└─────────┴─────────┴─────────┘
```

**Specifications**:
```css
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  padding-bottom: env(safe-area-inset-bottom);
  background: #ffffff;
  border-top: 1px solid #e5e7eb; /* gray-200 */
  box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1);
  display: flex;
  z-index: 50;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  color: #6b7280; /* gray-500 */
  text-decoration: none;
  transition: color 150ms ease-out;
}

.nav-item.active {
  color: #0ea5e9; /* primary-500 */
}

.nav-item:hover {
  color: #0284c7; /* primary-600 */
}

.nav-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
}

.nav-label {
  font-size: 12px;
  font-weight: 500;
}
```

**Active Indicator**:
- Option 1: Color change (text + icon to primary-500)
- Option 2: Small dot above icon (4px diameter, primary-500)
- Option 3: Underline (2px, primary-500)

**Accessibility**:
- Each nav item: role="tab", aria-selected
- Active item: aria-current="page"
- Keyboard navigable (arrow keys)

### Header (Top App Bar)

**Purpose**: Page title, back button, actions

**Specifications**:
- Height: 64px
- Background: white
- Border-bottom: 1px solid gray-200
- Position: sticky top 0
- Shadow: shadow-sm

```css
.header {
  position: sticky;
  top: 0;
  height: 64px;
  padding: 0 16px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 40;
}

.header-back-btn {
  /* Icon button (44x44px) */
}

.header-title {
  flex: 1;
  font-size: 20px;
  font-weight: 600;
  color: #111827; /* gray-900 */
}

.header-actions {
  display: flex;
  gap: 8px;
}
```

---

## Modals & Sheets

### Bottom Sheet

**Purpose**: Mobile-friendly modal for forms and confirmations

**Specifications**:
- Max-height: 80vh
- Border-radius: 16px 16px 0 0 (top corners only)
- Background: white
- Shadow: shadow-2xl
- Handle: 32x4px gray bar at top

**Animation**:
- Slide up from bottom: 300ms ease-out
- Backdrop fade in: 300ms ease-out

```css
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 80vh;
  background: #ffffff;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  z-index: 100;
  transform: translateY(100%);
  transition: transform 300ms ease-out;
}

.bottom-sheet.open {
  transform: translateY(0);
}

.sheet-handle {
  width: 32px;
  height: 4px;
  background: #d1d5db; /* gray-300 */
  border-radius: 2px;
  margin: 12px auto 8px;
}

.sheet-content {
  padding: 16px;
  max-height: calc(80vh - 60px);
  overflow-y: auto;
}

.sheet-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  opacity: 0;
  transition: opacity 300ms ease-out;
}

.sheet-backdrop.open {
  opacity: 1;
}
```

**Interactions**:
- **Swipe Down**: Close sheet
- **Tap Backdrop**: Close sheet
- **Escape Key**: Close sheet

### Modal (Desktop)

**Purpose**: Centered modal for desktop views

**Specifications**:
- Max-width: 500px
- Padding: 24px
- Border-radius: 12px
- Background: white
- Shadow: shadow-2xl
- Centered: absolute center of viewport

```css
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  padding: 24px;
  z-index: 100;
  overflow-y: auto;
}
```

---

## Badges & Status Indicators

### Status Badge

**Purpose**: Display task status (Pending, Claimed, Completed, Failed)

**Specifications**:
- Padding: 4px 8px
- Font: 12px, font-weight: 500
- Border-radius: 4px
- Display: inline-block

```css
.badge {
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
  line-height: 1.5;
}

.badge-pending {
  background: #dbeafe; /* info-100 */
  color: #1e40af; /* info-800 */
}

.badge-claimed {
  background: #fef3c7; /* warning-100 */
  color: #92400e; /* warning-800 */
}

.badge-completed {
  background: #dcfce7; /* success-100 */
  color: #166534; /* success-800 */
}

.badge-failed {
  background: #fee2e2; /* error-100 */
  color: #991b1b; /* error-800 */
}
```

### Priority Badge

**Purpose**: Display task priority (Low, Medium, High, Urgent)

```css
.badge-low {
  background: #f3f4f6; /* gray-100 */
  color: #4b5563; /* gray-600 */
}

.badge-medium {
  background: #dbeafe; /* info-100 */
  color: #1e40af; /* info-800 */
}

.badge-high {
  background: #fed7aa; /* orange-100 */
  color: #9a3412; /* orange-800 */
}

.badge-urgent {
  background: #fee2e2; /* error-100 */
  color: #991b1b; /* error-800 */
}
```

---

## Loading States

### Spinner

**Purpose**: Indicate loading/processing

**Specifications**:
- Size: 32px (default), 48px (large), 20px (small)
- Border: 3px
- Color: primary-500
- Animation: 1s linear infinite

```css
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e5e7eb; /* gray-200 */
  border-top-color: #0ea5e9; /* primary-500 */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### Skeleton Loading

**Purpose**: Content placeholder while loading

**Specifications**:
- Background: gray-200
- Animation: shimmer effect
- Border-radius: matches content

```css
.skeleton {
  background: linear-gradient(
    90deg,
    #f3f4f6 25%,
    #e5e7eb 50%,
    #f3f4f6 75%
  );
  background-size: 200% 100%;
  animation: skeleton 1.5s ease-in-out infinite;
  border-radius: 4px;
}

@keyframes skeleton {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Progress Bar

**Purpose**: Show task completion percentage

**Specifications**:
- Height: 8px
- Background: gray-200
- Foreground: primary-500
- Border-radius: 4px (full)

```css
.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb; /* gray-200 */
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #0ea5e9; /* primary-500 */
  border-radius: 4px;
  transition: width 300ms ease-out;
}
```

---

## Empty States

### Purpose
Display when no content is available (no tasks, no results, etc.)

**Specifications**:
- Icon: 64px, gray-400
- Title: 20px, font-weight: 600, gray-700
- Description: 16px, gray-500
- Action button: Primary or secondary
- Vertical spacing: 16px between elements

```css
.empty-state {
  text-align: center;
  padding: 48px 16px;
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  color: #9ca3af; /* gray-400 */
}

.empty-title {
  font-size: 20px;
  font-weight: 600;
  color: #374151; /* gray-700 */
  margin-bottom: 8px;
}

.empty-description {
  font-size: 16px;
  color: #6b7280; /* gray-500 */
  margin-bottom: 24px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.empty-action {
  /* Primary or secondary button */
}
```

**Examples**:
- **No Tasks**: "No tasks available", "Tasks will appear here when created"
- **No Results**: "No matching tasks", "Try adjusting your filters"
- **Error**: "Something went wrong", "Please try again later"

---

## Toast Notifications

### Purpose
Brief, non-blocking feedback messages

**Specifications**:
- Max-width: 400px
- Padding: 12px 16px
- Border-radius: 8px
- Shadow: shadow-lg
- Position: Top-center or bottom-center (above nav)
- Duration: 3 seconds (auto-dismiss)

**Types**:
1. **Success**: Green background
2. **Error**: Red background
3. **Warning**: Orange background
4. **Info**: Blue background

```css
.toast {
  position: fixed;
  top: 80px; /* Below header */
  left: 50%;
  transform: translateX(-50%) translateY(-100px);
  max-width: 400px;
  width: 90%;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
              0 4px 6px -4px rgb(0 0 0 / 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 200;
  opacity: 0;
  transition: opacity 300ms ease-out,
              transform 300ms ease-out;
}

.toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.toast-success {
  background: #22c55e; /* success-500 */
  color: #ffffff;
}

.toast-error {
  background: #ef4444; /* error-500 */
  color: #ffffff;
}

.toast-warning {
  background: #f59e0b; /* warning-500 */
  color: #ffffff;
}

.toast-info {
  background: #3b82f6; /* info-500 */
  color: #ffffff;
}

.toast-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.toast-message {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
}

.toast-close {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  cursor: pointer;
}
```

**Accessibility**:
- ARIA live region (aria-live="polite" or "assertive")
- Dismissible with close button
- Keyboard accessible (focus trap if interactive)

---

## Dark Mode Component Specifications

### Overview

All components have dark mode variants that follow the GitHub-inspired dark theme from the design system. Dark mode uses higher contrast and adjusted colors for optimal readability on dark backgrounds.

### Task Card (Dark Mode)

**Background & Borders**:
```css
[data-theme="dark"] .task-card {
  background: #161b22; /* dark-surface-default */
  border: 1px solid #30363d; /* dark-border-default */
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  color: #e6edf3; /* dark-text-primary */
}

[data-theme="dark"] .task-card:hover {
  background: #1c2128; /* dark-surface-overlay */
  border-color: #30363d;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.4);
}

[data-theme="dark"] .task-card.claimed {
  background: #341a03; /* dark-warning-subtle */
  border-color: #bb8009; /* dark-warning-border */
}

[data-theme="dark"] .task-card.completed {
  background: #0d3818; /* dark-success-subtle */
  border-color: #2ea043; /* dark-success-border */
}

[data-theme="dark"] .task-card.failed {
  background: #490b08; /* dark-error-subtle */
  border-color: #f85149; /* dark-error-border */
}
```

**Text Colors**:
```css
[data-theme="dark"] .task-type {
  color: #e6edf3; /* dark-text-primary */
}

[data-theme="dark"] .task-id {
  color: #8d96a0; /* dark-text-secondary */
}

[data-theme="dark"] .task-metadata {
  color: #8d96a0; /* dark-text-secondary */
}

[data-theme="dark"] .task-timestamp {
  color: #6e7681; /* dark-text-tertiary */
}
```

**Status Badge (Dark)**:
```css
[data-theme="dark"] .badge-pending {
  background: #0d419d; /* dark-info-subtle */
  color: #58a6ff; /* dark-info-text */
  border: 1px solid #388bfd; /* dark-info-border */
}

[data-theme="dark"] .badge-claimed {
  background: #341a03; /* dark-warning-subtle */
  color: #d29922; /* dark-warning-text */
  border: 1px solid #bb8009; /* dark-warning-border */
}

[data-theme="dark"] .badge-completed {
  background: #0d3818; /* dark-success-subtle */
  color: #3fb950; /* dark-success-text */
  border: 1px solid #2ea043; /* dark-success-border */
}

[data-theme="dark"] .badge-failed {
  background: #490b08; /* dark-error-subtle */
  color: #ff7b72; /* dark-error-text */
  border: 1px solid #f85149; /* dark-error-border */
}
```

**Progress Bar (Dark)**:
```css
[data-theme="dark"] .progress-bar {
  background: #21262d; /* dark-border-muted */
}

[data-theme="dark"] .progress-fill {
  background: #58a6ff; /* dark-primary-text */
}
```

### Buttons (Dark Mode)

**Primary Button**:
```css
[data-theme="dark"] .btn-primary {
  background: #1f6feb; /* dark-primary-bg */
  color: #ffffff;
  border: 1px solid #388bfd; /* dark-primary-border */
}

[data-theme="dark"] .btn-primary:hover {
  background: #388bfd; /* dark-primary-hover */
  border-color: #58a6ff;
}

[data-theme="dark"] .btn-primary:active {
  background: #1f6feb; /* dark-primary-active */
}

[data-theme="dark"] .btn-primary:disabled {
  background: #21262d; /* dark-neutral-bg */
  color: #6e7681; /* dark-text-tertiary */
  border-color: #30363d;
}
```

**Secondary Button**:
```css
[data-theme="dark"] .btn-secondary {
  background: transparent;
  color: #e6edf3; /* dark-text-primary */
  border: 1px solid #30363d; /* dark-border-default */
}

[data-theme="dark"] .btn-secondary:hover {
  background: #21262d; /* dark-neutral-bg */
  border-color: #6e7681; /* dark-border-strong */
}
```

**Danger Button**:
```css
[data-theme="dark"] .btn-danger {
  background: #da3633; /* dark-error-bg */
  color: #ffffff;
  border: 1px solid #f85149; /* dark-error-border */
}

[data-theme="dark"] .btn-danger:hover {
  background: #f85149;
}
```

**Icon Button**:
```css
[data-theme="dark"] .btn-icon {
  color: #8d96a0; /* dark-text-secondary */
}

[data-theme="dark"] .btn-icon:hover {
  background: #21262d; /* dark-neutral-bg */
  color: #e6edf3; /* dark-text-primary */
}
```

### Form Inputs (Dark Mode)

**Text Input**:
```css
[data-theme="dark"] .input-text {
  background: #0d1117; /* dark-canvas-default */
  border: 1px solid #30363d; /* dark-border-default */
  color: #e6edf3; /* dark-text-primary */
}

[data-theme="dark"] .input-text:focus {
  border-color: #388bfd; /* dark-primary-border */
  box-shadow: 0 0 0 3px rgba(56, 139, 253, 0.3);
}

[data-theme="dark"] .input-text::placeholder {
  color: #484f58; /* dark-text-placeholder */
}

[data-theme="dark"] .input-text:disabled {
  background: #161b22; /* dark-surface-default */
  color: #6e7681; /* dark-text-tertiary */
  border-color: #21262d;
}
```

**Input Label**:
```css
[data-theme="dark"] .input-label {
  color: #e6edf3; /* dark-text-primary */
}
```

**Error Message**:
```css
[data-theme="dark"] .input-error-message {
  color: #ff7b72; /* dark-error-text */
}
```

### Navigation (Dark Mode)

**Bottom Tab Bar**:
```css
[data-theme="dark"] .bottom-nav {
  background: #161b22; /* dark-surface-default */
  border-top: 1px solid #30363d; /* dark-border-default */
  box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.3);
}

[data-theme="dark"] .nav-item {
  color: #8d96a0; /* dark-text-secondary */
}

[data-theme="dark"] .nav-item.active {
  color: #58a6ff; /* dark-primary-text */
}

[data-theme="dark"] .nav-item:hover {
  color: #e6edf3; /* dark-text-primary */
}
```

**Header**:
```css
[data-theme="dark"] .header {
  background: #161b22; /* dark-surface-default */
  border-bottom: 1px solid #30363d; /* dark-border-default */
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.3);
}

[data-theme="dark"] .header-title {
  color: #e6edf3; /* dark-text-primary */
}
```

### Modals & Bottom Sheets (Dark Mode)

**Bottom Sheet**:
```css
[data-theme="dark"] .bottom-sheet {
  background: #161b22; /* dark-surface-default */
  border-top: 1px solid #30363d;
}

[data-theme="dark"] .sheet-handle {
  background: #6e7681; /* dark-border-strong */
}

[data-theme="dark"] .sheet-backdrop {
  background: rgba(1, 4, 9, 0.8); /* Darker backdrop */
}
```

**Modal**:
```css
[data-theme="dark"] .modal {
  background: #161b22; /* dark-surface-default */
  border: 1px solid #30363d; /* dark-border-default */
}
```

### Loading States (Dark Mode)

**Spinner**:
```css
[data-theme="dark"] .spinner {
  border-color: #30363d; /* dark-border-default */
  border-top-color: #58a6ff; /* dark-primary-text */
}
```

**Skeleton**:
```css
[data-theme="dark"] .skeleton {
  background: linear-gradient(
    90deg,
    #161b22 25%,
    #1c2128 50%,
    #161b22 75%
  );
}
```

### Empty States (Dark Mode)

```css
[data-theme="dark"] .empty-icon {
  color: #484f58; /* dark-text-placeholder */
}

[data-theme="dark"] .empty-title {
  color: #e6edf3; /* dark-text-primary */
}

[data-theme="dark"] .empty-description {
  color: #8d96a0; /* dark-text-secondary */
}
```

### Toast Notifications (Dark Mode)

```css
[data-theme="dark"] .toast-success {
  background: #238636; /* dark-success-bg */
  color: #ffffff;
  border: 1px solid #2ea043; /* dark-success-border */
}

[data-theme="dark"] .toast-error {
  background: #da3633; /* dark-error-bg */
  color: #ffffff;
  border: 1px solid #f85149; /* dark-error-border */
}

[data-theme="dark"] .toast-warning {
  background: #9e6a03; /* dark-warning-bg */
  color: #ffffff;
  border: 1px solid #bb8009; /* dark-warning-border */
}

[data-theme="dark"] .toast-info {
  background: #1f6feb; /* dark-info-bg */
  color: #ffffff;
  border: 1px solid #388bfd; /* dark-info-border */
}
```

### Implementation Notes

1. **CSS Custom Properties**: Use CSS variables for theme switching
2. **Data Attribute**: Use `[data-theme="dark"]` selector
3. **System Preference**: Respect `@media (prefers-color-scheme: dark)`
4. **Smooth Transition**: Add `transition: background-color 200ms, color 200ms, border-color 200ms` to all themeable elements
5. **AMOLED Mode**: Optional `[data-amoled="true"]` for pure black backgrounds

**Example Implementation**:
```css
/* Apply transition to all themeable elements */
* {
  transition: background-color 200ms ease-out,
              color 200ms ease-out,
              border-color 200ms ease-out;
}

/* Light theme (default) */
.card {
  background: var(--surface-default);
  color: var(--text-primary);
  border: 1px solid var(--border-default);
}

/* Dark theme applied via data attribute */
[data-theme="dark"] {
  --surface-default: #161b22;
  --text-primary: #e6edf3;
  --border-default: #30363d;
}

/* AMOLED override */
[data-theme="dark"][data-amoled="true"] {
  --surface-default: #000000;
}
```

---

## Version History

- v1.0.0 (2025-11-09): Initial component specifications for Worker11
- v1.1.0 (2025-11-09): Added comprehensive GitHub-inspired dark mode specifications
