export type RecipeType = 'substrate' | 'grain' | 'casing' | 'lc'

export interface RecipeIngredient {
  name: string
  quantity: number
  unit: string
}

export interface Recipe {
  id: string
  name: string
  type: RecipeType
  ingredients: RecipeIngredient[]
  notes: string
}

export const recipes: Recipe[] = [
  {
    id: 'cvg-bulk',
    name: 'CVG Bulk Substrate (10 qt finished)',
    type: 'substrate',
    ingredients: [
      { name: 'Coco coir brick', quantity: 650, unit: 'g' },
      { name: 'Vermiculite', quantity: 2, unit: 'L' },
      { name: 'Gypsum', quantity: 120, unit: 'g' },
      { name: 'Water (near boiling)', quantity: 4.5, unit: 'L' },
    ],
    notes:
      'Bucket-tek style. Add boiling water to bucket with coir + additives, cover 4–6 hours, then break apart to field capacity.',
  },
  {
    id: 'pf-mix',
    name: 'PF Cake Mix (6 half-pint jars)',
    type: 'substrate',
    ingredients: [
      { name: 'Fine vermiculite', quantity: 6, unit: 'cups' },
      { name: 'Brown rice flour', quantity: 3, unit: 'cups' },
      { name: 'Water', quantity: 3, unit: 'cups' },
    ],
    notes:
      'Mix verm and water first, then fold in BRF until evenly coated. Load loosely, wipe rims, and add dry verm barrier before sterilizing.',
  },
  {
    id: 'oats-grain',
    name: 'Oat Grain Prep (6 qt jars)',
    type: 'grain',
    ingredients: [
      { name: 'Whole oats', quantity: 2.7, unit: 'kg' },
      { name: 'Water for soak', quantity: 10, unit: 'L' },
      { name: 'Gypsum (optional)', quantity: 15, unit: 'g' },
    ],
    notes:
      '12–18 hour soak with gypsum + boiling water pour-over. Simmer 10–15 minutes, steam dry, load jars, PC at 15 PSI for 120 minutes.',
  },
  {
    id: 'lc-basic',
    name: 'LC Solution (1 qt)',
    type: 'lc',
    ingredients: [
      { name: 'Distilled water', quantity: 950, unit: 'mL' },
      { name: 'Light malt extract', quantity: 38, unit: 'g' },
      { name: 'Honey or dextrose', quantity: 5, unit: 'g' },
    ],
    notes:
      'Aim for 3.5–4% total sugars. Add glass marble or stir bar. Sterilize 25 minutes. Shake while cooling to keep sugars dissolved.',
  },
  {
    id: 'peat-casing',
    name: 'Peat/Verm Casing (5 qt)',
    type: 'casing',
    ingredients: [
      { name: 'Peat moss', quantity: 3, unit: 'qt' },
      { name: 'Vermiculite', quantity: 1.5, unit: 'qt' },
      { name: 'Hydrated lime', quantity: 1.5, unit: 'tbsp' },
      { name: 'Water', quantity: 1.5, unit: 'L' },
    ],
    notes:
      'Pasteurize at 140–160°F for 60 minutes. Adjust pH to 7–7.5 to discourage trichoderma. Squeeze handful to single-drop field capacity.',
  },
]
