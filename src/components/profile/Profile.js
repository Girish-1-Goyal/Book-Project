import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Box,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { currentUser } = useAuth();
  const [activeRentals, setActiveRentals] = useState([]);
  const [rentalHistory, setRentalHistory] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const rentalsRef = collection(db, 'rentals');
        const q = query(rentalsRef, where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        
        const active = [];
        const history = [];
        
        querySnapshot.forEach((doc) => {
          const rental = { id: doc.id, ...doc.data() };
          if (rental.status === 'active') {
            active.push(rental);
          } else {
            history.push(rental);
          }
        });

        setActiveRentals(active);
        setRentalHistory(history);
      } catch (error) {
        console.error('Error fetching rentals:', error);
      }
    };

    fetchRentals();
  }, [currentUser]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const RentalList = ({ rentals }) => (
    <Box sx={{ mt: 2 }}>
      {rentals.map((rental) => (
        <Paper key={rental.id} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <img
                src={rental.imageUrl}
                alt={rental.title}
                style={{ width: '100%', borderRadius: '4px' }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h6">{rental.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                Rental Duration: {rental.duration} weeks
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start Date: {new Date(rental.startDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Return Date: {new Date(rental.returnDate).toLocaleDateString()}
              </Typography>
              {rental.status === 'active' && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate(`/return-book/${rental.id}`)}
                >
                  Return Book
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      ))}
      {rentals.length === 0 && (
        <Typography align="center" color="text.secondary">
          No rentals found
        </Typography>
      )}
    </Box>
  );

  return (
    <Container sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          <Typography variant="body1">
            Name: {currentUser.name}
          </Typography>
          <Typography variant="body1">
            Email: {currentUser.email}
          </Typography>
          <Typography variant="body1">
            User Type: {currentUser.userType}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/edit-profile')}
            sx={{ mt: 2 }}
          >
            Edit Profile
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ width: '100%' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Active Rentals" />
            <Tab label="Rental History" />
          </Tabs>
          {tabValue === 0 && <RentalList rentals={activeRentals} />}
          {tabValue === 1 && <RentalList rentals={rentalHistory} />}
        </Box>
      </Paper>
    </Container>
  );
}

export default Profile; 