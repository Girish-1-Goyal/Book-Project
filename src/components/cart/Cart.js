import React from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Button, 
  Grid, 
  Box,
  IconButton,
  Divider 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.rentalPrice, 0);
  };

  if (cart.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/books')}
            sx={{ mt: 2 }}
          >
            Browse Books
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            {cart.map((item) => (
              <Box key={item.id}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{ width: '100%', borderRadius: '4px' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rental Duration: {item.rentalDuration} weeks
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ₹{item.rentalPrice}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <IconButton
                      color="error"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
              </Box>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ my: 2 }}>
              <Grid container justifyContent="space-between">
                <Typography>Total:</Typography>
                <Typography variant="h6">₹{calculateTotal()}</Typography>
              </Grid>
            </Box>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={() => navigate('/checkout')}
              sx={{ mb: 2 }}
            >
              Proceed to Checkout
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Cart; 