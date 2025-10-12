<script setup lang="ts">
import { ref } from 'vue'
import {
  ElRow,
  ElCol,
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElMessage,
} from 'element-plus'
import { User, Message, Phone, Location, Clock } from '@element-plus/icons-vue'

const contactForm = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const loading = ref(false)

const submitContactForm = async () => {
  if (!contactForm.value.name || !contactForm.value.email || !contactForm.value.message) {
    ElMessage.error('Please fill in all required fields')
    return
  }

  loading.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    ElMessage.success('Message sent successfully! We will contact you soon.')

    // Reset form
    contactForm.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    }
  } catch (error) {
    ElMessage.error('Failed to send message. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="contact-container">
    <h1 class="page-title">Contact Us</h1>

    <ElRow :gutter="30" class="contact-layout">
      <!-- Contact Information -->
      <ElCol :span="8" class="contact-info-col">
        <ElCard class="contact-info-card">
          <h2>Get In Touch</h2>
          <p>Have questions about our pasta or services? We'd love to hear from you!</p>

          <div class="contact-item">
            <ElIcon class="contact-icon"><Location /></ElIcon>
            <div class="contact-details">
              <h3>Address</h3>
              <p>123 Pasta Street<br />Food District, FD 12345</p>
            </div>
          </div>

          <div class="contact-item">
            <ElIcon class="contact-icon"><Phone /></ElIcon>
            <div class="contact-details">
              <h3>Phone</h3>
              <p>(123) 456-7890</p>
            </div>
          </div>

          <div class="contact-item">
            <ElIcon class="contact-icon"><Message /></ElIcon>
            <div class="contact-details">
              <h3>Email</h3>
              <p>info@pastahouse.com</p>
            </div>
          </div>

          <div class="contact-item">
            <ElIcon class="contact-icon"><Clock /></ElIcon>
            <div class="contact-details">
              <h3>Opening Hours</h3>
              <p>Monday - Friday: 9:00 AM - 8:00 PM<br />Saturday - Sunday: 10:00 AM - 6:00 PM</p>
            </div>
          </div>
        </ElCard>
      </ElCol>

      <!-- Contact Form -->
      <ElCol :span="16" class="contact-form-col">
        <ElCard class="contact-form-card">
          <h2>Send Us a Message</h2>

          <ElForm :model="contactForm" class="contact-form">
            <ElRow :gutter="20">
              <ElCol :span="12">
                <ElFormItem label="Full Name" required>
                  <ElInput
                    v-model="contactForm.name"
                    placeholder="Your full name"
                    :prefix-icon="User"
                  />
                </ElFormItem>
              </ElCol>

              <ElCol :span="12">
                <ElFormItem label="Email Address" required>
                  <ElInput
                    v-model="contactForm.email"
                    type="email"
                    placeholder="Your email address"
                    :prefix-icon="Message"
                  />
                </ElFormItem>
              </ElCol>
            </ElRow>

            <ElRow :gutter="20">
              <ElCol :span="12">
                <ElFormItem label="Phone Number">
                  <ElInput
                    v-model="contactForm.phone"
                    placeholder="Your phone number"
                    :prefix-icon="Phone"
                  />
                </ElFormItem>
              </ElCol>

              <ElCol :span="12">
                <ElFormItem label="Subject">
                  <ElInput v-model="contactForm.subject" placeholder="Subject of your message" />
                </ElFormItem>
              </ElCol>
            </ElRow>

            <ElFormItem label="Message" required>
              <ElInput
                v-model="contactForm.message"
                type="textarea"
                :rows="6"
                placeholder="Your message..."
              />
            </ElFormItem>

            <ElFormItem>
              <ElButton
                type="primary"
                size="large"
                class="submit-button"
                @click="submitContactForm"
                :loading="loading"
              >
                Send Message
              </ElButton>
            </ElFormItem>
          </ElForm>
        </ElCard>
      </ElCol>
    </ElRow>

    <!-- Map Section -->
    <ElCard class="map-card">
      <h2>Our Location</h2>
      <div class="map-placeholder">
        <p>Interactive Map Would Appear Here</p>
        <p>123 Pasta Street, Food District, FD 12345</p>
      </div>
    </ElCard>
  </div>
</template>

<style scoped>
.contact-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.contact-layout {
  margin-bottom: 30px;
}

.contact-info-col {
  padding-right: 15px;
}

.contact-form-col {
  padding-left: 15px;
}

.contact-info-card h2,
.contact-form-card h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
}

.contact-info-card p {
  color: #666;
  margin-bottom: 30px;
  font-size: 1.1rem;
  line-height: 1.6;
}

.contact-item {
  display: flex;
  margin-bottom: 25px;
}

.contact-item:last-child {
  margin-bottom: 0;
}

.contact-icon {
  font-size: 1.5rem;
  color: #ff6b6b;
  margin-right: 15px;
  min-width: 30px;
}

.contact-details h3 {
  font-size: 1.2rem;
  margin-bottom: 5px;
  color: #333;
}

.contact-details p {
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.contact-form-card {
  height: 100%;
}

.contact-form {
  margin-top: 20px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #333;
}

.submit-button {
  width: 100%;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa502 100%);
  border: none;
  color: white;
  font-weight: 500;
  padding: 15px;
  font-size: 1.1rem;
  margin-top: 10px;
}

.map-card {
  margin-top: 30px;
}

.map-card h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
}

.map-placeholder {
  height: 300px;
  background: #f0f0f0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
}

.map-placeholder p:first-child {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

@media (max-width: 992px) {
  .contact-info-col,
  .contact-form-col {
    width: 100%;
    padding: 0;
  }

  .contact-layout {
    flex-direction: column;
  }

  .contact-form-col {
    margin-top: 30px;
  }
}
</style>
