import React from 'react'
import { Check } from 'lucide-react'

export default function page() {
  return (
    <div className="w-full h-full p-8 bg-white dark:bg-amber-950 min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="max-w-[350px] mx-auto flex flex-col items-center justify-center shadow-lg gap-4 p-6 rounded-md">
        <Check className="w-8 h-8 text-green-700 p-2 rounded-full bg-green-100" />

        <span className="text-lg font-bold">Subscription successful</span>

        <span>
          Thank you for your subscription. You can now enjoy all the features of our service. Your
          subscription will end on
          <span className="text-sm font-bold text-gray-500 px-2">May 15, 2025</span>
        </span>

        <span className="w-full text-center bg-purple-800 text-white p-2 rounded-md">
          Redirecting ...
        </span>
      </div>
    </div>
  )
}
