<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ElHeader, ElMain, ElFooter, ElContainer } from 'element-plus'
</script>

<template>
  <el-container class="auth-container">
    <el-header class="auth-header">
      <div class="header-content">
        <div class="logo">
          <RouterLink to="/">
            <h1>PastaHouse</h1>
          </RouterLink>
        </div>
      </div>
    </el-header>

    <el-main class="auth-main">
      <RouterView />
    </el-main>

    <el-footer class="auth-footer">
      <div class="footer-content">
        <p>&copy; 2025 PastaHouse. All rights reserved.</p>
      </div>
    </el-footer>
  </el-container>
</template>

<style scoped>
.auth-container {
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
}

.auth-header {
  background: rgba(255, 255, 255, 0.1);
  padding: 0;
  backdrop-filter: blur(10px);
  width: 100%;
  margin: 0;
}

.header-content {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 30px;
}

.logo h1 {
  color: white;
  font-size: 2rem;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  margin: 0;
  padding: 0;
}

.logo a {
  text-decoration: none;
}

.auth-main {
  padding: 0;
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  margin: 0;
}

.auth-footer {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 0;
  backdrop-filter: blur(10px);
  width: 100%;
  margin: 0;
}

.footer-content {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 20px 30px;
}

@media (max-width: 768px) {
  .header-content {
    padding: 15px 20px;
  }

  .logo h1 {
    font-size: 1.5rem;
  }

  .footer-content {
    padding: 15px 20px;
  }
}
</style>
