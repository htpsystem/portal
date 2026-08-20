import React, { useState } from 'react';
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Paper,
  Button
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningIcon from '@mui/icons-material/Warning';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserContext } from '../context/UserContext';

import ShiftList from '../components/Shifts/ShiftList';
import CheckIn from '../components/Attendance/CheckIn';
import CheckOut from '../components/Attendance/CheckOut';
import AttendanceHistory from '../components/Attendance/AttendanceHistory';
import ExceptionForm from '../components/Exceptions/ExceptionForm';
import ExceptionList from '../components/Exceptions/ExceptionList';
import LeaveForm from '../components/Leave/LeaveForm';
import LeaveList from '../components/Leave/LeaveList';
import Logout from '../components/Auth/Logout';

const EmployeeDashboard = () => {
  const { user } = React.useContext(UserContext);
  const [tabIndex, setTabIndex] = useState(0);

  if (!user || !user.id) return null;

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container sx={{ mt: 4, width: '80%' }}>
      <Paper sx={{ p: 2, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight="bold">
          Employee Dashboard
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={() => Logout()}
        >
          Log Out
        </Button>
      </Paper>

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        sx={{ mb: 3 }}
      >
       <Tab icon={<CalendarMonthIcon />} label="Shifts" />
        <Tab icon={<AccessTimeIcon />} label="Attendance" />
        <Tab icon={<WarningIcon />} label="Exceptions" />
        <Tab icon={<BeachAccessIcon />} label="Leave" />
      </Tabs>

      <Box hidden={tabIndex !== 0}>
        <ShiftList userId={user?.id} />
      </Box>

      <Box hidden={tabIndex !== 1}>
        <CheckIn />
        <CheckOut />
        <AttendanceHistory userId={user?.id} />
      </Box>

      <Box hidden={tabIndex !== 2}>
        <ExceptionForm />
        <ExceptionList userId={user?.id} />
      </Box>

      <Box hidden={tabIndex !== 3}>
        <LeaveForm />
        <LeaveList userId={user?.id} isAdmin={false} />
      </Box>
    </Container>
  );
};

export default EmployeeDashboard;
