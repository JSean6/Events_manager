import React from 'react';
import { useNavigate } from 'react-router-dom';

class FetchedEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      events: []
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/events/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            events: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, events } = this.state;
    const navigate = this.props.navigate;
    
    
    const handleMoreInfo = (title, category, venue, duration, tickets, price_of_ticket) => {
      navigate("/ticketform", { state: { title, category, venue, duration, tickets, price_of_ticket} });
    };

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const baseURL = "https://res.cloudinary.com/da1fegzlm/";
      return (
        <div className="max-w-lg mx-auto mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-center">Event List</h2>
          {events.map(event => (
            <div key={event.id} className="p-4 border border-gray-500 rounded-lg mb-4 bg-white">
              <img src={`${baseURL}${event.image}`} alt={event.title} className="w-full h-auto mb-4" />
              <h3 className="text-xl mt-2 text-gray-700 font-semibold">{event.title}</h3>
              <h3 className="mt-2 text-gray-700">Category: {event.category}</h3>
              <h3 className="mt-2 text-gray-700">Venue: {event.venue}</h3>
              <p className="mt-2 text-gray-700">Description: {event.description}</p>
              <p className="mt-2 text-gray-600">Start Date: {event.startDate}</p>
              <p className="mt-2 text-gray-600">End Date: {event.endDate}</p>
              <p className="mt-2 text-gray-600">Tickets: {event.tickets}</p>
              <p className="mt-2 text-gray-600">Ticket Price: {event.price_of_ticket}</p>
              <button 
                onClick={() => handleMoreInfo(event.title, event.category, event.venue ,`From: ${event.startDate} To: ${event.endDate}`,  event.price_of_ticket)} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                GET A TICKET
              </button>
            </div>
          ))}
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
