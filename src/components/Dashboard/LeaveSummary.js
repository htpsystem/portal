import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const LeaveSummary = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.status),
    datasets: [
      {
        label: 'Leave Requests',
        data: data.map(d => d.count),
        backgroundColor: ['green', 'yellow', 'red'],
      },
    ],
  };

  return (
    <div>
      <h3>Leave Summary</h3>
      <Doughnut data={chartData} />
    </div>
  );
};

export default LeaveSummary;
