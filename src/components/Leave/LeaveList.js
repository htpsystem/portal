import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const LeaveList = ({ userId, isAdmin }) => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await API.get(`/leave/${userId}`);
        setLeaves(res.data);
      } catch (err) {
        alert('Error fetching leaves: ' + err.response.data.error);
      }
    };
    fetchLeaves();
  }, [userId]);

  const handleUpdateStatus = async (id, status) => {
    try {
      await API.put(`/leave/${id}`, { status });
      alert(`Leave ${status}`);
      setLeaves(leaves.map(l => l.id === id ? { ...l, status } : l));
    } catch (err) {
      alert('Error updating leave: ' + err.response.data.error);
    }
  };

  return (
    <div>
      <h3>Leave Requests</h3>
      <ul>
        {leaves.map((leave) => (
          <li key={leave.id}>
            {leave.start_date} → {leave.end_date} | Status: {leave.status}
            {isAdmin && (
              <>
                <button onClick={() => handleUpdateStatus(leave.id, 'approved')}>Approve</button>
                <button onClick={() => handleUpdateStatus(leave.id, 'rejected')}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveList;
