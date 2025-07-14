import React from 'react'
import { cn } from '../../lib/utils/formatting'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined'
  hover?: boolean
  children: React.ReactNode
}

export function Card({
  variant = 'default',
  hover = false,
  className,
  children,
  ...props
}: CardProps) {
  const baseStyles = 'rounded-lg bg-white'
  
  const variants = {
    default: 'border border-gray-200 shadow-sm',
    elevated: 'shadow-md border border-gray-100',
    outlined: 'border-2 border-gray-300 shadow-none'
  }
  
  const hoverStyles = hover ? 'hover:shadow-lg transition-shadow duration-200' : ''
  
  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        hoverStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn('px-6 py-4 border-b border-gray-100', className)}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export function CardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn('text-lg font-semibold text-gray-900', className)}
      {...props}
    >
      {children}
    </h3>
  )
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div
      className={cn('px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={cn('px-6 py-4 border-t border-gray-100', className)}
      {...props}
    >
      {children}
    </div>
  )
} 