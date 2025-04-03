<template>
    <section class="about-section" id="about">
        <div class="content-wrapper">
            <div class="education-container">
                <h2 class="section-title">
                    <span>My</span>
                    <span>Education</span>
                </h2>
                <div class="education-list">
                    <div v-for="element in education" :key="element.id"
                        class="education-card"
                    >
                        <div class="education-icon">
                            <img src="https://img.icons8.com/ios-glyphs/60/ffffff/graduation-cap--v1.png" alt="education icon">
                        </div>
                        <div class="education-info">
                            <h3 class="education-school">{{ element.School }}</h3>
                            <p class="education-program">{{ element.program }}</p>
                            <p class="education-year">{{ element.year }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="about-container">
                <h2 class="section-title">
                    <span>About</span>
                    <span>Me</span>
                </h2>
                <p class="about-text">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Qui facere libero cupiditate fugit minima voluptates numquam est eos voluptate saepe
                    eius amet harum provident accusamus omnis sit in cum incidunt dolorum, necessitatibus
                    illo reiciendis ipsam debitis velit! Itaque officia architecto fugit, cum dolorum eos dolore
                    quaerat quis nobis id similique!
                </p>
                <div class="stats-grid">
                    <div class="stat-card">
                        <h3 class="stat-number">+200</h3>
                        <p class="stat-label">Happy Client</p>
                    </div>
                    <div class="stat-card">
                        <h3 class="stat-number">+300</h3>
                        <p class="stat-label">Project</p>
                    </div>
                    <div class="stat-card">
                        <h3 class="stat-number">+7</h3>
                        <p class="stat-label">Years Experience</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
const education=ref([
    {
        id:1,
        School:'school 1',
        program:'Software Engineer',
        year:'2022'
    },
    {
        id:2,
        School:'school 2',
        program:'Software Engineer',
        year:'2020'
    }
])
</script>

<style scoped>
.about-section {
    padding: 6rem 2rem;
    background: linear-gradient(180deg, #0B0B21 0%, #111a3e 50%, #0B0B21 100%);
    position: relative;
    overflow: hidden;
}

.about-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(180deg, rgba(87, 12, 172, 0.2) 0%, rgba(87, 12, 172, 0) 100%);
    pointer-events: none;
}

.about-section::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(0deg, rgba(87, 12, 172, 0.2) 0%, rgba(87, 12, 172, 0) 100%);
    pointer-events: none;
}

.content-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
}

.section-title {
    text-align: left;
    margin-bottom: 3rem;
    font-size: 2.5rem;
    font-weight: 600;
    display: flex;
    gap: 0.5rem;
}

.section-title span {
    background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
}

.education-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.education-card {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 24px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.education-card:hover {
    transform: translateY(-5px);
    border-color: rgba(139, 92, 246, 0.3);
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.1);
}

.education-icon {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
}

.education-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.education-school {
    font-size: 1.25rem;
    font-weight: 600;
    background: linear-gradient(to right, #8B5CF6, #6D28D9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
}

.education-program {
    color: #fff;
    margin-bottom: 0.25rem;
}

.education-year {
    color: #94a3b8;
    font-size: 0.9rem;
}

.about-container {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 2rem;
    backdrop-filter: blur(10px);
}

.about-text {
    color: #94a3b8;
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 2rem;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}

.stat-card {
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 16px;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
    border-color: rgba(139, 92, 246, 0.3);
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.1);
}

.stat-number {
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(to right, #8B5CF6, #6D28D9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
}

.stat-label {
    color: #94a3b8;
    font-size: 0.9rem;
}

@media (max-width: 768px) {
    .content-wrapper {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .section-title {
        text-align: center;
        justify-content: center;
    }
    
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .stats-grid {
        grid-template-columns: 1fr;
    }
}
</style>
