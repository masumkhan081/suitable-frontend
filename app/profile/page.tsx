'use client'
import React, { useState } from 'react'
import { User, Settings, Heart, Shield, HelpCircle, MessageCircle, Camera, MapPin, Calendar, Phone, Mail, Edit3, Eye, EyeOff, Plus } from 'lucide-react'
import TopNav from '@/components/TopNav'

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('profile')

  const sidebarItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'preference', label: 'Filter & Preferences', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'privacy', label: 'Data Privacy', icon: Shield },
    { id: 'support', label: 'Contact Support', icon: MessageCircle },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ]

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

  const getPageControls = () => {
    if (activeTab === 'profile') {
      return (
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => window.open('/profile/preview', '_blank')}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNav />
      
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
              {getPageControls()}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'profile' && <ProfileContent />}
          {activeTab === 'preference' && <PreferenceContent />}
          {activeTab === 'settings' && <SettingsContent />}
          {activeTab === 'privacy' && <PrivacyContent />}
          {activeTab === 'support' && <SupportContent />}
          {activeTab === 'faq' && <FAQContent />}
        </div>
      </div>
    </div>
  )
}

// Profile Content Component with Edit Functionality
function ProfileContent() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: 'Ahmed',
    lastName: 'Hassan',
    email: 'ahmed.hassan@example.com',
    phone: '+1 (555) 123-4567',
    aboutMe: 'Assalamu Alaikum! I am a practicing Muslim looking for a life partner who shares my values and commitment to Islam.',
    height: '5\'10"',
    maritalStatus: 'Never Married',
    ethnicity: 'Arab',
    livingArrangement: 'With Family',
    education: 'Bachelor\'s Degree',
    profession: 'Software Engineer',
    drinkAlcohol: 'Never',
    smoke: 'Never',
    prayerFrequency: '5 times a day',
    religiousServiceAttendance: 'Weekly',
    marriageTimingPreference: 'Within 1 year',
    relocationWillingness: 'Yes',
    children: 'Want children',
    polygamy: 'No'
  })

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="p-8 space-y-6">
      {/* Edit Toggle Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Photos Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Photos</h3>
        
        <div className="grid grid-cols-6 gap-3 max-w-2xl">
          {/* Main Photo */}
          <div className="col-span-2">
            <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer">
              <div className="text-center">
                <Camera className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs text-gray-500 dark:text-gray-400">Main Photo</p>
              </div>
            </div>
          </div>

          {/* Additional Photos */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className="col-span-1">
              <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer">
                <Plus className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Me Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">About Me</h3>
        
        <textarea
          value={profileData.aboutMe}
          onChange={(e) => handleInputChange('aboutMe', e.target.value)}
          readOnly={!isEditing}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white resize-none ${
            isEditing 
              ? 'border-gray-300 dark:border-gray-600 dark:bg-gray-700' 
              : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
          rows={4}
          placeholder="Tell others about yourself..."
        />
      </div>

      {/* Personal Details */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Personal Details</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input
                type="text"
                value={`${profileData.firstName} ${profileData.lastName}`}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                readOnly={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white ${
                  isEditing 
                    ? 'border-gray-300 dark:border-gray-600 dark:bg-gray-700' 
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone number</label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              readOnly={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white ${
                isEditing 
                  ? 'border-gray-300 dark:border-gray-600 dark:bg-gray-700' 
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Height</label>
            <select
              value={profileData.height}
              onChange={(e) => handleInputChange('height', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white ${
                isEditing 
                  ? 'border-gray-300 dark:border-gray-600 dark:bg-gray-700' 
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <option value="5'0&quot;">5'0"</option>
              <option value="5'1&quot;">5'1"</option>
              <option value="5'2&quot;">5'2"</option>
              <option value="5'3&quot;">5'3"</option>
              <option value="5'4&quot;">5'4"</option>
              <option value="5'5&quot;">5'5"</option>
              <option value="5'6&quot;">5'6"</option>
              <option value="5'7&quot;">5'7"</option>
              <option value="5'8&quot;">5'8"</option>
              <option value="5'9&quot;">5'9"</option>
              <option value="5'10&quot;">5'10"</option>
              <option value="5'11&quot;">5'11"</option>
              <option value="6'0&quot;">6'0"</option>
              <option value="6'1&quot;">6'1"</option>
              <option value="6'2&quot;">6'2"</option>
              <option value="6'3&quot;">6'3"</option>
              <option value="6'4&quot;">6'4"</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Marital Status</label>
            <select
              value={profileData.maritalStatus}
              onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white ${
                isEditing 
                  ? 'border-gray-300 dark:border-gray-600 dark:bg-gray-700' 
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <option value="Never Married">Never Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ethnicity</label>
            <select
              value={profileData.ethnicity}
              onChange={(e) => handleInputChange('ethnicity', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white ${
                isEditing 
                  ? 'border-gray-300 dark:border-gray-600 dark:bg-gray-700' 
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <option value="Arab">Arab</option>
              <option value="South Asian">South Asian</option>
              <option value="African">African</option>
              <option value="Turkish">Turkish</option>
              <option value="Persian">Persian</option>
              <option value="Southeast Asian">Southeast Asian</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Living Arrangement</label>
            <select
              value={profileData.livingArrangement}
              onChange={(e) => handleInputChange('livingArrangement', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white ${
                isEditing 
                  ? 'border-gray-300 dark:border-gray-600 dark:bg-gray-700' 
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <option value="With Family">With Family</option>
              <option value="Alone">Alone</option>
              <option value="With Roommates">With Roommates</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Education</label>
            <select
              value={profileData.education}
              onChange={(e) => handleInputChange('education', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white ${
                isEditing 
                  ? 'border-gray-300 dark:border-gray-600 dark:bg-gray-700' 
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <option value="High School">High School</option>
              <option value="Some College">Some College</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="PhD">PhD</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profession</label>
            <input
              type="text"
              value={profileData.profession}
              onChange={(e) => handleInputChange('profession', e.target.value)}
              readOnly={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white ${
                isEditing 
                  ? 'border-gray-300 dark:border-gray-600 dark:bg-gray-700' 
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Personal Information</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">All lifestyle questions to make your profile visible to others</p>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Drink Alcohol</label>
              <select
                value={profileData.drinkAlcohol}
                onChange={(e) => handleInputChange('drinkAlcohol', e.target.value)}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white ${
                  isEditing 
                    ? 'border-gray-300 dark:border-gray-600 dark:bg-gray-700' 
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                <option value="Never">Never</option>
                <option value="Occasionally">Occasionally</option>
                <option value="Socially">Socially</option>
                <option value="Regularly">Regularly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Smoke</label>
              <select
                value={profileData.smoke}
                onChange={(e) => handleInputChange('smoke', e.target.value)}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white ${
                  isEditing 
                    ? 'border-gray-300 dark:border-gray-600 dark:bg-gray-700' 
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                <option value="Never">Never</option>
                <option value="Occasionally">Occasionally</option>
                <option value="Socially">Socially</option>
                <option value="Regularly">Regularly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prayer Frequency</label>
              <select
                value={profileData.prayerFrequency}
                onChange={(e) => handleInputChange('prayerFrequency', e.target.value)}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white ${
                  isEditing 
                    ? 'border-gray-300 dark:border-gray-600 dark:bg-gray-700' 
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                <option value="5 times a day">5 times a day</option>
                <option value="Sometimes">Sometimes</option>
                <option value="Rarely">Rarely</option>
                <option value="Never">Never</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Religious Service Attendance</label>
              <select
                value={profileData.religiousServiceAttendance}
                onChange={(e) => handleInputChange('religiousServiceAttendance', e.target.value)}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white ${
                  isEditing 
                    ? 'border-gray-300 dark:border-gray-600 dark:bg-gray-700' 
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Occasionally">Occasionally</option>
                <option value="Never">Never</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Marriage Timing Preference</label>
              <select
                value={profileData.marriageTimingPreference}
                onChange={(e) => handleInputChange('marriageTimingPreference', e.target.value)}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white ${
                  isEditing 
                    ? 'border-gray-300 dark:border-gray-600 dark:bg-gray-700' 
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                <option value="Within 6 months">Within 6 months</option>
                <option value="Within 1 year">Within 1 year</option>
                <option value="Within 2 years">Within 2 years</option>
                <option value="No rush">No rush</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Relocation Willingness</label>
              <select
                value={profileData.relocationWillingness}
                onChange={(e) => handleInputChange('relocationWillingness', e.target.value)}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white ${
                  isEditing 
                    ? 'border-gray-300 dark:border-gray-600 dark:bg-gray-700' 
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Children</label>
              <select
                value={profileData.children}
                onChange={(e) => handleInputChange('children', e.target.value)}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white ${
                  isEditing 
                    ? 'border-gray-300 dark:border-gray-600 dark:bg-gray-700' 
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                <option value="Want children">Want children</option>
                <option value="Have children">Have children</option>
                <option value="Don't want children">Don't want children</option>
                <option value="Undecided">Undecided</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Polygamy</label>
              <select
                value={profileData.polygamy}
                onChange={(e) => handleInputChange('polygamy', e.target.value)}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white ${
                  isEditing 
                    ? 'border-gray-300 dark:border-gray-600 dark:bg-gray-700' 
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
                <option value="Maybe">Maybe</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button - Only show when editing */}
      {isEditing && (
        <div className="flex justify-end space-x-4">
          <button 
            onClick={() => setIsEditing(false)}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors transform hover:scale-105"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  )
}

// Placeholder Components
function PreferenceContent() {
  return (
    <div className="p-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Preferences</h3>
        <p className="text-gray-600 dark:text-gray-400">Preference settings coming soon...</p>
      </div>
    </div>
  )
}

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
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Privacy</h3>
        <p className="text-gray-600 dark:text-gray-400">Privacy settings coming soon...</p>
      </div>
    </div>
  )
}

function SupportContent() {
  return (
    <div className="p-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Support</h3>
        <p className="text-gray-600 dark:text-gray-400">Support information coming soon...</p>
      </div>
    </div>
  )
}

function FAQContent() {
  return (
    <div className="p-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">FAQ</h3>
        <p className="text-gray-600 dark:text-gray-400">FAQ coming soon...</p>
      </div>
    </div>
  )
}
