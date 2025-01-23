import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SchoolIcon from '@mui/icons-material/School';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';

function About() {
  const features = [
    {
      icon: <LibraryBooksIcon color="primary" />,
      title: 'Extensive Collection',
      description: 'Access to thousands of academic and competitive exam books'
    },
    {
      icon: <SchoolIcon color="primary" />,
      title: 'Academic Focus',
      description: 'Specialized collections for 10th-12th, IIT, UPSC, and NEET preparation'
    },
    {
      icon: <LocalLibraryIcon color="primary" />,
      title: 'Flexible Rentals',
      description: 'Rent books from 1 week up to 1 year with easy renewal options'
    },
    {
      icon: <PeopleIcon color="primary" />,
      title: 'User Categories',
      description: 'Special provisions for students, teachers, and other readers'
    },
    {
      icon: <SecurityIcon color="primary" />,
      title: 'Secure Platform',
      description: 'Safe and secure payment gateway with user data protection'
    }
  ];

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        About Us
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Our Mission
            </Typography>
            <Typography paragraph>
              We aim to make quality education accessible to everyone by providing
              affordable access to educational books through our innovative rental
              system. Our platform bridges the gap between students and resources,
              making learning more accessible and sustainable.
            </Typography>
            <Typography paragraph>
              Founded in 2024, Book Rental System has grown to become a trusted
              partner in the educational journey of thousands of students and
              educators across the country.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Why Choose Us?
            </Typography>
            <List>
              {features.map((feature, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    {feature.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={feature.title}
                    secondary={feature.description}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Our Impact
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', py: 2 }}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" color="primary">10K+</Typography>
                <Typography>Active Users</Typography>
              </Box>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" color="primary">50K+</Typography>
                <Typography>Books Available</Typography>
              </Box>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" color="primary">100K+</Typography>
                <Typography>Successful Rentals</Typography>
              </Box>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" color="primary">95%</Typography>
                <Typography>Satisfaction Rate</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default About; 