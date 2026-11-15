<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 48
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// The prompt is hidden on a phone (`hidden sm:inline`), where it and the four links don't fit side by side.
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-250"
    :class="scrolled ? 'border-line bg-ink/[0.94] backdrop-blur-lg' : 'border-transparent bg-transparent'"
  >
    <div class="mx-auto flex h-14 max-w-[1100px] items-center justify-between gap-5 px-5 sm:px-8">
      <span class="text-accent hidden font-mono text-[13px] sm:inline"
        >andrew@molyuk.com<span class="text-faint">:~$</span></span
      >
      <nav class="ml-auto flex items-center gap-4 text-[15px] sm:gap-7">
        <a href="#approach" class="text-muted hover:text-body">Experience</a>
        <a href="#skills" class="text-muted hover:text-body">Skills</a>
        <a href="#projects" class="text-muted hover:text-body">Projects</a>
        <a href="#contact" class="text-muted hover:text-body">Contact</a>
      </nav>
    </div>
  </header>
</template>
