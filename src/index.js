import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      />
      <Route path='*' element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
);
