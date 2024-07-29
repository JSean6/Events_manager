import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPerson } from "react-icons/fa6";
import './Styles.css';
import axiosInstance from './Axios';
import { baseURL, eventsAPI, ticketsAPI } from '../config'; 


class FetchedEventsWithTickets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      events: [],
      tickets: []
    };
  }

  componentDidMount() {
    Promise.all([
      fetch(eventsAPI).then(res => res.json()),
      fetch(ticketsAPI).then(res => res.json())
    ]).then(
      ([events, tickets]) => {
        this.setState({
          isLoaded: true,
          events,
          tickets
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }

  handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this type?')) {
      try {
        await axiosInstance.delete(`/events/${id}/`);
        this.fetchType();
      } catch (error) {
        console.error("Error deleting type:", error);
      }
    }
  };

  getTicketsCountForEvent(eventId) {
    const { tickets } = this.state;
    return tickets.filter(ticket => ticket.title === eventId).reduce((count, ticket) => count + ticket.number_of_tickets, 0);
  }

  getAvailableTicketsForEvent(event) {
    const bookedTickets = this.getTicketsCountForEvent(event.title);
    return event.tickets - bookedTickets;
  }

  render() {
    const { error, isLoaded, events } = this.state;
    const navigate = this.props.navigate;

    const handleMoreInfo = (title, category, venue, duration, price_of_ticket) => {
      navigate("/ticketform", { state: { title, category, venue, duration, price_of_ticket } });
    };

    if (error) {
      return <div className="text-center text-red-600 mt-4">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="text-center text-gray-700 mt-4">Loading...</div>;
    } else {
      return (
        <div className="max-w-6xl mx-auto mt-10">
          <h2 className="text-4xl font-semibold mb-10 text-center text-gray-800">Trending In Kenya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20 mx-20">
            {events.map(event => {
              const availableTickets = this.getAvailableTicketsForEvent(event);
              return (
                <div key={event.id} className="event-card border border-gray-200 rounded-lg shadow-lg overflow-hidden bg-white mx-20">
                  <div className="relative h-64 overflow-hidden">
                    <img src={`${baseURL}${event.image}`} alt={event.title} className="w-full h-48 object-cover" />
                    <span className={`availability-badge ${availableTickets > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                      {availableTickets > 0 ? 'Available' : 'SOLD OUT'}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{event.title} ({event.category})</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <p className="text-gray-700 mb-1"><span className="font-semibold">Venue:</span> {event.venue}</p>
                    <p className="text-gray-700 mb-1"><span className="font-semibold">Start Date:</span> {event.startDate}</p>
                    <p className="text-gray-700 mb-1"><span className="font-semibold">From :</span> {event.time}</p>
                    <p className="text-gray-700 mb-1"><span className="font-semibold">Duration :</span> {event.duration}</p>
                    <p className="text-gray-700 mb-1"><span className="font-semibold">Total Tickets:</span> {event.tickets}</p>
                    <p className="text-gray-700 mb-1"><span className="font-semibold">Ticket Price:</span> {event.price_of_ticket}</p>
                    <p className="text-gray-700 mb-1"><span className="font-semibold">Tickets Booked <FaPerson />:</span> {this.getTicketsCountForEvent(event.title)}</p>
                    <p className="text-gray-700 mb-1"><span className="font-semibold">Tickets Available:</span> {availableTickets}</p>
                    {/* <button onClick={() => handleEdit(p)} className="px-4 py-2 text-blue-600 rounded ">Edit</button> */}
                    <button onClick={() => this.handleDelete(event.id)} className="px-4 py-2 ms-2 text-red-600 rounded ">Delete</button>
                    <button
                      onClick={() => handleMoreInfo(event.title, event.category, event.venue, `From: ${event.startDate} To: ${event.endDate}`, event.price_of_ticket)}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-navy-blue-700"
                    >
                      GET A TICKET
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

function withNavigate(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

export default withNavigate(FetchedEventsWithTickets);
