import React, { useState } from "react";
import FilterSidebar from "./Sidebar2"; // Importing Sidebar2 as FilterSidebar
import FetchedEvents from "./FetchedEvents";
import "./FetchedEvents.css"; // Optional styling for layout

function Home() {
  const [filters, setFilters] = useState({}); // State to track applied filters

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="home-container">
        <FilterSidebar onFilter={handleFilter} />
      <div className="content-container">
        <FetchedEvents filters={filters} />
      </div>
    </div>
  );
}

export default Home;
