import { describe, expect, it } from 'vitest'
import { PRINCIPLES, ROLES, origin, principleOf, span, ticks, toYm, years, yearsCoding } from './career'

const NOW = '2026-11'

describe('span', () => {
  it('starts the first role at the left edge', () => {
    expect(span(ROLES[0], NOW).left).toBe(0)
  })

  it('runs the current role to the right edge', () => {
    const current = ROLES.find((r) => r.end === null)!
    const { left, width } = span(current, NOW)
    expect(left + width).toBeCloseTo(100, 0)
  })

  it('keeps roles in order without overlapping', () => {
    for (let i = 1; i < ROLES.length; i++) {
      const prev = span(ROLES[i - 1], NOW)
      const next = span(ROLES[i], NOW)
      expect(next.left).toBeGreaterThanOrEqual(prev.left + prev.width - 0.1)
    }
  })

  it('sizes bars by time: eight years at Vidcrunch outweigh five at BestTV', () => {
    const vidcrunch = span(
      ROLES.find((r) => r.company === 'Vidcrunch')!,
      NOW,
    )
    const besttv = span(
      ROLES.find((r) => r.company === 'BestTV')!,
      NOW,
    )
    expect(vidcrunch.width / besttv.width).toBeCloseTo(96 / 59, 1)
  })
})

describe('ticks', () => {
  it('marks every five years inside the axis', () => {
    expect(ticks(NOW).map((t) => t.year)).toEqual([2010, 2015, 2020, 2025])
    for (const t of ticks(NOW)) {
      expect(t.at).toBeGreaterThan(0)
      expect(t.at).toBeLessThan(100)
    }
  })
})

describe('years', () => {
  it('shows a finished role as a range and the current one as running', () => {
    expect(years(ROLES[0])).toBe('2006–2011')
    expect(years(ROLES.at(-1)!)).toBe('2024–now')
  })
})

describe('toYm', () => {
  it('formats a date as year and month', () => {
    expect(toYm(new Date(2026, 10, 12))).toBe('2026-11')
  })
})

describe('principles', () => {
  it('each come from a real role, or from the whole career', () => {
    for (const p of PRINCIPLES) {
      if (p.from) expect(ROLES.map((r) => r.company)).toContain(p.from)
    }
    expect(PRINCIPLES.filter((p) => p.from === null)).toHaveLength(1)
  })

  it('are found from their role and captioned with it', () => {
    expect(principleOf('Vidcrunch')?.title).toBe('Infra follows requirements')
    expect(principleOf('BestTV')).toBeUndefined()
    expect(origin(principleOf('Vidcrunch')!)).toBe('from Vidcrunch, 2016–2024')
    expect(origin(PRINCIPLES.find((p) => p.from === null)!)).toBe('from all of it, 1991–now')
  })
})

describe('yearsCoding', () => {
  it('counts from 1991', () => {
    expect(yearsCoding(new Date(2026, 10, 12))).toBe(35)
  })
})
