import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
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
    <Paper elevation={2} className="component-selector" style={{
      padding: '1.5rem',
      borderRadius: '1.2rem',
      background: '#f8fafc',
      marginBottom: '1.5rem',
      boxShadow: '0 2px 12px 0 rgba(0,0,0,0.07)'
    }}>
      <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
        Add Components
      </Typography>
      <Box mb={2}>
        <label htmlFor="component-type-select" style={{ fontWeight: 600, color: '#222' }}>Component Type</label>
        <select
          id="component-type-select"
          value={currentComponentType}
          onChange={e => {
            setCurrentComponentType(e.target.value);
            setCurrentComponent("");
          }}
          style={{
            width: '100%',
            padding: '0.6rem',
            borderRadius: '0.6rem',
            border: '1px solid #cbd5e1',
            marginTop: 6,
            marginBottom: 12,
            background: '#fff',
            color: '#222',
            fontSize: 16
          }}
        >
          <option value="">Select Component Type</option>
          {Object.keys(componentsList).map(type => (
            <option key={type} value={type} disabled={selectedComponents[type]}> 
              {type} {selectedComponents[type] ? '✓' : ''}
            </option>
          ))}
        </select>
      </Box>
      {currentComponentType && (
        <Box>
          <Typography variant="subtitle1" color="text.secondary" mb={1}>
            Select a {currentComponentType}:
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(componentsList[currentComponentType]).map(([component, { price, image }]) => (
              <Grid item xs={12} sm={6} md={4} key={component}>
                <Paper elevation={1} style={{
                  padding: '1rem',
                  borderRadius: '0.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: '#fff',
                  border: selectedComponents[currentComponentType]?.component === component ? '2px solid #1976d2' : '1px solid #e5e7eb',
                  boxShadow: selectedComponents[currentComponentType]?.component === component ? '0 2px 8px #1976d222' : 'none',
                  opacity: selectedComponents[currentComponentType] ? 0.5 : 1
                }}>
                  <img src={image} alt={component} style={{ width: 48, height: 48, objectFit: 'contain', marginBottom: 8 }} />
                  <Typography variant="body1" fontWeight={600} align="center" style={{ color: '#222' }}>{component}</Typography>
                  <Typography variant="body2" color="text.secondary" align="center" mb={1}>
                    ₹{price.toLocaleString()}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<AddIcon />}
                    fullWidth
                    disabled={!!selectedComponents[currentComponentType]}
                    onClick={() => handleAddComponent(component)}
                    style={{
                      borderRadius: 8,
                      fontWeight: 600,
                      marginTop: 6
                    }}
                  >
                    Add
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Paper>
  );
};

export default ComponentSelector;
