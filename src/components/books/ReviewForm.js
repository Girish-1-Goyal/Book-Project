import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  Box,
  Typography
} from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../contexts/AuthContext';

function ReviewForm({ bookId, open, onClose, onSuccess }) {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;
    
    setLoading(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        bookId,
        userId: currentUser.uid,
        userName: currentUser.name,
        rating,
        review,
        createdAt: new Date().toISOString()
      });
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Write a Review</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography component="legend">Rating</Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            size="large"
          />
        </Box>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Your Review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={loading || rating === 0}
        >
          Submit Review
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReviewForm; 