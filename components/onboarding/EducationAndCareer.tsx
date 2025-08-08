'use client'

import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import CustomButton from '../custom/CustomButton'
import { ArrowRightIcon, PlusIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ProfileService } from '@/services/profileService'

const schema = z.object({
  education: z
    .array(
      z.object({
        university: z.string().min(1, 'University name is required'),
        degree: z.string().min(1, 'Degree is required')
      })
    )
    .min(1, 'At least one education entry is required'),
  profession: z.string().min(1, 'Profession is required'),
  company: z.string().min(1, 'Company name is required')
})

type FormValues = z.infer<typeof schema>

export default function EducationAndCareer() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      education: [
        {
          university: '',
          degree: ''
        }
      ],
      profession: '',
      company: ''
    }
  })

  const educationFields = watch('education')

  const addEducation = () => {
    const currentEducation = watch('education')
    setValue('education', [...currentEducation, { university: '', degree: '' }])
  }

  const removeEducation = (index: number) => {
    const currentEducation = watch('education')
    if (currentEducation.length > 1) {
      const newEducation = [...currentEducation]
      newEducation.splice(index, 1)
      setValue('education', newEducation)
    }
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Convert form data to match backend expectations
      const profileData = {
        education: data.education.map(edu => ({
          institution: edu.university,
          degree: edu.degree,
          fieldOfStudy: '', // Not collected in this form
          startDate: '', // Not collected in this form
          endDate: '', // Not collected in this form
          isCurrentlyStudying: false // Not collected in this form
        })),
        profession: data.profession,
        company: data.company,
        workExperience: [] // Not collected in this form
      }

      const response = await ProfileService.updateProfileStep3(profileData)
      
      if (response.success) {
        // Navigate to next step on success
        router.push('/onboarding/religious-view')
      } else {
        setError(response.error?.message || 'Failed to save education and career information')
      }
    } catch (err) {
      console.error('Error saving education/career data:', err)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-full h-full flex flex-col gap-6 justify-center items-center md:p-8 sm:p-6 p-4"
      noValidate
    >
      <div className="w-full flex flex-col gap-2 items-start justify-start">
        <div className="w-full flex justify-between items-center">
          <span className="font-semibold">Your Education & Career</span>
          <span className="text-blue-700">60%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div className="h-2 w-[60%] bg-blue-500 rounded-full"></div>
        </div>
        {error && (
          <div className="w-full p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>

      <div className="w-full space-y-6">
        {/* Education Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-700 font-medium">Education</h3>
            <button
              type="button"
              onClick={addEducation}
              className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-800 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              Add Education
            </button>
          </div>

          {educationFields.map((_, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1"
                  aria-label="Remove education"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-700 text-sm">University</label>
                  <Controller
                    name={`education.${index}.university`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className={`w-full border ${errors.education?.[index]?.university
                          ? 'border-red-500'
                          : 'border-gray-300'
                          } rounded-md p-2 text-sm`}
                        placeholder="Enter university name"
                      />
                    )}
                  />
                  {errors.education?.[index]?.university && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.education[index]?.university?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-gray-700 text-sm">Degree</label>
                  <Controller
                    name={`education.${index}.degree`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className={`w-full border ${errors.education?.[index]?.degree ? 'border-red-500' : 'border-gray-300'
                          } rounded-md p-2 text-sm`}
                        placeholder="e.g., Bachelor of Science"
                      />
                    )}
                  />
                  {errors.education?.[index]?.degree && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.education[index]?.degree?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {errors.education?.message && (
            <p className="text-red-500 text-sm">{errors.education.message}</p>
          )}
        </div>

        {/* Career Section */}
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <h3 className="text-gray-700 font-medium">Current Career</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-gray-700 text-sm">Profession</label>
              <Controller
                name="profession"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`w-full border ${errors.profession ? 'border-red-500' : 'border-gray-300'
                      } rounded-md p-2 text-sm`}
                    placeholder="e.g., Software Engineer"
                  />
                )}
              />
              {errors.profession && (
                <p className="text-red-500 text-xs mt-1">{errors.profession.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-gray-700 text-sm">Company</label>
              <Controller
                name="company"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`w-full border ${errors.company ? 'border-red-500' : 'border-gray-300'
                      } rounded-md p-2 text-sm`}
                    placeholder="e.g., Tech Corp Inc."
                  />
                )}
              />
              {errors.company && (
                <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end pt-4">
          <CustomButton
            type="submit"
            txt={isLoading ? "Saving..." : "Next"}
            styleKey="onboardingNext"
            endIcon={!isLoading && <ArrowRightIcon className="w-4 h-4" />}
            disabled={isLoading}
          />
        </div>
      </div>
    </form>
  )
}
