<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  ElRow,
  ElCol,
  ElCard,
  ElButton,
  ElIcon,
  ElCheckbox,
  ElSlider,
  ElInput,
  ElMessage,
} from 'element-plus'
import { Star, ShoppingBag, Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()

// Product data
interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  rating: number
  category: string
  tags: string[]
}

const products = ref<Product[]>([
  {
    id: 1,
    name: 'Fresh Fettuccine',
    description: 'Handmade flat ribbon pasta, perfect with creamy sauces',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1515516484336-59005480b4d6?w=400&h=300&fit=crop',
    rating: 4.9,
    category: 'Fresh Pasta',
    tags: ['vegetarian', 'egg'],
  },
  {
    id: 2,
    name: 'Artisanal Ravioli',
    description: 'Delicate pasta pockets filled with ricotta and spinach',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1608496776497-46b4b1c1f5e3?w=400&h=300&fit=crop',
    rating: 4.8,
    category: 'Stuffed Pasta',
    tags: ['vegetarian', 'ricotta'],
  },
  {
    id: 3,
    name: 'Homemade Pappardelle',
    description: 'Wide egg pasta ribbons, ideal for rich meat sauces',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1616089080075-0f507671b1a4?w=400&h=300&fit=crop',
    rating: 4.7,
    category: 'Fresh Pasta',
    tags: ['egg', 'meat'],
  },
  {
    id: 4,
    name: 'Traditional Tagliatelle',
    description: 'Classic cut pasta, excellent with bolognese sauce',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1585951636944-300a6dae8644?w=400&h=300&fit=crop',
    rating: 4.9,
    category: 'Fresh Pasta',
    tags: ['egg', 'meat'],
  },
  {
    id: 5,
    name: 'Spinach Fettuccine',
    description: 'Fresh fettuccine with spinach infusion for a vibrant green color',
    price: 13.49,
    image: 'https://images.unsplash.com/photo-1515516484336-59005480b4d6?w=400&h=300&fit=crop',
    rating: 4.6,
    category: 'Fresh Pasta',
    tags: ['vegetarian', 'egg', 'spinach'],
  },
  {
    id: 6,
    name: 'Mushroom Ravioli',
    description: 'Ravioli filled with wild mushrooms and herbs',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1608496776497-46b4b1c1f5e3?w=400&h=300&fit=crop',
    rating: 4.8,
    category: 'Stuffed Pasta',
    tags: ['vegetarian', 'mushroom'],
  },
  {
    id: 7,
    name: 'Gluten-Free Fusilli',
    description: 'Spiral-shaped pasta made from rice and corn flour',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1616089080075-0f507671b1a4?w=400&h=300&fit=crop',
    rating: 4.5,
    category: 'Specialty Pasta',
    tags: ['gluten-free', 'vegetarian'],
  },
  {
    id: 8,
    name: 'Seafood Linguine',
    description: 'Flat pasta with seafood medley in white wine sauce',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1585951636944-300a6dae8644?w=400&h=300&fit=crop',
    rating: 4.9,
    category: 'Specialty Pasta',
    tags: ['seafood'],
  },
])

// Filter options
const categories = ref([
  { id: 'fresh', name: 'Fresh Pasta', count: 3 },
  { id: 'stuffed', name: 'Stuffed Pasta', count: 2 },
  { id: 'specialty', name: 'Specialty Pasta', count: 2 },
  { id: 'dried', name: 'Dried Pasta', count: 0 },
])

const tags = ref([
  { id: 'vegetarian', name: 'Vegetarian', count: 4 },
  { id: 'egg', name: 'Contains Egg', count: 3 },
  { id: 'meat', name: 'Meat Dishes', count: 2 },
  { id: 'gluten-free', name: 'Gluten-Free', count: 1 },
  { id: 'seafood', name: 'Seafood', count: 1 },
  { id: 'ricotta', name: 'Ricotta', count: 1 },
  { id: 'mushroom', name: 'Mushroom', count: 1 },
  { id: 'spinach', name: 'Spinach', count: 1 },
])

// Filter state
const filters = reactive({
  search: '',
  categories: [] as string[],
  tags: [] as string[],
  priceRange: [0, 25] as [number, number],
  rating: 0,
})

// Filtered products
const filteredProducts = ref<Product[]>([...products.value])

