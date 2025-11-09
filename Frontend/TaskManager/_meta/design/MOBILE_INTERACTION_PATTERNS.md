# Mobile Interaction Patterns

**Version**: 1.0.0  
**Last Updated**: 2025-11-09  
**Target Device**: Redmi 24115RA8EG (6.7" AMOLED, 2712x1220px)

---

## Table of Contents

1. [Touch Gestures](#touch-gestures)
2. [Swipe Actions](#swipe-actions)
3. [Pull-to-Refresh](#pull-to-refresh)
4. [Bottom Sheets](#bottom-sheets)
5. [Toast Notifications](#toast-notifications)
6. [Haptic Feedback](#haptic-feedback)
7. [Scrolling & Pagination](#scrolling--pagination)
8. [Long Press Actions](#long-press-actions)

---

## Touch Gestures

### Basic Touch Interactions

#### Tap (Single Touch)

**Purpose**: Primary action on interactive elements

**Specifications**:
- **Target Size**: Minimum 44x44px
- **Response Time**: < 100ms visual feedback
- **Tap Zone**: Entire element area + 8px padding
- **Visual Feedback**: Background color change or ripple effect

**Usage**:
- Navigate to detail views
- Select items
- Activate buttons
- Toggle switches
- Open menus

**Implementation**:
```css
.touchable {
  min-width: 44px;
  min-height: 44px;
  cursor: pointer;
  transition: background-color 100ms ease-out;
}

.touchable:active {
  background-color: rgba(0, 0, 0, 0.05);
  transform: scale(0.98);
}
```

**Examples**:
- Task card → Navigate to task detail
- Button → Execute action
- Tab → Switch view
- Checkbox → Toggle state

---

#### Long Press

**Purpose**: Secondary actions, context menus, details

**Specifications**:
- **Duration**: 500ms hold
- **Visual Feedback**: Scale animation at 400ms
- **Haptic**: Vibrate on trigger
- **Cancellation**: Lift finger before 500ms

**Usage**:
- Show context menu
- Preview details
- Copy text
- Delete items (with confirmation)

**Implementation**:
```javascript
let pressTimer;

element.addEventListener('touchstart', (e) => {
  pressTimer = setTimeout(() => {
    // Trigger long press action
    showContextMenu(e);
    vibrateDevice(50); // 50ms haptic
  }, 500);
});

element.addEventListener('touchend', () => {
  clearTimeout(pressTimer);
});

element.addEventListener('touchmove', () => {
  clearTimeout(pressTimer); // Cancel if finger moves
});
```

**Examples**:
- Long press task card → Show quick actions menu
- Long press text → Copy text
- Long press image → Save or share

---

#### Double Tap

**Purpose**: Quick actions, zoom (use sparingly)

**Specifications**:
- **Timing**: Two taps within 300ms
- **Same Location**: Within 20px radius
- **Visual Feedback**: Bounce animation

**Usage** (Limited):
- Zoom in/out on images
- Quick favorite/like
- Reset view

**Note**: Avoid double-tap for critical actions as it's less discoverable

---

### Multi-Touch Gestures

#### Pinch to Zoom

**Purpose**: Scale images or detailed views

**Specifications**:
- **Min Scale**: 0.5x
- **Max Scale**: 3x
- **Smooth Transition**: 60fps animation
- **Reset**: Double-tap or pinch back

**Usage**:
- Zoom task result images
- View detailed charts
- Examine screenshots

**Implementation**:
```javascript
let initialDistance = 0;
let currentScale = 1;

element.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    initialDistance = getDistance(e.touches[0], e.touches[1]);
  }
});

element.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) {
    const currentDistance = getDistance(e.touches[0], e.touches[1]);
    const scale = currentDistance / initialDistance;
    currentScale = Math.min(Math.max(scale, 0.5), 3);
    element.style.transform = `scale(${currentScale})`;
  }
});
```

**Examples**:
- Pinch on image → Zoom in/out
- Pinch on chart → Scale view

---

## Swipe Actions

### Horizontal Swipe (Card Actions)

**Purpose**: Reveal quick actions on task cards

**Specifications**:
- **Swipe Distance**: 80px to trigger
- **Swipe Velocity**: 0.3px/ms minimum
- **Animation**: 200ms ease-out
- **Auto-Close**: Tap outside or 5 seconds

**Swipe Right** (Pending Tasks):
```
┌─────────────────────────────────────────┐
│                                         │
│ ● PrismQ.YouTube.Scrape      [Pending]  │ ← Swipe Right
│ ID: 12345                               │───────────────►
│ Priority: High | Attempts: 1/3          │
│ Created: 2h ago                         │
└─────────────────────────────────────────┘

           ↓ Reveals

┌─────────────────────────────────────────┐
│ [Claim] │ ● PrismQ.YouTube.Scrape       │
│         │ ID: 12345                     │
│         │ Priority: High | Attempts: 1/3│
│         │ Created: 2h ago               │
└─────────────────────────────────────────┘
```

**Swipe Left** (Claimed Tasks):
```
┌─────────────────────────────────────────┐
│ ● Content.Process.Text       [Claimed]  │ ◄── Swipe Left
│ ID: 12344                               │ ◄───────────
│ ──────────────────────── 45%            │
│ Created: 5h ago                         │
└─────────────────────────────────────────┘

           ↓ Reveals

┌─────────────────────────────────────────┐
│ ● Content.Process.Text │ [Complete] [Fail]│
│ ID: 12344              │ (Actions)        │
│ ──────────────────  45%│                  │
│ Created: 5h ago        │                  │
└─────────────────────────────────────────┘
```

**Implementation**:
```javascript
let startX = 0;
let currentX = 0;
let isDragging = false;

card.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

card.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  
  currentX = e.touches[0].clientX;
  const diffX = currentX - startX;
  
  // Swipe right (claim action)
  if (diffX > 0 && isPendingTask) {
    card.style.transform = `translateX(${Math.min(diffX, 80)}px)`;
  }
  
  // Swipe left (action menu)
  if (diffX < 0 && isClaimedTask) {
    card.style.transform = `translateX(${Math.max(diffX, -160)}px)`;
  }
});

card.addEventListener('touchend', (e) => {
  const diffX = currentX - startX;
  
  if (Math.abs(diffX) > 80) {
    // Trigger action or show menu
    showActions();
  } else {
    // Reset position
    card.style.transform = 'translateX(0)';
  }
  
  isDragging = false;
});
```

**Actions Available**:

**Pending Tasks** (Swipe Right):
- **Claim**: Quick claim task

**Claimed Tasks** (Swipe Left):
- **Complete**: Mark as completed
- **Fail**: Mark as failed

**Visual Feedback**:
- Background color change (green for claim, action colors for complete/fail)
- Icon appears as user swipes
- Snap to position when threshold reached

---

### Vertical Swipe (Navigation)

**Purpose**: Navigate between views, dismiss modals

**Swipe Down** (Dismiss Modal/Sheet):
```
┌─────────────────────────────────────────┐
│ ━━━━━━━━━━━━                            │ ← Handle
│                                         │
│ Task Details                            │ ▼ Swipe Down
│                                         │
│ (Modal content)                         │
│                                         │
└─────────────────────────────────────────┘

           ↓ Dismisses

(Modal slides down and closes)
```

**Implementation**:
```javascript
let startY = 0;
let currentY = 0;

sheet.addEventListener('touchstart', (e) => {
  startY = e.touches[0].clientY;
});

sheet.addEventListener('touchmove', (e) => {
  currentY = e.touches[0].clientY;
  const diffY = currentY - startY;
  
  // Only allow downward swipe
  if (diffY > 0) {
    sheet.style.transform = `translateY(${diffY}px)`;
  }
});

sheet.addEventListener('touchend', () => {
  const diffY = currentY - startY;
  
  if (diffY > 100) {
    // Dismiss sheet
    closeSheet();
  } else {
    // Reset position
    sheet.style.transform = 'translateY(0)';
  }
});
```

---

## Pull-to-Refresh

**Purpose**: Manually refresh content in list views

**Specifications**:
- **Pull Distance**: 80px to trigger
- **Release**: Auto-refresh on release
- **Animation**: Spinner + "Release to refresh" text
- **Duration**: 1-3 seconds depending on data

**States**:

1. **Pulling** (0-80px):
```
┌─────────────────────────────────────────┐
│         ↓ Pull to refresh               │
│         ⟳                               │ ▼ Pulling
└─────────────────────────────────────────┘
```

2. **Release** (> 80px):
```
┌─────────────────────────────────────────┐
│         ↑ Release to refresh            │
│         ⟳                               │
└─────────────────────────────────────────┘
```

3. **Refreshing**:
```
┌─────────────────────────────────────────┐
│         ⟳ Refreshing...                 │
└─────────────────────────────────────────┘
```

**Implementation**:
```javascript
let startY = 0;
let isPulling = false;

scrollContainer.addEventListener('touchstart', (e) => {
  if (scrollContainer.scrollTop === 0) {
    startY = e.touches[0].clientY;
    isPulling = true;
  }
});

scrollContainer.addEventListener('touchmove', (e) => {
  if (!isPulling) return;
  
  const currentY = e.touches[0].clientY;
  const pullDistance = currentY - startY;
  
  if (pullDistance > 0) {
    e.preventDefault();
    const distance = Math.min(pullDistance, 120);
    refreshIndicator.style.height = `${distance}px`;
    
    if (distance > 80) {
      refreshIndicator.textContent = '↑ Release to refresh';
    } else {
      refreshIndicator.textContent = '↓ Pull to refresh';
    }
  }
});

scrollContainer.addEventListener('touchend', (e) => {
  if (!isPulling) return;
  
  const pullDistance = currentY - startY;
  
  if (pullDistance > 80) {
    refreshData(); // Trigger refresh
  } else {
    refreshIndicator.style.height = '0';
  }
  
  isPulling = false;
});
```

**Usage**:
- Task List view
- Worker Dashboard
- Any scrollable list

---

## Bottom Sheets

**Purpose**: Mobile-friendly modals for forms and actions

**Specifications**:
- **Height**: Auto (max 80vh)
- **Position**: Fixed bottom
- **Backdrop**: Semi-transparent black (rgba(0,0,0,0.5))
- **Handle**: 32x4px drag handle at top
- **Scroll**: Content scrollable if exceeds max height

**Interaction**:

1. **Open**: Slide up from bottom (300ms)
2. **Drag Handle**: Can swipe down to dismiss
3. **Backdrop Tap**: Dismisses sheet
4. **Escape Key**: Dismisses sheet (keyboard)

**Types**:

### Action Sheet
```
┌─────────────────────────────────────────┐
│ ━━━━━━━━━━━━                            │
│                                         │
│ Task Actions                            │
│                                         │
│ ┌───────────────────────────────────┐   │
│ │ Complete Task                     │   │
│ └───────────────────────────────────┘   │
│ ┌───────────────────────────────────┐   │
│ │ Update Progress                   │   │
│ └───────────────────────────────────┘   │
│ ┌───────────────────────────────────┐   │
│ │ Fail Task                         │   │
│ └───────────────────────────────────┘   │
│ ┌───────────────────────────────────┐   │
│ │ Cancel                            │   │
│ └───────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### Form Sheet
```
┌─────────────────────────────────────────┐
│ ━━━━━━━━━━━━                            │
│                                         │
│ Complete Task                           │
│                                         │
│ Result Data (JSON)                      │
│ ┌─────────────────────────────────────┐ │
│ │ {                                   │ │
│ │   "items": [],                      │ │
│ │   "count": 10                       │ │
│ │ }                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Notes (optional)                        │
│ ┌─────────────────────────────────────┐ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌───────────────────────────────────┐   │
│ │ Submit                            │   │
│ └───────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

**Implementation**:
```css
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-radius: 16px 16px 0 0;
  max-height: 80vh;
  transform: translateY(100%);
  transition: transform 300ms ease-out;
  z-index: 100;
}

.bottom-sheet.open {
  transform: translateY(0);
}

.sheet-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 300ms ease-out;
  z-index: 99;
}

.sheet-backdrop.open {
  opacity: 1;
}
```

---

## Toast Notifications

**Purpose**: Brief, non-blocking feedback messages

**Specifications**:
- **Duration**: 3 seconds (auto-dismiss)
- **Position**: Top-center (below header) or bottom (above nav)
- **Max Width**: 400px
- **Animation**: Slide in/out (300ms)

**Types**:

### Success Toast
```
┌─────────────────────────────────────────┐
│ ✓ Task claimed successfully             │
└─────────────────────────────────────────┘
```

### Error Toast
```
┌─────────────────────────────────────────┐
│ ✕ Unable to claim task                  │
│ Task has been claimed by another worker │
└─────────────────────────────────────────┘
```

### Info Toast
```
┌─────────────────────────────────────────┐
│ ⓘ Refreshing task list...               │
└─────────────────────────────────────────┘
```

**Interaction**:
- **Auto-dismiss**: After 3 seconds
- **Swipe Up/Down**: Manual dismiss
- **Tap**: Dismiss immediately
- **Multiple**: Stack vertically with 8px gap

**Implementation**:
```javascript
function showToast(message, type = 'info', duration = 3000) {
  const toast = createToastElement(message, type);
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Auto-dismiss
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
  
  // Manual dismiss
  toast.addEventListener('click', () => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  });
}
```

---

## Haptic Feedback

**Purpose**: Tactile feedback for important actions

**Specifications**:
- **Supported**: Modern Android/iOS devices
- **Duration**: 10-50ms
- **Intensity**: Light, Medium, Heavy
- **Use Sparingly**: Only for important feedback

**When to Use**:

1. **Light Haptic** (10-20ms):
   - Tap on button
   - Toggle switch
   - Select item
   - Tab change

2. **Medium Haptic** (30-40ms):
   - Task claimed
   - Task completed
   - Form submitted
   - Action confirmed

3. **Heavy Haptic** (50ms):
   - Error occurred
   - Task failed
   - Critical action
   - Long press triggered

**Implementation**:
```javascript
function vibrate(duration = 30) {
  if ('vibrate' in navigator) {
    navigator.vibrate(duration);
  }
}

// Usage
claimButton.addEventListener('click', () => {
  vibrate(40); // Medium haptic
  claimTask();
});

// Error
showError.addEventListener('click', () => {
  vibrate(50); // Heavy haptic
  displayError();
});
```

**Best Practices**:
- Don't vibrate on every interaction
- Provide settings to disable haptics
- Match intensity to action importance
- Test on actual devices

---

## Scrolling & Pagination

### Infinite Scroll

**Purpose**: Load more content as user scrolls

**Specifications**:
- **Trigger**: 200px from bottom
- **Loading Indicator**: Spinner at bottom
- **Batch Size**: 20 items
- **Max Load**: 200 items, then paginate

**Implementation**:
```javascript
scrollContainer.addEventListener('scroll', () => {
  const scrollBottom = scrollContainer.scrollHeight - 
                       scrollContainer.scrollTop - 
                       scrollContainer.clientHeight;
  
  if (scrollBottom < 200 && !loading && hasMore) {
    loadMoreTasks();
  }
});

function loadMoreTasks() {
  loading = true;
  showLoadingIndicator();
  
  fetchTasks(page + 1, 20).then(tasks => {
    appendTasks(tasks);
    page++;
    loading = false;
    hideLoadingIndicator();
    
    if (tasks.length < 20) {
      hasMore = false;
    }
  });
}
```

### Virtual Scrolling

**Purpose**: Efficient rendering of large lists

**When**: Lists with > 100 items

**Benefit**: Only render visible items + buffer

---

## Long Press Actions

### Context Menu

**Purpose**: Show additional actions on long press

**Trigger**: 500ms hold

**Menu**:
```
┌─────────────────────────────────────────┐
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ View Details                        │ │
│ ├─────────────────────────────────────┤ │
│ │ Copy Task ID                        │ │
│ ├─────────────────────────────────────┤ │
│ │ Share                               │ │
│ ├─────────────────────────────────────┤ │
│ │ Delete (Danger)                     │ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

**Position**: Near touch point, adjusted to stay on screen

**Dismissal**:
- Tap outside menu
- Tap menu item
- Tap backdrop
- Press back button

---

## Accessibility Notes

**All Interactions Include**:
- Touch targets minimum 44x44px
- Spacing between targets minimum 8px
- Visual feedback < 100ms
- Animations respect `prefers-reduced-motion`
- Alternative keyboard navigation
- Screen reader announcements
- Focus indicators visible

---

## Performance Guidelines

1. **60fps Animations**: Use transform and opacity
2. **Debounce Scroll**: Limit scroll event handlers
3. **Throttle Gestures**: Process touch events at 60Hz max
4. **Hardware Acceleration**: Use `will-change` for animations
5. **Cancel Animations**: Stop animations on unmount

---

## Version History

- v1.0.0 (2025-11-09): Initial mobile interaction patterns for Worker11
