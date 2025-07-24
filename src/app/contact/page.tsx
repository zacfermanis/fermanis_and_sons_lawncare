import React from 'react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'

export const metadata = {
  title: 'Contact Us - Fermanis & Sons Lawncare | 12 Oaks Holly Springs',
  description: 'Get in touch with Fermanis & Sons Lawncare. Send us a message or call us directly for lawn care services in the 12 Oaks neighborhood of Holly Springs.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8">
              Have a question? Want to chat about your lawn? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Send Us a Message
                </h2>
                <Card>
                  <div className="p-8">
                    <form className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="Enter your name"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="Enter your email"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="What&apos;s this about?"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="Tell us what you&apos;d like to know..."
                          required
                        ></textarea>
                      </div>

                      <Button variant="primary" size="lg" fullWidth>
                        Send Message
                      </Button>
                    </form>
                  </div>
                </Card>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Other Ways to Reach Us
                </h2>
                
                <div className="space-y-8">
                  {/* Phone Contact */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-2xl">📞</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us Directly</h3>
                        <p className="text-gray-600 mb-3">
                          Prefer to talk? Give us a call and we&apos;ll be happy to chat about your lawn care needs.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Email Contact */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-2xl">✉️</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                        <p className="text-gray-600 mb-3">
                          Send us an email anytime. We typically respond within 24 hours.
                        </p>
                        <a
                          href="mailto:fermanisandsonslawncare@gmail.com"
                          className="text-lg text-green-600 hover:text-green-700 transition-colors break-all"
                        >
                          fermanisandsonslawncare@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Service Area */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-2xl">📍</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Service Area</h3>
                        <p className="text-gray-600 mb-3">
                          We proudly serve the 12 Oaks neighborhood of Holly Springs, NC.
                        </p>
                        <p className="text-green-600 font-medium">
                          Currently accepting new customers in 12 Oaks
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-2xl">🕒</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">When We&apos;re Available</h3>
                        <div className="text-gray-600 space-y-1">
                          <p><strong>Phone Calls:</strong> Anytime - leave a message</p>
                          <p><strong>Email:</strong> 24/7 - we&apos;ll respond within 24 hours</p>
                          <p><strong>Service Hours:</strong> After-school and weekends</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4">
                    Need a Quote Instead?
                  </h3>
                  <p className="text-green-700 mb-4">
                    If you&apos;re looking for a specific service quote, our quote form will get you a faster response.
                  </p>
                  <Button variant="outline" size="lg" fullWidth>
                    Get a Free Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How quickly do you respond to messages?
                  </h3>
                  <p className="text-gray-600">
                    We typically respond to all messages within 24 hours, often much sooner.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Do you service areas outside 12 Oaks?
                  </h3>
                  <p className="text-gray-600">
                    We currently focus on the 12 Oaks neighborhood but may consider nearby areas. Feel free to ask!
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What if I have an urgent lawn care need?
                  </h3>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can I schedule a consultation?
                  </h3>
                  <p className="text-gray-600">
                    Absolutely! We&apos;re happy to come out and discuss your lawn care needs in person.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Do you offer emergency services?
                  </h3>
                  <p className="text-gray-600">
                    We can often accommodate urgent requests depending on our schedule. Call us to discuss.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What information should I include in my message?
                  </h3>
                  <p className="text-gray-600">
                    Include your address, the type of service you need, and any specific concerns about your lawn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 