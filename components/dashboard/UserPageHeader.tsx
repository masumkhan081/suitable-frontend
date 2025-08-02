'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FiFilter, FiUser, FiCheck, FiX, FiClock, FiUserX, FiTrash2, FiPause, FiChevronDown, FiSearch } from 'react-icons/fi';

type Tab = {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
};

const tabs: Tab[] = [
  {
    id: 'all',
    label: 'All Users',
    icon: <FiUser className="w-4 h-4 mr-2" />,
    path: '/dashboard/users',
  },
  {
    id: 'active',
    label: 'Active',
    icon: <FiCheck className="w-4 h-4 mr-2" />,
    path: '/dashboard/users/active',
  },
  {
    id: 'verified',
    label: 'Verified',
    icon: <FiCheck className="w-4 h-4 mr-2" />,
    path: '/dashboard/users/verified',
  },
  {
    id: 'declined',
    label: 'Declined',
    icon: <FiX className="w-4 h-4 mr-2" />,
    path: '/dashboard/users/declined',
  },
  {
    id: 'pending',
    label: 'Pending',
    icon: <FiClock className="w-4 h-4 mr-2" />,
    path: '/dashboard/users/pending',
  },
  {
    id: 'inactive',
    label: 'Inactive',
    icon: <FiPause className="w-4 h-4 mr-2" />,
    path: '/dashboard/users/inactive',
  },
  {
    id: 'deactivated',
    label: 'Deactivated',
    icon: <FiUserX className="w-4 h-4 mr-2" />,
    path: '/dashboard/users/deactivated',
  },
  {
    id: 'deleted',
    label: 'Deleted',
    icon: <FiTrash2 className="w-4 h-4 mr-2" />,
    path: '/dashboard/users/deleted',
  },
];

interface UserPageHeaderProps {
  onSearch?: (searchTerm: string) => void;
}

export function UserPageHeader({ onSearch }: UserPageHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const activeTab = tabs.find(tab => pathname === tab.path) || tabs[0];

  const handleTabClick = (path: string) => {
    router.push(path);
    setIsFilterOpen(false); // Close dropdown after selection
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch?.('');
  };

  return (
    <div className="space-y-6">
      {/* Title and Filter Section */}
      <div className="flex items-center justify-between">
      {/* Dynamic Title */}
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          {activeTab.label}
        </h2>
      </div>

      {/* Filter Button with Dropdown */}
      <div className="relative">
        <button
          onClick={toggleFilter}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm"
        >
          <FiFilter className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filter</span>
          <FiChevronDown 
            className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
              isFilterOpen ? 'rotate-180' : ''
            }`} 
          />
        </button>

        {/* Dropdown Menu */}
        {isFilterOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="py-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                User Types
              </div>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.path)}
                  className={`w-full flex items-center px-3 py-2 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                    activeTab.id === tab.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                      : 'text-gray-700'
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Overlay to close dropdown when clicking outside */}
        {isFilterOpen && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsFilterOpen(false)}
          />
        )}
      </div>
      </div>

      {/* Search Field - positioned just above tabs */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search users by name, email, phone..."
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <FiX className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
}
