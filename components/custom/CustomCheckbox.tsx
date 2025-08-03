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

export default function CustomCheckbox({ label, checked, onChange, children, id, name, required, value, ...props }: ICustomCheckbox) {
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
        {...props} 
      />
      {label && <label htmlFor={id}>{label}</label>}
      {children}
    </div>
  )
}
