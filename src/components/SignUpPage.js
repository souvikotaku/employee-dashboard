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
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-gray-200'>
      <div className='bg-gray-800 p-6 rounded-lg shadow-lg w-96 border border-green-500/30'>
        <h2 className='text-3xl mb-6 text-center font-bold text-green-400 subtle-glow'>
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='flex space-x-2'>
            <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-300'>
                First Name
              </label>
              <input
                type='text'
                name='name.first'
                value={formData.name.first}
                onChange={handleInputChange}
                className='w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500'
                required
              />
            </div>
            <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-300'>
                Last Name
              </label>
              <input
                type='text'
                name='name.last'
                value={formData.name.last}
                onChange={handleInputChange}
                className='w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500'
                required
              />
            </div>
          </div>
          <div className='flex space-x-2'>
            <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-300'>
                Age
              </label>
              <input
                type='number'
                name='age'
                value={formData.age}
                onChange={handleInputChange}
                className='w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500'
                required
              />
            </div>
            <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-300'>
                Class
              </label>
              <input
                type='text'
                name='class'
                value={formData.class}
                onChange={handleInputChange}
                className='w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500'
                required
              />
            </div>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-300'>
              Subjects
            </label>
            <input
              type='text'
              name='subjects'
              value={formData.subjects.join(',')}
              onChange={handleInputChange}
              className='w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-300'>
              Attendance
            </label>
            <input
              type='text'
              name='attendance'
              value={formData.attendance}
              onChange={handleInputChange}
              className='w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500'
              required
            />
          </div>
          <div className='flex space-x-2'>
            <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-300'>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className='w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500'
                required
              />
            </div>
            <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-300'>
                Phone
              </label>
              <input
                type='text'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
                className='w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500'
                required
              />
            </div>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-300'>
              Password
            </label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              className='w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-300'>
              Role
            </label>
            <select
              name='role'
              value={formData.role}
              onChange={handleInputChange}
              className='w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500'
              required
            >
              <option value='employee'>Employee</option>
              <option value='admin'>Admin</option>
            </select>
          </div>
          <div className='flex space-x-3'>
            <button
              type='submit'
              className='w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-200'
            >
              Sign Up
            </button>
            <button
              type='button'
              onClick={() => navigate('/login')}
              className='w-full py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition duration-200'
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
