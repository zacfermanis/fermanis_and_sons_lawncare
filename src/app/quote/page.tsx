'use client'

import React, { Suspense } from 'react'
import { QuoteForm } from '../../components/forms/QuoteForm'

function QuoteFormWrapper() {
  return (
    <Suspense fallback={
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    }>
      <QuoteForm />
    </Suspense>
  )
}

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get Your Free Quote
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Ready to transform your lawn? Our family business provides{' '}
            <strong>professional-grade lawn care</strong> to the{' '}
            <strong>12 Oaks neighborhood</strong> of Holly Springs. 
            Get a personalized quote for your property today.
          </p>
          
          <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg border border-green-200 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Why Choose Fermanis & Sons?
            </h2>
            <ul className="text-gray-700 text-left space-y-1">
              <li>• Family-operated with personal attention to detail</li>
              <li>• Professional-grade products for superior results</li>
              <li>• Teaching our sons work ethic and quality service</li>
              <li>• Dedicated to the 12 Oaks neighborhood</li>
            </ul>
          </div>
        </div>

        {/* Quote Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <QuoteFormWrapper />
        </div>

        {/* Contact Information */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Prefer to Talk Directly?
          </h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              Email: fermanisandsonslawncare@gmail.com
            </p>
            <p className="text-sm text-gray-500">
              Serving the 12 Oaks neighborhood • Holly Springs, NC
            </p>
          </div>
        </div>
      </div>
    </main>
  )
} 