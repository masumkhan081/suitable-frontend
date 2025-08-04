'use client'
import React, { useState } from 'react'
import CustomButton from '../custom/CustomButton'
import CustomInput from '../custom/CustomInput'
import CustomLink from '../custom/CustomLink'

export default function ResetPassword() {
  // states
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  //
  const initErrors = {
    password: '',
    confirmPassword: ''
  }
  const [errors, setErrors] = useState(initErrors)
  //

  const handleSubmit = () => {
    const data = {
      password,
      confirmPassword
    }

    // Simple validation
    let newErrors = { password: '', confirmPassword: '' }
    
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

    if (newErrors.password || newErrors.confirmPassword) {
      setErrors(newErrors)
      return
    }

    // Reset password logic here
    alert('Password reset successfully!')
  }

  return (
    <form className="w-full flex flex-col gap-6">
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

      <CustomButton
        styleKey="authForm"
        txt="Reset Password"
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
