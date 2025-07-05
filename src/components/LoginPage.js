import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner'; // Import loader

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    setLoading(true); // Start loading
    try {
      const token = await login(loginData.email, loginData.password);
      localStorage.setItem('token', token);
      navigate('/dashboard');
      setTimeout(() => {
        toast.success('Login successful!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }, 1000);
    } catch (error) {
      toast.error('Invalid credentials', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-gray-200'>
      <div className='bg-gray-800 p-6 rounded-lg shadow-lg w-96 border border-green-500/30'>
        <h2 className='text-3xl mb-6 text-center font-bold text-green-400 subtle-glow'>
          Login
        </h2>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-300'>
              Email
            </label>
            <input
              type='email'
              name='email'
              value={loginData.email}
              onChange={handleInputChange}
              className='w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-300'>
              Password
            </label>
            <input
              type='password'
              name='password'
              value={loginData.password}
              onChange={handleInputChange}
              className='w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500'
              required
            />
          </div>
          <div className='space-y-2'>
            <button
              onClick={handleLogin}
              className='w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-200 flex items-center justify-center'
              disabled={loading}
            >
              {loading ? (
                <RotatingLines
                  strokeColor='white'
                  strokeWidth='3'
                  animationDuration='0.75'
                  width='20'
                  visible={true}
                />
              ) : (
                'Login'
              )}
            </button>
            <button
              onClick={() => navigate('/signup')}
              className='w-full py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition duration-200'
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
