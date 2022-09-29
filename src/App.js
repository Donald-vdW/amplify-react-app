import HomeCom from "./Components/HomeCom"
import HomeAuth from "./Components/HomeAuth"
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./Components/Login";
import SignUpUser from "./Components/SignUpUser";
import SignUpAuthority from "./Components/SignUpAuthority";
import React, { Component } from "react";
import Profile from "./Components/Profile";
import ProfileAuth from "./Components/ProfileAuth";

function App() {
  const handleLogout = () => {
    window.location.pathname = "/login";
  };




  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<HomeCom />} />
          <Route exact path="/homeAuth" element={<HomeAuth />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={handleLogout } />
          <Route exact path="/signupcom" element={<SignUpUser />} />
          <Route exact path="/signupAuth" element={<SignUpAuthority />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/profileAuth" element={<ProfileAuth />} />
        </Routes>
    </Router>

  );
}

export default App;
