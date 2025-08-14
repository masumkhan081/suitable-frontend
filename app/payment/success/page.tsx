'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight, Crown, Star } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const session_id = searchParams.get('session_id');
    if (session_id) {
      setSessionId(session_id);
      // Here you could verify the payment with your backend
      console.log('Payment session ID:', session_id);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Success Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Payment Successful!
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Welcome to your premium experience. Your subscription is now active.
          </p>

          {/* Features Highlight */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-3">
              <Crown className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
              <span className="font-semibold text-purple-900 dark:text-purple-100">
                Premium Features Unlocked
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-500 mr-2" />
                <span>Unlimited messaging & browsing</span>
              </div>
              <div className="flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-500 mr-2" />
                <span>Advanced matching filters</span>
              </div>
              <div className="flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-500 mr-2" />
                <span>See who viewed your profile</span>
              </div>
            </div>
          </div>

          {/* Session ID (for debugging) */}
          {sessionId && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-6 p-2 bg-gray-50 dark:bg-gray-700 rounded">
              Session: {sessionId.substring(0, 20)}...
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center group"
            >
              Start Matching
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/profile"
              className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Complete Your Profile
            </Link>
          </div>

          {/* Support Link */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need help?{' '}
              <Link href="/contact-us" className="text-purple-600 dark:text-purple-400 hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </div>

        {/* Islamic Quote */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            "And We created you in pairs" - Quran 78:8
          </p>
        </div>
      </div>
    </div>
  );
}
