<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-canvas-default pb-20">
    <header class="bg-white dark:bg-dark-surface-default shadow-sm sticky top-0 z-10 dark:border-b dark:border-dark-border-default">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <h1 class="text-xl font-bold text-gray-900 dark:text-dark-text-primary">Settings</h1>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-6 space-y-4">
      <!-- Worker Configuration -->
      <div class="card">
        <h2 class="text-lg font-semibold mb-4 dark:text-dark-text-primary">Worker Configuration</h2>
        <p class="text-sm text-gray-600 dark:text-dark-text-secondary mb-4">
          Set your worker ID for claiming and completing tasks
        </p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
              Worker ID
            </label>
            <input
              v-model="workerIdInput"
              type="text"
              placeholder="e.g., frontend-worker-1"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-dark-primary-border focus:border-transparent bg-white dark:bg-dark-canvas-inset text-gray-900 dark:text-dark-text-primary"
              :class="fields.workerId?.error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-dark-border-default'"
              @blur="validateField('workerId')"
            />
            <p v-if="fields.workerId?.error" class="text-xs text-red-600 dark:text-red-400 mt-1">
              {{ fields.workerId.error }}
            </p>
            <p v-else class="text-xs text-gray-500 dark:text-dark-text-tertiary mt-1">
              This ID will be used when claiming and completing tasks
            </p>
          </div>
          
          <button
            @click="saveWorkerId"
            class="btn-primary min-h-[44px] w-full"
          >
            Save Worker ID
          </button>
          
          <div v-if="saveMessage" class="p-3 rounded-lg" :class="saveSuccess ? 'bg-green-50 dark:bg-dark-success-subtle text-green-800 dark:text-dark-success-text dark:border dark:border-dark-success-border' : 'bg-red-50 dark:bg-dark-error-subtle text-red-800 dark:text-dark-error-text dark:border dark:border-dark-error-border'">
            {{ saveMessage }}
          </div>
        </div>
      </div>

      <!-- API Configuration -->
      <div class="card">
        <h2 class="text-lg font-semibold mb-4 dark:text-dark-text-primary">API Configuration</h2>
        <p class="text-sm text-gray-600 dark:text-dark-text-secondary mb-4">
          Configure connection to Backend/TaskManager API
        </p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
              API Base URL
            </label>
            <input
              type="text"
              :value="apiBaseUrl"
              readonly
              class="w-full px-3 py-2 border border-gray-300 dark:border-dark-border-default rounded-lg bg-gray-50 dark:bg-dark-neutral-subtle text-gray-900 dark:text-dark-text-primary"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
              API Key
            </label>
            <input
              type="password"
              :value="apiKey"
              readonly
              class="w-full px-3 py-2 border border-gray-300 dark:border-dark-border-default rounded-lg bg-gray-50 dark:bg-dark-neutral-subtle text-gray-900 dark:text-dark-text-primary"
            />
          </div>
          
          <p class="text-xs text-gray-500 dark:text-dark-text-tertiary">
            Settings are configured via environment variables (.env file)
          </p>
        </div>
      </div>

      <!-- App Information -->
      <div class="card">
        <h2 class="text-lg font-semibold mb-4 dark:text-dark-text-primary">Application Info</h2>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-dark-text-secondary">Version:</span>
            <span class="font-medium dark:text-dark-text-primary">0.1.0</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-dark-text-secondary">Environment:</span>
            <span class="font-medium dark:text-dark-text-primary">{{ environment }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFormValidation, validationRules } from '../composables/useFormValidation'
import { validateAndSanitizeWorkerId } from '../utils/sanitize'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
const apiKey = import.meta.env.VITE_API_KEY ? '••••••••' : 'Not configured'
const environment = import.meta.env.MODE

const workerIdInput = ref('')
const saveMessage = ref('')
const saveSuccess = ref(false)

// Form validation
const { registerField, validateField, fields } = useFormValidation()

// Load worker ID from localStorage on mount
onMounted(() => {
  const savedWorkerId = localStorage.getItem('workerId')
  if (savedWorkerId) {
    workerIdInput.value = savedWorkerId
  } else {
    // Default worker ID
    workerIdInput.value = 'frontend-worker-1'
  }
  
  // Register the worker ID field with validation
  registerField('workerId', workerIdInput.value, [
    validationRules.required('Worker ID is required'),
    validationRules.workerId('Worker ID must be 3-50 alphanumeric characters, hyphens, underscores, or dots, and start with a letter or number'),
    validationRules.safeContent('Worker ID contains potentially unsafe characters')
  ])
})

function saveWorkerId() {
  // Update the field value
  fields.value.workerId.value = workerIdInput.value
  
  // Validate the field
  if (!validateField('workerId')) {
    saveMessage.value = fields.value.workerId.error || 'Invalid Worker ID'
    saveSuccess.value = false
    return
  }

  // Validate and sanitize the worker ID
  const result = validateAndSanitizeWorkerId(workerIdInput.value)
  
  if (!result.isValid) {
    saveMessage.value = result.error || 'Invalid Worker ID'
    saveSuccess.value = false
    return
  }

  try {
    // Store the sanitized value
    localStorage.setItem('workerId', result.value)
    // Update the input with the sanitized value
    workerIdInput.value = result.value
    saveMessage.value = 'Worker ID saved successfully!'
    saveSuccess.value = true
    
    // Clear message after 3 seconds
    setTimeout(() => {
      saveMessage.value = ''
    }, 3000)
  } catch (e) {
    saveMessage.value = 'Failed to save Worker ID'
    saveSuccess.value = false
  }
}
</script>
