<template>
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <button class="modal-close" @click="closeModal">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h2 class="modal-title">Создать новый проект</h2>
            <form @submit.prevent="handleSubmit" class="create-form">
                <div class="form-group">
                    <label for="title">Название проекта</label>
                    <input 
                        type="text" 
                        id="title" 
                        v-model="formData.title" 
                        required
                        class="form-input"
                    >
                </div>
                <div class="form-group">
                    <label for="description">Описание</label>
                    <textarea 
                        id="description" 
                        v-model="formData.description" 
                        required
                        class="form-input"
                        rows="4"
                    ></textarea>
                </div>
                <div class="form-group">
                    <label for="category">Категория</label>
                    <input 
                        type="text" 
                        id="category" 
                        v-model="formData.category" 
                        required
                        class="form-input"
                    >
                </div>
                <div class="form-group">
                    <label for="technologies">Технологии (через запятую)</label>
                    <input 
                        type="text" 
                        id="technologies" 
                        v-model="technologiesInput" 
                        required
                        class="form-input"
                        placeholder="Vue.js, TypeScript, Tailwind"
                    >
                </div>
                <div class="form-group">
                    <label for="image">URL изображения</label>
                    <input 
                        type="url" 
                        id="image" 
                        v-model="formData.image" 
                        required
                        class="form-input"
                    >
                </div>
                <div class="form-group">
                    <label for="gitURL">GitHub URL</label>
                    <input 
                        type="url" 
                        id="gitURL" 
                        v-model="formData.gitURL" 
                        required
                        class="form-input"
                    >
                </div>
                <div class="form-group">
                    <label for="webURL">Web URL</label>
                    <input 
                        type="url" 
                        id="webURL" 
                        v-model="formData.webURL" 
                        required
                        class="form-input"
                    >
                </div>
                <button type="submit" class="submit-btn">
                    Создать проект
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['close', 'create']);

const formData = ref({
    title: '',
    description: '',
    category: '',
    image: '',
    gitURL: '',
    webURL: '',
    likes: 0,
    dislikes: 0
});

const technologiesInput = ref('');

const closeModal = () => {
    emit('close');
};

const handleSubmit = () => {
    const newProject = {
        ...formData.value,
        technologies: technologiesInput.value.split(',').map(tech => tech.trim()),
        id: Date.now()
    };
    emit('create', newProject);
    formData.value = {
        title: '',
        description: '',
        category: '',
        image: '',
        gitURL: '',
        webURL: '',
        likes: 0,
        dislikes: 0
    };
    technologiesInput.value = '';
    closeModal();
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 2rem;
}

.modal-content {
    background: #111a3e;
    border: 1px solid #1f1641;
    border-radius: 15px;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    padding: 2rem;
}

.modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
}

.modal-title {
    color: white;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    text-align: center;
}

.create-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-group label {
    color: #94a3b8;
    font-size: 0.875rem;
}

.form-input {
    background: #1f1641;
    border: 1px solid #2d2b5a;
    border-radius: 8px;
    padding: 0.75rem;
    color: white;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-input:focus {
    outline: none;
    border-color: var(--primary);
}

.submit-btn {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: opacity 0.3s ease;
    margin-top: 1rem;
}

.submit-btn:hover {
    opacity: 0.9;
}

/* Scrollbar styles */
.modal-content::-webkit-scrollbar {
    width: 8px;
}

.modal-content::-webkit-scrollbar-track {
    background: #1f1641;
}

.modal-content::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
    background: var(--secondary);
}
</style> 