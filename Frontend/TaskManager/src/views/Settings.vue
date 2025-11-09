<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <h1 class="text-xl font-bold text-gray-900">Settings</h1>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-6">
      <div class="card">
        <h2 class="text-lg font-semibold mb-4">API Configuration</h2>
        <p class="text-sm text-gray-600 mb-4">
          Configure connection to Backend/TaskManager API
        </p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              API Base URL
            </label>
            <input
              type="text"
              :value="apiBaseUrl"
              readonly
              class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              API Key
            </label>
            <input
              type="password"
              :value="apiKey"
              readonly
              class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          
          <p class="text-xs text-gray-500">
            Settings are configured via environment variables (.env file)
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
const apiKey = import.meta.env.VITE_API_KEY ? '••••••••' : 'Not configured'
</script>
