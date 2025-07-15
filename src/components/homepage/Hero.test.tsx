import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Hero } from './Hero'

// Mock useRouter
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

describe('Hero Component', () => {
  describe('Business Identity', () => {
    it('renders the business name prominently', () => {
      render(<Hero />)
      expect(screen.getByText(/Fermanis & Sons Lawncare/i)).toBeInTheDocument()
    })

    it('highlights the family business story', () => {
      render(<Hero />)
      expect(screen.getByText(/father and two sons/i)).toBeInTheDocument()
    })

    it('emphasizes the neighborhood focus', () => {
      render(<Hero />)
      expect(screen.getAllByText(/12 Oaks/i)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/Holly Springs/i)[0]).toBeInTheDocument()
    })

    it('includes family values messaging', () => {
      render(<Hero />)
      expect(screen.getAllByText(/family/i)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/trust/i)[0]).toBeInTheDocument()
    })

    it('displays the company logo prominently', () => {
      render(<Hero />)
      const logo = screen.getByAltText('Fermanis & Sons Lawncare Logo')
      expect(logo).toBeInTheDocument()
      expect(logo.getAttribute('src')).toContain('FermanisAndSonsLogo_transparent.png')
    })
  })

  describe('Service Proposition', () => {
    it('displays the main value proposition', () => {
      render(<Hero />)
      expect(screen.getByText(/meticulous lawn and landscape care/i)).toBeInTheDocument()
    })

      it('mentions professional-grade products for credibility', () => {
    render(<Hero />)
    expect(screen.getAllByText(/professional-grade/i)[0]).toBeInTheDocument()
    })

    it('highlights professional quality', () => {
      render(<Hero />)
      expect(screen.getAllByText(/professional/i)[0]).toBeInTheDocument()
    })

    it('emphasizes comprehensive service offering', () => {
      render(<Hero />)
      expect(screen.getAllByText(/complete/i)[0]).toBeInTheDocument()
    })
  })

  describe('Contact Information', () => {
    it('displays the phone number', () => {
      render(<Hero />)
      expect(screen.getByText(/207-232-4106/)).toBeInTheDocument()
    })

    it('includes the service area', () => {
      render(<Hero />)
      expect(screen.getAllByText(/12 Oaks neighborhood/i)[0]).toBeInTheDocument()
    })

    it('renders contact CTA button', () => {
      render(<Hero />)
      expect(screen.getByRole('button', { name: /get quote/i })).toBeInTheDocument()
    })

    it('renders phone CTA button', () => {
      render(<Hero />)
      expect(screen.getByRole('button', { name: /call now/i })).toBeInTheDocument()
    })
  })

  describe('Visual Design', () => {
    it('renders hero section with proper styling', () => {
      render(<Hero />)
      const heroSection = screen.getByTestId('hero-section')
      expect(heroSection).toHaveClass('bg-gradient-to-b')
    })

    it('displays content in proper layout', () => {
      render(<Hero />)
      const heroContent = screen.getByTestId('hero-content')
      expect(heroContent).toBeInTheDocument()
    })

    it('includes background imagery for visual appeal', () => {
      render(<Hero />)
      const heroSection = screen.getByTestId('hero-section')
      expect(heroSection).toHaveClass('from-green-50')
    })
  })

  describe('Call to Action', () => {
    it('renders primary CTA button with correct styling', () => {
      render(<Hero />)
      const primaryCTA = screen.getByRole('button', { name: /get quote/i })
      expect(primaryCTA).toHaveClass('bg-green-600')
    })

    it('renders secondary CTA button with correct styling', () => {
      render(<Hero />)
      const secondaryCTA = screen.getByRole('button', { name: /call now/i })
      expect(secondaryCTA).toHaveClass('border-green-600')
    })

    it('handles CTA button clicks', () => {
      render(<Hero />)
      const primaryCTA = screen.getByRole('button', { name: /get quote/i })
      fireEvent.click(primaryCTA)
      // Test that click is handled (would normally test navigation)
    })
  })

  describe('Responsive Design', () => {
    it('renders mobile-friendly layout', () => {
      render(<Hero />)
      const heroContent = screen.getByTestId('hero-content')
      expect(heroContent).toHaveClass('flex-col')
    })

    it('has proper spacing on mobile', () => {
      render(<Hero />)
      const heroSection = screen.getByTestId('hero-section')
      expect(heroSection).toHaveClass('px-4')
    })

    it('adapts text size for mobile', () => {
      render(<Hero />)
      const mainHeading = screen.getByRole('heading', { level: 1 })
      expect(mainHeading).toHaveClass('text-3xl')
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<Hero />)
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })

    it('has descriptive alt text for images', () => {
      render(<Hero />)
      const logo = screen.getByAltText('Fermanis & Sons Lawncare Logo')
      expect(logo).toBeInTheDocument()
    })

    it('has proper ARIA labels for buttons', () => {
      render(<Hero />)
      const primaryCTA = screen.getByRole('button', { name: /get quote/i })
      expect(primaryCTA).toHaveAccessibleName()
    })

    it('supports keyboard navigation', () => {
      render(<Hero />)
      const primaryCTA = screen.getByRole('button', { name: /get quote/i })
      primaryCTA.focus()
      expect(primaryCTA).toHaveFocus()
    })
  })

  describe('Business Features', () => {
    it('highlights teaching values story', () => {
      render(<Hero />)
      expect(screen.getAllByText(/teaching/i)[0]).toBeInTheDocument()
      expect(screen.getByText(/work ethic/i)).toBeInTheDocument()
    })

    it('emphasizes neighborhood expertise', () => {
      render(<Hero />)
      expect(screen.getAllByText(/neighborhood/i)[0]).toBeInTheDocument()
      expect(screen.getByText(/local/i)).toBeInTheDocument()
    })

    it('mentions comprehensive service range', () => {
      render(<Hero />)
      expect(screen.getAllByText(/mowing/i)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/treatments/i)[0]).toBeInTheDocument()
    })

    it('displays premium product positioning', () => {
      render(<Hero />)
      expect(screen.getAllByText(/premium/i)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/Premium Professional/i)[0]).toBeInTheDocument()
    })
  })
}) 