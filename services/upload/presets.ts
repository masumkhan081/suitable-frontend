import { UploadPreset, UploadOptions } from './types'

export const UPLOAD_PRESETS: Record<UploadPreset, UploadOptions> = {
  PROFILE_PICTURE: {
    folder: 'profiles',
    format: 'auto',
    quality: 'auto',
    resize: {
      width: 500,
      height: 500,
      crop: 'fill'
    }
  },
  GALLERY_PHOTO: {
    folder: 'gallery',
    format: 'auto',
    quality: 'auto',
    resize: {
      width: 1200,
      height: 800,
      crop: 'fit'
    }
  },
  DOCUMENT: {
    folder: 'documents',
    format: 'auto',
    quality: 90
  },
  AVATAR: {
    folder: 'avatars',
    format: 'auto',
    quality: 'auto',
    resize: {
      width: 150,
      height: 150,
      crop: 'fill'
    }
  }
}