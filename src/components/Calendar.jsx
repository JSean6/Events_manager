import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/events');
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
          setIsLoaded(true);
        } else {
          setIsLoaded(true);
          setError(new Error('Failed to fetch events'));
        }
      } catch (error) {
        setIsLoaded(true);
        setError(error);
      }
    };

    fetchEvents();
  }, []);

  const titleContent = ({ date, view }) => {
    if (view === 'month') {
      const eventDate = new Date(date).toDateString();
      const event = events.find((e) => new Date(e.startDate).toDateString() === eventDate);

      return event ? <p className="text-sm">{event.title}</p> : null;
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="max-w-md mx-auto p-8 border border-gray-200 rounded-lg bg-blue-800 mb-8">
        <Calendar tiletContent={titleContent} />
      </div>
    );
  }
};

export default EventCalendar;
