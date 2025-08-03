'use client'
import React, { useState } from 'react'
import CustomButton from '../custom/CustomButton'
import CustomInput from '../custom/CustomInput'
import CustomLink from '../custom/CustomLink'
import CustomCheckbox from '../custom/CustomCheckbox'
import { IErrorSignup } from '@/0.types/auth.type'
import { getSchemaValidation } from '@/0.lib/getSchemaValidation'
import { signupSchema } from '@/0.schema/auth.schema'

export default function SignUp() {
  // states
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //
  const initErrors: IErrorSignup = {
    username: '',
    email: '',
    password: ''
  }
  const [errors, setErrors] = useState(initErrors)
  //

  const handleSubmit = () => {
    const data = {
      username,
      email,
      password
    }

    // send schema key, type key, initerror key

    const result = getSchemaValidation({
      schema: signupSchema,
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
    <form className=" w-full flex flex-col gap-6">
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
        // label="I agree to the terms and data policy"
        id="terms"
        name="terms"
        required
        value=""
        onChange={() => {}}
      >
        <span>
          I agree to the <CustomLink href="/terms" txt="terms" /> and{' '}
          <CustomLink href="/privacy" txt="privacy" /> policy
        </span>
      </CustomCheckbox>

      <CustomButton styleKey="authForm" txt="Sign Up" onClick={handleSubmit} />

      <p className="flex gap-2 items-center justify-center">
        Already registered?
        <CustomLink href="/auth/sign-in" txt="Sign in here" />
      </p>
    </form>
  )
}
