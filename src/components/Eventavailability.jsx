import React from 'react';
import { useNavigate } from 'react-router-dom';

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
      fetch("http://127.0.0.1:8000/api/events/").then(res => res.json()),
      fetch("http://127.0.0.1:8000/api/tickets/").then(res => res.json())
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
      navigate("/ticketform", { state: { title, category, venue, duration, price_of_ticket} });
    };

    if (error) {
      return <div className="text-center text-red-600 mt-4">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="text-center text-gray-700 mt-4">Loading...</div>;
    } else {
      const baseURL = "https://res.cloudinary.com/da1fegzlm/";
      return (
        <div className="max-w-6xl mx-auto mt-10 mx-10 my-10">
          <h2 className="text-4xl font-semibold mb-10 text-center text-gray-800">Event List</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {events.map(event => (
              <div key={event.id} className="event-card border border-gray-200 rounded-lg shadow-lg overflow-hidden bg-white">
                <img src={`${baseURL}${event.image}`} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <p className="text-gray-700 mb-1"><span className="font-semibold">Category:</span> {event.category}</p>
                  <p className="text-gray-700 mb-1"><span className="font-semibold">Venue:</span> {event.venue}</p>
                  <p className="text-gray-700 mb-1"><span className="font-semibold">Start Date:</span> {event.startDate}</p>
                  <p className="text-gray-700 mb-1"><span className="font-semibold">End Date:</span> {event.endDate}</p>
                  <p className="text-gray-700 mb-1"><span className="font-semibold">Total Tickets:</span> {event.tickets}</p>
                  <p className="text-gray-700 mb-1"><span className="font-semibold">Ticket Price:</span> {event.price_of_ticket}</p>
                  <p className="text-gray-700 mb-1"><span className="font-semibold">Tickets Booked:</span> {this.getTicketsCountForEvent(event.title)}</p>
                  <p className="text-gray-700 mb-1"><span className="font-semibold">Tickets Available:</span> {this.getAvailableTicketsForEvent(event)}</p>
                  <button
                    onClick={() => handleMoreInfo(event.title, event.category, event.venue,  `From: ${event.startDate} To: ${event.endDate}`, event.price_of_ticket)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-navy-blue-700"
                  >
                    GET A TICKET
                  </button>
                </div>
              </div>
            ))}
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
