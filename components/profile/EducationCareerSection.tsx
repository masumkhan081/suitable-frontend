'use client'

interface EducationCareerSectionProps {
  profileData: any
  isEditing?: boolean
  onInputChange?: (field: string, value: any) => void
}

export default function EducationCareerSection({ 
  profileData, 
  isEditing = false, 
  onInputChange 
}: EducationCareerSectionProps) {
  const handleEducationChange = (index: number, field: string, value: string) => {
    if (!onInputChange) return
    
    const updatedEducations = [...(profileData.educations || [])]
    if (!updatedEducations[index]) {
      updatedEducations[index] = {}
    }
    updatedEducations[index][field] = value
    onInputChange('educations', updatedEducations)
  }

  const addEducation = () => {
    if (!onInputChange) return
    
    const updatedEducations = [...(profileData.educations || []), { institution: '', course: '' }]
    onInputChange('educations', updatedEducations)
  }

  const removeEducation = (index: number) => {
    if (!onInputChange) return
    
    const updatedEducations = (profileData.educations || []).filter((_: any, i: number) => i !== index)
    onInputChange('educations', updatedEducations)
  }

  const handleProfessionChange = (field: string, value: string) => {
    if (!onInputChange) return
    
    const updatedProfession = {
      ...profileData.profession,
      [field]: value
    }
    onInputChange('profession', updatedProfession)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Education & Career</h3>
      </div>
      
      <div className="space-y-6">
        {/* Education Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">Education</h4>
            {isEditing && (
              <button
                onClick={addEducation}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Education
              </button>
            )}
          </div>
          
          {profileData.educations && profileData.educations.length > 0 ? (
            <div className="space-y-4">
              {profileData.educations.map((education: any, index: number) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  {isEditing && (
                    <div className="flex justify-end mb-2">
                      <button
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Institution</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={education.institution || ''}
                          onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Enter institution"
                        />
                      ) : (
                        <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                          {education.institution || 'Not specified'}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Course/Degree</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={education.course || ''}
                          onChange={(e) => handleEducationChange(index, 'course', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Enter course/degree"
                        />
                      ) : (
                        <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                          {education.course || 'Not specified'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              No education information provided
            </p>
          )}
        </div>
        
        {/* Profession Section */}
        <div>
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">Profession</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.profession?.company || ''}
                  onChange={(e) => handleProfessionChange('company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter company"
                />
              ) : (
                <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {profileData.profession?.company || 'Not specified'}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.profession?.position || ''}
                  onChange={(e) => handleProfessionChange('position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter position"
                />
              ) : (
                <p className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {profileData.profession?.position || 'Not specified'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
