import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '/src/assets/logo.png';
import useAuth from '../hooks/useAuth';
import './Styles.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { auth, logout } = useAuth();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className=''>
        <img src={logo} alt="Logo" />
      </Link>
      <div className="hamburger" onClick={handleToggle}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li>
          <Link to="/" className='transition duration-300 ease-in-out font-bold px-4 py-2 rounded'>
            Home
          </Link>
        </li>
        <li>
          <Link to="/services" className='transition duration-300 ease-in-out font-bold px-4 py-2 rounded'>
            Services
          </Link>
        </li>
        <li className="relative dropdown">
          <Link to="/events" className='transition duration-300 ease-in-out font-bold px-4 py-2 rounded'>
            Events
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link to="/events" className='transition duration-300 ease-in-out font-bold px-4 py-2 rounded'>
                Create Events
              </Link>
            </li>
            <li>
              <Link to="/eventlist" className='transition duration-300 ease-in-out font-bold px-4 py-2 rounded'>
                Events
              </Link>
            </li>
            <li>
              <Link to="/eventsavailable" className='transition duration-300 ease-in-out font-bold px-4 py-2 rounded'>
                Check Availability
              </Link>
            </li>
            <li>
              <Link to="/ticketsales" className='transition duration-300 ease-in-out font-bold px-4 py-2 rounded'>
                Ticket Sales
              </Link>
            </li>
            <li>
              <Link to="/eventcharts" className='transition duration-300 ease-in-out font-bold px-4 py-2 rounded'>
                Event Charts
              </Link>
            </li>
          </ul>
        </li>
        <li className="relative dropdown">
          <Link to="/vendors" className='transition duration-300 ease-in-out font-bold px-4 py-2 rounded'>
            Vendors
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link to="/vendorsform" className='transition duration-300 ease-in-out font-bold px-4 py-2 rounded'>
                Vendor Registration
              </Link>
            </li>
            <li>
              <Link to="/vendors" className='transition duration-300 ease-in-out font-bold px-4 py-2 rounded'>
                Vendor List
              </Link>
            </li>
            <li>
              <Link to="/vendors/booking" className='transition duration-300 ease-in-out font-bold px-4 py-2 rounded'>
                Book Vendor
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/contact" className='transition duration-300 ease-in-out font-bold px-4 py-2 rounded'>
            Contact Us
          </Link>
        </li>
        {auth ? (
          <li className='nav-links'>
            <button onClick={logout} className='logout'>
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login" className=''>
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
