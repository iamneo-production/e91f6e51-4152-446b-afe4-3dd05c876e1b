import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbaar.css'; // Import the CSS file
import UserContext from '../../../UserContext';


function capitalizeName(name) {
  if (!name) return '';
  const nameArray = name.split(' ');
  const capitalizedNames = nameArray.map((name) => name.charAt(0).toUpperCase() + name.slice(1));
  return capitalizedNames.join(' ');
}
function Navbaar() {
  const { appUser, setAppUser } = useContext(UserContext);
  const user = capitalizeName(appUser?.username);

  function handleLogout() {
    // Your logout logic here
    localStorage.setItem("userModel", null);
  }

  return (
    <nav className="navbar">
      <div className='birthday-event-navbaar'>
        <NavLink exact to="/user/getAllThemes" className="navbar-link" activeClassName="active">
          <i class="fa-solid fa-cake-candles"></i>
          Birthday Event
        </NavLink>
      </div>
      <div className="navbar-links">
        {/* <NavLink to="/user/bookTheme" className="navbar-link" activeClassName="active">Book Event</NavLink> */}
        <NavLink to="/user/getBookedTheme" className="navbar-link" activeClassName="active">
          <i class="fa-solid fa-bag-shopping"></i>
          {/* <i class="fa-solid fa-cart-shopping"></i> */}
          View Booked Event
        </NavLink>
      </div>
      <div className='logout-user'>
        <i class="fa-regular fa-user"></i>
        {user ? (
          <span className="username">{`${user}`}</span>
        ) : null}
        <NavLink to="/user/login" className="navbar-link" activeClassName="active" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbaar;
