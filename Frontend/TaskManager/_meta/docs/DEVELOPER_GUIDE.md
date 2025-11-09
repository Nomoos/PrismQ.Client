# Frontend/TaskManager - Developer Guide

**Version**: 1.0  
**Last Updated**: 2025-11-09  
**Audience**: Developers and Contributors

---

## Table of Contents

1. [Development Setup](#development-setup)
2. [Architecture Overview](#architecture-overview)
3. [Project Structure](#project-structure)
4. [Component Development](#component-development)
5. [State Management](#state-management)
6. [API Integration](#api-integration)
7. [Styling and Theming](#styling-and-theming)
8. [Testing](#testing)
9. [Build and Deployment](#build-and-deployment)
10. [Best Practices](#best-practices)

---

## Development Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher (comes with Node.js)
- **Git**: For version control
- **Code Editor**: VS Code recommended with extensions:
  - Volar (Vue Language Features)
  - TypeScript Vue Plugin
  - Tailwind CSS IntelliSense
  - ESLint

### Installation

1. **Clone the Repository**

```bash
git clone https://github.com/Nomoos/PrismQ.Client.git
cd PrismQ.Client/Frontend/TaskManager
```

2. **Install Dependencies**

```bash
npm install
```

This will install all required packages including:
- Vue 3.4+
- TypeScript 5.0+
- Vite 5.0+
- Tailwind CSS 3.4+
- Pinia 2.1+
- Vue Router 4.2+
- Axios

3. **Configure Environment**

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Backend API Configuration
VITE_API_BASE_URL=http://localhost:8000/api
VITE_API_KEY=your-development-api-key

# Development Settings
VITE_APP_TITLE=TaskManager Dev
VITE_DEBUG_MODE=true
```

4. **Start Development Server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

5. **Verify Installation**

- Open browser to `http://localhost:5173`
- You should see the Task List view
- Check browser console for any errors
- Verify API connection in Settings

### Development Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run unit tests
npm test

# Run unit tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run linter
npm run lint

# Type check
npm run type-check
```

---

## Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Browser (Client)                   │
│                                                       │
│  ┌───────────────────────────────────────────────┐  │
│  │           Frontend/TaskManager (Vue 3)        │  │
│  │                                               │  │
│  │  ┌──────────┐  ┌──────────┐  ┌───────────┐  │  │
│  │  │   Views  │  │Components│  │Composables│  │  │
│  │  └────┬─────┘  └────┬─────┘  └─────┬─────┘  │  │
│  │       │             │              │         │  │
│  │       └─────────────┴──────────────┘         │  │
│  │                     │                        │  │
│  │              ┌──────▼──────┐                 │  │
│  │              │Pinia Stores │                 │  │
│  │              └──────┬──────┘                 │  │
│  │                     │                        │  │
│  │              ┌──────▼──────┐                 │  │
│  │              │API Services │                 │  │
│  │              └──────┬──────┘                 │  │
│  └─────────────────────┼────────────────────────┘  │
└────────────────────────┼───────────────────────────┘
                         │ HTTP/REST
                         ▼
┌─────────────────────────────────────────────────────┐
│            Backend/TaskManager (PHP)                 │
│                                                       │
│  ┌───────────────────────────────────────────────┐  │
│  │              REST API                         │  │
│  │  (Tasks, TaskTypes, Workers, Health)          │  │
│  └─────────────────────┬─────────────────────────┘  │
│                        │                             │
│                        ▼                             │
│              ┌──────────────────┐                    │
│              │  MySQL Database  │                    │
│              └──────────────────┘                    │
└─────────────────────────────────────────────────────┘
```

### Technology Stack

- **Framework**: Vue 3.4+ (Composition API with `<script setup>`)
- **Language**: TypeScript 5.0+ (strict mode enabled)
- **Build Tool**: Vite 5.0+ (fast HMR, optimized builds)
- **Styling**: Tailwind CSS 3.4+ (utility-first, mobile-first)
- **State Management**: Pinia 2.1+ (Vue's official store)
- **Router**: Vue Router 4.2+ (file-based routing)
- **HTTP Client**: Axios (interceptors, error handling)
- **Testing**: Vitest (unit) + Playwright (E2E)

### Design Patterns

1. **Composition API**: Modern Vue 3 approach with `<script setup>`
2. **Single File Components (SFC)**: `.vue` files with template, script, and style
3. **Centralized State**: Pinia stores for shared state
4. **Service Layer**: Separate API services from components
5. **Composables**: Reusable composition functions
6. **Mobile-First**: Tailwind utilities designed for mobile, then desktop

---

## Project Structure

```
Frontend/TaskManager/
├── src/                           # Application source code
│   ├── main.ts                    # Application entry point
│   ├── App.vue                    # Root component
│   │
│   ├── router/                    # Vue Router configuration
│   │   └── index.ts               # Route definitions
│   │
│   ├── stores/                    # Pinia state management
│   │   ├── tasks.ts               # Task store
│   │   └── worker.ts              # Worker store
│   │
│   ├── services/                  # API service layer
│   │   ├── api.ts                 # Axios client instance
│   │   └── taskService.ts         # Task API operations
│   │
│   ├── types/                     # TypeScript type definitions
│   │   ├── task.ts                # Task types
│   │   └── api.ts                 # API response types
│   │
│   ├── views/                     # Page-level components
│   │   ├── TaskList.vue           # Task list page
│   │   ├── TaskDetail.vue         # Task detail page
│   │   ├── WorkerDashboard.vue    # Worker dashboard
│   │   └── Settings.vue           # Settings page
│   │
│   ├── components/                # Reusable components
│   │   ├── base/                  # Base UI components
│   │   ├── tasks/                 # Task-specific components
│   │   └── workers/               # Worker-specific components
│   │
│   ├── composables/               # Reusable composition functions
│   │   ├── useApi.ts              # API interaction composable
│   │   └── usePolling.ts          # Polling composable
│   │
│   └── assets/                    # Static assets
│       ├── styles/                # Global styles
│       └── images/                # Images
│
├── public/                        # Static public files
│   ├── deploy-deploy.php          # Deployment loader
│   └── .htaccess.example          # Apache SPA routing
│
├── tests/                         # Test files
│   ├── unit/                      # Unit tests (Vitest)
│   └── e2e/                       # E2E tests (Playwright)
│
├── _meta/                         # Project metadata
│   ├── docs/                      # Documentation
│   ├── issues/                    # Issue tracking
│   └── design/                    # Design files
│
├── package.json                   # Dependencies and scripts
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.js             # Tailwind CSS configuration
└── README.md                      # Project overview
```

### File Naming Conventions

- **Components**: PascalCase (e.g., `TaskCard.vue`)
- **Views**: PascalCase (e.g., `TaskList.vue`)
- **Stores**: camelCase (e.g., `tasks.ts`)
- **Services**: camelCase (e.g., `taskService.ts`)
- **Composables**: camelCase with `use` prefix (e.g., `usePolling.ts`)
- **Types**: camelCase (e.g., `task.ts`)

---

## Component Development

### Creating a New Component

1. **Create Component File**

Create a new file in the appropriate directory:

```bash
# For a base UI component
src/components/base/Button.vue

# For a task-specific component
src/components/tasks/TaskCard.vue
```

2. **Component Template**

```vue
<template>
  <div class="component-container">
    <!-- Component markup -->
    <button 
      :class="buttonClasses"
      :disabled="disabled"
      @click="handleClick"
    >
      <slot>{{ label }}</slot>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props
interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
  label: ''
})

// Emits
interface Emits {
  (e: 'click', event: MouseEvent): void
}

const emit = defineEmits<Emits>()

// Computed
const buttonClasses = computed(() => {
  const baseClasses = 'px-4 py-2 rounded font-medium transition-colors'
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  }
  
  return [
    baseClasses,
    variantClasses[props.variant],
    props.disabled && 'opacity-50 cursor-not-allowed'
  ].filter(Boolean).join(' ')
})

// Methods
function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
/* Component-specific styles (if needed) */
/* Prefer Tailwind utilities over custom CSS */
</style>
```

3. **TypeScript Types**

Define prop and emit types using TypeScript interfaces:

```typescript
interface Props {
  // Required prop
  id: number
  
  // Optional prop with default
  status?: 'active' | 'inactive'
  
  // Complex type
  config?: {
    timeout: number
    retries: number
  }
}

interface Emits {
  // Simple event
  (e: 'update'): void
  
  // Event with payload
  (e: 'change', value: string): void
  
  // Event with multiple parameters
  (e: 'submit', id: number, data: object): void
}
```

4. **Using the Component**

```vue
<template>
  <Button
    variant="primary"
    :disabled="isLoading"
    @click="handleSubmit"
  >
    Submit
  </Button>
</template>

<script setup lang="ts">
import Button from '@/components/base/Button.vue'

function handleSubmit() {
  console.log('Submitted')
}
</script>
```

### Component Best Practices

1. **Keep Components Small**: Single responsibility principle
2. **Use Composition API**: Modern Vue 3 approach with `<script setup>`
3. **Type Everything**: Use TypeScript interfaces for props and emits
4. **Prefer Props Over State**: Pass data down via props
5. **Emit Events Up**: Use events to communicate with parent
6. **Use Tailwind Classes**: Avoid custom CSS when possible
7. **Mobile-First**: Design for mobile, enhance for desktop
8. **Accessibility**: Include ARIA labels and keyboard navigation

---

## State Management

### Pinia Stores

Pinia is Vue's official state management library. Stores are used for shared state across components.

### Creating a Store

```typescript
// src/stores/tasks.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { taskService } from '@/services/taskService'
import type { Task } from '@/types/task'

export const useTaskStore = defineStore('tasks', () => {
  // State (use ref for reactive state)
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters (use computed)
  const pendingTasks = computed(() => 
    tasks.value.filter(task => task.status === 'pending')
  )
  
  const completedTasks = computed(() =>
    tasks.value.filter(task => task.status === 'completed')
  )

  // Actions (regular functions)
  async function fetchTasks() {
    loading.value = true
    error.value = null
    
    try {
      const response = await taskService.list()
      tasks.value = response.data.tasks
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      console.error('Failed to fetch tasks:', err)
    } finally {
      loading.value = false
    }
  }

  async function claimTask(taskId: number, workerId: string) {
    try {
      const response = await taskService.claim(taskId, workerId)
      
      // Update local state
      const index = tasks.value.findIndex(t => t.id === taskId)
      if (index !== -1) {
        tasks.value[index] = response.data.task
      }
      
      return response.data.task
    } catch (err) {
      console.error('Failed to claim task:', err)
      throw err
    }
  }

  async function completeTask(taskId: number, result: object) {
    try {
      const response = await taskService.complete(taskId, result)
      
      // Update local state
      const index = tasks.value.findIndex(t => t.id === taskId)
      if (index !== -1) {
        tasks.value[index] = response.data.task
      }
      
      return response.data.task
    } catch (err) {
      console.error('Failed to complete task:', err)
      throw err
    }
  }

  // Reset store
  function $reset() {
    tasks.value = []
    loading.value = false
    error.value = null
  }

  return {
    // State
    tasks,
    loading,
    error,
    
    // Getters
    pendingTasks,
    completedTasks,
    
    // Actions
    fetchTasks,
    claimTask,
    completeTask,
    $reset
  }
})
```

### Using a Store in Components

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { useTaskStore } from '@/stores/tasks'

const taskStore = useTaskStore()

onMounted(async () => {
  await taskStore.fetchTasks()
})

async function handleClaim(taskId: number) {
  try {
    await taskStore.claimTask(taskId, 'worker-123')
    console.log('Task claimed successfully')
  } catch (error) {
    console.error('Failed to claim task:', error)
  }
}
</script>

<template>
  <div>
    <div v-if="taskStore.loading">Loading...</div>
    <div v-else-if="taskStore.error">Error: {{ taskStore.error }}</div>
    <div v-else>
      <div v-for="task in taskStore.pendingTasks" :key="task.id">
        {{ task.task_type }}
        <button @click="handleClaim(task.id)">Claim</button>
      </div>
    </div>
  </div>
</template>
```

---

## API Integration

### API Client Setup

The API client is configured in `src/services/api.ts`:

```typescript
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

// Request interceptor (add auth headers, etc.)
apiClient.interceptors.request.use(
  (config) => {
    const apiKey = import.meta.env.VITE_API_KEY
    if (apiKey) {
      config.headers.Authorization = `Bearer ${apiKey}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor (handle errors globally)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data)
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message)
    } else {
      // Something else happened
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default apiClient
```

### Creating a Service

```typescript
// src/services/taskService.ts
import apiClient from './api'
import type { Task, CreateTaskRequest, ClaimTaskRequest } from '@/types/task'

export const taskService = {
  // List all tasks
  async list(params?: { status?: string }) {
    return apiClient.get<{ tasks: Task[] }>('/tasks', { params })
  },

  // Get single task
  async get(id: number) {
    return apiClient.get<{ task: Task }>(`/tasks/${id}`)
  },

  // Create task
  async create(data: CreateTaskRequest) {
    return apiClient.post<{ task: Task }>('/tasks', data)
  },

  // Claim task
  async claim(taskId: number, workerId: string) {
    return apiClient.post<{ task: Task }>('/tasks/claim', {
      task_id: taskId,
      worker_id: workerId
    })
  },

  // Complete task
  async complete(taskId: number, result: object) {
    return apiClient.post<{ task: Task }>(`/tasks/${taskId}/complete`, {
      result
    })
  },

  // Update progress
  async updateProgress(taskId: number, progress: number) {
    return apiClient.post<{ task: Task }>(`/tasks/${taskId}/progress`, {
      progress
    })
  }
}
```

### Error Handling

```typescript
// In component or store
try {
  const response = await taskService.list()
  // Handle success
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with error
      console.error('Server error:', error.response.status, error.response.data)
    } else if (error.request) {
      // Request made but no response
      console.error('Network error - no response received')
    } else {
      // Request setup error
      console.error('Request error:', error.message)
    }
  } else {
    // Non-Axios error
    console.error('Unexpected error:', error)
  }
}
```

---

## Styling and Theming

### Tailwind CSS

The application uses Tailwind CSS for styling with a mobile-first approach.

### Mobile-First Design

Always start with mobile styles, then add desktop styles:

```vue
<template>
  <!-- Mobile: full width, Desktop: max-width with margin -->
  <div class="w-full md:max-w-4xl md:mx-auto">
    
    <!-- Mobile: text-sm, Desktop: text-base -->
    <p class="text-sm md:text-base">Content</p>
    
    <!-- Mobile: hidden, Desktop: block -->
    <div class="hidden md:block">Desktop only</div>
    
    <!-- Mobile: block, Desktop: hidden -->
    <div class="block md:hidden">Mobile only</div>
  </div>
</template>
```

### Common Tailwind Patterns

```vue
<template>
  <!-- Card -->
  <div class="bg-white rounded-lg shadow-sm p-4">
    
    <!-- Button Primary -->
    <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Click me
    </button>
    
    <!-- Button Secondary -->
    <button class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
      Cancel
    </button>
    
    <!-- Input -->
    <input 
      type="text"
      class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    
    <!-- Badge -->
    <span class="inline-block px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
      Active
    </span>
  </div>
</template>
```

### Custom Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      },
      screens: {
        'xs': '475px',
      }
    },
  },
  plugins: [],
}
```

---

## Testing

### Unit Testing with Vitest

```typescript
// tests/unit/TaskCard.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskCard from '@/components/tasks/TaskCard.vue'

describe('TaskCard', () => {
  it('renders task information correctly', () => {
    const task = {
      id: 1,
      task_type: 'test.task',
      status: 'pending',
      priority: 5
    }
    
    const wrapper = mount(TaskCard, {
      props: { task }
    })
    
    expect(wrapper.text()).toContain('test.task')
    expect(wrapper.text()).toContain('pending')
  })
  
  it('emits click event when clicked', async () => {
    const wrapper = mount(TaskCard, {
      props: { task: { id: 1 } }
    })
    
    await wrapper.trigger('click')
    
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.[0]).toEqual([1])
  })
})
```

### E2E Testing with Playwright

```typescript
// tests/e2e/task-list.spec.ts
import { test, expect } from '@playwright/test'

test('task list displays and filters tasks', async ({ page }) => {
  await page.goto('/')
  
  // Wait for tasks to load
  await expect(page.locator('.task-card')).toHaveCount(5)
  
  // Filter by status
  await page.click('button:has-text("Pending")')
  await expect(page.locator('.task-card')).toHaveCount(3)
  
  // Click on task
  await page.click('.task-card:first-child')
  await expect(page).toHaveURL(/\/tasks\/\d+/)
})
```

---

## Build and Deployment

### Production Build

```bash
# Build for production
npm run build

# Output directory: dist/
# - index.html
# - assets/
#   - index-[hash].js
#   - index-[hash].css
```

### Build Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'axios-vendor': ['axios']
        }
      }
    }
  }
})
```

---

## Best Practices

### Code Style

1. **Use TypeScript Strict Mode**: Catch errors early
2. **Use Composition API**: Modern Vue 3 approach
3. **Prefer `<script setup>`**: Cleaner syntax
4. **Use const by default**: Only use let when necessary
5. **Destructure Props**: For cleaner code
6. **Use Arrow Functions**: Lexical this binding

### Performance

1. **Code Splitting**: Split large bundles
2. **Lazy Loading**: Load routes on demand
3. **Memo expensive computations**: Use `computed()`
4. **Virtual Scrolling**: For large lists
5. **Image Optimization**: Compress and lazy load

### Security

1. **Sanitize User Input**: Prevent XSS
2. **Use HTTPS**: Secure communication
3. **Validate API Responses**: Don't trust backend
4. **Protect API Keys**: Use environment variables
5. **Content Security Policy**: Add CSP headers

---

**Document Owner**: Worker06 (Documentation Specialist)  
**Last Updated**: 2025-11-09  
**Version**: 1.0  
**Status**: ✅ Complete
