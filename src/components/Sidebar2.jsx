import React, { useState } from "react";
import "./Sidebar.css";

const FilterSidebar = ({ onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    duration: "",
    venue: "",
  });

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    onFilter({ ...filters, [name]: value });
  };

  const handleReset = () => {
    const resetFilters = {
      category: "",
      priceRange: "",
      duration: "",
      venue: "",
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <>
      <div className="hamburger" onClick={handleToggle}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="sidebar-title">Filter Events</h2>
        <div className="filter-section">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={filters.category}
            onChange={handleChange}
          >
            <option value="">All Categories</option>
            <option value="Conference">Conference</option>
            <option value="Bootcamp">Bootcamp</option>
            <option value="Seminar">Seminar</option>
          </select>
        </div>
        <div className="filter-section">
          <label htmlFor="priceRange">Price Range</label>
          <select
            name="priceRange"
            id="priceRange"
            value={filters.priceRange}
            onChange={handleChange}
          >
            <option value="">All Prices</option>
            <option value="0-5000">0 - 5,000</option>
            <option value="5000-10000">5,000 - 10,000</option>
            <option value="10000+">10,000+</option>
          </select>
        </div>
        <div className="filter-section">
          <label htmlFor="duration">Duration</label>
          <input
            type="text"
            name="duration"
            id="duration"
            placeholder="e.g., 3 Days"
            value={filters.duration}
            onChange={handleChange}
          />
        </div>
        <div className="filter-section">
          <label htmlFor="venue">Venue</label>
          <input
            type="text"
            name="venue"
            id="venue"
            placeholder="e.g., KICC"
            value={filters.venue}
            onChange={handleChange}
          />
        </div>
        <div className="filter-actions">
          <button className="reset-button" onClick={handleReset}>
            Reset Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
