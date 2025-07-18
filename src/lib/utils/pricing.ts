import type { PropertySize, ServiceType, QuotePrice, AddOnService } from '../schemas'

/**
 * Base pricing structure for different service types and property sizes
 */
const BASE_PRICING = {
  basic: {
    small: 25,
    medium: 35,
    large: 50,
    xlarge: 75,
  },
  premium: {
    small: 125,
    medium: 150,
    large: 200,
    xlarge: 275,
  },
  custom: {
    small: 40,
    medium: 55,
    large: 75,
    xlarge: 100,
  },
} as const

/**
 * Gets the base price for a service type and property size
 */
export const getBasePrice = (serviceType: ServiceType, propertySize: PropertySize): number => {
  return BASE_PRICING[serviceType][propertySize]
}

/**
 * Calculates the total price for add-on services
 */
export const calculateAddOnPrice = (addOns: AddOnService[]): number => {
  return addOns.reduce((total, addOn) => {
    const price = typeof addOn.price === 'string' ? parseFloat(addOn.price) || 0 : addOn.price
    return total + price
  }, 0)
}

/**
 * Creates a price breakdown for a quote
 */
export const createPriceBreakdown = (
  basePrice: number,
  addOns: AddOnService[],
  serviceType: ServiceType,
  propertySize: PropertySize
): QuotePrice['breakdown'] => {
  const breakdown: QuotePrice['breakdown'] = [
    {
      item: `${serviceType} service (${propertySize} property)`,
      price: basePrice,
      description: `Base ${serviceType} lawn care service`,
    },
  ]

  addOns.forEach(addOn => {
    const price = typeof addOn.price === 'string' ? parseFloat(addOn.price) || 0 : addOn.price
    breakdown.push({
      item: addOn.name,
      price,
      description: addOn.description,
    })
  })

  return breakdown
}

/**
 * Calculates the complete quote price including base and add-ons
 */
export const calculateQuotePrice = (
  serviceType: ServiceType,
  propertySize: PropertySize,
  addOns: AddOnService[]
): QuotePrice => {
  const basePrice = getBasePrice(serviceType, propertySize)
  const addOnPrice = calculateAddOnPrice(addOns)
  const totalPrice = basePrice + addOnPrice

  return {
    basePrice,
    addOnPrice,
    totalPrice,
    breakdown: createPriceBreakdown(basePrice, addOns, serviceType, propertySize),
  }
}

/**
 * Applies seasonal pricing adjustments
 */
export const applySeasonalPricing = (basePrice: number, season: 'spring' | 'summer' | 'fall' | 'winter'): number => {
  const seasonalMultipliers = {
    spring: 1.1,  // 10% increase for peak season
    summer: 1.05, // 5% increase for busy season
    fall: 1.0,    // Normal pricing
    winter: 0.8,  // 20% decrease for off-season
  }

  return Math.round(basePrice * seasonalMultipliers[season])
}

/**
 * Calculates discount for recurring services
 */
export const calculateRecurringDiscount = (basePrice: number, frequency: 'weekly' | 'biweekly' | 'monthly'): number => {
  const discountRates = {
    weekly: 0.15,    // 15% discount for weekly service
    biweekly: 0.10,  // 10% discount for bi-weekly service
    monthly: 0.05,   // 5% discount for monthly service
  }

  const discount = basePrice * discountRates[frequency]
  return Math.round(discount)
}

/**
 * Determines if a quote qualifies for free estimates
 */
export const qualifiesForFreeEstimate = (totalPrice: number): boolean => {
  const FREE_ESTIMATE_THRESHOLD = 100
  return totalPrice >= FREE_ESTIMATE_THRESHOLD
} 