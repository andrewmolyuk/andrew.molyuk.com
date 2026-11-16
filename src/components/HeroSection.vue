<script setup lang="ts">
import AgentLogTerminal from './AgentLogTerminal.vue'
import { ROLES } from '../lib/career'
import { CV, TELEGRAM } from '../lib/contact'
import { LOCATION, LOOKING_FOR, NAME, POSITIONING, STATS } from '../lib/profile'
import { BUNDERLOG } from '../lib/projects'

/** The role that is still running, so the line under the name never needs editing when it changes. */
const CURRENT = ROLES.find((r) => r.end === null)!
/** It as a fact in a sentence, not a second headline: its summary, or else its title. */
const CURRENT_ROLE = CURRENT.summary ?? CURRENT.title
/** The role line as where he comes from and where he is going; the second part never breaks, so
 *  "AI Engineering" can't split across two lines. */
const [FROM, TO] = POSITIONING.split(' → ')

// Two columns from 1024px, one below. The columns sit at the top of the grid, not at the center:
// opening the whole session grows only its own column, and the left one stays put. The section is
// as tall as its content, not the screen: on a tall screen, Experience shows under the figures
// instead of an empty band.
</script>

<template>
  <section class="px-8 pt-[100px] pb-[60px]">
    <div class="mx-auto grid w-full max-w-[1100px] items-start gap-16 lg:grid-cols-2">
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
          {{ FROM }} <span class="whitespace-nowrap">→ {{ TO }}</span>
        </div>

        <p class="text-muted mb-5 max-w-[540px] text-base leading-[1.8]">
          Today at {{ CURRENT.company }}: {{ CURRENT_ROLE }}.<br />
          Building
          <a
            :href="BUNDERLOG.site"
            target="_blank"
            rel="noopener noreferrer"
            class="text-heading decoration-accent/50 hover:text-accent font-medium underline underline-offset-4"
            >bunderlog ↗</a
          >: {{ BUNDERLOG.what }}.
        </p>

        <!-- In the body's font and brighter than the line above: it is what a recruiter reads the Hero for. -->
        <p class="text-body mb-10 max-w-[540px] text-base leading-[1.8]">
          <span class="text-accent font-medium">Looking for:</span> {{ LOOKING_FOR }} · {{ LOCATION }}
        </p>

        <div class="mb-11 flex flex-wrap gap-2.5">
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
