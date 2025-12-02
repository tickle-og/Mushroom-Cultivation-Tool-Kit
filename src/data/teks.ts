export type TekDifficulty = 'beginner' | 'intermediate' | 'advanced'

export interface TekDefinition {
  id: string
  name: string
  category: string
  difficulty: TekDifficulty
  summary: string
  recommendedSpecies: string[]
  stepsOutline: string[]
}

export const teks: TekDefinition[] = [
  {
    id: 'pf-tek',
    name: 'PF Tek Cakes',
    category: 'PF Tek',
    difficulty: 'beginner',
    summary:
      'Classic brown rice flour cakes steamed in half-pint jars. Great for first grows and for cloning genetics to agar.',
    recommendedSpecies: ['cubensis-general', 'psilo-natalensis'],
    stepsOutline: [
      'Mix BRF, vermiculite, and water to light field capacity',
      'Load jars loosely, cover with dry verm barrier and foil',
      'Steam sterilize 90 minutes or pressure cook 60 minutes',
      'Inoculate via injection ports and incubate at room temp',
      'Birth, rinse, dunk + roll, fruit in high humidity chamber',
    ],
  },
  {
    id: 'monotub-cvg',
    name: 'Monotub Bulk CVG Tek',
    category: 'Monotub',
    difficulty: 'intermediate',
    summary:
      'Hydrated coco coir, vermiculite, and gypsum substrate prepared for 54–66 qt monotubs with passive FAE.',
    recommendedSpecies: ['cubensis-general', 'psilo-natalensis'],
    stepsOutline: [
      'Hydrate CVG substrate to field capacity via bucket tek',
      'Mix pasteurized CVG with fully colonized grain spawn',
      'Level substrate 2–3 inches deep and add light top layer',
      'Set tub for high humidity with occasional surface misting',
      'Introduce more FAE once pins form to avoid fuzzy feet',
    ],
  },
  {
    id: 'shoebox-tek',
    name: 'Shoebox Batch Tek',
    category: 'Shoebox',
    difficulty: 'beginner',
    summary:
      'Scaled-down monotub using two 6 qt boxes nested together. Ideal for testing clones or multispore genetics.',
    recommendedSpecies: ['cubensis-general'],
    stepsOutline: [
      'Line shoebox with liner or parchment',
      'Mix 1:1 spawn to bulk at ~2 inch depth',
      'Nest second box upside down for humidity dome',
      'Leave unlatched for passive FAE once colonized',
      'Harvest flushes and rehydrate with 12 hour soak',
    ],
  },
  {
    id: 'dubtub-tek',
    name: 'Dubtub Tek',
    category: 'Dubtub',
    difficulty: 'intermediate',
    summary:
      'Two clear tubs taped together to form a tall microclimate. Allows extra headspace for canopies.',
    recommendedSpecies: ['cubensis-general', 'panaeolus-cyanescens'],
    stepsOutline: [
      'Prep substrate similar to monotub but slightly thinner',
      'Stack identically sized tubs with micropore taped holes',
      'Dial in polyfill or micropore for balanced FAE',
      'Mist walls and surface lightly between flushes',
      'Flip top tub or crack lid once pins mature',
    ],
  },
  {
    id: 'agar-plates',
    name: 'Agar Plates & Isolation',
    category: 'Clean Work',
    difficulty: 'intermediate',
    summary:
      'Prepare malt extract agar plates to isolate clean cultures and transfer sectors before going to grain.',
    recommendedSpecies: ['cubensis-general', 'hericium-erinaceus', 'pleurotus-ostreatus'],
    stepsOutline: [
      'Mix agar powder with light malt extract and water',
      'Sterilize media in bottles or flasks, cool to 120°F',
      'Pour plates in SAB or flow hood, flame-sterilize tools',
      'Transfer clean mycelium away from contamination',
      'Label, wrap in parafilm, store chilled if needed',
    ],
  },
  {
    id: 'grain-to-grain',
    name: 'Grain-to-Grain Transfer',
    category: 'Expansion',
    difficulty: 'advanced',
    summary:
      'Rapidly multiply colonized grain by transferring clean masters to fresh sterilized jars or bags.',
    recommendedSpecies: ['cubensis-general', 'psilo-natalensis', 'pleurotus-ostreatus'],
    stepsOutline: [
      'Prepare hydrated grain jars with injection ports or filter lids',
      'Select fully colonized master grain jar with vigorous growth',
      'In SAB/hood, open master and recipient jars sequentially',
      'Transfer grain scoops quickly, shake to distribute evenly',
      'Allow 5–7 days for recovery before spawning to bulk',
    ],
  },
  {
    id: 'liquid-culture',
    name: 'Liquid Culture Tek',
    category: 'LC Tek',
    difficulty: 'intermediate',
    summary:
      'Light malt extract or karo-based liquid nutrient solution inoculated to create injectable culture syringes.',
    recommendedSpecies: ['cubensis-general', 'psilo-natalensis', 'pleurotus-ostreatus'],
    stepsOutline: [
      'Mix LC solution (e.g., 4% LME) and sterilize in jars with magnetic stir bars',
      'Inoculate with agar wedge or spore solution via injection port',
      'Incubate at room temp, swirl or stir daily for gas exchange',
      'Test on agar or grain before widespread use',
      'Store refrigerated and shake before drawing into syringes',
    ],
  },
  {
    id: 'basic-casing',
    name: 'Basic Casing Tek',
    category: 'Fruiting',
    difficulty: 'beginner',
    summary:
      'Adds a non-nutritive casing layer to manage surface moisture for species that prefer evaporation cues.',
    recommendedSpecies: ['panaeolus-cyanescens', 'psilocybe-cyanescens', 'pleurotus-ostreatus'],
    stepsOutline: [
      'Hydrate peat/verm or Jiffy mix to field capacity and pasteurize',
      'Apply 0.5–1 inch layer after substrate colonizes',
      'Lightly compress and mist to glisten',
      'Maintain gentle airflow to promote evaporation',
      'Rehydrate casing between flushes as needed',
    ],
  },
]
