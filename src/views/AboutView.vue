<script setup lang="ts">
import { ElCard, ElRow, ElCol } from 'element-plus'
</script>

<template>
  <div class="about-container">
    <el-card class="about-card">
      <h1>About PastaHouse</h1>
      <p>
        Welcome to PastaHouse, where passion meets pasta! We are dedicated to bringing you the
        finest homemade pasta made with love and the highest quality ingredients.
      </p>

      <h2>Our Story</h2>
      <p>
        Founded in 2023, PastaHouse began as a small family kitchen experiment. What started as a
        hobby quickly turned into a passion for creating authentic, delicious pasta that brings
        families together around the dinner table.
      </p>

      <h2>Our Philosophy</h2>
      <p>
        We believe that great food brings people together. Every batch of our pasta is made fresh
        daily using traditional techniques passed down through generations. We source our
        ingredients locally whenever possible to ensure the highest quality and support our
        community.
      </p>

      <h2>Quality Assurance</h2>
      <el-row :gutter="20" class="quality-grid">
        <el-col :span="8">
          <div class="quality-item">
            <h3>Fresh Ingredients</h3>
            <p>We use only the freshest, locally-sourced ingredients in all our pasta creations.</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="quality-item">
            <h3>Handcrafted</h3>
            <p>Each pasta is handcrafted with care and attention to detail.</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="quality-item">
            <h3>Delivered Fresh</h3>
            <p>We deliver our pasta fresh to your door within 24 hours of preparation.</p>
          </div>
        </el-col>
      </el-row>

      <h2 style="margin-top: 55px;">Meet Our Team</h2>
      <p>
        Our team of passionate pasta makers brings years of experience and a deep love for Italian
        cuisine. From our master pasta chef to our delivery specialists, every team member is
        committed to providing you with an exceptional experience.
      </p>
    </el-card>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
}

.about-card {
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.about-card h1 {
  color: #ff6b6b;
  margin-bottom: 20px;
  text-align: center;
}

.about-card h2 {
  color: #ffa502;
  margin: 30px 0 15px 0;
}

.about-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.quality-grid {
  margin: 20px 0;
}

.quality-item {
  text-align: center;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  height: 100%;
}

.quality-item h3 {
  color: #ff6b6b;
  margin-bottom: 10px;
}

.quality-item p {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .quality-grid {
    flex-direction: column;
  }

  :deep(.el-col) {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
