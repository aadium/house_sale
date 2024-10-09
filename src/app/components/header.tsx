import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Header: FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  const router = useRouter();
  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      alert('Logout successful');
      localStorage.removeItem('token');
      router.push('/login');
    } else {
      const error = await response.text();
      alert(error);
    }
  };

  return (
    <div className={`flex justify-between items-center mb-6 p-3 ${
            darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-300 text-gray-900'
          }`}>
      <h1 className="text-3xl ml-4 font-bold hover:cursor-pointer" onClick={
        () => {
          router.push('/');
        }
      }>House Sale</h1>
      <div className="flex items-center space-x-4">
        <button
          className={`${
            darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
          } p-3 rounded transition text-lg duration-150 ease-in-out`}
          onClick={() => {
            setDarkMode(!darkMode);
            localStorage.setItem('darkMode', JSON.stringify(!darkMode));
          }}
        >
          {
            darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-900" />
            )
          }
        </button>
        <button
          className={`${
            darkMode ? 'bg-red-500 text-gray-800' : 'bg-red-600 text-white'
          } px-4 py-2 rounded font-semibold`}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;