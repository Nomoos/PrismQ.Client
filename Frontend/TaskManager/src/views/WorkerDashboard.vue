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
          Demo: Use the worker ID to claim and manage tasks
        </p>
        <div class="space-y-2">
          <button 
            @click="claimDemoTask"
            :disabled="!workerStore.isInitialized"
            class="btn-primary w-full"
            :class="{ 'opacity-50 cursor-not-allowed': !workerStore.isInitialized }"
          >
            Claim Next Task
          </button>
          <p class="text-xs text-gray-500">
            Worker ID will be used for claiming tasks from the queue
          </p>
        </div>
      </div>

      <!-- Integration Guide -->
      <div class="card bg-blue-50 border-blue-200">
        <h3 class="text-sm font-semibold text-blue-900 mb-2">Integration Example</h3>
        <pre class="text-xs text-blue-800 overflow-x-auto"><code>// Use worker store in components
import { useWorkerStore } from '@/stores/worker'
import { useTaskStore } from '@/stores/tasks'

const workerStore = useWorkerStore()
const taskStore = useTaskStore()

// Initialize worker
workerStore.initializeWorker()

// Claim a task
await taskStore.claimTask(taskTypeId, workerStore.workerId!)</code></pre>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useWorkerStore } from '../stores/worker'

const workerStore = useWorkerStore()

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

async function claimDemoTask() {
  if (!workerStore.workerId) {
    alert('Please initialize worker first')
    return
  }
  
  try {
    // This is a demo - would need actual task type ID from backend
    alert('Demo: Would claim task with worker ID: ' + workerStore.workerId)
    // await taskStore.claimTask(1, workerStore.workerId)
  } catch (error) {
    console.error('Failed to claim task:', error)
    alert('Failed to claim task. Check console for details.')
  }
}

onMounted(() => {
  // Auto-initialize worker on mount
  if (!workerStore.isInitialized) {
    workerStore.initializeWorker()
  }
})
</script>
