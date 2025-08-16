'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getUserData, getPostLoginRedirection } from '@/utils/auth'
import { User } from '@/services/authService'

// Route configuration types
interface RouteConfig {
  path: string
  requiresAuth: boolean
  allowedRoles?: ('USER' | 'ADMIN')[]
  requiresOnboardingComplete?: boolean
}

interface RedirectionMap {
  authenticated: {
    ADMIN: string
    USER: {
      onboardingComplete: string
      onboardingIncomplete: string
    }
  }
  unauthenticated: string
}

// Configurable redirection mapping
const REDIRECTION_MAP: RedirectionMap = {
  authenticated: {
    ADMIN: '/dashboard',
    USER: {
      onboardingComplete: '/matching/matches',
      onboardingIncomplete: '/onboarding'
    }
  },
  unauthenticated: '/auth/sign-in'
}

// Protected routes configuration
const ROUTE_CONFIG: RouteConfig[] = [
  // Auth routes - should redirect if already authenticated
  { path: '/auth/sign-in', requiresAuth: false },
  { path: '/auth/sign-up', requiresAuth: false },
  { path: '/auth/verify-email', requiresAuth: false },
  { path: '/auth/forgot-password', requiresAuth: false },
  { path: '/auth/reset-password', requiresAuth: false },

  // Homepage - should redirect authenticated users to role-based destination
  { path: '/', requiresAuth: false },

  // Public routes
  { path: '/contact-us', requiresAuth: false },
  { path: '/terms', requiresAuth: false },
  { path: '/privacy', requiresAuth: false },

  // Protected routes - require authentication
  { path: '/dashboard', requiresAuth: true, allowedRoles: ['ADMIN'] },
  { path: '/home', requiresAuth: true, allowedRoles: ['USER'], requiresOnboardingComplete: true },
  { path: '/profile', requiresAuth: true, allowedRoles: ['USER'], requiresOnboardingComplete: true },
  { path: '/matching/matches', requiresAuth: true, allowedRoles: ['USER'], requiresOnboardingComplete: true },
  { path: '/matching/matches/matches', requiresAuth: true, allowedRoles: ['USER'], requiresOnboardingComplete: true },
  { path: '/matching/matches/interests', requiresAuth: true, allowedRoles: ['USER'], requiresOnboardingComplete: true },
  { path: '/matching/matches/mutual-matches', requiresAuth: true, allowedRoles: ['USER'], requiresOnboardingComplete: true },

  // Onboarding routes - require authentication but not complete onboarding
  { path: '/onboarding/personal-info', requiresAuth: true, allowedRoles: ['USER'] },
  { path: '/onboarding/education-and-career', requiresAuth: true, allowedRoles: ['USER'] },
  { path: '/onboarding/lifestyle', requiresAuth: true, allowedRoles: ['USER'] },
  { path: '/onboarding/religious-view', requiresAuth: true, allowedRoles: ['USER'] },
  { path: '/onboarding/add-photo', requiresAuth: true, allowedRoles: ['USER'] },
  { path: '/onboarding/subscription-plans', requiresAuth: true, allowedRoles: ['USER'] },
  { path: '/onboarding', requiresAuth: true, allowedRoles: ['USER'] },
]

interface AuthGuardProps {
  children: React.ReactNode
}

// Helper functions
const findRouteConfig = (path: string): RouteConfig | null => {
  // First try exact match
  let config = ROUTE_CONFIG.find(route => route.path === path)
  if (config) return config

  // Then try partial match for dynamic routes
  config = ROUTE_CONFIG.find(route => {
    if (route.path.includes('*')) {
      const basePath = route.path.replace('/*', '')
      return path.startsWith(basePath)
    }
    return false
  })

  return config || null
}

const isAuthRoute = (path: string): boolean => {
  return path.startsWith('/auth/')
}

const isOnboardingRoute = (path: string): boolean => {
  return path.startsWith('/onboarding')
}

const getAllowedOnboardingStep = (completion: number): string => {
  const steps = [
    { step: 'personal-info', minCompletion: 0 },
    { step: 'education-and-career', minCompletion: 20 },
    { step: 'lifestyle', minCompletion: 40 },
    { step: 'religious-view', minCompletion: 60 },
    { step: 'add-photo', minCompletion: 80 },
    { step: 'subscription-plans', minCompletion: 90 }
  ]

  for (let i = steps.length - 1; i >= 0; i--) {
    if (completion >= steps[i].minCompletion) {
      return steps[i].step
    }
  }

  return 'personal-info'
}

const isAllowedOnboardingPath = (currentPath: string, allowedStep: string, completion: number): boolean => {
  const pathParts = currentPath.split('/')
  const currentStep = pathParts[pathParts.length - 1]

  if (currentPath === '/onboarding') {
    return true
  }

  const stepConfig: { [key: string]: { minCompletion: number } } = {
    'personal-info': { minCompletion: 0 },
    'education-and-career': { minCompletion: 20 },
    'lifestyle': { minCompletion: 40 },
    'religious-view': { minCompletion: 60 },
    'add-photo': { minCompletion: 80 },
    'subscription-plans': { minCompletion: 90 }
  }

  const currentStepConfig = stepConfig[currentStep]
  if (!currentStepConfig) {
    return false
  }

  return completion >= currentStepConfig.minCompletion
}

const checkRoleAccess = (user: User, allowedRoles?: ('USER' | 'ADMIN')[]): boolean => {
  if (!allowedRoles || allowedRoles.length === 0) {
    return true
  }
  return allowedRoles.includes(user.role)
}

