export type SpeciesCategory = 'cubensis-type' | 'woodlover' | 'panaeolus' | 'gourmet'

export interface Species {
  id: string
  latinName: string
  commonName: string
  category: SpeciesCategory
  typicalColonizationTempC: [number, number]
  typicalFruitingTempC: [number, number]
  typicalRHPercent: [number, number]
  notes: string
}

export const speciesList: Species[] = [
  {
    id: 'cubensis-general',
    latinName: 'Psilocybe cubensis',
    commonName: 'Common Cubensis Varieties',
    category: 'cubensis-type',
    typicalColonizationTempC: [24, 28],
    typicalFruitingTempC: [21, 24],
    typicalRHPercent: [85, 95],
    notes:
      'Forgiving species that thrives on grains + CVG or PF cakes. Most teks are designed around cubensis-style growth parameters.',
  },
  {
    id: 'psilo-natalensis',
    latinName: 'Psilocybe natalensis',
    commonName: 'Natalensis',
    category: 'cubensis-type',
    typicalColonizationTempC: [24, 27],
    typicalFruitingTempC: [22, 25],
    typicalRHPercent: [90, 95],
    notes:
      'Enjoys slightly higher humidity and benefits from gentle surface misting during fruiting. Known for vigorous colonization.',
  },
  {
    id: 'panaeolus-cyanescens',
    latinName: 'Panaeolus cyanescens',
    commonName: 'Pan Cyan',
    category: 'panaeolus',
    typicalColonizationTempC: [24, 27],
    typicalFruitingTempC: [23, 26],
    typicalRHPercent: [92, 98],
    notes:
      'Prefers leaner substrates and aggressive fresh air exchange. Spawn in thinner layers with ample casing moisture.',
  },
  {
    id: 'psilocybe-cyanescens',
    latinName: 'Psilocybe cyanescens',
    commonName: 'Woodlover / Wavy Cap',
    category: 'woodlover',
    typicalColonizationTempC: [18, 22],
    typicalFruitingTempC: [8, 15],
    typicalRHPercent: [85, 95],
    notes:
      'Outdoor or cold-fruiting woodlover that prefers chips or cardboard. Slow colonizer but responds well to fall temperature drops.',
  },
  {
    id: 'hericium-erinaceus',
    latinName: 'Hericium erinaceus',
    commonName: "Lion's Mane",
    category: 'gourmet',
    typicalColonizationTempC: [20, 24],
    typicalFruitingTempC: [16, 20],
    typicalRHPercent: [90, 95],
    notes:
      'Sensitive to CO₂ buildup. Use sawdust substrates and heavy misting or automated humidity to avoid matting.',
  },
  {
    id: 'pleurotus-ostreatus',
    latinName: 'Pleurotus ostreatus',
    commonName: 'Oyster Mushroom',
    category: 'gourmet',
    typicalColonizationTempC: [20, 26],
    typicalFruitingTempC: [14, 21],
    typicalRHPercent: [80, 95],
    notes:
      'Fast colonizer that tolerates a wide temperature range. Great for bucket grows or monotubs repurposed for edibles.',
  },
]
