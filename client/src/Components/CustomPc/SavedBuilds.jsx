import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Box, Typography, Grid, Paper, Button, Stack } from '@mui/material';

const SavedBuilds = ({ builds, onEdit, onDuplicate, onAddToCart }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
        Your Saved Builds
      </Typography>
      <Grid container spacing={3}>
        {builds.map(pc => (
          <Grid item xs={12} md={6} lg={4} key={pc.id}>
            <Paper sx={{ bgcolor: '#1e293b', p: 3, borderRadius: 2 }}>              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                  {pc.name}
                </Typography>
                {pc.isPreBuilt && (
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      bgcolor: 'secondary.main', 
                      px: 1, 
                      py: 0.5, 
                      borderRadius: 1,
                      color: 'white'
                    }}
                  >
                    Pre-Built
                  </Typography>
                )}
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {Object.keys(pc.components).length} components
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                Created {formatDistanceToNow(new Date(pc.createdAt), { addSuffix: true })}
              </Typography>
              <Typography variant="h6" color="white" fontWeight="bold" gutterBottom>
                ₹{pc.totalPrice.toLocaleString()}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Button
                  onClick={() => onEdit(pc)}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onDuplicate(pc)}
                  variant="contained"
                  color="secondary"
                  size="small"
                >
                  Duplicate
                </Button>
                <Button
                  onClick={() => onAddToCart(pc)}
                  variant="contained"
                  color="success"
                  size="small"
                >
                  Add to Cart
                </Button>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SavedBuilds;