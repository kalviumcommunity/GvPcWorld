import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Box, Typography, Grid, Paper, Button, Stack, Chip, Fade, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ComputerIcon from '@mui/icons-material/Computer';

const SavedBuilds = ({ builds, onEdit, onDuplicate, onAddToCart }) => {
  return (
    <Box sx={{ mt: 6 }}>
      <Typography 
        variant="h5" 
        color="primary" 
        fontWeight="bold" 
        gutterBottom
        sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <ComputerIcon sx={{ fontSize: 28 }} />
        Your Saved Builds
      </Typography>
      
      <Box sx={{
        maxHeight: { xs: '400px', sm: '600px' },
        overflowY: 'auto',
        pr: 1,
        mx: -1,
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          width: 8,
          background: 'rgba(0,0,0,0.04)',
          borderRadius: 8,
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(0,0,0,0.10)',
          borderRadius: 8,
        },
      }}>
        <Grid container spacing={3}>
          {builds.slice(0, 3).map((pc, index) => (
            <Grid item xs={12} md={6} lg={4} key={pc.id || (pc.name + '-' + index)}>
              <Fade in timeout={400 + index * 100}>
                <Paper sx={{
                  bgcolor: 'background.default',
                  p: 3,
                  borderRadius: 3,
                  height: '100%',
                  boxShadow: '0 2px 12px 0 rgba(0,0,0,0.08)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                  },
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" color="text.primary" fontWeight="bold" gutterBottom>
                        {pc.name}
                      </Typography>
                      {pc.isPreBuilt && (
                        <Chip
                          label="Pre-Built"
                          color="secondary"
                          size="small"
                          sx={{ mb: 1 }}
                        />
                      )}
                    </Box>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                      ₹{pc.totalPrice.toLocaleString()}
                    </Typography>
                  </Box>

                  <Stack spacing={1} sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      {Object.keys(pc.components).length} components selected
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Created {formatDistanceToNow(new Date(pc.createdAt), { addSuffix: true })}
                    </Typography>
                  </Stack>

                  <Divider sx={{ mb: 2 }} />

                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Button
                      onClick={() => onEdit(pc)}
                      variant="outlined"
                      color="primary"
                      size="small"
                      startIcon={<EditIcon />}
                      sx={{ 
                        flex: 1,
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: 'none'
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => onDuplicate(pc)}
                      variant="outlined"
                      color="secondary"
                      size="small"
                      startIcon={<ContentCopyIcon />}
                      sx={{ 
                        flex: 1,
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: 'none'
                      }}
                    >
                      Copy
                    </Button>
                    <Button
                      onClick={() => onAddToCart({ ...pc, type: 'custom' })}
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<AddShoppingCartIcon />}
                      sx={{ 
                        flex: 1,
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: 'none'
                      }}
                    >
                      Cart
                    </Button>
                  </Stack>
                </Paper>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SavedBuilds;