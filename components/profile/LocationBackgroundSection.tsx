'use client'

interface LocationBackgroundSectionProps {
  profileData: any
  isEditing?: boolean
  onInputChange?: (field: string, value: string) => void
}

export default function LocationBackgroundSection({ 
  profileData, 
  isEditing = false, 
  onInputChange 
}: LocationBackgroundSectionProps) {
  const formatAddress = (address: any) => {
    if (!address) return 'Not specified'
    if (typeof address === 'string') return address
    
    const parts = []
    if (address.street) parts.push(address.street)
    if (address.city) parts.push(address.city)
    if (address.state) parts.push(address.state)
    if (address.country) parts.push(address.country)
    if (address.zipCode) parts.push(address.zipCode)
    
    return parts.length > 0 ? parts.join(', ') : 'Not specified'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-green-500">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
          <span className="text-green-600 dark:text-green-300 font-semibold text-sm">2</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Location & Background</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nationality</label>
          {isEditing ? (
            <input
              type="text"
              value={profileData.nationality || ''}
              onChange={(e) => onInputChange?.('nationality', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter nationality"
            />
          ) : (
            <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              {profileData.nationality || 'Not specified'}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Willing to Relocate</label>
          {isEditing ? (
            <select
              value={profileData.isWillingToRelocate ? 'true' : 'false'}
              onChange={(e) => onInputChange?.('isWillingToRelocate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          ) : (
            <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              {profileData.isWillingToRelocate ? 'Yes' : 'No'}
            </p>
          )}
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Address</label>
          {isEditing ? (
            <textarea
              value={typeof profileData.currentAddress === 'string' ? profileData.currentAddress : formatAddress(profileData.currentAddress)}
              onChange={(e) => onInputChange?.('currentAddress', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter current address"
            />
          ) : (
            <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 min-h-[80px]">
              {formatAddress(profileData.currentAddress)}
            </p>
          )}
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Back Home Address</label>
          {isEditing ? (
            <textarea
              value={typeof profileData.backHomeAddress === 'string' ? profileData.backHomeAddress : formatAddress(profileData.backHomeAddress)}
              onChange={(e) => onInputChange?.('backHomeAddress', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter back home address"
            />
          ) : (
            <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 min-h-[80px]">
              {formatAddress(profileData.backHomeAddress)}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
