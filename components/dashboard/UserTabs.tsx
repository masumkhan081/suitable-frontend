'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FiUser, FiCheck, FiX, FiClock, FiUserX, FiTrash2, FiPause } from 'react-icons/fi';

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

export function UserTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = tabs.find(tab => pathname === tab.path)?.id || 'all';

  const handleTabClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="mb-6 border-b border-gray-200">
      <nav className="-mb-px flex space-x-1 sm:space-x-4 lg:space-x-8 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.path)}
            className={`flex-shrink-0 whitespace-nowrap py-3 sm:py-4 px-1 sm:px-2 border-b-2 font-medium text-xs sm:text-sm flex flex-col sm:flex-row items-center transition-colors duration-200 ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span className="mb-1 sm:mb-0 sm:mr-2">{tab.icon}</span>
            <span className="text-xs sm:text-sm">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