// Toggle category filter
const toggleCategory = (categoryId: string) => {
  const index = filters.categories.indexOf(categoryId)
  if (index > -1) {
    filters.categories.splice(index, 1)
  } else {
    filters.categories.push(categoryId)
  }
  applyFilters()
}

// Toggle tag filter
const toggleTag = (tagId: string) => {
  const index = filters.tags.indexOf(tagId)
  if (index > -1) {
    filters.tags.splice(index, 1)
  } else {
    filters.tags.push(tagId)
  }
  applyFilters()
}

// Apply filters
const applyFilters = () => {
  filteredProducts.value = products.value.filter((product) => {
    // Search filter
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }

    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false
    }

    // Tag filter
    if (filters.tags.length > 0) {
      const hasTag = filters.tags.some((tag) => product.tags.includes(tag))
      if (!hasTag) return false
    }

    // Price filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false
    }

    // Rating filter
    if (filters.rating > 0 && product.rating < filters.rating) {
      return false
    }

    return true
  })
}

// Reset all filters
const resetAllFilters = () => {
  filters.search = ''
  filters.categories = []
  filters.tags = []
  filters.priceRange = [0, 25]
  filters.rating = 0
  filteredProducts.value = [...products.value]
}

// Clear rating filter
const clearRating = () => {
  filters.rating = 0
  applyFilters()
}

// Navigate to product detail
const goToProductDetail = (productId: number) => {
  router.push(`/product/${productId}`)
}

// Add to cart function
const addToCart = (product: Product) => {
  if (!userStore.isAuthenticated) {
    ElMessage.warning('Please login to add items to cart')
    router.push('/auth/login')
    return
  }

  userStore.addToCart({
    productId: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    quantity: 1,
    maxQuantity: 10, // Assuming a default max quantity
  })

  ElMessage.success(`${product.name} added to cart!`)
}

// Initialize with all products
applyFilters()
</script>

<template>
  <div class="products-container">
    <h1 class="page-title">Our Pasta Collection</h1>

    <ElRow :gutter="30" class="products-layout">
      <!-- Filters Sidebar -->
      <ElCol :span="6" class="filters-sidebar">
        <div class="filters-container">
          <h2 class="filters-title">Filters</h2>

          <!-- Search Filter -->
          <div class="filter-section">
            <h3>Search</h3>
            <ElInput
              v-model="filters.search"
              placeholder="Search products..."
              :prefix-icon="Search"
              @input="applyFilters"
            />
          </div>

          <!-- Category Filter -->
          <div class="filter-section">
            <h3>Categories</h3>
            <div class="checkbox-group">
              <div v-for="category in categories" :key="category.id" class="checkbox-item">
                <ElCheckbox
                  :label="category.name"
                  :value="category.id"
                  :checked="filters.categories.includes(category.id)"
                  @change="toggleCategory(category.id)"
                >
                  {{ category.name }} ({{ category.count }})
                </ElCheckbox>
              </div>
            </div>
          </div>

          <!-- Tag Filter -->
          <div class="filter-section">
            <h3>Dietary Preferences</h3>
            <div class="checkbox-group">
              <div v-for="tag in tags" :key="tag.id" class="checkbox-item">
                <ElCheckbox
                  :label="tag.name"
                  :value="tag.id"
                  :checked="filters.tags.includes(tag.id)"
                  @change="toggleTag(tag.id)"
                >
                  {{ tag.name }} ({{ tag.count }})
                </ElCheckbox>
              </div>
            </div>
          </div>

          <!-- Price Filter -->
          <div class="filter-section">
            <h3>Price Range</h3>
            <ElSlider
              v-model="filters.priceRange"
              range
              :min="0"
              :max="30"
              :step="1"
              @change="applyFilters"
            />
            <div class="price-range">
              ${{ filters.priceRange[0] }} - ${{ filters.priceRange[1] }}
            </div>
          </div>

          <!-- Rating Filter -->
          <div class="filter-section">
            <h3>Minimum Rating</h3>
            <div class="rating-filter">
              <ElButton
                v-for="i in 5"
                :key="i"
                :type="filters.rating === i ? 'warning' : 'default'"
                @click="
                  () => {
                    filters.rating = i
                    applyFilters()
                  }
                "
                circle
              >
                <ElIcon><Star /></ElIcon>
              </ElButton>
              <ElButton type="default" @click="clearRating" plain> Clear </ElButton>
            </div>
          </div>

          <!-- Reset Button -->
          <div class="filter-actions">
            <ElButton @click="resetAllFilters" type="danger" plain> Reset All Filters </ElButton>
          </div>
        </div>
      </ElCol>

      <!-- Products Grid -->
      <ElCol :span="18" class="products-grid">
        <div class="products-header">
          <div class="results-info">
            Showing {{ filteredProducts.length }} of {{ products.length }} products
          </div>
        </div>

        <ElRow :gutter="20" class="products-list">
          <ElCol
            v-for="product in filteredProducts"
            :key="product.id"
            :span="8"
            class="product-col"
          >
            <ElCard class="product-card" @click="goToProductDetail(product.id)">
              <img :src="product.image" :alt="product.name" class="product-image" />
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-category">{{ product.category }}</p>
                <p class="product-description">{{ product.description }}</p>
                <div class="product-footer">
                  <div class="product-price-rating">
                    <span class="product-price">${{ product.price }}</span>
                    <div class="product-rating">
                      <ElIcon color="#FFD700"><Star /></ElIcon>
                      <span>{{ product.rating }}</span>
                    </div>
                  </div>
                  <ElButton type="primary" class="add-to-cart-btn" @click.stop="addToCart(product)">
                    <ElIcon><ShoppingBag /></ElIcon>
                    Add to Cart
                  </ElButton>
                </div>
              </div>
            </ElCard>
          </ElCol>
        </ElRow>

        <!-- Empty State -->
        <div v-if="filteredProducts.length === 0" class="empty-state">
          <h3>No products found</h3>
          <p>Try adjusting your filters to see more products</p>
          <ElButton @click="resetAllFilters" type="primary">Reset Filters</ElButton>
        </div>
      </ElCol>
    </ElRow>
  </div>
