import React, { useEffect, useState } from 'react';
import DashboardTemplate from '../components/templates/Dashboard/DashboardTemplate';
import AccountSettings from '../components/organisms/Settings/AccountSettings';
<<<<<<< HEAD
import { api } from '../utils/api';
import { toast } from 'react-hot-toast';
import type { Settings as SettingsType, ProfileData, SecurityData, NotificationPreference } from '../types/settings';
import { authService } from '../services/authService';
=======
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e

const Settings: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
<<<<<<< HEAD
  const [settings, setSettings] = useState<SettingsType | null>(null);

  useEffect(() => {
    // Check if user is authenticated (additional protection)
    const isAuthenticated = authService.isAuthenticated();
    console.log('Auth check:', { isAuthenticated, token: authService.getToken() });
=======

  useEffect(() => {
    // Check if user is authenticated (additional protection)
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
    
    // If not authenticated, redirect to home
    if (!isAuthenticated) {
      window.location.href = '/';
      return;
    }
    
<<<<<<< HEAD
    // Fetch user settings
    fetchSettings();
    
=======
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
    // Check if tab selection is stored in localStorage (from dropdown navigation)
    const storedTab = localStorage.getItem('settingsActiveTab');
    
    if (storedTab) {
      setActiveTab(storedTab);
      // Clear the stored tab after using it
      localStorage.removeItem('settingsActiveTab');
    } else {
      // Parse the URL to determine which settings tab to show
      const path = window.location.pathname;
      if (path.includes('/settings/general')) {
        setActiveTab('general');
      } else {
        // Keep default tab for other routes
        setActiveTab('profile');
      }
    }
    
    // Set page title
    document.title = 'Account Settings - Marketing Automation Tools';
<<<<<<< HEAD
  }, []);

  const fetchSettings = async () => {
    try {
      console.log('Fetching settings...');
      const settingsResponse = await api.get('/api/settings');
      console.log('Fetched settings:', settingsResponse.data);
      setSettings(settingsResponse.data);
      setIsLoading(false);
    } catch (error: any) {
      console.error('Error fetching settings:', error);
      if (error.response?.status === 401) {
        authService.logout();
        window.location.href = '/';
      } else {
        toast.error('Failed to load settings');
      }
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (profileData: ProfileData) => {
    try {
      console.log('Updating profile with data:', profileData);
      const response = await api.put('/api/settings/profile', profileData);
      console.log('Profile update response:', response.data);
      
      // Update local state
      setSettings(prev => {
        const newSettings = prev ? { ...prev, user: response.data.user } : null;
        console.log('New settings state:', newSettings);
        return newSettings;
      });
      
      // Fetch fresh data to verify
      await fetchSettings();
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleUpdateNotifications = async (preferences: NotificationPreference[]) => {
    try {
      const response = await api.put('/api/settings/notifications', { preferences });
      setSettings(prev => prev ? { ...prev, notificationPreferences: response.data.notificationPreferences } : null);
      toast.success('Notification preferences updated');
    } catch (error) {
      console.error('Error updating notifications:', error);
      toast.error('Failed to update notification preferences');
    }
  };

  const handleUpdateSecurity = async (securityData: SecurityData) => {
    try {
      const response = await api.put('/api/settings/security', securityData);
      setSettings(prev => prev ? { ...prev, user: { ...prev.user, ...response.data.user } } : null);
      toast.success('Security settings updated');
    } catch (error) {
      console.error('Error updating security settings:', error);
      toast.error('Failed to update security settings');
    }
  };

  // Show loading state while checking authentication or fetching data
=======
    setIsLoading(false);
  }, []);

  // Show loading state while checking authentication
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <DashboardTemplate activePage="settings" hideDefaultDashboard>
<<<<<<< HEAD
      <AccountSettings 
        className="mt-4" 
        initialActiveTab={activeTab}
        settings={settings}
        onUpdateProfile={handleUpdateProfile}
        onUpdateNotifications={handleUpdateNotifications}
        onUpdateSecurity={handleUpdateSecurity}
        setSettings={setSettings}
      />
=======
      <AccountSettings className="mt-4" initialActiveTab={activeTab} />
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
    </DashboardTemplate>
  );
};

export default Settings; 