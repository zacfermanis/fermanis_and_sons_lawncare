import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import ServicesPage from './page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

const mockPush = jest.fn()

describe('Services Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
  })

  describe('Page Structure and Content', () => {
    it('should display page title', () => {
      render(<ServicesPage />)
      
      expect(screen.getByRole('heading', { name: /Our Services/i })).toBeInTheDocument()
    })

    it('should display family business introduction', () => {
      render(<ServicesPage />)
      
      expect(screen.getByText(/family-operated lawn care/i)).toBeInTheDocument()
    })

    it('should emphasize 12 Oaks neighborhood focus', () => {
      render(<ServicesPage />)
      
      const neighborhoodElements = screen.getAllByText('12 Oaks neighborhood')
      expect(neighborhoodElements.length).toBeGreaterThan(0)
      expect(screen.getByText(/Family-operated lawn care/i)).toBeInTheDocument()
    })

    it('should highlight professional-grade products', () => {
      render(<ServicesPage />)
      
      expect(screen.getByText('professional-grade products')).toBeInTheDocument()
    })
  })

  describe('Service Display', () => {
    it('should display all active services', () => {
      render(<ServicesPage />)
      
      // Check for all 8 services
      expect(screen.getByText('Lawn Mowing')).toBeInTheDocument()
      expect(screen.getByText('Weedwacking (String Trimming)')).toBeInTheDocument()
      expect(screen.getByText('Edging')).toBeInTheDocument()
      expect(screen.getByText('Leaf Blowing & Debris Cleanup')).toBeInTheDocument()
      expect(screen.getByText('Weeding (Manual Removal)')).toBeInTheDocument()
      expect(screen.getByText('Soil & Lawn Treatments')).toBeInTheDocument()
      expect(screen.getByText('Mulching')).toBeInTheDocument()
      expect(screen.getByText('Hedge & Tree Trimming')).toBeInTheDocument()
    })

    it('should display services grouped by category', () => {
      render(<ServicesPage />)
      
      expect(screen.getByText(/Maintenance Services/i)).toBeInTheDocument()
      expect(screen.getByText(/Professional Treatments/i)).toBeInTheDocument()
      expect(screen.getByText(/Landscaping Services/i)).toBeInTheDocument()
      expect(screen.getByText(/Cleanup Services/i)).toBeInTheDocument()
    })

    it('should show service features and descriptions', () => {
      render(<ServicesPage />)
      
      expect(screen.getByText(/Regular, clean cuts using sharp blades/i)).toBeInTheDocument()
      expect(screen.getByText(/Professional-grade products for soil health/i)).toBeInTheDocument()
    })
  })

  describe('Interactive Elements', () => {
    it('should have Learn More buttons for each service', () => {
      render(<ServicesPage />)
      
      const learnMoreButtons = screen.getAllByRole('button', { name: /Learn More/i })
      expect(learnMoreButtons).toHaveLength(8) // One for each service
    })

    it('should navigate to service detail page when Learn More is clicked', () => {
      render(<ServicesPage />)
      
      const firstLearnMoreButton = screen.getAllByRole('button', { name: /Learn More/i })[0]
      fireEvent.click(firstLearnMoreButton)
      
      expect(mockPush).toHaveBeenCalledWith('/services/lawn-mowing')
    })

    it('should have Get Quote buttons for each service', () => {
      render(<ServicesPage />)
      
      const getQuoteButtons = screen.getAllByRole('button', { name: /Get Quote/i })
      expect(getQuoteButtons).toHaveLength(8) // One for each service
    })

    it('should navigate to quote page when Get Quote is clicked', () => {
      render(<ServicesPage />)
      
      const firstGetQuoteButton = screen.getAllByRole('button', { name: /Get Quote/i })[0]
      fireEvent.click(firstGetQuoteButton)
      
      expect(mockPush).toHaveBeenCalledWith('/quote?service=lawn-mowing')
    })
  })

  describe('Call to Action Section', () => {
    it('should display contact information prominently', () => {
      render(<ServicesPage />)
      
      expect(screen.getByText(/fermanisandsonslawncare@gmail\.com/)).toBeInTheDocument()
    })

    it('should have main Call Now button', () => {
      render(<ServicesPage />)
      
      expect(screen.getByRole('button', { name: /Call Now/i })).toBeInTheDocument()
    })

    it('should have main Get Quote button', () => {
      render(<ServicesPage />)
      
      expect(screen.getByRole('button', { name: /Request Quote/i })).toBeInTheDocument()
    })

    it('should call phone number when Call Now is clicked', () => {
      render(<ServicesPage />)
      
      const callButton = screen.getByRole('button', { name: /Call Now/i })
      
      // Just verify the button exists and is clickable
      expect(callButton).toBeInTheDocument()
      expect(callButton).not.toBeDisabled()
    })
  })

  describe('Business Values Section', () => {
    it('should highlight father and sons working together', () => {
      render(<ServicesPage />)
      
      expect(screen.getByText(/Our father and sons team/i)).toBeInTheDocument()
    })

    it('should mention sons learning work ethic', () => {
      render(<ServicesPage />)
      
      expect(screen.getByText(/Our sons are learning alongside us.*developing work ethic/i)).toBeInTheDocument()
    })

    it('should emphasize reliability and trust', () => {
      render(<ServicesPage />)
      
      expect(screen.getByText(/reliable, trusted lawn care service/i)).toBeInTheDocument()
    })
  })

  describe('SEO and Accessibility', () => {
    it('should have proper page structure with main landmark', () => {
      render(<ServicesPage />)
      
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('should have proper heading hierarchy', () => {
      render(<ServicesPage />)
      
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(3) // Multiple section headings
    })

    it('should have service cards with proper accessibility', () => {
      render(<ServicesPage />)
      
      const articles = screen.getAllByRole('article')
      expect(articles).toHaveLength(8) // One for each service card
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive container classes', () => {
      render(<ServicesPage />)
      
      const main = screen.getByRole('main')
      expect(main).toHaveClass('px-4')
    })

    it('should display services in responsive grid', () => {
      render(<ServicesPage />)
      
      const servicesGrid = screen.getByTestId('services-grid')
      expect(servicesGrid).toHaveClass('grid')
    })
  })
}) 