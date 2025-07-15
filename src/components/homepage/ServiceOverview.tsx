'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/Button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card'
import { SERVICES } from '../../lib/data/services'

export function ServiceOverview() {
  const router = useRouter()
  
  const handleGetQuote = () => {
    router.push('/quote')
  }

  const handleLearnMore = (serviceId: string) => {
    router.push(`/services/${serviceId}`)
  }

  return (
    <section 
      data-testid="service-overview"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive lawn care and landscaping services for the <strong>12 Oaks</strong> neighborhood. 
            Our family business uses professional <strong>premium-grade</strong> products to deliver 
            exceptional results you can trust.
          </p>
        </div>

        {/* Services Grid */}
        <div 
          data-testid="services-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {SERVICES.map((service) => (
            <Card 
              key={service.id} 
              variant="elevated" 
              hover
              data-testid={`service-card-${service.id}`}
              className="h-full"
            >
              <CardHeader>
                <CardTitle className="text-xl">
                  {service.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1">
                <p className="text-gray-600 mb-4">
                  {service.shortDescription}
                </p>
                
                {/* Service Features */}
                <div className="space-y-2">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-800">
                    {service.price}
                  </p>
                  {service.priceNote && (
                    <p className="text-xs text-green-600 mt-1">
                      {service.priceNote}
                    </p>
                  )}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLearnMore(service.id)}
                  className="w-full border-green-600 text-green-600 hover:bg-green-50"
                >
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Business Message */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Professional Service with Family Values
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              As a family business serving the <strong>12 Oaks</strong> neighborhood, 
              we combine professional expertise with personal care. Our father and sons 
              team uses premium <strong>professional-grade</strong> products to ensure your lawn 
              receives the best possible treatment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="primary"
                size="lg"
                onClick={handleGetQuote}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Get Free Quote
              </Button>
              <div className="text-center">
                <p className="text-sm text-gray-500">or call us directly</p>
                <p className="text-lg font-semibold text-green-600">
                  207-232-4106
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Categories Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-2">Lawn Maintenance</h4>
            <p className="text-sm text-gray-600">
              Weekly mowing, weedwacking, and edging for a pristine lawn
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-2">Soil Treatments</h4>
            <p className="text-sm text-gray-600">
              Professional products for healthy soil and beautiful lawns
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-2">Landscaping</h4>
            <p className="text-sm text-gray-600">
              Mulching and hedge trimming for complete curb appeal
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-2">Cleanup Services</h4>
            <p className="text-sm text-gray-600">
              Leaf blowing and debris removal for a tidy property
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 