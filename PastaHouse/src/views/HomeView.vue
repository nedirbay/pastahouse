<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElCarousel, ElCarouselItem, ElRow, ElCol, ElCard, ElButton, ElIcon } from 'element-plus'
import { Dish, ShoppingBag, Star, Clock, Van } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { productService } from '@/services/productService'

const router = useRouter()

// Latest products
const latestProducts = ref<any[]>([])

// Loading state
const loading = ref(false)

// Featured pasta products (existing mock data)
const featuredPasta = ref([
  {
    id: 1,
    name: 'Taze Fettuccine',
    description: 'El yapımı düz şerit makarna, krema soslarla mükemmel',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1515516484336-59005480b4d6?w=400&h=300&fit=crop',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Zanaatkar Ravioli',
    description: 'Ricotta ve ıspanakla doldurulmuş hassas makarna poşetleri',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1608496776497-46b4b1c1f5e3?w=400&h=300&fit=crop',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Ev Yapımı Pappardelle',
    description: 'Geniş yumurta makarna şeritleri, zengin et sosları için ideal',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1616089080075-0f507671b1a4?w=400&h=300&fit=crop',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Geleneksel Tagliatelle',
    description: 'Klasik kesim makarna, bolognese sosla mükemmel',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1585951636944-300a6dae8644?w=400&h=300&fit=crop',
    rating: 4.9,
  },
])

// Benefits data
const benefits = ref([
  {
    icon: Dish,
    title: 'Taze Malzemeler',
    description: 'Günlük olarak en iyi organik malzemelerle hazırlanır',
  },
  {
    icon: Clock,
    title: 'Sipariş Üzerine Hazırlanır',
    description: 'Sipariş verdiğinizde taze hazırlanır',
  },
  {
    icon: Van,
    title: 'Hızlı Teslimat',
    description: '24 saat içinde kapınıza teslim edilir',
  },
  {
    icon: Star,
    title: 'Üstün Kalite',
    description: 'Sevgiyle ve detaylara dikkat ederek el yapımı',
  },
])

// Fetch latest products from API
const fetchLatestProducts = async () => {
  loading.value = true
  try {
    // Get products ordered by id in descending order (latest first) and limit to 5
    const response = await productService.getProducts({
      ordering: '-id',
      limit: 5,
    })

    // Map the products to match the existing structure
    latestProducts.value = response.products.map((product: any) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      rating: 4.5, // Default rating since it's not in the API response
    }))
  } catch (error) {
    console.error('Failed to fetch latest products:', error)
  } finally {
    loading.value = false
  }
}

// Handle image error
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (target) {
    target.src = 'https://placehold.co/300x180/ff6b6b/ffffff?text=Taze+Makarna'
  }
}

// Navigate to product detail
const goToProductDetail = (productId: number) => {
  router.push(`/product/${productId}`)
}

// Go to products page
const goToProducts = () => {
  router.push('/products')
}

// Fetch latest products when component is mounted
onMounted(() => {
  fetchLatestProducts()
})
</script>

