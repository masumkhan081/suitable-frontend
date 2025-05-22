import CustomLink from "@/components/custom/CustomLink";

export default function Home() {
  return (
    <div className="w-full h-full brdr bg-amber-100 dark:bg-amber-950 min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Auth Pages:</h1>
      <div className="flex gap-3">
        <CustomLink href="/auth/sign-in" txt="Sign In" />
        <CustomLink href="/auth/sign-up" txt="Sign Up" />
        <CustomLink href="/auth/reset-password" txt="Reset Password" />
        <CustomLink href="/auth/reset-successfull" txt="Reset Successfull" />
        <CustomLink href="/auth/reset-request" txt="Reset request" />
        <CustomLink href="/auth/profile" txt="Profile" />
      </div>
      <h1 className="text-4xl font-bold">Admin Pages:</h1>
      <div className="flex gap-3">
        <CustomLink href="/admin/dashboard" txt="Dashboard" />
        <CustomLink href="/admin/users" txt="Users" />
        <CustomLink href="/admin/roles" txt="Roles" />
        <CustomLink href="/admin/permissions" txt="Permissions" />
        <CustomLink href="/admin/settings" txt="Settings" />
      </div>
      <h1 className="text-4xl font-bold">System Pages:</h1>
      <div className="flex gap-3">
        <CustomLink href="/terms-and-condition" txt="Terms and Condition" />
        <CustomLink href="/privacy-policy" txt="Privacy Policy" />
        <CustomLink href="/faq" txt="Faq" />
      </div>
    </div>
  );
}
