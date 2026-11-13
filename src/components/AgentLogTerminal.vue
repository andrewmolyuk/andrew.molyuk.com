<script setup lang="ts">
type Sticker = { name: string; role: string; rotate: string; delay: string }

type Row = {
  dot: 'say' | 'ok' | 'err'
  head: { text: string; dim?: boolean; bold?: boolean }[]
  result?: string
  sticker?: Sticker
}

const ROWS: Row[] = [
  {
    dot: 'say',
    head: [
      { text: 'The project keeps money in whole cents ' },
      { text: '(.about/adr/money.md)', dim: true },
      { text: ', so the fix rounds in cents and leaves the type alone.' },
    ],
    sticker: { name: 'Baloo', role: 'Remembers', rotate: '-6deg', delay: '0.4s' },
  },
  { dot: 'ok', head: [{ text: 'Read', bold: true }, { text: '(apps/api/cart.go)' }], result: 'Read 84 lines' },
  {
    dot: 'err',
    head: [{ text: 'Bash', bold: true }, { text: '(cat .env)' }],
    result: 'Blocked by bagheera: .env is an env file, and showing it would put a secret into this session',
    sticker: { name: 'Bagheera', role: 'Guards', rotate: '7deg', delay: '0.9s' },
  },
  {
    dot: 'ok',
    head: [{ text: 'Update', bold: true }, { text: '(apps/api/cart.go)' }],
    result: 'Updated with 2 additions and 1 removal',
  },
  {
    dot: 'ok',
    head: [{ text: 'Bash', bold: true }, { text: '(git commit -m "fix(cart): round the total to cents")' }],
    result: 'hathi: 7 checks pass, the same as CI will run',
    sticker: { name: 'Hathi', role: 'Checks', rotate: '-5deg', delay: '1.4s' },
  },
  {
    dot: 'ok',
    head: [{ text: 'louie:verifier', bold: true }, { text: '(cart total)' }],
    result: 'Matches the money decision and the cart’s acceptance criteria',
  },
  {
    dot: 'say',
    head: [
      {
        text: 'Pull request #42 is open for review. This session settled that totals round half up; bagheera proposed it for .about/, so the next session starts knowing it.',
      },
    ],
    sticker: { name: 'Louie', role: 'Builds', rotate: '6deg', delay: '1.9s' },
  },
]

const DOT_CLASS = { say: 'text-heading', ok: 'text-success', err: 'text-danger' }
</script>

<template>
  <div class="sm:mr-10">
    <div class="text-muted mb-2.5 font-mono text-[11.5px] tracking-[0.15em] uppercase">
      sample session — claude code + bunderlog
    </div>

    <div
      class="border-line bg-panel flex flex-col gap-3.5 rounded-md border p-4 font-mono text-[12.5px] leading-[1.55]"
    >
      <div class="border-accent/50 rounded border px-3 py-2">
        <div class="text-heading"><span class="text-accent">✻</span> Welcome to Claude Code</div>
        <div class="text-muted">cwd: ~/shop</div>
        <div class="text-muted">baloo: 22 decisions · 26 terms · 9 features in .about/</div>
      </div>

      <div class="bg-panel-alt text-body rounded px-2.5 py-1">
        <span class="text-muted">&gt;</span> The cart total is off by a cent. Fix it
      </div>

      <div v-for="(row, i) in ROWS" :key="i" class="relative sm:pr-9">
        <div class="flex gap-2.5">
          <span class="shrink-0 text-[10px] leading-[19px]" :class="DOT_CLASS[row.dot]">⏺</span>
          <span class="text-body">
            <span
              v-for="(part, j) in row.head"
              :key="j"
              :class="part.dim ? 'text-muted' : part.bold ? 'text-heading font-medium' : ''"
              >{{ part.text }}</span
            >
          </span>
        </div>
        <div v-if="row.result" class="flex gap-2 pl-[22px]">
          <span class="text-faint shrink-0">⎿</span>
          <span :class="row.dot === 'err' ? 'text-danger' : 'text-muted'">{{ row.result }}</span>
        </div>

        <div
          v-if="row.sticker"
          aria-hidden="true"
          class="absolute top-[-14px] left-full z-10 -ml-8 hidden w-16 flex-col items-center sm:flex"
          :style="{ animation: `pop 0.5s cubic-bezier(0.3, 1.6, 0.5, 1) ${row.sticker.delay} both` }"
        >
          <img
            :src="`/stickers/${row.sticker.name.toLowerCase()}.svg`"
            alt=""
            width="64"
            height="64"
            :style="{ rotate: row.sticker.rotate }"
          />
          <span class="text-heading font-sans text-[13px] leading-tight font-semibold">{{ row.sticker.name }}</span>
          <span class="text-accent text-[9.5px] tracking-[0.08em] uppercase">{{ row.sticker.role }}</span>
        </div>
      </div>

      <div>
        <div class="border-line flex items-center gap-2 rounded border px-2.5 py-1.5">
          <span class="text-muted">&gt;</span>
          <span class="bg-body inline-block h-[14px] w-[7px] animate-pulse"></span>
        </div>
        <div class="text-faint mt-1.5 text-[11px]">? for shortcuts</div>
      </div>
    </div>
  </div>
</template>
