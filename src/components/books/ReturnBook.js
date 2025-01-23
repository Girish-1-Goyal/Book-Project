import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Alert,
  Box
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { calculateDamageFine } from '../../services/bookService';

function ReturnBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rental, setRental] = useState(null);
  const [bookCondition, setBookCondition] = useState('good');
  const [comments, setComments] = useState('');
  const [fine, setFine] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const rentalRef = doc(db, 'rentals', id);
        const rentalDoc = await getDoc(rentalRef);
        if (rentalDoc.exists()) {
          setRental({ id: rentalDoc.id, ...rentalDoc.data() });
        }
      } catch (error) {
        setError('Failed to fetch rental details');
      } finally {
        setLoading(false);
      }
    };

    fetchRental();
  }, [id]);

  const handleConditionChange = (event) => {
    const condition = event.target.value;
    setBookCondition(condition);
    if (condition !== 'good') {
      const calculatedFine = calculateDamageFine(condition, rental.bookPrice);
      setFine(calculatedFine);
    } else {
      setFine(0);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const rentalRef = doc(db, 'rentals', id);
      const bookRef = doc(db, 'books', rental.bookId);

      // Update rental status
      await updateDoc(rentalRef, {
        status: 'returned',
        returnCondition: bookCondition,
        returnComments: comments,
        fine: fine,
        actualReturnDate: new Date().toISOString()
      });

      // Update book availability
      await updateDoc(bookRef, {
        availableCopies: rental.availableCopies + 1
      });

      setSuccess('Book returned successfully');
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (err) {
      setError('Failed to process return');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!rental) return <Typography>Rental not found</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Return Book
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Book Condition</InputLabel>
              <Select
                value={bookCondition}
                onChange={handleConditionChange}
                label="Book Condition"
              >
                <MenuItem value="good">Good</MenuItem>
                <MenuItem value="slight">Slightly Damaged</MenuItem>
                <MenuItem value="moderate">Moderately Damaged</MenuItem>
                <MenuItem value="severe">Severely Damaged</MenuItem>
                <MenuItem value="lost">Lost</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Additional Comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </Grid>

          {fine > 0 && (
            <Grid item xs={12}>
              <Alert severity="warning">
                Fine for damage: ₹{fine}
              </Alert>
            </Grid>
          )}

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                fullWidth
              >
                Confirm Return
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/profile')}
                fullWidth
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ReturnBook; 