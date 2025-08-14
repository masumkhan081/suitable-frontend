'use client';

import { useRouter } from 'next/navigation';
import { XCircle, ArrowLeft, RefreshCw, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-100 dark:from-gray-900 dark:via-red-900/20 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Cancel Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          {/* Cancel Icon */}
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
            <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Payment Cancelled
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            No worries! Your payment was cancelled and no charges were made to your account.
          </p>

          {/* Information Box */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <p className="font-medium mb-2">What happens next?</p>
              <ul className="text-left space-y-1">
                <li>• You can continue using the free Basic plan</li>
                <li>• Your account remains active with basic features</li>
                <li>• You can upgrade anytime from your profile</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => router.back()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center group"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>

            <Link
              href="/onboarding/subscription-plans"
              className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              View Plans Again
            </Link>

            <Link
              href="/dashboard"
              className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Continue with Free Plan
            </Link>
          </div>

          {/* Support Section */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 mb-3">
              <MessageCircle className="w-4 h-4 mr-2" />
              <span>Need assistance?</span>
            </div>
            <div className="space-y-2">
              <Link 
                href="/contact-us" 
                className="block text-purple-600 dark:text-purple-400 hover:underline text-sm"
              >
                Contact our support team
              </Link>
              <Link 
                href="/dashboard/settings/faq" 
                className="block text-purple-600 dark:text-purple-400 hover:underline text-sm"
              >
                View frequently asked questions
              </Link>
            </div>
          </div>
        </div>

        {/* Islamic Quote */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            "And Allah is the best of planners" - Quran 8:30
          </p>
        </div>
      </div>
    </div>
  );
}
