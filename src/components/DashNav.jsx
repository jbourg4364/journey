import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './DashNav.css';


const DashNav = ({ setIsLoggedIn, setUser, setToken }) => {
  const username = localStorage.getItem('currentUser');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('id');
        setUser('');
        setIsLoggedIn(false);
        setToken('');
    };




  return (
    <div id='nav'>
      <h1 id='logo'>CarQ</h1>
      <h3>{username}</h3>
        <NavLink to='/login' className='nav-link' onClick={handleLogout}>
          Log Out
        </NavLink>
    </div>
  )
};

export default DashNav