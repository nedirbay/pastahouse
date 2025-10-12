<script setup lang="ts">
import { ref } from 'vue'
import { ElCard, ElForm, ElFormItem, ElInput, ElButton, ElCheckbox, ElIcon } from 'element-plus'
import { User, Lock, ArrowRight } from '@element-plus/icons-vue'

const loginForm = ref({
  username: '',
  password: '',
  rememberMe: false,
})

const handleLogin = () => {
  console.log('Login attempt:', loginForm.value)
  // Here you would normally send the login request to your backend
}
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <div class="card-header">
        <h2>Welcome Back!</h2>
        <p>Sign in to your PastaHouse account</p>
      </div>

      <el-form :model="loginForm" class="login-form">
        <el-form-item>
          <el-input
            v-model="loginForm.username"
            placeholder="Username or Email"
            size="large"
            :prefix-icon="User"
          />
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="Password"
            size="large"
            :prefix-icon="Lock"
          />
        </el-form-item>

        <div class="form-options">
          <el-checkbox v-model="loginForm.rememberMe">Remember me</el-checkbox>
          <a href="#" class="forgot-password">Forgot password?</a>
        </div>

        <el-form-item>
          <el-button type="primary" size="large" class="login-button" @click="handleLogin">
            Sign In
            <el-icon class="login-icon"><ArrowRight /></el-icon>
          </el-button>
        </el-form-item>
      </el-form>

      <div class="signup-link">
        <p>Don't have an account? <RouterLink to="/register">Sign up</RouterLink></p>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  width: 100%;
  max-width: 450px;
  padding: 20px;
}

.login-card {
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: none;
}

.card-header {
  text-align: center;
  margin-bottom: 30px;
}

.card-header h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
}

.card-header p {
  color: #666;
  font-size: 1rem;
}

.login-form {
  margin-bottom: 20px;
}

:deep(.el-input__wrapper) {
  border-radius: 30px;
  padding: 5px 20px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.forgot-password {
  color: #ff6b6b;
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
  width: 100%;
  border-radius: 30px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa502 100%);
  border: none;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 15px;
}

.login-icon {
  margin-left: 10px;
}

.signup-link {
  text-align: center;
  margin-top: 20px;
}

.signup-link p {
  color: #666;
}

.signup-link a {
  color: #ff6b6b;
  text-decoration: none;
  font-weight: 500;
}

.signup-link a:hover {
  text-decoration: underline;
}
</style>
