import React, { useState, useEffect } from 'react';
import {
  fetchEmployees,
  fetchEmployee,
  addEmployee,
  login,
} from '../utils/api.js';

function EmployeeManager() {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: { first: '', last: '' },
    age: '',
    class: '',
    subjects: [''],
    attendance: '',
    email: '',
    phone: '',
    password: '', // Added password field
    role: 'employee',
  });

  useEffect(() => {
    const loadEmployees = async () => {
      if (token) {
        const data = await fetchEmployees(1, 5);
        setEmployees(data);
      }
    };
    loadEmployees();
  }, [token]);

  const handleLogin = async () => {
    const newToken = await login('admin@example.com', 'admin123');
    setToken(newToken);
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
        password: formData.password, // Include password in input
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
        password: '', // Reset password field
        role: 'employee',
      });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleFetchEmployee = async () => {
    if (token) {
      const data = await fetchEmployee('1751605467237');
      setEmployee(data);
    }
  };

  if (!token) return <button onClick={handleLogin}>Login</button>;

  return (
    <div>
      <button onClick={handleAddEmployeeClick}>Add Employee</button>
      <button onClick={handleFetchEmployee}>Fetch Employee</button>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name.first} {emp.name.last} (Age: {emp.age})
          </li>
        ))}
      </ul>
      {employee && <pre>{JSON.stringify(employee, null, 2)}</pre>}

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
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>First Name:</label>
                <input
                  type='text'
                  name='name.first'
                  value={formData.name.first}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Last Name:</label>
                <input
                  type='text'
                  name='name.last'
                  value={formData.name.last}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Age:</label>
                <input
                  type='number'
                  name='age'
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Class:</label>
                <input
                  type='text'
                  name='class'
                  value={formData.class}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Subjects (comma-separated):</label>
                <input
                  type='text'
                  name='subjects'
                  value={formData.subjects.join(',')}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Attendance (%):</label>
                <input
                  type='text'
                  name='attendance'
                  value={formData.attendance}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Phone:</label>
                <input
                  type='text'
                  name='phone'
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Role:</label>
                <select
                  name='role'
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value='employee'>Employee</option>
                  <option value='admin'>Admin</option>
                </select>
              </div>
              <button type='submit'>Submit</button>
              <button type='button' onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeManager;
