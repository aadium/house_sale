import { Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HouseListingTile({ houseAd }) {
    const navigate = useNavigate();
    return (
        <Card style={{ border: '2px solid black', boxShadow: '0px 0px 0px 0px' }}>
            <CardContent>
                <Typography variant="h6">Address: {houseAd.city}, {houseAd.state}, {houseAd.postal_code}</Typography>
                <Typography variant="body1">Price: {houseAd.price_in_usd} USD</Typography>
                <Button variant="contained" style={{ backgroundColor: '#000000', width: '100%', marginBottom: '-10px', marginTop: '10px', boxShadow: '0px 0px 0px 0px' }} onClick={() => navigate(`/house/${houseAd.id}`)}>View</Button>
            </CardContent>
        </Card>
    )
}

export default HouseListingTile;