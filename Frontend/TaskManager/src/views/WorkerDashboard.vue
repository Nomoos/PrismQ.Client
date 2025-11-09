<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-canvas-default pb-20">
    <header class="bg-white dark:bg-dark-surface-default shadow-sm sticky top-0 z-10 dark:border-b dark:border-dark-border-default">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <h1 class="text-xl font-bold text-gray-900 dark:text-dark-text-primary">Worker Dashboard</h1>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-6 space-y-4">
      <!-- Worker Info Card -->
      <div class="card">
        <h2 class="text-lg font-semibold mb-4 dark:text-dark-text-primary">Worker Information</h2>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-dark-text-secondary">Worker ID:</span>
            <span class="font-mono text-sm dark:text-dark-text-primary">{{ workerStore.workerId || 'Not initialized' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-dark-text-secondary">Status:</span>
            <StatusBadge :status="workerStore.status" :uppercase="false" />
          </div>
        </div>
        
        <div class="mt-4 pt-4 border-t dark:border-dark-border-default">
          <button 
            v-if="!workerStore.isInitialized"
            @click="initWorker"
            class="btn-primary w-full"
          >
            Initialize Worker
          </button>
          <div v-else class="flex gap-2">
            <button 
              @click="setActive"
              :disabled="workerStore.status === 'active'"
              class="btn-primary flex-1"
              :class="{ 'opacity-50 cursor-not-allowed': workerStore.status === 'active' }"
            >
              Set Active
            </button>
            <button 
              @click="setIdle"
              :disabled="workerStore.status === 'idle'"
              class="btn-secondary flex-1"
              :class="{ 'opacity-50 cursor-not-allowed': workerStore.status === 'idle' }"
            >
              Set Idle
            </button>
          </div>
        </div>
      </div>

      <!-- Task Statistics Card -->
      <div class="card">
        <h2 class="text-lg font-semibold mb-4 dark:text-dark-text-primary">Task Statistics</h2>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-yellow-50 dark:bg-dark-warning-subtle rounded-lg p-4 text-center dark:border dark:border-dark-warning-border">
            <p class="text-2xl font-bold text-yellow-800 dark:text-dark-warning-text">{{ taskStore.pendingTasks.length }}</p>
            <p class="text-xs text-yellow-600 dark:text-dark-warning-text mt-1">Pending</p>
          </div>
          <div class="bg-blue-50 dark:bg-dark-info-subtle rounded-lg p-4 text-center dark:border dark:border-dark-info-border">
            <p class="text-2xl font-bold text-blue-800 dark:text-dark-info-text">{{ taskStore.claimedTasks.length }}</p>
            <p class="text-xs text-blue-600 dark:text-dark-info-text mt-1">Claimed</p>
          </div>
          <div class="bg-green-50 dark:bg-dark-success-subtle rounded-lg p-4 text-center dark:border dark:border-dark-success-border">
            <p class="text-2xl font-bold text-green-800 dark:text-dark-success-text">{{ taskStore.completedTasks.length }}</p>
            <p class="text-xs text-green-600 dark:text-dark-success-text mt-1">Completed</p>
          </div>
          <div class="bg-red-50 dark:bg-dark-error-subtle rounded-lg p-4 text-center dark:border dark:border-dark-error-border">
            <p class="text-2xl font-bold text-red-800 dark:text-dark-error-text">{{ taskStore.failedTasks.length }}</p>
            <p class="text-xs text-red-600 dark:text-dark-error-text mt-1">Failed</p>
          </div>
        </div>
      </div>

      <!-- Task Actions Card -->
      <div class="card">
        <h2 class="text-lg font-semibold mb-4 dark:text-dark-text-primary">Task Actions</h2>
        <p class="text-gray-600 dark:text-dark-text-secondary text-sm mb-4">
          Claim and process the next available task from the queue
        </p>
        <div class="space-y-3">
          <button 
            @click="claimNextTask"
            :disabled="!workerStore.isInitialized || claimingTask || availableTaskTypes.length === 0"
            class="btn-primary w-full"
            :class="{ 'opacity-50 cursor-not-allowed': !workerStore.isInitialized || claimingTask || availableTaskTypes.length === 0 }"
          >
            <span v-if="claimingTask">Claiming...</span>
            <span v-else>Claim Next Task</span>
          </button>
          
          <!-- Error message -->
          <div v-if="claimError" class="p-3 bg-red-50 dark:bg-dark-error-subtle border border-red-200 dark:border-dark-error-border rounded-lg text-sm text-red-800 dark:text-dark-error-text">
            {{ claimError }}
          </div>
          
          <!-- Info -->
          <div class="text-xs text-gray-500 dark:text-dark-text-tertiary space-y-1">
            <p v-if="availableTaskTypes.length > 0">
              {{ availableTaskTypes.length }} task type(s) available
            </p>
            <p v-else class="text-yellow-600 dark:text-dark-warning-text">
              No task types registered yet
            </p>
          </div>
        </div>
      </div>

      <!-- My Tasks Card -->
      <div class="card" v-if="myClaimedTasks.length > 0">
        <h2 class="text-lg font-semibold mb-4 dark:text-dark-text-primary">My Tasks</h2>
        <div class="space-y-2">
          <div
            v-for="task in myClaimedTasks"
            :key="task.id"
            @click="goToTask(task.id)"
            class="p-3 bg-gray-50 dark:bg-dark-surface-overlay rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-border-muted transition-colors"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-900 dark:text-dark-text-primary truncate">{{ task.type }}</p>
                <p class="text-xs text-gray-500 dark:text-dark-text-tertiary mt-1">ID: {{ task.id }}</p>
              </div>
              <div class="ml-4">
                <StatusBadge :status="task.status" />
              </div>
            </div>
            <!-- Progress bar -->
            <div v-if="task.progress > 0" class="mt-2">
              <div class="w-full bg-gray-200 dark:bg-dark-neutral-bg rounded-full h-2">
                <div
                  class="bg-primary-500 dark:bg-dark-primary-bg h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${task.progress}%` }"
                ></div>
              </div>
              <p class="text-xs text-gray-500 dark:text-dark-text-tertiary mt-1">{{ task.progress }}% complete</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Integration Guide -->
      <div class="card bg-blue-50 dark:bg-dark-info-subtle border-blue-200 dark:border-dark-info-border">
        <h3 class="text-sm font-semibold text-blue-900 dark:text-dark-info-text mb-2">Integration Example</h3>
        <pre class="text-xs text-blue-800 dark:text-dark-info-text overflow-x-auto"><code>// Use worker store in components
import { useWorkerStore } from '@/stores/worker'
import { useTaskStore } from '@/stores/tasks'
import { taskService } from '@/services/taskService'

const workerStore = useWorkerStore()
const taskStore = useTaskStore()

// Initialize worker
workerStore.initializeWorker()

// Load available task types
const taskTypes = await taskService.getTaskTypes()

// Claim next available task
const task = await taskStore.claimTask(
  workerStore.workerId!, 
  taskTypes.data[0].id
)</code></pre>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useWorkerStore } from '../stores/worker'
import { useTaskStore } from '../stores/tasks'
import { taskService } from '../services/taskService'
import StatusBadge from '../components/base/StatusBadge.vue'
import type { TaskType } from '../types'

const router = useRouter()
const workerStore = useWorkerStore()
const taskStore = useTaskStore()

const availableTaskTypes = ref<TaskType[]>([])
const claimingTask = ref(false)
const claimError = ref<string | null>(null)

// Computed property for tasks claimed by this worker
const myClaimedTasks = computed(() => {
  if (!workerStore.workerId) return []
  return taskStore.tasks.filter(t => 
    t.status === 'claimed' && t.claimed_by === workerStore.workerId
  )
})

function goToTask(id: number) {
  router.push(`/tasks/${id}`)
}

function initWorker() {
  workerStore.initializeWorker()
}

function setActive() {
  workerStore.setStatus('active')
}

function setIdle() {
  workerStore.setStatus('idle')
}

async function loadTaskTypes() {
  try {
    const response = await taskService.getTaskTypes(true)
    if (response.success && response.data) {
      availableTaskTypes.value = response.data
    }
  } catch (error) {
    console.error('Failed to load task types:', error)
  }
}

async function claimNextTask() {
  if (!workerStore.workerId) {
    alert('Please initialize worker first')
    return
  }
  
  if (availableTaskTypes.value.length === 0) {
    alert('No task types available. Please register a task type first.')
    return
  }
  
  claimingTask.value = true
  claimError.value = null
  
  try {
    // Try to claim a task from the first available task type
    const taskType = availableTaskTypes.value[0]
    const task = await taskStore.claimTask(workerStore.workerId, taskType.id)
    
    if (task) {
      // Successfully claimed a task - navigate to task detail
      await router.push(`/tasks/${task.id}`)
    } else {
      // No tasks available for this type
      claimError.value = 'No pending tasks available at the moment'
    }
  } catch (error) {
    console.error('Failed to claim task:', error)
    claimError.value = error instanceof Error ? error.message : 'Failed to claim task'
  } finally {
    claimingTask.value = false
  }
}

onMounted(async () => {
  // Auto-initialize worker on mount
  if (!workerStore.isInitialized) {
    workerStore.initializeWorker()
  }
  
  // Load available task types
  await loadTaskTypes()
  
  // Load tasks to populate statistics
  await taskStore.fetchTasks()
})
</script>
