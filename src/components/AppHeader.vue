<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { TELEGRAM } from '../lib/contact'

const LINKS = [
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const scrolled = ref(false)
/** The linked section across the line 40% down the screen, lit in the header; none over Hero or Recommendations. */
const current = ref<string | null>(null)

function onScroll() {
  scrolled.value = window.scrollY > 48
  const line = window.innerHeight * 0.4
  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
  const under = [...document.querySelectorAll('main > section')].find((section) => {
    const { top, bottom } = section.getBoundingClientRect()
    return top <= line && bottom > line
  })
  // The last section is too short to reach the line, so the bottom of the page lights it.
  const id = atBottom ? LINKS.at(-1)!.id : under?.id
  current.value = LINKS.some((l) => l.id === id) ? id! : null
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// The Telegram button stays in the header on every screen, the one action the page asks for. On a phone
// the prompt is hidden (`hidden sm:inline`) and the button is an icon: with the four links, nothing more fits.
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-250"
    :class="scrolled ? 'border-line bg-ink/[0.94] backdrop-blur-lg' : 'border-transparent bg-transparent'"
  >
    <div class="mx-auto flex h-14 max-w-[1100px] items-center justify-between gap-5 px-5 sm:px-8">
      <span class="text-accent hidden font-mono text-[13px] sm:inline"
        >andrew@molyuk.com<span class="text-faint">:~$</span></span
      >
      <div class="ml-auto flex items-center gap-4 sm:gap-7">
        <nav class="flex items-center gap-3.5 text-[15px] sm:gap-7">
          <a
            v-for="link in LINKS"
            :key="link.id"
            :href="`#${link.id}`"
            :aria-current="current === link.id ? 'location' : undefined"
            class="transition-colors duration-200"
            :class="current === link.id ? 'text-heading' : 'text-muted hover:text-body'"
            >{{ link.label }}</a
          >
        </nav>
        <a
          :href="TELEGRAM.href"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message me on Telegram"
          class="bg-accent text-ink inline-flex items-center gap-1.5 rounded px-2 py-1.5 text-[13px] font-semibold hover:opacity-85 sm:px-3"
        >
          <!-- The "send" icon, from Lucide (ISC). -->
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"
            />
            <path d="m21.854 2.147-10.94 10.939" />
          </svg>
          <span class="hidden sm:inline">Message</span>
        </a>
      </div>
    </div>
  </header>
</template>
