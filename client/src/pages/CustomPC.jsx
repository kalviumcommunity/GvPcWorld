import { useState } from "react";
import { Box, Button, Container, Typography, Grid, MenuItem, Select, Stepper, Step, StepLabel } from "@mui/material";

const componentsList = {
  BoxCase: {
    "Standard Box": { price: 2000 },
    "RGB Box": { price: 5000 },
    "Full Tower Box": { price: 8000 },
  },
  Motherboard: {
    "ASUS ROG Strix": { price: 30000 },
    "MSI B450": { price: 15000 },
    "Gigabyte Aorus": { price: 25000 },
  },
  Processor: {
    "Intel i9": { price: 50000 },
    "AMD Ryzen 9": { price: 45000 },
  },
  RAM: {
    "16GB DDR4": { price: 7000 },
    "32GB DDR4": { price: 12000 },
  },
  Monitor: {
    "24-inch Monitor": { price: 20000 },
    "27-inch Monitor": { price: 25000 },
  },
  GPU: {
    "NVIDIA RTX 3080": { price: 80000 },
    "AMD Radeon RX 6800": { price: 70000 },
  },
  Storage: {
    "1TB SSD": { price: 10000 },
    "2TB HDD": { price: 8000 },
  },
  PowerSupply: {
    "750W PSU": { price: 10000 },
    "850W PSU": { price: 12000 },
  },
  Cooling: {
    "Air Cooler": { price: 5000 },
    "Liquid Cooler": { price: 10000 },
  },
  Mouse: {
    "Logitech MX Master": { price: 10000 },
    "Razer DeathAdder": { price: 8000 },
  },
  Keyboard: {
    "Mechanical Keyboard": { price: 15000 },
    "Membrane Keyboard": { price: 6000 },
  },
};

const CustomPC = () => {
  const [selectedComponents, setSelectedComponents] = useState({});
  const [currentComponentType, setCurrentComponentType] = useState("");
  const [currentComponent, setCurrentComponent] = useState("");

  const handleAddComponent = () => {
    if (currentComponentType && currentComponent) {
      const componentPrice = componentsList[currentComponentType][currentComponent].price;
      setSelectedComponents((prev) => ({
        ...prev,
        [currentComponentType]: {
          category: currentComponentType,
          component: currentComponent,
          price: componentPrice,
        },
      }));
      setCurrentComponentType("");
      setCurrentComponent("");
    } else {
      alert("Please select both component type and component.");
    }
  };

  // Check if all parts are selected
  const isPCComplete = Object.keys(componentsList).every(
    (type) => selectedComponents[type]
  );

  const calculateTotalPrice = () => {
    return Object.values(selectedComponents).reduce((total, component) => {
      return total + component.price;
    }, 0);
  };

  const handleAddToCart = () => {
    if (!isPCComplete) {
      alert("Please select all components before adding to cart.");
      return;
    }
    // Logic to add the PC to cart
    console.log("PC added to cart:", selectedComponents);
  };

  return (
    <>
      {/* <TopNav /> */}
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          color: "#FFFFFF",
        }}
      >
        <Container sx={{ pt: 4 }}>
          <Box
            sx={{
              textAlign: "center",
              padding: "2rem",
              marginBottom: "2rem",
              background: "#2C2C3E",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2, color: "#00E5FF" }}>
              Customize Your PC
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#AAAAAA" }}>
              Select all components to build and add your PC to the cart.
            </Typography>
          </Box>

          {/* Stepper for progress */}
          <Stepper activeStep={Object.keys(selectedComponents).length} alternativeLabel>
            {Object.keys(componentsList).map((type) => (
              <Step key={type} completed={!!selectedComponents[type]}>
                <StepLabel>{type}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Grid container spacing={4}>
            {/* Selected Components */}
            <Grid item xs={12} md={6}>
              <Box sx={{ background: "#2C2C3E", borderRadius: "8px", padding: "2rem" }}>
                <Typography variant="h5" sx={{ color: "#00E5FF", mb: 2 }}>
                  Selected Components
                </Typography>
                {Object.keys(componentsList).map((type) => (
                  <Typography key={type} variant="body1" sx={{ color: "#FFFFFF", mb: 1 }}>
                    {type}:{" "}
                    {selectedComponents[type]
                      ? `${selectedComponents[type].component} - ₹${selectedComponents[type].price}`
                      : "Not Selected"}
                  </Typography>
                ))}
                <Typography variant="h6" sx={{ mt: 2, color: "#FFFFFF" }}>
                  Total Price: ₹{calculateTotalPrice()}
                </Typography>
                <Button
                  variant="contained"
                  disabled={!isPCComplete}
                  onClick={handleAddToCart}
                  sx={{
                    mt: 2,
                    background: isPCComplete ? "#00E5FF" : "#555555",
                    "&:hover": { background: isPCComplete ? "#00B8D4" : "#555555" },
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Grid>

            {/* Add Component */}
            <Grid item xs={12} md={6}>
              <Box sx={{ background: "#2C2C3E", borderRadius: "8px", padding: "2rem" }}>
                <Typography variant="h5" sx={{ color: "#00E5FF", mb: 2 }}>
                  Add Component
                </Typography>
                <Select
                  fullWidth
                  value={currentComponentType}
                  onChange={(e) => setCurrentComponentType(e.target.value)}
                  displayEmpty
                  sx={{ color: "#FFFFFF", mb: 2 }}
                >
                  <MenuItem value="" disabled>
                    Select Component Type
                  </MenuItem>
                  {Object.keys(componentsList).map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  fullWidth
                  value={currentComponent}
                  onChange={(e) => setCurrentComponent(e.target.value)}
                  displayEmpty
                  disabled={!currentComponentType}
                  sx={{ color: "#FFFFFF", mb: 2 }}
                >
                  <MenuItem value="" disabled>
                    Select Component
                  </MenuItem>
                  {currentComponentType &&
                    Object.entries(componentsList[currentComponentType]).map(([component, { price }]) => (
                      <MenuItem key={component} value={component}>
                        {component} - ₹{price}
                      </MenuItem>
                    ))}
                </Select>
                <Button
                  variant="contained"
                  onClick={handleAddComponent}
                  sx={{
                    background: "#00E5FF",
                    "&:hover": { background: "#00B8D4" },
                  }}
                >
                  Add Component
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CustomPC;
