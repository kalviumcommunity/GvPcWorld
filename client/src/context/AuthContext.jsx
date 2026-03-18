import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/auth/success`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
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
          setError(null);
          localStorage.removeItem('token');
        }
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
        setError(null);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const checkLoginSuccess = async () => {
      if (window.location.pathname === '/auth/google/callback') {
        try {
          setLoading(true);
          const res = await axios.get(`${API_URL}/auth/success`, {
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

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const logout = async () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = '/';
    } catch (err) {
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
