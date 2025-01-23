import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  Alert,
  Divider
} from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../contexts/AuthContext';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

function Contact() {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    subject: '',
    message: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      await addDoc(collection(db, 'contact_messages'), {
        ...formData,
        userId: currentUser?.uid || null,
        createdAt: new Date().toISOString()
      });
      setSuccess('Message sent successfully! We will get back to you soon.');
      setFormData({ ...formData, subject: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Contact Us
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Get in Touch
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ mr: 2 }} color="primary" />
                <Typography>
                  123 Book Street, Reading Avenue
                  <br />
                  Library City, 12345
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon sx={{ mr: 2 }} color="primary" />
                <Typography>support@bookrental.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon sx={{ mr: 2 }} color="primary" />
                <Typography>+1 234 567 8900</Typography>
              </Box>
            </Box>
            <Divider />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Our support team is available Monday to Friday, 9:00 AM to 6:00 PM
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Send us a Message
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3 }}
              >
                Send Message
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Contact; 