<script setup lang="ts">
import { ref } from 'vue'

type SkillId = 'ai' | 'hlha' | 'cloud' | 'k8s' | 'go' | 'node' | 'cicd'

const EDGES: [SkillId, SkillId][] = [
  ['hlha', 'ai'],
  ['cloud', 'ai'],
  ['k8s', 'ai'],
  ['go', 'ai'],
  ['node', 'ai'],
  ['cicd', 'ai'],
]

const SKILL_LIST: { id: Exclude<SkillId, 'ai'>; label: string; desc: string }[] = [
  {
    id: 'hlha',
    label: 'HL/HA Distributed Systems',
    desc: 'High-load, high-availability systems. 100% uptime, 0% data loss, no performance degradation. Vidcrunch: 100K req/sec at idle.',
  },
  {
    id: 'cloud',
    label: 'Cloud Computing',
    desc: 'AWS cloud services: serverless, containerized, and traditional. Infrastructure as code with Terraform.',
  },
  {
    id: 'k8s',
    label: 'Docker & Kubernetes',
    desc: 'Docker, Swarm, and Kubernetes for dev and deployment. Multi-stage and multi-architecture builds, docker-compose.',
  },
  {
    id: 'go',
    label: 'Go Development',
    desc: 'Scalable, testable, maintainable Go, microservices, service migrations, high-performance backends',
  },
  {
    id: 'node',
    label: 'Node.js & Bun',
    desc: 'JS/TS across frontend and backend — Node.js and Bun runtimes, REST and GraphQL APIs. React, Vue, Express, Nest.js.',
  },
  {
    id: 'cicd',
    label: 'CI/CD',
    desc: 'Pipelines with Jenkins, GitLab CI, CircleCI, GitHub Actions, Bamboo, automated build and deployment workflows',
  },
]

const hovered = ref<SkillId | null>(null)

function onEnter(id: SkillId) {
  hovered.value = id
}
function onLeave() {
  hovered.value = null
}

function edgeFor(id: SkillId) {
  return EDGES.find(([a]) => a === id)
}
function edgeHot(id: SkillId) {
  const h = hovered.value
  if (!h) return false
  const edge = edgeFor(id)
  if (!edge) return false
  return edge[0] === h || edge[1] === h
}
function nodeOpacity(id: SkillId) {
  const h = hovered.value
  if (!h) return 1
  if (id === h) return 1
  const connected = EDGES.some(([a, b]) => (a === h && b === id) || (b === h && a === id))
  return connected ? 1 : 0.2
}
function edgeOpacity(id: SkillId) {
  if (!hovered.value) return 0.3
  return edgeHot(id) ? 1 : 0.05
}
function edgeColor(id: SkillId) {
  return edgeHot(id) ? 'var(--color-accent)' : '#3a3a46'
}
function sel(id: SkillId) {
  return hovered.value === id || hovered.value === 'ai' ? 1 : 0
}
</script>

