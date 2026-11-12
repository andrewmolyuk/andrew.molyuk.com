// The Technical Focus graph: AI Engineering at the core, the disciplines it stands on in orbit
// around it, and the tools of each discipline as moons. Disciplines last; the tools around them change.

export type SkillId = 'ai' | 'hlha' | 'cloud' | 'containers' | 'delivery' | 'frontend' | 'backend' | 'integrations'

export interface Skill {
  id: SkillId
  label: string
  desc: string
  tools: string[]
}

export const AI: Skill = {
  id: 'ai',
  label: 'AI Engineering',
  desc: 'Multi-agent pipelines that take real work from a ticket to a pull request, with scripts and tests deciding what ships.',
  tools: ['Claude Code', 'Claude API', 'Subagents', 'Workflows'],
}

/** The disciplines in orbit, clockwise from the top. */
export const SKILL_LIST: (Skill & { id: Exclude<SkillId, 'ai'> })[] = [
  {
    id: 'hlha',
    label: 'Distributed systems',
    desc: 'High-load, high-availability systems that keep serving through failure: live TV voting at 3M requests a second, video ads at 23B events a day.',
    tools: ['3M req/s peak', '100K req/s idle', '23B events/day'],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    desc: 'Whichever cloud the requirements point to: managed services, the edge, or one rented box. Infrastructure as code throughout.',
    tools: ['AWS', 'GCP', 'Azure', 'Cloudflare', 'Hetzner'],
  },
  {
    id: 'containers',
    label: 'Containers',
    desc: 'Docker from laptop to production, with orchestration sized to the load: a single host or a Kubernetes cluster.',
    tools: ['Docker', 'Compose', 'Swarm', 'Kubernetes', 'Kamal'],
  },
  {
    id: 'delivery',
    label: 'Delivery',
    desc: 'Pipelines and hooks that make a release routine. At Vidcrunch they cut release time by 75%.',
    tools: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'Bitbucket', 'Jira', 'Confluence', 'Terraform', 'Git hooks'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    desc: 'Interfaces for the people who run the system, in the framework the product already has.',
    tools: ['TypeScript', 'Vue', 'React', 'Tailwind CSS', 'Astro'],
  },
  {
    id: 'backend',
    label: 'Backend',
    desc: 'Microservices and the migrations between them, built to be tested and run for years: Go where throughput matters, TypeScript where the product lives.',
    tools: ['Go', 'Node.js', 'Bun', 'Python', 'Hono'],
  },
  {
    id: 'integrations',
    label: 'Integrations',
    desc: 'Systems that talk to other systems — HR platforms, network devices, issue trackers — each behind its own adapter, retried and audited.',
    tools: ['REST', 'GraphQL', 'tRPC', 'SNMP', 'Syslog', 'RADIUS', 'Kafka'],
  },
]

export const ALL_SKILLS: Skill[] = [AI, ...SKILL_LIST]

export const EDGES: [SkillId, SkillId][] = SKILL_LIST.map((s) => [s.id, 'ai'])

// ── Geometry (SVG user units) ────────────────────────────────────────────────────────────────

export const VIEW = { width: 720, height: 600 }
export const CENTER = { x: 360, y: 300 }
export const ORBIT = 200
export const CORE_R = 56
export const CORE_MOON_ORBIT = 84
export const PLANET_R = 20
export const MOON_ORBIT = 34
const LABEL_GAP = 54

export interface Point {
  x: number
  y: number
}

function round(n: number) {
  return Math.round(n * 10) / 10
}

/** The angle of a discipline on the orbit, in radians, clockwise from the top. */
export function planetAngle(index: number): number {
  return -Math.PI / 2 + (index * 2 * Math.PI) / SKILL_LIST.length
}

export function planetPosition(index: number): Point {
  const a = planetAngle(index)
  return { x: round(CENTER.x + ORBIT * Math.cos(a)), y: round(CENTER.y + ORBIT * Math.sin(a)) }
}

/** Where a discipline's label goes: outward from the core, anchored so it never runs back over the planet. */
export function labelPlacement(index: number): Point & { anchor: 'start' | 'middle' | 'end' } {
  const a = planetAngle(index)
  const p = planetPosition(index)
  const cos = Math.cos(a)
  const sin = Math.sin(a)
  const anchor = cos > 0.3 ? 'start' : cos < -0.3 ? 'end' : 'middle'
  const dy = anchor === 'middle' ? (sin < 0 ? -2 : 12) : 5
  return { x: round(p.x + LABEL_GAP * cos), y: round(p.y + LABEL_GAP * sin + dy), anchor }
}

/** The spoke from a discipline to the core, stopping at both rims so it never crosses a label. */
export function spoke(index: number): { from: Point; to: Point } {
  const a = planetAngle(index)
  const p = planetPosition(index)
  const cos = Math.cos(a)
  const sin = Math.sin(a)
  const coreRim = CORE_R + 9
  return {
    from: { x: round(p.x - PLANET_R * cos), y: round(p.y - PLANET_R * sin) },
    to: { x: round(CENTER.x + coreRim * cos), y: round(CENTER.y + coreRim * sin) },
  }
}

/** The tools of a discipline as moons evenly spaced on a small orbit around it. */
export function moonPositions(center: Point, count: number, radius: number): Point[] {
  return Array.from({ length: count }, (_, k) => {
    const a = -Math.PI / 2 + (k * 2 * Math.PI) / count
    return { x: round(center.x + radius * Math.cos(a)), y: round(center.y + radius * Math.sin(a)) }
  })
}

// ── Hover state ─────────────────────────────────────────────────────────────────────────────

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
  const skill = ALL_SKILLS.find((s) => s.id === id)
  return skill ? `${skill.label}: ${skill.desc}` : id
}
