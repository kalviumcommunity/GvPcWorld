import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Avatar, 
  Paper, 
  Grid, 
  Button, 
  Divider, 
  CircularProgress,
  Alert
} from '@mui/material';
import { Edit as EditIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/auth/success`, {
          withCredentials: true
        });
        
        if (response.data.user) {
          setUser(response.data.user);
        } else {
          setError('User not found');
          // Redirect to login if not authenticated
          setTimeout(() => navigate('/login'), 2000);
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load profile. Please try again.');
        // Redirect to login if not authenticated
        setTimeout(() => navigate('/login'), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      // Call logout endpoint
      await axios.post(`${API_URL}/auth/logout`, {}, {
        withCredentials: true
      });
      
      // Clear any local storage or state
      localStorage.removeItem('user');
      
      // Redirect to home page
      navigate('/');
    } catch (err) {
      console.error('Error logging out:', err);
      setError('Failed to log out. Please try again.');
    }
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '80vh' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Typography>Redirecting to login...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar 
              src={user?.profilePicture} 
              alt={user?.username || 'User'} 
              sx={{ 
                width: 150, 
                height: 150, 
                mx: 'auto', 
                mb: 2,
                border: '4px solid #f4f4f4'
              }} 
            />
            <Typography variant="h5" gutterBottom>
              {user?.username || 'User'}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {user?.email || 'No email provided'}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button 
                variant="outlined" 
                startIcon={<EditIcon />} 
                sx={{ mr: 1 }}
              >
                Edit Profile
              </Button>
              <Button 
                variant="outlined" 
                color="error" 
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Account Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Username
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {user?.username || 'Not set'}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {user?.email || 'Not set'}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Account Created
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Last Login
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Unknown'}
                </Typography>
              </Grid>
            </Grid>
            
            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
              Order History
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Typography variant="body1" color="text.secondary">
              No orders found. Start shopping to see your order history.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile;