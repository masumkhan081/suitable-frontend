import EnhanceText from '@/components/custom/EnhanceText'
import SignUp from '../../../components/auth/SignUp'
import CustomLink from '@/components/custom/CustomLink'
import { List, Shell } from 'lucide-react'

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

        <div className="md:min-w-[500px] min-w-[360px] w-auto flex flex-col gap-4">
          <EnhanceText txt="Create New Account" styleKey="formTitle" />
          <SignUp />
        </div>
      </div>
    </div>
  )
}
