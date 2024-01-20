import { createClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import config from '../../supabase_config.json';
import '../App.css';
import { useEffect, useState } from 'react';
import { Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

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
            <h2>House Ads</h2>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>House ID</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Area</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    {houseAdsList.map((houseAd) => (
                        <TableRow>
                            <TableCell>{houseAd.id}</TableCell>
                            <TableCell>{houseAd.city}, {houseAd.state}, {houseAd.postal_code}</TableCell>
                            <TableCell>{houseAd.price_in_usd}</TableCell>
                            <TableCell>{houseAd.house_area + houseAd.basement_area}</TableCell>
                            <TableCell>{houseAd.date}</TableCell>
                        </TableRow>
                    ))}
                </Table>
            </TableContainer>
            <Button variant="contained" color="error" endIcon={<LogoutOutlinedIcon />} onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default HomePage;