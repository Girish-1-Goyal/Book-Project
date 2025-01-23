import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography, TextField, MenuItem } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase';
import BookCard from './BookCard';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { value: 'all', label: 'All Books' },
    { value: '10th', label: 'Class 10th' },
    { value: '11th', label: 'Class 11th' },
    { value: '12th', label: 'Class 12th' },
    { value: 'iit', label: 'IIT' },
    { value: 'upsc', label: 'UPSC' },
    { value: 'neet', label: 'NEET' }
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let booksQuery = collection(db, 'books');
        
        if (filter !== 'all') {
          booksQuery = query(booksQuery, where('category', '==', filter));
        }
        
        const querySnapshot = await getDocs(booksQuery);
        const booksData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [filter]);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search books"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            select
            label="Category"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {filteredBooks.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default BookList; 