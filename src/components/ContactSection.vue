<script setup lang="ts">
const CONTACTS = [
  { label: 'Email', href: 'mailto:andrew@molyuk.com', display: 'andrew@molyuk.com', external: false },
  {
    label: 'GitHub',
    href: 'https://github.com/andrewmolyuk',
    display: 'github.com/andrewmolyuk',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/andrewmolyuk',
    display: 'linkedin.com/in/andrewmolyuk',
    external: true,
  },
  { label: 'Telegram', href: 'https://t.me/andrewmolyuk', display: 't.me/andrewmolyuk', external: true },
  { label: 'WhatsApp', href: 'https://wa.me/972544767482', display: '+972 54 476 7482', external: true },
]
</script>

<template>
  <section id="contact" class="border-line border-t px-8 pt-22 pb-18">
    <div class="mx-auto max-w-[1100px]">
      <h2 class="text-heading mb-11 text-[clamp(26px,3.5vw,40px)] font-semibold tracking-[-0.03em]">Get in Touch</h2>
      <div class="flex max-w-[520px] flex-col">
        <a
          v-for="c in CONTACTS"
          :key="c.label"
          :href="c.href"
          :target="c.external ? '_blank' : undefined"
          :rel="c.external ? 'noopener noreferrer' : undefined"
          class="border-line text-muted hover:text-accent flex items-center justify-between gap-4 border-b py-3.5"
        >
          <span class="text-faint w-19 shrink-0 font-mono text-[11.5px] tracking-[0.12em] uppercase">{{
            c.label
          }}</span>
          <span class="flex-1 font-mono text-[15px] text-inherit">{{ c.display }}</span>
          <span class="text-faint text-[15px]">↗</span>
        </a>
      </div>
    </div>
  </section>
</template>
