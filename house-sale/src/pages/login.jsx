import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'
import Button from '@mui/material/Button';
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
        <div className='login-register-div'>
            <h1>Login Page</h1>
            <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            /><br/>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /><br/>
            <br/>
            <Button variant="contained" color="success" endIcon={<LoginOutlinedIcon />} onClick={handleLogin}>Login</Button>
            <br/>
            <Button endIcon={<AppRegistrationOutlinedIcon />} onClick={handleRegistrationNavigate}>Register</Button>
        </div>
    );
}

export default LoginPage;