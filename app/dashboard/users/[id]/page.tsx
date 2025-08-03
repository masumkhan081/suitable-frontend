'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FiArrowLeft, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiCamera, FiBarChart, FiActivity, FiCreditCard } from 'react-icons/fi';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useUsers } from '@/hooks/useUsers';
import { useState, use, useEffect } from 'react';

interface UserDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

type TabType = 'profile' | 'photo' | 'analytics' | 'activity' | 'subscription';

const tabs = [
  { id: 'profile' as TabType, label: 'Profile', icon: FiUser },
  { id: 'photo' as TabType, label: 'Photo', icon: FiCamera },
  { id: 'analytics' as TabType, label: 'Analytics', icon: FiBarChart },
  { id: 'activity' as TabType, label: 'Activity', icon: FiActivity },
  { id: 'subscription' as TabType, label: 'Subscription', icon: FiCreditCard },
];

export default function UserDetailPage({ params }: UserDetailPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { users } = useUsers();
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  // Unwrap params Promise
  const { id } = use(params);

  // Get the tab parameter to know which tab to return to
  const fromTab = searchParams.get('from') || 'all';
  const tabParam = searchParams.get('tab') as TabType;

  // Set active tab from URL parameter when returning from activity detail page
  useEffect(() => {
    if (tabParam && ['profile', 'photo', 'analytics', 'activity', 'subscription'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Find the user by ID
  const user = users.find(u => u.id === id);

  const handleBack = () => {
    // Navigate back to the specific user tab
    const tabPaths: { [key: string]: string } = {
      'all': '/dashboard/users',
      'active': '/dashboard/users/active',
      'verified': '/dashboard/users/verified',
      'pending': '/dashboard/users/pending',
      'declined': '/dashboard/users/declined',
      'inactive': '/dashboard/users/inactive',
      'deactivated': '/dashboard/users/deactivated',
      'deleted': '/dashboard/users/deleted'
    };

    router.push(tabPaths[fromTab] || '/dashboard/users');
  };

  if (!user) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Users
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">User Not Found</h2>
          <p className="text-gray-600">The user you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User Details</h1>
          <p className="text-gray-600 dark:text-gray-400">Viewing details for {user['First Name']} {user['Last Name']}</p>
        </div>
      </div>

      {/* User Profile Banner */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6 overflow-hidden transition-colors duration-200">
        {/* Banner Background */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 relative">
          {/* Profile Image - 2/3 on banner, 1/3 below */}
          <div className="absolute left-8" style={{ top: 'calc(100% - 96px)' }}>
            <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              {user.profileImage ? (
                <Image
                  src={user.profileImage}
                  alt={`${user['First Name']} ${user['Last Name']}`}
                  className="w-full h-full rounded-full object-cover"
                  width={144}
                  height={144}
                />
              ) : (
                <FiUser className="w-15 h-15 text-gray-400" />
              )}
            </div>
          </div>
        </div>

        {/* User Info Below Banner */}
        <div className="pt-16 pb-3 px-6">
          <div className="ml-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
              {user['First Name']} {user['Last Name']}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-3">{user.Address || 'Address not provided'}</p>
          </div>
        </div>
      </div>

      {/* User Details Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-8">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FiUser className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.fullName || `${user['First Name']} ${user['Last Name']}`}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiUser className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.username || 'Not set'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiUser className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Nickname</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.nickname || 'Not set'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiCalendar className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.dob ? new Date(user.dob).toLocaleDateString() : user.Age ? `${user.Age} years old` : 'Not set'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiUser className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Gender</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.gender || user.Gender || 'Not specified'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiUser className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Height</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.height ? `${user.height} cm` : 'Not set'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FiMail className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Primary Email</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.Email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiMail className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Secondary Email</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.secondaryEmail || 'Not set'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiPhone className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.Phone || 'Not set'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiUser className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Marital Status</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.maritalStatus || 'Not specified'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiUser className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Ethnic Origin</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.ethnicOrigin || 'Not specified'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiMapPin className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Nationality</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.nationality || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Family Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Family Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Children</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.numberOfChildren || 0}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Siblings</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.numberOfSiblings || 0}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Want Children</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.likeToHaveChildren || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Address Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-medium text-gray-800 dark:text-gray-300 mb-3">Current Address</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <FiMapPin className="w-4 h-4 text-gray-400 dark:text-gray-300" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {user.currentAddress ?
                              `${user.currentAddress.area || ''} ${user.currentAddress.city || ''}, ${user.currentAddress.country || ''}`.trim().replace(/^,|,$/, '') || user.Address
                              : user.Address || 'Not provided'
                            }
                          </p>
                          {user.currentAddress?.postcode && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">Postcode: {user.currentAddress.postcode}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium text-gray-800 dark:text-gray-300 mb-3">Home Address</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <FiMapPin className="w-4 h-4 text-gray-400 dark:text-gray-300" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {user.backHomeAddress ?
                              `${user.backHomeAddress.area || ''} ${user.backHomeAddress.city || ''}, ${user.backHomeAddress.country || ''}`.trim().replace(/^,|,$/, '')
                              : 'Not provided'
                            }
                          </p>
                          {user.backHomeAddress?.postcode && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">Postcode: {user.backHomeAddress.postcode}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${user.isWillingToRelocate ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user.isWillingToRelocate ? 'Willing to relocate' : 'Not willing to relocate'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Religious Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Religious Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-100 dark:bg-green-700 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-600 dark:bg-green-500 rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Religion</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.religion || 'Not specified'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-blue-100 dark:bg-blue-700 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Sect</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.sect || 'Not specified'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-purple-100 dark:bg-purple-700 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-purple-600 dark:bg-purple-500 rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">School of Thought</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.schoolOfThoughts || 'Not specified'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-orange-100 dark:bg-orange-700 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-orange-600 dark:bg-orange-500 rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Religious History</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.religious_history || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-teal-100 dark:bg-teal-700 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-teal-600 dark:bg-teal-500 rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Prayer Frequency</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.prayerFrequency || 'Not specified'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${user.eatHalal ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user.eatHalal !== undefined ? (user.eatHalal ? 'Eats Halal' : 'Does not eat Halal') : user.halalEatingStatus || 'Halal eating status not specified'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${user.wearHijabKeepBeard ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user.wearHijabKeepBeard !== undefined ? (user.wearHijabKeepBeard ? 'Wears Hijab/Keeps Beard' : 'Does not wear Hijab/Keep Beard') : 'Not specified'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-indigo-100 dark:bg-indigo-700 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-500 rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Quran Reading</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.quranReadingStatus || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lifestyle Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Lifestyle</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${user.smoke !== undefined ? (user.smoke ? 'bg-red-500' : 'bg-green-500') : 'bg-gray-400'}`}></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Smoking: {user.smoke !== undefined ? (user.smoke ? 'Yes' : 'No') : user.smokingStatus || 'Not specified'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${user.drinkAlcohol !== undefined ? (user.drinkAlcohol ? 'bg-red-500' : 'bg-green-500') : 'bg-gray-400'}`}></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Alcohol: {user.drinkAlcohol !== undefined ? (user.drinkAlcohol ? 'Yes' : 'No') : user.alcoholConsumptionStatus || 'Not specified'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-100 dark:bg-green-700 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-600 dark:bg-green-500 rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Fitness Level</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.fitness || 'Not specified'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-amber-100 dark:bg-amber-700 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-amber-600 dark:bg-amber-500 rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Hair Color</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.hairColor || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-blue-100 dark:bg-blue-700 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Residency Status</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.recidencyStatus || 'Not specified'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-purple-100 dark:bg-purple-700 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-purple-600 dark:bg-purple-500 rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Living Status</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.currentLivingStatus || 'Not specified'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${user.physicalDisability ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Physical Disability: {user.physicalDisability !== undefined ? (user.physicalDisability ? 'Yes' : 'No') : 'Not specified'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${user.continueWorking ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Continue Working: {user.continueWorking !== undefined ? (user.continueWorking ? 'Yes' : 'No') : 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              {user.bio && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">About Me</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{user.bio}</p>
                  </div>
                </div>
              )}

              {/* Future Plans */}
              {user.futurePlan && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Future Plans</h3>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{user.futurePlan}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'photo' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Profile Photos</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Placeholder for user photos */}
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <FiCamera className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <FiCamera className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <FiCamera className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <FiCamera className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Photo management features coming soon...</p>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Financial Analytics</h3>

              {/* Financial Information */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Revenue</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{user.Revenue}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Rent</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{user.Rent}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Deposit</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{user.Deposit}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total</p>
                  <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">{user.Total}</p>
                </div>
              </div>

              {/* Analytics Charts Placeholder */}
              <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg text-center">
                <FiBarChart className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Analytics charts and insights coming soon...</p>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">User Activity</h3>

              {/* User Interactions Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Users Saved */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">Users Saved</h4>
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full">12</span>
                    </div>
                    <button 
                      onClick={() => router.push(`/dashboard/users/${id}/activity/saved?from=${fromTab}&tab=activity`)}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <FiUser className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Sarah Ahmed</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Saved 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <FiUser className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Fatima Khan</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Saved 5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <FiUser className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Aisha Rahman</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Saved 1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Users Passed */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">Users Passed</h4>
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full">8</span>
                    </div>
                    <button 
                      onClick={() => router.push(`/dashboard/users/${id}/activity/passed?from=${fromTab}&tab=activity`)}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <FiUser className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Zara Ali</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Passed 3 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <FiUser className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Mariam Hassan</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Passed 6 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <FiUser className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Layla Omar</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Passed 2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Users Rejected */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">Users Rejected</h4>
                      <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs px-2 py-1 rounded-full">5</span>
                    </div>
                    <button 
                      onClick={() => router.push(`/dashboard/users/${id}/activity/rejected?from=${fromTab}&tab=activity`)}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <FiUser className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Nadia Malik</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Rejected 4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <FiUser className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Hiba Youssef</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Rejected 1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Users Matched */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">Mutual Matches</h4>
                      <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs px-2 py-1 rounded-full">3</span>
                    </div>
                    <button 
                      onClick={() => router.push(`/dashboard/users/${id}/activity/matched?from=${fromTab}&tab=activity`)}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <FiUser className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Amina Farouk</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Matched 1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <FiUser className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Khadija Nour</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Matched 3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity Timeline */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">Recent Activity Timeline</h4>
                  <button 
                    onClick={() => router.push(`/dashboard/users/${id}/activity/timeline?from=${fromTab}&tab=activity`)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Saved Sarah Ahmed&apos;s profile</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Passed on Emily Chen&apos;s profile</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Passed on Zara Ali&apos;s profile</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">3 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Rejected Nadia Malik&apos;s profile</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Profile Updated</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Identity Verified</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Subscription Details</h3>

              {/* Subscription Info Placeholder */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                <div className="flex items-center gap-4">
                  <FiCreditCard className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Premium Plan</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active subscription</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Plan Type</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Premium Monthly</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Next Billing</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Feb 15, 2024</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Amount</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">$29.99/month</p>
                  </div>
                </div>
              </div>

              {/* Payment History Placeholder */}
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-4">Payment History</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Jan 15, 2024</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">$29.99</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Dec 15, 2023</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">$29.99</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Nov 15, 2023</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">$29.99</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
