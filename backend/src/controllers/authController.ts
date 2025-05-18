import { Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { config } from '../config';
import { createDefaultNotificationPreferences } from '../scripts/seedNotificationPreferences';
import { createDefaultIntegrations } from '../scripts/seedIntegrations';
import mongoose from 'mongoose';

// JWT token generation helper
const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: '30d',
  });
};

// Email configuration
const transporter = nodemailer.createTransport({
  // Configure your email service here
  service: 'gmail',
  auth: {
    user: config.emailUser,
    pass: config.emailPassword,
  },
});

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phone: null,
      timezone: 'Culcutta (+05:30)',
      isTwoFactorEnabled: false,
      isActivityLoggingEnabled: true,
      lastPasswordChange: new Date()
    });

    // Set up default settings for the new user
    try {
      // Create default notification preferences
      await createDefaultNotificationPreferences(new mongoose.Types.ObjectId(user._id));
      
      // Create default integrations
      await createDefaultIntegrations(new mongoose.Types.ObjectId(user._id));
    } catch (settingsError) {
      console.error('Error setting up default user settings:', settingsError);
      // Continue with user creation even if settings fail
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Update last login
    user.lastLoginAt = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Set static OTP token and expiry
    user.resetPasswordToken = '000000';
    user.resetPasswordExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    await user.save();

    res.json({ 
      message: 'Password reset OTP generated',
      otp: '000000' // In production, you would not send this in response
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating OTP', error });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp, newPassword } = req.body;

    // Find user with valid OTP
    const user = await User.findOne({
      email,
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json({ message: 'Invalid or expired OTP' });
      return;
    }

    // Update password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    // Generate new token
    const newToken = generateToken(user._id);

    res.json({
      message: 'Password reset successful',
      token: newToken,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error });
  }
}; 