import React, { useState } from 'react';
import API from '../../services/api';

const CheckIn = () => {
  const [shiftId, setShiftId] = useState('');
  const [gpsLocation, setGpsLocation] = useState('');

  const handleCheckIn = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/attendance/checkin', {
        shift_id: shiftId,
        gps_location: gpsLocation
      });
      alert('Checked in successfully! Log ID: ' + res.data.logId);
    } catch (err) {
      alert('Error checking in: ' + err.response.data.error);
    }
  };

  return (
    <div>
      <h3>Check In</h3>
      <form onSubmit={handleCheckIn}>
        <input type="text" placeholder="Shift ID" value={shiftId}
               onChange={(e) => setShiftId(e.target.value)} required />
        <input type="text" placeholder="GPS Location" value={gpsLocation}
               onChange={(e) => setGpsLocation(e.target.value)} required />
        <button type="submit">Check In</button>
      </form>
    </div>
  );
};

export default CheckIn;
