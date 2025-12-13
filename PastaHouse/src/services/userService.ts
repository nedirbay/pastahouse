import api from './api'

interface User {
  id: number
  email: string
  name: string
  username: string
  is_staff: boolean
  created_at: string
}

interface UpdateUserData {
  name: string
  email: string
}

interface Order {
  id: number
  // Add other order properties as needed
}

export const userService = {
  // Get user profile
  getProfile: (): Promise<User> => {
    return api.get('/api/users/profile').then((response) => response.data)
  },

  // Update user profile
  updateProfile: (data: UpdateUserData): Promise<User> => {
    return api.put('/api/users/profile', data).then((response) => response.data)
  },

  // Get user orders
  getOrders: (): Promise<Order[]> => {
    return api.get('/api/users/orders').then((response) => response.data)
  },
}
