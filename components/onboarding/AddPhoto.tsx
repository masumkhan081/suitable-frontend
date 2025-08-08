'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ProfileService } from '@/services/profileService'
import { getUserData, storeUserData } from '@/utils/auth'
import { Camera, Upload, X, Check } from 'lucide-react'

type Props = Record<string, unknown>

export default function AddPhoto({}: Props) {
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
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Handle actual image upload to backend
  const handleUpload = async (file: File) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log('Uploading image:', file.name)
      
      // Create FormData
      const formData = new FormData()
      formData.append('profileImage', file)
      
      console.log('FormData created with image')
      
      // Upload image
      const response = await ProfileService.updateProfileStep5(formData)
      
      console.log('Upload response:', response)
      
      if (response.success) {
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
        throw new Error(response.message || 'Upload failed')
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

      {/* Image Upload Area */}
      <div className="relative">
        {previewUrl ? (
          // Image Preview
          <div className="relative w-48 h-48 mx-auto">
            <img
              src={previewUrl}
              alt="Profile preview"
              className="w-full h-full rounded-full object-cover border-4 border-gray-200"
            />
            {/* Remove button */}
            <button
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              disabled={isLoading}
            >
              <X size={16} />
            </button>
            {/* Replace button */}
            <button
              onClick={handleSelectClick}
              className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
              disabled={isLoading}
            >
              <Camera size={16} />
            </button>
          </div>
        ) : (
          // Upload Area
          <div
            onClick={handleSelectClick}
            className="w-48 h-48 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors mx-auto"
          >
            <Upload className="text-gray-400 mb-2" size={32} />
            <span className="text-gray-500 text-sm font-medium">Click to add photo</span>
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

      {/* Action Buttons */}
      <div className="flex gap-3">
        {isLoading ? (
          <div className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Uploading...
          </div>
        ) : selectedImage ? (
          <>
            <button
              onClick={handleSelectClick}
              className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <Camera size={16} />
              Change
            </button>
            <button
              onClick={handleUploadClick}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Upload size={16} />
              Upload
            </button>
          </>
        ) : (
          <button
            onClick={handleSelectClick}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Camera size={16} />
            Choose Photo
          </button>
        )}
      </div>

      {/* Skip Option */}
      <div className="text-center">
        <button
          onClick={() => router.push('/profile')}
          disabled={isLoading}
          className="text-gray-500 text-sm hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Skip for now
        </button>
      </div>
    </div>
  )
}
