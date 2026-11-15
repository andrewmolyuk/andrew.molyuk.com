<script setup lang="ts">
import ProjectName from './ProjectName.vue'

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

/** status is shown only when it isn't live, which all the rest are. fact is a figure the project has, if any. */
const OTHER_PROJECTS: {
  title: string
  icon: string
  status?: string
  site?: string
  github?: string
  desc: string
  fact?: string
  tags: string[]
}[] = [
  {
    title: 'instrumenta',
    icon: '/projects/instrumenta.svg',
    status: 'in internal production',
    github: 'https://github.com/andrewmolyuk/instrumenta',
    desc: 'Agent pipeline that takes a Jira ticket to an open pull request, unattended, at the company I work for.',
    fact: '4 agents, each with only its own tools · rework capped at 3 rounds',
    tags: ['Claude Code', 'Workflows', 'Subagents', 'Playwright', 'Jira', 'Bitbucket'],
  },
  {
    title: 'chainofsale',
    icon: '/projects/chainofsale.svg',
    site: 'https://chainofsale.com', // its repository is private
    desc: 'Supply-chain check for ad systems: each seller the publisher doesn’t confirm, with the exact ads.txt line that fixes it.',
    fact: '1,700+ ad systems ranked by chain health',
    tags: ['Go', 'PostgreSQL', 'Vue 3', 'Tailwind CSS', 'Kamal', 'Cloudflare Workers'],
  },
  {
    title: 'servienta',
    icon: '/projects/servienta.svg',
    site: 'https://servienta.com',
    github: 'https://github.com/servienta/servienta',
    desc: 'Every endpoint an application talks to, in one container: readable from automated tests and reset between runs.',
    fact: '8 protocols · a 5-transport file server',
    tags: ['Go', 'Docker', 'Vue 3', 'Hono', 'Cloudflare Workers', 'Cloudflare D1'],
  },
  {
    title: 'clockcover',
    icon: '/projects/clockcover.svg',
    site: 'https://clockcover.com',
    github: 'https://github.com/clockcover/clockcover',
    desc: 'Finds missed time-clock entries and routes them to the right manager before they pile up at month-end.',
    tags: ['Hono', 'Cloudflare Workers', 'Drizzle', 'D1', 'Vue 3', 'Tailwind CSS'],
  },
  {
    title: 'checkmeup',
    icon: '/projects/checkmeup.svg',
    site: 'https://checkmeup.net',
    github: 'https://github.com/checkmeup/checkmeup',
    desc: 'Cron, uptime, SSL, domain and port monitors with Telegram, Slack and SMS alerts, and white-label status pages.',
    tags: ['Go', 'Chi', 'sqlc', 'PostgreSQL', 'Vue 3', 'Kamal'],
  },
  {
    title: 'staffcomplete',
    icon: '/projects/staffcomplete.svg',
    site: 'https://staffcomplete.io',
    github: 'https://github.com/staff-complete/staffcomplete',
    desc: 'Onboarding, role changes and offboarding across a company’s systems, each event queued, dispatched and audited.',
    tags: ['Hono', 'tRPC', 'Drizzle', 'PostgreSQL RLS', 'pg-boss', 'Vue 3'],
  },
  {
    title: 'pass.molyuk.com',
    icon: '/projects/pass-molyuk.svg',
    site: 'https://pass.molyuk.com',
    github: 'https://github.com/andrewmolyuk/pass.molyuk.com',
    desc: 'One-time links to a secret encrypted in the browser: the server never sees the secret, the key or the PIN.',
    tags: ['TypeScript', 'Web Crypto', 'Cloudflare Workers', 'Cloudflare D1'],
  },
  {
    title: 'tools.molyuk.com',
    icon: '/projects/tools-molyuk.svg',
    site: 'https://tools.molyuk.com',
    github: 'https://github.com/andrewmolyuk/tools.molyuk.com',
    desc: 'Everyday developer tools in one place: IDs, hashes, JWT and X.509, regex, cron, CIDR, TOTP, diff and more.',
    fact: '36 tools, nearly all running in the browser',
    tags: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'vue-i18n', 'Cloudflare Workers'],
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
        bunderlog is the current focus. The rest are live products I built and run; instrumenta went into internal
        production at the company I work for.
      </p>

      <div class="flex flex-col gap-4">
        <div class="border-line bg-panel hover:border-accent/27 rounded-md border px-7 pt-7 pb-6 transition-colors">
          <div class="mb-3 flex items-start justify-between gap-3">
            <ProjectName
              name="bunderlog"
              icon="/projects/bunderlog.svg"
              site="https://bunderlog.com"
              github="https://github.com/bunderlog"
            />
          </div>
          <p class="text-muted mb-5 text-[15px] leading-[1.78]">
            Four free tools for Claude Code that work as one. Every AI coding session starts from nothing; bunderlog
            gives it what a team gives a new colleague — one written record of what the project decided, kept as plain
            files in the repository, and the tools that keep every session, change and commit true to it.
          </p>

          <div class="border-line mb-5 border-y py-3">
            <div class="text-muted flex flex-wrap gap-x-3.5 gap-y-1.5 font-mono text-[12px] tracking-[0.02em]">
              <span>3 plugins + 1 CLI</span>
              <span class="text-line-strong">·</span>
              <span>1 shared record</span>
              <span class="text-line-strong">·</span>
              <span>MIT licensed</span>
            </div>
            <div class="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span class="text-heading font-mono text-[22px] leading-none font-medium tracking-[-0.03em]"
                >6% <span class="text-accent">→ 68%</span></span
              >
              <span class="text-muted text-[13.5px] leading-[1.5]"
                >how often Claude checks the project’s rules before writing code, on its own and with louie</span
              >
            </div>
            <div class="text-faint mt-1 font-mono text-[12px]">
              5 of 79 vs. 15 of 22 sessions, three weeks of real use
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
                class="text-accent/70 mb-1.5 flex h-16 flex-col justify-center font-mono text-[12px] leading-[1.45]"
              >
                <span v-for="file in tool.files" :key="file">{{ file }}</span>
              </div>
              <div class="mb-1.5 font-mono text-[12px]" :class="tool.highlight ? 'text-accent/70' : 'text-faint'">
                {{ tool.n }}
              </div>
              <div class="font-mono text-[12px] leading-[1.4]" :class="tool.highlight ? 'text-accent' : 'text-body'">
                {{ tool.title }}
              </div>
              <div class="text-muted mt-[3px] font-mono text-[12px]">{{ tool.sub }}</div>
              <p class="border-line text-muted mt-2.5 border-t pt-2.5 text-[12.5px] leading-[1.55]">{{ tool.desc }}</p>
            </div>
          </div>

          <div class="text-faint mt-4 flex flex-wrap gap-1.5 font-mono text-[12px]">
            <span
              v-for="tag in ['Claude Code', 'Python', 'Go', 'Git hooks', 'Astro']"
              :key="tag"
              class="border-line rounded border px-2 py-0.5"
              >{{ tag }}</span
            >
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <div
            v-for="project in OTHER_PROJECTS"
            :key="project.title"
            class="border-line bg-panel hover:border-accent/27 flex flex-col rounded-md border px-6 pt-6 pb-5 transition-colors"
          >
            <div class="mb-3 flex items-start justify-between gap-3">
              <ProjectName :name="project.title" :icon="project.icon" :site="project.site" :github="project.github" />
              <span
                v-if="project.status"
                class="border-success/27 bg-success/8 text-success shrink-0 rounded border px-2.5 py-0.5 font-mono text-[12px] tracking-[0.1em] uppercase"
                >{{ project.status }}</span
              >
            </div>
            <p class="text-muted text-[14.5px] leading-[1.7]">{{ project.desc }}</p>
            <div v-if="project.fact" class="text-accent/80 mt-2 font-mono text-[12px]">{{ project.fact }}</div>
            <div class="text-faint mt-auto flex flex-wrap gap-1.5 pt-4 font-mono text-[12px]">
              <span v-for="tag in project.tags" :key="tag" class="border-line rounded border px-2 py-0.5">{{
                tag
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
