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
    desc: 'Self-hosted infrastructure by default — managed APIs where they earn their place. Managed platforms are a cost centre and a trust problem.',
  },
  {
    n: '03',
    title: 'Depth over breadth',
    desc: "Thirty-five years in one problem space — high-load, high-stakes systems. Tools change; the problems don't.",
  },
]

const TIMELINE = ['CGS Tower Networks (2024–now)', 'Vidcrunch (2016–2024)', 'Screenz (2015–2016)', 'BestTV (2006–2011)']
</script>

<template>
  <section id="approach" class="border-line border-t px-8 py-22">
    <div class="mx-auto max-w-[1100px]">
      <div class="mb-11">
        <span class="text-muted mb-2 block font-mono text-[11.5px] tracking-[0.18em] uppercase"
          >03 / approach &amp; background</span
        >
        <h2 class="text-heading text-[clamp(26px,3.5vw,40px)] leading-[1.1] font-semibold tracking-[-0.03em]">
          How I Think About Systems
        </h2>
      </div>

      <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
        <div v-for="p in PRINCIPLES" :key="p.n" class="border-line bg-panel rounded-md border px-[22px] pt-[22px] pb-5">
          <div class="mb-3.5 flex items-center gap-2.5">
            <span class="text-accent font-mono text-[11.5px]">{{ p.n }}</span>
            <div class="bg-accent/16 h-px flex-1"></div>
          </div>
          <div class="text-heading mb-2.5 text-[15px] font-medium">{{ p.title }}</div>
          <p class="text-muted text-[15px] leading-[1.75]">{{ p.desc }}</p>
        </div>
      </div>

      <p class="text-muted mt-5.5 text-[15px] leading-[1.75]">
        Currently System Architect &amp; AI Evangelist at CGS Tower Networks — building centralized management and
        complex embedded-WebUI configuration systems for hardware devices, leading engineering hands-on, and driving AI
        adoption end to end. ~20 years hands-on leading R&amp;D teams before that.
      </p>

      <div
        class="border-line text-faint mt-4 flex flex-wrap gap-x-3.5 gap-y-1.5 border-t pt-4 font-mono text-[11.5px] tracking-[0.02em]"
      >
        <template v-for="(item, i) in TIMELINE" :key="item">
          <span v-if="i > 0">·</span>
          <span>{{ item }}</span>
        </template>
      </div>
    </div>
  </section>
</template>
