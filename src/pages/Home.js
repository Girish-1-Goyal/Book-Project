import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Alert
} from '@mui/material';
import { collection, query, limit, getDocs, where, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import HeroImage from '../assets/images/hero-image.jpg';

function Home() {
  const [topBooks, setTopBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        // Create composite index for this query
        const q = query(
          collection(db, 'books'),
          orderBy('rating', 'desc'),
          limit(6)
        );
        
        const querySnapshot = await getDocs(q);
        const books = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          rating: doc.data().rating || 0,
          reviewCount: doc.data().reviewCount || 0,
          imageUrl: doc.data().imageUrl || '/placeholder-image.jpg'
        }));
        
        setTopBooks(books);
      } catch (error) {
        console.error('Error fetching top books:', error);
        setError('Failed to load top books');
      }
    };

    const fetchCategories = async () => {
      try {
        // Predefined categories with initial counts
        const categoriesData = [
          { id: '10th', name: 'Class 10th', count: 0 },
          { id: '11th', name: 'Class 11th', count: 0 },
          { id: '12th', name: 'Class 12th', count: 0 },
          { id: 'iit', name: 'IIT JEE', count: 0 },
          { id: 'neet', name: 'NEET', count: 0 },
          { id: 'upsc', name: 'UPSC', count: 0 }
        ];

        // Fetch counts in parallel using Promise.all
        const countPromises = categoriesData.map(async (category) => {
          const q = query(
            collection(db, 'books'),
            where('category', '==', category.id)
          );
          const querySnapshot = await getDocs(q);
          return { ...category, count: querySnapshot.size };
        });

        const categoriesWithCounts = await Promise.all(countPromises);
        setCategories(categoriesWithCounts);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories');
      }
    };

    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchTopBooks(), fetchCategories()]);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Cleanup function
    return () => {
      setTopBooks([]);
      setCategories([]);
    };
  }, []);

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '500px',
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)'
          }
        }}
      >
        <Container sx={{ position: 'relative', color: 'white' }}>
          <Typography variant="h2" gutterBottom>
            Rent Books, Expand Knowledge
          </Typography>
          <Typography variant="h5" paragraph>
            Access thousands of educational books at affordable prices
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/books')}
          >
            Browse Books
          </Button>
        </Container>
      </Box>

      {/* Categories Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Browse by Category
        </Typography>
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item key={category.id} xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': { transform: 'scale(1.02)' },
                  transition: 'transform 0.2s'
                }}
                onClick={() => navigate(`/books?category=${category.id}`)}
              >
                <Typography variant="h6">{category.name}</Typography>
                <Typography color="text.secondary">
                  {category.count} Books Available
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Top Books Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container>
          <Typography variant="h4" gutterBottom align="center">
            Top Rated Books
          </Typography>
          <Grid container spacing={4}>
            {topBooks.map((book) => (
              <Grid item key={book.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    '&:hover': { transform: 'scale(1.02)' },
                    transition: 'transform 0.2s'
                  }}
                  onClick={() => navigate(`/books/${book.id}`)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={book.imageUrl}
                    alt={book.title}
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      By {book.author}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Rating value={book.rating} readOnly precision={0.5} />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({book.reviewCount} reviews)
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default Home;