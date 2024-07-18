import React from 'react';
import EventTable from './EventsTable';
import VendorTable from './Vendorstable';
import UserTable from './Userstable';
import ContactsTable from './FetchedContacts';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-8 text-center">Admin Dashboard</h1>
      <div className="mb-8">
        <EventTable />
      </div>
      <div className="mb-8">
        <VendorTable />
      </div>
      <div className="mb-8">
        <UserTable />
      </div>
      <div className="mb-8">
         <ContactsTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
