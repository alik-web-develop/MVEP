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
                <div class="service-icon" v-html="service.icon">
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
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 18L22 12L16 6"></path><path d="M8 6L2 12L8 18"></path></svg>`,
        name:'WEB DEVELOPMENT',
        description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!'
    },
    {
        id:2,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>`,
        name:'Technical Writing',
        description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!'
    },
    {
        id:3,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12" y2="18"></line></svg>`,
        name:'Mobile Development',
        description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!'
    },
    {
        id:4,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
        name:'Email Marketing',
        description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!'
    },
    {
        id:5,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line></svg>`,
        name:'Graphic Design',
        description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!'
    },
    {
        id:6,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`,
        name:'Web Design',
        description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!'
    },
    {
        id:7,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
        name:'SEO Optimization',
        description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!'
    },
    {
        id:8,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
        name:'Analytics',
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
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 24px;
    padding: 2rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.2),
                0 0 30px rgba(139, 92, 246, 0.1);
}

.service-card:hover {
    transform: translateY(-8px);
    border-color: rgba(139, 92, 246, 0.4);
    box-shadow: 0 15px 35px rgba(139, 92, 246, 0.25),
                0 0 40px rgba(139, 92, 246, 0.2),
                0 0 60px rgba(139, 92, 246, 0.1);
}

.service-icon {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3),
                0 0 20px rgba(139, 92, 246, 0.2);
}

.service-icon svg {
    width: 100%;
    height: 100%;
}

.service-card:hover .service-icon {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3),
                0 0 30px rgba(139, 92, 246, 0.2),
                0 0 40px rgba(139, 92, 246, 0.1);
}

.service-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #8B5CF6;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
    text-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
}

.service-card:hover .service-title {
    transform: translateY(-2px);
    text-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
}

.service-description {
    color: #94a3b8;
    line-height: 1.7;
    transition: all 0.3s ease;
}

.service-card:hover .service-description {
    color: #cbd5e1;
}

@media (max-width: 768px) {
    .section-title {
        text-align: center;
        justify-content: center;
    }
}
</style>

