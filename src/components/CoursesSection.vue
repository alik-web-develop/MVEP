<template>
  <section class="courses-section" id="courses">
    <h2 class="section-title">
      <span>My</span> 
      <span>Courses</span>
    </h2>
    
    <div class="courses-grid">
      <div v-for="(course, index) in courses" :key="course.id" class="course-card">
        <img :src="course.image" :alt="course.title" class="course-image">
        
        <div class="course-info">
          <div>
            <h3 class="course-title">{{ course.title }}</h3>
            <p class="course-description">{{ course.description }}</p>
          </div>
          
          <div class="course-meta">
            <div class="course-stats">
              <div class="stat-item">
                <button @click="likeCourse(course)" class="action-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                  </svg>
                </button>
                <span>{{ course.likes }}</span>
              </div>
              <div class="stat-item">
                <button @click="dislikeCourse(course)" class="action-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                  </svg>
                </button>
                <span>{{ course.dislikes }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="price-section">
          <div class="price">{{ formatPrice(course.price) }}</div>
          <div class="quantity-controls">
            <button @click="decreaseQuantity(course)" class="quantity-btn">-</button>
            <span class="quantity">{{ course.quantity || 0 }}</span>
            <button @click="increaseQuantity(course)" class="quantity-btn">+</button>
          </div>
        </div>
      </div>
    </div>

    <div class="cart-section">
      <div class="cart-total">
        <span class="total-label">Итого:</span>
        <span class="total-price">{{ formatPrice(calculateTotal()) }}</span>
      </div>
      <button @click="checkout" class="checkout-btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        Оформить заказ
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import coursesData from '../store/db.json';
import { updateCourses } from '../utils/dbUtils';

const courses = ref(coursesData.courses);

const likeCourse = (course) => {
  course.likes++;
  updateCourses(courses.value);
};

const dislikeCourse = (course) => {
  course.dislikes++;
  updateCourses(courses.value);
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB'
  }).format(price);
};

const increaseQuantity = (course) => {
  if (!course.quantity) course.quantity = 0;
  course.quantity++;
};

const decreaseQuantity = (course) => {
  if (!course.quantity) course.quantity = 0;
  if (course.quantity > 0) course.quantity--;
};

const calculateTotal = () => {
  return courses.value.reduce((total, course) => {
    return total + (course.price * (course.quantity || 0));
  }, 0);
};

const checkout = () => {
  const total = calculateTotal();
  if (total === 0) {
    alert('Пожалуйста, выберите хотя бы один курс');
    return;
  }
  
  const selectedCourses = courses.value
    .filter(course => course.quantity > 0)
    .map(course => `${course.title} (${course.quantity} шт.)`);
    
  alert(`Оформление заказа на сумму ${formatPrice(total)}\n\nВыбранные курсы:\n${selectedCourses.join('\n')}`);
};
</script>

<style scoped>
.courses-section {
  padding: 6rem 2rem;
  background: #0B0B21;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

.section-title {
  text-align: left;
  margin-bottom: 4rem;
  font-size: 2.5rem;
  font-weight: 600;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-title span:first-child {
  color: #FF8A00;
}

.section-title span:last-child {
  color: #FF4D4D;
}

.create-btn {
  background: #2d3748;
  color: #fff;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
}

.create-btn:hover {
  background: #374151;
  border-color: rgba(255, 255, 255, 0.2);
}

.courses-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.course-card {
  display: grid;
  grid-template-columns: 300px 1fr auto;
  gap: 2rem;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.3s ease;
  padding-right: 2rem;
  backdrop-filter: blur(10px);
}

.course-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 138, 0, 0.3);
  box-shadow: 0 10px 30px rgba(255, 138, 0, 0.1);
}

.course-image {
  width: 300px;
  height: 200px;
  object-fit: cover;
}

.course-info {
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.course-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
}

.course-description {
  color: #94a3b8;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  max-width: 600px;
}

.course-meta {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: auto;
}

.course-stats {
  display: flex;
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(255, 138, 0, 0.1);
  color: #FF8A00;
}

.price-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 1rem;
}

.price {
  font-size: 1.5rem;
  font-weight: 600;
  color: #FF8A00;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem;
  border-radius: 12px;
}

.quantity-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 138, 0, 0.2);
  border: none;
  color: #FF8A00;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quantity-btn:hover {
  background: rgba(255, 138, 0, 0.3);
  transform: scale(1.1);
}

.quantity {
  font-size: 1rem;
  color: #fff;
  min-width: 24px;
  text-align: center;
}

.cart-section {
  margin-top: 4rem;
  background: rgba(30, 41, 59, 0.5);
  padding: 2rem;
  border-radius: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(255, 138, 0, 0.1);
  backdrop-filter: blur(10px);
}

.cart-total {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.total-label {
  font-size: 1.25rem;
  color: #94a3b8;
}

.total-price {
  font-size: 1.5rem;
  font-weight: 600;
  color: #FF8A00;
}

.checkout-btn {
  background: linear-gradient(135deg, #FF8A00 0%, #FF4D4D 100%);
  color: #fff;
  font-weight: 500;
  padding: 0.75rem 2rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 138, 0, 0.2);
}

.action-btn {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
}

.action-btn:hover {
  color: #FF8A00;
  transform: scale(1.1);
}

.stat-icon {
  width: 20px;
  height: 20px;
}

.course-actions {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 138, 0, 0.2);
}

.like-section {
  display: flex;
  gap: 1.5rem;
}

.stat-circle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stat-circle span {
  color: #FFD700;
  font-size: 1rem;
}

.view-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: 2px solid #FF8A00;
  color: #FF8A00;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.view-btn:hover {
  background: linear-gradient(135deg, #FF8A00 0%, #FFD700 100%);
  color: #0B0B21;
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 138, 0, 0.3);
}

@media (max-width: 1200px) {
  .course-card {
    grid-template-columns: 1fr;
    padding: 0;
  }

  .course-image {
    width: 100%;
    height: 300px;
  }

  .course-info {
    padding: 2rem;
  }

  .price-section {
    padding: 0 2rem 2rem;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .cart-section {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
}

@keyframes glow {
  from {
    text-shadow: 0 0 5px rgba(255, 138, 0, 0.5);
  }
  to {
    text-shadow: 0 0 20px rgba(255, 138, 0, 0.8);
  }
}
</style> 