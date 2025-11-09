# ISSUE-FRONTEND-004: Core Components & Architecture

## Status
🔴 NOT STARTED

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

### Base Components
- [ ] Button (primary, secondary, danger states)
- [ ] Card (container component)
- [ ] Input (text, number, textarea)
- [ ] Select (dropdown)
- [ ] Modal (dialog, bottom sheet)
- [ ] Toast (notifications)
- [ ] LoadingSpinner
- [ ] EmptyState
- [ ] ErrorState

### Task Components
- [ ] TaskCard (list item with actions)
- [ ] TaskList (scrollable list with filters)
- [ ] TaskDetail (full task view)
- [ ] TaskForm (create/edit task)
- [ ] TaskStatus (status badge)
- [ ] TaskProgress (progress bar)
- [ ] TaskActions (action buttons)

### Worker Components
- [ ] WorkerCard (worker info card)
- [ ] WorkerStatus (online/offline indicator)
- [ ] WorkerDashboard (worker overview)
- [ ] WorkerStats (statistics display)

### Views
- [ ] TaskList.vue (main task list view) - ✅ BASIC VERSION EXISTS
- [ ] TaskDetail.vue (task detail page)
- [ ] WorkerDashboard.vue (worker monitoring)
- [ ] Settings.vue (configuration) - ✅ BASIC VERSION EXISTS
- [ ] NotFound.vue (404 page)

### Composables
- [ ] useTask (task operations)
- [ ] useWorker (worker operations)
- [ ] usePolling (real-time updates)
- [ ] useToast (notifications)
- [ ] useForm (form handling)
- [ ] useLocalStorage (persistence)

### Router
- [ ] Route definitions
- [ ] Lazy loading
- [ ] Navigation guards
- [ ] Route metadata
- [ ] History mode configuration

### Documentation
- [ ] Component documentation (props, events, slots)
- [ ] Composable documentation
- [ ] Usage examples
- [ ] Storybook stories (optional)

## Acceptance Criteria
- [ ] All base components implemented
- [ ] All task components implemented
- [ ] All worker components implemented
- [ ] All views complete and functional
- [ ] Composables reusable and well-tested
- [ ] Router configured with lazy loading
- [ ] Components follow design system (from Worker11)
- [ ] TypeScript strict mode (no errors)
- [ ] Mobile-first responsive
- [ ] Accessibility compliant (WCAG 2.1 AA)
- [ ] Component tests passing

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
