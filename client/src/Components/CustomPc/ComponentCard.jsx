import React from 'react';
import { Paper, Box, Typography, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ComponentCard = ({ type, component, onRemove }) => {
  return (
    <Paper 
      sx={{ 
        bgcolor: '#1e293b',
        p: 2,
        mb: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 2,
        border: component ? 'none' : '1px dashed rgba(255, 255, 255, 0.12)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {component ? (
          <>
            <Box
              component="img"
              src={component.image}
              alt={component.component}
              sx={{
                width: 48,
                height: 48,
                borderRadius: 1,
                mr: 2
              }}
            />
            <Box>
              <Typography variant="subtitle1" color="white">
                {type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {component.component}
              </Typography>
            </Box>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AddCircleOutlineIcon sx={{ color: 'text.disabled', mr: 2, fontSize: 48 }} />
            <Typography variant="subtitle1" color="text.secondary">
              {type}
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ textAlign: 'right' }}>
        {component && (
          <>
            <Typography variant="subtitle1" color="primary" fontWeight="bold">
              ₹{component.price.toLocaleString()}
            </Typography>
            <IconButton 
              onClick={() => onRemove(type)}
              size="small"
              sx={{ color: 'error.main' }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default ComponentCard;