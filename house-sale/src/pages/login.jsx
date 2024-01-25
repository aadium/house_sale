import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('https://house-sale-ml.onrender.com/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (response.ok) {
                alert('Login successful');
                navigate('/');
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login');
        }
    };

    const handleRegistrationNavigate = () => {
        navigate('/register');
    }

    return (
        <Box
            className='login-register-div'
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Typography variant="h3" gutterBottom>Login Page</Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                variant="contained"
                color="success"
                style={{boxShadow: '0px 0px 0px 0px'}}
                endIcon={<LoginOutlinedIcon />}
                onClick={handleLogin}
                sx={{ mt: 2 }}
            >
                Login
            </Button>
            <Button
            style={{boxShadow: '0px 0px 0px 0px'}}
                endIcon={<AppRegistrationOutlinedIcon />}
                onClick={handleRegistrationNavigate}
                sx={{ mt: 2 }}
            >
                Register
            </Button>
        </Box>
    );
}

export default LoginPage;