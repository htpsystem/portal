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
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const LeaveForm = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/leave', { start_date: startDate, end_date: endDate });
      alert('Leave request submitted!');
    } catch (err) {
      alert('Error submitting leave: ' + err.response.data.error);
    }
  };

  return (
    <Card elevation={1} sx={{ borderRadius: 2, mt: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Apply for Leave
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<EventAvailableIcon />}
            sx={{ mt: 2 }}
          >
            Submit Leave
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LeaveForm;
