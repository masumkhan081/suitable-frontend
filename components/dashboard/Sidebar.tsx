'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiUsers, FiSettings, FiPieChart, FiHelpCircle, FiMail } from 'react-icons/fi';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

type SubMenuItem = {
  title: string;
  path: string;
};

type MenuItem = {
  title: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: SubMenuItem[];
};

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: <FiPieChart className="w-5 h-5" />,
    path: '/dashboard',
  },
  {
    title: 'Users',
    icon: <FiUsers className="w-5 h-5" />,
    subItems: [
      { title: 'All', path: '/dashboard/users' },
      { title: 'Active', path: '/dashboard/users/active' },
      { title: 'Verified', path: '/dashboard/users/verified' },
      { title: 'Pending', path: '/dashboard/users/pending' },
      { title: 'Declined', path: '/dashboard/users/declined' },
      { title: 'Inactive', path: '/dashboard/users/inactive' },
      { title: 'Deactivated', path: '/dashboard/users/deactivated' },
      { title: 'Deleted', path: '/dashboard/users/deleted' }
    ],
  },
  {
    title: 'Settings',
    icon: <FiSettings className="w-5 h-5" />,
    subItems: [
      { title: 'General', path: '/dashboard/settings' },
      { title: 'FAQ', path: '/dashboard/settings/faq' },
      { title: 'Contacts', path: '/dashboard/settings/contacts' },
      { title: 'Team Management', path: '/dashboard/settings/team' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Load expanded items from localStorage on component mount
  useEffect(() => {
    try {
      const savedExpandedItems = localStorage.getItem('sidebar-expanded-items');
      if (savedExpandedItems) {
        const parsed = JSON.parse(savedExpandedItems);
        setExpandedItems(parsed);
      }
    } catch (error) {
      console.warn('Failed to load sidebar state from localStorage:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save expanded items to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('sidebar-expanded-items', JSON.stringify(expandedItems));
      } catch (error) {
        console.warn('Failed to save sidebar state to localStorage:', error);
      }
    }
  }, [expandedItems, isInitialized]);

  const toggleItem = (title: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActive = (path: string) => pathname === path;
  const isParentActive = (subItems?: SubMenuItem[]) => {
    if (!subItems) return false;
    return subItems.some(item => pathname === item.path);
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-md h-screen fixed left-0 top-0 p-4 overflow-y-auto transition-colors duration-200">
      <div className="flex items-center justify-between mb-8 p-2">
        <div className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</div>
        <ThemeToggle />
      </div>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <div key={item.title} className="mb-1">
            {item.path ? (
              <Link
                href={item.path}
                className={`flex items-center p-3 rounded-lg transition-colors duration-150 ${
                  isActive(item.path || '')
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            ) : (
              <>
                <button
                  onClick={() => toggleItem(item.title)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-150 ${
                    isParentActive(item.subItems)
                      ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      expandedItems[item.title] ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {expandedItems[item.title] && item.subItems && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.path}
                        href={subItem.path}
                        className={`block p-2 text-sm rounded transition-colors duration-150 ${
                          isActive(subItem.path)
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
