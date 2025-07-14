import { render, screen, fireEvent } from '@testing-library/react'
import { ServiceCard } from './ServiceCard'
import { Service } from '../../lib/schemas/service'

const getMockService = (overrides?: Partial<Service>): Service => {
  return {
    id: 'lawn-mowing',
    name: 'Lawn Mowing',
    description: 'Regular, clean cuts using sharp blades to maintain a healthy and even lawn. Includes full mow of front, back, and side yards with patterned mowing available if requested.',
    shortDescription: 'Regular, clean cuts using sharp blades for healthy, even lawn',
    price: 'Contact for pricing',
    priceNote: 'Pricing based on lawn size and frequency',
    features: [
      'Full mow of front, back, and side yards',
      'Patterned mowing available if requested',
      'Sharp blades for healthy cuts'
    ],
    icon: 'mower',
    category: 'maintenance',
    isActive: true,
    seasonalService: false,
    ...overrides,
  }
}

describe('ServiceCard Component', () => {
  describe('Service Information Display', () => {
    it('should display service name', () => {
      const service = getMockService()
      render(<ServiceCard service={service} />)
      
      expect(screen.getByText('Lawn Mowing')).toBeInTheDocument()
    })

    it('should display short description', () => {
      const service = getMockService()
      render(<ServiceCard service={service} />)
      
      expect(screen.getByText(/Regular, clean cuts using sharp blades/)).toBeInTheDocument()
    })

    it('should display pricing information', () => {
      const service = getMockService()
      render(<ServiceCard service={service} />)
      
      expect(screen.getByText('Contact for pricing')).toBeInTheDocument()
    })

    it('should display pricing note when provided', () => {
      const service = getMockService()
      render(<ServiceCard service={service} />)
      
      expect(screen.getByText(/Pricing based on lawn size/)).toBeInTheDocument()
    })
  })

  describe('Service Features', () => {
    it('should display service features list', () => {
      const service = getMockService()
      render(<ServiceCard service={service} />)
      
      expect(screen.getByText('Full mow of front, back, and side yards')).toBeInTheDocument()
      expect(screen.getByText('Patterned mowing available if requested')).toBeInTheDocument()
      expect(screen.getByText('Sharp blades for healthy cuts')).toBeInTheDocument()
    })

    it('should limit features display to first 3 features on card view', () => {
      const service = getMockService({
        features: [
          'Feature 1',
          'Feature 2', 
          'Feature 3',
          'Feature 4',
          'Feature 5'
        ]
      })
      render(<ServiceCard service={service} variant="card" />)
      
      expect(screen.getByText('Feature 1')).toBeInTheDocument()
      expect(screen.getByText('Feature 2')).toBeInTheDocument()
      expect(screen.getByText('Feature 3')).toBeInTheDocument()
      expect(screen.queryByText('Feature 4')).not.toBeInTheDocument()
    })

    it('should show all features when variant is detailed', () => {
      const service = getMockService({
        features: [
          'Feature 1',
          'Feature 2', 
          'Feature 3',
          'Feature 4',
          'Feature 5'
        ]
      })
      render(<ServiceCard service={service} variant="detailed" />)
      
      expect(screen.getByText('Feature 1')).toBeInTheDocument()
      expect(screen.getByText('Feature 4')).toBeInTheDocument()
      expect(screen.getByText('Feature 5')).toBeInTheDocument()
    })
  })

  describe('Service Categories and Indicators', () => {
    it('should display seasonal service indicator', () => {
      const service = getMockService({ seasonalService: true })
      render(<ServiceCard service={service} />)
      
      expect(screen.getByText(/Seasonal/)).toBeInTheDocument()
    })

    it('should not display seasonal indicator for year-round services', () => {
      const service = getMockService({ seasonalService: false })
      render(<ServiceCard service={service} />)
      
      expect(screen.queryByText(/Seasonal/)).not.toBeInTheDocument()
    })

    it('should display category badge', () => {
      const service = getMockService({ category: 'maintenance' })
      render(<ServiceCard service={service} />)
      
      expect(screen.getByText(/Maintenance/)).toBeInTheDocument()
    })

    it('should display professional treatment badge for treatments category', () => {
      const service = getMockService({ 
        category: 'treatments',
        name: 'Soil & Lawn Treatments'
      })
      render(<ServiceCard service={service} />)
      
      expect(screen.getByText(/Professional-Grade/)).toBeInTheDocument()
    })
  })

  describe('Interactive Elements', () => {
    it('should display Learn More button by default', () => {
      const service = getMockService()
      render(<ServiceCard service={service} />)
      
      expect(screen.getByRole('button', { name: /Learn More/i })).toBeInTheDocument()
    })

    it('should call onLearnMore when Learn More button is clicked', () => {
      const service = getMockService()
      const mockOnLearnMore = jest.fn()
      render(<ServiceCard service={service} onLearnMore={mockOnLearnMore} />)
      
      fireEvent.click(screen.getByRole('button', { name: /Learn More/i }))
      expect(mockOnLearnMore).toHaveBeenCalledWith('lawn-mowing')
    })

    it('should display Get Quote button when showQuoteButton is true', () => {
      const service = getMockService()
      render(<ServiceCard service={service} showQuoteButton={true} />)
      
      expect(screen.getByRole('button', { name: /Get Quote/i })).toBeInTheDocument()
    })

    it('should call onGetQuote when Get Quote button is clicked', () => {
      const service = getMockService()
      const mockOnGetQuote = jest.fn()
      render(<ServiceCard service={service} showQuoteButton={true} onGetQuote={mockOnGetQuote} />)
      
      fireEvent.click(screen.getByRole('button', { name: /Get Quote/i }))
      expect(mockOnGetQuote).toHaveBeenCalledWith('lawn-mowing')
    })
  })

  describe('Layout Variants', () => {
    it('should apply card styling for card variant', () => {
      const service = getMockService()
      render(<ServiceCard service={service} variant="card" />)
      
      const card = screen.getByTestId('service-card')
      expect(card).toHaveClass('bg-white')
    })

    it('should apply detailed styling for detailed variant', () => {
      const service = getMockService()
      render(<ServiceCard service={service} variant="detailed" />)
      
      const card = screen.getByTestId('service-card')
      expect(card).toHaveClass('bg-green-50')
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      const service = getMockService()
      render(<ServiceCard service={service} />)
      
      const card = screen.getByTestId('service-card')
      expect(card).toHaveAttribute('role', 'article')
    })

    it('should have proper heading hierarchy', () => {
      const service = getMockService()
      render(<ServiceCard service={service} />)
      
      const heading = screen.getByRole('heading', { name: 'Lawn Mowing' })
      expect(heading).toBeInTheDocument()
    })
  })

  describe('Business Emphasis', () => {
    it('should emphasize family business values', () => {
      const service = getMockService()
      render(<ServiceCard service={service} />)
      
      expect(screen.getByText(/Family-operated quality/)).toBeInTheDocument()
    })

    it('should highlight 12 Oaks neighborhood focus', () => {
      const service = getMockService()
      render(<ServiceCard service={service} />)
      
      expect(screen.getByText(/12 Oaks neighborhood/)).toBeInTheDocument()
    })
  })
}) 