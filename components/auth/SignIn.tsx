'use client'
import React, { useState } from 'react'
import CustomInput from '../custom/CustomInput'
import CustomButton from '../custom/CustomButton'
import { getSchemaValidation } from '@/0.lib/getSchemaValidation'
import { loginSchema } from '@/0.schema/auth.schema'
import { IErrorLogin } from '@/0.types/auth.type'
import CustomCheckbox from '../custom/CustomCheckbox'
import CustomLink from '../custom/CustomLink'
//
export default function SignIn() {
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

    // send schema key, type key, initerror key

    const result = getSchemaValidation({
      schema: loginSchema,
      data
    })

    if (result.success) {
      alert('ok................')
    } else {
      alert(JSON.stringify(result.error))
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
        >
          <span>Remember me</span>
        </CustomCheckbox>

        <CustomLink href="/auth/reset-request" txt="Forgot Password" />
      </div>

      <CustomButton styleKey="authForm" txt="Sign Up" onClick={handleSubmit} />

      <p className="flex gap-2 items-center justify-center">
        Don't have an account?
        <CustomLink href="/auth/sign-up" txt="Sign up" />
      </p>
    </form>
  )
}
