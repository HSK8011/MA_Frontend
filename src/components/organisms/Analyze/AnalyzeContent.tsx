import React, { useState } from 'react';
import { cn } from '../../../lib/utils';

interface AnalyzeContentProps {
  className?: string;
}

// User account interface
interface UserAccount {
    id: string;
  name: string;
    platform: string;
  profileImage: string;
}

// Analytics data interface
interface AnalyticsData {
  accountId: string;
  accountName: string;
  timeRange: string;
  metrics: {
    tweets: number;
    likes: number;
    followers: number;
    engagements: number;
    audienceGrowth: number;
    audienceGrowthPercentage?: number;
  };
  topPosts: Array<{
    id: string;
    platform: string;
    content: string;
    date: string;
    likes: number;
    comments: number;
    shares: number;
    mediaUrl?: string;
  }>;
}

export const AnalyzeContent: React.FC<AnalyzeContentProps> = ({ className }) => {
  // List of available accounts
  const [accounts] = useState<UserAccount[]>([
    {
    id: 'acc_123456',
    name: 'AIMDek Technologies',
    platform: 'twitter',
    profileImage: '/images/page2/aimdek-logo.png'
    },
    {
      id: 'acc_789012',
      name: 'AIMDek Marketing',
      platform: 'facebook',
      profileImage: '/images/page2/aimdek-logo.png'
    },
    {
      id: 'acc_345678',
      name: 'Tudu App',
      platform: 'instagram',
      profileImage: '/images/page2/aimdek-logo.png'
    },
    {
      id: 'acc_901234',
      name: 'Development Team',
      platform: 'linkedin',
      profileImage: '/images/page2/aimdek-logo.png'
    }
  ]);

  // State for the selected account ID
  const [selectedAccountId, setSelectedAccountId] = useState('acc_123456');
  
  // Get the currently selected account object
  const selectedAccount = accounts.find(account => account.id === selectedAccountId) || accounts[0];

  // State for the time range
  const [timeRange, setTimeRange] = useState('30 Days');
  
  // State for current active tab
  const [activeTab, setActiveTab] = useState('general');
  
  // State for analytics data
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    accountId: 'acc_123456',
    accountName: 'AIMDek Technologies',
    timeRange: '30d',
    metrics: {
      tweets: 12500,
      likes: 40,
      followers: 20,
      engagements: 10000,
      audienceGrowth: 10000
    },
    topPosts: [
      {
        id: 'post_123456',
        platform: 'twitter',
        content: 'Data and Creativity 🧡 The dynamic duo that your marketing strategy. Discover how they go hand-in-hand when it comes to campaign. Go hand-in-hand when it comes to campaign.',
        date: 'Mon, Sep 27, 2021 3:53 pm',
        likes: 120,
        comments: 45,
        shares: 67
      },
      {
        id: 'post_123457',
        platform: 'twitter',
        content: 'Data and Creativity 🧡 The dynamic duo that your marketing strategy. Discover how they go hand-in-hand when it comes to campaign. Go hand-in-hand when it comes to campaign.',
        date: 'Mon, Sep 27, 2021 3:53 pm',
        likes: 95,
        comments: 38,
        shares: 52
      },
      {
        id: 'post_123458',
        platform: 'twitter',
        content: 'Data and Creativity 🧡 The dynamic duo that your marketing strategy. Discover how they go hand-in-hand when it comes to campaign. Go hand-in-hand when it comes to campaign.',
        date: 'Mon, Sep 27, 2021 3:53 pm',
        likes: 82,
        comments: 33,
        shares: 41
      }
    ]
  });
  
  // Handle account selection change
  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAccountId = e.target.value;
    setSelectedAccountId(newAccountId);
    
    // In a real app, this would trigger an API call to fetch data for the new account
    console.log('Account changed to:', newAccountId);
    
    // For demo purposes, we'll simulate different data for different accounts
    const selectedAccount = accounts.find(account => account.id === newAccountId);
    if (selectedAccount) {
      // Mock data update - in a real app this would come from an API
      setAnalyticsData(prev => ({
        ...prev,
        accountId: selectedAccount.id,
        accountName: selectedAccount.name,
        metrics: {
          ...prev.metrics,
          // Generate some random numbers for the new account
          tweets: Math.floor(Math.random() * 15000) + 5000,
          likes: Math.floor(Math.random() * 100) + 20,
          followers: Math.floor(Math.random() * 50) + 10,
          engagements: Math.floor(Math.random() * 15000) + 5000,
          audienceGrowth: Math.floor(Math.random() * 12000) + 3000
        }
      }));
    }
  };
  
  // Handle time range selection change
  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // In a real app, this would trigger an API call to fetch data for the new time range
    setTimeRange(e.target.value);
    console.log('Time range changed:', e.target.value);
  };
  
  // Format numbers for display
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num.toString();
    }
  };
  
  return (
    <div className={cn("bg-white rounded-lg shadow-sm", className)}>
      <div className="p-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          {/* Account selector */}
          <div className="relative min-w-[250px]">
            <div className="flex items-center p-2 border border-gray-300 rounded-md bg-blue-50">
              <img 
                src={selectedAccount.profileImage} 
                alt={selectedAccount.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <select
                className="bg-transparent border-none focus:outline-none text-sm font-medium text-gray-700 appearance-none flex-grow pr-8"
                onChange={handleAccountChange}
                value={selectedAccountId}
              >
                {accounts.map(account => (
                  <option key={account.id} value={account.id}>
                    {account.name} ({account.platform})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Time range selector */}
          <div className="relative">
            <select
              className="appearance-none border border-gray-300 rounded-md p-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
              onChange={handleTimeRangeChange}
              value={timeRange}
            >
              <option value="7 Days">7 Days</option>
              <option value="30 Days">30 Days</option>
              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
              <option value="1 Year">1 Year</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              className={cn(
                "py-4 px-1 border-b-2 text-sm font-medium",
                activeTab === 'general'
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
              onClick={() => setActiveTab('general')}
            >
              General
            </button>
            <button
              className={cn(
                "py-4 px-1 border-b-2 text-sm font-medium",
                activeTab === 'posts'
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
              onClick={() => setActiveTab('posts')}
            >
              Posts
            </button>
          </nav>
        </div>
        
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {/* Tweets */}
          <div className="bg-gray-50 rounded-md p-4 flex flex-col items-center">
            <div className="w-10 h-10 flex items-center justify-center mb-2">
              <svg className="w-7 h-7 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-800">{formatNumber(analyticsData.metrics.tweets)}</div>
            <div className="text-sm text-gray-500">Tweets</div>
          </div>
          
          {/* Likes */}
          <div className="bg-gray-50 rounded-md p-4 flex flex-col items-center">
            <div className="w-10 h-10 flex items-center justify-center mb-2">
              <svg className="w-7 h-7 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-800">{formatNumber(analyticsData.metrics.likes)}</div>
            <div className="text-sm text-gray-500">Likes</div>
          </div>
          
          {/* Followers */}
          <div className="bg-gray-50 rounded-md p-4 flex flex-col items-center">
            <div className="w-10 h-10 flex items-center justify-center mb-2">
              <svg className="w-7 h-7 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z"/>
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-800">{formatNumber(analyticsData.metrics.followers)}</div>
            <div className="text-sm text-gray-500">Total Followers</div>
          </div>
          
          {/* Engagements */}
          <div className="bg-gray-50 rounded-md p-4 flex flex-col items-center">
            <div className="w-10 h-10 flex items-center justify-center mb-2">
              <svg className="w-7 h-7 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17,12V3A1,1 0 0,0 16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z"/>
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-800">{formatNumber(analyticsData.metrics.engagements)}</div>
            <div className="text-sm text-gray-500">Engagements</div>
          </div>
          
          {/* Audience Growth */}
          <div className="bg-gray-50 rounded-md p-4 flex flex-col items-center">
            <div className="w-10 h-10 flex items-center justify-center mb-2">
              <svg className="w-7 h-7 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.5,18.49L9.5,12.48L13.5,16.48L22,6.92L20.59,5.5L13.5,13.48L9.5,9.48L2,16.99L3.5,18.49Z"/>
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-800">{formatNumber(analyticsData.metrics.audienceGrowth)}</div>
            <div className="text-sm text-gray-500">Audience Growth</div>
          </div>
        </div>
        
        {/* Content based on active tab */}
        {activeTab === 'general' ? (
          // Most Liked Posts section
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4">Most Liked Posts</h2>
            <div className="border rounded-md overflow-hidden">
              {analyticsData.topPosts.map(post => (
                <div key={post.id} className="border-b last:border-b-0 p-4">
                  <div className="flex items-start space-x-3">
                    <img 
                      src={selectedAccount.profileImage}
                      alt={selectedAccount.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="font-medium text-gray-900">{selectedAccount.name}</span>
                        <span className="mx-1 text-gray-500">•</span>
                        <span className="text-gray-500 text-sm">{post.date}</span>
                      </div>
                      <p className="text-gray-800 mb-2">{post.content}</p>
                      <div className="flex space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          {post.likes} Likes
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                          </svg>
                          {post.comments} Comments
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                          </svg>
                          {post.shares} Shares
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Posts tab - placeholder for now
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4">All Posts</h2>
            <p className="text-gray-600">Detailed post analytics would be shown here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyzeContent; 