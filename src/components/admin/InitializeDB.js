import React, { useState } from 'react';
import { Button, Typography, Box, Alert } from '@mui/material';
import { initializeFirestore } from '../../utils/initializeFirestore';

function InitializeDB() {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleInitialize = async () => {
    try {
      setStatus('Initializing...');
      await initializeFirestore();
      setStatus('Database initialized successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Initialize Database
      </Typography>
      <Button 
        variant="contained" 
        onClick={handleInitialize}
        disabled={status === 'Initializing...'}
      >
        Initialize Firestore Collections
      </Button>
      {status && <Alert severity="success" sx={{ mt: 2 }}>{status}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
}

export default InitializeDB; 