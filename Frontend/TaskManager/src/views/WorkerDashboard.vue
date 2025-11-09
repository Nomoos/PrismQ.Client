<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <h1 class="text-xl font-bold text-gray-900">Worker Dashboard</h1>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-6 space-y-4">
      <!-- Worker Info Card -->
      <div class="card">
        <h2 class="text-lg font-semibold mb-4">Worker Information</h2>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600">Worker ID:</span>
            <span class="font-mono text-sm">{{ workerStore.workerId || 'Not initialized' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Status:</span>
            <span :class="[
              'px-2 py-1 rounded text-xs font-medium',
              getStatusClass(workerStore.status)
            ]">
              {{ workerStore.status }}
            </span>
          </div>
        </div>
        
        <div class="mt-4 pt-4 border-t">
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

      <!-- Task Actions Card -->
      <div class="card">
        <h2 class="text-lg font-semibold mb-4">Task Actions</h2>
        <p class="text-gray-600 text-sm mb-4">
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
          <div v-if="claimError" class="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
            {{ claimError }}
          </div>
          
          <!-- Info -->
          <div class="text-xs text-gray-500 space-y-1">
            <p v-if="availableTaskTypes.length > 0">
              {{ availableTaskTypes.length }} task type(s) available
            </p>
            <p v-else class="text-yellow-600">
              No task types registered yet
            </p>
          </div>
        </div>
      </div>

      <!-- Integration Guide -->
      <div class="card bg-blue-50 border-blue-200">
        <h3 class="text-sm font-semibold text-blue-900 mb-2">Integration Example</h3>
        <pre class="text-xs text-blue-800 overflow-x-auto"><code>// Use worker store in components
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
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useWorkerStore } from '../stores/worker'
import { useTaskStore } from '../stores/tasks'
import { taskService } from '../services/taskService'
import type { TaskType } from '../types'

const router = useRouter()
const workerStore = useWorkerStore()
const taskStore = useTaskStore()

const availableTaskTypes = ref<TaskType[]>([])
const claimingTask = ref(false)
const claimError = ref<string | null>(null)

function getStatusClass(status: string): string {
  const classes = {
    active: 'bg-green-100 text-green-800',
    idle: 'bg-yellow-100 text-yellow-800',
    offline: 'bg-gray-100 text-gray-800'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
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
})
</script>
