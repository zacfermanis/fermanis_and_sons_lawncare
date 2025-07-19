import React from 'react'
import { Button } from './Button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './Card'
import { Service } from '../../lib/schemas/service'
import { cn } from '../../lib/utils/formatting'

interface ServiceCardProps {
  service: Service
  variant?: 'card' | 'detailed'
  showQuoteButton?: boolean
  onLearnMore?: (serviceId: string) => void
  onGetQuote?: (serviceId: string) => void
  className?: string
}

const getCategoryDisplayName = (category: string): string => {
  switch (category) {
    case 'maintenance':
      return 'Maintenance'
    case 'treatments':
      return 'Treatments'
    case 'landscaping':
      return 'Landscaping'
    case 'cleanup':
      return 'Cleanup'
    default:
      return category
  }
}

const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'maintenance':
      return 'bg-green-100 text-green-800'
    case 'treatments':
      return 'bg-blue-100 text-blue-800'
    case 'landscaping':
      return 'bg-amber-100 text-amber-800'
    case 'cleanup':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function ServiceCard({
  service,
  variant = 'card',
  showQuoteButton = false,
  onLearnMore,
  onGetQuote,
  className
}: ServiceCardProps) {
  const isDetailed = variant === 'detailed'
  const featuresToShow = isDetailed ? service.features : service.features.slice(0, 3)

  const handleLearnMore = () => {
    onLearnMore?.(service.id)
  }

  const handleGetQuote = () => {
    onGetQuote?.(service.id)
  }

  return (
    <Card
      data-testid="service-card"
      role="article"
      variant={isDetailed ? "elevated" : "default"}
      className={cn(
        isDetailed ? 'bg-green-50 border-green-200' : 'bg-white',
        'flex flex-col h-full',
        className
      )}
    >
      <CardHeader className="flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
              {service.name}
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <span className={cn(
                'px-2 py-1 text-xs font-medium rounded-full',
                getCategoryColor(service.category)
              )}>
                {getCategoryDisplayName(service.category)}
              </span>
              {service.seasonalService && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
                  Seasonal
                </span>
              )}
              {service.category === 'treatments' && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                  Professional-Grade
                </span>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-grow space-y-3">
        <div className="h-12 flex items-start">
          <p className="text-gray-600 text-sm sm:text-base">
            {service.shortDescription}
          </p>
        </div>

        <div className="flex-grow space-y-1">
          <h4 className="text-sm font-medium text-gray-900">Key Features:</h4>
          <ul className="space-y-0.5 min-h-[100px]">
            {featuresToShow.map((feature, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          {!isDetailed && service.features.length > 3 && (
            <p className="text-xs text-gray-500 italic">
              +{service.features.length - 3} more features
            </p>
          )}
        </div>

        <div className="space-y-1 flex-shrink-0">
          <p className="text-lg font-semibold text-green-600">
            {service.price}
          </p>
          {service.priceNote && (
            <p className="text-xs text-gray-500">
              {service.priceNote}
            </p>
          )}
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-2 rounded-lg border border-green-100 flex-shrink-0">
          <p className="text-xs text-gray-700">
            <strong>Family-operated quality</strong> serving the{' '}
            <strong>12 Oaks neighborhood</strong> with professional-grade products
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
        <Button
          variant="primary"
          size="sm"
          onClick={handleLearnMore}
          className="flex-1"
        >
          Learn More
        </Button>
        {showQuoteButton && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleGetQuote}
            className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
          >
            Get Quote
          </Button>
        )}
      </CardFooter>
    </Card>
  )
} 