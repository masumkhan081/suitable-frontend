// Main upload service exports
export * from './types'
export * from './presets'

import { UploadResponse, UploadOptions, UploadPreset } from './types'
import { UPLOAD_PRESETS } from './presets'
import { FileValidationOptions, validateFile } from '../../utils/file/validation'

class UploadService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  async uploadSingle(
    file: File, 
    preset: UploadPreset | UploadOptions = 'PROFILE_PICTURE',
    validation?: FileValidationOptions
  ): Promise<UploadResponse> {
    // Validate file if options provided
    if (validation) {
      validateFile(file, validation)
    }

    const formData = new FormData()
    formData.append('file', file)

    // Handle preset or custom options
    const uploadOptions = typeof preset === 'string' 
      ? UPLOAD_PRESETS[preset] 
      : preset

    if (uploadOptions.folder) {
      formData.append('folder', uploadOptions.folder)
    }

    const response = await fetch(`${this.baseUrl}/api/upload/single`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error || 'Upload failed')
    }

    return response.json()
  }

  async uploadMultiple(
    files: File[], 
    preset: UploadPreset | UploadOptions = 'GALLERY_PHOTO',
    validation?: FileValidationOptions
  ): Promise<UploadResponse[]> {
    // Validate all files if options provided
    if (validation) {
      files.forEach(file => validateFile(file, validation))
    }

    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })

    // Handle preset or custom options
    const uploadOptions = typeof preset === 'string' 
      ? UPLOAD_PRESETS[preset] 
      : preset

    if (uploadOptions.folder) {
      formData.append('folder', uploadOptions.folder)
    }

    const response = await fetch(`${this.baseUrl}/api/upload/multiple`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error || 'Upload failed')
    }

    return response.json()
  }

  async deleteFile(publicId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/upload/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId }),
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error || 'Delete failed')
    }
  }
}

export const uploadService = new UploadService()
