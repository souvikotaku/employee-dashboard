import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const token = await login(loginData.email, loginData.password);
      localStorage.setItem('token', token);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid credentials', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-6 rounded shadow-md w-96'>
        <h2 className='text-2xl mb-4 text-center'>Login</h2>
        <div className='mb-4'>
          <label>Email</label>
          <input
            type='email'
            name='email'
            value={loginData.email}
            onChange={handleInputChange}
            className='w-full p-2 border rounded'
          />
        </div>
        <div className='mb-4'>
          <label>Password</label>
          <input
            type='password'
            name='password'
            value={loginData.password}
            onChange={handleInputChange}
            className='w-full p-2 border rounded'
          />
        </div>
        <button
          onClick={handleLogin}
          className='w-full py-2 bg-blue-500 text-white rounded'
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
