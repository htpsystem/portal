import React, { useState } from 'react';
import API from '../../services/api';

const ExceptionForm = () => {
  const [logId, setLogId] = useState('');
  const [reason, setReason] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/exceptions', { log_id: logId, reason, comments });
      alert('Exception logged successfully!');
    } catch (err) {
      alert('Error logging exception: ' + err.response.data.error);
    }
  };

  return (
    <div>
      <h3>Log Exception</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Attendance Log ID" value={logId}
               onChange={(e) => setLogId(e.target.value)} required />
        <input type="text" placeholder="Reason (Late, Missed, Overtime)" value={reason}
               onChange={(e) => setReason(e.target.value)} required />
        <textarea placeholder="Comments" value={comments}
                  onChange={(e) => setComments(e.target.value)} />
        <button type="submit">Submit Exception</button>
      </form>
    </div>
  );
};

export default ExceptionForm;
