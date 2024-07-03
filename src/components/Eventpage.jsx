import React, { useEffect, useState } from 'react';
import EventForm from './Eventform';
import EventCalendar from '../components/Calendar';

const Eventpage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/events');
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <section>
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-8 text-center">Event Manager</h1>
      <EventForm onAddEvent={handleAddEvent} />
      
      <EventCalendar events={events} />
    </div>
    </section>
  );
};

export default Eventpage;
