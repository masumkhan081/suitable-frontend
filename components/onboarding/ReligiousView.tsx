'use client'

import { useForm, Controller, SubmitHandler, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import CustomButton from '../custom/CustomButton'
import { ArrowRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import CustomSelect2, { OptionType } from '../custom/CustomSelect2'
import { ProfileService } from '@/services/profileService'
import { toast } from 'sonner'
import { getUserData, storeUserData } from '@/utils/auth'

const RELIGIOUS_HISTORY: OptionType[] = [
  { value: 'born_muslim', label: 'Born Muslim' },
  { value: 'revert', label: 'Revert' },
  { value: 'practicing', label: 'Practicing' },
  { value: 'non_practicing', label: 'Non-practicing' },
  { value: 'seeking_knowledge', label: 'Seeking Knowledge' },
  { value: 'other', label: 'Other' }
]

// Must match backend enum: ["5 times a day", "Sometimes", "Rarely", "Never"]
const PRAYER_OPTIONS: OptionType[] = [
  { value: '5 times a day', label: 'Always (5 times a day)' },
  { value: 'Sometimes', label: 'Sometimes' },
  { value: 'Rarely', label: 'Rarely' },
  { value: 'Never', label: 'Never' }
]

// Must match backend enum: ["Sunni", "Shia", "Other", "None"]
const SECT_OPTIONS: OptionType[] = [
  { value: 'Sunni', label: 'Sunni' },
  { value: 'Shia', label: 'Shia' },
  { value: 'Other', label: 'Other' },
  { value: 'None', label: 'Prefer not to say' }
]

// Must match backend enum: ["Yes", "No", "Occasionally"]
const YES_NO_OPTIONS: OptionType[] = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
  { value: 'Occasionally', label: 'Sometimes' }
]

const formSchema = z.object({
  religiousHistory: z.string({
    required_error: 'Religious history is required',
  }),
  prayerFrequency: z.enum(["5 times a day", "Sometimes", "Rarely", "Never"], {
    required_error: 'Prayer frequency is required',
    invalid_type_error: 'Invalid prayer frequency',
  }),
  sect: z.enum(["Sunni", "Shia", "Other", "None"], {
    required_error: 'Sect is required',
    invalid_type_error: 'Invalid sect',
  }),
  canReadQuran: z.enum(["Yes", "No", "Occasionally"], {
    required_error: 'This field is required',
    invalid_type_error: 'Invalid value',
  }),
  eatsHalal: z.enum(["Yes", "No", "Occasionally"], {
    required_error: 'This field is required',
    invalid_type_error: 'Invalid value',
  }),
  drinksAlcohol: z.enum(["Yes", "No", "Occasionally"], {
    required_error: 'This field is required',
    invalid_type_error: 'Invalid value',
  }),
  aboutYou: z.string({
    required_error: 'About you is required',
  }).min(1, 'About you cannot be empty').max(2000, {
    message: 'Maximum 2000 characters allowed',
  }),
})

type FormValues = z.infer<typeof formSchema>

const renderSelect = (field: any, options: OptionType[], errors: any, control: any) => {
  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field }) => (
        <CustomSelect2
          options={options}
          value={field.value}
          onChange={(value) => field.onChange(value)}
          placeholder={`Select ${field.name}`}
          error={!!errors[field.name]}
        />
      )}
    />
  )
}

