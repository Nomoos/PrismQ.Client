import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Task, CreateTaskRequest } from '../types'
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
  
  async function createTask(data: CreateTaskRequest) {
    loading.value = true
    error.value = null
    try {
      const response = await taskService.createTask(data)
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
  
  async function claimTask(taskTypeId: number, workerId: string): Promise<Task | undefined> {
    try {
      const response = await taskService.claimTask({
        worker_id: workerId,
        task_type_id: taskTypeId
      })
      if (response.success && response.data) {
        updateTask(response.data)
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
      console.error('Failed to claim task:', e)
      throw e
    }
  }
  
  async function completeTask(taskId: number, workerId: string, result: Record<string, any>) {
    try {
      await taskService.completeTask(taskId, {
        worker_id: workerId,
        success: true,
        result
      })
      // Update local task
      const task = tasks.value.find(t => t.id === taskId)
      if (task) {
        task.status = 'completed'
        task.result = result
        task.completed_at = new Date().toISOString()
      }
    } catch (e) {
      console.error('Failed to complete task:', e)
      throw e
    }
  }
  
  async function failTask(taskId: number, workerId: string, errorMessage: string) {
    try {
      await taskService.completeTask(taskId, {
        worker_id: workerId,
        success: false,
        error: errorMessage
      })
      // Update local task
      const task = tasks.value.find(t => t.id === taskId)
      if (task) {
        task.status = 'failed'
        task.error_message = errorMessage
      }
    } catch (e) {
      console.error('Failed to mark task as failed:', e)
      throw e
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
      await taskService.updateProgress(taskId, {
        worker_id: workerId,
        progress,
        message
      })
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
  
  function updateTask(updatedTask: Task) {
    const index = tasks.value.findIndex(t => t.id === updatedTask.id)
    if (index !== -1) {
      tasks.value[index] = updatedTask
    } else {
      // Task not in list, add it
      tasks.value.push(updatedTask)
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
    failTask,
    updateProgress,
    updateTask,
    clearError
  }
})
