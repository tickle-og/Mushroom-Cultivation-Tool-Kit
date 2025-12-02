export interface LogEntry {
  id: string
  date: string
  title: string
  body: string
  tags: string[]
  tekIds?: string[]
  speciesIds?: string[]
}

const STORAGE_KEY = 'myco-toolbag-log'

const hasWindow = () => typeof window !== 'undefined' && !!window.localStorage

const readStorage = (): LogEntry[] => {
  if (!hasWindow()) return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as LogEntry[]) : []
  } catch (err) {
    console.warn('Failed to parse log entries', err)
    return []
  }
}

const writeStorage = (entries: LogEntry[]) => {
  if (!hasWindow()) return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export const loadEntries = (): LogEntry[] => readStorage()

export const saveEntry = (entry: LogEntry) => {
  const entries = readStorage()
  const updated = [entry, ...entries.filter((e) => e.id !== entry.id)]
  writeStorage(updated)
  return updated
}

export const deleteEntry = (id: string) => {
  const entries = readStorage()
  const updated = entries.filter((entry) => entry.id !== id)
  writeStorage(updated)
  return updated
}
