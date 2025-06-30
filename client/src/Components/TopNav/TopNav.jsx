import React, { useState, useCallback, memo, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import API from '../../Api/api';
import { useAuth } from '../../context/AuthContext';
import './TopNav.css';

const navItems = [
  { text: 'Home', path: '/' },
  { text: 'Custom PC', path: '/custom-pc' },
  { text: 'Pre-Built PCs', path: '/pre-built' },
  { text: 'About Us', path: '/about-us' }
];

const TopNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const res = await API.get('/cart');
        setCartCount(res.data.items ? res.data.items.length : 0);
      } catch {
        setCartCount(0);
      }
    };
    if (isAuthenticated) fetchCartCount();
  }, [isAuthenticated]);

  const handleLogout = useCallback(async () => {
    await logout();
    navigate('/');
  }, [logout, navigate]);

  return (
    <nav className={`topnav${scrolled ? ' topnav--scrolled' : ''}`}> 
      <div className="topnav__container">
        <div className="topnav__logo">
          <Link to="/" className="topnav__logo-link">GvPcWorld</Link>
        </div>
        <button className="topnav__mobile-toggle" onClick={() => setMobileMenuOpen(v => !v)}>
          <span className="topnav__hamburger" />
        </button>
        <ul className={`topnav__menu${mobileMenuOpen ? ' topnav__menu--open' : ''}`}> 
          {navItems.map(({ text, path }) => (
            <li key={text} className={`topnav__item${location.pathname === path ? ' topnav__item--active' : ''}`}> 
              <Link to={path} className="topnav__link" onClick={() => setMobileMenuOpen(false)}>{text}</Link>
            </li>
          ))}
        </ul>
        <div className="topnav__actions">
          <Link to="/cart" className="topnav__cart">
            <span className="topnav__cart-icon">🛒</span>
            {isAuthenticated && cartCount > 0 && (
              <span className="topnav__cart-badge">{cartCount}</span>
            )}
          </Link>
          {isAuthenticated ? (
            <div className="topnav__user-menu">
              <span className="topnav__user-name">{user?.name || 'Account'}</span>
              <button className="topnav__logout" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="topnav__login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default memo(TopNav);
