'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FiSettings, FiHelpCircle, FiPhone, FiUsers } from 'react-icons/fi';

type Tab = {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
};

const tabs: Tab[] = [
  {
    id: 'general',
    label: 'General',
    icon: <FiSettings className="w-4 h-4 mr-2" />,
    path: '/dashboard/settings',
  },
  {
    id: 'faq',
    label: 'FAQ',
    icon: <FiHelpCircle className="w-4 h-4 mr-2" />,
    path: '/dashboard/settings/faq',
  },
  {
    id: 'contacts',
    label: 'Contacts',
    icon: <FiPhone className="w-4 h-4 mr-2" />,
    path: '/dashboard/settings/contacts',
  },
  {
    id: 'team',
    label: 'Team Management',
    icon: <FiUsers className="w-4 h-4 mr-2" />,
    path: '/dashboard/settings/team',
  },
];

export function SettingsTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = tabs.find(tab => pathname === tab.path)?.id || 'general';

  const handleTabClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
      <nav className="-mb-px flex space-x-2 sm:space-x-8 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.path)}
            className={`flex-shrink-0 whitespace-nowrap py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm flex flex-col sm:flex-row items-center transition-colors duration-200 ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
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
