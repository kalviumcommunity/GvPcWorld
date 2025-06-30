import React, { useEffect, useState } from 'react';
import API from '../../Api/api';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Button,
  Alert,
  Fade,
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
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clearCartDialog, setClearCartDialog] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user || !user._id) {
      setCart({ items: [], totalAmount: 0 });
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await API.get('/cart/', { params: { userId: user._id } });
      setCart(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cart. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const handleCheckout = () => {
    if (!cart || cart.items.length === 0) {
      toast.warning("Your cart is empty");
      return;
    }
    navigate('/checkout');
  };

  const handleClearCart = async () => {
    try {
      await API.delete('/cart/clear', { data: { userId: user._id } });
      setCart({ items: [], totalAmount: 0 });
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

  const items = cart?.items || [];
  const totalAmount = cart?.totalAmount || 0;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Paper 
        elevation={3} 
        sx={{ 
          bgcolor: 'background.paper', 
          p: { xs: 2, sm: 3, md: 4 }, 
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
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
          {items.length > 0 && (
            <Button 
              onClick={() => setClearCartDialog(true)}
              color="error"
              variant="outlined"
              startIcon={<DeleteSweepIcon />}
              size="small"
              sx={{ borderRadius: 2 }}
            >
              Clear Cart
            </Button>
          )}
        </Box>

        {loading ? (
          <Typography variant="body1" sx={{ py: 4 }}>Loading your cart...</Typography>
        ) : items.length > 0 ? (
          <Fade in>
            <Box>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Items in Cart: {items.length}
              </Typography>

              <Box sx={{ mb: 3 }}>
                {items.map((item, index) => (
                  <Paper key={index} elevation={2} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {item.buildName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Type: {item.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ mt: 1 }}>
                      ₹{item.totalPrice.toLocaleString()}
                    </Typography>
                  </Paper>
                ))}
              </Box>

              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                Total: ₹{totalAmount.toLocaleString()}
              </Typography>

              <Button 
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleCheckout}
                sx={{ borderRadius: 2 }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Fade>
        ) : (
          <Fade in>
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <ShoppingCartIcon sx={{ fontSize: 60, color: 'primary.light', mb: 2 }} />
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Your cart is empty
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Start building your custom PC or browse our components.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexDirection: isMobile ? 'column' : 'row' }}>
                <Button 
                  variant="contained"
                  onClick={() => navigate('/custom-pc')}
                  startIcon={<BuildIcon />}
                >
                  Build Your PC
                </Button>
                <Button 
                  variant="outlined"
                  onClick={() => navigate('/products')}
                >
                  Browse Components
                </Button>
              </Box>
            </Box>
          </Fade>
        )}
      </Paper>

      <Dialog
        open={clearCartDialog}
        onClose={() => setClearCartDialog(false)}
        PaperProps={{ sx: { borderRadius: 2, width: '100%', maxWidth: 400 } }}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight={600}>Clear Cart</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary">
            Are you sure you want to remove all items from your cart? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1.5 }}>
          <Button onClick={() => setClearCartDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleClearCart} color="error" variant="contained" sx={{ borderRadius: 1 }}>
            Clear Cart
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;
