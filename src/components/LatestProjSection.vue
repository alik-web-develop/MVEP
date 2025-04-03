<template>
    <section class="latest-projects section" id="projects">
        <h2 class="section-title">
            <span>Latest Projects</span>
        </h2>
        <div class="filter-buttons">
            <button 
                v-for="category in categories" 
                :key="category"
                @click="filterProjects(category)"
                :class="['filter-btn', { active: selectedCategory === category }]"
            >
                        {{ category }}
            </button>
            <button 
                @click="filterProjects('favorites')"
                :class="['filter-btn', { active: selectedCategory === 'favorites' }]"
            >
                Favorites
            </button>
            <button @click="openCreateModal" class="create-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Создать проект
            </button>
        </div>
        <div class="projects-grid">
            <div v-for="(project, index) in filteredProjects" :key="project.id" class="project-card" :style="getCardStyle(index)">
                <div class="project-image-container">
                    <img :src="project.image" :alt="project.title" class="project-image" @click="openModal(project)">
                    <button class="code-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                        </svg>
                    </button>
                </div>
                <div class="project-info">
                    <h3>{{ project.title }}</h3>
                    <p>{{ project.description }}</p>
                    <div class="technologies">
                        <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
                            {{ tech }}
                        </span>
                    </div>
                    <div class="project-actions">
                        <div class="like-section">
                            <div class="stat-circle" @click="toggleLike(project)">
                                <div class="action-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                    </svg>
                                </div>
                                <span>{{ project.likes }}</span>
                            </div>
                            <div class="stat-circle" @click="toggleDislike(project)">
                                <div class="action-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                                    </svg>
                                </div>
                                <span>{{ project.dislikes }}</span>
                            </div>
                        </div>
                        <div class="link-buttons">
                            <button @click="openModal(project)" class="action-btn code-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                                </svg>
                            </button>
                            <a :href="project.webURL" target="_blank" class="action-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                            </a>
                            <button @click="toggleFavorite(project)" class="action-btn favorite-btn" :class="{ 'favorite-active': project.isFavorite }">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="project.isFavorite ? '#FFD700' : 'currentColor'" :fill="project.isFavorite ? '#FFD700' : 'none'" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                            </button>
            </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div v-if="selectedProject" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <button class="modal-close" @click="closeModal">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <img :src="selectedProject.image" :alt="selectedProject.title" class="modal-image">
                <div class="modal-info">
                    <h2>{{ selectedProject.title }}</h2>
                    <p>{{ selectedProject.description }}</p>
                    <div class="technologies">
                        <span v-for="tech in selectedProject.technologies" :key="tech" class="tech-tag">
                            {{ tech }}
                        </span>
                    </div>
                    <div class="modal-actions">
                        <div class="like-section">
                            <div class="stat-circle" @click="toggleLike(selectedProject)">
                                <div class="action-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                    </svg>
                                </div>
                                <span>{{ selectedProject.likes }}</span>
                            </div>
                            <div class="stat-circle" @click="toggleDislike(selectedProject)">
                                <div class="action-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                                    </svg>
                                </div>
                                <span>{{ selectedProject.dislikes }}</span>
                            </div>
                        </div>
                        <div class="link-buttons">
                            <a :href="selectedProject.gitURL" target="_blank" class="action-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                                </svg>
                            </a>
                            <a :href="selectedProject.webURL" target="_blank" class="action-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                            </a>
                    </div>
                    </div>
                </div>
                </div>
        </div>

        <CreateProjectModal 
            :is-open="isCreateModalOpen" 
            @close="closeCreateModal"
            @create="createProject"
        />
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuth } from '../composables/useAuth';
import projectsData from '../store/db.json';
import CreateProjectModal from './CreateProjectModal.vue';
import { updateProjects } from '../utils/dbUtils';

const { user, isAuthenticated, hasLikedProject, hasDislikedProject, addLikedProject, addDislikedProject } = useAuth();

const projects = ref(projectsData.projects.map(project => ({
    ...project,
    isFavorite: false,
    likes: 0,
    dislikes: 0,
    likedBy: [],
    dislikedBy: []
})));

const selectedProject = ref(null);
const categories = ['all', ...new Set(projects.value.map(project => project.category.toLowerCase()))];
const selectedCategory = ref('all');

