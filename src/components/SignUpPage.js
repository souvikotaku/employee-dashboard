import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../utils/api';
import { toast, ToastContainer } from 'react-toastify';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: { first: '', last: '' },
    age: '',
    class: '',
    subjects: [''],
    attendance: '',
    email: '',
    phone: '',
    password: '',
    role: 'employee',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'subjects') {
      setFormData((prev) => ({
        ...prev,
        subjects: value.split(',').map((s) => s.trim()),
      }));
    } else if (name.includes('name.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        name: { ...prev.name, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const input = {
        name: { first: formData.name.first, last: formData.name.last },
        age: parseInt(formData.age),
        class: formData.class,
        subjects: formData.subjects,
        attendance: formData.attendance,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
      };
      await addEmployee(input);
      toast.success('Sign up successful! Please login.', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/login');
    } catch (error) {
      toast.error('Error signing up. Please try again later.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-6 rounded shadow-md w-96'>
        <h2 className='text-2xl mb-4 text-center'>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label className='block'>First Name:</label>
            <input
              type='text'
              name='name.first'
              value={formData.name.first}
              onChange={handleInputChange}
              className='w-full p-1 border rounded'
              required
            />
          </div>
          <div className='mb-2'>
            <label className='block'>Last Name:</label>
            <input
              type='text'
              name='name.last'
              value={formData.name.last}
              onChange={handleInputChange}
              className='w-full p-1 border rounded'
              required
            />
          </div>
          <div className='mb-2'>
            <label className='block'>Age:</label>
            <input
              type='number'
              name='age'
              value={formData.age}
              onChange={handleInputChange}
              className='w-full p-1 border rounded'
              required
            />
          </div>
          <div className='mb-2'>
            <label className='block'>Class:</label>
            <input
              type='text'
              name='class'
              value={formData.class}
              onChange={handleInputChange}
              className='w-full p-1 border rounded'
              required
            />
          </div>
          <div className='mb-2'>
            <label className='block'>Subjects:</label>
            <input
              type='text'
              name='subjects'
              value={formData.subjects.join(',')}
              onChange={handleInputChange}
              className='w-full p-1 border rounded'
              required
            />
          </div>
          <div className='mb-2'>
            <label className='block'>Attendance:</label>
            <input
              type='text'
              name='attendance'
              value={formData.attendance}
              onChange={handleInputChange}
              className='w-full p-1 border rounded'
              required
            />
          </div>
          <div className='mb-2'>
            <label className='block'>Email:</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className='w-full p-1 border rounded'
              required
            />
          </div>
          <div className='mb-2'>
            <label className='block'>Phone:</label>
            <input
              type='text'
              name='phone'
              value={formData.phone}
              onChange={handleInputChange}
              className='w-full p-1 border rounded'
              required
            />
          </div>
          <div className='mb-2'>
            <label className='block'>Password:</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              className='w-full p-1 border rounded'
              required
            />
          </div>
          <div className='mb-2'>
            <label className='block'>Role:</label>
            <select
              name='role'
              value={formData.role}
              onChange={handleInputChange}
              className='w-full p-1 border rounded'
              required
            >
              <option value='employee'>Employee</option>
              <option value='admin'>Admin</option>
            </select>
          </div>
          <div className='flex space-x-2'>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded'
            >
              Sign Up
            </button>
            <button
              type='button'
              onClick={() => navigate('/login')}
              className='px-4 py-2 bg-gray-300 rounded'
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUpPage;
