import React, { memo } from 'react';
import { 
  Paper, 
  Typography, 
  IconButton, 
  Box, 
  ButtonGroup,
  Button,
  Skeleton,
  Fade,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useCart } from '../../context/CartContext';

const CartItem = memo(({ item, loading }) => {
  const { updateCartItem, removeFromCart } = useCart();

  // Determine if this is a custom build or a regular product
  const isCustomBuild = item.type === 'custom';
  const displayName = isCustomBuild ? item.name || 'Custom PC Build' : item.name;
  const displayPrice = isCustomBuild ? item.totalPrice : item.price;
  const displayQuantity = item.quantity || 1;
  const displayImage = isCustomBuild ? '/custom-pc-placeholder.png' : item.image;

  const handleQuantityChange = async (newQuantity) => {
    try {
      if (newQuantity > 0 && !isCustomBuild) {
        await updateCartItem(item.productId, newQuantity);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemove = async () => {
    try {
      await removeFromCart(item.productId || item.id);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (loading) {
    return (
      <Paper 
        elevation={2} 
        sx={{ 
          p: 2,
          mb: 2,
          borderRadius: 2,
          bgcolor: 'background.paper'
        }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Skeleton variant="rectangular" width={100} height={100} sx={{ borderRadius: 1 }} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="40%" height={20} />
            <Skeleton variant="text" width="20%" height={20} />
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <Fade in>
      <Paper 
        elevation={2} 
        sx={{ 
          p: 2,
          mb: 2,
          borderRadius: 2,
          bgcolor: 'background.paper',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: (theme) => theme.shadows[4]
          }
        }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box 
            component="img"
            src={displayImage}
            alt={displayName}
            sx={{ 
              width: 100,
              height: 100,
              objectFit: 'cover',
              borderRadius: 1,
              bgcolor: 'background.default'
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              {displayName}
            </Typography>
            {isCustomBuild && item.components && (
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Components:
                </Typography>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {Object.entries(item.components).map(([type, comp]) => (
                    <li key={type} style={{ fontSize: 13 }}>
                      <b>{type}:</b> {comp.name || comp}
                    </li>
                  ))}
                </ul>
              </Box>
            )}
            <Typography 
              variant="subtitle1" 
              color="primary.main" 
              fontWeight="bold" 
              gutterBottom
            >
              ₹{(displayPrice * displayQuantity).toLocaleString()}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mt: 1
            }}>
              {!isCustomBuild && (
                <ButtonGroup 
                  size="small" 
                  sx={{ 
                    '& .MuiButtonGroup-grouped:not(:last-of-type)': {
                      borderColor: 'divider'
                    }
                  }}
                >
                  <IconButton
                    onClick={() => handleQuantityChange(displayQuantity - 1)}
                    disabled={displayQuantity <= 1}
                    size="small"
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Button 
                    sx={{ 
                      minWidth: '40px',
                      px: 2,
                      cursor: 'default',
                      '&:hover': {
                        bgcolor: 'background.paper'
                      }
                    }}
                    disableRipple
                  >
                    {displayQuantity}
                  </Button>
                  <IconButton
                    onClick={() => handleQuantityChange(displayQuantity + 1)}
                    size="small"
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </ButtonGroup>
              )}
              {isCustomBuild && (
                <Typography variant="body2" color="text.secondary">
                  Qty: 1
                </Typography>
              )}
              <IconButton 
                onClick={handleRemove}
                color="error"
                size="small"
                sx={{
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
});

CartItem.displayName = 'CartItem';

export default CartItem;