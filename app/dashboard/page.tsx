'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { FiUsers, FiTrendingUp, FiActivity, FiBarChart, FiGrid, FiList, FiSquare } from 'react-icons/fi';
import { useTheme } from '@/contexts/ThemeContext';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Static data for user statistics across months and user types
const generateUserData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const userTypes = ['Active', 'Verified', 'Pending', 'Declined', 'Inactive', 'Deactivated', 'Deleted', 'All'];
  
  // Generate realistic data for each user type across months
  const data = {
    Active: [1200, 1350, 1500, 1680, 1850, 2100, 2300, 2500, 2650, 2800, 2950, 3100],
    Verified: [800, 920, 1050, 1200, 1380, 1550, 1720, 1900, 2050, 2200, 2350, 2500],
    Pending: [150, 180, 220, 280, 320, 380, 420, 460, 500, 540, 580, 620],
    Declined: [45, 52, 68, 75, 82, 95, 108, 125, 140, 155, 170, 185],
    Inactive: [300, 280, 260, 240, 220, 200, 180, 160, 140, 120, 100, 80],
    Deactivated: [80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25],
    Deleted: [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
    All: [2600, 2902, 3198, 3520, 3857, 4430, 4803, 5190, 5535, 5920, 6255, 6590]
  };
  
  return { months, userTypes, data };
};

