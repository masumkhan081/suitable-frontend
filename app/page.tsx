import CustomLink from '@/components/custom/CustomLink'

export default function Home() {
  return (
    <div className="w-full h-full p-8 bg-amber-100 dark:bg-amber-950 min-h-screen flex flex-col items-start justify-start gap-4">
      <h1 className="text-xl font-semibold">Auth Pages:</h1>
      <div className="flex gap-3">
        <CustomLink href="/auth/sign-in" txt="Sign In" />
        <CustomLink href="/auth/sign-up" txt="Sign Up" />
        {/* <CustomLink href="/auth/reset-password" txt="Reset Password" />
        <CustomLink href="/auth/reset-successfull" txt="Reset Successfull" />
        <CustomLink href="/auth/reset-request" txt="Reset request" />
        <CustomLink href="/auth/profile" txt="Profile" /> */}
      </div>
      <h1 className="text-xl font-semibold">Onboarding</h1>
      <div className="flex gap-3">
        <CustomLink href="/onboarding/subscription-plans" txt="Subscription Plans" />
        <CustomLink
          href="/onboarding/subscription-plans/standard/successfull"
          txt="Subscription Successfull"
        />
      </div>
      <h1 className="text-xl font-semibold">Profile</h1>
      <div className="flex gap-3">
        <CustomLink href="/profile" txt="Profile" />
      </div>
      <h1 className="text-xl font-semibold">Admin Pages:</h1>
      <div className="flex gap-3">
        <CustomLink href="/admin/dashboard" txt="Dashboard" />
        <CustomLink href="/admin/users" txt="Users" />
        <CustomLink href="/admin/roles" txt="Roles" />
        <CustomLink href="/admin/permissions" txt="Permissions" />
        <CustomLink href="/admin/settings" txt="Settings" />
      </div>
      <h1 className="text-xl font-semibold">System Pages:</h1>
      <div className="flex gap-3">
        <CustomLink href="/terms-and-condition" txt="Terms and Condition" />
        <CustomLink href="/privacy-policy" txt="Privacy Policy" />
        <CustomLink href="/faq" txt="Faq" />
      </div>
      <h1 className="text-xl font-semibold">Pricing Pages:</h1>
      <div className="flex gap-3">
        <CustomLink href="/pricing-packages" txt="Packages" />
      </div>
      <h1 className="text-xl font-semibold">Payment Pages:</h1>
      <div className="flex gap-3">
        <CustomLink href="/payment/checkout" txt="Checkout" />
        <CustomLink href="/payment/success" txt="Success" />
        <CustomLink href="/payment/failure" txt="Failure" />
      </div>
    </div>
  )
}
