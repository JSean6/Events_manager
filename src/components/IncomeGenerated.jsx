import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles.css';
import { baseURL, eventsAPI, ticketsAPI } from '../config'; 

class FetchedEventsWithIncome extends React.Component {
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

  getTicketsCountForEvent(eventId) {
    const { tickets } = this.state;
    return tickets.filter(ticket => ticket.title === eventId).reduce((count, ticket) => count + ticket.number_of_tickets, 0);
  }

  getAvailableTicketsForEvent(event) {
    const bookedTickets = this.getTicketsCountForEvent(event.title);
    return event.tickets - bookedTickets;
  }

  getTicketSalesForEvent(event) {
    return event.price_of_ticket * this.getTicketsCountForEvent(event.title);
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
      return <div className="text-center text-gray-700 mt-4">Loading...</div>;
    } else {
      return (
        <section>

        <div >
          <div className="max-w-6xl mx-auto mt-10">
            <h2 className="text-4xl font-semibold mb-10 text-center">Event List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {events.map(event => (
                <div key={event.id} className="event-card rounded-lg shadow-lg overflow-hidden mx-6 my-4 mx-16">
                  <img src={`${baseURL}${event.image}`} alt={event.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
                    {/* <p className="mb-4">{event.description}</p> */}
                    <p className="mb-1"><span className="font-semibold">Category:</span> {event.category}</p>
                    <p className="mb-1"><span className="font-semibold">Venue:</span> {event.venue}</p>
                    <p className="mb-1"><span className="font-semibold">Start Date:</span> {this.formatDate(event.startDate)}</p>
                    <p className="mb-1"><span className="font-semibold">Duration:</span> {event.duration}</p>
                    <p className="mb-1"><span className="font-semibold">Total Tickets:</span> {event.tickets}</p>
                    <p className="mb-1"><span className="font-semibold">Ticket Price:</span> {event.price_of_ticket}</p>
                    <p className="mb-1"><span className="font-semibold">Tickets Booked:</span> {this.getTicketsCountForEvent(event.title)}</p>
                    <p className="mb-1"><span className="font-semibold">Tickets Available:</span> {this.getAvailableTicketsForEvent(event)}</p>
                    <p className="mb-1"><span className="font-semibold">Tickets Sales:</span> {this.getTicketSalesForEvent(event)} Ksh</p>
                    <button
                      onClick={() => handleMoreInfo(event.title, event.category, event.venue, `From: ${this.formatDate(event.startDate)} To: ${this.formatDate(event.endDate)}`, event.price_of_ticket)}
                      className="mt-4 px-4 py-2 rounded-lg"
                      id='btn'
                    >
                      GET A TICKET
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </section>
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

export default withNavigate(FetchedEventsWithIncome);
