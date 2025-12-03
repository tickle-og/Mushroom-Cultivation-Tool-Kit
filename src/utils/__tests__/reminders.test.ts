import { describe, expect, it, vi } from 'vitest'
import { bumpReminder, getNextDueLabel } from '../reminders'

describe('reminder utilities', () => {
  it('advances reminders by configured frequency', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-01T00:00:00Z'))
    const next = bumpReminder(undefined, 24)
    expect(next.startsWith('2024-01-02')).toBe(true)
    vi.useRealTimers()
  })

  it('labels overdue reminders', () => {
    const label = getNextDueLabel('2020-01-01T00:00:00Z')
    expect(label.toLowerCase()).toContain('overdue')
  })
})
