export interface Task {
  id: number
  type: string
  type_id: number
  status: 'pending' | 'claimed' | 'completed' | 'failed'
  params: Record<string, any>
  result: Record<string, any> | null
  error_message: string | null
  priority: number
  attempts: number
  max_attempts: number
  progress: number
  claimed_by: string | null
  claimed_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
}

export interface TaskType {
  id: number
  name: string
  version: string
  param_schema: Record<string, any>
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Worker {
  id: string
  status: 'active' | 'idle' | 'offline'
  current_task_id: number | null
  last_seen: string
}

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
  error?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    total: number
    page: number
    per_page: number
    total_pages: number
  }
}
