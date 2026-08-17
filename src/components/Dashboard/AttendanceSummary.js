import React from 'react';
import { Bar } from 'react-chartjs-2';

const AttendanceSummary = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.name),
    datasets: [
      {
        label: 'On-Time',
        data: data.map(d => d.on_time),
        backgroundColor: 'green',
      },
      {
        label: 'Late',
        data: data.map(d => d.late),
        backgroundColor: 'orange',
      },
      {
        label: 'Missed',
        data: data.map(d => d.missed),
        backgroundColor: 'red',
      },
    ],
  };

  return (
    <div>
      <h3>Attendance Summary</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default AttendanceSummary;
