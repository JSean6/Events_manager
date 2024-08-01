import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RegisterForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import Eventpage from "./components/Eventpage";
import EventForm from "./components/Eventform";
import TicketForm from "./components/Ticketform";
import FetchedEventsWithTickets from "./components/Eventavailability";
import FetchedEventsWithIncome from "./components/IncomeGenerated";
import VendorsForm from "./components/VendorRegistration";
import FetchVendors from "./components/VendorsPage";
import AdminDashboard from "./components/Dashboard";
import UserTable from "./components/Userstable";
import EventTable from "./components/EventsTable";
import VendorTable from "./components/Vendorstable";
import ContactForm from "./components/ContactForm";
import VendorBookingForm from "./components/VendorBookingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/context/AuthContext";
import EventCharts from "./components/EventCharts";
import ContactsTable from "./components/FetchedContacts";
import UpdateUserForm from "./components/UserUpdate";
import Services from "./components/Services";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register", "/dashboard", "/dashboard/events", "/dashboard/contacts", "/dashboard/vendors", "dashboard/eventform", "/dashboard/updateuser"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      {children}
      {!hideNavbarRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route 
              path="/eventtickets" 
              element={
                <ProtectedRoute>
                  <FetchedEventsWithTickets />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/eventsavailable" 
              element={
                <ProtectedRoute>
                  <FetchedEventsWithTickets />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/ticketsales" 
              element={
                <ProtectedRoute>
                  <FetchedEventsWithIncome />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/ticketform" 
              element={
                <ProtectedRoute>
                  <TicketForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/eventcharts" 
              element={
                <ProtectedRoute>
                  <EventCharts />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/events" 
              element={
                <ProtectedRoute>
                  <Eventpage />
                </ProtectedRoute>
              } 
            />
            <Route path="" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/register" element={<RegisterForm />}/>
            <Route path="/login" element={<LoginForm />}/>
            <Route path="/vendorsform" element={<VendorsForm />}/>
            <Route path="/vendors/booking" element={<VendorBookingForm />}/>
            <Route path="/vendors" element={<FetchVendors />}/>
            <Route path="/dashboard" element={<AdminDashboard />}/>
            <Route path="/dashboard/users" element={<UserTable />}/>
            <Route path="/dashboard/events" element={<EventTable />}/>
            <Route path="/dashboard/vendors" element={<VendorTable />}/>
            <Route path="/dashboard/contacts" element={<ContactsTable />}/>
            <Route path="/dashboard/eventform" element={<EventForm />}/>
            <Route path="/dashboard/updateuser" element={<UpdateUserForm />}/>
            <Route path="/contact" element={<ContactForm />}/>
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
