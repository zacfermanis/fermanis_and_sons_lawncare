import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card'

describe('Card Components', () => {
  describe('Card Container', () => {
    it('should render with default props', () => {
      render(<Card>Card content</Card>)
      const card = screen.getByText('Card content')
      expect(card).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      render(<Card className="custom-class">Card content</Card>)
      const card = screen.getByText('Card content').closest('div')
      expect(card).toHaveClass('custom-class')
    })

    it('should render with elevated variant', () => {
      render(<Card variant="elevated">Elevated card</Card>)
      const card = screen.getByText('Elevated card').closest('div')
      expect(card).toHaveClass('shadow-md')
    })

    it('should render with outlined variant', () => {
      render(<Card variant="outlined">Outlined card</Card>)
      const card = screen.getByText('Outlined card').closest('div')
      expect(card).toHaveClass('border-2')
    })

    it('should render with hover effect', () => {
      render(<Card hover>Hover card</Card>)
      const card = screen.getByText('Hover card').closest('div')
      expect(card).toHaveClass('hover:shadow-lg')
    })
  })

  describe('CardHeader', () => {
    it('should render card header', () => {
      render(<CardHeader>Header content</CardHeader>)
      const header = screen.getByText('Header content')
      expect(header).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      render(<CardHeader className="custom-header">Header</CardHeader>)
      const header = screen.getByText('Header')
      expect(header).toHaveClass('custom-header')
    })
  })

  describe('CardTitle', () => {
    it('should render card title', () => {
      render(<CardTitle>Card Title</CardTitle>)
      const title = screen.getByText('Card Title')
      expect(title).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      render(<CardTitle className="custom-title">Title</CardTitle>)
      const title = screen.getByText('Title')
      expect(title).toHaveClass('custom-title')
    })

    it('should render as h3 by default', () => {
      render(<CardTitle>Title</CardTitle>)
      const title = screen.getByRole('heading', { level: 3 })
      expect(title).toBeInTheDocument()
    })
  })

  describe('CardContent', () => {
    it('should render card content', () => {
      render(<CardContent>Content text</CardContent>)
      const content = screen.getByText('Content text')
      expect(content).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      render(<CardContent className="custom-content">Content</CardContent>)
      const content = screen.getByText('Content')
      expect(content).toHaveClass('custom-content')
    })
  })

  describe('CardFooter', () => {
    it('should render card footer', () => {
      render(<CardFooter>Footer content</CardFooter>)
      const footer = screen.getByText('Footer content')
      expect(footer).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      render(<CardFooter className="custom-footer">Footer</CardFooter>)
      const footer = screen.getByText('Footer')
      expect(footer).toHaveClass('custom-footer')
    })
  })

  describe('Complete Card Structure', () => {
    it('should render complete card with all components', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Service Title</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Service description goes here.</p>
          </CardContent>
          <CardFooter>
            <button>Learn More</button>
          </CardFooter>
        </Card>
      )

      expect(screen.getByText('Service Title')).toBeInTheDocument()
      expect(screen.getByText('Service description goes here.')).toBeInTheDocument()
      expect(screen.getByText('Learn More')).toBeInTheDocument()
    })

    it('should render service card with features list', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Lawn Mowing</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>Weekly service</li>
              <li>Sharp blades</li>
              <li>Clipping options</li>
            </ul>
          </CardContent>
        </Card>
      )

      expect(screen.getByText('Lawn Mowing')).toBeInTheDocument()
      expect(screen.getByText('Weekly service')).toBeInTheDocument()
      expect(screen.getByText('Sharp blades')).toBeInTheDocument()
      expect(screen.getByText('Clipping options')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Main Title</CardTitle>
          </CardHeader>
        </Card>
      )

      const title = screen.getByRole('heading', { level: 3 })
      expect(title).toHaveTextContent('Main Title')
    })

    it('should support custom ARIA attributes', () => {
      render(
        <Card aria-label="Service card">
          <CardContent>Content</CardContent>
        </Card>
      )

      const card = screen.getByLabelText('Service card')
      expect(card).toBeInTheDocument()
    })
  })
}) 