import { Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HouseListingTile({ houseAd }) {
    const navigate = useNavigate();
    const getHouseImage = (id) => {
        try {
            return `https://tfhmlygvxqshejdqkmlz.supabase.co/storage/v1/object/public/house-pics/${id}/house_picture`
        } catch (error) {
            return 'https://via.placeholder.com/300'
        }
    }
    return (
        <Card style={{ border: '2px solid black', boxShadow: '0px 0px 0px 0px' }}>
            <CardContent>
                <img src={getHouseImage(houseAd.id)} alt="House" style={{ width: '100%', height: '220px' }} />
                <Typography variant="h6">{houseAd.city}, {houseAd.state}, {houseAd.postal_code}</Typography>
                <Typography variant="body1">Bedrooms: {houseAd.bedrooms}</Typography>
                <Typography variant="body1">Bathrooms: {houseAd.bathrooms}</Typography>
                <Typography variant="body1">Area: {houseAd.house_area} sqft</Typography>
                <Typography variant="body1">Price: {houseAd.price_in_usd} USD</Typography>
                <Button variant="contained" style={{ backgroundColor: '#000000', width: '100%', marginBottom: '-10px', marginTop: '10px', boxShadow: '0px 0px 0px 0px' }} onClick={() => navigate(`/house/${houseAd.id}`)}>View</Button>
            </CardContent>
        </Card>
    )
}

export default HouseListingTile;