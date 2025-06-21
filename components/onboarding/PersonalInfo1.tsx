'use client'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CustomButton from '../custom/CustomButton'
import CustomSelect2 from '../custom/CustomSelect2'
import { ArrowRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

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

const getDisplayValue = (value: string, options: {value: string, label: string}[]) => {
  const option = options.find(opt => opt.value === value);
  return option ? option.label : '';
};

type FormData = {
  dob: string
  gender: string
  height: string
  maritalStatus: string
  numberOfChildren: string
  numberOfSiblings: string
  ethnicity: string
}

const schema = yup.object().shape({
  dob: yup.string().required('Date of birth is required'),
  gender: yup.string().required('Please select your gender'),
  height: yup.string().required('Please select your height'),
  maritalStatus: yup.string().required('Please select your marital status'),
  numberOfChildren: yup.string().required('Please specify number of children'),
  numberOfSiblings: yup.string().required('Please specify number of siblings'),
  ethnicity: yup.string().required('Please select your ethnicity')
})

export default function PersonalInfo1() {
  const router = useRouter()
  
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
    watch
  } = useForm<FormData>({
    resolver: yupResolver(schema),
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

  const onSubmit = (data: FormData) => {
    console.log({
      ...data,
      hasChildren: data.numberOfChildren !== '0'
    })
    // Here you would typically call an API or move to the next step
    router.push('/onboarding/personal-info/step-2')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-full h-full flex flex-col gap-6 justify-center items-center md:p-8 sm:p-6 p-3"
      noValidate
    >
      <div className="w-full flex flex-col gap-2 items-start justify-start">
        <div className="w-full flex justify-between items-center">
          <span className="font-semibold">Your Personal Information</span>
          <span className="text-blue-700">20%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div className="h-2 w-[20%] bg-blue-500 rounded-full"></div>
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
            txt="Next"
            styleKey="onboardingNext"
            endIcon={<ArrowRightIcon className="w-4 h-4" />}
          />
        </div>
      </div>
    </form>
  )
}
