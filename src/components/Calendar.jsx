import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const EventCalendar = ({ events }) => {
  const tileContent = ({ date }) => {
    const eventDate = new Date(date).toDateString();
    const event = events.find((e) => new Date(e.date).toDateString() === eventDate);

    return event ? <p>{event.title}</p> : null;
  };

  return (
    <div className="max-w-md mx-auto p-8 border border-gray-200 rounded-lg bg-white mb-8">
      <Calendar tileContent={tileContent} />
    </div>
  );
};

export default EventCalendar;
