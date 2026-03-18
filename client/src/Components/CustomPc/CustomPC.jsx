import React, { useState, useEffect } from 'react';
import { componentsList, calculateTotalPrice, preBuiltConfigs } from '../../utils/componentsList';
import ComponentCard from './ComponentCard';
import ProgressBar from './ProgressBar';
import ComponentSelector from './ComponentSelector';
import { toast } from 'react-toastify';
import { Container, Paper, Typography, Box, TextField, Button } from '@mui/material';
import API from '../../Api/api';
import {useAuth} from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const CustomPC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedComponents, setSelectedComponents] = useState({});
  const [currentComponentType, setCurrentComponentType] = useState("");
  const [currentComponent, setCurrentComponent] = useState("");
  const [customPCs, setCustomPCs] = useState([]);
  const [currentBuildName, setCurrentBuildName] = useState("My Custom PC");
  const [budget, setBudget] = useState(200000); 
  const [purpose, setPurpose] = useState("Gaming");

  useEffect(() => {
    setCustomPCs(preBuiltConfigs);
  }, []);

 const handleAddToCart = async () => {
    if (!user || !user.id) {
      toast.error("Please log in to add to cart.");
      return;
    }

    try {
      const totalPrice = calculateTotalPrice(selectedComponents);
      const buildName = currentBuildName || "My Custom PC";
      await API.post('/cart/add', {
        type: 'customBuild',
        buildName,
        components: selectedComponents,
        totalPrice,
        quantity: 1,
      });
      toast.success('Build added to cart!');
      setSelectedComponents({});
      setCurrentBuildName("My Custom PC");
    } catch (error) {
      console.error('Add to cart error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  const handleAddPrebuiltToCart = async (prebuilt) => {
    if (!user || !user.id) {
      toast.error("Please log in to add to cart.");
      return;
    }

    try {
      await API.post('/cart/add', {
        type: 'prebuilt',
        buildName: prebuilt.name,
        components: prebuilt.components,
        totalPrice: prebuilt.totalPrice,
        quantity: 1,
      });
      toast.success('Pre-built PC added to cart!');
    } catch (error) {
      console.error('Add prebuilt to cart error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to add pre-built PC');
    }
  };

  const handleEditPrebuilt = (prebuilt) => {
    setSelectedComponents(prebuilt.components);
    setCurrentBuildName(prebuilt.name + ' (Edited)');
    toast.info('Loaded pre-built PC for editing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isPCComplete = Object.keys(componentsList).every(
    (type) => selectedComponents[type]
  );

  const handleAddComponent = (componentName) => {
    if (currentComponentType && componentName) {
      const componentData = componentsList[currentComponentType][componentName];
      setSelectedComponents((prev) => ({
        ...prev,
        [currentComponentType]: {
          category: currentComponentType,
          component: componentName,
          price: componentData.price,
          image: componentData.image,
        },
      }));
      setCurrentComponentType("");
      setCurrentComponent("");
      toast.success(`Added ${componentName} to your build`);
    }
  };

  const handleRemoveComponent = (componentType) => {
    const updated = { ...selectedComponents };
    delete updated[componentType];
    setSelectedComponents(updated);
    toast.info(`Removed ${componentType}`);
  };

  const handleReset = () => {
    setSelectedComponents({});
    setCurrentBuildName("My Custom PC");
    toast.info("Build reset");
  };
  const handleAIReviewNavigate = () => {
    if (!isPCComplete) {
      toast.warning("Please complete your build before getting AI Review.");
      return;
    }

    navigate('/review-my-build', {
      state: {
        selectedComponents,
        buildName: currentBuildName,
        budget,
        purpose,
      },
    });
  };


  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
        <Box sx={{ mb: 2 }}>
          <TextField
            value={currentBuildName}
            onChange={(e) => setCurrentBuildName(e.target.value)}
            fullWidth
            label="Build Name"
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Your Budget (INR)"
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            fullWidth
          />

          <TextField
            label="PC Purpose"
            select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            SelectProps={{ native: true }}
            fullWidth
          >
            <option value="Gaming">Gaming</option>
            <option value="AI/ML">AI / Machine Learning</option>
            <option value="Animation">Animation & VFX</option>
            <option value="Office Work">Office Work</option>
          </TextField>

        </Box>
        <ProgressBar components={selectedComponents} />

        <ComponentSelector
          currentComponentType={currentComponentType}
          setCurrentComponentType={setCurrentComponentType}
          currentComponent={currentComponent}
          setCurrentComponent={setCurrentComponent}
          handleAddComponent={handleAddComponent}
          selectedComponents={selectedComponents}
        />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
          {Object.entries(componentsList).map(([type]) => (
            <ComponentCard
              key={type}
              type={type}
              component={selectedComponents[type]}
              onRemove={() => handleRemoveComponent(type)}
            />
          ))}
        </Box>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={handleAddToCart}
            disabled={!isPCComplete}
          >
            Add to Cart
          </Button>
          <Button
            variant="outlined"
            color="info"
            onClick={handleAIReviewNavigate}
            disabled={!isPCComplete}
          >

            Get AI Review
          </Button>

          <Button variant="outlined" color="error" onClick={handleReset}>
            Reset
          </Button>
        </Box>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" fontWeight={600} mb={2}>Pre-Built PCs</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {customPCs.map((prebuilt) => (
              <Paper key={prebuilt.name} elevation={3} sx={{ p: 2, minWidth: 300, flex: 1 }}>
                <Typography variant="h6" fontWeight={500}>{prebuilt.name}</Typography>
                <Typography variant="subtitle1" color="primary" fontWeight={700}>
                  ₹{prebuilt.totalPrice?.toLocaleString()}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddPrebuiltToCart(prebuilt)}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleEditPrebuilt(prebuilt)}
                  >
                    Edit
                  </Button>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CustomPC;
