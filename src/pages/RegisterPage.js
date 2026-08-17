import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, MenuItem } from '@mui/material';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('employee');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', { name, role, department, email, password });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed: ' + err.response.data.error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>Register</Typography>
        <form onSubmit={handleRegister}>
          <TextField fullWidth label="Name" margin="normal"
                     value={name} onChange={(e) => setName(e.target.value)} required />
          <TextField select fullWidth label="Role" margin="normal"
                     value={role} onChange={(e) => setRole(e.target.value)}>
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
          <TextField fullWidth label="Department" margin="normal"
                     value={department} onChange={(e) => setDepartment(e.target.value)} />
          <TextField fullWidth label="Email" type="email" margin="normal"
                     value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField fullWidth label="Password" type="password" margin="normal"
                     value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
