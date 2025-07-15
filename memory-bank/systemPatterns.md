# System Patterns: Fermanis & Sons Lawncare Website

## Architecture Overview

### Application Structure
Following Next.js App Router patterns with a focus on server-side rendering for SEO and performance:

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Homepage
│   ├── services/          # Service pages
│   ├── gallery/           # Photo gallery
│   ├── about/             # Family story
│   ├── quote/             # Quote request
│   └── contact/           # Contact information
├── components/            # Reusable UI components
│   ├── forms/            # Form components
│   ├── ui/               # Basic UI elements
│   └── layout/           # Layout components
├── lib/                  # Utility functions
│   ├── schemas/          # Zod schemas
│   ├── utils/            # Helper functions
│   └── validations/      # Form validations
└── types/                # TypeScript type definitions
```

### Core Design Patterns

#### 1. Server-First Architecture
- **Server Components**: Default for all pages and components
- **Client Components**: Only for interactive elements (forms, mobile menu, navigation)
- **Static Generation**: Pre-render service pages and content
- **SEO Optimization**: Server-side rendering for search engines

#### 2. Component Composition
```typescript
// Page composition pattern
const ServicesPage = (): JSX.Element => {
  return (
    <PageLayout>
      <HeroSection />
      <ServiceTiers />
      <PricingTable />
      <CallToAction />
    </PageLayout>
  );
};

// Reusable component pattern
const ServiceCard = ({ service }: { service: Service }): JSX.Element => {
  return (
    <Card>
      <ServiceIcon icon={service.icon} />
      <ServiceContent service={service} />
      <ServicePricing price={service.price} />
    </Card>
  );
};
```

#### 3. Schema-First Data Flow
```typescript
// All data structures defined with Zod schemas
const QuoteRequestSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().regex(/^\d{10}$/, "Please enter a 10-digit phone number"),
  serviceType: z.enum(["basic", "premium", "custom"]),
  propertySize: z.enum(["small", "medium", "large"]),
  message: z.string().optional(),
});

type QuoteRequest = z.infer<typeof QuoteRequestSchema>;
```

#### 4. Navigation Pattern ✅ (Implemented)
```typescript
// Consistent navigation pattern across all components
import { useRouter } from 'next/navigation'

const ComponentWithNavigation = (): JSX.Element => {
  const router = useRouter()
  
  const handleGetQuote = () => {
    router.push('/quote')
  }
  
  const handleGetQuoteWithService = (serviceId: string) => {
    router.push(`/quote?service=${serviceId}`)
  }
  
  return (
    <Button onClick={handleGetQuote}>
      Get Quote
    </Button>
  )
}
```

## Key Technical Decisions

### 1. TypeScript Strict Mode
- **No `any` types**: All data structures explicitly typed
- **Schema validation**: Runtime validation with Zod
- **Type safety**: Prevent runtime errors through compile-time checks

### 2. Functional Programming Approach
```typescript
// Pure functions for business logic
const calculateQuotePrice = (
  serviceType: ServiceType,
  propertySize: PropertySize,
  addOns: AddOnService[]
): QuotePrice => {
  const basePrice = getBasePrice(serviceType, propertySize);
  const addOnPrice = addOns.reduce((total, addOn) => total + addOn.price, 0);
  
  return {
    basePrice,
    addOnPrice,
    totalPrice: basePrice + addOnPrice,
    breakdown: createPriceBreakdown(basePrice, addOns),
  };
};

// Immutable data updates
const updateQuoteRequest = (
  current: QuoteRequest,
  updates: Partial<QuoteRequest>
): QuoteRequest => {
  return { ...current, ...updates };
};
```

### 3. Navigation and Router Patterns ✅ (Recently Implemented)
```typescript
// Standard router implementation pattern
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/Button'

