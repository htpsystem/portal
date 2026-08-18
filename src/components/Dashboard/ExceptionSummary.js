import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Card, CardContent, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExceptionSummary = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.reason),
    datasets: [
      {
        label: 'Exceptions',
        data: data.map(d => d.count),
        backgroundColor: ['#ff9800', '#f44336', '#2196f3', '#9c27b0'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Exception Summary' },
    },
  };

  return (
    <Card elevation={0} sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Exception Summary
        </Typography>
        <Pie data={chartData} options={options} />
      </CardContent>
    </Card>
  );
};

export default ExceptionSummary;
