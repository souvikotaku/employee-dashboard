import React, { useState } from 'react';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='md:hidden'>
      <button
        className='p-2 text-gray-700 focus:outline-none'
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      </button>
      {isOpen && (
        <div className='absolute bg-white shadow-lg w-48 z-10'>
          <ul className='py-2'>
            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
              Dashboard
            </li>
            <li className='px-4 py-2 hover:bg-gray-100'>
              Employees
              <ul className='pl-4'>
                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                  View All
                </li>
                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                  Add New
                </li>
              </ul>
            </li>
            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
              Reports
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
