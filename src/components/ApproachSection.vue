<script setup lang="ts">
import { ref } from 'vue'
import {
  CODING_SINCE,
  PRINCIPLES,
  ROLES,
  origin,
  principleOf,
  span,
  ticks,
  toYm,
  years,
  yearsCoding,
} from '../lib/career'

const NOW = toYm(new Date())
const TICKS = ticks(NOW)
const YEARS = yearsCoding()
const DEPTH = PRINCIPLES.find((p) => p.from === null)!
const rows = ROLES.map((role) => ({
  ...role,
  span: span(role, NOW),
  years: years(role),
  principle: principleOf(role.company),
}))

/** The principle in focus, linking its column above to its row on the timeline. */
const focus = ref<string | null>(null)
const lit = (n: string | undefined) => n !== undefined && focus.value === n
</script>

<template>
  <section id="approach" class="border-line border-t px-8 py-22">
    <div class="mx-auto max-w-[1100px]">
      <div class="mb-6">
        <h2 class="text-heading text-[clamp(26px,3.5vw,40px)] leading-[1.1] font-semibold tracking-[-0.03em]">
          How I Think About Systems
        </h2>
      </div>

      <p class="text-muted mb-12 max-w-[640px] text-[15px] leading-[1.75]">
        I've been writing software since {{ CODING_SINCE }}, and for close to 20 of those years I also ran the teams
        that wrote it. The principles I work by weren't picked up from a book; each came out of a place on the line
        below.
      </p>

      <div class="mb-16 grid gap-x-10 gap-y-9 md:grid-cols-3">
        <div
          v-for="p in PRINCIPLES"
          :key="p.n"
          class="cursor-default"
          @mouseenter="focus = p.n"
          @mouseleave="focus = null"
        >
          <div class="mb-4 flex items-center gap-3">
            <span class="text-accent font-mono text-[12px]">{{ p.n }}</span>
            <span
              class="h-px flex-1 transition-colors duration-200"
              :class="lit(p.n) ? 'bg-accent/70' : 'bg-accent/16'"
            ></span>
          </div>
          <h3 class="text-heading mb-2 text-[17px] font-medium tracking-[-0.01em]">{{ p.title }}</h3>
          <p class="text-muted text-[14.5px] leading-[1.7]">{{ p.desc }}</p>
          <div class="text-faint mt-3 font-mono text-[11.5px]">{{ origin(p) }}</div>
        </div>
      </div>

      <div class="career text-[14px]">
        <div
          class="text-faint hidden pb-3 font-mono text-[10.5px] tracking-[0.1em] uppercase md:grid"
          aria-hidden="true"
        >
          <span>Years</span>
          <span>Role · team</span>
          <div class="relative">
            <span v-for="t in TICKS" :key="t.year" class="absolute -translate-x-1/2" :style="{ left: `${t.at}%` }">
              {{ t.year }}
            </span>
          </div>
          <span>What it's remembered for</span>
        </div>

        <div
          v-for="row in rows"
          :key="row.company"
          class="group border-line grid border-t py-5 transition-colors duration-200 md:py-6"
          :class="lit(row.principle?.n) ? 'bg-panel' : 'hover:bg-panel/70'"
          @mouseenter="focus = row.principle?.n ?? null"
          @mouseleave="focus = null"
        >
          <span class="font-mono text-[12px] leading-[22px]" :class="row.end ? 'text-faint' : 'text-accent'">
            {{ row.years }}
          </span>

          <div>
            <div class="text-heading text-[15px] leading-[22px] font-medium">{{ row.company }}</div>
            <div class="text-muted mt-0.5 font-mono text-[11.5px] leading-[1.5]">
              {{ row.title }}<template v-if="row.team"> · {{ row.team }} engineers</template>
            </div>
          </div>

          <div class="relative my-3 h-3 md:my-0 md:h-auto md:self-stretch" aria-hidden="true">
            <span
              v-for="t in TICKS"
              :key="t.year"
              class="bg-line absolute -top-6 -bottom-6 hidden w-px md:block"
              :style="{ left: `${t.at}%` }"
            ></span>
            <span
              class="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full transition-colors duration-200 md:top-[11px]"
              :class="!row.end || lit(row.principle?.n) ? 'bg-accent' : 'group-hover:bg-accent/70 bg-[#3a3a46]'"
              :style="{ left: `${row.span.left}%`, width: `${row.span.width}%` }"
            ></span>
            <span
              v-if="!row.end"
              class="absolute top-1/2 right-0 size-2.5 translate-x-1/2 -translate-y-1/2 md:top-[11px]"
              :title="`${row.company}, now`"
            >
              <span class="bg-accent absolute inset-0 animate-ping rounded-full opacity-60"></span>
              <span class="bg-accent absolute inset-0 rounded-full"></span>
            </span>
          </div>

          <p class="text-muted leading-[1.65]">{{ row.result }}</p>
        </div>

        <div
          class="border-line-strong grid border-t py-5 transition-colors duration-200 md:py-6"
          :class="lit(DEPTH.n) ? 'bg-panel' : ''"
          @mouseenter="focus = DEPTH.n"
          @mouseleave="focus = null"
        >
          <span class="text-faint font-mono text-[12px] leading-[22px]">{{ CODING_SINCE }}–now</span>
          <div>
            <div class="text-heading text-[15px] leading-[22px] font-medium">{{ YEARS }} years</div>
            <div class="text-muted mt-0.5 font-mono text-[11.5px] leading-[1.5]">one problem space</div>
          </div>
          <div class="relative my-3 h-3 md:my-0 md:h-[22px]" aria-hidden="true">
            <span
              class="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-linear-to-r from-transparent to-current transition-colors duration-200"
              :class="lit(DEPTH.n) ? 'text-accent' : 'text-[#5a5a68]'"
            ></span>
            <span
              class="absolute top-1/2 right-0 h-3 w-px -translate-y-1/2 transition-colors duration-200"
              :class="lit(DEPTH.n) ? 'bg-accent' : 'bg-[#5a5a68]'"
            ></span>
          </div>
          <p class="text-muted leading-[1.65]">
            Writing code since {{ CODING_SINCE }}, leading teams since 2006, helping AI write correct code since 2025.
          </p>
        </div>
      </div>

      <p class="text-muted mt-12 max-w-[640px] text-[15px] leading-[1.75]">
        Agents are good at real work, mostly. What they're bad at is remembering: every session starts from zero, and
        that annoyed me enough to start bunderlog. I still write code most days and I don't plan to stop.
      </p>
    </div>
  </section>
</template>

<style scoped>
@media (min-width: 768px) {
  .career > * {
    grid-template-columns: 84px 220px minmax(0, 1fr) 360px;
    column-gap: 28px;
    align-items: start;
  }
}
</style>
