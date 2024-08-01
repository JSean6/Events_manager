import React from 'react';
import './Services.css';


const Services = () => {
  return (
    <div className="services-container">
      <div className="service">
        <div className="service-content">
          <h2 className="service-title">Event Creation</h2>
          <p className="service-description">
            Create and manage events with ease. Customize every detail to suit your needs and ensure a smooth event planning experience.
          </p>
        </div>
        <div className="service-image">
          <img src="src\assets\event-management.jpg" alt="Event Creation" />
        </div>
      </div>

      <div className="service">
        <div className="service-content">
          <h2 className="service-title">Ticket Sales</h2>
          <p className="service-description">
            Streamline your ticket sales with our integrated payment system. Track sales, manage bookings, and ensure a seamless experience for your attendees.
          </p>
        </div>
        <div className="service-image">
          <img src="src\assets\ticket-sales.jpg" alt="Ticket Sales" />
        </div>
      </div>

      <div className="service">
        <div className="service-content">
          <h2 className="service-title">Vendor Booking and Registration</h2>
          <p className="service-description">
            Simplify vendor management with our booking and registration system. Keep track of vendors and ensure your event is well-supported.
          </p>
        </div>
        <div className="service-image">
          <img src="src\assets\Vendors.jpg" alt="Vendor Booking" />
        </div>
      </div>

      <div className="service">
        <div className="service-content">
          <h2 className="service-title">Admin Dashboard</h2>
          <p className="service-description">
            Gain full control over your events with our comprehensive admin dashboard. Monitor ticket sales, manage users, and handle feedback efficiently.
          </p>
        </div>
        <div className="service-image">
          <img src="src\assets\Dashboard.png" alt="Admin Dashboard" />
        </div>
      </div>

      <div className="service">
        <div className="service-content">
          <h2 className="service-title">Contact Form for Feedback</h2>
          <p className="service-description">
            Collect valuable feedback from your attendees with our user-friendly contact form. Improve future events based on real user insights.
          </p>
        </div>
        <div className="service-image">
          <img src="src\assets\Contact.png" alt="Contact Form" />
        </div>
      </div>
    </div>
  );
};

export default Services;
