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
  <section id="contact" class="border-t border-line px-8 pt-22 pb-18">
    <div class="mx-auto max-w-[1100px]">
      <span class="mb-2 block font-mono text-[11.5px] tracking-[0.18em] text-muted uppercase">04 / contact</span>
      <h2 class="mb-11 text-[clamp(26px,3.5vw,40px)] font-semibold tracking-[-0.03em] text-heading">
        Get in Touch
      </h2>
      <div class="grid grid-cols-[minmax(0,520px)_1fr] items-start gap-14">
        <div class="flex flex-col">
          <a
            v-for="c in CONTACTS"
            :key="c.label"
            :href="c.href"
            :target="c.external ? '_blank' : undefined"
            :rel="c.external ? 'noopener noreferrer' : undefined"
            class="flex items-center justify-between gap-4 border-b border-line py-3.5 text-muted hover:text-accent"
          >
            <span class="w-19 shrink-0 font-mono text-[11.5px] tracking-[0.12em] text-faint uppercase">{{
              c.label
            }}</span>
            <span class="flex-1 font-mono text-[15px] text-inherit">{{ c.display }}</span>
            <span class="text-[15px] text-faint">↗</span>
          </a>
        </div>

        <div class="relative flex w-full items-center justify-center self-stretch justify-self-stretch overflow-hidden">
          <div
            class="pointer-events-none absolute top-1/2 left-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 opacity-90"
            style="
              background-image:
                linear-gradient(rgba(77, 216, 255, 0.16) 1px, transparent 1px),
                linear-gradient(90deg, rgba(77, 216, 255, 0.16) 1px, transparent 1px);
              background-size: 48px 48px;
              -webkit-mask-image: radial-gradient(circle at center, #000 0%, transparent 70%);
              mask-image: radial-gradient(circle at center, #000 0%, transparent 70%);
            "
          ></div>
          <div
            class="pointer-events-none absolute top-1/2 left-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2"
            style="background: radial-gradient(circle at center, rgba(77, 216, 255, 0.1) 0%, transparent 65%)"
          ></div>
          <span
            class="relative inline-block h-[26px] w-[3px] bg-accent shadow-[0_0_26px_rgba(77,216,255,0.75)]"
            style="animation: blink 1.1s step-end infinite"
          ></span>
        </div>
      </div>
    </div>
  </section>
</template>
