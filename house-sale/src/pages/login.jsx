import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'
import { Button, TextField, Box, Typography } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import config from '../../supabase_config.json';

const supabase_url = config.supabase_url;
const anon_key = config.anon_key;
const supabase = createClient(supabase_url, anon_key)

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) {
            alert(error.message);
        } else {
            alert('Login successful');
            navigate('/');
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
                endIcon={<LoginOutlinedIcon />}
                onClick={handleLogin}
                sx={{ mt: 2 }}
            >
                Login
            </Button>
            <Button
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