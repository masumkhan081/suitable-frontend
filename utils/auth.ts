import { User } from '../services/authService';

export interface RedirectionResult {
  path: string;
  reason: string;
}

/**
 * Determines where to redirect a user after login based on their role and profile completion
 */
export function getPostLoginRedirection(user: User): RedirectionResult {
  // Admin users always go to dashboard
  if (user.role === 'ADMIN') {
    return {
      path: '/dashboard',
      reason: 'Admin user - redirecting to dashboard'
    };
  }

  // For regular users, check profile completion
  if (user.role === 'USER') {
    // If user has no profile or 0% completion, show onboarding welcome page
    if (!user.hasProfile || user.onboardingCompletion === 0) {
      return {
        path: '/onboarding',
        reason: 'No profile or 0% completion - showing onboarding welcome'
      };
    }

    // If profile completion is less than 100%, redirect to specific incomplete step
    if (user.onboardingCompletion < 100) {
      const nextStep = getOnboardingStepByCompletion(user.onboardingCompletion);
      return {
        path: nextStep,
        reason: `Profile ${user.onboardingCompletion}% complete - redirecting to ${nextStep}`
      };
    }

    // Profile is complete, go to user dashboard/matching/matches
    return {
      path: '/matching/matches',
      reason: 'Profile complete - redirecting to matching'
    };
  }

  // Fallback - should not happen
  return {
    path: '/dashboard',
    reason: 'Unknown role - fallback to dashboard'
  };
}

/**
 * Maps onboarding completion percentage to the next incomplete step
 * Based on backend step completion: Step 1=20%, Step 2=40%, Step 3=60%, Step 4=80%, Step 5=100%
 */
function getOnboardingStepByCompletion(completion: number): string {
  // 0% - Start with personal info (Step 1)
  if (completion < 20) return '/onboarding/personal-info/step-1';

  // 20% - Continue to Step 2 (location/education)
  if (completion < 40) return '/onboarding/personal-info/step-2';

  // 40% - Continue to Step 3 (lifestyle/religious)
  if (completion < 60) return '/onboarding/lifestyle';

  // 60% - Continue to Step 4 (photos)
  if (completion < 80) return '/onboarding/add-photo';

  // 80% - Continue to Step 5 (subscription)
  if (completion < 100) return '/onboarding/subscription-plans';

  // 100% - Should not reach here, but fallback to matching
  return '/matching/matches';
}

/**
 * Stores user data in localStorage for persistence
 */
export function storeUserData(user: User, token: string): void {
  try {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(user));
    
    // Dispatch custom event to notify AuthGuard of localStorage changes
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('localStorageUpdate'));
      console.log('Dispatched localStorageUpdate event for user data change');
    }
  } catch (error) {
    console.error('Failed to store user data:', error);
  }
}

/**
 * Retrieves user data from localStorage
 */
export function getUserData(): User | null {
  try {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Failed to retrieve user data:', error);
    return null;
  }
}

/**
 * Clears user data from localStorage
 */
export function clearUserData(): void {
  try {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  } catch (error) {
    console.error('Failed to clear user data:', error);
  }
}
