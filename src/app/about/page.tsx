import React from 'react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'

export const metadata = {
  title: 'About Us - Fermanis & Sons Lawncare | 12 Oaks Holly Springs',
  description: 'Meet the Fermanis family - a father teaching his two sons the value of hard work and quality service in the 12 Oaks neighborhood of Holly Springs.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Family Story
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8">
              Teaching the next generation the value of hard work, quality service, and pride in a job well done
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Get Free Quote
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-700">
                View Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Family Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  A Father&apos;s Legacy
                </h2>
                <div className="space-y-4 text-lg text-gray-700">
                  <p>
                                         Fermanis & Sons Lawncare isn&apos;t just a business—it&apos;s a family tradition. 
                                         As a father, I believe in teaching my two sons (both turning 13) the 
                     fundamental values that built this country: hard work, reliability, 
                     and pride in quality craftsmanship.
                   </p>
                   <p>
                     Every job we take on is an opportunity to demonstrate what it means 
                     to be a professional, to show up when we say we will, and to leave 
                     every property better than we found it. This isn&apos;t just about 
                     cutting grass—it&apos;s about building character.
                   </p>
                   <p>
                     We&apos;re proud to serve the 12 Oaks neighborhood of Holly Springs, 
                     where we&apos;ve built relationships with families who appreciate the 
                     personal touch that only a family business can provide.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-green-100 rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-green-800 mb-4">
                    Our Values
                  </h3>
                  <ul className="space-y-3 text-green-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3">✓</span>
                      <span>Hard work and dedication to every job</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3">✓</span>
                      <span>Reliability - we show up when we say we will</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3">✓</span>
                      <span>Quality craftsmanship with professional-grade products</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3">✓</span>
                      <span>Teaching the next generation strong work ethic</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3">✓</span>
                      <span>Building trust with our neighborhood community</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose a Family Business?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                 When you choose Fermanis & Sons, you&apos;re choosing more than just lawn care—you&apos;re choosing a family that cares about your property as if it were our own.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👨‍👦‍👦</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Personal Accountability
                  </h3>
                  <p className="text-gray-600">
                    As a family business, every job reflects directly on our name. 
                    We take personal responsibility for the quality of our work.
                  </p>
                </div>
              </Card>

              <Card>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Neighborhood Focus
                  </h3>
                  <p className="text-gray-600">
                                         We&apos;re not a big corporation—we&apos;re your neighbors in 12 Oaks. 
                    We understand the unique needs of our community.
                  </p>
                </div>
              </Card>

              <Card>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Professional Quality
                  </h3>
                  <p className="text-gray-600">
                    We use premium professional-grade products and equipment, 
                    including reel mowers for the cleanest cuts possible.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Values Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Teaching the Next Generation
              </h2>
              <p className="text-xl text-gray-600">
                Every job is a lesson in responsibility, quality, and customer service
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  What We&apos;re Teaching
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">•</span>
                    <span>The importance of showing up on time, every time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">•</span>
                    <span>How to take pride in a job well done</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">•</span>
                    <span>The value of building trust with customers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">•</span>
                    <span>Why quality work leads to repeat business</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">•</span>
                    <span>How to handle challenges with professionalism</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  What This Means for You
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">•</span>
                    <span>Consistent, reliable service you can count on</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">•</span>
                    <span>Attention to detail that comes from personal pride</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">•</span>
                    <span>Professional communication and problem-solving</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">•</span>
                    <span>Long-term relationships built on trust</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">•</span>
                    <span>Supporting a local family business in your community</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Proudly Serving 12 Oaks
            </h2>
            <p className="text-xl text-gray-600 mb-8">
                                   We&apos;re focused on serving our neighborhood with the personal attention 
                     and quality service that only a local family business can provide.
            </p>
            
            <div className="bg-green-50 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                Why We Focus on 12 Oaks
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-bold text-green-700 mb-2">Local Knowledge</h4>
                  <p className="text-green-600">
                    We understand the unique characteristics and needs of lawns in our neighborhood.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-green-700 mb-2">Community Connection</h4>
                  <p className="text-green-600">
                    Building lasting relationships with families who appreciate quality service.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-green-700 mb-2">Reliable Availability</h4>
                  <p className="text-green-600">
                    After-school and weekend scheduling that works for busy families.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-green-700 mb-2">Word-of-Mouth Growth</h4>
                  <p className="text-green-600">
                    Growing our business through satisfied customers and neighborhood referrals.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Get Your Free Quote
              </Button>
              <Button variant="outline" size="lg">
                Call Us: 207-232-4106
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 