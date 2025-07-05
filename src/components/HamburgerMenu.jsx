import React, { useState } from 'react';

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [openNestedMenu, setOpenNestedMenu] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleSubmenu = (menuName) => {
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
    setOpenNestedMenu(null); // Close any nested menus when switching main menu
  };

  const toggleNestedMenu = (name) => {
    setOpenNestedMenu(openNestedMenu === name ? null : name);
  };

  return (
    <div className='relative lg:hidden'>
      <button
        onClick={toggleMenu}
        className='text-white text-2xl focus:outline-none'
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
        <div className='absolute top-full left-0 w-64 bg-gray-800 text-white border border-green-500/30 mt-2 rounded shadow-lg z-50'>
          {/* Dashboard */}
          <div className='border-b border-green-500/30'>
            <button
              className='w-full text-left px-4 py-2 hover:bg-gray-700'
              onClick={() => toggleSubmenu('dashboard')}
            >
              Dashboard
            </button>
            {openSubmenu === 'dashboard' && (
              <div className='pl-6 py-1'>
                <a href='#overview' className='block py-1 hover:text-green-400'>
                  Overview
                </a>
                <button
                  className='w-full text-left py-1 hover:text-green-400'
                  onClick={() => toggleNestedMenu('reports')}
                >
                  Reports
                </button>
                {openNestedMenu === 'reports' && (
                  <div className='pl-4'>
                    <a
                      href='#monthly'
                      className='block py-1 hover:text-green-400'
                    >
                      Monthly Reports
                    </a>
                    <a
                      href='#quarterly'
                      className='block py-1 hover:text-green-400'
                    >
                      Quarterly Reports
                    </a>
                  </div>
                )}
                <a
                  href='#analytics'
                  className='block py-1 hover:text-green-400'
                >
                  Analytics
                </a>
              </div>
            )}
          </div>

          {/* Objectives */}
          <div className='border-b border-green-500/30'>
            <button
              className='w-full text-left px-4 py-2 hover:bg-gray-700'
              onClick={() => toggleSubmenu('objectives')}
            >
              Objectives
            </button>
            {openSubmenu === 'objectives' && (
              <div className='pl-6 py-1'>
                <a href='#list' className='block py-1 hover:text-green-400'>
                  Objective List
                </a>
                <button
                  className='w-full text-left py-1 hover:text-green-400'
                  onClick={() => toggleNestedMenu('management')}
                >
                  Management
                </button>
                {openNestedMenu === 'management' && (
                  <div className='pl-4'>
                    <a href='#add' className='block py-1 hover:text-green-400'>
                      Our Policies
                    </a>
                    <a href='#edit' className='block py-1 hover:text-green-400'>
                      Our Mission
                    </a>
                  </div>
                )}
                <a
                  href='#attendance'
                  className='block py-1 hover:text-green-400'
                >
                  Attendance
                </a>
              </div>
            )}
          </div>

          {/* Other Links */}
          <a href='#settings' className='block px-4 py-2 hover:bg-gray-700'>
            Settings
          </a>
          <a href='#profile' className='block px-4 py-2 hover:bg-gray-700'>
            Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
