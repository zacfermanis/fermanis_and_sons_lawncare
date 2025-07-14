import { Service } from '../schemas/service'

export const SERVICES: Service[] = [
  {
    id: 'lawn-mowing',
    name: 'Lawn Mowing',
    description: 'Regular, clean cuts using sharp blades to maintain a healthy and even lawn. Includes full mow of front, back, and side yards with patterned mowing available if requested. Clippings can be mulched or bagged depending on lawn needs.',
    shortDescription: 'Regular, clean cuts using sharp blades for healthy, even lawn',
    price: 'Contact for pricing',
    priceNote: 'Pricing based on lawn size and frequency',
    features: [
      'Full mow of front, back, and side yards',
      'Patterned mowing available if requested',
      'Clippings mulched or bagged based on lawn needs',
      'Sharp blades for healthy cuts',
      'Regular weekly or bi-weekly service'
    ],
    icon: 'mower',
    category: 'maintenance',
    isActive: true,
    seasonalService: false
  },
  {
    id: 'weedwacking',
    name: 'Weedwacking (String Trimming)',
    description: 'Finishes the job where the mower can\'t reach, providing sharp and uniform edges around trees, flower beds, fences, utility poles, mailboxes, and other obstacles.',
    shortDescription: 'String trimming around obstacles for sharp, uniform edges',
    price: 'Contact for pricing',
    priceNote: 'Often included with mowing service',
    features: [
      'Around trees, flower beds, fences',
      'Utility poles and mailboxes',
      'Sharp, uniform edges',
      'Completes areas mower can\'t reach',
      'Professional finishing touch'
    ],
    icon: 'trimmer',
    category: 'maintenance',
    isActive: true,
    seasonalService: false
  },
  {
    id: 'edging',
    name: 'Edging',
    description: 'Creates crisp, professional lines along sidewalks, driveways, flower beds, and curbs. Performed with a dedicated edging tool for that finished, professional look.',
    shortDescription: 'Crisp, professional lines along sidewalks and driveways',
    price: 'Contact for pricing',
    priceNote: 'Often included with full service packages',
    features: [
      'Sidewalks and driveways',
      'Flower beds and curbs',
      'Dedicated edging tool',
      'Professional finished look',
      'Crisp, clean lines'
    ],
    icon: 'edger',
    category: 'maintenance',
    isActive: true,
    seasonalService: false
  },
  {
    id: 'leaf-blowing',
    name: 'Leaf Blowing & Debris Cleanup',
    description: 'Post-mow or seasonal service to clear grass clippings from hardscapes, leaves from lawns, patios, and walkways, plus removal of twigs, sticks, and general debris.',
    shortDescription: 'Post-mow and seasonal cleanup of debris and leaves',
    price: 'Contact for pricing',
    priceNote: 'Seasonal pricing available',
    features: [
      'Grass clippings from hardscapes',
      'Leaves from lawns, patios, walkways',
      'Twigs, sticks, and debris removal',
      'Post-mow cleanup',
      'Seasonal service available'
    ],
    icon: 'leaf-blower',
    category: 'cleanup',
    isActive: true,
    seasonalService: true
  },
  {
    id: 'weeding',
    name: 'Weeding (Manual Removal)',
    description: 'Targeted hand-pulling of weeds from garden beds, walkways, and mulched areas. Ideal for clients who want a tidy, manicured look beyond chemical sprays.',
    shortDescription: 'Hand-pulling weeds for tidy, manicured look',
    price: 'Contact for pricing',
    priceNote: 'Pricing based on area size and weed density',
    features: [
      'Garden beds and walkways',
      'Mulched areas',
      'Hand-pulling technique',
      'No chemical sprays',
      'Tidy, manicured appearance'
    ],
    icon: 'weeds',
    category: 'maintenance',
    isActive: true,
    seasonalService: false
  },
  {
    id: 'soil-treatments',
    name: 'Soil & Lawn Treatments',
    description: 'Using professional-grade products to feed your lawn from the ground up. Includes advanced soil health treatments for microbe activation, complete nutrient formulas for all-in-one support, and premium color enhancement for rich, visual impact. Custom application schedule based on lawn goals.',
    shortDescription: 'Professional-grade products for soil health and lawn nutrition',
    price: 'Contact for pricing',
    priceNote: 'Custom application schedule pricing',
    features: [
      'Advanced soil health treatment for microbe activation',
      'Complete nutrient formula for all-in-one support',
      'Premium color enhancement for rich visual impact',
      'Custom application schedule',
      'Premium product quality'
    ],
    icon: 'fertilizer',
    category: 'treatments',
    isActive: true,
    seasonalService: true
  },
  {
    id: 'mulching',
    name: 'Mulching',
    description: 'Installation or refresh of mulch beds with weed barrier preparation. Uses high-quality hardwood or color-enhanced mulch for improved moisture retention and enhanced curb appeal.',
    shortDescription: 'Installation and refresh of mulch beds with weed barrier',
    price: 'Contact for pricing',
    priceNote: 'Pricing based on area size and mulch type',
    features: [
      'Weed barrier preparation',
      'High-quality hardwood mulch',
      'Color-enhanced mulch options',
      'Improved moisture retention',
      'Enhanced curb appeal'
    ],
    icon: 'mulch',
    category: 'landscaping',
    isActive: true,
    seasonalService: true
  },
  {
    id: 'hedge-trimming',
    name: 'Hedge & Tree Trimming',
    description: 'Seasonal shaping of shrubs and decorative hedges, trimming of low-hanging branches from ornamental trees, and removal of deadwood or overgrowth.',
    shortDescription: 'Seasonal shaping of hedges and ornamental tree trimming',
    price: 'Contact for pricing',
    priceNote: 'Seasonal service pricing',
    features: [
      'Shrubs and decorative hedges',
      'Low-hanging ornamental tree branches',
      'Deadwood removal',
      'Overgrowth trimming',
      'Seasonal shaping'
    ],
    icon: 'hedge-trimmer',
    category: 'landscaping',
    isActive: true,
    seasonalService: true
  }
]

export const getServiceById = (id: string): Service | undefined => {
  return SERVICES.find(service => service.id === id)
}

export const getServicesByCategory = (category: string): Service[] => {
  return SERVICES.filter(service => service.category === category)
}

export const getActiveServices = (): Service[] => {
  return SERVICES.filter(service => service.isActive)
}

export const getSeasonalServices = (): Service[] => {
  return SERVICES.filter(service => service.seasonalService)
}

export const getMaintenanceServices = (): Service[] => {
  return SERVICES.filter(service => service.category === 'maintenance')
} 