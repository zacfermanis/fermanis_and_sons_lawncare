'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/Button'
import { Card, CardContent } from '../ui/Card'

export function Hero() {
  const handleGetQuote = () => {
    // Navigation to quote page would go here
    console.log('Navigate to quote page')
  }

  const handleCallNow = () => {
    // Phone call functionality would go here
    window.location.href = 'tel:207-232-4106'
  }

  return (
    <section 
      data-testid="hero-section"
      className="bg-gradient-to-b from-green-50 to-white py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div 
          data-testid="hero-content"
          className="flex flex-col items-center justify-center text-center space-y-8"
        >
          {/* Logo and Main Heading */}
          <div className="space-y-6">
            <div className="flex justify-center">
              <Image
                src="/FermanisAndSonsLogo_transparent.png"
                alt="Fermanis & Sons Lawncare Logo"
                width={200}
                height={200}
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
                priority
              />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-green-600">
              Family Trust. Professional Results.
            </h2>
          </div>

          {/* Family Business Story */}
          <div className="max-w-3xl space-y-6">
            <p className="text-lg sm:text-xl text-gray-700">
                             A father and two sons providing <strong>meticulous lawn and landscape care</strong> to the 
               <strong> 12 Oaks neighborhood</strong> of <strong>Holly Springs</strong>. We&apos;re not just a 
               business—we&apos;re a family teaching our sons the values of hard work, reliability, and 
              taking pride in quality workmanship.
            </p>
            
            <p className="text-base sm:text-lg text-gray-600">
                             Our complete service offering includes professional lawn mowing, soil and lawn treatments 
               with premium <strong>professional-grade</strong> products, and comprehensive landscaping services. 
               We&apos;re your trusted neighborhood experts delivering exceptional results.
            </p>
          </div>

          {/* Service Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            <Card variant="elevated" className="text-center">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Local Neighborhood Focus
                </h3>
                <p className="text-gray-600">
                  Dedicated to serving the 12 Oaks neighborhood with personalized, 
                  reliable service you can trust.
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated" className="text-center">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Premium Professional Products
                </h3>
                <p className="text-gray-600">
                  Professional-grade soil treatments and lawn care products for 
                  superior results and long-lasting health.
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated" className="text-center">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Complete Service Range
                </h3>
                <p className="text-gray-600">
                  From weekly mowing to seasonal treatments, we provide comprehensive 
                  lawn care and landscaping services.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Serving 12 Oaks Neighborhood
            </h3>
            <div className="space-y-2 text-center">
              <p className="text-lg font-medium text-green-600">
                207-232-4106
              </p>
              <p className="text-gray-600">
                fermanisandsonslawncare@gmail.com
              </p>
              <p className="text-sm text-gray-500">
                Holly Springs, NC
              </p>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={handleGetQuote}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            >
              Get Quote
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleCallNow}
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
            >
              Call Now
            </Button>
          </div>

          {/* Teaching Values Story */}
          <div className="bg-green-50 rounded-lg p-6 max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
              Teaching the Next Generation
            </h3>
            <p className="text-gray-700 text-center">
                             Our sons are learning alongside us, developing a strong work ethic and 
               understanding the importance of quality service. When you choose Fermanis & Sons, 
               you&apos;re supporting a family business that values integrity, reliability, and 
              community trust.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 