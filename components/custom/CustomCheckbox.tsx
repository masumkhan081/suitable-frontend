'use client'
import React from 'react'

interface ICustomCheckbox {
  label?: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  styleKey?: string;
  id: string;
  name: string;
  required: boolean;
  value: string;
}

export default function CustomCheckbox({ label, checked, onChange, children, id, name, required, value, styleKey, ...props }: ICustomCheckbox) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  }

  return (
    <div className="flex items-center gap-2">
      <input 
        type="checkbox" 
        id={id}
        name={name}
        required={required}
        value={value}
        checked={checked} 
        onChange={handleChange} 
        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        {...props} 
      />
      {label && <label htmlFor={id} className="text-sm text-gray-700 dark:text-gray-300">{label}</label>}
      {children}
    </div>
  )
}
