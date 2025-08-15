'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AddPhoto from '@/components/onboarding/AddPhoto'
import { ProfileService } from '@/services/profileService'
import AuthGuard from '@/components/auth/authguard'
import { getUserData, storeUserData } from '@/utils/auth'
import { toast } from 'react-hot-toast'

export default function AddPhotoPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const handleUploadPhoto = async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (!selectedImage) {
        setError('Please select an image to upload')
        return
      }

      // Create FormData with the selected image
      const formData = new FormData()
      formData.append('profileImage', selectedImage)

      const response = await ProfileService.updateProfileStep5(formData)

      if (response.success) {
        // Update local storage with completion percentage
        const userData = getUserData()
        if (userData) {
          userData.onboardingCompletion = 100
          storeUserData(userData, localStorage.getItem('authToken') || '')
        }
        
        // Navigate to home on success (100% completion)
        router.push('/home')
      } else {
        setError(response.error?.message || 'Failed to upload photo')
      }
    } catch (err) {
      console.error('Error uploading photo:', err)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkip = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Complete profile without photo
      await ProfileService.completeProfileStep5({
        hasPhoto: false,
        photoUrl: '',
        profileCompleted: true
      })

      // Update localStorage with 100% completion
      localStorage.setItem('onboardingCompletion', '100')

      toast.success('Profile completed successfully!')
      router.push('/profile')
    } catch (error) {
      console.error('Skip error:', error)
      setError('Failed to complete profile. Please try again.')
      toast.error('Failed to complete profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthGuard>
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
              {/* Header with title, percentage, and progress in one row */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Add Your Photo</h2>
                  <span className="text-blue-700 font-medium">100%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                  <div className="h-2 w-[100%] bg-blue-500 rounded-full"></div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Upload a photo to make your profile visible to others
                </p>
                {error && (
                  <div className="w-full p-3 bg-red-50 border border-red-200 rounded-md mt-2">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}
              </div>

              <AddPhoto 
                selectedImage={selectedImage}
                onImageSelect={setSelectedImage}
              />

              <div className="w-full mt-6 flex flex-col gap-3">
                <button
                  onClick={handleUploadPhoto}
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Completing Profile...' : 'Upload Photo'}
                </button>
                <button
                  onClick={handleSkip}
                  disabled={isLoading}
                  className="w-full border border-gray-300 dark:border-gray-600 py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Completing Profile...' : 'Skip for Now'}
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
    </AuthGuard>
  )
}
