<script setup lang="ts">
import { ref } from 'vue'
import { ElCard, ElForm, ElFormItem, ElInput, ElButton, ElIcon, ElMessage } from 'element-plus'
import { User, Lock, Message, ArrowRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, we'll accept any valid input
    // In a real app, you would validate with a backend API
    userStore.register({
      id: Date.now(),
      name: registerForm.value.name,
      email: registerForm.value.email,
    })

    ElMessage.success('Registration successful!')
    router.push('/')
  } catch (error) {
    ElMessage.error('Registration failed. Please try again.')
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
.register-container {
  width: 100%;
  max-width: 450px;
  padding: 20px;
}

.register-card {
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

.register-form {
  margin-bottom: 20px;
}

:deep(.el-input__wrapper) {
  border-radius: 30px;
  padding: 5px 20px;
}

.register-button {
  width: 100%;
  border-radius: 30px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa502 100%);
  border: none;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 15px;
}

.register-icon {
  margin-left: 10px;
}

.login-link {
  text-align: center;
  margin-top: 20px;
}

.login-link p {
  color: #666;
}

.login-link a {
  color: #ff6b6b;
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
