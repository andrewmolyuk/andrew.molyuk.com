<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const EYEBROWS = [
  'building AI-native engineering tools',
  '20+ years in R&D leadership',
  '35+ years in tech',
  'self-hosted, infra-first',
]

const text = ref('')

let eyebrowIndex = 0
let charIndex = 0
let erasing = false
let timer: ReturnType<typeof setTimeout>

function step() {
  const full = EYEBROWS[eyebrowIndex]
  let wait = 55
  if (!erasing) {
    if (charIndex < full.length) {
      charIndex += 1
      text.value = full.slice(0, charIndex)
    } else {
      erasing = true
      wait = 2600
    }
  } else if (charIndex > 0) {
    charIndex -= 1
    text.value = full.slice(0, charIndex)
    wait = 26
  } else {
    erasing = false
    eyebrowIndex = (eyebrowIndex + 1) % EYEBROWS.length
    wait = 320
  }
  timer = setTimeout(step, wait)
}

onMounted(() => {
  timer = setTimeout(step, 500)
})
onUnmounted(() => clearTimeout(timer))
</script>

<template>
  <span class="text-muted font-mono text-[12.5px] tracking-[0.12em] uppercase">
    <span class="text-accent">~/</span><span class="transition-opacity duration-350">{{ text }}</span
    ><span
      class="bg-accent ml-1 inline-block h-[0.95em] w-[2px] align-[-0.13em]"
      style="animation: blink 1s step-end infinite"
    ></span>
  </span>
</template>
