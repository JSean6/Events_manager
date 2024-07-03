// import React, { useEffect, useState } from 'react';

// const EventList = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/events/');
//         if (response.ok) {
//           const data = await response.json();
//           setEvents(data);
//         } else {
//           console.error('Failed to fetch events');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <div className="max-w-lg mx-auto mt-10">
//       <h2 className="text-2xl font-semibold mb-6 text-center">Event List</h2>
//       {events.map((event) => (
//         <div key={event.id} className="p-4 border border-gray-200 rounded-lg mb-4 bg-white">
//           <h3 className="text-xl font-semibold">{event.title}</h3>
//           <p className="mt-2 text-gray-700">{event.description}</p>
//           <p className="mt-2 text-gray-600">Date: {event.date}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default EventList;
