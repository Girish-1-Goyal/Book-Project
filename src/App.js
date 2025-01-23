import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import BookList from './components/books/BookList';
import BookDetails from './components/books/BookDetails';
import ComingSoon from './components/books/ComingSoon';
import Cart from './components/cart/Cart';
import CheckoutForm from './components/cart/CheckoutForm';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';
import ReturnBook from './components/books/ReturnBook';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import ErrorBoundary from './components/common/ErrorBoundary';
import ScrollToTop from './components/common/ScrollToTop';
import InitializeDB from './components/admin/InitializeDB';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <Router>
          <ScrollToTop />
          <AuthProvider>
            <CartProvider>
              <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar />
                <main style={{ flexGrow: 1 }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/books" element={<BookList />} />
                    <Route path="/books/:id" element={<BookDetails />} />
                    <Route path="/coming-soon" element={<ComingSoon />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/admin/initialize" element={<InitializeDB />} />
                    
                    {/* Protected Routes */}
                    <Route
                      path="/cart"
                      element={<PrivateRoute><Cart /></PrivateRoute>}
                    />
                    <Route
                      path="/checkout"
                      element={<PrivateRoute><CheckoutForm /></PrivateRoute>}
                    />
                    <Route
                      path="/profile"
                      element={<PrivateRoute><Profile /></PrivateRoute>}
                    />
                    <Route
                      path="/edit-profile"
                      element={<PrivateRoute><EditProfile /></PrivateRoute>}
                    />
                    <Route
                      path="/return-book/:id"
                      element={<PrivateRoute><ReturnBook /></PrivateRoute>}
                    />
                  </Routes>
                </main>
                <Footer />
              </div>
            </CartProvider>
          </AuthProvider>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
