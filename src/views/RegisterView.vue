<script setup lang="ts">
import { ref } from 'vue'
import { ElCard, ElForm, ElFormItem, ElInput, ElButton, ElIcon, ElMessage } from 'element-plus'
import { User, Lock, Message, ArrowRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { authService } from '@/services/authService'

const userStore = useUserStore()
const router = useRouter()

const registerForm = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const loading = ref(false)

const handleRegister = async () => {
  if (
    !registerForm.value.name ||
    !registerForm.value.email ||
    !registerForm.value.password ||
    !registerForm.value.confirmPassword
  ) {
    ElMessage.error('Please fill in all fields')
    return
  }

  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    ElMessage.error('Passwords do not match')
    return
  }

  if (registerForm.value.password.length < 6) {
    ElMessage.error('Password must be at least 6 characters')
    return
  }

  loading.value = true

  try {
    // Use the actual authentication service to register
    const response = await authService.register({
      name: registerForm.value.name,
      email: registerForm.value.email,
      password: registerForm.value.password,
    })

    // Store the tokens
    localStorage.setItem('token', response.tokens.access)
    localStorage.setItem('refreshToken', response.tokens.refresh)

    // Store user data in Pinia store
    userStore.login({
      id: response.id,
      name: response.name,
      email: response.email,
    })

    ElMessage.success('Registration successful!')
    router.push('/')
  } catch (error: any) {
    console.error('Registration error:', error)
    ElMessage.error(
      error.response?.data?.message ||
        error.response?.data?.detail ||
        'Registration failed. Please try again.',
    )
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="register-container">
    <el-card class="register-card">
      <div class="card-header">
        <h2>Create Account</h2>
        <p>Join our pasta lovers community</p>
      </div>

      <el-form :model="registerForm" class="register-form">
        <el-form-item>
          <el-input
            v-model="registerForm.name"
            placeholder="Full Name"
            size="large"
            :prefix-icon="User"
          />
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="registerForm.email"
            placeholder="Email Address"
            size="large"
            type="email"
            :prefix-icon="Message"
          />
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="Password"
            size="large"
            :prefix-icon="Lock"
          />
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="Confirm Password"
            size="large"
            :prefix-icon="Lock"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="register-button"
            @click="handleRegister"
            :loading="loading"
          >
            Create Account
            <el-icon class="register-icon"><ArrowRight /></el-icon>
          </el-button>
        </el-form-item>
      </el-form>

      <div class="login-link">
        <p>Already have an account? <RouterLink to="/auth/login">Sign in</RouterLink></p>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
/* ... existing style code ... */
</style>
