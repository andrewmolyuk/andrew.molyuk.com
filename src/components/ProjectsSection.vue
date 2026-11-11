<script setup lang="ts">
const TOOLS = [
  {
    n: '.about/',
    files: ['decisions', 'terms', 'requirements', 'house rules'],
    title: 'Project record',
    sub: 'plain files, committed',
    desc: 'Committed to the repository, so every person and every session reads the same thing.',
    highlight: true,
  },
  {
    n: 'baloo',
    sticker: '-6deg',
    title: 'Keeps it',
    sub: 'decisions at session start',
    desc: 'Writes down what you decide and the words the project uses. Nothing is explained twice.',
    highlight: false,
  },
  {
    n: 'louie',
    sticker: '6deg',
    title: 'Builds to it',
    sub: 'task → verified PR',
    desc: 'Takes an agreed task to a pull request and checks it against the decisions before you review.',
    highlight: false,
  },
  {
    n: 'bagheera',
    sticker: '7deg',
    title: 'Adds to it',
    sub: 'session review · secrets',
    desc: 'Proposes what a session settled but did not write down, and keeps keys out of Claude’s sight.',
    highlight: false,
  },
  {
    n: 'hathi',
    sticker: '-5deg',
    title: 'Holds commits',
    sub: 'same checks as CI',
    desc: 'Checks every commit’s message, secrets and history — the same verdict locally and in CI.',
    highlight: false,
  },
]

const OTHER_PROJECTS = [
  {
    title: 'instrumenta',
    status: 'in internal production',
    href: 'https://github.com/andrewmolyuk/instrumenta',
    desc: 'Agent pipeline that takes a Jira ticket to an open pull request, now in internal production at the company I work for as a multi-agent dynamic workflow. An investigator, implementer, reviewer and app tester each hold only their own tools; a workflow script sequences them, re-reviews every fresh diff and caps rework at three rounds. Batches of tickets run unattended.',
    tags: ['Claude Code', 'Workflows', 'Subagents', 'Playwright', 'Jira', 'Bitbucket'],
  },
  {
    title: 'servienta',
    status: 'live',
    href: 'https://github.com/servienta/servienta',
    site: { label: 'servienta.com', href: 'https://servienta.com' },
    desc: 'Testing services for network integrations — a controlled instance of every endpoint an application talks to (syslog, SNMP, RADIUS, TACACS+, DNS, NTP, Kafka, IPFIX) plus a five-transport file server. One container, started in one command, readable from automated tests and resettable between runs.',
    tags: ['Go', 'Docker', 'Vue 3', 'Hono', 'Cloudflare Workers', 'Cloudflare D1'],
  },
  {
    title: 'clockcover',
    status: 'live',
    href: 'https://github.com/clockcover/clockcover',
    site: { label: 'clockcover.com', href: 'https://clockcover.com' },
    desc: 'Detects missed time-clock entries and routes them to the right manager before they pile up at month-end. Compares scheduled shifts against actual clock-ins/outs, sends daily digests, and escalates unresolved gaps to payroll after the SLA expires.',
    tags: ['Hono', 'Cloudflare Workers', 'Drizzle', 'D1', 'Vue 3', 'Tailwind CSS'],
  },
  {
    title: 'checkmeup',
    status: 'live',
    href: 'https://github.com/checkmeup/checkmeup',
    site: { label: 'checkmeup.net', href: 'https://checkmeup.net' },
    desc: 'Cron, uptime, SSL, domain expiry and port (TCP) monitors with Telegram, Slack and SMS alerts, plus white-label status pages. Self-hosted product — Hetzner, Kamal, Traefik, no managed platform in the path.',
    tags: ['Go', 'Chi', 'sqlc', 'PostgreSQL', 'Vue 3', 'Kamal'],
  },
  {
    title: 'staffcomplete',
    status: 'live',
    href: 'https://github.com/staff-complete/staffcomplete',
    site: { label: 'staffcomplete.io', href: 'https://staffcomplete.io' },
    desc: 'SaaS platform automating the full employee lifecycle across company systems — onboarding, role changes, offboarding. Every lifecycle event is queued, dispatched to per-system integration handlers, and recorded for audit. Multi-tenant, isolated at the database level via Postgres RLS.',
    tags: ['Hono', 'tRPC', 'Drizzle', 'PostgreSQL RLS', 'pg-boss', 'Vue 3'],
  },
]
</script>

