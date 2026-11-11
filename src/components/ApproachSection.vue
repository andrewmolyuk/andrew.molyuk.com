<script setup lang="ts">
const PRINCIPLES = [
  {
    n: '01',
    title: 'LLM × Determinism',
    desc: 'Separates LLM reasoning from deterministic validation. The model proposes; the system verifies.',
  },
  {
    n: '02',
    title: 'Infra follows requirements',
    desc: 'Self-hosted or managed is a call per project: load, cost, compliance, and who will run it at 3 a.m. Neither is right by default.',
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
        I've been writing software for about 35 years, and for close to 20 of them I also ran the teams that wrote it.
        Most of that went into systems that weren't allowed to fall over. At Screenz it was live TV voting that peaked
        at 3 million requests a second; at Vidcrunch, video ads at around 23 billion events a day. Now I'm at CGS Tower
        Networks, building management software for network hardware and getting AI agents to do real work there. They're
        good at it, mostly. What they're bad at is remembering: every session starts from zero, and that annoyed me
        enough to start bunderlog. I still write code most days and I don't plan to stop.
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