</template>

<style scoped>
.products-container {
  width: 100%;
  max-width: 100%;
  padding: 20px 30px;
  margin: 0 auto;
}

.page-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.products-layout {
  width: 100%;
  margin: 0;
}

/* Filters Sidebar */
.filters-sidebar {
  padding-right: 20px;
}

.filters-container {
  background: #fff;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 20px;
}

.filters-title {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.filter-section h3 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 15px;
}

.price-range {
  margin-top: 10px;
  text-align: center;
  color: #666;
  font-weight: 500;
}

.filter-actions {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.results-info {
  color: #666;
  font-size: 1.1rem;
}

/* Products Grid */
.products-grid {
  padding-left: 20px;
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.products-list {
  width: 100%;
}

.product-col {
  margin-bottom: 30px;
}

.product-card {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 1.4rem;
  margin-bottom: 5px;
  color: #333;
}

.product-category {
  color: #ff6b6b;
  font-weight: 500;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.product-description {
  color: #666;
  margin-bottom: 15px;
  flex: 1;
  font-size: 0.95rem;
  line-height: 1.5;
}

.product-footer {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.product-price-rating {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff6b6b;
}

.product-rating span {
  color: #666;
  font-weight: 500;
}

.add-to-cart-btn {
  width: 100%;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa502 100%);
  border: none;
  color: white;
  font-weight: 500;
  padding: 12px;
}

.add-to-cart-btn:hover {
  background: linear-gradient(135deg, #ff5252 0%, #ff9800 100%);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 50px 20px;
  background: #fafafa;
  border-radius: 15px;
  margin-top: 30px;
}

.empty-state h3 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 15px;
}

.empty-state p {
  color: #666;
  margin-bottom: 25px;
  font-size: 1.1rem;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .product-col {
    width: 50%;
    flex: 0 0 50%;
  }
}

@media (max-width: 992px) {
  .filters-sidebar,
  .products-grid {
    width: 100%;
  }

  .filters-sidebar {
    padding-right: 0;
    margin-bottom: 30px;
  }

  .products-grid {
    padding-left: 0;
  }

  .products-layout {
    flex-direction: column;
  }

  .product-col {
    width: 100%;
    flex: 0 0 100%;
  }
}

@media (max-width: 768px) {
  .products-container {
    padding: 15px 20px;
  }

  .page-title {
    font-size: 2rem;
  }

  .filters-container {
    padding: 20px;
  }

  .products-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
}
</style>
