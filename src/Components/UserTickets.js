import '../App.css';
import React from 'react'
import ShowTicketsUser from './ShowTicketsUser.js';

function UserTickets() {
  const handleLogout = () => {
    window.location.pathname = "/";
  };

  const handleProfile = () => {
    window.location.pathname = "/Profile";
  };

  const handleHome = () => {
    window.location.pathname = "/home";
  };

  return (
    <>
      <nav id="navbar" >
        <div className="nav-wrapper">
          <div >
            <h1 className="logo" onClick={handleHome}>FixedIt</h1>
          </div>
          <ul >
            <li >
              <label onClick={handleProfile}>
                Profile  {" "}
              </label>
            </li>
            <li >
              <label >
                Your Tickets  {" "}
              </label>
            </li>
            <li>
              <label onClick={handleLogout}>
                Logout  {" "}
              </label>
            </li>
          </ul>
        </div>
      </nav>

      <div className="App">
        <ShowTicketsUser></ShowTicketsUser>
      </div>
    </>
  );


}

export default UserTickets;