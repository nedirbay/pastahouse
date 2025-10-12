<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElRow, ElCol, ElCard, ElButton, ElIcon, ElInputNumber, ElDivider } from 'element-plus'
import { Delete, ShoppingBag, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Cart items data
const cartItems = ref([
  {
    id: 1,
    productId: 1,
    name: 'Fresh Fettuccine',
    description: 'Handmade flat ribbon pasta, perfect with creamy sauces',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1515516484336-59005480b4d6?w=200&h=150&fit=crop',
    quantity: 2,
    maxQuantity: 10,
  },
  {
    id: 2,
    productId: 3,
    name: 'Homemade Pappardelle',
    description: 'Wide egg pasta ribbons, ideal for rich meat sauces',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1616089080075-0f507671b1a4?w=200&h=150&fit=crop',
    quantity: 1,
    maxQuantity: 5,
  },
  {
    id: 3,
    productId: 6,
    name: 'Mushroom Ravioli',
    description: 'Ravioli filled with wild mushrooms and herbs',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1608496776497-46b4b1c1f5e3?w=200&h=150&fit=crop',
    quantity: 3,
    maxQuantity: 8,
  },
])

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

// Initialize totals
calculateTotals()

// Update item quantity
const updateQuantity = (itemId: number, quantity: number) => {
  const item = cartItems.value.find((item) => item.id === itemId)
  if (item) {
    item.quantity = quantity
    calculateTotals()
  }
}

// Remove item from cart
const removeItem = (itemId: number) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== itemId)
  calculateTotals()
}

// Continue shopping
const continueShopping = () => {
  router.push('/products')
}

// Proceed to checkout
const proceedToCheckout = () => {
  alert('Proceeding to checkout!')
  // Here you would normally redirect to checkout page
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
}

.page-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

/* Empty Cart */
.empty-cart-card {
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.empty-cart-content {
  padding: 50px 20px;
}

.empty-cart-icon {
  font-size: 4rem;
  color: #ddd;
  margin-bottom: 20px;
}

.empty-cart-content h3 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #333;
}

.empty-cart-content p {
  color: #666;
  margin-bottom: 30px;
  font-size: 1.1rem;
}

/* Cart Content */
.cart-items-col {
  padding-right: 15px;
}

.cart-summary-col {
  padding-left: 15px;
}

.cart-items-card {
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.cart-header h2 {
  margin-bottom: 20px;
  color: #333;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 120px;
  height: 90px;
  margin-right: 20px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.item-details {
  flex: 1;
  margin-right: 20px;
}

.item-name {
  font-size: 1.2rem;
  margin-bottom: 5px;
  color: #333;
}

.item-description {
  color: #666;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.item-price {
  font-weight: bold;
  color: #ff6b6b;
  font-size: 1.1rem;
}

.item-quantity {
  margin-right: 20px;
}

.item-total {
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
  min-width: 80px;
  text-align: center;
}

.item-actions {
  margin-left: 20px;
}

.cart-actions {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

/* Cart Summary */
.cart-summary-card {
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 20px;
}

.cart-summary-card h2 {
  margin-bottom: 20px;
  color: #333;
}

.summary-details {
  margin-bottom: 25px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 1.1rem;
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
  color: #ff6b6b;
}

.checkout-btn {
  width: 100%;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa502 100%);
  border: none;
  color: white;
  font-weight: 500;
  padding: 15px;
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.payment-methods p {
  text-align: center;
  color: #666;
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.payment-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.payment-icon {
  font-size: 1.5rem;
}

@media (max-width: 992px) {
  .cart-items-col,
  .cart-summary-col {
    width: 100%;
    padding: 0;
  }

  .cart-content .el-row {
    flex-direction: column;
  }

  .cart-summary-col {
    margin-top: 30px;
  }
}
</style>
