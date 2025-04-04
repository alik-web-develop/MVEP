<template>
  <div class="modal" @click.self="closeModal" :class="{ 'modal-closing': isClosing }">
    <div class="modal-content" :class="[{ 'right-panel-active': isRightPanelActive }, { 'modal-content-closing': isClosing }]">
      <!-- Форма входа -->
      <div class="form-container sign-in-container">
        <form @submit.prevent="loginFn">
          <h1>Войти</h1>
          <div class="social-container">
            <a href="#" class="social" @click.prevent="signInWithGoogle">
              <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" width="24" height="24">
            </a>
            <a href="#" class="social">
              <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" width="24" height="24">
            </a>
            <a href="#" class="social">
              <img src="https://img.icons8.com/color/48/000000/steam.png" alt="Steam" width="24" height="24">
            </a>
          </div>
          <span>или используйте email для входа</span>
          <input type="email" placeholder="Email" v-model="loginName" />
          <input type="password" placeholder="Пароль" v-model="loginPass" />
          <button type="submit" >ВОЙТИ</button>
        </form>
      </div>

      <!-- Форма регистрации -->
      <div class="form-container sign-up-container">
        <form @submit.prevent="registerFn">
          <h1>Создать аккаунт</h1>
          <div class="social-container">
            <a href="#" class="social" @click.prevent="signInWithGoogle">
              <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" width="24" height="24">
            </a>
            <a href="#" class="social">
              <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" width="24" height="24">
            </a>
            <a href="#" class="social">
              <img src="https://img.icons8.com/color/48/000000/steam.png" alt="Steam" width="24" height="24">
            </a>
          </div>
          <span>или используйте email для регистрации</span>
          <input 
            type="text" 
            placeholder="Имя" 
            v-model="regName"
            @input="handleNameChange"
          />
          <input 
            type="password" 
            placeholder="Пароль" 
            v-model="regPass"
          />
          <input 
            type="password" 
            placeholder="Подтвердите пароль" 
            v-model="regPassConf"
          />
          <button type="submit">ЗАРЕГИСТРИРОВАТЬСЯ</button>
        </form>
      </div>

      <!-- Оверлей -->
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1 style="color: #fff;">С возвращением!</h1>
            <p>Чтобы оставаться на связи с нами, пожалуйста, войдите в систему</p>
            <button class="ghost" @click="handleSignIn">ВОЙТИ</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1 style="color: #fff;">Привет, друг!</h1>
            <p style="color: #fff;">Введите свои личные данные и начните путешествие с нами</p>
            <button class="ghost" @click="handleSignUp">РЕГИСТРАЦИЯ</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth } from '../firebase/config.js'
import { 
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGoogle, faFacebook, faSteam } from '@fortawesome/free-brands-svg-icons'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

// Добавляем иконки в библиотеку
library.add(faGoogle, faFacebook, faSteam)

const emit = defineEmits(['close'])
const isRightPanelActive = ref(false)
const loginName = ref('')
const loginPass = ref('')
const regName = ref('')
const regPass = ref('')
const regPassConf = ref('')
const isClosing = ref(false)

// Инициализация Google Auth
let auth2;

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  // Загружаем Google API Client
  const script = document.createElement('script')
  script.src = 'https://apis.google.com/js/api:client.js'
  script.onload = () => {
    window.gapi.load('auth2', () => {
      auth2 = window.gapi.auth2.init({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // Замените на ваш Client ID из Google Cloud Console
        cookiepolicy: 'single_host_origin',
      });
    });
  }
  document.head.appendChild(script)
})

const showAlert = (msg, type) => {
  let background = ''
  if (type === 'success') {
    background = 'linear-gradient(to right, #00b09b, #96c93d)'
  } else if (type === 'error') {
    background = 'linear-gradient(to right, orange, orangered)'
  }

  Toastify({
    text: msg,
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'center',
    style: { background }
  }).showToast()
}

const handleNameChange = (e) => {
  const nameValue = e.target.value
  const lettersPattern = /^[A-Za-zА-Яа-яЁё]*$/

  if (lettersPattern.test(nameValue) || nameValue === '') {
    regName.value = nameValue
  } else {
    showAlert('Пожалуйста, используйте только буквы', 'error')
  }
}

