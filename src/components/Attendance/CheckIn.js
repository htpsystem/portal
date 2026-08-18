import React, { useState } from 'react';
import API from '../../services/api';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

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
    <Card elevation={1} sx={{ borderRadius: 2 , mt: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Check In
        </Typography>
        <Box component="form" onSubmit={handleCheckIn} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Shift ID"
            value={shiftId}
            onChange={(e) => setShiftId(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="GPS Location"
            value={gpsLocation}
            onChange={(e) => setGpsLocation(e.target.value)}
            margin="normal"
            required
          />
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
