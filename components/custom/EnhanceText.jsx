import React from 'react'

export default function EnhanceText({ txt, styleKey = 'appTitle' }) {
  const styleMap = {
    bigTitle: 'text-gray-800 text-3xl font-medium',
    appTitle: 'text-gray-800 text-xl font-medium',
    formTitle: 'text-black font-bold text-lg',
    subText: 'text-gray-500 text-sm text-center w-full'
  }
  return <p className={styleMap[styleKey]}>{txt}</p>
}
