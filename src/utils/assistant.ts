import troubleshooting from '../data/troubleshooting.json'
import { speciesList } from '../data/species'
import { teks } from '../data/teks'
import { recipes } from '../data/recipes'
import { suppliesCatalog } from '../data/supplies'
import type { Species } from '../data/species'
import type { TekDefinition } from '../data/teks'
import type { Recipe } from '../data/recipes'
import type { SupplyGoal, SupplySuggestion } from '../data/supplies'

interface TroubleshootingDocument {
  source: string
  version: string
  sections: {
    vectors_of_contamination: {
      overview: string
      vectors: {
        name: string
        description: string
        prevention: string[]
      }[]
    }
    diagnostic_principles: Record<string, string>
    common_problems: Record<
      string,
      {
        symptoms: string[]
        likely_causes: string[]
        solutions: string[]
      }
    >
    growing_room_protocols: {
      hygiene_practices: string[]
      post_contamination_handling: string[]
    }
  }
}

const troubleshootingData = troubleshooting as TroubleshootingDocument

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced'
export type GrowStage = 'colonization' | 'fruiting'
export type GoalFocus = SupplyGoal

const difficultyWeight: Record<ExperienceLevel, number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
}

const tekWeight: Record<TekDefinition['difficulty'], number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
}

const goalCategoryMap: Record<GoalFocus, string[]> = {
  bulk: ['Monotub', 'Dubtub', 'Shoebox', 'Fruiting'],
  'clean-work': ['Clean Work', 'LC Tek'],
  gourmet: ['Clean Work', 'Fruiting'],
  experiments: ['Expansion', 'LC Tek', 'Clean Work'],
}

const goalSpeciesHints: Record<GoalFocus, Species['category'][]> = {
  bulk: ['cubensis-type', 'panaeolus'],
  'clean-work': ['cubensis-type', 'gourmet'],
  gourmet: ['gourmet'],
  experiments: ['cubensis-type', 'woodlover', 'gourmet'],
}

const goalRecipeHints: Record<GoalFocus, Recipe['type'][]> = {
  bulk: ['substrate', 'grain'],
  'clean-work': ['lc', 'casing'],
  gourmet: ['substrate'],
  experiments: ['lc', 'grain'],
}

export const generateEnvAdvice = (
  tempC: number,
  humidityPercent: number,
  speciesId: string,
  stage: GrowStage,
): string[] => {
  const targetSpecies = speciesList.find((spec) => spec.id === speciesId)
  if (!targetSpecies) {
    return ['Select a species to get range-specific insights.']
  }

  const tempRange = stage === 'colonization' ? targetSpecies.typicalColonizationTempC : targetSpecies.typicalFruitingTempC
  const humidityRange = targetSpecies.typicalRHPercent

  const advice: string[] = []

  if (tempC < tempRange[0]) {
    advice.push(`Temperature is ${tempRange[0] - tempC}°C below the sweet spot. Add a seedling mat or move the tub to a warmer closet to keep ${targetSpecies.commonName} happy.`)
  } else if (tempC > tempRange[1]) {
    advice.push(`Temperature is ${tempC - tempRange[1]}°C above ideal. Crack the lid more often or move away from direct lights to prevent stalled mycelium.`)
  } else {
    advice.push(`Temperature is dialed for ${stage}—nice! Keep it steady between ${tempRange[0]}–${tempRange[1]}°C.`)
  }

  if (humidityPercent < humidityRange[0]) {
    advice.push(`Relative humidity is a bit low. Ring the liner and add a light mist; Myco Envy sterile CVG substrate packs (${suppliesCatalog.find((s) => s.id === 'sterile-substrate')?.url}) hold moisture longer in fruiting tubs.`)
  } else if (humidityPercent > humidityRange[1]) {
    advice.push('Humidity is high enough that surface water might pool. Fan for 30 seconds and increase passive FAE to avoid bacterial blotch.')
  } else {
    advice.push('Humidity is within the pinning window. Focus on rhythmic evaporation cues (gentle fanning, daily surface check).')
  }

  if (stage === 'fruiting') {
    advice.push('Remember: pins read surface moisture first. Look for “tiny beads” sheen rather than puddles when you mist and fan.')
  } else {
    advice.push('During colonization, minimal FAE plus consistent temps beat extra heat. Patience > shaking tubs too early.')
  }

  return advice
}

export interface TekPlanRecommendation {
  teks: TekDefinition[]
  species: Species[]
  recipes: Recipe[]
  supply: SupplySuggestion | null
}

