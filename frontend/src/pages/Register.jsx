import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { registerUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ fullName: '', username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 10 }}>
            <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>Sign Up for Social</Typography>
                {error && <Typography color="error" variant="body2">{error}</Typography>}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal" fullWidth label="Full Name" required
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    <TextField
                        margin="normal" fullWidth label="Username" required
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                    <TextField
                        margin="normal" fullWidth label="Email" required type="email"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <TextField
                        margin="normal" fullWidth label="Password" type="password" required
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 8 }}>
                        Sign Up
                    </Button>
                    <Typography variant="body2" align="center">
                        Already have an account? <Link to="/login">Log In</Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;
