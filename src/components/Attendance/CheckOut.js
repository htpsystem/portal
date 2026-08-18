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
import LogoutIcon from '@mui/icons-material/Logout';

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
    <Card elevation={1} sx={{ borderRadius: 2,mt: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Check Out
        </Typography>
        <Box component="form" onSubmit={handleCheckOut} sx={{ mt: 2 }}>
          <TextField
            label="Log ID"
            value={logId}
            onChange={(e) => setLogId(e.target.value)}
            margin="normal"
            fullWidth
            display="block"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<LogoutIcon />}
            sx={{ mt: 2 }}
          >
            Check Out
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CheckOut;
