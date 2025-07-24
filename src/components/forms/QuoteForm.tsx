'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '../ui/Button'
import { QuoteRequestSchema, type QuoteRequest } from '../../lib/schemas/quote'
import { getActiveServices } from '../../lib/data/services'
import { type Service } from '../../lib/schemas/service'

interface FormErrors {
  [key: string]: string
}

export function QuoteForm() {
  const searchParams = useSearchParams()
  const allServices = getActiveServices()
  
  // Form state
  const [formData, setFormData] = useState<Partial<QuoteRequest>>({
    serviceType: 'basic',
    propertySize: 'medium',
    preferredContactMethod: 'phone',
    preferredCallTime: 'anytime',
    urgency: 'flexible',
    additionalServices: [],
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hasInitializedFromUrl, setHasInitializedFromUrl] = useState(false)

  // Pre-fill service type if coming from a specific service page
  useEffect(() => {
    if (!hasInitializedFromUrl) {
      const serviceParam = searchParams.get('service')
      if (serviceParam) {
        setFormData(prev => ({ ...prev, serviceType: 'basic' }))
      }
      setHasInitializedFromUrl(true)
    }
  }, [hasInitializedFromUrl])

  const handleInputChange = (field: keyof QuoteRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleAdditionalServiceChange = (serviceId: string, checked: boolean) => {
    setFormData(prev => {
      const currentServices = prev.additionalServices || []
      const updatedServices = checked
        ? [...currentServices, serviceId]
        : currentServices.filter(id => id !== serviceId)
      
      return { ...prev, additionalServices: updatedServices }
    })
  }

  const validateForm = (): boolean => {
    const result = QuoteRequestSchema.safeParse(formData)
    
    if (!result.success) {
      const newErrors: FormErrors = {}
      result.error.issues.forEach((error) => {
        const field = error.path[0] as string
        newErrors[field] = error.message
      })
      setErrors(newErrors)
      return false
    }
    
    setErrors({})
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // Submit to API
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit quote request')
      }

      const result = await response.json()
      
      setIsSubmitted(true)
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          serviceType: 'basic',
          propertySize: 'medium',
          preferredContactMethod: 'phone',
          preferredCallTime: 'anytime',
          urgency: 'flexible',
          additionalServices: [],
        })
        setIsSubmitted(false)
      }, 5000) // Increased to 5 seconds to give users time to read the success message
      
    } catch (error) {
      console.error('Failed to submit quote request:', error)
      setErrors({ submit: error instanceof Error ? error.message : 'Failed to submit quote request. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center p-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Quote Request Submitted Successfully!
          </h3>
          <p className="text-green-700">
                       Thank you for choosing Fermanis & Sons Lawncare. We&apos;ll contact you within 24 hours 
             to discuss your lawn care needs and provide a detailed quote.
          </p>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            <strong>What happens next?</strong>
          </p>
          <ul className="text-left space-y-2 max-w-md mx-auto text-gray-700">
                       <li>• We&apos;ll review your property details</li>
             <li>• Calculate a personalized quote</li>
             <li>• Contact you using your preferred method</li>
             <li>• Schedule a convenient time to discuss services</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" role="form">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Tell Us About Your Property
        </h2>
        <p className="text-gray-600">
          We&apos;ll provide a personalized quote based on your specific needs and property size.
        </p>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="customerName"
            value={formData.customerName || ''}
            onChange={(e) => handleInputChange('customerName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.customerName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Your full name"
            aria-required="true"
            aria-describedby={errors.customerName ? 'name-error' : undefined}
          />
          {errors.customerName && (
            <p id="name-error" className="mt-1 text-sm text-red-600">
              {errors.customerName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="your.email@example.com"
            aria-required="true"
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, ''))}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength={10}
            aria-required="true"
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1 text-sm text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Property Address *
          </label>
          <input
            type="text"
            id="address"
            value={formData.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="123 Oak Street, Holly Springs, NC"
            aria-required="true"
            aria-describedby={errors.address ? 'address-error' : undefined}
          />
          {errors.address && (
            <p id="address-error" className="mt-1 text-sm text-red-600">
              {errors.address}
            </p>
          )}
        </div>
      </div>

      {/* Service Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
            Service Type *
          </label>
          <select
            id="serviceType"
            value={formData.serviceType || 'basic'}
            onChange={(e) => handleInputChange('serviceType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="basic">Basic Maintenance (Mowing, Edging, Cleanup)</option>
            <option value="premium">Premium Package (Maintenance + Treatments)</option>
            <option value="custom">Custom Service Package</option>
          </select>
        </div>

        <div>
          <label htmlFor="propertySize" className="block text-sm font-medium text-gray-700 mb-2">
            Property Size *
          </label>
          <select
            id="propertySize"
            value={formData.propertySize || 'medium'}
            onChange={(e) => handleInputChange('propertySize', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="small">Small (Less than 0.25 acres)</option>
            <option value="medium">Medium (0.25 - 0.5 acres)</option>
            <option value="large">Large (0.5 - 1 acre)</option>
            <option value="xlarge">Extra Large (1+ acres)</option>
          </select>
        </div>
      </div>

      {/* Additional Services */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Additional Services (Optional)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {allServices.slice(0, 6).map((service: Service) => (
            <label key={service.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.additionalServices?.includes(service.id) || false}
                onChange={(e) => handleAdditionalServiceChange(service.id, e.target.checked)}
                className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{service.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="preferredContactMethod" className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Contact Method
          </label>
          <select
            id="preferredContactMethod"
            value={formData.preferredContactMethod || 'phone'}
            onChange={(e) => handleInputChange('preferredContactMethod', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="phone">Phone Call</option>
            <option value="email">Email</option>
            <option value="text">Text Message</option>
          </select>
        </div>

        <div>
          <label htmlFor="preferredCallTime" className="block text-sm font-medium text-gray-700 mb-2">
            Best Time to Call
          </label>
          <select
            id="preferredCallTime"
            value={formData.preferredCallTime || 'anytime'}
            onChange={(e) => handleInputChange('preferredCallTime', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="morning">Morning (8am - 12pm)</option>
            <option value="afternoon">Afternoon (12pm - 5pm)</option>
            <option value="evening">Evening (5pm - 8pm)</option>
            <option value="anytime">Anytime</option>
          </select>
        </div>

        <div>
          <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
            When do you need service?
          </label>
          <select
            id="urgency"
            value={formData.urgency || 'flexible'}
            onChange={(e) => handleInputChange('urgency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="asap">ASAP</option>
            <option value="this_week">This Week</option>
            <option value="next_week">Next Week</option>
            <option value="flexible">I&apos;m Flexible</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes (Optional)
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message || ''}
          onChange={(e) => handleInputChange('message', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Tell us about any specific needs, problem areas, or questions you have..."
        />
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        {errors.submit && (
          <p className="mb-4 text-sm text-red-600 text-center">{errors.submit}</p>
        )}
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium"
        >
          {isSubmitting ? 'Submitting...' : 'Request Quote'}
        </Button>
        
        <p className="mt-3 text-xs text-gray-500 text-center">
          By submitting this form, you agree to be contacted by Fermanis & Sons Lawncare 
          regarding your quote request. We respect your privacy and will not share your information.
        </p>
      </div>
    </form>
  )
} 