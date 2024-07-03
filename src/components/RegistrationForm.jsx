import React, { useState } from 'react';
// import './index.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      action="http://127.0.0.1:8000/api/users/"
      method="POST"
      className="max-w-lg mx-auto p-8 border border-gray-200 rounded-lg bg-white px-10"
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
          className="w-full p-2 border border-gray-300 rounded mt-1"
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
          className="w-full p-2 border border-gray-300 rounded mt-1"
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
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      {/* <div className="mb-4">
        <label className="block text-gray-700">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        >
          <option value="">Select a role</option>
          <option value="role1">super admin</option>
          <option value="role2">admin</option>
          <option value="role3">staff</option>
          <option value="role4">user</option>
        </select>
      </div> */}

      <div className="mb-4">
        <label className="block text-gray-700">Role</label>
        <input 
          type="text" 
          name="role" 
          value={formData.role} 
          onChange={handleChange} 
          required 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
      >
        Create an account
      </button>
    </form>
  );
};

export default RegisterForm;