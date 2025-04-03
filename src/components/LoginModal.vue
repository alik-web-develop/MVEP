<template>
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <div class="modal-left">
                <h2 class="modal-title">Вход</h2>
                <div class="auth-buttons">
                    <button class="social-btn facebook-btn" @click="loginWithFacebook">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9021 21.5878 18.0351 20.3855 19.6139 18.57C21.1927 16.7545 22.0984 14.4526 22.0984 12.06C22.0984 6.53 17.5 2.04 12 2.04Z"/>
                        </svg>
                        <span>Facebook</span>
                    </button>
                    <button class="social-btn google-btn" @click="loginWithGoogle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.367,1.332-1.459,2.475-2.975,3.031 C13.588,17.8,11.864,18,10.5,18c-2.761,0-5-2.239-5-5s2.239-5,5-5c1.855,0,3.516,0.987,4.403,2.472l2.366-2.366 C14.715,5.587,12.291,4,10.5,4C6.364,4,3,7.364,3,11.5s3.364,7.5,7.5,7.5c3.314,0,6.019-2.686,6.019-6h-4.974V12.151z"/>
                        </svg>
                        <span>Google</span>
                    </button>
                    <div class="divider">или используйте свой аккаунт</div>
                </div>
                <form @submit.prevent="handleSubmit" class="login-form">
                    <div class="form-group">
                        <input 
                            type="text" 
                            v-model="form.name" 
                            placeholder="Имя" 
                            class="form-input"
                            required
                        >
                    </div>
                    <div class="form-group">
                        <input 
                            type="password" 
                            v-model="form.password" 
                            placeholder="Пароль" 
                            class="form-input"
                            required
                        >
                    </div>
                    <a href="#" class="forgot-password">Забыли пароль?</a>
                    <button type="submit" class="login-btn">Войти</button>
                </form>
            </div>
            <div class="modal-right">
                <h2>Привет, друг!</h2>
                <p>Введите свои личные данные и начните путешествие вместе с нами</p>
                <button class="sign-up-btn" @click="toggleSignUp">
                    Зарегистрироваться
                </button>
            </div>
            <button class="modal-close" @click="closeModal">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';

const props = defineProps({
    isOpen: Boolean
});

const emit = defineEmits(['close', 'toggleSignUp']);

const form = ref({
    name: '',
    password: ''
});

const { login, loginWithGoogle } = useAuth();

const handleSubmit = async () => {
    try {
        await login(form.value);
        emit('close');
    } catch (error) {
        console.error('Login error:', error);
    }
};

const closeModal = () => {
    emit('close');
};

const toggleSignUp = () => {
    emit('toggleSignUp');
};

const loginWithFacebook = () => {
    // Здесь будет логика входа через Facebook
    console.log('Login with Facebook');
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
}

.modal-content {
    display: flex;
    width: 900px;
    max-width: 90%;
    max-height: 90vh;
    background: linear-gradient(135deg, #0B0B21 0%, #111a3e 100%);
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-left {
    flex: 1;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.modal-right {
    flex: 1;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%);
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
}

.modal-title {
    font-size: 28px;
    font-weight: 600;
    color: white;
    margin-bottom: 10px;
}

.auth-buttons {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.social-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px;
    border-radius: 8px;
    border: none;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.facebook-btn {
    background-color: #1877F2;
    color: white;
}

.google-btn {
    background-color: white;
    color: #333;
}

.divider {
    text-align: center;
    color: #94a3b8;
    margin: 15px 0;
    position: relative;
}

.divider::before,
.divider::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.1);
}

.divider::before {
    left: 0;
}

.divider::after {
    right: 0;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.form-group {
    position: relative;
}

.form-input {
    width: 100%;
    padding: 12px 15px;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: white;
    font-size: 16px;
    transition: all 0.3s ease;
}

.form-input:focus {
    outline: none;
    border-color: #8B5CF6;
    background-color: rgba(255, 255, 255, 0.15);
}

.forgot-password {
    color: #8B5CF6;
    text-align: right;
    font-size: 14px;
    text-decoration: none;
    transition: all 0.3s ease;
}

.forgot-password:hover {
    color: #EC4899;
    text-decoration: underline;
}

.login-btn {
    background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
    color: white;
    padding: 12px;
    border-radius: 8px;
    border: none;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
}

.login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
}

.sign-up-btn {
    background: transparent;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 20px;
}

.sign-up-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
}

.modal-close {
    position: absolute;
    top: 15px;
    right: 15px;
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.modal-close:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
    .modal-content {
        flex-direction: column;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        border-radius: 0;
    }
    
    .modal-left,
    .modal-right {
        padding: 30px;
    }
}
</style> 