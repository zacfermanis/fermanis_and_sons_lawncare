import { 
  SERVICES, 
  getServiceById, 
  getServicesByCategory, 
  getActiveServices, 
  getSeasonalServices, 
  getMaintenanceServices 
} from './services'

describe('Service Data', () => {
  describe('SERVICES constant', () => {
    it('should contain all 8 services', () => {
      expect(SERVICES).toHaveLength(8)
    })

    it('should have all required properties for each service', () => {
      SERVICES.forEach(service => {
        expect(service).toHaveProperty('id')
        expect(service).toHaveProperty('name')
        expect(service).toHaveProperty('description')
        expect(service).toHaveProperty('shortDescription')
        expect(service).toHaveProperty('features')
        expect(service).toHaveProperty('icon')
        expect(service).toHaveProperty('category')
        expect(service).toHaveProperty('isActive')
        expect(service).toHaveProperty('seasonalService')
      })
    })

    it('should have valid categories', () => {
      const validCategories = ['maintenance', 'treatments', 'landscaping', 'cleanup']
      SERVICES.forEach(service => {
        expect(validCategories).toContain(service.category)
      })
    })

    it('should have unique service IDs', () => {
      const ids = SERVICES.map(service => service.id)
      const uniqueIds = [...new Set(ids)]
      expect(ids).toHaveLength(uniqueIds.length)
    })
  })

  describe('getServiceById', () => {
    it('should return correct service for valid ID', () => {
      const service = getServiceById('lawn-mowing')
      expect(service).toBeDefined()
      expect(service?.name).toBe('Lawn Mowing')
    })

    it('should return undefined for invalid ID', () => {
      const service = getServiceById('invalid-id')
      expect(service).toBeUndefined()
    })
  })

  describe('getServicesByCategory', () => {
    it('should return maintenance services', () => {
      const services = getServicesByCategory('maintenance')
      expect(services.length).toBeGreaterThan(0)
      services.forEach(service => {
        expect(service.category).toBe('maintenance')
      })
    })

    it('should return treatment services', () => {
      const services = getServicesByCategory('treatments')
      expect(services.length).toBeGreaterThan(0)
      services.forEach(service => {
        expect(service.category).toBe('treatments')
      })
    })

    it('should return empty array for invalid category', () => {
      const services = getServicesByCategory('invalid-category')
      expect(services).toHaveLength(0)
    })
  })

  describe('getActiveServices', () => {
    it('should return only active services', () => {
      const services = getActiveServices()
      expect(services.length).toBeGreaterThan(0)
      services.forEach(service => {
        expect(service.isActive).toBe(true)
      })
    })
  })

  describe('getSeasonalServices', () => {
    it('should return only seasonal services', () => {
      const services = getSeasonalServices()
      expect(services.length).toBeGreaterThan(0)
      services.forEach(service => {
        expect(service.seasonalService).toBe(true)
      })
    })
  })

  describe('getMaintenanceServices', () => {
    it('should return only maintenance category services', () => {
      const services = getMaintenanceServices()
      expect(services.length).toBeGreaterThan(0)
      services.forEach(service => {
        expect(service.category).toBe('maintenance')
      })
    })
  })

  describe('Service Content Validation', () => {
      it('should have professional-grade products mentioned in soil treatments', () => {
    const soilTreatments = getServiceById('soil-treatments')
    expect(soilTreatments?.description).toContain('professional-grade')
      expect(soilTreatments?.description).toContain('soil health treatments')
      expect(soilTreatments?.description).toContain('nutrient formulas')
    })

    it('should have family business emphasis in service descriptions', () => {
      const allDescriptions = SERVICES.map(s => s.description).join(' ')
      expect(allDescriptions).toContain('professional')
    })

    it('should have proper pricing structure', () => {
      SERVICES.forEach(service => {
        expect(service.price).toBeDefined()
        expect(service.priceNote).toBeDefined()
      })
    })
  })
}) 