<script setup lang="ts">
import { NAME, POSITIONING, STATS } from './lib/profile'
import { BUNDERLOG } from './lib/projects'

// The link-preview card: the Hero in 1200×630, from the same data, so the two never disagree.
// `mise run og` takes its picture into public/og-image.png. Its sizes are written out in pixels, off
// the site's type scale: the card is a picture of a fixed size, seen shrunk in a chat or a feed.
const SITE = 'andrew.molyuk.com'
</script>

<template>
  <div class="bg-ink relative h-[630px] w-[1200px] overflow-hidden px-[72px] py-[60px] font-sans">
    <!-- The grid of faint lines and the glow behind the name, as on the old card. -->
    <div
      aria-hidden="true"
      class="absolute inset-0 bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_70%_20%,black,transparent_75%)] bg-size-[48px_48px] opacity-60"
    ></div>
    <div
      aria-hidden="true"
      class="bg-accent/10 absolute -top-40 -right-24 size-[520px] rounded-full blur-[120px]"
    ></div>

    <div class="relative flex h-full flex-col">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-5">
          <img src="/andrew.jpg" alt="" width="88" height="88" class="border-line size-[88px] rounded-full border" />
          <div
            class="border-success/27 bg-success/8 text-success inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 font-mono text-[18px]"
          >
            <span class="bg-success size-2 rounded-full"></span>
            Open to roles and consulting
          </div>
        </div>
        <div class="text-faint font-mono text-[18px] tracking-[0.12em] uppercase">{{ SITE }}</div>
      </div>

      <h1 class="text-heading mt-7 text-[96px] leading-none font-semibold tracking-[-0.04em]">{{ NAME }}</h1>
      <div class="text-accent mt-5 font-mono text-[26px]">{{ POSITIONING }}</div>
      <p class="text-muted mt-4 max-w-[1000px] text-[25px] leading-[1.45]">
        Building <span class="text-heading font-medium">bunderlog</span>: {{ BUNDERLOG.what }}.
      </p>

      <div class="border-line mt-auto flex gap-16 border-t pt-6">
        <div v-for="stat in STATS" :key="stat.label">
          <div class="text-heading font-mono text-[38px] leading-none font-medium tracking-[-0.03em]">
            {{ stat.value }}
          </div>
          <div class="text-accent mt-2 font-mono text-[15px] tracking-[0.1em] uppercase">{{ stat.label }}</div>
          <div class="text-muted mt-0.5 text-[16px]">{{ stat.source }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
