import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'
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
        <div className='login-register-div'>
            <h1>Register Page</h1>
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
            <input
                type="text"
                placeholder="Full Name"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
            /><br/>
            <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
            /><br/>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default RegisterPage;