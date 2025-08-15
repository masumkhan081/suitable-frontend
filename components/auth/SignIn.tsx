'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import CustomInput from '../custom/CustomInput'
import CustomButton from '../custom/CustomButton'
import { getSchemaValidation } from '@/lib/getSchemaValidation'
import { loginSchema } from '@/0.schema/auth.schema'
import { IErrorLogin } from '@/0.types/auth.type'
import CustomCheckbox from '../custom/CustomCheckbox'
import CustomLink from '../custom/CustomLink'
import { AuthService } from '@/services/authService'
import { getPostLoginRedirection, storeUserData } from '@/utils/auth'
//
export default function SignIn() {
  const router = useRouter()
  // states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  //
  const initErrors: IErrorLogin = {
    email: '',
    password: ''
  }
  const [errors, setErrors] = useState(initErrors)
  //

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Reset errors
    setErrors(initErrors);
    setErrorMessage('');
    setIsLoading(true);

    const data = {
      email: email.trim(),
      password: password.trim()
    };

    // Validate form data
    const result = getSchemaValidation({
      schema: loginSchema,
      data
    });

    if (!result.success) {
      setErrors((prevErrors) => ({ ...prevErrors, ...result.error }));
      setIsLoading(false);
      return;
    }

    try {
      // Call API
      const response = await AuthService.signin({ email, password });
      
      if (response.success && response.data?.token && response.data?.user) {
        const { token, user } = response.data;
        
        // Store user data and token
        storeUserData(user, token);
        
        // Store remember me preference
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        }
        
        // Get role-based redirection path
        const redirection = getPostLoginRedirection(user);
        console.log('Login redirection:', redirection);
        
        // Redirect based on user role and profile completion
        router.push(redirection.path);
        router.refresh(); // Ensure client-side cache is updated
      } else {
        // Handle backend error response
        const errorMsg = response.error?.message || response.message || 'Login failed. Please check your credentials and try again.';
        setErrorMessage(errorMsg);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      // Handle network or other errors
      const errorMsg = error.response?.data?.message || error.message || 'An error occurred during login. Please try again.';
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <CustomInput
        styleKey="authForm"
        label="Email"
        id="email"
        name="email"
        type="email"
        required
        ph="Email"
        value={email}
        error={errors.email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <CustomInput
        styleKey="authForm"
        label="Password"
        id="password"
        name="password"
        type="password"
        required
        ph="Password"
        value={password}
        error={errors.password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Error Message */}
      {errorMessage && (
        <div className="p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-md text-red-700 dark:text-red-300 text-sm">
          {errorMessage}
        </div>
      )}

      <div className="flex justify-between items-center">
        <CustomCheckbox
          styleKey="authForm"
          id="rememberMe"
          name="rememberMe"
          required={false}
          value={rememberMe ? "true" : "false"}
          onChange={(e) => setRememberMe(e.target.checked)}
        >
          <span>Remember me</span>
        </CustomCheckbox>

        <CustomLink href="/auth/reset-request" txt="Forgot Password" />
      </div>

      <CustomButton 
        type="submit"
        styleKey="authForm" 
        txt={isLoading ? "Signing In..." : "Sign In"} 
        disabled={isLoading}
      />

      <div className="flex gap-2 items-center justify-center">
        <p className="text-sm text-gray-600">Don&apos;t have an account? <a href="/auth/sign-up" className="text-blue-600 hover:underline">Sign up</a></p>
      </div>
    </form>
  )
}
