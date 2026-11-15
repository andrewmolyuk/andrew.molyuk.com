<script setup lang="ts">
import ProjectName from './ProjectName.vue'
import type { Project } from '../lib/projects'

defineProps<{ project: Project }>()
</script>

<template>
  <div
    class="border-line bg-panel hover:border-accent/27 flex flex-col rounded-md border px-6 pt-6 pb-5 transition-colors"
  >
    <div class="mb-3 flex items-start justify-between gap-3">
      <ProjectName :name="project.title" :icon="project.icon" :site="project.site" :github="project.github" />
      <span
        v-if="project.status"
        class="border-success/27 bg-success/8 text-success shrink-0 rounded border px-2.5 py-0.5 font-mono text-[12px] tracking-[0.1em] uppercase"
        >{{ project.status }}</span
      >
    </div>
    <p class="text-muted text-[14.5px] leading-[1.7]">{{ project.desc }}</p>
    <div v-if="project.fact" class="text-accent/80 mt-2 font-mono text-[12px]">{{ project.fact }}</div>
    <div class="text-faint mt-auto flex flex-wrap gap-1.5 pt-4 font-mono text-[12px]">
      <span v-for="tag in project.tags" :key="tag" class="border-line rounded border px-2 py-0.5">{{ tag }}</span>
    </div>
  </div>
</template>
