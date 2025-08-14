'use client'

import { useRouter } from 'next/navigation'
import { XCircle } from 'lucide-react'
import AuthGuard from '@/components/auth/authguard'

export default function PaymentCancelledPage() {
  const router = useRouter()

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex flex-col items-center justify-center py-12">
            <XCircle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Payment Cancelled
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-center">
              Your subscription payment was cancelled. You can try again or choose a different plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => router.push('/onboarding/subscription-plans')}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Return to Plans
              </button>
              <button
                onClick={() => router.push('/app/dashboard')}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
