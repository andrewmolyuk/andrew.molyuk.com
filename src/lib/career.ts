// The career behind "How I Think About Systems": each role on a shared time axis with the result it is
// remembered for, and the principles that came out of it. Dates are from LinkedIn.

export interface Role {
  company: string
  title: string
  /** 'YYYY-MM' */
  start: string
  /** 'YYYY-MM', or null while it lasts */
  end: string | null
  /** Engineers led, where known. */
  team?: number
  result: string
}

export const ROLES: Role[] = [
  {
    company: 'BestTV',
    title: 'R&D Director',
    start: '2006-08',
    end: '2011-07',
    result:
      'Video management and a CDN that brought every Israeli media service under one roof, and the R&D department that built them.',
  },
  {
    company: 'Synerion Systems',
    title: 'Development Manager',
    start: '2011-10',
    end: '2014-04',
    team: 15,
    result:
      'Floating-shift management and a mobile app that took the product into the US market, to enterprises of 65,000 employees and more.',
  },
  {
    company: 'YKM',
    title: 'CTO',
    start: '2014-04',
    end: '2015-06',
    team: 15,
    result:
      'Pulled the company back from collapse: hired R&D from zero, set up the process, delivered projects for Isracard, Visa, Mizrahi Tefahot and Tiv Taam.',
  },
  {
    company: 'Screenz',
    title: 'VP R&D',
    start: '2015-07',
    end: '2016-08',
    team: 30,
    result:
      "Live voting on air: Hillary Clinton's debates, Ricky Martin's La Banda on Univision, ABC's Rising Star, at peaks of 3M requests a second.",
  },
  {
    company: 'Vidcrunch',
    title: 'CTO',
    start: '2016-08',
    end: '2024-08',
    team: 15,
    result:
      'Automatic ad-campaign tuning and anomaly monitoring: $17M in its first year, around 23B events a day, releases 75% faster.',
  },
  {
    company: 'CGS Tower Networks',
    title: 'WebUI Architect · AI adoption lead',
    start: '2024-09',
    end: null,
    team: 5,
    result:
      'The WebUI for every device the company makes, high-load central management for all of them, and agents that take tickets to pull requests in production.',
  },
]

/** The year the first code was written; the count of years on the site runs from here. */
export const CODING_SINCE = 1991

export interface Principle {
  n: string
  title: string
  desc: string
  /** The role it came out of, or null for one the whole career taught. */
  from: string | null
}

export const PRINCIPLES: Principle[] = [
  {
    n: '01',
    title: 'Infra follows requirements',
    desc: 'Self-hosted or managed is a call per project: load, cost, compliance, and who will run it at 3 a.m. Neither is right by default.',
    from: 'Vidcrunch',
  },
  {
    n: '02',
    title: 'LLM × Determinism',
    desc: 'Keep model reasoning apart from deterministic checks. The model proposes; the system verifies.',
    from: 'CGS Tower Networks',
  },
  {
    n: '03',
    title: 'Depth over breadth',
    desc: "Thirty-five years in one problem space: systems that aren't allowed to fall over. Tools change; the problems don't.",
    from: null,
  },
]

/** The principle a role taught, if any. */
export function principleOf(company: string): Principle | undefined {
  return PRINCIPLES.find((p) => p.from === company)
}

/** Where a principle came from, as a caption: the role and its years, or the whole career. */
export function origin(principle: Principle): string {
  const role = ROLES.find((r) => r.company === principle.from)
  return role ? `from ${role.company}, ${years(role)}` : `from all of it, ${CODING_SINCE}–now`
}

export function yearsCoding(today: Date = new Date()): number {
  return today.getFullYear() - CODING_SINCE
}

/** Where the axis starts: the first role. */
export const AXIS_START = ROLES[0].start

function months(ym: string): number {
  const [y, m] = ym.split('-').map(Number)
  return y * 12 + (m - 1)
}

export function toYm(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

/** A role's bar as percentages of the axis from its start to `now`. */
export function span(role: Role, now: string): { left: number; width: number } {
  const from = months(AXIS_START)
  const total = months(now) - from
  const start = months(role.start) - from
  const end = months(role.end ?? now) - from
  const pct = (n: number) => Math.round((n / total) * 1000) / 10
  return { left: pct(start), width: pct(end - start) }
}

/** Year marks on the axis, every five years, as percentages. */
export function ticks(now: string): { year: number; at: number }[] {
  const from = months(AXIS_START)
  const total = months(now) - from
  const first = Math.ceil(Number(AXIS_START.slice(0, 4)) / 5) * 5
  const last = Number(now.slice(0, 4))
  const out: { year: number; at: number }[] = []
  for (let year = first; year <= last; year += 5) {
    out.push({ year, at: Math.round(((months(`${year}-01`) - from) / total) * 1000) / 10 })
  }
  return out
}

export function years(role: Role): string {
  return `${role.start.slice(0, 4)}–${role.end ? role.end.slice(0, 4) : 'now'}`
}