export function ComponentWithQuoteButton() {
  const router = useRouter()
  
  const handleGetQuote = () => {
    router.push('/quote')
  }
  
  const handleGetQuoteWithContext = (serviceId: string) => {
    router.push(`/quote?service=${serviceId}`)
  }
  
  return (
    <div>
      <Button onClick={handleGetQuote}>
        Get Quote
      </Button>
    </div>
  )
}
```

### 4. Form Handling Pattern
```typescript
// Form with validation and error handling
const QuoteForm = (): JSX.Element => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    
    const validationResult = QuoteRequestSchema.safeParse(formData);
    if (!validationResult.success) {
      setErrors(formatZodErrors(validationResult.error));
      return;
    }

    setIsSubmitting(true);
    try {
      await submitQuoteRequest(validationResult.data);
      // Handle success
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

## Component Architecture

### 1. Layout Components
```typescript
// Root layout with navigation
const RootLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

// Page-specific layouts
const PageLayout = ({ 
  children, 
  title, 
  description 
}: PageLayoutProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <PageHeader />
      <div className="container">
        {children}
      </div>
    </>
  );
};
```

### 2. UI Component Patterns
```typescript
// Base button component with variants
const Button = ({ 
  variant = "primary", 
  size = "medium", 
  children, 
  onClick,
  ...props 
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(
        "btn",
        `btn-${variant}`,
        `btn-${size}`,
        props.className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Service card component
const ServiceCard = ({ service }: ServiceCardProps): JSX.Element => {
  return (
    <Card>
      <CardHeader>
        <ServiceIcon name={service.icon} />
        <CardTitle>{service.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ServiceDescription>{service.description}</ServiceDescription>
        <ServiceFeatures features={service.features} />
      </CardContent>
      <CardFooter>
        <PriceDisplay price={service.price} />
        <Button variant="primary" onClick={handleGetQuote}>
          Get Quote
        </Button>
      </CardFooter>
    </Card>
  );
};
```

### 3. Navigation Components ✅ (Implementation Pattern)
```typescript
// Header component with quote button navigation
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/Button'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleGetQuote = () => {
    router.push('/quote')
  }

  return (
    <header>
      {/* Desktop Quote Button */}
      <Button
        variant="primary"
        size="sm"
        className="hidden sm:inline-flex"
        onClick={handleGetQuote}
      >
        Get Quote
      </Button>
      
      {/* Mobile Quote Button */}
      <Button
        variant="primary"
        size="sm"
        fullWidth
        onClick={() => {
          setIsMobileMenuOpen(false)
          handleGetQuote()
        }}
      >
        Get Quote
      </Button>
    </header>
  );
};
```

## Testing Patterns

### 1. Router Mocking Pattern ✅ (Established)
```typescript
// Standard router mock for components using useRouter
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ComponentWithRouter } from './ComponentWithRouter'

// Mock useRouter
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

describe('ComponentWithRouter', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('should navigate to quote page when button is clicked', () => {
    render(<ComponentWithRouter />)
    
    const quoteButton = screen.getByRole('button', { name: /get quote/i })
    fireEvent.click(quoteButton)
    
    expect(mockPush).toHaveBeenCalledWith('/quote')
  })
})
```

### 2. Component Testing Pattern
```typescript
// Testing pattern for UI components
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from './Button'

describe('Button Component', () => {
  it('should render with correct variant styles', () => {
    render(<Button variant="primary">Click Me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toHaveClass('btn-primary')
  })
  
  it('should call onClick handler when clicked', () => {
    const mockClick = jest.fn()
    render(<Button onClick={mockClick}>Click Me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(mockClick).toHaveBeenCalledTimes(1)
  })
})
```

## Data Flow Patterns

### 1. Email Integration Pattern ✅ (Implemented)
```typescript
// API Route for Quote Requests with Email Integration
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { QuoteRequestSchema, type QuoteRequest } from '../lib/schemas/quote'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request data
    const result = QuoteRequestSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: result.error.issues },
        { status: 400 }
      )
    }

    const quoteRequest: QuoteRequest = result.data

    // Send business notification email
    const businessEmail = await resend.emails.send({
      from: 'quotes@fermanisandsonslawncare.com',
      to: 'business@fermanisandsonslawncare.com',
      subject: `New Quote Request from ${quoteRequest.customerName}`,
      html: generateBusinessEmailTemplate(quoteRequest)
    })

    // Send customer confirmation email
    const customerEmail = await resend.emails.send({
      from: 'noreply@fermanisandsonslawncare.com',
      to: quoteRequest.email,
      subject: 'Quote Request Received - Fermanis & Sons Lawncare',
      html: generateCustomerEmailTemplate(quoteRequest)
    })

    return NextResponse.json({
      success: true,
      businessEmailId: businessEmail.data?.id,
      customerEmailId: customerEmail.data?.id
    })

  } catch (error) {
    console.error('Quote request error:', error)
    return NextResponse.json(
      { error: 'Failed to process quote request' },
      { status: 500 }
    )
  }
}
```

## Critical Implementation Notes

### Navigation System Requirements ✅
**Essential for all quote-related components:**
1. **useRouter Import**: Always import from 'next/navigation'
2. **Router Instance**: Call useRouter() hook in component
3. **onClick Handlers**: Implement proper navigation functions
4. **Testing**: Add router mocks to all test files

### Components with Navigation ✅
- **Header.tsx**: Desktop and mobile quote buttons
- **Hero.tsx**: Main CTA "Get Quote" button  
- **ServiceOverview.tsx**: "Get Free Quote" and "Learn More" buttons
- **Service Pages**: Service-specific quote buttons
- **Service Detail Pages**: Quote buttons with service context

### Testing Requirements ✅
**Router mock must be added to test files for any component using useRouter:**
```typescript
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))
```

This pattern ensures consistent navigation behavior and prevents test failures when components use Next.js router functionality. 