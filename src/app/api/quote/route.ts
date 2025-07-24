import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { QuoteRequestSchema, type QuoteRequest } from '../../../lib/schemas/quote'
import { getActiveServices } from '../../../lib/data/services'
import { type Service } from '../../../lib/schemas/service'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    console.log('API Route: Starting quote request processing...')
    
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('API Route: RESEND_API_KEY environment variable not set')
      return NextResponse.json(
        { error: 'Email service not configured. Please set RESEND_API_KEY in environment variables.' },
        { status: 500 }
      )
    }

    if (process.env.RESEND_API_KEY === 're_placeholder_key_here') {
      console.error('API Route: RESEND_API_KEY is still using placeholder value')
      return NextResponse.json(
        { error: 'Email service not configured. Please replace placeholder API key with actual Resend API key.' },
        { status: 500 }
      )
    }

    const body = await request.json()
    console.log('API Route: Received form data:', JSON.stringify(body, null, 2))
    
    // Validate the request data
    const result = QuoteRequestSchema.safeParse(body)
    if (!result.success) {
      console.error('API Route: Validation failed:', result.error.issues)
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.issues },
        { status: 400 }
      )
    }

    const quoteData: QuoteRequest = result.data
    const allServices = getActiveServices()
    
    // Find selected additional services
    const selectedServices = allServices.filter(service => 
      quoteData.additionalServices?.includes(service.id)
    )

    console.log('API Route: Creating email content...')
    // Create email content
    const emailContent = createEmailContent(quoteData, selectedServices)
    
    console.log('API Route: Sending business notification email...')
    // Send email to business (using verified email address for testing)
    const businessEmailResult = await resend.emails.send({
      from: 'onboarding@resend.dev', // Using Resend's default verified domain for testing
      to: ['zacfermanis@gmail.com'], // Using verified email address for testing
      subject: `🏡 New Quote Request from ${quoteData.customerName} (Business Copy)`,
      html: emailContent.businessEmail,
    })
    console.log('API Route: Business email result:', businessEmailResult)

    // Check if business email failed
    if (businessEmailResult.error) {
      console.error('API Route: Business email failed:', businessEmailResult.error)
      throw new Error(`Business email failed: ${businessEmailResult.error.message}`)
    }

    console.log('API Route: Sending customer confirmation email...')
    // Send confirmation email to customer (using verified email address for testing)
    const customerEmailResult = await resend.emails.send({
      from: 'onboarding@resend.dev', // Using Resend's default verified domain for testing
      to: ['zacfermanis@gmail.com'], // Using verified email address for testing
      subject: `✅ Quote Confirmation for ${quoteData.customerName} (Customer Copy)`,
      html: emailContent.customerEmail,
    })
    console.log('API Route: Customer email result:', customerEmailResult)

    // Check if customer email failed
    if (customerEmailResult.error) {
      console.error('API Route: Customer email failed:', customerEmailResult.error)
      throw new Error(`Customer email failed: ${customerEmailResult.error.message}`)
    }

    console.log('API Route: Successfully sent both emails')
    return NextResponse.json({ 
      success: true, 
      message: 'Quote request submitted successfully',
      debug: {
        businessEmailId: businessEmailResult.data?.id || 'sent',
        customerEmailId: customerEmailResult.data?.id || 'sent'
      }
    })

  } catch (error) {
    console.error('API Route: Failed to process quote request:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Failed to process quote request'
    if (error instanceof Error) {
      errorMessage = error.message
      console.error('API Route: Error details:', error.stack)
    }
    
    return NextResponse.json(
      { error: errorMessage, type: 'email_service_error' },
      { status: 500 }
    )
  }
}

