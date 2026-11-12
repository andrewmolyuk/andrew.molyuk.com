<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  AI,
  ALL_SKILLS,
  CENTER,
  CORE_MOON_ORBIT,
  CORE_R,
  MOON_ORBIT,
  PLANET_R,
  ORBIT,
  SKILL_LIST,
  VIEW,
  ariaLabel,
  edgeColor,
  edgeOpacity,
  labelPlacement,
  moonPositions,
  nodeOpacity,
  planetPosition,
  sel,
  spoke,
  type SkillId,
} from '../lib/skillsGraph'

const hovered = ref<SkillId | null>(null)
/** The row the list explains: what is hovered, or the core when nothing is. */
const active = computed<SkillId>(() => hovered.value ?? 'ai')

function onEnter(id: SkillId) {
  hovered.value = id
}
function onLeave() {
  hovered.value = null
}
function onToggle(id: SkillId) {
  hovered.value = hovered.value === id ? null : id
}
function onKeydown(id: SkillId, event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    onToggle(id)
  }
}

const planets = SKILL_LIST.map((skill, i) => {
  const p = planetPosition(i)
  return {
    ...skill,
    ...p,
    label: { ...labelPlacement(i), text: skill.label },
    spoke: spoke(i),
    moons: moonPositions(p, skill.tools.length, MOON_ORBIT),
    spin: `${26 + i * 4}s`,
  }
})
const coreMoons = moonPositions(CENTER, AI.tools.length, CORE_MOON_ORBIT)

const on = (id: SkillId) => sel(hovered.value, id) === 1
const MUTED = '#8b8b99'
const ACCENT = 'var(--color-accent)'
</script>

