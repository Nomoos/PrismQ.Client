import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Task } from '../types'
import { taskService } from '../services/taskService'

export const useTaskStore = defineStore('tasks', () => {
  // State
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // Getters
  const pendingTasks = computed(() => 
    tasks.value.filter(t => t.status === 'pending')
  )
  
  const claimedTasks = computed(() => 
    tasks.value.filter(t => t.status === 'claimed')
  )
  
  const completedTasks = computed(() => 
    tasks.value.filter(t => t.status === 'completed')
  )
  
  const failedTasks = computed(() => 
    tasks.value.filter(t => t.status === 'failed')
  )
  
  // Actions
  async function fetchTasks(params?: { status?: string; type?: string }) {
    loading.value = true
    error.value = null
    try {
      const response = await taskService.getTasks(params)
      if (response.success) {
        tasks.value = response.data
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch tasks'
    } finally {
      loading.value = false
    }
  }
  
  async function createTask(type: string, params: Record<string, any>, priority = 0) {
    loading.value = true
    error.value = null
    try {
      const response = await taskService.createTask({ type, params, priority })
      if (response.success && response.data) {
        tasks.value.unshift(response.data)
      }
      return response
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create task'
      throw e
    } finally {
      loading.value = false
    }
  }
  
  async function updateProgress(taskId: number, workerId: string, progress: number, message?: string) {
    try {
      await taskService.updateProgress(taskId, workerId, progress, message)
      // Update local task
      const task = tasks.value.find(t => t.id === taskId)
      if (task) {
        task.progress = progress
      }
    } catch (e) {
      console.error('Failed to update progress:', e)
      throw e
    }
  }
  
  function clearError() {
    error.value = null
  }
  
  return {
    tasks,
    loading,
    error,
    pendingTasks,
    claimedTasks,
    completedTasks,
    failedTasks,
    fetchTasks,
    createTask,
    updateProgress,
    clearError
  }
})
