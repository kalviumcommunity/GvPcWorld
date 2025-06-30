import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import theme from './theme';
import TopNav from './Components/TopNav/TopNav';
import Footer from './Components/Footer/Footer';
import LoadingScreen from './Components/LoadingScreen/LoadingScreen';
import NotFound from './pages/NotFound';


const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const CustomPC = lazy(() => import('./Components/CustomPc/CustomPC'));
const Cart = lazy(() => import('./Components/Cart/Cart'));
const ProductList = lazy(() => import('./pages/ProductList'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Profile = lazy(() => import('./pages/Profile'));
const PreBuiltPCs = lazy(() => import('./pages/PreBuiltPCs'));

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
const Layout = ({ children }) => {
  return (
    <>
      <TopNav />
      <main style={{ minHeight: 'calc(100vh - 64px - 200px)' }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Suspense fallback={<LoadingScreen />}>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/custom-pc" element={<CustomPC />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/pre-built" element={<PreBuiltPCs />} />
                {/* <Route path="/checkout" element={<Checkout />} /> */}
                
                {/* Protected Routes */}
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Suspense>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

