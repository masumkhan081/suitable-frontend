import AddPhoto from '@/components/onboarding/AddPhoto'

export default function AddPhotoPage() {
  return (
    <div className="min-h-screen max-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block bg-gray-100 ">{/* Add your image here */}</div>
      <div className=" col-span-1 h-full flex flex-col gap-6 justify-center items-center p-4">
        <div className="w-full max-w-md p-6">
          <div className="flex flex-col items-start justify-center gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold  ">Add Your Photo</h2>
              <p className="text-gray-600 text-center">
                Upload a photo to make your profile visible to others
              </p>
            </div>

            <AddPhoto />

            <div className="w-full mt-6 flex flex-col gap-2">
              <button className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                Upload Photo
              </button>
              <button className="w-full border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors">
                Skip for Now
              </button>
            </div>

            {/* add a list of instructions on bullet point  */}
            <ul className="list-disc list-inside space-y-0 text-gray-500 text-sm">
              <li>Upload a clear photo of yourself</li>
              <li>Upload a clear photo of yourself</li>
              <li>Upload a clear photo of yourself</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
