import { defineStore } from 'pinia'
import { auth } from '../firebase/config'
import { 
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithEmailAndPassword
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),

  actions: {
    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
        
        // Получаем данные пользователя из нашей базы
        const response = await fetch(`http://localhost:3001/users?email=${email}`)
        const users = await response.json()
        if (users.length > 0) {
          localStorage.setItem('user', JSON.stringify(users[0]))
        }
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async signInWithGoogle() {
      this.loading = true
      this.error = null
      try {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        this.user = result.user

        // Проверяем, существует ли пользователь в нашей базе
        const response = await fetch(`http://localhost:3001/users?email=${result.user.email}`)
        const users = await response.json()
        
        if (users.length === 0) {
          // Если пользователя нет, создаем его
          const newUser = {
            username: result.user.displayName,
            email: result.user.email,
            firebaseId: result.user.uid,
            likes: [],
            favorites: []
          }

          const createResponse = await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
          })

          if (createResponse.ok) {
            const user = await createResponse.json()
            localStorage.setItem('user', JSON.stringify(user))
          }
        } else {
          localStorage.setItem('user', JSON.stringify(users[0]))
        }
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem('user')
    }
  }
}) 