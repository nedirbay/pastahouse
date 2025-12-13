<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import {
  ElRow,
  ElCol,
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElMessage,
  ElSteps,
  ElStep,
} from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const router = useRouter()

// Check if user is authenticated
if (!userStore.isAuthenticated) {
  router.push('/auth/login')
}

// Order form data
const orderForm = reactive({
  name: userStore.user.name || '',
  email: userStore.user.email || '',
  phone: '',
  address: '',
  note: '',
})

// Order steps
const activeStep = ref(0)

// Cart items
const cartItems = computed(() => userStore.cartItems)
const cartTotal = computed(() => userStore.cartTotal)

// Validate form
const validateForm = () => {
  if (!orderForm.name || !orderForm.email || !orderForm.phone || !orderForm.address) {
    ElMessage.error('Please fill in all required fields')
    return false
  }

  if (cartItems.value.length === 0) {
    ElMessage.error('Your cart is empty')
    return false
  }

  return true
}

// Place order
const placeOrder = async () => {
  if (!validateForm()) return

  try {
    const success = userStore.placeOrder({
      name: orderForm.name,
      email: orderForm.email,
      phone: orderForm.phone,
      address: orderForm.address,
      note: orderForm.note,
    })

    if (success) {
      ElMessage.success('Order placed successfully!')
      activeStep.value = 1
      // Redirect to order confirmation after 2 seconds
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } else {
      ElMessage.error('Failed to place order')
    }
  } catch (error) {
    ElMessage.error('Failed to place order. Please try again.')
  }
}

// Go back to cart
const goBackToCart = () => {
  router.push('/cart')
}
</script>

<template>
  <div class="order-container">
    <h1 class="page-title">Complete Your Order</h1>

    <ElCard class="order-steps-card">
      <ElSteps :active="activeStep" finish-status="success" align-center>
        <ElStep title="Order Details" />
        <ElStep title="Confirmation" />
      </ElSteps>
    </ElCard>

    <div v-if="activeStep === 0" class="order-content">
      <ElRow :gutter="30">
        <!-- Order Form -->
        <ElCol :span="16" class="order-form-col">
          <ElCard class="order-form-card">
            <h2>Delivery Information</h2>

            <ElForm :model="orderForm" class="order-form">
              <ElRow :gutter="20">
                <ElCol :span="12">
                  <ElFormItem label="Full Name" required>
                    <ElInput v-model="orderForm.name" placeholder="Your full name" />
                  </ElFormItem>
                </ElCol>

                <ElCol :span="12">
                  <ElFormItem label="Email Address" required>
                    <ElInput
                      v-model="orderForm.email"
                      type="email"
                      placeholder="Your email address"
                    />
                  </ElFormItem>
                </ElCol>
              </ElRow>

              <ElRow :gutter="20">
                <ElCol :span="12">
                  <ElFormItem label="Phone Number" required>
                    <ElInput v-model="orderForm.phone" placeholder="Your phone number" />
                  </ElFormItem>
                </ElCol>

                <ElCol :span="12">
                  <ElFormItem label="Delivery Address" required>
                    <ElInput v-model="orderForm.address" placeholder="Your full address" />
                  </ElFormItem>
                </ElCol>
              </ElRow>

              <ElFormItem label="Additional Notes">
                <ElInput
                  v-model="orderForm.note"
                  type="textarea"
                  :rows="4"
                  placeholder="Any special instructions for delivery..."
                />
              </ElFormItem>

              <div class="form-actions">
                <ElButton @click="goBackToCart"> Back to Cart </ElButton>
                <ElButton
                  type="primary"
                  size="large"
                  class="place-order-button"
                  @click="placeOrder"
                >
                  Place Order
                </ElButton>
              </div>
            </ElForm>
          </ElCard>
        </ElCol>

        <!-- Order Summary -->
        <ElCol :span="8" class="order-summary-col">
          <ElCard class="order-summary-card">
            <h2>Order Summary</h2>

            <div class="order-items">
              <div v-for="item in cartItems" :key="item.id" class="order-item">
                <div class="item-info">
                  <h3>{{ item.name }}</h3>
                  <p>{{ item.description }}</p>
                </div>
                <div class="item-quantity-price">
                  <span>{{ item.quantity }} x</span>
                  <span class="item-price">${{ item.price }}</span>
                </div>
              </div>
            </div>

            <div class="order-total">
              <div class="total-row">
                <span>Subtotal</span>
                <span>${{ cartTotal.toFixed(2) }}</span>
              </div>
              <div class="total-row">
                <span>Shipping</span>
                <span>$5.99</span>
              </div>
              <div class="total-row">
                <span>Tax</span>
                <span>${{ (cartTotal * 0.08).toFixed(2) }}</span>
              </div>
              <div class="total-row grand-total">
                <span>Total</span>
                <span>${{ (cartTotal + 5.99 + cartTotal * 0.08).toFixed(2) }}</span>
              </div>
            </div>
          </ElCard>
        </ElCol>
      </ElRow>
    </div>

    <!-- Order Confirmation -->
    <div v-if="activeStep === 1" class="confirmation-content">
      <ElCard class="confirmation-card">
        <div class="confirmation-icon">
          <i class="el-icon-success"></i>
        </div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your order. We've sent a confirmation email to {{ orderForm.email }}.</p>
        <p>Your order will be processed and delivered soon.</p>
        <ElButton type="primary" @click="router.push('/')"> Continue Shopping </ElButton>
      </ElCard>
    </div>
  </div>
</template>

<style scoped>
.order-container {
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

.order-steps-card {
  margin-bottom: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.order-content {
  margin-bottom: 30px;
}

.order-form-col {
  padding-right: 15px;
}

.order-summary-col {
  padding-left: 15px;
}

.order-form-card h2,
.order-summary-card h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
}

.order-form {
  margin-top: 20px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #333;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.place-order-button {
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa502 100%);
  border: none;
  color: white;
  font-weight: 500;
  padding: 15px 30px;
  font-size: 1.1rem;
}

.order-items {
  margin-bottom: 25px;
  max-height: 300px;
  overflow-y: auto;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.order-item:last-child {
  border-bottom: none;
}

.item-info h3 {
  font-size: 1.1rem;
  margin-bottom: 5px;
  color: #333;
}

.item-info p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.item-quantity-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}

.item-price {
  font-weight: bold;
  color: #ff6b6b;
}

.order-total {
  border-top: 1px solid #eee;
  padding-top: 15px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.total-row span:last-child {
  font-weight: 500;
}

.grand-total {
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

.grand-total span:last-child {
  color: #ff6b6b;
}

.confirmation-content {
  display: flex;
  justify-content: center;
}

.confirmation-card {
  text-align: center;
  padding: 50px 30px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.confirmation-icon {
  font-size: 4rem;
  color: #67c23a;
  margin-bottom: 20px;
}

.confirmation-card h2 {
  font-size: 2rem;
  margin-bottom: 15px;
  color: #333;
}

.confirmation-card p {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 10px;
}

@media (max-width: 992px) {
  .order-form-col,
  .order-summary-col {
    width: 100%;
    padding: 0;
  }

  .order-content .el-row {
    flex-direction: column;
  }

  .order-summary-col {
    margin-top: 30px;
  }
}
</style>
