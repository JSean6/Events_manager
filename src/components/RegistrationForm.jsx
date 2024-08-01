import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles.css';
import { BaseURL } from '../../config';


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user', 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BaseURL}api/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) { 
        // If registration is successful, redirect to the login form
        navigate(`/login?email=${formData.email}`);
      } else {
        // Handle errors 
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 border border-gray-200 rounded-lg bg- px-10"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-700"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-700"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-700"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Role</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          readOnly 
          required
          className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-700"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-900"
        id='btn'
      >
        Create an account
      </button>
    </form>
  );
};

export default RegisterForm;
