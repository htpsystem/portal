import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Card,
  CardContent,
  Typography
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the scales and elements you need
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttendanceSummary = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.name),
    datasets: [
      {
        label: 'On-Time',
        data: data.map(d => d.on_time),
        backgroundColor: '#4caf50',
      },
      {
        label: 'Late',
        data: data.map(d => d.late),
        backgroundColor: '#ff9800',
      },
      {
        label: 'Missed',
        data: data.map(d => d.missed),
        backgroundColor: '#f44336',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { font: { size: 14 } }
      },
      title: {
        display: true,
        text: 'Attendance Summary',
        font: { size: 18, weight: 'bold' }
      },
    },
    scales: {
      x: {
        ticks: { font: { size: 12 } }
      },
      y: {
        beginAtZero: true,
        ticks: { font: { size: 12 } }
      },
    },
  };

  return (
    <Card elevation={0} sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Attendance Summary
        </Typography>
        <Bar data={chartData} options={options} />
      </CardContent>
    </Card>
  );
};

export default AttendanceSummary;
