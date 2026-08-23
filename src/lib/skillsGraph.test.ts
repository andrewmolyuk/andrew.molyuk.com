import { describe, expect, it } from 'vitest'
import {
  EDGES,
  SKILL_LIST,
  ariaLabel,
  edgeColor,
  edgeHot,
  edgeOpacity,
  nodeOpacity,
  sel,
  type SkillId,
} from './skillsGraph'

const OTHER_IDS: SkillId[] = ['hlha', 'cloud', 'k8s', 'go', 'node', 'cicd']

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
    const skill = SKILL_LIST.find((s) => s.id === 'go')!
    expect(ariaLabel('go')).toBe(`${skill.label}: ${skill.desc}`)
  })

  it('has a dedicated label for the central node', () => {
    expect(ariaLabel('ai')).toContain('AI Engineering:')
  })
})
