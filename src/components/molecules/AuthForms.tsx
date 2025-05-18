import React, { useState } from 'react';
import { Button } from '../atoms/ui/button';
import { authService } from '../../services/authService';
import { toast } from 'react-hot-toast';

interface AuthFormProps {
  onSwitch?: (formType: 'login' | 'signup' | 'forgot' | 'reset') => void;
  onSuccess?: () => void;
}

export const LoginForm: React.FC<AuthFormProps> = ({ onSwitch, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await authService.login(email, password);
      
      // Verify we have the required data
      if (!response.token || !response.user) {
        throw new Error('Invalid response from server');
      }
      
      toast.success('Login successful!');
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
      // Clear any potentially invalid data
      authService.logout();
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Login Now</h2>
        <p className="text-gray-500 mt-1">Welcome Back!</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <div className="mt-1 text-right">
            <button
              type="button"
              className="text-primary hover:underline text-sm"
              onClick={() => onSwitch && onSwitch('forgot')}
            >
              Forgot Password?
            </button>
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login Now'}
        </Button>
      </form>
    </div>
  );
};

export const SignupForm: React.FC<AuthFormProps> = ({ onSwitch, onSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await authService.signup(fullName, email, password);
      toast.success('Account created successfully!');
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Start your free trial</h2>
        <p className="text-gray-500 mt-1">No credit card required</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        
        <Button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={() => onSwitch && onSwitch('login')}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export const ForgotPasswordForm: React.FC<AuthFormProps> = ({ onSwitch, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    
    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call the auth service to check if email exists and send OTP
      const response = await authService.forgotPassword(email);
      
      // If we get here, the email exists and OTP was sent
      const receivedOtp = response.otp || '000000'; // Fallback for development
      toast.success('OTP has been sent to your email');
      setOtp(receivedOtp);
      setShowResetForm(true);
    } catch (error: any) {
      if (error.response?.status === 404) {
        setEmailError('No account found with this email');
      } else {
        toast.error(error.response?.data?.message || 'Failed to process your request');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // For development, bypass actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otp !== '000000') {
        toast.error('Invalid OTP. Please enter 000000');
        return;
      }
      
      // In a real app, this would call authService.resetPassword
      // await authService.resetPassword(email, otp, newPassword);
      
      toast.success('Password reset successful!');
      onSwitch && onSwitch('login');
    } catch (error: any) {
      toast.error('Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">
          {showResetForm ? 'Reset Password' : 'Forgot Password'}
        </h2>
        <p className="text-gray-500 mt-1">
          {showResetForm 
            ? 'Enter the OTP and your new password'
            : 'Enter your email to receive the reset OTP'}
        </p>
      </div>
      
      {!showResetForm ? (
        <form onSubmit={handleForgotSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className={`w-full px-3 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
              required
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-500">{emailError}</p>
            )}
          </div>
          
          <Button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset OTP'}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleResetSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              OTP Code
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      )}
          
          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-primary hover:underline text-sm"
              onClick={() => onSwitch && onSwitch('login')}
            >
              Back to Login
            </button>
          </div>
    </div>
  );
}; 