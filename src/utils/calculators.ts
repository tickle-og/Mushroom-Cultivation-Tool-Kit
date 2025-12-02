import { hydratedCoirDensity, roundTo } from './conversions'

export interface SubstrateRecipeRatio {
  coir: number
  verm: number
  gypsum: number
}

export interface SubstrateCalculatorInput {
  totalVolumeLiters: number
  depthCm?: number
  tubFootprintSqCm?: number
  recipeRatio: SubstrateRecipeRatio
}

export interface SubstrateCalculatorResult {
  totalMassKg: number
  ingredients: {
    name: string
    massGrams: number
    approxQuarts?: number
  }[]
}

const litersToQuartsValue = 1.05669

export const calculateSubstrate = (
  input: SubstrateCalculatorInput,
): SubstrateCalculatorResult => {
  let volumeLiters = input.totalVolumeLiters
  if (input.depthCm && input.tubFootprintSqCm) {
    const cubicCm = input.depthCm * input.tubFootprintSqCm
    volumeLiters = cubicCm / 1000
  }

  const totalMassGrams = volumeLiters * 1000 * hydratedCoirDensity
  const ingredientMass = (ratio: number) => roundTo(totalMassGrams * ratio, 1)

  const ingredients = [
    {
      name: 'Coco coir',
      massGrams: ingredientMass(input.recipeRatio.coir),
      approxQuarts: roundTo((volumeLiters * input.recipeRatio.coir) * litersToQuartsValue, 2),
    },
    {
      name: 'Vermiculite',
      massGrams: ingredientMass(input.recipeRatio.verm),
      approxQuarts: roundTo((volumeLiters * input.recipeRatio.verm) * litersToQuartsValue, 2),
    },
    {
      name: 'Gypsum',
      massGrams: ingredientMass(input.recipeRatio.gypsum),
    },
  ]

  return {
    totalMassKg: roundTo(totalMassGrams / 1000, 3),
    ingredients,
  }
}

export interface SpawnRatioResult {
  spawnMass: number
  bulkMass: number
}

export const calculateSpawnRatio = (
  totalSubstrateMassKg: number,
  bulkToSpawnRatio: number,
): SpawnRatioResult => {
  if (bulkToSpawnRatio <= 0) {
    return { spawnMass: 0, bulkMass: 0 }
  }

  const spawnMass = totalSubstrateMassKg / (bulkToSpawnRatio + 1)
  const bulkMass = totalSubstrateMassKg - spawnMass
  return {
    spawnMass: roundTo(spawnMass, 3),
    bulkMass: roundTo(bulkMass, 3),
  }
}

export const calculateBiologicalEfficiency = (
  dryInputKg: number,
  harvestKg: number,
) => {
  if (!dryInputKg) {
    return 0
  }
  return roundTo((harvestKg / dryInputKg) * 100, 1)
}
