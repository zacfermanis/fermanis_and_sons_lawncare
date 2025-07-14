import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

describe('Footer Component', () => {
  describe('Business Information', () => {
    it('should display business name', () => {
      render(<Footer />)
      const businessName = screen.getByText('Fermanis & Sons Lawncare')
      expect(businessName).toBeInTheDocument()
    })

    it('should display family business tagline', () => {
      render(<Footer />)
      const tagline = screen.getByText(/family-operated lawn care/i)
      expect(tagline).toBeInTheDocument()
    })

    it('should display service area', () => {
      render(<Footer />)
      const serviceArea = screen.getByText(/12 Oaks.*Holly Springs/i)
      expect(serviceArea).toBeInTheDocument()
    })

      it('should emphasize professional products', () => {
    render(<Footer />)
    const professionalProducts = screen.getAllByText(/professional.*products/i)
    expect(professionalProducts).toHaveLength(2) // Main section and bottom section
    })
  })

  describe('Contact Information', () => {
    it('should display phone number', () => {
      render(<Footer />)
      const phoneNumber = screen.getByText(/207-232-4106/)
      expect(phoneNumber).toBeInTheDocument()
    })

    it('should display email address', () => {
      render(<Footer />)
      const email = screen.getByText(/fermanisandsonslawncare@gmail\.com/)
      expect(email).toBeInTheDocument()
    })

    it('should have clickable phone link', () => {
      render(<Footer />)
      const phoneLink = screen.getByRole('link', { name: /207-232-4106/ })
      expect(phoneLink).toHaveAttribute('href', 'tel:207-232-4106')
    })

    it('should have clickable email link', () => {
      render(<Footer />)
      const emailLink = screen.getByRole('link', { name: /fermanisandsonslawncare@gmail\.com/ })
      expect(emailLink).toHaveAttribute('href', 'mailto:fermanisandsonslawncare@gmail.com')
    })
  })

  describe('Navigation Links', () => {
    it('should display footer navigation links', () => {
      render(<Footer />)
      
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Services')).toBeInTheDocument()
      expect(screen.getByText('About')).toBeInTheDocument()
      expect(screen.getByText('Contact')).toBeInTheDocument()
    })

    it('should have proper href attributes', () => {
      render(<Footer />)
      
      expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
      expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services')
      expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
      expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
    })
  })

  describe('Service Categories', () => {
    it('should display service categories', () => {
      render(<Footer />)
      
      expect(screen.getByText('Lawn Maintenance')).toBeInTheDocument()
      expect(screen.getByText('Soil Treatments')).toBeInTheDocument()
      expect(screen.getByText('Landscaping')).toBeInTheDocument()
      expect(screen.getByText('Cleanup Services')).toBeInTheDocument()
    })

    it('should display key services', () => {
      render(<Footer />)
      
      expect(screen.getByText('Lawn Mowing')).toBeInTheDocument()
      expect(screen.getByText('Soil & Lawn Treatments')).toBeInTheDocument()
      expect(screen.getByText('Mulching')).toBeInTheDocument()
      expect(screen.getByText('Hedge & Tree Trimming')).toBeInTheDocument()
    })
  })

  describe('Family Business Story', () => {
    it('should highlight father and sons working together', () => {
      render(<Footer />)
      const familyStory = screen.getByText(/father.*sons/i)
      expect(familyStory).toBeInTheDocument()
    })

    it('should mention sons age and learning', () => {
      render(<Footer />)
      const sonsAge = screen.getByText(/13.*learning/i)
      expect(sonsAge).toBeInTheDocument()
    })

    it('should emphasize work ethic and pride', () => {
      render(<Footer />)
      const workEthic = screen.getByText(/work ethic.*pride/i)
      expect(workEthic).toBeInTheDocument()
    })
  })

  describe('Business Hours and Availability', () => {
    it('should display availability information', () => {
      render(<Footer />)
      const availability = screen.getByText(/after-school.*weekend/i)
      expect(availability).toBeInTheDocument()
    })

    it('should display quote request information', () => {
      render(<Footer />)
      const quoteInfo = screen.getByText(/quote.*estimate/i)
      expect(quoteInfo).toBeInTheDocument()
    })
  })

  describe('Legal and Copyright', () => {
    it('should display copyright notice', () => {
      render(<Footer />)
      const currentYear = new Date().getFullYear()
      const copyright = screen.getByText(new RegExp(`${currentYear}.*Fermanis & Sons Lawncare`))
      expect(copyright).toBeInTheDocument()
    })

    it('should display rights reserved', () => {
      render(<Footer />)
      const rights = screen.getByText(/all rights reserved/i)
      expect(rights).toBeInTheDocument()
    })
  })

  describe('Structure and Layout', () => {
    it('should have proper footer landmark', () => {
      render(<Footer />)
      const footer = screen.getByRole('contentinfo')
      expect(footer).toBeInTheDocument()
    })

    it('should have responsive container', () => {
      render(<Footer />)
      const footer = screen.getByRole('contentinfo')
      expect(footer).toHaveClass('w-full')
    })

    it('should have proper background styling', () => {
      render(<Footer />)
      const footer = screen.getByRole('contentinfo')
      expect(footer).toHaveClass('bg-gray-900')
    })
  })

  describe('Accessibility', () => {
    it('should have proper landmark role', () => {
      render(<Footer />)
      const footer = screen.getByRole('contentinfo')
      expect(footer).toBeInTheDocument()
    })

    it('should have proper heading hierarchy', () => {
      render(<Footer />)
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
    })

    it('should have accessible contact links', () => {
      render(<Footer />)
      const phoneLink = screen.getByRole('link', { name: /207-232-4106/ })
      const emailLink = screen.getByRole('link', { name: /fermanisandsonslawncare@gmail\.com/ })
      
      expect(phoneLink).toBeInTheDocument()
      expect(emailLink).toBeInTheDocument()
    })
  })
}) 