'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Upload, X } from 'lucide-react'
import { useImageUpload } from '../../hooks/useImageUpload'
import { FileValidationOptions } from '../../utils/file/validation'
import { UploadResponse, UploadOptions, UploadPreset } from '../../services/upload/index'

export interface ImageUploadProps {
  onUploadComplete?: (result: UploadResponse | UploadResponse[]) => void
  onError?: (error: string) => void
  preset?: UploadPreset | UploadOptions
  validation?: FileValidationOptions
  accept?: string
  multiple?: boolean
  disabled?: boolean
  className?: string
  children?: React.ReactNode
  showPreview?: boolean
  placeholder?: string
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onUploadComplete,
  onError,
  preset = 'PROFILE_PICTURE',
  validation,
  accept = 'image/*',
  multiple = false,
  disabled = false,
  className = '',
  children,
  showPreview = true,
  placeholder = 'Click to upload or drag and drop'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const {
    upload,
    uploadMultiple,
    isUploading,
    progress,
    error,
    preview,
    setPreview,
    createPreview
  } = useImageUpload({
    preset,
    validation,
    onSuccess: onUploadComplete,
    onError
  })

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return

    try {
      if (multiple) {
        const fileArray = Array.from(files)
        await uploadMultiple(fileArray)
      } else {
        const file = files[0]
        if (showPreview) {
          await createPreview(file)
        }
        await upload(file)
      }
    } catch (err) {
      console.error('Upload failed:', err)
    }
  }, [upload, uploadMultiple, multiple, showPreview, createPreview])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files)
  }, [handleFileSelect])

  const handleClick = useCallback(() => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click()
    }
  }, [disabled, isUploading])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled && !isUploading) {
      setDragOver(true)
    }
  }, [disabled, isUploading])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    if (!disabled && !isUploading) {
      const files = e.dataTransfer.files
      handleFileSelect(files)
    }
  }, [handleFileSelect, disabled, isUploading])

  const clearPreview = useCallback(() => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [setPreview])

  return (
    <div className={`image-upload ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled || isUploading}
      />
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer ${
          dragOver 
            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-purple-400'
        } ${disabled || isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {children || (
          <div className="text-center">
            <Upload className="w-10 h-10 text-gray-400 mb-2 mx-auto" />
            <div className="text-gray-600 dark:text-gray-400 mb-1">
              {isUploading ? 'Uploading...' : placeholder}
            </div>
            <div className="text-xs text-gray-500">
              {multiple ? 'Multiple files supported' : 'Single file only'}
            </div>
          </div>
        )}
        
        {isUploading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1 text-center">
              {progress}%
            </div>
          </div>
        )}
      </div>

      {showPreview && preview && (
        <div className="mt-4">
          <div className="relative inline-block">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-32 h-32 object-cover rounded-lg border border-gray-200"
            />
            <button
              onClick={clearPreview}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  )
}

export default ImageUpload
