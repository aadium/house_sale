import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const AuthHeader: FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  return (
    <nav className={`fixed flex justify-between w-full p-2 ${
        darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-300 text-gray-900'
      }`}>
      <h1 className="text-3xl ml-4 mt-1 font-bold hover:cursor-pointer">House Sale</h1>
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
      </div>
    </nav>
  );
};

export default AuthHeader;