import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography } from '@mui/material';
import { InputAdornment } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import axios from 'axios';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [full_name, setFullName] = useState('');
    const [dob, setDob] = useState(new Date(2000, 0, 1));

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5174/api/auth/register', {
                email: email,
                password: password,
                full_name: full_name,
                dob: dob,
            });
            alert('Register successful');
            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Box
            className='login-register-div'
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Typography variant="h4" gutterBottom>Register Page</Typography>
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
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                id="full_name"
                label="Full Name"
                name="full_name"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                id="dob"
                label="Date of Birth"
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <CalendarTodayIcon />
                        </InputAdornment>
                    ),
                }}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
            />
            <Button
                variant="contained"
                style={{boxShadow: '0px 0px 0px 0px'}}
                endIcon={<AppRegistrationOutlinedIcon />}
                onClick={handleRegister}
                sx={{ mt: 2 }}
            >
                Register
            </Button>
        </Box>
    );
}

export default RegisterPage;