<template>
  <section id="skills" class="border-t border-line px-8 py-22">
    <div class="mx-auto max-w-[1100px]">
      <div class="mb-11">
        <span class="mb-2 block font-mono text-[11.5px] tracking-[0.18em] text-muted uppercase">01 / skills</span>
        <h2 class="text-[clamp(26px,3.5vw,40px)] leading-[1.1] font-semibold tracking-[-0.03em] text-heading">
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

            <g stroke="#3a3a46" stroke-width="1.4" stroke-opacity=".3">
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

            <g fill="#4dd8ff" opacity=".55">
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
                <animateMotion path="M300 32 Q270 126 300 220" dur="4.4s" begin="2.1s" repeatCount="indefinite"></animateMotion>
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
              @mouseenter="onEnter('hlha')"
              @mouseleave="onLeave"
              :opacity="nodeOpacity('hlha')"
              pointer-events="all"
              style="transition: opacity 0.2s; cursor: default"
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
              <text x="54" y="123" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="28" fill="#8b8b99" letter-spacing=".02em">HL/HA Distributed</text>
              <text x="54" y="155" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="28" fill="#8b8b99" letter-spacing=".02em">Systems</text>
              <text x="54" y="123" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="28" fill="var(--color-accent)" letter-spacing=".02em" :opacity="sel('hlha')" pointer-events="none" style="transition: opacity 0.2s">HL/HA Distributed</text>
              <text x="54" y="155" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="28" fill="var(--color-accent)" letter-spacing=".02em" :opacity="sel('hlha')" pointer-events="none" style="transition: opacity 0.2s">Systems</text>
            </g>

            <g
              @mouseenter="onEnter('cloud')"
              @mouseleave="onLeave"
              :opacity="nodeOpacity('cloud')"
              pointer-events="all"
              style="transition: opacity 0.2s; cursor: default"
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
              <text x="539" y="303" text-anchor="start" font-family="JetBrains Mono, monospace" font-size="28" fill="#8b8b99" letter-spacing=".02em">Cloud</text>
              <text x="539" y="335" text-anchor="start" font-family="JetBrains Mono, monospace" font-size="28" fill="#8b8b99" letter-spacing=".02em">Computing</text>
              <text x="539" y="303" text-anchor="start" font-family="JetBrains Mono, monospace" font-size="28" fill="var(--color-accent)" letter-spacing=".02em" :opacity="sel('cloud')" pointer-events="none" style="transition: opacity 0.2s">Cloud</text>
              <text x="539" y="335" text-anchor="start" font-family="JetBrains Mono, monospace" font-size="28" fill="var(--color-accent)" letter-spacing=".02em" :opacity="sel('cloud')" pointer-events="none" style="transition: opacity 0.2s">Computing</text>
            </g>

            <g
              @mouseenter="onEnter('k8s')"
              @mouseleave="onLeave"
              :opacity="nodeOpacity('k8s')"
              pointer-events="all"
              style="transition: opacity 0.2s; cursor: default"
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
              <text x="51" y="303" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="28" fill="#8b8b99" letter-spacing=".02em">Docker &amp;</text>
              <text x="51" y="335" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="28" fill="#8b8b99" letter-spacing=".02em">Kubernetes</text>
              <text x="51" y="303" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="28" fill="var(--color-accent)" letter-spacing=".02em" :opacity="sel('k8s')" pointer-events="none" style="transition: opacity 0.2s">Docker &amp;</text>
              <text x="51" y="335" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="28" fill="var(--color-accent)" letter-spacing=".02em" :opacity="sel('k8s')" pointer-events="none" style="transition: opacity 0.2s">Kubernetes</text>
            </g>

            <g
              @mouseenter="onEnter('go')"
              @mouseleave="onLeave"
              :opacity="nodeOpacity('go')"
              pointer-events="all"
              style="transition: opacity 0.2s; cursor: default"
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
              <text x="300" y="-27" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="28" fill="#8b8b99" letter-spacing=".02em">Go Development</text>
              <text x="300" y="-27" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="28" fill="var(--color-accent)" letter-spacing=".02em" :opacity="sel('go')" pointer-events="none" style="transition: opacity 0.2s">Go Development</text>
            </g>

            <g
              @mouseenter="onEnter('node')"
              @mouseleave="onLeave"
              :opacity="nodeOpacity('node')"
              pointer-events="all"
              style="transition: opacity 0.2s; cursor: default"
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
              <text x="300" y="483" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="28" fill="#8b8b99" letter-spacing=".02em">Node.js &amp;</text>
              <text x="300" y="515" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="28" fill="#8b8b99" letter-spacing=".02em">Bun</text>
              <text x="300" y="483" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="28" fill="var(--color-accent)" letter-spacing=".02em" :opacity="sel('node')" pointer-events="none" style="transition: opacity 0.2s">Node.js &amp;</text>
              <text x="300" y="515" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="28" fill="var(--color-accent)" letter-spacing=".02em" :opacity="sel('node')" pointer-events="none" style="transition: opacity 0.2s">Bun</text>
            </g>

            <g
              @mouseenter="onEnter('cicd')"
              @mouseleave="onLeave"
              :opacity="nodeOpacity('cicd')"
              pointer-events="all"
              style="transition: opacity 0.2s; cursor: default"
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
              <text x="537" y="139" text-anchor="start" font-family="JetBrains Mono, monospace" font-size="28" fill="#8b8b99" letter-spacing=".02em">CI/CD</text>
              <text x="537" y="139" text-anchor="start" font-family="JetBrains Mono, monospace" font-size="28" fill="var(--color-accent)" letter-spacing=".02em" :opacity="sel('cicd')" pointer-events="none" style="transition: opacity 0.2s">CI/CD</text>
            </g>

            <g
              @mouseenter="onEnter('ai')"
              @mouseleave="onLeave"
              :opacity="nodeOpacity('ai')"
              pointer-events="all"
              style="transition: opacity 0.2s; cursor: default"
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
              <circle cx="300" cy="220" r="66" fill="rgba(77,216,255,0.07)" stroke="#4dd8ff" stroke-width="1.5" stroke-opacity=".7"></circle>
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
              <text x="300" y="348" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="28" fill="#4dd8ff" letter-spacing=".02em">AI Engineering</text>
            </g>
          </svg>
        </div>

        <div>
          <p class="mb-7 text-[15px] leading-[1.85] text-muted">
            After 35 years in distributed systems, the focus has shifted to AI-native tooling — building the
            infrastructure layer for agentic engineering workflows. Hover any node.
          </p>
          <div class="flex flex-col gap-2.5">
            <div
              @mouseenter="onEnter('ai')"
              @mouseleave="onLeave"
              class="mb-1 flex items-baseline gap-3 border-b border-line border-l-2 border-l-accent py-1.5 pb-2.5 pl-2.5"
            >
              <span class="w-[150px] shrink-0 font-mono text-xs leading-[1.5] font-semibold text-accent"
                >AI Engineering</span
              >
              <span class="text-[15px] leading-[1.6] text-body"
                >Multi-agent systems, LLM orchestration, autonomous agent pipelines, agentic workflows, Claude API
                integration</span
              >
            </div>
            <div
              v-for="skill in SKILL_LIST"
              :key="skill.id"
              @mouseenter="onEnter(skill.id)"
              @mouseleave="onLeave"
              class="flex items-baseline gap-3 py-1 pl-2.5 transition-[border-color] duration-200"
              :style="{ borderLeft: `2px solid rgba(77,216,255,${sel(skill.id)})` }"
            >
              <span class="w-[150px] shrink-0 font-mono text-xs leading-[1.5] text-accent">{{ skill.label }}</span>
              <span class="text-[15px] leading-[1.6] text-muted">{{ skill.desc }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
