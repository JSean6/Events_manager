import React from 'react';
import { useNavigate } from 'react-router-dom';

class FetchVendors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      vendors: []
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/vendors/")
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
      const baseURL = "https://res.cloudinary.com/da1fegzlm/";
      return (
        <div className="max-w-lg mx-auto mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-center">Vendors List</h2>
          {vendors.map(vendor => (
            <div key={vendor.id} className="p-4 border border-gray-500 rounded-lg mb-4 bg-white">
              <img src={`${baseURL}${vendor.image}`} alt={vendor.title} className="w-full h-auto mb-4" />
              <h3 className="text-xl mt-2 text-gray-700 font-semibold">{vendor.title}</h3>
              <h3 className="mt-2 text-gray-700">Comapany_name: {vendor.Comapany_name}</h3>
              <h3 className="mt-2 text-gray-700">Service: {vendor.service}</h3>
              <p className="mt-2 text-gray-700">Working hours: {vendor.working_hours}</p>
              <p className="mt-2 text-gray-600">Rates: {vendor.rates}</p>
              <p className="mt-2 text-gray-600">Availability: {vendor.availability}</p>
              <p className="mt-2 text-gray-600">Contact: {vendor.contact}</p>
              <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                BOOK VENDOR
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

export default withNavigate(FetchVendors);
