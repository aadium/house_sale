"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HouseListingTile from './components/house_listing_tile';
import Header from './components/header';

const HomePage: React.FC = () => {
  const router = useRouter();
  const [houseAdsList, setHouseAdsList] = useState<HouseAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleFetchHouseAds = async () => {
    const response = await fetch('/api/data/get');
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setHouseAdsList(data.data);
    } else {
      const error = await response.text();
      alert(error);
    }
    setLoading(false);
  };

  const checkLogin = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
  };

  useEffect(() => {
    checkLogin();
    handleFetchHouseAds();
    setDarkMode(JSON.parse(localStorage.getItem('darkMode') || 'false'));
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {houseAdsList.map((houseAd) => (
              <div key={houseAd.id}>
                <HouseListingTile houseAd={houseAd} darkMode={darkMode} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;