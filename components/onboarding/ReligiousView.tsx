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

const RELIGIOUS_HISTORY: OptionType[] = [
  { value: 'born_muslim', label: 'Born Muslim' },
  { value: 'revert', label: 'Revert' },
  { value: 'practicing', label: 'Practicing' },
  { value: 'non_practicing', label: 'Non-practicing' },
  { value: 'seeking_knowledge', label: 'Seeking Knowledge' },
  { value: 'other', label: 'Other' }
]

const PRAYER_OPTIONS: OptionType[] = [
  { value: 'always', label: 'Always' },
  { value: 'most_of_the_time', label: 'Most of the time' },
  { value: 'sometimes', label: 'Sometimes' },
  { value: 'rarely', label: 'Rarely' },
  { value: 'never', label: 'Never' }
]

const SECT_OPTIONS: OptionType[] = [
  { value: 'sunni', label: 'Sunni' },
  { value: 'shia', label: 'Shia' },
  { value: 'sufi', label: 'Sufi' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' }
]

const YES_NO_OPTIONS: OptionType[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'sometimes', label: 'Sometimes' }
]

const formSchema = z.object({
  religiousHistory: z.string({
    required_error: 'Religious history is required',
  }),
  prayerFrequency: z.string({
    required_error: 'Prayer frequency is required',
  }),
  sect: z.string({
    required_error: 'Sect is required',
  }),
  canReadQuran: z.string({
    required_error: 'This field is required',
  }),
  eatsHalal: z.string({
    required_error: 'This field is required',
  }),
  drinksAlcohol: z.string({
    required_error: 'This field is required',
  }),
  aboutYou: z.string().max(2000, {
    message: 'Maximum 2000 characters allowed',
  }).optional(),
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
      prayerFrequency: '',
      sect: '',
      canReadQuran: '',
      eatsHalal: '',
      drinksAlcohol: '',
      aboutYou: ''
    }
  })

  const aboutYou = useWatch({ control, name: 'aboutYou' })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Convert form data to match backend expectations
      const profileData = {
        religiousHistory: data.religiousHistory,
        prayerFrequency: data.prayerFrequency,
        sect: data.sect,
        canReadQuran: data.canReadQuran === 'yes',
        eatsHalal: data.eatsHalal === 'yes',
        drinksAlcohol: data.drinksAlcohol === 'yes',
        aboutYou: data.aboutYou || ''
      }

      const response = await ProfileService.updateProfileStep4(profileData)
      
      if (response.success) {
        // Navigate to next step on success
        router.push('/onboarding/add-photo')
      } else {
        setError(response.error?.message || 'Failed to save religious information')
      }
    } catch (err) {
      console.error('Error saving religious data:', err)
      setError('An unexpected error occurred. Please try again.')
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
