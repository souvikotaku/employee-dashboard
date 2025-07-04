import React from 'react';

const GridView = ({ employees }) => (
  <div className='overflow-x-auto'>
    <table className='min-w-full bg-white shadow-md rounded-lg'>
      <thead className='bg-gray-200'>
        <tr>
          <th className='py-2 px-4'>ID</th>
          <th className='py-2 px-4'>Name</th>
          <th className='py-2 px-4'>Age</th>
          <th className='py-2 px-4'>Class</th>
          <th className='py-2 px-4'>Subject 1</th>
          <th className='py-2 px-4'>Subject 2</th>
          <th className='py-2 px-4'>Subject 3</th>
          <th className='py-2 px-4'>Attendance</th>
          <th className='py-2 px-4'>Email</th>
          <th className='py-2 px-4'>Phone</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id} className='border-t hover:bg-gray-50'>
            <td className='py-2 px-4'>{emp.id}</td>
            <td className='py-2 px-4'>{`${emp.name.first} ${emp.name.last}`}</td>
            <td className='py-2 px-4'>{emp.age}</td>
            <td className='py-2 px-4'>{emp.class}</td>
            <td className='py-2 px-4'>{emp.subjects[0]}</td>
            <td className='py-2 px-4'>{emp.subjects[1]}</td>
            <td className='py-2 px-4'>{emp.subjects[2]}</td>
            <td className='py-2 px-4'>{emp.attendance}</td>
            <td className='py-2 px-4'>{emp.email}</td>
            <td className='py-2 px-4'>{emp.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default GridView;
