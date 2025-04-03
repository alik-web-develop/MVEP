<template>
    <header class="fixed top-0 left-0 right-0 flex justify-between items-center p-6 backdrop-blur-md z-50">
        <div class="text-white text-3xl font-bold hover:text-primary transition-colors duration-300">LOGO</div>
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
    </header>
</template>
<script setup>
import { ref } from 'vue';
const Menu =ref([
    {name:'Services',href:'#services'},
    {name:'About Me',href:'#about'},
    {name:'Skills',href:'#skills'},
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
        background: rgba(17, 24, 39, 0.8);
    }
}
</style>