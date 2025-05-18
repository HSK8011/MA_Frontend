import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import auth from '../middleware/authMiddleware';
import { User } from '../models/User';
import { NotificationPreference } from '../models/NotificationPreference';
import { Integration } from '../models/Integration';

const router = express.Router();

// Get user settings
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const userId = req.userId;

    // Get user data
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get notification preferences
    const notificationPrefs = await NotificationPreference.find({ userId });

    // Get integrations
    const integrations = await Integration.find({ userId });

    res.json({
      user,
      notificationPreferences: notificationPrefs,
      integrations
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update profile settings
router.put('/profile', auth, [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('phone').optional({ nullable: true }),
  body('timezone').notEmpty().withMessage('Timezone is required')
], async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const userId = req.userId;
    const { name, phone, timezone } = req.body;
    
    console.log('Updating profile for user:', userId);
    console.log('Update data:', { name, phone, timezone });

    const user = await User.findByIdAndUpdate(
      userId,
      { 
        name, 
        phone, 
        timezone,
        updatedAt: new Date() // Explicitly set updatedAt
      },
      { 
        new: true, 
        select: '-password',
        runValidators: true // Enable validation
      }
    );

    console.log('Updated user:', user);

    if (!user) {
      console.log('User not found with ID:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the update by fetching the user again
    const verifiedUser = await User.findById(userId).select('-password');
    console.log('Verified user after update:', verifiedUser);

    res.json({ user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update notification preferences
router.put('/notifications', auth, [
  body('preferences').isArray().withMessage('Preferences must be an array'),
  body('preferences.*.type').notEmpty().withMessage('Notification type is required'),
  body('preferences.*.enabled').isBoolean().withMessage('Enabled status must be a boolean'),
  body('preferences.*.frequency').isIn(['daily', 'weekly', 'monthly', 'never']).withMessage('Invalid frequency')
], async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const userId = req.userId;
    const { preferences } = req.body;

    // Update each preference
    const updatedPrefs = await Promise.all(
      preferences.map(async (pref: any) => {
        return NotificationPreference.findOneAndUpdate(
          { userId, type: pref.type },
          { enabled: pref.enabled, frequency: pref.frequency },
          { new: true, upsert: true }
        );
      })
    );

    res.json({ notificationPreferences: updatedPrefs });
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update security settings
router.put('/security', auth, [
  body('isTwoFactorEnabled').isBoolean().withMessage('Two factor enabled status must be a boolean'),
  body('isActivityLoggingEnabled').isBoolean().withMessage('Activity logging enabled status must be a boolean')
], async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const userId = req.userId;
    const { isTwoFactorEnabled, isActivityLoggingEnabled } = req.body;
    
    console.log('Updating security settings for user:', userId);
    console.log('Update data:', { isTwoFactorEnabled, isActivityLoggingEnabled });

    const user = await User.findByIdAndUpdate(
      userId,
      { 
        isTwoFactorEnabled, 
        isActivityLoggingEnabled,
        updatedAt: new Date()
      },
      { 
        new: true, 
        select: '-password',
        runValidators: true
      }
    );

    console.log('Updated user:', user);

    if (!user) {
      console.log('User not found with ID:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the update by fetching the user again
    const verifiedUser = await User.findById(userId).select('-password');
    console.log('Verified user after update:', verifiedUser);

    res.json({ user });
  } catch (error) {
    console.error('Error updating security settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 