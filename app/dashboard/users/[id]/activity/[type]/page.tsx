'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FiArrowLeft, FiUser, FiMail, FiMapPin, FiCalendar, FiHeart, FiX, FiCheck, FiUsers, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useUsers } from '@/hooks/useUsers';
import { use, useState } from 'react';

interface ActivityDetailPageProps {
  params: Promise<{
    id: string;
    type: string;
  }>;
}

interface ActivityItem {
  id: string;
  name: string;
  email: string;
  address: string;
  profileImage: string | null;
  activityDate: string;
  age: number;
  activityType?: string;
}

// Mock data for different activity types
const mockActivityData = {
  saved: [
    {
      id: '1',
      name: 'Sarah Ahmed',
      email: 'sarah.ahmed@email.com',
      address: 'Toronto, ON, Canada',
      profileImage: null,
      activityDate: '2024-01-15T10:30:00Z',
      age: 28
    },
    {
      id: '2',
      name: 'Fatima Khan',
      email: 'fatima.khan@email.com',
      address: 'Vancouver, BC, Canada',
      profileImage: null,
      activityDate: '2024-01-15T08:15:00Z',
      age: 26
    },
    {
      id: '3',
      name: 'Aisha Rahman',
      email: 'aisha.rahman@email.com',
      address: 'Montreal, QC, Canada',
      profileImage: null,
      activityDate: '2024-01-14T16:45:00Z',
      age: 30
    },
    {
      id: '4',
      name: 'Zainab Ali',
      email: 'zainab.ali@email.com',
      address: 'Calgary, AB, Canada',
      profileImage: null,
      activityDate: '2024-01-14T14:20:00Z',
      age: 25
    },
    {
      id: '5',
      name: 'Mariam Hassan',
      email: 'mariam.hassan@email.com',
      address: 'Ottawa, ON, Canada',
      profileImage: null,
      activityDate: '2024-01-13T11:30:00Z',
      age: 29
    }
  ],
  passed: [
    {
      id: '6',
      name: 'Zara Ali',
      email: 'zara.ali@email.com',
      address: 'Edmonton, AB, Canada',
      profileImage: null,
      activityDate: '2024-01-15T12:00:00Z',
      age: 27
    },
    {
      id: '7',
      name: 'Layla Omar',
      email: 'layla.omar@email.com',
      address: 'Winnipeg, MB, Canada',
      profileImage: null,
      activityDate: '2024-01-15T09:30:00Z',
      age: 24
    },
    {
      id: '8',
      name: 'Yasmin Farouk',
      email: 'yasmin.farouk@email.com',
      address: 'Halifax, NS, Canada',
      profileImage: null,
      activityDate: '2024-01-14T15:15:00Z',
      age: 31
    }
  ],
  rejected: [
    {
      id: '9',
      name: 'Nadia Malik',
      email: 'nadia.malik@email.com',
      address: 'London, ON, Canada',
      profileImage: null,
      activityDate: '2024-01-15T13:45:00Z',
      age: 26
    },
    {
      id: '10',
      name: 'Hiba Youssef',
      email: 'hiba.youssef@email.com',
      address: 'Quebec City, QC, Canada',
      profileImage: null,
      activityDate: '2024-01-14T10:20:00Z',
      age: 28
    }
  ],
  matched: [
    {
      id: '11',
      name: 'Amina Farouk',
      email: 'amina.farouk@email.com',
      address: 'Toronto, ON, Canada',
      profileImage: null,
      activityDate: '2024-01-14T18:30:00Z',
      age: 27
    },
    {
      id: '12',
      name: 'Khadija Nour',
      email: 'khadija.nour@email.com',
      address: 'Vancouver, BC, Canada',
      profileImage: null,
      activityDate: '2024-01-12T20:15:00Z',
      age: 25
    }
  ],
  timeline: [
    {
      id: '13',
      name: 'Rania Said',
      email: 'rania.said@email.com',
      address: 'Calgary, AB, Canada',
      profileImage: null,
      activityDate: '2024-01-15T14:30:00Z',
      age: 29,
      activityType: 'profile_updated'
    },
    {
      id: '14',
      name: 'Dina Mahmoud',
      email: 'dina.mahmoud@email.com',
      address: 'Montreal, QC, Canada',
      profileImage: null,
      activityDate: '2024-01-14T12:45:00Z',
      age: 26,
      activityType: 'identity_verified'
    }
  ]
};

