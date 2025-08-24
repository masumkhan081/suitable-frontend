'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ProfileService } from '@/services/profileService'
import { uploadToCloudinary } from '@/lib/cloudinaryUpload'
import { getUserData, storeUserData } from '@/utils/auth'
import { Camera, Upload, X, Check } from 'lucide-react'
//
type Props = {
  onUpload?: (file: File) => void
  onSkip?: () => void
  selectedImage?: File | null
  onImageSelect?: (file: File | null) => void
}
//
export default function AddPhoto({
  onUpload,
  onSkip,
  selectedImage: externalSelectedImage,
  onImageSelect
}: Props) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Handle file selection (no auto-upload)
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, or WebP)')
      return
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      setError('File size must be less than 5MB')
      return
    }

    setError(null)
    setSelectedImage(file)
    onImageSelect?.(file) // Notify parent

    // Create preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  // Handle file selection button click
  const handleSelectClick = () => {
    fileInputRef.current?.click()
  }

  // Handle upload button click
  const handleUploadClick = async () => {
    if (!selectedImage) {
      setError('Please select an image first')
      return
    }
    await handleUpload(selectedImage)
  }

  // Handle image removal
  const handleRemoveImage = () => {
    setSelectedImage(null)
    setPreviewUrl(null)
    setError(null)
    onImageSelect?.(null) // Notify parent
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Handle actual image upload to backend
  const handleUpload = async (file: File) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log('Starting photo upload:', file.name)
      
      // Step 1: Upload to Cloudinary
      const uploadResult = await uploadToCloudinary(file)
      console.log('Cloudinary upload successful:', uploadResult.secure_url)
      
      // Step 2: Update profile with the new image URL
      const updateResult = await ProfileService.updateProfileImage(uploadResult.secure_url)
      
      if (updateResult.success) {
        toast.success('Profile image uploaded successfully!')

        // Update user data in localStorage with 100% completion
        const currentUser = getUserData()
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            onboardingCompletion: 100, // Step 5 completion = 100%
            hasProfile: true
          }
          const token = localStorage.getItem('authToken') || ''
          storeUserData(updatedUser, token)
          console.log('Updated user data in localStorage with completion: 100%')
        }

        // Navigate to profile after success
        setTimeout(() => {
          router.push('/profile')
        }, 1500)
      } else {
        throw new Error(updateResult.error?.message || 'Failed to update profile')
      }
    } catch (error: any) {
      console.error('Upload error:', error)

      let errorMessage = 'Failed to upload image'
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }

      setError(errorMessage)
      toast.error(errorMessage)

      // Reset selection on error so user can try again
      setSelectedImage(null)
      setPreviewUrl(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Your Photo</h2>
        <p className="text-gray-600">Upload a profile picture to complete your profile</p>
      </div>


      <span>ffffffff</span>

      {/* Photo Preview/Upload Area */}
      <div className="relative">
        {previewUrl ? (
          // Preview with icons below
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-48 h-48">
              <img
                src={previewUrl}
                alt="Selected profile"
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
              />
            </div>
            {/* Action buttons below image */}
            <div className="flex gap-3">
              <button
                onClick={handleSelectClick}
                className="bg-blue-500 text-white rounded-full p-2.5 hover:bg-blue-600 transition-colors shadow-lg"
                disabled={isLoading}
                title="Change photo"
              >
                <Camera size={18} />
              </button>
              <button
                onClick={handleRemoveImage}
                className="bg-red-500 text-white rounded-full p-2.5 hover:bg-red-600 transition-colors shadow-lg"
                disabled={isLoading}
                title="Remove photo"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ) : (
          // Upload Area with camera icon
          <div
            onClick={handleSelectClick}
            className="w-48 h-48 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors mx-auto group"
          >
            <div className="bg-gray-200 rounded-full p-4 mb-3 group-hover:bg-gray-300 transition-colors">
              <Camera className="text-gray-500" size={32} />
            </div>
            <span className="text-gray-600 text-sm font-medium">Add your photo</span>
            <span className="text-gray-400 text-xs mt-1">JPEG, PNG, WebP (Max 5MB)</span>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isLoading}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* File Info */}
      {selectedImage && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-800 text-sm font-medium">{selectedImage.name}</p>
              <p className="text-blue-600 text-xs">
                {(selectedImage.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <Check className="text-blue-600" size={20} />
          </div>
        </div>
      )}
    </div>
  )
}
