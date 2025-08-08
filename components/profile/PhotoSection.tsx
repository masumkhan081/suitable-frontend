'use client'

import { Camera, Upload } from 'lucide-react'

interface PhotoSectionProps {
  profileData: any
  isEditing?: boolean
  onPhotoUpload?: (file: File) => void
}

export default function PhotoSection({ 
  profileData, 
  isEditing = false, 
  onPhotoUpload 
}: PhotoSectionProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && onPhotoUpload) {
      onPhotoUpload(file)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-pink-500">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mr-3">
          <span className="text-pink-600 dark:text-pink-300 font-semibold text-sm">5</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Profile Photo</h3>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
            {profileData.profileImageUrl ? (
              <img
                src={profileData.profileImageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Camera className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          
          {isEditing && (
            <label className="absolute bottom-0 right-0 w-10 h-10 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center cursor-pointer transition-colors">
              <Upload className="w-5 h-5 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {profileData.profileImageUrl ? 'Profile photo uploaded' : 'No profile photo uploaded'}
          </p>
          
          {isEditing && (
            <div className="space-y-2">
              <label className="inline-flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg cursor-pointer transition-colors">
                <Upload className="w-4 h-4 mr-2" />
                {profileData.profileImageUrl ? 'Change Photo' : 'Upload Photo'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Supported formats: JPG, PNG, GIF (Max: 5MB)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
