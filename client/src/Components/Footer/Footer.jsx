import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton,
  useTheme,
  useMediaQuery
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
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const footerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    
    gsap.fromTo(
      footer.querySelectorAll('.footer-animate'),
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: footer,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const footerLinks = {
    'Products': [
      { name: 'Custom PC Builder', path: '/custom-pc' },
      { name: 'Pre-built PCs', path: '/products/pre-built' },
      { name: 'Components', path: '/products/components' },
      { name: 'Accessories', path: '/products/accessories' }
    ],
    'Support': [
      { name: 'Contact Us', path: '/contact' },
      { name: 'FAQs', path: '/faqs' },
      { name: 'Shipping', path: '/shipping' },
      { name: 'Returns', path: '/returns' }
    ],
    'Company': [
      { name: 'About Us', path: '/about-us' },
      { name: 'Careers', path: '/careers' },
      { name: 'Blog', path: '/blog' },
      { name: 'Press', path: '/press' }
    ]
  };

  return (
    <Box 
      component="footer" 
      ref={footerRef}
      className="footer"
      sx={{
        bgcolor: 'background.paper',
        pt: 6,
        pb: 3,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4} className="footer-animate">
            <Typography variant="h6" color="text.primary" gutterBottom>
              GvPcWorld
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Building your dream PC with premium components and expert guidance.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton 
                component="a" 
                href="https://facebook.com" 
                target="_blank"
                className="social-icon"
              >
                <Facebook />
              </IconButton>
              <IconButton 
                component="a" 
                href="https://twitter.com" 
                target="_blank"
                className="social-icon"
              >
                <Twitter />
              </IconButton>
              <IconButton 
                component="a" 
                href="https://instagram.com" 
                target="_blank"
                className="social-icon"
              >
                <Instagram />
              </IconButton>
              <IconButton 
                component="a" 
                href="https://youtube.com" 
                target="_blank"
                className="social-icon"
              >
                <YouTube />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2} className="footer-animate">
            <Typography variant="h6" color="text.primary" gutterBottom>
              Products
            </Typography>
            <Box component="ul" className="footer-links">
              {footerLinks['Products'].map((link) => (
                <li key={link.name}>
                  <Link 
                    component={RouterLink} 
                    to={link.path}
                    color="text.secondary"
                    className="footer-link"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2} className="footer-animate">
            <Typography variant="h6" color="text.primary" gutterBottom>
              Support
            </Typography>
            <Box component="ul" className="footer-links">
              {footerLinks['Support'].map((link) => (
                <li key={link.name}>
                  <Link 
                    component={RouterLink} 
                    to={link.path}
                    color="text.secondary"
                    className="footer-link"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2} className="footer-animate">
            <Typography variant="h6" color="text.primary" gutterBottom>
              Company
            </Typography>
            <Box component="ul" className="footer-links">
              {footerLinks['Company'].map((link) => (
                <li key={link.name}>
                  <Link 
                    component={RouterLink} 
                    to={link.path}
                    color="text.secondary"
                    className="footer-link"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={2} className="footer-animate">
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Box component="ul" className="footer-contact">
              <li>
                <Email fontSize="small" sx={{ mr: 1 }} />
                <Link href="mailto:contact@gvpcworld.com" color="text.secondary">
                  contact@gvpcworld.com
                </Link>
              </li>
              <li>
                <Phone fontSize="small" sx={{ mr: 1 }} />
                <Link href="tel:+1234567890" color="text.secondary">
                  +1 (234) 567-890
                </Link>
              </li>
              <li>
                <LocationOn fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  123 PC Street, Tech City
                </Typography>
              </li>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box 
          sx={{ 
            mt: 5, 
            pt: 3, 
            borderTop: '1px solid',
            borderColor: 'divider',
            textAlign: 'center'
          }}
          className="footer-animate"
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} GvPcWorld. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 