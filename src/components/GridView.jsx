import React from 'react';

const GridView = ({ employees, onEdit, onDelete }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white border'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='py-2 px-4 border'>ID</th>
            <th className='py-2 px-4 border'>Name</th>
            <th className='py-2 px-4 border'>Age</th>
            <th className='py-2 px-4 border'>Class</th>
            <th className='py-2 px-4 border'>Subject 1</th>
            <th className='py-2 px-4 border'>Subject 2</th>
            <th className='py-2 px-4 border'>Subject 3</th>
            <th className='py-2 px-4 border'>Attendance</th>
            <th className='py-2 px-4 border'>Email</th>
            <th className='py-2 px-4 border'>Phone</th>
            <th className='py-2 px-4 border'>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className='hover:bg-gray-100'>
              <td className='py-2 px-4 border'>{employee.id}</td>
              <td className='py-2 px-4 border'>
                {employee.name.first} {employee.name.last}
              </td>
              <td className='py-2 px-4 border'>{employee.age}</td>
              <td className='py-2 px-4 border'>{employee.class}</td>
              <td className='py-2 px-4 border'>{employee.subjects[0] || ''}</td>
              <td className='py-2 px-4 border'>{employee.subjects[1] || ''}</td>
              <td className='py-2 px-4 border'>{employee.subjects[2] || ''}</td>
              <td className='py-2 px-4 border'>{employee.attendance}</td>
              <td className='py-2 px-4 border'>{employee.email}</td>
              <td className='py-2 px-4 border'>{employee.phone}</td>
              <td className='py-2 px-4 border'>
                <button
                  className='mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'
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
