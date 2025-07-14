'use client'

import React from 'react'
import { Button } from '../ui/Button'

export function ContactSection() {
  const handleCallNow = () => {
    // Phone call functionality
    window.location.href = 'tel:207-232-4106'
  }

  const handleSendMessage = () => {
    // Navigation to contact form or email
    window.location.href = 'mailto:fermanisandsonslawncare@gmail.com'
  }

  return (
    <section 
      data-testid="contact-section"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-green-600"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-lg sm:text-xl text-green-100 max-w-3xl mx-auto">
            Ready to transform your lawn into the neighborhood showpiece? 
            Contact us today for your free quote and experience the 
            <strong> Fermanis & Sons</strong> difference.
          </p>
        </div>

        {/* Contact Grid */}
        <div 
          data-testid="contact-grid"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {/* Contact Information */}
          <div 
            data-testid="contact-info"
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Contact Information
            </h3>
            
            {/* Phone */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-600">Call Us</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                207-232-4106
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Available for calls and consultations
              </p>
            </div>

            {/* Email */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-600">Email Us</span>
              </div>
              <p className="text-lg text-gray-900 break-all">
                fermanisandsonslawncare@gmail.com
              </p>
              <p className="text-sm text-gray-500 mt-1">
                We respond quickly to all inquiries
              </p>
            </div>

            {/* Contact Preference */}
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-800">
                <strong>Prefer to call or email?</strong> We&apos;re here to help! 
                Whether you want to discuss your lawn care needs or schedule 
                a consultation, we make it easy to get started.
              </p>
            </div>
          </div>

          {/* Service Area & Family Business */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Your Neighborhood Experts
            </h3>
            
            {/* Service Area */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-600">Service Area</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                Proudly serving the 12 Oaks neighborhood
              </p>
              <p className="text-gray-600">
                Holly Springs, NC
              </p>
            </div>

            {/* Family Business */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-600">Family Business</span>
              </div>
              <p className="text-gray-700">
                Our <strong>father and sons</strong> team brings personal care 
                and professional experience to every yard. We&apos;re your local, 
                reliable partners using premium <strong>professional-grade</strong> products 
                for guaranteed satisfaction.
              </p>
            </div>

            {/* Trust & Quality */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Trust, reliability, and professional results.</strong> 
                When you choose our family business, you&apos;re choosing neighbors 
                who take pride in making your neighborhood beautiful.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-green-100 max-w-2xl mx-auto">
              <strong>Contact us today</strong> for your free quote! We&apos;ll schedule 
              a consultation to discuss your lawn care needs and show you why families 
              in 12 Oaks trust us with their yards.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="primary"
              size="lg"
              onClick={handleCallNow}
              className="bg-white text-green-600 hover:bg-green-50 px-8 py-3"
            >
              Call Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleSendMessage}
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3"
            >
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 