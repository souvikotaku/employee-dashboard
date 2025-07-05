import React from 'react';
import HamburgerMenu from './HamburgerMenu';
import HorizontalMenu from './HorizontalMenu';
import { RotatingLines } from 'react-loader-spinner';

function Header({
  view,
  setView,
  loggedInUser,
  handleAddEmployeeClick,
  handleLogout,
  isLoggingOut,
}) {
  return (
    <header className='flex items-center justify-between p-4 bg-gray-800 shadow-lg border-b border-green-500/30'>
      <HamburgerMenu />
      <HorizontalMenu />
      <div className='flex space-x-4'>
        <button
          className={`px-4 py-2 rounded ${
            view === 'grid' ? 'bg-green-600 text-white' : 'bg-gray-700'
          } hover:bg-green-700 transition duration-200`}
          onClick={() => setView('grid')}
        >
          Grid View
        </button>
        <button
          className={`buttonres px-4 py-2 rounded ${
            view === 'tile' ? 'bg-green-600 text-white' : 'bg-gray-700'
          } hover:bg-green-700 transition duration-200`}
          onClick={() => setView('tile')}
        >
          Tile View
        </button>
        {loggedInUser?.role === 'admin' && (
          <button
            className='buttonres px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200'
            onClick={handleAddEmployeeClick}
          >
            Add Employee
          </button>
        )}
        <button
          className='buttonres px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200 flex items-center justify-center'
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <RotatingLines
              strokeColor='white'
              strokeWidth='5'
              animationDuration='0.75'
              width='24'
              visible={true}
            />
          ) : (
            'Logout'
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
