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
// screen, and the page would scroll sideways. The grid sits at the top of the section, and the
// columns at the top of the grid, not at the center: opening the whole session grows only its own
// column, and the left one stays put on a screen of any height.

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
  <section class="flex min-h-screen items-start px-8 pt-[100px] pb-[60px]">
    <div
      class="mx-auto grid w-full max-w-[1100px] grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-start gap-16"
    >
      <div>
        <div class="mb-6 flex items-center gap-4">
          <img
            src="/andrew.jpg"
            alt="Andrew Molyuk"
            width="72"
            height="72"
            class="border-line size-18 shrink-0 rounded-full border object-cover"
          />
          <div
            class="border-success/27 bg-success/8 text-success inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs"
          >
            <span class="bg-success size-1.5 rounded-full"></span>
            Open to roles and consulting
          </div>
        </div>

        <!-- At most 72px, not more: that keeps the name on one line wherever the Hero has two columns, so
             the figures under it still fit a 1280×800 screen. -->
        <h1 class="text-heading mb-[22px] text-[clamp(42px,6vw,72px)] leading-[1.05] font-semibold tracking-[-0.04em]">
          {{ NAME }}
        </h1>

        <div class="text-accent mb-7 min-h-[1.4em] font-mono text-[clamp(13px,1.8vw,18px)]">
          {{ POSITIONING }}
        </div>

        <p class="text-muted mb-5 max-w-[540px] text-base leading-[1.8]">
          Today at {{ CURRENT.company }}: {{ CURRENT_ROLE }}.<br />
          Building AI-native engineering tools of my own.
        </p>

        <!-- In the body's font and brighter than the line above: it is what a recruiter reads the Hero for. -->
        <p class="text-body mb-10 max-w-[540px] text-base leading-[1.8]">
          <span class="text-accent font-medium">Looking for:</span> {{ LOOKING_FOR }} · {{ LOCATION }}
        </p>

        <div class="mb-13 flex flex-wrap gap-2.5">
          <a
            :href="TELEGRAM.href"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-accent text-ink inline-flex items-center gap-1.5 rounded px-[18px] py-2.5 text-base font-semibold hover:opacity-85"
            >Message me on Telegram ↗</a
          >
          <a
            :href="CV"
            target="_blank"
            rel="noopener noreferrer"
            class="border-line text-body hover:border-accent/50 hover:text-accent inline-flex items-center gap-1.5 rounded border px-[18px] py-2.5 text-base transition-colors duration-200"
            >CV (PDF) ↓</a
          >
        </div>

        <div class="border-line grid grid-cols-2 gap-y-5 border-t pt-7 sm:flex sm:flex-wrap">
          <div v-for="stat in STATS" :key="stat.label" class="pr-[18px] pb-1 sm:flex-[0_1_88px]">
            <div class="text-heading font-mono text-xl leading-none font-medium tracking-[-0.03em]">
              {{ stat.value }}
            </div>
            <div class="text-accent mt-[3px] font-mono text-xs tracking-[0.1em] whitespace-nowrap uppercase">
              {{ stat.label }}
            </div>
            <div class="text-muted mt-0.5 text-xs whitespace-nowrap">{{ stat.source }}</div>
          </div>
        </div>
      </div>

      <AgentLogTerminal />
    </div>
  </section>
</template>