<template>
  <section id="skills" class="border-line border-t px-8 py-22">
    <div class="mx-auto max-w-[1100px]">
      <div class="mb-11">
        <h2 class="text-heading text-[clamp(26px,3.5vw,40px)] leading-[1.1] font-semibold tracking-[-0.03em]">
          Technical Focus
        </h2>
      </div>

      <div class="grid items-start gap-14 md:grid-cols-[1.1fr_1fr]">
        <svg
          :viewBox="`0 0 ${VIEW.width} ${VIEW.height}`"
          class="mx-auto block w-full max-w-[600px] overflow-visible md:sticky md:top-24"
          role="group"
          aria-label="AI Engineering at the core, six disciplines in orbit, their tools as moons"
          @mouseleave="onLeave"
        >
          <defs>
            <radialGradient id="core-glow">
              <stop offset="0%" stop-color="#4dd8ff" stop-opacity=".18" />
              <stop offset="100%" stop-color="#4dd8ff" stop-opacity="0" />
            </radialGradient>
          </defs>

          <circle
            :cx="CENTER.x"
            :cy="CENTER.y"
            :r="ORBIT"
            fill="none"
            stroke="#2e2e3e"
            stroke-width="1"
            stroke-dasharray="2 6"
            aria-hidden="true"
          />

          <g aria-hidden="true">
            <line
              v-for="p in planets"
              :key="`edge-${p.id}`"
              :x1="p.spoke.from.x"
              :y1="p.spoke.from.y"
              :x2="p.spoke.to.x"
              :y2="p.spoke.to.y"
              :stroke="edgeColor(hovered, p.id)"
              :stroke-opacity="edgeOpacity(hovered, p.id)"
              stroke-width="1.2"
              style="transition: all 0.2s"
            />
            <circle v-for="(p, i) in planets" :key="`pulse-${p.id}`" r="2.6" fill="#4dd8ff" opacity=".55">
              <animateMotion
                :path="`M${p.spoke.from.x} ${p.spoke.from.y} L${p.spoke.to.x} ${p.spoke.to.y}`"
                :dur="`${3.2 + i * 0.4}s`"
                :begin="`${i * 0.7}s`"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          <g
            v-for="p in planets"
            :key="p.id"
            :opacity="nodeOpacity(hovered, p.id)"
            tabindex="0"
            role="button"
            :aria-label="ariaLabel(p.id)"
            :aria-pressed="hovered === p.id"
            class="cursor-default outline-none"
            style="transition: opacity 0.2s"
            @mouseenter="onEnter(p.id)"
            @focus="onEnter(p.id)"
            @blur="onLeave"
            @click="onToggle(p.id)"
            @keydown="onKeydown(p.id, $event)"
          >
            <circle :cx="p.x" :cy="p.y" :r="MOON_ORBIT + 10" fill="transparent" />
            <circle
              :cx="p.x"
              :cy="p.y"
              :r="MOON_ORBIT"
              fill="none"
              :stroke="on(p.id) ? '#4dd8ff' : '#2e2e3e'"
              :stroke-opacity="on(p.id) ? 0.45 : 1"
              stroke-width="1"
              style="transition: all 0.2s"
            />
            <g
              class="moons"
              :style="{ transformOrigin: `${p.x}px ${p.y}px`, animationDuration: p.spin }"
              aria-hidden="true"
            >
              <circle
                v-for="(m, k) in p.moons"
                :key="k"
                :cx="m.x"
                :cy="m.y"
                r="3.4"
                :fill="on(p.id) ? ACCENT : '#5a5a68'"
                style="transition: fill 0.2s"
              />
            </g>
            <circle
              :cx="p.x"
              :cy="p.y"
              :r="PLANET_R"
              :fill="on(p.id) ? 'rgba(77,216,255,0.08)' : '#13131a'"
              :stroke="on(p.id) ? ACCENT : '#2e2e3e'"
              stroke-width="1.4"
              style="transition: all 0.2s"
            />
            <circle :cx="p.x" :cy="p.y" r="4.2" :fill="on(p.id) ? ACCENT : MUTED" style="transition: fill 0.2s" />
            <text
              :x="p.label.x"
              :y="p.label.y"
              :text-anchor="p.label.anchor"
              font-family="JetBrains Mono, monospace"
              font-size="17"
              letter-spacing=".02em"
              class="planet-label"
              :fill="on(p.id) ? ACCENT : MUTED"
              style="transition: fill 0.2s"
            >
              {{ p.label.text }}
            </text>
          </g>

          <g
            tabindex="0"
            role="button"
            :aria-label="ariaLabel('ai')"
            :aria-pressed="hovered === 'ai'"
            class="cursor-default outline-none"
            @mouseenter="onEnter('ai')"
            @focus="onEnter('ai')"
            @blur="onLeave"
            @click="onToggle('ai')"
            @keydown="onKeydown('ai', $event)"
          >
            <circle :cx="CENTER.x" :cy="CENTER.y" :r="CORE_MOON_ORBIT + 40" fill="url(#core-glow)" />
            <circle
              :cx="CENTER.x"
              :cy="CENTER.y"
              :r="CORE_MOON_ORBIT"
              fill="none"
              stroke="#4dd8ff"
              stroke-opacity=".16"
              stroke-width="1"
            />
            <g
              class="moons"
              :style="{ transformOrigin: `${CENTER.x}px ${CENTER.y}px`, animationDuration: '48s' }"
              aria-hidden="true"
            >
              <circle v-for="(m, k) in coreMoons" :key="k" :cx="m.x" :cy="m.y" r="4" fill="#4dd8ff" opacity=".8" />
            </g>
            <circle
              :cx="CENTER.x"
              :cy="CENTER.y"
              :r="CORE_R + 9"
              fill="none"
              stroke="#4dd8ff"
              stroke-opacity=".25"
              stroke-dasharray="3 5"
              class="moons"
              :style="{ transformOrigin: `${CENTER.x}px ${CENTER.y}px`, animationDuration: '14s' }"
            />
            <circle
              :cx="CENTER.x"
              :cy="CENTER.y"
              :r="CORE_R"
              :fill="on('ai') ? 'rgba(77,216,255,0.14)' : 'rgba(77,216,255,0.07)'"
              stroke="#4dd8ff"
              stroke-opacity=".75"
              stroke-width="1.6"
              style="transition: fill 0.2s"
            />
            <text
              :x="CENTER.x"
              :y="CENTER.y + 4"
              text-anchor="middle"
              font-family="Inter, system-ui, sans-serif"
              font-size="34"
              font-weight="600"
              letter-spacing="-.02em"
              fill="#f4f4f5"
            >
              AI
            </text>
            <text
              :x="CENTER.x"
              :y="CENTER.y + 26"
              text-anchor="middle"
              font-family="JetBrains Mono, monospace"
              font-size="10.5"
              letter-spacing=".2em"
              class="core-label"
              fill="#4dd8ff"
            >
              ENGINEERING
            </text>
          </g>
        </svg>

        <div>
          <p class="text-muted mb-7 text-[15px] leading-[1.8]">
            AI-native engineering is the focus now. It stands on 35 years of building software that had to stay up. The
            disciplines last; the tools orbiting them change. Point at a node to see both.
          </p>
          <div class="flex flex-col" @mouseleave="onLeave">
            <div
              v-for="skill in ALL_SKILLS"
              :key="skill.id"
              class="grid gap-x-4 gap-y-1 border-l-2 py-2.5 pl-3.5 transition-[border-color] duration-200 sm:grid-cols-[130px_1fr]"
              :class="active === skill.id ? 'border-accent' : 'border-line'"
              @mouseenter="onEnter(skill.id)"
            >
              <span class="text-accent pt-[3px] font-mono text-xs leading-[1.5]">{{ skill.label }}</span>
              <div>
                <p
                  class="text-[14.5px] leading-[1.6] transition-colors duration-200"
                  :class="active === skill.id ? 'text-body' : 'text-muted'"
                >
                  {{ skill.desc }}
                </p>
                <div
                  class="grid transition-[grid-template-rows] duration-300"
                  :class="active === skill.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
                >
                  <div class="overflow-hidden">
                    <div class="text-faint pt-1.5 font-mono text-[11.5px]">
                      <span class="text-accent/60">↻</span> {{ skill.tools.join(' · ') }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.moons {
  transform-box: view-box;
  animation: spin linear infinite;
}

/* The graph shrinks to under half its size on a phone; keep its labels readable there. */
@media (max-width: 640px) {
  .planet-label {
    font-size: 25px;
  }
  .core-label {
    font-size: 14px;
  }
}
</style>
