import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

const CheckIn = () => {
  const [shiftId, setShiftId] = useState('');
  const [shifts, setShifts] = useState([]); 
  const [gpsLocation, setGpsLocation] = useState('');

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const res = await API.get('/shifts');
        setShifts(res.data);
      } catch (err) {
        alert('Error fetching shifts: ' + (err.response?.data?.error || err.message));
      }
    };
    fetchShifts();
  }, []);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setGpsLocation(`${latitude}, ${longitude}`);
        },
        (error) => {
          alert('Error fetching location: ' + error.message);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleCheckIn = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/attendance/checkin', {
        shift_id: shiftId,
        gps_location: gpsLocation
      });
      alert('Checked in successfully! Log ID: ' + res.data.logId);
    } catch (err) {
      alert('Error checking in: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <Card elevation={1} sx={{ borderRadius: 2, mt: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Check In
        </Typography>
        <Box component="form" onSubmit={handleCheckIn} sx={{ mt: 2 }}>
          <Select
            fullWidth
            value={shiftId}
            onChange={(e) => setShiftId(e.target.value)}
            displayEmpty
            required
          >
            <MenuItem value="">
              <em>Select Shift</em>
            </MenuItem>
            {shifts.map((shift) => (
              <MenuItem key={shift.id} value={shift.id}>
                {new Date(shift.start_time).toLocaleString()} — {new Date(shift.end_time).toLocaleString()} ({shift.location})
              </MenuItem>
            ))}
          </Select>
          <Box p={1} sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              sx={{ width: '60%' }}
              label="GPS Location"
              value={gpsLocation}
              margin="normal"
              required
              InputProps={{
                readOnly: true,
              }}
            />

            <Button
              variant="outlined"
              color="secondary"
              onClick={handleGetLocation}
              sx={{ mt: 2, ml: 2, p: 2 }}
            >
              Get Current Location
            </Button>
          </Box>


          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<LoginIcon />}
            sx={{ mt: 2 }}
          >
            Check In
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CheckIn;
