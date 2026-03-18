import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  CircularProgress,
  Rating,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, StarBorder } from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import TopNav from '../Components/TopNav/TopNav';
import Footer from '../Components/Footer/Footer';
import API from '../Api/api';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/products/${id}`);
      const data = response.data;
      setProduct(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch product details. Please try again later.');
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      await API.post('/cart/add', {
        productId: id,
        quantity,
        type: 'product',
        productName: product.name,
        productPrice: product.price,
        productImage: product.images?.[0] || product.image,
      });
      toast.success('Product added to cart!');
      setQuantity(1);
    } catch (err) {
      toast.error('Failed to add to cart');
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <>
        <TopNav />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
          }}
        >
          <CircularProgress />
        </Box>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <TopNav />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8, minHeight: '60vh' }}>
          <Typography variant="h5" color="error" align="center">
            {error || 'Product not found'}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant="contained" onClick={() => navigate('/products')}>
              Back to Products
            </Button>
          </Box>
        </Container>
        <Footer />
      </>
    );
  }

  const images = product.images || (product.image ? [product.image] : []);

  return (
    <>
      <TopNav />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8, minHeight: '60vh' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height={400}
                image={images[selectedImage] || product.image}
                alt={product.name}
                sx={{ objectFit: 'contain', backgroundColor: '#f5f5f5' }}
              />
              <CardContent>
                {images.length > 1 && (
                  <Grid container spacing={1}>
                    {images.map((image, index) => (
                      <Grid item xs={3} key={index}>
                        <Box
                          component="img"
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          sx={{
                            width: '100%',
                            height: 'auto',
                            cursor: 'pointer',
                            border: selectedImage === index ? `2px solid ${theme.palette.primary.main}` : 'none',
                            borderRadius: 1,
                          }}
                          onClick={() => setSelectedImage(index)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              {product.rating && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating
                    value={product.rating}
                    precision={0.5}
                    readOnly
                    icon={<Star fontSize="inherit" />}
                    emptyIcon={<StarBorder fontSize="inherit" />}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({product.reviews || 0} reviews)
                  </Typography>
                </Box>
              )}
              <Typography variant="h5" color="primary" gutterBottom>
                ₹{product.price?.toLocaleString()}
              </Typography>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              {product.features && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Features:
                  </Typography>
                  <Grid container spacing={1}>
                    {product.features.map((feature, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Chip
                          label={feature}
                          variant="outlined"
                          sx={{ m: 0.5 }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
              <Divider sx={{ my: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Quantity:
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    width: 'fit-content',
                  }}
                >
                  <Button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <Typography sx={{ px: 2 }}>{quantity}</Typography>
                  <Button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= (product.stock || 10)}
                  >
                    +
                  </Button>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {product.stock || 10} in stock
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                fullWidth
                sx={{ mb: 2 }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </Button>
            </Box>
          </Grid>
        </Grid>

        {product.specifications && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" gutterBottom>
              Product Details
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              {Object.entries(product.specifications).map(([key, value]) => (
                <Grid item xs={12} sm={6} md={4} key={key}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {key}
                    </Typography>
                    <Typography variant="body1">{value}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetail;