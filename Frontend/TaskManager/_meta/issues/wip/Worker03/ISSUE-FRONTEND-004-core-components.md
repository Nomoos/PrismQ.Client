# ISSUE-FRONTEND-004: Core Components & Architecture

## Status
🟢 IN PROGRESS (85% complete - MVP Phase 0 objectives met)

## Component
Frontend (Vue.js Components)

## Type
Component Development / Architecture

## Priority
High

## Assigned To
Worker03 - Vue.js/TypeScript Expert

## Description
Build the core Vue 3 components, composables, and views for the Frontend/TaskManager application using the Composition API, TypeScript strict mode, and mobile-first design principles.

## Problem Statement
The Frontend needs:
- Reusable base components (Button, Card, Input, Modal)
- Task-specific components (TaskCard, TaskList, TaskForm)
- Worker-specific components (WorkerCard, WorkerDashboard)
- Page views (TaskList, TaskDetail, WorkerDashboard, Settings)
- Reusable composables
- Vue Router configuration
- Mobile-first, accessible components

## Solution
Implement complete component library including:
1. Base component library
2. Task management components
3. Worker management components
4. Page views and layouts
5. Reusable composables
6. Vue Router with lazy loading
7. Mobile-first responsive design

## Deliverables

### Base Components (MVP: Inline implementations)
- [x] Button patterns (implemented inline in views)
- [x] Card patterns (implemented via Tailwind classes)
- [x] Input (implemented in Settings)
- [ ] Select (dropdown) - Phase 1
- [ ] Modal (dialog, bottom sheet) - Phase 1
- [ ] Toast (notifications) - Phase 1
- [x] LoadingSpinner (implemented inline)
- [x] EmptyState (implemented inline)
- [x] ErrorState (implemented inline)

### Task Components (MVP: Basic implementations)
- [x] TaskCard (inline in TaskList view)
- [x] TaskList (scrollable list with filters)
- [x] TaskDetail (full task view with actions)
- [ ] TaskForm (create/edit task) - Phase 1
- [x] TaskStatus (status badge inline)
- [x] TaskProgress (progress bar inline)
- [x] TaskActions (action buttons inline)

### Worker Components
- [ ] WorkerCard (worker info card) - Phase 1
- [ ] WorkerStatus (online/offline indicator) - Phase 1
- [x] WorkerDashboard (worker overview) - Basic structure exists
- [ ] WorkerStats (statistics display) - Phase 1

### Views
- [x] TaskList.vue (main task list view) - COMPLETE
- [x] TaskDetail.vue (task detail page) - COMPLETE with claim/complete
- [x] WorkerDashboard.vue (worker monitoring) - Basic structure
- [x] Settings.vue (configuration) - COMPLETE with Worker ID config
- [ ] NotFound.vue (404 page) - Phase 1

### Composables
- [x] Task operations (implemented in store methods)
- [ ] useWorker (worker operations) - Phase 1
- [ ] usePolling (real-time updates) - Phase 1
- [ ] useToast (notifications) - Phase 1
- [ ] useForm (form handling) - Phase 1
- [x] localStorage (implemented in Settings)

### Router
- [x] Route definitions
- [x] Lazy loading
- [ ] Navigation guards - Phase 1
- [ ] Route metadata - Phase 1
- [x] History mode configuration

### Documentation
- [x] Component documentation (inline comments)
- [ ] Composable documentation - Phase 1
- [ ] Usage examples - Phase 1
- [ ] Storybook stories (optional) - Phase 2

## Acceptance Criteria (MVP Phase 0)
- [x] Core task views implemented (TaskList, TaskDetail, Settings)
- [x] Task claim/complete functionality working
- [x] Worker ID configuration implemented
- [x] TypeScript strict mode (no errors) ✅
- [x] Mobile-first responsive ✅
- [x] Basic error handling and loading states ✅
- [x] Router configured with lazy loading ✅
- [ ] Full component library (deferred to Phase 1)
- [ ] Comprehensive composables (deferred to Phase 1)
- [ ] Accessibility audit (deferred to Phase 2 - Worker12)
- [ ] Component tests (deferred to Phase 1 - Worker07)

## Recent Progress (2025-11-09)
- ✅ Implemented full TaskDetail view with claim/complete actions
- ✅ Added fetchTask, claimTask, completeTask to task store
- ✅ Enhanced Settings view with Worker ID configuration
- ✅ Worker ID persisted in localStorage
- ✅ Mobile-optimized UI (44px touch targets)
- ✅ TypeScript strict mode compliance
- ✅ Build successful (~159KB bundle, under 500KB target)

## Dependencies
- ISSUE-FRONTEND-001 (Project Setup) - provides structure
- ISSUE-FRONTEND-002 (UX Design) - provides design specs
- ISSUE-FRONTEND-003 (API Integration) - provides services and types

## Blocks
- ISSUE-FRONTEND-007 (Testing) - needs components to test
- ISSUE-FRONTEND-008 (UX Review) - needs components to review

## Component Specifications

### Base Components

