<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const YEAR = new Date().getFullYear()
const ZONE = 'Asia/Jerusalem'

const clock = ref('')
const offset = ref('')
let timer: ReturnType<typeof setInterval> | undefined

function tick() {
  const now = new Date()
  clock.value = new Intl.DateTimeFormat('en-GB', { timeZone: ZONE, hour: '2-digit', minute: '2-digit' }).format(now)
  const part = new Intl.DateTimeFormat('en-US', { timeZone: ZONE, timeZoneName: 'shortOffset' })
    .formatToParts(now)
    .find((p) => p.type === 'timeZoneName')
  offset.value = part ? part.value.replace('GMT', 'UTC') : ''
}

onMounted(() => {
  tick()
  timer = setInterval(tick, 30_000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <footer class="border-line border-t px-8 py-5">
    <div
      class="text-faint mx-auto grid max-w-[1100px] gap-x-6 gap-y-2 font-mono text-[11.5px] md:grid-cols-[1fr_auto_1fr]"
    >
      <span>© {{ YEAR }} Andrew Molyuk</span>
      <span class="md:text-center">
        <template v-if="clock">
          <span class="text-muted tabular-nums">{{ clock }}</span> in Israel · {{ offset }}
        </template>
      </span>
      <span class="md:text-right">
        <a
          href="https://github.com/andrewmolyuk/andrew.molyuk.com"
          target="_blank"
          rel="noopener noreferrer"
          class="text-muted hover:text-accent transition-colors duration-200"
          >source ↗</a
        >
        · Vue on Cloudflare Workers
      </span>
    </div>
  </footer>
</template>
