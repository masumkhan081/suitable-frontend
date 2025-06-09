import * as z from "zod";


export const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Maximum length for name is 100 characters." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  email: z
    .string()
    .email("Invalid email format.")
    .max(256, { message: "Maximum length for email is 256 characters." }),
  gender: z.enum(["Male", "Female"]),
  dob: z.coerce.date() // Ensures it parses string inputs to Date
    .min(new Date('1900-01-01'), { message: 'Date of birth must be after 1900-01-01' })
    .max(new Date(), { message: 'Date of birth must be in the past' })
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format.")
    .max(256, { message: "Maximum length for email is 256 characters." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
