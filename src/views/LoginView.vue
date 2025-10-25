<script setup lang="ts">
import { ref } from 'vue'
import {
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElCheckbox,
  ElIcon,
  ElMessage,
} from 'element-plus'
import { User, Lock, ArrowRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { authService } from '@/services/authService'

const userStore = useUserStore()
const router = useRouter()

const loginForm = ref({
  username: '',
  password: '',
  rememberMe: false,
})

const loading = ref(false)

const handleLogin = async () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    ElMessage.error('Please fill in all fields')
    return
  }

  loading.value = true

  try {
    // Use the actual authentication service
    const response = await authService.obtainToken({
      email: loginForm.value.username,
      password: loginForm.value.password,
    })

    // Store the tokens
    localStorage.setItem('token', response.access)
    localStorage.setItem('refreshToken', response.refresh)

    // For login, we need to get user data. Since the token endpoint doesn't return user data,
    // we'll need to make a separate call to get user profile or assume a default structure.
    // In a real app, you might want to fetch the user profile from a dedicated endpoint.

    // For now, let's redirect to home and let the app handle user data loading
    ElMessage.success('Login successful!')
    router.push('/')
  } catch (error: any) {
    console.error('Login error:', error)
    ElMessage.error(error.response?.data?.detail || 'Login failed. Please check your credentials.')
  } finally {
    loading.value = false
  }
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
          <el-button
            type="primary"
            size="large"
            class="login-button"
            @click="handleLogin"
            :loading="loading"
          >
            Sign In
            <el-icon class="login-icon"><ArrowRight /></el-icon>
          </el-button>
        </el-form-item>
      </el-form>

      <div class="signup-link">
        <p>Don't have an account? <RouterLink to="/auth/register">Sign up</RouterLink></p>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
/* ... existing style code ... */
</style>
