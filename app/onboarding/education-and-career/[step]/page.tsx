import EducationAndCareer from '@/components/onboarding/EducationAndCareer'


export default async function Page() {
  return (
    <div className="min-h-screen max-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block bg-gray-100">{/* Add your image here */}</div>
      <div className="col-span-1 h-full flex flex-col gap-6 justify-center items-center p-4">
        <EducationAndCareer />
      </div>
    </div>
  )
}
