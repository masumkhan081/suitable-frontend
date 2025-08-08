import { notFound, redirect } from 'next/navigation'
import PersonalInfo1 from '@/components/onboarding/PersonalInfo1'
import PersonalInfo2 from '@/components/onboarding/PersonalInfo2'
import AuthGuard from '@/components/auth/authguard'

interface Props {
  params: {
    step: string
  }
}

export default async function Page({ params }: Props) {
  const step = params.step

  const validSteps = ['step-1', 'step-2']

  if (!validSteps.includes(step)) {
    notFound() // 404 if the role is invalid
  }

  const stepMap = {
    'step-1': <PersonalInfo1 />,
    'step-2': <PersonalInfo2 />
  }

  if (!stepMap[step as keyof typeof stepMap]) {
    redirect('/unauthorized')
  }

  return (
    <AuthGuard>
      <div className="min-h-screen max-h-screen w-full grid grid-cols-1 md:grid-cols-2 ">
      <div className="col-span-1 hidden md:block bg-emerald-100 h-full ">
        {/* <img
               className="w-full h-full object-cover"
               src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
               alt=""
             /> */}
        {/* {JSON.stringify(errors)} */}
      </div>

      <div className="col-span-1 h-full">
        {stepMap[step as keyof typeof stepMap]}
      </div>
      </div>
    </AuthGuard>
  )
}
