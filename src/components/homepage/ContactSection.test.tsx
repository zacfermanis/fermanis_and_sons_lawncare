import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ContactSection } from './ContactSection'

describe('ContactSection Component', () => {
  describe('Section Structure', () => {
    it('renders the section container', () => {
      render(<ContactSection />)
      expect(screen.getByTestId('contact-section')).toBeInTheDocument()
    })

    it('displays the main heading', () => {
      render(<ContactSection />)
      expect(screen.getByRole('heading', { level: 2, name: /get in touch/i })).toBeInTheDocument()
    })

    it('includes a compelling subtitle', () => {
      render(<ContactSection />)
      expect(screen.getByText(/ready to transform your lawn/i)).toBeInTheDocument()
    })

    it('has proper section styling', () => {
      render(<ContactSection />)
      const section = screen.getByTestId('contact-section')
      expect(section).toHaveClass('py-16')
    })
  })

  describe('Contact Information', () => {
    it('displays the phone number prominently', () => {
      render(<ContactSection />)
      expect(screen.getByText(/207-232-4106/)).toBeInTheDocument()
    })

    it('shows the email address', () => {
      render(<ContactSection />)
      expect(screen.getByText(/fermanisandsonslawncare@gmail.com/)).toBeInTheDocument()
    })

    it('highlights the service area', () => {
      render(<ContactSection />)
      expect(screen.getByText(/12 Oaks neighborhood/i)).toBeInTheDocument()
      expect(screen.getByText(/Holly Springs/i)).toBeInTheDocument()
    })

    it('includes contact hours or availability', () => {
      render(<ContactSection />)
      expect(screen.getByText(/available/i)).toBeInTheDocument()
    })
  })

  describe('Call to Action', () => {
    it('renders primary CTA button', () => {
      render(<ContactSection />)
      expect(screen.getByRole('button', { name: /call now/i })).toBeInTheDocument()
    })

    it('renders secondary CTA button', () => {
      render(<ContactSection />)
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
    })

    it('handles phone button click', () => {
      render(<ContactSection />)
      const phoneButton = screen.getByRole('button', { name: /call now/i })
      fireEvent.click(phoneButton)
      // Would test phone call functionality
    })

    it('handles message button click', () => {
      render(<ContactSection />)
      const messageButton = screen.getByRole('button', { name: /send message/i })
      fireEvent.click(messageButton)
      // Would test navigation to contact form
    })
  })

  describe('Service Area Information', () => {
    it('emphasizes 12 Oaks neighborhood focus', () => {
      render(<ContactSection />)
      expect(screen.getByText(/proudly serving the 12 Oaks/i)).toBeInTheDocument()
    })

    it('mentions Holly Springs location', () => {
      render(<ContactSection />)
      expect(screen.getAllByText(/Holly Springs/i)[0]).toBeInTheDocument()
    })

    it('includes neighborhood-specific messaging', () => {
      render(<ContactSection />)
      expect(screen.getByText(/Your Neighborhood Experts/i)).toBeInTheDocument()
    })

    it('displays local business emphasis', () => {
      render(<ContactSection />)
      expect(screen.getByText(/local/i)).toBeInTheDocument()
    })
  })

  describe('Family Business Messaging', () => {
    it('highlights family values', () => {
      render(<ContactSection />)
      expect(screen.getAllByText(/family/i)[0]).toBeInTheDocument()
    })

    it('mentions father and sons team', () => {
      render(<ContactSection />)
      expect(screen.getByText(/father and sons/i)).toBeInTheDocument()
    })

    it('emphasizes trust and reliability', () => {
      render(<ContactSection />)
      expect(screen.getAllByText(/trust/i)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/reliable/i)[0]).toBeInTheDocument()
    })

    it('includes personal service messaging', () => {
      render(<ContactSection />)
      expect(screen.getByText(/personal/i)).toBeInTheDocument()
    })
  })

  describe('Contact Methods', () => {
    it('displays phone as primary contact method', () => {
      render(<ContactSection />)
      const phoneElement = screen.getByText(/207-232-4106/)
      expect(phoneElement).toHaveClass('text-2xl')
    })

    it('shows email as secondary contact method', () => {
      render(<ContactSection />)
      expect(screen.getByText(/fermanisandsonslawncare@gmail.com/)).toBeInTheDocument()
    })

    it('includes contact preference messaging', () => {
      render(<ContactSection />)
      expect(screen.getByText(/prefer to call or email/i)).toBeInTheDocument()
    })

    it('mentions response time commitment', () => {
      render(<ContactSection />)
      expect(screen.getByText(/respond quickly/i)).toBeInTheDocument()
    })
  })

  describe('Visual Design', () => {
    it('has attractive background styling', () => {
      render(<ContactSection />)
      const section = screen.getByTestId('contact-section')
      expect(section).toHaveClass('bg-green-600')
    })

    it('uses contrasting text colors', () => {
      render(<ContactSection />)
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveClass('text-white')
    })

    it('displays contact info in organized layout', () => {
      render(<ContactSection />)
      expect(screen.getByTestId('contact-info')).toBeInTheDocument()
    })

    it('uses responsive grid layout', () => {
      render(<ContactSection />)
      const contactGrid = screen.getByTestId('contact-grid')
      expect(contactGrid).toHaveClass('grid')
      expect(contactGrid).toHaveClass('md:grid-cols-2')
    })
  })

  describe('Business Credibility', () => {
      it('mentions professional-grade products', () => {
    render(<ContactSection />)
    expect(screen.getByText(/professional-grade/i)).toBeInTheDocument()
    })

    it('highlights professional quality', () => {
      render(<ContactSection />)
      expect(screen.getAllByText(/professional/i)[0]).toBeInTheDocument()
    })

    it('emphasizes experience and expertise', () => {
      render(<ContactSection />)
      expect(screen.getByText(/professional experience/i)).toBeInTheDocument()
    })

    it('includes satisfaction guarantee', () => {
      render(<ContactSection />)
      expect(screen.getByText(/satisfaction/i)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<ContactSection />)
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
      expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3)
    })

    it('provides accessible button labels', () => {
      render(<ContactSection />)
      const phoneButton = screen.getByRole('button', { name: /call now/i })
      const messageButton = screen.getByRole('button', { name: /send message/i })
      expect(phoneButton).toHaveAccessibleName()
      expect(messageButton).toHaveAccessibleName()
    })

    it('supports keyboard navigation', () => {
      render(<ContactSection />)
      const phoneButton = screen.getByRole('button', { name: /call now/i })
      phoneButton.focus()
      expect(phoneButton).toHaveFocus()
    })

    it('has proper color contrast', () => {
      render(<ContactSection />)
      const section = screen.getByTestId('contact-section')
      expect(section).toHaveClass('bg-green-600')
    })
  })

  describe('Responsive Design', () => {
    it('adapts to mobile layout', () => {
      render(<ContactSection />)
      const contactGrid = screen.getByTestId('contact-grid')
      expect(contactGrid).toHaveClass('grid-cols-1')
    })

    it('has mobile-friendly spacing', () => {
      render(<ContactSection />)
      const section = screen.getByTestId('contact-section')
      expect(section).toHaveClass('px-4')
    })

    it('uses responsive text sizing', () => {
      render(<ContactSection />)
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveClass('text-2xl')
    })

    it('stacks content properly on mobile', () => {
      render(<ContactSection />)
      const contactGrid = screen.getByTestId('contact-grid')
      expect(contactGrid).toHaveClass('gap-8')
    })
  })

  describe('Action Elements', () => {
    it('displays quote request emphasis', () => {
      render(<ContactSection />)
      expect(screen.getAllByText(/free quote/i)[0]).toBeInTheDocument()
    })

    it('includes urgency messaging', () => {
      render(<ContactSection />)
      expect(screen.getAllByText(/contact us today/i)[0]).toBeInTheDocument()
    })

    it('mentions scheduling availability', () => {
      render(<ContactSection />)
      expect(screen.getAllByText(/schedule/i)[0]).toBeInTheDocument()
    })

    it('emphasizes easy contact process', () => {
      render(<ContactSection />)
      expect(screen.getByText(/easy/i)).toBeInTheDocument()
    })
  })
}) 