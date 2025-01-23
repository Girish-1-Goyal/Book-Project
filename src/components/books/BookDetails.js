import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  Button, 
  TextField, 
  MenuItem,
  Box 
} from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useCart } from '../../contexts/CartContext';
import { calculateRentalPrice } from '../../services/bookService';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rentalDuration, setRentalDuration] = useState(1);
  const { addToCart } = useCart();

  const durations = [
    { value: 1, label: '1 Week' },
    { value: 2, label: '2 Weeks' },
    { value: 4, label: '1 Month' },
    { value: 12, label: '3 Months' },
    { value: 24, label: '6 Months' },
    { value: 52, label: '1 Year' }
  ];

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const docRef = doc(db, 'books', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setBook({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error('Error fetching book:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!book) {
    return <Typography>Book not found</Typography>;
  }

  const handleAddToCart = () => {
    const rentalPrice = calculateRentalPrice(book.price, rentalDuration);
    addToCart({ ...book, rentalDuration, rentalPrice });
  };

  return (
    <Container sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <img
              src={book.imageUrl}
              alt={book.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              By {book.author}
            </Typography>
            <Typography variant="body1" paragraph>
              {book.description}
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                ISBN: {book.isbn}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Category: {book.category}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Available Copies: {book.availableCopies}
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <TextField
                select
                fullWidth
                label="Rental Duration"
                value={rentalDuration}
                onChange={(e) => setRentalDuration(e.target.value)}
                sx={{ mb: 2 }}
              >
                {durations.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Typography variant="h6" color="primary" gutterBottom>
                Rental Price: ₹{calculateRentalPrice(book.price, rentalDuration)}
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              onClick={handleAddToCart}
              disabled={!book.availableCopies}
            >
              {book.availableCopies ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default BookDetails; 