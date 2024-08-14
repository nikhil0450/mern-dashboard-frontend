import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = ({ selectedMonth = 'March' }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get('https://mern-dashboard-backend-ahbj.onrender.com/transactions/chart', {
          params: { month: selectedMonth }
        });
        const data = response.data.priceDistribution;

        const labels = data.map(item => item._id);
        const counts = data.map(item => item.count);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Count',
              data: counts,
              backgroundColor: '#8884d8',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching chart data', error);
      }
    };

    fetchChartData();
  }, [selectedMonth]); 

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += context.parsed.y;
                  }
                  return label;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Month',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Count',
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChartComponent;
