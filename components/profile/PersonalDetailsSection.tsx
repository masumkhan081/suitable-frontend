'use client'

interface PersonalDetailsSectionProps {
  profileData: any
  isEditing?: boolean
  onInputChange?: (field: string, value: string) => void
}

export default function PersonalDetailsSection({ 
  profileData, 
  isEditing = false, 
  onInputChange 
}: PersonalDetailsSectionProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not specified'
    return new Date(dateString).toLocaleDateString()
  }

  const formatHeight = (heightCm: number) => {
    if (!heightCm) return 'Not specified'
    const feet = Math.floor(heightCm / 30.48)
    const inches = Math.round((heightCm / 30.48 - feet) * 12)
    return `${feet}'${inches}" (${heightCm}cm)`
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-blue-500">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
          <span className="text-blue-600 dark:text-blue-300 font-semibold text-sm">1</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Personal Details</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date of Birth</label>
          {isEditing ? (
            <input
              type="date"
              value={profileData.dob ? new Date(profileData.dob).toISOString().split('T')[0] : ''}
              onChange={(e) => onInputChange?.('dob', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            />
          ) : (
            <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              {formatDate(profileData.dob)}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
          {isEditing ? (
            <select
              value={profileData.gender || ''}
              onChange={(e) => onInputChange?.('gender', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              {profileData.gender || 'Not specified'}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Height</label>
          {isEditing ? (
            <input
              type="number"
              value={profileData.height || ''}
              onChange={(e) => onInputChange?.('height', e.target.value)}
              placeholder="Height in cm"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            />
          ) : (
            <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              {formatHeight(profileData.height)}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Marital Status</label>
          {isEditing ? (
            <select
              value={profileData.maritalStatus || ''}
              onChange={(e) => onInputChange?.('maritalStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Status</option>
              <option value="Never Married">Never Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          ) : (
            <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              {profileData.maritalStatus || 'Not specified'}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of Children</label>
          {isEditing ? (
            <input
              type="number"
              value={profileData.numberOfChildren || ''}
              onChange={(e) => onInputChange?.('numberOfChildren', e.target.value)}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            />
          ) : (
            <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              {profileData.numberOfChildren || 'Not specified'}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of Siblings</label>
          {isEditing ? (
            <input
              type="number"
              value={profileData.numberOfSiblings || ''}
              onChange={(e) => onInputChange?.('numberOfSiblings', e.target.value)}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            />
          ) : (
            <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              {profileData.numberOfSiblings || 'Not specified'}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ethnic Origin</label>
          {isEditing ? (
            <select
              value={profileData.ethnicOrigin || ''}
              onChange={(e) => onInputChange?.('ethnicOrigin', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Origin</option>
              <option value="Arab">Arab</option>
              <option value="South Asian">South Asian</option>
              <option value="African">African</option>
              <option value="Turkish">Turkish</option>
              <option value="Persian">Persian</option>
              <option value="Southeast Asian">Southeast Asian</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              {profileData.ethnicOrigin || 'Not specified'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
