import React, { useState } from 'react';
import { contactsAPI } from '../../config';

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(contactsAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      });
      if (response.ok) {
        setResponseMessage('Thank you for contacting us! We will get back to you shortly.');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setResponseMessage('Something went wrong. Please try again later.');
      }
    } catch (error) {
      setResponseMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg my-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="email" className="block">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="message" className="block">Message</label>
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
            rows="5"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </form>
      {responseMessage && (
        <p className="mt-4 text-center">{responseMessage}</p>
      )}
    </div>
  );
};

export default ContactForm;
