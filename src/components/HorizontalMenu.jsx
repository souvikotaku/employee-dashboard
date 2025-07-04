import React from 'react';

const HorizontalMenu = () => (
  <nav className='hidden md:flex bg-gray-800 text-white p-4'>
    <ul className='flex space-x-6'>
      <li className='hover:underline cursor-pointer'>Dashboard</li>
      <li className='hover:underline cursor-pointer'>Employees</li>
      <li className='hover:underline cursor-pointer'>Reports</li>
      <li className='hover:underline cursor-pointer'>Settings</li>
    </ul>
  </nav>
);

export default HorizontalMenu;
