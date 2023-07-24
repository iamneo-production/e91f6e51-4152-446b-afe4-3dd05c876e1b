import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { NavLink, useLocation } from 'react-router-dom';


const Navbar = () => {
  const location = useLocation();
  function handleLogout() {
    localStorage.setItem("userModel", null);
  }
  const [active, setActive] = useState(0);
  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname == "/admin/home")
      setActive(0);
    else if (location.pathname == "/admin/addMenu")
      setActive(1);
    else if (location.pathname == "/admin/addAddon")
      setActive(2);
  }, [location.pathname])
  return (
    <div className={styles.navbar_div}>
      <div className={styles.logo}>
        <p>Birthday Event</p>
      </div>
      <div className={styles.page_section}>
        <NavLink to="/admin/home" className={active == 0 ? styles.active_link : styles.links} activeClassName={styles.activeLink}>
          Add Theme
        </NavLink>
        <NavLink to="/admin/addMenu" className={active == 1 ? styles.active_link : styles.links} activeClassName={styles.activeLink}>
          Add Menu
        </NavLink>
        <NavLink to="/admin/addAddon" className={active == 2 ? styles.active_link : styles.links} activeClassName={styles.activeLink}>
          Add Add-ons
        </NavLink>
      </div>
      <NavLink to="/user/login" className={styles.logout} activeClassName={styles.logout} onClick={handleLogout}>
        <i className="fa-solid fa-right-from-bracket"></i>
        Logout
      </NavLink>
    </div>

  );
};

export default Navbar;
