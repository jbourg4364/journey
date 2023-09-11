import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './DashNav.css';


const DashNav = ({ setIsLoggedIn, setUser, setToken, isLoggedIn }) => {
  const username = localStorage.getItem('currentUser');
  const [isAdmin, setIsAdmin] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (username === 'admin') {
    setIsAdmin(true);
  };
  }, []);



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
          <div>
            <NavLink to='/admin'>
              <i id='past-rosters' className="fa-solid fa-house fa-lg"></i>
            </NavLink>
            <NavLink to='/history'>
              <i id='past-rosters' className="fa-solid fa-clipboard fa-xl"></i>
            </NavLink>
          
          </div>
          
        ) : null
      } 
      </div>
        <NavLink to='/login' id='logout' className='nav-link' onClick={handleLogout}>
          Log Out
        </NavLink>
    </div>
  )
};

export default DashNav