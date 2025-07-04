import React from 'react';

const DetailedView = ({ employee, onClose }) => (
  <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20'>
    <div className='bg-white p-6 rounded-lg shadow-xl max-w-md w-full'>
      <h2 className='text-2xl font-bold mb-4'>{`${employee.name.first} ${employee.name.last}`}</h2>
      <p>
        <strong>ID:</strong> {employee.id}
      </p>
      <p>
        <strong>Age:</strong> {employee.age}
      </p>
      <p>
        <strong>Class:</strong> {employee.class}
      </p>
      <p>
        <strong>Subjects:</strong> {employee.subjects.join(', ')}
      </p>
      <p>
        <strong>Attendance:</strong> {employee.attendance}
      </p>
      <p>
        <strong>Email:</strong> {employee.email}
      </p>
      <p>
        <strong>Phone:</strong> {employee.phone}
      </p>
      <button
        className='mt-4 bg-red-500 text-white px-4 py-2 rounded'
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);

export default DetailedView;
