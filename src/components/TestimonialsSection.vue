<template>
    <section class="testimonials-section" id="testimonials">
        <h2 class="section-title">
            <span>Client</span>
            <span>Testimonials</span>
        </h2>
        <div class="carousel-container">
            <Carousel v-bind="settings" :breakpoints="breakpoints">
                <Slide v-for="testimonial in testimonials" :key="testimonial.id">
                    <div class="testimonial-card">
                        <div class="testimonial-content">
                            <div class="quote-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <p class="testimonial-text">{{ testimonial.text }}</p>
                            <div class="testimonial-author">
                                <img :src="testimonial.avatar" :alt="testimonial.name" class="author-avatar">
                                <div class="author-info">
                                    <h4 class="author-name">{{ testimonial.name }}</h4>
                                    <p class="author-position">{{ testimonial.position }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slide>
                <template #addons>
                    <Navigation />
                    <Pagination />
                </template>
            </Carousel>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const settings = ref({
    itemsToShow: 1,
    snapAlign: 'center',
    wrapAround: true,
    autoplay: 3000
});

const breakpoints = ref({
    768: {
        itemsToShow: 2,
        snapAlign: 'center',
    },
    1024: {
        itemsToShow: 3,
        snapAlign: 'center',
    }
});

const testimonials = ref([
    {
        id: 1,
        text: "Исключительный профессионализм и внимание к деталям. Результат превзошел все ожидания!",
        name: "Анна Смирнова",
        position: "CEO, Tech Solutions",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
        id: 2,
        text: "Отличное понимание требований и своевременная реализация. Рекомендую!",
        name: "Иван Петров",
        position: "Product Manager, Innovation Labs",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        id: 3,
        text: "Креативный подход и высокое качество работы. Обязательно обратимся снова!",
        name: "Мария Иванова",
        position: "Marketing Director, Creative Studio",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    }
]);
</script>

<style scoped>
.testimonials-section {
    padding: 6rem 2rem;
    background: linear-gradient(180deg, #0B0B21 0%, #111a3e 50%, #0B0B21 100%);
    position: relative;
    overflow: hidden;
}

.testimonials-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(180deg, rgba(87, 12, 172, 0.2) 0%, rgba(87, 12, 172, 0) 100%);
    pointer-events: none;
}

.testimonials-section::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(0deg, rgba(87, 12, 172, 0.2) 0%, rgba(87, 12, 172, 0) 100%);
    pointer-events: none;
}

.carousel-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
}

.section-title {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
    font-weight: 600;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    width: 100%;
}

.section-title span {
    background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
}

.testimonial-card {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 24px;
    padding: 2rem;
    margin: 1rem;
    height: 100%;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.testimonial-card:hover {
    transform: translateY(-5px);
    border-color: rgba(139, 92, 246, 0.3);
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.1);
}

.quote-icon {
    color: #8B5CF6;
    font-size: 2rem;
    margin-bottom: 1rem;
}

.testimonial-text {
    color: #94a3b8;
    font-size: 1.125rem;
    line-height: 1.75;
    margin-bottom: 1.5rem;
}

.testimonial-author {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: auto;
}

.author-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(139, 92, 246, 0.3);
}

.author-info {
    flex: 1;
}

.author-name {
    color: #8B5CF6;
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.author-position {
    color: #6D28D9;
    font-size: 0.875rem;
}

.carousel__prev,
.carousel__next {
    background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: all 0.3s ease;
}

.carousel__prev:hover,
.carousel__next:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);
}

.carousel__pagination {
    margin-top: 2rem;
}

.carousel__pagination-button {
    background: rgba(139, 92, 246, 0.3);
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin: 0 5px;
    transition: all 0.3s ease;
}

.carousel__pagination-button--active {
    background: #8B5CF6;
    transform: scale(1.2);
}

@media (max-width: 768px) {
    .carousel-container {
        padding: 0 1rem;
    }
}
</style>