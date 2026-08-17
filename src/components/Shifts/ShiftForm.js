import React, { useState } from 'react';
import API from '../../services/api';

const ShiftForm = () => {
  const [userId, setUserId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/shifts', {
        user_id: userId,
        start_time: startTime,
        end_time: endTime,
        location
      });
      alert('Shift created successfully!');
    } catch (err) {
      alert('Error creating shift: ' + err.response.data.error);
    }
  };

  return (
    <div>
      <h3>Create Shift</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="User ID" value={userId}
               onChange={(e) => setUserId(e.target.value)} required />
        <input type="datetime-local" value={startTime}
               onChange={(e) => setStartTime(e.target.value)} required />
        <input type="datetime-local" value={endTime}
               onChange={(e) => setEndTime(e.target.value)} required />
        <input type="text" placeholder="Location" value={location}
               onChange={(e) => setLocation(e.target.value)} required />
        <button type="submit">Create Shift</button>
      </form>
    </div>
  );
};

export default ShiftForm;
