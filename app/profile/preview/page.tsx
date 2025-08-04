'use client'
import React from 'react'
import { ArrowLeft, MapPin, Calendar, Briefcase, GraduationCap, Heart, Users, Home, Baby, Star, MessageCircle, X } from 'lucide-react'

export default function ProfilePreview() {
  // Sample profile data (in real app, this would come from the user's actual profile)
  const profileData = {
    firstName: 'Ahmed',
    lastName: 'Hassan',
    age: 28,
    location: 'New York, NY',
    aboutMe: 'Assalamu Alaikum! I am a practicing Muslim looking for a life partner who shares my values and commitment to Islam. I enjoy reading, traveling, and spending time with family. I believe in building a strong foundation based on mutual respect, understanding, and shared faith.',
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
  }

  const handleClose = () => {
    window.close()
  }

  const handleMessage = () => {
    // In real app, this would open messaging interface
    alert('Message feature would open here')
  }

  const handleLike = () => {
    // In real app, this would handle like/interest
    alert('Like feature would be handled here')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={handleClose}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <X className="w-5 h-5" />
              <span>Close Preview</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleLike}
                className="flex items-center space-x-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
              >
                <Heart className="w-4 h-4" />
                <span>Like</span>
              </button>
              <button 
                onClick={handleMessage}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Photos */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Photos</h3>
              
              <div className="space-y-4">
                {/* Main Photo */}
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {profileData.firstName[0]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Main Photo</p>
                  </div>
                </div>

                {/* Additional Photos Grid */}
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-gray-400">Photo {index + 2}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    {profileData.firstName} {profileData.lastName}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300">{profileData.age} years old</p>
                </div>
                <div className="flex items-center space-x-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300 mb-6">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Briefcase className="w-4 h-4" />
                  <span>{profileData.profession}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Height</div>
                  <div className="font-semibold text-gray-800 dark:text-white">{profileData.height}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Status</div>
                  <div className="font-semibold text-gray-800 dark:text-white">{profileData.maritalStatus}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Ethnicity</div>
                  <div className="font-semibold text-gray-800 dark:text-white">{profileData.ethnicity}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Education</div>
                  <div className="font-semibold text-gray-800 dark:text-white">{profileData.education}</div>
                </div>
              </div>
            </div>

            {/* About Me */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">About Me</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {profileData.aboutMe}
              </p>
            </div>

            {/* Lifestyle & Values */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Lifestyle & Values</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Prayer Frequency</span>
                    <span className="font-medium text-gray-800 dark:text-white">{profileData.prayerFrequency}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Religious Services</span>
                    <span className="font-medium text-gray-800 dark:text-white">{profileData.religiousServiceAttendance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Alcohol</span>
                    <span className="font-medium text-gray-800 dark:text-white">{profileData.drinkAlcohol}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Smoking</span>
                    <span className="font-medium text-gray-800 dark:text-white">{profileData.smoke}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Living Arrangement</span>
                    <span className="font-medium text-gray-800 dark:text-white">{profileData.livingArrangement}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Marriage Timing</span>
                    <span className="font-medium text-gray-800 dark:text-white">{profileData.marriageTimingPreference}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Relocation</span>
                    <span className="font-medium text-gray-800 dark:text-white">{profileData.relocationWillingness}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Children</span>
                    <span className="font-medium text-gray-800 dark:text-white">{profileData.children}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Compatibility Indicators */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Compatibility</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Religious Values</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                    <span className="text-sm font-medium text-green-600">95%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Lifestyle Match</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '88%'}}></div>
                    </div>
                    <span className="text-sm font-medium text-blue-600">88%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Future Goals</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                    <span className="text-sm font-medium text-purple-600">92%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
