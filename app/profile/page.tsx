//@ts-nocheck
'use client'

import React, { useState, useEffect } from 'react'
import { User, Settings, Heart, Shield, HelpCircle, MessageCircle, Edit2, Save, X, Eye, CheckCircle, Mail, MessageSquare, Sparkles, Users } from 'lucide-react'
import { ProfileService } from '@/services/profileService'
import { toast } from 'sonner'
import PersonalDetailsSection from '@/components/profile/PersonalDetailsSection'
import LocationBackgroundSection from '@/components/profile/LocationBackgroundSection'
import EducationCareerSection from '@/components/profile/EducationCareerSection'
import ReligiousLifestyleSection from '@/components/profile/ReligiousLifestyleSection'
import PhotoSection from '@/components/profile/PhotoSection'
import VerificationContent from '@/components/profile/VerificationContent'
import FAQAccordion from '@/components/profile/FAQContent'
import TopNav from '@/components/TopNav'

interface Profile {
  _id: string
  userId: string
  dob?: string
  gender?: string
  height?: string
  maritalStatus?: string
  numberOfChildren?: number
  numberOfSiblings?: number
  ethnicOrigin?: string
  nationality?: string
  currentAddress?: string
  backHomeAddress?: string
  isWillingToRelocate?: boolean
  educations?: any[]
  profession?: string
  religion?: string
  sect?: string
  quranReadingStatus?: string
  halalEatingStatus?: string
  alcoholConsumptionStatus?: string
  smokingStatus?: string
  prayerFrequency?: string
  aboutme?: string
  profileImage?: string
  profileImageUrl?: string
  onboardingCompletion?: number
  createdAt?: string
  updatedAt?: string
}

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState<string>(() => {
    // Try to get saved tab from localStorage if in browser environment
    if (typeof window !== 'undefined') {
      const savedTab = localStorage.getItem('last-active-profile-tab')
      return savedTab || 'profile'
    }
    return 'profile'
  })
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Save active tab to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('last-active-profile-tab', activeTab)
    }
  }, [activeTab])
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  // Navigation items for TopNav - same as matching pages
  const navigationItems = [
    {
      label: 'Matches',
      href: '/matching/matches',
      icon: Heart,
    },
    {
      label: 'Interests',
      href: '/matching/interests',
      icon: Sparkles,
    },
    {
      label: 'Mutual Matches',
      href: '/matching/mutual-matches',
      icon: Users,
    }
  ]

  const sidebarItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'verification', label: 'Verification', icon: CheckCircle },
    { id: 'preference', label: 'Filter & Preferences', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'privacy', label: 'Data Privacy', icon: Shield },
    { id: 'support', label: 'Contact Support', icon: MessageCircle },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ]

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await ProfileService.getMyProfile()
      
      if (response.success && response.data) {
        setProfile(response.data.profile)
      } else {
        setError('Failed to load profile')
        toast.error('Failed to load profile')
      }
    } catch (err) {
      setError('An error occurred while loading profile')
      toast.error('An error occurred while loading profile')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset any unsaved changes
    fetchProfile()
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      // TODO: Implement save functionality
      // await ProfileService.updateProfile(profile)
      
      toast.success('Profile updated successfully!')
      setIsEditing(false)
    } catch (err) {
      toast.error('Failed to save profile changes')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePhotoUpload = async (file: File) => {
    try {
      // TODO: Implement photo upload
      toast.success('Photo uploaded successfully!')
    } catch (err) {
      toast.error('Failed to upload photo')
    }
  }

  const calculateCompletionPercentage = (profile: Profile | null): number => {
    if (!profile) return 0
    return profile.onboardingCompletion || 0
  }

  const getPageTitle = () => {
    switch (activeTab) {
      case 'profile': return 'My Profile'
      case 'preference': return 'Filter & Preferences'
      case 'settings': return 'Settings'
      case 'privacy': return 'Data Privacy'
      case 'support': return 'Contact Support'
      case 'faq': return 'FAQ'
      default: return 'Profile'
    }
  }



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchProfile}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNav 
        userRole="user" 
        userName="Sorwar" 
        customNavItems={navigationItems}
      />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 shadow-sm border-r border-gray-200 dark:border-gray-700 min-h-screen">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Account Settings</h2>
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{getPageTitle()}</h1>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'profile' && (
            <ProfileContent 
              profile={profile} 
              isEditing={isEditing} 
              onPhotoUpload={handlePhotoUpload}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              isSaving={isSaving}
              completionPercentage={calculateCompletionPercentage(profile)}
            />
          )}
          {activeTab === 'verification' && <VerificationContent />}
          {activeTab === 'preference' && <PreferenceContent />}
          {activeTab === 'settings' && <SettingsContent />}
          {activeTab === 'privacy' && <PrivacyContent />}
          {activeTab === 'support' && <SupportContent />}
          {activeTab === 'faq' && <FAQAccordion />}
        </div>
      </div>
    </div>
  )
}

