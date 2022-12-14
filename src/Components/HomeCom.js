import AddTicket from './AddTicket.js';
import '../App.css';
import React from 'react'
import ShowTickets from './ShowTickets.js';

function HomeCom() {
  const handleLogout = () => {
    window.location.pathname = "/";
  };

  const handleProfile = () => {
    window.location.pathname = "/profile";
};

const handleTickets = () => {
  window.location.pathname = "/userTickets";
};

  return (
    <>
      <nav id="navbar" >
        <div className="nav-wrapper">
          <div >
            <h1 className="logo">FixedIt</h1>
          </div>
          <ul >
            <li >
              <label onClick={handleProfile}>
                Profile  {" "}
              </label>
            </li>
            <li >
              <label onClick={handleTickets}>
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
        <ShowTickets></ShowTickets>
        <AddTicket></AddTicket>
      </div>
    </>
  );


}

export default HomeCom;