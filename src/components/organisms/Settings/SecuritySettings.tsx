import React, { useState, useEffect } from 'react';
import { cn } from '../../../lib/utils';
<<<<<<< HEAD
import type { SecurityData } from '../../../types/settings';

interface SecuritySettingsProps {
  className?: string;
  securityData: SecurityData;
  onUpdateSecurity: (data: SecurityData) => Promise<void>;
}

export const SecuritySettings: React.FC<SecuritySettingsProps> = ({ 
  className,
  securityData,
  onUpdateSecurity
}) => {
=======

interface SecuritySettingsProps {
  className?: string;
}

export const SecuritySettings: React.FC<SecuritySettingsProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(true);
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
<<<<<<< HEAD
  const [localSecurityData, setLocalSecurityData] = useState<SecurityData>(securityData);
=======
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [activityLogsEnabled, setActivityLogsEnabled] = useState(true);
  const [lastPasswordChange, setLastPasswordChange] = useState<string | null>(null);

  // Fetch security settings on component mount
  useEffect(() => {
    fetchSecuritySettings();
  }, []);

  const fetchSecuritySettings = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be fetched from an API
      // const response = await fetch('/api/user/security-settings', {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   }
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to fetch security settings');
      // }
      
      // const data = await response.json();
      
      // Simulating API response for demo
      const data = {
        twoFactorEnabled: true,
        activityLogsEnabled: true,
        lastPasswordChange: '2019-10-02T14:30:00Z'
      };
      
      setTwoFactorEnabled(data.twoFactorEnabled);
      setActivityLogsEnabled(data.activityLogsEnabled);
      setLastPasswordChange(data.lastPasswordChange);
    } catch (err) {
      console.error('Error fetching security settings:', err);
      setError('Failed to load security settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear success message when user starts editing
    if (successMessage) {
      setSuccessMessage(null);
    }
  };

  const handleToggle2FA = async () => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
<<<<<<< HEAD
      const newData = {
        ...localSecurityData,
        isTwoFactorEnabled: !localSecurityData.isTwoFactorEnabled
      };
      await onUpdateSecurity(newData);
      setLocalSecurityData(newData);
      setSuccessMessage(`Two-factor authentication ${!localSecurityData.isTwoFactorEnabled ? 'enabled' : 'disabled'} successfully!`);
=======
      // In a real app, this would be an API call
      // const response = await fetch('/api/user/security/2fa', {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ enabled: !twoFactorEnabled })
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to update 2FA settings');
      // }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setTwoFactorEnabled(!twoFactorEnabled);
      setSuccessMessage(`Two-factor authentication ${!twoFactorEnabled ? 'enabled' : 'disabled'} successfully!`);
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
    } catch (err) {
      console.error('Error updating 2FA settings:', err);
      setError('Failed to update two-factor authentication settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActivityLogs = async () => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
<<<<<<< HEAD
      const newData = {
        ...localSecurityData,
        isActivityLoggingEnabled: !localSecurityData.isActivityLoggingEnabled
      };
      await onUpdateSecurity(newData);
      setLocalSecurityData(newData);
      setSuccessMessage(`Activity logs ${!localSecurityData.isActivityLoggingEnabled ? 'enabled' : 'disabled'} successfully!`);
=======
      // In a real app, this would be an API call
      // const response = await fetch('/api/user/security/activity-logs', {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ enabled: !activityLogsEnabled })
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to update activity logs settings');
      // }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setActivityLogsEnabled(!activityLogsEnabled);
      setSuccessMessage(`Activity logs ${!activityLogsEnabled ? 'enabled' : 'disabled'} successfully!`);
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
    } catch (err) {
      console.error('Error updating activity logs settings:', err);
      setError('Failed to update activity logs settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New password and confirmation do not match.');
      setIsSaving(false);
      return;
    }
    
    // Validate password strength
    if (passwordData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      setIsSaving(false);
      return;
    }
    
    try {
<<<<<<< HEAD
      await onUpdateSecurity({
        ...localSecurityData,
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
=======
      // In a real app, this would be an API call
      // const response = await fetch('/api/user/security/change-password', {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     currentPassword: passwordData.currentPassword,
      //     newPassword: passwordData.newPassword
      //   })
      // });
      
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Failed to change password');
      // }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
      
      // Reset form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      setIsChangingPassword(false);
<<<<<<< HEAD
=======
      setLastPasswordChange(new Date().toISOString());
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
      setSuccessMessage('Password changed successfully!');
    } catch (err) {
      console.error('Error changing password:', err);
      setError('Failed to change password. Please check your current password and try again.');
    } finally {
      setIsSaving(false);
    }
  };

<<<<<<< HEAD
  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
=======
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
<<<<<<< HEAD
    });
