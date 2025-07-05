import React from 'react';

const GridView = ({ employees, onEdit, onDelete }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-gray-800 border-collapse'>
        <thead>
          <tr className='bg-gray-900'>
            <th className='py-2 px-4 border border-green-500/30 text-green-400'>
              ID
            </th>
            <th className='py-2 px-4 border border-green-500/30 text-green-400'>
              Name
            </th>
            <th className='py-2 px-4 border border-green-500/30 text-green-400'>
              Age
            </th>
            <th className='py-2 px-4 border border-green-500/30 text-green-400'>
              Class
            </th>
            <th className='py-2 px-4 border border-green-500/30 text-green-400'>
              Subjects
            </th>
            <th className='py-2 px-4 border border-green-500/30 text-green-400'>
              Attendance
            </th>
            <th className='py-2 px-4 border border-green-500/30 text-green-400'>
              Email
            </th>
            <th className='py-2 px-4 border border-green-500/30 text-green-400'>
              Phone
            </th>
            <th className='py-2 px-4 border border-green-500/30 text-green-400'>
              Role
            </th>
            <th className='py-2 px-4 border border-green-500/30 text-green-400'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr
              key={employee.id}
              className='hover:bg-gray-700 transition duration-200'
            >
              <td className='py-2 px-4 border border-green-500/30 text-gray-200'>
                {employee.id}
              </td>
              <td className='py-2 px-4 border border-green-500/30 text-gray-200'>
                {employee.name.first} {employee.name.last}
              </td>
              <td className='py-2 px-4 border border-green-500/30 text-gray-200'>
                {employee.age}
              </td>
              <td className='py-2 px-4 border border-green-500/30 text-gray-200'>
                {employee.class}
              </td>
              <td className='py-2 px-4 border border-green-500/30 text-gray-200 relative group'>
                <span className='truncate block max-w-[150px]'>
                  {employee.subjects.slice(0, 3).join(', ')}
                  {employee.subjects.length > 3 && '...'}
                </span>
                {employee.subjects.length > 3 && (
                  <div
                    className='absolute hidden group-hover:block bg-gray-900 text-gray-200 text-sm rounded shadow-lg p-2 z-10 left-1/2 -translate-x-1/2 -mt-8 max-w-[400px] whitespace-normal break-words'
                    style={{ top: 'auto', bottom: '100%' }}
                  >
                    {employee.subjects.join(', ')}
                  </div>
                )}
              </td>
              <td className='py-2 px-4 border border-green-500/30 text-gray-200'>
                {employee.attendance}
              </td>
              <td className='py-2 px-4 border border-green-500/30 text-gray-200'>
                {employee.email}
              </td>
              <td className='py-2 px-4 border border-green-500/30 text-gray-200'>
                {employee.phone}
              </td>
              <td className='py-2 px-4 border border-green-500/30 text-gray-200'>
                {employee.role || 'N/A'}
              </td>
              <td className='py-2 px-4 border border-green-500/30'>
                <button
                  className='px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200'
                  onClick={() => onEdit(employee)}
                >
                  Edit
                </button>
                {/* <button
                  className='px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600'
                  onClick={() => onDelete(employee.id)}
                >
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GridView;
