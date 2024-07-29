import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { PaystackButton } from 'react-paystack';
import '../App.css';
import { ticketsAPI } from '../config'; 


// Helper function to get the CSRF token from cookies
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const TicketForm = () => {
  const location = useLocation();
  const { title, category, duration, venue, price_of_ticket } = location.state || {};

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    duration: '',
    name: '',
    email: '',
    number_of_tickets: 1,
    venue: '',
    price_of_ticket: ''
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [receipt, setReceipt] = useState(null);
  const paymentFormRef = useRef(null); // Use ref to access the form element

  const csrfToken = getCookie('csrftoken');

  useEffect(() => {
    if (title || category || duration || venue || price_of_ticket) {
      setFormData({
        ...formData,
        title: title || '',
        category: category || '',
        duration: duration || '',
        venue: venue || '',
        price_of_ticket: price_of_ticket || '',
      });
    }
  }, [title, category, duration, venue, price_of_ticket]);

  useEffect(() => {
    setTotalPrice(formData.number_of_tickets * formData.price_of_ticket);
  }, [formData.number_of_tickets, formData.price_of_ticket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePaymentSuccess = (response) => {
    const receiptData = {
      ...formData,
      totalPrice,
      date: formatDate(new Date())
    };

    setReceipt(receiptData);

    fetch(ticketsAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      body: JSON.stringify(receiptData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Form submitted:', data);
        sendEmailReceipt(formData.email);
        setFormData({
          title: '',
          category: '',
          duration: '',
          name: '',
          email: '',
          number_of_tickets: 1,
          venue: '',
          price_of_ticket: ''
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });

    alert('Payment complete! Reference: ' + response.reference);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const sendEmailReceipt = (email) => {
    fetch('http://127.0.0.1:8000/api/send-receipt/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      body: JSON.stringify({ email, receipt })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Email sent:', data);
      })
      .catch(error => {
        console.error('Error sending email:', error);
      });
  };

  const publicKey = "pk_test_3e01e30e25aa7608c084faf58553edc47c96529d"; // Replace with your public key

  const componentProps = {
    email: formData.email,
    amount: totalPrice * 100,
    metadata: {
      name: formData.name,
    },
    publicKey,
    text: "Pay Now",
    currency: "KES",
    onSuccess: handlePaymentSuccess,
    onClose: () => alert("Payment window closed."),
  };

  return (
    <div className="max-w-lg mx-auto mt-10 mb-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Ticket Form</h2>
      <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md" id='paymentForm' ref={paymentFormRef}>
        <div className="mb-4">
          <label className="block text-gray-700">Event Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Venue</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Your Email</label>
          <input
            type="email"
            name="email"
            id="email-address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Number of Tickets</label>
          <input
            type="number"
            name="number_of_tickets"
            value={formData.number_of_tickets}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            min="1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Total Price</label>
          <input
            type="number"
            name="total_price"
            id="amount"
            value={totalPrice}
            readOnly
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <PaystackButton className="w-full bg-blue-500 text-white py-2 rounded-lg" {...componentProps} />
      </form>
      {receipt && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md mb-10">
          <h3 className="text-xl font-semibold mb-4">Receipt</h3>
          <p><strong>Event Title:</strong> {receipt.title}</p>
          <p><strong>Category:</strong> {receipt.category}</p>
          <p><strong>Venue:</strong> {receipt.venue}</p>
          <p><strong>Duration:</strong> {receipt.duration}</p>
          <p><strong>Name:</strong> {receipt.name}</p>
          <p><strong>Email:</strong> {receipt.email}</p>
          <p><strong>Number of Tickets:</strong> {receipt.number_of_tickets}</p>
          <p><strong>Total Price:</strong> Ksh.{receipt.totalPrice}</p>
          <p><strong>Date:</strong> {receipt.date}</p>
        </div>
      )}
    </div>
  );
};

export default TicketForm;
