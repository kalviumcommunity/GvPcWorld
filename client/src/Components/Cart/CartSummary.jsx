import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const CartSummary = ({ totalItems, totalAmount, onCheckout }) => {
  return (
    <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography color="text.secondary">Total Items:</Typography>
        <Typography color="text.primary">{totalItems}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography color="text.secondary">Total Amount:</Typography>
        <Typography variant="h6" color="primary" fontWeight="bold">
          ₹{totalAmount.toLocaleString()}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        onClick={onCheckout}
        startIcon={<ShoppingCartCheckoutIcon />}
        sx={{
          py: 1.5,
          fontWeight: 'bold'
        }}
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default CartSummary;
