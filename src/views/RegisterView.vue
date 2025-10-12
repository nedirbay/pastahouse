<script setup lang="ts">
import { ref } from 'vue'
import { ElCard, ElForm, ElFormItem, ElInput, ElButton, ElIcon } from 'element-plus'
import { User, Lock, Message, ArrowRight } from '@element-plus/icons-vue'

const registerForm = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const handleRegister = () => {
  console.log('Register attempt:', registerForm.value)
  // Here you would normally send the registration request to your backend
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
          <el-button type="primary" size="large" class="register-button" @click="handleRegister">
            Create Account
            <el-icon class="register-icon"><ArrowRight /></el-icon>
          </el-button>
        </el-form-item>
      </el-form>

      <div class="login-link">
        <p>Already have an account? <RouterLink to="/login">Sign in</RouterLink></p>
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
