import { describe, expect, it } from 'vitest'
import {
  CENTER,
  CORE_R,
  PLANET_R,
  EDGES,
  ORBIT,
  SKILL_LIST,
  ariaLabel,
  labelPlacement,
  moonPositions,
  planetPosition,
  spoke,
  edgeColor,
  edgeHot,
  edgeOpacity,
  nodeOpacity,
  sel,
  type SkillId,
} from './skillsGraph'

const OTHER_IDS: SkillId[] = SKILL_LIST.map((s) => s.id)

describe('sel', () => {
  it('is off when nothing is hovered', () => {
    for (const id of [...OTHER_IDS, 'ai' as const]) {
      expect(sel(null, id)).toBe(0)
    }
  })

  it('is on for the hovered node itself', () => {
    expect(sel('hlha', 'hlha')).toBe(1)
  })

  it('is off for a different, unrelated node', () => {
    expect(sel('hlha', 'cloud')).toBe(0)
  })

  it('hovering the central "ai" node highlights every other node too', () => {
    for (const id of OTHER_IDS) {
      expect(sel('ai', id)).toBe(1)
    }
    expect(sel('ai', 'ai')).toBe(1)
  })
})

describe('nodeOpacity', () => {
  it('is fully opaque when nothing is hovered', () => {
    expect(nodeOpacity(null, 'hlha')).toBe(1)
  })

  it('is fully opaque for the hovered node and its direct edge partner', () => {
    expect(nodeOpacity('hlha', 'hlha')).toBe(1)
    expect(nodeOpacity('hlha', 'ai')).toBe(1)
  })

  it('dims nodes with no edge to the hovered node', () => {
    expect(nodeOpacity('hlha', 'cloud')).toBe(0.2)
  })

  it('hovering the hub node keeps every spoke fully opaque', () => {
    for (const id of OTHER_IDS) {
      expect(nodeOpacity('ai', id)).toBe(1)
    }
  })
})

describe('edgeHot / edgeOpacity / edgeColor', () => {
  it('no edge is hot when nothing is hovered', () => {
    for (const [id] of EDGES) {
      expect(edgeHot(null, id)).toBe(false)
      expect(edgeOpacity(null, id)).toBe(0.3)
      expect(edgeColor(null, id)).toBe('#3a3a46')
    }
  })

  it('the edge touching the hovered node lights up', () => {
    expect(edgeHot('hlha', 'hlha')).toBe(true)
    expect(edgeOpacity('hlha', 'hlha')).toBe(1)
    expect(edgeColor('hlha', 'hlha')).toBe('var(--color-accent)')
  })

  it('unrelated edges dim further once something is hovered', () => {
    expect(edgeHot('hlha', 'cloud')).toBe(false)
    expect(edgeOpacity('hlha', 'cloud')).toBe(0.05)
  })
})

describe('ariaLabel', () => {
  it('combines label and description for a regular skill', () => {
    const skill = SKILL_LIST.find((s) => s.id === 'backend')!
    expect(ariaLabel('backend')).toBe(`${skill.label}: ${skill.desc}`)
  })

  it('has a dedicated label for the central node', () => {
    expect(ariaLabel('ai')).toContain('AI Engineering:')
  })
})

describe('geometry', () => {
  it('puts every discipline on the orbit, evenly spaced', () => {
    const points = SKILL_LIST.map((_, i) => planetPosition(i))
    for (const p of points) expect(Math.hypot(p.x - CENTER.x, p.y - CENTER.y)).toBeCloseTo(ORBIT, 0)
    const gaps = points.map((p, i) => {
      const q = points[(i + 1) % points.length]
      return Math.hypot(p.x - q.x, p.y - q.y)
    })
    for (const gap of gaps) expect(gap).toBeCloseTo(gaps[0], 0)
  })

  it('mirrors the layout left to right', () => {
    const n = SKILL_LIST.length
    for (let i = 1; i < n / 2; i++) {
      const right = planetPosition(i)
      const left = planetPosition(n - i)
      expect(right.x - CENTER.x).toBeCloseTo(CENTER.x - left.x, 0)
      expect(right.y).toBeCloseTo(left.y, 0)
    }
  })

  it('anchors labels away from the core', () => {
    const anchors = SKILL_LIST.map((_, i) => labelPlacement(i).anchor)
    expect(anchors).toEqual(['middle', 'start', 'start', 'start', 'end', 'end', 'end'])
  })

  it('gives each discipline one moon per tool, on its own small orbit', () => {
    for (const [i, skill] of SKILL_LIST.entries()) {
      const p = planetPosition(i)
      const moons = moonPositions(p, skill.tools.length, 37)
      expect(moons).toHaveLength(skill.tools.length)
      for (const m of moons) expect(Math.hypot(m.x - p.x, m.y - p.y)).toBeCloseTo(37, 0)
    }
  })
})

describe('spoke', () => {
  it('runs from the planet rim to just outside the core', () => {
    for (const [i] of SKILL_LIST.entries()) {
      const { from, to } = spoke(i)
      const p = planetPosition(i)
      expect(Math.hypot(from.x - p.x, from.y - p.y)).toBeCloseTo(PLANET_R, 0)
      expect(Math.hypot(to.x - CENTER.x, to.y - CENTER.y)).toBeCloseTo(CORE_R + 9, 0)
    }
  })
})
