'use client'

import { useState } from 'react'
import { Camera, Upload, X, Star, StarOff, Plus, Check } from 'lucide-react'

interface PhotoSectionProps {
  profileData: any
  isEditing?: boolean
  onPhotoUpload?: (file: File, isMainPhoto?: boolean) => void
}

export default function PhotoSection({ 
  profileData, 
  isEditing = false, 
  onPhotoUpload 
}: PhotoSectionProps) {
  // Mock gallery photos for demonstration
  const [galleryPhotos, setGalleryPhotos] = useState<Array<{id: string, url: string, isMain: boolean}>>(
    profileData.galleryPhotos || [
      // Add some sample photos if none exist in profile data
      { id: '1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop', isMain: false },
      { id: '2', url: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=300&h=300&fit=crop', isMain: false },
    ]
  );
  
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isMainPhoto: boolean = false) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedPhoto(file);
      
      // Generate preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      if (onPhotoUpload) {
        onPhotoUpload(file, isMainPhoto);
      }
    }
  }
  
  const handleRemovePreview = () => {
    setSelectedPhoto(null);
    setPreviewUrl(null);
  }
  
  const handleSetMainPhoto = (photoId: string) => {
    setGalleryPhotos(galleryPhotos.map(photo => ({
      ...photo,
      isMain: photo.id === photoId
    })));
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Photos</h3>
      </div>
      
      {/* Main Profile Photo */}
      <div className="flex flex-col md:flex-row md:items-start gap-8 mb-8">
        <div className="flex flex-col items-center">
          <div className="relative mb-3">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-purple-200 dark:border-purple-800 bg-gray-100 dark:bg-gray-700 shadow-md">
              {profileData.profileImageUrl ? (
                <img
                  src={profileData.profileImageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
            
            {isEditing && (
              <label className="absolute bottom-0 right-0 w-10 h-10 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center cursor-pointer transition-colors shadow-md">
                <Upload className="w-5 h-5 text-white" />
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={(e) => handleFileChange(e, true)}
                  className="hidden"
                />
              </label>
            )}
          </div>
          
          <div className="text-center">
            <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">
              Main Profile Photo
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This photo will be shown in matches
            </p>
          </div>
        </div>
        
        {/* Preview Area */}
        {previewUrl && (
          <div className="flex-1 flex flex-col items-center md:items-start">
            <div className="relative mb-3">
              <div className="w-40 h-40 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <button 
                onClick={handleRemovePreview}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-sm"
                title="Remove"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            
            <div className="text-center md:text-left">
              <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                Preview
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Will be saved when you click "Save Changes"
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Gallery Photos */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-800 dark:text-gray-200">Photo Gallery</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{galleryPhotos.length} of 6 photos</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* Existing Gallery Photos */}
          {galleryPhotos.map((photo) => (
            <div key={photo.id} className="relative group">
              <div className={`aspect-square rounded-lg overflow-hidden border-2 ${photo.isMain ? 'border-purple-500 dark:border-purple-400' : 'border-gray-200 dark:border-gray-700'}`}>
                <img 
                  src={photo.url} 
                  alt="Gallery" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {isEditing && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                  <div className="flex gap-2">
                    {!photo.isMain && (
                      <button 
                        onClick={() => handleSetMainPhoto(photo.id)}
                        className="w-8 h-8 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center"
                        title="Set as main photo"
                      >
                        <Star className="w-4 h-4 text-white" />
                      </button>
                    )}
                    
                    <button 
                      className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center"
                      title="Remove photo"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              )}
              
              {photo.isMain && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {/* Add Photo Button */}
          {isEditing && galleryPhotos.length < 6 && (
            <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 dark:hover:border-purple-500 transition-colors">
              <Plus className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Add Photo</span>
              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          Supported formats: JPG, PNG (Max: 5MB per photo)
        </p>
      </div>
    </div>
  )
}
