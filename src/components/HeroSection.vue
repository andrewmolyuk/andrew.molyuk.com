<script setup lang="ts">
import { computed } from 'vue'
import AgentLogTerminal from './AgentLogTerminal.vue'
import { ROLES, yearsCoding } from '../lib/career'
import { TELEGRAM } from '../lib/contact'
import { useToday } from '../lib/today'

const today = useToday()
const YEARS = computed(() => yearsCoding(today.value))
/** The role that is still running, so the line under the name never needs editing when it changes. */
const CURRENT = ROLES.find((r) => r.end === null)!

const STATS = computed(() => [
  { value: '~23B', label: 'events/day', source: 'Vidcrunch' },
  { value: '100K', label: 'RPS steady', source: 'Vidcrunch' },
  { value: '3M', label: 'req/sec', source: 'Screenz' },
  { value: String(YEARS.value), label: 'years', source: 'in prod' },
])
</script>

<template>
  <section class="flex min-h-screen items-center px-8 pt-[100px] pb-[60px]">
    <div
      class="mx-auto grid w-full max-w-[1100px] grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-center gap-16"
    >
      <div>
        <div
          class="border-success/27 bg-success/8 text-success mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[12px]"
        >
          <span class="bg-success size-1.5 rounded-full"></span>
          Open to roles and consulting
        </div>

        <h1 class="text-heading mb-[22px] text-[clamp(42px,6vw,76px)] leading-[1.05] font-semibold tracking-[-0.04em]">
          Andrew Molyuk
        </h1>

        <div class="text-accent mb-7 min-h-[1.4em] font-mono text-[clamp(13px,1.8vw,18px)]">
          System Architect / Distributed Systems → AI Engineering
        </div>

        <p class="text-muted mb-10 max-w-[460px] text-[15px] leading-[1.8]">
          {{ YEARS }} years in tech. Systems at 100K RPS scale.<br />
          Now {{ CURRENT.title }} at {{ CURRENT.company }}, building AI-native engineering tools.
        </p>

        <div class="mb-13 flex flex-wrap gap-2.5">
          <a
            :href="TELEGRAM.href"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-accent text-ink inline-flex items-center gap-1.5 rounded px-[18px] py-2.5 text-[15px] font-semibold hover:opacity-85"
            >Message me on Telegram ↗</a
          >
          <a href="#projects" class="text-muted hover:text-body inline-flex items-center px-1 py-2.5 text-[15px]"
            >See what I'm building →</a
          >
        </div>

        <div class="border-line flex flex-wrap gap-y-5 border-t pt-7">
          <div v-for="stat in STATS" :key="stat.label" class="flex-[0_1_88px] pr-[18px] pb-1">
            <div class="text-heading font-mono text-[22px] leading-none font-medium tracking-[-0.03em]">
              {{ stat.value }}
            </div>
            <div class="text-accent mt-[3px] font-mono text-[12px] tracking-[0.1em] whitespace-nowrap uppercase">
              {{ stat.label }}
            </div>
            <div class="text-muted mt-0.5 text-[12px]">{{ stat.source }}</div>
          </div>
        </div>
      </div>

      <AgentLogTerminal />
    </div>
  </section>
</template>
