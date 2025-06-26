import React, { memo } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton,
  useTheme,
  useMediaQuery,
  Fade
} from '@mui/material';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  YouTube,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import './Footer.css';

const FooterSection = memo(({ title, children }) => (
  <Fade in timeout={800}>
    <Box className="footer-section" sx={{ mb: { xs: 3, md: 0 } }}>
      <Typography 
        variant="h6" 
        sx={{ 
          color: 'primary.main',
          fontWeight: 600,
          mb: 2
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  </Fade>
), (prevProps, nextProps) => {
  return prevProps.title === nextProps.title && prevProps.children === nextProps.children;
});

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Memoize static data
  const socialLinks = React.useMemo(() => [
    { icon: <Facebook />, url: '#', label: 'Facebook' },
    { icon: <Twitter />, url: '#', label: 'Twitter' },
    { icon: <Instagram />, url: '#', label: 'Instagram' },
    { icon: <YouTube />, url: '#', label: 'YouTube' }
  ], []);

  const quickLinks = React.useMemo(() => [
    { text: 'About Us', path: '/about' },
    { text: 'Custom PC Builder', path: '/custom-pc' },
    { text: 'Pre-Built PCs', path: '/prebuilt' },
    { text: 'Components', path: '/products/components' }
  ], []);

  // Memoize contact info section
  const ContactInfo = React.useMemo(() => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Email fontSize="small" color="primary" />
        <Typography variant="body2" color="text.secondary">
          support@gvpcworld.com
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Phone fontSize="small" color="primary" />
        <Typography variant="body2" color="text.secondary">
          +1 (555) 123-4567
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LocationOn fontSize="small" color="primary" />
        <Typography variant="body2" color="text.secondary">
          123 PC Street, Tech City, TC 12345
        </Typography>
      </Box>
    </Box>
  ), []);

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper',
        color: 'text.primary',
        py: 6,
        borderTop: 1,
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <FooterSection title="GvPcWorld">
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                Your one-stop destination for custom PC builds and high-performance computing solutions.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'primary.main',
                      '&:hover': {
                        color: 'primary.dark',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.2s'
                    }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </FooterSection>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <FooterSection title="Quick Links">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {quickLinks.map((link) => (
                  <Link
                    key={link.path}
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'translateX(4px)'
                      },
                      transition: 'all 0.2s'
                    }}
                  >
                    {link.text}
                  </Link>
                ))}
              </Box>
            </FooterSection>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <FooterSection title="Contact Us">
              {ContactInfo}
            </FooterSection>
          </Grid>
        </Grid>

        <Box 
          sx={{ 
            mt: 4, 
            pt: 2, 
            borderTop: 1, 
            borderColor: 'divider',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} GvPcWorld. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default memo(Footer);