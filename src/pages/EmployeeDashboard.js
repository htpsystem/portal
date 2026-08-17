import React from 'react';
import ShiftList from '../components/Shifts/ShiftList';
import CheckIn from '../components/Attendance/CheckIn';
import CheckOut from '../components/Attendance/CheckOut';
import AttendanceHistory from '../components/Attendance/AttendanceHistory';
import ExceptionForm from '../components/Exceptions/ExceptionForm';
import ExceptionList from '../components/Exceptions/ExceptionList';
import LeaveForm from '../components/Leave/LeaveForm';
import LeaveList from '../components/Leave/LeaveList';
import { Container, Grid, Paper, Typography } from '@mui/material';

const EmployeeDashboard = () => {
  const userId = localStorage.getItem('userId');

  return (
    <div>
      <h2>Employee Dashboard</h2>
      <ShiftList userId={userId} />
      <CheckIn />
      <CheckOut />
      <AttendanceHistory userId={userId} />
      <ExceptionForm />
      <ExceptionList userId={userId} />
      <LeaveForm />
      <LeaveList userId={userId} isAdmin={false} />
    </div>
  );
};

export default EmployeeDashboard;
