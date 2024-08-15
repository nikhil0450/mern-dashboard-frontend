import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#3f51b5'  }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
         <b>
          MERN Dashboard
          </b> 
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