=======
    }).format(date);
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
  };

  return (
    <div className={className}>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Security Settings</h3>
<<<<<<< HEAD
        <p className="text-sm text-gray-600">Manage your account's security settings and preferences.</p>
      </div>
      
=======
        <p className="text-sm text-gray-600">These settings will help you to keep your account secure.</p>
      </div>
      
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
          
<<<<<<< HEAD
          <div className="bg-white rounded-md overflow-hidden border border-gray-200 mb-6">
        {/* Two-Factor Authentication */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-gray-800">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={localSecurityData.isTwoFactorEnabled}
                onChange={handleToggle2FA}
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
        </div>
        
        {/* Activity Logs */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-gray-800">Activity Logs</h4>
              <p className="text-sm text-gray-600">Track all activities on your account</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={localSecurityData.isActivityLoggingEnabled}
                onChange={handleToggleActivityLogs}
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
        </div>
        
        {/* Password Change */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
                <div>
              <h4 className="font-medium text-gray-800">Password</h4>
              <p className="text-sm text-gray-600">
                Last changed: {formatDate(localSecurityData.lastPasswordChange)}
              </p>
                </div>
                  <button
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              className={cn(
                "px-4 py-2 text-sm font-medium text-blue-600 rounded-md",
                "hover:bg-blue-50 focus:outline-none focus:ring-2",
                "focus:ring-blue-500 focus:ring-offset-2"
              )}
                  >
                    Change Password
                  </button>
              </div>
              
              {isChangingPassword && (
            <form onSubmit={handleChangePassword} className="mt-4">
                  <div className="space-y-4">
                    <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
=======
          {/* Change Password Section */}
          <div className="bg-white rounded-md overflow-hidden border border-gray-200 mb-6">
            <div className="p-5 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-800">Change Password</h4>
                  <p className="text-sm text-gray-600">Last changed: {formatDate(lastPasswordChange)}</p>
                </div>
                {!isChangingPassword && (
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Change Password
                  </button>
                )}
              </div>
              
              {isChangingPassword && (
                <form onSubmit={handleChangePassword} className="mt-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
<<<<<<< HEAD
                        value={passwordData.currentPassword}
                        onChange={handleInputChange}
                    className={cn(
                      "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                      "focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    )}
=======
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={passwordData.currentPassword}
                        onChange={handleInputChange}
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
                        required
                      />
                    </div>
                    
                    <div>
<<<<<<< HEAD
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
=======
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
<<<<<<< HEAD
                        value={passwordData.newPassword}
                        onChange={handleInputChange}
                    className={cn(
                      "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                      "focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    )}
                        required
                      />
                    </div>
                    
                    <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
=======
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={passwordData.newPassword}
                        onChange={handleInputChange}
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
<<<<<<< HEAD
                        value={passwordData.confirmPassword}
                        onChange={handleInputChange}
                    className={cn(
                      "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                      "focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    )}
=======
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={passwordData.confirmPassword}
                        onChange={handleInputChange}
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
                        required
                      />
                    </div>
                  </div>
                  
<<<<<<< HEAD
              <div className="mt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsChangingPassword(false)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md",
                    "border border-gray-300 hover:bg-gray-50",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  )}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className={cn(
                    "px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md",
                    "hover:bg-blue-700 focus:outline-none focus:ring-2",
                    "focus:ring-blue-500 focus:ring-offset-2",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
            </div>
          </div>
=======
                  <div className="flex justify-end mt-6 space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsChangingPassword(false)}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
                    >
                      Cancel
                    </button>
                    
                    <button
                      type="submit"
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
                      ) : "Change Password"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          {/* Two-Factor Authentication */}
          <div className="bg-white rounded-md overflow-hidden border border-gray-200 mb-6">
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-800">2 Factor Auth</h4>
                  <p className="text-sm text-gray-600 mb-1">Secure your account with 2FA security. When it is activated you will need to enter not only your password, but also a special code using app. You will receive this code via mobile application.</p>
                  <div className={cn(
                    "text-xs px-2 py-1 rounded inline-block",
                    twoFactorEnabled 
                      ? "bg-blue-50 text-blue-600" 
                      : "bg-gray-50 text-gray-600"
                  )}>
                    {twoFactorEnabled ? "Enabled" : "Disabled"}
                  </div>
                </div>
                <button
                  onClick={handleToggle2FA}
                  disabled={isSaving}
                  className={cn(
                    "px-6 py-2 rounded-md focus:outline-none focus:ring-2",
                    twoFactorEnabled 
                      ? "text-red-500 border border-red-500 hover:bg-red-50 focus:ring-red-300" 
                      : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
                    isSaving && "opacity-75 cursor-not-allowed"
                  )}
                >
                  {isSaving ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {twoFactorEnabled ? "Disabling..." : "Enabling..."}
                    </span>
                  ) : (
                    twoFactorEnabled ? "Disable" : "Enable"
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Activity Logs */}
          <div className="bg-white rounded-md overflow-hidden border border-gray-200">
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-800">Save my activity logs</h4>
                  <p className="text-sm text-gray-600 mb-1">You can save your all activity logs including unusual activity detected.</p>
                  <div className={cn(
                    "text-xs px-2 py-1 rounded inline-block",
                    activityLogsEnabled 
                      ? "bg-blue-50 text-blue-600" 
                      : "bg-gray-50 text-gray-600"
                  )}>
                    {activityLogsEnabled ? "Enabled" : "Disabled"}
                  </div>
                </div>
                <button
                  onClick={handleToggleActivityLogs}
                  disabled={isSaving}
                  className={cn(
                    "px-6 py-2 rounded-md focus:outline-none focus:ring-2",
                    activityLogsEnabled 
                      ? "text-red-500 border border-red-500 hover:bg-red-50 focus:ring-red-300" 
                      : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
                    isSaving && "opacity-75 cursor-not-allowed"
                  )}
                >
                  {isSaving ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {activityLogsEnabled ? "Disabling..." : "Enabling..."}
                    </span>
                  ) : (
                    activityLogsEnabled ? "Disable" : "Enable"
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
    </div>
  );
};

export default SecuritySettings; 