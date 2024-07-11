import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const handleLogin = async () => {
  try {
      const response = await client.post('/login/', { email, password });
      setMessage('Login successful!');
      // Redirect to About page on successful login
      navigate('/About');
  } catch (error) {
      setMessage('Login failed. Please check your credentials.');
  }
};





const LoginForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const email = params.get('email');
    if (email) {
      setFormData((prevData) => ({ ...prevData, email }));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form 
      action="http://127.0.0.1:8000/api/login/"
      method="POST" 
      className="max-w-lg mx-auto p-10 border border-gray-200 rounded-lg bg-white py-18 px-100"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
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
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
      >
        Login
      </button>
      Don't have an account? <a href="/register">Register</a>
    </form>
  );
};

export default LoginForm;
