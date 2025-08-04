import SignIn from '@/components/auth/SignIn'
import EnhanceText from '@/components/custom/EnhanceText'
import { Shell } from 'lucide-react'

export default function page() {
  return (
    <div className="min-h-screen max-h-screen w-full grid grid-cols-1 md:grid-cols-2 ">
      <div className="col-span-1 hidden md:block bg-emerald-100 h-full ">
        {/* <img
             className="w-full h-full object-cover"
             src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
             alt=""
           /> */}
        {/* {JSON.stringify(errors)} */}
      </div>

      <div className="col-span-1 h-full  flex flex-col gap-6 justify-center items-center p-4">
        <div className="w-full flex gap-2 items-center justify-center px-4 ">
          <Shell className="w-6 h-6" />
          <EnhanceText txt="Suitable" styleKey="appTitle" />
        </div>

        <div className="md:min-w-[500px] min-w-[360px] w-auto flex flex-col gap-6">
          {/* Demo Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🎯 Demo Mode</h3>
            <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
              Use these credentials to test the onboarding flow:
            </p>
            <div className="bg-white dark:bg-gray-800 rounded p-2 font-mono text-sm">
              <div className="text-gray-600 dark:text-gray-400"><strong className="text-gray-700 dark:text-gray-300">Email:</strong> demo@suitable.com</div>
              <div className="text-gray-600 dark:text-gray-400"><strong className="text-gray-700 dark:text-gray-300">Password:</strong> demo123</div>
            </div>
          </div>

          <div className="flex flex-col gap-0 items-start justify-center">
            <EnhanceText txt="Welcome Back" styleKey="formTitle" />
            <span className="">Enter your credentials</span>
          </div>
          <SignIn />
        </div>
      </div>
    </div>
  )
}
