import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const UpdateUserForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    username: '',
    email: '',
    password: '',
    role: '',
  });

  // Handles change in input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior

    try {
      // Sends a PUT request to update user details
      const response = await axios.put(`https://event-manager-backend-2xpo.onrender.com/api/users/${formData.userId}/`, {
        username: formData.username,
        email: formData.email,
        password: formData.password, // Include password in the request body
        role: formData.role,
      });

      if (response.status === 200) {
        alert('User updated successfully'); // Alerts user upon successful update
      } else {
        console.error('Update failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section className='dashboard-container'>
    <Sidebar />
    <div className="dashboard-content max-w-lg mx-auto my-20 p-8 border border-gray-200 rounded-lg bg-white">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6 text-center">Update User</h2>
        <div className="mb-4">
          <label className="block text-gray-700">User ID</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-700"
          />
        </div>
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
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-700"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-900"
        >
          Update User
        </button>
      </form>
    </div>
    </section>
  );
};

export default UpdateUserForm;
