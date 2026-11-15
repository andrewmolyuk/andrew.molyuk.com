<script setup lang="ts">
// The two recommendations Andrew's LinkedIn profile shows publicly, each cut to its opening sentences,
// word for word.
const QUOTES = [
  {
    name: 'Alexander Natashkin',
    text: 'Andrew is a calm and wise leader, and I can say only good things about working with him. He stays composed in stressful situations, makes thoughtful and well‑reasoned decisions, and always focuses on what is best for the team and the product.',
  },
  {
    name: 'Ruslan Labyntsev',
    text: 'I wholeheartedly recommend Andrew as a CTO with an extensive wealth of experience. His broad knowledge of various programming languages and technologies is truly impressive. As a person, he is not only highly skilled but also exceptionally friendly and approachable.',
  },
]
</script>

<template>
  <section id="recommendations" class="border-line border-t px-8 py-22">
    <div class="mx-auto max-w-[1100px]">
      <h2 class="text-heading mb-11 text-[clamp(26px,3.5vw,40px)] leading-[1.1] font-semibold tracking-[-0.03em]">
        Recommendations
      </h2>

      <div class="grid gap-4 md:grid-cols-2">
        <figure v-for="q in QUOTES" :key="q.name" class="border-line bg-panel rounded-md border px-7 pt-6 pb-5">
          <blockquote class="text-body text-[15px] leading-[1.75]">“{{ q.text }}”</blockquote>
          <figcaption class="text-muted mt-4 font-mono text-[12.5px]">— {{ q.name }}, on LinkedIn</figcaption>
        </figure>
      </div>

      <a
        href="https://linkedin.com/in/andrewmolyuk"
        target="_blank"
        rel="noopener noreferrer"
        class="text-muted hover:text-accent mt-6 inline-block font-mono text-[12.5px] transition-colors duration-200"
        >More recommendations on LinkedIn ↗</a
      >
    </div>
  </section>
</template>
