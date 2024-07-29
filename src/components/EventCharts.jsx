import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';

class EventCharts extends React.Component {
  getChartData() {
    const { events, tickets } = this.props;

    if (!events || !tickets) {
      return {
        labels: [],
        datasets: []
      };
    }

    const eventTicketsCount = events.map(event => ({
      title: event.title,
      count: tickets.filter(ticket => ticket.title === event.title).reduce((sum, ticket) => sum + ticket.number_of_tickets, 0)
    }));

    const labels = eventTicketsCount.map(et => et.title);
    const data = eventTicketsCount.map(et => et.count);

    return {
      labels,
      datasets: [
        {
          label: 'Tickets Booked',
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75,192,192,0.6)',
          hoverBorderColor: 'rgba(75,192,192,1)',
          data
        }
      ]
    };
  }

  getPieChartData() {
    const { events, tickets } = this.props;

    if (!events || !tickets) {
      return {
        labels: [],
        datasets: []
      };
    }

    const eventTicketsCount = events.map(event => ({
      title: event.title,
      count: tickets.filter(ticket => ticket.title === event.title).reduce((sum, ticket) => sum + ticket.number_of_tickets, 0)
    }));

    const labels = eventTicketsCount.map(et => et.title);
    const data = eventTicketsCount.map(et => et.count);

    const backgroundColors = [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)',
      'rgba(255, 159, 64, 0.6)'
    ];

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: backgroundColors.slice(0, data.length),
          hoverBackgroundColor: backgroundColors.slice(0, data.length)
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <div className="chart-container">
          <h2 className="text-center text-2xl font-semibold mb-4">Tickets Booked by Event</h2>
          <Bar data={this.getChartData()} />
        </div>
        <div className="chart-container mt-10">
          <h2 className="text-center text-2xl font-semibold mb-4">Total Tickets Booked</h2>
          <Pie data={this.getPieChartData()} />
        </div>
      </div>
    );
  }
}

export default EventCharts;
