<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import {
  ElRow,
  ElCol,
  ElCard,
  ElButton,
  ElIcon,
  ElRate,
  ElInput,
  ElAvatar,
  ElDivider,
  ElMessage,
} from 'element-plus'
import { Star, ShoppingBag, User, Clock, ChatLineRound } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

// Get product ID from route
const productId = ref(route.params.id || 1)

// Product data
const product = ref({
  id: 1,
  name: 'Fresh Fettuccine',
  description:
    'Handmade flat ribbon pasta, perfect with creamy sauces. Our signature fettuccine is made daily using traditional bronze-cutting techniques that create a rough surface to hold sauce better. Made with organic eggs and semolina flour for the perfect texture and flavor.',
  price: 12.99,
  image: 'https://images.unsplash.com/photo-1515516484336-59005480b4d6?w=600&h=400&fit=crop',
  rating: 4.9,
  category: 'Fresh Pasta',
  tags: ['vegetarian', 'egg'],
  inStock: true,
  quantity: 50,
})

// Review form data
const reviewForm = reactive({
  rating: 0,
  comment: '',
  name: '',
  email: '',
})

// Sample reviews
const reviews = ref([
  {
    id: 1,
    name: 'Maria Rossi',
    rating: 5,
    comment:
      'Absolutely delicious! The texture is perfect and it pairs wonderfully with my homemade Alfredo sauce.',
    date: '2025-10-01',
    avatar: '',
  },
  {
    id: 2,
    name: 'John Smith',
    rating: 4,
    comment:
      'Great quality pasta. Cooks evenly and has a nice bite to it. Will definitely order again.',
    date: '2025-09-25',
    avatar: '',
  },
  {
    id: 3,
    name: 'Sophie Johnson',
    rating: 5,
    comment: "The best fresh pasta I've ever had. Worth every penny!",
    date: '2025-09-20',
    avatar: '',
  },
])

// Cart functionality
const quantity = ref(1)

// Add to cart function
const addToCart = () => {
  if (!userStore.isAuthenticated) {
    ElMessage.warning('Please login to add items to cart')
    router.push('/auth/login')
    return
  }

  userStore.addToCart({
    productId: product.value.id,
    name: product.value.name,
    description: product.value.description,
    price: product.value.price,
    image: product.value.image,
    quantity: quantity.value,
    maxQuantity: product.value.quantity,
  })

  ElMessage.success(`${product.value.name} added to cart!`)
}

// Buy Now function
const buyNow = () => {
  if (!userStore.isAuthenticated) {
    ElMessage.warning('Please login to purchase items')
    router.push('/auth/login')
    return
  }

  // Add to cart first
  userStore.addToCart({
    productId: product.value.id,
    name: product.value.name,
    description: product.value.description,
    price: product.value.price,
    image: product.value.image,
    quantity: quantity.value,
    maxQuantity: product.value.quantity,
  })

  // Then navigate to cart
  router.push('/cart')
}

// Submit review function
const submitReview = () => {
  if (!userStore.isAuthenticated) {
    ElMessage.warning('Please login to leave a review')
    router.push('/auth/login')
    return
  }

  if (reviewForm.rating > 0 && reviewForm.comment && reviewForm.name && reviewForm.email) {
    const today = new Date().toISOString().split('T')[0]
    const newReview = {
      id: reviews.value.length + 1,
      name: reviewForm.name,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      date: today as string,
      avatar: '',
    }

    reviews.value.unshift(newReview)

    // Reset form
    reviewForm.rating = 0
    reviewForm.comment = ''
    reviewForm.name = ''
    reviewForm.email = ''

    ElMessage.success('Review submitted successfully!')
  } else {
    ElMessage.error('Please fill in all required fields')
  }
}

// Format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>