<template>
  <section id="projects" class="border-line border-t px-8 py-22">
    <div class="mx-auto max-w-[1100px]">
      <div class="mb-11">
        <h2 class="text-heading text-[clamp(26px,3.5vw,40px)] leading-[1.1] font-semibold tracking-[-0.03em]">
          What I'm Building
        </h2>
      </div>

      <p class="text-muted mb-6 text-[15px] leading-[1.7]">
        bunderlog is the current focus. The rest are products I built and run; instrumenta went into internal production
        at the company I work for.
      </p>

      <div class="flex flex-col gap-4">
        <div class="border-line bg-panel hover:border-accent/27 rounded-md border px-7 pt-7 pb-6 transition-colors">
          <div class="mb-3 flex items-start justify-between gap-3">
            <div class="flex flex-wrap items-baseline gap-x-3.5 gap-y-1.5">
              <a
                href="https://github.com/bunderlog"
                target="_blank"
                rel="noopener noreferrer"
                class="text-heading hover:text-accent font-mono text-[15px] font-medium"
                >bunderlog ↗</a
              >
              <a
                href="https://bunderlog.com"
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted hover:text-accent font-mono text-[12.5px]"
                >bunderlog.com</a
              >
            </div>
            <span
              class="border-success/27 bg-success/8 text-success shrink-0 rounded border px-2.5 py-0.5 font-mono text-[11px] tracking-[0.1em] uppercase"
              >live</span
            >
          </div>
          <p class="text-muted mb-5 text-[15px] leading-[1.78]">
            Four free Claude Code plugins that work as one. Every AI coding session starts from nothing; bunderlog gives
            it what a team gives a new colleague — one written record of what the project decided, kept as plain files
            in the repository, and four tools that keep every session, change and commit true to it.
          </p>

          <div class="border-line mb-5 border-y py-3">
            <div class="text-muted flex flex-wrap gap-x-3.5 gap-y-1.5 font-mono text-[11.5px] tracking-[0.02em]">
              <span>6% → 68% coding rules followed</span>
              <span class="text-line-strong">·</span>
              <span>4 plugins</span>
              <span class="text-line-strong">·</span>
              <span>1 shared record</span>
              <span class="text-line-strong">·</span>
              <span>MIT licensed</span>
            </div>
            <div class="text-faint mt-1.5 font-mono text-[11px]">
              rules left to memory vs. handed to Claude as it opens the file — 5 of 79 vs. 15 of 22 times
            </div>
          </div>

          <div class="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 py-1 pb-2">
            <div
              v-for="tool in TOOLS"
              :key="tool.n"
              class="flex flex-col items-center rounded-md border px-2.5 py-3 text-center"
              :class="tool.highlight ? 'border-accent/40 bg-accent/8' : 'border-line bg-panel'"
            >
              <img
                v-if="tool.sticker"
                :src="`/stickers/${tool.n}.svg`"
                alt=""
                width="64"
                height="64"
                class="mb-1.5"
                :style="{ rotate: tool.sticker }"
              />
              <div
                v-if="tool.files"
                class="text-accent/70 mb-1.5 flex h-16 flex-col justify-center font-mono text-[11px] leading-[1.45]"
              >
                <span v-for="file in tool.files" :key="file">{{ file }}</span>
              </div>
              <div class="mb-1.5 font-mono text-[11.5px]" :class="tool.highlight ? 'text-accent/60' : 'text-faint'">
                {{ tool.n }}
              </div>
              <div class="font-mono text-[11.5px] leading-[1.4]" :class="tool.highlight ? 'text-accent' : 'text-body'">
                {{ tool.title }}
              </div>
              <div class="text-muted mt-[3px] font-mono text-[11px]">{{ tool.sub }}</div>
              <p class="border-line text-muted mt-2.5 border-t pt-2.5 text-[12.5px] leading-[1.55]">{{ tool.desc }}</p>
            </div>
          </div>

          <div class="text-faint mt-4 flex flex-wrap gap-1.5 font-mono text-[11.5px]">
            <span
              v-for="tag in ['Claude Code', 'Python', 'Go', 'Git hooks', 'Astro']"
              :key="tag"
              class="border-line rounded border px-2 py-0.5"
              >{{ tag }}</span
            >
          </div>
        </div>

        <div
          v-for="project in OTHER_PROJECTS"
          :key="project.title"
          class="border-line bg-panel hover:border-accent/27 rounded-md border px-7 pt-7 pb-6 transition-colors"
        >
          <div class="mb-3 flex items-start justify-between gap-3">
            <div class="flex flex-wrap items-baseline gap-x-3.5 gap-y-1.5">
              <a
                :href="project.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-heading hover:text-accent font-mono text-[15px] font-medium"
                >{{ project.title }} ↗</a
              >
              <a
                v-if="project.site"
                :href="project.site.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted hover:text-accent font-mono text-[12.5px]"
                >{{ project.site.label }}</a
              >
            </div>
            <span
              class="border-success/27 bg-success/8 text-success shrink-0 rounded border px-2.5 py-0.5 font-mono text-[11px] tracking-[0.1em] uppercase"
              >{{ project.status }}</span
            >
          </div>
          <p class="text-muted mb-4 text-[15px] leading-[1.78]">{{ project.desc }}</p>
          <div class="text-faint flex flex-wrap gap-1.5 font-mono text-[11.5px]">
            <span v-for="tag in project.tags" :key="tag" class="border-line rounded border px-2 py-0.5">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
