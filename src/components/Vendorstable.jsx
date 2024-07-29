import React, { Component } from 'react';
import Sidebar from './Sidebar';
import { vendorsAPI } from '../config'; 


class VendorTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      vendors: []
    };
  }

  componentDidMount() {
    fetch(vendorsAPI)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            vendors: result
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
    const { error, isLoaded, vendors } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <section className='dashboard-container'>
        <Sidebar />
        <div className="overflow-x-auto ml-100 dashboard-content my-20 mx-10">
          <h2 className="text-2xl font-semibold mb-6 text-center">Vendors</h2>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Company Name</th>
                <th className="px-4 py-2 border">Service</th>
                <th className="px-4 py-2 border">Working Hours</th>
                <th className="px-4 py-2 border">Rates</th>
                <th className="px-4 py-2 border">Availability</th>
                <th className="px-4 py-2 border">Contact (+254)</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map(vendor => (
                <tr key={vendor.id}>
                  <td className="px-4 py-2 border">{vendor.Comapany_name}</td>
                  <td className="px-4 py-2 border">{vendor.service}</td>
                  <td className="px-4 py-2 border">{vendor.working_hours}</td>
                  <td className="px-4 py-2 border">{vendor.rates}</td>
                  <td className="px-4 py-2 border">{vendor.availability}</td>
                  <td className="px-4 py-2 border">{vendor.contact}</td>
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

export default VendorTable;
