import { SettingsTabs } from '@/components/dashboard/SettingsTabs';

export default function SettingsPage() {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <div className="flex items-center gap-3 mb-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      </div>
      
      <SettingsTabs />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-200">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">General Settings</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Application Name
            </label>
            <input
              type="text"
              defaultValue="Suitable"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Default Language
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Time Zone
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200">
              <option value="PST">Pacific Standard Time (PST)</option>
              <option value="EST">Eastern Standard Time (EST)</option>
              <option value="CST">Central Standard Time (CST)</option>
              <option value="MST">Mountain Standard Time (MST)</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="notifications"
              defaultChecked
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
            />
            <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Enable email notifications
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="maintenance"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
            />
            <label htmlFor="maintenance" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Maintenance mode
            </label>
          </div>
          
          <div className="pt-4">
            <button className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
