import React, { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';
import { RotatingLines } from 'react-loader-spinner';

function Header({
  view,
  setView,
  loggedInUser,
  handleAddEmployeeClick,
  handleLogout,
  isLoggingOut,
}) {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isEmployeesOpen, setIsEmployeesOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isManagementOpen, setIsManagementOpen] = useState(false);

  return (
    <header className='flex items-center justify-between p-4 bg-gray-800 shadow-lg border-b border-green-500/30'>
      <HamburgerMenu />
      <nav className='hidethisinmobile flex space-x-6 items-center'>
        {/* Dashboard Dropdown */}
        <div
          className='relative'
          onMouseEnter={() => setIsDashboardOpen(true)}
          onMouseLeave={() => {
            setIsDashboardOpen(false);
            setIsReportsOpen(false);
          }}
        >
          <button className='text-gray-200 hover:text-green-400 transition duration-200'>
            Dashboard
          </button>
          {isDashboardOpen && (
            <div className='absolute top-full left-0 mt-0 w-48 bg-gray-800 border border-green-500/30 rounded-md shadow-lg z-10'>
              <div className='py-2'>
                <a
                  href='#overview'
                  className='block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-green-400'
                >
                  Overview
                </a>
                {/* Reports Submenu */}
                <div
                  className='relative'
                  onMouseEnter={() => setIsReportsOpen(true)}
                  onMouseLeave={() => setIsReportsOpen(false)}
                >
                  <button className='w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-green-400'>
                    Reports
                  </button>
                  {isReportsOpen && (
                    <div className='absolute left-full top-0 mt-0 w-48 bg-gray-800 border border-green-500/30 rounded-md shadow-lg z-20'>
                      <a
                        href='#monthly'
                        className='block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-green-400'
                      >
                        Monthly Reports
                      </a>
                      <a
                        href='#quarterly'
                        className='block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-green-400'
                      >
                        Quarterly Reports
                      </a>
                    </div>
                  )}
                </div>
                <a
                  href='#analytics'
                  className='block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-green-400'
                >
                  Analytics
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Employees Dropdown */}
        <div
          className='relative'
          onMouseEnter={() => setIsEmployeesOpen(true)}
          onMouseLeave={() => {
            setIsEmployeesOpen(false);
            setIsManagementOpen(false);
          }}
        >
          <button className='text-gray-200 hover:text-green-400 transition duration-200'>
            Objectives
          </button>
          {isEmployeesOpen && (
            <div className='absolute top-full left-0 mt-0 w-48 bg-gray-800 border border-green-500/30 rounded-md shadow-lg z-10'>
              <div className='py-2'>
                <a
                  href='#list'
                  className='block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-green-400'
                >
                  Objective List
                </a>
                {/* Management Submenu */}
                <div
                  className='relative'
                  onMouseEnter={() => setIsManagementOpen(true)}
                  onMouseLeave={() => setIsManagementOpen(false)}
                >
                  <button className='w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-green-400'>
                    Management
                  </button>
                  {isManagementOpen && (
                    <div className='absolute left-full top-0 mt-0 w-48 bg-gray-800 border border-green-500/30 rounded-md shadow-lg z-20'>
                      <a
                        href='#add'
                        className='block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-green-400'
                      >
                        Our Policies
                      </a>
                      <a
                        href='#edit'
                        className='block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-green-400'
                      >
                        Our Mission
                      </a>
                    </div>
                  )}
                </div>
                <a
                  href='#attendance'
                  className='block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-green-400'
                >
                  Attendance
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Static Links */}
        <a
          href='#settings'
          className='text-gray-200 hover:text-green-400 transition duration-200'
        >
          Settings
        </a>
        <a
          href='#profile'
          className='text-gray-200 hover:text-green-400 transition duration-200'
        >
          Profile
        </a>
      </nav>

      {/* Right Side Controls */}
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
