export type ThemePreference = 'system' | 'light' | 'dark'
export type UnitPreference = 'metric' | 'imperial' | 'mixed'

export interface AppSettings {
  theme: ThemePreference
  units: UnitPreference
  defaultTekId: string
}

const SETTINGS_KEY = 'myco-toolbag-settings'

const defaultSettings: AppSettings = {
  theme: 'system',
  units: 'mixed',
  defaultTekId: 'monotub-cvg',
}

const hasWindow = () => typeof window !== 'undefined'

export const loadSettings = (): AppSettings => {
  if (!hasWindow()) return defaultSettings
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY)
    return raw ? { ...defaultSettings, ...(JSON.parse(raw) as AppSettings) } : defaultSettings
  } catch (error) {
    console.warn('Failed to parse settings', error)
    return defaultSettings
  }
}

export const saveSettings = (settings: AppSettings) => {
  if (!hasWindow()) return
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}
