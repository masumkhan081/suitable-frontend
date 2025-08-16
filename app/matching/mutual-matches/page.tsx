'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart, Users, Sparkles, ArrowLeft, MessageCircle, Archive, Zap, UserCheck } from 'lucide-react'
import TopNav from '@/components/TopNav'

export default function MutualMatchesPage() {
  const pathname = usePathname()
  const [activeSubTab, setActiveSubTab] = useState<string>(() => {
    // Try to get saved subtab from localStorage if in browser environment
    if (typeof window !== 'undefined') {
      const savedSubTab = localStorage.getItem('last-active-mutual-matches-tab')
      return savedSubTab || 'active'
    }
    return 'active'
  })
  
  // Save active subtab to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('last-active-mutual-matches-tab', activeSubTab)
    }
  }, [activeSubTab])

  const navigationItems = [
    {
      label: 'Matches',
      href: '/matching/matches',
      icon: Heart,
    },
    {
      label: 'Interests',
      href: '/matching/interests',
      icon: Sparkles,
    },
    {
      label: 'Mutual Matches',
      href: '/matching/mutual-matches',
      icon: Users,
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNav 
        userRole="user" 
        userName="Sorwar" 
        customNavItems={navigationItems}
      />


      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="flex gap-6 min-h-[calc(100vh-200px)]">
          {/* Left Sidebar - Vertical Tabs */}
          <div className="w-72 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Mutual Matches
                </h3>
              </div>
              <nav className="space-y-1">
                {getMutualMatchesTabs().map((subTab) => {
                  const Icon = subTab.icon
                  const isActive = activeSubTab === subTab.id
                  
                  return (
                    <button
                      key={subTab.id}
                      onClick={() => setActiveSubTab(subTab.id)}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group
                        ${isActive
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-[1.02]'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white hover:transform hover:scale-[1.01]'
                        }
                      `}
                    >
                      <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                      <span className="font-semibold">{subTab.label}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-8">
              <MutualMatchesTabContent activeSubTab={activeSubTab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function for mutual matches tabs
function getMutualMatchesTabs() {
  return [
    { id: 'active', label: 'Active Matches', icon: UserCheck },
    { id: 'conversations', label: 'Conversations', icon: MessageCircle },
    { id: 'archived', label: 'Archived', icon: Archive }
  ]
}

// Mutual Matches Tab Content Component
function MutualMatchesTabContent({ activeSubTab }: { activeSubTab: string }) {
  const getContentTitle = () => {
    const subTabData = getMutualMatchesTabs().find(tab => tab.id === activeSubTab)
    return subTabData?.label || 'Mutual Matches'
  }

  const getContentDescription = () => {
    const descriptions: Record<string, string> = {
      active: 'Your current mutual matches ready for conversation',
      conversations: 'Ongoing conversations with your matches',
      archived: 'Previously archived matches and conversations'
    }
    return descriptions[activeSubTab] || 'Content coming soon...'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {getContentTitle()}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {getContentDescription()}
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Content Coming Soon
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            This section will display {activeSubTab} mutual matches content
          </p>
        </div>
      </div>
    </div>
  )
}
