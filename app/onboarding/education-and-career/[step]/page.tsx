import { notFound, redirect } from 'next/navigation'
import EducationAndCareer1 from '@/components/onboarding/EducationAndCareer1'
import EducationAndCareer2 from '@/components/onboarding/EducationAndCareer2'

interface Props {
  params: {
    step: string
  }
}

export default async function Page({ params }: Props) {
  const step = params.step
  const validSteps = ['step-1', 'step-2']

  if (!validSteps.includes(step)) {
    notFound()
  }

  const stepMap = {
    'step-1': <EducationAndCareer1 />,
    'step-2': <EducationAndCareer2 />
  }

  if (!stepMap[step as keyof typeof stepMap]) {
    redirect('/unauthorized')
  }

  return (
    <div className="min-h-screen max-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block bg-gray-100">
        {/* Add your image here */}
      </div>
      <div className="col-span-1 h-full flex flex-col gap-6 justify-center items-center p-4">
        {stepMap[step as keyof typeof stepMap]}
      </div>
    </div>
  )
}
