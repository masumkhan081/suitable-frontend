'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sun, Moon, Bell, MessageCircle, User, ChevronDown, LogOut } from 'lucide-react'
import { tokenManager } from '@/services/authService'

interface NavItem {
  label: string
  href: string
  icon?: any
}

interface TopNavProps {
  userRole?: 'user' | 'admin' | 'guest'
  userName?: string
  userProfileImage?: string | null
  showNotifications?: boolean
  showMessages?: boolean
  onThemeToggle?: () => void
  isDarkMode?: boolean
  customNavItems?: NavItem[]
}

export default function TopNav({ 
  userRole = 'user', 
  userName = 'User',
  userProfileImage = null,
  showNotifications = true,
  showMessages = true,
  onThemeToggle,
  isDarkMode = false,
  customNavItems
}: TopNavProps) {
  const router = useRouter()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)

  // Helper function to validate and get profile image URL
  const getProfileImageUrl = (imageUrl: string | null): string | null => {
    if (!imageUrl || imageUrl.trim() === '') return null
    
    try {
      // Check if it's a valid URL
      new URL(imageUrl)
      return imageUrl
    } catch {
      // If not a valid URL, it might be just a filename
      // In this case, we should return null since we expect full URLs
      return null
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    tokenManager.removeToken()
    localStorage.removeItem('userData')
    localStorage.removeItem('userProfile')
    
    // Dispatch custom event to notify AuthGuard
    window.dispatchEvent(new Event('localStorageUpdate'))
    
    setIsProfileMenuOpen(false)
    router.push('/auth/sign-in')
  }
  
  const getNavItems = (): NavItem[] => {
    switch (userRole) {
      case 'admin':
        return [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Users', href: '/dashboard/users' },
          { label: 'Settings', href: '/dashboard/settings' }
        ]
      case 'user':
        return [
          { label: 'Matching', href: '/matching/matches' },
          { label: 'Profile', href: '/profile' },
          { label: 'Settings', href: '/settings' }
        ]
      case 'guest':
        return [
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' }
        ]
      default:
        return []
    }
  }

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-semibold text-gray-800 dark:text-white">Suitable</span>
          </Link>
          
          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Always use the current component's navItems, not persisted state */}
            {(customNavItems ? [...customNavItems] : getNavItems()).map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          {onThemeToggle && (
            <button
              onClick={onThemeToggle}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}

          {/* Notifications */}
          {showNotifications && userRole !== 'guest' && (
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
          )}

          {/* Messages */}
          {showMessages && userRole !== 'guest' && (
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">
              <MessageCircle className="w-5 h-5" />
            </button>
          )}

          {/* User Menu */}
          {userRole !== 'guest' ? (
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                  {getProfileImageUrl(userProfileImage) ? (
                    <img
                      src={getProfileImageUrl(userProfileImage)!}
                      alt={`${userName} profile`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to default icon if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center ${getProfileImageUrl(userProfileImage) ? 'hidden' : ''}`}>
                    <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </div>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{userName}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <Link
                    href="/profile"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
