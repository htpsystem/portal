import React, { useState } from 'react';
import API from '../../services/api';

const LeaveForm = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/leave', { start_date: startDate, end_date: endDate });
      alert('Leave request submitted!');
    } catch (err) {
      alert('Error submitting leave: ' + err.response.data.error);
    }
  };

  return (
    <div>
      <h3>Apply for Leave</h3>
      <form onSubmit={handleSubmit}>
        <input type="date" value={startDate}
               onChange={(e) => setStartDate(e.target.value)} required />
        <input type="date" value={endDate}
               onChange={(e) => setEndDate(e.target.value)} required />
        <button type="submit">Submit Leave</button>
      </form>
    </div>
  );
};

export default LeaveForm;
