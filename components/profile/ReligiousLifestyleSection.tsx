'use client'

interface ReligiousLifestyleSectionProps {
  profileData: any
  isEditing?: boolean
  onInputChange?: (field: string, value: string) => void
}

export default function ReligiousLifestyleSection({ 
  profileData, 
  isEditing = false, 
  onInputChange 
}: ReligiousLifestyleSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Religious & Lifestyle</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Religion</label>
          {isEditing ? (
            <select
              value={profileData.religion || ''}
              onChange={(e) => onInputChange?.('religion', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Religion</option>
              <option value="Islam">Islam</option>
              <option value="Christianity">Christianity</option>
              <option value="Judaism">Judaism</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              {profileData.religion || 'Not specified'}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sect</label>
          {isEditing ? (
            <select
              value={profileData.sect || ''}
              onChange={(e) => onInputChange?.('sect', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Sect</option>
              <option value="Sunni">Sunni</option>
              <option value="Shia">Shia</option>
              <option value="Other">Other</option>
              <option value="None">None</option>
            </select>
          ) : (
            <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              {profileData.sect || 'Not specified'}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Can Read Quran</label>
          {isEditing ? (
            <select
              value={profileData.quranReadingStatus || ''}
              onChange={(e) => onInputChange?.('quranReadingStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Occasionally">Occasionally</option>
            </select>
          ) : (
            <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              {profileData.quranReadingStatus || 'Not specified'}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Eats Halal</label>
          {isEditing ? (
            <select
              value={profileData.halalEatingStatus || ''}
              onChange={(e) => onInputChange?.('halalEatingStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Occasionally">Occasionally</option>
            </select>
          ) : (
            <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              {profileData.halalEatingStatus || 'Not specified'}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Drinks Alcohol</label>
          {isEditing ? (
            <select
              value={profileData.alcoholConsumptionStatus || ''}
              onChange={(e) => onInputChange?.('alcoholConsumptionStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Occasionally">Occasionally</option>
            </select>
          ) : (
            <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              {profileData.alcoholConsumptionStatus || 'Not specified'}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Smoking Status</label>
          {isEditing ? (
            <select
              value={profileData.smokingStatus || ''}
              onChange={(e) => onInputChange?.('smokingStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Occasionally">Occasionally</option>
            </select>
          ) : (
            <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              {profileData.smokingStatus || 'Not specified'}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prayer Frequency</label>
          {isEditing ? (
            <select
              value={profileData.prayerFrequency || ''}
              onChange={(e) => onInputChange?.('prayerFrequency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Frequency</option>
              <option value="5 times a day">5 times a day</option>
              <option value="Sometimes">Sometimes</option>
              <option value="Rarely">Rarely</option>
              <option value="Never">Never</option>
            </select>
          ) : (
            <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              {profileData.prayerFrequency || 'Not specified'}
            </p>
          )}
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">About Me</label>
          {isEditing ? (
            <textarea
              value={profileData.aboutme || ''}
              onChange={(e) => onInputChange?.('aboutme', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 min-h-[100px] whitespace-pre-wrap">
              {profileData.aboutme || 'Not specified'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
