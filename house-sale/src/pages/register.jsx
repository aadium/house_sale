import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'
import { Button, TextField, Box, Typography } from '@mui/material';
import { InputAdornment } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import config from '../../supabase_config.json';

const supabase_url = config.supabase_url;
const anon_key = config.anon_key;
const supabase = createClient(supabase_url, anon_key)

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [full_name, setFullName] = useState('');
    const [dob, setDob] = useState(new Date(2000, 0, 1));

    const navigate = useNavigate();

    const handleRegister = async () => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                name: full_name,
                dob: dob,
            }
        })
        if (error) {
            alert(error.message)
        } else {
            alert('Register successful')
            navigate('/')
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