import React from 'react';

const TileView = ({ employees, onEdit, onDelete, onTileClick }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {employees.map((employee) => (
        <div
          key={employee.id}
          className='bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer'
          onClick={() => onTileClick(employee)}
        >
          <h3 className='text-lg font-semibold'>
            {employee.name.first} {employee.name.last}
          </h3>
          <p className='text-sm text-gray-600'>Age: {employee.age}</p>
          <p className='text-sm text-gray-600'>Class: {employee.class}</p>
          <p className='text-sm text-gray-600'>
            Subjects: {employee.subjects.join(', ')}
          </p>
          <p className='text-sm text-gray-600'>
            Attendance: {employee.attendance}%
          </p>
          <p className='text-sm text-gray-600'>Email: {employee.email}</p>
          <p className='text-sm text-gray-600'>Phone: {employee.phone}</p>
          <p className='text-sm text-gray-600'>Role: {employee.role}</p>
          <div className='mt-2 flex justify-end space-x-2'>
            <button
              className='px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'
              onClick={(e) => {
                e.stopPropagation(); // Prevent tile click
                onEdit(employee);
              }}
            >
              Edit
            </button>
            {/* <button
              className='px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600'
              onClick={(e) => {
                e.stopPropagation(); // Prevent tile click
                onDelete(employee.id);
              }}
            >
              Delete
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TileView;
