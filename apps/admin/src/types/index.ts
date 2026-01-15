export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'teacher' | 'student' | 'parent'
  status: 'active' | 'inactive'
  createdAt: Date
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  token: string | null
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message: string
}
