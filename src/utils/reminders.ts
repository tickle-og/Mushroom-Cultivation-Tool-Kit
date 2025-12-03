export interface ReminderEntry {
  id: string
  task: string
  description: string
  frequencyHours: number
}

export type ReminderState = Record<string, string>

const STORAGE_KEY = 'myco-toolbag-reminders'

export const defaultReminders: ReminderEntry[] = [
  {
    id: 'flush-check',
    task: 'Flush Check',
    description: 'Peek at surface conditions, spot pins, and prep harvest tools.',
    frequencyHours: 48,
  },
  {
    id: 'substrate-prep',
    task: 'Substrate Prep',
    description: 'Hydrate CVG or line up sterile Myco Envy substrates for the next spawn.',
    frequencyHours: 168,
  },
  {
    id: 'inoculation',
    task: 'Inoculation / LC Transfer',
    description: 'Plan SAB session, flame sterilize needles, and shake LC jars.',
    frequencyHours: 120,
  },
]

const hasWindow = () => typeof window !== 'undefined'

export const loadReminderState = (): ReminderState => {
  if (!hasWindow()) return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ReminderState) : {}
  } catch (error) {
    console.warn('Failed to load reminders', error)
    return {}
  }
}

export const saveReminderState = (state: ReminderState) => {
  if (!hasWindow()) return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export const getNextDueLabel = (iso?: string) => {
  if (!iso) return 'Not scheduled yet'
  const dueDate = new Date(iso)
  if (Number.isNaN(dueDate.getTime())) return 'Invalid date'
  const now = new Date()
  const diffMs = dueDate.getTime() - now.getTime()
  if (diffMs <= 0) {
    const elapsedHours = Math.abs(diffMs) / 1000 / 3600
    return `Overdue by ${elapsedHours.toFixed(1)}h`
  }
  const hours = diffMs / 1000 / 3600
  if (hours < 24) {
    return `Due in ${hours.toFixed(1)}h`
  }
  const days = hours / 24
  return `Due in ${days.toFixed(1)}d`
}

export const bumpReminder = (current?: string, frequencyHours?: number) => {
  const baseDate = current && !Number.isNaN(new Date(current).getTime()) ? new Date(current) : new Date()
  const ms = (frequencyHours ?? 24) * 3600 * 1000
  return new Date(baseDate.getTime() + ms).toISOString().slice(0, 16)
}
