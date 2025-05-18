export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string | null;
  timezone: string;
  isTwoFactorEnabled: boolean;
  isActivityLoggingEnabled: boolean;
  lastPasswordChange: Date;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationPreference {
  _id: string;
  userId: string;
  type: string;
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly' | 'never';
  createdAt: Date;
  updatedAt: Date;
}

export interface Integration {
  _id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  serviceType: 'urlShortener' | 'socialMedia' | 'analytics' | 'email' | 'other';
  apiKey?: string;
  isConnected: boolean;
  status: 'active' | 'inactive' | 'error';
  settings: Record<string, any>;
  credentials: Record<string, any>;
  metadata: {
    icon?: string;
    description?: string;
    website?: string;
    apiDocumentation?: string;
    [key: string]: any;
  };
  lastConnectedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Settings {
  user: User;
  notificationPreferences: NotificationPreference[];
  integrations: Integration[];
}

export interface ProfileData {
  name: string;
  phone: string | null;
  timezone: string;
}

export interface SecurityData {
  isTwoFactorEnabled: boolean;
  isActivityLoggingEnabled: boolean;
  lastPasswordChange?: string;
  currentPassword?: string;
  newPassword?: string;
} 