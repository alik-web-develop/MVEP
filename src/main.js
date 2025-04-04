import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeDb } from './utils/dbUtils'
import './style.css'
import App from './App.vue'
import router from './router'

// Font Awesome
// import '@fortawesome/fontawesome-svg-core/styles.css'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { faGoogle, faFacebook, faSteam } from '@fortawesome/free-brands-svg-icons'

import './firebase/config.js'

// Инициализируем базу данных при запуске
try {
    initializeDb();
} catch (error) {
    console.error('Error initializing database:', error);
}

const app = createApp(App);
const pinia = createPinia();

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

// Добавляем иконки в библиотеку
// library.add(faGoogle, faFacebook, faSteam)

// Регистрируем компонент Font Awesome глобально
// app.component('font-awesome-icon', FontAwesomeIcon)

app.use(pinia)
app.use(router)
app.mount('#app')
