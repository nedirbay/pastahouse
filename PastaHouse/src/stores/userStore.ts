import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userService } from '@/services/userService'
import { cartService } from '@/services/cartService'
import { orderService } from '@/services/orderService'

export const useUserStore = defineStore('user', () => {
  // User state
  const user = ref<{
    id: number | null
    name: string | null
    email: string | null
    username: string | null
    is_staff: boolean | null
    created_at: string | null
    isLoggedIn: boolean
  }>({
    id: null,
    name: null,
    email: null,
    username: null,
    is_staff: null,
    created_at: null,
    isLoggedIn: false,
  })

  // Cart state
  const cartItems = ref<
    Array<{
      id: number
      productId: number
      name: string
      description: string
      price: number
      image: string
      quantity: number
      maxQuantity: number
    }>
  >([])

  // Order state
  const orders = ref<
    Array<{
      id: number
      userId: number
      name: string
      email: string
      phone: string
      address: string
      note: string
      items: Array<{
        productId: number
        name: string
        price: number
        quantity: number
      }>
      total: number
      status: string
      date: string
    }>
  >([])

  // Computed properties
  const isAuthenticated = computed(() => user.value.isLoggedIn)
  const cartItemCount = computed(() =>
    cartItems.value.reduce((total, item) => total + item.quantity, 0),
  )
  const cartTotal = computed(() =>
    cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0),
  )

  // Actions
  function login(userData: {
    id: number
    name: string
    email: string
    username?: string
    is_staff?: boolean
    created_at?: string
  }) {
    user.value = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      username: userData.username || null,
      is_staff: userData.is_staff || null,
      created_at: userData.created_at || null,
      isLoggedIn: true,
    }
  }

  async function logout() {
    user.value = {
      id: null,
      name: null,
      email: null,
      username: null,
      is_staff: null,
      created_at: null,
      isLoggedIn: false,
    }
    cartItems.value = []

    // Clear token from localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  }

  function register(userData: {
    id: number
    name: string
    email: string
    username?: string
    is_staff?: boolean
    created_at?: string
  }) {
    user.value = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      username: userData.username || null,
      is_staff: userData.is_staff || null,
      created_at: userData.created_at || null,
      isLoggedIn: true,
    }
  }

  // Load user profile from API
  async function loadUserProfile() {
    if (!user.value.isLoggedIn) return

    try {
      const userData = await userService.getProfile()
      user.value = {
        ...user.value,
        id: userData.id,
        name: userData.name,
        email: userData.email,
        username: userData.username,
        is_staff: userData.is_staff,
        created_at: userData.created_at,
      }
    } catch (error) {
      console.error('Failed to load user profile:', error)
    }
  }

  function addToCart(item: {
    productId: number
    name: string
    description: string
    price: number
    image: string
    quantity: number
    maxQuantity: number
  }) {
    const existingItem = cartItems.value.find((cartItem) => cartItem.productId === item.productId)

    if (existingItem) {
      existingItem.quantity += item.quantity
      if (existingItem.quantity > existingItem.maxQuantity) {
        existingItem.quantity = existingItem.maxQuantity
      }
    } else {
      cartItems.value.push({
        id: Date.now(),
        ...item,
      })
    }
  }

  function removeFromCart(itemId: number) {
    cartItems.value = cartItems.value.filter((item) => item.id !== itemId)
  }

  function updateCartItemQuantity(itemId: number, quantity: number) {
    const item = cartItems.value.find((item) => item.id === itemId)
    if (item) {
      item.quantity = quantity
      if (item.quantity > item.maxQuantity) {
        item.quantity = item.maxQuantity
      }
      if (item.quantity < 1) {
        removeFromCart(itemId)
      }
    }
  }

  function clearCart() {
    cartItems.value = []
  }

  async function placeOrder(orderData: {
    name: string
    email: string
    phone: string
    address: string
    note: string
  }) {
    if (!user.value.isLoggedIn) return false

    try {
      const newOrder = await orderService.createOrder({
        ...orderData,
        items: cartItems.value.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
        })),
      })

      // Convert API order to local format
      const localOrder = {
        id: newOrder.id,
        userId: user.value.id!,
        name: newOrder.name,
        email: newOrder.email,
        phone: newOrder.phone,
        address: newOrder.address,
        note: newOrder.note,
        items: cartItems.value.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: cartTotal.value,
        status: newOrder.status || 'pending',
        date: new Date().toISOString().split('T')[0] || '',
      }

      orders.value.push(localOrder)
      clearCart()
      return true
    } catch (error) {
      console.error('Failed to place order:', error)
      return false
    }
  }

  async function loadUserOrders() {
    if (!user.value.isLoggedIn) return []

    try {
      const userOrders = await orderService.getOrders()
      orders.value = userOrders.map((order) => ({
        id: order.id,
        userId: user.value.id!,
        name: order.name,
        email: order.email,
        phone: order.phone,
        address: order.address,
        note: order.note,
        items:
          order.items?.map((item) => ({
            productId: item.product,
            name: '', // Would need to fetch product details
            price: 0, // Would need to fetch product details
            quantity: item.quantity,
          })) || [],
        total: 0, // Would calculate from items
        status: order.status || 'pending',
        date: new Date().toISOString().split('T')[0] || '',
      }))

      return orders.value
    } catch (error) {
      console.error('Failed to load orders:', error)
      return []
    }
  }

  function getUserOrders() {
    if (!user.value.isLoggedIn) return []
    return orders.value.filter((order) => order.userId === user.value.id)
  }

  return {
    user,
    cartItems,
    orders,
    isAuthenticated,
    cartItemCount,
    cartTotal,
    login,
    logout,
    register,
    loadUserProfile,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    placeOrder,
    loadUserOrders,
    getUserOrders,
  }
})
