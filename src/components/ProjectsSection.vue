<script setup lang="ts">
import ProjectCard from './ProjectCard.vue'
import ProjectName from './ProjectName.vue'
import { BUNDERLOG, FEATURED_COUNT, PROJECTS } from '../lib/projects'

const FEATURED = PROJECTS.slice(0, FEATURED_COUNT)
const MORE = PROJECTS.slice(FEATURED_COUNT)

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
</script>

<template>
  <section id="projects" class="border-line border-t px-8 py-22">
    <div class="mx-auto max-w-[1100px]">
      <div class="mb-11">
        <h2 class="text-heading text-title leading-[1.1] font-semibold tracking-[-0.03em]">What I'm Building</h2>
      </div>

      <p class="text-muted mb-6 text-base leading-[1.7]">
        bunderlog is the current focus. The rest are live products I built and run; instrumenta went into internal
        production at the company I work for.
      </p>

      <div class="flex flex-col gap-4">
        <div class="border-line bg-panel hover:border-accent/27 rounded-md border px-7 pt-7 pb-6 transition-colors">
          <div class="mb-3 flex items-start justify-between gap-3">
            <ProjectName
              name="bunderlog"
              icon="/projects/bunderlog.svg"
              :site="BUNDERLOG.site"
              :github="BUNDERLOG.github"
            />
          </div>
          <p class="text-muted mb-5 text-base leading-[1.78]">
            Four free tools for Claude Code that work as one. Every AI coding session starts from nothing; bunderlog
            gives it what a team gives a new colleague — one written record of what the project decided, kept as plain
            files in the repository, and the tools that keep every session, change and commit true to it.
          </p>

          <div class="border-line mb-5 border-y py-3">
            <div class="text-muted flex flex-wrap gap-x-3.5 gap-y-1.5 font-mono text-xs tracking-[0.02em]">
              <span>3 plugins + 1 CLI</span>
              <span class="text-faint" aria-hidden="true">·</span>
              <span>1 shared record</span>
              <span class="text-faint" aria-hidden="true">·</span>
              <span>MIT licensed</span>
            </div>
            <div class="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span class="text-heading font-mono text-xl leading-none font-medium tracking-[-0.03em]"
                >{{ BUNDERLOG.rulesChecked.alone }}
                <span class="text-accent">→ {{ BUNDERLOG.rulesChecked.withLouie }}</span></span
              >
              <span class="text-muted text-base leading-[1.5]"
                >how often Claude checks the project’s rules before writing code, on its own and with louie</span
              >
            </div>
            <div class="text-faint mt-1 font-mono text-xs">5 of 79 vs. 15 of 22 sessions, three weeks of real use</div>
          </div>

          <!-- On a phone each tool is a row, its picture beside its name and one line, and the longer
               description stays in the HTML but hidden: as five centered tiles in two columns it ran two
               screens of small text. -->
          <div class="grid gap-2 py-1 pb-2 sm:grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
            <div
              v-for="tool in TOOLS"
              :key="tool.n"
              class="flex items-center gap-3 rounded-md border p-3 sm:flex-col sm:gap-0 sm:px-2.5 sm:text-center"
              :class="tool.highlight ? 'border-accent/40 bg-accent/8' : 'border-line bg-panel'"
            >
              <!-- 92px: the widest file name, "requirements", in 12px mono, so the list fits on a phone. -->
              <div class="flex w-[92px] shrink-0 justify-center sm:mb-1.5 sm:w-auto">
                <img
                  v-if="tool.sticker"
                  :src="`/stickers/${tool.n}.svg`"
                  alt=""
                  width="64"
                  height="64"
                  class="size-12 sm:size-16"
                  :style="{ rotate: tool.sticker }"
                />
                <div
                  v-if="tool.files"
                  class="text-accent/70 flex flex-col justify-center font-mono text-xs leading-[1.45] sm:h-16"
                >
                  <span v-for="file in tool.files" :key="file">{{ file }}</span>
                </div>
              </div>
              <div class="min-w-0 sm:flex sm:flex-col sm:items-center">
                <div class="mb-1.5 font-mono text-xs" :class="tool.highlight ? 'text-accent/70' : 'text-faint'">
                  {{ tool.n }}
                </div>
                <div class="font-mono text-xs leading-[1.4]" :class="tool.highlight ? 'text-accent' : 'text-body'">
                  {{ tool.title }}
                </div>
                <div class="text-muted mt-[3px] font-mono text-xs">{{ tool.sub }}</div>
                <p class="border-line text-muted mt-2.5 hidden border-t pt-2.5 text-sm leading-[1.55] sm:block">
                  {{ tool.desc }}
                </p>
              </div>
            </div>
          </div>

          <div class="text-faint mt-4 flex flex-wrap gap-1.5 font-mono text-xs">
            <span
              v-for="tag in ['Claude Code', 'Python', 'Go', 'Git hooks', 'Astro']"
              :key="tag"
              class="border-line rounded border px-2 py-0.5"
              >{{ tag }}</span
            >
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <ProjectCard v-for="project in FEATURED" :key="project.title" :project="project" />
        </div>

        <details class="group">
          <summary
            class="border-line text-body hover:border-accent/50 hover:text-accent inline-flex cursor-pointer list-none items-center gap-2 rounded-md border px-4 py-2 font-mono text-sm transition-colors duration-200 [&::-webkit-details-marker]:hidden"
          >
            <span class="inline-block transition-transform duration-200 group-open:rotate-90">›</span>
            More projects ({{ MORE.length }})
          </summary>
          <div class="mt-4 grid gap-4 md:grid-cols-2">
            <ProjectCard v-for="project in MORE" :key="project.title" :project="project" />
          </div>
        </details>
      </div>
    </div>
  </section>
</template>
