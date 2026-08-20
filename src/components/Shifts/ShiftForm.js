import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Select,
  MenuItem
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const ShiftForm = () => {
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([]);   // list of users for dropdown
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [location, setLocation] = useState('');

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get('/users/');   // adjust endpoint to your backend
        console.log(res);
        
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users', err);
      }
    };
    fetchUsers();
  }, []);

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
      setUserId('');
      setStartTime(null);
      setEndTime(null);
      setLocation('');
    } catch (err) {
      alert('Error creating shift: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <Card elevation={0} sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Create Shift
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Select
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              displayEmpty
              fullWidth
              required
            >
              <MenuItem value="">
                <em>Select User</em>
              </MenuItem>
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name} ({user.id})
                </MenuItem>
              ))}
            </Select>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Start Time"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
              <DateTimePicker
                label="End Time"
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </LocalizationProvider>

            <TextField
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              fullWidth
            />

            <Button type="submit" variant="contained" color="primary">
              Create Shift
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default ShiftForm;
