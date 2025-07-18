'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils/formatting'
import { useRouter } from 'next/navigation'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleGetQuote = () => {
    router.push('/quote')
  }

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200" role="banner">
      {/* Top contact bar */}
      <div className="bg-green-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>Family-operated lawn care serving 12 Oaks, Holly Springs</span>
            </div>
            <div className="flex items-center space-x-4 mt-1 sm:mt-0">
              <a
                href="tel:207-232-4106"
                className="hover:text-green-200 transition-colors"
              >
                📞 207-232-4106
              </a>
              <span className="text-green-200">|</span>
                              <span>Premium Professional Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and business name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/FermanisAndSonsLogo_transparent.png"
                alt="Fermanis & Sons Lawncare Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
                priority
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Fermanis & Sons Lawncare</h1>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav 
            className="hidden md:flex items-center space-x-8"
            data-testid="desktop-nav"
            role="navigation"
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-green-600 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA and mobile menu toggle */}
          <div className="flex items-center space-x-4">
            <Button
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={handleGetQuote}
            >
              Get Quote
            </Button>
            
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={cn(
                  "block w-5 h-0.5 bg-current transition-all duration-300",
                  isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
                )}></span>
                <span className={cn(
                  "block w-5 h-0.5 bg-current transition-all duration-300 mt-1",
                  isMobileMenuOpen ? "opacity-0" : ""
                )}></span>
                <span className={cn(
                  "block w-5 h-0.5 bg-current transition-all duration-300 mt-1",
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                )}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        <nav
          className={cn(
            "md:hidden border-t border-gray-200 bg-white",
            isMobileMenuOpen ? "block" : "hidden"
          )}
          data-testid="mobile-menu"
        >
          <div className="py-4 space-y-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-4 py-2">
              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handleGetQuote()
                }}
              >
                Get Quote
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
} 