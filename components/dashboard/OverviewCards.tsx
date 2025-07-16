import { FiUsers, FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';

const stats = [
  {
    title: 'Total Users',
    value: '2,543',
    icon: <FiUsers className="w-6 h-6 text-blue-500" />,
    change: '+12% from last month',
  },
  {
    title: 'Active Users',
    value: '1,892',
    icon: <FiCheckCircle className="w-6 h-6 text-green-500" />,
    change: '+8% from last month',
  },
  {
    title: 'Pending Verification',
    value: '324',
    icon: <FiClock className="w-6 h-6 text-yellow-500" />,
    change: '-3% from last month',
  },
  {
    title: 'Declined',
    value: '87',
    icon: <FiXCircle className="w-6 h-6 text-red-500" />,
    change: '+2% from last month',
  },
];

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p className="mt-2 text-xs text-gray-500">{stat.change}</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