const filteredProjects = computed(() => {
    if (selectedCategory.value === 'favorites') {
        return projects.value.filter(project => project.isFavorite);
    }
    if (selectedCategory.value === 'all') return projects.value;
    return projects.value.filter(project => 
        project.category.toLowerCase() === selectedCategory.value
    );
});

const filterProjects = (category) => {
    selectedCategory.value = category;
};

const toggleLike = (project) => {
    if (!isAuthenticated.value) {
        alert('Пожалуйста, войдите в систему, чтобы оценивать проекты');
        return;
    }

    if (hasLikedProject(project.id)) {
        project.likes--;
        const index = project.likedBy.indexOf(user.value.id);
        if (index > -1) {
            project.likedBy.splice(index, 1);
        }
    } else {
        project.likes++;
        project.likedBy.push(user.value.id);
        addLikedProject(project.id);

        if (hasDislikedProject(project.id)) {
            project.dislikes--;
            const dislikeIndex = project.dislikedBy.indexOf(user.value.id);
            if (dislikeIndex > -1) {
                project.dislikedBy.splice(dislikeIndex, 1);
            }
        }
    }
    updateProjects(projects.value);
};

const toggleDislike = (project) => {
    if (!isAuthenticated.value) {
        alert('Пожалуйста, войдите в систему, чтобы оценивать проекты');
        return;
    }

    if (hasDislikedProject(project.id)) {
        project.dislikes--;
        const index = project.dislikedBy.indexOf(user.value.id);
        if (index > -1) {
            project.dislikedBy.splice(index, 1);
        }
    } else {
        project.dislikes++;
        project.dislikedBy.push(user.value.id);
        addDislikedProject(project.id);

        if (hasLikedProject(project.id)) {
            project.likes--;
            const likeIndex = project.likedBy.indexOf(user.value.id);
            if (likeIndex > -1) {
                project.likedBy.splice(likeIndex, 1);
            }
        }
    }
    updateProjects(projects.value);
};

const toggleFavorite = (project) => {
    project.isFavorite = !project.isFavorite;
    updateProjects(projects.value);
};

const openModal = (project) => {
    selectedProject.value = project;
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    selectedProject.value = null;
    document.body.style.overflow = 'auto';
};

const isCreateModalOpen = ref(false);

const openCreateModal = () => {
    isCreateModalOpen.value = true;
};

const closeCreateModal = () => {
    isCreateModalOpen.value = false;
};

const createProject = (newProject) => {
    if (!isAuthenticated.value) {
        alert('Пожалуйста, войдите в систему, чтобы создавать проекты');
        return;
    }

    const projectToAdd = {
        ...newProject,
        id: Date.now(),
        isFavorite: false,
        likes: 0,
        dislikes: 0,
        likedBy: [],
        dislikedBy: [],
        createdBy: user.value.id
    };

    projects.value.push(projectToAdd);
    updateProjects(projects.value);
};

// Add index for staggered animation
const getCardStyle = (index) => {
    return {
        '--index': index
    };
};
</script>

<style scoped>
.latest-projects {
    padding: 6rem 2rem;
    background: linear-gradient(180deg, #0B0B21 0%, #111a3e 50%, #0B0B21 100%);
    position: relative;
    overflow: hidden;
}

.latest-projects::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(180deg, rgba(87, 12, 172, 0.2) 0%, rgba(87, 12, 172, 0) 100%);
    pointer-events: none;
}

.latest-projects::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(0deg, rgba(87, 12, 172, 0.2) 0%, rgba(87, 12, 172, 0) 100%);
    pointer-events: none;
}

.section-title {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
    font-weight: 600;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    width: 100%;
}

.section-title span {
    background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
}

.filter-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
    width: 100%;
}

.filter-btn {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 12px;
    padding: 0.5rem 1.5rem;
    color: #94a3b8;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(139, 92, 246, 0.2);
}

.filter-btn:hover {
    background: rgba(139, 92, 246, 0.1);
    border-color: rgba(139, 92, 246, 0.3);
    color: #8B5CF6;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.25),
                0 0 20px rgba(139, 92, 246, 0.15);
}

.filter-btn.active {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(109, 40, 217, 0.2) 100%);
    color: #8B5CF6;
    border-color: rgba(139, 92, 246, 0.3);
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3),
                0 0 25px rgba(139, 92, 246, 0.2);
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    padding: 0 2rem;
    max-width: 1400px;
    margin: 0 auto;
}

.project-card {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 24px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.2),
                0 0 30px rgba(139, 92, 246, 0.1);
    position: relative;
}

