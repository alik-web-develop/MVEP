<template>
    <header class="fixed top-0 left-0 right-0 flex justify-between items-center p-6 backdrop-blur-md z-50">
        <div class="flex items-center">
            <router-link to="/" class="flex items-center">
                <img 
                    src="../assets/logo.jpg" 
                    alt="Logo" 
                    class="h-14 w-15 rounded-full object-cover shadow-lg hover:shadow-xl transition-shadow duration-300" 
                />
            </router-link>
        </div>
        <!-- Mobile Toggle Button -->
         <div class="md:hidden z-30">
         <button type="button" 
         class="block focus:outline-none hover:opacity-80 transition-opacity duration-300"
         @click="isMenuOpen = !isMenuOpen"
         >
            <span v-if="isMenuOpen" class="text-5xl">
                <img src="https://img.icons8.com/ios-filled/100/ffffff/delete-sign.png" alt="close" width="50" height="50">
            </span>
            <span v-else class="text-5xl">
                <img src="https://img.icons8.com/ios-filled/100/ffffff/menu--v6.png" alt="menu" width="50" height="50">
            </span>
         </button>
        </div>
         <!-- Navbar Link -->
          <nav
          :class="['fixed inset-0 z-20 flex flex-col items-center justify-center backdrop-blur-md md:relative md:bg-transparent md:flex md:justify-center md:flex-grow transition-all duration-300',
            isMenuOpen ? 'block':'hidden'
          ]"
          >
            <ul class="flex flex-col items-center space-y-5 md:flex-row md:space-x-8 md:space-y-0">
                <li v-for="item in Menu" :key="item.name">
                    <a :href="item.href" 
                    class="block text-white transition-all duration-300 hover:text-primary hover:scale-105 text-2xl md:text-lg font-medium"
                    @click="scrollToSection(item.href)"
                    >
                        {{ item.name }}
                    </a>
                </li>
            </ul>
          </nav>
          
          <!-- Кнопка входа/регистрации (вынесена за пределы nav) -->
          <div class="flex items-center">
              <div v-if="!isAuthenticated">
                  <button 
                      @click="openLoginModal" 
                      class="login-btn bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                      Войти
                  </button>
              </div>
              <!-- Меню пользователя -->
              <div v-else class="relative">
                  <button 
                      @click="toggleUserMenu" 
                      class="user-menu-btn flex items-center gap-2 text-white hover:text-primary transition-all duration-300"
                  >
                      <img 
                          :src="user?.avatar || 'https://via.placeholder.com/40'" 
                          alt="User" 
                          class="w-10 h-10 rounded-full object-cover"
                      />
                      <span>{{ user?.name || 'Пользователь' }}</span>
                  </button>
                  <!-- Выпадающее меню -->
                  <div v-if="isUserMenuOpen" class="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2 z-50">
                      <a href="#" class="block px-4 py-2 text-white hover:bg-gray-700">Профиль</a>
                      <a href="#" class="block px-4 py-2 text-white hover:bg-gray-700">Настройки</a>
                      <button 
                          @click="logout" 
                          class="w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                      >
                          Выйти
                      </button>
                  </div>
              </div>
          </div>
    </header>

    <!-- Модальное окно для входа -->
    <LoginModal 
        v-if="showLoginModal"
        :is-open="showLoginModal" 
        @close="closeLoginModal" 
        @toggle-sign-up="toggleSignUp"
    />
    
    <!-- Модальное окно для регистрации -->
    <SignUpModal 
        v-if="showSignUpModal"
        :is-open="showSignUpModal" 
        @close="closeSignUpModal" 
        @toggle-login="toggleLogin"
    />
</template>
<script setup>
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';
import LoginModal from './LoginModal.vue';
import SignUpModal from './SignUpModal.vue';

const Menu =ref([
    {name:'Services',href:'#services'},
    {name:'About Me',href:'#about'},
    {name:'Skills',href:'#skills'},
    {name:'Courses',href:'#courses'},
    {name:'Projects',href:'#projects'},
    {name:'Contact',href:'#contact'},
]);

const isMenuOpen =ref(false)
const scrollToSection =(href)=>{
    isMenuOpen.value=false;
    const section=document.querySelector(href);
    if(section){
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

const { user, isAuthenticated, logout } = useAuth();
const showLoginModal = ref(false);
const showSignUpModal = ref(false);
const isUserMenuOpen = ref(false);

const openLoginModal = () => {
    showLoginModal.value = true;
    showSignUpModal.value = false;
};

const closeLoginModal = () => {
    showLoginModal.value = false;
};

const openSignUpModal = () => {
    showSignUpModal.value = true;
    showLoginModal.value = false;
};

const closeSignUpModal = () => {
    showSignUpModal.value = false;
};

const toggleSignUp = () => {
    showLoginModal.value = false;
    showSignUpModal.value = true;
};

const toggleLogin = () => {
    showSignUpModal.value = false;
    showLoginModal.value = true;
};

const toggleUserMenu = () => {
    isUserMenuOpen.value = !isUserMenuOpen.value;
};
</script>

<style>
section[id] {
    scroll-margin-top: 100px;
}

header {
    background: transparent;
}

@media (max-width: 768px) {
    nav.block {
        background: rgba(11, 11, 33, 0.9);
    }
}

.navbar {
    background: rgba(11, 11, 33, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(139, 92, 246, 0.2);
}

.nav-link {
    color: #94a3b8;
    transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
    color: #8B5CF6;
}

.nav-link.active::after {
    background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);
}

.mobile-menu-button {
    color: #8B5CF6;
}

.mobile-menu {
    background: rgba(11, 11, 33, 0.95);
    border: 1px solid rgba(139, 92, 246, 0.2);
    backdrop-filter: blur(10px);
}

.mobile-nav-link {
    color: #94a3b8;
    transition: all 0.3s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link.active {
    color: #8B5CF6;
    background: rgba(139, 92, 246, 0.1);
}

.login-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.2);
}

.login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
}

.login-btn svg {
    width: 20px;
    height: 20px;
}

.user-menu {
    position: relative;
}

.user-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 12px;
    color: #8B5CF6;
    font-weight: 500;
    transition: all 0.3s ease;
}

.user-btn:hover {
    background: rgba(139, 92, 246, 0.2);
    border-color: rgba(139, 92, 246, 0.3);
}

.user-btn svg {
    width: 16px;
    height: 16px;
}

.user-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    background: rgba(30, 41, 59, 0.95);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 12px;
    padding: 0.5rem;
    min-width: 200px;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.2);
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    width: 100%;
    color: #fff;
    background: transparent;
    border: none;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.dropdown-item:hover {
    background: rgba(139, 92, 246, 0.1);
    color: #8B5CF6;
}

.dropdown-item svg {
    width: 20px;
    height: 20px;
}
</style>