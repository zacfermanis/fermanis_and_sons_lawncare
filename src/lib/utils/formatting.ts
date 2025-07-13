/**
 * Formats a number as currency (USD)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

/**
 * Formats a phone number from 10 digits to (XXX) XXX-XXXX format
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length !== 10) {
    return phone
  }
  
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
}

/**
 * Formats a date for display
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/**
 * Formats a date and time for display
 */
export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

/**
 * Capitalizes the first letter of a string
 */
export const capitalize = (str: string): string => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Formats property size for display
 */
export const formatPropertySize = (size: string): string => {
  switch (size) {
    case 'small': return 'Small (< 5,000 sq ft)'
    case 'medium': return 'Medium (5,000 - 10,000 sq ft)'
    case 'large': return 'Large (10,000 - 20,000 sq ft)'
    case 'xlarge': return 'Extra Large (> 20,000 sq ft)'
    default: return capitalize(size)
  }
} 