import type { ThemePreference } from './settings'

const prefersDark = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

export const resolveTheme = (preference: ThemePreference): 'light' | 'dark' => {
  if (preference === 'system') {
    return prefersDark() ? 'dark' : 'light'
  }
  return preference
}

export const applyThemeClass = (preference: ThemePreference) => {
  if (typeof document === 'undefined') return
  const resolved = resolveTheme(preference)
  document.body.classList.remove('dark-theme', 'light-theme')
  document.body.classList.add(resolved === 'dark' ? 'dark-theme' : 'light-theme')
}
