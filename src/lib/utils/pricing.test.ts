import { 
  getBasePrice, 
  calculateAddOnPrice, 
  calculateQuotePrice, 
  applySeasonalPricing,
  calculateRecurringDiscount,
  qualifiesForFreeEstimate
} from './pricing'
import type { AddOnService } from '../schemas'

describe('Pricing utilities', () => {
  describe('getBasePrice', () => {
    it('should return correct base price for basic service on small property', () => {
      const result = getBasePrice('basic', 'small')
      expect(result).toBe(25)
    })

    it('should return correct base price for premium service on large property', () => {
      const result = getBasePrice('premium', 'large')
      expect(result).toBe(200)
    })

    it('should return correct base price for custom service on xlarge property', () => {
      const result = getBasePrice('custom', 'xlarge')
      expect(result).toBe(100)
    })
  })

  describe('calculateAddOnPrice', () => {
    it('should return 0 for empty add-ons array', () => {
      const result = calculateAddOnPrice([])
      expect(result).toBe(0)
    })

    it('should calculate total price for multiple add-ons', () => {
      const addOns: AddOnService[] = [
        { id: '1', name: 'Weed Removal', price: 25, description: 'Spot weed removal' },
        { id: '2', name: 'Edging', price: 15, description: 'Edge trimming' },
      ]

      const result = calculateAddOnPrice(addOns)
      expect(result).toBe(40)
    })

    it('should handle single add-on service', () => {
      const addOns: AddOnService[] = [
        { id: '1', name: 'Fertilization', price: 50, description: 'Lawn fertilization' },
      ]

      const result = calculateAddOnPrice(addOns)
      expect(result).toBe(50)
    })
  })

  describe('calculateQuotePrice', () => {
    it('should calculate quote price with base service only', () => {
      const result = calculateQuotePrice('basic', 'medium', [])
      
      expect(result.basePrice).toBe(35)
      expect(result.addOnPrice).toBe(0)
      expect(result.totalPrice).toBe(35)
      expect(result.breakdown).toHaveLength(1)
      expect(result.breakdown[0].item).toBe('basic service (medium property)')
    })

    it('should calculate quote price with base service and add-ons', () => {
      const addOns: AddOnService[] = [
        { id: '1', name: 'Weed Removal', price: 25, description: 'Spot weed removal' },
      ]

      const result = calculateQuotePrice('premium', 'small', addOns)
      
      expect(result.basePrice).toBe(125)
      expect(result.addOnPrice).toBe(25)
      expect(result.totalPrice).toBe(150)
      expect(result.breakdown).toHaveLength(2)
      expect(result.breakdown[1].item).toBe('Weed Removal')
    })
  })

  describe('applySeasonalPricing', () => {
    it('should apply spring pricing increase', () => {
      const result = applySeasonalPricing(100, 'spring')
      expect(result).toBe(110) // 10% increase
    })

    it('should apply summer pricing increase', () => {
      const result = applySeasonalPricing(100, 'summer')
      expect(result).toBe(105) // 5% increase
    })

    it('should apply fall pricing (no change)', () => {
      const result = applySeasonalPricing(100, 'fall')
      expect(result).toBe(100) // No change
    })

    it('should apply winter pricing decrease', () => {
      const result = applySeasonalPricing(100, 'winter')
      expect(result).toBe(80) // 20% decrease
    })
  })

  describe('calculateRecurringDiscount', () => {
    it('should calculate weekly service discount', () => {
      const result = calculateRecurringDiscount(100, 'weekly')
      expect(result).toBe(15) // 15% discount
    })

    it('should calculate biweekly service discount', () => {
      const result = calculateRecurringDiscount(100, 'biweekly')
      expect(result).toBe(10) // 10% discount
    })

    it('should calculate monthly service discount', () => {
      const result = calculateRecurringDiscount(100, 'monthly')
      expect(result).toBe(5) // 5% discount
    })
  })

  describe('qualifiesForFreeEstimate', () => {
    it('should return true for quotes above threshold', () => {
      const result = qualifiesForFreeEstimate(150)
      expect(result).toBe(true)
    })

    it('should return true for quotes at threshold', () => {
      const result = qualifiesForFreeEstimate(100)
      expect(result).toBe(true)
    })

    it('should return false for quotes below threshold', () => {
      const result = qualifiesForFreeEstimate(75)
      expect(result).toBe(false)
    })
  })
}) 