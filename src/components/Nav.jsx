import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  return (
    <div className="nav">
      <NavLink to="/" className="nav-logo">
        <h1 className="nav-logo">JOURNEY</h1>
      </NavLink>
      <div className='nav-right'>
        <NavLink to="/features">
        <h2>Features</h2>
      </NavLink>
        <NavLink to="/login">
        <h2>Log in</h2>
      </NavLink>
      <NavLink to="/register" className='nav-register'>
        <h2>Try Journey</h2>
      </NavLink>
      </div>
      
    </div>
  );
};

export default Nav;