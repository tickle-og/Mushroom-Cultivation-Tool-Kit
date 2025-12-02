export interface ChecklistTemplate {
  id: string
  title: string
  description: string
  items: { id: string; label: string }[]
}

const STORAGE_KEY = 'myco-toolbag-checklists'

type ChecklistState = Record<string, Record<string, boolean>>

const hasWindow = () => typeof window !== 'undefined' && !!window.localStorage

const readState = (): ChecklistState => {
  if (!hasWindow()) return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ChecklistState) : {}
  } catch (error) {
    console.warn('Failed to parse checklist storage', error)
    return {}
  }
}

const writeState = (state: ChecklistState) => {
  if (!hasWindow()) return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export const getChecklistState = () => readState()

export const toggleChecklistItem = (templateId: string, itemId: string) => {
  const state = readState()
  const templateState = state[templateId] || {}
  templateState[itemId] = !templateState[itemId]
  state[templateId] = templateState
  writeState(state)
  return state
}

export const resetChecklist = (templateId: string) => {
  const state = readState()
  delete state[templateId]
  writeState(state)
  return state
}

export const checklistTemplates: ChecklistTemplate[] = [
  {
    id: 'monotub-prep',
    title: 'Monotub Prep Checklist',
    description: 'Dial in air exchange materials, liners, and bucket-tek substrate before spawning.',
    items: [
      { id: 'clean-tub', label: 'Tub washed + micropore/polytubes ready' },
      { id: 'hydrate-cvg', label: 'CVG hydrated to field capacity' },
      { id: 'spawn-ready', label: 'Grain spawn shaken and consolidated' },
      { id: 'liners', label: 'Liners or trash bags cut to size' },
      { id: 'fae-plan', label: 'FAE plan (fan schedule or passive)' },
    ],
  },
  {
    id: 'agar-session',
    title: 'Agar Session Checklist',
    description: 'Prep SAB workflow before you flame your scalpel.',
    items: [
      { id: 'plates-poured', label: 'Plates poured & cooled' },
      { id: 'tools-sterilized', label: 'Tools sterilized and cooled' },
      { id: 'samples-labeled', label: 'Labels + parafilm ready' },
      { id: 'flame-source', label: 'Flame source or bead sterilizer hot' },
      { id: 'quarantine-plan', label: 'Quarantine area chosen for new plates' },
    ],
  },
  {
    id: 'grain-prep',
    title: 'Grain Prep Checklist',
    description: 'Hydrate, simmer, and dry grains consistently.',
    items: [
      { id: 'soak', label: 'Grain soak started with gypsum + hot water' },
      { id: 'boil', label: 'Simmered until kernels hydrated' },
      { id: 'steam-dry', label: 'Rinsed and steam-dried to non-sticky' },
      { id: 'load-jars', label: 'Jars/bags loaded and vented' },
      { id: 'pc', label: 'Pressure cooker vented & sterilized 120 min' },
    ],
  },
]
