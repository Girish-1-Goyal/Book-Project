import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Box
} from '@mui/material';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../contexts/AuthContext';

function ComingSoon() {
  const [comingBooks, setComingBooks] = useState([]);
  const [requestTitle, setRequestTitle] = useState('');
  const [requestAuthor, setRequestAuthor] = useState('');
  const { currentUser } = useAuth();
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchComingBooks = async () => {
      try {
        const q = query(collection(db, 'books'), where('status', '==', 'coming_soon'));
        const querySnapshot = await getDocs(q);
        const books = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setComingBooks(books);
      } catch (error) {
        console.error('Error fetching coming soon books:', error);
      }
    };

    fetchComingBooks();
  }, []);

  const handleRequestBook = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'book_requests'), {
        title: requestTitle,
        author: requestAuthor,
        userId: currentUser.uid,
        userName: currentUser.name,
        status: 'pending',
        createdAt: new Date().toISOString()
      });

      setRequestTitle('');
      setRequestAuthor('');
      setSuccess('Book request submitted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error submitting book request:', error);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Coming Soon
      </Typography>

      <Grid container spacing={4}>
        {comingBooks.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <img
                src={book.imageUrl}
                alt={book.title}
                style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                By {book.author}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Expected: {new Date(book.expectedDate).toLocaleDateString()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Request a Book
        </Typography>
        {success && (
          <Typography color="success.main" sx={{ mb: 2 }}>
            {success}
          </Typography>
        )}
        <form onSubmit={handleRequestBook}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Book Title"
                value={requestTitle}
                onChange={(e) => setRequestTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Author"
                value={requestAuthor}
                onChange={(e) => setRequestAuthor(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={!requestTitle || !requestAuthor}
            >
              Submit Request
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default ComingSoon; 