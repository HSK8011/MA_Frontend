import React, { useState, useEffect } from 'react';
import { cn } from '../../../lib/utils';

interface GeneralSettingsProps {
  className?: string;
}

interface UrlShortenerService {
  id: string;
  name: string;
  icon: string;
  isConnected: boolean;
  description?: string;
  website?: string;
  apiDocumentation?: string;
}

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [urlShorteners, setUrlShorteners] = useState<UrlShortenerService[]>([]);

  // Fetch general settings on component mount
  useEffect(() => {
    fetchGeneralSettings();
  }, []);

  const fetchGeneralSettings = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be fetched from an API
      // const response = await fetch('/api/user/general-settings', {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   }
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to fetch general settings');
      // }
      
      // const data = await response.json();
      
      // Simulating API response for demo
      const data = {
        urlShorteners: [
          {
            id: 'bitly',
            name: 'Bitly',
            icon: '/images/bitly-logo.png',
            isConnected: false,
            description: 'Shorten, create and share trusted links',
            website: 'https://bitly.com',
            apiDocumentation: 'https://dev.bitly.com/'
          }
          // Additional URL shorteners would be added here
        ]
      };
      
      setUrlShorteners(data.urlShorteners);
    } catch (err) {
      console.error('Error fetching general settings:', err);
      setError('Failed to load general settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectService = async (serviceId: string) => {
    setIsConnecting(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/integrations/${serviceId}/connect`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      
      // if (!response.ok) {
      //   throw new Error(`Failed to connect to ${serviceId}`);
      // }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update the local state to show the service as connected
      setUrlShorteners(prevShorteners => 
        prevShorteners.map(service => 
          service.id === serviceId 
            ? { ...service, isConnected: true } 
            : service
        )
      );
      
      setSuccessMessage(`Successfully connected to ${serviceId}`);
    } catch (err) {
      console.error(`Error connecting to ${serviceId}:`, err);
      setError(`Failed to connect to ${serviceId}. Please try again.`);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnectService = async (serviceId: string) => {
    setIsConnecting(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/integrations/${serviceId}/disconnect`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      
      // if (!response.ok) {
      //   throw new Error(`Failed to disconnect from ${serviceId}`);
      // }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update the local state to show the service as disconnected
      setUrlShorteners(prevShorteners => 
        prevShorteners.map(service => 
          service.id === serviceId 
            ? { ...service, isConnected: false } 
            : service
        )
      );
      
      setSuccessMessage(`Successfully disconnected from ${serviceId}`);
    } catch (err) {
      console.error(`Error disconnecting from ${serviceId}:`, err);
      setError(`Failed to disconnect from ${serviceId}. Please try again.`);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className={className}>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">General Settings</h3>
        <p className="text-sm text-gray-600">These settings will help you to connect other application with product</p>
      </div>
      
      {isLoading ? (
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
          
          {/* URL Shortening Section */}
          <div className="bg-white rounded-md overflow-hidden border border-gray-200 mb-6">
            <div className="p-5">
              <h4 className="font-medium text-gray-800 mb-2">URL Shortening</h4>
              <p className="text-sm text-gray-600 mb-4">Connect below app to shortening your URL</p>
              
              <div className="space-y-4">
                {urlShorteners.map(service => (
                  <div key={service.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-3 flex items-center justify-center">
                        {/* This would be an actual logo in a real app */}
                        <svg className="w-8 h-8 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="#E0314B" />
                          <path d="M11.28,9.53a.66.66,0,0,0-1.31,0v5.66H8.19V9.53a2.44,2.44,0,0,1,4.88,0v.34a1.32,1.32,0,0,1-1.26,1.32Z" fill="#ffffff" />
                          <path d="M16.22,9.53a.66.66,0,0,0-1.31,0v5.66h-1.8V9.53a2.44,2.44,0,0,1,4.88,0v.34A1.32,1.32,0,0,1,16.73,11.19Z" fill="#ffffff" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">{service.name}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => service.isConnected 
                        ? handleDisconnectService(service.id) 
                        : handleConnectService(service.id)}
                      disabled={isConnecting}
                      className={cn(
                        "px-6 py-2 rounded-md uppercase text-sm font-medium focus:outline-none focus:ring-2",
                        service.isConnected 
                          ? "text-gray-500 border border-gray-300 hover:bg-gray-50 focus:ring-gray-300" 
                          : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
                        isConnecting && "opacity-75 cursor-not-allowed"
                      )}
                    >
                      {isConnecting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {service.isConnected ? "Disconnecting..." : "Connecting..."}
                        </span>
                      ) : (
                        service.isConnected ? "Disconnect" : "Connect"
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GeneralSettings; 