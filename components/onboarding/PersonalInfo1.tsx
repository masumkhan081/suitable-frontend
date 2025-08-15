'use client'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import CustomButton from '../custom/CustomButton'
import CustomSelect2 from '../custom/CustomSelect2'
import { ArrowRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ProfileService } from '@/services/profileService'
import { toast } from 'sonner'
import { getUserData, storeUserData } from '@/utils/auth'

const MARITAL_STATUSES = [
  'Single',
  'Married',
  'Divorced',
  'Widowed',
  'Separated',
  'In a relationship',
  'Prefer not to say'
]

const ETHNICITIES = [
  'Asian',
  'Black or African American',
  'Hispanic or Latino',
  'Native American or Alaska Native',
  'Native Hawaiian or Pacific Islander',
  'White or Caucasian',
  'Two or more races',
  'Other',
  'Prefer not to say'
]

const NUMBER_OPTIONS = Array.from({ length: 11 }, (_, i) => ({
  value: i === 0 ? '0' : i === 10 ? '10+' : i.toString(),
  label: i === 0 ? '0 (None)' : i === 10 ? '10 or more' : i.toString()
}));

type FormData = z.infer<typeof schema>

const schema = z.object({
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Please select your gender'),
  height: z.string().min(1, 'Please select your height'),
  maritalStatus: z.string().min(1, 'Please select your marital status'),
  numberOfChildren: z.string().min(1, 'Please specify number of children'),
  numberOfSiblings: z.string().min(1, 'Please specify number of siblings'),
  ethnicity: z.string().min(1, 'Please select your ethnicity')
})

