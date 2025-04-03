<template >
    <section class="services-section" id="services">
        <h2 class="section-title">
            <span>My</span>
            <span>Services</span>
        </h2>
        <div class="services-grid">
            <div v-for="service in services" :key="service.id" data-aos="fade-up"
            class="service-card"
            >
                <div class="service-icon">
                    <img :src="service.icon" alt="service icon">
                </div>
                <div class="service-content">
                    <h3 class="service-title">
                        {{ service.name }}
                    </h3>
                    <p class="service-description">
                        {{ service.description }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import {ref} from 'vue';
const services =ref([
    {
        id:1,
        icon:'https://img.icons8.com/ios-filled/100/ffffff/google-code.png',
        name:'WEB DEVELOPMENT',
        description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!'
    },
    {
        id:2,
        icon:'https://img.icons8.com/external-vectorslab-glyph-vectorslab/100/fffeee/external-Technical-Writing-mobile-app-development-vectorslab-glyph-vectorslab.png',
        name:'Technical Writing',
        description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!'
    },
    {
        id:3,
        icon:'https://img.icons8.com/external-solid-design-circle/100/ffffff/external-Mobile-Development-digital-marketing-solid-design-circle.png',
        name:'Mobile Development',
        description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!'
    },
    {
        id:4,
        icon:'https://img.icons8.com/ios-filled/100/ffffff/email-open.png',
        name:'WEB DEVELOPMENT',
        description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!'
    },
    {
        id:5,
        icon:'https://img.icons8.com/ios-filled/100/ffffff/windows10-personalization.png',
        name:'Graphic Design',
        description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!'
    },
    {
        id:6,
        icon:'https://img.icons8.com/ios-filled/100/ffffff/web-design.png',
        name:'Web Design',
        description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!'
    },
    ])
</script>

<style scoped>
.services-section {
    padding: 6rem 2rem;
    background: linear-gradient(180deg, #0B0B21 0%, #111a3e 50%, #0B0B21 100%);
    position: relative;
    overflow: hidden;
}

.services-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(180deg, rgba(87, 12, 172, 0.2) 0%, rgba(87, 12, 172, 0) 100%);
    pointer-events: none;
}

.services-section::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(0deg, rgba(87, 12, 172, 0.2) 0%, rgba(87, 12, 172, 0) 100%);
    pointer-events: none;
}

.section-title {
    text-align: left;
    margin-bottom: 3rem;
    font-size: 2.5rem;
    font-weight: 600;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}

.section-title span:first-child {
    color: #FF8A00;
}

.section-title span:last-child {
    color: #FF4D4D;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
}

.service-card {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.service-card:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 138, 0, 0.3);
    box-shadow: 0 10px 30px rgba(255, 138, 0, 0.1);
}

.service-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 1.5rem;
    transition: all 0.3s ease;
}

.service-card:hover .service-icon {
    transform: scale(1.1);
}

.service-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.service-title {
    font-size: 1.25rem;
    font-weight: 600;
    background: linear-gradient(to right, #FF8A00, #FF4D4D);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
}

.service-description {
    color: #94a3b8;
    font-size: 0.95rem;
    line-height: 1.6;
}

@media (max-width: 768px) {
    .section-title {
        text-align: center;
        justify-content: center;
    }
}
</style>

