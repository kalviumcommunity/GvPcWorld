import React from 'react';
import { Paper, Box, Typography, IconButton, Fade } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ComponentCard = ({ type, component, onRemove }) => {
  return (
    <Fade in timeout={400}>
      <Paper
        elevation={component ? 4 : 1}
        sx={{
          bgcolor: component ? 'background.default' : 'background.paper',
          p: 2,
          mb: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 3,
          minHeight: 90,
          boxShadow: component ? '0 2px 12px 0 rgba(0,0,0,0.10)' : 'none',
          border: component ? 'none' : '2px dashed #e0e0e0',
          transition: 'box-shadow 0.2s, border 0.2s',
          '&:hover': {
            boxShadow: '0 4px 24px 0 rgba(0,0,0,0.13)',
            borderColor: 'primary.light',
          },
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
                  borderRadius: 2,
                  mr: 2,
                  objectFit: 'cover',
                  boxShadow: '0 1px 6px 0 rgba(0,0,0,0.10)',
                  background: '#f5f5f5',
                }}
              />
              <Box>
                <Typography variant="subtitle1" color="text.primary" fontWeight={600}>
                  {type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {component.component}
                </Typography>
              </Box>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AddCircleOutlineIcon sx={{ color: 'primary.light', mr: 2, fontSize: 44 }} />
              <Typography variant="subtitle1" color="text.disabled" fontWeight={500}>
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
                sx={{ color: 'error.main', ml: 1 }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Paper>
    </Fade>
  );
};

export default ComponentCard;