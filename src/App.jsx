import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RegisterForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import Eventpage from "./components/Eventpage";
import FetchedEvents from "./components/FetchedEvents";
import TicketForm from "./components/Ticketform";
import FetchedEventsWithTickets from "./components/Eventavailability";
import FetchedEventsWithIncome from "./components/IncomeGenerated";
import VendorsForm from "./components/VendorRegistration";
import FetchVendors from "./components/VendorsPage"
import AdminDashboard from "./components/Dashboard";
import UserTable from "./components/Userstable";
import EventTable from "./components/EventsTable";
import VendorTable from "./components/Vendorstable";

const App = () => {
  return (
    <Router>
    <Navbar />
    <Routes>
    <Route path="" element={<Home />} />
    <Route path="/register" element={<RegisterForm />}/>
    <Route path="/login" element={<LoginForm />}/>
    <Route path="/events" element={<Eventpage />}/>
    <Route path="/eventlist" element={<FetchedEvents />}/>
    <Route path="/ticketform" element={<TicketForm />}/>
    <Route path="/eventsavailable" element={<FetchedEventsWithTickets />}/>
    <Route path="/ticketsales" element={<FetchedEventsWithIncome />}/>
    <Route path="/vendorsform" element={<VendorsForm />}/>
    <Route path="/vendors" element={<FetchVendors />}/>
    <Route path="/dashboard" element={<AdminDashboard />}/>
    <Route path="/dashboard/users" element={<UserTable />}/>
    <Route path="/dashboard/events" element={<EventTable />}/>
    <Route path="/dashboard/vendors" element={<VendorTable />}/>
    </Routes>
    <Footer />
    </Router>
  );
};
export default App;

