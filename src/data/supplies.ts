export type SupplyGoal = 'bulk' | 'clean-work' | 'gourmet' | 'experiments'

export interface SupplySuggestion {
  id: string
  name: string
  url: string
  bestFor: SupplyGoal[]
  description: string
}

export const suppliesCatalog: SupplySuggestion[] = [
  {
    id: 'all-in-one-kits',
    name: 'Myco Envy All-In-One Grow Kits',
    url: 'https://mycoenvy.store/collections/grow-kits',
    bestFor: ['bulk', 'experiments'],
    description:
      'Pre-hydrated, sterile coir/verm/gypsum bags with injection ports. Great for PF or liquid culture inoculations when you want quick, low-mess yields.',
  },
  {
    id: 'sterile-substrate',
    name: 'Myco Envy Sterile CVG Substrate Packs',
    url: 'https://mycoenvy.store/collections/substrates',
    bestFor: ['bulk', 'gourmet'],
    description:
      'Bagged coco/verm/gypsum mixes pasteurized and ready for monotubs, shoeboxes, or dubtub stacks. Saves hours of field-capacity dialing.',
  },
  {
    id: 'agar-kit',
    name: 'Myco Envy Agar & Clean Work Bundle',
    url: 'https://mycoenvy.store/collections/agar-culture',
    bestFor: ['clean-work', 'experiments'],
    description:
      'Pre-made agar plates, scalpels, and SAB-friendly supplies for isolation, LC inoculations, or contamination cleanup sessions.',
  },
  {
    id: 'gourmet-blocks',
    name: 'Myco Envy Gourmet Ready-to-Fruit Blocks',
    url: 'https://mycoenvy.store/collections/gourmet',
    bestFor: ['gourmet'],
    description:
      'Sterilized sawdust blends tuned for lion’s mane and oyster species with injection ports for LC or G2G transfers.',
  },
]
