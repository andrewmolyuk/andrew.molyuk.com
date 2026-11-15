import { describe, expect, it } from 'vitest'
import { fromDay, toDay } from './today'

describe('the render day', () => {
  it('is the calendar day the build saw, even late on New Year’s Eve', () => {
    expect(toDay(new Date(2026, 11, 31, 23, 30))).toBe('2026-12-31')
  })

  it('reaches the browser as the same year, month and day, in any time zone', () => {
    const day = fromDay('2026-12-31')
    expect([day.getFullYear(), day.getMonth(), day.getDate()]).toEqual([2026, 11, 31])
  })
})
