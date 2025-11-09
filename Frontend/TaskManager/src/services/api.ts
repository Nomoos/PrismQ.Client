import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { APIError, NetworkError } from '../types'

class ApiClient {
  private client: AxiosInstance
  private maxRetries = 3
  private retryDelay = 1000

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': import.meta.env.VITE_API_KEY || ''
      }
    })

    // Request interceptor for logging
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (import.meta.env.DEV) {
          console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, config.data)
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const config = error.config as InternalAxiosRequestConfig & { _retry?: number }
        
        // Handle network errors with retry
        if (!error.response && config && (!config._retry || config._retry < this.maxRetries)) {
          config._retry = (config._retry || 0) + 1
          console.log(`[API] Retrying request (${config._retry}/${this.maxRetries})...`)
          
          await new Promise(resolve => setTimeout(resolve, this.retryDelay * config._retry!))
          return this.client.request(config)
        }
        
        // Transform error
        if (error.response) {
          // Server responded with error
          const message = (error.response.data as any)?.message || 
                         (error.response.data as any)?.error || 
                         'API Error'
          throw new APIError(message, error.response.status, error.response.data)
        } else if (error.request) {
          // Network error
          throw new NetworkError('Network error - please check your connection')
        } else {
          throw new Error(error.message)
        }
      }
    )
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await this.client.get<T>(url, { params })
    return response.data
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(url, data)
    return response.data
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put<T>(url, data)
    return response.data
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url)
    return response.data
  }
}

export const api = new ApiClient()
export default api
