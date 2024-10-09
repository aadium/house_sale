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
    const response = await fetch(`http://localhost:3000/api/data/get/${id}`);
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
      stars.push(i <= rating ? <FaStar key={i} className="text-yellow-500 text-2xl" /> : <FaRegStar key={i} className="text-yellow-500 text-2xl" />);
    }
    return stars;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="p-8">
        {houseAdData ? (
          <div className={`shadow-lg rounded-lg mb-8 p-6 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
            <h2 className="text-3xl font-bold mb-4">{houseAdData.city}, {houseAdData.state}, {houseAdData.postal_code}</h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Condition</h3>
              <div className="flex items-center">
                {renderStars(houseAdData.condition)}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <p className="text-lg"><span className="font-semibold">Built in:</span> {houseAdData.built_year}</p>
                <p className="text-lg"><span className="font-semibold">Bedrooms:</span> {houseAdData.bedrooms}</p>
                <p className="text-lg"><span className="font-semibold">Bathrooms:</span> {houseAdData.bathrooms}</p>
                <p className="text-lg"><span className="font-semibold">Floors:</span> {houseAdData.floors}</p>
                <p className="text-lg"><span className="font-semibold">Schools Nearby:</span> {houseAdData.schools_nearby}</p>
                <p className="text-lg"><span className="font-semibold">Living Area:</span> {houseAdData.living_area} sq ft</p>
              </div>
              <div className="flex flex-col items-center">
                <img src={getHouseImage(houseAdData.id)} alt="House" className="w-full rounded-lg mb-4" />
                <button className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition duration-200">
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