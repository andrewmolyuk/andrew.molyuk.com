<script setup lang="ts">
import AgentLogTerminal from './AgentLogTerminal.vue'
import { ROLES } from '../lib/career'
import { CV, TELEGRAM } from '../lib/contact'
import { LOCATION, LOOKING_FOR, NAME, POSITIONING } from '../lib/profile'

/** The role that is still running, so the line under the name never needs editing when it changes. */
const CURRENT = ROLES.find((r) => r.end === null)!
/** It as a fact in a sentence, not a second headline: its summary, or else its title. */
const CURRENT_ROLE = CURRENT.summary ?? CURRENT.title

// The grid's columns are min(420px, 100%) wide, not 420px: on a phone, 420px is wider than the
// screen, and the page would scroll sideways.

// Three figures from the systems behind the career, and one from the AI work now (instrumenta's
// 90 days to November 2026), so the move to AI Engineering has proof of its own.
const STATS = [
  { value: '~23B', label: 'events/day', source: 'Vidcrunch' },
  { value: '100K', label: 'req/s steady', source: 'Vidcrunch' },
  { value: '3M', label: 'req/s peak', source: 'Screenz' },
  { value: '69', label: 'merged PRs', source: 'instrumenta · 90d' },
]
</script>

<template>
  <section class="flex min-h-screen items-center px-8 pt-[100px] pb-[60px]">
    <div
      class="mx-auto grid w-full max-w-[1100px] grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-center gap-16"
    >
      <div>
        <div class="mb-6 flex items-center gap-4">
          <img
            src="/andrew.jpg"
            alt="Andrew Molyuk"
            width="56"
            height="56"
            class="border-line size-14 shrink-0 rounded-full border object-cover"
          />
          <div
            class="border-success/27 bg-success/8 text-success inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[12px]"
          >
            <span class="bg-success size-1.5 rounded-full"></span>
            Open to roles and consulting
          </div>
        </div>

        <h1 class="text-heading mb-[22px] text-[clamp(42px,6vw,76px)] leading-[1.05] font-semibold tracking-[-0.04em]">
          {{ NAME }}
        </h1>

        <div class="text-accent mb-7 min-h-[1.4em] font-mono text-[clamp(13px,1.8vw,18px)]">
          {{ POSITIONING }}
        </div>

        <p class="text-muted mb-5 max-w-[540px] text-[15px] leading-[1.8]">
          Today at {{ CURRENT.company }}: {{ CURRENT_ROLE }}.<br />
          Building AI-native engineering tools of my own.
        </p>

        <p class="text-muted mb-10 max-w-[540px] font-mono text-[12.5px] leading-[1.8]">
          <span class="text-accent">Looking for:</span> {{ LOOKING_FOR }} · {{ LOCATION }}
        </p>

        <div class="mb-13 flex flex-wrap gap-2.5">
          <a
            :href="TELEGRAM.href"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-accent text-ink inline-flex items-center gap-1.5 rounded px-[18px] py-2.5 text-[15px] font-semibold hover:opacity-85"
            >Message me on Telegram ↗</a
          >
          <a
            :href="CV"
            target="_blank"
            rel="noopener noreferrer"
            class="border-line text-body hover:border-accent/50 hover:text-accent inline-flex items-center gap-1.5 rounded border px-[18px] py-2.5 text-[15px] transition-colors duration-200"
            >CV (PDF) ↓</a
          >
        </div>

        <div class="border-line grid grid-cols-2 gap-y-5 border-t pt-7 sm:flex sm:flex-wrap">
          <div v-for="stat in STATS" :key="stat.label" class="pr-[18px] pb-1 sm:flex-[0_1_88px]">
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
