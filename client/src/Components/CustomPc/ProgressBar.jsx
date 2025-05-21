import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const ProgressBar = ({ selected, total }) => {
  const percentage = (selected / total) * 100;
  
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Progress
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {selected}/{total} Components
        </Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={percentage}
        sx={{
          height: 8,
          borderRadius: 4,
          bgcolor: 'grey.800',
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
            bgcolor: 'primary.main',
          }
        }}
      />
    </Box>
  );
};

export default ProgressBar;
