<script setup lang="ts">
import { ref } from 'vue'
import { CV, EMAIL, LINKEDIN, TELEGRAM, whatsAppNumber } from '../lib/contact'

const OTHERS = [
  { label: 'linkedin', href: LINKEDIN },
  { label: 'github', href: 'https://github.com/andrewmolyuk' },
  { label: 'whatsapp', href: null },
  { label: 'cv (pdf)', href: CV },
]

/** Many recruiters can't use Telegram from work and log contacts by email, so the address shows in full. */
const copied = ref(false)
async function copyEmail() {
  await navigator.clipboard.writeText(EMAIL)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}

function openWhatsApp() {
  window.open(`https://wa.me/${whatsAppNumber()}`, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <section id="contact" class="border-line overflow-hidden border-t px-8 pt-22 pb-20">
    <div class="mx-auto grid max-w-[1100px] items-center gap-x-16 gap-y-12 lg:grid-cols-[1fr_minmax(0,520px)]">
      <div>
        <h2 class="text-heading text-title mb-6 font-semibold tracking-[-0.03em]">Let's talk</h2>
        <p class="text-muted max-w-[440px] text-base leading-[1.75]">
          Open to opportunities and consulting: architecture, systems that have to stay up under load, and AI, from the
          first agents to a team that ships with them. Anything else worth building, too.
        </p>
        <p class="text-muted mt-4 max-w-[440px] text-base leading-[1.75]">Telegram is the fastest way to reach me.</p>
      </div>

      <div class="relative">
        <div
          class="pointer-events-none absolute -inset-16"
          aria-hidden="true"
          style="
            background-image:
              linear-gradient(color-mix(in srgb, var(--color-accent) 12%, transparent) 1px, transparent 1px),
              linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 12%, transparent) 1px, transparent 1px);
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
          <!-- The whole card is the link; the pill only makes it look like the Hero's button, the same one
               action, which the terminal line alone didn't. -->
          <div class="mb-4 flex items-center justify-between">
            <span class="text-faint text-xs tracking-[0.12em] uppercase">telegram</span>
            <span class="bg-accent text-ink rounded px-3 py-1.5 font-sans text-sm font-semibold group-hover:opacity-85"
              >Message me ↗</span
            >
          </div>
          <div class="flex flex-wrap items-center gap-x-2.5 text-[clamp(14px,1.9vw,17px)] leading-[1.6]">
            <span><span class="text-accent">andrew@molyuk.com</span><span class="text-faint">:~$</span></span>
            <span class="text-body group-hover:text-heading">open {{ TELEGRAM.handle }}</span>
            <span
              class="bg-accent shadow-accent/75 -ml-1 inline-block h-[1.15em] w-[3px] shadow-[0_0_18px_var(--color-accent)]"
              style="animation: blink 1.1s step-end infinite"
              aria-hidden="true"
            ></span>
          </div>
        </a>

        <div
          class="border-line bg-panel relative mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-md border px-5 py-3.5 font-mono sm:px-6"
        >
          <a :href="`mailto:${EMAIL}`" class="text-body hover:text-accent text-base transition-colors duration-200">
            <span class="text-faint mr-2.5 text-xs tracking-[0.12em] uppercase">email</span>{{ EMAIL }}
          </a>
          <button
            type="button"
            class="text-faint hover:text-accent cursor-pointer text-xs tracking-[0.12em] uppercase transition-colors duration-200"
            @click="copyEmail"
          >
            {{ copied ? 'copied' : 'copy' }}
          </button>
        </div>

        <div class="relative mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-sm">
          <span class="text-faint">or</span>
          <template v-for="(c, i) in OTHERS" :key="c.label">
            <span v-if="i > 0" class="text-faint" aria-hidden="true">·</span>
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
