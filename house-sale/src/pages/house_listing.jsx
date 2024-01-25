import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function HouseListingPage(params) {
    const { id } = useParams();
    const [houseAdData, setHouseAdData] = useState([]);

    useEffect(() => {
        handleFetchHouseAdDetails();
    }, [])

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
    return (
        <div>
            <h1>House Listing Page</h1>
            <p>House ID: {id}</p>
            {houseAdData.map((houseAd) => (
                <div key={houseAd.id}>
                    <p>House Price: {houseAd.price_in_usd}</p>
                    <p>House Address: {houseAd.city}, {houseAd.state}, {houseAd.postal_code}</p>
                </div>
            ))}
        </div>
    )
}

export default HouseListingPage;