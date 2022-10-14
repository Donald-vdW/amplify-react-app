import HomeCom from "./Components/HomeCom"
import HomeAuth from "./Components/HomeAuth"
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import SignUpUser from "./Components/SignUpUser";
import SignUpAuthority from "./Components/SignUpAuthority";
import Profile from "./Components/Profile";
import ProfileAuth from "./Components/ProfileAuth";
import UserTickets from "./Components/UserTickets";
import Ticket from "./Components/Ticket";
import TicketAuth from "./Components/TicketAuth";

function App() {
  const handleLogout = () => {
    window.location.pathname = "/login";
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<HomeCom />} />
        <Route exact path="/homeAuth" element={<HomeAuth />} />
        <Route exact path="/logout" element={handleLogout} />
        <Route exact path="/signupcom" element={<SignUpUser />} />
        <Route exact path="/signupAuth" element={<SignUpAuthority />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/profileAuth" element={<ProfileAuth />} />
        <Route exact path="/userTickets" element={<UserTickets />} />
        <Route exact path="/Ticket" element={<Ticket />} />
        <Route exact path="/TicketAuth" element={<TicketAuth />} />
      </Routes>
    </Router>
  );
}

export default App;
