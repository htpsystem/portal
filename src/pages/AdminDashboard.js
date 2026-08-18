import React from 'react';
import ShiftForm from '../components/Shifts/ShiftForm';
import AttendanceSummary from '../components/Dashboard/AttendanceSummary';
import ExceptionSummary from '../components/Dashboard/ExceptionSummary';
import LeaveSummary from '../components/Dashboard/LeaveSummary';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Typography
      variant="h5"
      sx={{ backgroundColor: '#1976d2bd', color: 'white', py: 1, px: 2, borderRadius: 1, my: 4, textAlign: 'center', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      Admin Dashboard
      <Button sx={{ backgroundColor: 'white' }} p={1} variant='outlined'>
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
          <AttendanceSummary data={[]} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <ExceptionSummary data={[]} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <LeaveSummary data={[]} />
        </Paper>
      </Grid>
    </Grid>
  </Container>
);

export default AdminDashboard;
