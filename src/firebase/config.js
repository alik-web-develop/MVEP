import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAgmhSwLttnf0DaEawvpqei5iEhLsFSMUo",
  authDomain: "mvep-auth.firebaseapp.com",
  projectId: "mvep-auth",
  storageBucket: "mvep-auth.firebasestorage.app",
  messagingSenderId: "150310195067",
  appId: "1:150310195067:web:1900955be3d1b26674b7de"
}

// Инициализируем Firebase
const app = initializeApp(firebaseConfig)

// Получаем сервис аутентификации
const auth = getAuth(app)

export { auth } 