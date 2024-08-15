import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import TransactionTable from './TransactionsTable';
import Statistics from './Statistics';
import BarChartComponent from './BarChart';
import Navbar from './Navbar'
import Loading from './Loading';
import axios from 'axios';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [loading, setLoading] = useState(true);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  useEffect(()=>{
    const fetchData = async () => {
      setLoading(true);
      try{
        await axios.get('https://mern-dashboard-backend-ahbj.onrender.com/transactions', {
          params: {
            month: selectedMonth,
            limit: 3,
            page: 1
          }
        });
      } catch (error) {
        console.error('Error fetching initial data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth]);

  if(loading) {
    return <Loading/>
  }

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
