import { Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HouseListingTile({ houseAd }) {
    const navigate = useNavigate();
    return (
        <Card style={{ border: '2px solid black', boxShadow: '0px 0px 0px 0px' }}>
            <CardContent>
                <img src="https://via.placeholder.com/300" alt="House" style={{ width: '100%', height: '220px' }} />
                <Typography variant="h6">{houseAd.city}, {houseAd.state}, {houseAd.postal_code}</Typography>
                <Typography variant="body1">Bedrooms: {houseAd.bedrooms}</Typography>
                <Typography variant="body1">Bathrooms: {houseAd.bathrooms}</Typography>
                <Typography variant="body1">Area: {houseAd.living_area} sqft</Typography>
                <Typography variant="body1">Price: {houseAd.price} USD</Typography>
                <Button variant="contained" style={{ backgroundColor: '#000000', width: '100%', marginBottom: '-10px', marginTop: '10px', boxShadow: '0px 0px 0px 0px' }} onClick={() => navigate(`/house/${houseAd.id}`)}>View</Button>
            </CardContent>
        </Card>
    )
}

export default HouseListingTile;