'use client'
import React from 'react'
import Link from 'next/link'
import { Sun, Moon, Bell, MessageCircle, User } from 'lucide-react'

interface TopNavProps {
  userRole?: 'user' | 'admin' | 'guest'
  userName?: string
  showNotifications?: boolean
  showMessages?: boolean
  onThemeToggle?: () => void
  isDarkMode?: boolean
}

export default function TopNav({ 
  userRole = 'user', 
  userName = 'User',
  showNotifications = true,
  showMessages = true,
  onThemeToggle,
  isDarkMode = false
}: TopNavProps) {
  
  const getNavItems = () => {
    switch (userRole) {
      case 'admin':
        return [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Users', href: '/dashboard/users' },
          { label: 'Settings', href: '/dashboard/settings' }
        ]
      case 'user':
        return [
          { label: 'Matches', href: '/matches' },
          { label: 'Mutual Matches', href: '/mutual-matches' },
          { label: 'Interests', href: '/interests' }
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
            {getNavItems().map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
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
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">{userName}</span>
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
