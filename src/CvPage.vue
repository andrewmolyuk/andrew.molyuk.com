<script setup lang="ts">
import { ROLES, years } from './lib/career'
import { EMAIL, LINKEDIN, TELEGRAM } from './lib/contact'
import { EARLIER, EDUCATION, LANGUAGES, LOCATION, LOOKING_FOR, NAME, POSITIONING } from './lib/profile'
import { BUNDERLOG, FEATURED_COUNT, PROJECTS } from './lib/projects'
import { AI, SKILL_LIST } from './lib/skillsGraph'

// The CV, made from the same data as the page, so the two never disagree. It is printed to the PDF
// the page links to by `mise run cv`.
const ROLES_NEWEST_FIRST = [...ROLES].reverse()
// Each project in one line of text, its figure after its description: written as a string, since the
// template would drop the space between the two.
// Its address is the live site, or its public repository when it has none, shown without "https://"
// and a link in the PDF; a project with neither (instrumenta) has none.
const PROJECTS_SHOWN = PROJECTS.slice(0, FEATURED_COUNT).map((p) => {
  const url = p.site ?? p.github
  return { ...p, line: p.fact ? `${p.desc} ${p.fact}.` : p.desc, url, address: url?.replace(/^https:\/\//, '') }
})
const SKILLS = [AI, ...SKILL_LIST]
</script>

<template>
  <main class="text-cv-text mx-auto max-w-[760px] px-8 py-10 text-[13px] leading-[1.55] print:p-0">
    <header class="border-cv-line border-b pb-4">
      <h1 class="text-[28px] leading-tight font-semibold tracking-[-0.02em]">{{ NAME }}</h1>
      <div class="text-cv-accent mt-1 text-[14px] font-medium">{{ POSITIONING }}</div>
      <div class="text-cv-muted mt-2">
        <span class="text-cv-text font-medium">Looking for:</span> {{ LOOKING_FOR }} · {{ LOCATION }}
      </div>
      <div class="text-cv-muted mt-2 flex flex-wrap gap-x-4 gap-y-0.5">
        <a :href="`mailto:${EMAIL}`">{{ EMAIL }}</a>
        <a :href="TELEGRAM.href">{{ TELEGRAM.handle }}</a>
        <a :href="LINKEDIN">linkedin.com/in/andrewmolyuk</a>
        <a href="https://andrew.molyuk.com">andrew.molyuk.com</a>
      </div>
    </header>

    <section class="mt-5">
      <h2 class="text-cv-accent mb-2 text-[11px] font-semibold tracking-[0.12em] uppercase">Experience</h2>
      <div v-for="role in ROLES_NEWEST_FIRST" :key="role.company" class="mb-3 break-inside-avoid">
        <div class="flex items-baseline justify-between gap-4">
          <div>
            <span class="font-semibold">{{ role.company }}</span>
            <span class="text-cv-muted">
              · {{ role.title }}<template v-if="role.team"> · {{ role.team }} engineers</template></span
            >
          </div>
          <span class="text-cv-muted shrink-0 tabular-nums">{{ years(role) }}</span>
        </div>
        <p class="mt-0.5">{{ role.result }}</p>
      </div>
      <p class="text-cv-muted">{{ EARLIER }}</p>
    </section>

    <section class="mt-5">
      <h2 class="text-cv-accent mb-2 break-after-avoid text-[11px] font-semibold tracking-[0.12em] uppercase">
        Projects
      </h2>
      <div class="mb-2 break-inside-avoid">
        <span class="font-semibold">bunderlog</span>
        <span class="text-cv-muted"> · <a :href="BUNDERLOG.site">bunderlog.com</a></span>
        <p class="mt-0.5">
          Open-source tools that keep Claude Code sessions true to a project's written decisions: Claude checks the
          project's rules before writing code {{ BUNDERLOG.rulesChecked.alone }} of the time on its own,
          {{ BUNDERLOG.rulesChecked.withLouie }} with louie.
        </p>
      </div>
      <div v-for="project in PROJECTS_SHOWN" :key="project.title" class="mb-2 break-inside-avoid">
        <span class="font-semibold">{{ project.title }}</span>
        <span v-if="project.status" class="text-cv-muted"> · {{ project.status }}</span>
        <span v-if="project.url" class="text-cv-muted">
          · <a :href="project.url">{{ project.address }}</a></span
        >
        <p class="mt-0.5">
          {{ project.line }}
        </p>
      </div>
    </section>

    <section class="mt-5 break-inside-avoid">
      <h2 class="text-cv-accent mb-2 text-[11px] font-semibold tracking-[0.12em] uppercase">Skills</h2>
      <div v-for="skill in SKILLS" :key="skill.id" class="grid grid-cols-[140px_1fr] gap-x-3">
        <span class="font-medium">{{ skill.label }}</span>
        <span class="text-cv-muted">{{ skill.tools.join(', ') }}</span>
      </div>
    </section>

    <section class="mt-5 break-inside-avoid">
      <h2 class="text-cv-accent mb-2 text-[11px] font-semibold tracking-[0.12em] uppercase">Education</h2>
      <div v-for="e in EDUCATION" :key="e.where" class="mb-1.5 flex items-baseline justify-between gap-4">
        <div>
          <span class="font-medium">{{ e.where }}</span>
          <span class="text-cv-muted"> · {{ e.what }}</span>
        </div>
        <span class="text-cv-muted shrink-0 tabular-nums">{{ e.when }}</span>
      </div>
    </section>

    <section class="mt-5 break-inside-avoid">
      <h2 class="text-cv-accent mb-2 text-[11px] font-semibold tracking-[0.12em] uppercase">Languages</h2>
      <div class="flex flex-wrap gap-x-5">
        <span v-for="l in LANGUAGES" :key="l.name">
          <span class="font-medium">{{ l.name }}</span> <span class="text-cv-muted">· {{ l.level }}</span>
        </span>
      </div>
    </section>
  </main>
</template>
