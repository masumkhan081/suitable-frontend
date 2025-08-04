'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import CustomInput from '../custom/CustomInput'
import CustomButton from '../custom/CustomButton'
import { getSchemaValidation } from '@/lib/getSchemaValidation'
import { loginSchema } from '@/0.schema/auth.schema'
import { IErrorLogin } from '@/0.types/auth.type'
import CustomCheckbox from '../custom/CustomCheckbox'
import CustomLink from '../custom/CustomLink'
import { AuthService, tokenManager } from '@/services/authService'
//
export default function SignIn() {
  const router = useRouter()
  // states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //
  const initErrors: IErrorLogin = {
    email: '',
    password: ''
  }
  const [errors, setErrors] = useState(initErrors)
  //

  const handleSubmit = () => {
    const data = {
      email,
      password
    }

    // Demo mode: Check for demo credentials
    if (email === 'demo@suitable.com' && password === 'demo123') {
      // Redirect to onboarding for UI testing
      router.push('/onboarding')
      return
    }

    // Regular validation for other credentials
    const result = getSchemaValidation({
      schema: loginSchema,
      data
    })

    if (result.success) {
      // For any valid credentials, redirect to dashboard
      router.push('/onboarding/personal-info/step-1')
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, ...result.error }))
    }
  }

  return (
    <form className=" w-full flex flex-col gap-4">
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

      <div className="flex justify-between items-center">
        <CustomCheckbox
          styleKey="authForm"
          // label="I agree to the terms and data policy"
          id="terms"
          name="terms"
          required
          value=""
          onChange={() => { }}
        >
          <span>Remember me</span>
        </CustomCheckbox>

        <CustomLink href="/auth/reset-request" txt="Forgot Password" />
      </div>

      <CustomButton styleKey="authForm" txt="Sign In" onClick={handleSubmit} />

      <p className="flex gap-2 items-center justify-center">
        <p className="text-sm text-gray-600">Don&apos;t have an account? <a href="/auth/sign-up" className="text-blue-600 hover:underline">Sign up</a></p>
      </p>
    </form>
  )
}
