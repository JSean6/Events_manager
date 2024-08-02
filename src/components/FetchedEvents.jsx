import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cloudinaryURL, BaseURL } from '../../config'; 
import './Styles.css';

class FetchedEvents extends React.Component {
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

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toDateString();
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
      return <div className="text-center mt-4">Loading...</div>;
    } else {
      return (
        <div className="max-w-6xl mx-auto mt-10">
          <h2 className="text-4xl font-semibold text-center mb-10">Trending In Kenya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 mb-20 mx-16">
            {events.map(event => {
              const availableTickets = this.getAvailableTicketsForEvent(event);
              return (
                <div key={event.id} className="event-card rounded-lg shadow-lg overflow-hidden">
                    <img src={`${cloudinaryURL}${event.image}`} alt={event.title} className="w-full h-50 object-cover"/>
                    <span className={`availability-badge ${availableTickets > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                      {availableTickets > 0 ? 'Available' : 'SOLD OUT'}
                    </span>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold">{event.title} ({event.category})</h3>
                    <p className="mb-2">{event.description}</p>
                    <strong><p className="font-semibold">{event.venue}</p></strong>
                    <strong><p className="font-semibold">{this.formatDate(event.startDate)}</p></strong>
                    <strong><p className="font-semibold">Starts: {event.time}</p></strong>
                    <strong><p className="font-semibold">{event.duration}</p></strong>
                    <strong><p className="font-semibold">Ksh. {event.price_of_ticket}</p></strong>
                    <br />
                    <button
                      onClick={() => handleMoreInfo(event.title, event.category, event.venue, `From: ${event.startDate} To: ${event.endDate}`, event.price_of_ticket)}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                      id='btn'
                    >
                      GET TICKETS
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

export default withNavigate(FetchedEvents);
