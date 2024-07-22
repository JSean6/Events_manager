import React from 'react';
import EventTable from './EventsTable';
import VendorTable from './Vendorstable';
import UserTable from './Userstable';
import ContactsTable from './FetchedContacts';
import Sidebar from './Sidebar';

const AdminDashboard = () => {
  return (
    <section className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <div className="container mx-auto p-8">
          <h1 className="text-3xl font-semibold mb-8 text-center">Admin Dashboard</h1>
          <div className="mb-8">
            <UserTable />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
