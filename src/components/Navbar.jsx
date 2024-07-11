import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '/src/assets/logo.png'; // Make sure the logo path is correct
import './Styles.css'; // Import the styles

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className='flex items-center'>
          <img src={logo} alt="Logo" />
        </Link>
        <div className="hamburger" onClick={handleToggle}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li>
            <Link to="" className='transition duration-300 ease-in-out font-bold px-4 py-2 rounded'>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className='transition duration-300 ease-in-out font-bold px-4 py-2 rounded'>
              About
            </Link>
          </li>
          <li>
            <Link to="events" className='transition duration-300 ease-in-out font-bold px-4 py-2 rounded'>
              Create Events
            </Link>
          </li>
          <li>
            <Link to="eventlist" className='transition duration-300 ease-in-out font-bold px-4 py-2 rounded'>
              Events
            </Link>
          </li>
          <li>
            <Link to="eventsavailable" className='transition duration-300 ease-in-out font-bold px-4 py-2 rounded'>
              Check Availability
            </Link>
          </li>
          <li>
            <Link to="ticketsales" className='transition duration-300 ease-in-out font-bold px-4 py-2 rounded'>
              Ticket Sales
            </Link>
          </li>
          <li>
            <Link to="vendorsform" className='transition duration-300 ease-in-out font-bold px-4 py-2 rounded'>
              Vendor Registration
            </Link>
          </li>
          <li>
            <Link to="vendors" className='transition duration-300 ease-in-out font-bold px-4 py-2 rounded'>
              Vendor List
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
