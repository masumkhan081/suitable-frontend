'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import CustomButton from '../custom/CustomButton'
import CustomLink from '../custom/CustomLink'
import { AuthService } from '@/services/authService'

export default function VerifyEmail() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') || ''
  
  // states
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  //

  // Auto-verify when component mounts if token is present
  useEffect(() => {
    if (token && !isVerified && !isLoading) {
      handleVerification()
    }
  }, [token])

  const handleVerification = async () => {
    if (!token) {
      setErrorMessage('Invalid or missing verification token. Please try signing up again.')
      return
    }

    setIsLoading(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      // Call API
      const response = await AuthService.verifyEmail({ token })
      
      if (response.success) {
        setIsVerified(true)
        setSuccessMessage(response.message || 'Email verified successfully! Redirecting to sign in...')
        // Store token if provided
        if (response.data?.token) {
          localStorage.setItem('authToken', response.data.token)
        }
        // Redirect to sign-in after a delay
        setTimeout(() => {
          router.push('/auth/sign-in')
        }, 3000)
      } else {
        // Handle backend error response format: { success: false, error: { message: "..." } }
        const errorMsg = response.error?.message || response.message || 'Verification failed. Please try again.'
        setErrorMessage(errorMsg)
      }
    } catch (error: any) {
      console.error('Email verification error:', error)
      // Handle network or other errors
      const errorMsg = error.error?.message || error.message || 'An error occurred. Please try again.'
      setErrorMessage(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendVerificationEmail = async () => {
    const email = searchParams.get('email')
    if (!email) {
      setErrorMessage('Email not found. Please try signing up again.')
      return
    }

    setIsResending(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const response = await AuthService.resendVerificationEmail(email)
      
      if (response.success) {
        setSuccessMessage(response.message || 'Verification email resent successfully! Please check your email.')
      } else {
        const errorMsg = response.error?.message || response.message || 'Failed to resend verification email. Please try again.'
        setErrorMessage(errorMsg)
      }
    } catch (error: any) {
      console.error('Resend verification email error:', error)
      const errorMsg = error.error?.message || error.message || 'An error occurred. Please try again.'
      setErrorMessage(errorMsg)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {isLoading ? 'Verifying Your Email...' : isVerified ? 'Email Verified!' : 'Email Verification'}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isLoading 
            ? 'Please wait while we verify your email address.' 
            : isVerified 
            ? 'Your email has been successfully verified.' 
            : token 
            ? 'Verifying your email address...' 
            : 'Invalid or missing verification link.'}
        </p>
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="p-3 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-md text-green-700 dark:text-green-300 text-sm">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-md text-red-700 dark:text-red-300 text-sm">
          {errorMessage}
        </div>
      )}

      {/* Retry Button - only show if there's an error and not currently loading */}
      {errorMessage && !isLoading && token && (
        <CustomButton
          styleKey="authForm"
          txt="Retry Verification"
          type="button"
          onClick={() => handleVerification()}
        />
      )}

      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Need help?
        </p>
        <button
          type="button"
          disabled={isResending}
          onClick={handleResendVerificationEmail}
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline disabled:opacity-50"
        >
          {isResending ? "Sending..." : "Resend Verification Link"}
        </button>
      </div>

      <p className="flex gap-2 items-center justify-center">
        <span className="text-sm text-gray-600">Already verified?</span>
        <CustomLink href="/auth/sign-in" txt="Sign in here" />
      </p>
    </div>
  )
}
