<<<<<<< HEAD
import React, { useState } from 'react';
import { cn } from '../../../lib/utils';
import type { NotificationPreference } from '../../../types/settings';

interface NotificationSettingsProps {
  className?: string;
  preferences: NotificationPreference[];
  onUpdatePreferences: (preferences: NotificationPreference[]) => Promise<void>;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ 
  className,
  preferences = [],
  onUpdatePreferences
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [localPreferences, setLocalPreferences] = useState<NotificationPreference[]>(preferences);

  const handleTogglePreference = (id: string, type: 'email' | 'desktop') => {
    setLocalPreferences(current => 
      current.map(pref => {
        if (pref._id === id) {
=======
import React, { useState, useEffect } from 'react';
import { cn } from '../../../lib/utils';

interface NotificationPreference {
  id: string;
  type: string;
  description: string;
  emailEnabled: boolean;
  desktopEnabled: boolean;
}

interface NotificationSettingsProps {
  className?: string;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<NotificationPreference[]>([]);

  // Fetch notification preferences on component mount
  useEffect(() => {
    fetchNotificationPreferences();
  }, []);

  const fetchNotificationPreferences = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be fetched from an API
      // const response = await fetch('/api/user/notification-preferences', {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   }
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to fetch notification preferences');
      // }
      
      // const data = await response.json();
      
      // Simulating API response for demo
      const data: NotificationPreference[] = [
        {
          id: 'account_update',
          type: 'Account Update',
          description: 'Received when your account is modified',
          emailEnabled: true,
          desktopEnabled: false
        },
        {
          id: 'new_user_added',
          type: 'New User Added',
          description: 'Sent when new user is added',
          emailEnabled: true,
          desktopEnabled: false
        },
        {
          id: 'new_social_profile',
          type: 'New Social Profile Connected',
          description: 'Sent when new social profile is connected',
          emailEnabled: true,
          desktopEnabled: false
        },
        {
          id: 'new_post_created',
          type: 'New Post Created',
          description: 'Sent when new post created by user',
          emailEnabled: true,
          desktopEnabled: false
        },
        {
          id: 'approval_rejected',
          type: 'Approval Rejected',
          description: 'Sent when new approval is rejected by admin',
          emailEnabled: true,
          desktopEnabled: true
        },
        {
          id: 'new_approval_requested',
          type: 'New Approval Requested',
          description: 'Received when new post approval is requested',
          emailEnabled: true,
          desktopEnabled: false
        },
        {
          id: 'approval_approved',
          type: 'Approval Approved',
          description: 'Sent to the author when post is approved',
          emailEnabled: true,
          desktopEnabled: false
        },
        {
          id: 'profile_changed',
          type: 'Profile Changed',
          description: 'Sent to the author when profile is changed',
          emailEnabled: true,
          desktopEnabled: true
        }
      ];
      
      setPreferences(data);
    } catch (err) {
      console.error('Error fetching notification preferences:', err);
      setError('Failed to load notification preferences. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePreference = (id: string, type: 'email' | 'desktop') => {
    setPreferences(current => 
      current.map(pref => {
        if (pref.id === id) {
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
          if (type === 'email') {
            return { ...pref, emailEnabled: !pref.emailEnabled };
          } else {
            return { ...pref, desktopEnabled: !pref.desktopEnabled };
          }
        }
        return pref;
      })
    );
    
    // Clear success message when user makes changes
    if (successMessage) {
      setSuccessMessage(null);
    }
  };

  const handleSavePreferences = async () => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
<<<<<<< HEAD
      await onUpdatePreferences(localPreferences);
=======
      // In a real app, this would send data to an API
      // const response = await fetch('/api/user/notification-preferences', {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ preferences })
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to update notification preferences');
      // }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
      setSuccessMessage('Notification preferences updated successfully!');
    } catch (err) {
      console.error('Error updating notification preferences:', err);
      setError('Failed to update notification preferences. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={className}>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Notification Settings</h3>
        <p className="text-sm text-gray-600">You will get only notification what have enabled.</p>
      </div>
      
<<<<<<< HEAD
=======
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}
          
          {/* Success message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-md">
              {successMessage}
            </div>
          )}
          
          <div className="bg-white rounded-md overflow-hidden border border-gray-200 mb-6">
            <div className="grid grid-cols-3 bg-gray-50 p-4 border-b border-gray-200">
              <div className="col-span-1 font-medium text-gray-700">NOTIFICATION TYPE</div>
              <div className="text-center font-medium text-gray-700">EMAIL NOTIFICATION</div>
              <div className="text-center font-medium text-gray-700">DESKTOP NOTIFICATION</div>
            </div>
            
<<<<<<< HEAD
        {localPreferences.map((pref) => (
          <div key={pref._id} className="grid grid-cols-3 p-4 border-b border-gray-200 last:border-b-0">
                <div className="col-span-1">
              <h4 className="font-medium text-gray-800">{pref.type}</h4>
              <p className="text-sm text-gray-600">{pref.description}</p>
                </div>
                <div className="flex justify-center items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                  checked={pref.emailEnabled}
                  onChange={() => handleTogglePreference(pref._id, 'email')}
                  disabled={isSaving}
                    />
                <div className={cn(
                  "w-11 h-6 bg-gray-200 rounded-full peer",
                  "peer-focus:ring-4 peer-focus:ring-blue-300",
                  "dark:peer-focus:ring-blue-800 dark:bg-gray-700",
                  "peer-checked:after:translate-x-full peer-checked:after:border-white",
                  "after:content-[''] after:absolute after:top-0.5 after:left-[2px]",
                  "after:bg-white after:border-gray-300 after:border after:rounded-full",
                  "after:h-5 after:w-5 after:transition-all dark:border-gray-600",
                  "peer-checked:bg-blue-600"
                )}></div>
                  </label>
                </div>
                <div className="flex justify-center items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                  checked={pref.desktopEnabled}
                  onChange={() => handleTogglePreference(pref._id, 'desktop')}
                  disabled={isSaving}
                    />
                <div className={cn(
                  "w-11 h-6 bg-gray-200 rounded-full peer",
                  "peer-focus:ring-4 peer-focus:ring-blue-300",
                  "dark:peer-focus:ring-blue-800 dark:bg-gray-700",
                  "peer-checked:after:translate-x-full peer-checked:after:border-white",
                  "after:content-[''] after:absolute after:top-0.5 after:left-[2px]",
                  "after:bg-white after:border-gray-300 after:border after:rounded-full",
                  "after:h-5 after:w-5 after:transition-all dark:border-gray-600",
                  "peer-checked:bg-blue-600"
                )}></div>
=======
            {preferences.map((preference, index) => (
              <div 
                key={preference.id}
                className={cn(
                  "grid grid-cols-3 p-4",
                  index !== preferences.length - 1 && "border-b border-gray-200"
                )}
              >
                <div className="col-span-1">
                  <div className="font-medium text-gray-800">{preference.type}</div>
                  <div className="text-sm text-gray-600">{preference.description}</div>
                </div>
                
                <div className="flex justify-center items-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={preference.emailEnabled}
                      onChange={() => handleTogglePreference(preference.id, 'email')}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex justify-center items-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={preference.desktopEnabled}
                      onChange={() => handleTogglePreference(preference.id, 'desktop')}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
                  </label>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleSavePreferences}
<<<<<<< HEAD
          disabled={isSaving}
              className={cn(
            "px-6 py-2 text-white bg-blue-600 rounded-md",
            "hover:bg-blue-700 focus:outline-none focus:ring-2",
            "focus:ring-blue-500 focus:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
=======
              className={cn(
                "px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
                isSaving && "opacity-75 cursor-not-allowed"
              )}
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : "Save Changes"}
            </button>
          </div>
        </>
      )}
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
    </div>
  );
};

export default NotificationSettings; 