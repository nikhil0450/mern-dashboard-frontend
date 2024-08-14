import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, FormControl, Select, MenuItem, Container, Box } from '@mui/material';

const TransactionTable = ({ selectedMonth = 'March', onMonthChange = () => {} }) => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [expandedRows, setExpandedRows] = useState(new Set());

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://mern-dashboard-backend-ahbj.onrender.com/transactions', {
          params: {
            month: selectedMonth,
            search: searchQuery,
            page: currentPage,
            limit: 3
          }
        });
        setTransactions(response.data.transactions);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching transactions', error);
      }
    };

    fetchTransactions();
  }, [selectedMonth, searchQuery, currentPage]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const handleMonthChange = (e) => {
    onMonthChange(e.target.value);
    setCurrentPage(1); 
    setSearchQuery(''); 
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleDescription = (id) => {
    setExpandedRows(prev => {
      const newExpandedRows = new Set(prev);
      if (newExpandedRows.has(id)) {
        newExpandedRows.delete(id);
      } else {
        newExpandedRows.add(id);
      }
      return newExpandedRows;
    });
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Box display="flex" flexDirection="column" alignItems="center" marginBottom="20px">
        <FormControl style={{ marginBottom: '10px' }}>
          <Select value={selectedMonth} onChange={handleMonthChange}>
            {months.map((month, index) => (
              <MenuItem key={index} value={month}>{month}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField 
          label="Search" 
          variant="outlined" 
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: '10px', width: '100%' }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sold</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell>{transaction.title}</TableCell>
                <TableCell>
                  <div className="description">
                    {expandedRows.has(transaction._id)
                      ? transaction.description
                      : transaction.description.length > 100
                        ? `${transaction.description.substring(0, 100)}...`
                        : transaction.description
                    }
                    {transaction.description.length > 100 && (
                      <Button onClick={() => toggleDescription(transaction._id)} size="small">
                        {expandedRows.has(transaction._id) ? 'Read Less' : 'Read More'}
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell>${transaction.price}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.sold ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button onClick={handlePrevPage} disabled={currentPage === 1} style={{ marginBottom: '10px' }}>Previous</Button>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
      </div>
    </Container>
  );
};

export default TransactionTable;
