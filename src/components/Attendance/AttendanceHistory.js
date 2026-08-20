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
  Divider
} from '@mui/material';

const AttendanceHistory = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await API.get(`/attendance`);
        setLogs(res.data);
      } catch (err) {
        alert('Error fetching attendance: ' + err.response.data.error);
      }
    };
    fetchLogs();
  }, []);

  return (
    <Card elevation={1} sx={{ borderRadius: 2,mt: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Attendance History
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {logs.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No attendance records found.
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Check-In</strong></TableCell>
                <TableCell><strong>Check-Out</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    {log.check_in_time
                      ? new Date(log.check_in_time).toLocaleString()
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {log.check_out_time
                      ? new Date(log.check_out_time).toLocaleString()
                      : 'N/A'}
                  </TableCell>
                  <TableCell>{log.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceHistory;
