import { createClient } from '@supabase/supabase-js'
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import config from '../../supabase_config.json';
import '../App.css';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, tableCellClasses , TableContainer, TableHead, TableRow } from '@mui/material';

const supabase_url = config.supabase_url;
const anon_key = config.anon_key;
const supabase = createClient(supabase_url, anon_key)

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.grey[1000],
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        backgroundColor: theme.palette.grey[900],
        color: theme.palette.common.white,
    },
}));

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
                            <StyledTableCell>House ID</StyledTableCell>
                            <StyledTableCell>Address</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                            <StyledTableCell>Area</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {houseAdsList.map((houseAd) => (
                            <TableRow key={houseAd.id}>
                                <StyledTableCell>{houseAd.id}</StyledTableCell>
                                <StyledTableCell>{houseAd.city}, {houseAd.state}, {houseAd.postal_code}</StyledTableCell>
                                <StyledTableCell>{houseAd.price_in_usd}</StyledTableCell>
                                <StyledTableCell>{houseAd.house_area + houseAd.basement_area}</StyledTableCell>
                                <StyledTableCell>{houseAd.date}</StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            <Button variant="contained" color="error" endIcon={<LogoutOutlinedIcon />} onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default HomePage;