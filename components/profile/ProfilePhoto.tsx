import React, { useState } from 'react'
import { Camera, Upload } from 'lucide-react'
import Image from 'next/image'
import { uploadToCloudinary } from '../../lib/cloudinaryUpload'

interface ProfilePhotoProps {
  profileImage: string | null
  isEditing: boolean
  onProfileImageUpdate?: (url: string) => void
}

export function ProfilePhoto({ profileImage, isEditing, onProfileImageUpdate }: ProfilePhotoProps) {
  const [selectedMainPhoto, setSelectedMainPhoto] = useState<File | null>(null)
  const [mainPhotoPreview, setMainPhotoPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const getImageUrl = (image: string | null): string | null => {
    if (!image || image.trim() === '') return null
    
    // If it's already a full URL, return as is
    if (isValidUrl(image)) return image
    
    // For old filenames that don't exist on Cloudinary, return null
    // The backend should save the full Cloudinary URL, not just filename
    return null
  }

  const handleMainPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedMainPhoto(file)
      const previewUrl = URL.createObjectURL(file)
      setMainPhotoPreview(previewUrl)
      
      // Immediately upload the profile photo when selected
      handleUploadMainPhoto(file)
    }
  }

  const handleUploadMainPhoto = async (file?: File) => {
    const photoToUpload = file || selectedMainPhoto
    if (!photoToUpload) return
    
    setIsUploading(true)
    try {
      const response = await uploadToCloudinary(photoToUpload)
      const imageUrl = response.secure_url || response.url
      
      // Update backend with new profile image - save the full URL
      const token = localStorage.getItem('authToken')
      const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload/profile-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          imageUrl: imageUrl
        })
      })
      
      if (!updateResponse.ok) {
        throw new Error('Failed to update profile image')
      }
      
      console.log('Profile photo updated:', imageUrl)
      
      // Update parent component immediately
      onProfileImageUpdate?.(imageUrl)
      
      // Update preview
      setMainPhotoPreview(imageUrl)
      setSelectedMainPhoto(null)
      
    } catch (err) {
      console.error('Error updating profile photo:', err)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Profile Photo</h3>

      <div className="flex gap-3 items-center">
        <div className="relative aspect-square w-32 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
          {mainPhotoPreview ? (
            <Image src={mainPhotoPreview} alt="Profile" fill className="object-cover" unoptimized />
          ) : getImageUrl(profileImage) ? (
            <Image 
              src={getImageUrl(profileImage)!} 
              alt="Profile" 
              fill
              className="object-cover"
              unoptimized
            />
          ) : null}
          
          {isEditing && (
            <label className="absolute bottom-2 right-2 w-8 h-8 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
              <Upload className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleMainPhotoChange}
                className="hidden"
              />
            </label>
          )}
          
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
