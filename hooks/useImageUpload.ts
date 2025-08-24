'use client'

import { useState, useCallback } from 'react'
import { uploadService, UploadResponse, UploadOptions, UPLOAD_PRESETS, UploadPreset } from '../services/upload/index'
import { FileValidationOptions } from '../utils/file/validation'
import { createFilePreview } from '../utils/file/preview'

export interface UseImageUploadOptions {
  preset?: UploadPreset | UploadOptions
  validation?: FileValidationOptions
  onSuccess?: (result: UploadResponse | UploadResponse[]) => void
  onError?: (error: string) => void
}

export interface UseImageUploadReturn {
  upload: (file: File) => Promise<UploadResponse>
  uploadMultiple: (files: File[]) => Promise<UploadResponse[]>
  isUploading: boolean
  progress: number
  error: string | null
  preview: string | null
  setPreview: (preview: string | null) => void
  createPreview: (file: File) => Promise<string>
}

export function useImageUpload(options: UseImageUploadOptions = {}): UseImageUploadReturn {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const upload = useCallback(async (file: File): Promise<UploadResponse> => {
    setIsUploading(true)
    setError(null)
    setProgress(0)

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90))
      }, 100)

      const result = await uploadService.uploadSingle(
        file, 
        options.preset || 'PROFILE_PICTURE',
        options.validation
      )

      clearInterval(progressInterval)
      setProgress(100)
      
      options.onSuccess?.(result)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Upload failed'
      setError(errorMessage)
      options.onError?.(errorMessage)
      throw err
    } finally {
      setIsUploading(false)
      setTimeout(() => setProgress(0), 1000)
    }
  }, [options])

  const uploadMultiple = useCallback(async (files: File[]): Promise<UploadResponse[]> => {
    setIsUploading(true)
    setError(null)
    setProgress(0)

    try {
      const results = await uploadService.uploadMultiple(
        files,
        options.preset || 'GALLERY_PHOTO',
        options.validation
      )

      setProgress(100)
      options.onSuccess?.(results)
      return results
    } catch (err: any) {
      const errorMessage = err.message || 'Upload failed'
      setError(errorMessage)
      options.onError?.(errorMessage)
      throw err
    } finally {
      setIsUploading(false)
      setTimeout(() => setProgress(0), 1000)
    }
  }, [options])

  const createPreview = useCallback(async (file: File): Promise<string> => {
    const previewUrl = await createFilePreview(file)
    setPreview(previewUrl)
    return previewUrl
  }, [])

  return {
    upload,
    uploadMultiple,
    isUploading,
    progress,
    error,
    preview,
    setPreview,
    createPreview
  }
}
