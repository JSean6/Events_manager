import React, { useState } from 'react';

const VendorsForm = () => {
  const [formData, setFormData] = useState({
    Comapany_name: '',
    service: '',
    working_hours: '',
    availability: '',
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
      const response = await fetch('http://127.0.0.1:8000/api/vendors/', {
        method: 'POST',
        body: data,
      });
      if (response.status === 201) {
        const event = await response.json();
        console.log('Event created:', event);
        setFormData({
          Comapany_name: '',
          service: '',
          rates: '',
          working_hours: '',
          availability: '',
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
      <h2 className="text-2xl font-semibold mb-6 text-center">Vendor Registration</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Company Name</label>
        <input
          type="text"
          name="Comapany_name"
          value={formData.Comapany_name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Service</label>
        <input
          type="text"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Your Rates</label>
        <input
          type="text"
          name="rates"
          value={formData.rates}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">working_hours</label>
        <textarea
          type="text"
          name="working_hours"
          value={formData.working_hours}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Contact</label>
        <input
          type="number"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Availability Status</label>
        <input
          type="text"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  );
};

export default VendorsForm;
