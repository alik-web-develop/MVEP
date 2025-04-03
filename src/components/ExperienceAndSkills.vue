<template>
    <section class="experience-section" id="skills">
        <h2 class="section-title">
            <span>My</span>
            <span>Skills</span>
        </h2>
        <div class="content-wrapper">
            <div class="skills-container">
                <div class="mt-8" v-for="skill in Skills" :key="skill.id">
                    <div class="skill-header">
                        <h4 class="skill-name">{{ skill.name }}</h4>
                        <h3 class="skill-percentage">{{ skill.width }}</h3>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-bar" :style="`width: ${skill.width}`"></div>
                    </div>
                </div>
            </div>
            <div class="experience-container">
                <h2 class="section-title">
                    <span>My</span>
                    <span>Experience</span>
                </h2>
                <div class="experience-list">
                    <div v-for="element in Experinces" :key="element.id"
                        class="experience-card"
                    >
                        <div class="experience-icon">
                            <img src="https://img.icons8.com/ios-filled/100/ffffff/lawyer.png" alt="experience icon">
                        </div>
                        <div class="experience-info">
                            <h3 class="experience-role">{{ element.role }}</h3>
                            <p class="experience-company">{{ element.company }}</p>
                            <p class="experience-date">{{ element.date }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';

const Skills = ref([
    {
        id: 1,
        name: 'HTML & CSS',
        width: '85%'
    },
    {
        id: 2,
        name: 'Python',
        width: '70%'
    },
    {
        id: 3,
        name: 'JavaScript',
        width: '98%'
    },
    {
        id: 4,
        name: 'Figma',
        width: '91%'
    },
]);

const Experinces = ref([
    {
        id: 1,
        role: 'Software Engineer',
        company: 'Microsoft',
        date: 'Mar 2023 - September 2024'
    },
    {
        id: 2,
        role: 'Frontend Developer',
        company: 'Spotify',
        date: 'Mar 2022 - September 2023'
    },
]);
</script>

<style scoped>
.experience-section {
    padding: 6rem 2rem;
    background: linear-gradient(180deg, #0B0B21 0%, #111a3e 50%, #0B0B21 100%);
    position: relative;
    overflow: hidden;
}

.experience-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(180deg, rgba(87, 12, 172, 0.2) 0%, rgba(87, 12, 172, 0) 100%);
    pointer-events: none;
}

.experience-section::after {
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

.section-title span:first-child {
    color: #FF8A00;
}

.section-title span:last-child {
    color: #FF4D4D;
}

.skills-container {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 2rem;
    backdrop-filter: blur(10px);
}

.skill-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.skill-name {
    font-weight: 500;
    color: #fff;
    text-transform: uppercase;
}

.skill-percentage {
    font-size: 1.25rem;
    font-weight: 600;
    color: #FF8A00;
}

.skill-progress {
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    margin-bottom: 1.5rem;
    overflow: hidden;
}

.skill-bar {
    height: 100%;
    background: linear-gradient(90deg, #FF8A00, #FF4D4D);
    border-radius: 4px;
    transition: width 1s ease;
}

.experience-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.experience-card {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.experience-card:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 138, 0, 0.3);
    box-shadow: 0 10px 30px rgba(255, 138, 0, 0.1);
}

.experience-icon {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
}

.experience-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.experience-role {
    font-size: 1.25rem;
    font-weight: 600;
    background: linear-gradient(to right, #FF8A00, #FF4D4D);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
}

.experience-company {
    color: #fff;
    margin-bottom: 0.25rem;
}

.experience-date {
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
}
</style>
