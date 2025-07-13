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
- **Client Components**: Only for interactive elements (forms, mobile menu)
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

### 3. Form Handling Pattern
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
        <Button variant="primary">Get Quote</Button>
      </CardFooter>
    </Card>
  );
};
```

## Data Flow Patterns

### 1. Server Actions for Form Submission
```typescript
"use server";

const submitQuoteRequest = async (
  formData: FormData
): Promise<ActionResult> => {
  const rawData = {
    customerName: formData.get("customerName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    serviceType: formData.get("serviceType"),
    propertySize: formData.get("propertySize"),
    message: formData.get("message"),
  };

  const validationResult = QuoteRequestSchema.safeParse(rawData);
  
  if (!validationResult.success) {
    return {
      success: false,
      errors: formatZodErrors(validationResult.error),
    };
  }

  try {
    await sendQuoteRequestEmail(validationResult.data);
    await saveQuoteRequest(validationResult.data);
    
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "Failed to submit quote request. Please try again.",
    };
  }
};
```

### 2. Static Data Generation
```typescript
// Service data with static generation
const getServices = (): Service[] => {
  return [
    {
      id: "basic-mowing",
      name: "Basic Lawn Mowing",
      description: "Weekly or biweekly cutting with edge trimming",
      price: 35,
      features: ["Professional cutting", "Edge trimming", "Debris cleanup"],
      icon: "lawn-mower",
    },
    {
      id: "soil-boost",
      name: "Soil & Health Boost",
      description: "Anderson products for healthier lawn",
      price: 50,
      features: ["Anderson Dirt Booster Plus", "PGF Complete", "Dark Green Lawn"],
      icon: "fertilizer",
    },
    // More services...
  ];
};

// Static generation for service pages
export const generateStaticParams = (): { slug: string }[] => {
  const services = getServices();
  return services.map(service => ({ slug: service.id }));
};
```

## Error Handling Patterns

### 1. Form Validation Errors
```typescript
type FormErrors = Record<string, string>;

const formatZodErrors = (error: ZodError): FormErrors => {
  return error.errors.reduce((acc, err) => {
    const path = err.path.join(".");
    acc[path] = err.message;
    return acc;
  }, {} as FormErrors);
};
```

### 2. API Error Handling
```typescript
type ActionResult = 
  | { success: true; data?: unknown }
  | { success: false; error?: string; errors?: FormErrors };

const handleApiError = (error: unknown): ActionResult => {
  if (error instanceof ZodError) {
    return {
      success: false,
      errors: formatZodErrors(error),
    };
  }

  return {
    success: false,
    error: "An unexpected error occurred. Please try again.",
  };
};
```

## Testing Patterns

### 1. Component Testing
```typescript
// Test user behavior, not implementation
describe("QuoteForm", () => {
  it("should submit valid quote request", async () => {
    const mockSubmit = jest.fn();
    render(<QuoteForm onSubmit={mockSubmit} />);

    await userEvent.type(screen.getByLabelText("Name"), "John Doe");
    await userEvent.type(screen.getByLabelText("Email"), "john@example.com");
    await userEvent.type(screen.getByLabelText("Phone"), "1234567890");
    await userEvent.click(screen.getByRole("button", { name: "Get Quote" }));

    expect(mockSubmit).toHaveBeenCalledWith({
      customerName: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      serviceType: "basic",
      propertySize: "medium",
    });
  });
});
```

### 2. Integration Testing
```typescript
// Test complete user journeys
describe("Quote Request Flow", () => {
  it("should complete quote request from service page", async () => {
    render(<ServicePage serviceId="basic-mowing" />);

    // Navigate to quote form
    await userEvent.click(screen.getByRole("button", { name: "Get Quote" }));

    // Fill form
    await userEvent.type(screen.getByLabelText("Name"), "Jane Smith");
    await userEvent.type(screen.getByLabelText("Email"), "jane@example.com");
    await userEvent.type(screen.getByLabelText("Phone"), "9876543210");
    
    // Submit
    await userEvent.click(screen.getByRole("button", { name: "Submit Quote" }));

    // Verify success
    expect(screen.getByText("Thank you for your quote request!")).toBeInTheDocument();
  });
});
```

## Performance Patterns

### 1. Image Optimization
```typescript
// Optimized image component
const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height 
}: OptimizedImageProps): JSX.Element => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
};
```

### 2. Code Splitting
```typescript
// Dynamic imports for non-critical components
const PhotoGallery = dynamic(
  () => import("../components/PhotoGallery"),
  { loading: () => <GalleryLoader /> }
);

const ContactForm = dynamic(
  () => import("../components/ContactForm"),
  { ssr: false }
);
```

This architecture ensures the website is fast, maintainable, and scalable while following best practices for TypeScript, React, and Next.js development. 