import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../../lib/utils';
import { useNavigate } from 'react-router-dom';

interface DeliveredPostsProps {
  className?: string;
}

interface SocialAccount {
  id: string;
  name: string;
  platform: 'twitter' | 'linkedin' | 'facebook' | 'pinterest' | 'instagram' | 'all';
  icon: string;
}

interface DeliveredPost {
  id: string;
  author: string;
  authorHandle: string;
  date: string;
  time: string;
  content: string;
  socialIcons: string[];
  accountId: string;
  type: string;
}

export const DeliveredPosts: React.FC<DeliveredPostsProps> = ({ className }) => {
  const navigate = useNavigate();
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const accountDropdownRef = useRef<HTMLDivElement>(null);
  
  // Available social accounts for the current user
  const [accounts, setAccounts] = useState<SocialAccount[]>([
    {
      id: 'all',
      name: 'All Accounts',
      platform: 'all',
      icon: '/images/page2/all-accounts-icon.png'
    },
    {
      id: 'acc_1',
      name: 'AIMDek Technologies',
      platform: 'facebook',
      icon: '/images/page2/facebook-icon.png'
    },
    {
      id: 'acc_2',
      name: 'AIMDek Tech',
      platform: 'twitter',
      icon: '/images/page2/twitter-icon.png'
    },
    {
      id: 'acc_3',
      name: 'AIMDek Marketing',
      platform: 'instagram',
      icon: '/images/page2/instagram-icon.png'
    },
    {
      id: 'acc_4',
      name: 'AIMDek Official',
      platform: 'linkedin',
      icon: '/images/page2/linkedin-icon.png'
    }
  ]);
  
  // Selected account for filtering
  const [selectedAccount, setSelectedAccount] = useState<SocialAccount>(accounts[0]); // Default to "All Accounts"
  
  const [deliveredPosts, setDeliveredPosts] = useState<DeliveredPost[]>([
    {
      id: '1',
      author: 'AIMDek Technologies',
      authorHandle: '@aimdektech',
      date: 'Mon, Sep 27, 2021',
      time: '3:53 pm',
      content: 'Data and Creativity ❤️ The dynamic duo that your marketing strategy needs. Discover how they go hand-in-hand when it comes to campaign success. Discover how they go hand-in-hand when it comes to campaign success.',
      socialIcons: ['facebook', 'twitter', 'pinterest', 'tumblr', 'instagram', 'linkedin', 'youtube', 'snapchat', 'tiktok'],
      accountId: 'acc_1',
      type: 'Delivered Post'
    },
    {
      id: '2',
      author: 'AIMDek Technologies',
      authorHandle: '@aimdektech',
      date: 'Mon, Sep 27, 2021',
      time: '3:53 pm',
      content: 'Data and Creativity ❤️ The dynamic duo that your marketing strategy needs. Discover how they go hand-in-hand when it comes to campaign success. Discover how they go hand-in-hand when it comes to campaign success.',
      socialIcons: ['facebook', 'twitter', 'pinterest', 'tumblr', 'instagram', 'linkedin', 'youtube', 'snapchat', 'tiktok'],
      accountId: 'acc_1',
      type: 'Delivered Post'
    }
  ]);

  // Filter posts based on selected account
  const filteredPosts = selectedAccount.id === 'all' 
    ? deliveredPosts 
    : deliveredPosts.filter(post => post.accountId === selectedAccount.id);

  const toggleAccountDropdown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from closing immediately
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const handleSelectAccount = (account: SocialAccount) => {
    setSelectedAccount(account);
    setIsAccountDropdownOpen(false);
  };

  const handleReshare = (postId: string) => {
    console.log(`Resharing post: ${postId}`);
    // Navigate to queue times view with postId parameter
    navigate(`/publish?view=queue-times&postId=${postId}`);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountDropdownRef.current && 
        !accountDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAccountDropdownOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const renderSocialIcons = (icons: string[]) => {
    return (
      <div className="flex flex-wrap gap-1 mb-2">
        {icons.map((icon, index) => {
          const bgColor = getIconBgColor(icon);
          return (
            <div 
              key={index} 
              className={`${bgColor} w-6 h-6 flex items-center justify-center rounded text-white text-xs`}
              title={icon.charAt(0).toUpperCase() + icon.slice(1)}
            >
              {icon.charAt(0).toUpperCase()}
            </div>
          );
        })}
      </div>
    );
  };

  const getIconBgColor = (platform: string): string => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return 'bg-blue-600';
      case 'twitter':
        return 'bg-sky-400';
      case 'instagram':
        return 'bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400';
      case 'linkedin':
        return 'bg-blue-700';
      case 'youtube':
        return 'bg-red-600';
      case 'pinterest':
        return 'bg-red-500';
      case 'tumblr':
        return 'bg-indigo-800';
      case 'snapchat':
        return 'bg-yellow-400';
      case 'tiktok':
        return 'bg-black';
      default:
        return 'bg-gray-500';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return 'bg-blue-400';
      case 'linkedin':
        return 'bg-blue-700';
      case 'facebook':
        return 'bg-blue-600';
      case 'pinterest':
        return 'bg-red-600';
      case 'instagram':
        return 'bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400';
      case 'all':
        return 'bg-gray-600';
      default:
        return 'bg-gray-500';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return 'T';
      case 'linkedin':
        return 'in';
      case 'facebook':
        return 'f';
      case 'pinterest':
        return 'P';
      case 'instagram':
        return 'IG';
      case 'all':
        return 'All';
      default:
        return '';
    }
  };

  return (
    <div className={cn("w-full bg-white p-6 rounded-lg shadow-sm", className)}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Delivered
        </h1>
        <p className="text-sm text-gray-500">
          Publish - Delivered
        </p>
      </div>

      <div className="mb-6">
        <div className="text-sm text-gray-600 mb-4">
          Select a social media account
        </div>
        <div 
          ref={accountDropdownRef}
          className="relative"
        >
          <div 
            className="flex items-center space-x-2 border p-2 rounded-md w-full md:w-80 cursor-pointer hover:bg-gray-50"
            onClick={toggleAccountDropdown}
          >
            <div className={`w-8 h-8 rounded-full ${getPlatformColor(selectedAccount.platform)} flex items-center justify-center text-white`}>
              {getPlatformIcon(selectedAccount.platform).charAt(0)}
            </div>
            <div className="flex-grow">{selectedAccount.name}</div>
            <div className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
          
          {isAccountDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-full md:w-80 bg-white border rounded-md shadow-lg z-20">
              {accounts.map(account => (
                <div 
                  key={account.id}
                  className={`flex items-center space-x-2 p-3 hover:bg-gray-50 cursor-pointer ${account.id === selectedAccount.id ? 'bg-blue-50' : ''}`}
                  onClick={() => handleSelectAccount(account)}
                >
                  <div className={`w-8 h-8 rounded-full ${getPlatformColor(account.platform)} flex items-center justify-center text-white`}>
                    {getPlatformIcon(account.platform).charAt(0)}
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium">{account.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{account.platform === 'all' ? 'All Platforms' : `${account.platform} Account`}</div>
                  </div>
                  {account.id === selectedAccount.id && (
                    <div className="text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="border rounded-lg p-8 text-center">
          <h2 className="text-lg font-medium text-gray-700 mb-2">No delivered posts found</h2>
          <p className="text-gray-500">
            {selectedAccount.id === 'all' 
              ? 'You have no delivered posts.' 
              : `No delivered posts found for ${selectedAccount.name}.`}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    A
                  </div>
                  <div>
                    <div className="font-medium">{post.author}</div>
                    <div className="text-sm text-gray-500">{post.authorHandle}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded mr-2">
                    {post.type}
                  </div>
                  <div className="text-sm text-gray-500">
                    {post.date} {post.time}
                  </div>
                </div>
              </div>

              {renderSocialIcons(post.socialIcons)}

              <div className="mb-4">{post.content}</div>
              
              <div className="flex justify-end">
                <button 
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                  onClick={() => handleReshare(post.id)}
                >
                  Re-Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveredPosts; 