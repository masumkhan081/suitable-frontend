'use client'
import React, { useState } from 'react'
import CustomButton from '../custom/CustomButton'
import CustomInput from '../custom/CustomInput'
import CustomLink from '../custom/CustomLink'

export default function ResetRequest() {
  // states
  const [email, setEmail] = useState('')
  //
  const initErrors = {
    email: ''
  }
  const [errors, setErrors] = useState(initErrors)
  //

  const handleSubmit = () => {
    const data = {
      email
    }

    // Simple validation
    if (!email) {
      setErrors({ email: 'Email is required' })
      return
    }

    // Reset password logic here
    alert('Password reset request sent!')
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

      <CustomButton
        styleKey="authForm"
        txt="Send Reset Link"
        type="submit"
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
