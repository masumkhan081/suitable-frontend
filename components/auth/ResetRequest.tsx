'use client'
import React, { useState } from 'react'
import CustomButton from '../custom/CustomButton'
import CustomInput from '../custom/CustomInput'

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
        ph="Email"
        value={email}
        error={errors.email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <CustomButton
        styleKey="authForm"
        txt="Sign Up"
        type="submit"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault()
          handleSubmit()
        }}
      />
    </form>
  )
}
