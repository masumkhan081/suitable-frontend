'use client'

import React from 'react'
import { AlertCircle, X } from 'lucide-react'

interface ProfileVerificationCardProps {
  onDismiss?: () => void
  onVerifyClick?: () => void
}

export default function ProfileVerificationCard({ 
  onDismiss, 
  onVerifyClick 
}: ProfileVerificationCardProps) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              Profile Verification Required
            </h3>
            <p className="text-red-700 dark:text-red-300 text-sm leading-relaxed">
              Dear Sorwar, your profile is currently pending verification, which may take up to 48 
              hours. To complete the process, please{' '}
              <button 
                onClick={onVerifyClick}
                className="font-medium text-red-800 dark:text-red-200 underline hover:no-underline"
              >
                Verify your account
              </button>
              . You will receive a confirmation email once your profile has been approved.
            </p>
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}
