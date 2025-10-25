import api from './api'

interface CartItem {
  id: number
  product: number // product ID
  quantity: number
  // Add other cart item properties as needed
}

interface AddToCartData {
  product: number // product ID
  quantity: number
}

interface UpdateCartItemData {
  quantity: number
}

export const cartService = {
  // Get all cart items
  getCartItems: (): Promise<CartItem[]> => {
    return api.get('/api/cart').then((response) => response.data)
  },

  // Add item to cart
  addToCart: (data: AddToCartData): Promise<CartItem> => {
    return api.post('/api/cart', data).then((response) => response.data)
  },

  // Update cart item quantity
  updateCartItem: (id: number, data: UpdateCartItemData): Promise<CartItem> => {
    return api.put(`/api/cart/${id}`, data).then((response) => response.data)
  },

  // Remove item from cart
  removeFromCart: (id: number): Promise<{ message: string }> => {
    return api.delete(`/api/cart/${id}`).then((response) => response.data)
  },

  // Clear cart
  clearCart: (): Promise<{ message: string }> => {
    return api.delete('/api/cart').then((response) => response.data)
  },
}
