import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on component mount and when auth state changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:4500/auth/success', {
          withCredentials: true,
        });
        
        if (res.data && res.data.user) {
          const userData = {
            ...res.data.user,
            name: res.data.user.username || res.data.user.email?.split('@')[0] || 'User',
            email: res.data.user.email,
            profilePicture: res.data.user.profilePicture,
          };
          setUser(userData);
          setIsAuthenticated(true);
          setError(null);
        } else {
          setUser(null);
          setIsAuthenticated(false);
          // Don't set error for normal unauthenticated state
          setError(null);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setUser(null);
        setIsAuthenticated(false);
        // Don't set error for normal authentication failures
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Check for login success callback
  useEffect(() => {
    const checkLoginSuccess = async () => {
      if (window.location.pathname === '/auth/google/callback') {
        try {
          setLoading(true);
          const res = await axios.get('http://localhost:4500/auth/success', {
            withCredentials: true,
          });
          
          if (res.data && res.data.user) {
            const userData = {
              ...res.data.user,
              name: res.data.user.username || res.data.user.email?.split('@')[0] || 'User',
              email: res.data.user.email,
              profilePicture: res.data.user.profilePicture,
            };
            setUser(userData);
            setIsAuthenticated(true);
            setError(null);
            window.location.href = '/dashboard';
          } else {
            setUser(null);
            setIsAuthenticated(false);
            setError('Login failed');
            window.location.href = '/login';
          }
        } catch (err) {
          console.error('Login callback failed:', err);
          setUser(null);
          setIsAuthenticated(false);
          setError('Login failed. Please try again.');
          window.location.href = '/login';
        } finally {
          setLoading(false);
        }
      }
    };
    
    checkLoginSuccess();
  }, []);

  // Google OAuth login
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:4500/auth/google';
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post('http://localhost:4500/auth/logout', {}, {
        withCredentials: true,
      });
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = '/';
    } catch (err) {
      console.error('Logout failed:', err);
      setError('Logout failed. Please try again.');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated,
        handleGoogleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
