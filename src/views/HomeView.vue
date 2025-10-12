<script setup lang="ts">
import { ref } from 'vue'
import { ElCarousel, ElCarouselItem, ElRow, ElCol, ElCard, ElButton, ElIcon } from 'element-plus'
import { Dish, ShoppingBag, Star, Clock, Van } from '@element-plus/icons-vue'

// Featured pasta products with local images
const featuredPasta = ref([
  {
    id: 1,
    name: 'Fresh Fettuccine',
    description: 'Handmade flat ribbon pasta, perfect with creamy sauces',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1515516484336-59005480b4d6?w=400&h=300&fit=crop',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Artisanal Ravioli',
    description: 'Delicate pasta pockets filled with ricotta and spinach',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1608496776497-46b4b1c1f5e3?w=400&h=300&fit=crop',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Homemade Pappardelle',
    description: 'Wide egg pasta ribbons, ideal for rich meat sauces',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1616089080075-0f507671b1a4?w=400&h=300&fit=crop',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Traditional Tagliatelle',
    description: 'Classic cut pasta, excellent with bolognese sauce',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1585951636944-300a6dae8644?w=400&h=300&fit=crop',
    rating: 4.9,
  },
])

// Benefits data
const benefits = ref([
  {
    icon: Dish,
    title: 'Fresh Ingredients',
    description: 'Made daily with the finest organic ingredients',
  },
  {
    icon: Clock,
    title: 'Made to Order',
    description: 'Prepared fresh when you place your order',
  },
  {
    icon: Van,
    title: 'Fast Delivery',
    description: 'Delivered to your door within 24 hours',
  },
  {
    icon: Star,
    title: 'Top Quality',
    description: 'Handcrafted with love and attention to detail',
  },
])

// Handle image error
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (target) {
    target.src = 'https://placehold.co/300x180/ff6b6b/ffffff?text=Fresh+Pasta'
  }
}
</script>

<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Authentic Homemade Pasta</h1>
        <p class="hero-subtitle">Crafted with passion, delivered with care</p>
        <div class="hero-buttons">
          <el-button type="primary" size="large" :icon="ShoppingBag"> Shop Now </el-button>
          <el-button type="warning" size="large" plain> View Menu </el-button>
        </div>
      </div>
    </section>

    <!-- Featured Products Carousel -->
    <section class="featured-section">
      <h2 class="section-title">Featured Pasta Creations</h2>
      <p class="section-subtitle">Our most popular handmade pasta dishes</p>

      <el-carousel :interval="4000" type="card" height="550px" class="products-carousel">
        <el-carousel-item v-for="pasta in featuredPasta" :key="pasta.id" class="carousel-item">
          <el-card class="product-card">
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
              <el-button type="primary" class="add-to-cart-btn"> Add to Cart </el-button>
            </div>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </section>

    <!-- Benefits Section -->
    <section class="benefits-section">
      <h2 class="section-title">Why Choose Our Pasta</h2>
      <p class="section-subtitle">Experience the difference of homemade quality</p>

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
        <h2 class="cta-title">Ready to Taste the Difference?</h2>
        <p class="cta-subtitle">Order now and get 10% off your first purchase</p>
        <el-button type="warning" size="large" :icon="ShoppingBag"> Order Now </el-button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  width: 95%;
  max-width: 99%;
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

.benefits-grid {
  margin-top: 30px;
  width: 100%;
}

.benefit-col {
  display: flex;
  justify-content: center;
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