export default function ReligiousView() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      religiousHistory: '',
      prayerFrequency: "5 times a day" as "5 times a day" | "Sometimes" | "Rarely" | "Never",
      sect: "Sunni" as "Sunni" | "Shia" | "Other" | "None",
      canReadQuran: "Yes" as "Yes" | "No" | "Occasionally",
      eatsHalal: "Yes" as "Yes" | "No" | "Occasionally",
      drinksAlcohol: "No" as "Yes" | "No" | "Occasionally",
      aboutYou: 'I am in individual'
    }
  })

  const aboutYou = useWatch({ control, name: 'aboutYou' })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true)
    setError(null)
    
    try {
      console.log('Form data before mapping:', data)
      
      // Convert form data to match backend expectations
      const profileData = {
        religion: 'Islam', // Default to Islam for religious view step
        sect: data.sect, // Already matches backend enum: "Sunni", "Shia", "Other", "None"
        prayerFrequency: data.prayerFrequency, // Already matches backend enum: "5 times a day", "Sometimes", "Rarely", "Never"
        quranReadingStatus: data.canReadQuran, // Already matches backend enum: "Yes", "No", "Occasionally"
        halalEatingStatus: data.eatsHalal, // Already matches backend enum: "Yes", "No", "Occasionally"
        alcoholConsumptionStatus: data.drinksAlcohol, // Already matches backend enum: "Yes", "No", "Occasionally"
        smokingStatus: 'No', // Default to No since not collected
        aboutMe: data.aboutYou || 'No description provided'
      }
      
      console.log('Mapped data for backend:', profileData)

      const response = await ProfileService.updateProfileStep4(profileData)
      console.log('API Response:', response)
      
      if (response.success) {
        console.log('Step-4 success, showing toast and updating localStorage...')
        // Show success toast
        toast.success('Religious information saved successfully!')
        
        // Update user data in localStorage with new completion percentage
        const currentUser = getUserData()
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            onboardingCompletion: 80, // Step 4 completion = 80%
            hasProfile: true
          }
          const token = localStorage.getItem('authToken') || ''
          storeUserData(updatedUser, token)
          console.log('Updated user data in localStorage with completion: 80%')
        }
        
        // Navigate to next step on success
        setTimeout(() => {
          router.push('/onboarding/add-photo')
        }, 500) // Add a small delay before navigation
      } else {
        const errorMessage = response.error?.message || 'Failed to save religious information'
        console.error('API Error:', response.error)
        setError(errorMessage)
        toast.error(errorMessage)
      }
    } catch (err) {
      console.error('Error saving religious data:', err)
      const errorMessage = 'An unexpected error occurred. Please try again.'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }
  //

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-full h-full flex flex-col gap-6 justify-center items-center md:p-8 sm:p-6 p-4"
      noValidate
    >
      <div className="w-full flex flex-col gap-2 items-start justify-start">
        <div className="w-full flex justify-between items-center">
          <span className="font-semibold">Your Religious Background</span>
          <span className="text-blue-700">80%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div className="h-2 w-[80%] bg-blue-500 rounded-full"></div>
        </div>
        {error && (
          <div className="w-full p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>

      <div className="w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-gray-700 text-sm">Religious History</label>
            {renderSelect({ name: 'religiousHistory' }, RELIGIOUS_HISTORY, errors, control)}
            {errors.religiousHistory && (
              <p className="text-red-500 text-xs mt-1">
                {errors.religiousHistory.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-gray-700 text-sm">Do you pray?</label>
            {renderSelect({ name: 'prayerFrequency' }, PRAYER_OPTIONS, errors, control)}
            {errors.prayerFrequency && (
              <p className="text-red-500 text-xs mt-1">
                {errors.prayerFrequency.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-gray-700 text-sm">What sect are you?</label>
            {renderSelect({ name: 'sect' }, SECT_OPTIONS, errors, control)}
            {errors.sect && (
              <p className="text-red-500 text-xs mt-1">
                {errors.sect.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-gray-700 text-sm">Can you read Quran?</label>
            {renderSelect({ name: 'canReadQuran' }, YES_NO_OPTIONS, errors, control)}
            {errors.canReadQuran && (
              <p className="text-red-500 text-xs mt-1">
                {errors.canReadQuran.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-gray-700 text-sm">Do you eat halal?</label>
            {renderSelect({ name: 'eatsHalal' }, YES_NO_OPTIONS, errors, control)}
            {errors.eatsHalal && (
              <p className="text-red-500 text-xs mt-1">
                {errors.eatsHalal.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-gray-700 text-sm">Do you drink alcohol?</label>
            {renderSelect({ name: 'drinksAlcohol' }, YES_NO_OPTIONS, errors, control)}
            {errors.drinksAlcohol && (
              <p className="text-red-500 text-xs mt-1">
                {errors.drinksAlcohol.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-gray-700 text-sm">About you</label>
          <Controller
            name="aboutYou"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={4}
                maxLength={2000}
                className={`w-full border ${errors.aboutYou ? 'border-red-500' : 'border-gray-300'
                  } rounded-md p-2 text-sm`}
                placeholder="Share something nice about you (max 2000 characters)"
              />
            )}
          />
          {errors.aboutYou && (
            <p className="text-red-500 text-xs mt-1">
              {errors.aboutYou.message}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {aboutYou?.length || 0}/2000 characters
          </p>
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
