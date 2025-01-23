import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  CircularProgress
} from '@mui/material';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { processPayment } from '../../services/paymentService';
import { rentBook } from '../../services/bookService';

function CheckoutForm() {
  const { cart, calculateTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Process payment
      const paymentResult = await processPayment({
        amount: calculateTotal(),
        currency: 'inr',
        userId: currentUser.uid
      });

      // Create rental records
      for (const book of cart) {
        await rentBook(currentUser.uid, book.id, book.rentalDuration);
      }

      clearCart();
      // Navigate to success page or show success message
    } catch (err) {
      setError('Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Checkout
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="address"
                label="Delivery Address"
                multiline
                rows={3}
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="city"
                label="City"
                value={formData.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="state"
                label="State"
                value={formData.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="pincode"
                label="PIN Code"
                value={formData.pincode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="phone"
                label="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Typography>
              Total Amount: ₹{calculateTotal()}
            </Typography>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              'Confirm Order'
            )}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default CheckoutForm; 