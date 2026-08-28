<script setup lang="ts">
const PIPELINE_STEPS = [
  { n: '01', title: 'Jira Backlog', sub: 'PROJ-*', highlight: false },
  { n: '02', title: 'Foreman Daemon', sub: 'TypeScript · Bun', highlight: false },
  { n: '03', title: 'Minion Container', sub: 'Docker · ephemeral', highlight: false },
  { n: '04', title: 'Claude Code', sub: 'implements task', highlight: true },
  { n: '05', title: 'Bitbucket PR', sub: 'auto-opened', highlight: false },
]

const OTHER_PROJECTS = [
  {
    title: 'bunderlog',
    href: 'https://github.com/bunderlog/bunderlog',
    site: { label: 'bunderlog.com', href: 'https://bunderlog.com' },
    desc: 'Centralized plain-text log system for aggregating, storing and querying logs across distributed applications, with a web UI for developers and sysadmins. Split into ingest and query Workers behind a shared schema.',
    tags: ['Cloudflare Workers', 'Bun', 'TypeScript', 'Vue 3', 'Tailwind CSS'],
  },
  {
    title: 'clockcover',
    href: 'https://github.com/clockcover/clockcover',
    site: { label: 'clockcover.com', href: 'https://clockcover.com' },
    desc: 'Detects missed time-clock entries and routes them to the right manager before they pile up at month-end. Compares scheduled shifts against actual clock-ins/outs, sends daily digests, and escalates unresolved gaps to payroll after the SLA expires.',
    tags: ['Hono', 'Cloudflare Workers', 'Drizzle', 'D1', 'Vue 3', 'Tailwind CSS'],
  },
  {
    title: 'checkmeup',
    href: 'https://github.com/checkmeup/checkmeup',
    site: { label: 'checkmeup.net', href: 'https://checkmeup.net' },
    desc: 'Cron, uptime, SSL, domain expiry and port (TCP) monitors with Telegram, Slack and SMS alerts, plus white-label status pages. Self-hosted product — Hetzner, Kamal, Traefik, no managed platform in the path.',
    tags: ['Go', 'Chi', 'sqlc', 'PostgreSQL', 'Vue 3', 'Kamal'],
  },
  {
    title: 'staffcomplete',
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
        <span class="text-muted mb-2 block font-mono text-[11.5px] tracking-[0.18em] uppercase">02 / projects</span>
        <h2 class="text-heading text-[clamp(26px,3.5vw,40px)] leading-[1.1] font-semibold tracking-[-0.03em]">
          What I'm Building
        </h2>
      </div>

      <p class="text-muted mb-6 text-[15px] leading-[1.7]">
        Instrumenta is the current focus. The rest are self-hosted products I built and still run.
      </p>

      <div class="flex flex-col gap-4">
        <div class="border-line bg-panel hover:border-accent/27 rounded-md border px-7 pt-7 pb-6 transition-colors">
          <div class="mb-3 flex items-start justify-between gap-3">
            <a
              href="https://github.com/andrewmolyuk/instrumenta"
              target="_blank"
              rel="noopener noreferrer"
              class="text-heading hover:text-accent font-mono text-[15px] font-medium"
              >Instrumenta ↗</a
            >
            <span
              class="border-accent/27 bg-accent/8 text-accent shrink-0 rounded border px-2.5 py-0.5 font-mono text-[11px] tracking-[0.1em] uppercase"
              >in dev</span
            >
          </div>
          <p class="text-muted mb-5 text-[15px] leading-[1.78]">
            Agent pipeline that autonomously works a Jira backlog — picks a task, implements it, opens a PR.
            Foreman/Minion architecture: long-running daemon dispatches disposable per-task containers running Claude
            Code.
          </p>

          <div class="border-line mb-5 border-y py-3">
            <div class="text-muted flex flex-wrap gap-x-3.5 gap-y-1.5 font-mono text-[11.5px] tracking-[0.02em]">
              <span>100 tickets in ~20h 59m</span>
              <span class="text-line-strong">·</span>
              <span>0 failures</span>
              <span class="text-line-strong">·</span>
              <span>~$3.29 avg cost/ticket</span>
              <span class="text-line-strong">·</span>
              <span>~12m 35s avg per task</span>
            </div>
            <div class="text-faint mt-1.5 font-mono text-[11px]">
              early run, single backlog, single agent — still in progress
            </div>
          </div>

          <div class="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 py-1 pb-2">
            <div
              v-for="step in PIPELINE_STEPS"
              :key="step.n"
              class="rounded-md border px-2.5 py-3 text-center"
              :class="
                step.highlight
                  ? 'border-accent/40 bg-accent/8 shadow-[0_0_16px_rgba(77,216,255,0.1)]'
                  : 'border-line bg-panel'
              "
            >
              <div class="mb-1.5 font-mono text-[11.5px]" :class="step.highlight ? 'text-accent/60' : 'text-faint'">
                {{ step.n }}
              </div>
              <div class="font-mono text-[11.5px] leading-[1.4]" :class="step.highlight ? 'text-accent' : 'text-body'">
                {{ step.title }}
              </div>
              <div class="text-muted mt-[3px] font-mono text-[11px]">{{ step.sub }}</div>
            </div>
          </div>

          <div class="text-faint mt-4 flex flex-wrap gap-1.5 font-mono text-[11.5px]">
            <span
              v-for="tag in ['TypeScript', 'Bun', 'Docker', 'Jira API', 'Bitbucket API']"
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
                :href="project.site.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted hover:text-accent font-mono text-[12.5px]"
                >{{ project.site.label }}</a
              >
            </div>
            <span
              class="border-success/27 bg-success/8 text-success shrink-0 rounded border px-2.5 py-0.5 font-mono text-[11px] tracking-[0.1em] uppercase"
              >live</span
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
