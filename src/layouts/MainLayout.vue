<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { ElHeader, ElMain, ElFooter, ElContainer } from 'element-plus'

// Cart item count (in a real app, this would come from a store)
const cartItemCount = ref(6)
</script>

<template>
  <el-container class="app-container">
    <el-header class="app-header">
      <div class="header-content">
        <div class="logo">
          <h1>PastaHouse</h1>
        </div>
        <nav class="main-nav">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
          <RouterLink to="/products" class="nav-link">Products</RouterLink>
          <RouterLink to="/about" class="nav-link">About</RouterLink>
          <a href="#" class="nav-link">Contact</a>
        </nav>
        <div class="header-actions">
          <button class="action-btn">
            <i class="fas fa-search"></i>
          </button>
          <button class="action-btn">
            <i class="fas fa-user"></i>
          </button>
          <RouterLink to="/cart" class="action-btn cart-btn">
            <i class="fas fa-shopping-cart"></i>
            <span v-if="cartItemCount > 0" class="cart-count">{{ cartItemCount }}</span>
          </RouterLink>
        </div>
      </div>
    </el-header>

    <el-main class="app-main">
      <RouterView />
    </el-main>

    <el-footer class="app-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>PastaHouse</h3>
          <p>Bringing homemade pasta love to your table since 2023.</p>
        </div>
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Menu</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Contact Us</h4>
          <p>Email: info@pastahouse.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 PastaHouse. All rights reserved.</p>
      </div>
    </el-footer>
  </el-container>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

.app-header {
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa502 100%);
  padding: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin: 0;
}

.header-content {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
}

.logo h1 {
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  margin: 0;
  padding: 0;
}

.main-nav {
  display: flex;
  gap: 30px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 20px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  background: rgba(255, 255, 255, 0.2);
}

.header-actions {
  display: flex;
  gap: 15px;
}

.action-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  margin: 0;
  padding: 0;
  position: relative;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.cart-btn {
  position: relative;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff6b6b;
  color: white;
  font-size: 0.7rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-main {
  padding: 0;
  flex: 1;
  width: 100%;
  margin: 0;
}

.app-footer {
  background: #333;
  color: white;
  padding: 0;
  width: 100%;
  margin: 0;
}

.footer-content {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 40px 30px;
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: 20px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: white;
}

.footer-section p {
  color: #ccc;
  margin-bottom: 10px;
}

.footer-bottom {
  border-top: 1px solid #555;
  text-align: center;
  padding: 20px 30px;
  color: #aaa;
  margin: 0;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: row;
    gap: 15px;
    padding: 15px 20px;
    flex-wrap: wrap;
  }

  .logo h1 {
    font-size: 1.5rem;
  }

  .main-nav {
    gap: 15px;
    order: 3;
    width: 100%;
    justify-content: center;
  }

  .header-actions {
    gap: 10px;
  }

  .footer-content {
    flex-direction: column;
    gap: 30px;
    padding: 30px 20px;
  }

  .footer-bottom {
    padding: 15px 20px;
  }
}
</style>
