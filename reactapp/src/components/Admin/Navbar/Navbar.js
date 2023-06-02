import React from 'react';
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className={styles.navbar_div}>
      <div className={styles.logo}>
        <p>Birthday Event</p>
      </div>
      <div className={styles.page_section}>
        <NavLink to="/admin/home" className={styles.links} activeClassName={styles.activeLink}>
          Add Theme
        </NavLink>
        <NavLink to="/admin/addMenu" className={styles.links} activeClassName={styles.activeLink}>
          Add Menu
        </NavLink>
        <NavLink to="/admin/addAddon" className={styles.links} activeClassName={styles.activeLink}>
          Add Add-ons
        </NavLink>
      </div>
      <div className={styles.logout}>
        <p>Logout</p>
      </div>
    </div>
  );
};

export default Navbar;