<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Orijinal Ev Yapımı Makarna</h1>
        <p class="hero-subtitle">Tutkuyla hazırlanır, özenle teslim edilir</p>
        <div class="hero-buttons">
          <el-button type="primary" size="large" :icon="ShoppingBag" @click="goToProducts">
            Şimdi Alışveriş Yap
          </el-button>
          <el-button type="warning" size="large" plain @click="goToProducts">
            Menüyü Gör
          </el-button>
        </div>
      </div>
    </section>

    <!-- Latest Products Section -->
    <section class="latest-products-section">
      <h2 class="section-title">Yeni Eklenen Ürünler</h2>
      <p class="section-subtitle">En yeni makarna çeşitlerimiz</p>

      <div v-if="loading" class="loading-container">
        <p>Ürünler yükleniyor...</p>
      </div>

      <el-row v-else :gutter="20" class="products-list">
        <el-col v-for="product in latestProducts" :key="product.id" :span="4" class="product-col">
          <el-card class="product-card" @click="goToProductDetail(product.id)">
            <img
              :src="product.image"
              :alt="product.name"
              class="product-image"
              @error="handleImageError"
            />
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-description">{{ product.description }}</p>
              <div class="product-footer">
                <span class="product-price">${{ product.price }}</span>
                <div class="product-rating">
                  <el-icon color="#FFD700"><Star /></el-icon>
                  <span>{{ product.rating }}</span>
                </div>
              </div>
              <el-button type="primary" class="add-to-cart-btn" @click.stop>
                Sepete Ekle
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <div v-if="!loading && latestProducts.length === 0" class="empty-state">
        <p>Henüz ürün eklenmemiş.</p>
      </div>
    </section>

    <!-- Featured Products Carousel -->
    <section class="featured-section">
      <h2 class="section-title">Öne Çıkan Makarna Yaratımları</h2>
      <p class="section-subtitle">En popüler el yapımı makarna yemeklerimiz</p>

      <el-carousel :interval="4000" type="card" height="550px" class="products-carousel">
        <el-carousel-item v-for="pasta in featuredPasta" :key="pasta.id" class="carousel-item">
          <el-card class="product-card" @click="goToProductDetail(pasta.id)">
            <img
              :src="pasta.image"
              :alt="pasta.name"
              class="product-image"
              @error="handleImageError"
            />
            <div class="product-info">
              <h3 class="product-name">{{ pasta.name }}</h3>
              <p class="product-description">{{ pasta.description }}</p>
              <div class="product-footer">
                <span class="product-price">${{ pasta.price }}</span>
                <div class="product-rating">
                  <el-icon color="#FFD700"><Star /></el-icon>
                  <span>{{ pasta.rating }}</span>
                </div>
              </div>
              <el-button type="primary" class="add-to-cart-btn" @click.stop>
                Sepete Ekle
              </el-button>
            </div>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </section>

    <!-- Benefits Section -->
    <section class="benefits-section">
      <h2 class="section-title">Neden Bizim Makarnamızı Seçmelisiniz</h2>
      <p class="section-subtitle">Ev yapımı kalitenin farkını yaşayın</p>

      <el-row :gutter="30" class="benefits-grid">
        <el-col :span="6" v-for="(benefit, index) in benefits" :key="index" class="benefit-col">
          <el-card class="benefit-card">
            <el-icon :size="40" class="benefit-icon">
              <component :is="benefit.icon" />
            </el-icon>
            <h3 class="benefit-title">{{ benefit.title }}</h3>
            <p class="benefit-description">{{ benefit.description }}</p>
          </el-card>
        </el-col>
      </el-row>
    </section>

    <!-- Call to Action -->
    <section class="cta-section">
      <div class="cta-content">
        <h2 class="cta-title">Farkı Tadına Hazır mısınız?</h2>
        <p class="cta-subtitle">Şimdi sipariş verin ve ilk alışverişinizde %10 indirim kazanın</p>
        <el-button type="warning" size="large" :icon="ShoppingBag" @click="goToProducts">
          Sipariş Ver
        </el-button>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Hide scrollbars */
::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for Firefox */
* {
  scrollbar-width: none;
}

.home-container {
  width: 95%;
  max-width: 95%;
  padding: 0;
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa502 100%);
  padding: 80px 40px;
  text-align: center;
  margin-bottom: 50px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100vw;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 30px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.hero-buttons .el-button {
  margin: 0 10px;
}

.hero-buttons .el-button:first-child {
  background: #fff;
  color: #ff6b6b;
  border: none;
}

.hero-buttons .el-button:first-child:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
}

.hero-buttons .el-button:last-child {
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
}

.hero-buttons .el-button:last-child:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* Latest Products Section */
.latest-products-section {
  margin-bottom: 50px;
  text-align: center;
  width: 100%;
  padding: 0 20px;
}

.loading-container {
  padding: 40px;
  text-align: center;
}

.empty-state {
  padding: 40px;
  text-align: center;
  color: #666;
}

.products-list {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.product-col {
  margin-bottom: 20px;
  display: flex;
  flex: 0 0 20%;
  max-width: 20%;
}

/* Featured Products Section */
.featured-section {
  margin-bottom: 50px;
  text-align: center;
  width: 100%;
  padding: 0 20px;
}

.section-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
}

.products-carousel {
  margin-top: 30px;
  width: 100%;
}

.carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-card {
  width: 300px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.product-info {
  padding: 20px;
}

.product-name {
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: #333;
}

.product-description {
  color: #666;
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.product-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #ff6b6b;
}

.product-rating {
  display: flex;
  align-items: center;
}

.product-rating span {
  margin-left: 5px;
  color: #666;
}

.add-to-cart-btn {
  width: 100%;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa502 100%);
  border: none;
  color: white;
}

/* Benefits Section */
.benefits-section {
  margin-bottom: 50px;
  text-align: center;
  width: 100%;
  padding: 0 20px;
}

.benefit-card {
  width: 100%;
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s ease;
  border: 1px solid #eee;
}

.benefit-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.benefit-icon {
  margin: 20px 0;
  color: #ff6b6b;
}

.benefit-title {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: #333;
}

.benefit-description {
  color: #666;
  padding: 0 10px 20px;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  padding: 60px 40px;
  text-align: center;
  margin-bottom: 30px;
  width: calc(100% - 40px);
  margin-left: 20px;
  margin-right: 20px;
}

.cta-title {
  font-size: 2.5rem;
  color: white;
  margin-bottom: 20px;
}

.cta-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 30px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .benefits-grid {
    flex-direction: column;
  }

  .benefit-col {
    width: 100%;
    margin-bottom: 20px;
  }

  .cta-title {
    font-size: 2rem;
  }

  .cta-section {
    width: calc(100% - 20px);
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