.project-card:hover {
    transform: translateY(-8px);
    border-color: rgba(139, 92, 246, 0.4);
    box-shadow: 0 15px 35px rgba(139, 92, 246, 0.25),
                0 0 40px rgba(139, 92, 246, 0.2),
                0 0 60px rgba(139, 92, 246, 0.1);
}

.project-image-container {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
}

.project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.project-card:hover .project-image {
    transform: scale(1.05);
}

.code-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
    border-radius: 8px;
    padding: 0.5rem;
    z-index: 10;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    &:hover {
        background: rgba(139, 92, 246, 0.2);
        border-color: rgba(139, 92, 246, 0.3);
    }

    svg {
        width: 20px;
        height: 20px;
        color: #fff;
    }
}

.favorite-btn {
    svg {
        width: 24px;
        height: 24px;
    }

    &.favorite-active svg {
        fill: #FFD700;
        stroke: #FFD700;
    }
}

.project-info {
    padding: 1.5rem;
}

.project-info h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #fff;
    margin-bottom: 0.75rem;
}

.project-info p {
    color: #94a3b8;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1rem;
}

.technologies {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.tech-tag {
    background: rgba(139, 92, 246, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 12px;
    font-size: 0.875rem;
    color: #8B5CF6;
    border: 1px solid rgba(139, 92, 246, 0.2);
    transition: all 0.3s ease;
    text-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
}

.tech-tag:hover {
    background: rgba(139, 92, 246, 0.2);
    border-color: rgba(139, 92, 246, 0.3);
    text-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
    box-shadow: 0 0 15px rgba(139, 92, 246, 0.2);
}

.project-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
}

.like-section {
    display: flex;
    gap: 1rem;
    margin: 0;
}

.stat-circle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;

    span {
        color: #fff;
        font-size: 0.875rem;
    }

    .action-btn {
        display: flex;
        align-items: center;
        background: transparent;
        padding: 0;
        border: none;

        svg {
            width: 20px;
            height: 20px;
            color: #fff;
        }
    }

    &:hover {
        background: rgba(139, 92, 246, 0.1);
        border-color: rgba(139, 92, 246, 0.3);
        transform: translateY(-2px);
    }
}

.action-btn {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.action-btn:hover {
    background: rgba(139, 92, 246, 0.2);
    color: #8B5CF6;
}

.create-btn {
    background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);
    color: #fff;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    border: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3),
                0 0 20px rgba(139, 92, 246, 0.2);
}

.create-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4),
                0 0 30px rgba(139, 92, 246, 0.3);
}

.create-btn svg {
    width: 20px;
    height: 20px;
}

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
    animation: fadeIn 0.3s ease;
}

.modal-content {
    background: #0B0B21;
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 24px;
    width: 100%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    animation: zoomIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: #8B5CF6;
    cursor: pointer;
    padding: 0.5rem;
    z-index: 1;
    transition: all 0.3s ease;
}

.modal-close:hover {
    transform: scale(1.1);
    color: #6D28D9;
}

.modal-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
}

.modal-info {
    padding: 2rem;
}

.modal-info h2 {
    color: #fff;
    font-size: 2rem;
    margin-bottom: 1rem;
}

.modal-info p {
    color: #94a3b8;
    margin-bottom: 1.5rem;
}

.modal-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(139, 92, 246, 0.1);
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes zoomIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@media (max-width: 768px) {
    .filter-buttons {
        justify-content: center;
    }
    
    .section-title {
        text-align: center;
    }
}

.project-overlay {
    background: linear-gradient(to top, rgba(11, 11, 33, 0.9), rgba(139, 92, 246, 0.1));
}

.project-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #8B5CF6;
    margin-bottom: 0.5rem;
}

.project-category {
    color: #6D28D9;
    font-size: 0.875rem;
    font-weight: 500;
}

.project-link {
    color: #8B5CF6;
    transition: all 0.3s ease;
}

.project-link:hover {
    color: #6D28D9;
    transform: translateX(5px);
}

.project-tech {
    color: #94a3b8;
    font-size: 0.875rem;
}

.project-tech span {
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 12px;
    padding: 0.25rem 0.75rem;
    margin-right: 0.5rem;
    transition: all 0.3s ease;
}

.project-tech span:hover {
    background: rgba(139, 92, 246, 0.2);
    border-color: rgba(139, 92, 246, 0.3);
}
</style>
