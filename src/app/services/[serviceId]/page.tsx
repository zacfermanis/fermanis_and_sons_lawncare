'use client'

import React from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '../../../components/ui/Button'
import { ServiceCard } from '../../../components/ui/ServiceCard'
import { getServiceById, getServicesByCategory } from '../../../lib/data/services'

export default function ServiceDetailPage() {
  const router = useRouter()
  const params = useParams()
  const serviceId = params.serviceId as string

  const service = getServiceById(serviceId)

  const handleBackToServices = () => {
    router.push('/services')
  }

  const handleGetQuote = () => {
    router.push(`/quote?service=${serviceId}`)
  }


  const handleRelatedServiceClick = (relatedServiceId: string) => {
    router.push(`/services/${relatedServiceId}`)
  }

  // If service not found, show error page
  if (!service) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Service not found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The service you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={handleBackToServices}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            View All Services
          </Button>
        </div>
      </main>
    )
  }

  // Get related services (other services in the same category)
  const relatedServices = getServicesByCategory(service.category)
    .filter(s => s.id !== service.id)
    .slice(0, 3) // Show up to 3 related services

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={handleBackToServices}
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            ← Back to Services
          </Button>
        </div>

        {/* Service Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Service Information */}
          <div className="lg:col-span-2">
            <ServiceCard
              service={service}
              variant="detailed"
              showQuoteButton={false}
              className="mb-8"
            />

            {/* Additional Service Information */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                About This Service
              </h2>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {service.description}
                </p>
                
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-100 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Why Choose Our Family Business?
                  </h3>
                  <p className="text-gray-700">
                    <strong>Family-operated quality</strong> serving the{' '}
                    <strong>12 Oaks neighborhood</strong> with professional-grade products. 
                    Our father and sons team brings personal attention and pride to every job.
                  </p>
                </div>

                {service.id === 'lawn-mowing' && (
                  <>
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg mb-6">
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
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
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
                  </>
                )}

                {service.category === 'treatments' && (
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Professional-Grade Products
                    </h3>
                    <p className="text-gray-700">
                      Using professional-grade products to feed your lawn from the ground up, 
                      including advanced soil health treatments and complete nutrient formulas 
                      for superior, long-lasting results.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Contact & Quote */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Get Started Today
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="text-center">
                  <p className="text-gray-600 text-sm">fermanisandsonslawncare@gmail.com</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Serving 12 Oaks neighborhood, Holly Springs, NC
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleGetQuote}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Get Quote
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-xs text-gray-500 text-center">
                  <p className="mb-2">
                    <strong>Available:</strong> After-school & weekends
                  </p>
                  <p>
                    Family business teaching work ethic and quality
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Related Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Complete your lawn care with our other professional services
              </p>
            </div>
            <div 
              data-testid="related-services-grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {relatedServices.map((relatedService) => (
                <ServiceCard
                  key={relatedService.id}
                  service={relatedService}
                  variant="card"
                  showQuoteButton={false}
                  onLearnMore={handleRelatedServiceClick}
                />
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Lawn?
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Contact our family business for reliable, professional lawn care service 
            in the 12 Oaks neighborhood
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={handleGetQuote}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            >
              Get Free Quote
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
} 