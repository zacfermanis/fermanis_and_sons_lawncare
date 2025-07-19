'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '../../components/ui/Button'
import { ServiceCard } from '../../components/ui/ServiceCard'
import { getServicesByCategory } from '../../lib/data/services'

export default function ServicesPage() {
  const router = useRouter()

  const handleLearnMore = (serviceId: string) => {
    router.push(`/services/${serviceId}`)
  }

  const handleGetQuote = (serviceId: string) => {
    router.push(`/quote?service=${serviceId}`)
  }

  const handleCallNow = () => {
    window.location.href = 'tel:207-232-4106'
  }

  const handleRequestQuote = () => {
    router.push('/quote')
  }

  const maintenanceServices = getServicesByCategory('maintenance')
  const treatmentServices = getServicesByCategory('treatments')
  const landscapingServices = getServicesByCategory('landscaping')
  const cleanupServices = getServicesByCategory('cleanup')

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-4xl mx-auto mb-8">
            Family-operated lawn care serving the <strong>12 Oaks neighborhood</strong> of Holly Springs. 
            Our father and sons team uses <strong>professional-grade products</strong> to deliver 
            exceptional results you can trust.
          </p>
          <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg border border-green-200 max-w-3xl mx-auto">
            <p className="text-gray-800">
              <strong>Teaching the next generation:</strong> Our sons are learning alongside us, 
              developing work ethic and understanding the importance of reliable, trusted service. 
              When you choose Fermanis & Sons, you&apos;re supporting a family business built on integrity.
            </p>
          </div>
        </div>

        {/* Maintenance Services */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Maintenance Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Regular upkeep to keep your lawn looking its best year-round
            </p>
          </div>
          
          {/* Reel Mower Message */}
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg mb-8 max-w-2xl mx-auto">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-red-800">
                  Stop Rotary Rip! We only use reel mowers for a professional cut.
                </p>
              </div>
            </div>
          </div>

          {/* Mowing Comparison */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              See the Difference: Rotary Rip vs. Professional Reel Mowing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bad - Rotary Rip */}
              <div className="text-center">
                <div className="relative mb-4">
                  <Image
                    src="/rotary_rip2.jpg"
                    alt="Rotary mower damage - torn and ripped grass"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg border-2 border-red-300"
                  />
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    AVOID
                  </div>
                </div>
                <h4 className="font-semibold text-red-600 mb-2">Rotary Rip Damage</h4>
                <p className="text-sm text-gray-600">
                  Torn, ripped grass that damages your lawn and creates an uneven, unhealthy appearance.
                </p>
              </div>

              {/* Good - Reel Mowing */}
              <div className="text-center">
                <div className="relative mb-4">
                  <Image
                    src="/lawn_1.jpg"
                    alt="Professional reel mower cut - clean and healthy grass"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg border-2 border-green-300"
                  />
                  <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    CHOOSE
                  </div>
                </div>
                <h4 className="font-semibold text-green-600 mb-2">Professional Reel Cut</h4>
                <p className="text-sm text-gray-600">
                  Clean, precise cuts that promote healthy grass growth and create a professional appearance.
                </p>
              </div>
            </div>
          </div>
          <div 
            data-testid="services-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
          >
            {maintenanceServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                variant="card"
                showQuoteButton={true}
                onLearnMore={handleLearnMore}
                onGetQuote={handleGetQuote}
              />
            ))}
          </div>
        </section>

        {/* Professional Treatments */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Professional Treatments
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Advanced soil health and lawn nutrition using premium professional-grade products
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {treatmentServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                variant="card"
                showQuoteButton={true}
                onLearnMore={handleLearnMore}
                onGetQuote={handleGetQuote}
              />
            ))}
          </div>
        </section>

        {/* Landscaping Services */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Landscaping Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional landscaping for enhanced curb appeal and property value
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {landscapingServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                variant="card"
                showQuoteButton={true}
                onLearnMore={handleLearnMore}
                onGetQuote={handleGetQuote}
              />
            ))}
          </div>
        </section>

        {/* Cleanup Services */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Cleanup Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Seasonal and post-maintenance cleanup for a pristine property
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {cleanupServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                variant="card"
                showQuoteButton={true}
                onLearnMore={handleLearnMore}
                onGetQuote={handleGetQuote}
              />
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Contact our family business for reliable, trusted lawn care service in the 12 Oaks neighborhood
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="text-center">
              <p className="text-xl font-semibold text-green-600">207-232-4106</p>
              <p className="text-gray-600">fermanisandsonslawncare@gmail.com</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={handleCallNow}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            >
              Call Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleRequestQuote}
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
            >
              Request Quote
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
} 