const registerFn = async () => {
  try {
    if (!regName.value || !regPass.value || !regPassConf.value) {
      showAlert('Пожалуйста, заполните все поля', 'error')
      return
    }

    if (regPass.value !== regPassConf.value) {
      showAlert('Пароли не совпадают', 'error')
      return
    }

    if (regPass.value.length < 6) {
      showAlert('Пароль должен быть не менее 6 символов', 'error')
      return
    }

    // Регистрируем пользователя в Firebase
    const email = `${regName.value}@mvep.com`
    const userCredential = await createUserWithEmailAndPassword(auth, email, regPass.value)
    const firebaseUser = userCredential.user

    // Создаем пользователя в нашей базе
    const newUser = {
      username: regName.value,
      email: email,
      firebaseId: firebaseUser.uid,
      likes: [],
      favorites: []
    }

    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })

    if (response.ok) {
      const user = await response.json()
      localStorage.setItem('user', JSON.stringify(user))
      showAlert('Регистрация успешна!', 'success')
      regName.value = ''
      regPass.value = ''
      regPassConf.value = ''
      emit('close')
    }
  } catch (error) {
    console.error('Ошибка при регистрации:', error)
    showAlert(error.message, 'error')
  }
}

const loginFn = async () => {
  try {
    await authStore.login(loginName.value, loginPass.value)
    closeModal()
    router.push('/profile')
  } catch (error) {
    console.error('Ошибка при входе:', error)
    showAlert('Неверный email или пароль', 'error')
  }
}

const signInWithGoogle = async () => {
  try {
    await authStore.signInWithGoogle()
    closeModal()
    router.push('/profile')
  } catch (error) {
    console.error('Ошибка при входе через Google:', error)
    showAlert(error.message, 'error')
  }
}

const closeModal = () => {
  isClosing.value = true
  setTimeout(() => {
    isClosing.value = false
    emit('close')
  }, 300)
}

const handleSignUp = () => {
  isRightPanelActive.value = true
}

const handleSignIn = () => {
  isRightPanelActive.value = false
}
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
  z-index: 1000;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: fadeIn 0.3s ease-out forwards;

  &.modal-closing {
    animation: fadeOut 0.3s ease-in forwards;
  }
}

.modal-content {
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  display: flex;
  transform: translateY(-50px);
  opacity: 0;
  animation: slideIn 0.4s ease-out 0.1s forwards;

  &.modal-content-closing {
    animation: slideOut 0.3s ease-in forwards;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-70px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(70px);
    opacity: 0;
  }
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.modal-content.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.modal-content.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }
  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.modal-content.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #7C3AED;
  background: linear-gradient(45deg, #8B5CF6 0%, #6D28D9 100%);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.modal-content.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.modal-content.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.modal-content.right-panel-active .overlay-right {
  transform: translateX(20%);
}

form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

h1 {
  font-weight: 700;
  margin: 0;
  color: #1a202c;
  font-size: 24px;
}

p {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  color: #fff;
}

span {
  font-size: 13px;
  color: #64748b;
  margin: 15px 0;
}

input {
  background-color: #f8f9fa;
  border: 1px solid #e2e8f0;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 8px;
  font-size: 14px;
  color: #1a202c;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: #a0aec0;
  }
  
  &:focus {
    outline: none;
    border-color: #8B5CF6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
    background-color: #fff;
  }
}

button {
  border-radius: 20px;
  border: 1px solid #8B5CF6;
  background-color: #8B5CF6;
  color: #FFFFFF;
  font-size: 13px;
  font-weight: 600;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  cursor: pointer;
  margin-top: 15px;
  
  &:hover {
    background-color: #7C3AED;
    border-color: #7C3AED;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(124, 58, 237, 0.3);
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
  }
  
  &:focus {
    outline: none;
  }
  
  &.ghost {
    background-color: transparent;
    border-color: #FFFFFF;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
    }
  }
}

.social-container {
  margin: 20px 0;
  
  a {
    border: 1px solid #e2e8f0;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
    transition: all 0.3s ease;
    color: #8B5CF6;
    background-color: #fff;
    
    &:hover {
      background-color: #8B5CF6;
      border-color: #8B5CF6;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);
    }
  }
}

@media (max-width: 768px) {
  .modal-content {
    width: 90%;
    margin: 20px;
  }
}
</style>
