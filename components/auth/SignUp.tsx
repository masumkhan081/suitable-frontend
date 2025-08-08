'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import CustomButton from '../custom/CustomButton'
import CustomInput from '../custom/CustomInput'
import CustomLink from '../custom/CustomLink'
import CustomCheckbox from '../custom/CustomCheckbox'
import { IErrorSignup } from '@/0.types/auth.type'
import { getSchemaValidation } from '@/lib/getSchemaValidation'
import { signupSchema } from '@/0.schema/auth.schema'
import { AuthService, tokenManager } from '@/services/authService'

export default function SignUp() {
  const router = useRouter()

  // states
   
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  //
  const initErrors: IErrorSignup = {
    username: '',
    email: '',
    password: ''
  }
  const [errors, setErrors] = useState(initErrors)
  //

  const handleSubmit = async () => {
    // Reset errors
    setErrors(initErrors)
    setErrorMessage('')
    setSuccessMessage('')

    // Check if terms are accepted
    if (!termsAccepted) {
      setErrorMessage('Please accept the terms and privacy policy to continue.')
      return
    }

    const data = {
      username,
      email,
      password
    }

    // Client-side validation
    const result = getSchemaValidation({
      schema: signupSchema,
      data
    })

    if (!result.success) {
      setErrors((prevErrors) => ({ ...prevErrors, ...result.error }))
      return
    }

    // API call
    setIsLoading(true)
    try {
      const response = await AuthService.signup(data)

      if (response.success) {
        // Store token if provided (token is in response.data)
        if (response.data?.token) {
          tokenManager.setToken(response.data.token)
        }

        // Show success message
        setSuccessMessage('Registration successful! Please check your email to verify your account.')
        setErrorMessage('')

        // Redirect to email verification page after a short delay
        setTimeout(() => {
          router.push('/auth/verify-email')
        }, 2000)
      } else {
        // Handle backend error response format: { success: false, error: { message: "..." } }
        const errorMessage = response.error?.message || response.message || 'Registration failed. Please try again.'
        setErrorMessage(errorMessage)
        setSuccessMessage('')
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      // Handle network or other errors
      const errorMessage = error.error?.message || error.message || 'An error occurred during registration. Please try again.'
      setErrorMessage(errorMessage)
      setSuccessMessage('')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className=" w-full flex flex-col gap-4">
      <CustomInput
        styleKey="authForm"
        label="User Name"
        id="username"
        name="username"
        type="text"
        required
        ph="User Name"
        value={username}
        error={errors.username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <CustomInput
        styleKey="authForm"
        label="Email"
        id="email"
        name="email"
        type="email"
        required
        ph="Email"
        value={email}
        error={errors.email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <CustomInput
        styleKey="authForm"
        label="Password"
        id="password"
        name="password"
        type="password"
        required
        ph="Password"
        value={password}
        error={errors.password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* i agree to the terms and data policy */}
      <CustomCheckbox
        styleKey="authForm"
        id="terms"
        name="terms"
        required
        value={termsAccepted ? 'accepted' : ''}
        onChange={(e) => setTermsAccepted(e.target.checked)}
      >
        <span className='text-gray-500'>
          I agree to the <CustomLink href="/terms" txt="terms" /> and{' '}
          <CustomLink href="/privacy" txt="privacy" /> policy
        </span>
      </CustomCheckbox>

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
        txt={isLoading ? "Creating Account..." : "Sign Up"}
        onClick={handleSubmit}
        disabled={isLoading || !termsAccepted}
      />

      <p className="flex gap-2 items-center justify-center">
        Already registered?
        <CustomLink href="/auth/sign-in" txt="Sign in here" />
      </p>
    </form>
  )
}
