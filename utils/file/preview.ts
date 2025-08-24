// File preview utilities
export const createFilePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export const revokeFilePreview = (previewUrl: string): void => {
  if (previewUrl.startsWith('blob:')) {
    URL.revokeObjectURL(previewUrl)
  }
}

export const createObjectURL = (file: File): string => {
  return URL.createObjectURL(file)
}
