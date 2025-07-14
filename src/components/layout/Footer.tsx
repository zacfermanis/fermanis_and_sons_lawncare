import React from 'react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]

  const serviceCategories = [
    { name: 'Lawn Maintenance', services: ['Lawn Mowing', 'Weedwacking', 'Edging'] },
    { name: 'Soil Treatments', services: ['Soil & Lawn Treatments', 'Weeding'] },
    { name: 'Landscaping', services: ['Mulching', 'Hedge & Tree Trimming'] },
    { name: 'Cleanup Services', services: ['Leaf Blowing & Debris Cleanup'] }
  ]

  return (
    <footer className="w-full bg-gray-900 text-white" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Business Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-400">Fermanis & Sons Lawncare</h3>
            <p className="text-gray-300">Family-operated lawn care serving 12 Oaks, Holly Springs</p>
            <p className="text-gray-300">
                                Professional-grade products for soil health and lawn nutrition
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Contact Us:</p>
              <div className="space-y-1">
                <a 
                  href="tel:207-232-4106" 
                  className="block text-green-400 hover:text-green-300 transition-colors"
                >
                  📞 207-232-4106
                </a>
                <a 
                  href="mailto:fermanisandsonslawncare@gmail.com" 
                  className="block text-green-400 hover:text-green-300 transition-colors break-all"
                >
                  ✉️ fermanisandsonslawncare@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-green-400">Quick Links</h4>
            <nav className="space-y-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-300 hover:text-green-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-green-400">Our Services</h4>
            <div className="space-y-3">
              {serviceCategories.map((category) => (
                <div key={category.name}>
                  <h5 className="font-medium text-gray-200">{category.name}</h5>
                  <ul className="mt-1 space-y-1">
                    {category.services.map((service) => (
                      <li key={service} className="text-sm text-gray-400">
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Family Business Story */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-green-400">Our Family</h4>
            <div className="space-y-3 text-gray-300">
              <p className="text-sm">
                Father and sons working together to provide reliable, quality lawn care
              </p>
              <p className="text-sm">
                Our sons (13) are learning work ethic and pride in quality workmanship
              </p>
              <p className="text-sm">
                Available after-school and weekends for your lawn care needs
              </p>
              <p className="text-sm">
                Contact us for a free quote and estimate for your property
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} Fermanis & Sons Lawncare. All rights reserved.
            </div>
            <div className="text-sm text-gray-400">
                                Proudly serving 12 Oaks neighborhood with premium professional products
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 