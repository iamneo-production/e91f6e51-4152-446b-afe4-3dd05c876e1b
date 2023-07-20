
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbaar.css'; // Import the CSS file


function Navbaar() {
  function handleLogout(){
    localStorage.setItem("userModel",null);
    }
  return (
    <nav className="navbar">
      <div>
        <NavLink exact to="/user/getAllThemes" className="navbar-link" activeClassName="active">Birthday Event</NavLink>
      </div>
      <div className="navbar-links">
        {/* <NavLink to="/user/bookTheme" className="navbar-link" activeClassName="active">Book Event</NavLink> */}
        <NavLink to="/user/getBookedTheme" className="navbar-link" activeClassName="active">View Booked event</NavLink>
      </div>
      <div>
        <NavLink to="/user/login" className="navbar-link" activeClassName="active"  onClick={handleLogout}>Logout</NavLink>
      </div>
    </nav>
  );
}


export default Navbaar;