'use client'
import React, { useState } from 'react'
import { Upload, X, Eye, CheckCircle, AlertCircle, Camera } from 'lucide-react'

interface DocumentUpload {
  file: File | null
  preview: string | null
}

export default function VerificationContent() {
  const [frontDocument, setFrontDocument] = useState<DocumentUpload>({ file: null, preview: null })
  const [backDocument, setBackDocument] = useState<DocumentUpload>({ file: null, preview: null })
  const [selfieImage, setSelfieImage] = useState<DocumentUpload>({ file: null, preview: null })
  const [documentType, setDocumentType] = useState<string>('passport')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileUpload = (
    file: File,
    setDocument: React.Dispatch<React.SetStateAction<DocumentUpload>>
  ) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setDocument({
          file,
          preview: e.target?.result as string
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeDocument = (setDocument: React.Dispatch<React.SetStateAction<DocumentUpload>>) => {
    setDocument({ file: null, preview: null })
  }

  const handleSubmit = async () => {
    if (!frontDocument.file || !selfieImage.file) {
      alert('Please upload required documents')
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Documents submitted for verification successfully!')
    }, 2000)
  }

  const isFormValid = frontDocument.file && selfieImage.file && 
    (documentType === 'passport' || backDocument.file)

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Identity Verification</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          To ensure the safety and authenticity of our community, please upload your identification documents. 
          All information is encrypted and securely stored.
        </p>
      </div>

      {/* Document Type Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Document Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { value: 'passport', label: 'Passport', desc: 'International passport' },
            { value: 'national_id', label: 'National ID', desc: 'Government issued ID' },
            { value: 'driving_license', label: 'Driving License', desc: 'Valid driving license' }
          ].map((type) => (
            <button
              key={type.value}
              onClick={() => setDocumentType(type.value)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                documentType === type.value
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="font-medium text-gray-900 dark:text-white">{type.label}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{type.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Document Upload Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Front Document */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            Front Side {documentType === 'passport' ? '(Photo Page)' : ''}
          </h3>
          
          {!frontDocument.preview ? (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-purple-400 dark:hover:border-purple-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], setFrontDocument)}
                className="hidden"
                id="front-upload"
              />
              <label htmlFor="front-upload" className="cursor-pointer">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300 font-medium">Click to upload front side</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">PNG, JPG up to 10MB</p>
              </label>
            </div>
          ) : (
            <div className="relative">
              <img
                src={frontDocument.preview}
                alt="Front document preview"
                className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
              />
              <button
                onClick={() => removeDocument(setFrontDocument)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="mt-3 flex items-center text-green-600 dark:text-green-400">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Document uploaded successfully</span>
              </div>
            </div>
          )}
        </div>

        {/* Back Document (if not passport) */}
        {documentType !== 'passport' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Back Side
            </h3>
            
            {!backDocument.preview ? (
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-purple-400 dark:hover:border-purple-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], setBackDocument)}
                  className="hidden"
                  id="back-upload"
                />
                <label htmlFor="back-upload" className="cursor-pointer">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300 font-medium">Click to upload back side</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">PNG, JPG up to 10MB</p>
                </label>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={backDocument.preview}
                  alt="Back document preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                />
                <button
                  onClick={() => removeDocument(setBackDocument)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="mt-3 flex items-center text-green-600 dark:text-green-400">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Document uploaded successfully</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selfie Upload */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Camera className="w-5 h-5 mr-2" />
          Selfie Photo
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          Take a clear selfie holding your document next to your face for verification.
        </p>
        
        {!selfieImage.preview ? (
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-purple-400 dark:hover:border-purple-500 transition-colors max-w-md mx-auto">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], setSelfieImage)}
              className="hidden"
              id="selfie-upload"
            />
            <label htmlFor="selfie-upload" className="cursor-pointer">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300 font-medium">Click to upload selfie</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">PNG, JPG up to 10MB</p>
            </label>
          </div>
        ) : (
          <div className="relative max-w-md mx-auto">
            <img
              src={selfieImage.preview}
              alt="Selfie preview"
              className="w-full h-64 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
            />
            <button
              onClick={() => removeDocument(setSelfieImage)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="mt-3 flex items-center justify-center text-green-600 dark:text-green-400">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Selfie uploaded successfully</span>
            </div>
          </div>
        )}
      </div>

      {/* Guidelines */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Upload Guidelines
        </h3>
        <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
          <li>• Ensure all text and details are clearly visible</li>
          <li>• Photos should be well-lit with no shadows or glare</li>
          <li>• Document should be flat and fully visible in the frame</li>
          <li>• Selfie should show your face clearly alongside the document</li>
          <li>• File formats: JPG, PNG (max 10MB each)</li>
        </ul>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          className={`px-8 py-4 rounded-xl font-semibold text-white transition-all transform ${
            isFormValid && !isSubmitting
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105 shadow-lg'
              : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Submitting for Verification...
            </div>
          ) : (
            'Send For Verification'
          )}
        </button>
        
        {!isFormValid && (
          <p className="text-red-500 dark:text-red-400 text-sm mt-3">
            Please upload all required documents before submitting
          </p>
        )}
      </div>

      {/* Processing Info */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 text-center">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What happens next?</h4>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Our verification team will review your documents within 24-48 hours. 
          You'll receive an email notification once the verification is complete.
        </p>
      </div>
    </div>
  )
}
