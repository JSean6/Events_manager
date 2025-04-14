import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPerson } from "react-icons/fa6";
import './FetchedEvents.css';
import axiosInstance from './Axios';
import { cloudinaryURL, BaseURL } from '../../config';

// --- Utility to read CSRF cookie ---
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

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
      fetch(`${BaseURL}api/events/`).then(res => res.json()),
      fetch(`${BaseURL}api/tickets/`).then(res => res.json())
    ]).then(
      ([events, tickets]) => {
        this.setState({
          isLoaded: true,
          events: Array.isArray(events) ? events : [],
          tickets: Array.isArray(tickets) ? tickets : []
        });
      },
      (error) => {
        console.error("Error fetching data:", error);
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }

  handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const csrfToken = getCookie('csrftoken');
      try {
        await axiosInstance.delete(`https://event-manager-backend-2xpo.onrender.com/api/events/${id}/`, {
          headers: {
            'X-CSRFToken': csrfToken
          }
        });
        this.setState((prevState) => ({
          events: prevState.events.filter(event => event.id !== id)
        }));
      } catch (error) {
        console.error("Error deleting event:", error);
        this.setState({ error });
      }
    }
  };

  getTicketsCountForEvent(eventId) {
    const { tickets } = this.state;
    return tickets
      .filter(ticket => ticket.title === eventId)
      .reduce((count, ticket) => count + ticket.number_of_tickets, 0);
  }

  getAvailableTicketsForEvent(event) {
    const booked = this.getTicketsCountForEvent(event.title);
    return event.tickets - booked;
  }

  render() {
    const { error, isLoaded, events } = this.state;
    const navigate = this.props.navigate;

    const handleMoreInfo = (title, category, venue, duration, price_of_ticket) => {
      navigate("/ticketform", {
        state: { title, category, venue, duration, price_of_ticket }
      });
    };

    if (error) {
      return <div className="text-center text-red-600 mt-4">Error: {error.message}</div>;
    }

    if (!isLoaded) {
      return <div className="text-center text-gray-700 mt-4">Loading...</div>;
    }

    return (
      <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-4xl font-semibold mb-10 text-center text-gray-800">Trending In Kenya</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 mb-20 px-4 md:px-10">
          {events.map(event => {
            const availableTickets = this.getAvailableTicketsForEvent(event);
            const bookedTickets = this.getTicketsCountForEvent(event.title);

            return (
              <div key={event.id} className="event-card">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={event.image ? `${cloudinaryURL}${event.image}` : '/placeholder.jpg'}
                    alt={event.title}
                    className="w-full h-64 object-cover"
                  />
                  <span className={`availability-badge ${availableTickets > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                    {availableTickets > 0 ? 'Available' : 'SOLD OUT'}
                  </span>
                </div>
                <div className="p-6">
                  <h3>{event.title} ({event.category})</h3>
                  <p>{event.description}</p>
                  <p><strong>Venue:</strong> {event.venue}</p>
                  <p><strong>Start Date:</strong> {event.startDate}</p>
                  <p><strong>From:</strong> {event.time}</p>
                  <p><strong>Duration:</strong> {event.duration}</p>
                  <p><strong>Total Tickets:</strong> {event.tickets}</p>
                  <p><strong>Ticket Price:</strong> {event.price_of_ticket}</p>
                  <p className="flex items-center">
                    <strong>Tickets Booked: </strong> {bookedTickets} <FaPerson className="ml-1" />
                  </p>
                  <p><strong>Tickets Available:</strong> {availableTickets}</p>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <button
                      onClick={() => this.handleDelete(event.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        handleMoreInfo(
                          event.title,
                          event.category,
                          event.venue,
                          `${event.startDate} to ${event.endDate}`,
                          event.price_of_ticket
                        )
                      }
                      className="get-btn"
                    >
                      GET A TICKET
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function withNavigate(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

export default withNavigate(FetchedEventsWithTickets);
