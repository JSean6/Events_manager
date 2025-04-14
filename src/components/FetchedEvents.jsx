import React from "react";
import { BaseURL, cloudinaryURL } from "../../config";

class FetchedEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      events: [],
      filteredEvents: [],
      tickets: [],
    };
  }

  componentDidMount() {
    Promise.all([
      fetch(`${BaseURL}api/events/`).then((res) => res.json()),
      fetch(`${BaseURL}api/tickets/`).then((res) => res.json()),
    ]).then(
      ([events, tickets]) => {
        this.setState({
          isLoaded: true,
          events,
          filteredEvents: events,
          tickets,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filters !== this.props.filters) {
      this.applyFilters();
    }
  }

  applyFilters() {
    const { filters } = this.props;
    const { events } = this.state;

    const filteredEvents = events.filter((event) => {
      return (
        (!filters.category || event.category === filters.category) &&
        (!filters.venue || event.venue.toLowerCase().includes(filters.venue.toLowerCase())) &&
        (!filters.priceRange ||
          (filters.priceRange === "0-5000" && event.price_of_ticket <= 5000) ||
          (filters.priceRange === "5000-10000" &&
            event.price_of_ticket > 5000 &&
            event.price_of_ticket <= 10000) ||
          (filters.priceRange === "10000+" && event.price_of_ticket > 10000)) &&
        (!filters.duration || event.duration.toLowerCase().includes(filters.duration.toLowerCase()))
      );
    });

    this.setState({ filteredEvents });
  }

  getTicketsCountForEvent(eventId) {
    const { tickets } = this.state;
    return tickets
      .filter((ticket) => ticket.title === eventId)
      .reduce((count, ticket) => count + ticket.number_of_tickets, 0);
  }

  getAvailableTicketsForEvent(event) {
    const booked = this.getTicketsCountForEvent(event.title);
    return event.tickets - booked;
  }

  formatDate(dateStr) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  }

  render() {
    const { error, isLoaded, filteredEvents } = this.state;
    const navigate = this.props.navigate;

    const handleMoreInfo = (title, category, venue, duration, price_of_ticket) => {
      navigate("/ticketform", { state: { title, category, venue, duration, price_of_ticket } });
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
            {filteredEvents.map((event) => {
              const availableTickets = this.getAvailableTicketsForEvent(event);
              const isSoldOut = availableTickets <= 0;

              return (
                <div key={event.id} className="event-card rounded-lg shadow-lg overflow-hidden">
                  <div className="relative">
                    <img
                      src={`${cloudinaryURL}${event.image}`}
                      alt={event.title}
                      className="w-full h-78 object-cover rounded-t-lg"
                    />
                    <span
                      className={`availability-badge ${
                        isSoldOut ? "bg-red-500" : "bg-green-500"
                      }`}
                    >
                      {isSoldOut ? "SOLD OUT" : "Available"}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl text-gray-900 font-bold mb-3 mt-1">
                      {event.title} ({event.category})
                    </h3>
                    <p className="mb-2">{event.description}</p>
                    <p className="font-semibold">Venue:📍{event.venue}</p>
                    <p className="font-semibold">Date: 📅 {this.formatDate(event.startDate)}</p>
                    <p className="font-semibold">Starts: ⏰ {event.time}</p>
                    <p className="font-semibold">Duration: ⏳{event.duration}</p>
                    <p className="font-semibold">Price: 💵 Ksh. {event.price_of_ticket}</p>
                    <p className="font-semibold mt-2">
                      Tickets Available: 🎟️ {availableTickets}
                    </p>
                    <button
                      onClick={() =>
                        handleMoreInfo(
                          event.title,
                          event.category,
                          event.venue,
                          `From: ${event.startDate} To: ${event.endDate}`,
                          event.price_of_ticket
                        )
                      }
                      className={`mt-4 px-4 py-2 text-white font-semibold rounded-lg w-full ${
                        isSoldOut
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      disabled={isSoldOut}
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

export default FetchedEvents;
