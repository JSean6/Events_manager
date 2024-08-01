import React, { Component } from 'react';
import { parseISO, format } from 'date-fns';
import { BaseURL } from '../../config';

class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      customusers: []
    };
  }

  componentDidMount() {
    fetch(`${BaseURL}api/users/`) 
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            customusers: result
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

  formatDate(dateString) {
    if (!dateString) return 'N/A';
    try {
      const date = parseISO(dateString);
      return format(date, 'yyyy-MM-dd HH:mm:ss');
    } catch (error) {
      console.error("Invalid date:", dateString);
      return 'Invalid Date';
    }
  }
  
  render() {
    const { error, isLoaded, customusers } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Users</h2>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Id</th>
                <th className="px-4 py-2 border">Username</th>
                {/* <th className="px-4 py-2 border">Date Joined</th> */}
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Role</th>
                {/* <th className="px-4 py-2 border">Last Login</th> */}
              </tr>
            </thead>
            <tbody>
              {customusers.map(customuser => (
                <tr key={customuser.id}>
                  <td className="px-4 py-2 border">{customuser.id}</td>
                  <td className="px-4 py-2 border">{customuser.username}</td>
                  {/* <td className="px-4 py-2 border">{this.formatDate(customuser.date_joined)}</td> */}
                  <td className="px-4 py-2 border">{customuser.email}</td>
                  <td className="px-4 py-2 border">{customuser.role}</td>
                  {/* <td className="px-4 py-2 border">{this.formatDate(customuser.last_login)}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default UserTable;
