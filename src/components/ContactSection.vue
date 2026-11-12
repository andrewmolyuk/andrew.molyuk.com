<script setup lang="ts">
const TELEGRAM = { href: 'https://t.me/andrewmolyuk', handle: 't.me/andrewmolyuk' }

const OTHERS = [
  { label: 'email', href: 'mailto:andrew@molyuk.com' },
  { label: 'linkedin', href: 'https://linkedin.com/in/andrewmolyuk' },
  { label: 'github', href: 'https://github.com/andrewmolyuk' },
  { label: 'whatsapp', href: null },
]

// The number is assembled only on click, so it never sits in the page for scrapers to collect.
const WA = ['2847', '674', '45', '279']
function openWhatsApp() {
  const number = WA.map((part) => [...part].reverse().join(''))
    .reverse()
    .join('')
  window.open(`https://wa.me/${number}`, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <section id="contact" class="border-line overflow-hidden border-t px-8 pt-22 pb-20">
    <div class="mx-auto grid max-w-[1100px] items-center gap-x-16 gap-y-12 md:grid-cols-[1fr_minmax(0,520px)]">
      <div>
        <h2 class="text-heading mb-6 text-[clamp(26px,3.5vw,40px)] font-semibold tracking-[-0.03em]">Let's talk</h2>
        <p class="text-muted max-w-[440px] text-[15px] leading-[1.75]">
          Open to opportunities and consulting: architecture, systems that have to stay up under load, and AI, from the
          first agents to a team that ships with them. Anything else worth building, too.
        </p>
        <p class="text-muted mt-4 max-w-[440px] text-[15px] leading-[1.75]">Telegram is the fastest way to reach me.</p>
      </div>

      <div class="relative">
        <div
          class="pointer-events-none absolute -inset-16"
          aria-hidden="true"
          style="
            background-image:
              linear-gradient(rgba(77, 216, 255, 0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(77, 216, 255, 0.12) 1px, transparent 1px);
            background-size: 48px 48px;
            -webkit-mask-image: radial-gradient(ellipse at center, #000 0%, transparent 70%);
            mask-image: radial-gradient(ellipse at center, #000 0%, transparent 70%);
          "
        ></div>

        <a
          :href="TELEGRAM.href"
          target="_blank"
          rel="noopener noreferrer"
          class="group border-line bg-panel hover:border-accent/50 relative block rounded-md border p-5 font-mono transition-colors duration-200 sm:p-6"
        >
          <div class="text-faint mb-4 flex items-center justify-between text-[11px] tracking-[0.12em] uppercase">
            <span>telegram</span>
            <span class="group-hover:text-accent transition-colors duration-200">open ↗</span>
          </div>
          <div class="flex flex-wrap items-center gap-x-2.5 text-[clamp(14px,1.9vw,17px)] leading-[1.6]">
            <span><span class="text-accent">andrew@molyuk.com</span><span class="text-faint">:~$</span></span>
            <span class="text-body group-hover:text-white">open {{ TELEGRAM.handle }}</span>
            <span
              class="bg-accent -ml-1 inline-block h-[1.15em] w-[3px] shadow-[0_0_18px_rgba(77,216,255,0.75)]"
              style="animation: blink 1.1s step-end infinite"
              aria-hidden="true"
            ></span>
          </div>
        </a>

        <div class="relative mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[12.5px]">
          <span class="text-faint">or</span>
          <template v-for="(c, i) in OTHERS" :key="c.label">
            <span v-if="i > 0" class="text-line-strong">·</span>
            <a
              v-if="c.href"
              :href="c.href"
              :target="c.href.startsWith('http') ? '_blank' : undefined"
              :rel="c.href.startsWith('http') ? 'noopener noreferrer' : undefined"
              class="text-muted hover:text-accent transition-colors duration-200"
              >{{ c.label }}</a
            >
            <button
              v-else
              type="button"
              class="text-muted hover:text-accent cursor-pointer transition-colors duration-200"
              @click="openWhatsApp"
            >
              {{ c.label }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
