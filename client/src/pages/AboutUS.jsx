// src/pages/AboutUs.jsx

import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const AboutUs = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        🖥️ About Us — GVPC World
      </Typography>

      <Typography variant="body1" paragraph>
        Welcome to <strong>GVPC World</strong>, your one-stop destination for building the <em>PC of your dreams</em>.
      </Typography>

      <Typography variant="body1" paragraph>
        We’re not just another PC parts store — we help you <strong>build smarter</strong>.
      </Typography>

      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          What We Do:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disablePadding>
            <ListItemText
              primary="Choose individual components — pick exactly what you want."
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText
              primary="Assemble your dream PC — place an order, and we’ll build it for you."
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText
              primary="Get personalized feedback — we’ll tell you whether your selected parts are:"
            />
          </ListItem>
          <Box pl={4}>
            <List dense>
              <ListItem disablePadding>
                <ListItemText primary="• Compatible" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="• Balanced (not underpowered or overpowered)" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="• Ideal for your needs (gaming, editing, etc.)" />
              </ListItem>
            </List>
          </Box>
        </List>
      </Box>

      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Why Choose Us?
        </Typography>
        <Typography variant="body1">
          Because we care about <strong>what you build and how it performs</strong>. Whether you're a casual user or a hardcore gamer, GVPC World helps you make <strong>informed</strong> and <strong>optimized</strong> choices.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
