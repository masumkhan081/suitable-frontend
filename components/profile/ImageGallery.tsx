import React, { useState } from 'react'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'
import { uploadToCloudinary } from '../../lib/cloudinaryUpload'

interface Photo {
  id: string
  url: string
  isPreview?: boolean
  file?: File
}

interface ImageGalleryProps {
  galleryPhotos: Photo[]
  isEditing: boolean
  onGalleryUpdate?: (photos: Photo[]) => void
  onUnsavedChangesChange?: (hasUnsaved: boolean) => void
}

export function ImageGallery({
  galleryPhotos,
  isEditing,
  onGalleryUpdate = () => {},
  onUnsavedChangesChange
}: ImageGalleryProps) {
  const [selectedGalleryPhotos, setSelectedGalleryPhotos] = useState<File[]>([])
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)

  // Check if there are unsaved changes
  const hasUnsaved = galleryPhotos.some((p) => p.isPreview) || selectedGalleryPhotos.length > 0

  // Notify parent about unsaved changes
  React.useEffect(() => {
    if (onUnsavedChangesChange) {
      onUnsavedChangesChange(hasUnsaved)
    }
  }, [hasUnsaved, onUnsavedChangesChange])

  const handleGalleryPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      const newPhotos = files.map((file) => ({
        id: `new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        url: URL.createObjectURL(file),
        isPreview: true,
        file
      }))
      onGalleryUpdate([...galleryPhotos, ...newPhotos])
      e.target.value = '' // Clear input
    }
  }

  const handleReplacePhoto = (photoId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create a preview URL for the selected file
    const previewUrl = URL.createObjectURL(file)

    // Update the local state to show the preview
    const updatedPhotos = galleryPhotos.map((photo) => {
      if (photo.id === photoId) {
        return {
          ...photo,
          url: previewUrl,
          isPreview: true,
          file
        }
      }
      return photo
    })

    onGalleryUpdate(updatedPhotos)

    // Clear the file input to allow selecting the same file again
    e.target.value = ''
  }

  const handleSaveGalleryPhotos = async () => {
    // This function is no longer needed since we use central save
    // All preview photos will be handled by the central save in the parent component
    console.log('📝 ImageGallery: handleSaveGalleryPhotos called - using central save instead')
  }

  const handleRemovePhoto = (photoId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    console.log('🗑️ Removing photo with ID:', photoId)
    console.log('🗑️ Current gallery before removal:', galleryPhotos)

    const updatedPhotos = galleryPhotos.filter((photo) => photo.id !== photoId)
    console.log('🗑️ Gallery after removal:', updatedPhotos)

    onGalleryUpdate(updatedPhotos)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Image Gallery</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {galleryPhotos.length + galleryPreviews.length} of 6 photos
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6 relative min-h-[140px]">
        {/* Existing gallery photos */}
        {galleryPhotos.map((photo) => (
          <div key={photo.id} className="relative group flex-shrink-0">
            <div className="aspect-square w-32 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
              {photo.url ? (
                <Image
                  src={photo.url}
                  alt="Gallery"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Fallback in case image fails to load
                    const target = e.target as HTMLImageElement
                    target.onerror = null
                    target.src = '/placeholder-user.jpg'
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span>No Image</span>
                </div>
              )}
            </div>
            {isEditing && (
              <>
                <button
                  type="button"
                  onClick={(e) => handleRemovePhoto(photo.id, e)}
                  className="absolute top-2 right-0 w-6 h-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors shadow-sm"
                  title="Remove photo"
                >
                  <X className="w-3 h-3" />
                </button>
                <label className="absolute top-10 right-0 w-6 h-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm">
                  <Upload className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={(e) => handleReplacePhoto(photo.id, e)}
                    className="hidden"
                  />
                </label>
              </>
            )}
          </div>
        ))}

        {/* Add new gallery photo button */}
        {isEditing && (
          <div className="flex gap-4 items-center flex-shrink-0">
            {galleryPhotos.length + galleryPreviews.length < 6 && (
              <div className="aspect-square w-32 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <label className="cursor-pointer flex flex-col items-center gap-1">
                  <Upload className="w-5 h-5 text-gray-400" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Add photos</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    multiple
                    onChange={handleGalleryPhotoChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
