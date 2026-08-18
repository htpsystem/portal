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
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

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
    <Card elevation={1} sx={{ borderRadius: 2, mt: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Log Exception
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Attendance Log ID"
            value={logId}
            onChange={(e) => setLogId(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Reason (Late, Missed, Overtime)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            margin="normal"
            multiline
            rows={3}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<ReportProblemIcon />}
            sx={{ mt: 2 }}
          >
            Submit Exception
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExceptionForm;
