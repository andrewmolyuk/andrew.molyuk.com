<script setup lang="ts">
const PRINCIPLES = [
  {
    n: '01',
    title: 'LLM × Determinism',
    desc: 'Separates LLM reasoning from deterministic validation. The model proposes; the system verifies.',
  },
  {
    n: '02',
    title: 'Own your infra',
    desc: 'Prefers self-hosted, infrastructure-controlled solutions. Managed platforms are a cost centre and a trust problem.',
  },
  {
    n: '03',
    title: 'Depth over breadth',
    desc: 'Thirty-five years in one problem space — high-load, high-stakes systems — before betting on the next one. Not a generalist collecting frameworks.',
  },
]

const TIMELINE = [
  'CGS Tower Networks (2024–now)',
  'Vidcrunch (2016–2024)',
  'Screenz (2015–2016)',
  'BestTV (2006–2011)',
]
</script>

<template>
  <section id="approach" class="border-t border-line px-8 py-22">
    <div class="mx-auto max-w-[1100px]">
      <div class="mb-11">
        <span class="mb-2 block font-mono text-[11.5px] tracking-[0.18em] text-muted uppercase"
          >03 / approach &amp; background</span
        >
        <h2 class="text-[clamp(26px,3.5vw,40px)] leading-[1.1] font-semibold tracking-[-0.03em] text-heading">
          How I Think About Systems
        </h2>
      </div>

      <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
        <div v-for="p in PRINCIPLES" :key="p.n" class="rounded-md border border-line bg-panel px-[22px] pt-[22px] pb-5">
          <div class="mb-3.5 flex items-center gap-2.5">
            <span class="font-mono text-[11.5px] text-accent">{{ p.n }}</span>
            <div class="h-px flex-1 bg-accent/16"></div>
          </div>
          <div class="mb-2.5 text-[15px] font-medium text-heading">{{ p.title }}</div>
          <p class="text-[15px] leading-[1.75] text-muted">{{ p.desc }}</p>
        </div>
      </div>

      <div
        class="mt-5.5 flex flex-wrap gap-x-3.5 gap-y-1.5 border-t border-line pt-4 font-mono text-[11.5px] tracking-[0.02em] text-faint"
      >
        <template v-for="(item, i) in TIMELINE" :key="item">
          <span v-if="i > 0">·</span>
          <span>{{ item }}</span>
        </template>
      </div>
    </div>
  </section>
</template>
