import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initializeDb } from './utils/dbUtils'

// Initialize database
initializeDb();

createApp(App).mount('#app')
