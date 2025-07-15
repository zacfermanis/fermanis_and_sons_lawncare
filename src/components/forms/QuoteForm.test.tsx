import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QuoteForm } from './QuoteForm'

// Mock Next.js router
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: (key: string) => key === 'service' ? 'lawn-mowing' : null,
  }),
}))

describe('QuoteForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Form Rendering', () => {
    it('renders all required form fields', () => {
      render(<QuoteForm />)
      
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/address/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/service type/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/property size/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/preferred contact/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/call time/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/urgency/i)).toBeInTheDocument()
    })

    it('renders submit button', () => {
      render(<QuoteForm />)
      expect(screen.getByRole('button', { name: /request quote/i })).toBeInTheDocument()
    })

    it('displays proper form title and description', () => {
      render(<QuoteForm />)
      expect(screen.getByText(/tell us about your property/i)).toBeInTheDocument()
      expect(screen.getByText(/we'll provide a personalized quote/i)).toBeInTheDocument()
    })
  })

  describe('Form Validation', () => {
    it('shows validation errors for required fields when form is submitted empty', async () => {
      const user = userEvent.setup()
      render(<QuoteForm />)
      
      const submitButton = screen.getByRole('button', { name: /request quote/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument()
        expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument()
        expect(screen.getByText(/please enter a 10-digit phone number/i)).toBeInTheDocument()
        expect(screen.getByText(/please enter a valid address/i)).toBeInTheDocument()
      })
    })

    it('validates email format', async () => {
      const user = userEvent.setup()
      render(<QuoteForm />)
      
      const emailField = screen.getByLabelText(/email/i)
      await user.type(emailField, 'invalid-email')
      
      const submitButton = screen.getByRole('button', { name: /request quote/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument()
      })
    })

    it('validates phone number format', async () => {
      const user = userEvent.setup()
      render(<QuoteForm />)
      
      const phoneField = screen.getByLabelText(/phone/i)
      await user.type(phoneField, '123')
      
      const submitButton = screen.getByRole('button', { name: /request quote/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/please enter a 10-digit phone number/i)).toBeInTheDocument()
      })
    })

    it('accepts valid phone number formats', async () => {
      const user = userEvent.setup()
      render(<QuoteForm />)
      
      const phoneField = screen.getByLabelText(/phone/i)
      await user.type(phoneField, '2072324106')
      
      // Should not show validation error
      const submitButton = screen.getByRole('button', { name: /request quote/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.queryByText(/please enter a 10-digit phone number/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('Form Interaction', () => {
    it('allows users to fill out all form fields', async () => {
      const user = userEvent.setup()
      render(<QuoteForm />)
      
      await user.type(screen.getByLabelText(/name/i), 'John Smith')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/phone/i), '2072324106')
      await user.type(screen.getByLabelText(/address/i), '123 Oak Street, Holly Springs')
      
      await user.selectOptions(screen.getByLabelText(/service type/i), 'basic')
      await user.selectOptions(screen.getByLabelText(/property size/i), 'medium')
      await user.selectOptions(screen.getByLabelText(/preferred contact/i), 'email')
      await user.selectOptions(screen.getByLabelText(/call time/i), 'morning')
      await user.selectOptions(screen.getByLabelText(/urgency/i), 'this_week')
      
      expect(screen.getByDisplayValue('John Smith')).toBeInTheDocument()
      expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument()
      expect(screen.getByDisplayValue('2072324106')).toBeInTheDocument()
      expect(screen.getByDisplayValue('123 Oak Street, Holly Springs')).toBeInTheDocument()
    })

    it('shows loading state when form is being submitted', async () => {
      const user = userEvent.setup()
      render(<QuoteForm />)
      
      // Fill out valid form
      await user.type(screen.getByLabelText(/name/i), 'John Smith')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/phone/i), '2072324106')
      await user.type(screen.getByLabelText(/address/i), '123 Oak Street, Holly Springs')
      
      const submitButton = screen.getByRole('button', { name: /request quote/i })
      await user.click(submitButton)

      expect(screen.getByText(/submitting/i)).toBeInTheDocument()
    })
  })

  describe('URL Parameters', () => {
    it('pre-selects service type from URL parameter', () => {
      render(<QuoteForm />)
      
      // Should pre-select based on mocked URL parameter
      const serviceSelect = screen.getByLabelText(/service type/i) as HTMLSelectElement
      expect(serviceSelect.value).toBe('basic') // Default value when service is specified
    })
  })

  describe('Additional Services', () => {
    it('allows selection of additional services', async () => {
      const user = userEvent.setup()
      render(<QuoteForm />)
      
      const additionalServicesSection = screen.getByText(/additional services/i).parentElement
      expect(additionalServicesSection).toBeInTheDocument()
      
      // Should have checkboxes for additional services
      const edgingCheckbox = screen.getByLabelText(/edging/i)
      await user.click(edgingCheckbox)
      
      expect(edgingCheckbox).toBeChecked()
    })
  })

  describe('Form Submission', () => {
    it('prevents submission with invalid data', async () => {
      const user = userEvent.setup()
      render(<QuoteForm />)
      
      const submitButton = screen.getByRole('button', { name: /request quote/i })
      await user.click(submitButton)
      
      // Should show validation errors instead of submitting
      await waitFor(() => {
        expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument()
      })
    })

    it('shows success message after successful submission', async () => {
      const user = userEvent.setup()
      render(<QuoteForm />)
      
      // Fill out valid form
      await user.type(screen.getByLabelText(/name/i), 'John Smith')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/phone/i), '2072324106')
      await user.type(screen.getByLabelText(/address/i), '123 Oak Street, Holly Springs')
      
      const submitButton = screen.getByRole('button', { name: /request quote/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/quote request submitted successfully/i)).toBeInTheDocument()
      })
    })
  })

  describe('Responsive Design', () => {
    it('has proper form layout classes for mobile responsiveness', () => {
      render(<QuoteForm />)
      
      const form = screen.getByRole('form')
      expect(form).toHaveClass('space-y-6')
    })
  })

  describe('Accessibility', () => {
    it('has proper form labels and ARIA attributes', () => {
      render(<QuoteForm />)
      
      const nameField = screen.getByLabelText(/name/i)
      expect(nameField).toHaveAttribute('aria-required', 'true')
      
      const emailField = screen.getByLabelText(/email/i)
      expect(emailField).toHaveAttribute('aria-required', 'true')
      
      const phoneField = screen.getByLabelText(/phone/i)
      expect(phoneField).toHaveAttribute('aria-required', 'true')
    })

    it('associates error messages with form fields', async () => {
      const user = userEvent.setup()
      render(<QuoteForm />)
      
      const submitButton = screen.getByRole('button', { name: /request quote/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        const nameField = screen.getByLabelText(/name/i)
        const errorMessage = screen.getByText(/name must be at least 2 characters/i)
        expect(nameField).toHaveAttribute('aria-describedby')
        expect(errorMessage).toHaveAttribute('id')
      })
    })
  })
}) 