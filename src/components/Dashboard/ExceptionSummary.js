import React from 'react';
import { Pie } from 'react-chartjs-2';

const ExceptionSummary = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.reason),
    datasets: [
      {
        label: 'Exceptions',
        data: data.map(d => d.count),
        backgroundColor: ['orange', 'red', 'blue', 'purple'],
      },
    ],
  };

  return (
    <div>
      <h3>Exception Summary</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default ExceptionSummary;
