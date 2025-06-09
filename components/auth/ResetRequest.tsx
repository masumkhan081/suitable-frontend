// @ts-nocheck
'use client'
import React, { useState } from 'react'
import EnhanceText from '../custom/EnhanceText'
import CustomInput from '../custom/CustomInput'
import CustomRadioGroup from '../custom/CustomRadioGroup'
import CustomButton from '../custom/CustomButton'
import { getSchemaValidation } from '@/0.lib/getSchemaValidation'
import { signupSchema } from '@/0.schema/auth.schema'
import { IErrorSignup } from '@/0.types/auth.type'
//
export default function ResetRequest() {
  // states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('Male')
  //
  const initErrors = {
    email: ''
  }
  const [errors, setErrors] = useState(initErrors)
  //

  const handleSubmit = () => {
    const data = {
      name,
      email,
      password,
      gender
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
