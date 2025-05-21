import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import computerAnimation from './computer-animation.json';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <Box
        sx={{
          width: 200,
          height: 200,
          mb: 2,
        }}
      >
        <Lottie
          animationData={computerAnimation}
          loop={true}
          style={{ width: '100%', height: '100%' }}
        />
      </Box>
      <CircularProgress 
        size={40} 
        thickness={4}
        sx={{
          color: 'primary.main',
          mb: 2,
        }}
      />
      <Typography 
        variant="h6" 
        color="text.secondary"
        sx={{
          fontWeight: 500,
        }}
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingScreen; 