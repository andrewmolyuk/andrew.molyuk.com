<script setup lang="ts">
import { LINKEDIN } from '../lib/contact'

// Three of the recommendations on Andrew's LinkedIn profile, chosen for who wrote them and how
// concrete they are, and cut to about the same length so the cards balance. Quoted word for word;
// "…" marks where a passage is left out. Each is signed with the company where its author and Andrew
// worked together, from the timeline, not the author's employer today.
const QUOTES = [
  {
    name: 'Yehuda Kedem',
    relation: 'managed Andrew at YKM, as its CEO',
    year: 2015,
    text: 'Andrew is a strong technical leader who possesses a great breadth and depth of technical knowledge and skills. … he is also the knowledge expert within development for complex issues such as system security, network configurations, performance optimizations …',
  },
  {
    name: 'Arseniy Pavlenko',
    relation: 'managed Andrew at Screenz',
    year: 2016,
    text: 'When Andrew came to our team, we were under terrible overload, but in just one month, he has helped us to establish a working process and we were able to breathe. … I would be very happy to work with him again!',
  },
  {
    name: 'Alexander Natashkin',
    relation: 'reported to Andrew at Vidcrunch',
    year: 2026,
    text: 'Andrew is a calm and wise leader, and I can say only good things about working with him. … Working with Andrew, you feel both freedom and support: he does not micromanage, but is always available for advice, guidance, and a broader strategic view.',
  },
]
</script>

<template>
  <section id="recommendations" class="border-line border-t px-8 py-22">
    <div class="mx-auto max-w-[1100px]">
      <h2 class="text-heading mb-11 text-[clamp(26px,3.5vw,40px)] leading-[1.1] font-semibold tracking-[-0.03em]">
        Recommendations
      </h2>

      <div class="grid gap-4 lg:grid-cols-3">
        <figure
          v-for="q in QUOTES"
          :key="q.name"
          class="border-line bg-panel flex flex-col rounded-md border px-6 pt-6 pb-5"
        >
          <blockquote class="text-body text-[15px] leading-[1.75]">“{{ q.text }}”</blockquote>
          <figcaption class="mt-auto pt-5">
            <div class="text-heading text-[14px] font-medium">{{ q.name }}</div>
            <div class="text-muted mt-0.5 font-mono text-[12px] leading-[1.6]">
              {{ q.relation }}<br />on LinkedIn, {{ q.year }}
            </div>
          </figcaption>
        </figure>
      </div>

      <a
        :href="LINKEDIN"
        target="_blank"
        rel="noopener noreferrer"
        class="text-muted hover:text-accent mt-6 inline-block font-mono text-[12.5px] transition-colors duration-200"
        >All recommendations on LinkedIn ↗</a
      >
    </div>
  </section>
</template>
