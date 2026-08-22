<script setup lang="ts">
import AgentLogTerminal from './AgentLogTerminal.vue'
import TypewriterEyebrow from './TypewriterEyebrow.vue'

const STATS = [
  { value: '~23B', label: 'events/day', source: 'Vidcrunch' },
  { value: '100K', label: 'RPS idle', source: 'Vidcrunch' },
  { value: '3M', label: 'req/sec', source: 'Screenz' },
  { value: '35+', label: 'years', source: 'in prod' },
]
</script>

<template>
  <section class="flex min-h-screen items-center px-8 pt-[100px] pb-[60px]">
    <div class="mx-auto grid w-full max-w-[1100px] grid-cols-[repeat(auto-fit,minmax(420px,1fr))] items-center gap-16">
      <div>
        <div class="mb-7">
          <TypewriterEyebrow />
        </div>

        <h1
          class="mb-[22px] text-[clamp(42px,6vw,76px)] leading-[1.05] font-semibold tracking-[-0.04em] text-heading"
        >
          Andrew Molyuk
        </h1>

        <div class="mb-7 min-h-[1.4em] font-mono text-[clamp(13px,1.8vw,18px)] text-accent">
          CTO / Distributed Systems → AI Engineering
        </div>

        <p class="mb-10 max-w-[460px] text-[15px] leading-[1.8] text-muted">
          35+ years shipping systems at 100K RPS scale.<br />
          Now building AI-native engineering tools.
        </p>

        <div class="mb-13 flex flex-wrap gap-2.5">
          <a
            href="https://github.com/andrewmolyuk/instrumenta"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 rounded bg-accent px-[18px] py-2.5 text-[15px] font-semibold text-ink hover:opacity-85"
            >See what I'm building →</a
          >
          <a href="#contact" class="inline-flex items-center px-1 py-2.5 text-[15px] text-muted hover:text-body"
            >Get in touch</a
          >
        </div>

        <div class="flex flex-wrap gap-y-5 border-t border-line pt-7">
          <div v-for="stat in STATS" :key="stat.label" class="flex-[0_1_88px] pr-[18px] pb-1">
            <div class="text-[22px] leading-none font-medium tracking-[-0.03em] text-heading font-mono">
              {{ stat.value }}
            </div>
            <div class="mt-[3px] font-mono text-[11px] tracking-[0.1em] text-accent uppercase">
              {{ stat.label }}
            </div>
            <div class="mt-0.5 text-[11.5px] text-muted">{{ stat.source }}</div>
          </div>
        </div>
      </div>

      <AgentLogTerminal />
    </div>
  </section>
</template>
