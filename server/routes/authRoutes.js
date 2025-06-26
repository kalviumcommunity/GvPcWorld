const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { authenticateToken } = require('../middleware/authMiddleware');
const User = require('../models/user.js');

// Google OAuth routes with debug logging
router.get('/google', (req, res, next) => {
  console.log('Initiating Google OAuth flow');
  passport.authenticate('google', { 
    scope: ['profile', 'email']
  })(req, res, next);
});

router.get('/google/callback', (req, res, next) => {
  console.log('Processing Google OAuth callback');
  passport.authenticate('google', { 
    session: false,
    failureRedirect: '/login?error=auth_failed'
  }, (err, user) => {
    if (err) {
      console.error('Error in Google callback:', err);
      return res.redirect('/login?error=auth_failed');
    }
    if (!user) {
      console.log('No user found in Google callback');
      return res.redirect('/login?error=no_user');
    }
    try {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 3600000 // 1 hour in milliseconds
      });
      
      res.redirect(process.env.CLIENT_URL || 'http://localhost:5173');
    } catch (error) {
      console.error('Error in Google callback:', error);
      res.redirect('/login?error=auth_failed');
    }
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  try {
    // Clear the JWT cookie
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error during logout' });
  }
});

// Check authentication status
router.get('/success', authenticateToken, async (req, res) => {
  console.log('Handling /success route, user:', req.user);
  try {
    const user = await User.findById(req.user.id);
    
    if (user) {
      res.json({ 
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Server error in /success:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
