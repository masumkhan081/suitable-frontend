'use client'
import React, { useState } from 'react'
import CustomButton from '../custom/CustomButton'
import CustomInput from '../custom/CustomInput'
import CustomLink from '../custom/CustomLink'
import { AuthService } from '@/services/authService'

export default function ResetRequest() {
  // states
  const [email, setEmail] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  //
  const initErrors = {
    email: ''
  }
  const [errors, setErrors] = useState(initErrors)
  //

  const handleSubmit = async () => {
    // Reset messages
    setErrors(initErrors)
    setSuccessMessage('')
    setErrorMessage('')
    setIsLoading(true)

    // Simple validation
    if (!email) {
      setErrors({ email: 'Email is required' })
      setIsLoading(false)
      return
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrors({ email: 'Please enter a valid email address' })
      setIsLoading(false)
      return
    }

    try {
      // Call API
      const response = await AuthService.requestAccountRecovery(email)
      
      if (response.success) {
        setSuccessMessage(response.message || 'Password reset request sent! Please check your email for instructions.')
      } else {
        // Handle backend error response format: { success: false, error: { message: "..." } }
        const errorMsg = response.error?.message || response.message || 'Failed to send reset request. Please try again.'
        setErrorMessage(errorMsg)
      }
    } catch (error: any) {
      console.error('Reset request error:', error)
      // Handle network or other errors
      const errorMsg = error.error?.message || error.message || 'An error occurred. Please try again.'
      setErrorMessage(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="w-full flex flex-col gap-6">
      <CustomInput
        styleKey="authForm"
        label="Email"
        id="email"
        name="email"
        type="email"
        required
        ph="Enter your email address"
        value={email}
        error={errors.email}
        onChange={(e) => setEmail(e.target.value)}
      />

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

      <CustomButton
        styleKey="authForm"
        txt={isLoading ? "Sending..." : "Send Reset Link"}
        type="submit"
        disabled={isLoading}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault()
          handleSubmit()
        }}
      />

      <p className="flex gap-2 items-center justify-center">
        <span className="text-sm text-gray-600">Remember your password?</span>
        <CustomLink href="/auth/sign-in" txt="Sign in here" />
      </p>
    </form>
  )
}