export default function PersonalInfo1() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  // Error handling is done via toast notifications

  const heightOptions = Array.from({ length: 100 }, (_, i) => {
    const feet = Math.floor(i / 12) + 4
    const inches = i % 12
    return `${feet} feet ${inches} ${inches === 1 ? 'inch' : 'inches'}`
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      dob: '',
      gender: '',
      height: '',
      maritalStatus: '',
      numberOfChildren: '0',
      numberOfSiblings: '0',
      ethnicity: ''
    }
  })

  const genderValue = watch('gender')

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    try {
      // Convert height from feet/inches to centimeters
      const heightParts = data.height.split(' ')
      const feet = parseInt(heightParts[0])
      const inches = parseInt(heightParts[2])
      const totalInches = feet * 12 + inches
      const heightInCm = Math.round(totalInches * 2.54) // Convert inches to centimeters

      // Convert form data to match backend expectations
      const profileData = {
        dob: data.dob,
        gender: data.gender as 'male' | 'female',
        height: heightInCm, // Height in centimeters
        maritalStatus: data.maritalStatus,
        numberOfChildren: parseInt(data.numberOfChildren === '10+' ? '10' : data.numberOfChildren),
        numberOfSiblings: parseInt(data.numberOfSiblings === '10+' ? '10' : data.numberOfSiblings),
        ethnicOrigin: data.ethnicity
      }

      const response = await ProfileService.updateProfileStep1(profileData)

      // Debug: Log the full response
      console.log('API Response:', response)
      console.log('Response success:', response.success)

      if (response.success) {
        console.log('Success condition met, showing toast and navigating...')
        // Show success toast
        toast.success('Personal information saved successfully!')

        // Update user data in localStorage with new completion percentage
        const currentUser = getUserData()
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            onboardingCompletion: 20, // Step 1 completion = 20%
            hasProfile: true
          }
          const token = localStorage.getItem('authToken') || ''
          storeUserData(updatedUser, token)
          console.log('Updated user data in localStorage with completion: 20%')
        }

        // Clear the form before navigation
        reset()

        // Try immediate navigation first
        console.log('Attempting immediate navigation to step-2...')
        try {
          router.push('/onboarding/personal-info/step-2')
        } catch (navError) {
          console.error('Router navigation failed:', navError)
          // Fallback to window.location
          window.location.href = '/onboarding/personal-info/step-2'
        }
      } else {
        console.log('Success condition NOT met, showing error...')
        const errorMessage = response.error?.message || 'Failed to save profile data'
        toast.error(errorMessage || 'Failed to save profile data. Please try again.')
      }
    } catch (err) {
      console.error('Error saving profile data:', err)
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-full h-full flex flex-col gap-6 justify-center items-center p-8"
      noValidate
    >
      <div className="w-full flex items-center justify-between gap-4 mb-2">
        <h2 className="text-xl font-bold text-gray-800 whitespace-nowrap">Your Personal Information</h2>
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="flex-1 h-2 bg-gray-200 rounded-full">
            <div className="h-2 w-[20%] bg-blue-500 rounded-full"></div>
          </div>
          <span className="text-blue-700 font-medium w-12 text-right">20%</span>
        </div>

      </div>

      <div className="w-full flex flex-col gap-4">
        {/* dob */}
        <div className="w-full flex flex-col items-start justify-start gap-1">
          <label htmlFor="dob" className="text-gray-700">
            Date of Birth
          </label>
          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="date"
                className={`w-full border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
              />
            )}
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
        </div>

        {/* gender */}
        <div className="w-full flex flex-col items-start justify-start gap-1">
          <label htmlFor="gender" className="text-gray-700">
            Gender
          </label>
          {/* male, female - two button in one line gap-4 */}
          <div className="w-full flex items-center justify-start gap-4">
            <CustomButton
              onClick={() => setValue('gender', 'male')}
              txt="Male"
              styleKey={genderValue === 'male' ? 'selectedGender' : 'gender'}
              type="button"
            />
            <CustomButton
              onClick={() => setValue('gender', 'female')}
              txt="Female"
              styleKey={genderValue === 'female' ? 'selectedGender' : 'gender'}
              type="button"
            />
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>
        </div>

        {/* Height selection dropdown */}
        <div className="w-full flex flex-col items-start justify-start gap-1">
          <label htmlFor="height" className="text-gray-700">
            Height
          </label>
          <Controller
            name="height"
            control={control}
            render={({ field }) => (
              <CustomSelect2
                options={heightOptions}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select Height"
              />
            )}
          />
          {errors.height && <p className="text-red-500 text-sm">{errors.height.message}</p>}
        </div>

        {/* Marital Status */}
        <div className="w-full flex flex-col items-start justify-start gap-1">
          <label className="text-gray-700">Marital Status</label>
          <Controller
            name="maritalStatus"
            control={control}
            render={({ field }) => (
              <CustomSelect2
                options={MARITAL_STATUSES}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select Marital Status"
              />
            )}
          />
          {errors.maritalStatus && <p className="text-red-500 text-sm">{errors.maritalStatus.message}</p>}
        </div>

        {/* Number of Children */}
        <div className="w-full flex flex-col items-start justify-start gap-1">
          <label htmlFor="numberOfChildren" className="text-gray-700">
            Number of Children
          </label>
          <Controller
            name="numberOfChildren"
            control={control}
            render={({ field }) => (
              <CustomSelect2
                options={NUMBER_OPTIONS.map(({ value, label }) => ({
                  value: value.toString(),
                  label: value === '0' ? '0 (No children)' : value === '10+' ? '10 or more' : label
                }))}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select number of children"
              />
            )}
          />
          {errors.numberOfChildren && <p className="text-red-500 text-sm">{errors.numberOfChildren.message}</p>}
        </div>

        {/* Number of Siblings */}
        <div className="w-full flex flex-col items-start justify-start gap-1">
          <label htmlFor="numberOfSiblings" className="text-gray-700">
            Number of Siblings
          </label>
          <Controller
            name="numberOfSiblings"
            control={control}
            render={({ field }) => (
              <CustomSelect2
                options={NUMBER_OPTIONS.map(({ value, label }) => ({
                  value: value.toString(),
                  label: value === '0' ? '0 (No siblings)' : value === '10+' ? '10 or more' : label
                }))}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select number of siblings"
              />
            )}
          />
          {errors.numberOfSiblings && <p className="text-red-500 text-sm">{errors.numberOfSiblings.message}</p>}
        </div>

        {/* Ethnicity */}
        <div className="w-full flex flex-col items-start justify-start gap-1">
          <label className="text-gray-700">Ethnicity</label>
          <Controller
            name="ethnicity"
            control={control}
            render={({ field }) => (
              <CustomSelect2
                options={ETHNICITIES}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select Ethnicity"
              />
            )}
          />
          {errors.ethnicity && <p className="text-red-500 text-sm">{errors.ethnicity.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="w-full mt-4 flex justify-end">
          <CustomButton
            onClick={handleSubmit(onSubmit)}
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
