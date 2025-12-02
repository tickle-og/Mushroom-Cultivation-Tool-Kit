export interface ContaminationNote {
  id: string
  date: string
  suspectedCause: string
  notes: string
}

const STORAGE_KEY = 'myco-toolbag-contam'

const hasWindow = () => typeof window !== 'undefined' && !!window.localStorage

const readNotes = (): ContaminationNote[] => {
  if (!hasWindow()) return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ContaminationNote[]) : []
  } catch (error) {
    console.warn('Failed to parse contamination log', error)
    return []
  }
}

const writeNotes = (notes: ContaminationNote[]) => {
  if (!hasWindow()) return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

export const loadContaminationNotes = () => readNotes()

export const addContaminationNote = (note: ContaminationNote) => {
  const notes = readNotes()
  const updated = [note, ...notes]
  writeNotes(updated)
  return updated
}
