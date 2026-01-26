import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { Google } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    setLoading(true);
    setError('');
    
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <Box
      sx={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '80vh', 
        background: '#f4f4f4',
        p: 2
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Sign in to continue to GvPcWorld
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Google />}
            onClick={handleGoogleSignIn}
            fullWidth
            size="large"
            disabled={loading}
            sx={{
              mb: 2,
              backgroundColor: '#4285f4',
              '&:hover': {
                backgroundColor: '#357abd'
              }
            }}
          >
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </Button>

          <Typography variant="body2" color="text.secondary">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;