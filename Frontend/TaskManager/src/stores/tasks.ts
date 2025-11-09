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
  
  async function fetchTask(id: number): Promise<Task | undefined> {
    loading.value = true
    error.value = null
    try {
      const response = await taskService.getTask(id)
      if (response.success && response.data) {
        // Update or add task to local state
        const index = tasks.value.findIndex(t => t.id === id)
        if (index !== -1) {
          tasks.value[index] = response.data
        } else {
          tasks.value.push(response.data)
        }
        return response.data
      }
      return undefined
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch task'
      throw e
    } finally {
      loading.value = false
    }
  }
  
  async function claimTask(workerId: string, taskTypeId: number): Promise<Task | undefined> {
    loading.value = true
    error.value = null
    try {
      const response = await taskService.claimTask(workerId, taskTypeId)
      if (response.success && response.data) {
        // Update task in local state
        const index = tasks.value.findIndex(t => t.id === response.data!.id)
        if (index !== -1) {
          tasks.value[index] = response.data
        }
        return response.data
      }
      return undefined
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to claim task'
      throw e
    } finally {
      loading.value = false
    }
  }
  
  async function completeTask(
    id: number, 
    workerId: string, 
    success: boolean, 
    result?: Record<string, any>, 
    errorMessage?: string
  ): Promise<Task | undefined> {
    loading.value = true
    error.value = null
    try {
      const response = await taskService.completeTask(id, workerId, success, result, errorMessage)
      if (response.success && response.data) {
        // Update task in local state
        const index = tasks.value.findIndex(t => t.id === id)
        if (index !== -1) {
          tasks.value[index] = response.data
        }
        return response.data
      }
      return undefined
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to complete task'
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
    fetchTask,
    createTask,
    claimTask,
    completeTask,
    updateProgress,
    clearError
  }
})
