import { cn } from '@/0.lib/utils'
import EnhanceText from '@/components/custom/EnhanceText'
import { Button } from '@/components/ui/button'
import { Check, Shell } from 'lucide-react'
import React from 'react'

export default function PricingPackages() {
  //
  const packages = [
    {
      duration: 'Monthly',
      trial: '7 days free trial',
      isFocused: false,
      price: '200',
      currency: '$',
      btnText: 'Start your free week',
      btnLink: '/onboarding/subscription-plans/standard/successfull',

      features: [
        'Unlimited free browsing',
        'Unlimited free storage',
        'Unlimited free downloads',
        'Unlimited free updates',
        'Unlimited free support',
        'Unlimited free updates',
        'Unlimited free updates',
        'Unlimited free updates'
      ],
      footerText: 'You will not get charge today!'
    },
    {
      duration: 'Three Monthly',
      trial: '7 days free trial',
      isFocused: true,
      offer: 'save $20',
      price: '200',
      currency: '$',
      btnText: 'Start your free week',
      btnLink: '/onboarding/subscription-plans/standard/successfull',

      features: [
        'Unlimited free browsing',
        'Unlimited free storage',
        'Unlimited free downloads',
        'Unlimited free updates',
        'Unlimited free support',
        'Unlimited free updates',
        'Unlimited free updates',
        'Unlimited free updates'
      ],
      footerText: 'You will not get charge today!'
    },
    {
      duration: 'Yearly',
      trial: '7 days free trial',
      isFocused: false,
      price: '200',
      currency: '$',
      btnText: 'Start your free week',
      btnLink: '/onboarding/subscription-plans/standard/successfull',

      features: [
        'Unlimited free browsing',
        'Unlimited free storage',
        'Unlimited free downloads',
        'Unlimited free updates',
        'Unlimited free support',
        'Unlimited free updates',
        'Unlimited free updates',
        'Unlimited free updates'
      ],
      footerText: 'You will not get charge today!'
    }
  ]
  //
  return (
    <div className="w-full h-full p-8 bg-white dark:bg-amber-950 min-h-screen flex flex-col items-start justify-start gap-4">
      <div className="w-full flex gap-2 items-center justify-center px-4 ">
        <Shell className="w-6 h-6" />
        <EnhanceText txt="Suitable" styleKey="appTitle" />
      </div>

      <div className="w-full flex flex-col gap-1 items-center justify-center ">
        <EnhanceText
          txt="Choose a plan to enjoy all premium features of Suitable"
          styleKey="bigTitle"
        />
        <EnhanceText txt="Get everything you want" styleKey="subText" />
      </div>

      <div className="w-full md:max-w-[1200px] max-w-full mx-auto grid grid-cols-3 gap-[10px] items-center justify-center">
        {packages.map((plan, index) => (
          <div
            className={cn(
              'bg-gray-100 mx-auto md:col-span-1 col-span-3 min-w-[350px] max-w-[450px] flex flex-col gap-4 py-6 px-4 rounded-[20px] border',
              plan.isFocused ? 'border-purple-500 border-2' : 'border-1 border-gray-100'
            )}
            key={index}
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col items-start">
                <span className="text-lg font-bold">{plan.duration}</span>
                <span className="text-sm text-gray-500">{plan.trial}</span>
              </div>

              {plan.offer && (
                <span className="bg-purple-600 text-white rounded-md px-2 text-sm font-medium">
                  {plan.offer}
                </span>
              )}
            </div>

            <span className="mt-6 text-2xl text-gray-700 font-medium">
              {plan.currency}
              {plan.price}
              <span className="text-sm text-gray-500">/month</span>
            </span>

            <Button
              className={
                plan.isFocused ? 'w-full bg-purple-600 text-white' : 'w-full bg-gray-800 text-white'
              }
            >
              {plan.btnText}
            </Button>

            <ul className="flex flex-col gap-2 items-start">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex gap-2 items-center text-sm text-gray-600 font-medium"
                >
                  <Check className="w-4 h-3 text-black" />
                  {feature}
                </li>
              ))}
            </ul>

            <span className="text-sm text-gray-500 mt-2 font-bold">{plan.footerText}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
