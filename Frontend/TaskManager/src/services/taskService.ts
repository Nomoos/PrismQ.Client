import api from './api'
import type { 
  Task, 
  TaskType, 
  ApiResponse, 
  PaginatedResponse,
  CreateTaskRequest,
  ClaimTaskRequest,
  CompleteTaskRequest,
  UpdateProgressRequest
} from '../types'

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
  async createTask(data: CreateTaskRequest): Promise<ApiResponse<Task>> {
    return api.post<ApiResponse<Task>>('/tasks', data)
  },

  // Claim task for processing
  async claimTask(data: ClaimTaskRequest): Promise<ApiResponse<Task>> {
    return api.post<ApiResponse<Task>>('/tasks/claim', data)
  },

  // Complete task (success or failure)
  async completeTask(
    id: number,
    data: CompleteTaskRequest
  ): Promise<ApiResponse<void>> {
    return api.post<ApiResponse<void>>(`/tasks/${id}/complete`, data)
  },

  // Update task progress
  async updateProgress(
    id: number,
    data: UpdateProgressRequest
  ): Promise<ApiResponse<void>> {
    return api.post<ApiResponse<void>>(`/tasks/${id}/progress`, data)
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
