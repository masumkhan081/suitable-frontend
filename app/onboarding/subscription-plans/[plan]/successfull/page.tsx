import React from 'react'
// import SuccessModal from '@/components/subscription/SuccessModal'

export default function SubscriptionSuccessfull({params}: {params: {plan: string}}) {
  return (
    <div className='w-full h-full p-8 bg-white dark:bg-amber-950 min-h-screen flex flex-col items-start justify-start gap-4'>
      {/* <SuccessModal plan={params.plan} /> */}
    </div>
  )
}
