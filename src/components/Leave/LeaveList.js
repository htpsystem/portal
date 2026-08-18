import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  Chip,
  Button,
  Stack
} from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';

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

  const getStatusChip = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <Chip label="Approved" color="success" size="small" />;
      case 'rejected':
        return <Chip label="Rejected" color="error" size="small" />;
      case 'pending':
      default:
        return <Chip label="Pending" color="warning" size="small" />;
    }
  };

  return (
    <Card elevation={1} sx={{ borderRadius: 2,my: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          <EventNoteIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Leave Requests
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {leaves.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No leave requests found.
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Start Date</strong></TableCell>
                <TableCell><strong>End Date</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                {isAdmin && <TableCell><strong>Actions</strong></TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {leaves.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>{leave.start_date}</TableCell>
                  <TableCell>{leave.end_date}</TableCell>
                  <TableCell>{getStatusChip(leave.status)}</TableCell>
                  {isAdmin && (
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => handleUpdateStatus(leave.id, 'approved')}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleUpdateStatus(leave.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default LeaveList;