function createEmailContent(quoteData: QuoteRequest, selectedServices: Service[]) {
  const propertySize = {
    small: 'Small (< 1/4 acre)',
    medium: 'Medium (1/4 - 1/2 acre)', 
    large: 'Large (1/2 - 1 acre)',
    xlarge: 'Extra Large (> 1 acre)'
  }[quoteData.propertySize] || quoteData.propertySize

  const serviceType = {
    basic: 'Basic Maintenance',
    premium: 'Premium Care Package',
    custom: 'Custom Service Package'
  }[quoteData.serviceType] || quoteData.serviceType

  const urgency = {
    asap: 'ASAP',
    this_week: 'This week',
    next_week: 'Next week',
    flexible: 'Flexible timing'
  }[quoteData.urgency] || quoteData.urgency

  const businessEmail = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #22c55e; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .section { margin-bottom: 20px; }
        .label { font-weight: bold; color: #16a34a; }
        .value { margin-left: 10px; }
        .services-list { background: #f0f9ff; padding: 15px; border-radius: 5px; }
        .urgent { background: #fef2f2; border-left: 4px solid #ef4444; padding: 10px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>New Quote Request</h1>
        <p>Fermanis & Sons Lawncare</p>
      </div>
      
      <div class="content">
        ${quoteData.urgency === 'asap' ? '<div class="urgent"><strong>🚨 URGENT REQUEST - ASAP Service Needed</strong></div>' : ''}
        
                 <div class="section">
           <h2>Customer Information</h2>
           <p><span class="label">Name:</span><span class="value">${quoteData.customerName}</span></p>
           <p><span class="label">Email:</span><span class="value">${quoteData.email}</span></p>
           <p><span class="label">Phone:</span><span class="value">${quoteData.phone}</span></p>
           <p><span class="label">Address:</span><span class="value">${quoteData.address}</span></p>
         </div>

        <div class="section">
          <h2>Service Details</h2>
          <p><span class="label">Service Type:</span><span class="value">${serviceType}</span></p>
          <p><span class="label">Property Size:</span><span class="value">${propertySize}</span></p>
          <p><span class="label">Urgency:</span><span class="value">${urgency}</span></p>
        </div>

        ${selectedServices.length > 0 ? `
        <div class="section">
          <h2>Additional Services Requested</h2>
          <div class="services-list">
            ${selectedServices.map(service => `<p>• ${service.name}</p>`).join('')}
          </div>
        </div>
        ` : ''}

        <div class="section">
          <h2>Contact Preferences</h2>
          <p><span class="label">Preferred Contact:</span><span class="value">${quoteData.preferredContactMethod}</span></p>
          <p><span class="label">Best Call Time:</span><span class="value">${quoteData.preferredCallTime}</span></p>
        </div>

                 ${quoteData.message ? `
         <div class="section">
           <h2>Additional Notes</h2>
           <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${quoteData.message}</p>
         </div>
         ` : ''}

         <div class="section" style="background: #22c55e; color: white; padding: 15px; border-radius: 5px; text-align: center;">
           <h3>Next Steps</h3>
           <p>Contact ${quoteData.customerName} within 24 hours via ${quoteData.preferredContactMethod}</p>
           <p><strong>Phone:</strong> ${quoteData.phone} | <strong>Email:</strong> ${quoteData.email}</p>
         </div>
      </div>
    </body>
    </html>
  `

  const customerEmail = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #22c55e; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .section { margin-bottom: 20px; }
        .highlight { background: #f0f9ff; padding: 15px; border-radius: 5px; border-left: 4px solid #22c55e; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Thank You for Your Quote Request!</h1>
        <p>Fermanis & Sons Lawncare</p>
      </div>
      
             <div class="content">
         <p>Hi ${quoteData.customerName},</p>
        
        <p>Thank you for choosing Fermanis & Sons Lawncare! We've received your quote request and are excited to help transform your lawn in the 12 Oaks neighborhood.</p>

        <div class="highlight">
          <h3>What happens next?</h3>
          <p>• We'll contact you within 24 hours via ${quoteData.preferredContactMethod}</p>
          <p>• We'll discuss your specific needs and provide a detailed quote</p>
          <p>• If you approve, we'll schedule your service at your convenience</p>
        </div>

        <div class="section">
          <h3>Your Request Summary</h3>
          <p><strong>Service Type:</strong> ${serviceType}</p>
          <p><strong>Property Size:</strong> ${propertySize}</p>
          <p><strong>Timing:</strong> ${urgency}</p>
          ${selectedServices.length > 0 ? `<p><strong>Additional Services:</strong> ${selectedServices.map(s => s.name).join(', ')}</p>` : ''}
        </div>

        <div class="section">
          <h3>Why Choose Fermanis & Sons?</h3>
          <p>🏠 <strong>Family-Operated:</strong> Teaching our sons work ethic and quality service</p>
          <p>🌱 <strong>Professional-Grade:</strong> We use only the best products for superior results</p>
          <p>📍 <strong>Local Focus:</strong> Dedicated to serving the 12 Oaks neighborhood</p>
          <p>💪 <strong>Personal Attention:</strong> Every lawn gets our full care and attention</p>
        </div>

        <div class="section">
          <h3>Questions? Contact Us Anytime</h3>
          <p><strong>Email:</strong> fermanisandsonslawncare@gmail.com</p>
        </div>

        <p>Thank you for supporting our family business!</p>
        
        <p>Best regards,<br>
        The Fermanis Family<br>
        Fermanis & Sons Lawncare</p>
      </div>
    </body>
    </html>
  `

  return { businessEmail, customerEmail }
} 