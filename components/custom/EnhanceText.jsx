import React from 'react'

export default function EnhanceText({txt,styleKey="title"}) {
    const styleMap = {
        appTitle: "text-red-700 font-medium text-3xl font-sans",
        formTitle:"text-gray-700 font-bold text-lg",
        subText:"text-gray-500 text-xs text-center w-full",
    }
  return (
    <p className={styleMap[styleKey]}>{txt}</p>
  )
}
