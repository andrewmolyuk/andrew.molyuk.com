<script setup lang="ts">
import { ref } from 'vue'
import {
  SKILL_LIST,
  ariaLabel as ariaLabelFor,
  edgeColor as edgeColorFor,
  edgeOpacity as edgeOpacityFor,
  nodeOpacity as nodeOpacityFor,
  sel as selFor,
  type SkillId,
} from '../lib/skillsGraph'

const hovered = ref<SkillId | null>(null)

function onEnter(id: SkillId) {
  hovered.value = id
}
function onLeave() {
  hovered.value = null
}
function onKeydown(id: SkillId, event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    hovered.value = hovered.value === id ? null : id
  }
}

const nodeOpacity = (id: SkillId) => nodeOpacityFor(hovered.value, id)
const edgeOpacity = (id: SkillId) => edgeOpacityFor(hovered.value, id)
const edgeColor = (id: SkillId) => edgeColorFor(hovered.value, id)
const sel = (id: SkillId) => selFor(hovered.value, id)
const ariaLabel = (id: SkillId) => ariaLabelFor(id)
</script>

<template>
  <section id="skills" class="border-line border-t px-8 py-22">
    <div class="mx-auto max-w-[1100px]">
      <div class="mb-11">
        <span class="text-muted mb-2 block font-mono text-[11.5px] tracking-[0.18em] uppercase">01 / skills</span>
        <h2 class="text-heading text-[clamp(26px,3.5vw,40px)] leading-[1.1] font-semibold tracking-[-0.03em]">
          Technical Focus
        </h2>
      </div>

      <div class="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] items-center gap-14">
        <div>
          <svg viewBox="-250 -60 960 600" class="block w-full overflow-visible">
            <defs>
              <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#4dd8ff" stop-opacity=".25"></stop>
                <stop offset="100%" stop-color="#4dd8ff" stop-opacity="0"></stop>
              </radialGradient>
            </defs>

            <g stroke="#3a3a46" stroke-width="1.4" stroke-opacity=".3" aria-hidden="true">
              <path
                d="M130.9 150.5 Q191.6 198.6 231.3 206.4"
                fill="none"
                :stroke="edgeColor('hlha')"
                :stroke-opacity="edgeOpacity('hlha')"
                style="transition: all 0.2s"
              ></path>
              <path
                d="M469.3 305.9 Q384.9 292.2 353.3 265.4"
                fill="none"
                :stroke="edgeColor('cloud')"
                :stroke-opacity="edgeOpacity('cloud')"
                style="transition: all 0.2s"
              ></path>
              <path
                d="M133.6 288.1 Q192.4 243.2 231.6 234.8"
                fill="none"
                :stroke="edgeColor('k8s')"
                :stroke-opacity="edgeOpacity('k8s')"
                style="transition: all 0.2s"
              ></path>
              <path
                d="M288.1 69.2 Q270 126 278.7 153.3"
                fill="none"
                :stroke="edgeColor('go')"
                :stroke-opacity="edgeOpacity('go')"
                style="transition: all 0.2s"
              ></path>
              <path
                d="M310.6 372.5 Q328 314 320 287.1"
                fill="none"
                :stroke="edgeColor('node')"
                :stroke-opacity="edgeOpacity('node')"
                style="transition: all 0.2s"
              ></path>
              <path
                d="M471.2 133.4 Q384.1 145.9 352.5 173.7"
                fill="none"
                :stroke="edgeColor('cicd')"
                :stroke-opacity="edgeOpacity('cicd')"
                style="transition: all 0.2s"
              ></path>
            </g>

            <g fill="#4dd8ff" opacity=".55" aria-hidden="true">
              <circle r="3">
                <animateMotion
                  path="M105 130 Q191.6 198.6 300 220"
                  dur="3.4s"
                  begin="0.0s"
                  repeatCount="indefinite"
                ></animateMotion>
              </circle>
              <circle r="3">
                <animateMotion
                  path="M495 310 Q384.9 292.2 300 220"
                  dur="3.8s"
                  begin="0.7s"
                  repeatCount="indefinite"
                ></animateMotion>
              </circle>
              <circle r="3">
                <animateMotion
                  path="M105 310 Q192.4 243.2 300 220"
                  dur="4.1s"
                  begin="1.4s"
                  repeatCount="indefinite"
                ></animateMotion>
              </circle>
              <circle r="3">
                <animateMotion
                  path="M300 32 Q270 126 300 220"
                  dur="4.4s"
                  begin="2.1s"
                  repeatCount="indefinite"
                ></animateMotion>
              </circle>
              <circle r="3">
                <animateMotion
                  path="M300 408 Q328 314 300 220"
                  dur="4.8s"
                  begin="2.8s"
                  repeatCount="indefinite"
                ></animateMotion>
              </circle>
              <circle r="3">
                <animateMotion
                  path="M495 130 Q384.1 145.9 300 220"
                  dur="5.2s"
                  begin="3.5s"
                  repeatCount="indefinite"
                ></animateMotion>
              </circle>
            </g>

            <g
              :opacity="nodeOpacity('hlha')"
              tabindex="0"
              role="button"
              :aria-label="ariaLabel('hlha')"
              pointer-events="all"
              style="transition: opacity 0.2s; cursor: default"
              @mouseenter="onEnter('hlha')"
              @mouseleave="onLeave"
              @focus="onEnter('hlha')"
              @blur="onLeave"
              @keydown="onKeydown('hlha', $event)"
            >
              <circle cx="105" cy="130" r="49" fill="transparent"></circle>
              <circle cx="105" cy="130" r="33" fill="#13131a" stroke="#2e2e3e" stroke-width="1.2"></circle>
              <circle
                cx="105"
                cy="130"
                r="33"
                fill="rgba(77,216,255,0.07)"
                stroke="var(--color-accent)"
                stroke-width="1.8"
                :opacity="sel('hlha')"
                pointer-events="none"
                style="transition: opacity 0.2s"
              ></circle>
              <circle cx="105" cy="130" r="4.7" fill="#8b8b99"></circle>
              <circle
                cx="105"
                cy="130"
                r="4.7"
                fill="var(--color-accent)"
                :opacity="sel('hlha')"
                pointer-events="none"
                style="transition: opacity 0.2s"
              ></circle>
              <text
                x="54"
                y="123"
                text-anchor="end"
                font-family="JetBrains Mono, monospace"
                font-size="28"
                fill="#8b8b99"
                letter-spacing=".02em"
              >
                HL/HA Distributed
              </text>
              <text
                x="54"
                y="155"
                text-anchor="end"
                font-family="JetBrains Mono, monospace"
                font-size="28"
                fill="#8b8b99"
                letter-spacing=".02em"
              >
                Systems
              </text>
              <text
                x="54"
                y="123"
                text-anchor="end"
                font-family="JetBrains Mono, monospace"
                font-size="28"
                fill="var(--color-accent)"
                letter-spacing=".02em"
                :opacity="sel('hlha')"
                pointer-events="none"
                style="transition: opacity 0.2s"
                aria-hidden="true"
              >
                HL/HA Distributed
              </text>
              <text
                x="54"
                y="155"
                text-anchor="end"
                font-family="JetBrains Mono, monospace"
                font-size="28"
                fill="var(--color-accent)"
                letter-spacing=".02em"
                :opacity="sel('hlha')"
                pointer-events="none"
                style="transition: opacity 0.2s"
                aria-hidden="true"
              >
                Systems
              </text>
            </g>

            <g
              :opacity="nodeOpacity('cloud')"
              tabindex="0"
              role="button"
              :aria-label="ariaLabel('cloud')"
              pointer-events="all"
              style="transition: opacity 0.2s; cursor: default"
              @mouseenter="onEnter('cloud')"
              @mouseleave="onLeave"
              @focus="onEnter('cloud')"
              @blur="onLeave"
              @keydown="onKeydown('cloud', $event)"
            >
              <circle cx="495" cy="310" r="42" fill="transparent"></circle>
              <circle cx="495" cy="310" r="26" fill="#13131a" stroke="#2e2e3e" stroke-width="1.2"></circle>
              <circle
                cx="495"
                cy="310"
                r="26"
                fill="rgba(77,216,255,0.07)"
                stroke="var(--color-accent)"
                stroke-width="1.8"
                :opacity="sel('cloud')"
                pointer-events="none"
                style="transition: opacity 0.2s"
              ></circle>
              <circle cx="495" cy="310" r="3.7" fill="#8b8b99"></circle>
              <circle
                cx="495"
                cy="310"
                r="3.7"
                fill="var(--color-accent)"
                :opacity="sel('cloud')"
                pointer-events="none"
                style="transition: opacity 0.2s"
              ></circle>
              <text
                x="539"
                y="303"
                text-anchor="start"
                font-family="JetBrains Mono, monospace"
                font-size="28"
                fill="#8b8b99"
                letter-spacing=".02em"
              >
                Cloud
              </text>
              <text
                x="539"
                y="335"
                text-anchor="start"
                font-family="JetBrains Mono, monospace"
                font-size="28"
                fill="#8b8b99"
                letter-spacing=".02em"
              >
                Computing
              </text>
              <text
                x="539"
                y="303"
                text-anchor="start"
                font-family="JetBrains Mono, monospace"
                font-size="28"
                fill="var(--color-accent)"
                letter-spacing=".02em"
                :opacity="sel('cloud')"
                pointer-events="none"
                style="transition: opacity 0.2s"
                aria-hidden="true"
              >
                Cloud
              </text>
              <text
                x="539"
                y="335"
                text-anchor="start"
                font-family="JetBrains Mono, monospace"
                font-size="28"
                fill="var(--color-accent)"
                letter-spacing=".02em"
                :opacity="sel('cloud')"
                pointer-events="none"
                style="transition: opacity 0.2s"
                aria-hidden="true"
              >
                Computing
              </text>
            </g>

            <g
              :opacity="nodeOpacity('k8s')"
              tabindex="0"
              role="button"
              :aria-label="ariaLabel('k8s')"
              pointer-events="all"
              style="transition: opacity 0.2s; cursor: default"
              @mouseenter="onEnter('k8s')"
              @mouseleave="onLeave"
              @focus="onEnter('k8s')"
              @blur="onLeave"
              @keydown="onKeydown('k8s', $event)"
            >
              <circle cx="105" cy="310" r="52" fill="transparent"></circle>
              <circle cx="105" cy="310" r="36" fill="#13131a" stroke="#2e2e3e" stroke-width="1.2"></circle>
              <circle
                cx="105"
                cy="310"
                r="36"
                fill="rgba(77,216,255,0.07)"
                stroke="var(--color-accent)"
                stroke-width="1.8"
                :opacity="sel('k8s')"
                pointer-events="none"
                style="transition: opacity 0.2s"
              ></circle>
              <circle cx="105" cy="310" r="5.1" fill="#8b8b99"></circle>
              <circle
                cx="105"
                cy="310"
                r="5.1"
                fill="var(--color-accent)"
                :opacity="sel('k8s')"
                pointer-events="none"
                style="transition: opacity 0.2s"
              ></circle>
              <text
                x="51"
                y="303"
                text-anchor="end"
                font-family="JetBrains Mono, monospace"
                font-size="28"
                fill="#8b8b99"
                letter-spacing=".02em"
              >
                Docker &amp;
              </text>
              <text
                x="51"
                y="335"
                text-anchor="end"
                font-family="JetBrains Mono, monospace"
                font-size="28"
                fill="#8b8b99"
                letter-spacing=".02em"
              >
                Kubernetes
              </text>
              <text
                x="51"
                y="303"
                text-anchor="end"
                font-family="JetBrains Mono, monospace"
                font-size="28"
                fill="var(--color-accent)"
                letter-spacing=".02em"
                :opacity="sel('k8s')"
                pointer-events="none"
                style="transition: opacity 0.2s"
                aria-hidden="true"
              >
                Docker &amp;
              </text>
              <text
                x="51"
                y="335"
                text-anchor="end"
                font-family="JetBrains Mono, monospace"
                font-size="28"
                fill="var(--color-accent)"
                letter-spacing=".02em"
                :opacity="sel('k8s')"
                pointer-events="none"
                style="transition: opacity 0.2s"
                aria-hidden="true"
              >
                Kubernetes
              </text>
            </g>

            <g
              :opacity="nodeOpacity('go')"
              tabindex="0"
              role="button"
              :aria-label="ariaLabel('go')"
              pointer-events="all"
              style="transition: opacity 0.2s; cursor: default"
              @mouseenter="onEnter('go')"
              @mouseleave="onLeave"
              @focus="onEnter('go')"
              @blur="onLeave"
              @keydown="onKeydown('go', $event)"
            >
              <circle cx="300" cy="32" r="55" fill="transparent"></circle>
              <circle cx="300" cy="32" r="39" fill="#13131a" stroke="#2e2e3e" stroke-width="1.2"></circle>
              <circle
                cx="300"
                cy="32"
                r="39"
                fill="rgba(77,216,255,0.07)"
                stroke="var(--color-accent)"
                stroke-width="1.8"
                :opacity="sel('go')"
                pointer-events="none"
                style="transition: opacity 0.2s"
              ></circle>
              <circle cx="300" cy="32" r="5.6" fill="#8b8b99"></circle>
              <circle
                cx="300"
                cy="32"
                r="5.6"
                fill="var(--color-accent)"
                :opacity="sel('go')"
                pointer-events="none"
                style="transition: opacity 0.2s"
              ></circle>
              <text
                x="300"
                y="-27"
                text-anchor="middle"
                font-family="JetBrains Mono, monospace"
                font-size="28"
                fill="#8b8b99"
                letter-spacing=".02em"
              >
                Go Development
              </text>
              <text
                x="300"
                y="-27"
                text-anchor="middle"
                font-family="JetBrains Mono, monospace"
                font-size="28"
                fill="var(--color-accent)"
                letter-spacing=".02em"
                :opacity="sel('go')"
                pointer-events="none"
                style="transition: opacity 0.2s"
                aria-hidden="true"
              >
                Go Development
              </text>
            </g>

            <g
              :opacity="nodeOpacity('node')"
              tabindex="0"
              role="button"
              :aria-label="ariaLabel('node')"
              pointer-events="all"
              style="transition: opacity 0.2s; cursor: default"
              @mouseenter="onEnter('node')"
              @mouseleave="onLeave"
              @focus="onEnter('node')"
              @blur="onLeave"
              @keydown="onKeydown('node', $event)"
            >
              <circle cx="300" cy="408" r="53" fill="transparent"></circle>
              <circle cx="300" cy="408" r="37" fill="#13131a" stroke="#2e2e3e" stroke-width="1.2"></circle>
              <circle
                cx="300"
                cy="408"
                r="37"
                fill="rgba(77,216,255,0.07)"
                stroke="var(--color-accent)"
                stroke-width="1.8"
                :opacity="sel('node')"
                pointer-events="none"
                style="transition: opacity 0.2s"
              ></circle>
              <circle cx="300" cy="408" r="5.3" fill="#8b8b99"></circle>
              <circle
                cx="300"
                cy="408"
                r="5.3"
                fill="var(--color-accent)"
                :opacity="sel('node')"
                pointer-events="none"
                style="transition: opacity 0.2s"
              ></circle>
              <text
                x="300"
                y="483"
                text-anchor="middle"
                font-family="JetBrains Mono, monospace"
                font-size="28"
                fill="#8b8b99"
                letter-spacing=".02em"
              >
                Node.js &amp;
              </text>
              <text
                x="300"
                y="515"
                text-anchor="middle"
                font-family="JetBrains Mono, monospace"
                font-size="28"
                fill="#8b8b99"
                letter-spacing=".02em"
              >
                Bun
              </text>
              <text
                x="300"
                y="483"
                text-anchor="middle"
                font-family="JetBrains Mono, monospace"
                font-size="28"
                fill="var(--color-accent)"
                letter-spacing=".02em"
                :opacity="sel('node')"
                pointer-events="none"
                style="transition: opacity 0.2s"
                aria-hidden="true"
              >
                Node.js &amp;
              </text>
              <text
                x="300"
                y="515"
                text-anchor="middle"
                font-family="JetBrains Mono, monospace"
                font-size="28"
                fill="var(--color-accent)"
                letter-spacing=".02em"
                :opacity="sel('node')"
                pointer-events="none"
                style="transition: opacity 0.2s"
                aria-hidden="true"
              >
                Bun
              </text>
            </g>

            <g
              :opacity="nodeOpacity('cicd')"
              tabindex="0"
              role="button"
              :aria-label="ariaLabel('cicd')"
              pointer-events="all"
              style="transition: opacity 0.2s; cursor: default"
              @mouseenter="onEnter('cicd')"
              @mouseleave="onLeave"
              @focus="onEnter('cicd')"
              @blur="onLeave"
              @keydown="onKeydown('cicd', $event)"
            >
              <circle cx="495" cy="130" r="40" fill="transparent"></circle>
              <circle cx="495" cy="130" r="24" fill="#13131a" stroke="#2e2e3e" stroke-width="1.2"></circle>
              <circle
                cx="495"
                cy="130"
                r="24"
                fill="rgba(77,216,255,0.07)"
                stroke="var(--color-accent)"
                stroke-width="1.8"
                :opacity="sel('cicd')"
                pointer-events="none"
                style="transition: opacity 0.2s"
              ></circle>
              <circle cx="495" cy="130" r="3.4" fill="#8b8b99"></circle>
              <circle
                cx="495"
                cy="130"
                r="3.4"
                fill="var(--color-accent)"
                :opacity="sel('cicd')"
                pointer-events="none"
                style="transition: opacity 0.2s"
              ></circle>
              <text
                x="537"
                y="139"
                text-anchor="start"
                font-family="JetBrains Mono, monospace"
                font-size="28"
                fill="#8b8b99"
                letter-spacing=".02em"
              >
                CI/CD
              </text>
              <text
                x="537"
                y="139"
                text-anchor="start"
                font-family="JetBrains Mono, monospace"
                font-size="28"
                fill="var(--color-accent)"
                letter-spacing=".02em"
                :opacity="sel('cicd')"
                pointer-events="none"
                style="transition: opacity 0.2s"
                aria-hidden="true"
              >
                CI/CD
              </text>
            </g>

            <g
              :opacity="nodeOpacity('ai')"
              tabindex="0"
              role="button"
              :aria-label="ariaLabel('ai')"
              pointer-events="all"
              style="transition: opacity 0.2s; cursor: default"
              @mouseenter="onEnter('ai')"
              @mouseleave="onLeave"
              @focus="onEnter('ai')"
              @blur="onLeave"
              @keydown="onKeydown('ai', $event)"
            >
              <circle cx="300" cy="220" r="76" fill="transparent"></circle>
              <circle cx="300" cy="220" r="104" fill="url(#glow)" opacity=".85" pointer-events="none"></circle>
              <circle
                cx="300"
                cy="220"
                r="78"
                fill="none"
                stroke="#4dd8ff"
                stroke-width="1"
                stroke-opacity=".22"
                stroke-dasharray="3 5"
                style="animation: spin 12s linear infinite; transform-origin: 300px 220px"
              ></circle>
              <circle
                cx="300"
                cy="220"
                r="66"
                fill="rgba(77,216,255,0.07)"
                stroke="#4dd8ff"
                stroke-width="1.5"
                stroke-opacity=".7"
              ></circle>
              <circle
                cx="300"
                cy="220"
                r="66"
                fill="rgba(77,216,255,0.12)"
                stroke="var(--color-accent)"
                stroke-width="2"
                :opacity="sel('ai')"
                pointer-events="none"
                style="transition: opacity 0.2s"
              ></circle>
              <circle cx="300" cy="220" r="6" fill="#4dd8ff"></circle>
              <text
                x="300"
                y="348"
                text-anchor="middle"
                font-family="JetBrains Mono, monospace"
                font-size="28"
                fill="#4dd8ff"
                letter-spacing=".02em"
              >
                AI Engineering
              </text>
            </g>
          </svg>
        </div>

        <div>
          <p class="text-muted mb-7 text-[15px] leading-[1.85]">
            After 35 years in distributed systems, the focus has shifted to AI-native tooling — building the
            infrastructure layer for agentic engineering workflows. Hover any node.
          </p>
          <div class="flex flex-col gap-2.5">
            <div
              class="border-line border-l-accent mb-1 flex items-baseline gap-3 border-b border-l-2 py-1.5 pb-2.5 pl-2.5"
              @mouseenter="onEnter('ai')"
              @mouseleave="onLeave"
            >
              <span class="text-accent w-[150px] shrink-0 font-mono text-xs leading-[1.5] font-semibold"
                >AI Engineering</span
              >
              <span class="text-body text-[15px] leading-[1.6]"
                >Multi-agent systems, LLM orchestration, autonomous agent pipelines, agentic workflows, Claude API
                integration</span
              >
            </div>
            <div
              v-for="skill in SKILL_LIST"
              :key="skill.id"
              class="flex items-baseline gap-3 py-1 pl-2.5 transition-[border-color] duration-200"
              :style="{ borderLeft: `2px solid rgba(77,216,255,${sel(skill.id)})` }"
              @mouseenter="onEnter(skill.id)"
              @mouseleave="onLeave"
            >
              <span class="text-accent w-[150px] shrink-0 font-mono text-xs leading-[1.5]">{{ skill.label }}</span>
              <span class="text-muted text-[15px] leading-[1.6]">{{ skill.desc }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
