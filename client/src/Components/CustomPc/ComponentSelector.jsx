import React from 'react';
import { 
  Box, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button,
  Grid,
  Paper
} from '@mui/material';
import { componentsList } from './componentsList';
const ComponentSelector = ({ 
  currentComponentType, 
  setCurrentComponentType, 
  currentComponent, 
  setCurrentComponent,
  handleAddComponent,
  selectedComponents
}) => {
  return (
    <Paper elevation={2} sx={{
      p: { xs: 2, sm: 3 },
      borderRadius: 3,
      boxShadow: '0 2px 12px 0 rgba(0,0,0,0.07)',
      mb: 2,
      bgcolor: 'background.default',
      transition: 'box-shadow 0.2s',
    }}>
      <Typography variant="h6" color="white" fontWeight="bold" gutterBottom>
        Add Components
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="filled" sx={{ bgcolor: '#374151' }}>
            <InputLabel sx={{ color: '#ccc' }}>Component Type</InputLabel>
            <Select
              value={currentComponentType}
              onChange={(e) => {
                setCurrentComponentType(e.target.value);
                setCurrentComponent("");
              }}
              sx={{ color: 'white', borderRadius: 2 }}
            >
              <MenuItem value="">
                <em>Select Component Type</em>
              </MenuItem>
              {Object.keys(componentsList).map((type) => (
                <MenuItem key={type} value={type}>
                  {type} {selectedComponents[type] ? "✓" : ""}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl 
            fullWidth 
            variant="filled" 
            sx={{ bgcolor: '#374151' }}
            disabled={!currentComponentType}
          >
            <InputLabel sx={{ color: '#ccc' }}>Component</InputLabel>
            <Select
              value={currentComponent}
              onChange={(e) => setCurrentComponent(e.target.value)}
              sx={{ color: 'white', borderRadius: 2 }}
            >
              <MenuItem value="">
                <em>Select Component</em>
              </MenuItem>
              {currentComponentType &&
                Object.entries(componentsList[currentComponentType]).map(([component, { price }]) => (
                  <MenuItem key={component} value={component}>
                    {component} - ₹{price.toLocaleString()}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Button
          onClick={handleAddComponent}
          disabled={!currentComponentType || !currentComponent}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ borderRadius: 2, fontWeight: 600, px: 3, py: 1.2 }}
        >
          Add Component
        </Button>
      </Box>
    </Paper>
  );
};

export default ComponentSelector;
