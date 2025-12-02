export const roundTo = (value: number, decimals = 2) =>
  Math.round(value * 10 ** decimals) / 10 ** decimals

export const gramsToOunces = (grams: number) => roundTo(grams / 28.3495, 3)
export const ouncesToGrams = (ounces: number) => roundTo(ounces * 28.3495, 1)
export const kilogramsToPounds = (kg: number) => roundTo(kg * 2.20462, 3)
export const poundsToKilograms = (lb: number) => roundTo(lb / 2.20462, 3)

export const litersToMilliliters = (liters: number) => roundTo(liters * 1000, 1)
export const millilitersToLiters = (milliliters: number) => roundTo(milliliters / 1000, 3)
export const gallonsToLiters = (gallons: number) => roundTo(gallons * 3.78541, 3)
export const litersToGallons = (liters: number) => roundTo(liters / 3.78541, 3)
export const quartsToLiters = (quarts: number) => roundTo(quarts * 0.946353, 3)
export const litersToQuarts = (liters: number) => roundTo(liters / 0.946353, 3)
export const cupsToMilliliters = (cups: number) => roundTo(cups * 236.588, 1)
export const millilitersToCups = (ml: number) => roundTo(ml / 236.588, 2)

export const celsiusToFahrenheit = (celsius: number) => roundTo((celsius * 9) / 5 + 32, 1)
export const fahrenheitToCelsius = (fahrenheit: number) => roundTo(((fahrenheit - 32) * 5) / 9, 1)

export const gramsPerMilliliterWater = 1
export const hydratedCoirDensity = 0.6 // g per mL assumption
