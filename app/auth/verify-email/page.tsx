import React from 'react'
import VerifyEmail from '@/components/auth/VerifyEmail'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
          <VerifyEmail />
        </div>
      </div>
    </div>
  )
}
