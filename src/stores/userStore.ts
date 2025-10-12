import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // User state
  const user = ref<{
    id: number | null
    name: string | null
    email: string | null
    isLoggedIn: boolean
  }>({
    id: null,
    name: null,
    email: null,
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
  function login(userData: { id: number; name: string; email: string }) {
    user.value = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      isLoggedIn: true,
    }
  }

  function logout() {
    user.value = {
      id: null,
      name: null,
      email: null,
      isLoggedIn: false,
    }
    cartItems.value = []
  }

  function register(userData: { id: number; name: string; email: string }) {
    user.value = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      isLoggedIn: true,
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

  function placeOrder(orderData: {
    name: string
    email: string
    phone: string
    address: string
    note: string
  }) {
    if (!user.value.isLoggedIn) return false

    const newOrder = {
      id: Date.now(),
      userId: user.value.id!,
      name: orderData.name,
      email: orderData.email,
      phone: orderData.phone,
      address: orderData.address,
      note: orderData.note,
      items: cartItems.value.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: cartTotal.value,
      status: 'pending',
      date: new Date().toISOString().split('T')[0] as string,
    }

    orders.value.push(newOrder)
    clearCart()
    return true
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
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    placeOrder,
    getUserOrders,
  }
})
