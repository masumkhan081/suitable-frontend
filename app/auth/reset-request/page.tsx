 
import ResetRequest from "../../../components/auth/ResetRequest";
import CustomLink from "@/components/custom/CustomLink";

export default function page() {
  return (
    <div className="min-h-screen max-h-screen w-full grid grid-cols-1 md:grid-cols-2 ">
      <div className="col-span-1 hidden md:block bg-emerald-100 h-full brdr">
        {/* <img
               className="w-full h-full object-cover"
               src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
               alt=""
             /> */}
        {/* {JSON.stringify(errors)} */}
      </div>

      <div className="col-span-1 h-full brdr flex flex-col justify-start p-4">

        <div className="flex justify-end ">
          <CustomLink href="/auth/sign-in" txt="Login" styleKey="authForm" />
        </div>
        <div className="flex-grow">
          <ResetRequest />
        </div>
      </div>
    </div>
  );
}
