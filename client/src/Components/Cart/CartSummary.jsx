import React, { memo } from 'react';
import { 
  Paper,
  Box, 
  Typography, 
  Button, 
  Divider,
  Skeleton,
  Fade
} from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const CartSummary = memo(({ totalItems, totalAmount, onCheckout, loading }) => {
  const shippingCost = totalAmount > 10000 ? 0 : 499;
  const tax = totalAmount * 0.18; // 18% tax
  const finalAmount = totalAmount + shippingCost + tax;

  if (loading) {
    return (
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="text" width="40%" height={24} />
          <Skeleton variant="text" width="70%" height={24} />
        </Box>
        <Skeleton variant="rectangular" height={48} sx={{ borderRadius: 1 }} />
      </Paper>
    );
  }

  return (
    <Fade in>
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3,
          borderRadius: 2,
          bgcolor: 'background.paper'
        }}
      >
        <Typography variant="h6" gutterBottom fontWeight="600">
          Order Summary
        </Typography>
        
        <Box sx={{ mt: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mb: 2 
          }}>
            <Typography color="text.secondary">
              Subtotal ({totalItems} items)
            </Typography>
            <Typography>
              ₹{totalAmount.toLocaleString()}
            </Typography>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            mb: 2,
            alignItems: 'center'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocalShippingIcon color="action" sx={{ fontSize: 20 }} />
              <Typography color="text.secondary">
                Shipping
              </Typography>
            </Box>
            <Typography>
              {shippingCost === 0 ? (
                <span style={{ color: '#4caf50' }}>FREE</span>
              ) : (
                `₹${shippingCost.toLocaleString()}`
              )}
            </Typography>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            mb: 2 
          }}>
            <Typography color="text.secondary">
              Tax (18%)
            </Typography>
            <Typography>
              ₹{tax.toLocaleString()}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            mb: 3,
            alignItems: 'center'
          }}>
            <Typography variant="h6">
              Total
            </Typography>
            <Typography 
              variant="h6" 
              color="primary.main" 
              fontWeight="bold"
            >
              ₹{finalAmount.toLocaleString()}
            </Typography>
          </Box>

          {totalAmount > 10000 && (
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                bgcolor: 'success.light',
                color: 'success.dark',
                p: 1,
                borderRadius: 1,
                mb: 2
              }}
            >
              <AssignmentTurnedInIcon sx={{ fontSize: 20 }} />
              <Typography variant="body2">
                Free shipping on orders above ₹10,000
              </Typography>
            </Box>
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={onCheckout}
            startIcon={<ShoppingCartCheckoutIcon />}
            sx={{
              py: 1.5,
              fontWeight: 'bold',
              borderRadius: 2,
              background: 'linear-gradient(45deg, #2196f3, #1976d2)',
              boxShadow: '0 2px 10px rgba(33, 150, 243, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976d2, #1565c0)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 15px rgba(33, 150, 243, 0.4)',
              }
            }}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Paper>
    </Fade>
  );
});

CartSummary.displayName = 'CartSummary';

export default CartSummary;
