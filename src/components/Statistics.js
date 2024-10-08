import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Typography, Grid } from '@mui/material';

const Statistics = ({ selectedMonth = 'March' }) => {
  const [stats, setStats] = useState({ totalSales: 0, totalSoldItems: 0, totalUnsoldItems: 0 });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('https://mern-dashboard-backend-ahbj.onrender.com/transactions/stats', {
          params: { month: selectedMonth }
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching statistics', error);
      }
    };

    fetchStatistics();
  }, [selectedMonth]);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h6">Total Sales</Typography>
          <Typography variant="h4">${stats.totalSales.toFixed(2)}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h6">Total Sold Items</Typography>
          <Typography variant="h4">{stats.totalSoldItems}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h6">Total Unsold Items</Typography>
          <Typography variant="h4">{stats.totalUnsoldItems}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Statistics;
