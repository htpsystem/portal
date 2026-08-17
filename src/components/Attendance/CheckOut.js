import React, { useState } from 'react';
import API from '../../services/api';

const CheckOut = () => {
  const [logId, setLogId] = useState('');

  const handleCheckOut = async (e) => {
    e.preventDefault();
    try {
      await API.post('/attendance/checkout', { log_id: logId });
      alert('Checked out successfully!');
    } catch (err) {
      alert('Error checking out: ' + err.response.data.error);
    }
  };

  return (
    <div>
      <h3>Check Out</h3>
      <form onSubmit={handleCheckOut}>
        <input type="text" placeholder="Log ID" value={logId}
               onChange={(e) => setLogId(e.target.value)} required />
        <button type="submit">Check Out</button>
      </form>
    </div>
  );
};

export default CheckOut;
