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
              Subject 1
            </th>
            <th className='py-2 px-4 border border-green-500/30 text-green-400'>
              Subject 2
            </th>
            <th className='py-2 px-4 border border-green-500/30 text-green-400'>
              Subject 3
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
              <td className='py-2 px-4 border border-green-500/30 text-gray-200'>
                {employee.subjects[0] || ''}
              </td>
              <td className='py-2 px-4 border border-green-500/30 text-gray-200'>
                {employee.subjects[1] || ''}
              </td>
              <td className='py-2 px-4 border border-green-500/30 text-gray-200'>
                {employee.subjects[2] || ''}
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
