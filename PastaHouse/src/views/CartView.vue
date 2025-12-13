<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import {
  ElRow,
  ElCol,
  ElCard,
  ElButton,
  ElIcon,
  ElInputNumber,
  ElDivider,
  ElMessage,
} from 'element-plus'
import { Delete, ShoppingBag, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const router = useRouter()

// Cart items from store
const cartItems = computed(() => userStore.cartItems)

// Cart summary
const cartSummary = reactive({
  subtotal: 0,
  shipping: 5.99,
  tax: 0,
  total: 0,
})

// Calculate cart totals
const calculateTotals = () => {
  cartSummary.subtotal = cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  cartSummary.tax = cartSummary.subtotal * 0.08
  cartSummary.total = cartSummary.subtotal + cartSummary.shipping + cartSummary.tax
}

// Watch for cart changes and recalculate totals
watch(
  cartItems,
  () => {
    calculateTotals()
  },
  { deep: true, immediate: true },
)

// Update item quantity
const updateQuantity = (itemId: number, quantity: number) => {
  userStore.updateCartItemQuantity(itemId, quantity)
  calculateTotals()
}

// Remove item from cart
const removeItem = (itemId: number) => {
  userStore.removeFromCart(itemId)
  calculateTotals()
}

// Continue shopping
const continueShopping = () => {
  router.push('/products')
}

// Proceed to checkout
const proceedToCheckout = () => {
  if (!userStore.isAuthenticated) {
    ElMessage.warning('Please login to proceed to checkout')
    router.push('/auth/login')
    return
  }

  if (cartItems.value.length === 0) {
    ElMessage.error('Your cart is empty')
    return
  }

  router.push('/order')
}
</script>

<template>
  <div class="cart-container">
    <h1 class="page-title">Shopping Cart</h1>

    <div v-if="cartItems.length === 0" class="empty-cart">
      <ElCard class="empty-cart-card">
        <div class="empty-cart-content">
          <ElIcon class="empty-cart-icon"><ShoppingBag /></ElIcon>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <ElButton type="primary" @click="continueShopping">
            <ElIcon><ArrowLeft /></ElIcon>
            Continue Shopping
          </ElButton>
        </div>
      </ElCard>
    </div>

    <div v-else class="cart-content">
      <ElRow :gutter="30">
        <!-- Cart Items -->
        <ElCol :span="16" class="cart-items-col">
          <ElCard class="cart-items-card">
            <div class="cart-header">
              <h2>Cart ({{ cartItems.length }} items)</h2>
            </div>

            <div v-for="item in cartItems" :key="item.id" class="cart-item">
              <div class="item-image">
                <img :src="item.image" :alt="item.name" />
              </div>

              <div class="item-details">
                <h3 class="item-name">{{ item.name }}</h3>
                <p class="item-description">{{ item.description }}</p>
                <div class="item-price">${{ item.price }}</div>
              </div>

              <div class="item-quantity">
                <ElInputNumber
                  v-model="item.quantity"
                  :min="1"
                  :max="item.maxQuantity"
                  @change="updateQuantity(item.id, item.quantity)"
                />
              </div>

              <div class="item-total">${{ (item.price * item.quantity).toFixed(2) }}</div>

              <div class="item-actions">
                <ElButton type="danger" :icon="Delete" circle @click="removeItem(item.id)" />
              </div>
            </div>

            <div class="cart-actions">
              <ElButton @click="continueShopping">
                <ElIcon><ArrowLeft /></ElIcon>
                Continue Shopping
              </ElButton>
            </div>
          </ElCard>
        </ElCol>

        <!-- Cart Summary -->
        <ElCol :span="8" class="cart-summary-col">
          <ElCard class="cart-summary-card">
            <h2>Order Summary</h2>

            <div class="summary-details">
              <div class="summary-row">
                <span>Subtotal</span>
                <span>${{ cartSummary.subtotal.toFixed(2) }}</span>
              </div>

              <div class="summary-row">
                <span>Shipping</span>
                <span>${{ cartSummary.shipping.toFixed(2) }}</span>
              </div>

              <div class="summary-row">
                <span>Tax</span>
                <span>${{ cartSummary.tax.toFixed(2) }}</span>
              </div>

              <ElDivider />

              <div class="summary-row total-row">
                <span>Total</span>
                <span class="total-amount">${{ cartSummary.total.toFixed(2) }}</span>
              </div>
            </div>

            <div class="summary-actions">
              <ElButton type="primary" class="checkout-btn" @click="proceedToCheckout" size="large">
                Proceed to Checkout
                <ElIcon><ArrowRight /></ElIcon>
              </ElButton>

              <div class="payment-methods">
                <p>Secure payment methods:</p>
                <div class="payment-icons">
                  <span class="payment-icon">💳</span>
                  <span class="payment-icon">📱</span>
                  <span class="payment-icon">🔒</span>
                </div>
              </div>
            </div>
          </ElCard>
        </ElCol>
      </ElRow>
    </div>
  </div>
</template>

<style scoped>
.cart-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #1a1a1a; /* Dark background */
}

.page-title {
  font-size: 2.5rem;
  color: #fff; /* White text */
  margin-bottom: 30px;
  text-align: center;
}

/* Empty Cart */
.empty-cart-card {
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* Darker shadow */
  text-align: center;
  background-color: #222; /* Dark card background */
}

.empty-cart-content h3 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #fff; /* White text */
}

.empty-cart-content p {
  color: #ccc; /* Lighter text */
  margin-bottom: 30px;
  font-size: 1.1rem;
}

.empty-cart-icon {
  font-size: 4rem;
  color: #666; /* Darker icon */
  margin-bottom: 20px;
}

/* Cart Content */
.cart-items-card {
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* Darker shadow */
  margin-bottom: 30px;
  background-color: #222; /* Dark card background */
}

.cart-header h2 {
  margin-bottom: 20px;
  color: #fff; /* White text */
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #444; /* Darker border */
}

.item-name {
  font-size: 1.2rem;
  margin-bottom: 5px;
  color: #fff; /* White text */
}

.item-description {
  color: #ccc; /* Lighter text */
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.item-price {
  font-weight: bold;
  color: #ff9999; /* Lighter price color */
  font-size: 1.1rem;
}

.item-total {
  font-weight: bold;
  font-size: 1.2rem;
  color: #fff; /* White text */
  min-width: 80px;
  text-align: center;
}

.cart-actions {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #444; /* Darker border */
}

/* Cart Summary */
.cart-summary-card {
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* Darker shadow */
  position: sticky;
  top: 20px;
  background-color: #222; /* Dark card background */
}

.cart-summary-card h2 {
  margin-bottom: 20px;
  color: #fff; /* White text */
}

.summary-details {
  margin-bottom: 25px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 1.1rem;
  color: #fff; /* White text */
}

.summary-row span:last-child {
  font-weight: 500;
}

.total-row {
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 10px;
}

.total-amount {
  color: #ff9999; /* Lighter total amount color */
}

.checkout-btn {
  width: 100%;
  background: linear-gradient(135deg, #b33b3b 0%, #b37a02 100%); /* Darker gradient */
  border: none;
  color: white;
  font-weight: 500;
  padding: 15px;
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.payment-methods p {
  text-align: center;
  color: #ccc; /* Lighter text */
  margin-bottom: 15px;
  font-size: 0.9rem;
}
</style>
