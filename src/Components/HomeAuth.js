import '../App.css';
import React from 'react'
import ShowTicketsAuthority from './ShowTicketsAuthority.js';

function HomeAuth() {
  const handleLogout = () => {
    window.location.pathname = "/login";
  };

  const handleProfile = () => {
    window.location.pathname = "/ProfileAuth";
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
            <li>
              <label onClick={handleLogout}>
                Logout  {" "}
              </label>
            </li>
          </ul>
        </div>
      </nav>

      <div className="App">
        <ShowTicketsAuthority></ShowTicketsAuthority>
      </div>
    </>
  );


}

export default HomeAuth;