export interface ConversionReference {
  id: string
  label: string
  details: string
}

export const conversionReferences: ConversionReference[] = [
  {
    id: 'weight',
    label: 'Weight: 1 oz = 28.35 g | 1 lb = 453.6 g | 1 kg = 2.205 lb',
    details: 'Use grams for accuracy. Hydrated grains: assume 1 mL ≈ 1 g when near field capacity.',
  },
  {
    id: 'volume',
    label: 'Volume: 1 L = 1000 mL | 1 gal = 3.785 L | 1 qt = 0.946 L',
    details: 'For CVG bucket tek, 4.5 L boiling water rehydrates one 650 g coir brick to ~10 qt bulk.',
  },
  {
    id: 'temp',
    label: 'Temperature: °F = (°C × 9/5) + 32',
    details: 'Most cubes colonize best 75–82°F (24–28°C) and fruit 70–76°F (21–24°C).',
  },
  {
    id: 'density',
    label: 'Density Helpers',
    details: 'Water-heavy substrates roughly 1 g/mL; hydrated coir ~0.6 g/mL once fluffed.',
  },
]