const getAuthenticatedRedirectPath = (user: User): string => {
  const redirectionInfo = getPostLoginRedirection(user)
  return redirectionInfo.path
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [storageVersion, setStorageVersion] = useState(0)

  const validateToken = useCallback(async (token: string): Promise<boolean> => {
    try {
      console.log('Validating token...')
      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        console.log('Token validation timeout - aborting request')
        controller.abort()
      }, 5000) // Increased timeout to 5 seconds

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      console.log('Calling API:', `${apiUrl}/api/auth/me`)
      
      const response = await fetch(`${apiUrl}/api/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      })

      clearTimeout(timeoutId)
      console.log('Token validation response:', response.status, response.ok)
      return response.ok
    } catch (error: any) {
      console.error('Token validation failed:', error.name, error.message)
      // If it's a timeout or network error, assume token is invalid
      if (error.name === 'AbortError') {
        console.log('Token validation timed out')
      }
      return false
    }
  }, [])

  const clearAuthData = useCallback(() => {
    localStorage.removeItem('userData')
    localStorage.removeItem('userProfile')
    localStorage.removeItem('authToken')
  }, [])

  const checkRouteAuthorization = useCallback(async (userData: User) => {
    if (pathname === '/') {
      const redirectPath = getAuthenticatedRedirectPath(userData)
      router.push(redirectPath)
    }

    if (isAuthRoute(pathname)) {
      const redirectPath = getAuthenticatedRedirectPath(userData)
      router.push(redirectPath)
    }

    const routeConfig = findRouteConfig(pathname)
    if (!routeConfig) {
      setIsAuthorized(true)
      setIsLoading(false)
      return
    }

    if (routeConfig.requiresAuth) {
      if (!checkRoleAccess(userData, routeConfig.allowedRoles)) {
        const redirectPath = getAuthenticatedRedirectPath(userData)
        router.push(redirectPath)
      }

      if (routeConfig.requiresOnboardingComplete) {
        const completion = userData.onboardingCompletion || 0
        if (completion < 100) {
          const allowedStep = getAllowedOnboardingStep(completion)
          router.push(`/onboarding/${allowedStep}`)
        }
      }
    }

    if (isOnboardingRoute(pathname)) {
      const completion = userData.onboardingCompletion || 0
      if (completion >= 100) {
        router.push('/matching/matches')
        return
      }

      const allowedStep = getAllowedOnboardingStep(completion)
      if (!isAllowedOnboardingPath(pathname, allowedStep, completion)) {
        router.push(`/onboarding/${allowedStep}`)
        return
      }
    }

    setIsAuthorized(true)
    setIsLoading(false)
  }, [pathname, router])

  const checkAuthAndRedirect = useCallback(async () => {
    setIsLoading(true)

    // Quick bypass for auth routes - don't validate tokens on sign-in/sign-up pages
    if (isAuthRoute(pathname)) {
      console.log('Auth route detected, skipping token validation')
      const userData = getUserData()
      const authToken = localStorage.getItem('authToken')
      
      // If user is already authenticated, redirect them away from auth pages
      if (authToken && userData) {
        const redirectPath = getAuthenticatedRedirectPath(userData)
        console.log('Already authenticated, redirecting from auth page to:', redirectPath)
        router.push(redirectPath)
        return
      }
      
      // Allow access to auth pages for unauthenticated users
      setIsAuthorized(true)
      setIsLoading(false)
      return
    }

    const userData = getUserData()
    const authToken = localStorage.getItem('authToken')

    if (!authToken || !userData) {
      console.log('No auth data found, redirecting to sign in')
      clearAuthData()
      router.push(REDIRECTION_MAP.unauthenticated)
      return
    }

    console.log('Attempting token validation...')
    const isValidToken = await validateToken(authToken)
    
    if (!isValidToken) {
      console.log('Token validation failed - checking if API is reachable')
      
      // Try a simple health check to see if API is reachable
      try {
        const healthCheck = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/auth/me`, {
          method: 'HEAD',
          signal: AbortSignal.timeout(2000)
        })
        
        // If we get any response (even 401), API is reachable, so token is truly invalid
        console.log('API is reachable, token is invalid - redirecting to sign in')
        clearAuthData()
        router.push(REDIRECTION_MAP.unauthenticated)
        return
      } catch (error) {
        // API is unreachable, allow user to proceed with localStorage data
        console.warn('API unreachable, proceeding with cached auth data:', error)
        console.log('Proceeding with cached user data due to API unavailability')
      }
    }

    await checkRouteAuthorization(userData)
  }, [pathname, router, validateToken, clearAuthData, checkRouteAuthorization])

  // Listen for localStorage changes to re-evaluate auth when user data is updated
  useEffect(() => {
    const handleStorageChange = () => {
      console.log('localStorage changed, re-evaluating auth...')
      setStorageVersion(prev => prev + 1)
    }

    // Listen for storage events from other tabs/windows
    window.addEventListener('storage', handleStorageChange)

    // Custom event for same-tab localStorage changes
    window.addEventListener('localStorageUpdate', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('localStorageUpdate', handleStorageChange)
    }
  }, [])

  useEffect(() => {
    checkAuthAndRedirect()
  }, [checkAuthAndRedirect, storageVersion])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  // Show content if authorized
  if (isAuthorized) {
    return <>{children}</>
  }

  // Default fallback (should not reach here)
  return null
}

export default AuthGuard

// Export configuration for external use
export { REDIRECTION_MAP, ROUTE_CONFIG }
export type { RouteConfig, RedirectionMap }
