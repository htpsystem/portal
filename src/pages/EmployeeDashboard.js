import React from 'react';
import ShiftList from '../components/Shifts/ShiftList';
import CheckIn from '../components/Attendance/CheckIn';
import CheckOut from '../components/Attendance/CheckOut';
import AttendanceHistory from '../components/Attendance/AttendanceHistory';
import ExceptionForm from '../components/Exceptions/ExceptionForm';
import ExceptionList from '../components/Exceptions/ExceptionList';
import LeaveForm from '../components/Leave/LeaveForm';
import LeaveList from '../components/Leave/LeaveList';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import Logout from '../components/Auth/Logout';
import { UserContext } from '../context/UserContext';

const EmployeeDashboard = () => {
  const { user } = React.useContext(UserContext);

  if (!user || !user.id) {
    return
  }

  return (
    <Container sx={{ mt: 4, width: '70%' }}>

<Typography 
  variant="h5" 
  sx={{ backgroundColor: '#1976d2bd', color: 'white', py:1,px:2, borderRadius: 1, mb: 4, textAlign: 'center', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
>
  Employee Dashboard
  <Button sx={{backgroundColor:'white'}} p={1} variant='outlined' onClick={ () => Logout() }>
    Log Out
  </Button>
</Typography>    
  <ShiftList userId={user?.id} />
      <CheckIn />
      <CheckOut />
      <AttendanceHistory userId={user?.id} />
      <ExceptionForm />
      <ExceptionList userId={user?.id} />
      <LeaveForm />
      <LeaveList userId={user?.id} isAdmin={false} />
    </Container>
  );
};

export default EmployeeDashboard;
