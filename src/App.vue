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
  <div class="relative min-h-screen bg-ink">
    <div
      class="pointer-events-none fixed inset-0 z-0 opacity-15"
      style="
        background-image:
          linear-gradient(#1e1e28 1px, transparent 1px),
          linear-gradient(90deg, #1e1e28 1px, transparent 1px);
        background-size: 48px 48px;
      "
    ></div>

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
