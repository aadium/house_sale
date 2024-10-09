import { useRouter } from 'next/navigation';
import { FaRegStar, FaStar } from 'react-icons/fa';

interface HouseListingTileProps {
  houseAd: HouseAd;
  darkMode: boolean;
}

const HouseListingTile: React.FC<HouseListingTileProps> = ({ houseAd, darkMode }) => {
  const router = useRouter();

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? <FaStar key={i} className="text-yellow-500 text-lg" /> : <FaRegStar key={i} className="text-yellow-500 text-lg" />);
    }
    return stars;
  };

  return (
    <div className={`border-2 ${darkMode ? 'border-gray-700' : 'border-gray-300'} shadow-none rounded-lg`}>
      <div className="p-4">
        <img
          src="https://via.placeholder.com/300"
          alt="House"
          className="w-full h-56 object-cover rounded-md"
        />
        <h2 className={`text-lg font-semibold mt-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {houseAd.city}, {houseAd.state}, {houseAd.postal_code}
        </h2>
        <div className='flex flex-row py-2'>
            {renderStars(houseAd.condition)}
        </div>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bedrooms: {houseAd.bedrooms}</p>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bathrooms: {houseAd.bathrooms}</p>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Area: {houseAd.living_area} sqft</p>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Price: {houseAd.price} USD</p>
        <button
          className={`w-full text-lg font-semibold mt-2 py-2 ${darkMode ? 'bg-gray-300 text-gray-800' : 'bg-gray-800 text-gray-100'} rounded`}
          onClick={() => router.push(`/house/${houseAd.id}`)}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default HouseListingTile;