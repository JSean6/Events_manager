import React, { Component } from 'react';

class EventTable extends Component {
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

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Events</h2>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Venue</th>
                <th className="px-4 py-2 border">Start Date</th>
                <th className="px-4 py-2 border">End Date</th>
                <th className="px-4 py-2 border">Tickets</th>
                <th className="px-4 py-2 border">Ticket Price</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td className="px-4 py-2 border">{event.title}</td>
                  <td className="px-4 py-2 border">{event.category}</td>
                  <td className="px-4 py-2 border">{event.venue}</td>
                  <td className="px-4 py-2 border">{event.startDate}</td>
                  <td className="px-4 py-2 border">{event.endDate}</td>
                  <td className="px-4 py-2 border">{event.tickets}</td>
                  <td className="px-4 py-2 border">{event.price_of_ticket}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default EventTable;
