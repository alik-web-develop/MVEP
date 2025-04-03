<template>
    <section class="contact-section" id="contacts">
        <h2 class="section-title">
            <span>Contact</span>
            <span>Us</span>
        </h2>
        <div class="contact-container">
            <div class="contact-info">
                <div class="contact-info-card">
                    <div class="contact-item">
                        <div class="contact-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div class="contact-details">
                            <h3>Email</h3>
                            <p>info@mvep.com</p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div class="contact-details">
                            <h3>Телефон</h3>
                            <p>+7 (999) 123-45-67</p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div class="contact-details">
                            <h3>Адрес</h3>
                            <p>Москва, ул. Примерная, 123</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-container">
                <form @submit.prevent="handleSubmit" class="contact-form">
                    <div class="form-group">
                        <input type="text" v-model="form.name" placeholder="Ваше имя" required class="form-input">
                    </div>
                    <div class="form-group">
                        <input type="email" v-model="form.email" placeholder="Ваш email" required class="form-input">
                    </div>
                    <div class="form-group">
                        <textarea v-model="form.message" placeholder="Ваше сообщение" required class="form-input" rows="5"></textarea>
                    </div>
                    <button type="submit" class="send-button">
                        <span>Отправить сообщение</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
    name: '',
    email: '',
    message: ''
});

const handleSubmit = () => {
    // Здесь будет логика отправки формы
    console.log('Form submitted:', form.value);
};
</script>

<style scoped>
.contact-section {
    padding: 6rem 2rem;
    background: linear-gradient(180deg, #0B0B21 0%, #111a3e 50%, #0B0B21 100%);
    position: relative;
    overflow: hidden;
}

.contact-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(180deg, rgba(87, 12, 172, 0.2) 0%, rgba(87, 12, 172, 0) 100%);
    pointer-events: none;
}

.contact-section::after {
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
}

.section-title span {
    background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
}

.contact-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 2rem;
    position: relative;
    z-index: 1;
}

.contact-info-card {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 24px;
    padding: 2rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.2),
                0 0 30px rgba(139, 92, 246, 0.1);
}

.contact-info-card:hover {
    transform: translateY(-5px);
    border-color: rgba(139, 92, 246, 0.4);
    box-shadow: 0 15px 35px rgba(139, 92, 246, 0.25),
                0 0 40px rgba(139, 92, 246, 0.2),
                0 0 60px rgba(139, 92, 246, 0.1);
}

.contact-item {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: rgba(30, 41, 59, 0.3);
    border-radius: 12px;
    transition: all 0.3s ease;
}

.contact-item:hover {
    background: rgba(139, 92, 246, 0.1);
    transform: translateX(5px);
}

.contact-item:hover .contact-icon {
    transform: scale(1.1);
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3),
                0 0 30px rgba(139, 92, 246, 0.2);
}

.contact-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3),
                0 0 20px rgba(139, 92, 246, 0.2);
}

.contact-icon svg {
    width: 24px;
    height: 24px;
}

.contact-details h3 {
    color: #fff;
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
}

.contact-details p {
    color: #94a3b8;
    font-size: 0.875rem;
}

.form-container {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 24px;
    padding: 2rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.2),
                0 0 30px rgba(139, 92, 246, 0.1);
}

.form-container:hover {
    border-color: rgba(139, 92, 246, 0.4);
    box-shadow: 0 15px 35px rgba(139, 92, 246, 0.25),
                0 0 40px rgba(139, 92, 246, 0.2),
                0 0 60px rgba(139, 92, 246, 0.1);
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-input {
    background: rgba(30, 41, 59, 0.3);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 12px;
    padding: 1rem;
    color: #fff;
    transition: all 0.3s ease;
}

.form-input:focus {
    border-color: #8B5CF6;
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2),
                0 4px 15px rgba(139, 92, 246, 0.2),
                0 0 20px rgba(139, 92, 246, 0.1);
}

.form-input::placeholder {
    color: #64748b;
}

textarea.form-input {
    resize: vertical;
    min-height: 120px;
}

.send-button {
    background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);
    border-radius: 12px;
    padding: 1rem 2rem;
    color: #fff;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3),
                0 0 20px rgba(139, 92, 246, 0.2);
}

.send-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4),
                0 0 30px rgba(139, 92, 246, 0.3);
}

.send-button svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
}

.send-button:hover svg {
    transform: translateX(4px);
}

@media (max-width: 768px) {
    .contact-container {
        grid-template-columns: 1fr;
    }

    .section-title {
        font-size: 2rem;
    }
}
</style>
