import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

function BookCard({ book }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={book.imageUrl}
        alt={book.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          By {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ISBN: {book.isbn}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
          ₹{book.price}/week
        </Typography>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate(`/books/${book.id}`)}
          sx={{ mb: 1 }}
        >
          View Details
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => addToCart(book)}
          disabled={!book.availableCopies}
        >
          {book.availableCopies ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </Box>
    </Card>
  );
}

export default BookCard; 