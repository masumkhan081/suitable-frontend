'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FiUser, FiCheck, FiX, FiClock } from 'react-icons/fi';

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
      <nav className="-mb-px flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.path)}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
