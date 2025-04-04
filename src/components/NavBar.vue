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
                    <img src="https://img.icons8.com/ios-filled/100/ffffff/menu.png" alt="menu" width="50" height="50">
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
                        class="nav-link"
                        @click="scrollToSection(item.href)"
                    >
                        {{ item.name }}
                    </a>
                </li>
            </ul>
        </nav>
        
        <!-- Кнопка входа/регистрации -->
        <div class="flex items-center">
            <div v-if="!isAuthenticated">
                <button 
                    @click="openAuthModal" 
                    class="login-btn"
                >
                    Войти
                </button>
            </div>
            <!-- Меню пользователя -->
            <div v-else class="relative">
                <button 
                    @click="toggleUserMenu" 
                    class="user-menu-btn"
                >
                    <img 
                        :src="user?.avatar || 'https://ui-avatars.com/api/?name=' + user?.username" 
                        alt="User" 
                        class="user-avatar"
                    />
                    <span class="hidden md:inline ml-2">{{ user?.username }}</span>
                </button>
                <!-- Выпадающее меню -->
                <div v-if="isUserMenuOpen" class="user-dropdown">
                    <router-link to="/profile" class="dropdown-item">
                        <font-awesome-icon icon="user" class="mr-2" />
                        Профиль
                    </router-link>
                    <router-link to="/settings" class="dropdown-item">
                        <font-awesome-icon icon="cog" class="mr-2" />
                        Настройки
                    </router-link>
                    <button 
                        @click="logout" 
                        class="dropdown-item text-red-500 hover:bg-red-50"
                    >
                        <font-awesome-icon icon="sign-out-alt" class="mr-2" />
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    </header>

    <!-- Модальное окно аутентификации -->
    <Teleport to="body">
        <AuthModal v-if="showModal" @close="closeAuthModal" />
    </Teleport>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { useAuth } from '../composables/useAuth';
import AuthModal from './AuthModal.vue';
// Закомментируем импорты Font Awesome
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

// Добавляем иконки
// library.add(faUser, faCog, faSignOutAlt)

const Menu = ref([
    {name:'Services',href:'#services'},
    {name:'About Me',href:'#about'},
    {name:'Skills',href:'#skills'},
    {name:'Courses',href:'#courses'},
    {name:'Projects',href:'#projects'},
    {name:'Contact us',href:'#contact'},
]);

const isMenuOpen = ref(false);
const isUserMenuOpen = ref(false);
const showModal = ref(false);
const { user, isAuthenticated, logout } = useAuth();

const scrollToSection = (href) => {
    isMenuOpen.value = false;
    const section = document.querySelector(href);
    if (section) {
        const headerOffset = 100; // Отступ для фиксированного хедера
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

const toggleUserMenu = () => {
    isUserMenuOpen.value = !isUserMenuOpen.value;
};

const openAuthModal = () => {
    console.log('Opening auth modal');
    showModal.value = true;
    document.body.style.overflow = 'hidden';
};

const closeAuthModal = () => {
    console.log('Closing auth modal');
    showModal.value = false;
    document.body.style.overflow = '';
};

// Добавляем watch для отладки
watch(showModal, (newValue) => {
    console.log('showModal changed to:', newValue);
});

// Функция для получения ширины скроллбара
const getScrollbarWidth = () => {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
};

// Закрываем меню при клике вне его
const closeUserMenu = (e) => {
    if (!e.target.closest('.user-menu-btn') && !e.target.closest('.user-dropdown')) {
        isUserMenuOpen.value = false
    }
}

onMounted(() => {
    console.log('NavBar mounted');
    console.log('AuthModal component:', AuthModal);
    // Очищаем стили при монтировании компонента
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.addEventListener('click', closeUserMenu)
});

onUnmounted(() => {
    // Очищаем стили при размонтировании компонента
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.removeEventListener('click', closeUserMenu)
});
</script>

<style lang="scss">
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

.nav-link {
    position: relative;
    padding: 0.5rem 1rem;
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: 500;
    transition: all 0.3s ease;
    text-decoration: none;
    
    &:hover {
        color: #8B5CF6;
        transform: scale(1.1);
        text-shadow: 0 0 15px rgba(139, 92, 246, 0.7);
    }
}

.login-btn {
    background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.2);
    border: none;
    cursor: pointer;
    position: relative;
    z-index: 100002;
    
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4);
        background: linear-gradient(135deg, #9B6CF6 0%, #7D38D9 100%);
    }

    &:active {
        transform: scale(0.98);
    }
}

.user-menu-btn {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
    background: rgba(139, 92, 246, 0.1);
    
    &:hover {
        background: rgba(139, 92, 246, 0.2);
    }
}

.user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #8B5CF6;
}

.user-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    min-width: 200px;
    z-index: 50;
    overflow: hidden;
}

.dropdown-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    color: #4B5563;
    transition: all 0.2s ease;
    width: 100%;
    text-align: left;
    
    &:hover {
        background: #F3F4F6;
        color: #8B5CF6;
    }
    
    &:not(:last-child) {
        border-bottom: 1px solid #E5E7EB;
    }
}

@media (min-width: 768px) {
    .nav-link {
        font-size: 1.125rem;
    }
}

body.modal-open {
    overflow: hidden;
    padding-right: 15px; /* Компенсация скроллбара */
}

.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 99998;
}
</style>