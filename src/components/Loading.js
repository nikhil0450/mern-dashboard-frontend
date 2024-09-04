import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';

const Loading = () => {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    const firstTimer = setTimeout(() => {
      setMessage('Please wait...');
    }, 5000); 
    const secondTimer = setTimeout(() => {
      setMessage('Almost there...');
    }, 15000); 

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(secondTimer);
    };
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
    >
      <CircularProgress />
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;
