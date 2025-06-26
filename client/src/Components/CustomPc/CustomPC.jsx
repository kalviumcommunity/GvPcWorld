import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { componentsList, calculateTotalPrice, generateRandomId, preBuiltConfigs } from './componentsList';
import ComponentCard from './ComponentCard';
import ProgressBar from './ProgressBar';
import ComponentSelector from './ComponentSelector';
import SavedBuilds from './SavedBuilds';
import { toast } from 'react-toastify';
import { Container, Paper, Typography, Box, TextField, Button } from '@mui/material';

const CustomPC = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [selectedComponents, setSelectedComponents] = useState({});
  const [currentComponentType, setCurrentComponentType] = useState("");
  const [currentComponent, setCurrentComponent] = useState("");
  const [customPCs, setCustomPCs] = useState([]);
  const [currentBuildName, setCurrentBuildName] = useState("My Custom PC");

  useEffect(() => {  
    if (user) {
      const savedBuilds = localStorage.getItem(`customPCs_${user.id}`);
      if (savedBuilds) {
        const userBuilds = JSON.parse(savedBuilds);
        const allBuilds = [...userBuilds, ...preBuiltConfigs];
        setCustomPCs(allBuilds);
      } else {
        setCustomPCs(preBuiltConfigs);
      }
    } else {
      setCustomPCs(preBuiltConfigs);
    }
  }, [user]);

  useEffect(() => {
    if (user && customPCs.length > 0) {
      localStorage.setItem(`customPCs_${user.id}`, JSON.stringify(customPCs));
    }
  }, [customPCs, user]);

  const isPCComplete = Object.keys(componentsList).every(
    (type) => selectedComponents[type]
  );

  const handleAddComponent = () => {
    if (currentComponentType && currentComponent) {
      const componentPrice = componentsList[currentComponentType][currentComponent].price;
      const componentImage = componentsList[currentComponentType][currentComponent].image;
      
      setSelectedComponents((prev) => ({
        ...prev,
        [currentComponentType]: {
          category: currentComponentType,
          component: currentComponent,
          price: componentPrice,
          image: componentImage
        },
      }));
      
      setCurrentComponentType("");
      setCurrentComponent("");
      toast.success(`Added ${currentComponent} to your build`);
    }
  };

  const handleRemoveComponent = (componentType) => {
    const updatedComponents = {...selectedComponents};
    delete updatedComponents[componentType];
    setSelectedComponents(updatedComponents);
    toast.info(`Removed ${componentType} from your build`);
  };

  const handleAddToCart = () => {
    if (!isPCComplete) {
      toast.warning("Please select all components before adding to cart.");
      return;
    }
    
    const newPC = {
      id: generateRandomId(),
      name: currentBuildName,
      components: {...selectedComponents},
      totalPrice: calculateTotalPrice(selectedComponents),
      createdAt: new Date().toISOString()
    };
    
    addToCart(newPC);
    setCustomPCs([...customPCs, newPC]);
    setSelectedComponents({});
    setCurrentBuildName("My Custom PC");
    toast.success("PC added to cart successfully!");
  };

  const handleEditPC = (pc) => {
    setSelectedComponents(pc.components);
    setCurrentBuildName(pc.name);
    setCustomPCs(customPCs.filter(item => item.id !== pc.id));
    toast.info(`Editing ${pc.name}`);
  };

  const handleDuplicatePC = (pc) => {
    const duplicatedPC = {
      ...pc,
      id: generateRandomId(),
      name: `${pc.name} (Copy)`,
      createdAt: new Date().toISOString()
    };
    
    setCustomPCs([...customPCs, duplicatedPC]);
    toast.success(`Duplicated ${pc.name}`);
  };

  const handleSaveBuild = () => {
    if (Object.keys(selectedComponents).length === 0) {
      toast.warning("Please select at least one component before saving.");
      return;
    }

    const newPC = {
      id: generateRandomId(),
      name: currentBuildName,
      components: {...selectedComponents},
      totalPrice: calculateTotalPrice(selectedComponents),
      createdAt: new Date().toISOString()
    };
    
    setCustomPCs([...customPCs, newPC]);
    toast.success(`${currentBuildName} saved successfully!`);
  };

  const handleReset = () => {
    setSelectedComponents({});
    setCurrentBuildName("My Custom PC");
    toast.info("Build reset successfully!");
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 4 }, minHeight: '100vh' }}>
      <Paper elevation={6} sx={{
        bgcolor: 'background.paper',
        p: { xs: 1.5, sm: 3, md: 5 },
        borderRadius: 4,
        boxShadow: '0 4px 32px 0 rgba(0,0,0,0.10)',
        overflow: 'hidden',
        minHeight: '80vh',
        transition: 'box-shadow 0.3s',
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          mb: 3,
          gap: { xs: 2, sm: 0 },
        }}>
          <TextField
            value={currentBuildName}
            onChange={(e) => setCurrentBuildName(e.target.value)}
            variant="outlined"
            size="small"
            placeholder="Build Name"
            sx={{
              minWidth: { xs: '100%', sm: 220 },
              bgcolor: 'background.default',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                color: 'text.primary',
                borderRadius: 2,
                background: 'rgba(255,255,255,0.04)',
                boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)',
                '& fieldset': {
                  borderColor: 'divider',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <Box sx={{
            display: 'flex',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            width: { xs: '100%', sm: 'auto' },
          }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              disabled={!isPCComplete}
              fullWidth
              sx={{
                borderRadius: 2,
                fontWeight: 600,
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
                letterSpacing: 1,
                py: 1.2,
                fontSize: { xs: 16, sm: 16 },
                transition: 'background 0.2s',
              }}
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleReset}
              fullWidth
              sx={{
                borderRadius: 2,
                fontWeight: 600,
                py: 1.2,
                fontSize: { xs: 16, sm: 16 },
                borderWidth: 2,
                transition: 'border 0.2s',
              }}
            >
              Reset Build
            </Button>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <ProgressBar components={selectedComponents} />
        </Box>
        <Box sx={{ mb: 3 }}>
          <ComponentSelector
            componentType={currentComponentType}
            component={currentComponent}
            onComponentTypeChange={setCurrentComponentType}
            onComponentChange={setCurrentComponent}
            onAdd={handleAddComponent}
            selectedComponents={selectedComponents}
          />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: { xs: 2, sm: 3 },
            mt: 2,
            maxHeight: { xs: 400, sm: 500 },
            overflowY: 'auto',
            pr: 1,
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: 8,
              background: 'rgba(0,0,0,0.04)',
              borderRadius: 8,
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0,0,0,0.10)',
              borderRadius: 8,
            },
          }}
        >
          {Object.entries(componentsList).map(([type]) => (
            <ComponentCard
              key={type}
              type={type}
              component={selectedComponents[type]}
              onRemove={() => handleRemoveComponent(type)}
            />
          ))}
        </Box>
        <Box sx={{ mt: 4 }}>
          <SavedBuilds
            builds={customPCs}
            onEdit={handleEditPC}
            onDuplicate={handleDuplicatePC}
            onAddToCart={handleAddToCart}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default CustomPC;