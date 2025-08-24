// File validation utilities
export interface FileValidationOptions {
  maxSize?: number // in bytes
  allowedTypes?: string[]
  maxWidth?: number
  maxHeight?: number
}

export const DEFAULT_VALIDATION = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  maxWidth: 4000,
  maxHeight: 4000
}

export const validateFile = (file: File, options: FileValidationOptions = {}): boolean => {
  const config = { ...DEFAULT_VALIDATION, ...options }
  
  // Check file size
  if (file.size > config.maxSize) {
    throw new Error(`File size too large. Maximum allowed: ${(config.maxSize / (1024 * 1024)).toFixed(1)}MB`)
  }
  
  // Check file type
  if (!config.allowedTypes.includes(file.type)) {
    throw new Error(`Invalid file type. Allowed types: ${config.allowedTypes.join(', ')}`)
  }
  
  return true
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

export const sanitizeFileName = (filename: string): string => {
  return filename.replace(/[^a-zA-Z0-9.-]/g, '_')
}
