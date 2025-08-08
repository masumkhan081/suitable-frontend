import React from 'react'

export default function EnhanceText({ txt, styleKey = 'appTitle' }) {
  const styleMap = {
    bigTitle: 'text-gray-800 text-3xl font-medium',
    appTitle: 'text-gray-800 text-xl font-bold leading-loose tracking-widest',
    formTitle: 'text-gray-600 font-medium text-lg leading-none tracking-tight',
    subText: 'text-gray-500 text-sm text-center w-full'
  }
  return <p className={styleMap[styleKey]}>{txt}</p>
}
