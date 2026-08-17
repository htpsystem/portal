import React, { useEffect, useState } from 'react';
import API from '../services/api';
import AttendanceSummary from '../components/Dashboard/AttendanceSummary';
import ExceptionSummary from '../components/Dashboard/ExceptionSummary';
import LeaveSummary from '../components/Dashboard/LeaveSummary';

const Dashboard = () => {
  const [attendance, setAttendance] = useState([]);
  const [exceptions, setExceptions] = useState([]);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const att = await API.get('/dashboard/attendance');
      const exc = await API.get('/dashboard/exceptions');
      const lev = await API.get('/dashboard/leaves');
      setAttendance(att.data);
      setExceptions(exc.data);
      setLeaves(lev.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <AttendanceSummary data={attendance} />
      <ExceptionSummary data={exceptions} />
      <LeaveSummary data={leaves} />
    </div>
  );
};

export default Dashboard;
