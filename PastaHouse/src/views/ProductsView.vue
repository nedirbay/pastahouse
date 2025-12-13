<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
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
  ElLoading,
} from 'element-plus'
import { Star, ShoppingBag, Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { productService } from '@/services/productService'

const router = useRouter()
const userStore = useUserStore()

// Product data - Updated to match new API structure
interface Product {
  id: number
  name: string
  description: string
  price: string // Changed from number to string to match API
  image: string
  rating: string // Changed from number to string to match API
  category: {
    id: number
    name: string
    description: string
    created_at: string
    updated_at: string
  } // Changed to full category object
  tags: Array<{
    id: number
    name: string
    description: string
    created_at: string
    updated_at: string
  }> // Changed to full tag objects
  in_stock: boolean
  quantity: number
  created_at: string
  updated_at: string
}

// Filter options - Updated to match new API structure
interface Category {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
  count: number
}

interface Tag {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
  count: number
}

const products = ref<Product[]>([])
const loading = ref(false)

// Filter options
const categories = ref<Category[]>([])
const tags = ref<Tag[]>([])

// Filter state
const filters = reactive({
  search: '',
  categories: [] as number[], // Store category IDs
  tags: [] as number[], // Store tag IDs
  priceRange: [0, 50] as [number, number],
  rating: 0,
})

// Filtered products
const filteredProducts = ref<Product[]>([])

// Fetch latest products from API
const fetchProducts = async () => {
  loading.value = true
  try {
    // Use the new endpoint to get latest products
    const response = await productService.getLatestProducts({ count: 10 })
    products.value = response
    filteredProducts.value = [...products.value]
  } catch (error) {
    console.error('Ürünler getirilemedi:', error)
    ElMessage.error('Ürünler yüklenemedi. Lütfen daha sonra tekrar deneyin.')
  } finally {
    loading.value = false
  }
}

// Fetch categories from API
const fetchCategories = async () => {
  try {
    const response = await productService.getCategories()
    categories.value = response.map((category) => ({
      ...category,
      count: 0, // Would need to calculate count from products
    }))
  } catch (error) {
    console.error('Kategoriler getirilemedi:', error)
  }
}

// Fetch tags from API
const fetchTags = async () => {
  try {
    const response = await productService.getTags()
    tags.value = response.map((tag) => ({
      ...tag,
      count: 0, // Would need to calculate count from products
    }))
  } catch (error) {
    console.error('Etiketler getirilemedi:', error)
  }
}

// Toggle category filter
const toggleCategory = (categoryId: number) => {
  const index = filters.categories.indexOf(categoryId)
  if (index > -1) {
    filters.categories.splice(index, 1)
  } else {
    filters.categories.push(categoryId)
  }
  applyFilters()
}

// Toggle tag filter
const toggleTag = (tagId: number) => {
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
    if (filters.categories.length > 0 && !filters.categories.includes(product.category.id)) {
      return false
    }

    // Tag filter
    if (filters.tags.length > 0) {
      const hasTag = filters.tags.some((tagId) => product.tags.some((tag) => tag.id === tagId))
      if (!hasTag) return false
    }

    // Price filter - Convert string price to number for comparison
    const productPrice = parseFloat(product.price)
    if (productPrice < filters.priceRange[0] || productPrice > filters.priceRange[1]) {
      return false
    }

    // Rating filter - Convert string rating to number for comparison
    const productRating = parseFloat(product.rating)
    if (filters.rating > 0 && productRating < filters.rating) {
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
  filters.priceRange = [0, 50]
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
    ElMessage.warning('Sepete ürün eklemek için lütfen giriş yapın')
    router.push('/auth/login')
    return
  }

  userStore.addToCart({
    productId: product.id,
    name: product.name,
    description: product.description,
    price: parseFloat(product.price), // Convert string to number
    image: product.image,
    quantity: 1,
    maxQuantity: product.quantity, // Use actual quantity from product
  })

  ElMessage.success(`${product.name} sepete eklendi!`)
}

// Fetch products, categories, and tags when component is mounted
onMounted(() => {
  fetchProducts()
  fetchCategories()
  fetchTags()
})
</script>

<template>
  <div class="products-container">
    <h1 class="page-title">Makarna Koleksiyonumuz</h1>

    <ElRow :gutter="30" class="products-layout">
      <!-- Filters Sidebar -->
      <ElCol :span="6" class="filters-sidebar">
        <div class="filters-container">
          <h2 class="filters-title">Filtreler</h2>

          <!-- Search Filter -->
          <div class="filter-section">
            <h3>Arama</h3>
            <ElInput
              v-model="filters.search"
              placeholder="Ürün ara..."
              :prefix-icon="Search"
              @input="applyFilters"
            />
          </div>

          <!-- Category Filter -->
          <div class="filter-section">
            <h3>Kategoriler</h3>
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
            <h3>Diyet Tercihleri</h3>
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
            <h3>Fiyat Aralığı</h3>
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
            <h3>Minimum Puan</h3>
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
              <ElButton type="default" @click="clearRating" plain> Temizle </ElButton>
            </div>
          </div>

          <!-- Reset Button -->
          <div class="filter-actions">
            <ElButton @click="resetAllFilters" type="danger" plain>
              Tüm Filtreleri Sıfırla
            </ElButton>
          </div>
        </div>
      </ElCol>

      <!-- Products Grid -->
      <ElCol :span="18" class="products-grid">
        <div class="products-header">
          <div class="results-info">
            {{ products.length }} üründen {{ filteredProducts.length }} tanesi gösteriliyor
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
                <p class="product-category">{{ product.category.name }}</p>
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
                    Sepete Ekle
                  </ElButton>
                </div>
              </div>
            </ElCard>
          </ElCol>
        </ElRow>

        <!-- Empty State -->
        <div v-if="filteredProducts.length === 0" class="empty-state">
          <h3>Ürün bulunamadı</h3>
          <p>Daha fazla ürün görmek için filtrelerinizi ayarlamayı deneyin</p>
          <ElButton @click="resetAllFilters" type="primary">Filtreleri Sıfırla</ElButton>
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
