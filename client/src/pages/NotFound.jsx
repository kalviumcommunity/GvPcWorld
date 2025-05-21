import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TopNav from '../Components/TopNav/TopNav';
import Footer from '../Components/Footer/Footer';

const NotFound = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return (
    <>
      <TopNav />
      <Container maxWidth="md" sx={{ mt: 4, mb: 8, minHeight: '60vh' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            py: 8,
          }}
        >
          <Typography
            variant={isMobile ? 'h3' : 'h1'}
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 2,
            }}
          >
            404
          </Typography>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            component="h2"
            gutterBottom
            sx={{ mb: 3 }}
          >
            Page Not Found
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 600 }}
          >
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/')}
              sx={{ minWidth: 150 }}
            >
              Go Home
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate(-1)}
              sx={{ minWidth: 150 }}
            >
              Go Back
            </Button>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default NotFound; 