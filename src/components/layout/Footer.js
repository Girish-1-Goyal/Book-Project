import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Book Rental System
            </Typography>
            <Typography variant="body2">
              Making education accessible through affordable book rentals.
              Your one-stop solution for academic and competitive exam books.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/books" color="inherit" display="block" sx={{ mb: 1 }}>
              Browse Books
            </Link>
            <Link component={RouterLink} to="/coming-soon" color="inherit" display="block" sx={{ mb: 1 }}>
              Coming Soon
            </Link>
            <Link component={RouterLink} to="/about" color="inherit" display="block" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link component={RouterLink} to="/contact" color="inherit" display="block" sx={{ mb: 1 }}>
              Contact Us
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <Typography variant="body2" paragraph>
              123 Book Street, Reading Avenue
              <br />
              Library City, 12345
            </Typography>
            <Typography variant="body2" paragraph>
              Email: support@bookrental.com
              <br />
              Phone: +1 234 567 8900
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Book Rental System. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer; 