<template>
  <div id="app" class="dark min-h-screen bg-gray-50 dark:bg-dark-canvas-default">
    <RouterView />
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import ToastContainer from './components/base/ToastContainer.vue'
</script>
