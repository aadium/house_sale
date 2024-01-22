import { createClient } from '@supabase/supabase-js'
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import config from '../../supabase_config.json';
import '../App.css';
import { useEffect, useState } from 'react';
import HouseListingTile from '../components/house_listing_tile/house_listing_tile';
import { Grid } from '@mui/material';

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
            navigate('/login');
        }
    }

    useEffect(() => {
        handleSessionCheck();
        handleFetchHouseAds();
    }, [])

    const handleSessionCheck = async () => {
        const { data, error } = await supabase.auth.getSession()
        if (data.session == null) {
            navigate('/login');
        }
    }

    const handleFetchHouseAds = async () => {
        const { data, error } = await supabase
            .from('houses_for_sale')
            .select()
            .order('id')
        if (error) {
            alert(error.message);
        } else {
            setHouseAdsList(data);
            console.log(data);
        }
    }

    return (
        <div>
            <h1>Welcome</h1>
            <Grid container spacing={3}>
                {houseAdsList.map((houseAd) => (
                    <Grid item xs={12} sm={6} md={4} key={houseAd.id}>
                        <HouseListingTile houseAd={houseAd} />
                    </Grid>
                ))}
            </Grid>
            <br/>
            <Button variant="contained" color="error" endIcon={<LogoutOutlinedIcon />} onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default HomePage;