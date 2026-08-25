<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const LOG_DELAYS = [0, 900, 1800, 2600, 3300, 4100, 5200, 6000, 6700, 7400, 8400]

const LOG_LINES = [
  { time: '00:000', tag: '[foreman]', tagClass: 'text-accent', text: 'scanning jira backlog...' },
  {
    time: '00:900',
    tag: '[foreman]',
    tagClass: 'text-accent',
    text: 'picked PROJ-142 — rate limiting on API gateway',
  },
  { time: '01:800', tag: '[minion]', tagClass: 'text-warn', text: 'spawning container f3a9b2...' },
  { time: '02:600', tag: '[minion]', tagClass: 'text-warn', text: 'analyzing codebase structure' },
  { time: '03:300', tag: '[minion]', tagClass: 'text-warn', text: 'entry point: src/api/middleware.ts' },
  { time: '04:100', tag: '[minion]', tagClass: 'text-warn', text: 'implementing changes with claude code...' },
  { time: '05:200', tag: '[minion]', tagClass: 'text-warn', text: 'running test suite...' },
  { time: '06:000', tag: '[minion]', tagClass: 'text-success', text: '✓ tests passing (18/18)' },
  { time: '06:700', tag: '[minion]', tagClass: 'text-success', text: '✓ PR #847 opened → review queue' },
  { time: '07:400', tag: '[foreman]', tagClass: 'text-accent', text: 'PROJ-142 done. scanning next task...' },
  {
    time: '08:400',
    tag: '[foreman]',
    tagClass: 'text-accent',
    text: 'picked PROJ-143 — add pagination to /users',
  },
]

const shown = ref(0)
let timers: ReturnType<typeof setTimeout>[] = []
let loop: ReturnType<typeof setTimeout>

function runLog() {
  timers = LOG_DELAYS.map((d, i) => setTimeout(() => (shown.value = i + 1), d + 400))
  loop = setTimeout(
    () => {
      shown.value = 0
      runLog()
    },
    LOG_DELAYS[LOG_DELAYS.length - 1] + 3000,
  )
}

onMounted(runLog)
onUnmounted(() => {
  clearTimeout(loop)
  timers.forEach(clearTimeout)
})
</script>

<template>
  <div>
    <div class="text-muted mb-2.5 font-mono text-[11.5px] tracking-[0.15em] uppercase">
      sample run — instrumenta agent runtime
    </div>

    <div class="border-line bg-panel overflow-hidden rounded-md border font-mono">
      <div class="border-line bg-panel-alt flex items-center gap-2 border-b px-4 py-2.5">
        <span class="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></span>
        <span class="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></span>
        <span class="h-2.5 w-2.5 rounded-full bg-[#28c840]"></span>
        <span class="text-muted ml-2 text-[12.5px]">instrumenta — agent runtime</span>
      </div>

      <div class="flex h-[248px] flex-col gap-1.5 overflow-hidden px-4 py-3.5">
        <div
          v-for="(line, i) in LOG_LINES"
          :key="line.time"
          class="flex gap-2.5 transition-opacity duration-300 ease-out"
          :style="{ opacity: i < shown ? 1 : 0 }"
        >
          <span class="text-faint shrink-0 text-[12.5px]">{{ line.time }}</span>
          <span class="min-w-[52px] shrink-0 text-[12.5px]" :class="line.tagClass">{{ line.tag }}</span>
          <span class="text-body text-[12.5px] leading-[1.4]">{{ line.text }}</span>
        </div>
      </div>
    </div>

    <div class="mt-3 flex gap-3.5">
      <div class="flex items-center gap-1.5">
        <span class="bg-accent h-1.5 w-1.5 rounded-full"></span>
        <span class="text-muted font-mono text-[11px] tracking-[0.1em] uppercase">foreman</span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="bg-warn h-1.5 w-1.5 rounded-full"></span>
        <span class="text-muted font-mono text-[11px] tracking-[0.1em] uppercase">minion</span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="bg-success h-1.5 w-1.5 rounded-full"></span>
        <span class="text-muted font-mono text-[11px] tracking-[0.1em] uppercase">success</span>
      </div>
    </div>
  </div>
</template>
