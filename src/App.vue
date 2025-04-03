<template>
  <div class="bg-[#0B0B21] min-h-screen">
    <NavBar />
    <Suspense>
      <template #default>
        <div>
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <ExperienceAndSkills />
          <CoursesSection />
          <LatestProjSection />
          <TestimonialsSection />
          <ContactSection />
          <Footer />
          <BackToTop />
        </div>
      </template>
      <template #fallback>
        <div class="flex justify-center items-center min-h-screen">
          <loadingSpinner />
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import NavBar from './components/NavBar.vue';
import loadingSpinner from './components/loadingSpinner.vue';

// Асинхронный импорт компонентов с правильными путями
const HeroSection = defineAsyncComponent(() => 
  import('./components/HeroSection.vue').catch(err => {
    console.error('Error loading HeroSection:', err);
    return import('./components/loadingSpinner.vue');
  })
);

const ServicesSection = defineAsyncComponent(() => 
  import('./components/ServicesSection.vue').catch(err => {
    console.error('Error loading ServicesSection:', err);
    return import('./components/loadingSpinner.vue');
  })
);

const AboutSection = defineAsyncComponent(() => 
  import('./components/AboutSection.vue').catch(err => {
    console.error('Error loading AboutSection:', err);
    return import('./components/loadingSpinner.vue');
  })
);

const TestimonialsSection = defineAsyncComponent(() => 
  import('./components/TestimonialsSection.vue').catch(err => {
    console.error('Error loading TestimonialsSection:', err);
    return import('./components/loadingSpinner.vue');
  })
);

const LatestProjSection = defineAsyncComponent(() => 
  import('./components/LatestProjSection.vue').catch(err => {
    console.error('Error loading LatestProjSection:', err);
    return import('./components/loadingSpinner.vue');
  })
);

const ExperienceAndSkills = defineAsyncComponent(() => 
  import('./components/ExperienceAndSkills.vue').catch(err => {
    console.error('Error loading ExperienceAndSkills:', err);
    return import('./components/loadingSpinner.vue');
  })
);

const ContactSection = defineAsyncComponent(() => 
  import('./components/ContactSection.vue').catch(err => {
    console.error('Error loading ContactSection:', err);
    return import('./components/loadingSpinner.vue');
  })
);

const CoursesSection = defineAsyncComponent(() => 
  import('./components/CoursesSection.vue').catch(err => {
    console.error('Error loading CoursesSection:', err);
    return import('./components/loadingSpinner.vue');
  })
);

const Footer = defineAsyncComponent(() => 
  import('./components/Footer.vue').catch(err => {
    console.error('Error loading Footer:', err);
    return import('./components/loadingSpinner.vue');
  })
);

const BackToTop = defineAsyncComponent(() => 
  import('./components/BackToTop.vue').catch(err => {
    console.error('Error loading BackToTop:', err);
    return import('./components/loadingSpinner.vue');
  })
);
</script>

<style>
:root {
  --primary: #8B5CF6;
  --secondary: #6D28D9;
  --accent: #7C3AED;
  --background: #0B0B21;
  --surface: #111a3e;
  --text: #ffffff;
  --text-secondary: #94a3b8;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--background);
  color: var(--text);
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #1f1641;
}

::-webkit-scrollbar-thumb {
  background: #8B5CF6;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6D28D9;
}

* {
  transition: background-color 0.3s ease,
              border-color 0.3s ease,
              color 0.3s ease,
              transform 0.3s ease,
              box-shadow 0.3s ease;
}
</style>

