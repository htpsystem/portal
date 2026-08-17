import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const ShiftList = ({ userId }) => {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const res = await API.get(`/shifts/${userId}`);
        setShifts(res.data);
      } catch (err) {
        alert('Error fetching shifts: ' + err.response.data.error);
      }
    };
    fetchShifts();
  }, [userId]);

  return (
    <div>
      <h3>My Shifts</h3>
      <ul>
        {shifts.map((shift) => (
          <li key={shift.id}>
            {new Date(shift.start_time).toLocaleString()} - {new Date(shift.end_time).toLocaleString()} @ {shift.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShiftList;