const activityConfig = {
  saved: {
    title: 'Users Saved',
    icon: FiHeart,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    description: 'Users that have been saved to favorites'
  },
  passed: {
    title: 'Users Passed',
    icon: FiCheck,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    description: 'Users that have been passed on'
  },
  rejected: {
    title: 'Users Rejected',
    icon: FiX,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    description: 'Users that have been rejected'
  },
  matched: {
    title: 'Mutual Matches',
    icon: FiUsers,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    description: 'Users with mutual interest'
  },
  timeline: {
    title: 'Activity Timeline',
    icon: FiCalendar,
    color: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-900/30',
    description: 'All recent activities'
  }
};

export default function ActivityDetailPage({ params }: ActivityDetailPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { users } = useUsers();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Unwrap params Promise
  const { id, type } = use(params);

  // Get the tab parameter to know which tab to return to
  const fromTab = searchParams.get('from') || 'all';
  const returnTab = searchParams.get('tab') || 'activity';

  // Find the user by ID
  const user = users.find(u => u.id === id);

  const handleBack = () => {
    // Navigate back to the user details page with the specific tab
    router.push(`/dashboard/users/${id}?from=${fromTab}&tab=${returnTab}`);
  };

  // Get activity data and config
  const activityData = mockActivityData[type as keyof typeof mockActivityData] || [];
  const config = activityConfig[type as keyof typeof activityConfig];

  if (!config) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Invalid Activity Type</h1>
          <Button onClick={handleBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  // Pagination calculations
  const totalItems = activityData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = activityData.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
      } else {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
    }
  };

  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border-gray-200 dark:border-gray-700 border-opacity-50 dark:border-opacity-50"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Profile
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-lg ${config.bgColor}`}>
              <IconComponent className={`w-6 h-6 ${config.color}`} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {config.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {config.description} • {activityData.length} total
              </p>
            </div>
          </div>

          {user && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {config.title.toLowerCase()} for{' '}
                <span className="font-medium text-gray-900 dark:text-white">
                  {user.fullName || user.name}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Activity List */}
        <div className="space-y-4">
          {totalItems === 0 ? (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm text-center">
              <IconComponent className={`w-12 h-12 ${config.color} mx-auto mb-4`} />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No {config.title.toLowerCase()} yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {config.description.toLowerCase()} will appear here.
              </p>
            </div>
          ) : (
            currentItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center gap-4">
                  {/* Profile Image */}
                  <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    {item.profileImage ? (
                      <Image
                        src={item.profileImage}
                        alt={item.name}
                        className="w-16 h-16 rounded-full object-cover"
                        width={64}
                        height={64}
                      />
                    ) : (
                      <FiUser className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {item.name}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Age {item.age}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <FiMail className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{item.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <FiMapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{item.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Activity Date */}
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                      <FiCalendar className="w-4 h-4" />
                      <span>{formatDate(item.activityDate)}</span>
                    </div>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}>
                      <IconComponent className="w-3 h-3" />
                      {type === 'saved' && 'Saved'}
                      {type === 'passed' && 'Passed'}
                      {type === 'rejected' && 'Rejected'}
                      {type === 'matched' && 'Matched'}
                      {type === 'timeline' && (item as ActivityItem).activityType?.replace('_', ' ')}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalItems > 0 && (
          <div className="mt-8 flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            {/* Previous Button */}
            <Button
              variant="outline"
              onClick={handlePreviousPage}
              disabled={currentPage === 1 || totalPages <= 1}
              className="flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {/* Page Info */}
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
              {totalPages > 1 ? (
                <>
                  <span>
                    Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} results
                  </span>
                  <span className="text-gray-400 dark:text-gray-500">•</span>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                </>
              ) : (
                <span>
                  Showing all {totalItems} results
                </span>
              )}
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages <= 1}
              className="flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <FiChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Total Records Summary */}
        {totalItems > 0 && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total {config.title.toLowerCase()}: <span className="font-medium text-gray-700 dark:text-gray-300">{totalItems}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
