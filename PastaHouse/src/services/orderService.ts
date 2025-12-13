import api from './api'

interface OrderItem {
  product: number // product ID
  quantity: number
}

interface Order {
  id: number
  name: string
  email: string
  phone: string
  address: string
  note: string
  items: OrderItem[]
  status?: string
  // Add other order properties as needed
}

interface CreateOrderData {
  name: string
  email: string
  phone: string
  address: string
  note: string
  items: OrderItem[]
}

interface OrderListResponse {
  orders: Order[]
  // Add pagination if needed
}

interface OrderQueryParams {
  status?: string
}

export const orderService = {
  // Get all orders with optional status filter
  getOrders: (params?: OrderQueryParams): Promise<Order[]> => {
    return api.get('/api/orders', { params }).then((response) => response.data)
  },

  // Get a specific order by ID
  getOrder: (id: number): Promise<Order> => {
    return api.get(`/api/orders/${id}`).then((response) => response.data)
  },

  // Create a new order
  createOrder: (data: CreateOrderData): Promise<Order> => {
    return api.post('/api/orders', data).then((response) => response.data)
  },

  // Cancel an order
  cancelOrder: (id: number): Promise<Order> => {
    return api.put(`/api/orders/${id}/cancel`).then((response) => response.data)
  },
}
