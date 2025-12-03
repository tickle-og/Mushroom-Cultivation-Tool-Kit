import { describe, expect, it } from 'vitest'
import { analyzeSymptoms, generateEnvAdvice, suggestTekPlan } from '../assistant'

describe('analyzeSymptoms', () => {
  it('adds troubleshooting data when humidity keywords appear', () => {
    const tips = analyzeSymptoms('High humidity causing blotch contamination everywhere', false)
    const hasReference = tips.some((tip) => tip.toLowerCase().includes('troubleshooting (humidity'))
    expect(hasReference).toBe(true)
  })

  it('includes vector guidance when contamination keyword is detected', () => {
    const tips = analyzeSymptoms('Possible contamination from dirty air vector', false)
    const vectorLine = tips.find((tip) => tip.toLowerCase().includes('primary vectors'))
    expect(vectorLine).toBeTruthy()
  })
})

describe('generateEnvAdvice', () => {
  it('reports when temperature is outside range', () => {
    const [tip] = generateEnvAdvice(10, 90, 'cubensis-general', 'colonization')
    expect(tip).toContain('below the sweet spot')
  })
})

describe('suggestTekPlan', () => {
  it('returns supplies for selected goal', () => {
    const plan = suggestTekPlan('bulk', 'beginner')
    expect(plan.supply?.name).toBeTruthy()
    expect(plan.teks.length).toBeGreaterThan(0)
  })
})