export const suggestTekPlan = (
  goal: GoalFocus,
  experience: ExperienceLevel,
): TekPlanRecommendation => {
  const allowedTeks = teks.filter((tek) => {
    const catMatch = goalCategoryMap[goal].some((category) => tek.category.toLowerCase().includes(category.toLowerCase()))
    return catMatch && tekWeight[tek.difficulty] <= difficultyWeight[experience]
  })

  const recommendedSpecies = speciesList.filter((spec) => goalSpeciesHints[goal].includes(spec.category)).slice(0, 3)
  const recommendedRecipes = recipes.filter((recipe) => goalRecipeHints[goal].includes(recipe.type)).slice(0, 2)
  const supply = suppliesCatalog.find((item) => item.bestFor.includes(goal)) ?? suppliesCatalog[0]

  return {
    teks: allowedTeks.slice(0, 3),
    species: recommendedSpecies,
    recipes: recommendedRecipes,
    supply: supply || null,
  }
}

const keywordAdvice: Record<string, string> = {
  contam:
    'Those spots scream contamination. Retire the tub and restart with a Myco Envy All-In-One Grow Kit for a sterile base, then tighten SAB workflow before the next transfer.',
  trich:
    'Green trich patches mean sporulation is imminent. Bag and trash the tub; pressure-cook new grain or use Myco Envy sterile substrate to skip risky pasteurization.',
  stall:
    'Stalled colonization usually points to temps drifting low or spawn that was too wet. Warm the room to 24–26°C and mix in a dehydrated coir top layer to wick off condensation.',
  dry:
    'Dry, matted surfaces stop pins. Mist the walls and lid, then lightly break up the surface and apply a fresh hydrated casing to reboot microclimates.',
  pin:
    'Sparse pins? Increase fresh air cycles and verify 85–95% RH. A light casing and Myco Envy sterile CVG can refresh nutrients for the next flush.',
  bacterial:
    'Yellow metabolites or slimy grains mean bacteria. Clone a clean fruit to agar (Myco Envy agar bundle) and restart with LC or G2G transfers from the clean plate.',
}

export const analyzeSymptoms = (description: string, includeDIYTips: boolean): string[] => {
  if (!description.trim()) {
    return ['Enter a quick summary (“lots of green, weird smell”) and the assistant will respond with play-by-play adjustments.']
  }

  const lower = description.toLowerCase()
  const messages: string[] = []

  Object.keys(keywordAdvice).forEach((keyword) => {
    if (lower.includes(keyword)) {
      messages.push(keywordAdvice[keyword])
    }
  })

  messages.push(...matchCommonProblems(lower))
  if (containsVectorKeywords(lower)) {
    messages.push(vectorReminderMessage())
  }

  if (messages.length === 0) {
    messages.push('No obvious keyword matched, so fall back to fundamentals: confirm sterile technique, refresh air exchange, and log any changes in the grow log.')
  }

  if (includeDIYTips) {
    messages.push('DIY fallback: hydrate 650 g coir + 2.5 L boiling water + 2 cups verm to field capacity, load into liners, and pasteurize at 65°C for 90 minutes before spawning.')
  }

  return messages
}

export const formatSupplyLine = (supply: SupplySuggestion | null): string => {
  if (!supply) return ''
  return `Supplies: ${supply.name} (${supply.url}) — ${supply.description}`
}

type CommonProblemKey = keyof TroubleshootingDocument['sections']['common_problems']

const commonProblemKeywordMap: Record<string, CommonProblemKey> = {
  humidity: 'high_humidity',
  soggy: 'high_humidity',
  wet: 'high_humidity',
  condensation: 'high_humidity',
  blotch: 'high_humidity',
  slime: 'high_humidity',
  fly: 'fly_and_mite_outbreaks',
  flies: 'fly_and_mite_outbreaks',
  mite: 'fly_and_mite_outbreaks',
  mites: 'fly_and_mite_outbreaks',
}

const matchCommonProblems = (text: string) => {
  const problems: string[] = []
  const seen = new Set<CommonProblemKey>()
  Object.entries(commonProblemKeywordMap).forEach(([keyword, key]) => {
    if (text.includes(keyword) && !seen.has(key)) {
      seen.add(key)
      const entry = troubleshootingData.sections.common_problems[key]
      if (entry) {
        problems.push(
          `Troubleshooting (${keyword}): ${entry.likely_causes.join('; ')}. Solutions: ${entry.solutions.join(' • ')}. Source: ${troubleshootingData.source}`,
        )
      }
    }
  })
  return problems
}

const vectorKeywords = ['vector', 'contam', 'contamination', 'mold', 'spore']

const containsVectorKeywords = (text: string) => vectorKeywords.some((word) => text.includes(word))

const vectorReminderMessage = () => {
  const vectorSection = troubleshootingData.sections.vectors_of_contamination
  const hygiene = troubleshootingData.sections.growing_room_protocols.hygiene_practices.join('; ')
  const vectorNames = vectorSection.vectors.map((v) => v.name.replace(/_/g, ' ')).join(', ')
  return `${vectorSection.overview} Primary vectors: ${vectorNames}. Hygiene snapshot: ${hygiene}.`
}
