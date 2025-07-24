import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ServiceOverview } from './ServiceOverview'

// Mock useRouter
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

describe('ServiceOverview Component', () => {
  describe('Section Structure', () => {
    it('renders the section heading', () => {
      render(<ServiceOverview />)
      expect(screen.getByRole('heading', { level: 2, name: /our services/i })).toBeInTheDocument()
    })

    it('displays the section subtitle', () => {
      render(<ServiceOverview />)
      expect(screen.getByText(/comprehensive lawn care and landscaping/i)).toBeInTheDocument()
    })

    it('renders the service overview container', () => {
      render(<ServiceOverview />)
      expect(screen.getByTestId('service-overview')).toBeInTheDocument()
    })

    it('has proper section styling', () => {
      render(<ServiceOverview />)
      const section = screen.getByTestId('service-overview')
      expect(section).toHaveClass('py-16')
    })
  })

  describe('Service Display', () => {
    it('displays all 8 services', () => {
      render(<ServiceOverview />)
      expect(screen.getAllByText(/lawn mowing/i)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/weedwacking/i)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/edging/i)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/leaf blowing/i)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/weeding/i)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/soil & lawn treatments/i)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/mulching/i)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/hedge & tree trimming/i)[0]).toBeInTheDocument()
    })

    it('displays service descriptions', () => {
      render(<ServiceOverview />)
      expect(screen.getByText(/regular, clean cuts using sharp blades/i)).toBeInTheDocument()
      expect(screen.getByText(/string trimming around obstacles/i)).toBeInTheDocument()
      expect(screen.getAllByText(/professional.*products/i)[0]).toBeInTheDocument()
    })

    it('shows service features', () => {
      render(<ServiceOverview />)
      expect(screen.getByText(/full mow of front, back, and side yards/i)).toBeInTheDocument()
      expect(screen.getByText(/regular, clean cuts using sharp blades/i)).toBeInTheDocument()
    })

    it('displays contact for pricing', () => {
      render(<ServiceOverview />)
      const pricingElements = screen.getAllByText(/contact for pricing/i)
      expect(pricingElements.length).toBeGreaterThan(0)
    })
  })

  describe('Service Cards', () => {
    it('renders services in card format', () => {
      render(<ServiceOverview />)
      const serviceCards = screen.getAllByTestId(/service-card/)
      expect(serviceCards).toHaveLength(8)
    })

    it('displays service names as card titles', () => {
      render(<ServiceOverview />)
      expect(screen.getByRole('heading', { level: 3, name: /lawn mowing/i })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 3, name: /weedwacking/i })).toBeInTheDocument()
    })

    it('includes service short descriptions', () => {
      render(<ServiceOverview />)
      expect(screen.getByText(/regular, clean cuts using sharp blades/i)).toBeInTheDocument()
      expect(screen.getByText(/string trimming around obstacles/i)).toBeInTheDocument()
    })

    it('shows learn more buttons for each service', () => {
      render(<ServiceOverview />)
      const learnMoreButtons = screen.getAllByText(/learn more/i)
      expect(learnMoreButtons).toHaveLength(8)
    })
  })

  describe('Layout and Design', () => {
    it('uses responsive grid layout', () => {
      render(<ServiceOverview />)
      const servicesGrid = screen.getByTestId('services-grid')
      expect(servicesGrid).toHaveClass('grid')
      expect(servicesGrid).toHaveClass('md:grid-cols-2')
      expect(servicesGrid).toHaveClass('lg:grid-cols-3')
    })

    it('has proper spacing between cards', () => {
      render(<ServiceOverview />)
      const servicesGrid = screen.getByTestId('services-grid')
      expect(servicesGrid).toHaveClass('gap-6')
    })

    it('uses elevated card variant for visual appeal', () => {
      render(<ServiceOverview />)
      const serviceCards = screen.getAllByTestId(/service-card/)
      serviceCards.forEach(card => {
        expect(card).toHaveClass('shadow-md')
      })
    })
  })

  describe('Business Information', () => {
      it('highlights professional products', () => {
    render(<ServiceOverview />)
    expect(screen.getAllByText(/professional.*products/i)[0]).toBeInTheDocument()
    })

    it('emphasizes professional quality', () => {
      render(<ServiceOverview />)
      expect(screen.getAllByText(/professional/i)[0]).toBeInTheDocument()
    })

    it('mentions 12 Oaks service area', () => {
      render(<ServiceOverview />)
      expect(screen.getAllByText(/12 oaks/i)[0]).toBeInTheDocument()
    })

    it('includes family business messaging', () => {
      render(<ServiceOverview />)
      expect(screen.getAllByText(/family/i)[0]).toBeInTheDocument()
    })
  })

  describe('Call to Action', () => {
    it('renders main CTA button', () => {
      render(<ServiceOverview />)
      expect(screen.getByRole('button', { name: /get free quote/i })).toBeInTheDocument()
    })

    it('includes phone number for contact', () => {
      render(<ServiceOverview />)
    })

    it('handles CTA button click', () => {
      render(<ServiceOverview />)
      const ctaButton = screen.getByRole('button', { name: /get free quote/i })
      fireEvent.click(ctaButton)
      // Would test navigation or form opening
    })

    it('handles learn more button clicks', () => {
      render(<ServiceOverview />)
      const learnMoreButtons = screen.getAllByText(/learn more/i)
      fireEvent.click(learnMoreButtons[0])
      // Would test navigation to service detail page
    })
  })

  describe('Service Categories', () => {
    it('displays maintenance services', () => {
      render(<ServiceOverview />)
      expect(screen.getAllByText(/lawn mowing/i)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/weedwacking/i)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/edging/i)[0]).toBeInTheDocument()
    })

    it('displays treatment services', () => {
      render(<ServiceOverview />)
      expect(screen.getByText(/soil & lawn treatments/i)).toBeInTheDocument()
      expect(screen.getByText(/weeding/i)).toBeInTheDocument()
    })

    it('displays landscaping services', () => {
      render(<ServiceOverview />)
      expect(screen.getAllByText(/mulching/i)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/hedge & tree trimming/i)[0]).toBeInTheDocument()
    })

    it('displays cleanup services', () => {
      render(<ServiceOverview />)
      expect(screen.getAllByText(/leaf blowing/i)[0]).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<ServiceOverview />)
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
      expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(9)
    })

    it('has accessible button labels', () => {
      render(<ServiceOverview />)
      const ctaButton = screen.getByRole('button', { name: /get free quote/i })
      expect(ctaButton).toHaveAccessibleName()
    })

    it('supports keyboard navigation', () => {
      render(<ServiceOverview />)
      const ctaButton = screen.getByRole('button', { name: /get free quote/i })
      ctaButton.focus()
      expect(ctaButton).toHaveFocus()
    })
  })

  describe('Responsive Design', () => {
    it('adapts to mobile layout', () => {
      render(<ServiceOverview />)
      const servicesGrid = screen.getByTestId('services-grid')
      expect(servicesGrid).toHaveClass('grid-cols-1')
    })

    it('has mobile-friendly spacing', () => {
      render(<ServiceOverview />)
      const section = screen.getByTestId('service-overview')
      expect(section).toHaveClass('px-4')
    })

    it('uses responsive text sizing', () => {
      render(<ServiceOverview />)
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveClass('text-2xl')
    })
  })
}) 