import React from 'react';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Cart = () => {
  const { cartItems, removeFromCart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warning("Your cart is empty");
      return;
    }
    
    // Navigate to checkout page
    navigate('/checkout');
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Paper elevation={3} sx={{ 
        bgcolor: '#1e293b', 
        p: { xs: 2, sm: 3, md: 4 }, 
        borderRadius: 2 
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: { xs: 2, sm: 0 },
          mb: 3 
        }}>
          <Typography variant="h4" color="primary" fontWeight="bold">
            Your Cart
          </Typography>
          {cartItems.length > 0 && (
            <Button 
              onClick={() => {
                clearCart();
                toast.info("Cart cleared");
              }}
              color="error"
              variant="text"
              size="small"
              sx={{ alignSelf: { xs: 'flex-end', sm: 'center' } }}
            >
              Clear Cart
            </Button>
          )}
        </Box>
        {cartItems.length > 0 ? (
          <>
            <Box sx={{ mb: 4 }}>
              {cartItems.map(pc => (
                <CartItem key={pc.id} pc={pc} onRemove={removeFromCart} />
              ))}
            </Box>
            <CartSummary
              totalItems={cartItems.length}
              totalAmount={getTotalPrice()}
              onCheckout={handleCheckout}
            />
          </>
        ) : (
          <Box sx={{ 
            textAlign: 'center', 
            py: { xs: 4, sm: 6 }
          }}>
            <ShoppingCartIcon sx={{ 
              fontSize: { xs: 48, sm: 64 }, 
              color: 'text.secondary', 
              mb: 2 
            }} />
            <Typography 
              variant="h6" 
              color="text.secondary" 
              gutterBottom
              sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
            >
              Your cart is empty
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ mb: 4, px: { xs: 2, sm: 4 } }}
            >
              Start building your custom PC to add it to cart
            </Typography>
            <Button 
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/custom-pc')}
              sx={{
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.5 }
              }}
            >
              Build Your PC
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Cart;