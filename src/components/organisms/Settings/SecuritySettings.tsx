import React, { useState, useEffect } from 'react';
import { cn } from '../../../lib/utils';
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
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [localSecurityData, setLocalSecurityData] = useState<SecurityData>(securityData);

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
      const newData = {
        ...localSecurityData,
        isTwoFactorEnabled: !localSecurityData.isTwoFactorEnabled
      };
      await onUpdateSecurity(newData);
      setLocalSecurityData(newData);
      setSuccessMessage(`Two-factor authentication ${!localSecurityData.isTwoFactorEnabled ? 'enabled' : 'disabled'} successfully!`);
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
      const newData = {
        ...localSecurityData,
        isActivityLoggingEnabled: !localSecurityData.isActivityLoggingEnabled
      };
      await onUpdateSecurity(newData);
      setLocalSecurityData(newData);
      setSuccessMessage(`Activity logs ${!localSecurityData.isActivityLoggingEnabled ? 'enabled' : 'disabled'} successfully!`);
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
      await onUpdateSecurity({
        ...localSecurityData,
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      // Reset form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      setIsChangingPassword(false);
      setSuccessMessage('Password changed successfully!');
    } catch (err) {
      console.error('Error changing password:', err);
      setError('Failed to change password. Please check your current password and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={className}>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Security Settings</h3>
        <p className="text-sm text-gray-600">Manage your account's security settings and preferences.</p>
      </div>
      
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
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handleInputChange}
                    className={cn(
                      "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                      "focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    )}
                        required
                      />
                    </div>
                    
                    <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
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
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handleInputChange}
                    className={cn(
                      "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                      "focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    )}
                        required
                      />
                    </div>
                  </div>
                  
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
    </div>
  );
};

export default SecuritySettings; 