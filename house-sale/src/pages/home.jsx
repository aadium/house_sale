import { createClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom';
import config from '../../supabase_config.json';
import '../App.css';
import { useEffect, useState } from 'react';

const supabase_url = config.supabase_url;
const anon_key = config.anon_key;
const supabase = createClient(supabase_url, anon_key)

function HomePage() {
    const navigate = useNavigate();
    const [houseAdsList, setHouseAdsList] = useState([]);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert(error.message);
        } else {
            alert('Logout successful');
            navigate('/login');
        }
    }

    useEffect(() => {
        handleFetchHouseAds();
    }, [])

    const handleFetchHouseAds = async () => {
        const { data, error } = await supabase
            .from('houses_for_sale')
            .select()
        if (error) {
            alert(error.message);
        } else {
            setHouseAdsList(data);
            console.log(data);
        }
    }

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default HomePage;