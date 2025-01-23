import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const { currentUser, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    phone: currentUser.phone || '',
    address: currentUser.address || ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    setSuccess('');

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, formData);
      setSuccess('Profile updated successfully');
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Edit Profile
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 3 }}
          >
            Save Changes
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default EditProfile; 