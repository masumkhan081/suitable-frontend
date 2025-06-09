import React from 'react'

export default function EnhanceText({txt,styleKey="title"}) {
    const styleMap = {
        appTitle: "text-gray-800 text-2xl font-medium",
        formTitle:"text-black font-bold text-lg",
        subText:"text-gray-500 text-xs text-center w-full",
    }
  return (
    <p className={styleMap[styleKey]}>{txt}</p>
  )
}
