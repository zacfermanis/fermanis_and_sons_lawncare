import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ContactPage from './page'

describe('ContactPage', () => {
  it('should render the main heading', () => {
    render(<ContactPage />)
    
    const mainHeading = screen.getByRole('heading', { name: /get in touch/i })
    expect(mainHeading).toBeInTheDocument()
  })

  it('should render the contact form section', () => {
    render(<ContactPage />)
    
    const formHeading = screen.getByRole('heading', { name: /send us a message/i })
    expect(formHeading).toBeInTheDocument()
  })

  it('should render all form fields', () => {
    render(<ContactPage />)
    
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('should render the send message button', () => {
    render(<ContactPage />)
    
    const sendButton = screen.getByRole('button', { name: /send message/i })
    expect(sendButton).toBeInTheDocument()
  })

  it('should render the other ways to reach us section', () => {
    render(<ContactPage />)
    
    const sectionHeading = screen.getByRole('heading', { name: /other ways to reach us/i })
    expect(sectionHeading).toBeInTheDocument()
  })

  it('should display phone contact information', () => {
    render(<ContactPage />)
    
    expect(screen.getByText(/call us directly/i)).toBeInTheDocument()
  })

  it('should display email contact information', () => {
    render(<ContactPage />)
    
    expect(screen.getByText(/email us/i)).toBeInTheDocument()
    expect(screen.getByText(/fermanisandsonslawncare@gmail.com/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /fermanisandsonslawncare@gmail.com/i })).toHaveAttribute('href', 'mailto:fermanisandsonslawncare@gmail.com')
  })

  it('should display service area information', () => {
    render(<ContactPage />)
    
    expect(screen.getByText(/12 oaks neighborhood of holly springs/i)).toBeInTheDocument()
    expect(screen.getByText(/currently accepting new customers in 12 oaks/i)).toBeInTheDocument()
  })

  it('should display business hours information', () => {
    render(<ContactPage />)
    
    expect(screen.getByText(/when we're available/i)).toBeInTheDocument()
    expect(screen.getByText(/phone calls:/i)).toBeInTheDocument()
    expect(screen.getByText(/email:/i)).toBeInTheDocument()
    expect(screen.getByText(/service hours:/i)).toBeInTheDocument()
  })

  it('should render the FAQ section', () => {
    render(<ContactPage />)
    
    const faqHeading = screen.getByRole('heading', { name: /frequently asked questions/i })
    expect(faqHeading).toBeInTheDocument()
  })

  it('should display FAQ questions', () => {
    render(<ContactPage />)
    
    expect(screen.getByText(/how quickly do you respond to messages\?/i)).toBeInTheDocument()
    expect(screen.getByText(/do you service areas outside 12 oaks\?/i)).toBeInTheDocument()
    expect(screen.getByText(/what if i have an urgent lawn care need\?/i)).toBeInTheDocument()
    expect(screen.getByText(/can i schedule a consultation\?/i)).toBeInTheDocument()
    expect(screen.getByText(/do you offer emergency services\?/i)).toBeInTheDocument()
    expect(screen.getByText(/what information should i include in my message\?/i)).toBeInTheDocument()
  })

  it('should display FAQ answers', () => {
    render(<ContactPage />)
    
    expect(screen.getByText(/we typically respond to all messages within 24 hours/i)).toBeInTheDocument()
    expect(screen.getByText(/we currently focus on the 12 oaks neighborhood/i)).toBeInTheDocument()
    expect(screen.getByText(/we're happy to come out and discuss your lawn care needs/i)).toBeInTheDocument()
    expect(screen.getByText(/we can often accommodate urgent requests/i)).toBeInTheDocument()
    expect(screen.getByText(/include your address, the type of service you need/i)).toBeInTheDocument()
  })

  it('should render the quote redirect section', () => {
    render(<ContactPage />)
    
    expect(screen.getByText(/need a quote instead\?/i)).toBeInTheDocument()
    expect(screen.getByText(/if you're looking for a specific service quote/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /get a free quote/i })).toBeInTheDocument()
  })

  it('should have proper form validation attributes', () => {
    render(<ContactPage />)
    
    const nameInput = screen.getByLabelText(/your name/i)
    const emailInput = screen.getByLabelText(/email address/i)
    const subjectInput = screen.getByLabelText(/subject/i)
    const messageInput = screen.getByLabelText(/message/i)
    
    expect(nameInput).toHaveAttribute('required')
    expect(emailInput).toHaveAttribute('required')
    expect(subjectInput).toHaveAttribute('required')
    expect(messageInput).toHaveAttribute('required')
  })

  it('should have proper input types', () => {
    render(<ContactPage />)
    
    const nameInput = screen.getByLabelText(/your name/i)
    const emailInput = screen.getByLabelText(/email address/i)
    const phoneInput = screen.getByLabelText(/phone number/i)
    const subjectInput = screen.getByLabelText(/subject/i)
    
    expect(nameInput).toHaveAttribute('type', 'text')
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(phoneInput).toHaveAttribute('type', 'tel')
    expect(subjectInput).toHaveAttribute('type', 'text')
  })

  it('should have proper placeholders', () => {
    render(<ContactPage />)
    
    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/enter your phone number/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/what's this about\?/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/tell us what you'd like to know/i)).toBeInTheDocument()
  })
}) 