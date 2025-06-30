// src/pages/PreBuiltPCs.jsx
import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button,
  Box 
} from '@mui/material';
import { preBuiltConfigs } from '../utils/componentsList';
import API from '../Api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PreBuiltPCs = () => {
  const [prebuilts, setPrebuilts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setPrebuilts(preBuiltConfigs);
  }, []);

  const handleAddToCart = async (config) => {
    try {
      await API.post('/cart/add', {
        type: 'prebuilt',
        buildName: config.name,
        components: config.components,
        totalPrice: config.totalPrice,
        quantity: 1,
      });
      toast.success(`Added ${config.name} to cart`);
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const handleCustomize = (config) => {
    navigate('/custom-pc', { 
      state: { 
        preBuiltConfig: {
          ...config,
          name: `Custom ${config.name}`
        } 
      }
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" color="primary" gutterBottom mb={4}>
        Pre-Built Gaming PCs
      </Typography>
      <Grid container spacing={4}>
        {prebuilts.map((config) => (
          <Grid item xs={12} md={4} key={config.name}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#1e293b' }}>
              <CardMedia
                component="img"
                height="200"
                image={config.components.BoxCase?.image || config.image || '/images/boxcase.png'}
                alt={config.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2" color="primary">
                  {config.name}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {config.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" color="white" fontWeight="bold">
                    ₹{config.totalPrice?.toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ p: 2 }}>
                <Button 
                  size="small" 
                  variant="contained" 
                  color="primary"
                  onClick={() => handleAddToCart(config)}
                  fullWidth
                  sx={{ mr: 1 }}
                >
                  Add to Cart
                </Button>
                <Button 
                  size="small" 
                  variant="outlined" 
                  color="secondary"
                  onClick={() => handleCustomize(config)}
                  fullWidth
                >
                  Customize
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PreBuiltPCs;