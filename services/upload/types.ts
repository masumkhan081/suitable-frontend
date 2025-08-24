// Upload service types
export interface UploadResponse {
  url: string
  secure_url: string
  public_id: string
  asset_id?: string
  version?: number
  format?: string
  width?: number
  height?: number
  bytes?: number
  original_filename?: string
}

export interface UploadOptions {
  folder?: string
  transformation?: string
  quality?: 'auto' | number
  format?: 'auto' | 'jpg' | 'png' | 'webp'
  resize?: {
    width?: number
    height?: number
    crop?: 'fill' | 'fit' | 'scale' | 'crop'
  }
}

export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

export type UploadPreset = 'PROFILE_PICTURE' | 'GALLERY_PHOTO' | 'DOCUMENT' | 'AVATAR'
