// Home.js
import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography, Grid, Card, CardContent, CardMedia, useTheme, useMediaQuery } from "@mui/material";
import ProductCard from "../Components/ProductCard/ProductCard";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lottie from 'lottie-react';
import computerAnimation from '../assets/animations/computer-build.json';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Featured categories data
  const categories = [
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
  ];

  // Testimonials data
  const testimonials = [
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
  ];

  useEffect(() => {
    // Hero section animations
    const hero = heroRef.current;
    const heroTitle = hero.querySelector('.hero-title');
    const heroSubtitle = hero.querySelector('.hero-subtitle');
    const heroButtons = hero.querySelector('.hero-buttons');
    const heroAnimation = hero.querySelector('.hero-animation');

    gsap.fromTo(
      heroTitle,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
    );

    gsap.fromTo(
      heroSubtitle,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.4 }
    );

    gsap.fromTo(
      heroButtons,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.6 }
    );

    gsap.fromTo(
      heroAnimation,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, delay: 0.3 }
    );

    // Categories section animations
    const categories = categoriesRef.current;
    const categoryCards = categories.querySelectorAll('.category-card');

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
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Testimonials section animations
    const testimonials = testimonialsRef.current;
    const testimonialCards = testimonials.querySelectorAll('.testimonial-card');

    gsap.fromTo(
      testimonialCards,
      { x: isMobile ? 0 : 50, y: isMobile ? 50 : 0, opacity: 0 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: testimonials,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  const handleStartBuilding = () => {
    navigate('/custom-pc');
  };

  const handleBrowseProducts = () => {
    navigate('/products/components');
  };

  return (
    <Box className="home-page">
      <Container sx={{ pt: 4 }}>
        <Box
          sx={{
            textAlign: "center",
            padding: "2rem",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            borderRadius: "10px",
            marginBottom: "2rem",
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", mb: 2, color: "#00E5FF" }}
          >
            Build Your Dream PC
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#E0E0E0" }}>
            Customize and pick parts for the ultimate performance and design!
          </Typography>
        </Box>

        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-around"
          my={4}
        >
          <ProductCard
            title="Gaming PC"
            description="High-performance gaming rigs"
            image="/images/products/gaming-pc.jpg"
            price={1499}
          />
          <ProductCard
            title="Workstation"
            description="Professional workstations"
            image="/images/products/workstation.jpg"
            price={1999}
          />
            <ProductCard
            title="Custom Build"
            description="Build your dream PC"
            image="/images/products/custom-pc.jpg"
            price={1299}
          />
        </Box>

        <Box display="flex" justifyContent="center" my={4}>
          <Button
            variant="contained"
            component={Link}
            to="/custom-pc"
            sx={{
              background: "linear-gradient(45deg, #ff4081, #ff80ab)",
              color: "#fff",
              fontWeight: "bold",
              padding: "0.8rem 2rem",
              fontSize: "1rem",
              "&:hover": {
                background: "linear-gradient(45deg, #f50057, #ff4081)",
              },
            }}
          >
            Customize Your PC
          </Button>
        </Box>
      </Container>

      {/* Hero Section */}
      <Box 
        ref={heroRef}
        className="hero-section"
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h1" 
                className="hero-title"
                sx={{ 
                  fontWeight: 700,
                  mb: 2,
                  background: 'linear-gradient(45deg, #2196f3, #1976d2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Build Your Dream PC Today
              </Typography>
              <Typography 
                variant="h5" 
                className="hero-subtitle"
                color="text.secondary"
                sx={{ mb: 4 }}
              >
                Customize every component to create the perfect PC for gaming, work, or content creation.
              </Typography>
              <Box className="hero-buttons" sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={handleStartBuilding}
                  sx={{ 
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    boxShadow: '0 4px 14px 0 rgba(33, 150, 243, 0.39)',
                    '&:hover': {
                      boxShadow: '0 6px 20px 0 rgba(33, 150, 243, 0.5)',
                    }
                  }}
                >
                  Start Building
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  onClick={handleBrowseProducts}
                  sx={{ 
                    py: 1.5,
                    px: 3,
                    borderRadius: 2
                  }}
                >
                  Browse Products
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="hero-animation" sx={{ width: '100%', height: '100%' }}>
                <Lottie 
                  animationData={computerAnimation} 
                  loop={true}
                  style={{ width: '100%', height: '100%' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
        <div className="particles-container" id="particles-js"></div>
      </Box>

      {/* Featured Categories Section */}
      <Box 
        ref={categoriesRef}
        className="categories-section"
        sx={{ py: 8, bgcolor: 'background.default' }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center" 
            gutterBottom
            sx={{ mb: 6, fontWeight: 600 }}
          >
            Featured Categories
          </Typography>
          <Grid container spacing={4}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={4} key={category.id}>
                <Card 
                  className="category-card"
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={category.image}
                    alt={category.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {category.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {category.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button 
                      variant="text" 
                      color="primary"
                      onClick={() => navigate(category.path)}
                    >
                      Explore {category.title}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box 
        ref={testimonialsRef}
        className="testimonials-section"
        sx={{ 
          py: 8, 
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center" 
            gutterBottom
            sx={{ mb: 6, fontWeight: 600 }}
          >
            What Our Customers Say
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial) => (
              <Grid item xs={12} md={4} key={testimonial.id}>
                <Card 
                  className="testimonial-card"
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                    borderRadius: 4,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      component="img"
                      src={testimonial.image}
                      alt={testimonial.name}
                      sx={{ 
                        width: 60, 
                        height: 60, 
                        borderRadius: '50%',
                        mr: 2,
                        objectFit: 'cover'
                      }}
                    />
                    <Box>
                      <Typography variant="h6" component="div">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1" sx={{ flexGrow: 1 }}>
                    "{testimonial.text}"
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        className="cta-section"
        sx={{ 
          py: 8, 
          textAlign: 'center',
          background: 'linear-gradient(45deg, #2196f3, #1976d2)',
          color: 'white'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
            Ready to Build Your Dream PC?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Start your custom PC build today and get expert guidance every step of the way.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={handleStartBuilding}
            sx={{ 
              py: 1.5,
              px: 4,
              borderRadius: 2,
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              }
            }}
          >
            Start Building Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;