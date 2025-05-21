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
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 4 } }}>
      <Paper elevation={3} sx={{ 
        bgcolor: '#1e293b', 
        p: { xs: 2, sm: 3, md: 4 }, 
        borderRadius: 2,
        overflow: 'hidden'
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          mb: 3,
          gap: { xs: 2, sm: 0 }
        }}>
          <TextField
            value={currentBuildName}
            onChange={(e) => setCurrentBuildName(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ 
              minWidth: { xs: '100%', sm: '200px' },
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              }
            }}
          />
          <Box sx={{ 
            display: 'flex', 
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' } 
          }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              disabled={!isPCComplete}
              fullWidth={false}
              sx={{ 
                minWidth: { xs: '100%', sm: 'auto' }
              }}
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleReset}
              fullWidth={false}
              sx={{ 
                minWidth: { xs: '100%', sm: 'auto' }
              }}
            >
              Reset Build
            </Button>
          </Box>
        </Box>

        <ProgressBar components={selectedComponents} />
        <ComponentSelector
          componentType={currentComponentType}
          component={currentComponent}
          onComponentTypeChange={setCurrentComponentType}
          onComponentChange={setCurrentComponent}
          onAdd={handleAddComponent}
          selectedComponents={selectedComponents}
        />

        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { 
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)' 
          },
          gap: { xs: 2, sm: 3 },
          mt: 4 
        }}>
          {Object.entries(componentsList).map(([type]) => (
            <ComponentCard
              key={type}
              type={type}
              component={selectedComponents[type]}
              onRemove={() => handleRemoveComponent(type)}
            />
          ))}
        </Box>

        <SavedBuilds
          builds={customPCs}
          onEdit={handleEditPC}
          onDuplicate={handleDuplicatePC}
          onAddToCart={handleAddToCart}
        />
      </Paper>
    </Container>
  );
};

export default CustomPC;