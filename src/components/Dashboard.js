import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import TransactionTable from './TransactionsTable';
import Statistics from './Statistics';
import BarChartComponent from './BarChart';
import Navbar from './Navbar';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  return (
    <div>
      <Navbar/>
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TransactionTable selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Statistics selectedMonth={selectedMonth} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BarChartComponent selectedMonth={selectedMonth} />
        </Grid>
      </Grid>
    </Container>
    </div>
  );
};

export default Dashboard;
