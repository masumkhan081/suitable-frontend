'use client'
import React, { useEffect, useState } from 'react'
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
      onboardingComplete: '/matching',
      onboardingIncomplete: '/onboarding' // This will be dynamically determined
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
  
  // Public routes
  { path: '/', requiresAuth: false },
  { path: '/contact-us', requiresAuth: false },
  { path: '/terms', requiresAuth: false },
  { path: '/privacy', requiresAuth: false },
  
  // Protected routes - require authentication
  { path: '/dashboard', requiresAuth: true, allowedRoles: ['ADMIN'] },
  { path: '/home', requiresAuth: true, allowedRoles: ['USER'], requiresOnboardingComplete: true },
  { path: '/profile', requiresAuth: true, allowedRoles: ['USER'], requiresOnboardingComplete: true },
  { path: '/matching', requiresAuth: true, allowedRoles: ['USER'], requiresOnboardingComplete: true },
  
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

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    checkAuthAndRedirect()
  }, [pathname])

  const checkAuthAndRedirect = async () => {
    try {
      setIsLoading(true)
      
      // Get user data from localStorage
      const userData = getUserData()
      const isAuthenticated = !!userData
      
      // Find route configuration for current path
      const routeConfig = findRouteConfig(pathname)
      
      if (!routeConfig) {
        // Route not configured, allow access
        setIsAuthorized(true)
        setIsLoading(false)
        return
      }

      // Handle authentication requirements
      if (routeConfig.requiresAuth && !isAuthenticated) {
        // Route requires auth but user is not authenticated
        console.log('Redirecting to sign-in: Route requires authentication')
        router.push(REDIRECTION_MAP.unauthenticated)
        return
      }

      // Handle auth routes when user is already authenticated
      if (!routeConfig.requiresAuth && isAuthenticated && isAuthRoute(pathname)) {
        // User is authenticated but trying to access auth routes
        const redirectPath = getAuthenticatedRedirectPath(userData)
        console.log('Redirecting authenticated user from auth route to:', redirectPath)
        router.push(redirectPath)
        return
      }

      // Handle role-based access control
      if (routeConfig.requiresAuth && isAuthenticated) {
        // Handle sequential onboarding step protection
        if (isOnboardingRoute(pathname) && userData.role === 'USER') {
          const allowedStep = getAllowedOnboardingStep(userData.onboardingCompletion)
          if (!isAllowedOnboardingPath(pathname, allowedStep, userData.onboardingCompletion)) {
            console.log(`🔒 Blocking access to ${pathname}. User completion: ${userData.onboardingCompletion}%. Redirecting to: ${allowedStep}`)
            router.push(allowedStep)
            return
          }
        }

        // Handle role-based access
        if (routeConfig.allowedRoles && !checkRoleAccess(userData, routeConfig.allowedRoles)) {
          // User doesn't have required role
          const redirectPath = getAuthenticatedRedirectPath(userData)
          console.log('Redirecting due to insufficient role:', redirectPath)
          router.push(redirectPath)
          return
        }

        // Handle onboarding completion requirements
        if (routeConfig.requiresOnboardingComplete && userData.onboardingCompletion < 100) {
          // Route requires complete onboarding but user hasn't completed it
          const redirectionInfo = getPostLoginRedirection(userData)
          console.log('Redirecting to onboarding: Route requires complete profile ->', redirectionInfo.path)
          router.push(redirectionInfo.path)
          return
        }

        // Handle onboarding routes when user has completed onboarding
        if (isOnboardingRoute(pathname) && userData.onboardingCompletion >= 100) {
          // User has completed onboarding but trying to access onboarding routes
          console.log('Redirecting completed user from onboarding to matching')
          router.push(REDIRECTION_MAP.authenticated.USER.onboardingComplete)
          return
        }
      }

      // All checks passed, allow access
      setIsAuthorized(true)
      
    } catch (error) {
      console.error('AuthGuard error:', error)
      // On error, redirect to sign-in for safety
      router.push(REDIRECTION_MAP.unauthenticated)
    } finally {
      setIsLoading(false)
    }
  }

  // Helper functions
  const findRouteConfig = (path: string): RouteConfig | null => {
    // Find exact match first
    let config = ROUTE_CONFIG.find(route => route.path === path)
    
    if (!config) {
      // Find partial match for dynamic routes, prioritizing longer paths
      const matches = ROUTE_CONFIG.filter(route => 
        path.startsWith(route.path) && route.path !== '/'
      ).sort((a, b) => b.path.length - a.path.length) // Sort by length descending
      
      config = matches[0] || null
    }
    
    return config || null
  }

  const isAuthRoute = (path: string): boolean => {
    return path.startsWith('/auth/')
  }

  const isOnboardingRoute = (path: string): boolean => {
    return path.startsWith('/onboarding')
  }

  const getAllowedOnboardingStep = (completion: number): string => {
    // 0% - Start with personal info (Step 1)
    if (completion < 20) return '/onboarding/personal-info/step-1';
    
    // 20% - Continue to Step 2 (location/education)
    if (completion < 40) return '/onboarding/personal-info/step-2';
    
    // 40% - Continue to education/career
    if (completion < 60) return '/onboarding/education-and-career/step-1';
    
    // 60% - Continue to religious view
    if (completion < 80) return '/onboarding/religious-view';
    
    // 80% - Continue to add photo
    if (completion < 100) return '/onboarding/add-photo';
    
    // 100% - Should not reach here, but fallback to matching
    return '/matching';
  }

  const isAllowedOnboardingPath = (currentPath: string, allowedStep: string, completion: number): boolean => {
    // Always allow the main onboarding welcome page
    if (currentPath === '/onboarding') return true;
    
    // Always allow the exact step they should be on
    if (currentPath === allowedStep) return true;
    
    // Define step hierarchy with completion requirements
    const stepHierarchy = [
      { path: '/onboarding/personal-info/step-1', minCompletion: 0 },
      { path: '/onboarding/personal-info/step-2', minCompletion: 20 },
      { path: '/onboarding/education-and-career/step-1', minCompletion: 40 },
      { path: '/onboarding/lifestyle', minCompletion: 40 }, // Alternative path
      { path: '/onboarding/religious-view', minCompletion: 60 },
      { path: '/onboarding/add-photo', minCompletion: 80 },
      { path: '/onboarding/subscription-plans', minCompletion: 80 } // Alternative path
    ];
    
    // Find the step configuration for current path
    const currentStepConfig = stepHierarchy.find(step => currentPath.startsWith(step.path));
    
    if (!currentStepConfig) {
      // Path not in hierarchy, allow access (might be a general onboarding page)
      return true;
    }
    
    // Check if user has sufficient completion to access this step
    return completion >= currentStepConfig.minCompletion;
  }

  const checkRoleAccess = (user: User, allowedRoles?: ('USER' | 'ADMIN')[]): boolean => {
    if (!allowedRoles || allowedRoles.length === 0) {
      return true // No role restrictions
    }
    
    return allowedRoles.includes(user.role)
  }

  const getAuthenticatedRedirectPath = (user: User): string => {
    // Use the existing redirection logic from utils/auth.ts
    const redirectionInfo = getPostLoginRedirection(user)
    return redirectionInfo.path
  }

  // Loading state
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

  // Unauthorized state (should not reach here due to redirects)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Unauthorized</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">You don't have permission to access this page.</p>
          <button 
            onClick={() => router.push(REDIRECTION_MAP.unauthenticated)}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    )
  }

  // Authorized - render children
  return <>{children}</>
}

// Export configuration for external use
export { REDIRECTION_MAP, ROUTE_CONFIG }
export type { RouteConfig, RedirectionMap }
