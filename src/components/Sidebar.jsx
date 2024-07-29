import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '/src/assets/logo.png';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="hamburger" onClick={handleToggle}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <Link to="/dashboard" className="flex items-center">
          <img src={logo} alt="Logo" />
        </Link>
        <ul className="sidebar-links">
          <li>
            <Link to="/dashboard/events" className="sidebar-link">
              Events Table
            </Link>
          </li>
          <li className="dropdown">
            <Link to="/dashboard/vendors" className="sidebar-link">
              Vendors
            </Link>
            <ul className="dropdown-list">
              <li>
                <Link to="/dashboard/vendors/registration" className="dropdown-item">
                  Vendor Registration
                </Link>
              </li>
              <li>
                <Link to="/dashboard/vendors/list" className="dropdown-item">
                  Vendor List
                </Link>
              </li>
              <li>
                <Link to="/dashboard/vendors/booking" className="dropdown-item">
                  Book Vendor
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/dashboard/contacts" className="sidebar-link">
              Contacts Table
            </Link>
          </li>
          <li>
            <Link to="/dashboard/updateuser" className="sidebar-link">
              Update Users
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