<template>
  <div class="product-detail-container">
    <ElRow :gutter="30" class="product-layout">
      <!-- Product Images and Info -->
      <ElCol :span="14" class="product-info-col">
        <div class="product-gallery">
          <img :src="product.image" :alt="product.name" class="main-image" />
        </div>

        <div class="product-details">
          <h1 class="product-title">{{ product.name }}</h1>
          <div class="product-rating-section">
            <ElRate
              v-model="product.rating"
              disabled
              :max="5"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            />
            <span class="rating-text">{{ product.rating }} ({{ reviews.length }} reviews)</span>
          </div>

          <div class="product-price">${{ product.price }}</div>

          <div class="product-description">
            <h3>Description</h3>
            <p>{{ product.description }}</p>
          </div>

          <div class="product-meta">
            <div class="meta-item"><strong>Category:</strong> {{ product.category }}</div>
            <div class="meta-item">
              <strong>Tags:</strong>
              <span v-for="tag in product.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <div class="meta-item">
              <strong>Availability:</strong>
              <span
                :class="[
                  'stock-status',
                  { 'in-stock': product.inStock, 'out-of-stock': !product.inStock },
                ]"
              >
                {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
              </span>
            </div>
          </div>
        </div>
      </ElCol>

      <!-- Purchase Options -->
      <ElCol :span="10" class="purchase-col">
        <ElCard class="purchase-card">
          <div class="purchase-options">
            <div class="quantity-selector">
              <label>Quantity:</label>
              <div class="quantity-controls">
                <ElButton :disabled="quantity <= 1" @click="quantity--" circle> - </ElButton>
                <span class="quantity-display">{{ quantity }}</span>
                <ElButton :disabled="quantity >= product.quantity" @click="quantity++" circle>
                  +
                </ElButton>
              </div>
              <div class="stock-info">{{ product.quantity }} items available</div>
            </div>

            <div class="purchase-actions">
              <ElButton
                type="primary"
                class="add-to-cart-btn"
                @click="addToCart"
                :disabled="!product.inStock"
                size="large"
              >
                <ElIcon><ShoppingBag /></ElIcon>
                {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
              </ElButton>

              <ElButton type="warning" plain size="large" @click="buyNow"> Buy Now </ElButton>
            </div>

            <div class="product-guarantees">
              <div class="guarantee-item">
                <ElIcon><Clock /></ElIcon>
                <span>Fast Delivery</span>
              </div>
              <div class="guarantee-item">
                <ElIcon><Star /></ElIcon>
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </div>
        </ElCard>

        <!-- Reviews Summary -->
        <ElCard class="reviews-summary-card">
          <h3>Customer Reviews</h3>
          <div class="reviews-summary">
            <div class="average-rating">
              <div class="rating-value">{{ product.rating }}</div>
              <div class="rating-stars">
                <ElRate
                  v-model="product.rating"
                  disabled
                  :max="5"
                  size="large"
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                />
              </div>
              <div class="rating-count">{{ reviews.length }} reviews</div>
            </div>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>

    <!-- Reviews Section -->
    <ElRow class="reviews-section">
      <ElCol :span="24">
        <ElCard class="reviews-card">
          <h2>Customer Reviews</h2>

          <!-- Review Form -->
          <div class="review-form-section">
            <h3>Write a Review</h3>
            <div v-if="!userStore.isAuthenticated" class="login-prompt">
              <p>
                Please <RouterLink to="/auth/login">login</RouterLink> or
                <RouterLink to="/auth/register">register</RouterLink> to leave a review
              </p>
            </div>
            <div v-else class="review-form">
              <div class="form-group">
                <label>Your Rating</label>
                <ElRate v-model="reviewForm.rating" :max="5" />
              </div>

              <div class="form-group">
                <label>Your Review</label>
                <ElInput
                  v-model="reviewForm.comment"
                  type="textarea"
                  :rows="4"
                  placeholder="Share your experience with this product..."
                />
              </div>

              <ElRow :gutter="20">
                <ElCol :span="12">
                  <div class="form-group">
                    <label>Name</label>
                    <ElInput
                      v-model="reviewForm.name"
                      placeholder="Your name"
                      :value="userStore.user.name || ''"
                      disabled
                    />
                  </div>
                </ElCol>
                <ElCol :span="12">
                  <div class="form-group">
                    <label>Email</label>
                    <ElInput
                      v-model="reviewForm.email"
                      type="email"
                      placeholder="Your email"
                      :value="userStore.user.email || ''"
                      disabled
                    />
                  </div>
                </ElCol>
              </ElRow>

              <ElButton type="primary" @click="submitReview"> Submit Review </ElButton>
            </div>
          </div>

          <ElDivider />

          <!-- Reviews List -->
          <div class="reviews-list">
            <div v-for="review in reviews" :key="review.id" class="review-item">
              <div class="review-header">
                <ElAvatar :icon="User" />
                <div class="reviewer-info">
                  <div class="reviewer-name">{{ review.name }}</div>
                  <div class="review-date">{{ formatDate(review.date) }}</div>
                </div>
                <div class="review-rating">
                  <ElRate
                    v-model="review.rating"
                    disabled
                    :max="5"
                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                  />
                </div>
              </div>
              <div class="review-content">
                <p>{{ review.comment }}</p>
              </div>
            </div>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<style scoped>
.product-detail-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.product-layout {
  margin-bottom: 30px;
}

/* Product Info Column */
.product-info-col {
  padding-right: 20px;
}

.product-gallery {
  margin-bottom: 30px;
}

.main-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-title {
  font-size: 2.2rem;
  color: #333;
  margin-bottom: 15px;
}

.product-rating-section {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.rating-text {
  color: #666;
  font-size: 1.1rem;
}

.product-price {
  font-size: 2rem;
  font-weight: bold;
  color: #ff6b6b;
  margin-bottom: 25px;
}

.product-description h3 {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #333;
}

.product-description p {
  color: #666;
  line-height: 1.7;
  font-size: 1.1rem;
  margin-bottom: 25px;
}

.product-meta {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
}

.meta-item {
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.meta-item:last-child {
  margin-bottom: 0;
}

.tag {
  background: #ff6b6b;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-right: 10px;
  display: inline-block;
}

.stock-status {
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
}

.in-stock {
  background: #d4edda;
  color: #155724;
}

.out-of-stock {
  background: #f8d7da;
  color: #721c24;
}

/* Purchase Column */
.purchase-col {
  padding-left: 20px;
}

.purchase-card {
  margin-bottom: 20px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.quantity-selector {
  margin-bottom: 25px;
}

.quantity-selector label {
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 1.1rem;
  color: #333;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.quantity-display {
  font-size: 1.3rem;
  font-weight: bold;
  min-width: 40px;
  text-align: center;
}

.stock-info {
  color: #666;
  margin-top: 10px;
  font-size: 0.9rem;
}

.purchase-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}

.add-to-cart-btn {
  width: 100%;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa502 100%);
  border: none;
  color: white;
  font-weight: 500;
  padding: 15px;
  font-size: 1.1rem;
}

.product-guarantees {
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.guarantee-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 0.9rem;
}

.reviews-summary-card h3 {
  margin-bottom: 20px;
  color: #333;
}

.reviews-summary {
  text-align: center;
}

.average-rating {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rating-value {
  font-size: 3rem;
  font-weight: bold;
  color: #ff6b6b;
  margin-bottom: 10px;
}

.rating-count {
  color: #666;
  margin-top: 10px;
}

/* Reviews Section */
.reviews-card {
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.reviews-card h2 {
  font-size: 1.8rem;
  margin-bottom: 25px;
  color: #333;
}

.review-form-section h3 {
  font-size: 1.4rem;
  margin-bottom: 20px;
  color: #333;
}

.login-prompt {
  text-align: center;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  margin-bottom: 20px;
}

.login-prompt p {
  font-size: 1.1rem;
  color: #666;
}

.login-prompt a {
  color: #ff6b6b;
  font-weight: 500;
  text-decoration: none;
}

.login-prompt a:hover {
  text-decoration: underline;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 1.1rem;
  color: #333;
}

.review-item {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.review-item:last-child {
  border-bottom: none;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.reviewer-info {
  flex: 1;
}

.reviewer-name {
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}

.review-date {
  color: #999;
  font-size: 0.9rem;
}

.review-rating {
  display: flex;
  align-items: center;
}

.review-content p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 992px) {
  .product-info-col,
  .purchase-col {
    width: 100%;
    padding: 0;
  }

  .product-layout {
    flex-direction: column;
  }

  .purchase-col {
    margin-top: 30px;
  }
}
</style>
