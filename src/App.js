import React, { useState, useEffect } from 'react';
import HamburgerMenu from './components/HamburgerMenu';
import HorizontalMenu from './components/HorizontalMenu';
import GridView from './components/GridView';
import TileView from './components/TileView';
import DetailedView from './components/DetailedView';
import { fetchEmployees } from './utils/api';

function App() {
  const [employees, setEmployees] = useState([]);
  const [view, setView] = useState('grid'); // 'grid' or 'tile'
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const loadEmployees = async () => {
      const data = await fetchEmployees(1, 10);
      setEmployees(data);
    };
    loadEmployees();
  }, []);

  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='flex items-center justify-between p-4 bg-white shadow'>
        <HamburgerMenu />
        <HorizontalMenu />
        <div className='flex space-x-4'>
          <button
            className={`px-4 py-2 rounded ${
              view === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setView('grid')}
          >
            Grid View
          </button>
          <button
            className={`px-4 py-2 rounded ${
              view === 'tile' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setView('tile')}
          >
            Tile View
          </button>
        </div>
      </header>
      <main className='p-4'>
        {view === 'grid' ? (
          <GridView employees={employees} />
        ) : (
          <TileView employees={employees} onTileClick={setSelectedEmployee} />
        )}
      </main>
      {selectedEmployee && (
        <DetailedView
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}

export default App;
