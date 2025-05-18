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
      await onUpdatePreferences(localPreferences);
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
                  </label>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleSavePreferences}
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
    </div>
  );
};

export default NotificationSettings; 