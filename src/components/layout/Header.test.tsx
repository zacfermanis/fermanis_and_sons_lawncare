import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Header } from './Header'

// Mock useRouter
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

describe('Header Component', () => {
  describe('Business Branding', () => {
    it('should display business name', () => {
      render(<Header />)
      const businessName = screen.getByText('Fermanis & Sons Lawncare')
      expect(businessName).toBeInTheDocument()
    })

    it('should display service area', () => {
      render(<Header />)
      const serviceArea = screen.getByText(/12 Oaks/i)
      expect(serviceArea).toBeInTheDocument()
    })
  })

  describe('Navigation', () => {
    it('should display main navigation links', () => {
      render(<Header />)
      const desktopNav = screen.getByTestId('desktop-nav')
      
      expect(desktopNav).toHaveTextContent('Home')
      expect(desktopNav).toHaveTextContent('Services')
      expect(desktopNav).toHaveTextContent('About')
      expect(desktopNav).toHaveTextContent('Contact')
    })

    it('should display quote button', () => {
      render(<Header />)
      const quoteButtons = screen.getAllByRole('button', { name: /get quote/i })
      expect(quoteButtons).toHaveLength(2) // Desktop and mobile
    })

    it('should have navigation links with proper hrefs', () => {
      render(<Header />)
      const desktopNav = screen.getByTestId('desktop-nav')
      
      const homeLink = desktopNav.querySelector('a[href="/"]')
      const servicesLink = desktopNav.querySelector('a[href="/services"]')
      const aboutLink = desktopNav.querySelector('a[href="/about"]')
      const contactLink = desktopNav.querySelector('a[href="/contact"]')
      
      expect(homeLink).toBeInTheDocument()
      expect(servicesLink).toBeInTheDocument()
      expect(aboutLink).toBeInTheDocument()
      expect(contactLink).toBeInTheDocument()
    })
  })

  describe('Mobile Navigation', () => {
    it('should display mobile menu toggle button', () => {
      render(<Header />)
      const mobileToggle = screen.getByRole('button', { name: /toggle menu/i })
      expect(mobileToggle).toBeInTheDocument()
    })

    it('should hide mobile menu by default', () => {
      render(<Header />)
      const mobileMenu = screen.getByTestId('mobile-menu')
      expect(mobileMenu).toHaveClass('hidden')
    })

    it('should show mobile menu when toggle is clicked', () => {
      render(<Header />)
      const mobileToggle = screen.getByRole('button', { name: /toggle menu/i })
      
      fireEvent.click(mobileToggle)
      
      const mobileMenu = screen.getByTestId('mobile-menu')
      expect(mobileMenu).toHaveClass('block')
    })

    it('should close mobile menu when clicked again', () => {
      render(<Header />)
      const mobileToggle = screen.getByRole('button', { name: /toggle menu/i })
      
      // Open menu
      fireEvent.click(mobileToggle)
      expect(screen.getByTestId('mobile-menu')).toHaveClass('block')
      
      // Close menu
      fireEvent.click(mobileToggle)
      expect(screen.getByTestId('mobile-menu')).toHaveClass('hidden')
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive container classes', () => {
      render(<Header />)
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('w-full')
    })

    it('should hide desktop nav on mobile', () => {
      render(<Header />)
      const desktopNav = screen.getByTestId('desktop-nav')
      expect(desktopNav).toHaveClass('hidden', 'md:flex')
    })

    it('should show mobile toggle only on mobile', () => {
      render(<Header />)
      const mobileToggle = screen.getByRole('button', { name: /toggle menu/i })
      expect(mobileToggle).toHaveClass('md:hidden')
    })
  })

  describe('Contact Information', () => {
    it('should display contact info in header', () => {
      render(<Header />)
      const contactInfo = screen.getByText(/serving 12 oaks/i)
      expect(contactInfo).toBeInTheDocument()
    })

    it('should emphasize family business', () => {
      render(<Header />)
      const familyBusiness = screen.getByText(/family-operated/i)
      expect(familyBusiness).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper header landmark', () => {
      render(<Header />)
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })

    it('should have proper navigation landmark', () => {
      render(<Header />)
      const navs = screen.getAllByRole('navigation')
      expect(navs).toHaveLength(2) // Desktop and mobile
    })

    it('should have accessible mobile menu button', () => {
      render(<Header />)
      const mobileToggle = screen.getByRole('button', { name: /toggle menu/i })
      expect(mobileToggle).toHaveAttribute('aria-expanded', 'false')
    })

    it('should update aria-expanded when menu is opened', () => {
      render(<Header />)
      const mobileToggle = screen.getByRole('button', { name: /toggle menu/i })
      
      fireEvent.click(mobileToggle)
      
      expect(mobileToggle).toHaveAttribute('aria-expanded', 'true')
    })
  })

  describe('Business Identity', () => {
      it('should emphasize premium professional products', () => {
    render(<Header />)
    const premiumProducts = screen.getByText(/premium professional products/i)
    expect(premiumProducts).toBeInTheDocument()
    })

    it('should highlight family story', () => {
      render(<Header />)
      const familyStory = screen.getByText(/father.*sons/i)
      expect(familyStory).toBeInTheDocument()
    })
  })
}) 