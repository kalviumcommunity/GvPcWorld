import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  InputBase, 
  Box, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem, 
  Badge,
  Button,
  CircularProgress,
  Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './TopNav.css';

const TopNav = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [userName, setUserName] = useState('');    const navigate = useNavigate();
    const { cartCount } = useCart();
    const { user, isAuthenticated, loading, logout } = useAuth();
    const cartToggleRef = useRef(null);

    useEffect(() => {
        if (isAuthenticated && user) {
            setUserName(user.name || 'User');
        } else {
            setUserName('');
        }
    }, [isAuthenticated, user]);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await logout();
        handleMenuClose();
        navigate('/');
    };    const handleCartClick = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        navigate('/cart');
    };
    return (
        <AppBar position="static" className="top-nav">
            <Toolbar className="nav-toolbar">
                {/* Logo */}
                <Typography variant="h6" component={Link} to="/" className="logo-link">
                    GvPcWorld
                </Typography>

                {/* Search Bar */}
                <Box className="search-bar">
                    <SearchIcon className="search-icon" />
                    <InputBase placeholder="Search…" className="search-input" />
                </Box>

                {/* Navigation Links */}
                <Box className="nav-links">
                    <IconButton component={Link} to="/about-us" className="nav-item">
                        <InfoIcon />
                    </IconButton>
                    <Tooltip title={isAuthenticated ? "View Cart" : "Login to view cart"}>
                        <IconButton 
                            onClick={handleCartClick} 
                            className="nav-item"
                            color={isAuthenticated ? "primary" : "default"}
                        >                            <Badge 
                                badgeContent={isAuthenticated ? cartCount : 0} 
                                color="primary"
                            >
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>                    {isAuthenticated ? (
                        <>
                            {/* User Name and Avatar */}
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ 
                                        mr: 1, 
                                        fontWeight: 'medium',
                                        color: 'white'
                                    }}
                                >
                                    {userName}
                                </Typography>
                                <IconButton 
                                    onClick={handleMenuOpen} 
                                    className="nav-item"
                                    sx={{ p: 0 }}
                                >
                                    <Avatar 
                                        src={user?.ownerImg?.[0]} 
                                        alt={userName}
                                        sx={{ width: 32, height: 32 }}
                                    >
                                        {userName.charAt(0).toUpperCase()}
                                    </Avatar>
                                </IconButton>
                            </Box>

                            {/* User Menu */}
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem 
                                    component={Link} 
                                    to="/dashboard" 
                                    onClick={handleMenuClose}
                                >
                                    Dashboard
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Button 
                            component={Link} 
                            to="/login" 
                            variant="contained" 
                            color="primary"
                            startIcon={<PersonIcon />}
                            sx={{ 
                                ml: 2,
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'primary.dark',
                                }
                            }}
                        >
                            Login
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopNav;