export default function DashboardPage() {
  const { months, userTypes, data } = generateUserData();
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact'>('grid');
  const { theme } = useTheme();
  
  // Slope chart configuration for user growth trends with dark mode support
  const slopeChartOptions = {
    chart: {
      type: 'line' as const,
      height: 400,
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      },
      background: 'transparent'
    },
    stroke: {
      width: 3,
      curve: 'smooth' as const
    },
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316', '#6B7280'],
    xaxis: {
      categories: months,
      title: {
        text: 'Months',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          color: theme === 'dark' ? '#E5E7EB' : '#374151'
        }
      },
      labels: {
        style: {
          colors: theme === 'dark' ? '#9CA3AF' : '#6B7280'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Number of Users',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          color: theme === 'dark' ? '#E5E7EB' : '#374151'
        }
      },
      labels: {
        style: {
          colors: theme === 'dark' ? '#9CA3AF' : '#6B7280'
        }
      }
    },
    legend: {
      position: 'top' as const,
      horizontalAlign: 'center' as const,
      floating: false,
      fontSize: '12px',
      fontWeight: 500,
      labels: {
        colors: theme === 'dark' ? '#E5E7EB' : '#374151'
      }
    },
    grid: {
      borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
      strokeDashArray: 3
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: theme === 'dark' ? 'dark' : 'light',
      y: {
        formatter: function (val: number) {
          return val.toLocaleString() + ' users';
        }
      }
    }
  };
  
  const slopeChartSeries = userTypes.map(type => ({
    name: type,
    data: data[type as keyof typeof data]
  }));
  
  // Summary statistics
  const currentMonth = data.Active[data.Active.length - 1];
  const previousMonth = data.Active[data.Active.length - 2];
  const growthRate = ((currentMonth - previousMonth) / previousMonth * 100).toFixed(1);
  
  const totalUsers = Object.values(data).reduce((acc, userTypeData) => 
    acc + userTypeData[userTypeData.length - 1], 0
  );
  
  // Render cards based on view mode
  const renderUserCards = () => {
    const filteredUserTypes = userTypes.filter(type => type !== 'All');
    
    if (viewMode === 'list') {
      return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-200">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredUserTypes.map((type, index) => {
              const currentValue = data[type as keyof typeof data][data[type as keyof typeof data].length - 1];
              const typeData = data[type as keyof typeof data];
              const current = typeData[typeData.length - 1];
              const previous = typeData[typeData.length - 2];
              const growth = ((current - previous) / previous * 100).toFixed(1);
              const isPositive = parseFloat(growth) >= 0;
              
              const cardStyles = {
                Active: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', icon: FiUsers },
                Verified: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400', icon: FiActivity },
                Pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-600 dark:text-yellow-400', icon: FiBarChart },
                Declined: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400', icon: FiTrendingUp },
                Inactive: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400', icon: FiUsers },
                Deactivated: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400', icon: FiActivity },
                Deleted: { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-600 dark:text-gray-400', icon: FiBarChart },
                All: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-600 dark:text-indigo-400', icon: FiUsers }
              };
              
              const style = cardStyles[type as keyof typeof cardStyles];
              const IconComponent = style.icon;
              
              return (
                <div key={type} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 ${style.bg} rounded-lg transition-colors duration-200`}>
                        <IconComponent className={`text-xl ${style.text}`} />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{type} Users</h4>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{currentValue.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${
                        isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {isPositive ? '+' : ''}{growth}%
                      </span>
                      <FiTrendingUp className={`text-sm ${
                        isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400 transform rotate-180'
                      }`} />
                      <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    
    if (viewMode === 'compact') {
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {filteredUserTypes.map((type, index) => {
            const currentValue = data[type as keyof typeof data][data[type as keyof typeof data].length - 1];
            const typeData = data[type as keyof typeof data];
            const current = typeData[typeData.length - 1];
            const previous = typeData[typeData.length - 2];
            const growth = ((current - previous) / previous * 100).toFixed(1);
            const isPositive = parseFloat(growth) >= 0;
            
            const cardStyles = {
              Active: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', icon: FiUsers },
              Verified: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400', icon: FiActivity },
              Pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-600 dark:text-yellow-400', icon: FiBarChart },
              Declined: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400', icon: FiTrendingUp },
              Inactive: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400', icon: FiUsers },
              Deactivated: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400', icon: FiActivity },
              Deleted: { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-600 dark:text-gray-400', icon: FiBarChart },
              All: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-600 dark:text-indigo-400', icon: FiUsers }
            };
            
            const style = cardStyles[type as keyof typeof cardStyles];
            const IconComponent = style.icon;
            
            return (
              <div key={type} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center transition-colors duration-200">
                <div className={`p-2 ${style.bg} rounded-lg mx-auto w-fit mb-2 transition-colors duration-200`}>
                  <IconComponent className={`text-lg ${style.text}`} />
                </div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{type}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">{currentValue.toLocaleString()}</p>
                <div className="flex items-center justify-center gap-1">
                  <span className={`text-xs font-semibold ${
                    isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {isPositive ? '+' : ''}{growth}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    
    // Default grid view
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredUserTypes.map((type, index) => {
          const currentValue = data[type as keyof typeof data][data[type as keyof typeof data].length - 1];
          const typeData = data[type as keyof typeof data];
          const current = typeData[typeData.length - 1];
          const previous = typeData[typeData.length - 2];
          const growth = ((current - previous) / previous * 100).toFixed(1);
          const isPositive = parseFloat(growth) >= 0;
          
          // Define colors and icons for each user type
          const cardStyles = {
            Active: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', icon: FiUsers },
            Verified: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400', icon: FiActivity },
            Pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-600 dark:text-yellow-400', icon: FiBarChart },
            Declined: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400', icon: FiTrendingUp },
            Inactive: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400', icon: FiUsers },
            Deactivated: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400', icon: FiActivity },
            Deleted: { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-600 dark:text-gray-400', icon: FiBarChart },
            All: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-600 dark:text-indigo-400', icon: FiUsers }
          };
          
          const style = cardStyles[type as keyof typeof cardStyles];
          const IconComponent = style.icon;
          
          return (
            <div key={type} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{type} Users</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentValue.toLocaleString()}</p>
                </div>
                <div className={`p-3 ${style.bg} rounded-lg transition-colors duration-200`}>
                  <IconComponent className={`text-xl ${style.text}`} />
                </div>
              </div>
              
              {/* Growth indicator */}
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${
                  isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {isPositive ? '+' : ''}{growth}%
                </span>
                <FiTrendingUp className={`text-sm ${
                  isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400 transform rotate-180'
                }`} />
                <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      {/* Dashboard Overview Header with View Toggle */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
          <p className="text-gray-600 dark:text-gray-300">User statistics across all categories</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">View:</span>
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <FiGrid className="text-sm" />
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <FiList className="text-sm" />
              List
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'compact'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <FiSquare className="text-sm" />
              Compact
            </button>
          </div>
        </div>
      </div>
      
      {/* User Type Cards with Dynamic View */}
      {renderUserCards()}
      
      {/* Main Slope Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">User Growth Trends</h3>
          <p className="text-gray-600 dark:text-gray-400">Multi-group slope chart showing user statistics across months and user types</p>
        </div>
        
        <div className="w-full">
          <Chart
            options={slopeChartOptions}
            series={slopeChartSeries}
            type="line"
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
