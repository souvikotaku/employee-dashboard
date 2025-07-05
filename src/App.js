import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HamburgerMenu from './components/HamburgerMenu';
import HorizontalMenu from './components/HorizontalMenu';
import GridView from './components/GridView';
import TileView from './components/TileView';
import DetailedView from './components/DetailedView';
import {
  fetchEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee,
  fetchEmployeeByEmail,
} from './utils/api';
import { jwtDecode } from 'jwt-decode';
import { RotatingLines } from 'react-loader-spinner'; // Import a cool loader

function App() {
  const [employees, setEmployees] = useState([]);
  const [view, setView] = useState('grid');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
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
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const loadEmployees = async () => {
      setLoading(true); // Start loading
      const token = localStorage.getItem('token');

      if (token) {
        const data = await fetchEmployees(1, 10);
        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.email;
        const userRole = decodedToken.role;
        const employee = await fetchEmployeeByEmail(userEmail);
        setLoggedInUser({ ...employee, role: userRole });

        if (userRole === 'admin') {
          setEmployees(data);
        } else {
          const filteredEmployees = data.filter(
            (emp) => emp.email === userEmail
          );
          setEmployees(filteredEmployees);
        }
      }
      setLoading(false); // Stop loading after data is fetched
    };
    loadEmployees();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
    window.location.href = '/login';
    toast.info('Logged out successfully!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const handleAddEmployeeClick = () => {
    setFormData({
      id: '',
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
    setIsModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setFormData({
      id: employee.id,
      name: { first: employee.name.first, last: employee.name.last },
      age: employee.age,
      class: employee.class,
      subjects: employee.subjects,
      attendance: employee.attendance,
      email: employee.email,
      phone: employee.phone,
      password: '',
      role: employee.role,
    });
    setIsModalOpen(true);
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter((employee) => employee.id !== id));
      toast.success('Employee deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Error deleting employee. Please try again later.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
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
      if (formData.id) {
        const updatedEmployee = await updateEmployee(formData.id, input);
        setEmployees(
          employees.map((emp) =>
            emp.id === formData.id ? updatedEmployee : emp
          )
        );
        toast.success('Employee updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        const newEmployee = await addEmployee(input);
        setEmployees((prev) => [...prev, newEmployee]);
        toast.success('Employee added successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
      setIsModalOpen(false);
      setFormData({
        id: '',
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
    } catch (error) {
      toast.error('Error processing employee. Please try again later.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-200'>
      <header className='flex items-center justify-between p-4 bg-gray-800 shadow-lg border-b border-green-500/30'>
        <HamburgerMenu />
        <HorizontalMenu />
        <div className='flex space-x-4'>
          <button
            className={`px-4 py-2 rounded ${
              view === 'grid' ? 'bg-green-600 text-white' : 'bg-gray-700'
            } hover:bg-green-700 transition duration-200`}
            onClick={() => setView('grid')}
          >
            Grid View
          </button>
          <button
            className={`px-4 py-2 rounded ${
              view === 'tile' ? 'bg-green-600 text-white' : 'bg-gray-700'
            } hover:bg-green-700 transition duration-200`}
            onClick={() => setView('tile')}
          >
            Tile View
          </button>
          {loggedInUser?.role === 'admin' && (
            <button
              className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200'
              onClick={handleAddEmployeeClick}
            >
              Add Employee
            </button>
          )}
          <button
            className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>
      {loggedInUser && (
        <div className='p-4 bg-gray-700 text-center border-b border-green-500/30'>
          <h2 className='text-xl'>
            Welcome {loggedInUser.name.first} {loggedInUser.name.last} (
            {loggedInUser.email}) - Role: {loggedInUser.role}
          </h2>
        </div>
      )}
      <main className='p-4'>
        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <RotatingLines
              strokeColor='green'
              strokeWidth='5'
              animationDuration='0.75'
              width='96'
              visible={true}
            />
          </div>
        ) : view === 'grid' ? (
          <GridView
            employees={employees}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
          />
        ) : (
          <TileView
            employees={employees}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
            onTileClick={setSelectedEmployee}
          />
        )}
      </main>
      {selectedEmployee && (
        <DetailedView
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
      {isModalOpen && (
        <div className='modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-gray-800 p-6 rounded-lg w-96 shadow-lg border border-green-500/30'>
            <h2 className='text-2xl mb-4 text-center text-green-400 subtle-glow'>
              {formData.id ? 'Edit Employee' : 'Add Employee'}
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
              {!formData.id && (
                <div>
                  <label className='block text-sm font-medium text-gray-300'>
                    Password
                  </label>
                  <input
                    type='text'
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                    className='w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500'
                    required
                  />
                </div>
              )}
              {loggedInUser?.role === 'admin' && (
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
              )}
              <div className='flex justify-end space-x-2'>
                <button
                  type='submit'
                  className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200'
                >
                  {formData.id ? 'Update' : 'Submit'}
                </button>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition duration-200'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
