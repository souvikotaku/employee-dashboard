import React, { useState, useEffect } from 'react';
import HamburgerMenu from './components/HamburgerMenu';
import HorizontalMenu from './components/HorizontalMenu';
import GridView from './components/GridView';
import TileView from './components/TileView';
import DetailedView from './components/DetailedView';
import { fetchEmployees, addEmployee, login } from './utils/api';

function App() {
  const [employees, setEmployees] = useState([]);
  const [view, setView] = useState('grid'); // 'grid' or 'tile'
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: { first: '', last: '' },
    age: '',
    class: '',
    subjects: [''],
    attendance: '',
    email: '',
    phone: '',
    role: 'employee',
  });
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showLogin, setShowLogin] = useState(!token);

  useEffect(() => {
    const loadEmployees = async () => {
      if (token) {
        const data = await fetchEmployees(1, 10);
        setEmployees(data);
      }
    };
    loadEmployees();
  }, [token]);

  const handleLogin = async () => {
    const newToken = await login(loginData.email, loginData.password);
    setToken(newToken);
    setShowLogin(false);
  };

  const handleAddEmployeeClick = () => {
    setIsModalOpen(true);
  };

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

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
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
        role: formData.role,
      };
      const newEmployee = await addEmployee(input);
      setEmployees((prev) => [...prev, newEmployee]);
      setIsModalOpen(false);
      setFormData({
        name: { first: '', last: '' },
        age: '',
        class: '',
        subjects: [''],
        attendance: '',
        email: '',
        phone: '',
        role: 'employee',
      });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  if (showLogin) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-6 rounded shadow-md w-96'>
          <h2 className='text-2xl mb-4 text-center'>Login</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className='mb-4'>
              <label className='block mb-1'>Email</label>
              <input
                type='email'
                name='email'
                value={loginData.email}
                onChange={handleLoginInputChange}
                className='w-full p-2 border rounded'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block mb-1'>Password</label>
              <input
                type='password'
                name='password'
                value={loginData.password}
                onChange={handleLoginInputChange}
                className='w-full p-2 border rounded'
                required
              />
            </div>
            <button
              type='submit'
              className='w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='flex items-center justify-between p-4 bg-white shadow'>
        <HamburgerMenu />
        <HorizontalMenu />
        <div className='flex space-x-4'>
          <button
            className={`px-4 py-2 rounded ${
              view === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setView('grid')}
          >
            Grid View
          </button>
          <button
            className={`px-4 py-2 rounded ${
              view === 'tile' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setView('tile')}
          >
            Tile View
          </button>
          <button
            className='px-4 py-2 bg-green-500 text-white rounded'
            onClick={handleAddEmployeeClick}
          >
            Add Employee
          </button>
        </div>
      </header>
      <main className='p-4'>
        {view === 'grid' ? (
          <GridView employees={employees} />
        ) : (
          <TileView employees={employees} onTileClick={setSelectedEmployee} />
        )}
      </main>
      {selectedEmployee && (
        <DetailedView
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}

      {isModalOpen && (
        <div
          className='modal'
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '5px',
              width: '300px',
            }}
          >
            <h2 className='text-xl mb-4'>Add Employee</h2>
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
                <label className='block'>Subjects (comma-separated):</label>
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
                <label className='block'>Attendance (%):</label>
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
              <div className='flex justify-end space-x-2'>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-500 text-white rounded'
                >
                  Submit
                </button>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='px-4 py-2 bg-gray-300 rounded'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
