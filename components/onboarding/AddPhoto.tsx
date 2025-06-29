import EnhanceText from '@/components/custom/EnhanceText'
import React from 'react'

type Props = {}

export default function AddPhoto({}: Props) {
  return (
    <div className="  w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors mx-auto">
      <span className="text-gray-500">+ Add Photo</span>
    </div>
  )
}
