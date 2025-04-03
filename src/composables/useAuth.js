import { ref } from 'vue';

const user = ref(null);
const isAuthenticated = ref(false);

// Загрузка пользователя из localStorage при инициализации
const loadUser = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        user.value = JSON.parse(savedUser);
        isAuthenticated.value = true;
    }
};

// Инициализация при создании приложения
loadUser();

export function useAuth() {
    const login = async (credentials) => {
        // В реальном приложении здесь был бы запрос к API
        const newUser = {
            id: Date.now(),
            name: credentials.name,
            email: credentials.email || `${credentials.name}@example.com`,
            likedProjects: [],
            dislikedProjects: [],
            createdProjects: []
        };
        
        user.value = newUser;
        isAuthenticated.value = true;
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const register = async (userData) => {
        // В реальном приложении здесь был бы запрос к API
        const newUser = {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            likedProjects: [],
            dislikedProjects: [],
            createdProjects: []
        };
        
        user.value = newUser;
        isAuthenticated.value = true;
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const loginWithGoogle = async () => {
        // Здесь будет реализация входа через Google
        // Пока используем моковые данные
        const googleUser = {
            id: Date.now(),
            name: 'Google User',
            email: 'google@example.com',
            likedProjects: [],
            dislikedProjects: [],
            createdProjects: []
        };

        user.value = googleUser;
        isAuthenticated.value = true;
        localStorage.setItem('user', JSON.stringify(googleUser));
    };

    const registerWithGoogle = async () => {
        // Здесь будет реализация регистрации через Google
        // Пока используем моковые данные
        const googleUser = {
            id: Date.now(),
            name: 'Google User',
            email: 'google@example.com',
            likedProjects: [],
            dislikedProjects: [],
            createdProjects: []
        };

        user.value = googleUser;
        isAuthenticated.value = true;
        localStorage.setItem('user', JSON.stringify(googleUser));
    };

    const logout = () => {
        user.value = null;
        isAuthenticated.value = false;
        localStorage.removeItem('user');
    };

    const hasLikedProject = (projectId) => {
        return user.value?.likedProjects.includes(projectId) || false;
    };

    const hasDislikedProject = (projectId) => {
        return user.value?.dislikedProjects.includes(projectId) || false;
    };

    const addLikedProject = (projectId) => {
        if (!user.value) return;
        
        if (!user.value.likedProjects.includes(projectId)) {
            user.value.likedProjects.push(projectId);
            // Удаляем из дизлайков, если был
            const dislikeIndex = user.value.dislikedProjects.indexOf(projectId);
            if (dislikeIndex > -1) {
                user.value.dislikedProjects.splice(dislikeIndex, 1);
            }
            localStorage.setItem('user', JSON.stringify(user.value));
        }
    };

    const addDislikedProject = (projectId) => {
        if (!user.value) return;
        
        if (!user.value.dislikedProjects.includes(projectId)) {
            user.value.dislikedProjects.push(projectId);
            // Удаляем из лайков, если был
            const likeIndex = user.value.likedProjects.indexOf(projectId);
            if (likeIndex > -1) {
                user.value.likedProjects.splice(likeIndex, 1);
            }
            localStorage.setItem('user', JSON.stringify(user.value));
        }
    };

    return {
        user,
        isAuthenticated,
        login,
        register,
        loginWithGoogle,
        registerWithGoogle,
        logout,
        hasLikedProject,
        hasDislikedProject,
        addLikedProject,
        addDislikedProject
    };
} 