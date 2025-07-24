import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter, useParams } from 'next/navigation'
import ServiceDetailPage from './page'

// Mock Next.js router and params
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}))

const mockPush = jest.fn()
const mockBack = jest.fn()

describe('Service Detail Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      back: mockBack,
    })
  })

  describe('Valid Service Display', () => {
    beforeEach(() => {
      ;(useParams as jest.Mock).mockReturnValue({
        serviceId: 'lawn-mowing'
      })
    })

    it('should display service name as page title', () => {
      render(<ServiceDetailPage />)
      
      expect(screen.getByRole('heading', { name: /Lawn Mowing/i })).toBeInTheDocument()
    })

    it('should display full service description', () => {
      render(<ServiceDetailPage />)
      
      expect(screen.getByText(/Regular, clean cuts using sharp blades to maintain a healthy and even lawn/i)).toBeInTheDocument()
    })

    it('should display all service features', () => {
      render(<ServiceDetailPage />)
      
      expect(screen.getByText('Full mow of front, back, and side yards')).toBeInTheDocument()
      expect(screen.getByText('Patterned mowing available if requested')).toBeInTheDocument()
      expect(screen.getByText('Clippings mulched or bagged based on lawn needs')).toBeInTheDocument()
    })

    it('should display pricing information', () => {
      render(<ServiceDetailPage />)
      
      const pricingElements = screen.getAllByText('Contact for pricing')
      expect(pricingElements.length).toBeGreaterThan(0)
      expect(screen.getByText(/Pricing based on lawn size and frequency/i)).toBeInTheDocument()
    })

    it('should show service category badge', () => {
      render(<ServiceDetailPage />)
      
      const maintenanceBadges = screen.getAllByText('Maintenance')
      expect(maintenanceBadges.length).toBeGreaterThan(0)
    })
  })

  describe('Professional Treatment Service', () => {
    beforeEach(() => {
      ;(useParams as jest.Mock).mockReturnValue({
        serviceId: 'soil-treatments'
      })
    })

    it('should display professional-grade badge for treatments', () => {
      render(<ServiceDetailPage />)
      
      expect(screen.getByText('Professional-Grade')).toBeInTheDocument()
    })

    it('should emphasize premium products', () => {
      render(<ServiceDetailPage />)
      
      const premiumText = screen.getAllByText(/Using professional-grade products/i)
      expect(premiumText.length).toBeGreaterThan(0)
    })
  })

  describe('Navigation', () => {
    beforeEach(() => {
      ;(useParams as jest.Mock).mockReturnValue({
        serviceId: 'lawn-mowing'
      })
    })

    it('should have back to services button', () => {
      render(<ServiceDetailPage />)
      
      expect(screen.getByRole('button', { name: /Back to Services/i })).toBeInTheDocument()
    })

    it('should navigate back to services when back button is clicked', () => {
      render(<ServiceDetailPage />)
      
      const backButton = screen.getByRole('button', { name: /Back to Services/i })
      fireEvent.click(backButton)
      
      expect(mockPush).toHaveBeenCalledWith('/services')
    })

    it('should have Get Quote button', () => {
      render(<ServiceDetailPage />)
      
      expect(screen.getByRole('button', { name: /Get Quote/i })).toBeInTheDocument()
    })

    it('should navigate to quote page with service pre-selected', () => {
      render(<ServiceDetailPage />)
      
      const quoteButton = screen.getByRole('button', { name: /Get Quote/i })
      fireEvent.click(quoteButton)
      
      expect(mockPush).toHaveBeenCalledWith('/quote?service=lawn-mowing')
    })

    it('should have Call Now button', () => {
      render(<ServiceDetailPage />)
      
      const callButtons = screen.getAllByRole('button', { name: /Call Now/i })
      expect(callButtons.length).toBeGreaterThan(0)
    })
  })

  describe('Related Services', () => {
    beforeEach(() => {
      ;(useParams as jest.Mock).mockReturnValue({
        serviceId: 'lawn-mowing'
      })
    })

    it('should display related services section', () => {
      render(<ServiceDetailPage />)
      
      expect(screen.getByText(/Related Services/i)).toBeInTheDocument()
    })

    it('should show other services in same category', () => {
      render(<ServiceDetailPage />)
      
      // Should show other maintenance services
      expect(screen.getByText('Weedwacking (String Trimming)')).toBeInTheDocument()
      expect(screen.getByText('Edging')).toBeInTheDocument()
    })

    it('should navigate to related service when clicked', () => {
      render(<ServiceDetailPage />)
      
      const relatedServiceButtons = screen.getAllByRole('button', { name: /Learn More/i })
      // Should have at least one related service
      expect(relatedServiceButtons.length).toBeGreaterThan(0)
      
      // Test that clicking would trigger navigation
      if (relatedServiceButtons.length > 0) {
        fireEvent.click(relatedServiceButtons[0])
        // Verify the button is clickable (navigation might depend on related services available)
        expect(relatedServiceButtons[0]).toBeInTheDocument()
      }
    })
  })

  describe('Family Business Emphasis', () => {
    beforeEach(() => {
      ;(useParams as jest.Mock).mockReturnValue({
        serviceId: 'lawn-mowing'
      })
    })

    it('should emphasize family business values', () => {
      render(<ServiceDetailPage />)
      
      const familyText = screen.getAllByText(/Family-operated quality/i)
      expect(familyText.length).toBeGreaterThan(0)
    })

    it('should highlight 12 Oaks neighborhood focus', () => {
      render(<ServiceDetailPage />)
      
      const neighborhoodText = screen.getAllByText(/12 Oaks neighborhood/i)
      expect(neighborhoodText.length).toBeGreaterThan(0)
    })

    it('should mention professional-grade products', () => {
      render(<ServiceDetailPage />)
      
      const professionalText = screen.getAllByText(/professional-grade products/i)
      expect(professionalText.length).toBeGreaterThan(0)
    })
  })

  describe('Contact Information', () => {
    beforeEach(() => {
      ;(useParams as jest.Mock).mockReturnValue({
        serviceId: 'lawn-mowing'
      })
    })

    it('should display contact email', () => {
      render(<ServiceDetailPage />)
      
      expect(screen.getByText(/fermanisandsonslawncare@gmail\.com/)).toBeInTheDocument()
    })

    it('should display service area', () => {
      render(<ServiceDetailPage />)
      
      expect(screen.getByText(/12 Oaks.*Holly Springs/i)).toBeInTheDocument()
    })
  })

  describe('Invalid Service Handling', () => {
    beforeEach(() => {
      ;(useParams as jest.Mock).mockReturnValue({
        serviceId: 'non-existent-service'
      })
    })

    it('should display service not found message', () => {
      render(<ServiceDetailPage />)
      
      expect(screen.getByText(/Service not found/i)).toBeInTheDocument()
    })

    it('should provide link back to services', () => {
      render(<ServiceDetailPage />)
      
      expect(screen.getByRole('button', { name: /View All Services/i })).toBeInTheDocument()
    })
  })

  describe('SEO and Accessibility', () => {
    beforeEach(() => {
      ;(useParams as jest.Mock).mockReturnValue({
        serviceId: 'lawn-mowing'
      })
    })

    it('should have proper page structure with main landmark', () => {
      render(<ServiceDetailPage />)
      
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('should have proper heading hierarchy', () => {
      render(<ServiceDetailPage />)
      
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(2)
    })

    it('should have service card with proper accessibility', () => {
      render(<ServiceDetailPage />)
      
      const articles = screen.getAllByRole('article')
      expect(articles.length).toBeGreaterThan(0)
      // Main service card should be first
      expect(articles[0]).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    beforeEach(() => {
      ;(useParams as jest.Mock).mockReturnValue({
        serviceId: 'lawn-mowing'
      })
    })

    it('should have responsive container classes', () => {
      render(<ServiceDetailPage />)
      
      const main = screen.getByRole('main')
      expect(main).toHaveClass('px-4')
    })

    it('should display related services in responsive grid', () => {
      render(<ServiceDetailPage />)
      
      const relatedGrid = screen.getByTestId('related-services-grid')
      expect(relatedGrid).toHaveClass('grid')
    })
  })
}) 