import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RegisterForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import Eventpage from "./components/Eventpage";
// import EventList from "./components/Eventlist";
import FetchedEvents from "./components/FetchedEvents";

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
    {/* <Route path="/eventlist" element={<EventList />}/> */}
    </Routes>
    <Footer />
    </Router>
  );
};
export default App;

