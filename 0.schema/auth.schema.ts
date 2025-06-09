import * as z from 'zod'

export const signupSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(100, { message: 'Maximum length for name is 100 characters.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  email: z
    .string()
    .email('Invalid email format.')
    .max(256, { message: 'Maximum length for email is 256 characters.' })
})

export const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email format.')
    .max(256, { message: 'Maximum length for email is 256 characters.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
})
