<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { ElHeader, ElMain, ElFooter, ElContainer } from 'element-plus'
import { Search, User, ShoppingCart } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

// Cart item count (in a real app, this would come from a store)
const cartItemCount = computed(() => userStore.cartItemCount)
</script>

<template>
  <el-container class="app-container">
    <el-header class="app-header">
      <div class="header-content">
        <div class="logo">
          <RouterLink to="/" class="logo-link" style="text-decoration: none">
            <h1>PastaHouse</h1>
          </RouterLink>
        </div>
        <nav class="main-nav">
          <RouterLink to="/" class="nav-link">Baş sahypa</RouterLink>
          <RouterLink to="/products" class="nav-link">Kategoriýalar</RouterLink>
          <RouterLink to="/about" class="nav-link">Biz barada</RouterLink>
          <RouterLink to="/contact" class="nav-link">Habarlaşmak</RouterLink>
        </nav>
        <div class="header-actions" style="margin-right: 60px">
          <button class="action-btn">
            <el-icon><Search /></el-icon>
          </button>
          <button class="action-btn">
            <el-icon><User /></el-icon>
          </button>
          <RouterLink to="/cart" class="action-btn cart-btn">
            <el-icon><ShoppingCart /></el-icon>
            <span v-if="cartItemCount > 0" class="cart-count">{{ cartItemCount }}</span>
          </RouterLink>
        </div>
      </div>
    </el-header>

    <el-main class="app-main">
      <RouterView />
    </el-main>

    <el-footer class="app-footer">
      <div class="footer-bottom">
        <p>&copy; 2025 Router. Tüm hakları saklıdır.</p>
      </div>
    </el-footer>
  </el-container>
</template>

<style scoped>
/* Hide scrollbars */
::-webkit-scrollbar {
  display: none;
}

* {
  scrollbar-width: none;
}

.app-container {
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
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
  gap: 24px;
}

.action-btn {
  background: transparent;
  border: none;
  color: white;
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

.action-btn :deep(.el-icon) {
  font-size: 1.2rem;
  width: 1em;
  height: 1em;
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
  position: relative;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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

  .footer-bottom {
    padding: 15px 20px;
  }
}
</style>
