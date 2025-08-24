import React from 'react'
import { ProfilePhoto } from './ProfilePhoto'
import { ImageGallery } from './ImageGallery'

interface Photo {
  id: string
  url: string
  isPreview?: boolean
  file?: File
}

interface ProfileData {
  profileImage: string | null
  imageGallery: Photo[]
}

interface PhotoSectionProps {
  profileData: ProfileData
  isEditing: boolean
  onProfileUpdate?: (data: Partial<ProfileData>) => void
}

export default function PhotoSection({
  profileData,
  isEditing,
  onProfileUpdate
}: PhotoSectionProps) {
  const handleProfileImageUpdate = (url: string) => {
    onProfileUpdate?.({ profileImage: url })
  }

  const handleGalleryUpdate = (photos: Photo[]) => {
    onProfileUpdate?.({ imageGallery: photos })
  }

  return (
    <div className="space-y-6">
      <ProfilePhoto
        profileImage={profileData.profileImage}
        isEditing={isEditing}
        onProfileImageUpdate={handleProfileImageUpdate}
      />

      <ImageGallery
        galleryPhotos={profileData.imageGallery || []}
        isEditing={isEditing}
        onGalleryUpdate={handleGalleryUpdate}
      />
    </div>
  )
}
