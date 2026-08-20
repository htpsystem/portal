import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';

const ShiftList = () => {
  const [shifts, setShifts] = useState([]);

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


  return (
    <Card elevation={1} sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          My Shifts
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {shifts.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No shifts assigned yet.
          </Typography>
        ) : (
          <List>
            {shifts.map((shift) => (
              <ListItem key={shift.id} sx={{ mb: 1 }}>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center">
                      <AccessTimeIcon sx={{ mr: 1, color: 'primary.main' }} />
                      {new Date(shift.start_time).toLocaleString()} —{' '}
                      {new Date(shift.end_time).toLocaleString()}
                    </Box>
                  }
                  secondary={
                    <Box display="flex" alignItems="center" mt={0.5}>
                      <PlaceIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      {shift.location}
                    </Box>
                  }
                />
              </ListItem>

            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default ShiftList;
