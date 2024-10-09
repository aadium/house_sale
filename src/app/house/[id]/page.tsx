"use client";
import Header from '@/app/components/header';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const HouseListingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [houseAdData, setHouseAdData] = useState<HouseAd | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem('darkMode') || 'false');
    setDarkMode(storedDarkMode);
  }, []);

  const getHouseImage = (id: string) => {
    try {
      return `https://tfhmlygvxqshejdqkmlz.supabase.co/storage/v1/object/public/house-pics/${id}/house_picture`;
    } catch (error) {
      return 'https://via.placeholder.com/300';
    }
  };

  const handleFetchHouseAdDetails = async () => {
    const response = await fetch(`http://localhost:3000/api/data/get?id=${id}`);
    if (response.ok) {
      const data = await response.json();
      setHouseAdData(data.data);
    } else {
      const error = await response.text();
      alert(error);
    }
  };

  useEffect(() => {
    handleFetchHouseAdDetails();
  }, [id]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? <FaStar key={i} className="text-yellow-500" /> : <FaRegStar key={i} className="text-yellow-500" />);
    }
    return stars;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="p-8">
        {houseAdData ? (
          <div className={`shadow-md rounded-lg mb-6 p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-2xl font-bold mb-4">{houseAdData.city}, {houseAdData.state}, {houseAdData.postal_code}</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Condition</h3>
              <div className="flex">
                {renderStars(houseAdData.condition)}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <p className="text-lg">Built in: {houseAdData.built_year}</p>
                <p className="text-lg">Bedrooms: {houseAdData.bedrooms}</p>
                <p className="text-lg">Bathrooms: {houseAdData.bathrooms}</p>
                <p className="text-lg">Floors: {houseAdData.floors}</p>
                <p className="text-lg">Schools Nearby: {houseAdData.schools_nearby}</p>
                <p className="text-lg">Living Area: {houseAdData.living_area} sq ft</p>
              </div>
              <div>
                <img src={getHouseImage(houseAdData.id)} alt="House" className="w-full rounded-lg" />
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full">
                  Purchase
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default HouseListingPage;