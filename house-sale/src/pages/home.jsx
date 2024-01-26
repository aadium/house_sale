import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import '../App.css';
import { useEffect, useState } from 'react';
import HouseListingTile from '../components/house_listing_tile/house_listing_tile';
import { Grid } from '@mui/material';

function HomePage() {
    const navigate = useNavigate();
    const [houseAdsList, setHouseAdsList] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    const handleLogout = async () => {
        const response = await fetch('https://house-sale-ml.onrender.com/api/auth/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            alert('Logout successful');
            navigate('/login');
        } else {
            const error = await response.text();
            alert(error);
        }
    }

    const handleFetchHouseAds = async () => {
        const response = await fetch('https://house-sale-ml.onrender.com/api/get');
        if (response.ok) {
            const data = await response.json();
            setHouseAdsList(data.data);
        } else {
            const error = await response.text();
            alert(error);
        }
        setLoading(false); // Set loading state to false after data is loaded
    }

    useEffect(() => {
        handleFetchHouseAds();
    }, [])

    return (
        <div>
            <h1>Welcome</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Grid container spacing={3}>
                    {houseAdsList.map((houseAd) => (
                        <Grid item xs={12} sm={6} md={4} key={houseAd.id}>
                            <HouseListingTile houseAd={houseAd} />
                        </Grid>
                    ))}
                </Grid>
            )}
            <br/>
            <Button variant="contained" style={{boxShadow: '0px 0px 0px 0px'}} color="error" endIcon={<LogoutOutlinedIcon />} onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default HomePage;