'use client'

import { useRouter } from 'next/navigation'
import AddPhoto from '@/components/onboarding/AddPhoto'

export default function AddPhotoPage() {
  const router = useRouter()

  const handleUploadPhoto = () => {
    // Handle photo upload logic here
    console.log('Photo upload clicked')
    router.push('/onboarding/subscription-plans')
  }

  const handleSkip = () => {
    console.log('Skip photo clicked')
    router.push('/onboarding/subscription-plans')
  }

  return (
    <div className="min-h-screen max-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
        {/* Decorative background */}
        <div className="h-full flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-16 h-16 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-purple-800 dark:text-purple-200 mb-2">Your Perfect Match Awaits</h3>
            <p className="text-purple-600 dark:text-purple-300">A clear photo helps others connect with the real you</p>
          </div>
        </div>
      </div>
      <div className="col-span-1 h-full flex flex-col gap-6 justify-center items-center p-4 bg-white dark:bg-gray-800">
        <div className="w-full max-w-md p-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col gap-1 text-center">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Add Your Photo</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Upload a photo to make your profile visible to others
              </p>
            </div>

            <AddPhoto />

            <div className="w-full mt-6 flex flex-col gap-3">
              <button 
                onClick={handleUploadPhoto}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Upload Photo
              </button>
              <button 
                onClick={handleSkip}
                className="w-full border border-gray-300 dark:border-gray-600 py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
              >
                Skip for Now
              </button>
            </div>

            {/* Photo guidelines */}
            <div className="w-full mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Photo Guidelines:</h4>
              <ul className="list-disc list-inside space-y-1 text-purple-700 dark:text-purple-300 text-sm">
                <li>Upload a clear, recent photo of yourself</li>
                <li>Face should be clearly visible</li>
                <li>Avoid group photos or blurry images</li>
                <li>Maintain Islamic modesty guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
