export type SkillId = 'ai' | 'hlha' | 'cloud' | 'k8s' | 'go' | 'node' | 'cicd'

export const EDGES: [SkillId, SkillId][] = [
  ['hlha', 'ai'],
  ['cloud', 'ai'],
  ['k8s', 'ai'],
  ['go', 'ai'],
  ['node', 'ai'],
  ['cicd', 'ai'],
]

export const SKILL_LIST: { id: Exclude<SkillId, 'ai'>; label: string; desc: string }[] = [
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

export const AI_DESC =
  'Multi-agent systems, LLM orchestration, autonomous agent pipelines, agentic workflows, Claude API integration'

export function edgeFor(id: SkillId) {
  return EDGES.find(([a]) => a === id)
}

export function edgeHot(hovered: SkillId | null, id: SkillId) {
  if (!hovered) return false
  const edge = edgeFor(id)
  if (!edge) return false
  return edge[0] === hovered || edge[1] === hovered
}

export function nodeOpacity(hovered: SkillId | null, id: SkillId) {
  if (!hovered) return 1
  if (id === hovered) return 1
  const connected = EDGES.some(([a, b]) => (a === hovered && b === id) || (b === hovered && a === id))
  return connected ? 1 : 0.2
}

export function edgeOpacity(hovered: SkillId | null, id: SkillId) {
  if (!hovered) return 0.3
  return edgeHot(hovered, id) ? 1 : 0.05
}

export function edgeColor(hovered: SkillId | null, id: SkillId) {
  return edgeHot(hovered, id) ? 'var(--color-accent)' : '#3a3a46'
}

export function sel(hovered: SkillId | null, id: SkillId) {
  return hovered === id || hovered === 'ai' ? 1 : 0
}

export function ariaLabel(id: SkillId) {
  if (id === 'ai') return `AI Engineering: ${AI_DESC}`
  const skill = SKILL_LIST.find((s) => s.id === id)
  return skill ? `${skill.label}: ${skill.desc}` : id
}
