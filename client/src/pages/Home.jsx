// Home.js
import React, { useEffect, useRef, memo, lazy, Suspense } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography, Grid, Card, CardContent, CardMedia, useTheme, useMediaQuery, Fade, Slide } from "@mui/material";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lottie from 'lottie-react';
import computerAnimation from '../assets/animations/computer-build.json';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import MouseIcon from '@mui/icons-material/Mouse';
import ComputerIcon from '@mui/icons-material/Computer';
import StorageIcon from '@mui/icons-material/Storage';
import MemoryIcon from '@mui/icons-material/Memory';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import './Home.css';

const ProductCard = lazy(() => import("../Components/ProductCard/ProductCard"));

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Memoize navigation handlers
  const handleStartBuilding = React.useCallback(() => {
    navigate('/custom-pc');
  }, [navigate]);

  const handleBrowseProducts = React.useCallback(() => {
    navigate('/products');
  }, [navigate]);

  // Memoize categories data
  const categories = React.useMemo(() => [
    {
      id: 1,
      title: 'CPUs',
      image: '/images/categories/cpu.jpg',
      description: 'High-performance processors for your build',
      path: '/products/cpu'
    },
    {
      id: 2,
      title: 'GPUs',
      image: '/images/categories/gpu.jpg',
      description: 'Powerful graphics cards for gaming',
      path: '/products/gpu'
    },
    {
      id: 3,
      title: 'RAM',
      image: '/images/categories/ram.jpg',
      description: 'Fast memory for multitasking',
      path: '/products/ram'
    },
    {
      id: 4,
      title: 'Storage',
      image: '/images/categories/storage.jpg',
      description: 'SSDs and HDDs for your data',
      path: '/products/storage'
    },
    {
      id: 5,
      title: 'Motherboards',
      image: '/images/categories/motherboard.jpg',
      description: 'The foundation of your PC',
      path: '/products/motherboard'
    },
    {
      id: 6,
      title: 'Cases',
      image: '/images/categories/case.jpg',
      description: 'Stylish cases to showcase your build',
      path: '/products/case'
    }
  ], []);

  // Memoize testimonials data
  const testimonials = React.useMemo(() => [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Gaming Enthusiast',
      image: '/images/testimonials/user1.jpg',
      text: 'Built my dream gaming PC with GvPcWorld. The process was smooth and the result is amazing!'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'Content Creator',
      image: '/images/testimonials/user2.jpg',
      text: 'The custom PC builder helped me choose the perfect components for video editing. Highly recommended!'
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      role: 'Software Developer',
      image: '/images/testimonials/user3.jpg',
      text: 'Fast shipping and excellent customer service. My development workstation is running perfectly!'
    }
  ], []);

  // Optimize animations with useCallback
  const initializeAnimations = React.useCallback(() => {
    let animations = [];

    const animateHeroElements = () => {
      const hero = heroRef.current;
      if (!hero) return;

      const heroElements = [
        { el: hero.querySelector('.hero-title'), delay: 0.2 },
        { el: hero.querySelector('.hero-subtitle'), delay: 0.4 },
        { el: hero.querySelector('.hero-buttons'), delay: 0.6 },
        { el: hero.querySelector('.hero-animation'), delay: 0.3 }
      ];

      heroElements.forEach(({ el, delay }) => {
        if (el) {
          animations.push(
            gsap.fromTo(
              el,
              { y: 30, opacity: 0 },
              { 
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                delay,
                ease: 'power2.out'
              }
            )
          );
        }
      });
    };

    const animateCategories = () => {
      const categories = categoriesRef.current;
      if (!categories) return;

      const categoryCards = categories.querySelectorAll('.category-card');
      if (categoryCards.length) {
        animations.push(
          gsap.fromTo(
            categoryCards,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              scrollTrigger: {
                trigger: categories,
                start: 'top center+=100',
                toggleActions: 'play none none none'
              }
            }
          )
        );
      }
    };

    const animateTestimonials = () => {
      const testimonials = testimonialsRef.current;
      if (!testimonials) return;

      const testimonialCards = testimonials.querySelectorAll('.testimonial-card');
      if (testimonialCards.length) {
        animations.push(
          gsap.fromTo(
            testimonialCards,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.15,
              scrollTrigger: {
                trigger: testimonials,
                start: 'top center+=100',
                toggleActions: 'play none none none'
              }
            }
          )
        );
      }
    };

    // Execute animations in order
    animateHeroElements();
    animateCategories();
    animateTestimonials();

    return () => {
      animations.forEach(anim => {
        if (anim.kill) anim.kill();
      });
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.kill) trigger.kill();
      });
    };
  }, []);

  // Run animations only once on mount
  useEffect(() => {
    const cleanup = initializeAnimations();
    return () => {
      if (cleanup) cleanup();
    };
  }, [initializeAnimations]);

  // Memoize CategoryCard component
  const CategoryCard = React.memo(({ category, index, onNavigate }) => (
    <Fade in timeout={600} style={{ transitionDelay: `${index * 100}ms` }}>
      <Card 
        className="category-card"
        onClick={() => onNavigate(category.path)}
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 30px 0 rgba(0,0,0,0.2)',
            '& .category-image': {
              transform: 'scale(1.05)'
            }
          }
        }}
      >
        <Box sx={{ position: 'relative', overflow: 'hidden', pt: '60%' }}>
          <CardMedia
            component="img"
            image={category.image}
            alt={category.title}
            className="category-image"
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s ease'
            }}
          />
          <Box sx={{ 
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            pt: 6,
            pb: 2,
            px: 2
          }}>
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
              {category.title}
            </Typography>
          </Box>
        </Box>
        <CardContent sx={{ flexGrow: 1, bgcolor: 'transparent' }}>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            {category.description}
          </Typography>
        </CardContent>
      </Card>
    </Fade>
  ), (prevProps, nextProps) => {
    return (
      prevProps.category === nextProps.category &&
      prevProps.index === nextProps.index
    );
  });

  // Memoize TestimonialCard component
  const TestimonialCard = React.memo(({ testimonial, index }) => (
    <Fade in timeout={600} style={{ transitionDelay: `${index * 200}ms` }}>
      <Card className="testimonial-card" sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        borderRadius: 4,
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 12px 30px 0 rgba(0,0,0,0.2)'
        }
      }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 3,
          pb: 2,
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Box
            component="img"
            src={testimonial.image}
            alt={testimonial.name}
            sx={{ 
              width: 64,
              height: 64,
              borderRadius: '50%',
              mr: 2,
              objectFit: 'cover',
              border: '3px solid rgba(255,255,255,0.2)'
            }}
          />
          <Box>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
              {testimonial.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              {testimonial.role}
            </Typography>
          </Box>
        </Box>
        <Typography 
          variant="body1" 
          sx={{ 
            flexGrow: 1,
            color: 'rgba(255,255,255,0.9)',
            fontStyle: 'italic',
            lineHeight: 1.6
          }}
        >
          "{testimonial.text}"
        </Typography>
      </Card>
    </Fade>
  ), (prevProps, nextProps) => {
    return (
      prevProps.testimonial === nextProps.testimonial &&
      prevProps.index === nextProps.index
    );
  });

  return (
    <Box className="home-page" sx={{ 
      background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
      color: 'white',
      minHeight: '100vh',
      overflow: 'hidden'
    }}>
      {/* Hero Section - Modern and Dynamic */}
      <Box 
        ref={heroRef}
        className="hero-section"
        sx={{
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          background: 'radial-gradient(circle at 50% 50%, rgba(25,118,210,0.1) 0%, rgba(13,71,161,0.2) 100%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/images/circuit-pattern.svg")',
            opacity: 0.1,
            zIndex: 0
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in timeout={1000}>
                <Box>
                  <Typography 
                    variant="h1" 
                    className="hero-title"
                    sx={{ 
                      fontWeight: 800,
                      mb: 2,
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      background: 'linear-gradient(45deg, #64b5f6, #2196f3)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 2px 10px rgba(33,150,243,0.3)'
                    }}
                  >
                    Craft Your Perfect PC
                  </Typography>
                  <Typography 
                    variant="h5" 
                    className="hero-subtitle"
                    sx={{ 
                      mb: 4,
                      color: 'rgba(255,255,255,0.9)',
                      lineHeight: 1.6
                    }}
                  >
                    Experience the ultimate in custom PC building. Choose from premium components and create a machine that's uniquely yours.
                  </Typography>
                  <Box className="hero-buttons" sx={{ 
                    display: 'flex', 
                    gap: 2,
                    flexWrap: 'wrap'
                  }}>
                    <Button 
                      variant="contained" 
                      size="large"
                      onClick={handleStartBuilding}
                      sx={{ 
                        py: 2,
                        px: 4,
                        borderRadius: 3,
                        background: 'linear-gradient(45deg, #2196f3, #1976d2)',
                        boxShadow: '0 4px 20px 0 rgba(33,150,243,0.4)',
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1976d2, #1565c0)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 25px 0 rgba(33,150,243,0.5)',
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Start Building
                    </Button>
                    <Button 
                      variant="outlined" 
                      size="large"
                      onClick={handleBrowseProducts}
                      sx={{ 
                        py: 2,
                        px: 4,
                        borderRadius: 3,
                        borderWidth: '2px',
                        borderColor: 'rgba(255,255,255,0.5)',
                        color: 'white',
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Browse Products
                    </Button>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Slide direction="left" in timeout={1000}>
                <Box className="hero-animation" sx={{ 
                  width: '100%', 
                  height: '100%',
                  filter: 'drop-shadow(0 0 30px rgba(33,150,243,0.3))'
                }}>
                  <Lottie 
                    animationData={computerAnimation} 
                    loop={true}
                    style={{ width: '100%', height: '100%' }}
                  />
                </Box>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </Box>



      {/* Categories Section - Modern Grid */}
      <Box 
        ref={categoriesRef}
        className="categories-section"
        sx={{ 
          py: 8, 
          background: 'linear-gradient(135deg, rgba(25,118,210,0.1) 0%, rgba(13,71,161,0.2) 100%)'
        }}
      >

      </Box>
      <Box 
        ref={testimonialsRef}
        className="testimonials-section"
        sx={{ 
          py: 8,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(25,118,210,0.1) 0%, rgba(13,71,161,0.2) 100%)',
            zIndex: 0
          }
        }}
      >

      </Box>

      {/* CTA Section - Modern and Engaging */}
      <Box 
        className="cta-section"
        sx={{ 
          py: 10,
          textAlign: 'center',
          background: 'linear-gradient(45deg, #1976d2, #2196f3)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/images/circuit-pattern.svg")',
            opacity: 0.1,
            zIndex: 0
          }
        }}
      >
        
      </Box>
    </Box>
  );
};

export default memo(Home);