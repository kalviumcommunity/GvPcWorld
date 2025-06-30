import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { componentsList } from '../../utils/componentsList';

const ProgressBar = ({ components }) => {
  const totalComponents = Object.keys(componentsList).length;
  const selectedCount = Object.keys(components).length;
  const progress = (selectedCount / totalComponents) * 100;

  return (
    <Box sx={{
      p: { xs: 2, sm: 3 },
      borderRadius: 3,
      bgcolor: 'background.default',
      boxShadow: '0 2px 12px 0 rgba(0,0,0,0.07)',
      mb: 3,
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 1.5 
      }}>
        <Typography variant="h6" fontWeight={600} color="text.primary">
          Build Progress
        </Typography>
        <Typography 
          variant="body1" 
          color={progress === 100 ? 'success.main' : 'text.secondary'}
          fontWeight={500}
        >
          {selectedCount} / {totalComponents} Components
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 10,
          borderRadius: 5,
          bgcolor: 'background.paper',
          '& .MuiLinearProgress-bar': {
            borderRadius: 5,
            background: progress === 100 
              ? 'linear-gradient(90deg, #4CAF50 0%, #45a849 100%)'
              : 'linear-gradient(90deg, #2196F3 0%, #1e88e5 100%)',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        }}
      />
      <Typography 
        variant="caption" 
        color="text.secondary"
        sx={{ 
          display: 'block',
          mt: 1,
          textAlign: 'center',
          fontStyle: 'italic'
        }}
      >
        {progress === 100 
          ? "All components selected! Ready to add to cart." 
          : "Select all components to complete your build"}
      </Typography>
    </Box>
  );
};

export default ProgressBar;