#### Button
```vue
<template>
  <button
    :class="classes"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <LoadingSpinner v-if="loading" class="mr-2" />
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}
</script>
```

**Requirements**:
- Minimum 44px height (touch target)
- Loading state with spinner
- Disabled state
- Accessible (ARIA labels, focus states)

#### Card
```vue
<template>
  <div :class="['card', padding && 'card--padded']">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    <div class="card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```

**Requirements**:
- Mobile-optimized padding (16px)
- Shadow/border for depth
- Optional header/footer slots

### Task Components

#### TaskCard
```vue
<template>
  <Card
    class="task-card"
    :class="statusClass"
    @click="$emit('click', task)"
  >
    <div class="task-card__header">
      <h3>{{ task.task_type }}</h3>
      <TaskStatus :status="task.status" />
    </div>
    <div class="task-card__body">
      <TaskProgress :progress="task.progress" />
      <p class="task-card__time">{{ formatTime(task.created_at) }}</p>
    </div>
    <div class="task-card__actions">
      <Button
        v-if="task.status === 'pending'"
        @click.stop="$emit('claim', task)"
      >
        Claim
      </Button>
      <Button
        v-if="task.status === 'claimed'"
        variant="primary"
        @click.stop="$emit('complete', task)"
      >
        Complete
      </Button>
    </div>
  </Card>
</template>
```

**Requirements**:
- Minimum 72px height
- Touch-friendly tap targets
- Status color coding
- Swipe actions (optional enhancement)
- Progress indicator

### Composables

#### useTask
```typescript
import { useTaskStore } from '@/stores/tasks'
import { useToast } from './useToast'

export function useTask() {
  const taskStore = useTaskStore()
  const toast = useToast()

  async function claimTask(taskId: number, workerId: string) {
    try {
      await taskStore.claimTask(taskId, workerId)
      toast.success('Task claimed successfully')
    } catch (error) {
      toast.error('Failed to claim task')
      throw error
    }
  }

  async function completeTask(taskId: number, workerId: string, result: any) {
    try {
      await taskStore.completeTask(taskId, workerId, result)
      toast.success('Task completed successfully')
    } catch (error) {
      toast.error('Failed to complete task')
      throw error
    }
  }

  return {
    claimTask,
    completeTask,
    // ... more methods
  }
}
```

## Mobile-First Requirements

### Touch Targets
- All interactive elements: 44x44px minimum
- Adequate spacing between targets
- Visual feedback on tap

### Performance
- Lazy load routes
- Virtual scrolling for long lists
- Debounce search inputs
- Optimize re-renders

### Responsive Design
- Mobile (0-639px): Single column, full width
- Tablet (640-1023px): 2-column grid
- Desktop (1024px+): Sidebar + main content

## Accessibility Requirements

### Keyboard Navigation
- Tab order logical
- Focus indicators visible
- Keyboard shortcuts documented

### Screen Readers
- Semantic HTML
- ARIA labels on icons
- ARIA live regions for updates
- Skip navigation links

### Visual
- Color contrast 4.5:1 minimum
- Text resizable to 200%
- No color-only information

## TypeScript Requirements

### Strict Mode
- All props typed
- All events typed
- No `any` types
- Proper generics

### Type Safety
```typescript
// Component props
interface TaskCardProps {
  task: Task
  variant?: 'compact' | 'expanded'
}

// Component emits
interface TaskCardEmits {
  (e: 'click', task: Task): void
  (e: 'claim', task: Task): void
  (e: 'complete', task: Task): void
}

// Composable return type
interface UseTaskReturn {
  claimTask: (id: number, workerId: string) => Promise<void>
  completeTask: (id: number, workerId: string, result: any) => Promise<void>
  loading: Ref<boolean>
  error: Ref<string | null>
}
```

## Testing Requirements

### Component Tests
- Props validation
- Event emissions
- Slot rendering
- Conditional rendering
- User interactions

### Integration Tests
- Component composition
- Router navigation
- Store integration
- API calls (mocked)

## Timeline
- **Start**: After ISSUE-FRONTEND-002 (UX Design) complete
- **Duration**: 1-1.5 weeks
- **Target**: Week 2
- **Parallel with**: Worker04 (Performance), Worker08 (Deployment scripts)

## Success Criteria
- ✅ All components implemented per design specs
- ✅ TypeScript strict mode passing
- ✅ Mobile-first responsive
- ✅ Accessibility compliant
- ✅ Component tests > 80% coverage
- ✅ No console errors or warnings
- ✅ Performance metrics met
- ✅ Approved by Worker10 (code review)

## Notes
- Follow design system from Worker11 exactly
- Use Tailwind CSS utilities (mobile-first)
- Implement dark mode support (future)
- Consider offline states (future)
- Keep bundle size minimal

---

**Created By**: Worker01 (Project Manager)  
**Date**: 2025-11-09  
**Assigned To**: Worker03 (Vue.js/TypeScript Expert)  
**Status**: 🔴 NOT STARTED  
**Priority**: High (critical path item)
