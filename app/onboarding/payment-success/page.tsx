'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle, Loader2 } from 'lucide-react'
import AuthGuard from '@/components/auth/authguard'
import { toast } from 'react-hot-toast'

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const sessionId = searchParams.get('session_id')
        
        if (!sessionId) {
          setError('Missing session ID')
          setLoading(false)
          return
        }
        
        // Call API to verify payment
        const response = await fetch('/api/stripe/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify({ sessionId })
        })
        
        const data = await response.json()
        
        if (data.success) {
          toast.success('Payment successful! Your subscription is now active.')
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            router.push('/app/dashboard')
          }, 3000)
        } else {
          setError(data.message || 'Failed to verify payment')
        }
      } catch (error: any) {
        console.error('Error verifying payment:', error)
        setError('An error occurred while verifying your payment')
      } finally {
        setLoading(false)
      }
    }
    
    verifyPayment()
  }, [router, searchParams])

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Verifying your payment...
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-center">
                Please wait while we confirm your subscription
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Payment Verification Failed
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-center">
                {error}
              </p>
              <button
                onClick={() => router.push('/onboarding/subscription-plans')}
                className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Return to Subscription Plans
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Payment Successful!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-center">
                Thank you for your subscription. Your account has been upgraded successfully.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4 text-center">
                You will be redirected to the dashboard in a few seconds...
              </p>
              <button
                onClick={() => router.push('/app/dashboard')}
                className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
