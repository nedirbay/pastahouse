import api from './api'

interface RegisterData {
  name: string
  email: string
  password: string
}

interface LoginData {
  email: string
  password: string
}

interface UserData {
  id: number
  email: string
  name: string
  username: string
  is_staff: boolean
  created_at: string
}

interface AuthTokens {
  refresh: string
  access: string
}

interface AuthResponse {
  id: number
  email: string
  name: string
  username: string
  is_staff: boolean
  created_at: string
  tokens: AuthTokens
}

export const authService = {
  // Register a new user
  register: (data: RegisterData): Promise<AuthResponse> => {
    return api.post('/api/users/register/', data).then((response) => response.data)
  },

  // Login user
  login: (data: LoginData): Promise<AuthResponse> => {
    return api.post('/api/users/register/', data).then((response) => response.data)
  },

  // Logout user
  logout: (token: string): Promise<{ message: string }> => {
    // Since this is JWT-based auth, we typically just remove the token from local storage
    // But if there's a specific logout endpoint on the backend, we can call it
    return Promise.resolve({ message: 'Logged out successfully' })
  },

  // Obtain JWT token
  obtainToken: (data: LoginData): Promise<AuthTokens> => {
    return api.post('/api/auth/token/', data).then((response) => response.data)
  },

  // Refresh JWT token
  refreshToken: (refresh: string): Promise<{ access: string }> => {
    return api.post('/api/auth/token/refresh/', { refresh }).then((response) => response.data)
  },
}
