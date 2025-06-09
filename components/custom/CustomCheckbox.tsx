'use client'
import React from 'react'

export default function CustomCheckbox({
  styleKey = 'authForm',
  label = '',
  id = '',
  name = '',
  required,
  value = '',
  onChange,
  children
}: any) {
  return (
    <div className="flex items-center gap-2">
      <input type="checkbox" id={id} name={name} required value={value} onChange={onChange} />
      {label && <label htmlFor={id}>{label}</label>}
      {children}
    </div>
  )
}
