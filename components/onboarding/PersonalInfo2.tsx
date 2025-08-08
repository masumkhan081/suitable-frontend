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

type SelectOption = {
  value: string
  label: string
}

// Mock data - replace with actual country data from your API
const COUNTRIES: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'bd', label: 'Bangladesh' },
];

const CITIES: SelectOption[] = [
  { value: 'ny', label: 'New York' },
  { value: 'la', label: 'Los Angeles' },
  { value: 'lon', label: 'London' },
  { value: 'syd', label: 'Sydney' },
  { value: 'dhk', label: 'Dhaka' },
];

const RELOCATION_OPTIONS: SelectOption[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'maybe', label: 'Maybe' },
];

type FormData = z.infer<typeof schema>

const schema = z.object({
  currentAddress: z.object({
    country: z.string().min(1, 'Country is required'),
    city: z.string().min(1, 'City is required'),
    area: z.string().min(1, 'Area is required')
  }),
  homeAddress: z.object({
    country: z.string().min(1, 'Home country is required'),
    city: z.string().min(1, 'Home city is required'),
    area: z.string().min(1, 'Home area is required')
  }),
  willingToRelocate: z.string().min(1, 'Please specify relocation preference')
});

type FormValues = z.infer<typeof schema>

export default function PersonalInfo2() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentAddress: {
        country: '',
        city: '',
        area: ''
      },
      homeAddress: {
        country: '',
        city: '',
        area: ''
      },
      willingToRelocate: ''
    }
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      // Convert form data to match backend expectations
      const profileData = {
        currentAddress: {
          street: data.currentAddress.area,
          city: data.currentAddress.city,
          state: '', // Not collected in this form
          country: data.currentAddress.country,
          postcode: '' // Not collected in this form
        },
        backHomeAddress: {
          street: data.homeAddress.area,
          city: data.homeAddress.city,
          state: '', // Not collected in this form
          country: data.homeAddress.country,
          postcode: '' // Not collected in this form
        },
        isWillingToRelocate: data.willingToRelocate === 'yes'
      }

      const response = await ProfileService.updateProfileStep2(profileData)

      if (response.success) {
        console.log('Step-2 success, showing toast and updating localStorage...')
        // Show success toast
        toast.success('Address information saved successfully!')

        // Update user data in localStorage with new completion percentage
        const currentUser = getUserData()
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            onboardingCompletion: 40, // Step 2 completion = 40%
            hasProfile: true
          }
          const token = localStorage.getItem('authToken') || ''
          storeUserData(updatedUser, token)
          console.log('Updated user data in localStorage with completion: 40%')
        }

        // Navigate to next step on success
        router.push('/onboarding/education-and-career/step-1')
      } else {
        const errorMessage = response.error?.details?.join(', ') || response.error?.message || 'Failed to save address information'
        setError(errorMessage)
        toast.error(errorMessage)
      }
    } catch (err) {
      console.error('Error saving address data:', err)
      const errorMessage = 'An unexpected error occurred. Please try again.'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-full h-full flex flex-col gap-6 justify-center items-center md:p-8 sm:p-6 p-3"
      noValidate
    >
      <div className="w-full flex flex-col gap-2 items-start justify-start">
        <div className="w-full flex justify-between items-center">
          <span className="font-semibold">Your Address Information</span>
          <span className="text-blue-700">40%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div className="h-2 w-[40%] bg-blue-500 rounded-full"></div>
        </div>
        {error && (
          <div className="w-full p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col gap-4">
        {/* Current Address Section */}
        <div className="w-full space-y-4">
          <h3 className="text-gray-700 font-medium">Current Address</h3>

          {/* Country */}
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="currentAddress.country" className="text-gray-700">
              Country
            </label>
            <Controller
              name="currentAddress.country"
              control={control}
              render={({ field }) => (
                <CustomSelect2
                  options={COUNTRIES}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select country"
                />
              )}
            />
            {errors.currentAddress?.country && (
              <p className="text-red-500 text-sm">{errors.currentAddress.country.message}</p>
            )}
          </div>

          {/* City and Area */}
          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="currentAddress.city" className="text-gray-700">
                City
              </label>
              <Controller
                name="currentAddress.city"
                control={control}
                render={({ field }) => (
                  <CustomSelect2
                    options={CITIES}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select city"
                  />
                )}
              />
              {errors.currentAddress?.city && (
                <p className="text-red-500 text-sm">{errors.currentAddress.city.message}</p>
              )}
            </div>

            <div className="w-full flex flex-col gap-1">
              <label htmlFor="currentAddress.area" className="text-gray-700">
                Area
              </label>
              <Controller
                name="currentAddress.area"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`w-full border ${errors.currentAddress?.area ? 'border-red-500' : 'border-gray-300'
                      } rounded-md p-2`}
                    placeholder="Enter area"
                  />
                )}
              />
              {errors.currentAddress?.area && (
                <p className="text-red-500 text-sm">{errors.currentAddress.area.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Back Home Address Section */}
        <div className="w-full space-y-4">
          <h3 className="text-gray-700 font-medium">Back Home Address</h3>

          {/* Home Country */}
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="homeAddress.country" className="text-gray-700">
              Country
            </label>
            <Controller
              name="homeAddress.country"
              control={control}
              render={({ field }) => (
                <CustomSelect2
                  options={COUNTRIES}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select home country"
                />
              )}
            />
            {errors.homeAddress?.country && (
              <p className="text-red-500 text-sm">{errors.homeAddress.country.message}</p>
            )}
          </div>

          {/* Home City and Area */}
          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="homeAddress.city" className="text-gray-700">
                City
              </label>
              <Controller
                name="homeAddress.city"
                control={control}
                render={({ field }) => (
                  <CustomSelect2
                    options={CITIES}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select home city"
                  />
                )}
              />
              {errors.homeAddress?.city && (
                <p className="text-red-500 text-sm">{errors.homeAddress.city.message}</p>
              )}
            </div>

            <div className="w-full flex flex-col gap-1">
              <label htmlFor="homeAddress.area" className="text-gray-700">
                Area
              </label>
              <Controller
                name="homeAddress.area"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`w-full border ${errors.homeAddress?.area ? 'border-red-500' : 'border-gray-300'
                      } rounded-md p-2`}
                    placeholder="Enter home area"
                  />
                )}
              />
              {errors.homeAddress?.area && (
                <p className="text-red-500 text-sm">{errors.homeAddress.area.message}</p>
              )}
            </div>
          </div>

          {/* Willing to Relocate */}
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="willingToRelocate" className="text-gray-700">
              Are you willing to relocate?
            </label>
            <Controller
              name="willingToRelocate"
              control={control}
              render={({ field }) => (
                <CustomSelect2
                  options={RELOCATION_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select an option"
                />
              )}
            />
            {errors.willingToRelocate && (
              <p className="text-red-500 text-sm">{errors.willingToRelocate.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full mt-6 flex justify-end">
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
