import React from 'react';
import ShiftForm from '../components/Shifts/ShiftForm';
import AttendanceSummary from '../components/Dashboard/AttendanceSummary';
import ExceptionSummary from '../components/Dashboard/ExceptionSummary';
import LeaveSummary from '../components/Dashboard/LeaveSummary';

const AdminDashboard = () => (
  <div>
    <h2>Admin Dashboard</h2>
    <ShiftForm />
    <AttendanceSummary />
    <ExceptionSummary />
    <LeaveSummary />
  </div>
);

export default AdminDashboard;
