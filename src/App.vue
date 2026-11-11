<script setup lang="ts">
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import ApproachSection from './components/ApproachSection.vue'
import ContactSection from './components/ContactSection.vue'
import HeroSection from './components/HeroSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import SkillsSection from './components/SkillsSection.vue'
</script>

<template>
  <div class="bg-ink relative min-h-screen">
    <div class="relative z-1">
      <AppHeader />

      <main>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ApproachSection />
        <ContactSection />
      </main>

      <AppFooter />
    </div>
  </div>
</template>
