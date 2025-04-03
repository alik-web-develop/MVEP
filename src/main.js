import { createApp } from 'vue'
import { initializeDb } from './utils/dbUtils'
import './style.css'
import App from './App.vue'

// Инициализируем базу данных при запуске
try {
    initializeDb();
} catch (error) {
    console.error('Error initializing database:', error);
}

const app = createApp(App);

// Глобальная обработка ошибок
app.config.errorHandler = (err, vm, info) => {
    console.error('Global error:', err);
    console.error('Component:', vm);
    console.error('Info:', info);
};

// Обработка ошибок в асинхронных компонентах
app.config.warnHandler = (msg, vm, trace) => {
    console.warn('Warning:', msg);
    console.warn('Component:', vm);
    console.warn('Trace:', trace);
};

app.mount('#app');
