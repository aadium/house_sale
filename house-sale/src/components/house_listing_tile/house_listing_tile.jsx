import { Button, Card, CardContent, Typography } from '@mui/material';

function HouseListingTile({ houseAd }) {
    return (
        <Card style={{ border: '2px solid black', boxShadow: '0px 0px 0px 0px' }}>
            <CardContent>
                <Typography variant="h6">Address: {houseAd.city}, {houseAd.state}, {houseAd.postal_code}</Typography>
                <Typography variant="body1">Price: {houseAd.price_in_usd} USD</Typography>
                <Typography variant="body1">Area: {houseAd.house_area + houseAd.basement_area} sq.ft</Typography>
                <Typography variant="body1">Date added: {new Date(houseAd.date).toLocaleDateString()}</Typography>
                <Button variant="contained" style={{ backgroundColor: '#000000', width: '100%', marginBottom: '-10px', marginTop: '10px', boxShadow: '0px 0px 0px 0px' }} onClick={() => navigate(`/house/${houseAd.id}`)}>View</Button>
            </CardContent>
        </Card>
    )
}

export default HouseListingTile;