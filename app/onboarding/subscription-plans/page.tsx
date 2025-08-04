'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Check, Crown, Heart, Star, ArrowLeft } from 'lucide-react'

export default function SubscriptionPlansPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState('premium')

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      subtitle: 'Start Your Journey',
      price: 0,
      duration: 'Free Forever',
      description: 'Perfect for getting started with basic features',
      features: [
        'Create detailed profile',
        'Browse up to 10 profiles daily',
        'Send 3 messages per day',
        'Basic matching algorithm',
        'Standard customer support'
      ],
      buttonText: 'Start Free',
      popular: false,
      color: 'gray'
    },
    {
      id: 'premium',
      name: 'Premium',
      subtitle: 'Most Popular Choice',
      price: 29.99,
      originalPrice: 39.99,
      duration: 'per month',
      description: 'Enhanced features for serious seekers',
      features: [
        'Everything in Basic',
        'Unlimited profile browsing',
        'Unlimited messaging',
        'Advanced matching filters',
        'See who viewed your profile',
        'Priority customer support',
        'Read message receipts',
        'Boost your profile visibility'
      ],
      buttonText: 'Choose Premium',
      popular: true,
      color: 'purple'
    },
    {
      id: 'vip',
      name: 'VIP',
      subtitle: 'Ultimate Experience',
      price: 49.99,
      originalPrice: 69.99,
      duration: 'per month',
      description: 'Premium features plus exclusive benefits',
      features: [
        'Everything in Premium',
        'VIP badge on your profile',
        'Exclusive VIP member events',
        'Personal matchmaking consultant',
        'Profile verification priority',
        'Advanced privacy controls',
        'Dedicated VIP support line',
        'Early access to new features'
      ],
      buttonText: 'Go VIP',
      popular: false,
      color: 'gold'
    }
  ]

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
  }

  const handleContinue = () => {
    console.log('Selected plan:', selectedPlan)
    // Here you would typically handle payment processing
    router.push('/profile')
  }

  const handleSkip = () => {
    console.log('Skipped subscription selection')
    router.push('/profile')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800">
      {/* Header */}
      <div className="w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-semibold text-gray-800 dark:text-white">Suitable</span>
          </Link>
          <button 
            onClick={handleSkip}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-purple-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Choose Your Plan</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select the plan that best suits your journey to find your perfect match. 
            <span className="text-purple-600 font-medium">"And We created you in pairs"</span> - Al Quran
          </p>
          <div className="mt-6 inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
            <span className="text-green-800 dark:text-green-200 text-sm font-medium">✨ 7-day free trial on all paid plans</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedPlan === plan.id 
                  ? 'ring-2 ring-purple-500 shadow-purple-200 dark:shadow-purple-900/50' 
                  : 'hover:shadow-xl'
              } ${
                plan.popular ? 'border-2 border-purple-500' : 'border border-gray-200 dark:border-gray-700'
              }`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* VIP Crown */}
              {plan.id === 'vip' && (
                <div className="absolute -top-3 -right-3">
                  <Crown className="w-8 h-8 text-yellow-500" />
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">{plan.subtitle}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-6">
                  {plan.price === 0 ? (
                    <div className="text-3xl font-bold text-gray-800 dark:text-white">Free</div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-center">
                        {plan.originalPrice && (
                          <span className="text-lg text-gray-400 line-through mr-2">${plan.originalPrice}</span>
                        )}
                        <span className="text-4xl font-bold text-gray-800 dark:text-white">${plan.price}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{plan.duration}</p>
                      {plan.originalPrice && (
                        <div className="mt-2 inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                          <span className="text-green-800 dark:text-green-200 text-xs font-medium">
                            Save ${(plan.originalPrice - plan.price).toFixed(2)}/month
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Select Button */}
                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    selectedPlan === plan.id
                      ? 'bg-purple-600 text-white'
                      : plan.popular
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {selectedPlan === plan.id ? '✓ Selected' : plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors shadow-lg"
          >
            Continue with {plans.find(p => p.id === selectedPlan)?.name} Plan
          </button>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-4">
            You can change or cancel your plan anytime from your account settings
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center space-x-8 text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Secure Payment</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Cancel Anytime</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
