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
      <div className="flex gap-6 flex-wrap">
        <CustomLink href="/onboarding/subscription-plans" txt="Subscription Plans" />
        <CustomLink
          href="/onboarding/subscription-plans/standard/successfull"
          txt="Subscription Successfull"
        />
        {/* personal-info */}
        <CustomLink href="/onboarding/personal-info/step-1" txt="Personal-Info Step-1" />
        <CustomLink href="/onboarding/personal-info/step-2" txt="Personal-Info Step-2" />
        {/* education-and-career */}
        <CustomLink
          href="/onboarding/education-and-career/step-1"
          txt="Education-and-Career Step-1"
        />
        <CustomLink
          href="/onboarding/education-and-career/step-2"
          txt="Education-and-Career Step-2"
        />
        {/* religious-view */}
        <CustomLink href="/onboarding/religious-view" txt="Religious-View" />
        {/* add-photo */}
        <CustomLink href="/onboarding/add-photo" txt="Add-Photo" />
      </div>
      <h1 className="text-xl font-semibold">Profile</h1>
      <div className="flex gap-3">
        <CustomLink href="/profile" txt="Profile" />
      </div>
      <h1 className="text-xl font-semibold">Admin Pages:</h1>
      <div className="flex gap-3">
        <CustomLink href="/dashboard" txt="Dashboard" />
        <CustomLink href="/dashboard/users" txt="Users" />
        <CustomLink href="/dashboard/roles" txt="Roles" />
        <CustomLink href="/dashboard/permissions" txt="Permissions" />
        <CustomLink href="/dashboard/settings" txt="Settings" />
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
