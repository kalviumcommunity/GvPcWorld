import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Button,
  Alert,
  Skeleton,
  Fade,
  IconButton,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import BuildIcon from '@mui/icons-material/Build';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Cart = () => {
  const { 
    cartItems, 
    loading, 
    error, 
    getTotalPrice,
    clearCart 
  } = useCart();
  const [clearCartDialog, setClearCartDialog] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warning("Your cart is empty");
      return;
    }
    
    navigate('/checkout');
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      toast.success("Cart cleared successfully");
      setClearCartDialog(false);
    } catch (error) {
      toast.error("Failed to clear cart");
    }
  };

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert 
          severity="error"
          icon={<ErrorOutlineIcon />}
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Paper 
        elevation={3} 
        sx={{ 
          bgcolor: 'background.paper', 
          p: { xs: 2, sm: 3, md: 4 }, 
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: { xs: 2, sm: 0 },
          mb: 3 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShoppingCartIcon color="primary" sx={{ fontSize: 28 }} />
            <Typography 
              variant="h4" 
              sx={{ 
                background: 'linear-gradient(45deg, #2196f3, #1976d2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700
              }}
            >
              Your Cart
            </Typography>
          </Box>
          {cartItems.length > 0 && (
            <Button 
              onClick={() => setClearCartDialog(true)}
              color="error"
              variant="outlined"
              startIcon={<DeleteSweepIcon />}
              size="small"
              sx={{ 
                alignSelf: { xs: 'flex-end', sm: 'center' },
                borderRadius: 2
              }}
            >
              Clear Cart
            </Button>
          )}
        </Box>

        {/* Cart Content */}
        {loading ? (
          <Box sx={{ mb: 4 }}>
            {[...Array(3)].map((_, index) => (
              <CartItem key={index} loading={true} />
            ))}
          </Box>
        ) : cartItems.length > 0 ? (
          <Fade in>
            <Box>
              <Box sx={{ mb: 4 }}>
                {cartItems.map(item => (
                  <CartItem 
                    key={item.productId} 
                    item={item}
                    loading={loading}
                  />
                ))}
              </Box>
              <CartSummary
                totalItems={cartItems.length}
                totalAmount={getTotalPrice()}
                onCheckout={handleCheckout}
                loading={loading}
              />
            </Box>
          </Fade>
        ) : (
          <Fade in>
            <Box sx={{ 
              textAlign: 'center', 
              py: { xs: 6, sm: 8 },
              px: { xs: 2, sm: 4 }
            }}>
              <Box 
                sx={{ 
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: 'primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3
                }}
              >
                <ShoppingCartIcon sx={{ 
                  fontSize: 40, 
                  color: 'primary.main'
                }} />
              </Box>
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                  fontWeight: 600,
                  color: 'text.primary'
                }}
              >
                Your cart is empty
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ 
                  mb: 4,
                  maxWidth: 500,
                  mx: 'auto'
                }}
              >
                Explore our selection of high-quality PC components or start building your custom PC today!
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                justifyContent: 'center',
                flexDirection: isMobile ? 'column' : 'row'
              }}>
                <Button 
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate('/custom-pc')}
                  startIcon={<BuildIcon />}
                  sx={{
                    px: 3,
                    py: 1.5,
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
                  Build Your PC
                </Button>
                <Button 
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/products/components')}
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 2
                  }}
                >
                  Browse Components
                </Button>
              </Box>
            </Box>
          </Fade>
        )}
      </Paper>

      {/* Clear Cart Dialog */}
      <Dialog
        open={clearCartDialog}
        onClose={() => setClearCartDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            width: '100%',
            maxWidth: 400
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" fontWeight={600}>
            Clear Cart
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary">
            Are you sure you want to remove all items from your cart? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1.5 }}>
          <Button 
            onClick={() => setClearCartDialog(false)}
            color="inherit"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleClearCart}
            color="error"
            variant="contained"
            sx={{ borderRadius: 1 }}
          >
            Clear Cart
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;