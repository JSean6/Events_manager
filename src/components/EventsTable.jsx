import React, { Component } from 'react';
import Sidebar from './Sidebar';
import { eventsAPI } from '../config'; 

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
    fetch(eventsAPI)
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
        <section className='dashboard-container'>
        <Sidebar />
        <div className="overflow-x-auto ml-100 dashboard-content mx-10 my-20">
          <h2 className="text-2xl font-semibold text-center">Events</h2>
          <br />
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
        </section>
      );
    }
  }
}

export default EventTable;
