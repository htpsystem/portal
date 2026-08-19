import React, { useContext } from 'react';
import ShiftForm from '../components/Shifts/ShiftForm';
import AttendanceSummary from '../components/Dashboard/AttendanceSummary';
import ExceptionSummary from '../components/Dashboard/ExceptionSummary';
import LeaveSummary from '../components/Dashboard/LeaveSummary';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import Logout from '../components/Auth/Logout';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { UserContext, UserProvider } from '../context/UserContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [ data, setData ] = React.useState({
    attendance: [],
    exceptions: [],
    leaves: []
  });

  const fetchData = async () => {
    try {
      if (!user || !user.id) {
        console.error('User ID is not available. Cannot fetch data.');
        return;
      }

      const [attendanceRes, exceptionsRes, leavesRes] = await Promise.all([
        API.get(`/attendance/2`),
        API.get('/exceptions'),
        API.get('/leaves')
      ]);

      const [attendanceData, exceptionsData, leavesData] = await Promise.all([
        attendanceRes.json(),
        exceptionsRes.json(),
        leavesRes.json()
      ]);

      setData({
        attendance: attendanceData,
        exceptions: exceptionsData,
        leaves: leavesData
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [user]);

  return <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Typography
      variant="h5"
      sx={{ backgroundColor: '#1976d2bd', color: 'white', py: 1, px: 2, borderRadius: 1, my: 4, textAlign: 'center', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      Admin Dashboard
      <Button sx={{ backgroundColor: 'white' }} p={1} variant='outlined' onClick={ () => Logout() }>
        Log Out
      </Button>
    </Typography>
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <ShiftForm />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <AttendanceSummary data={ data.attendance } />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <ExceptionSummary data={ data.exceptions } />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <LeaveSummary data={ data.leaves } />
        </Paper>
      </Grid>
    </Grid>
  </Container>
};

export default AdminDashboard;
