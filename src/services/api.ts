import axios from 'axios'
import type { ChatRequest, ChatResponse, ApiError } from '../types'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
})

// Request interceptor — add request timestamp
apiClient.interceptors.request.use(
  (config) => {
    if (config.headers) {
      if (typeof config.headers.set === 'function') {
        config.headers.set('X-Request-Timestamp', new Date().toISOString())
      } else {
        (config.headers as Record<string, any>)['X-Request-Timestamp'] = new Date().toISOString()
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor — normalize errors into ApiError shape
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      status: error.response?.status || (error.response ? error.response.status : 500)
    }
    return Promise.reject(apiError)
  }
)

/**
 * Sends chat message with expense context to backend
 */
export const sendMessage = async (payload: ChatRequest): Promise<ChatResponse> => {
  const response = await apiClient.post<ChatResponse>('/chat', payload)
  return response.data
}

/**
 * Health check ping to backend
 */
export const healthCheck = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/health')
    return response.status === 200
  } catch {
    return false
  }
}
