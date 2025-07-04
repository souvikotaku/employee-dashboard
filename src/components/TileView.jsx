import React, { useState } from 'react';

const TileView = ({ employees, onTileClick }) => {
  const [optionsOpen, setOptionsOpen] = useState(null);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {employees.map((emp) => (
        <div
          key={emp.id}
          className='bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition'
          onClick={() => onTileClick(emp)}
        >
          <h3 className='text-lg font-semibold'>{`${emp.name.first} ${emp.name.last}`}</h3>
          <p>Age: {emp.age}</p>
          <p>Class: {emp.class}</p>
          <p>Attendance: {emp.attendance}</p>
          <div className='relative'>
            <button
              className='mt-2 bg-blue-500 text-white px-3 py-1 rounded'
              onClick={(e) => {
                e.stopPropagation();
                setOptionsOpen(optionsOpen === emp.id ? null : emp.id);
              }}
            >
              Options
            </button>
            {optionsOpen === emp.id && (
              <div className='absolute bg-white shadow-md rounded mt-1'>
                <button className='block px-4 py-2 hover:bg-gray-100 w-full text-left'>
                  Edit
                </button>
                <button className='block px-4 py-2 hover:bg-gray-100 w-full text-left'>
                  Flag
                </button>
                <button className='block px-4 py-2 hover:bg-gray-100 w-full text-left'>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TileView;
