import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

function HouseListingPage(params) {
    const { id } = useParams();
    const [houseAdData, setHouseAdData] = useState([]);

    const getHouseImage = (id) => {
        try {
            return `https://tfhmlygvxqshejdqkmlz.supabase.co/storage/v1/object/public/house-pics/${id}/house_picture`
        } catch (error) {
            return 'https://via.placeholder.com/300'
        }
    }

    const handleFetchHouseAdDetails = async () => {
        const response = await fetch(`https://house-sale-ml.onrender.com/api/get/${id}`);
        if (response.ok) {
            const data = await response.json();
            setHouseAdData(data.data);
        } else {
            const error = await response.text();
            alert(error);
        }
    }

    useEffect(() => {
        handleFetchHouseAdDetails();
    }, []);

    return (
        <div>
            {houseAdData.map((houseAd) => (
                <Card key={houseAd.id} style={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Typography variant="h5">{houseAd.city}, {houseAd.state} [{houseAd.region}], {houseAd.postal_code}</Typography>
                        <br />
                        <Typography variant="subtitle1">
                            Condition<br />
                            <StarRatings
                                rating={houseAd.house_condition}
                                numberOfStars={5}
                                starDimension="20px"
                                starSpacing="2px"
                                starRatedColor="black"
                            />
                        </Typography>
                        <br />
                        <br />
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                                <Typography variant="subtitle1">Built in: {houseAd.built_year}</Typography>
                                <Typography variant="subtitle1">Bedrooms: {houseAd.bedrooms}</Typography>
                                <Typography variant="subtitle1">Bathrooms: {houseAd.bathrooms}</Typography>
                                <Typography variant="subtitle1">Floors: {houseAd.floors}</Typography>
                                <Typography variant="subtitle1">Schools Nearby: {houseAd.schools_nearby}</Typography>
                                <Typography variant="subtitle1">House Area: {houseAd.house_area} sq ft</Typography>
                                <Typography variant="subtitle1">Basement Area: {houseAd.basement_area} sq ft</Typography>
                                <Typography variant="subtitle1">Living Area: {houseAd.living_area} sq ft</Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <img src={getHouseImage(houseAd.id)} alt="House" style={{ width: '100%' }} />
                                <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                                    Purchase
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default HouseListingPage;