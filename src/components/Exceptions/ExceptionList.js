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
  Chip
} from '@mui/material';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ExceptionList = ({ userId }) => {
  const [exceptions, setExceptions] = useState([]);

  useEffect(() => {
    const fetchExceptions = async () => {
      try {
        const res = await API.get(`/exceptions/${userId}`);
        setExceptions(res.data);
      } catch (err) {
        alert('Error fetching exceptions: ' + err.response.data.error);
      }
    };
    fetchExceptions();
  }, [userId]);

  // Color-coded chip for reason
  const getReasonChip = (reason) => {
    switch (reason.toLowerCase()) {
      case 'late':
        return <Chip label="Late" color="warning" size="small" />;
      case 'missed':
        return <Chip label="Missed" color="error" size="small" />;
      case 'overtime':
        return <Chip label="Overtime" color="success" size="small" />;
      default:
        return <Chip label={reason} size="small" />;
    }
  };

  return (
    <Card elevation={3} sx={{ borderRadius: 2, mt: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {/* <ErrorOutlineIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> */}
          Exceptions
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {exceptions.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No exceptions logged.
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Reason</strong></TableCell>
                <TableCell><strong>Comments</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exceptions.map((exc) => (
                <TableRow key={exc.id}>
                  <TableCell>{getReasonChip(exc.reason)}</TableCell>
                  <TableCell>{exc.comments || '-'}</TableCell>
                  <TableCell>
                    {new Date(exc.created_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default ExceptionList;