// Profile Content Component with Modular Sections
function ProfileContent({ profile, isEditing, onPhotoUpload, onEdit, onSave, onCancel, isSaving, completionPercentage }: { 
  profile: Profile | null, 
  isEditing: boolean, 
  onPhotoUpload: (file: File) => void,
  onEdit: () => void,
  onSave: () => void,
  onCancel: () => void,
  isSaving: boolean,
  completionPercentage: number
}) {
  
  return (
    <div className="p-8 space-y-6">
      {/* Profile Completion and Edit Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          {/* Profile Completion */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Profile Completion:</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                {completionPercentage}%
              </span>
            </div>
          </div>
          
          {/* Edit/Save/Cancel Controls */}
          <div className="flex items-center space-x-3">
            {!isEditing ? (
              <>
                <button 
                  onClick={() => window.open('/profile/preview', '_blank')}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={onEdit}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onCancel}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={onSave}
                  disabled={isSaving}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      <PhotoSection 
        profileData={profile} 
        isEditing={isEditing}
        onPhotoUpload={onPhotoUpload}
      />
      
      <PersonalDetailsSection 
        profileData={profile} 
        isEditing={isEditing}
      />
      
      <LocationBackgroundSection 
        profileData={profile} 
        isEditing={isEditing}
      />
      
      <EducationCareerSection 
        profileData={profile} 
        isEditing={isEditing}
      />
      
      <ReligiousLifestyleSection 
        profileData={profile} 
        isEditing={isEditing}
      />
    </div>
  )
}

// Filter & Preferences Content Component
function PreferenceContent() {
  const [preferences, setPreferences] = useState({
    ageRange: { min: 18, max: 35 },
    heightRange: { min: 150, max: 190 },
    maritalStatus: [] as string[],
    countries: [] as string[],
    religion: [] as string[],
    sect: [] as string[],
    education: [] as string[],
    profession: [] as string[],
    eatHalal: 'any' as 'any' | 'yes' | 'no',
    smoke: 'any' as 'any' | 'yes' | 'no',
    drinkAlcohol: 'any' as 'any' | 'yes' | 'no',
    wearHijabKeepBeard: 'any' as 'any' | 'yes' | 'no',
    prayerFrequency: [] as string[]
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const maritalStatusOptions = ['Single', 'Divorced', 'Widowed']
  const countryOptions = ['Bangladesh', 'India', 'Pakistan', 'UK', 'USA', 'Canada', 'Australia', 'Saudi Arabia', 'UAE']
  const religionOptions = ['Islam', 'Christianity', 'Judaism', 'Hinduism', 'Buddhism', 'Other']
  const sectOptions = ['Sunni', 'Shia', 'Other', 'None']
  const educationOptions = ['High School', 'Bachelor\'s', 'Master\'s', 'PhD', 'Diploma', 'Other']
  const professionOptions = ['Doctor', 'Engineer', 'Teacher', 'Business', 'IT Professional', 'Student', 'Other']
  const prayerOptions = ['5 times a day', 'Sometimes', 'Rarely', 'Never']

  const handleRangeChange = (field: 'ageRange' | 'heightRange', type: 'min' | 'max', value: number) => {
    setPreferences(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [type]: value
      }
    }))
  }

  const handleMultiSelect = (field: string, value: string) => {
    setPreferences(prev => {
      const currentValues = prev[field as keyof typeof prev] as string[]
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value]
      
      return {
        ...prev,
        [field]: newValues
      }
    })
  }

  const handleSingleSelect = (field: string, value: 'any' | 'yes' | 'no') => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // TODO: Implement API call to save preferences
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      toast.success('Preferences saved successfully!')
    } catch (error) {
      toast.error('Failed to save preferences')
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    setPreferences({
      ageRange: { min: 18, max: 35 },
      heightRange: { min: 150, max: 190 },
      maritalStatus: [],
      countries: [],
      religion: [],
      sect: [],
      education: [],
      profession: [],
      eatHalal: 'any',
      smoke: 'any',
      drinkAlcohol: 'any',
      wearHijabKeepBeard: 'any',
      prayerFrequency: []
    })
    toast.info('Preferences reset to default')
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header with Save/Reset buttons */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Matching Preferences</h3>
            <p className="text-gray-600 dark:text-gray-400">Set your preferences to find compatible matches</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{isSaving ? 'Saving...' : 'Save Preferences'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Age Range */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-4">Age Range</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Minimum Age</label>
            <input
              type="number"
              min="18"
              max="100"
              value={preferences.ageRange.min}
              onChange={(e) => handleRangeChange('ageRange', 'min', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Maximum Age</label>
            <input
              type="number"
              min="18"
              max="100"
              value={preferences.ageRange.max}
              onChange={(e) => handleRangeChange('ageRange', 'max', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Looking for matches between {preferences.ageRange.min} and {preferences.ageRange.max} years old
        </div>
      </div>

      {/* Height Range */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-4">Height Range (cm)</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Minimum Height</label>
            <input
              type="number"
              min="120"
              max="220"
              value={preferences.heightRange.min}
              onChange={(e) => handleRangeChange('heightRange', 'min', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Maximum Height</label>
            <input
              type="number"
              min="120"
              max="220"
              value={preferences.heightRange.max}
              onChange={(e) => handleRangeChange('heightRange', 'max', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Looking for matches between {preferences.heightRange.min}cm and {preferences.heightRange.max}cm tall
        </div>
      </div>

      {/* Marital Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-4">Marital Status</h4>
        <div className="grid grid-cols-3 gap-3">
          {maritalStatusOptions.map((status) => (
            <label key={status} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.maritalStatus.includes(status)}
                onChange={() => handleMultiSelect('maritalStatus', status)}
                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{status}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Countries */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-4">Preferred Countries</h4>
        <div className="grid grid-cols-3 gap-3">
          {countryOptions.map((country) => (
            <label key={country} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.countries.includes(country)}
                onChange={() => handleMultiSelect('countries', country)}
                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{country}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Religious Preferences */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-4">Religious Preferences</h4>
        
        <div className="space-y-4">
          {/* Religion */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Religion</label>
            <div className="grid grid-cols-3 gap-3">
              {religionOptions.map((religion) => (
                <label key={religion} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.religion.includes(religion)}
                    onChange={() => handleMultiSelect('religion', religion)}
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{religion}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sect */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sect</label>
            <div className="grid grid-cols-4 gap-3">
              {sectOptions.map((sect) => (
                <label key={sect} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.sect.includes(sect)}
                    onChange={() => handleMultiSelect('sect', sect)}
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{sect}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Prayer Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prayer Frequency</label>
            <div className="grid grid-cols-2 gap-3">
              {prayerOptions.map((prayer) => (
                <label key={prayer} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.prayerFrequency.includes(prayer)}
                    onChange={() => handleMultiSelect('prayerFrequency', prayer)}
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{prayer}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lifestyle Preferences */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-4">Lifestyle Preferences</h4>
        
        <div className="space-y-6">
          {/* Halal Food */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Eats Halal Food</label>
            <div className="flex space-x-4">
              {['any', 'yes', 'no'].map((option) => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="eatHalal"
                    value={option}
                    checked={preferences.eatHalal === option}
                    onChange={() => handleSingleSelect('eatHalal', option as 'any' | 'yes' | 'no')}
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Smoking */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Smoking</label>
            <div className="flex space-x-4">
              {['any', 'yes', 'no'].map((option) => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="smoke"
                    value={option}
                    checked={preferences.smoke === option}
                    onChange={() => handleSingleSelect('smoke', option as 'any' | 'yes' | 'no')}
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Alcohol */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Drinks Alcohol</label>
            <div className="flex space-x-4">
              {['any', 'yes', 'no'].map((option) => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="drinkAlcohol"
                    value={option}
                    checked={preferences.drinkAlcohol === option}
                    onChange={() => handleSingleSelect('drinkAlcohol', option as 'any' | 'yes' | 'no')}
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Hijab/Beard */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Wears Hijab / Keeps Beard</label>
            <div className="flex space-x-4">
              {['any', 'yes', 'no'].map((option) => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="wearHijabKeepBeard"
                    value={option}
                    checked={preferences.wearHijabKeepBeard === option}
                    onChange={() => handleSingleSelect('wearHijabKeepBeard', option as 'any' | 'yes' | 'no')}
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Education & Career */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-4">Education & Career</h4>
        
        <div className="space-y-4">
          {/* Education */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Education Level</label>
            <div className="grid grid-cols-3 gap-3">
              {educationOptions.map((education) => (
                <label key={education} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.education.includes(education)}
                    onChange={() => handleMultiSelect('education', education)}
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{education}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Profession */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profession</label>
            <div className="grid grid-cols-3 gap-3">
              {professionOptions.map((profession) => (
                <label key={profession} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.profession.includes(profession)}
                    onChange={() => handleMultiSelect('profession', profession)}
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{profession}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Placeholder components for other tabs
function SettingsContent() {
  return (
    <div className="p-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Settings</h3>
        <p className="text-gray-600 dark:text-gray-400">Settings coming soon...</p>
      </div>
    </div>
  )
}

function PrivacyContent() {
  return (
    <div className="p-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Data Privacy</h3>
        <p className="text-gray-600 dark:text-gray-400">Privacy settings coming soon...</p>
      </div>
    </div>
  )
}

function SupportContent() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">We're Here to Help</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Our dedicated support team is available to assist you with any questions or concerns you may have.
        </p>
      </div>

      {/* Contact Options */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Email Support */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Email Support</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Send us an email and we'll get back to you within 24 hours.
              </p>
              <a 
                href="mailto:support@suitable.com" 
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                support@suitable.com
              </a>
            </div>
          </div>
        </div>

        {/* Live Chat */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <MessageSquare className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Live Chat</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Chat with our support team in real-time during business hours.
              </p>
              <button 
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Start Chat
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Available: Mon-Fri, 9AM-6PM EST
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Common Issues */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Common Issues</h3>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <h4 className="font-medium text-gray-800 dark:text-white mb-2">Identity Verification Issues</h4>
            <p className="text-gray-600 dark:text-gray-400">Having trouble with document verification? Make sure your photos are clear and all document details are visible.</p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <h4 className="font-medium text-gray-800 dark:text-white mb-2">Account Access Problems</h4>
            <p className="text-gray-600 dark:text-gray-400">If you're having trouble logging in, try resetting your password or check if your account has been verified.</p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <h4 className="font-medium text-gray-800 dark:text-white mb-2">Matching Algorithm Questions</h4>
            <p className="text-gray-600 dark:text-gray-400">To improve your matches, make sure your profile is complete and your preferences are up to date.</p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800/50">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Send Us a Message</h3>
        <form className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
            <input 
              type="text" 
              id="subject" 
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
              placeholder="How can we help you?"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
            <textarea 
              id="message" 
              rows={4} 
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
              placeholder="Please describe your issue in detail..."
            ></textarea>
          </div>
          <div>
            <button 
              type="submit" 
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 shadow-md"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Local placeholder component removed - now using imported FAQAccordion component
