'use client'
import React, { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import CustomButton from '../custom/CustomButton'
import CustomInput from '../custom/CustomInput'
import CustomLink from '../custom/CustomLink'
import { AuthService } from '@/services/authService'

export default function ResetPassword() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token') || ''
  
  // states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  //
  const initErrors = {
    email: '',
    password: '',
    confirmPassword: ''
  }
  const [errors, setErrors] = useState(initErrors)
  //

  const handleSubmit = async () => {
    // Reset messages
    setErrors(initErrors)
    setSuccessMessage('')
    setErrorMessage('')
    setIsLoading(true)

    // Check if token exists
    if (!token) {
      setErrorMessage('Invalid or missing reset token. Please request a new password reset.')
      setIsLoading(false)
      return
    }

    // Validation
    let newErrors = { email: '', password: '', confirmPassword: '' }
    
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (newErrors.email || newErrors.password || newErrors.confirmPassword) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      // Call API
      const response = await AuthService.resetPassword({ 
        email,
        password, 
        confirm_password: confirmPassword,
        token 
      })
      
      if (response.success) {
        setSuccessMessage(response.message || 'Password reset successful! You can now sign in with your new password.')
        // Redirect to sign-in after a delay
        setTimeout(() => {
          router.push('/auth/sign-in')
        }, 3000)
      } else {
        // Handle backend error response format: { success: false, error: { message: "..." } }
        const errorMsg = response.error?.message || response.message || 'Failed to reset password. Please try again.'
        setErrorMessage(errorMsg)
      }
    } catch (error: any) {
      console.error('Reset password error:', error)
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
      
      <CustomInput
        styleKey="authForm"
        label="New Password"
        id="password"
        name="password"
        type="password"
        required
        ph="Enter your new password"
        value={password}
        error={errors.password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <CustomInput
        styleKey="authForm"
        label="Confirm Password"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        required
        ph="Confirm your new password"
        value={confirmPassword}
        error={errors.confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        txt={isLoading ? "Resetting..." : "Reset Password"}
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
