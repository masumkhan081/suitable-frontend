'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Check, Crown, Heart, Star, ArrowLeft, Loader2 } from 'lucide-react'
import AuthGuard from '@/components/auth/authguard'
import SubscriptionService, { SubscriptionPlan } from '@/services/subscriptionService'
import { toast } from 'react-hot-toast'

// Helper function to get plan color based on type
const getPlanColor = (planType: string) => {
  switch (planType) {
    case 'basic': return 'gray'
    case 'premium': return 'purple'
    case 'vip': return 'gold'
    default: return 'gray'
  }
}

// Helper function to get plan subtitle based on type
const getPlanSubtitle = (planType: string) => {
  switch (planType) {
    case 'basic': return 'Start Your Journey'
    case 'premium': return 'Most Popular Choice'
    case 'vip': return 'Ultimate Experience'
    default: return ''
  }
}

// Helper function to get plan button text based on type
const getPlanButtonText = (planType: string) => {
  switch (planType) {
    case 'basic': return 'Start Free'
    case 'premium': return 'Choose Premium'
    case 'vip': return 'Go VIP'
    default: return 'Select Plan'
  }
}

// Helper to format price display
const formatPrice = (amount: number, currency: string) => {
  if (amount === 0) return 'Free'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: 2
  }).format(amount)
}

export default function SubscriptionPlansPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState('premium')
  const [loading, setLoading] = useState(true)
  const [subscribing, setSubscribing] = useState(false)
  const [plans, setPlans] = useState<Array<SubscriptionPlan & {
    subtitle: string
    description: string
    buttonText: string
    popular: boolean
    color: string
    originalPrice?: number
    duration: string
  }>>([])

  // Fetch subscription plans from API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true)
        const response = await SubscriptionService.getSubscriptionPlans()

        if (response.success && response.data.plans) {
          // Filter to only show monthly plans (3 plans: Basic, Premium, VIP)
          const monthlyPlans = response.data.plans.filter(plan => 
            plan.interval === 'month' || plan.planType === 'basic'
          )
          
          // Transform API data to include UI properties
          const enhancedPlans = monthlyPlans.map(plan => ({
            ...plan,
            subtitle: getPlanSubtitle(plan.planType),
            description: plan.planType === 'basic'
              ? 'Perfect for getting started with basic features'
              : plan.planType === 'premium'
                ? 'Enhanced features for serious seekers'
                : 'Premium features plus exclusive benefits',
            buttonText: getPlanButtonText(plan.planType),
            popular: plan.planType === 'premium',
            color: getPlanColor(plan.planType),
            originalPrice: plan.planType !== 'basic' ? plan.amount * 1.2 : undefined,
            duration: plan.amount === 0 ? 'Free Forever' : `per ${plan.interval}`
          }))

          setPlans(enhancedPlans)

          // Set default selected plan to premium if available
          const premiumPlan = enhancedPlans.find(p => p.planType === 'premium')
          if (premiumPlan) {
            setSelectedPlan(premiumPlan.planType)
          } else if (enhancedPlans.length > 0) {
            setSelectedPlan(enhancedPlans[0].planType)
          }
        } else {
          toast.error('Failed to load subscription plans')
        }
      } catch (error) {
        console.error('Error fetching subscription plans:', error)
        toast.error('Failed to load subscription plans')
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  const handlePlanSelect = (planType: string) => {
    setSelectedPlan(planType)
  }

  const handleContinue = async () => {
    try {
      setSubscribing(true)
      console.log('Creating subscription for plan:', selectedPlan)

      // Get the selected plan details
      const selectedPlanDetails = plans.find(p => p.planType === selectedPlan)
      if (!selectedPlanDetails) {
        toast.error('Selected plan not found')
        setSubscribing(false)
        return
      }

      // Use the subscription service to create subscription
      const result = await SubscriptionService.createSubscription(selectedPlan)
      
      if (result.success) {
        // For free plans, redirect to dashboard
        if (selectedPlanDetails.planType === 'basic' || selectedPlanDetails.amount === 0) {
          toast.success('Free plan activated successfully!')
          router.push('/dashboard')
        }
        // For paid plans, the service will redirect to Stripe Checkout automatically
        else {
          toast.success('Redirecting to payment...')
          // The redirect happens automatically in the service
        }
      } else {
        toast.error(result.message || 'Failed to create subscription')
      }
    } catch (error) {
      console.error('Error creating subscription:', error)
      toast.error('Failed to create subscription')
    } finally {
      setSubscribing(false)
    }
  }

  const handleSkip = () => {
    console.log('Skipped subscription selection')
    router.push('/profile')
  }

  return (
    <AuthGuard>
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
              {!loading && plans.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg max-w-md text-center">
                    <p className="text-yellow-800 dark:text-yellow-200 mb-4">No subscription plans are currently available.</p>
                    <button
                      onClick={handleSkip}
                      className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                    >
                      Continue to Profile
                    </button>
                  </div>
                </div>
              )}
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
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
              <p className="text-gray-600 dark:text-gray-300">Loading subscription plans...</p>
            </div>
          )}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className={`relative rounded-2xl overflow-hidden ${plan.planType === 'premium' ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-gray-100 dark:bg-gray-700'} rounded-2xl shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${selectedPlan === plan.planType
                  ? 'ring-2 ring-purple-500 shadow-purple-200 dark:shadow-purple-900/50'
                  : 'hover:shadow-xl'
                  } ${plan.planType === 'premium' ? 'border-2 border-purple-500' : 'border border-gray-200 dark:border-gray-700'
                  }`}
                onClick={() => handlePlanSelect(plan.planType)}
              >
                {/* Popular Badge */}
                {plan.planType === 'premium' && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* VIP Crown */}
                {plan.planType === 'vip' && (
                  <div className="absolute -top-3 -right-3">
                    <Crown className="w-8 h-8 text-yellow-500" />
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{plan.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{plan.subtitle}</p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-8">
                    {plan.amount === 0 ? (
                      <div>
                        <span className="text-4xl font-bold text-gray-800 dark:text-white">Free</span>
                      </div>
                    ) : (
                      <div>
                        {plan.originalPrice && (
                          <span className="text-gray-500 dark:text-gray-400 line-through text-lg mr-2">
                            ${plan.originalPrice}
                          </span>
                        )}
                        <span className="text-4xl font-bold text-gray-800 dark:text-white">${plan.amount}</span>
                      </div>
                    )}
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{plan.duration}</p>
                    {plan.originalPrice && plan.amount > 0 && (
                      <div className="mt-2 inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <span className="text-green-800 dark:text-green-200 text-xs font-medium">
                          Save ${(plan.originalPrice - plan.amount).toFixed(2)}/{plan.interval}
                        </span>
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
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${selectedPlan === plan.planType
                      ? 'bg-purple-600 text-white'
                      : plan.planType === 'premium'
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    onClick={() => handlePlanSelect(plan.planType)}
                  >
                    {selectedPlan === plan.planType ? '✓ Selected' : plan.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {!loading && plans.length > 0 && (
            /* Continue Button */
            <div className="text-center">
              <button
                onClick={handleContinue}
                disabled={subscribing}
                className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {subscribing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>Continue with {plans.find(p => p.planType === selectedPlan)?.name} Plan</>
                )}
              </button>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-4">
                You can change or cancel your plan anytime from your account settings
              </p>
            </div>
          )}
          {!loading && plans.length > 0 && (
            /* Trust Indicators */
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
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
