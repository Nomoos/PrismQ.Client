import api from './api'
import type { Task, TaskType, ApiResponse, PaginatedResponse } from '../types'

export const taskService = {
  // Get all tasks with optional filters
  async getTasks(params?: {
    status?: string
    type?: string
    limit?: number
    offset?: number
  }): Promise<PaginatedResponse<Task>> {
    return api.get<PaginatedResponse<Task>>('/tasks', params)
  },

  // Get task by ID
  async getTask(id: number): Promise<ApiResponse<Task>> {
    return api.get<ApiResponse<Task>>(`/tasks/${id}`)
  },

  // Create new task
  async createTask(data: {
    type: string
    params: Record<string, any>
    priority?: number
  }): Promise<ApiResponse<Task>> {
    return api.post<ApiResponse<Task>>('/tasks', data)
  },

  // Claim task for processing
  async claimTask(workerId: string, taskTypeId: number): Promise<ApiResponse<Task>> {
    return api.post<ApiResponse<Task>>('/tasks/claim', {
      worker_id: workerId,
      task_type_id: taskTypeId
    })
  },

  // Complete task
  async completeTask(
    id: number,
    workerId: string,
    success: boolean,
    result?: Record<string, any>,
    error?: string
  ): Promise<ApiResponse<Task>> {
    return api.post<ApiResponse<Task>>(`/tasks/${id}/complete`, {
      worker_id: workerId,
      success,
      result,
      error
    })
  },

  // Update task progress
  async updateProgress(
    id: number,
    workerId: string,
    progress: number,
    message?: string
  ): Promise<ApiResponse<void>> {
    return api.post<ApiResponse<void>>(`/tasks/${id}/progress`, {
      worker_id: workerId,
      progress,
      message
    })
  },

  // Get all task types
  async getTaskTypes(activeOnly = true): Promise<PaginatedResponse<TaskType>> {
    return api.get<PaginatedResponse<TaskType>>('/task-types', { active_only: activeOnly })
  },

  // Get task type by name
  async getTaskType(name: string): Promise<ApiResponse<TaskType>> {
    return api.get<ApiResponse<TaskType>>(`/task-types/${name}`)
  },

  // Register/update task type
  async registerTaskType(data: {
    name: string
    version: string
    param_schema: Record<string, any>
  }): Promise<ApiResponse<TaskType>> {
    return api.post<ApiResponse<TaskType>>('/task-types/register', data)
  }
}

export default taskService
