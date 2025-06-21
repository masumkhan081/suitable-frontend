import React, { MouseEventHandler, FormEventHandler, ReactNode } from 'react'
import { cn } from '@/0.lib/utils'
// Define the type for style keys
export type ButtonStyleKey = 'null' | 'default' | 'authForm' | 'gender' | 'selectedGender' | 'onboardingNext'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  txt?: string
  startIcon?: ReactNode
  styleKey?: ButtonStyleKey
  endIcon?: ReactNode
}

export default function CustomButton({
  txt,
  styleKey = "null",
  startIcon,
  endIcon,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}: ButtonProps) {
  //
  const styleMap = {
    null: '',
    default: 'text-blue-600 bg-blue-50 rounded-md p-2 font-bold',
    authForm: `w-full text-white  border border-gray-300 rounded-md bg-purple-600 text-center px-2 py-2 font-semibold`,
    gender: `w-fit px-4 py-1 text-gray-800 bg-white border border-gray-300 rounded-md text-center`,
    selectedGender: `w-fit px-4 py-1 text-gray-800 bg-gray-200 border border-gray-300 rounded-md text-center`,
    onboardingNext: `w-fit flex items-center gap-2 px-4 py-1 text-gray-800 bg-white-200 border border-purple-500 rounded-md text-purple-700 font-semibold text-center`,
  }

  return (
    <button
      type={type}
      disabled={disabled}
      title={disabled ? 'Disabled' : ''}
      onClick={onClick}
      // if style prop presents, then the stylekey will not apply using cn
      className={styleMap[styleKey]}
      {...props}
    >
      {startIcon}
      {txt}
      {endIcon}
    </button>
  )
}
