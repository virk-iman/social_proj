import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { loginUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(formData);
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 10 }}>
            <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>Log in to Social</Typography>
                {error && <Typography color="error" variant="body2">{error}</Typography>}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal" fullWidth label="Email or Username" required
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <TextField
                        margin="normal" fullWidth label="Password" type="password" required
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 8 }}>
                        Log In
                    </Button>
                    <Typography variant="body2" align="center">
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
