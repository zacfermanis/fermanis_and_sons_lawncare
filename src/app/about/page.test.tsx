import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AboutPage from './page'

describe('AboutPage', () => {
  it('should render the main heading', () => {
    render(<AboutPage />)
    
    const mainHeading = screen.getByRole('heading', { name: /our family story/i })
    expect(mainHeading).toBeInTheDocument()
  })

  it('should render the family story section', () => {
    render(<AboutPage />)
    
    const familyStoryHeading = screen.getByRole('heading', { name: /a father's legacy/i })
    expect(familyStoryHeading).toBeInTheDocument()
  })

  it('should render the values section', () => {
    render(<AboutPage />)
    
    const valuesHeading = screen.getByRole('heading', { name: /our values/i })
    expect(valuesHeading).toBeInTheDocument()
  })

  it('should display family business values', () => {
    render(<AboutPage />)
    
    expect(screen.getByText(/hard work and dedication to every job/i)).toBeInTheDocument()
    expect(screen.getByText(/reliability - we show up when we say we will/i)).toBeInTheDocument()
    expect(screen.getByText(/quality craftsmanship with professional-grade products/i)).toBeInTheDocument()
    expect(screen.getByText(/teaching the next generation strong work ethic/i)).toBeInTheDocument()
    expect(screen.getByText(/building trust with our neighborhood community/i)).toBeInTheDocument()
  })

  it('should render the why choose us section', () => {
    render(<AboutPage />)
    
    const whyChooseHeading = screen.getByRole('heading', { name: /why choose a family business\?/i })
    expect(whyChooseHeading).toBeInTheDocument()
  })

  it('should display the three main benefits', () => {
    render(<AboutPage />)
    
    expect(screen.getByText(/personal accountability/i)).toBeInTheDocument()
    expect(screen.getByText(/neighborhood focus/i)).toBeInTheDocument()
    expect(screen.getByText(/professional quality/i)).toBeInTheDocument()
  })

  it('should render the teaching values section', () => {
    render(<AboutPage />)
    
    const teachingHeading = screen.getByRole('heading', { name: /teaching the next generation/i })
    expect(teachingHeading).toBeInTheDocument()
  })

  it('should display what we are teaching', () => {
    render(<AboutPage />)
    
    expect(screen.getByText(/the importance of showing up on time, every time/i)).toBeInTheDocument()
    expect(screen.getByText(/how to take pride in a job well done/i)).toBeInTheDocument()
    expect(screen.getByText(/the value of building trust with customers/i)).toBeInTheDocument()
    expect(screen.getByText(/why quality work leads to repeat business/i)).toBeInTheDocument()
    expect(screen.getByText(/how to handle challenges with professionalism/i)).toBeInTheDocument()
  })

  it('should display what this means for customers', () => {
    render(<AboutPage />)
    
    expect(screen.getByText(/consistent, reliable service you can count on/i)).toBeInTheDocument()
    expect(screen.getByText(/attention to detail that comes from personal pride/i)).toBeInTheDocument()
    expect(screen.getByText(/professional communication and problem-solving/i)).toBeInTheDocument()
    expect(screen.getByText(/long-term relationships built on trust/i)).toBeInTheDocument()
    expect(screen.getByText(/supporting a local family business in your community/i)).toBeInTheDocument()
  })

  it('should render the service area section', () => {
    render(<AboutPage />)
    
    const serviceAreaHeading = screen.getByRole('heading', { name: /proudly serving 12 oaks/i })
    expect(serviceAreaHeading).toBeInTheDocument()
  })

  it('should display why we focus on 12 Oaks', () => {
    render(<AboutPage />)
    
    expect(screen.getByText(/local knowledge/i)).toBeInTheDocument()
    expect(screen.getByText(/community connection/i)).toBeInTheDocument()
    expect(screen.getByText(/reliable availability/i)).toBeInTheDocument()
    expect(screen.getByText(/word-of-mouth growth/i)).toBeInTheDocument()
  })

  it('should render call-to-action buttons', () => {
    render(<AboutPage />)
    
    const quoteButton = screen.getByRole('button', { name: /get your free quote/i })
    
    expect(quoteButton).toBeInTheDocument()
  })

  it('should include the family story content', () => {
    render(<AboutPage />)
    
    expect(screen.getByText(/fermanis & sons lawncare isn't just a business/i)).toBeInTheDocument()
    expect(screen.getByText(/as a father, i believe in teaching my two sons/i)).toBeInTheDocument()
    expect(screen.getByText(/we're proud to serve the 12 oaks neighborhood/i)).toBeInTheDocument()
  })

  it('should emphasize the family business aspect', () => {
    render(<AboutPage />)
    
    expect(screen.getByText(/you're choosing a family that cares about your property/i)).toBeInTheDocument()
    expect(screen.getByText(/we're not a big corporation/i)).toBeInTheDocument()
    expect(screen.getByText(/we're your neighbors in 12 oaks/i)).toBeInTheDocument()
  })
}) 