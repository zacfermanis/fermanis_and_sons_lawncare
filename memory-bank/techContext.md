# Technical Context: Fermanis & Sons Lawncare Website

## Technology Stack

### Core Technologies
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Schema Validation**: Zod
- **Testing**: Jest + React Testing Library
- **Package Manager**: npm
- **Node Version**: 18.x or 20.x LTS

### Development Tools
- **Code Editor**: VS Code (recommended)
- **Version Control**: Git
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript compiler
- **Build Tool**: Next.js built-in bundler
- **Deployment**: Vercel (recommended for Next.js)

### Key Dependencies
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@emotion/react": "^11.0.0",
    "@emotion/styled": "^11.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "jest": "^29.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

## Development Environment Setup

### Prerequisites
- Node.js 18.x or 20.x LTS
- npm 9.x or higher
- Git
- VS Code (recommended)

### Initial Setup Commands
```bash
# Create Next.js project
npx create-next-app@latest fermanis-lawncare --typescript --tailwind --app --src-dir

# Navigate to project
cd fermanis-lawncare

# Install additional dependencies
npm install @emotion/react @emotion/styled zod tailwindcss

# Install dev dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom

# Initialize git repository
git init
git add .
git commit -m "Initial commit"
```

### TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    },
    // Strict mode settings
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Jest Configuration
```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/app/layout.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
```

### ESLint Configuration
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "react-hooks/exhaustive-deps": "error",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

## Development Workflow

### Scripts
```json
// package.json scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "type-check": "tsc --noEmit"
  }
}
```

### Development Commands
```bash
# Start development server
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Check TypeScript types
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build
```

## Technical Constraints

### Performance Requirements
- **Core Web Vitals**: Meet Google's Core Web Vitals standards
- **Mobile Performance**: Lighthouse score > 90 on mobile
- **Load Time**: First Contentful Paint < 2.5s
- **SEO**: Lighthouse SEO score > 95

### Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Progressive Enhancement**: Graceful degradation for older browsers

### Accessibility Requirements
- **WCAG 2.1 Level AA**: Full compliance
- **Screen Readers**: Compatible with NVDA, JAWS, VoiceOver
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: Minimum 4.5:1 ratio

### SEO Technical Requirements
- **Server-Side Rendering**: All pages pre-rendered
- **Semantic HTML**: Proper heading hierarchy and semantic markup
- **Schema Markup**: Local business schema implementation
- **Meta Tags**: Complete Open Graph and Twitter Card support
- **Sitemap**: Automatic sitemap generation

## Deployment Configuration

### Vercel Deployment (Recommended)
```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "functions": {
    "app/api/contact/route.ts": {
      "maxDuration": 30
    }
  }
}
```

### Environment Variables
```bash
# .env.local (local development)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CONTACT_EMAIL=info@fermanislawncare.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# .env.production (production)
NEXT_PUBLIC_SITE_URL=https://fermanislawncare.com
CONTACT_EMAIL=info@fermanislawncare.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Development Standards

### Code Quality
- **Test Coverage**: 100% for all business logic
- **Type Safety**: No `any` types, strict TypeScript
- **Linting**: ESLint errors must be resolved
- **Formatting**: Prettier for consistent code style

### Git Workflow
```bash
# Branch naming convention
feature/quote-form-validation
fix/mobile-navigation-bug
refactor/service-card-component

# Commit message format
feat: add quote request form validation
fix: resolve mobile navigation menu issue
test: add integration tests for contact form
refactor: extract service pricing logic
```

### Testing Strategy
- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test complete user workflows
- **E2E Tests**: Test critical user journeys (future enhancement)
- **Visual Regression**: Ensure UI consistency (future enhancement)

## Third-Party Integrations

### Email Service
- **SMTP**: Gmail SMTP for quote request notifications
- **Alternative**: SendGrid or Mailgun for production scaling

### Analytics (Future)
- **Google Analytics**: Track user behavior and conversions
- **Google Tag Manager**: Manage tracking codes
- **Google Search Console**: Monitor search performance

### Maps Integration (Future)
- **Google Maps**: Show service areas
- **Mapbox**: Alternative mapping solution

### Payment Processing (Future)
- **Stripe**: Online payment processing
- **PayPal**: Alternative payment option
- **Venmo/Zelle**: Integration for mobile payments

## Performance Optimization

### Image Optimization
```typescript
// Next.js Image component configuration
const imageConfig = {
  domains: ['example.com'],
  formats: ['image/webp', 'image/avif'],
  sizes: {
    mobile: '(max-width: 768px) 100vw',
    tablet: '(max-width: 1024px) 50vw',
    desktop: '25vw'
  }
};
```

### Bundle Optimization
- **Dynamic Imports**: Code splitting for non-critical components
- **Tree Shaking**: Remove unused code
- **Compression**: Gzip/Brotli compression
- **CDN**: Static asset delivery via CDN

## Security Considerations

### Data Protection
- **Form Validation**: Client and server-side validation
- **CSRF Protection**: Next.js built-in protection
- **Rate Limiting**: Prevent form spam
- **Input Sanitization**: Clean user inputs

### Privacy Compliance
- **GDPR**: Basic privacy policy (if applicable)
- **CCPA**: California privacy compliance (if applicable)
- **Cookie Policy**: Minimal cookie usage

## Monitoring and Maintenance

### Error Tracking (Future)
- **Sentry**: Error monitoring and alerting
- **LogRocket**: Session replay for debugging

### Performance Monitoring
- **Web Vitals**: Core Web Vitals tracking
- **Lighthouse CI**: Automated performance testing
- **Bundle Analyzer**: Monitor bundle size

### Backup Strategy
- **Code**: Git repository backup
- **Content**: Regular export of dynamic content
- **Database**: Backup strategy for future data storage

This technical context provides the foundation for reliable, scalable, and maintainable development of the Fermanis & Sons Lawncare website. 