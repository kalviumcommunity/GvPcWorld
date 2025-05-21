// src/pages/PreBuiltPCs.jsx
import React from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions, 
  Button,
  Box 
} from '@mui/material';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { generateRandomId } from '../Components/CustomPc/componentsList';

const preBuiltConfigs = [
  {
    id: 'gaming-beast',
    name: 'Gaming Beast',
    image: '/images/prebuilt/gaming-pc.jpg',
    price: 150000,
    components: {
      Processor: {
        category: 'Processor',
        component: 'Intel i9',
        price: 50000,
        image: '/images/processors/intel.jpg'
      },
      GPU: {
        category: 'GPU',
        component: 'NVIDIA RTX 3080',
        price: 80000,
        image: '/images/gpus/nvidia.jpg'
      },
      RAM: {
        category: 'RAM',
        component: '32GB DDR4',
        price: 12000,
        image: '/images/ram/32gb.jpg'
      },
      // ...other components
    },
    description: 'High-end gaming PC built for maximum performance'
  },
  {
    id: 'work-station',
    name: 'Professional Workstation',
    image: '/images/prebuilt/workstation.jpg',
    price: 120000,
    components: {
      Processor: {
        category: 'Processor',
        component: 'AMD Ryzen 9',
        price: 45000,
        image: '/images/processors/amd.jpg'
      },
      GPU: {
        category: 'GPU',
        component: 'AMD Radeon RX 6800',
        price: 70000,
        image: '/images/gpus/amd.jpg'
      },
      RAM: {
        category: 'RAM',
        component: '32GB DDR4',
        price: 12000,
        image: '/images/ram/32gb.jpg'
      },
      // ...other components
    },
    description: 'Powerful workstation for professional content creation'
  },
  {
    id: 'budget-gaming',
    name: 'Budget Gaming',
    image: '/images/prebuilt/budget-pc.jpg',
    price: 85000,
    components: {
      Processor: {
        category: 'Processor',
        component: 'AMD Ryzen 9',
        price: 45000,
        image: '/images/processors/amd.jpg'
      },
      GPU: {
        category: 'GPU',
        component: 'AMD Radeon RX 6800',
        price: 70000,
        image: '/images/gpus/amd.jpg'
      },
      RAM: {
        category: 'RAM',
        component: '16GB DDR4',
        price: 7000,
        image: '/images/ram/16gb.jpg'
      },
      // ...other components
    },
    description: 'Great gaming performance at an affordable price'
  }
];

const PreBuiltPCs = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (config) => {
    const pc = {
      id: generateRandomId(),
      name: config.name,
      components: config.components,
      totalPrice: config.price,
      createdAt: new Date().toISOString()
    };
    addToCart(pc);
    toast.success(`Added ${config.name} to cart`);
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
        {preBuiltConfigs.map((config) => (
          <Grid item xs={12} md={4} key={config.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#1e293b' }}>
              <CardMedia
                component="img"
                height="200"
                image={config.image}
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
                    ₹{config.price.toLocaleString()}
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