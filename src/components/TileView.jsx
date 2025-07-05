import React from 'react';

const TileView = ({
  employees,
  onEdit,
  onDelete,
  onTileClick,
  userRole,
  userId,
}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {employees.map((employee) => (
        <div
          key={employee.id}
          className='bg-gray-800 p-4 rounded-lg shadow-lg border border-green-500/30 hover:bg-gray-700 transition duration-200 cursor-pointer'
          onClick={() => onTileClick(employee)}
        >
          <h3 className='text-lg font-semibold text-green-400'>
            {employee.name.first} {employee.name.last}
          </h3>
          <p className='text-sm text-gray-200'>Age: {employee.age}</p>
          <p className='text-sm text-gray-200'>Class: {employee.class}</p>
          <p className='text-sm text-gray-200'>
            Subjects: {employee.subjects.join(', ')}
          </p>
          <p className='text-sm text-gray-200'>
            Attendance: {employee.attendance}%
          </p>
          <p className='text-sm text-gray-200'>Email: {employee.email}</p>
          <p className='text-sm text-gray-200'>Phone: {employee.phone}</p>
          <p className='text-sm text-gray-200'>Role: {employee.role}</p>
          <div className='mt-2 flex justify-end space-x-2'>
            <button
              className='px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200'
              onClick={(e) => {
                e.stopPropagation(); // Prevent tile click
                onEdit(employee);
              }}
            >
              Edit
            </button>
            {userRole && userRole !== 'employee' && userId !== employee.id && (
              <button
                className='px-2 py-1 bg-red-500 text-white rounded ml-3 hover:bg-red-600'
                onClick={(e) => {
                  e.stopPropagation(); // Prevent tile click
                  onDelete(employee.id);
                }}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TileView;
