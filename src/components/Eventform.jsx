import React, { useState } from 'react';

const EventForm = () => {
  const [formData, setFormData] = useState({
    image: null,
    title: '',
    category: '',
    venue: '',
    description: '',
    startDate: '',
    endDate: '',
    tickets: '',
    price_of_ticket: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/api/events/', {
        method: 'POST',
        body: data,
      });
      if (response.status === 201) {
        const event = await response.json();
        console.log('Event created:', event);
        setFormData({
          image: null,
          title: '',
          category: '',
          venue: '',
          description: '',
          startDate: '',
          endDate: '',
          tickets: '',
          price_of_ticket: ''
        });
      } else {
        console.error('Event creation failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 border border-gray-200 rounded-lg bg-white px-10"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Add Event</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Image</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1 "
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Venue</label>
        <input
          type="text"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Number of Tickets</label>
        <input
          type="number"
          name="tickets"
          value={formData.tickets}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Ticket price</label>
        <input
          type="number"
          name="price_of_ticket"
          value={formData.price_of_ticket}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        id='btn'
      >
        Add Event
      </button>
    </form>
  );
};

export default EventForm;
