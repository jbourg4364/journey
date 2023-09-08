import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './DashNav.css';


const DashNav = ({ setIsLoggedIn, setUser, setToken }) => {
  const username = localStorage.getItem('currentUser');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (username === 'admin') {
    setIsAdmin(true);
  };
  }, [])


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
      <div id='middle-container'>
        <h3>{username}</h3>
        {isAdmin ? (
        <i id='past-rosters' className="fa-solid fa-clipboard fa-2xl"></i>
        ) : null
      } 
      </div>
        <NavLink to='/login' className='nav-link' onClick={handleLogout}>
          Log Out
        </NavLink>
    </div>
  )
};

export default DashNav