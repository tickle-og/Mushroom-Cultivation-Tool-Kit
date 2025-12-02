export type GuideCategory = 'Basics' | 'Clean Work' | 'Bulk Grow' | 'Species Profiles'

export interface Guide {
  id: string
  title: string
  category: GuideCategory
  summary: string
  relatedTekIds: string[]
  relatedSpeciesIds: string[]
}

export const guides: Guide[] = [
  {
    id: 'sterile-technique',
    title: 'Sterile Workflow Foundations',
    category: 'Clean Work',
    summary:
      'Breaking contamination chains by planning SAB sessions, minimizing turbulence, pre-labeling plates, and sequencing actions intentionally.',
    relatedTekIds: ['agar-plates', 'grain-to-grain'],
    relatedSpeciesIds: ['cubensis-general', 'pleurotus-ostreatus'],
  },
  {
    id: 'bulk-dialing',
    title: 'Dialing in Bulk Tubs',
    category: 'Bulk Grow',
    summary:
      'Covers tub surface conditions, poly/micropore configurations, and reading mycelial feedback under varying ambient humidity.',
    relatedTekIds: ['monotub-cvg', 'dubtub-tek', 'shoebox-tek'],
    relatedSpeciesIds: ['cubensis-general', 'psilo-natalensis'],
  },
  {
    id: 'species-profiles',
    title: 'Species Profiles & Parameters',
    category: 'Species Profiles',
    summary:
      'At-a-glance colonization, fruiting, and humidity ranges for popular psilocybin and gourmet species plus anecdotal quirks.',
    relatedTekIds: ['basic-casing', 'pf-tek'],
    relatedSpeciesIds: [
      'cubensis-general',
      'psilo-natalensis',
      'panaeolus-cyanescens',
      'psilocybe-cyanescens',
      'hericium-erinaceus',
      'pleurotus-ostreatus',
    ],
  },
  {
    id: 'liquid-culture-guide',
    title: 'When to Choose Liquid Culture',
    category: 'Basics',
    summary:
      'Pros/cons of LC vs spore syringes, sterility checkpoints, and how to avoid sugar caramelization or bacterial clouds.',
    relatedTekIds: ['liquid-culture'],
    relatedSpeciesIds: ['cubensis-general'],
  },
  {
    id: 'woodlover-beds',
    title: 'Outdoor Woodlover Beds',
    category: 'Bulk Grow',
    summary:
      'Layered chip beds for Ps. cyanescens with seasonal mulching, slug mitigation, and low-maintenance watering plans.',
    relatedTekIds: ['basic-casing'],
    relatedSpeciesIds: ['psilocybe-cyanescens'],
  },
]
