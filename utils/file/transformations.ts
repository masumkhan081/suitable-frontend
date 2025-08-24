// ImageKit transformation utilities
export interface ImageTransformation {
  width?: number
  height?: number
  quality?: number
  format?: 'auto' | 'webp' | 'jpeg' | 'png'
  crop?: 'maintain_ratio' | 'force' | 'at_least' | 'at_max'
  focus?: 'auto' | 'face' | 'center'
}

export const buildTransformationString = (transformations: ImageTransformation): string => {
  const params = []
  
  if (transformations.width) params.push(`w-${transformations.width}`)
  if (transformations.height) params.push(`h-${transformations.height}`)
  if (transformations.quality) params.push(`q-${transformations.quality}`)
  if (transformations.format) params.push(`f-${transformations.format}`)
  if (transformations.crop) params.push(`c-${transformations.crop}`)
  if (transformations.focus) params.push(`fo-${transformations.focus}`)
  
  return params.length > 0 ? `tr:${params.join(',')}` : ''
}

export const getOptimizedImageUrl = (
  originalUrl: string,
  transformations: ImageTransformation = {}
): string => {
  const transformationString = buildTransformationString(transformations)
  
  if (!transformationString) return originalUrl
  
  // Insert transformations into ImageKit URL
  return originalUrl.replace(/\/([^\/]+)$/, `/${transformationString}/$1`)
}

// Common transformation presets
export const IMAGE_TRANSFORMATIONS = {
  PROFILE_PICTURE: {
    width: 400,
    height: 400,
    crop: 'face' as const,
    quality: 80,
    format: 'auto' as const
  },
  GALLERY_PHOTO: {
    width: 800,
    height: 800,
    crop: 'maintain_ratio' as const,
    quality: 85,
    format: 'auto' as const
  },
  THUMBNAIL: {
    width: 150,
    height: 150,
    crop: 'force' as const,
    quality: 70,
    format: 'auto' as const
  },
  COVER_PHOTO: {
    width: 1200,
    height: 400,
    crop: 'maintain_ratio' as const,
    quality: 85,
    format: 'auto' as const
  }
}
