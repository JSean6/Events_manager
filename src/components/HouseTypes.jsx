import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from './Axios';

const Types = () => {
   const [type, setType] = useState([]);
   const [name, setName] = useState('');
   const [editingType, setEditingType] = useState(null);
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const [isSidebarReduced, setIsSidebarReduced] = useState(false);
   useEffect(() => {
      fetchType();
   }, []);
   const fetchType = async () => {
      try {
         const response = await axiosInstance.get('/type/');
         console.log('API response:', response.data); // Debugging: log API response
         setType(response.data);
      } catch (error) {
         console.error("There was an error fetching the types!", error);
      }
   };
   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axiosInstance.post('/type/', { name });
          console.log('Type added:', response.data);
          fetchType(); // Refresh the type list after adding
          setName(''); // Reset form fields
      } catch (error) {
          console.error("Error adding type:", error);
      }
   };
   const handleEdit = (type) => {
      setEditingType(type);
      setName(type.name);
   };
   const handleDelete = async (id) => {
      if (window.confirm('Are you sure you want to delete this type?')) {
         try {
            await axiosInstance.delete(`/type/${id}/`);
            fetchType();
         } catch (error) {
            console.error("Error deleting type:", error);
         }
      }
   };
   const handleUpdate = async (id) => {
      try {
          const response = await axiosInstance.put(`/type/${id}/`, { name });
          console.log('Type updated:', response.data);
          fetchType(); // Refresh the type list after updating
          setEditingType(null); // Reset form fields or update state as needed
      } catch (error) {
          console.error("Error updating type:", error);
      }
   };
   const resetForm = () => {
     setName('');
     setEditingType(null);
   };
   const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
   };
   const toggleSidebarSize = () => {
      setIsSidebarReduced(!isSidebarReduced);
   };
   return (
      <div className="flex flex-col md:flex-row">
         {/* Sidebar */}
         <div className="flex">
      <button
        className="p-2 h-screen text-white dark:text-white bg-blue-800 dark:bg-gray-700"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? 'Close' : 'Open'} Sidebar
      </button>
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} ${isSidebarReduced ? 'w-20' : 'w-64'} fixed top-0 left-0 z-40 h-screen bg-blue-800 dark:bg-gray-800 transition-width duration-300`}>
        <aside id="logo-sidebar" className="h-full px-3 py-4 overflow-y-auto">
          <button
            className="p-2 text-white rounded-lg dark:text-white bg-black dark:bg-gray-700 mb-4"
            onClick={toggleSidebarSize}
          >
            {isSidebarReduced ? 'Enlarge' : 'Reduce'} Sidebar
          </button>
          <ul className="space-y-2 font-medium">
            <li>
              <a href="/Dash" className="flex items-center p-2 text-white rounded-lg dark:text-white dark:hover:bg-gray-700 group">
                <svg className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className={`ms-3 ${isSidebarReduced ? 'hidden' : 'block'}`}>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/Types" className="flex items-center p-2 text-white rounded-lg dark:text-white dark:hover:bg-gray-700 group">
                <svg className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 12h-8V4h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v8H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8v8h-1a1 1 0 1 0 0 2h2a1 1 0 0 0 1-1v-8h8a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1ZM6 14h2v2H6v-2Z" />
                </svg>
                <span className={`ms-3 ${isSidebarReduced ? 'hidden' : 'block'}`}>House type</span>
              </a>
            </li>
            <li>
              <a href="Houses" className="flex items-center p-2 text-white rounded-lg dark:text-white dark:hover:bg-gray-700 group">
                <svg className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l10 9H2l10-9Zm0 2.618L5.762 9h12.476L12 4.618ZM2 11h20v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V11Zm11 2v7h6v-7h-6Zm-2 0H4v7h6v-7Z" />
                </svg>
                <span className={`ms-3 ${isSidebarReduced ? 'hidden' : 'block'}`}>Houses</span>
              </a>
            </li>
            <li>
              <a href="/Tenants" className="flex items-center p-2 text-white rounded-lg dark:text-white dark:hover:bg-gray-700 group">
                <svg className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5Zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3Zm7 11h-2v-2a7 7 0 0 0-14 0v2H3v-2a9 9 0 0 1 18 0Z" />
                </svg>
                <span className={`ms-3 ${isSidebarReduced ? 'hidden' : 'block'}`}>Tenants</span>
              </a>
            </li>
            <li>
              <a href="/Payments" className="flex items-center p-2 text-white rounded-lg dark:text-white dark:hover:bg-gray-700 group">
                <svg className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1Zm-1 8H4v-6h16Zm-5 2h2v2h-2Zm-4 0h2v2h-2Zm-4 0h2v2H7Zm0-4h10v2H7Zm0-4h10v2H7Z" />
                </svg>
                <span className={`ms-3 ${isSidebarReduced ? 'hidden' : 'block'}`}>Payments</span>
              </a>
            </li>
            <li>
              <a href="/Reports" className="flex items-center p-2 text-white rounded-lg dark:text-white dark:hover:bg-gray-700 group">
                <svg className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm-1 16h-2V12h2Zm2-8V6h-2v4Z" />
                </svg>
                <span className={`ms-3 ${isSidebarReduced ? 'hidden' : 'block'}`}>Reports</span>
              </a>
            </li>
            <li>
              <a href="/Inquire" className="flex items-center p-2 text-white rounded-lg dark:text-white dark:hover:bg-gray-700 group">
                <svg className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm-1 16h-2V12h2Zm2-8V6h-2v4Z" />
                </svg>
                <span className={`ms-3 ${isSidebarReduced ? 'hidden' : 'block'}`}>Inquiries</span>
              </a>
            </li>
            <li>
              <a href="/Users" className="flex items-center p-2 text-white rounded-lg dark:text-white dark:hover:bg-gray-700 group mb-10">
                <svg className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm-1 16h-2V12h2Zm2-8V6h-2v4Z" />
                </svg>
                <span className={`ms-3 ${isSidebarReduced ? 'hidden' : 'block'}`}>Users</span>
              </a>
            </li>
          </ul>
          <button>
            <a href="/Home" className='bg-red-800 text-white rounded-lg pt-2 pb-2 pr-5 pl-5 mt-10'>Home</a>
          </button>
        </aside>
      </div>
    </div>
         {/* Main Content */}
         <div className={`flex-1 p-4 ml-40 mr-60 mt-20`}>
            <h1 className="text-2xl font-bold mb-4">House Types</h1>
            <form onSubmit={editingType ? () => handleUpdate(editingType.id) : handleSubmit} className="mb-4">
               <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter house type name"
                  className="p-2 border border-gray-300 rounded-md"
                  required
               />
               <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-md">
                  {editingType ? 'Update' : 'Add'} Type
               </button>
               {editingType && (
                  <button
                     type="button"
                     onClick={resetForm}
                     className="ml-2 p-2 bg-gray-500 text-white rounded-md"
                  >
                     Cancel
                  </button>
               )}
            </form>
            <table className=" mt-20 mb-20 table-auto">
                        <thead>
                           <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-medium text-gray-900 dark:text-white">
                              <th className="pr-20 pl-20">House Type</th>
                           </tr>
                        </thead>
                        <tbody>
                        {type.map((t) => (
                              <tr key={t.id} className="border-b dark:border-gray-700">
                                 <td className="p-2">{t.name}</td>
                                 <td className="p-2">
                                    <button onClick={() => handleEdit(p)} className="px-4 py-2 text-blue-600 rounded ">Edit</button>
                                    <button onClick={() => handleDelete(p.id)} className="px-4 py-2 ms-2 text-red-600 rounded ">Delete</button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
         </div>
      </div>
   );
};
export default Types;