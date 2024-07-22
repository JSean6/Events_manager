import React, { Component } from 'react';
import Sidebar from './Sidebar';

class ContactsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      contacts: []
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/contacts/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            contacts: result
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
    const { error, isLoaded, contacts } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <section className='dashboard-container'>
        <Sidebar />
        <div className="overflow-x-auto overflow-x-auto ml-100 dashboard-content mx-10 my-20">
          <h2 className="text-2xl font-semibold mb-6 text-center">Contacts</h2>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Message</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact.id}>
                  <td className="px-4 py-2 border">{contact.name}</td>
                  <td className="px-4 py-2 border">{contact.email}</td>
                  <td className="px-4 py-2 border">{contact.message}</td>
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

export default ContactsTable;
