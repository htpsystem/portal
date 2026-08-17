import React from 'react';
import ShiftForm from '../components/Shifts/ShiftForm';
import AttendanceSummary from '../components/Dashboard/AttendanceSummary';
import ExceptionSummary from '../components/Dashboard/ExceptionSummary';
import LeaveSummary from '../components/Dashboard/LeaveSummary';
import { Container, Grid, Paper, Typography } from '@mui/material';

const AdminDashboard = () => (
  <Container maxWidth="lg">
    <Typography variant="h3" gutterBottom>Admin Dashboard</Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <ShiftForm />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <AttendanceSummary data={[]}/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <ExceptionSummary data={[]}/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <LeaveSummary data={[]}/>
        </Paper>
      </Grid>
    </Grid>
  </Container>
);

export default AdminDashboard;
