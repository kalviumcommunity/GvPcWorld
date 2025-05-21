const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { authenticate } = require('../middleware/authMiddleware');
const User = require('../models/user.js');

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    try {
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 3600000000, 
      });
      
      // Redirect to our home page
      res.redirect('http://localhost:5173/');
    } catch (error) {
      console.error('Error in Google callback:', error);
      res.redirect('http://localhost:5173/login?error=auth_failed');
    }
  }
);

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
router.get('/success', authenticate, async (req, res) => {
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
