import React, { useState, useEffect } from 'react';
import { cn } from '../../../lib/utils';
import NotificationSettings from './NotificationSettings';
import SecuritySettings from './SecuritySettings';
import GeneralSettings from './GeneralSettings';
import { toast } from "react-hot-toast";
import { api } from "../../../utils/api";
import type { Settings, ProfileData, SecurityData, NotificationPreference } from '../../../types/settings';

interface UserData {
  id?: string;
  name: string;
  email: string;
  phone: string | null;
  timezone: string;
}

interface TimeSlot {
  id: string;
  time: string; // 24-hour format "HH:MM"
}

interface WeekdaySetting {
  day: string;
  enabled: boolean;
  timeSlots: TimeSlot[];
}

interface QueueSettings {
  accountId: string;
  weekdaySettings: WeekdaySetting[];
}

interface AccountSettingsProps {
  className?: string;
  initialActiveTab?: string;
  settings: Settings | null;
  onUpdateProfile: (data: ProfileData) => Promise<void>;
  onUpdateNotifications: (preferences: NotificationPreference[]) => Promise<void>;
  onUpdateSecurity: (data: SecurityData) => Promise<void>;
  setSettings: React.Dispatch<React.SetStateAction<Settings | null>>;
}

export const AccountSettings: React.FC<AccountSettingsProps> = ({
  className = '',
  initialActiveTab = 'profile',
  settings,
  onUpdateProfile,
  onUpdateNotifications,
  onUpdateSecurity,
  setSettings
}) => {
  // Navigation items for settings sidebar
  const settingsNavItems = [
    { id: 'profile', label: 'Profile Settings', icon: '/images/page2/user.png', active: true },
    { id: 'notification', label: 'Notification Settings', icon: '/images/page2/bell.png', active: false },
    { id: 'security', label: 'Security Settings', icon: '/images/page2/setting.png', active: false },
    { id: 'general', label: 'General Settings', icon: '/images/page2/company.png', active: false },
    { id: 'queue-times', label: 'Set Queue Times', icon: '/images/page2/calendar.png', active: false },
  ];

  const [activeSettingsTab, setActiveSettingsTab] = useState(initialActiveTab);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: null,
    timezone: 'Culcutta (+05:30)'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Queue times state
  const [socialAccounts, setSocialAccounts] = useState([
    { id: 'twitter-account-123', name: 'Twitter - @aimdektech', icon: '/images/twitter-icon.png' },
    { id: 'facebook-account-456', name: 'Facebook - AIMDek Technologies', icon: '/images/facebook-icon.png' },
    { id: 'linkedin-account-789', name: 'LinkedIn - AIMDek Technologies', icon: '/images/linkedin-icon.png' },
    { id: 'instagram-account-012', name: 'Instagram - @aimdektech', icon: '/images/instagram-icon.png' }
  ]);
  const [selectedAccountId, setSelectedAccountId] = useState('twitter-account-123');
  const [queueSettings, setQueueSettings] = useState<QueueSettings>({
    accountId: 'twitter-account-123',
    weekdaySettings: [
      { day: 'monday', enabled: true, timeSlots: [
        { id: 'mon-1', time: '09:00' },
        { id: 'mon-2', time: '12:30' },
        { id: 'mon-3', time: '17:00' }
      ]},
      { day: 'tuesday', enabled: true, timeSlots: [
        { id: 'tue-1', time: '10:00' },
        { id: 'tue-2', time: '14:00' }
      ]},
      { day: 'wednesday', enabled: true, timeSlots: [
        { id: 'wed-1', time: '09:30' },
        { id: 'wed-2', time: '13:00' },
        { id: 'wed-3', time: '16:30' }
      ]},
      { day: 'thursday', enabled: true, timeSlots: [
        { id: 'thu-1', time: '09:00' },
        { id: 'thu-2', time: '12:00' },
        { id: 'thu-3', time: '15:00' },
        { id: 'thu-4', time: '18:00' }
      ]},
      { day: 'friday', enabled: true, timeSlots: [
        { id: 'fri-1', time: '10:00' },
        { id: 'fri-2', time: '13:00' },
        { id: 'fri-3', time: '16:00' }
      ]},
      { day: 'saturday', enabled: false, timeSlots: [] },
      { day: 'sunday', enabled: false, timeSlots: [] }
    ]
  });
  const [isLoadingQueueSettings, setIsLoadingQueueSettings] = useState(false);
  const [isSavingQueueSettings, setIsSavingQueueSettings] = useState(false);

  // Available timezones
  const timezoneOptions = [
    { value: 'Culcutta (+05:30)', label: 'Culcutta (+05:30)' },
    { value: 'Mumbai (+05:30)', label: 'Mumbai (+05:30)' },
    { value: 'Delhi (+05:30)', label: 'Delhi (+05:30)' },
    { value: 'New York (-05:00)', label: 'New York (-05:00)' },
    { value: 'London (+00:00)', label: 'London (+00:00)' }
  ];

  // Fetch user data on component mount
  useEffect(() => {
    if (settings) {
      console.log('Settings changed in AccountSettings:', settings);
      setUserData({
        id: settings.user._id,
        name: settings.user.name,
        email: settings.user.email,
        phone: settings.user.phone,
        timezone: settings.user.timezone
      });
      console.log('Updated userData state:', {
        id: settings.user._id,
        name: settings.user.name,
        email: settings.user.email,
        phone: settings.user.phone,
        timezone: settings.user.timezone
      });
      setIsLoading(false);
    }
  }, [settings]);

  // Load queue settings when account changes
  useEffect(() => {
    if (activeSettingsTab === 'queue-times') {
      fetchQueueSettings(selectedAccountId);
    }
  }, [selectedAccountId, activeSettingsTab]);

  // Fetch queue settings for an account
  const fetchQueueSettings = async (accountId: string) => {
    setIsLoadingQueueSettings(true);
    
    try {
      const response = await api.get(`/api/users/queue-settings?accountId=${accountId}`);
      
      if (response.data) {
        setQueueSettings(response.data);
      } else {
        // If no settings exist, use default state
        setQueueSettings({
          accountId,
          weekdaySettings: queueSettings.weekdaySettings
        });
      }
    } catch (err) {
      console.error('Error fetching queue settings:', err);
      setError('Failed to load queue settings. Please try again.');
    } finally {
      setIsLoadingQueueSettings(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear success message when user starts editing
    if (successMessage) {
      setSuccessMessage(null);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      console.log('Submitting profile update with data:', userData);
      await onUpdateProfile({
        name: userData.name,
        phone: userData.phone ?? '',
        timezone: userData.timezone
      });
      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Account deletion requested');
      // In a real app, this would call an API endpoint
      // POST /api/user/delete
      alert('Your account deletion has been requested. The account will be fully deleted after 30 days.');
    }
  };

  // Queue time settings handlers
  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccountId(e.target.value);
  };

  const toggleDayEnabled = (day: string) => {
    const updatedSettings = {
      ...queueSettings,
      weekdaySettings: queueSettings.weekdaySettings.map(setting => 
        setting.day === day ? { ...setting, enabled: !setting.enabled } : setting
      )
    };
    setQueueSettings(updatedSettings);
  };

  const addTimeSlot = (day: string) => {
    const daySettings = queueSettings.weekdaySettings.find(setting => setting.day === day);
    if (!daySettings) return;
    
    const newTimeSlot = {
      id: `${day}-${Date.now()}`,
      time: '12:00' // Default time
    };
    
    const updatedSettings = {
      ...queueSettings,
      weekdaySettings: queueSettings.weekdaySettings.map(setting => 
        setting.day === day 
          ? { ...setting, timeSlots: [...setting.timeSlots, newTimeSlot] } 
          : setting
      )
    };
    
    setQueueSettings(updatedSettings);
  };
  
  const removeTimeSlot = (day: string, slotId: string) => {
    const updatedSettings = {
      ...queueSettings,
      weekdaySettings: queueSettings.weekdaySettings.map(setting => 
        setting.day === day 
          ? { 
              ...setting, 
              timeSlots: setting.timeSlots.filter(slot => slot.id !== slotId) 
            } 
          : setting
      )
    };
    
    setQueueSettings(updatedSettings);
  };
  
  const updateTimeSlot = (day: string, slotId: string, newTime: string) => {
    const updatedSettings = {
      ...queueSettings,
      weekdaySettings: queueSettings.weekdaySettings.map(setting => 
        setting.day === day 
          ? { 
              ...setting, 
              timeSlots: setting.timeSlots.map(slot => 
                slot.id === slotId ? { ...slot, time: newTime } : slot
              ) 
            } 
          : setting
      )
    };
    
    setQueueSettings(updatedSettings);
  };
  
  const handleSaveQueueSettings = async () => {
    setIsSavingQueueSettings(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const response = await api.put('/api/users/queue-settings', queueSettings);
      
      if (response.data) {
        setQueueSettings(response.data.queueSettings);
        setSuccessMessage('Queue time settings updated successfully!');
      }
    } catch (err) {
      console.error('Error updating queue settings:', err);
      setError('Failed to update queue settings. Please try again.');
    } finally {
      setIsSavingQueueSettings(false);
    }
  };

  return (
    <div className={cn("bg-white rounded-lg shadow-sm", className)}>
      <h2 className="text-xl font-medium text-gray-800 p-6 border-b border-gray-100">Account Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Settings sidebar */}
        <div className="border-r border-gray-100">
          <ul className="py-2">
            {settingsNavItems.map((item) => (
              <li key={item.id}>
                <button
                  className={cn(
                    "flex items-center w-full px-6 py-4 text-left transition-colors",
                    activeSettingsTab === item.id 
                      ? "bg-blue-50 border-l-4 border-blue-500 pl-5 text-blue-600" 
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                  onClick={() => setActiveSettingsTab(item.id)}
                >
                  <img 
                    src={item.icon} 
                    alt="" 
                    className="w-5 h-5 mr-3" 
                  />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Content area */}
        <div className="md:col-span-2 p-6">
          {isLoading && activeSettingsTab !== 'queue-times' ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
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
          
              {activeSettingsTab === 'profile' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Profile Settings</h3>
                    <p className="text-sm text-gray-600">Basic info, like your name and address, that you use on Nio Platform.</p>
                  </div>
                  
                  <div className="mb-6 flex flex-col md:flex-row items-start md:items-center">
                    <div className="relative mr-4 mb-4 md:mb-0">
                      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                        <img src="/images/page2/user.png" alt="User Profile" className="w-full h-full object-cover" />
                      </div>
                      <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-gray-200 cursor-pointer">
                        <img src="/images/page2/path-491-2@3x.png" alt="Edit" className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div>
                      <h4 className="text-base font-medium">{userData.name}</h4>
                      <p className="text-sm text-gray-500">{userData.email}</p>
                    </div>
                  </div>
                  
                  <form onSubmit={handleProfileSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          User Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={userData.name || ''}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                          value={userData.email || ''}
                          disabled
                          title="Email cannot be changed"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={userData.phone ?? ''}
                          onChange={handleInputChange}
                          placeholder="Add a phone number"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                          Time Zone
                        </label>
                        <select
                          id="timezone"
                          name="timezone"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={userData.timezone}
                          onChange={(e) => {
                            setUserData(prev => ({
                              ...prev,
                              timezone: e.target.value
                            }));
                            if (successMessage) {
                              setSuccessMessage(null);
                            }
                          }}
                        >
                          {timezoneOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        className="px-4 py-2 text-red-600 border border-transparent hover:text-red-700 rounded-md text-sm focus:outline-none"
                        onClick={handleDeleteAccount}
                      >
                        Delete Account
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <span className="flex items-center">
                            <span className="w-4 h-4 mr-2 border-2 border-gray-200 border-t-white rounded-full animate-spin"></span>
                            Saving...
                          </span>
                        ) : (
                          'Save Changes'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Queue Time Settings */}
              {activeSettingsTab === 'queue-times' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Set Queue Times</h3>
                    <p className="text-sm text-gray-600">Set your preferred queue times for social media posts for each day of the week.</p>
                  </div>
                  
                  {/* Account Selection Dropdown */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Account</label>
                    <div className="relative">
                      <select 
                        className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        value={selectedAccountId}
                        onChange={handleAccountChange}
                      >
                        {socialAccounts.map(account => (
                          <option key={account.id} value={account.id}>
                            {account.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {isLoadingQueueSettings ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    <>
                      {/* Weekday Settings */}
                      <div className="space-y-6">
                        {queueSettings.weekdaySettings.map((daySetting) => (
                          <div key={daySetting.day} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-base font-medium capitalize">{daySetting.day}</h4>
                              <div className="flex items-center">
                                <label className="inline-flex relative items-center cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={daySetting.enabled}
                                    onChange={() => toggleDayEnabled(daySetting.day)}
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                                <span className="ml-2 text-sm text-gray-700">
                                  {daySetting.enabled ? 'Enabled' : 'Disabled'}
                                </span>
                              </div>
                            </div>
                            
                            {/* Time Slots */}
                            <div className="space-y-3">
                              {/* Only show time slots if day is enabled */}
                              {daySetting.enabled && (
                                <>
                                  {daySetting.timeSlots.map((slot) => (
                                    <div key={slot.id} className="flex items-center">
                                      <input
                                        type="time"
                                        className="rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                        value={slot.time}
                                        onChange={(e) => updateTimeSlot(daySetting.day, slot.id, e.target.value)}
                                      />
                                      <button 
                                        className="ml-2 text-red-500 hover:text-red-700"
                                        onClick={() => removeTimeSlot(daySetting.day, slot.id)}
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                      </button>
                                    </div>
                                  ))}
                                  
                                  <button 
                                    className="text-blue-600 hover:text-blue-800 flex items-center"
                                    onClick={() => addTimeSlot(daySetting.day)}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Add Time Slot
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Save Settings Button */}
                      <div className="mt-6">
                        <button 
                          className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSavingQueueSettings ? 'opacity-75 cursor-not-allowed' : ''}`}
                          onClick={handleSaveQueueSettings}
                          disabled={isSavingQueueSettings}
                        >
                          {isSavingQueueSettings ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Saving...
                            </>
                          ) : 'Save Queue Time Settings'}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
              
              {activeSettingsTab === 'notification' && (
                <NotificationSettings 
                  preferences={settings?.notificationPreferences || []}
                  onUpdatePreferences={onUpdateNotifications}
                />
              )}
              
              {activeSettingsTab === 'security' && (
                <SecuritySettings 
                  securityData={{
                    isTwoFactorEnabled: settings?.user?.isTwoFactorEnabled || false,
                    isActivityLoggingEnabled: settings?.user?.isActivityLoggingEnabled || false,
                    lastPasswordChange: settings?.user?.lastPasswordChange ? new Date(settings.user.lastPasswordChange).toISOString() : undefined
                  }}
                  onUpdateSecurity={onUpdateSecurity}
                />
              )}
              
              {activeSettingsTab === 'general' && (
                <GeneralSettings className={className} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings; 