<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { TELEGRAM } from '../lib/contact'

const LINKS = [
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'recommendations', label: 'Recommendations' },
  { id: 'contact', label: 'Contact' },
]

const scrolled = ref(false)
/** The links' menu on a phone, where the five links don't fit in the bar. */
const menuOpen = ref(false)
/** The linked section across the line 40% down the screen, lit in the header; none over Hero. */
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

// The Telegram button stays in the header on every screen, the one action the page asks for. Narrower
// screens make room for it: the links show from md (a menu below), the button's "Message" from sm.
// The name shows on every screen, so the bar's left is never empty.
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b px-8 transition-[background-color,border-color] duration-250"
    :class="scrolled ? 'border-line bg-ink/[0.94] backdrop-blur-lg' : 'border-transparent bg-transparent'"
  >
    <!-- The padding sits outside the 1100px, as every section's does, so the bar lines up with the page. -->
    <div class="mx-auto flex h-14 max-w-[1100px] items-center justify-between gap-5">
      <a href="#" class="text-heading text-base font-semibold tracking-[-0.01em] whitespace-nowrap hover:opacity-85"
        >Andrew Molyuk</a
      >
      <div class="ml-auto flex items-center gap-3 md:gap-6">
        <!-- gap-4 below lg: at 768px the name, the five links and "Message" fit only that close. -->
        <nav class="hidden items-center gap-4 text-base md:flex lg:gap-6">
          <a
            v-for="link in LINKS"
            :key="link.id"
            :href="`#${link.id}`"
            :aria-current="current === link.id ? 'location' : undefined"
            class="py-2 transition-colors duration-200"
            :class="current === link.id ? 'text-heading' : 'text-muted hover:text-body'"
            >{{ link.label }}</a
          >
        </nav>
        <button
          type="button"
          class="text-body border-line inline-flex items-center gap-2 rounded border px-3 py-1.5 text-sm md:hidden"
          :aria-expanded="menuOpen"
          aria-controls="site-menu"
          @click="menuOpen = !menuOpen"
        >
          Menu <span aria-hidden="true">{{ menuOpen ? '×' : '≡' }}</span>
        </button>
        <a
          :href="TELEGRAM.href"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message me on Telegram"
          class="bg-accent text-ink inline-flex items-center gap-1.5 rounded px-2 py-1.5 text-sm font-semibold hover:opacity-85 sm:px-3"
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
    <nav
      v-if="menuOpen"
      id="site-menu"
      class="border-line bg-ink/[0.97] -mx-8 flex flex-col border-b px-8 pb-3 backdrop-blur-lg md:hidden"
    >
      <a
        v-for="link in LINKS"
        :key="link.id"
        :href="`#${link.id}`"
        :aria-current="current === link.id ? 'location' : undefined"
        class="border-line border-t py-3 text-lg"
        :class="current === link.id ? 'text-heading' : 'text-muted'"
        @click="menuOpen = false"
        >{{ link.label }}</a
      >
    </nav>
  </header>
</template>
