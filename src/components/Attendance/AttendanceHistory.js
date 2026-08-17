import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const AttendanceHistory = ({ userId }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await API.get(`/attendance/${userId}`);
        setLogs(res.data);
      } catch (err) {
        alert('Error fetching attendance: ' + err.response.data.error);
      }
    };
    fetchLogs();
  }, [userId]);

  return (
    <div>
      <h3>Attendance History</h3>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            Check-in: {log.check_in_time ? new Date(log.check_in_time).toLocaleString() : 'N/A'} | 
            Check-out: {log.check_out_time ? new Date(log.check_out_time).toLocaleString() : 'N/A'} | 
            Status: {log.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceHistory;
