import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Badge
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          Book Rental
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/books"
          >
            Books
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/coming-soon"
          >
            Coming Soon
          </Button>

          {currentUser ? (
            <>
              <IconButton
                color="inherit"
                component={RouterLink}
                to="/cart"
              >
                <Badge badgeContent={cart.length} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton
                color="inherit"
                onClick={handleMenu}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate('/profile');
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={RouterLink}
                to="/login"
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/signup"
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 